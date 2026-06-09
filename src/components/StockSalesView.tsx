/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Package, 
  HelpCircle, 
  Search, 
  FileCheck, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Settings,
  Lock,
  Unlock,
  X,
  Grid,
  List,
  Image as ImageIcon,
  Eye,
  Activity,
  Maximize2,
  RefreshCw,
  Upload,
  Cloud,
  ChevronLeft,
  ChevronRight,
  CheckSquare
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getAccessToken, googleSignIn, uploadStockImageToDrive, db } from "../lib/googleWorkspace";
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

interface StockSalesViewProps {
  onTabChange: (tabId: string) => void;
  onQuotePrefill: (prodName: string, specs: string) => void;
}

interface StockItem {
  id: string;
  name: string;
  innerDia: string;
  thickness: string;
  length: string;
  quantity: string;
  condition: string;
  approxPrice: string;
  imageUrl: string;
  imageUrls?: string[];
  desc?: string;
}

const DEFAULT_STOCKS: StockItem[] = [
  {
    id: "STK-001",
    name: "A급 고강도 크라프트 포장용 지관",
    innerDia: "76.2mm (3인치)",
    thickness: "5.0mm",
    length: "1,200mm",
    quantity: "420",
    condition: "최우수",
    approxPrice: "상담 협의",
    imageUrl: "https://images.unsplash.com/photo-1589793907316-f9d994350c3e?auto=format&fit=crop&q=80&w=650",
    desc: "엄밀한 기계적 하중 테스트를 통과한 고압축 크라프트 원지 기반의 포장용 지관입니다. 내부 완충 안정성과 외부 내충격 복원력이 탁월하여 고성능 롤재 권취 및 초정밀 필름 자재 정렬 고정에 최우수 성과를 보장합니다."
  },
  {
    id: "STK-002",
    name: "탄약 포장용 지환통 시생산 잔여품 (밀봉캡 미조립)",
    innerDia: "81.0mm",
    thickness: "6.0mm",
    length: "480mm",
    quantity: "150",
    condition: "최우수 (원통보관 완료)",
    approxPrice: "특가 상담",
    imageUrl: "https://lh3.googleusercontent.com/d/1njxhdAqPbEjmGDx5oRBW2Q2k6FjRu05q",
    desc: "엄격한 대한민국 군수 및 방산 탄약 포장 규격 시방서 요건에 맞춰 공정 평가 운용한 시생산 여유분입니다. 내수 방습 가공 처리가 탄탄하게 내인되어 있으며 밀봉 알루미늄 보호 캡 부분은 결합되지 않은 원통 순정 상태입니다."
  },
  {
    id: "STK-003",
    name: "원단 권취 가이드 초력용 대경 지관",
    innerDia: "152.4mm (6인치)",
    thickness: "10.0mm",
    length: "2,000mm",
    quantity: "85",
    condition: "우수",
    approxPrice: "상담 협의",
    imageUrl: "https://images.unsplash.com/photo-1530982006241-5dbe2a3a4176?auto=format&fit=crop&q=80&w=650",
    desc: "대형 산업 직포, 특수 비닐 코팅 공장 및 필름 롤 설비에서 정밀 장력을 균등 분산하여 받쳐줄 수 있도록 보조 설계된 대경(6인치) 초고강도 공업용 마스터 지관입니다."
  },
  {
    id: "STK-004",
    name: "소경 필름 리본 권취 미니어처 지관",
    innerDia: "25.4mm (1인치)",
    thickness: "2.0mm",
    length: "800mm",
    quantity: "600",
    condition: "우수 (벌크 포장)",
    approxPrice: "상담 협의",
    imageUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=650",
    desc: "소지름 바코드 프린팅 리본, 다공 보강 테이프, 또는 소형 특수 점착 필름 가이드를 신속 권취하여 안정된 형상을 유지하는 미니어처 초경량 초점착 코어 지관입니다."
  },
  {
    id: "STK-005",
    name: "중하중 원재료 발송 보호 튜브 (하드캡 포장용)",
    innerDia: "100.0mm",
    thickness: "7.0mm",
    length: "1,500mm",
    quantity: "240",
    condition: "최우수",
    approxPrice: "상담 협의",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=650",
    desc: "선박 수송 또는 장거리 화물 탁송 시 파손되기 쉬운 금속 스핀들, 정밀 샤프트 축, 고가 원기둥 금형 등의 외부 흠집 기스 찌그러짐을 완벽하게 완충 방어해 주는 일체형 세이프가드 튜브입니다."
  }
];

const IMAGE_PRESETS = [
  { name: "기본 크라프트 포장 지관", nameEng: "Plain Kraft Packing Core", url: "https://images.unsplash.com/photo-1589793907316-f9d994350c3e?auto=format&fit=crop&q=80&w=650" },
  { name: "종합 지관 성형 라인", nameEng: "Spiral Core Molding Line", url: "https://lh3.googleusercontent.com/d/1njxhdAqPbEjmGDx5oRBW2Q2k6FjRu05q" },
  { name: "산업용 기기 및 대형 지관", nameEng: "Industrial Heavy Machinery Drum", url: "https://images.unsplash.com/photo-1530982006241-5dbe2a3a4176?auto=format&fit=crop&q=80&w=650" },
  { name: "소경 세관 정밀 코어", nameEng: "Precision Mini Spindle Tube", url: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=650" },
  { name: "출하 보관 창고 적재", nameEng: "Finished Cores Floor Warehouse", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=650" },
  { name: "연구실 측정 설비 톤", nameEng: "Calibration Lab Instruments", url: "https://lh3.googleusercontent.com/d/1iU6rDwZjaQU7_c3R9xzBmTZ4rMVQolSk" }
];

export default function StockSalesView({ onTabChange, onQuotePrefill }: StockSalesViewProps) {
  const { language, t } = useLanguage();
  
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Immersive interactive details modal state
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);

  // Administrator Mode State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  // Sub-navigation for Administrator mode
  const [adminSubView, setAdminSubView] = useState<"list" | "register">("list");
  const [gdriveInput, setGdriveInput] = useState("");
  const [gdriveFileId, setGdriveFileId] = useState("");
  const [gdriveError, setGdriveError] = useState("");

  // Storage and Initialization
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onSnapshot(
      collection(db, "stocks"),
      async (snapshot) => {
        if (!isMounted) return;

        if (snapshot.empty) {
          // If Firestore is confirmed completely empty on the server, seed the defaults
          if (!snapshot.metadata.fromCache) {
            try {
              await Promise.all(
                DEFAULT_STOCKS.map((item) => setDoc(doc(db, "stocks", item.id), item))
              );
            } catch (err) {
              console.error("Failed to seed default stocks to Firestore:", err);
            }
          } else {
            // If empty but from cache (still connecting), keep showing defaults so it's not a blank page
            setStocks(DEFAULT_STOCKS);
          }
        } else {
          const list: StockItem[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              name: data.name || "",
              innerDia: data.innerDia || "",
              thickness: data.thickness || "",
              length: data.length || "",
              quantity: data.quantity || "",
              condition: data.condition || "우수",
              approxPrice: data.approxPrice || "상담 협의",
              imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1589793907316-f9d994350c3e?auto=format&fit=crop&q=80&w=650",
              imageUrls: data.imageUrls || [],
              desc: data.desc || ""
            });
          });
          // Sort stock items by ID so they stay structured beautifully
          list.sort((a, b) => a.id.localeCompare(b.id));
          setStocks(list);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Firestore loading error:", error);
        // Fallback to DEFAULT_STOCKS in case of rules/network failure so the app doesn't break
        if (isMounted) {
          setStocks(DEFAULT_STOCKS);
          setIsLoading(false);
        }
      }
    );

    const sessionAdmin = sessionStorage.getItem("suwon_admin_auth");
    if (sessionAdmin === "true") {
      setIsAdmin(true);
    }

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const getStockTranslation = (item: StockItem) => {
    if (!item) {
      return { name: "", condition: "", price: "", desc: "" };
    }
    const id = item.id || "";
    const nameVal = item.name || "";
    const conditionVal = item.condition || "";
    const priceVal = item.approxPrice || "";
    const descVal = item.desc || "";

    // Find if there is a default template matching this ID
    const defaultItem = DEFAULT_STOCKS.find((d) => d.id === id);
    
    // Check if the administrator customized the values
    const isNameCustomized = defaultItem ? (nameVal !== defaultItem.name) : true;
    const isConditionCustomized = defaultItem ? (conditionVal !== defaultItem.condition) : true;
    const isPriceCustomized = defaultItem ? (priceVal !== defaultItem.approxPrice) : true;
    const isDescCustomized = defaultItem ? (descVal !== defaultItem.desc) : true;

    if (language === "ko") {
      return {
        name: item.name,
        condition: item.condition,
        price: item.approxPrice,
        desc: item.desc || ""
      };
    } else if (language === "tr") {
      // If customized, use the customized value directly. Otherwise, use translated preset.
      let name = isNameCustomized ? item.name : "";
      let condition = isConditionCustomized ? item.condition : "";
      let price = isPriceCustomized ? item.approxPrice : "";
      let desc = isDescCustomized ? (item.desc || "") : "";

      if (!isNameCustomized) {
        if (item.id === "STK-001") name = "A-Sınıfı Yüksek Mukavemetli Kraft Ambalaj Borusu";
        else if (item.id === "STK-002") name = "Mühimmat Kutusu İmalat Fazlası (Kapak Montajsız)";
        else if (item.id === "STK-003") name = "Büyük Ebatlı Bobin Sarım Masurası (6 İnç)";
        else if (item.id === "STK-004") name = "Mini Barkod Şeridi ve Ribon Göbeği (1 İnç)";
        else if (item.id === "STK-005") name = "Ağır Nakliye İçin Dış Çeper Koruma Kovanı";
        else name = item.name;
      }

      if (!isConditionCustomized) {
        if (item.id === "STK-001") condition = "Kusursuz (Sıfır Nem)";
        else if (item.id === "STK-002") condition = "Kusursuz (Askeri Ambalaj)";
        else if (item.id === "STK-003") condition = "Çok İyi";
        else if (item.id === "STK-004") condition = "Çok İyi (Toplu Paket)";
        else if (item.id === "STK-005") condition = "Kusursuz";
        else condition = item.condition;
      }

      if (!isPriceCustomized) {
        if (item.id === "STK-001") price = "Teklif Alın";
        else if (item.id === "STK-002") price = "Özel Fiyat";
        else if (item.id === "STK-003") price = "Teklif Alın";
        else if (item.id === "STK-004") price = "Teklif Alın";
        else if (item.id === "STK-005") price = "Teklif Alın";
        else price = item.approxPrice;
      }

      if (!isDescCustomized) {
        if (item.id === "STK-001") desc = "Mekanik basınca karşı üst düzey sönümleme sağlayan, spiral sarımlı ve yüksek sıkıştırılmış kraft mukavemetli paketleme rulosudur.";
        else if (item.id === "STK-002") desc = "Kore savunma standartlarına ve KDS 8140 şartnamesine tam uyumlu olarak üretilen boş mühimmat koruma silindiri fazlasıdır.";
        else if (item.id === "STK-003") desc = "Büyük sanayi rulolarına mukavemet sağlamak amacıyla spiral dikişli, 152.4 mm geniş kalıpta imal edilmiş endüstriyel bobin borusu.";
        else if (item.id === "STK-004") desc = "Barkod şeridi sarımları, etiketleme aparatları ve hassas makaralar için üretilmiş ince çeperli mini karton masura.";
        else if (item.id === "STK-005") desc = "Taşıma esnasında dış darbelerden kolayca hasar görebilecek pahalı silindir, metal şaft ve kalıp millerini tamamen muhafaza eden dış darbe önleyici kovan.";
        else desc = item.desc || "";
      }

      return { name, condition, price, desc };
    } else {
      // English
      let name = isNameCustomized ? item.name : "";
      let condition = isConditionCustomized ? item.condition : "";
      let price = isPriceCustomized ? item.approxPrice : "";
      let desc = isDescCustomized ? (item.desc || "") : "";

      if (!isNameCustomized) {
        if (item.id === "STK-001") name = "Grade-A High-Strength Kraft Packaging Core";
        else if (item.id === "STK-002") name = "Ammunition Container Pilot Production Overstock";
        else if (item.id === "STK-003") name = "Heavy Tension Industrial Winding Core (6-Inch)";
        else if (item.id === "STK-004") name = "Miniature Spindle Ribbon Winding Core (1-Inch)";
        else if (item.id === "STK-005") name = "Machinery Spindle Heavy Protective Packing Sleeve";
        else name = item.name;
      }

      if (!isConditionCustomized) {
        if (item.id === "STK-001") condition = "Pristine";
        else if (item.id === "STK-002") condition = "Pristine (Airtight Storage)";
        else if (item.id === "STK-003") condition = "Excellent Quality";
        else if (item.id === "STK-004") condition = "Excellent (Bulk Box)";
        else if (item.id === "STK-005") condition = "Pristine";
        else condition = item.condition;
      }

      if (!isPriceCustomized) {
        if (item.id === "STK-001") price = "Negotiable Quote";
        else if (item.id === "STK-002") price = "Specially Discounted";
        else if (item.id === "STK-003") price = "Negotiable Quote";
        else if (item.id === "STK-004") price = "Negotiable Quote";
        else if (item.id === "STK-005") price = "Negotiable Quote";
        else price = item.approxPrice;
      }

      if (!isDescCustomized) {
        if (item.id === "STK-001") desc = "High-density multi-ply kraft core optimized for heavy-duty winding reels and extreme shipping conditions.";
        else if (item.id === "STK-002") desc = "Tested ammunition container shell overflow, compliant with military specifications. Sealed waterproofing layers. Unassembled metal caps.";
        else if (item.id === "STK-003") desc = "Stiff spiral cardboard core designed to sustain deep radial wrapping stress for stretch film rolls and industrial textiles.";
        else if (item.id === "STK-004") desc = "Compact lightweight spindle core suited for printing ribbons, decorative tape spooling, and small adhesive lines.";
        else if (item.id === "STK-005") desc = "Calibrated outer sleeve designed to completely shield sensitive components, steel shafts, and costly tool mold margins during sea shipping.";
        else desc = item.desc || "";
      }

      return { name, condition, price, desc };
    }
  };

  // Google Drive sharing URL parsing parser hook
  useEffect(() => {
    if (!gdriveInput) {
      setGdriveFileId("");
      setGdriveError("");
      return;
    }

    const trimmed = gdriveInput.trim();
    
    if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) {
      setGdriveFileId(trimmed);
      setFormImageUrl(`https://lh3.googleusercontent.com/d/${trimmed}`);
      setGdriveError("");
      return;
    }

    if (trimmed.includes("lh3.googleusercontent.com/d/")) {
      const parts = trimmed.split("/d/");
      if (parts[1]) {
        const idMatched = parts[1].split(/[^a-zA-Z0-9_-]/)[0];
        if (idMatched && idMatched.length >= 25) {
          setGdriveFileId(idMatched);
          setFormImageUrl(`https://lh3.googleusercontent.com/d/${idMatched}`);
          setGdriveError("");
          return;
        }
      }
    }

    const dPattern = /\/d\/([a-zA-Z0-9_-]{25,})/;
    const matchD = trimmed.match(dPattern);
    if (matchD && matchD[1]) {
      setGdriveFileId(matchD[1]);
      setFormImageUrl(`https://lh3.googleusercontent.com/d/${matchD[1]}`);
      setGdriveError("");
      return;
    }

    const idPattern = /[?&]id=([a-zA-Z0-9_-]{25,})/;
    const matchId = trimmed.match(idPattern);
    if (matchId && matchId[1]) {
      setGdriveFileId(matchId[1]);
      setFormImageUrl(`https://lh3.googleusercontent.com/d/${matchId[1]}`);
      setGdriveError("");
      return;
    }

    setGdriveFileId("");
    setGdriveError(language === "ko" ? "올바른 구글 드라이브 공유 주소가 아닙니다." : "Invalid Google Drive sharing URL.");
  }, [gdriveInput]);

  // Admin CRUD Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Modal Form States
  const [formId, setFormId] = useState("");
  const [formName, setFormName] = useState("");
  const [formInnerDia, setFormInnerDia] = useState("");
  const [formThickness, setFormThickness] = useState("");
  const [formLength, setFormLength] = useState("");
  const [formQuantity, setFormQuantity] = useState("");
  const [formCondition, setFormCondition] = useState("최우수");
  const [formApproxPrice, setFormApproxPrice] = useState("상담 협의");
  const [formImageUrl, setFormImageUrl] = useState(IMAGE_PRESETS[0].url);
  const [formImageUrls, setFormImageUrls] = useState<string[]>([]);
  const [formDesc, setFormDesc] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // States for live Google Drive uploads for stocks
  const [gdriveToken, setGdriveToken] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [activeDetailPhotoIndex, setActiveDetailPhotoIndex] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);

  // Standalone fullscreen lightbox states
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Custom Modal Confirmation state for robust cross-origin iframe security
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    type: "danger" | "warning" | "info";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "확인",
    cancelText: "취소",
    type: "info",
    onConfirm: () => {},
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (listLength: number) => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      setActiveDetailPhotoIndex((prev) => (prev < listLength - 1 ? prev + 1 : 0));
    } else if (distance < -minSwipeDistance) {
      setActiveDetailPhotoIndex((prev) => (prev > 0 ? prev - 1 : listLength - 1));
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.72);
          resolve(compressedDataUrl);
        };
        img.onerror = () => {
          resolve(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const processImageFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(language === "ko" ? "이미지 파일만 등록할 수 있습니다." : "Only image formats are supported.");
      return;
    }

    const isCustomMain = formImageUrl && !IMAGE_PRESETS.some(p => p.url === formImageUrl);
    const currentTotal = (isCustomMain ? 1 : 0) + formImageUrls.length;
    if (currentTotal >= 5) {
      alert(language === "ko" 
        ? "사진은 대표 이미지를 포함하여 최대 5장까지만 업로드 가능합니다." 
        : "You can load up to 5 photos maximum.");
      return;
    }

    setIsUploadingImage(true);
    try {
      const compressedBase64 = await compressImage(file);
      const token = gdriveToken || getAccessToken();
      let finalUrl = compressedBase64;
      let driveSuccess = false;

      if (token) {
        try {
          const uploaded = await uploadStockImageToDrive(token, file.name, file.type, compressedBase64);
          if (uploaded && uploaded.directLink) {
            finalUrl = uploaded.directLink;
            driveSuccess = true;
          }
        } catch (gdriveErr) {
          console.warn("Drive failure, fallback to b64:", gdriveErr);
        }
      }

      const isDefaultUrl = IMAGE_PRESETS.some(p => p.url === formImageUrl) || !formImageUrl;
      
      const setAsMain = isDefaultUrl || window.confirm(
        language === "ko" 
          ? "업로드가 완수되었습니다. 본 자재 사진을 '대표 사진(Main Image)'으로 지정하시겠습니까?\n[취소] 선택 시 추가 이미지 목록에 배치됩니다."
          : "Photo loaded! Set this as your Primary representation image? (Cancel places it in supplementary list)"
      );

      if (setAsMain) {
        setFormImageUrl(finalUrl);
      } else {
        setFormImageUrls(prev => [...prev, finalUrl]);
      }

      if (driveSuccess) {
        alert(language === "ko" ? "대표 보관서 수권 저장이 전송 완료되었습니다." : "Google Drive synced successfully.");
      } else {
        alert(language === "ko" 
          ? "로컬 대통에 최적 압축 보존 완료되었습니다." 
          : "Local optimized compression completed successfully.");
      }
    } catch (err) {
      console.error("Image processing failure:", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileChangeDirect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleGdriveLogin = async () => {
    try {
      const token = await googleSignIn();
      if (token) {
        setGdriveToken(token);
        alert(language === "ko" ? "구글 드라이브 통합 인증에 성공했습니다!" : "Authorized Google Drive successfully!");
      }
    } catch (err) {
      console.error("Drive login err:", err);
      alert("Auth failed: " + String(err));
    }
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem("suwon_admin_passcode") || "swpaper7638**";
    if (passcode === storedPass) {
      setIsAdmin(true);
      sessionStorage.setItem("suwon_admin_auth", "true");
      setShowPasscodeModal(false);
      setPasscode("");
      setPasscodeError("");
      alert(language === "ko" ? "관리자 권한이 정상 부여되었습니다!" : "Admin Privileges Granted!");
    } else {
      setPasscodeError(language === "ko" ? "암호가 올바르지 않습니다." : "Wrong passcode credentials.");
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("suwon_admin_auth");
    alert(language === "ko" ? "보안 세션이 종료되었습니다." : "Logged out from master console session.");
  };

  const openAddModal = () => {
    const nextNum = stocks.length + 1;
    setFormId(`STK-${String(nextNum).padStart(3, "0")}`);
    setFormName("");
    setFormInnerDia("");
    setFormThickness("");
    setFormLength("");
    setFormQuantity("");
    setFormCondition("최우수");
    setFormApproxPrice("상담 협의");
    setFormImageUrl(IMAGE_PRESETS[0].url);
    setFormImageUrls([]);
    setFormDesc("");
    setGdriveInput("");
    setShowAddModal(true);
  };

  const openEditModal = (s: StockItem, gIdx: number) => {
    setFormId(s.id);
    setFormName(s.name);
    setFormInnerDia(s.innerDia);
    setFormThickness(s.thickness);
    setFormLength(s.length);
    setFormQuantity(s.quantity);
    setFormCondition(s.condition);
    setFormApproxPrice(s.approxPrice);
    setFormImageUrl(s.imageUrl);
    setFormImageUrls(s.imageUrls || []);
    setFormDesc(s.desc || "");
    setEditingIndex(gIdx);
    setShowEditModal(true);
  };

  const handleCreateStock = async (e: React.FormEvent) => {
    e.preventDefault();
    const newStock: StockItem = {
      id: formId || `STK-${Date.now()}`,
      name: formName || "",
      innerDia: formInnerDia || "",
      thickness: formThickness || "",
      length: formLength || "",
      quantity: formQuantity || "",
      condition: formCondition || "최우수",
      approxPrice: formApproxPrice || "상담 협의",
      imageUrl: formImageUrl || "https://images.unsplash.com/photo-1589793907316-f9d994350c3e?auto=format&fit=crop&q=80&w=650",
      imageUrls: formImageUrls || [],
      desc: formDesc || `${formName} 제품에 대한 상세한 현물 대응 긴급 수권 지관 정보입니다.`
    };
    try {
      await setDoc(doc(db, "stocks", newStock.id), newStock);
      setShowAddModal(false);
      alert(language === "ko" ? "자재가 정상 등록되었습니다." : "Product successfully categorized.");
    } catch (err) {
      console.error("Error creating stock:", err);
      alert(language === "ko" ? "자재 등록에 실패했습니다." : "Failed to register product.");
    }
  };

  const handleDeleteStock = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: language === "ko" ? "제품 삭제 경고" : "Delete Product Confirmation",
      message: language === "ko" 
        ? `제품 코드 ${id} 항목을 정말로 영구 삭제하시겠습니까?` 
        : `Are you entirely sure you want to permanently delete product profile ${id}?`,
      confirmText: language === "ko" ? "영구 삭제 실행" : "Delete Permanently",
      cancelText: language === "ko" ? "취소" : "Cancel",
      type: "danger",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "stocks", id));
          if (selectedStock && selectedStock.id === id) {
            setSelectedStock(null);
          }
        } catch (err) {
          console.error("Error deleting stock:", err);
        }
      }
    });
  };

  const handleStockInquiry = (s: StockItem) => {
    const specsString = `[제품번호: ${s.id}] 제품구분: ${s.name} / 내경: ${s.innerDia} / 두께: ${s.thickness} / 기장(L): ${s.length} / 공급 가능 수량: ${s.quantity}개 / 상태: ${s.condition} / 공급요구: ${s.approxPrice}`;
    onQuotePrefill(language === "ko" ? "즉시 출고 가능 제품 공급 상담" : "Product Direct Supply Inquiry", specsString);
    onTabChange("contact");
  };

  const handleUpdateStock = async (e: React.FormEvent) => {
    e.preventDefault();
    const editedStock: StockItem = {
      id: formId || "",
      name: formName || "",
      innerDia: formInnerDia || "",
      thickness: formThickness || "",
      length: formLength || "",
      quantity: formQuantity || "",
      condition: formCondition || "최우수",
      approxPrice: formApproxPrice || "상담 협의",
      imageUrl: formImageUrl || "https://images.unsplash.com/photo-1589793907316-f9d994350c3e?auto=format&fit=crop&q=80&w=650",
      imageUrls: formImageUrls || [],
      desc: formDesc || ""
    };
    try {
      await setDoc(doc(db, "stocks", formId), editedStock);
      setShowEditModal(false);
      setEditingIndex(null);
    } catch (err) {
      console.error("Error updating stock:", err);
      alert(language === "ko" ? "수정에 실패했습니다." : "Failed to update product.");
    }
  };

  const resetToDefault = () => {
    setConfirmModal({
      isOpen: true,
      title: language === "ko" ? "가상 자재 데이터 복원" : "Restore Standard Preset List",
      message: language === "ko"
        ? "수원지관 기본 규격 제품 리스트로 명세를 초기화 복구하시겠습니까? 추가하셨던 커스텀 도안은 모두 삭제됩니다."
        : "Reset products collection to default catalog templates? (Any user additions will be removed)",
      confirmText: language === "ko" ? "초기화 진행" : "Restore Presets Now",
      cancelText: language === "ko" ? "취소" : "Cancel",
      type: "warning",
      onConfirm: async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "stocks"));
          for (const docSnap of querySnapshot.docs) {
            await deleteDoc(doc(db, "stocks", docSnap.id));
          }
          for (const defaultItem of DEFAULT_STOCKS) {
            await setDoc(doc(db, "stocks", defaultItem.id), defaultItem);
          }
        } catch (err) {
          console.error("Error resetting to default preset list:", err);
        }
      }
    });
  };

  const filteredStocks = stocks.filter(s => {
    if (!s) return false;
    const term = searchTerm.toLowerCase();
    const ltr = getStockTranslation(s);
    return (
      (ltr.name || "").toLowerCase().includes(term) ||
      (s.id || "").toLowerCase().includes(term) ||
      (s.innerDia || "").toLowerCase().includes(term) ||
      (ltr.condition || "").toLowerCase().includes(term)
    );
  });

  const renderImageManager = () => {
    const isCustomMain = formImageUrl && !IMAGE_PRESETS.some(p => p.url === formImageUrl);
    const currentTotal = (isCustomMain ? 1 : 0) + formImageUrls.length;
    return (
      <div 
        className={`space-y-4 border p-4.5 rounded-2xl transition-all duration-200 text-left ${
          isDragActive 
            ? "border-indigo-500 bg-indigo-50/60 ring-4 ring-indigo-200/50 scale-[1.01]" 
            : "border-gray-200 bg-gray-50/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-between items-center">
          <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            📸 {language === "ko" ? "자재 사진 드래그 업로드 관리" : "DND Image Upload Manager"}
          </label>
        </div>

        {/* 1. Google Drive Connector Mini Status */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white border border-gray-150 rounded-xl shadow-3xs text-xs">
          <div className="flex items-center gap-2 text-xs">
            <div className={`p-1.5 rounded-lg text-white ${gdriveToken ? "bg-emerald-600 animate-pulse" : "bg-slate-400"}`}>
              {isUploadingImage ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Cloud className="w-3.5 h-3.5" />
              )}
            </div>
            <div className="text-left leading-tight text-xs">
              <span className="block text-[10px] font-bold text-gray-900">
                {gdriveToken ? (language === "ko" ? "구글 드라이브 통합인증 완료" : "Authorized GDrive Integration Active") : (language === "ko" ? "로컬 임시 단독 가동" : "Local-first optimized backup")}
              </span>
              <span className="text-[9px] text-gray-400 font-light block leading-none mt-0.5">
                {gdriveToken ? (language === "ko" ? "구글 정식 폴더 업로드 활성화" : "Automated cloud upload active") : (language === "ko" ? "로컬 브라우저 세션 영구 보관" : "Cached optimized base64 format")}
              </span>
            </div>
          </div>
          {!gdriveToken ? (
            <button
              type="button"
              onClick={handleGdriveLogin}
              className="py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold cursor-pointer transition-all shrink-0 active:scale-95 border-0"
            >
              {language === "ko" ? "구글 클라우드 로그인" : "Link Google Drive"}
            </button>
          ) : (
            <div className="flex items-center gap-2 shrink-0 text-xs">
              <span className="text-[10px] text-emerald-700 font-bold">● Active</span>
              <button
                type="button"
                onClick={() => setGdriveToken(null)}
                className="py-1 px-2 text-[9px] bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-all cursor-pointer border-0"
              >
                {language === "ko" ? "해제" : "Unlink"}
              </button>
            </div>
          )}
        </div>

        {/* 2. Direct File Upload Zone */}
        {currentTotal < 5 ? (
          <div 
            className={`border-2 border-dashed p-5 rounded-xl text-center bg-white relative transition-all duration-300 ${
              isDragActive 
                ? "border-indigo-500 bg-indigo-50/40 font-bold" 
                : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50/50"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              disabled={isUploadingImage}
              onChange={handleFileChangeDirect}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <Upload className={`w-8 h-8 text-indigo-500 ${isUploadingImage ? "animate-bounce" : ""}`} />
              <p className="text-[11px] text-gray-750 font-bold">
                {isUploadingImage 
                  ? (language === "ko" ? "고품질 최적 수치 보완 압축 중..." : "Downscaling assets scales in progress...") 
                  : (language === "ko" ? "현물 이미지를 여기에 놓거나 클릭" : "Drop physical asset here or click to choose")}
              </p>
              <span className="text-[9px] text-gray-450 leading-normal font-light">
                {language === "ko" ? "용량 압축 엔진을 거쳐, 대형 원본도 슬라브에 즉시 정합 등록됩니다." : "Images are automatically optimized to avoid local caching memory overflow."}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-center text-[10.5px] font-bold">
            🔒 {language === "ko" ? "이미지 슬롯 한도 초과 (대표 포함 다중 총 5장)" : "Capped maximum physical slot capacity (5 photos limit)."}
          </div>
        )}

        {/* 3. Integrated Photo Slots Manager */}
        <div className="space-y-2 text-left bg-white p-3 rounded-xl border border-gray-150 text-xs font-normal">
          <div className="flex justify-between items-center pb-1 border-b border-gray-100">
            <span className="text-[10px] text-gray-450 font-extrabold uppercase tracking-wider block">
              🖼️ {language === "ko" ? `등록된 사진 대장 (상황: ${currentTotal} / 5장)` : `Registered Slides Gallery (${currentTotal} of 5 images)`}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {/* Slot 1: Representative Main Photo */}
            <div className={`relative aspect-square rounded-lg overflow-hidden border-2 flex items-center justify-center group bg-slate-900 transition-all ${
              formImageUrl && !IMAGE_PRESETS.some(p => p.url === formImageUrl) 
                ? "border-amber-400 ring-2 ring-amber-300 shadow-sm"
                : "border-dashed border-gray-300"
            }`}>
              {formImageUrl ? (
                <>
                  <img src={formImageUrl} className="w-full h-full object-contain pointer-events-none" referrerPolicy="no-referrer" />
                  <div className="absolute top-0.5 left-0.5 bg-amber-400 text-slate-950 text-[7px] font-black px-1 rounded shadow-3xs uppercase tracking-tight z-10 scale-90 origin-top-left">
                    ★ MAIN
                  </div>

                  {/* Representative Photo Actions */}
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1 z-10">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(language === "ko" ? "메인 대표 사진을 삭제 처리하시겠습니까?" : "Omit main reference photo?")) {
                            if (formImageUrls.length > 0) {
                              setFormImageUrl(formImageUrls[0]);
                              setFormImageUrls(formImageUrls.slice(1));
                            } else {
                              setFormImageUrl(IMAGE_PRESETS[0].url);
                            }
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white rounded p-0.5 shadow transition-all cursor-pointer border-0"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-[8px] text-gray-400 text-center leading-tight">None</span>
              )}
            </div>

            {/* Slots 2-5: Additional Extra Photos */}
            {formImageUrls.map((url, uIdx) => (
              <div key={uIdx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center group bg-slate-900 transition-all hover:border-indigo-400">
                <img src={url} className="w-full h-full object-contain pointer-events-none" referrerPolicy="no-referrer" />
                
                {/* Extra Photo Actions */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setFormImageUrls(formImageUrls.filter((_, idx) => idx !== uIdx))}
                      className="bg-red-600 hover:bg-red-700 text-white rounded p-0.5 shadow transition-all cursor-pointer border-0"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb with Admin Toggle */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-50 px-3 py-1 rounded inline-block">
              {t.stockPage.badge || "FACTORY SURPLUS STOCK SALES"}
            </span>
            <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
              {t.stockPage.title || "잔여 및 시생산 재고판매"}
            </h1>
          </div>

          {/* Admin Control Switch */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isAdmin ? (
              <div className="flex items-center gap-2 bg-military-50 border border-military-200 rounded-full py-1.5 px-4 shadow-3xs text-xs font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-military-900 font-bold font-sans">
                  {language === "ko" ? "마스터 연동 활성" : "Authorized Admin Active"}
                </span>
                <button 
                  onClick={handleLogoutAdmin}
                  className="text-[10px] bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700 px-2.5 py-1 rounded-full font-bold cursor-pointer ml-1 border-0"
                >
                  {language === "ko" ? "보안 닫기" : "Log out"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPasscodeModal(true)}
                className="flex items-center gap-1.5 border border-gray-200 hover:border-military-600 rounded-full py-1.5 px-4.5 text-xs text-gray-600 hover:text-military-900 transition-all cursor-pointer font-semibold shadow-2xs bg-white"
              >
                <Settings className="w-3.5 h-3.5 text-gray-500" />
                {t.stockPage.panelAdminUnlock || "재고 수동 관리자 로그인"}
              </button>
            )}
          </div>
        </div>

        {/* Informative Block containing absolute rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 text-left">
          
          {/* Disclaimer details: 7 columns */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 font-mono tracking-wider block">DISCLAIMER & TERMS</span>
              <h3 className="text-lg font-bold text-gray-900">
                {language === "ko" ? "창고 보유 재고 공급 안내" : language === "tr" ? "Mevcut Sanayi Masura Stok Bilgisi" : "Factory Surplus Stock Clearance"}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed font-normal">
                {t.stockPage.desc}
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 text-orange-950 flex items-start gap-3 mt-4 text-xs font-normal">
              <AlertTriangle className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block font-bold text-xs">{language === "ko" ? "공장 출고 알림 고지" : "Real-time Indicator Clearance Disclaimer"}</span>
                <p className="text-[11px] leading-relaxed text-orange-900 font-light font-normal text-left">
                  {language === "ko" 
                    ? "※ 수록된 지표는 사전 모형 테스트 및 시생산 수량 검증을 돕는 가상 수량 데이터입니다. 실제 공급 및 출고 여부는 영업팀 상담을 통하여 가인보이스 날인 후 최종 인준됩니다."
                    : language === "tr"
                      ? "※ Belirtilen adetler ve kalite seviyeleri sistem entegrasyonu içermeyen tahmini değerlerdir. Fiili teslimat durumları resmi onay ile kesinleşmektedir."
                      : "※ Listed quantities represent factory pilot run buffers. Actual inventory status, exact mechanical properties, and lead times must be confirmed explicitly during custom quote processing."}
                </p>
              </div>
            </div>
          </div>

          {/* Electronic Tax Invoice payment rules: 4 columns */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-military-900 text-white border border-military-800 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-kraft-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="space-y-4 text-left font-normal">
              <span className="text-[10px] font-mono text-kraft-350 tracking-wider font-bold uppercase">PAYMENT SAFETY SYSTEM</span>
              <h4 className="text-md sm:text-lg font-bold">
                {language === "ko" ? "B2B 인보이스 거래 방식 안내" : "Corporate Billing Methods Only"}
              </h4>
              <p className="text-gray-300 text-xs font-light leading-relaxed font-normal">
                {language === "ko" 
                  ? "본사는 기업 간 정식 B2B 거래 및 대량 제조 공급 위주로 운영되므로 일반 온라인 신용카드 결제는 지원하지 않습니다. 상세 수량 조율을 거쳐 전자세금계산서 청구 및 은행 공식 계좌 이체 방식에 의거하여 안전하게 정산 날인합니다."
                  : language === "tr"
                    ? "İşletmemiz yalnızca kurumsal B2B kurallar doğrultusunda ticaret yapar. Kredi kartı tahsilatımız yoktur, teslimatlar proforma fatura teatisini müteakip banka transferiyle yürütülür."
                    : "We strictly operate as a registered manufacturer handling B2B logistics. Online consumer payment gateways are not configured. Standard billing covers electronic tax invoicing and corporate bank transfers."}
              </p>
            </div>
            
            <div className="border-t border-military-800 pt-4 mt-4 text-xs font-medium">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-kraft-300 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-kraft-300" />
                {language === "ko" ? "전자세금계산서 정식 가용한 거래" : "Official Audited Billing Confirmed"}
              </span>
            </div>
          </div>

        </div>

        {/* Controls, Search and Mode Selection Panel */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left">
          
          {/* Search Box */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 animate-none" />
            </span>
            <input
              type="text"
              placeholder={t.stockPage.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:border-military-600 focus:ring-1 focus:ring-military-600 outline-none text-gray-900 transition-all font-normal"
            />
          </div>

          {/* View mode toggle & Admin Add action button */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto font-sans">
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openAddModal}
                  className="bg-military-850 hover:bg-military-900 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95 border-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {language === "ko" ? "제품 신규 등록" : "Register Product Item"}
                </button>
                <button
                  type="button"
                  onClick={resetToDefault}
                  title="초기 데이터 원상복구"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-xl border border-gray-200 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-none" />
                </button>
              </div>
            )}

            <div className="bg-gray-155 p-0.5 rounded-lg flex border border-gray-220 bg-gray-100/80">
              <button
                onClick={() => setDisplayMode("grid")}
                className={`p-1.5 rounded-md transition-all cursor-pointer border-0 ${
                  displayMode === "grid" 
                    ? "bg-white text-military-900 shadow-2xs font-extrabold" 
                    : "text-gray-400 hover:text-gray-600 bg-transparent"
                }`}
                title="Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDisplayMode("list")}
                className={`p-1.5 rounded-md transition-all cursor-pointer border-0 ${
                  displayMode === "list" 
                    ? "bg-white text-military-900 shadow-2xs font-extrabold" 
                    : "text-gray-400 hover:text-gray-600 bg-transparent"
                }`}
                title="List"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Selected Area Title with Sizing Info */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-left">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 border-l-4 border-military-700 pl-3">
              {language === "ko" ? "즉시 출고 가능 제품 및 공급 상담" : language === "tr" ? "Fabrika Stok Fazlası Dağıtımı" : "Surplus Clearing Inventory Deck"} ({filteredStocks.length} {language === "ko" ? "건" : "Items"})
            </h3>
          </div>
          <span className="text-2xs text-gray-400 font-normal">
            {language === "ko" ? "※ 제품 이미지를 클릭하시면 상세 규격과 공급 상담 정보를 확인하실 수 있습니다." : "※ Click on any product image to verify detailed specifications and supply consultations."}
          </span>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 mb-12 border border-gray-150 rounded-3xl bg-gray-50/30">
            <RefreshCw className="w-8 h-8 text-military-700 animate-spin mb-4" />
            <p className="text-xs text-gray-500 font-bold">
              {language === "ko" ? "제품 데이터베이스를 동기화하고 있습니다..." : "Synchronizing catalog database..."}
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && filteredStocks.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl mb-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <span className="block text-gray-900 font-bold">{language === "ko" ? "일치하는 제품 품목이 존재하지 않습니다." : "No Matching Product Items Found."}</span>
            <p className="text-xs text-gray-500 font-light mt-1 max-w-sm mx-auto leading-relaxed">
              {language === "ko" ? "검색 키워드를 단순화하거나, 하단 영업 지원팀에 특별 맞춤 가공 사양 주입을 의뢰해 주십시오." : "Try adjusting filters or navigate to the Quote simulator page to calculate brand new diameters."}
            </p>
          </div>
        )}

        {/* 1. GRID DISPLAY MODE (Album Visuals Card Deck) */}
        {displayMode === "grid" && filteredStocks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredStocks.map((s, idx) => {
              const matchingGlobalIndex = stocks.findIndex(orig => orig.id === s.id);
              const tx = getStockTranslation(s);
              return (
                <div 
                  key={s.id}
                  className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative text-left"
                >
                  {/* Photo Section */}
                  <div 
                    onClick={() => {
                      setSelectedStock(s);
                      setActiveDetailPhotoIndex(0);
                    }}
                    className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-zoom-in flex items-center justify-center select-none"
                  >
                    <img 
                      src={s.imageUrl} 
                      alt={tx.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300 pointer-events-none"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-amber-400 text-slate-950 text-[10px] py-0.5 px-2.5 rounded-md font-mono tracking-wider font-black uppercase shadow border border-white">
                      {s.id}
                    </div>
                  </div>

                  {/* Body Details Section */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                        <span className="text-kraft-800 uppercase tracking-tight bg-kraft-50 border border-kraft-100 rounded px-1.5 py-0.2">
                          ID: {s.innerDia} • T: {s.thickness}
                        </span>
                        <span className="text-gray-400">
                          {language === "ko" ? "보유량" : "StockQty"}: {s.quantity} {language === "ko" ? "개" : "PCS"}
                        </span>
                      </div>
                      <h4 
                        onClick={() => {
                          setSelectedStock(s);
                          setActiveDetailPhotoIndex(0);
                        }}
                        className="text-[13px] sm:text-sm font-extrabold text-gray-900 line-clamp-1 hover:text-military-600 transition-colors cursor-zoom-in font-normal"
                      >
                        {tx.name}
                      </h4>
                      <p className="text-[11px] sm:text-[11.5px] leading-relaxed text-gray-500 font-light line-clamp-2 font-normal">
                        {tx.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2.5">
                      <div className="leading-none text-left">
                        <span className="text-[9px] uppercase font-bold text-gray-400 block">{t.stockPage.labelStockPrice || "Estimated Price"}</span>
                        <span className="text-xs font-black text-rose-600 font-sans">{tx.price}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isAdmin && (
                          <>
                            <button
                              type="button"
                              onClick={() => openEditModal(s, matchingGlobalIndex)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-lg border border-gray-200 transition-all cursor-pointer hover:shadow-2xs"
                              title="정보 변경"
                            >
                              <Edit className="w-3 h-3 text-gray-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteStock(s.id)}
                              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 p-1.5 rounded-lg transition-all cursor-pointer hover:shadow-2xs"
                              title="삭제"
                            >
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleStockInquiry(s)}
                          className="py-1.5 px-3.5 rounded-xl bg-kraft-550 hover:bg-kraft-600 text-slate-950 text-[10.5px] font-black cursor-pointer transition-all active:scale-[0.98] inline-flex items-center gap-1 shrink-0 border border-kraft-650"
                        >
                          {t.stockPage.btnRequestPrefill || "재고 문의 연결"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. TABLE LIST DISPLAY MODE */}
        {displayMode === "list" && filteredStocks.length > 0 && (
          <div className="overflow-x-auto border border-gray-200 rounded-2xl mb-12 shadow-3xs">
            <table className="w-full border-collapse bg-white text-xs sm:text-sm text-left select-none font-normal">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <th className="py-4 px-4 w-24">Stock Code</th>
                  <th className="py-4 px-4">Product Sizing Specifications</th>
                  <th className="py-4 px-4 w-24">Inner ID</th>
                  <th className="py-4 px-4 w-20">Wall T</th>
                  <th className="py-4 px-4 w-24">Length L</th>
                  <th className="py-4 px-4 w-24">Available Qty</th>
                  <th className="py-4 px-4 w-20">Condition</th>
                  <th className="py-4 px-4 w-24 text-right">Unit Price</th>
                  <th className="py-4 px-4 w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-gray-700">
                {filteredStocks.map((s, idx) => {
                  const matchingGlobalIndex = stocks.findIndex(orig => orig.id === s.id);
                  const tx = getStockTranslation(s);
                  return (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors font-normal text-xs text-left">
                      <td className="py-3 px-4 font-mono font-bold text-gray-500">{s.id}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setSelectedStock(s);
                            setActiveDetailPhotoIndex(0);
                          }}
                          className="font-extrabold text-gray-900 border-0 bg-transparent p-0 text-left cursor-zoom-in hover:text-military-750 font-normal hover:underline"
                        >
                          {tx.name}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-600">{s.innerDia}</td>
                      <td className="py-3 px-4 font-mono text-gray-600">{s.thickness}</td>
                      <td className="py-3 px-4 font-mono text-gray-600">{s.length}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-gray-800">{s.quantity} {language === "ko" ? "개" : "PCS"}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold">
                          {tx.condition}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-rose-600 text-right">{tx.price}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5 justify-center">
                          {isAdmin && (
                            <>
                              <button
                                type="button"
                                onClick={() => openEditModal(s, matchingGlobalIndex)}
                                className="p-1 px-2 text-2xs border border-gray-200 text-gray-600 hover:bg-gray-150 rounded font-semibold cursor-pointer"
                                title="Edit"
                              >
                                <Edit className="w-3.5 h-3.5 text-gray-600 animate-none" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteStock(s.id)}
                                className="p-1 px-2 text-2xs border border-red-100 text-red-500 hover:bg-red-50 rounded font-semibold cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleStockInquiry(s)}
                            className="py-1.5 px-3 rounded-lg bg-military-850 hover:bg-military-900 text-white text-[11px] font-bold cursor-pointer transition-all active:scale-95 inline-flex items-center gap-1 border-0 bg-military-850"
                          >
                            {language === "ko" ? "상담 신청" : "Inquire"}
                            <ArrowRight className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footnote instruction reminder */}
        <div className="p-4 bg-gray-50 text-center rounded-xl text-[11px] sm:text-xs text-gray-500 font-light max-w-3xl mx-auto leading-relaxed font-normal mb-8">
          {language === "ko" 
            ? "※ 실제 공장의 시시각각 변동되는 생산 스케줄 및 선출고 협약 공급처 반출 과정에 의해 조기 매진 및 불합 정합이 일어날 수 있으니, 반드시 1단계 서식 접수를 마친 후 본사 영업팀의 수동 인준 지시 안내를 확인해주시기 바랍니다."
            : language === "tr"
              ? "※ Fabrika üretim programlarının anlık değişkenliği sebebiyle listelenen bazı rulo kalıplarında geçici tedarik gecikmeleri yaşanabilir. Lütfen siparişinizi göndermeden önce satış temsilcilerimizden teyit alınız."
              : "※ Direct clearing sales depend strictly on factory-floor storage volumes. Active batches might clear early. Registered invoices require formal dispatch authority from our shipping logistics center."}
        </div>

      </div>

      {/* 1. IMMERSIVE PRODUCT DETAILS MODAL */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-military-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left border border-gray-150 animate-in fade-in zoom-in duration-200">
            
            {/* Modal close icon */}
            <button 
              onClick={() => setSelectedStock(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-gray-100 text-gray-500 hover:text-gray-900 p-1.5 rounded-full z-20 transition-all border border-gray-200 cursor-pointer shadow-sm"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Immersive Photo Slider */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => {
                const all = [selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean);
                handleTouchEnd(all.length);
              }}
              className="relative h-[280px] sm:h-[380px] w-full bg-slate-950 flex items-center justify-center overflow-hidden cursor-zoom-in group/slider select-none"
              title="Expand View"
            >
              <img 
                src={[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean)[activeDetailPhotoIndex] || selectedStock.imageUrl} 
                alt={selectedStock.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain pointer-events-none transition-transform duration-300 md:group-hover/slider:scale-[1.02]"
              />
              
              {/* Expand tooltip overlay */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs text-white p-2 rounded-full opacity-0 md:group-hover/slider:opacity-100 transition-opacity z-20 pointer-events-none">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
              
              {/* Horizontal Gradient overlay only for text readable zone */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              
              {/* Image sliding buttons */}
              {[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean).length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const all = [selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean);
                      setActiveDetailPhotoIndex((prev) => (prev > 0 ? prev - 1 : all.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 transition-all border border-white/10 cursor-pointer active:scale-90"
                    title="Previous"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const all = [selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean);
                      setActiveDetailPhotoIndex((prev) => (prev < all.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 transition-all border border-white/10 cursor-pointer active:scale-90"
                    title="Next"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
              
              {/* Subtext info (ID & Name) */}
              <div className="absolute bottom-5 left-6 right-6 text-white text-left z-10 pointer-events-none">
                <span className="text-[11px] font-mono tracking-widest bg-amber-400 text-slate-950 py-1 px-3.5 rounded-lg font-black inline-block uppercase mb-2.5 shadow-md border-2 border-white font-normal">
                  {selectedStock.id}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-sm flex items-center gap-2">
                  {getStockTranslation(selectedStock).name}
                </h3>
              </div>
              
              {/* Page indicator */}
              {[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean).length > 1 && (
                <div className="absolute top-4 left-4 bg-black/60 text-white font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/15">
                  {(activeDetailPhotoIndex < [selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean).length ? activeDetailPhotoIndex : 0) + 1} / {[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean).length}
                </div>
              )}
            </div>

            {/* Thumbnail Selector */}
            {[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean).length > 1 && (
              <div className="bg-gray-50 border-b border-gray-150 px-6 sm:px-8 py-3 flex gap-2.5 justify-center flex-wrap select-none">
                {[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean).map((photoUrl, pIdx) => {
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setActiveDetailPhotoIndex(pIdx)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 bg-slate-900 transition-all cursor-pointer ${
                        activeDetailPhotoIndex === pIdx 
                          ? "border-amber-400 ring-2 ring-amber-300 scale-105 shadow-sm" 
                          : "border-gray-200 opacity-60 hover:opacity-100"
                      }`}
                      title={`Photo #${pIdx + 1}`}
                    >
                      <img src={photoUrl} className="w-full h-full object-contain pointer-events-none" referrerPolicy="no-referrer" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Detail Sheet */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Product Info Section Header */}
              <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-left">
                <div>
                  <h4 className="text-md sm:text-lg font-extrabold text-gray-900">
                    {language === "ko" ? "제품 상세 정보" : "Product Detail Information"}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-light mt-0.5">
                    {language === "ko" ? "선택하신 제품의 규격과 상세 공급 조건을 안내합니다." : "Detailed dimensions and default supply conditions of the chosen product item."}
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-amber-105 bg-amber-100 px-2 py-1 rounded text-amber-900 font-bold self-start sm:self-auto uppercase">
                  ACTIVE SPEC
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-left font-normal text-xs">
                <span className="text-2xs text-gray-400 font-bold uppercase tracking-wider block">{t.stockPage.labelStockDesc || "Desc"}</span>
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed whitespace-pre-wrap font-normal text-left">
                  {getStockTranslation(selectedStock).desc}
                </p>
              </div>

              {/* Dimensional Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-150 font-mono text-left font-normal text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-sans">{language === "ko" ? "내경 (ID)" : "Inner Diameter (ID)"}</span>
                  <span className="text-sm font-bold text-gray-800">{selectedStock.innerDia}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-sans">{language === "ko" ? "두께 (T)" : "Wall Thickness (T)"}</span>
                   <span className="text-sm font-bold text-gray-800">{selectedStock.thickness}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-sans">{language === "ko" ? "길이 (L)" : "Length (L)"}</span>
                  <span className="text-sm font-bold text-gray-800">{selectedStock.length}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-sans">{t.stockPage.labelStockPrice || "Estimated Price"}</span>
                  <span className="text-sm font-bold text-military-850 font-sans">{getStockTranslation(selectedStock).price}</span>
                </div>
              </div>

              {/* Inventory level Gauge */}
              <div className="space-y-2 text-left font-normal text-xs">
                <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                  <span>{t.stockPage.labelStockQty || "Quantity"}</span>
                  <span><strong className="text-military-900 font-bold font-sans">{selectedStock.quantity}</strong> {language === "ko" ? "개" : "PCS"}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-250">
                  <div 
                    className="bg-military-750 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (parseInt(selectedStock.quantity.replace(/,/g, "")) / 8))}0%` }} 
                  />
                </div>
                
                {/* Custom Procurement disclaimer matching user intent */}
                <div className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-xl space-y-1 text-left text-xs text-gray-600 font-normal mt-3">
                  <p className="text-gray-900 font-bold text-[11px] mb-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    {language === "ko" ? "제품 공급 및 보안 준수 안내" : "Product Supply Guidelines"}
                  </p>
                  <p className="text-[10.5px] leading-relaxed text-gray-600">
                    {language === "ko" 
                      ? "• 본 제품의 실제 공급 가능 수량, 단가, 납기 조건은 담당자 확인 후 안내됩니다."
                      : "• The actual supply volume, unit price, and shipping conditions are computed and shared post-consultation."
                    }
                  </p>
                  {(selectedStock.name.includes("탄약") || selectedStock.name.includes("지환통") || selectedStock.desc?.includes("군수")) && (
                    <p className="text-[10.5px] leading-relaxed text-amber-950 font-semibold">
                      {language === "ko"
                        ? "• 탄약 포장용 지환통의 경우 군용 로트표기 및 민감 표기는 제거 후 공급됩니다."
                        : "• Ammunition containers are delivered with military lot indicators/markings permanently redacted due to security protocol rules."
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4 font-normal text-xs">
                <div className="text-left leading-none">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block">{t.stockPage.labelCondition || "Status"}</span>
                  <span className="text-xs font-bold text-emerald-700">{getStockTranslation(selectedStock).condition}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="py-2.5 px-4.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all cursor-pointer bg-white"
                  >
                    {language === "ko" ? "창 닫기" : "Close"}
                  </button>
                  <button
                    onClick={() => {
                      const tgt = selectedStock;
                      setSelectedStock(null);
                      handleStockInquiry(tgt);
                    }}
                    className="py-2.5 px-6 rounded-xl bg-kraft-550 hover:bg-kraft-650 text-slate-950 text-xs font-extrabold transition-all shadow-md cursor-pointer flex items-center gap-1.5 border border-kraft-650 bg-kraft-500"
                  >
                    {t.stockPage.btnInquireStock || "해당 재고 수량 견적 신청하기"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 1.5 STANDALONE MOBILE SWIPABLE FULLSCREEN PHOTO LIGHTBOX */}
      {isLightboxOpen && selectedStock && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-60 bg-black flex flex-col justify-between items-center select-none cursor-pointer"
        >
          <div className="w-full text-right p-4 z-20">
            <button 
              type="button" 
              onClick={() => setIsLightboxOpen(false)} 
              className="text-white hover:text-gray-300 p-2 border-0 bg-transparent cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="w-full flex-1 flex items-center justify-center p-3 relative">
            <img 
              src={[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean)[activeDetailPhotoIndex] || selectedStock.imageUrl} 
              alt={selectedStock.name}
              referrerPolicy="no-referrer"
              className="max-h-[80vh] max-w-full object-contain pointer-events-none"
            />
          </div>
          
          <div className="p-6 text-center text-xs text-slate-400 font-mono select-none z-10 w-full bg-black/40">
            {[selectedStock.imageUrl, ...(selectedStock.imageUrls || [])].filter(Boolean).length > 1 && (
              <span className="block mb-2 font-sans font-semibold text-gray-200">
                {language === "ko" ? "← 모바일에서 사진을 옆으로 스와이프 하시면 다음 사진이 연계됩니다 →" : "← Swipable slides available →"}
              </span>
            )}
            <p className="font-sans font-bold text-gray-200 text-sm max-w-lg mx-auto">{getStockTranslation(selectedStock).name}</p>
          </div>
        </div>
      )}

      {/* 2. SECURITY ASSIGNMENT PASSCODE WALL DIALOG */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-military-950/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-left border border-gray-200 shadow-2xl relative text-gray-900 animate-in fade-in duration-200 font-normal">
            <button 
              onClick={() => {
                setShowPasscodeModal(false);
                setPasscode("");
                setPasscodeError("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 cursor-pointer border-0 bg-transparent"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="bg-military-50 p-3.5 rounded-2xl text-military-850 border border-military-100">
                <Lock className="w-6 h-6 text-military-800" />
              </div>
              <div className="space-y-1">
                <h3 className="text-md sm:text-base font-bold text-gray-900">
                  {language === "ko" ? "최고 권한자 보안 구역" : "Master Security Access"}
                </h3>
                <p className="text-[11px] text-gray-400 leading-normal font-light">
                  {language === "ko" ? "수원지관 공장 대장 연동을 위한 패스코드를 입력해 주십시오." : "Please verify your master padlock key to continue."}
                </p>
              </div>

              <form onSubmit={handleVerifyPasscode} className="w-full space-y-3 font-normal text-xs">
                <input 
                  type="password"
                  value={passcode}
                  required
                  placeholder={language === "ko" ? "마스터 인증 암호" : "Passcode"}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-200 focus:border-military-600 outline-none text-center font-mono font-bold text-sm bg-gray-50 text-gray-950"
                  autoFocus
                />
                
                {passcodeError && (
                  <span className="text-[10px] text-red-500 block font-semibold leading-none">{passcodeError}</span>
                )}

                <div className="flex gap-2 pt-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasscodeModal(false);
                      setPasscode("");
                      setPasscodeError("");
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs transition-all cursor-pointer bg-white"
                  >
                    {language === "ko" ? "취소" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-military-850 hover:bg-military-900 text-white text-xs transition-all cursor-pointer border-0 bg-military-850 font-bold"
                  >
                    {language === "ko" ? "보안 로그인" : "Verify Key"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 3. ADMIN ADD STOCK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-military-950/65 backdrop-blur-xs flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreateStock}
            className="bg-white rounded-3xl max-w-lg w-full p-6 text-left border border-gray-200 shadow-2xl relative text-gray-900 max-h-[90vh] overflow-y-auto"
          >
            <button 
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 cursor-pointer border-0 bg-transparent"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <Plus className="w-5 h-5 text-military-750" />
              <h3 className="text-md sm:text-lg font-bold text-gray-900">
                {language === "ko" ? "신규 자재 제품 등록 정보" : "Add Product Sizing"}
              </h3>
            </div>

            <div className="space-y-4 text-xs font-normal">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">제품코드 (ID)</label>
                  <input
                    type="text"
                    required
                    readOnly
                    value={formId}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-gray-100 outline-none text-gray-500 font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">보유 상태 구분</label>
                  <select
                    value={formCondition}
                    onChange={(e) => setFormCondition(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none cursor-pointer font-bold text-gray-700"
                  >
                    <option value="최우수">최우수 (Perfect)</option>
                    <option value="최우수 (원통보관 완료)">최우수 (원통보관 완료)</option>
                    <option value="우수">우수 (Excel)</option>
                    <option value="우수 (벌크 포장)">우수 (벌크 포장)</option>
                    <option value="보통 및 상담">보통 및 상담</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1">제품 규격 명칭 (공식 제목)</label>
                <input
                  type="text"
                  required
                  placeholder="예: 특수 대경 고장력 보호 지관"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-semibold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">내경(ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 76.2mm"
                    value={formInnerDia}
                    onChange={(e) => setFormInnerDia(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">두께(T)</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 5.0mm"
                    value={formThickness}
                    onChange={(e) => setFormThickness(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">기장(L)</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 1,200mm"
                    value={formLength}
                    onChange={(e) => setFormLength(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono text-center font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">가상 보유 수량 (개수)</label>
                  <input
                    type="number"
                    required
                    placeholder="예: 350"
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">공급가 안내 문구</label>
                  <input
                    type="text"
                    placeholder="예: 상담 협의 / 특가 상담"
                    value={formApproxPrice}
                    onChange={(e) => setFormApproxPrice(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-bold"
                  />
                </div>
              </div>

              {renderImageManager()}

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1">제품 부가 상세 설명 (상세 팝업용)</label>
                <textarea
                  rows={3}
                  placeholder="공정 세대, 방습 도공 사양, 내구성 및 적용 산업 등 상세한 가판 요건을 기록합니다."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-200 rounded-xl bg-white outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 font-bold cursor-pointer bg-white"
                >
                  {language === "ko" ? "취소" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-military-850 hover:bg-military-900 text-white font-bold cursor-pointer shadow-sm border-0 bg-military-850"
                >
                  {language === "ko" ? "등록 완료" : "Add Sizing Specs"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 4. ADMIN EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-military-950/65 backdrop-blur-xs flex items-center justify-center p-4">
          <form 
            onSubmit={handleUpdateStock}
            className="bg-white rounded-3xl max-w-lg w-full p-6 text-left border border-gray-200 shadow-2xl relative text-gray-900 max-h-[90vh] overflow-y-auto"
          >
            <button 
              type="button"
              onClick={() => {
                setShowEditModal(false);
                setEditingIndex(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 cursor-pointer border-0 bg-transparent"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <Edit className="w-5 h-5 text-military-750" />
              <h3 className="text-md sm:text-lg font-bold text-gray-900">
                {language === "ko" ? "제품 정보 변경/수정" : "Edit Product Specifications"}
              </h3>
            </div>

            <div className="space-y-4 text-xs font-normal">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">제품코드 (ID)</label>
                  <input
                    type="text"
                    required
                    readOnly
                    value={formId}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-gray-100 outline-none text-gray-500 font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">보유 상태 구분</label>
                  <select
                    value={formCondition}
                    onChange={(e) => setFormCondition(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none cursor-pointer font-bold text-gray-700"
                  >
                    <option value="최우수">최우수 (Perfect)</option>
                    <option value="최우수 (원통보관 완료)">최우수 (원통보관 완료)</option>
                    <option value="우수">우수 (Excel)</option>
                    <option value="우수 (벌크 포장)">우수 (벌크 포장)</option>
                    <option value="보통 및 상담">보통 및 상담</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1">제품 규격 명칭</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-bold text-gray-950 animate-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">내경(ID)</label>
                  <input
                    type="text"
                    required
                    value={formInnerDia}
                    onChange={(e) => setFormInnerDia(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">두께(T)</label>
                  <input
                    type="text"
                    required
                    value={formThickness}
                    onChange={(e) => setFormThickness(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">기장(L)</label>
                  <input
                    type="text"
                    required
                    value={formLength}
                    onChange={(e) => setFormLength(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono text-center font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">가상 보유 수량 (개수)</label>
                  <input
                    type="text"
                    required
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1">공급가 단가 문구</label>
                  <input
                    type="text"
                    value={formApproxPrice}
                    onChange={(e) => setFormApproxPrice(e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl bg-white outline-none font-bold"
                  />
                </div>
              </div>

              {renderImageManager()}

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1">제품 부가 지안 상세 설명</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-200 rounded-xl bg-white outline-none resize-none font-sans"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingIndex(null);
                  }}
                  className="py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 font-bold cursor-pointer bg-white"
                >
                  {language === "ko" ? "취소" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-military-850 hover:bg-military-900 text-white font-bold cursor-pointer shadow-sm border-0 bg-military-850"
                >
                  {language === "ko" ? "정보 수정 완료" : "Apply Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 5. DUAL ACTION COMFIRMATORY ALERTS */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-3xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-sm w-full p-5 text-left animate-in zoom-in-95 duration-150">
            <h4 className={`text-sm font-extrabold flex items-center gap-1.5 ${
              confirmModal.type === "danger" ? "text-rose-600" : "text-amber-600"
            }`}>
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {confirmModal.title}
            </h4>
            <p className="text-xs text-gray-600 mt-2 font-light leading-relaxed font-normal">
              {confirmModal.message}
            </p>
            <div className="mt-4 flex gap-2 justify-end text-2xs font-bold">
              <button
                type="button"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="py-1.5 px-3.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer bg-white text-2xs font-bold"
              >
                {confirmModal.cancelText}
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                }}
                className={`py-1.5 px-4.5 rounded-lg text-white cursor-pointer border-0 text-2xs font-bold ${
                  confirmModal.type === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
