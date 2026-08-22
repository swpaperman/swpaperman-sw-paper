import React, { useState, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  TrendingUp, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  Globe, 
  Sliders, 
  X,
  PlusCircle,
  HelpCircle,
  RefreshCw,
  Cpu,
  Layers,
  Radio,
  FileSpreadsheet,
  Database,
  CheckCircle2,
  AlertCircle,
  Settings,
  Download,
  LogIn,
  Upload,
  Image as ImageIcon,
  Check,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";
import { trackNewsView, trackCTAClick } from "../lib/ga4";
import { 
  DEFAULT_DEFENSE_NEWS_SHEET_ID, 
  fetchDefenseNewsFromGoogleSheet, 
  googleSignIn, 
  getAccessToken,
  db
} from "../lib/googleWorkspace";
import { collection, onSnapshot } from "firebase/firestore";
import { 
  DEFAULT_DEFENSE_NEWS, 
  DefenseNewsItem,
  getStoredDefenseNews,
  saveDefenseNewsToStorage,
  saveDefenseNewsItem,
  deleteDefenseNewsItem,
  mergeNewsSafely,
  getLocalCustomNewsMap,
  getLocalDeletedNewsIds
} from "../lib/defenseNewsStore";
import {
  getLocalizedNews,
  translateCategory,
  translateTextFallback,
  TAB_TRANSLATIONS,
  CATEGORY_TRANSLATIONS
} from "../lib/newsTranslator";

const defensePartners = [
  {
    name: "한화에어로스페이스",
    nameTr: "Hanwha Aerospace",
    nameEn: "Hanwha Aerospace",
    badge: "K-방산 화포/탄약 체계 체계업체",
    badgeEn: "Artillery & Munitions Prime Contractor",
    badgeTr: "Topçu ve Mühimmat Ana Yüklenicisi",
    link: "https://www.hanwhaaerospace.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1q04UKpLEFNpXhY5L49l5usZC7kzHaZX5"
  },
  {
    name: "풍산",
    nameTr: "Poongsan",
    nameEn: "Poongsan Corp",
    badge: "한국군 탄약 및 포병탄 주도공급",
    badgeEn: "Primary Supplier of Artillery Munitions",
    badgeTr: "Ana Topçu ve Ağır Mühimmat Tedarikçisi",
    link: "https://www.poongsan.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1IBcG1Fg2fmYoP1rqV9pa6HPigwSAw4vo"
  },
  {
    name: "삼양화학공업",
    nameTr: "Samyang Chemical",
    nameEn: "Samyang Chemical",
    badge: "K-방산 특수 화학/연막탄 제조",
    badgeEn: "Specialized Defense Chemical & Smoke Munitions",
    badgeTr: "Özel Kimyasal ve Sis Mühimmatı Üreticisi",
    link: "http://www.samyangchem.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1LiuhnDf3UFNy3gik9GlhOxUWAn1ybVhj"
  },
  {
    name: "LIG넥스원",
    nameTr: "LIG Nex1",
    nameEn: "LIG Nex1",
    badge: "해군/공군 정밀 항공유도무기 선도",
    badgeEn: "Precision Guided Munitions & Air Defense",
    badgeTr: "Hassas Güdümlü Mühimmat ve Hava Savunma",
    link: "https://www.lignex1.com/",
    logo: "https://lh3.googleusercontent.com/d/1-4Y0wX-5omGAIOH_Ih5pfVtGLIwdOxUm"
  },
  {
    name: "대한민국 국방부",
    nameTr: "MND Korea",
    nameEn: "Ministry of Defense",
    badge: "국방 정책 수립 & 국방규격 통제기관",
    badgeEn: "Defense Policy & Military Specification Authority",
    badgeTr: "Savunma Politikası ve Askeri Şartname İdaresi",
    link: "https://www.mnd.go.kr/",
    logo: "https://lh3.googleusercontent.com/d/1TMm1GB-kYqNNI3rTaKo6yLr7wd6NDKwL"
  },
  {
    name: "방위사업청",
    nameTr: "DAPA",
    nameEn: "DAPA",
    badge: "방위력개선 및 국방 군수 조달 총괄",
    badgeEn: "Defense Acquisition & Procurement Administration",
    badgeTr: "Savunma Tedarik ve Silahlanma Programı İdaresi",
    link: "https://www.dapa.go.kr/",
    logo: "https://lh3.googleusercontent.com/d/1UT5mmcEtz_gh392ncjV3jYIWIEPeBh39"
  },
  {
    name: "국방과학연구소",
    nameTr: "ADD",
    nameEn: "ADD Research",
    badge: "대한민국 국방 과학 핵심 무기 R&D",
    badgeEn: "National Defense Science Core Weapon R&D",
    badgeTr: "Milli Savunma Teknolojileri ve Silah Ar-Ge",
    link: "https://www.add.re.kr/",
    logo: "https://lh3.googleusercontent.com/d/1YeEFMNVO4g_Bs1gqDJGGTifgltIHrH8H"
  },
  {
    name: "한국항공우주산업 (KAI)",
    nameTr: "KAI Corp",
    nameEn: "Korea Aerospace Industries",
    badge: "KF-21 / FA-50 / 수리온 국산 항공기 우뚝",
    badgeEn: "KF-21 / FA-50 Aircraft & Aerospace",
    badgeTr: "KF-21 / FA-50 Havacılık ve Uçak Sanayii",
    link: "https://www.koreaaero.com/",
    logoIcon: "✈️"
  },
  {
    name: "한화시스템",
    nameTr: "Hanwha Systems",
    nameEn: "Hanwha Systems",
    badge: "방산 ICT, 에이사(AESA) 레이더 및 전술통신",
    badgeEn: "Defense ICT, AESA Radars & Tactical Networks",
    badgeTr: "Savunma Bilişimi, AESA Radar ve Taktik İletişim",
    link: "https://www.hanwhasystems.com/",
    logoIcon: "📡"
  },
  {
    name: "현대로뎀",
    nameTr: "Hyundai Rotem",
    nameEn: "Hyundai Rotem",
    badge: "K2 흑표 전차 및 지상 기동장비 원조",
    badgeEn: "K2 Black Panther Main Battle Tank & Armored Systems",
    badgeTr: "K2 Kara Panter Tankı ve Zırhlı Muharebe Sistemleri",
    link: "https://www.hyundai-rotem.co.kr/",
    logoIcon: "⚙️"
  },
  {
    name: "빅텍",
    nameTr: "Victek",
    nameEn: "Victek Co.",
    badge: "방산 전자전 시스템 & 피아식별 군인프라",
    badgeEn: "Electronic Warfare & IFF Tactical Systems",
    badgeTr: "Elektronik Harp ve IFF Askeri Sistemleri",
    link: "https://www.victek.co.kr/",
    logoIcon: "⚡"
  },
  {
    name: "기아 군수차량",
    nameTr: "Kia Military Veh.",
    nameEn: "Kia Military Vehicles",
    badge: "한국형 소형전술차(KLTV) & 군용 트럭 명가",
    badgeEn: "Light Tactical Vehicles (KLTV) & Military Transports",
    badgeTr: "Hafif Taktik Araçlar (KLTV) ve Askeri Kamyonlar",
    link: "https://military.kia.com",
    logoIcon: "🚚"
  }
];

type NewsArticle = DefenseNewsItem;

interface NewsViewProps {
  onTabChange: (tab: string) => void;
}

export default function NewsView({ onTabChange }: NewsViewProps) {
  const { language, t } = useLanguage();
  const { isAdmin, loginAdmin, logoutAdmin: contextLogoutAdmin } = useAdmin();

  // Firestore defense_news synchronized state
  const [firestoreArticles, setFirestoreArticles] = useState<DefenseNewsItem[]>([]);

  // Load from LocalStorage or Fallback to Google Sheet factual news
  const [articles, setArticles] = useState<DefenseNewsItem[]>(() => {
    return getStoredDefenseNews();
  });

  // Real-time Firestore sync listener for defense news
  useEffect(() => {
    try {
      const q = collection(db, "defense_news");
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: DefenseNewsItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as DefenseNewsItem);
          });
          setFirestoreArticles(list);
          if (list.length > 0) {
            setArticles((prev) => {
              const customMap = getLocalCustomNewsMap();
              const deletedIds = getLocalDeletedNewsIds();
              return mergeNewsSafely(prev, customMap, list, deletedIds);
            });
          }
        },
        (err) => {
          console.warn("Firestore defense_news subscription error:", err);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn("Firestore initialization warning:", err);
    }
  }, []);

  // Save to LocalStorage whenever articles change
  useEffect(() => {
    saveDefenseNewsToStorage(articles);
  }, [articles]);

  // Google Sheets Synchronization States
  const [sheetId, setSheetId] = useState<string>(() => {
    return localStorage.getItem("sw_defense_sheet_id") || DEFAULT_DEFENSE_NEWS_SHEET_ID;
  });
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);
  const [sheetSyncError, setSheetSyncError] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => {
    return localStorage.getItem("sw_defense_last_sync_time") || "매일 아침 08:00 자동 동기화 활성 (최신 100% 팩트 연동)";
  });
  const [isSheetSettingsOpen, setIsSheetSettingsOpen] = useState(false);
  const [isPermissionGuideOpen, setIsPermissionGuideOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteInputText, setPasteInputText] = useState("");
  const [sheetInputVal, setSheetInputVal] = useState(sheetId);
  const [googleUserEmail, setGoogleUserEmail] = useState<string | null>(null);

  // Synchronize from Google Sheet - with strict custom edits preservation!
  const syncWithGoogleSheet = async (forceAuth = false) => {
    setIsSyncingSheet(true);
    setSheetSyncError(null);

    let token = getAccessToken();

    // If explicit auth requested or token missing when forced
    if (forceAuth && !token) {
      try {
        const signResult = await googleSignIn();
        if (signResult) {
          token = signResult.accessToken;
          if (signResult.user.email) {
            setGoogleUserEmail(signResult.user.email);
          }
        }
      } catch (authErr: any) {
        console.warn("Google Auth popup bypassed/failed:", authErr);
        setSheetSyncError("구글 팝업 인증 제한됨 — 구글 시트에서 [공유]를 '링크가 있는 모든 사용자(뷰어)'로 설정하시면 로그인 없이 100% 자동 동기화됩니다.");
      }
    }

    try {
      const result = await fetchDefenseNewsFromGoogleSheet(sheetId, token);
      if (result.success && result.articles.length > 0) {
        // Merge fetched sheet articles into state while strictly preserving user-customized items
        setArticles((prev) => {
          const customMap = getLocalCustomNewsMap();
          const deletedIds = getLocalDeletedNewsIds();
          return mergeNewsSafely(result.articles, customMap, firestoreArticles, deletedIds);
        });

        const nowTimeStr = `${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
        setLastSyncTime(nowTimeStr);
        localStorage.setItem("sw_defense_last_sync_time", nowTimeStr);
        setSheetSyncError(null);
        showNotification(`구글 시트(K-방산 뉴스 모니터링)에서 ${result.articles.length}건의 최신 뉴스를 성공적으로 동기화했습니다!`);
      } else {
        if (result.error) {
          setSheetSyncError(result.error);
        } else {
          showNotification("구글 시트에 신규 데이터가 없거나 이미 최신 상태입니다.");
        }
      }
    } catch (err: any) {
      console.error("Sheet sync error:", err);
      setSheetSyncError("구글 시트 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsSyncingSheet(false);
    }
  };

  // Handle direct paste sync (from Google Sheets or Excel copy-paste)
  const handlePasteSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteInputText.trim()) {
      alert("붙여넣을 구글 시트 데이터를 입력해주세요.");
      return;
    }

    try {
      const rawRows = pasteInputText.trim().split(/\r?\n/).map(line => {
        if (line.includes("\t")) {
          return line.split("\t");
        }
        return line.split(",");
      });

      if (rawRows.length === 0) {
        alert("유효한 데이터 행이 없습니다.");
        return;
      }

      // Check if first row is header
      const headers = rawRows[0];
      const dataRows = rawRows.length > 1 ? rawRows.slice(1) : rawRows;
      
      const newArticles: DefenseNewsItem[] = dataRows.map((row, idx) => {
        const title = row[0]?.trim() || `K-방산 모니터링 뉴스 ${idx + 1}`;
        const summary = row[1]?.trim() || row[0]?.trim() || "";
        const source = row[2]?.trim() || "K-방산 뉴스 모니터링";
        const date = row[3]?.trim() || new Date().toISOString().split("T")[0];
        const url = row[4]?.trim() || "https://kookbang.dema.mil.kr/";
        const category = row[5]?.trim() || "국내 방산기업";
        const core = row[6]?.trim() || summary.slice(0, 80);
        const body = row[7]?.trim() || summary || title;
        const persp = row[8]?.trim() || "탄약 보존 및 수송 안전성이 중요해지는 흐름에 맞춰, 수원지관산업의 60년 방산규격 지환통 가공 및 고도 방습 코팅 원천 기술은 추진제와 화약의 장기 야전 보존 신뢰성을 지원할 수 있는 솔루션으로 검토 및 적용될 수 있습니다.";

        return {
          id: `news-paste-${Date.now()}-${idx + 1}`,
          tab: category.includes("글로벌") || category.includes("해외") ? "global" : "domestic",
          category,
          title,
          summary,
          source,
          date,
          url,
          imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
          coreSummary: core,
          bodyText: body,
          perspective: persp,
          isCustom: true,
          updatedAt: new Date().toISOString()
        };
      }).filter(a => Boolean(a.title));

      if (newArticles.length > 0) {
        newArticles.forEach(item => saveDefenseNewsItem(item));
        setArticles(prev => {
          const customMap = getLocalCustomNewsMap();
          const deletedIds = getLocalDeletedNewsIds();
          return mergeNewsSafely([...newArticles, ...prev], customMap, firestoreArticles, deletedIds);
        });
        const nowTimeStr = `${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
        setLastSyncTime(nowTimeStr);
        setIsPasteModalOpen(false);
        setPasteInputText("");
        setSheetSyncError(null);
        showNotification(`${newArticles.length}건의 뉴스를 클립보드에서 즉시 동기화했습니다!`);
      } else {
        alert("데이터를 분석할 수 없습니다. 형식을 확인해주세요.");
      }
    } catch (err: any) {
      alert("데이터 분석 중 오류가 발생했습니다: " + err.message);
    }
  };

  // Save new Sheet ID / URL
  const handleSaveSheetId = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanId = sheetInputVal.trim();
    // Extract ID if full Google Sheets URL provided
    const urlMatch = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      cleanId = urlMatch[1];
    }

    if (!cleanId) {
      alert("올바른 Google 스프레드시트 ID 또는 URL을 입력해주세요.");
      return;
    }

    setSheetId(cleanId);
    localStorage.setItem("sw_defense_sheet_id", cleanId);
    setIsSheetSettingsOpen(false);
    showNotification("구글 시트 연동 설정이 저장되었습니다. 동기화를 진행합니다.");
    setTimeout(() => {
      syncWithGoogleSheet();
    }, 300);
  };

  // Automatically trigger factual Google Sheet sync on mount
  useEffect(() => {
    syncWithGoogleSheet();
  }, []);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabFilter, setActiveTabFilter] = useState<"all" | "suwon" | "domestic" | "global">("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<DefenseNewsItem | null>(null);

  // Admin Mode State (supports both context auth and local session)
  const [localAdminAuth, setLocalAdminAuth] = useState(false);
  const effectiveIsAdmin = isAdmin || localAdminAuth;
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Article creation/editing dialog state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  
  // Register Form Fields (Multi-Language Supported: KO, EN, TR)
  const [formTab, setFormTab] = useState<"suwon" | "domestic" | "global">("suwon");
  const [formCategory, setFormCategory] = useState("수원지관 소식");
  const [formCategoryEn, setFormCategoryEn] = useState("Suwon Paper News");
  const [formCategoryTr, setFormCategoryTr] = useState("Suwon Kağıt Haberleri");
  
  // Korean fields
  const [formTitle, setFormTitle] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [formCore, setFormCore] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formPerspective, setFormPerspective] = useState("탄약 생산과 공급이 확대될수록 탄약의 보관, 수송, 취급 과정에서 포장재의 역할은 더욱 중요해집니다. 탄약 포장용 지환통은 단순 포장재가 아니라 탄약의 장기 저장성과 운송 안정성을 보완하는 기능성 보호 용기입니다.");

  // English fields
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formSummaryEn, setFormSummaryEn] = useState("");
  const [formCoreEn, setFormCoreEn] = useState("");
  const [formBodyEn, setFormBodyEn] = useState("");
  const [formPerspectiveEn, setFormPerspectiveEn] = useState("As ammunition output surges globally, protective packaging for propellant and shells becomes critical. Suwon Paper's MIL-SPEC canisters guarantee long-term field survivability.");

  // Turkish fields
  const [formTitleTr, setFormTitleTr] = useState("");
  const [formSummaryTr, setFormSummaryTr] = useState("");
  const [formCoreTr, setFormCoreTr] = useState("");
  const [formBodyTr, setFormBodyTr] = useState("");
  const [formPerspectiveTr, setFormPerspectiveTr] = useState("Küresel mühimmat üretim ve lojistik talebi arttıkça koruyucu ambalajın rolü kritikleşmektedir. Suwon Paper'ın askeri şartnamelere uygun karton muhafaza kutuları sahada tam koruma sağlar.");

  // Common metadata fields
  const [formSource, setFormSource] = useState("");
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formUrl, setFormUrl] = useState("https://");
  const [formImageUrl, setFormImageUrl] = useState(""); // Image field
  const [formLangTab, setFormLangTab] = useState<"ko" | "en" | "tr">("ko");

  const [notification, setNotification] = useState<string | null>(null);

  // Subcategories mapping
  const subCategories = {
    suwon: [
      "수원지관 소식"
    ],
    domestic: [
      "방산 정책",
      "국방 조달",
      "국내 방산기업",
      "탄약·화약류 산업",
      "군수품 포장·보관·수송"
    ],
    global: [
      "글로벌 방산시장",
      "탄약 수요",
      "군수 물류",
      "방산 공급망",
      "해외 분쟁 및 국방 예산"
    ]
  };

  // Switch form category options automatically when formTab changes
  useEffect(() => {
    if (subCategories[formTab]) {
      const firstCat = subCategories[formTab][0];
      setFormCategory(firstCat);
      setFormCategoryEn(CATEGORY_TRANSLATIONS[firstCat]?.en || firstCat);
      setFormCategoryTr(CATEGORY_TRANSLATIONS[firstCat]?.tr || firstCat);
    }
  }, [formTab]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(adminPassword);
    if (success) {
      setLocalAdminAuth(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      setLoginError("");
      showNotification("관리자 콘솔 모드가 활성화되었습니다.");
    } else {
      const storedPass = localStorage.getItem("suwon_admin_passcode") || "swpaper7638**";
      if (adminPassword === storedPass) {
        setLocalAdminAuth(true);
        setShowAdminLogin(false);
        setAdminPassword("");
        setLoginError("");
        showNotification("관리자 콘솔 모드가 활성화되었습니다.");
      } else {
        setLoginError("인증 정보가 바르지 않습니다.");
      }
    }
  };

  const logoutAdmin = () => {
    setLocalAdminAuth(false);
    contextLogoutAdmin();
    showNotification("안전하게 로그아웃 되었습니다.");
  };

  // Auto-translate Korean form content into English and Turkish
  const handleAutoTranslateForm = () => {
    if (!formTitle.trim()) {
      alert("먼저 한국어 제목을 입력해주세요.");
      return;
    }
    
    // Auto translate title
    if (!formTitleEn) setFormTitleEn(translateTextFallback(formTitle, 'en'));
    if (!formTitleTr) setFormTitleTr(translateTextFallback(formTitle, 'tr'));

    // Auto translate summary
    if (formSummary) {
      if (!formSummaryEn) setFormSummaryEn(translateTextFallback(formSummary, 'en'));
      if (!formSummaryTr) setFormSummaryTr(translateTextFallback(formSummary, 'tr'));
    }

    // Auto translate core summary
    if (formCore) {
      if (!formCoreEn) setFormCoreEn(translateTextFallback(formCore, 'en'));
      if (!formCoreTr) setFormCoreTr(translateTextFallback(formCore, 'tr'));
    }

    // Auto translate body
    if (formBody) {
      if (!formBodyEn) setFormBodyEn(translateTextFallback(formBody, 'en'));
      if (!formBodyTr) setFormBodyTr(translateTextFallback(formBody, 'tr'));
    }

    // Auto translate perspective
    if (formPerspective) {
      if (!formPerspectiveEn) setFormPerspectiveEn(translateTextFallback(formPerspective, 'en'));
      if (!formPerspectiveTr) setFormPerspectiveTr(translateTextFallback(formPerspective, 'tr'));
    }

    showNotification("한국어 내용을 바탕으로 영어/튀르키예어 초안이 자동 생성되었습니다.");
  };

  const openRegisterNewForm = () => {
    setEditingArticleId(null);
    setFormTab("domestic");
    setFormCategory("방산 정책");
    setFormCategoryEn("Defense Policy");
    setFormCategoryTr("Savunma Politikası");
    setFormTitle("");
    setFormSummary("");
    setFormSource("국방 공인 보고서");
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormUrl("https://");
    setFormImageUrl("");
    setFormCore("");
    setFormBody("");
    setFormPerspective("탄약 생산과 공급이 확대될수록 탄약의 보관, 수송, 취급 과정에서 포장재의 역할은 더욱 중요해집니다. 탄약지환통은 단순 포장재가 아니라 탄약의 장기 저장성과 운송 안정성을 보완하는 기능성 보호 용기입니다.");
    
    // Reset translated fields
    setFormTitleEn("");
    setFormSummaryEn("");
    setFormCoreEn("");
    setFormBodyEn("");
    setFormPerspectiveEn("As ammunition output surges globally, protective packaging for propellant and shells becomes critical. Suwon Paper's MIL-SPEC canisters guarantee long-term field survivability.");

    setFormTitleTr("");
    setFormSummaryTr("");
    setFormCoreTr("");
    setFormBodyTr("");
    setFormPerspectiveTr("Küresel mühimmat üretim ve lojistik talebi arttıkça koruyucu ambalajın rolü kritikleşmektedir. Suwon Paper'ın askeri şartnamelere uygun karton muhafaza kutuları sahada tam koruma sağlar.");

    setFormLangTab("ko");
    setIsFormOpen(true);
  };

  const openEditForm = (article: DefenseNewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingArticleId(article.id);
    setFormTab(article.tab);
    setFormCategory(article.category);
    setFormCategoryEn(article.categoryEn || CATEGORY_TRANSLATIONS[article.category]?.en || article.category);
    setFormCategoryTr(article.categoryTr || CATEGORY_TRANSLATIONS[article.category]?.tr || article.category);
    
    setFormTitle(article.title);
    setFormSummary(article.summary);
    setFormSource(article.source);
    setFormDate(article.date);
    setFormUrl(article.url);
    setFormImageUrl(article.imageUrl || "");
    setFormCore(article.coreSummary);
    setFormBody(article.bodyText);
    setFormPerspective(article.perspective);

    // Multi-language values
    setFormTitleEn(article.titleEn || "");
    setFormSummaryEn(article.summaryEn || "");
    setFormCoreEn(article.coreSummaryEn || "");
    setFormBodyEn(article.bodyTextEn || "");
    setFormPerspectiveEn(article.perspectiveEn || "");

    setFormTitleTr(article.titleTr || "");
    setFormSummaryTr(article.summaryTr || "");
    setFormCoreTr(article.coreSummaryTr || "");
    setFormBodyTr(article.bodyTextTr || "");
    setFormPerspectiveTr(article.perspectiveTr || "");

    setFormLangTab("ko");
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("선택한 기사를 영구 삭제하시겠습니까? (새로고침 후에도 삭제 상태가 유지됩니다)")) {
      await deleteDefenseNewsItem(id);
      const deletedIds = getLocalDeletedNewsIds();
      deletedIds.add(id);
      setArticles(prev => prev.filter(a => a.id !== id));
      showNotification("게시물이 영구 삭제되었습니다.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim() || !formCore.trim() || !formBody.trim()) {
      alert("필수 항목을 모두 작성해주세요.");
      return;
    }

    const resolvedImageUrl = formImageUrl.trim() || (
      formTab === "suwon"
        ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
        : formTab === "domestic"
          ? "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80"
          : "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
    );

    const updatedItem: DefenseNewsItem = {
      id: editingArticleId || `news-custom-${Date.now()}`,
      tab: formTab,
      category: formCategory,
      categoryEn: formCategoryEn.trim() || CATEGORY_TRANSLATIONS[formCategory]?.en || formCategory,
      categoryTr: formCategoryTr.trim() || CATEGORY_TRANSLATIONS[formCategory]?.tr || formCategory,
      title: formTitle.trim(),
      titleEn: formTitleEn.trim() || translateTextFallback(formTitle.trim(), 'en'),
      titleTr: formTitleTr.trim() || translateTextFallback(formTitle.trim(), 'tr'),
      summary: formSummary.trim(),
      summaryEn: formSummaryEn.trim() || translateTextFallback(formSummary.trim(), 'en'),
      summaryTr: formSummaryTr.trim() || translateTextFallback(formSummary.trim(), 'tr'),
      source: formSource.trim(),
      date: formDate,
      url: formUrl.trim(),
      imageUrl: resolvedImageUrl,
      coreSummary: formCore.trim(),
      coreSummaryEn: formCoreEn.trim() || translateTextFallback(formCore.trim(), 'en'),
      coreSummaryTr: formCoreTr.trim() || translateTextFallback(formCore.trim(), 'tr'),
      bodyText: formBody.trim(),
      bodyTextEn: formBodyEn.trim() || translateTextFallback(formBody.trim(), 'en'),
      bodyTextTr: formBodyTr.trim() || translateTextFallback(formBody.trim(), 'tr'),
      perspective: formPerspective.trim(),
      perspectiveEn: formPerspectiveEn.trim() || translateTextFallback(formPerspective.trim(), 'en'),
      perspectiveTr: formPerspectiveTr.trim() || translateTextFallback(formPerspective.trim(), 'tr'),
      isCustom: true,
      updatedAt: new Date().toISOString()
    };

    // 1. Save to Cloud Firestore and local custom map
    await saveDefenseNewsItem(updatedItem);

    // 2. Update local state
    setArticles(prev => {
      const customMap = getLocalCustomNewsMap();
      const deletedIds = getLocalDeletedNewsIds();
      const updatedList = editingArticleId
        ? prev.map(a => a.id === editingArticleId ? updatedItem : a)
        : [updatedItem, ...prev];
      return mergeNewsSafely(updatedList, customMap, [...firestoreArticles, updatedItem], deletedIds);
    });

    setIsFormOpen(false);
    showNotification(editingArticleId ? "기사 및 영문/튀르키예어 번역본이 저장되었습니다. (새로고침 후에도 영구 보존)" : "신규 기사가 번역본과 함께 등록되었습니다. (새로고침 후에도 영구 보존)");
  };

  // Reset Articles to default
  const resetToDefault = () => {
    if (window.confirm("기본 팩트 데이터로 복구하시겠습니까? 사용자 맞춤 수정사항이 초기화됩니다.")) {
      localStorage.removeItem("sw_defense_custom_news_map");
      localStorage.removeItem("sw_defense_deleted_ids");
      setArticles(DEFAULT_DEFENSE_NEWS);
      showNotification("기본 팩트 데이터로 복구되었습니다.");
    }
  };

  const filteredArticles = articles.filter(art => {
    // 1. Tab filter
    if (activeTabFilter !== "all" && art.tab !== activeTabFilter) return false;
    
    // 2. Sub Category filter
    if (selectedSubCategory !== "all" && art.category !== selectedSubCategory) return false;

    // 3. Search query (multi-lingual match)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = (art.title + " " + (art.titleEn || "") + " " + (art.titleTr || "")).toLowerCase().includes(q);
      const matchSummary = (art.summary + " " + (art.summaryEn || "") + " " + (art.summaryTr || "")).toLowerCase().includes(q);
      const matchBody = (art.bodyText + " " + (art.bodyTextEn || "") + " " + (art.bodyTextTr || "")).toLowerCase().includes(q);
      const matchCategory = (art.category + " " + (art.categoryEn || "") + " " + (art.categoryTr || "")).toLowerCase().includes(q);
      const matchPerspective = (art.perspective + " " + (art.perspectiveEn || "") + " " + (art.perspectiveTr || "")).toLowerCase().includes(q);
      return matchTitle || matchSummary || matchBody || matchCategory || matchPerspective;
    }

    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 font-sans relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-military-900 border border-kraft-500/30 text-white min-w-[320px] max-w-md py-3 px-5 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-kraft-400 shrink-0 animate-pulse" />
            <span className="text-xs font-semibold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative bg-military-900 overflow-hidden py-14 sm:py-16 text-white border-b border-military-850">
        <div className="absolute inset-0 tech-grid-dark opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-military-700/10 blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 py-0.5 px-3 rounded-full bg-kraft-500/10 border border-kraft-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-kraft-400" />
                <span className="text-[11px] font-mono font-bold text-kraft-300 uppercase tracking-widest leading-none">
                  INTELLIGENCE BULLETIN
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {language === "ko" && "K-방산 뉴스 & 동향"}
                {language === "en" && "K-Defense News & Trends"}
                {language === "tr" && "Milli Savunma Dünyası"}
              </h1>
              <p className="text-gray-350 text-sm sm:text-base leading-relaxed max-w-[800px] font-light">
                {language === "ko" && (
                  <>
                    국내외 방산 산업의 주요 흐름과 군수품 포장 시장의 변화를 정리하는 수원지관산업의 산업 뉴스 페이지입니다.
                    탄약지환통 전문 제조기업으로서, K-방산 산업의 변화, 탄약 수요, 군수품 보관·수송·포장 기술의 흐름을 
                    지속적으로 관찰하고 실질 동향에 대응합니다.
                  </>
                )}
                {language === "en" && (
                  <>
                    Suwon Paper Cone & Tube summarizes major shifts in military logistics, domestic K-Defense, and ammunition packaging fields. 
                    As specialized engineers in shell canisters, we constantly track technological developments to satisfy multi-nation standard tests.
                  </>
                )}
                {language === "tr" && (
                  <>
                    Karton mühimmat muhafaza kutularında lider üretici olan Suwon Paper olarak, küresel askeri lojistik standartlarını 및 mühimmat ambalaj 
                    pazarı değişimlerini sektörel analiz sayfamızda takipçilerimizle paylaşıyoruz.
                  </>
                )}
              </p>
            </div>

            {/* Admin toggle console box & Google Sheets Live Automation (Admin Only) */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              {effectiveIsAdmin ? (
                <>
                  {/* Google Sheets Sync Card (Visible to Admin Only) */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-military-920 via-military-900 to-gray-950 border border-kraft-500/40 shadow-lg flex flex-col justify-between gap-3 min-w-[300px] max-w-sm text-left">
                    <div className="flex items-center justify-between gap-2 border-b border-military-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-kraft-400" />
                        <div>
                          <span className="text-xs font-bold text-white block">K-방산 뉴스 시트 자동화</span>
                          <span className="text-[9.5px] font-mono text-gray-400">매일 아침 08:00 자동 모니터링</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9.5px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        관리자 제어
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-gray-300">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                        <span>최근 동기화:</span>
                        <span className="text-kraft-350 truncate max-w-[170px]">{lastSyncTime}</span>
                      </div>
                      {sheetSyncError && (
                        <div className="p-2 bg-red-950/70 border border-red-800/80 rounded-lg text-[10px] text-red-200 flex flex-col gap-1.5">
                          <div className="flex items-start gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{sheetSyncError}</span>
                          </div>
                          <button
                            onClick={() => setIsPermissionGuideOpen(true)}
                            className="self-start text-[10px] font-bold text-kraft-300 hover:text-white underline cursor-pointer flex items-center gap-1"
                          >
                            <HelpCircle className="w-3 h-3" /> 해결법: 3초 만에 구글 시트 공유 권한 설정하기
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 pt-1">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => syncWithGoogleSheet(false)}
                          disabled={isSyncingSheet}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-kraft-500 hover:bg-kraft-450 text-gray-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheet ? "animate-spin" : ""}`} />
                          <span>{isSyncingSheet ? "동기화 진행 중..." : "시트 실시간 동기화"}</span>
                        </button>
                        <button
                          onClick={() => setIsSheetSettingsOpen(true)}
                          className="p-1.5 rounded-lg bg-military-850 hover:bg-military-800 text-gray-300 text-xs border border-military-750 transition-colors cursor-pointer"
                          title="구글 시트 ID 설정"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-military-800/60 text-[10px]">
                        <a
                          href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-kraft-350 transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" /> 시트 열기
                        </a>
                        <button
                          onClick={() => setIsPermissionGuideOpen(true)}
                          className="text-kraft-350 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-2.5 h-2.5" /> 공유 설정 가이드
                        </button>
                        <button
                          onClick={() => setIsPasteModalOpen(true)}
                          className="text-gray-300 hover:text-kraft-300 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-2.5 h-2.5" /> 직접 붙여넣기
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Admin Management Console (Logged In) */}
                  <div className="p-4 rounded-xl bg-military-920 border border-military-800 shadow-inner flex flex-col justify-between gap-2 min-w-[220px] text-left">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Unlock className="w-4 h-4 text-kraft-400" />
                          <span className="text-xs font-bold text-gray-300">관리자 콘솔</span>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-kraft-500 animate-ping" />
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        <div className="text-[10.5px] text-kraft-350 font-normal leading-tight">관리자 권한 인증됨</div>
                        <div className="flex gap-2">
                          <button 
                            onClick={openRegisterNewForm}
                            className="flex-1 py-1 px-2.5 rounded bg-kraft-500 text-gray-950 text-xs font-black hover:bg-kraft-600 transition-all cursor-pointer text-center"
                          >
                            뉴스 수기 등록
                          </button>
                          <button 
                            onClick={logoutAdmin}
                            className="py-1 px-2.5 rounded bg-military-800 text-gray-300 text-xs font-medium hover:bg-military-700 transition-all cursor-pointer"
                          >
                            로그아웃
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Data sync and reset shortcut buttons */}
                    <div className="mt-1 border-t border-military-800 pt-2 flex flex-col gap-1 font-sans">
                      <button 
                        onClick={() => syncWithGoogleSheet(false)}
                        disabled={isSyncingSheet}
                        className="w-full py-1 text-center bg-military-850 hover:bg-military-800 text-[10px] font-mono font-bold text-kraft-300 rounded border border-military-750/50 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className={`w-3 h-3 text-kraft-400 ${isSyncingSheet ? 'animate-spin' : ''}`} /> 
                        구글 시트 팩트 뉴스 즉시 동기화
                      </button>
                      <button 
                        onClick={resetToDefault}
                        className="w-full text-center text-[9.5px] text-gray-400 hover:text-gray-300 border border-dashed border-military-800 py-0.5 rounded cursor-pointer"
                      >
                        기본 팩트 데이터로 초기화
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Admin Login Prompt (When Not Logged In) */
                <div className="p-4 rounded-xl bg-military-920 border border-military-800 shadow-inner flex flex-col justify-between gap-2 min-w-[260px] max-w-sm text-left">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-bold text-gray-300">관리자 전용 콘솔</span>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-gray-600" />
                    </div>

                    <div className="space-y-2 mt-2">
                      <p className="text-[10.5px] text-gray-400 leading-snug">
                        구글 시트 실시간 동기화, 원본 시트 관리 및 뉴스 편집은 관리자 로그인 후 가능합니다.
                      </p>

                      {showAdminLogin ? (
                        <form onSubmit={handleAdminAccess} className="space-y-2 pt-1">
                          <input 
                            type="password" 
                            placeholder="관리자 암호 입력" 
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="w-full text-xs py-1.5 px-2.5 rounded bg-military-950 border border-military-700 text-white placeholder-gray-500 focus:outline-none focus:border-kraft-500"
                            autoFocus
                          />
                          {loginError && <p className="text-[9.5px] text-red-400 font-medium">{loginError}</p>}
                          <div className="flex gap-1.5 justify-end">
                            <button 
                              type="button"
                              onClick={() => setShowAdminLogin(false)}
                              className="py-1 px-2 text-[10.5px] hover:text-white text-gray-400"
                            >
                              취소
                            </button>
                            <button 
                              type="submit"
                              className="py-1 px-3 rounded bg-kraft-500 text-gray-950 text-xs font-bold hover:bg-kraft-450 transition-colors"
                            >
                              확인
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="pt-1">
                          <button 
                            onClick={() => setShowAdminLogin(true)}
                            className="w-full py-2 px-3 rounded-lg bg-military-800 hover:bg-military-750 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-military-700/80 shadow-xs"
                          >
                            <Lock className="w-3.5 h-3.5 text-kraft-400" /> 관리자 로그인
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* K-방산 전략 협력 네트워크 (K-Defense Strategic Network Slider) */}
      <section className="bg-gray-950 text-white py-8 border-b border-gray-900 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[35vw] h-[100px] rounded-full bg-kraft-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[100px] rounded-full bg-military-500/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500/90 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-kraft-350 font-bold uppercase">
              K-Defense Strategic Partnership Network
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-3 bg-black/40 border-y border-gray-900/60 animate-marquee-paused animate-marquee-active">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-4 flex shrink-0">
            {[...defensePartners, ...defensePartners, ...defensePartners].map((partner, idx) => {
              const displayName = language === "ko" ? partner.name : language === "tr" ? partner.nameTr : partner.nameEn;
              const displayBadge = language === "ko" ? partner.badge : language === "tr" ? (partner.badgeTr || partner.badge) : (partner.badgeEn || partner.badge);
              return (
                <a
                  key={idx}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-56 sm:w-64 bg-gradient-to-br from-military-900 via-gray-950 to-black hover:from-military-850 hover:to-military-950 border border-military-800/80 hover:border-kraft-500/80 rounded-xl p-3 flex flex-col justify-between transition-all duration-300 shadow-lg text-left select-none relative group cursor-pointer hover:-translate-y-0.5 shrink-0"
                >
                  <div className="flex items-center gap-2.5">
                    {partner.logo ? (
                      <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-military-700/30 overflow-hidden font-sans">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-military-850 flex items-center justify-center shrink-0 border border-military-700/40 text-sm shadow-inner font-sans">
                        {partner.logoIcon}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <span className="block text-[11px] font-black text-white group-hover:text-kraft-350 transition-colors leading-tight truncate">
                        {displayName}
                      </span>
                      <span className="block text-[9px] text-gray-400 mt-0.5 font-light truncate">
                        {displayBadge}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="bg-white border-b border-gray-200 py-5 sticky top-[56px] sm:top-[68px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Primary Tab filters (All / Suwon / Domestic / Global) */}
            <div className="flex flex-wrap items-center p-1 bg-gray-100 rounded-xl w-fit shrink-0 gap-1 sm:gap-0">
              <button
                onClick={() => {
                  setActiveTabFilter("all");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeTabFilter === "all"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ko" ? "전체 보기" : language === "tr" ? "Tümünü Göster" : "Show All"}
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter("suwon");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === "suwon"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-kraft-500 animate-pulse" />
                {language === "ko" ? "수원지관 소식" : language === "tr" ? "Suwon Kağıt Haberleri" : "Suwon Paper News"}
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter("domestic");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === "domestic"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {language === "ko" ? "국내 K-방산" : language === "tr" ? "Yerli K-Savunma" : "Domestic K-Defense"}
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter("global");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === "global"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-orange-500 animate-spin-slow" />
                {language === "ko" ? "해외 방산 동향" : language === "tr" ? "Küresel Savunma Trendleri" : "Global Defense Trends"}
              </button>
            </div>

            {/* Keyword Search input */}
            <div className="flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ko"
                    ? "방산, 탄약, 군수품 포장, 보관 수색..."
                    : language === "tr"
                      ? "Savunma, mühimmat, askeri ambalaj ara..."
                      : "Search defense, ammunition, MIL-SPEC packaging..."
                }
                className="w-full bg-gray-50 border border-gray-300 focus:border-military-600 text-sm py-2 px-10 rounded-xl focus:outline-none transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Subcategory selectors driven by current tab */}
          {(activeTabFilter === "suwon" || activeTabFilter === "domestic" || activeTabFilter === "global") && (
            <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Sliders className="w-3 h-3" /> {language === "ko" ? "세부 카테고리:" : language === "tr" ? "Alt Kategoriler:" : "Subcategories:"}
              </span>
              <button
                onClick={() => setSelectedSubCategory("all")}
                className={`py-1 px-3 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  selectedSubCategory === "all"
                    ? "bg-military-50 text-military-800 border-military-300 font-extrabold"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {language === "ko" ? "전체" : language === "tr" ? "Tümü" : "All"}
              </button>
              {subCategories[activeTabFilter].map((cat) => {
                const displayCategory = translateCategory(cat, language);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedSubCategory(cat)}
                    className={`py-1 px-3 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      selectedSubCategory === cat
                        ? "bg-military-50 text-military-800 border-military-300 font-extrabold"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {displayCategory}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. NEWS GRID & LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-xs flex flex-col justify-center items-center max-w-xl mx-auto space-y-4">
            <HelpCircle className="w-12 h-12 text-gray-400" />
            <h3 className="text-lg font-bold text-gray-800">
              {language === "ko" ? "검색 필터 결과가 존재하지 않습니다" : language === "tr" ? "Eşleşen savunma raporu bulunamadı" : "No matching defense reports found"}
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed max-w-sm">
              {language === "ko" 
                ? "인텔리전스 DB에 등록된 뉴스가 없거나 매칭 키워드가 부합하지 않습니다. 검색어를 간소화하거나 상단 헤더 관리자 시뮬레이터를 이용하여 기사를 추가해보세요."
                : language === "tr"
                  ? "İstihbarat veri tabanında eşleşen haber/rapor bulunamadı. Filtreleri sıfırlamayı veya yeni haber eklemeyi deneyin."
                  : "No reports found in the intelligence database or keywords did not match. Try clearing filters or creating new items."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTabFilter("all");
                setSelectedSubCategory("all");
              }}
              className="py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-all border-0 cursor-pointer"
            >
              {language === "ko" ? "전체 필터 초기화" : language === "tr" ? "Tüm Filtreleri Sıfırla" : "Reset All Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => {
                const isDomestic = article.tab === "domestic";
                const loc = getLocalizedNews(article, language);
                
                return (
                  <motion.div
                    key={article.id}
                    layoutId={article.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onClick={() => {
                      setSelectedArticle(article);
                      trackNewsView(loc.title, loc.category, language);
                      trackCTAClick("뉴스 상세 브리핑 읽기", "news_list_card", "/news", language);
                    }}
                    className="bg-white rounded-2xl border border-gray-200/80 hover:border-kraft-500/55 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left relative overflow-hidden h-full"
                  >
                    {/* Cover Image inside Card */}
                    {article.imageUrl && (
                      <div className="h-48 w-full overflow-hidden relative bg-gray-150 shrink-0">
                        <img 
                          src={article.imageUrl} 
                          alt={loc.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle dark overlay for premium defense styling */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Interactive floating relative-time tag */}
                        <span className="absolute bottom-3 right-3 bg-military-900/85 backdrop-blur-xs text-[9px] text-kraft-350 font-mono py-1 px-2.5 rounded-full border border-kraft-500/10 uppercase tracking-widest flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-kraft-400 animate-pulse" />
                          LIVE FEED
                        </span>
                      </div>
                    )}

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      {/* Visual accents for selected tabs */}
                      <div className="space-y-4 relative">
                        <div className={`absolute -left-6 top-1.5 w-1 h-6 rounded-r ${
                          isDomestic ? "bg-blue-500" : "bg-orange-500"
                        }`} />

                        {/* Meta header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            isDomestic 
                              ? "bg-blue-50 text-blue-700 border border-blue-100" 
                              : "bg-orange-50 text-orange-700 border border-orange-100"
                          }`}>
                            {loc.category}
                          </span>
                          
                          <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {article.date}
                            </span>
                            <span>•</span>
                            <span>{article.source}</span>
                          </div>
                        </div>

                        {/* Title & Summary */}
                        <div className="space-y-2">
                          <h3 className="text-base sm:text-[17px] font-black leading-snug text-gray-900 group-hover:text-military-800 transition-colors">
                            {loc.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                            {loc.summary}
                          </p>
                        </div>

                        {/* 수원지관산업 요약 브리프 시선 표시 */}
                        <div className="bg-military-50/50 p-3 rounded-lg border border-military-100 mt-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-military-800 uppercase tracking-wider mb-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-kraft-600 animate-pulse" />
                            <span>{language === "ko" ? "수원 제조 관점 핵심" : language === "tr" ? "Suwon Üretim Perspektifi" : "Suwon Mfg Perspective"}</span>
                          </div>
                          <p className="text-[11.5px] text-gray-600 leading-relaxed font-medium line-clamp-2 italic">
                            "{loc.perspective}"
                          </p>
                        </div>
                      </div>

                      {/* Bottom Action Section */}
                      <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-gray-150 relative">
                        <div className="flex items-center gap-2">
                          {effectiveIsAdmin && (
                            <div className="flex gap-1.5">
                              <button
                                onClick={(e) => openEditForm(article, e)}
                                className="p-1 px-2 text-[10.5px] rounded bg-gray-100 hover:bg-gray-200 hover:text-military-800 text-gray-600 font-bold border-0 cursor-pointer flex items-center gap-1"
                                title={language === "ko" ? "기사 수정" : language === "tr" ? "Haberi Düzenle" : "Edit Article"}
                              >
                                <Edit className="w-3 h-3" /> {language === "ko" ? "수정" : language === "tr" ? "Düzenle" : "Edit"}
                              </button>
                              <button
                                onClick={(e) => handleDelete(article.id, e)}
                                className="p-1 px-2 text-[10.5px] rounded bg-red-50 hover:bg-red-100 text-red-600 font-bold border-0 cursor-pointer flex items-center gap-1"
                                title={language === "ko" ? "기사 삭제" : language === "tr" ? "Haberi Sil" : "Delete Article"}
                              >
                                <Trash2 className="w-3 h-3" /> {language === "ko" ? "삭제" : language === "tr" ? "Sil" : "Delete"}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 font-bold text-xs text-military-800 group-hover:text-kraft-600 transition-colors">
                          <span>{language === "ko" ? "상세 브리핑 읽기" : language === "tr" ? "Ayrıntılı Raporu Oku" : "Read Detailed Briefing"}</span>
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 4. DETAILS MODAL (Populates all sub-items clearly) */}
      <AnimatePresence>
        {selectedArticle && (() => {
          const modalLoc = getLocalizedNews(selectedArticle, language);
          return (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              {/* Backdrop cover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="fixed inset-0 bg-military-900/80 backdrop-blur-xs"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white text-gray-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 border border-military-800/10"
              >
                {/* Header Visual Stripe */}
                <div className={`h-2.5 w-full ${
                  selectedArticle.tab === "domestic" ? "bg-blue-500" : "bg-orange-500"
                }`} />

                <div className="p-6 sm:p-8 space-y-6 text-left">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border-0"
                    aria-label="닫기"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Subcategory, Source, Date heading block */}
                  <div className="flex flex-wrap items-center gap-3.5 border-b border-gray-100 pb-4">
                    <span className={`text-[10.5px] font-extrabold px-3 py-0.5 rounded-md uppercase tracking-wider ${
                      selectedArticle.tab === "domestic" 
                        ? "bg-blue-50 text-blue-700 border border-blue-150" 
                        : "bg-orange-50 text-orange-700 border border-orange-150"
                    }`}>
                      {modalLoc.category}
                    </span>

                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}
                    </span>

                    <span className="text-xs text-gray-400 font-semibold">• {selectedArticle.source}</span>
                    
                    {selectedArticle.url && (
                      <a
                        href={selectedArticle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-kraft-600 hover:text-kraft-700 hover:underline inline-flex items-center gap-1 font-bold ml-auto"
                      >
                        <span>{language === "ko" ? "원문 원본 링크" : language === "tr" ? "Orijinal Kaynak Bağlantısı" : "Original Source Link"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-snug">
                    {modalLoc.title}
                  </h2>

                  {/* Article Cover Image in Modal */}
                  {selectedArticle.imageUrl && (
                    <div className="w-full h-64 sm:h-80 overflow-hidden rounded-2xl relative shadow-md bg-gray-100">
                      <img 
                        src={selectedArticle.imageUrl} 
                        alt={modalLoc.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Subtle info label overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-4 left-4 text-xs font-mono text-white flex items-center gap-1.5 backdrop-blur-xs bg-black/35 px-3 py-1 rounded-md border border-white/10">
                        <FileText className="w-3.5 h-3.5 text-kraft-300" />
                        IMAGE SOURCE: INTEL_DYNAMICS
                      </span>
                    </div>
                  )}

                  {/* 핵심 요약 (Core Summary) Bullet box */}
                  <div className="bg-kraft-50/40 border border-kraft-500/20 p-4 rounded-xl">
                    <div className="flex items-center gap-1.5 text-xs font-black text-kraft-800 uppercase tracking-widest mb-1.5">
                      <TrendingUp className="w-4 h-4 text-kraft-600" />
                      <span>{language === "ko" ? "핵심 인텔리전스 요약" : language === "tr" ? "Temel İstihbarat Özeti" : "Core Intelligence Summary"}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-850 leading-relaxed">
                      "{modalLoc.coreSummary}"
                    </p>
                  </div>

                  {/* 본문 요약 (Body Summary) */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> {language === "ko" ? "동향 분석 보고서 요약" : language === "tr" ? "Savunma Eğilim Raporu Özeti" : "Defense Trend Analysis Report"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-light">
                      {modalLoc.bodyText}
                    </p>
                  </div>

                  {/* 수원지관산업 제조 관점 (Suwon Packaging Perspective) - HIGHLY HIGHLIGHTED */}
                  <div className="bg-military-920 p-5 rounded-2xl text-white relative overflow-hidden shadow-inner border border-military-800">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-kraft-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 text-xs font-black text-kraft-300 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
                      <Sparkles className="w-4 h-4 text-kraft-400 animate-pulse" />
                      <span>{language === "ko" ? "수원지관산업 제조·공학적 관점 코멘트" : language === "tr" ? "Suwon Kağıt Endüstrisi Üretim ve Mühendislik Yorumu" : "Suwon Paper Industry Mfg & Engineering Comment"}</span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-250 leading-relaxed font-normal italic">
                      "{modalLoc.perspective}"
                    </p>
                  </div>

                  {/* Related Action buttons matching product navigation */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider sm:mr-auto">
                      {language === "ko" ? "관련 규격 연계 대응 서비스" : language === "tr" ? "İlgili Askeri Standart Çözümleri" : "Related MIL-SPEC Packaging Solutions"}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedArticle(null);
                        // Go directly to the products ammunition tab
                        onTabChange("ammunition");
                      }}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-military-800 text-white hover:bg-military-900 transition-all text-xs font-bold cursor-pointer transition-all border-0 shadow-sm"
                    >
                      {language === "ko" ? "탄약지환통 사양 보기" : language === "tr" ? "Mühimmat Tüpü Özellikleri" : "View Ammunition Tube Specs"}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedArticle(null);
                        onTabChange("contact");
                      }}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-kraft-500 text-gray-950 hover:bg-kraft-600 text-xs font-black cursor-pointer transition-all border-0 shadow-sm"
                    >
                      {language === "ko" ? "맞춤 규격 상담하기" : language === "tr" ? "Özel Şartname Danışmanlığı" : "Request Custom Spec Consultation"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* 5. ADMIN MANAGE FORM (Registration of custom contents) */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-military-900/85 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-y-auto max-h-[85vh] shadow-2xl relative z-10 border border-gray-100"
            >
              <div className="p-6 sm:p-8 space-y-5 text-left">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border-0"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-kraft-500" />
                  <h3 className="text-lg font-black text-military-900">
                    {editingArticleId ? "K-방산 기사내역 수동 수정" : "K-방산 뉴스 신규 수동 등록"}
                  </h3>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Tab Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">대분류 (탭 구분) *</label>
                      <div className="flex rounded-lg bg-gray-100 p-0.5 border border-gray-200">
                        <button
                          type="button"
                          onClick={() => setFormTab("suwon")}
                          className={`flex-1 text-center py-2 text-[10.5px] font-bold rounded-md cursor-pointer ${
                            formTab === "suwon" ? "bg-white text-military-850 shadow-sm" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          수원 소식
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormTab("domestic")}
                          className={`flex-1 text-center py-2 text-[10.5px] font-bold rounded-md cursor-pointer ${
                            formTab === "domestic" ? "bg-white text-military-850 shadow-sm" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          국내 방산
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormTab("global")}
                          className={`flex-1 text-center py-2 text-[10.5px] font-bold rounded-md cursor-pointer ${
                            formTab === "global" ? "bg-white text-military-850 shadow-sm" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          해외 동향
                        </button>
                      </div>
                    </div>

                    {/* Sub Category */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">세부 사양 카테고리 *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-military-600"
                      >
                        {subCategories[formTab]?.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">뉴스 제목 *</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="K-방산 글로벌 수요 급증 및 탄약지환통 연계 검증 완료..."
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                      required
                    />
                  </div>

                  {/* Top-level Summary and Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">기사 출처 *</label>
                      <input
                        type="text"
                        value={formSource}
                        onChange={(e) => setFormSource(e.target.value)}
                        placeholder="예: 국방일보, 예비군 포럼"
                        className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">기록 일자 *</label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Custom link URL */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">원문 링크 주소 *</label>
                    <input
                      type="url"
                      value={formUrl}
                      onChange={(e) => setFormUrl(e.target.value)}
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                    />
                  </div>

                  {/* Representative Image URL & Upload field */}
                  <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-kraft-600" />
                        기사 대표 이미지 설정 (클라우드 영구 저장)
                      </label>
                      <span className="text-[10px] text-gray-400 font-light">URL 입력 또는 PC 파일 업로드</span>
                    </div>

                    {/* Image Preview & Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start mb-2">
                      <div className="w-full sm:w-36 h-24 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden flex-shrink-0 relative group">
                        {formImageUrl ? (
                          <img
                            src={formImageUrl}
                            alt="미리보기"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-2 text-center">
                            <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                            <span className="text-[9.5px]">기본 이미지 자동적용</span>
                          </div>
                        )}
                        {formImageUrl && (
                          <button
                            type="button"
                            onClick={() => setFormImageUrl("")}
                            className="absolute top-1 right-1 bg-gray-900/80 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="이미지 초기화"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="url"
                          value={formImageUrl}
                          onChange={(e) => setFormImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/... (웹 이미지 URL)"
                          className="w-full text-xs py-1.5 px-2.5 rounded-md border border-gray-300 bg-white focus:outline-none focus:border-military-600"
                        />
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 text-[11px] py-1 px-2.5 rounded-md bg-military-800 hover:bg-military-900 text-white font-medium transition-colors shadow-sm">
                            <Upload className="w-3 h-3" />
                            <span>PC 이미지 파일 선택</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (typeof event.target?.result === "string") {
                                      setFormImageUrl(event.target.result);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> 새로고침 시에도 영구 보존
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual suggestion buttons for high quality imagery */}
                    <div>
                      <div className="text-[10.5px] text-gray-500 font-medium mb-1">권장 고화질 테마 프리셋:</div>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80")}
                          className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-white text-gray-700 hover:text-kraft-700 cursor-pointer shadow-2xs"
                        >
                          🏭 정밀제조 공공라인
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80")}
                          className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-white text-gray-700 hover:text-kraft-700 cursor-pointer shadow-2xs"
                        >
                          💂 군수 전략자산
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80")}
                          className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-white text-gray-700 hover:text-kraft-700 cursor-pointer shadow-2xs"
                        >
                          📦 원격 화물 물류관
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80")}
                          className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-white text-gray-700 hover:text-kraft-700 cursor-pointer shadow-2xs"
                        >
                          🌲 친환경 재생펄프관
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Multilingual Content Tabs & Auto-Translation helper */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setFormLangTab("ko")}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            formLangTab === "ko"
                              ? "bg-military-800 text-white shadow-xs"
                              : "text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          🇰🇷 한국어 (기본)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormLangTab("en")}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            formLangTab === "en"
                              ? "bg-military-800 text-white shadow-xs"
                              : "text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          🇺🇸 English
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormLangTab("tr")}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            formLangTab === "tr"
                              ? "bg-military-800 text-white shadow-xs"
                              : "text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          🇹🇷 Türkçe
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleAutoTranslateForm}
                        className="py-1.5 px-3 rounded-lg bg-kraft-50 hover:bg-kraft-100 border border-kraft-400 text-kraft-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors self-start sm:self-auto"
                        title="한국어 내용을 영문 및 튀르키예어로 자동 번역하여 채웁니다"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-kraft-600 animate-pulse" />
                        <span>✨ 영문/튀르키예어 자동 번역 생성</span>
                      </button>
                    </div>

                    {/* Language Badge */}
                    <div className="text-[11px] text-gray-500 font-medium mb-3 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-kraft-600" />
                      <span>
                        현재 편집 언어: <strong>{formLangTab === "ko" ? "한국어 원문" : formLangTab === "en" ? "영어 (English)" : "튀르키예어 (Türkçe)"}</strong>
                      </span>
                    </div>

                    {/* Korean Fields */}
                    {formLangTab === "ko" && (
                      <div className="space-y-4">
                        {/* Short Summary text */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">카드 노출 요약 (3줄 이내) *</label>
                          <textarea
                            value={formSummary}
                            onChange={(e) => setFormSummary(e.target.value)}
                            placeholder="카드의 본문 미리보기 구절을 적어주세요."
                            rows={2}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                            required
                          />
                        </div>

                        {/* Core summary bullet */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">핵심 인텔리전스 요약 *</label>
                          <input
                            type="text"
                            value={formCore}
                            onChange={(e) => setFormCore(e.target.value)}
                            placeholder="보고서의 핵심 가치 요점을 한 문장으로 압축 요약"
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                            required
                          />
                        </div>

                        {/* Body analysis description */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">상세 분석 설명 본문 *</label>
                          <textarea
                            value={formBody}
                            onChange={(e) => setFormBody(e.target.value)}
                            placeholder="상세 팝업창에서 보여질 풍부한 동향 보고서 요약 텍스트를 작성해주세요."
                            rows={4}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                            required
                          />
                        </div>

                        {/* Perspective comment */}
                        <div className="bg-military-50 p-4 rounded-xl border border-military-200">
                          <label className="block text-xs font-bold text-military-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-kraft-600" />
                            수원지관산업 제조·공학적 관점 코멘트 (강조 영역) *
                          </label>
                          <textarea
                            value={formPerspective}
                            onChange={(e) => setFormPerspective(e.target.value)}
                            placeholder="제품의 탄약 안정성 확보, 방습력 등 제조사의 공학 관점을 덧붙여 기업 신뢰감을 도출하세요."
                            rows={2.5}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-500 bg-white"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* English Fields */}
                    {formLangTab === "en" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">English Title (영문 제목)</label>
                          <input
                            type="text"
                            value={formTitleEn}
                            onChange={(e) => setFormTitleEn(e.target.value)}
                            placeholder="K-Defense Global Surge & MIL-SPEC Canister Qualification..."
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">English Summary (영문 카드 요약)</label>
                          <textarea
                            value={formSummaryEn}
                            onChange={(e) => setFormSummaryEn(e.target.value)}
                            placeholder="Brief English summary for the article card preview."
                            rows={2}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">English Core Summary (영문 핵심 요약)</label>
                          <input
                            type="text"
                            value={formCoreEn}
                            onChange={(e) => setFormCoreEn(e.target.value)}
                            placeholder="One-sentence core intelligence takeaway in English."
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">English Detailed Report Body (영문 상세 본문)</label>
                          <textarea
                            value={formBodyEn}
                            onChange={(e) => setFormBodyEn(e.target.value)}
                            placeholder="Detailed English analysis report body text."
                            rows={4}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div className="bg-military-50 p-4 rounded-xl border border-military-200">
                          <label className="block text-xs font-bold text-military-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-kraft-600" />
                            Suwon Paper Industry Perspective (English)
                          </label>
                          <textarea
                            value={formPerspectiveEn}
                            onChange={(e) => setFormPerspectiveEn(e.target.value)}
                            placeholder="Engineering and manufacturing comment in English."
                            rows={2.5}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-500 bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* Turkish Fields */}
                    {formLangTab === "tr" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Türkçe Başlık (튀르키예어 제목)</label>
                          <input
                            type="text"
                            value={formTitleTr}
                            onChange={(e) => setFormTitleTr(e.target.value)}
                            placeholder="K-Savunma Küresel Talep Artışı ve Mühimmat Muhafaza Tüpü Testleri..."
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Türkçe Kart Özeti (튀르키예어 요약)</label>
                          <textarea
                            value={formSummaryTr}
                            onChange={(e) => setFormSummaryTr(e.target.value)}
                            placeholder="Haber kartı önizlemesi için kısa Türkçe özet."
                            rows={2}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Türkçe Temel İstihbarat Özeti (튀르키예어 핵심 요약)</label>
                          <input
                            type="text"
                            value={formCoreTr}
                            onChange={(e) => setFormCoreTr(e.target.value)}
                            placeholder="Tek cümlelik temel istihbarat ve analiz özeti."
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Türkçe Detaylı Rapor Metni (튀르키예어 상세 본문)</label>
                          <textarea
                            value={formBodyTr}
                            onChange={(e) => setFormBodyTr(e.target.value)}
                            placeholder="Ayrıntılı savunma ve lojistik analiz raporu metni."
                            rows={4}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                          />
                        </div>

                        <div className="bg-military-50 p-4 rounded-xl border border-military-200">
                          <label className="block text-xs font-bold text-military-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-kraft-600" />
                            Suwon Paper Industry Perspektifi (Türkçe)
                          </label>
                          <textarea
                            value={formPerspectiveTr}
                            onChange={(e) => setFormPerspectiveTr(e.target.value)}
                            placeholder="Mühimmat güvenliği ve askeri ambalaj üretim mühendisliği yorumu."
                            rows={2.5}
                            className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-500 bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all border-0 cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-kraft-500 hover:bg-kraft-600 text-gray-950 text-xs font-black transition-all border-0 cursor-pointer shadow-md"
                    >
                      {editingArticleId ? "변경사항 저장" : "새 기사 정식 발행"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Sheet Settings Modal */}
      <AnimatePresence>
        {isSheetSettingsOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetSettingsOpen(false)}
              className="fixed inset-0 bg-military-900/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-gray-800 rounded-3xl w-full max-w-lg shadow-2xl relative z-10 border border-military-800/10 overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-kraft-500 via-military-700 to-kraft-400" />
              <div className="p-6 sm:p-7 text-left space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-kraft-600" />
                    <h3 className="text-lg font-black text-gray-900">구글 시트 뉴스 연동 설정</h3>
                  </div>
                  <button
                    onClick={() => setIsSheetSettingsOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  제미나이 스파크 또는 Google Sheets 매크로/앱스스크립트로 매일 아침 8시 자동 업데이트되는 K-방산 뉴스 모니터링 시트 주소를 연동합니다.
                </p>

                <form onSubmit={handleSaveSheetId} className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      구글 스프레드시트 URL 또는 ID
                    </label>
                    <input
                      type="text"
                      value={sheetInputVal}
                      onChange={(e) => setSheetInputVal(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                      className="w-full text-xs py-2.5 px-3 rounded-xl border border-gray-300 font-mono text-gray-800 focus:outline-none focus:border-kraft-500 focus:ring-1 focus:ring-kraft-500"
                      required
                    />
                  </div>

                  <div className="p-3 bg-military-50 rounded-xl border border-military-150 text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
                    <div className="font-bold text-military-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-kraft-600" />
                      자동화 및 권한 안내
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                      <li>시트가 <strong>'링크가 있는 사용자(뷰어)'</strong>로 공유되어 있으면 즉시 실시간 동기화됩니다.</li>
                      <li>비공개 사내 시트의 경우 상단 <strong>[Google 로그인 동기화]</strong> 버튼을 누르면 권한을 안전하게 인증하여 불러옵니다.</li>
                      <li>시트의 열(제목, 요약, 출처, 일자, 원문링크, 핵심요약 등)이 자동으로 매핑됩니다.</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-kraft-700 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> 현재 연동 시트 열기
                    </a>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSheetSettingsOpen(false)}
                        className="py-2 px-3 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 text-xs font-bold text-gray-950 bg-kraft-500 hover:bg-kraft-600 rounded-lg shadow-sm"
                      >
                        설정 저장 및 동기화
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3-Second Google Sheet Permission Guide Modal */}
      <AnimatePresence>
        {isPermissionGuideOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPermissionGuideOpen(false)}
              className="fixed inset-0 bg-military-900/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-gray-800 rounded-3xl w-full max-w-lg shadow-2xl relative z-10 border border-military-800/10 overflow-hidden text-left"
            >
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-kraft-500 to-emerald-400" />
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-black text-gray-900">구글 시트 1클릭 공유 권한 설정 (3초)</h3>
                  </div>
                  <button
                    onClick={() => setIsPermissionGuideOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                  <strong>💡 왜 권한 설정이 필요한가요?</strong><br />
                  현재 구글 시트가 <strong>'제한됨(비공개)'</strong> 상태로 되어 있어 브라우저나 서버가 데이터를 읽어올 수 없습니다. 구글 시트에서 <strong>'링크가 있는 모든 사용자 - 뷰어'</strong>로 단 한 번만 변경해주시면 <strong>별도 로그인 없이</strong> 매일 아침 8시 자동 업데이트 및 실시간 동기화가 완벽하게 작동합니다.
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="w-6 h-6 rounded-full bg-kraft-500 text-gray-950 font-black text-xs flex items-center justify-center shrink-0">1</span>
                    <div className="text-xs text-gray-700 space-y-1">
                      <p className="font-bold text-gray-900">구글 시트 열기</p>
                      <p className="text-gray-500">아래 버튼을 눌러 연동할 구글 스프레드시트 화면으로 이동합니다.</p>
                      <a
                        href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-military-800 text-kraft-300 font-bold text-[11px] hover:bg-military-700 transition-colors mt-1"
                      >
                        <ExternalLink className="w-3 h-3" /> 연동 구글시트 바로 열기
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="w-6 h-6 rounded-full bg-kraft-500 text-gray-950 font-black text-xs flex items-center justify-center shrink-0">2</span>
                    <div className="text-xs text-gray-700 space-y-1">
                      <p className="font-bold text-gray-900">우측 상단 [공유] 버튼 클릭</p>
                      <p className="text-gray-500">
                        [일반 액세스] 항목에서 <strong>'제한됨'</strong>을 클릭하여 <strong>'링크가 있는 모든 사용자'</strong>로 변경하고, 역할을 <strong>'뷰어'</strong>로 선택 후 [완료]를 누릅니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
                    <div className="text-xs text-emerald-900 space-y-1">
                      <p className="font-bold text-emerald-950">[시트 실시간 동기화] 클릭</p>
                      <p className="text-emerald-800">
                        홈페이지로 돌아와 <strong>[시트 실시간 동기화]</strong> 버튼을 누르면 구글 로그인 없이 즉시 K-방산 최신 뉴스가 불러와집니다!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPermissionGuideOpen(false);
                      setIsPasteModalOpen(true);
                    }}
                    className="text-xs text-gray-500 hover:text-kraft-700 underline"
                  >
                    시트 권한 수정 없이 복사/붙여넣기로 등록하기 &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPermissionGuideOpen(false);
                      syncWithGoogleSheet(false);
                    }}
                    className="py-2 px-5 text-xs font-bold text-gray-950 bg-kraft-500 hover:bg-kraft-600 rounded-xl shadow-sm"
                  >
                    확인 및 동기화 시도
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Clipboard / Sheet Paste Modal */}
      <AnimatePresence>
        {isPasteModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPasteModalOpen(false)}
              className="fixed inset-0 bg-military-900/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-gray-800 rounded-3xl w-full max-w-xl shadow-2xl relative z-10 border border-military-800/10 overflow-hidden text-left"
            >
              <div className="h-2 bg-gradient-to-r from-kraft-500 via-military-700 to-kraft-400" />
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-kraft-600" />
                    <h3 className="text-lg font-black text-gray-900">구글 시트 데이터 직접 복사/붙여넣기</h3>
                  </div>
                  <button
                    onClick={() => setIsPasteModalOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  구글 시트의 기사 목록 셀 영역을 복사(Ctrl+C)하여 아래 텍스트 상자에 붙여넣기(Ctrl+V)하시면 권한 설정 없이 즉시 홈페이지에 반영됩니다.
                </p>

                <form onSubmit={handlePasteSync} className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      시트 데이터 (탭 구분 또는 CSV 텍스트)
                    </label>
                    <textarea
                      value={pasteInputText}
                      onChange={(e) => setPasteInputText(e.target.value)}
                      placeholder="구글 시트에서 행들을 선택 후 복사하여 여기에 붙여넣으세요...&#10;예: 제목 \t 요약 \t 출처 \t 2026-08-22 \t 링크..."
                      rows={8}
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 font-mono text-gray-800 focus:outline-none focus:border-kraft-500 focus:ring-1 focus:ring-kraft-500 leading-relaxed"
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-kraft-700 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> 구글 시트 열기
                    </a>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPasteModalOpen(false)}
                        className="py-2 px-3 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-5 text-xs font-bold text-gray-950 bg-kraft-500 hover:bg-kraft-600 rounded-xl shadow-sm"
                      >
                        클립보드 뉴스 동기화
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. COMPLIANT NOTICE BANNER FOOT DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-5.5 rounded-2xl bg-white border border-gray-200 text-left space-y-2 max-w-4xl mx-auto shadow-xs">
          <p className="text-[11px] font-mono tracking-widest font-extrabold text-kraft-700 bg-kraft-100/60 py-0.5 px-2 rounded inline-block uppercase leading-none">
            DEFENSE MEDIA COMPLIANCE DISCLAIMER
          </p>
          <p className="text-[11.5px] text-gray-400 leading-relaxed font-light">
            {language === "ko" && "본 페이지는 공개된 군수 시장 자료와 언론 보도, 관련 국방 기관 발표 내용을 기반으로 작성되었으며, 특정 군 부대나 계약 기관의 대변 또는 기밀 정보를 노출하지 않고 투명한 공개 분석만을 수렴합니다."}
            {language === "en" && "This sector briefing board is aggregated from publicly declared defense logistics bulletins and validated web news source feeds. It does not represent the official stance of any ministry of national defense."}
            {language === "tr" && "Bu bülten sayfamızdaki içerikler tamamen kamuya açık askeri lojistik yayınları ve haber ajansları kaynak alınarak derlenmiştir, hiçbir askeri birimin gizli bilgisini ifşa etmemektedir."}
          </p>
        </div>
      </section>

    </div>
  );
}
