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
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App & Auth
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

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

// ----------------------------------------------------
// K-Defense News Google Sheet Monitoring Synchronization
// ----------------------------------------------------

export const DEFAULT_DEFENSE_NEWS_SHEET_ID = "1DlMYbO55PuV1PEfeLrIsZJLGUpb2NgySEjZMcYgLY9Q";

export interface DefenseNewsSheetRow {
  id: string;
  tab: "suwon" | "domestic" | "global";
  category: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  imageUrl?: string;
  coreSummary: string;
  bodyText: string;
  perspective: string;
}

/**
 * Parses Google Sheets 2D array or GViz JSON into structured Defense News items
 */
export function parseSheetRowsToNews(headers: string[], rows: any[][]): DefenseNewsSheetRow[] {
  if (!rows || rows.length === 0) return [];

  // Normalize header names to lowercase trimmed
  const normHeaders = headers.map(h => String(h || "").trim().toLowerCase().replace(/\s+/g, ""));
  
  // Find column indices by multiple possible aliases
  const findCol = (keywords: string[]) => {
    return normHeaders.findIndex(h => keywords.some(k => h.includes(k.toLowerCase())));
  };

  const colDate = findCol(["일자", "날짜", "date", "작성일", "등록일", "시간", "time"]);
  const colTitle = findCol(["기사제목", "제목", "title", "뉴스제목", "헤드라인", "headline"]);
  const colSource = findCol(["언론사", "출처", "source", "미디어", "매체", "신문사", "기관"]);
  const colSummary = findCol(["요약", "기사요약", "summary", "개요", "줄거리"]);
  const colBody = findCol(["본문", "상세요약", "body", "내용", "본문내용", "상세내용", "content"]);
  const colUrl = findCol(["링크", "url", "원문", "기사링크", "기사url", "link"]);
  const colCategory = findCol(["분류", "카테고리", "category", "주제", "섹션", "구분"]);
  const colImage = findCol(["이미지", "사진", "image", "img", "썸네일", "thumbnail"]);
  const colCore = findCol(["핵심", "핵심요약", "core", "keypoint", "쟁점", "포인트"]);
  const colPerspective = findCol(["수원지관", "시사점", "제조관점", "perspective", "논평", "코멘트", "지관관점"]);

  return rows.map((row, idx) => {
    // Extract raw values with fallback
    const rawDate = colDate >= 0 ? String(row[colDate] || "") : "";
    const rawTitle = colTitle >= 0 ? String(row[colTitle] || "") : "";
    const rawSource = colSource >= 0 ? String(row[colSource] || "") : "K-방산 뉴스 모니터링";
    const rawSummary = colSummary >= 0 ? String(row[colSummary] || "") : "";
    const rawBody = colBody >= 0 ? String(row[colBody] || "") : "";
    const rawUrl = colUrl >= 0 ? String(row[colUrl] || "") : "";
    const rawCategory = colCategory >= 0 ? String(row[colCategory] || "") : "국내 방산기업";
    const rawImage = colImage >= 0 ? String(row[colImage] || "") : "";
    const rawCore = colCore >= 0 ? String(row[colCore] || "") : "";
    const rawPerspective = colPerspective >= 0 ? String(row[colPerspective] || "") : "";

    // Skip completely empty rows
    if (!rawTitle && !rawSummary && !rawBody) {
      return null;
    }

    // Format date string to YYYY-MM-DD
    let cleanDate = rawDate.trim();
    if (cleanDate.includes(".")) {
      const parts = cleanDate.split(".").map(p => p.trim()).filter(Boolean);
      if (parts.length === 3) {
        cleanDate = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      }
    } else if (cleanDate.includes("/")) {
      const parts = cleanDate.split("/").map(p => p.trim()).filter(Boolean);
      if (parts.length === 3) {
        cleanDate = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      }
    }
    if (!cleanDate || cleanDate.length < 5) {
      cleanDate = new Date().toISOString().split("T")[0];
    }

    // Determine tab and category
    let tab: "suwon" | "domestic" | "global" = "domestic";
    const lowerCat = rawCategory.toLowerCase();
    const lowerTitle = rawTitle.toLowerCase();
    if (lowerCat.includes("수원") || lowerTitle.includes("수원지관")) {
      tab = "suwon";
    } else if (lowerCat.includes("글로벌") || lowerCat.includes("해외") || lowerCat.includes("nato") || lowerCat.includes("미국") || lowerCat.includes("유럽") || lowerCat.includes("global")) {
      tab = "global";
    } else {
      tab = "domestic";
    }

    // Default high-grade Unsplash image by topic
    let finalImageUrl = rawImage.trim();
    if (!finalImageUrl || !finalImageUrl.startsWith("http")) {
      if (tab === "suwon") {
        finalImageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80";
      } else if (tab === "global") {
        finalImageUrl = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80";
      } else if (lowerTitle.includes("포탄") || lowerTitle.includes("탄약") || lowerTitle.includes("155")) {
        finalImageUrl = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80";
      } else {
        finalImageUrl = "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80";
      }
    }

    // Default high-context manufacturing perspective if omitted in spreadsheet
    const finalPerspective = rawPerspective.trim() || 
      "탄약 생산과 공급이 확대될수록 탄약의 보관, 수송, 취급 과정에서 포장재의 역할은 더욱 중요해집니다. 수원지관산업의 60년 방산규격 지환통 가공 및 고도 방습 코팅 원천 기술은 추진제와 화약의 장기 야전 보존 신뢰성을 완벽하게 보장합니다.";

    const finalSummary = rawSummary.trim() || rawBody.slice(0, 120) || rawTitle;
    const finalCore = rawCore.trim() || finalSummary.slice(0, 80);
    const finalBody = rawBody.trim() || rawSummary || rawTitle;

    const item: DefenseNewsSheetRow = {
      id: `news-sheet-${cleanDate.replace(/-/g, '')}-${idx + 1}`,
      tab,
      category: rawCategory.trim() || (tab === "global" ? "글로벌 방산시장" : "국내 방산기업"),
      title: rawTitle.trim() || `K-방산 모니터링 뉴스 (${cleanDate})`,
      summary: finalSummary,
      source: rawSource.trim() || "K-방산 뉴스 모니터링",
      date: cleanDate,
      url: rawUrl.trim() || "https://www.combat-packaging.com",
      imageUrl: finalImageUrl,
      coreSummary: finalCore,
      bodyText: finalBody,
      perspective: finalPerspective
    };

    return item;
  }).filter((item): item is DefenseNewsSheetRow => Boolean(item));
}

/**
 * Fetch and synchronize defense news from the designated Google Sheet
 */
export async function fetchDefenseNewsFromGoogleSheet(
  sheetId: string = DEFAULT_DEFENSE_NEWS_SHEET_ID,
  accessToken?: string | null
): Promise<{ success: boolean; articles: DefenseNewsSheetRow[]; error?: string; sourceMode: "api" | "gviz" | "fallback" }> {
  const targetSheetId = sheetId.trim() || DEFAULT_DEFENSE_NEWS_SHEET_ID;

  // 1. Try Official Google Sheets API v4 if Access Token is present
  if (accessToken) {
    try {
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${targetSheetId}/values/A1:Z500`;
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.ok) {
        const sheetData = await response.json();
        const values: any[][] = sheetData.values || [];
        if (values.length > 1) {
          const headers = values[0];
          const dataRows = values.slice(1);
          const parsedArticles = parseSheetRowsToNews(headers, dataRows);
          if (parsedArticles.length > 0) {
            return {
              success: true,
              articles: parsedArticles,
              sourceMode: "api"
            };
          }
        }
      }
    } catch (apiErr: any) {
      console.warn("Google Sheets v4 API fetch failed, trying alternate methods:", apiErr);
    }
  }

  // 2. Try Public GViz JSON Endpoint
  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${targetSheetId}/gviz/tq?tqx=out:json`;
    const gvizRes = await fetch(gvizUrl);
    if (gvizRes.ok) {
      const text = await gvizRes.text();
      // GViz wraps JSON in /*O_o*/ google.visualization.Query.setResponse({...});
      const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
      if (match && match[1]) {
        const json = JSON.parse(match[1]);
        const cols = (json.table?.cols || []).map((c: any) => c.label || c.id || "");
        const rows = (json.table?.rows || []).map((r: any) => {
          return (r.c || []).map((cell: any) => cell ? (cell.f || cell.v || "") : "");
        });

        if (rows.length > 0) {
          const parsedArticles = parseSheetRowsToNews(cols, rows);
          if (parsedArticles.length > 0) {
            return {
              success: true,
              articles: parsedArticles,
              sourceMode: "gviz"
            };
          }
        }
      }
    }
  } catch (gvizErr) {
    console.warn("GViz JSON endpoint fetch failed:", gvizErr);
  }

  // 3. If sheet requires auth and no token is present or read failed, report clear instruction
  return {
    success: false,
    articles: [],
    error: "구글 시트 접근 권한이 필요합니다. 상단의 [Google 로그인]을 진행하시면 비공개 시트에서도 최신 8월 22일 뉴스 및 실시간 모니터링 데이터를 안전하게 즉시 불러옵니다.",
    sourceMode: "fallback"
  };
}

