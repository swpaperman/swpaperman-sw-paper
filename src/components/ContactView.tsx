/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { 
  FileText, 
  Send, 
  Settings, 
  User, 
  Building2, 
  PhoneCall, 
  Mail, 
  Calculator, 
  CheckCircle,
  Lock,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Upload,
  Trash2,
  Paperclip,
  Image as ImageIcon,
  Search,
  Cloud,
  RefreshCw,
  Loader2,
  LogOut
} from "lucide-react";
import { User as FirebaseUser } from "firebase/auth";
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
  syncInquiryToWorkspace,
  syncBulkDatabaseToWorkspace
} from "../lib/googleWorkspace";

interface InquiryFile {
  name: string;
  size: string;
  type: string;
  dataUrl: string;
}

// Structure definition matched explicitly with user guidelines
interface InquiryData {
  id: string;
  submitDate: string;
  classification: string; // 문의 구분: e.g. "탄약지환통 상담"
  companyName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  productName: string;
  productCategory: string; // 제품 분류: "defense" | "industrial" | "stock" | "etc"
  innerDiameter: string;
  outerDiameter: string;
  thickness: string;
  length: string;
  quantity: string;
  hasBlueprint: string; // 도면 보유 여부: "Y" | "N"
  hasPhotos: string; // 사진 첨부 여부: "Y" | "N"
  comments: string; // 추가 요청사항
  status: "대기중" | "검토중" | "답변완료" | "반려"; // 처리 상태
  managerMemo: string; // 담당자 메모
  quoteIssued: "Y" | "N"; // 견적서 발행 여부
  taxInvoiceIssued: "Y" | "N"; // 세금계산서 발행 여부
  files?: InquiryFile[];
}

interface ContactViewProps {
  prefilledProduct: string;
  prefilledSpecs: string;
  onClearPrefills: () => void;
}

export default function ContactView({ prefilledProduct, prefilledSpecs, onClearPrefills }: ContactViewProps) {
  const { language, t } = useLanguage();
  // Fields state
  const [classification, setClassification] = useState<string>("일반지관 가공");
  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [productName, setProductName] = useState<string>(prefilledProduct || "");
  const [productCategory, setProductCategory] = useState<string>("industrial");
  const [innerDiameter, setInnerDiameter] = useState<string>("");
  const [outerDiameter, setOuterDiameter] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [hasBlueprint, setHasBlueprint] = useState<string>("N");
  const [hasPhotos, setHasPhotos] = useState<string>("N");
  const [comments, setComments] = useState<string>(prefilledSpecs || "");

  // File upload state
  const [attachedFiles, setAttachedFiles] = useState<InquiryFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFiles = (filesList: FileList) => {
    const slotsLeft = 3 - attachedFiles.length;
    if (slotsLeft <= 0) {
      alert(
        language === "ko"
          ? "이미 최대 개수(3개)의 파일이 첨부되어 있습니다."
          : language === "tr"
            ? "Zaten maksimum sayıda (3) dosya eklediniz."
            : "You have already attached the maximum number of files (3)."
      );
      return;
    }

    const filesToProcess = Array.from(filesList).slice(0, slotsLeft);
    if (filesList.length > slotsLeft) {
      alert(
        language === "ko"
          ? `첨부파일은 최대 3개까지만 등록 가능합니다. 첫 ${slotsLeft}개 파일만 우선 추가됩니다.`
          : language === "tr"
            ? `En fazla 3 dosya ekleyebilirsiniz. İlk ${slotsLeft} dosya eklenecektir.`
            : `Only up to 3 attachments are permitted. The first ${slotsLeft} files will be loaded.`
      );
    }

    filesToProcess.forEach(file => {
      if (file.size > 2.5 * 1024 * 1024) {
        alert(
          language === "ko"
            ? `용량 초과: ${file.name} (2.5MB 이하의 파일만 첨부할 수 있습니다)`
            : language === "tr"
              ? `Boyut aşımı: ${file.name} (Dosya boyutu 2.5MB altında olmalıdır)`
              : `Size Limit Exceeded: ${file.name} (Files must be under 2.5MB)`
        );
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newData: InquiryFile = {
            name: file.name,
            size: formatBytes(file.size),
            type: file.type,
            dataUrl: e.target.result as string
          };
          
          setAttachedFiles(prev => {
            const updated = [...prev, newData];
            const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
            if (isImage) {
              setHasPhotos("Y");
            } else {
              setHasBlueprint("Y");
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = ""; // Reset value to allow selecting same file again
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) {
        setHasBlueprint("N");
        setHasPhotos("N");
      } else {
        const hasImgs = updated.some(f => f.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name));
        const hasDocs = updated.some(f => !(f.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name)));
        setHasPhotos(hasImgs ? "Y" : "N");
        setHasBlueprint(hasDocs ? "Y" : "N");
      }
      return updated;
    });
  };

  // Form submission feedback
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Google Workspace States
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);

  // Admin states
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminError, setAdminError] = useState<string>("");
  const [allInquiries, setAllInquiries] = useState<InquiryData[]>([]);
  const [activeAdminInquiry, setActiveAdminInquiry] = useState<InquiryData | null>(null);

  // Customer inquiry tracking status states
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<InquiryData[] | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [selectedInquiryIds, setSelectedInquiryIds] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  // Customer tracking search handler
  const handleCustomerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      setSearchResult([]);
      setHasSearched(true);
      return;
    }

    const query = searchKeyword.toLowerCase().replace(/[\s-]/g, "");

    const matches = allInquiries.filter(inq => {
      const cleanCompany = inq.companyName.toLowerCase().replace(/[\s-]/g, "");
      const cleanName = inq.contactName.toLowerCase().replace(/[\s-]/g, "");
      const cleanPhone = inq.phoneNumber.replace(/[\s-]/g, "");
      const cleanEmail = inq.email.toLowerCase();
      
      return (
        cleanCompany.includes(query) || 
        cleanName.includes(query) || 
        cleanPhone.includes(query) ||
        cleanEmail.includes(query) ||
        inq.id.toLowerCase().includes(query)
      );
    });

    setSearchResult(matches);
    setHasSearched(true);
  };

  // Admin bulk select/delete actions
  const handleToggleSelectAll = () => {
    if (selectedInquiryIds.length === allInquiries.length && allInquiries.length > 0) {
      setSelectedInquiryIds([]);
    } else {
      setSelectedInquiryIds(allInquiries.map(inq => inq.id));
    }
  };

  const handleToggleSelectId = (id: string) => {
    setSelectedInquiryIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedInquiryIds.length === 0) return;
    
    const remaining = allInquiries.filter(inq => !selectedInquiryIds.includes(inq.id));
    localStorage.setItem("suwon_inquiries_db", JSON.stringify(remaining));
    setAllInquiries(remaining);
    
    // If active edit view is deleted, dismiss it
    if (activeAdminInquiry && selectedInquiryIds.includes(activeAdminInquiry.id)) {
      setActiveAdminInquiry(null);
    }
    
    // Maintain correct search output if any matching deleted
    if (searchResult) {
      const updatedSearchResult = searchResult.filter(inq => !selectedInquiryIds.includes(inq.id));
      setSearchResult(updatedSearchResult);
    }
    
    setSelectedInquiryIds([]);
    setShowDeleteConfirm(false);
  };

  // Prefills management
  useEffect(() => {
    if (prefilledProduct) {
      setProductName(prefilledProduct);
      if (prefilledProduct.includes("탄약지환통")) {
        setProductCategory("defense");
        setClassification("탄약지환통 상담");
      } else if (prefilledProduct.includes("재고") || prefilledProduct.includes("제품")) {
        setProductCategory("stock");
        setClassification("재고제품 협의");
      }
    }
    if (prefilledSpecs) {
      // Set the comments directly to avoid duplicating / appending to itself on re-renders
      setComments(prefilledSpecs);
      
      // Parse sample specs out of prefill if they match typical patterns
      if (prefilledSpecs.includes("내경:")) {
        const idMatch = prefilledSpecs.match(/내경:\s*(\d+)mm/);
        const thicknessMatch = prefilledSpecs.match(/두께:\s*(\d+(\.\d+)?)mm/);
        const lengthMatch = prefilledSpecs.match(/길이:\s*(\d+)mm/);
        const qtyMatch = prefilledSpecs.match(/수량:\s*(\d+)개/);
        
        if (idMatch) setInnerDiameter(idMatch[1]);
        if (thicknessMatch) setThickness(thicknessMatch[1]);
        if (lengthMatch) setLength(lengthMatch[1]);
        if (qtyMatch) setQuantity(qtyMatch[1]);
      } else if (prefilledSpecs.includes("내경(Ø):")) {
        // Parse simulator specs
        const idMatch = prefilledSpecs.match(/내경\(Ø\):\s*Ø?([0-9.]+)/);
        const odMatch = prefilledSpecs.match(/외경\(Ø\):\s*Ø?([0-9.]+)/);
        const thickMatch = prefilledSpecs.match(/벽두께\(T\):\s*([0-9.]+)T/);
        const lengthMatch = prefilledSpecs.match(/기장\(L\):\s*([0-9.]+)mm/);
        const qtyMatch = prefilledSpecs.match(/제작수량:\s*([0-9,]+)개/);
        
        if (idMatch) setInnerDiameter(idMatch[1]);
        if (odMatch) setOuterDiameter(odMatch[1]);
        if (thickMatch) setThickness(thickMatch[1]);
        if (lengthMatch) setLength(lengthMatch[1]);
        if (qtyMatch) setQuantity(qtyMatch[1].replace(/,/g, ""));
      }

      // Clear parent prefill states to avoid double registration / duplication when switching tabs
      onClearPrefills();
    }
  }, [prefilledProduct, prefilledSpecs, onClearPrefills]);

  // Read all inquiries from localstorage
  const loadInquiriesFromDB = () => {
    try {
      const saved = localStorage.getItem("suwon_inquiries_db");
      if (saved) {
        setAllInquiries(JSON.parse(saved));
      } else {
        // Initial mock data to show functionality right away
        const mockDb: InquiryData[] = [
          {
            id: "INQ-2026-001",
            submitDate: "2026-06-01 14:24",
            classification: "탄약지환통 상담",
            companyName: "한국군수테크",
            contactName: "한정민 대리",
            phoneNumber: "010-1234-5678",
            email: "jmhan@koreadef.com",
            productName: "81mm 탄종 탄약지환통",
            productCategory: "defense",
            innerDiameter: "81",
            outerDiameter: "93",
            thickness: "6",
            length: "450",
            quantity: "2000",
            hasBlueprint: "Y",
            hasPhotos: "N",
            comments: "정밀 방습 알루미늄 배리어 추가 사양 및 검출 시트 제공 가능 여부 검토 바람",
            status: "검토중",
            managerMemo: "도면 수령 대기 중 다음 주 수요일 보증 통화 예정",
            quoteIssued: "N",
            taxInvoiceIssued: "N"
          },
          {
            id: "INQ-2026-024",
            submitDate: "2026-06-02 09:12",
            classification: "일반지관 가공",
            companyName: "대우연신필름",
            contactName: "지관수 팀장",
            phoneNumber: "02-987-6543",
            email: "ksjee@daewoofilm.co.kr",
            productName: "3인치 표준 필름 권취 지관",
            productCategory: "industrial",
            innerDiameter: "76.2",
            outerDiameter: "86.2",
            thickness: "5",
            length: "1500",
            quantity: "5000",
            hasBlueprint: "N",
            hasPhotos: "N",
            comments: "초고속 와인딩 기어 회전 텐션 견디는 나선 점착 단수 조정 필요.",
            status: "대기중",
            managerMemo: "초기 접수 완료",
            quoteIssued: "N",
            taxInvoiceIssued: "N"
          }
        ];
        localStorage.setItem("suwon_inquiries_db", JSON.stringify(mockDb));
        setAllInquiries(mockDb);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadInquiriesFromDB();
  }, []);

  // Initialize and synchronize Google Workspace Auth Session In-Memory
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsSyncing(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        alert(
          language === "ko"
            ? `구글 계정 연동 성공!\n\n${res.user.displayName || res.user.email} 계정으로 구글 드라이브 및 스프레드시트 쓰기 연동이 성공적으로 활성화되었습니다.`
            : language === "tr"
              ? `Google Bağlantısı Başarılı!\n\n${res.user.displayName || res.user.email} hesabı ile Google Drive ve Google E-Tablolar entegrasyonu aktif edilmiştir.`
              : `Google Account Synced Successfully!\n\nWrite access to Google Drive and Sheets with ${res.user.displayName || res.user.email} is active.`
        );
      }
    } catch (err) {
      console.error("Google Workspace Sign-in failed:", err);
      alert(
        language === "ko"
          ? "구글 연동 로그인에 실패했거나 취소되었습니다.\n비로그인 상태에서도 일반 상담 신청 전산 등록은 가능합니다."
          : language === "tr"
            ? "Google girişi başarısız oldu veya iptal edildi.\nUğramadan da yerel olarak teklif talep formu gönderebilirsiniz."
            : "Google login failed or was cancelled.\nYou can still submit inquiry proposals without signing in."
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGoogleLogout = async () => {
    const confirmMessage = 
      language === "ko"
        ? "정말로 구글 계정 연동을 해제하시겠습니까?"
        : language === "tr"
          ? "Google entegrasyonunu kaldırmak istediğinize emin misiniz?"
          : "Are you sure you want to unlink your Google account?";
    
    if (window.confirm(confirmMessage)) {
      setIsSyncing(true);
      try {
        await logout();
        setGoogleUser(null);
        setGoogleToken(null);
        alert(
          language === "ko" 
            ? "구글 계정 연동이 해제되었습니다." 
            : language === "tr" 
              ? "Google entegrasyonu kaldırıldı." 
              : "Google Account Unlinked."
        );
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleBulkSync = async () => {
    if (!googleToken) {
      alert(
        language === "ko" 
          ? "구글 계정 연동 로그인이 우선적으로 필요합니다." 
          : language === "tr" 
            ? "Lütfen önce Google hesabınızı bağlayın." 
            : "Please link a Google Account first."
      );
      return;
    }

    const confirmSync = 
      language === "ko"
        ? `접수된 총 ${allInquiries.length}건의 상담 및 수주대장 내역 전체를 구글 스프레드시트와 드라이브로 백업 일괄 동기화하시겠습니까?\n\n- 이미 동기화 정합성이 검증된 내역은 중복 없이 생략됩니다.\n- 새로 추가된 문의가 있는 경우 스프레드시트에 행이 추가되고 첨부디스크에 파일이 업로드됩니다.`
        : language === "tr"
          ? `Toplam ${allInquiries.length} talebi Google E-Tablolar ve Drive'a yedeklemek istiyor musunuz?\n\n- Çakışmalar önlenecektir.\n- Yeni eklenen dosyalar Drive'a yüklenecektir.`
          : `Would you like to sync all ${allInquiries.length} customer inquiries block to Google Sheets and Drive?\n\n- Duplicate rows will be skipped.\n- Newly logged items and files will be created.`;

    if (!window.confirm(confirmSync)) {
      return;
    }

    setIsSyncing(true);
    try {
      const res = await syncBulkDatabaseToWorkspace(googleToken, allInquiries);
      if (res.success) {
        alert(
          language === "ko"
            ? `동기화 성공!\n\n새로운 지관 주문 내역 ${res.count}건이 구글 스프레드시트 및 드라이브로 완벽히 백업 백라이트 동결 동기화되었습니다.`
            : language === "tr"
              ? `Eşitleme Başarılı!\n\nYeni eklenen ${res.count} talep Google E-Tablolar ve Drive'a aktarıldı.`
              : `Sync Successful!\n\n${res.count} new inquiries have been successfully archived to Sheets and Drive.`
        );
      } else {
        alert(
          language === "ko"
            ? "동기화 중 오류가 발생했습니다. 구글 계정의 Drive 및 Sheets 권한 한도를 재확인 부탁드립니다."
            : language === "tr"
              ? "Eşitleme sırasında bir hata oluştu. Google Drive/E-Tablolar izinlerini kontrol edin."
              : "An error occurred during synchronization. Please verify Drive and Sheets permission scopes."
        );
      }
    } catch (err) {
      console.error("Bulk sync failed:", err);
      alert(
        language === "ko"
          ? "동기화 처리 과정에 장애가 발견되었습니다. 네트워크 상태를 재검토 바랍니다."
          : language === "tr"
            ? "Eşitleme işleminde hata oluştu. Lütfen bağlantınızı kontrol edin."
            : "Sync failed. Please check your network connection."
      );
    } finally {
      setIsSyncing(false);
    }
  };

  // Submit action handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto calculate outer diameter approximately if vacant
    const calculatedOD = outerDiameter || (innerDiameter && thickness 
      ? (parseFloat(innerDiameter) + 2 * parseFloat(thickness)).toString() 
      : "");

    const newInquiry: InquiryData = {
      id: `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      submitDate: new Date().toISOString().replace("T", " ").substring(0, 16),
      classification,
      companyName,
      contactName,
      phoneNumber,
      email,
      productName: productName || "일반 맞춤 성형 지관",
      productCategory,
      innerDiameter,
      outerDiameter: calculatedOD,
      thickness,
      length,
      quantity,
      hasBlueprint,
      hasPhotos,
      comments,
      status: "대기중",
      managerMemo: "관리자 접수 확인 대기중",
      quoteIssued: "N",
      taxInvoiceIssued: "N",
      files: attachedFiles
    };

    // Save in DB with QuotaExceededError safety
    try {
      const updatedDb = [newInquiry, ...allInquiries];
      localStorage.setItem("suwon_inquiries_db", JSON.stringify(updatedDb));
      setAllInquiries(updatedDb);
    } catch (quotaError) {
      console.warn("localStorage quota exceeded, saving inquiry after stripping large binary payloads from simulation DB.", quotaError);
      
      // Strip files dataUrl for local storage survival but keep physical file names, sizes, and metadata
      const strippedInquiry = {
        ...newInquiry,
        files: newInquiry.files?.map(f => ({
          ...f,
          dataUrl: "" // strip heavy base64 to allow safe saving
        }))
      };
      const updatedDb = [strippedInquiry, ...allInquiries];
      try {
        localStorage.setItem("suwon_inquiries_db", JSON.stringify(updatedDb));
        setAllInquiries(updatedDb);
        alert(
          language === "ko"
            ? "알림: 첨부파일의 원본 용량이 브라우저 로컬 저장소 한도(5MB)를 초과하여 임시 미리보기 데이터가 압축 및 생략되었습니다.\n\n단, 실물 문의 내용과 파일 규격 자체는 정상적으로 보증 등록되었습니다."
            : language === "tr"
              ? "Bildirim: Ekli belgelerin toplam boyutu tarayıcı sınırını (5MB) aştığından önizlemeler sıkıştırıldı.\n\nAncak, teklif talebiniz ve teknik ebatlarınız başarıyla kaydedilmiştir."
              : "Notice: The original size of the attached files exceeded the browser's local storage limit (5MB), so temporary preview data has been compressed and omitted. However, the actual inquiry content and file specifications have been successfully registered."
        );
      } catch (innerError) {
        console.error("Failed to save even stripped inquiry", innerError);
      }
    }

    // Real-time Sync to Google Workspace in background (Drive & Sheets)
    if (googleToken && autoSyncEnabled) {
      syncInquiryToWorkspace(googleToken, newInquiry)
        .then((success) => {
          if (success) {
            console.log(`Auto-synced inquiry ${newInquiry.id} to Google Workspace in background`);
          } else {
            console.warn(`Failed background auto-sync for inquiry ${newInquiry.id}`);
          }
        })
        .catch((err) => {
          console.error("Workspace auto-sync exception:", err);
        });
    }

    // Feedback
    setIsSubmitted(true);
    setAttachedFiles([]); // Clear locally
    onClearPrefills(); // Wipe references from simulator/stores

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Log in admin
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem("suwon_admin_passcode") || "swpaper7638**";
    if (adminPassword === storedPass) {
      setIsAdminLoggedIn(true);
      setAdminError("");
    } else {
      setAdminError(
        language === "ko"
          ? "관리자 비밀번호가 일치하지 않습니다. (승인된 관리자만 접근 가능)"
          : language === "tr"
            ? "Yönetici şifresi geçersiz! (Sadece yetkili personel erişebilir)"
            : "Wrong admin passcode. (Authorized personnel only)"
      );
    }
  };

  // Update Inquiry Status from Admin panel dashboard
  const handleUpdateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAdminInquiry) return;

    const updated = allInquiries.map((inq) => 
      inq.id === activeAdminInquiry.id ? activeAdminInquiry : inq
    );

    try {
      localStorage.setItem("suwon_inquiries_db", JSON.stringify(updated));
    } catch (quotaError) {
      console.warn("Could not save to localStorage due to quota", quotaError);
    }
    setAllInquiries(updated);
    setActiveAdminInquiry(null); // Close detail editor
    alert(
      language === "ko"
        ? "문의 상태가 성공적으로 반영되었습니다."
        : language === "tr"
          ? "Talep durumu başarıyla güncellendi."
          : "Inquiry status updated successfully."
    );
  };

  // Clear / Reset form to submit another line
  const handleResetForm = () => {
    setCompanyName("");
    setContactName("");
    setPhoneNumber("");
    setEmail("");
    setProductName("");
    setInnerDiameter("");
    setOuterDiameter("");
    setThickness("");
    setLength("");
    setQuantity("");
    setHasBlueprint("N");
    setHasPhotos("N");
    setAttachedFiles([]);
    setComments("");
    setIsSubmitted(false);
  };

  // CSV Generator for Google Sheets integration!
  const downloadCSV = () => {
    const headers = [
      "접수고유번호", "접수일시", "문의 구분", "회사명", "담당자명", "연락처", "이메일", 
      "제품명", "제품 분류", "내경 (mm)", "외경 (mm)", "두께 (mm)", "길이 (mm)", "수량", 
      "도면 보유 여부", "사진 첨부 여부", "추가 요청사항", "처리 상태", "담당자 메모", 
      "견적서 발행", "세금계산서 발행"
    ];

    const rows = allInquiries.map(i => [
      i.id,
      i.submitDate,
      i.classification,
      i.companyName,
      i.contactName,
      i.phoneNumber,
      i.email,
      i.productName,
      i.productCategory,
      i.innerDiameter,
      i.outerDiameter,
      i.thickness,
      i.length,
      i.quantity,
      i.hasBlueprint,
      i.hasPhotos,
      i.comments.replace(/\n/g, " "),
      i.status,
      i.managerMemo.replace(/\n/g, " "),
      i.quoteIssued,
      i.taxInvoiceIssued
    ]);

    // Format for CSV UTF-8 with BOM representing correct Hangeul values inside Excel/Sheets
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `suwon_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-50 px-3 py-1 rounded inline-block">
            {t.contactPage.badge}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
            {t.contactPage.title}
          </h1>
          <div className="w-12 h-1 bg-kraft-500 mt-4 rounded-full" />
        </div>

        {/* Informative billing instruction card */}
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-150 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-extrabold text-kraft-700 bg-kraft-100 py-0.5 px-2 rounded inline-block">
              INVOICING NOTICE
            </span>
            <h3 className="text-sm sm:text-base font-bold text-gray-800">{t.contactPage.noticeTitle}</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              {t.contactPage.noticeDesc}
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* User Form block (8 columns) */}
          <div className="lg:col-span-8">
            
            {isSubmitted ? (
              <div className="p-8 sm:p-12 rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center space-y-6">
                <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full w-fit mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-emerald-950">{t.contactPage.successTitle}</h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto font-light leading-relaxed">
                    {t.contactPage.successDesc}
                  </p>
                </div>
                
                {googleToken && autoSyncEnabled && (
                  <div className="p-4 max-w-lg mx-auto rounded-xl bg-white border border-emerald-100 flex items-start gap-3.5 text-left shadow-sm animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <Cloud className="w-5 h-5 shrink-0" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-emerald-950">
                        {language === "ko" ? "구글 드라이브 실시간 연동 완료" : language === "tr" ? "Google Drive Gerçek Zamanlı Senkronizasyon" : "Google Drive Real-Time Sync"}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
                        {language === "ko" 
                          ? "상담 서식 데이터가 구글 스프레드시트 수주 대장 및 구글 드라이브 폴더(수원지관산업_첨부파일)로 안전하게 실시간 백업되었습니다." 
                          : language === "tr"
                            ? "Sipariş verileriniz Google E-Tablolar'a ve projenize ait Google Drive klasörüne güvenli ve anlık şekilde senkronize edilmiştir."
                            : "Your order details have been securely synchronized in real-time to Google Sheets and your Google Drive folder."
                        }
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleResetForm}
                  className="py-2.5 px-6 rounded-xl bg-military-850 hover:bg-military-900 text-white font-bold text-xs cursor-pointer active:scale-95 transition-all"
                >
                  {t.contactPage.anotherInquiryBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-150 pb-3">{t.contactPage.subtitle}</h3>
                
                {/* 1. Category and Classification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formClassification}</label>
                    <select
                      value={classification}
                      onChange={(e) => setClassification(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-kraft-500 font-medium"
                    >
                      <option value="일반지관 가공">{t.contactPage.class1}</option>
                      <option value="탄약지환통 상담">{t.contactPage.class2}</option>
                      <option value="도면 제작 문의">{t.contactPage.class3}</option>
                      <option value="재고제품 협의">{t.contactPage.class4}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formProductType}</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-kraft-500 font-medium"
                    >
                      <option value="industrial">{t.contactPage.cat1}</option>
                      <option value="defense">{t.contactPage.cat2}</option>
                      <option value="stock">{t.contactPage.cat3}</option>
                      <option value="etc">{t.contactPage.cat4}</option>
                    </select>
                  </div>
                </div>

                {/* 2. Customer Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formCompany}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.contactPage.placeCompany}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-kraft-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formContactName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.contactPage.placeContact}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-kraft-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formPhone}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.contactPage.placePhone}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-kraft-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formEmail}</label>
                    <input
                      type="email"
                      required
                      placeholder={t.contactPage.placeEmail}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-kraft-500 outline-none"
                    />
                  </div>
                </div>

                {/* 3. Product Info Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formProductName}</label>
                    <input
                      type="text"
                      placeholder={t.contactPage.placeProduct}
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-kraft-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formQuantity}</label>
                    <input
                      type="text"
                      placeholder={t.contactPage.placeQty}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-kraft-500 outline-none"
                    />
                  </div>
                </div>

                {/* Core Dimensions */}
                <span className="block text-xs font-bold text-gray-400 font-mono tracking-wider pt-2">{t.contactPage.formDimensions}</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <label 
                      className="block text-[10px] min-[370px]:text-[11px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis" 
                      title={t.contactPage.formInnerDia}
                    >
                      {t.contactPage.formInnerDia}
                    </label>
                    <input
                      type="number"
                      placeholder="Ø mm"
                      value={innerDiameter}
                      onChange={(e) => setInnerDiameter(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label 
                      className="block text-[10px] min-[370px]:text-[11px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis" 
                      title={t.contactPage.formOuterDia}
                    >
                      {t.contactPage.formOuterDia}
                    </label>
                    <input
                      type="number"
                      placeholder="Ø mm"
                      value={outerDiameter}
                      onChange={(e) => setOuterDiameter(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label 
                      className="block text-[10px] min-[370px]:text-[11px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis" 
                      title={t.contactPage.formThickness}
                    >
                      {t.contactPage.formThickness}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="T mm"
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label 
                      className="block text-[10px] min-[370px]:text-[11px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis" 
                      title={t.contactPage.formLength}
                    >
                      {t.contactPage.formLength}
                    </label>
                    <input
                      type="number"
                      placeholder="L mm"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Additional file flags */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formHasBlueprint}</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setHasBlueprint("Y")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border text-center cursor-pointer transition-all ${
                          hasBlueprint === "Y"
                            ? "bg-military-850 border-military-850 text-white"
                            : "bg-white border-gray-200 text-gray-500"
                        }`}
                      >
                        {t.contactPage.blueprintY}
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasBlueprint("N")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border text-center cursor-pointer transition-all ${
                          hasBlueprint === "N"
                            ? "bg-military-850 border-military-850 text-white"
                            : "bg-white border-gray-200 text-gray-500"
                        }`}
                      >
                        {t.contactPage.blueprintN}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t.contactPage.formHasPhotos}</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setHasPhotos("Y")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border text-center cursor-pointer transition-all ${
                          hasPhotos === "Y"
                            ? "bg-military-850 border-military-850 text-white"
                            : "bg-white border-gray-200 text-gray-500"
                        }`}
                      >
                        {t.contactPage.photoY}
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasPhotos("N")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border text-center cursor-pointer transition-all ${
                          hasPhotos === "N"
                            ? "bg-military-850 border-military-850 text-white"
                            : "bg-white border-gray-200 text-gray-500"
                        }`}
                      >
                        {t.contactPage.photoN}
                      </button>
                    </div>
                  </div>
                </div>

                {/* File Attachment Drag & Drop Zone */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    {t.contactPage.formUploadArea}
                  </label>
                  
                  <input
                    id="hidden-file-input"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                    onClick={(e) => e.stopPropagation()}
                    accept="image/*,.pdf,.dwg,.dxf,.zip,.doc,.docx"
                  />
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      isDragging
                        ? "border-kraft-500 bg-kraft-50/55"
                        : "border-gray-200 hover:border-military-300 bg-gray-50/70 hover:bg-gray-50"
                    }`}
                    onClick={() => document.getElementById("hidden-file-input")?.click()}
                  >
                    <div className="p-2 bg-military-50 rounded-full text-military-700">
                      <Upload className="w-4 h-4 text-military-800" />
                    </div>
                    
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-gray-700">{t.contactPage.formUploadDragText}</p>
                      <p className="text-[10px] text-gray-400 font-light">
                        {t.contactPage.formUploadDesc}
                      </p>
                    </div>
                  </div>

                  {/* Attachment item List */}
                  {attachedFiles.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {attachedFiles.map((file, idx) => {
                        const isImage = file.type.startsWith("image/");
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-200 text-xs shadow-sm"
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                              {isImage ? (
                                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200/50">
                                  <img 
                                    src={file.dataUrl} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover" 
                                    referrerPolicy="no-referrer" 
                                  />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded bg-kraft-50 flex items-center justify-center shrink-0 border border-kraft-100">
                                  <FileText className="w-4 h-4 text-kraft-700" />
                                </div>
                              )}
                              <div className="flex flex-col text-left overflow-hidden">
                                <span className="font-semibold text-gray-800 truncate" title={file.name}>
                                  {file.name}
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {file.size} • {isImage ? (language === "ko" ? "실물사진" : "Photo") : (language === "ko" ? "도면/문서" : "Blueprint/Doc")}
                                </span>
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(idx);
                              }}
                              className="p-1 px-1.5 rounded-lg hover:bg-rose-50 text-gray-405 hover:text-rose-600 duration-150 cursor-pointer shrink-0"
                              title={language === "ko" ? "첨부 해제" : "Detach File"}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Additional requirements comments */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    {t.contactPage.formComment}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t.contactPage.placeComment}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-kraft-500 outline-none resize-none bg-white font-sans"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-military-850 hover:bg-military-900 text-white font-bold text-sm rounded-xl cursor-pointer duration-200 shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-kraft-350" />
                    {t.contactPage.formSubmitBtn}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Contact coordinates & Admin entry trigger (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Real-time Inquiry status lookup tracker widget for B2B Clients */}
            <div className="p-6 rounded-2xl border border-gray-150 bg-gradient-to-br from-white to-gray-50/50 shadow-sm space-y-4">
              <div className="flex items-center gap-1.5 border-b border-gray-100 pb-3">
                <Search className="w-4 h-4 text-kraft-750" />
                <h4 className="text-sm font-bold text-gray-800">
                  {language === "ko" ? "문의 접수 및 처리 상태 조회" : language === "tr" ? "Sorgulama ve B2B Durum Takibi" : "Inquiry Status & B2B Tracker"}
                </h4>
              </div>
              <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                {language === "ko"
                  ? "성함, 회사명 또는 연락처를 입력하시면 제출하신 견적 및 상세 스펙 검토 전결현황을 실시간으로 확인하실 수 있습니다."
                  : language === "tr"
                    ? "Müşteri adını, şirketi veya telefon numarasını girerek teklif sürecinizi gerçek zamanlı olarak sorgulayabilirsiniz."
                    : "Enter your name, company name, or phone number to track your specifications and quote status in real-time."}
              </p>
              
              <form onSubmit={handleCustomerSearch} className="flex gap-1.5">
                <input
                  type="text"
                  placeholder={language === "ko" ? "예: 회사명, 연락처, 담당자명" : language === "tr" ? "örn: Şirket adı, kişi..." : "e.g., Company, name, or phone"}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-kraft-530 bg-white"
                />
                <button
                  type="submit"
                  className="px-3 bg-military-850 hover:bg-military-900 duration-150 text-white font-bold text-xs rounded-lg flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                >
                  {language === "ko" ? "조회" : language === "tr" ? "Sorgular" : "Search"}
                </button>
              </form>

              {/* Show Search Result details */}
              {hasSearched && (
                <div className="mt-3 text-xs space-y-3.5 pt-2 border-t border-dashed border-gray-200 animate-in fade-in duration-200">
                  {searchResult && searchResult.length > 0 ? (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      <p className="text-[10px] text-emerald-700 font-bold">
                        {language === "ko" 
                          ? `총 ${searchResult.length}건의 문의 내역이 확인되었습니다.`
                          : language === "tr"
                            ? `Toplam ${searchResult.length} talep bulundu.`
                            : `Found ${searchResult.length} matching inquiries.`}
                      </p>
                      {searchResult.map((inq, index) => (
                        <div key={index} className="p-3 bg-white border border-gray-150 rounded-xl shadow-2xs space-y-2 text-left">
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-[10px] font-mono text-gray-400 font-semibold">{inq.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              inq.status === "대기중" ? "bg-amber-105 text-amber-800 border border-amber-200" :
                              inq.status === "검토중" ? "bg-blue-105 text-blue-800 border border-blue-200" :
                              inq.status === "답변완료" ? "bg-emerald-105 text-emerald-800 border border-emerald-200" :
                              "bg-rose-105 text-rose-800 border border-rose-200"
                            }`}>
                              {inq.status === "대기중"
                                ? (language === "ko" ? "대기중" : language === "tr" ? "Beklemede" : "Pending")
                                : inq.status === "검토중"
                                  ? (language === "ko" ? "검토중" : language === "tr" ? "İnceleniyor" : "Under Review")
                                  : inq.status === "답변완료"
                                    ? (language === "ko" ? "답변완료" : language === "tr" ? "Tamamlandı" : "Completed")
                                    : (language === "ko" ? "보류됨" : language === "tr" ? "Ertelendi" : "Suspended")
                              }
                            </span>
                          </div>
                          <div className="space-y-1">
                            <h5 className="font-bold text-gray-800 text-xs">{inq.companyName} • {inq.contactName}</h5>
                            <p className="text-[10px] text-gray-500 font-mono">
                              {inq.classification} • {inq.submitDate.split(" ")[0]}
                            </p>
                            <p className="text-[10px] text-military-800 font-mono bg-military-50/50 py-1 px-1.5 rounded border border-military-100/40">
                              Ø {inq.innerDiameter} × {inq.thickness}T × {inq.length}mm
                            </p>
                          </div>
                          
                          {/* Manager official memo/feedback display */}
                          <div className="bg-kraft-50/60 rounded-lg p-2.5 border border-kraft-150 space-y-1">
                            <span className="block text-[8px] font-bold text-kraft-700 uppercase tracking-widest font-mono">
                              {language === "ko" ? "수원지관 대응 검토 피드백" : language === "tr" ? "MÜHENDİSLİK GERİ BİLDİRİMİ" : "TECHNICAL TEAM FEEDBACK"}
                            </span>
                            <p className="text-[10.5px] text-gray-700 leading-normal font-sans font-medium whitespace-pre-line">
                              {inq.managerMemo || (language === "ko" ? "대표 영업부 전결 검토가 안전하게 보증 진행 중입니다." : language === "tr" ? "Teknik ekibimiz talebinizi değerlendirmektedir." : "Our industrial sales department is currently reviewing your specifications.")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-400 text-[11px] font-light">
                      {language === "ko" ? (
                        <>
                          🔍 입력하신 정보로 등록된 문의 내역이 없습니다.<br />
                          <span className="text-[9px] text-gray-400 block mt-1">성함이나 회사명을 정확히 기재하셨는지 다시 검토해 주세요.</span>
                        </>
                      ) : language === "tr" ? (
                        <>
                          🔍 Girilen bilgilere ait kayıt bulunamadı.<br />
                          <span className="text-[9px] text-gray-400 block mt-1">Lütfen şirket veya kişi adını doğru girdiğinizden emin olun.</span>
                        </>
                      ) : (
                        <>
                          🔍 No matching inquiry records found.<br />
                          <span className="text-[9px] text-gray-400 block mt-1">Please verify that spelling of the name or company is correct.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Contact Specs */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-150 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 font-mono tracking-widest uppercase pb-2 border-b border-gray-200">
                OFFICIAL COORDINATES
              </h4>
              <div className="space-y-3.5 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-military-700 shrink-0" />
                  <span>{language === "ko" ? "주식회사 수원지관산업" : "SUWON PAPER CONE & TUBE MFG. CO., LTD."}</span>
                </p>
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-military-700 shrink-0" />
                  <span>{language === "ko" ? "전화: 031-353-7034" : "Phone: +82-31-353-7034"}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-military-700 shrink-0" />
                  <span>{language === "ko" ? "팩스: 031-353-7369" : "Fax: +82-31-353-7369"}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-military-700 shrink-0" />
                  <span>{language === "ko" ? "이메일: swpaper@hanmail.net" : "Email: swpaper@hanmail.net"}</span>
                </p>
                <p className="flex items-start gap-2 leading-relaxed">
                  <MapPin className="w-4 h-4 text-military-700 shrink-0 mt-0.5" />
                  <span>{t.contactInfo.addressLabel}</span>
                </p>
              </div>
            </div>

            {/* ADMIN ACCESS MODAL TRIGGER (관리자 모드 접속) */}
            <div className="p-6 rounded-2xl border border-gray-150 bg-white shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 font-bold tracking-wider">REPRESENTATIVE CHANNEL</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                {language === "ko"
                  ? "관리자가 수신 고객 문의 전산 리포트를 관리하고 처리상태를 업데이트하는 법인전용 통제 장치입니다."
                  : language === "tr"
                    ? "Yöneticilerin müşteri taleplerini yönetmesi ve sipariş durumlarını güncellenmesi için özel yetkili yönetim panelidir."
                    : "Authorized administrative console for managing client specifications and real-time status updates."}
              </p>
              
              <button
                type="button"
                onClick={() => {
                  setIsAdminPanelOpen(!isAdminPanelOpen);
                  setIsAdminLoggedIn(false);
                  setAdminPassword("");
                  setAdminError("");
                  setActiveAdminInquiry(null);
                  loadInquiriesFromDB();
                }}
                className="w-full py-2.5 rounded-lg bg-military-850 hover:bg-military-900 duration-200 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-1"
              >
                <Lock className="w-3.5 h-3.5 text-kraft-350" />
                {isAdminPanelOpen 
                  ? (language === "ko" ? "관리자 판넬 닫기" : "Close Admin Panel") 
                  : (language === "ko" ? "관리자 모드 (Admin Portal)" : "Admin Portal")}
              </button>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* ADMINISTRATOR INTERACTIVE PANEL                          */}
        {/* ======================================================== */}
        {isAdminPanelOpen && (
          <div className="border border-military-700 rounded-3xl p-6 sm:p-8 bg-military-950 text-white shadow-2xl relative overflow-hidden mt-12 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="absolute top-0 right-0 w-36 h-36 bg-kraft-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex h-6 justify-between items-center pb-4 border-b border-military-800 mb-6">
              <span className="text-xs font-mono text-kraft-300 font-bold tracking-widest">
                SUWON MANUFACTURING SECURE PORTAL
              </span>
              <span className="text-[10px] font-mono text-gray-500">v1.1-PrivateAccess</span>
            </div>

            {!isAdminLoggedIn ? (
              // 1. Password Verification Form
              <form onSubmit={handleAdminVerify} className="max-w-md mx-auto py-8 text-center space-y-4">
                <div className="p-3 bg-military-800 rounded-full w-fit mx-auto">
                  <Lock className="w-6 h-6 text-kraft-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-100">최고관리자 보안 인증</h4>
                  <p className="text-[11px] text-gray-400">승인된 최고 관리자만 진입할 수 있는 전용 관리자 포털입니다.</p>
                </div>
                
                <div className="flex gap-2 justify-center max-w-sm mx-auto">
                  <input
                    type="password"
                    placeholder="최고관리자 암호 입력"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="flex-1 text-xs p-2.5 rounded-lg bg-military-900 border border-military-700 text-white outline-none focus:border-kraft-500"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-lg bg-kraft-500 hover:bg-kraft-600 text-gray-950 font-bold text-xs cursor-pointer"
                  >
                    확인
                  </button>
                </div>
                {adminError && (
                  <p className="text-2xs text-rose-400 font-bold flex items-center gap-1 justify-center mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {adminError}
                  </p>
                )}
              </form>
            ) : (
              // 2. Active Logged-In Admin Dashboard
              <div className="space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-military-800 pb-4">
                  <div className="text-left">
                    <h4 className="text-base font-bold text-kraft-300 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-kraft-400 animate-pulse" />
                      인보이스 및 예약 문의 전산 리포트 센터
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1">접수된 문의 내역의 세금계산서, 발행상태, 담당자 메모를 전결 처리합니다.</p>
                  </div>
                  
                  {/* CSV Export tool for seamless Google Sheets integration! */}
                  <button
                    onClick={downloadCSV}
                    className="py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow cursor-pointer flex items-center gap-1.5 self-start"
                  >
                    <Download className="w-4 h-4 text-white" />
                    CSV 다운로드 (Google Sheets 연동용)
                  </button>
                </div>

                {/* Google Workspace Integration Dashboard Panel */}
                <div className="p-5 rounded-2xl bg-military-900 border border-military-850 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-kraft-530/10 text-kraft-400 rounded-xl border border-kraft-530/20">
                        <Cloud className="w-5 h-5 text-kraft-400 font-bold" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-gray-100 flex items-center gap-1.5">
                          Google Drive & Sheets 클라우드 연동 제어
                          {googleToken ? (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 py-0.5 px-2 rounded-full font-mono font-bold">
                              연동중 (Connected)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-military-800 text-gray-400 py-0.5 px-2 rounded-full font-mono">
                              미연동 (Disconnected)
                            </span>
                          )}
                        </h5>
                        <p className="text-[11px] text-gray-400 font-light mt-0.5">
                          상담신청 데이터를 구글 드라이브(도면/사진 폴더)와 스프레드시트에 실시간 연결 및 일괄 동기화하는 보안 터널 관리자 모드입니다.
                        </p>
                      </div>
                    </div>

                    {/* Left/Right actions based on login state */}
                    <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                      {isSyncing ? (
                        <div className="flex items-center gap-2 text-xs text-kraft-350 bg-military-850 px-3 py-2 rounded-lg">
                          <Loader2 className="w-4 h-4 animate-spin text-kraft-350" />
                          <span>연동 동기화 처리중...</span>
                        </div>
                      ) : !googleToken ? (
                        <button
                          type="button"
                          onClick={handleGoogleLogin}
                          className="py-2 px-4 rounded-lg bg-kraft-500 hover:bg-kraft-600 text-gray-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow"
                        >
                          <Cloud className="w-4 h-4" />
                          구글 계정 연동 로그인
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          {googleUser && (
                            <div className="flex items-center gap-2 bg-military-850/80 p-1.5 pr-3 rounded-lg border border-military-800 text-left">
                              {googleUser.photoURL ? (
                                <img
                                  src={googleUser.photoURL}
                                  alt="Profile"
                                  className="w-5 h-5 rounded-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="p-1 bg-military-900 rounded-full text-kraft-400">
                                  <User className="w-3.5 h-3.5" />
                                </div>
                              )}
                              <span className="text-[11px] text-gray-200 font-medium truncate max-w-[120px]">
                                {googleUser.displayName || googleUser.email}
                              </span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={handleGoogleLogout}
                            title="구글 계정 연동 해제"
                            className="p-2 rounded-lg bg-military-850 hover:bg-rose-950/40 text-gray-400 hover:text-rose-400 transition-all cursor-pointer border border-military-800"
                          >
                            <LogOut className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {googleToken && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3.5 border-t border-military-850/60 items-center">
                      <div className="md:col-span-6 flex flex-col sm:flex-row gap-4">
                        {/* Auto-sync configuration toggle */}
                        <label className="flex items-center gap-2 bg-military-850/40 py-2 px-3 rounded-xl border border-military-800/50 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={autoSyncEnabled}
                            onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                            className="rounded border-military-700 bg-military-900 text-kraft-500 focus:ring-opacity-40 focus:ring-kraft-550 h-3.5 w-3.5 accent-kraft-500 cursor-pointer"
                          />
                          <span className="text-2xs font-bold text-gray-300">
                            신규 제출 건 실시간 자동 동기화 활성화
                          </span>
                        </label>
                      </div>

                      <div className="md:col-span-6 flex justify-end gap-2 shrink-0">
                        {/* Open spreadsheet link */}
                        <a
                          href="https://docs.google.com/spreadsheets"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-lg bg-military-850 hover:bg-military-800 text-kraft-350 text-2xs font-bold duration-150 flex items-center gap-1 border border-military-750"
                        >
                          <FileText className="w-3.5 h-3.5 text-kraft-400" />
                          구글 스프레드시트 이동
                        </a>

                        {/* Bulk database sync backup */}
                        <button
                          type="button"
                          onClick={handleBulkSync}
                          disabled={isSyncing}
                          className="py-2 px-3.5 rounded-lg bg-kraft-500 hover:bg-kraft-600 font-bold text-gray-950 text-2xs cursor-pointer flex items-center gap-1.5 transition-all shadow-md active:scale-95 disabled:scale-100 disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                          전체 수주대장 동기화 (Bulk Sync)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main inquiries Table list */}
                {selectedInquiryIds.length > 0 && (
                  <div className="bg-rose-950/30 border border-rose-900/40 p-3.5 rounded-xl space-y-3 animate-in slide-in-from-top-2 duration-150">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span className="text-xs font-semibold text-rose-300">
                        선택된 항목: <strong className="font-mono text-white bg-rose-900/50 py-0.5 px-2 rounded">{selectedInquiryIds.length}</strong>개 (부적절한 도배글 또는 스팸 일괄 선별)
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiryIds([])}
                          className="py-1 px-3 rounded text-[10px] bg-military-800 hover:bg-military-750 text-gray-300 font-bold transition-all cursor-pointer"
                        >
                          선택 해제
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="py-1 px-3 rounded text-[10px] bg-rose-600 hover:bg-rose-750 text-white font-bold transition-all cursor-pointer flex items-center gap-1 shadow-md"
                        >
                          <Trash2 className="w-3 h-3" />
                          선택 삭제 ({selectedInquiryIds.length}개)
                        </button>
                      </div>
                    </div>

                    {showDeleteConfirm && (
                      <div className="p-3 rounded-lg bg-rose-950/70 border border-rose-900/60 flex flex-col sm:flex-row justify-between sm:items-center gap-3 animate-in fade-in duration-150">
                        <div className="space-y-0.5 text-left">
                          <p className="text-xs font-bold text-rose-200">정말로 선택된 {selectedInquiryIds.length}개의 문의 내역을 영구 삭제하시겠습니까?</p>
                          <p className="text-[10px] text-rose-350/80">이 작업은 로컬 장치 데이터베이스에서 즉각 제거되어 복구가 불가합니다.</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="py-1 px-2 text-[10px] bg-military-850 hover:bg-military-800 text-gray-300 rounded font-bold cursor-pointer"
                          >
                            보존
                          </button>
                          <button
                            type="button"
                            onClick={handleDeleteSelected}
                            className="py-1 px-2.5 text-[10px] bg-rose-600 hover:bg-rose-700 text-white rounded font-bold cursor-pointer"
                          >
                            영구 삭제
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="overflow-x-auto border border-military-800 rounded-xl bg-military-900">
                  <table className="w-full text-[11px] text-left border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-military-850 border-b border-military-800 text-gray-300 font-mono">
                        <th className="py-3 px-3 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={allInquiries.length > 0 && selectedInquiryIds.length === allInquiries.length}
                            onChange={handleToggleSelectAll}
                            className="rounded border-military-700 bg-military-900 text-kraft-500 focus:ring-opacity-40 focus:ring-kraft-550 cursor-pointer h-3.5 w-3.5 accent-kraft-500"
                          />
                        </th>
                        <th className="py-3 px-3">고유번호</th>
                        <th className="py-3 px-3">접수시간</th>
                        <th className="py-3 px-4">회사명</th>
                        <th className="py-3 px-4">담당자</th>
                        <th className="py-3 px-4">구분</th>
                        <th className="py-3 px-4">규격 (내경/두께/길이)</th>
                        <th className="py-3 px-4">수량</th>
                        <th className="py-3 px-4">처리상태</th>
                        <th className="py-3 px-4 text-center">전결변경</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-military-800/80 text-gray-300 font-sans">
                      {allInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="py-8 text-center text-gray-500 font-light">
                            새 접수 내역이 비어있습니다.
                          </td>
                        </tr>
                      ) : (
                        allInquiries.map((inq) => (
                          <tr key={inq.id} className={`hover:bg-military-800/40 transition-colors ${selectedInquiryIds.includes(inq.id) ? "bg-military-800/20" : ""}`}>
                            <td className="py-3 px-3 text-center">
                              <input
                                type="checkbox"
                                checked={selectedInquiryIds.includes(inq.id)}
                                onChange={() => handleToggleSelectId(inq.id)}
                                className="rounded border-military-700 bg-military-900 text-kraft-500 focus:ring-opacity-40 focus:ring-kraft-550 cursor-pointer h-3.5 w-3.5 accent-kraft-500"
                              />
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-kraft-300">{inq.id}</td>
                            <td className="py-3 px-3 font-mono text-gray-400">{inq.submitDate}</td>
                            <td className="py-3 px-4 font-bold text-gray-100">{inq.companyName}</td>
                            <td className="py-3 px-4">{inq.contactName}</td>
                            <td className="py-3 px-4 text-kraft-350 font-semibold">{inq.classification}</td>
                            <td className="py-3 px-4 text-gray-300">
                              <span className="font-mono">{inq.innerDiameter} / {inq.thickness} / {inq.length}mm</span>
                              {inq.files && inq.files.length > 0 && (
                                <span className="inline-flex items-center gap-0.5 ml-1.5 bg-kraft-500/10 text-kraft-400 py-0.5 px-1.5 rounded text-[9px] font-mono" title={`${inq.files.length}개 파일 첨부됨`}>
                                  <Paperclip className="w-2.5 h-2.5 shrink-0" />
                                  {inq.files.length}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-kraft-300">{inq.quantity}</td>
                            <td className="py-3 px-4">
                              <span className={`py-0.5 px-2 rounded-full text-[10px] sm:text-2xs font-bold leading-none ${
                                inq.status === "대기중" ? "bg-amber-500/20 text-amber-300" :
                                inq.status === "검토중" ? "bg-blue-500/20 text-blue-300" :
                                inq.status === "답변완료" ? "bg-emerald-500/20 text-emerald-300" :
                                "bg-rose-500/20 text-rose-300"
                              }`}>
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => setActiveAdminInquiry(inq)}
                                className="py-1 px-2.5 rounded bg-military-700 hover:bg-kraft-500 hover:text-gray-950 duration-150 text-[10px] font-bold cursor-pointer font-sans"
                              >
                                상세전결
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* 3. Detail decision maker popover editor (상세 전결 에디터) */}
                {activeAdminInquiry && (
                  <form onSubmit={handleUpdateInquiry} className="p-5 rounded-2xl bg-military-900 border border-military-700 space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center border-b border-military-800 pb-2">
                      <span className="font-bold text-xs text-kraft-300">
                        전결 처리 에디터: {activeAdminInquiry.companyName} ({activeAdminInquiry.id})
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveAdminInquiry(null)}
                        className="text-2xs text-gray-400 hover:text-white"
                      >
                        취소
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Control 1: Status */}
                      <div className="space-y-1 text-left">
                        <label className="block text-2xs font-bold text-gray-400">처리 상태 분류</label>
                        <select
                          value={activeAdminInquiry.status}
                          onChange={(e) => setActiveAdminInquiry({
                            ...activeAdminInquiry,
                            status: e.target.value as any
                          })}
                          className="w-full text-xs p-2 rounded bg-military-850 border border-military-700 text-white outline-none focus:border-kraft-500"
                        >
                          <option value="대기중">대기중 (Request Idle)</option>
                          <option value="검토중">검토중 (Analysis Underway)</option>
                          <option value="답변완료">답변완료 (Consultation Resolved)</option>
                          <option value="반려">반려 (Dismissed)</option>
                        </select>
                      </div>

                      {/* Control 2: Quote flag */}
                      <div className="space-y-1 text-left">
                        <label className="block text-2xs font-bold text-gray-400">견적서 발행 여부</label>
                        <select
                          value={activeAdminInquiry.quoteIssued}
                          onChange={(e) => setActiveAdminInquiry({
                            ...activeAdminInquiry,
                            quoteIssued: e.target.value as any
                          })}
                          className="w-full text-xs p-2 rounded bg-military-850 border border-military-700 text-white outline-none focus:border-kraft-500"
                        >
                          <option value="Y">Y (견적 발행됨)</option>
                          <option value="N">N (미발행)</option>
                        </select>
                      </div>

                      {/* Control 3: Tax Invoice flag */}
                      <div className="space-y-1 text-left">
                        <label className="block text-2xs font-bold text-gray-400">세금계산서 청구 발행 여부</label>
                        <select
                          value={activeAdminInquiry.taxInvoiceIssued}
                          onChange={(e) => setActiveAdminInquiry({
                            ...activeAdminInquiry,
                            taxInvoiceIssued: e.target.value as any
                          })}
                          className="w-full text-xs p-2 rounded bg-military-850 border border-military-700 text-white outline-none focus:border-kraft-500"
                        >
                          <option value="Y">Y (세금계산서 완료)</option>
                          <option value="N">N (대기중)</option>
                        </select>
                      </div>
                    </div>

                    {/* Coordinator memo feedback */}
                    <div className="space-y-1 text-left">
                      <label className="block text-2xs font-bold text-gray-400">담당자 인결 메모 (Manager Notes)</label>
                      <textarea
                        rows={2}
                        value={activeAdminInquiry.managerMemo}
                        onChange={(e) => setActiveAdminInquiry({
                          ...activeAdminInquiry,
                          managerMemo: e.target.value
                        })}
                        className="w-full text-xs p-2.5 rounded bg-military-850 border border-military-700 text-white outline-none focus:border-kraft-500"
                      />
                    </div>

                    {/* Attached files list in Admin panel */}
                    {activeAdminInquiry.files && activeAdminInquiry.files.length > 0 && (
                      <div className="space-y-2 text-left border-t border-military-800 pt-3">
                        <label className="block text-2xs font-bold text-kraft-350">고객 첨부파일 ({activeAdminInquiry.files.length}개)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeAdminInquiry.files.map((file, fileIdx) => {
                            const isImage = file.type.startsWith("image/");
                            return (
                              <div key={fileIdx} className="flex items-center justify-between p-2 rounded-xl bg-blank border border-military-750 text-xs text-gray-200">
                                <div className="flex items-center gap-2 overflow-hidden mr-2">
                                  {isImage ? (
                                    <div className="w-8 h-8 rounded bg-military-900 border border-offset border-military-700 overflow-hidden shrink-0 flex items-center justify-center">
                                      <img src={file.dataUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    </div>
                                  ) : (
                                    <div className="w-8 h-8 rounded bg-military-900 border border-offset border-military-700 shrink-0 flex items-center justify-center">
                                      <FileText className="w-4 h-4 text-kraft-400" />
                                    </div>
                                  )}
                                  <div className="flex flex-col overflow-hidden text-left">
                                    <span className="font-semibold text-gray-100 truncate text-[11px]" title={file.name}>{file.name}</span>
                                    <span className="text-[9px] text-gray-400 font-mono">{file.size}</span>
                                  </div>
                                </div>
                                <a
                                  href={file.dataUrl}
                                  download={file.name}
                                  className="py-1 px-2.5 bg-military-800 hover:bg-kraft-550 border border-military-700 hover:border-kraft-550 rounded hover:text-gray-950 duration-200 text-kraft-350 font-bold text-[10px] flex items-center gap-1 cursor-pointer shrink-0 transition-all"
                                >
                                  <Download className="w-2.5 h-2.5" />
                                  다운로드
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end">
                      <button
                        type="submit"
                        className="py-2 px-4 rounded bg-kraft-500 hover:bg-kraft-600 font-bold text-gray-950 text-xs cursor-pointer"
                      >
                        수정 보증 반영하기 (Save Decisions)
                      </button>
                    </div>

                  </form>
                )}

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
