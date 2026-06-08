/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App & Auth
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive.file");
provider.addScope("https://www.googleapis.com/auth/spreadsheets");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initial auth setup listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Official Google Sign-In pop-up flow
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get Google credentials access token.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Workspace Auth Sign-in Error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Interface for Inquiry data
interface InquiryFile {
  name: string;
  size: string;
  type: string;
  dataUrl: string;
}

interface InquiryData {
  id: string;
  submitDate: string;
  classification: string;
  companyName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  productName: string;
  productCategory: string;
  innerDiameter: string;
  outerDiameter: string;
  thickness: string;
  length: string;
  quantity: string;
  hasBlueprint: string;
  hasPhotos: string;
  comments: string;
  status: "대기중" | "검토중" | "답변완료" | "반려";
  managerMemo: string;
  quoteIssued: "Y" | "N";
  taxInvoiceIssued: "Y" | "N";
  files?: InquiryFile[];
}

/**
 * Helper: Converts base64 dataUrl into a biological binary Blob
 */
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(",");
  const mime = parts[0].match(/:(.*?);/)?.[1] || "application/octet-stream";
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Check or Create a Folder in Google Drive (exported helper)
 */
export async function getOrCreateFolderPublic(accessToken: string, folderName: string): Promise<string> {
  // 1. Search for existing folder
  const query = encodeURIComponent(`name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;
  
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  
  if (response.ok) {
    const data = await response.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
  }

  // 2. Create if not exists
  const createUrl = "https://www.googleapis.com/drive/v3/files";
  const createResponse = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: "application/vnd.google-apps.folder"
    })
  });

  if (!createResponse.ok) {
    throw new Error("Failed to create Google Drive folder");
  }

  const newFolder = await createResponse.json();
  return newFolder.id;
}

/**
 * Upload a stock item image directly to Google Drive and return the shareable & embeddable links
 */
export async function uploadStockImageToDrive(
  accessToken: string,
  fileName: string,
  fileType: string,
  dataUrl: string
): Promise<{ id: string; webViewLink: string; directLink: string }> {
  // 1. Get or create target assets folder
  const folderId = await getOrCreateFolderPublic(accessToken, "수원지관산업_재고등록자재");
  
  // 2. Convert base64 dataUrl to blob
  const mime = fileType || "image/jpeg";
  const blob = dataUrlToBlob(dataUrl);
  
  // Multipart upload
  const boundary = "-------314159265358979323846";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: fileName,
    parents: [folderId]
  };

  const getArrayBuffer = (): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(blob);
    });
  };

  const arrayBuffer = await getArrayBuffer();
  const base64Data = btoa(
    new Uint8Array(arrayBuffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), "")
  );

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Transfer-Encoding: base64\r\n` +
    `Content-Type: ${mime}\r\n\r\n` +
    base64Data +
    closeDelimiter;

  const uploadResponse = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`
      },
      body: multipartRequestBody
    }
  );

  if (!uploadResponse.ok) {
    const errText = await uploadResponse.text();
    throw new Error(`Drive stock upload failed: ${errText}`);
  }

  const resData = await uploadResponse.json();
  const fileId = resData.id;
  const webViewLink = resData.webViewLink;

  // Set permission to "anyone with link can view" so it's visible to public visitors
  try {
    await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role: "reader",
        type: "anyone"
      })
    });
  } catch (permError) {
    console.error("Failed to set anyone-reader permission:", permError);
  }

  return {
    id: fileId,
    webViewLink: webViewLink,
    directLink: `https://lh3.googleusercontent.com/d/${fileId}`
  };
}

/**
 * Check or Create a Folder in Google Drive
 */
async function getOrCreateFolder(accessToken: string, folderName: string): Promise<string> {
  // 1. Search for existing folder
  const query = encodeURIComponent(`name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;
  
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  
  if (response.ok) {
    const data = await response.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
  }

  // 2. Create if not exists
  const createUrl = "https://www.googleapis.com/drive/v3/files";
  const createResponse = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: "application/vnd.google-apps.folder"
    })
  });

  if (!createResponse.ok) {
    throw new Error("Failed to create Google Drive folder");
  }

  const newFolder = await createResponse.json();
  return newFolder.id;
}

/**
 * Check or Create "수원지관산업 상담신청 및 맞춤수주 대장" Google Sheet
 */
export async function getOrCreateSpreadsheet(accessToken: string): Promise<string> {
  const sheetTitle = "수원지관산업_상담신청_및_맞춤수주_대장";
  const query = encodeURIComponent(`name = '${sheetTitle}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;

  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (response.ok) {
    const data = await response.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
  }

  // Create new Spreadsheet
  const createUrl = "https://sheets.googleapis.com/v4/spreadsheets";
  const createResponse = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title: sheetTitle
      },
      sheets: [
        {
          properties: {
            title: "종합접수내역"
          }
        }
      ]
    })
  });

  if (!createResponse.ok) {
    throw new Error("Failed to create sync spreadsheet in Sheets");
  }

  const newSpreadsheet = await createResponse.json();
  const spreadsheetId = newSpreadsheet.spreadsheetId;

  // Initialize spreadsheet columns/headers
  const headers = [
    "상담 고유번호",
    "접수 시간",
    "상담 구분",
    "회사명",
    "담당자 성함",
    "연락처",
    "이메일 주소",
    "요청 제품명",
    "내경 (mm)",
    "외경 (mm)",
    "두께 (mm)",
    "길이 (mm)",
    "수량 (개)",
    "도면유무",
    "사진유무",
    "추가 요청사항",
    "진행 상태",
    "담당자 메모/피드백",
    "견적서 발행",
    "세금계산서",
    "구글드라이브 첨부파일 링크"
  ];

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/종합접수내역!A1:U1?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      values: [headers]
    })
  });

  return spreadsheetId;
}

/**
 * Upload an inquiry attached file to Google Drive and return Web Link
 */
export async function uploadAttachedFileToDrive(
  accessToken: string, 
  file: InquiryFile, 
  parentFolderId: string
): Promise<string> {
  const blob = dataUrlToBlob(file.dataUrl);
  
  // Multipart boundary upload
  const boundary = "-------314159265358979323846";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: file.name,
    parents: [parentFolderId]
  };

  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      const base64Data = btoa(
        new Uint8Array(reader.result as ArrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      const multipartRequestBody =
        delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        `Content-Transfer-Encoding: base64\r\n` +
        `Content-Type: ${blob.type}\r\n\r\n` +
        base64Data +
        closeDelimiter;

      try {
        const uploadResponse = await fetch(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": `multipart/related; boundary=${boundary}`
            },
            body: multipartRequestBody
          }
        );

        if (!uploadResponse.ok) {
          throw new Error(`Drive upload failed for ${file.name}`);
        }

        const resData = await uploadResponse.json();
        resolve(resData.webViewLink || `Uploaded (ID: ${resData.id})`);
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Synchronize single Inquiry to Google Sheets and Drive folder
 */
export async function syncInquiryToWorkspace(
  accessToken: string, 
  inquiry: InquiryData
): Promise<boolean> {
  try {
    // 1. Ensure Spreadsheet exists
    const spreadsheetId = await getOrCreateSpreadsheet(accessToken);
    
    // 2. Upload attachments if they exist and upload them to Google Drive Folder
    let driveLinksStr = "";
    if (inquiry.files && inquiry.files.length > 0) {
      const folderId = await getOrCreateFolder(accessToken, "수원지관산업_첨부파일");
      const linkPromises = inquiry.files.map(file => {
        // Only upload actually loaded base64 payloads
        if (file.dataUrl) {
          return uploadAttachedFileToDrive(accessToken, file, folderId);
        }
        return Promise.resolve(file.name);
      });
      const resolvedLinks = await Promise.all(linkPromises);
      driveLinksStr = resolvedLinks.join("\n");
    }

    // 3. Prepare spreadsheet row array corresponding to columns
    const row = [
      inquiry.id,
      inquiry.submitDate,
      inquiry.classification,
      inquiry.companyName,
      inquiry.contactName,
      inquiry.phoneNumber,
      inquiry.email,
      inquiry.productName,
      inquiry.innerDiameter,
      inquiry.outerDiameter,
      inquiry.thickness,
      inquiry.length,
      inquiry.quantity,
      inquiry.hasBlueprint,
      inquiry.hasPhotos,
      inquiry.comments,
      inquiry.status,
      inquiry.managerMemo,
      inquiry.quoteIssued,
      inquiry.taxInvoiceIssued,
      driveLinksStr
    ];

    // 4. Append row to Table
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/종합접수내역!A1:append?valueInputOption=USER_ENTERED`;
    const response = await fetch(appendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [row]
      })
    });

    return response.ok;
  } catch (err) {
    console.error("syncInquiryToWorkspace Error:", err);
    return false;
  }
}

/**
 * Sync entire local Inquiries DB block to Google Sheets (Bulk Export)
 */
export async function syncBulkDatabaseToWorkspace(
  accessToken: string,
  inquiries: InquiryData[]
): Promise<{ success: boolean; count: number }> {
  try {
    const spreadsheetId = await getOrCreateSpreadsheet(accessToken);
    const folderId = await getOrCreateFolder(accessToken, "수원지관산업_첨부파일");

    // Let's load existing spreadsheet rows to prevent writing duplicates if they already exist
    const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/종합접수내역!A2:A5000`;
    const checkResponse = await fetch(readUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    const existingIds = new Set<string>();
    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      if (checkData.values) {
        checkData.values.forEach((r: string[]) => {
          if (r[0]) existingIds.add(r[0]);
        });
      }
    }

    const unSyncedInquiries = inquiries.filter(inq => !existingIds.has(inq.id));
    if (unSyncedInquiries.length === 0) {
      return { success: true, count: 0 };
    }

    // Process and push sequentially to avoid Google API rate limiting
    let syncedCount = 0;
    for (const inq of unSyncedInquiries) {
      // Create copy and map uploads
      let driveLinksStr = "";
      if (inq.files && inq.files.length > 0) {
        const fileUploadPromises = inq.files.map(f => {
          if (f.dataUrl) {
            return uploadAttachedFileToDrive(accessToken, f, folderId).catch(() => f.name);
          }
          return Promise.resolve(f.name);
        });
        const fileLinks = await Promise.all(fileUploadPromises);
        driveLinksStr = fileLinks.join("\n");
      }

      const row = [
        inq.id,
        inq.submitDate,
        inq.classification,
        inq.companyName,
        inq.contactName,
        inq.phoneNumber,
        inq.email,
        inq.productName,
        inq.innerDiameter,
        inq.outerDiameter,
        inq.thickness,
        inq.length,
        inq.quantity,
        inq.hasBlueprint,
        inq.hasPhotos,
        inq.comments,
        inq.status,
        inq.managerMemo,
        inq.quoteIssued,
        inq.taxInvoiceIssued,
        driveLinksStr
      ];

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/종합접수내역!A1:append?valueInputOption=USER_ENTERED`;
      const response = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          values: [row]
        })
      });

      if (response.ok) {
        syncedCount++;
      }
    }

    return { success: true, count: syncedCount };
  } catch (error) {
    console.error("syncBulkDatabaseToWorkspace Error:", error);
    return { success: false, count: 0 };
  }
}
