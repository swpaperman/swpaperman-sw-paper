/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Settings, 
  Layers, 
  Calculator, 
  Package, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Radio,
  Sparkles,
  TrendingUp,
  Calendar,
  RefreshCw,
  Cpu,
  Globe,
  ArrowUpRight,
  Flame,
  Bell,
  FileSpreadsheet,
  Maximize2,
  X,
  Pause,
  Play,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { 
  getStoredDefenseNews, 
  getStoredLastSyncTime, 
  saveDefenseNewsToStorage,
  DEFAULT_DEFENSE_NEWS,
  DefenseNewsItem,
  mergeNewsSafely,
  getLocalCustomNewsMap,
  getLocalDeletedNewsIds
} from "../lib/defenseNewsStore";
import { 
  DEFAULT_DEFENSE_NEWS_SHEET_ID, 
  fetchDefenseNewsFromGoogleSheet 
} from "../lib/googleWorkspace";
import { 
  getLocalizedNews, 
  translateCategory 
} from "../lib/newsTranslator";

interface HomeViewProps {
  onTabChange: (tabId: string) => void;
}

const defensePartners = [
  {
    name: "한화에어로스페이스",
    nameTr: "Hanwha Aerospace",
    nameEn: "Hanwha Aerospace",
    badge: "K-방산 화포/탄약 체계 체계업체",
    link: "https://www.hanwhaaerospace.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1q04UKpLEFNpXhY5L49l5usZC7kzHaZX5"
  },
  {
    name: "풍산",
    nameTr: "Poongsan",
    nameEn: "Poongsan Corp",
    badge: "한국군 탄약 및 포병탄 주도공급",
    link: "https://www.poongsan.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1IBcG1Fg2fmYoP1rqV9pa6HPigwSAw4vo"
  },
  {
    name: "삼양화학공업",
    nameTr: "Samyang Chemical",
    nameEn: "Samyang Chemical",
    badge: "K-방산 특수 화학/연막탄 제조",
    link: "http://www.samyangchem.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1LiuhnDf3UFNy3gik9GlhOxUWAn1ybVhj"
  },
  {
    name: "LIG넥스원",
    nameTr: "LIG Nex1",
    nameEn: "LIG Nex1",
    badge: "해군/공군 정밀 항공유도무기 선도",
    link: "https://www.lignex1.com/",
    logo: "https://lh3.googleusercontent.com/d/1-4Y0wX-5omGAIOH_Ih5pfVtGLIwdOxUm"
  },
  {
    name: "대한민국 국방부",
    nameTr: "MND Korea",
    nameEn: "Ministry of Defense",
    badge: "국방 정책 수립 & 국방규격 통제기관",
    link: "https://www.mnd.go.kr/",
    logo: "https://lh3.googleusercontent.com/d/1TMm1GB-kYqNNI3rTaKo6yLr7wd6NDKwL"
  },
  {
    name: "방위사업청",
    nameTr: "DAPA",
    nameEn: "DAPA",
    badge: "방위력개선 및 국방 군수 조달 총괄",
    link: "https://www.dapa.go.kr/",
    logo: "https://lh3.googleusercontent.com/d/1UT5mmcEtz_gh392ncjV3jYIWIEPeBh39"
  },
  {
    name: "국방과학연구소",
    nameTr: "ADD",
    nameEn: "ADD Research",
    badge: "대한민국 국방 과학 핵심 무기 R&D",
    link: "https://www.add.re.kr/",
    logo: "https://lh3.googleusercontent.com/d/1YeEFMNVO4g_Bs1gqDJGGTifgltIHrH8H"
  },
  {
    name: "한국항공우주산업 (KAI)",
    nameTr: "KAI Corp",
    nameEn: "Korea Aerospace Industries",
    badge: "KF-21 / FA-50 / 수리온 국산 항공기 우뚝",
    link: "https://www.koreaaero.com/",
    logoIcon: "✈️"
  },
  {
    name: "한화시스템",
    nameTr: "Hanwha Systems",
    nameEn: "Hanwha Systems",
    badge: "방산 ICT, 에이사(AESA) 레이더 및 전술통신",
    link: "https://www.hanwhasystems.com/",
    logoIcon: "📡"
  },
  {
    name: "현대로뎀",
    nameTr: "Hyundai Rotem",
    nameEn: "Hyundai Rotem",
    badge: "K2 흑표 전차 및 지상 기동장비 원조",
    link: "https://www.hyundai-rotem.co.kr/",
    logoIcon: "⚙️"
  },
  {
    name: "빅텍",
    nameTr: "Victek",
    nameEn: "Victek Co.",
    badge: "방산 전자전 시스템 & 피아식별 군인프라",
    link: "https://www.victek.co.kr/",
    logoIcon: "⚡"
  },
  {
    name: "기아 군수차량",
    nameTr: "Kia Military Veh.",
    nameEn: "Kia Military Vehicles",
    badge: "한국형 소형전술차(KLTV) & 군용 트럭 명가",
    link: "https://military.kia.com",
    logoIcon: "🚚"
  }
];

export const AMMO_PRODUCT_SLIDES = [
  {
    id: "ammo-lineup-1",
    title: "탄약지환통 라인업",
    sub: "KDS & MIL-SPEC 규격 기반 다품종 탄약지환통 라인업",
    tag: "KDS / MIL-SPEC",
    spec: "KC521 • KC511 • KC18 • KC266 • KC01 외 전 계열",
    url: "https://lh3.googleusercontent.com/d/1tXrnyb3Y_ApswrRWveDzk5O9ua8F9gqV",
    desc: "155mm, 105mm, 박격포탄, 유도탄용 국방규격 고강도 탄약지환통"
  },
  {
    id: "ammo-precision-tube",
    title: "탄약지환통",
    sub: "KDS 국방규격 초정밀 탄약 및 추진제 전용 방습 탄약지환통",
    tag: "AMMUNITION TUBE",
    spec: "고강도 다층 나선 권취 및 진공 레진 함침 공법",
    url: "https://lh3.googleusercontent.com/d/1m-VV6yFIZ8n0B6j9dnrb3TyFlMZTxdu6",
    desc: "정밀 치수 가공과 다중 방습 차단막으로 추진제 및 탄약의 최적 보존 상태를 유지하는 탄약지환통"
  },
  {
    id: "ammo-lineup-2",
    title: "탄약지환통 라인업",
    sub: "다양한 구경별 정밀 치수 제어 및 맞춤형 캡 어셈블리",
    tag: "ALL LINEUP",
    spec: "소구경 신관부터 중·대구경 탄약 보호용 탄약지환통 전 라인",
    url: "https://lh3.googleusercontent.com/d/1uqFLlJdJYsa499QEw2glDiP4n-02x5lK",
    desc: "초정밀 스파이럴 나선 권취 및 완벽한 기밀성 유지를 위한 특수 접착 공법 적용 탄약지환통"
  },
  {
    id: "ammo-structure",
    title: "탄약지환통 구조",
    sub: "고강도 다층 크라프트 구조 및 다기능 방습·완충 설계",
    tag: "STRUCTURE & TECH",
    spec: "내외면 방습 코팅 + 금속 캡 + 완충 링 어셈블리",
    url: "https://lh3.googleusercontent.com/d/1rQag_cgI0fS1LYRjaAG56X6OL4u0EvWq",
    desc: "수분 침투 원천 차단 및 극한의 하중·충격에도 형상을 유지하는 특수 다층 구조 탄약지환통"
  }
];

export default function HomeView({ onTabChange }: HomeViewProps) {
  const { language, t } = useLanguage();
  const [newsList, setNewsList] = useState<DefenseNewsItem[]>(() => getStoredDefenseNews());
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => getStoredLastSyncTime());
  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);

  // Ammunition Products Rolling Carousel State
  const [currentAmmoIdx, setCurrentAmmoIdx] = useState(0);
  const [isAmmoPaused, setIsAmmoPaused] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // Auto-update news from localStorage if updated in another tab or sheet sync
  useEffect(() => {
    const handleStorageChange = () => {
      setNewsList(getStoredDefenseNews());
      setLastSyncTime(getStoredLastSyncTime());
    };
    window.addEventListener("storage", handleStorageChange);

    // Initial background sync with Google Sheet to ensure 100% factual data
    fetchDefenseNewsFromGoogleSheet(DEFAULT_DEFENSE_NEWS_SHEET_ID)
      .then(res => {
        if (res.success && res.articles && res.articles.length > 0) {
          const customMap = getLocalCustomNewsMap();
          const deletedIds = getLocalDeletedNewsIds();
          const merged = mergeNewsSafely(res.articles, customMap, [], deletedIds);
          saveDefenseNewsToStorage(merged);
          setNewsList(merged);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      })
      .catch(err => {
        console.warn("Background sheet sync notice:", err);
      });

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Auto-rotate breaking news ticker every 4.5 seconds
  useEffect(() => {
    if (newsList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTickerIdx((prev) => (prev + 1) % newsList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [newsList.length]);

  // Auto-roll ammo product images every 4.2 seconds (pauses on hover or modal open)
  useEffect(() => {
    if (isAmmoPaused || isZoomModalOpen) return;
    const interval = setInterval(() => {
      setCurrentAmmoIdx((prev) => (prev + 1) % AMMO_PRODUCT_SLIDES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isAmmoPaused, isZoomModalOpen]);

  const activeTickerArticle = newsList[currentTickerIdx] || newsList[0];
  const featuredArticle = newsList[0] || activeTickerArticle;
  const recentArticles = newsList.slice(1, 4);
  const activeAmmoSlide = AMMO_PRODUCT_SLIDES[currentAmmoIdx] || AMMO_PRODUCT_SLIDES[0];

  const locTicker = getLocalizedNews(activeTickerArticle, language);
  const locFeatured = getLocalizedNews(featuredArticle, language);

  const handlePrevAmmoSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentAmmoIdx((prev) => (prev - 1 + AMMO_PRODUCT_SLIDES.length) % AMMO_PRODUCT_SLIDES.length);
  };

  const handleNextAmmoSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentAmmoIdx((prev) => (prev + 1) % AMMO_PRODUCT_SLIDES.length);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-military-900 flex flex-col justify-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-30 lg:pb-20 xl:pt-32 xl:pb-22">
        {/* Background Grid Pattern & Ambient Lighting */}
        <div className="absolute inset-0 tech-grid-dark opacity-25 z-0 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-military-700/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[25vw] h-[25vw] rounded-full bg-kraft-600/10 blur-[90px] pointer-events-none" />

        {/* 1.0 TOP LIVE DEFENSE INTELLIGENCE TICKER (생동감 넘치는 실시간 속보 티커 바) */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 w-full relative z-20 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-military-950 via-military-850 to-gray-950 border border-military-700/70 rounded-2xl p-2 sm:p-2.5 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            
            {/* Live Indicator Chip */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-[11px] sm:text-xs font-black tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 absolute" />
                LIVE K-DEFENSE
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-gray-400 font-medium">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                {lastSyncTime.includes("2026") 
                  ? (language === "ko" ? "2026-08-22 동기화" : language === "tr" ? "22.08.2026 Senkronize" : "2026-08-22 Synced")
                  : (language === "ko" ? "실시간 자동 동기화 가동 중" : language === "tr" ? "Otomatik senkronizasyon aktif" : "Real-time auto-sync active")}
              </span>
            </div>

            {/* Rotating Breaking News Title Bar */}
            <div 
              onClick={() => onTabChange("news")}
              className="flex-1 overflow-hidden cursor-pointer group flex items-center gap-2 w-full min-w-0 py-0.5 sm:py-0 px-1 hover:text-kraft-300 transition-colors"
            >
              <span className="hidden lg:inline-block text-[10px] font-mono font-bold text-kraft-400 bg-military-800/90 border border-military-600/50 px-2 py-0.5 rounded shrink-0">
                {locTicker.category}
              </span>
              <div className="flex-1 overflow-hidden relative h-5 sm:h-6 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTickerArticle.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm font-bold text-white group-hover:text-kraft-300 truncate flex items-center gap-2 w-full text-left"
                  >
                    <span className="text-kraft-350 font-mono text-[11.5px] shrink-0 font-black">
                      [{activeTickerArticle.date}]
                    </span>
                    <span className="truncate text-white font-bold tracking-tight group-hover:text-kraft-200">
                      {locTicker.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Direct Newsroom CTA Button */}
            <button
              onClick={() => onTabChange("news")}
              className="shrink-0 self-end sm:self-auto inline-flex items-center gap-1.5 py-1 px-3 rounded-xl bg-kraft-500 hover:bg-kraft-400 text-gray-950 text-[11px] sm:text-xs font-black transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-98"
            >
              <span>{language === "ko" ? "방산뉴스 허브" : language === "tr" ? "Savunma Haberleri" : "Defense News Hub"}</span>
              <ArrowRight className="w-3 h-3 text-gray-950" />
            </button>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 relative z-10 w-full text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-[80px] xl:gap-[110px]">
            
            {/* Left Column: Core Copy */}
            <div className="w-full lg:max-w-[720px] flex-1 flex flex-col justify-center">
              
              {/* Reliable Badge + Live Intel Alert Pill */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-military-800/90 border border-military-600/40 backdrop-blur-sm w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-kraft-500 animate-pulse" />
                  <span className="text-[12.5px] sm:text-[13.5px] font-sans font-bold text-kraft-300 uppercase tracking-wide leading-none">
                    {t.home.heroBadge}
                  </span>
                </div>

                <div 
                  onClick={() => onTabChange("news")}
                  className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-military-850/90 hover:bg-military-800 border border-kraft-500/40 text-kraft-300 text-[11.5px] font-semibold cursor-pointer transition-all group"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span className="font-bold">
                    {language === "ko" ? "K-방산 실시간 모니터링 활성" : language === "tr" ? "K-Savunma Canlı İzleme Aktif" : "K-Defense Live Monitoring Active"}
                  </span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Majestic Titles */}
              <h1 className="text-3xl sm:text-[42px] md:text-[46px] lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-black text-white tracking-tight leading-[1.15] break-keep">
                <span className="block font-sans font-medium text-kraft-400 text-[16px] sm:text-[17px] xl:text-[18px] uppercase tracking-widest font-mono mb-2">
                  {t.mainTitleEng}
                </span>
                {t.mainTitle}
              </h1>

              {/* Body paragraph content area wrapped in tailored spacing */}
              <div className="mt-4.5 space-y-3.5 max-w-[640px] break-keep">
                <p className="font-semibold text-white/95 text-[15px] sm:text-[16.5px] xl:text-[17.5px] leading-relaxed">
                  {t.mainSubtitle}
                </p>
                <p className="font-light text-gray-300/75 text-[13.5px] sm:text-[14.5px] xl:text-[15px] leading-[1.65]">
                  {t.mainDesc}
                </p>
              </div>

              {/* Real-Time Live Intelligence Card inside Hero */}
              <div 
                onClick={() => onTabChange("news")}
                className="mt-6 p-3.5 rounded-xl bg-gradient-to-r from-military-850/95 via-military-800/80 to-military-900/90 border border-military-600/60 hover:border-kraft-450 transition-all duration-300 shadow-xl cursor-pointer group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10.5px] font-mono font-bold text-kraft-350 flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {language === "ko" 
                      ? "실시간 방산 브리핑 • 2026.08.22 업데이트" 
                      : language === "tr" 
                        ? "Canlı Savunma Brifingi • 22.08.2026 Güncelleme" 
                        : "Real-Time Defense Briefing • Aug 22, 2026 Updated"}
                  </span>
                  <span className="text-[10px] text-gray-400 group-hover:text-kraft-300 flex items-center gap-0.5 font-mono">
                    {language === "ko" ? "뉴스 전문 보기" : language === "tr" ? "Haber Detayını Oku" : "View Full Story"} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-bold text-white group-hover:text-kraft-200 transition-colors leading-snug line-clamp-2">
                  {locFeatured.title}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-400 font-mono">
                  <span className="text-kraft-400 font-semibold">{locFeatured.source}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">
                    {language === "ko" ? "수원지관 방습 규격 기술 대응" : language === "tr" ? "Suwon Askeri Nem Bariyeri Çözümü" : "Suwon MIL-SPEC Moisture Barrier Solution"}
                  </span>
                </div>
              </div>

              {/* Hero CTA Actions */}
              <div className="flex flex-wrap gap-4 mt-7">
                <button
                  onClick={() => onTabChange("contact")}
                  className="py-3.5 px-6 rounded-xl bg-kraft-500 text-gray-950 text-[15px] sm:text-[16px] font-black hover:bg-kraft-600 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 border-0"
                >
                  {t.home.customInquiryBtn}
                  <ArrowRight className="w-4.5 h-4.5 text-gray-950" />
                </button>
                <button
                  onClick={() => onTabChange("products")}
                  className="py-3.5 px-6 rounded-xl bg-military-800 text-white text-[15px] sm:text-[16px] font-semibold border border-military-600 hover:bg-military-750 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {t.home.viewAmmoBtn}
                  <ChevronRight className="w-4.5 h-4.5 text-white" />
                </button>
                <button
                  onClick={() => onTabChange("news")}
                  className="py-3.5 px-5 rounded-xl bg-military-850/80 hover:bg-military-800 text-kraft-300 text-[14px] sm:text-[15px] font-bold border border-kraft-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-kraft-400" />
                  <span>{language === "ko" ? "K-방산 실시간 뉴스" : language === "tr" ? "K-Savunma Canlı Haberler" : "K-Defense Real-Time News"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Wireframe Simulation Panel - Enlarged & Rolling Carousel */}
            <div className="w-full max-w-[500px] sm:max-w-[540px] lg:max-w-[540px] xl:max-w-[600px] 2xl:max-w-[640px] shrink-0">
              <div 
                className="p-5 sm:p-6 xl:p-7 rounded-2xl bg-military-850/95 border border-military-700/80 backdrop-blur-md shadow-2xl relative overflow-hidden text-white flex flex-col justify-between h-full min-h-[500px] lg:min-h-[560px] xl:min-h-[600px]"
                onMouseEnter={() => setIsAmmoPaused(true)}
                onMouseLeave={() => setIsAmmoPaused(false)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-kraft-500/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* Header with Title & Rolling Indicator */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-mono font-black text-kraft-350 tracking-wider uppercase">
                      {t.home.specHeader}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-bold text-kraft-400/90 bg-military-950/80 px-2 py-0.5 rounded border border-kraft-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      실시간 롤링
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                    MIL-SPEC / KDS BASED
                  </span>
                </div>

                {/* Real Product Image Carousel Container (Enlarged) */}
                <div className="bg-military-950 rounded-xl p-3 sm:p-4 flex flex-col justify-center items-center border border-military-750/90 shadow-2xl relative group/img mb-4 flex-1">
                  
                  {/* Image Display Area with Framer Motion Transition */}
                  <div 
                    onClick={() => setIsZoomModalOpen(true)}
                    className="w-full h-56 sm:h-68 md:h-76 xl:h-84 rounded-lg overflow-hidden bg-gradient-to-b from-black via-military-950 to-black flex items-center justify-center relative cursor-zoom-in group/canvas border border-military-800/80"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeAmmoSlide.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="w-full h-full flex items-center justify-center p-2 relative"
                      >
                        <img 
                          src={activeAmmoSlide.url} 
                          alt={activeAmmoSlide.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] group-hover/canvas:scale-[1.03] transition-transform duration-500"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Top Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
                      <span className="bg-military-900/90 backdrop-blur-sm text-[9.5px] font-mono font-bold text-kraft-350 px-2 py-0.5 rounded border border-kraft-500/40 shadow-sm">
                        {activeAmmoSlide.tag}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsZoomModalOpen(true);
                        }}
                        className="bg-black/70 hover:bg-black/90 text-white/90 hover:text-white p-1.5 rounded-lg border border-white/20 transition-all flex items-center gap-1 text-[10px] font-mono cursor-pointer backdrop-blur-xs shadow-md"
                        title="고화질 확대보기"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-kraft-400" />
                        <span className="hidden sm:inline text-[9.5px] font-bold">확대보기</span>
                      </button>
                      <div className="bg-military-900/90 backdrop-blur-xs text-[9.5px] font-mono font-bold text-gray-300 px-2 py-1 rounded border border-military-700/60">
                        {`0${currentAmmoIdx + 1} / 0${AMMO_PRODUCT_SLIDES.length}`}
                      </div>
                    </div>

                    {/* Prev / Next Hover Controls */}
                    <button
                      onClick={handlePrevAmmoSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-military-800 text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/canvas:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4.5 h-4.5 text-white" />
                    </button>

                    <button
                      onClick={handleNextAmmoSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-military-800 text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/canvas:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4.5 h-4.5 text-white" />
                    </button>

                    {/* Bottom Indicator Dots */}
                    <div className="absolute bottom-2.5 inset-x-0 flex justify-center items-center gap-1.5 z-10 pointer-events-auto">
                      {AMMO_PRODUCT_SLIDES.map((slide, idx) => (
                        <button
                          key={slide.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentAmmoIdx(idx);
                          }}
                          className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                            currentAmmoIdx === idx 
                              ? "w-6 bg-kraft-400 shadow-[0_0_8px_rgba(230,180,80,0.8)]" 
                              : "w-1.5 bg-white/40 hover:bg-white/80"
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Dynamic Caption for the active image */}
                  <div className="w-full mt-3.5 text-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeAmmoSlide.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xs sm:text-[14px] font-sans font-black text-kraft-300 uppercase tracking-wider leading-tight">
                            {activeAmmoSlide.title}
                          </span>
                        </div>
                        <div className="text-[10.5px] sm:text-[11.5px] text-gray-300 font-medium font-sans mt-1.5 space-y-1 opacity-95 tracking-wide leading-snug">
                          <p className="block">{activeAmmoSlide.sub}</p>
                          <p className="block font-mono text-kraft-400 font-semibold">• {activeAmmoSlide.spec}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Parameter Metrics list with aligned typography */}
                <div className="space-y-1 text-[11px] sm:text-xs">
                  <div className="flex justify-between py-2 border-b border-military-800/40 items-center gap-4">
                    <span className="text-gray-400 shrink-0 font-bold tracking-tight">
                      {t.home.designSpecLabel}
                    </span>
                    <span className="text-kraft-300 font-bold text-right text-[11px] sm:text-xs">
                      {t.home.designSpecVal}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-military-800/40 items-center gap-4">
                    <span className="text-gray-400 shrink-0 font-bold tracking-tight">
                      {t.home.moistureLabel}
                    </span>
                    <span className="text-kraft-300 font-bold text-right text-[11px] sm:text-xs">
                      {t.home.moistureVal}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-military-800/40 items-center gap-4">
                    <span className="text-gray-400 shrink-0 font-bold tracking-tight">
                      {t.home.strengthLabel}
                    </span>
                    <span className="text-kraft-300 font-bold text-right text-[11px] sm:text-xs">
                      {t.home.strengthVal}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 items-center gap-4">
                    <span className="text-gray-300 shrink-0 font-bold tracking-tight">
                       {t.home.qualityLabel}
                    </span>
                    <span className="text-white text-right font-black text-[11px] sm:text-xs leading-tight break-keep">
                      {t.home.qualityVal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* K-방산 전략 협력 네트워크 (K-Defense Strategic Network Slider) */}
      <section className="bg-gray-950 text-white py-12 border-b border-gray-900 pointer-events-auto relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[35vw] h-[100px] rounded-full bg-kraft-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[100px] rounded-full bg-military-500/5 blur-[80px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 text-left relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-kraft-350 font-bold uppercase block mb-1">
                K-DEFENSE STRATEGIC PARTNERSHIP
              </span>
              <h2 className="text-xl sm:text-2.5xl font-black text-white tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 animate-pulse inline-block" />
                {language === "ko" 
                  ? "K-방산 전략 네트워크" 
                  : language === "tr" 
                    ? "K-Savunma Stratejik İş Birliği" 
                    : "K-Defense Strategic Network"}
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-400 mt-2 max-w-4xl leading-relaxed">
                {language === "ko"
                  ? "주식회사 수원지관산업은 대한민국 자주국방의 가치를 가슴에 품고 임하는 대표적인 군수 협력체입니다. 국내 주요 체계방산업체(한화, 풍산 등) 및 군 조달 기관과의 유기적인 연계를 유지하며 수원지관의 축적된 규격 제어 기술과 무결점 실시간 대량 공급망으로 K-방산 수출 세계화의 주축 군수 기동에 동참하고 있습니다."
                  : language === "tr"
                    ? "Suwon Paper Tube Industry, Kore'nin önde gelen savunma sanayii ekosisteminin aktif bir parçası olup, yüksek hassasiyetli askeri mühimmat koruma ürünlerini müttefik savunma şirketlerine zamanında tedarik eder."
                    : "Suwon Paper Tube Industry operates as a pivotal military packaging partner, maintaining strong networks with premiere systems contractors to power Korean defense export capabilities worldwide."}
              </p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <span className="inline-block text-[11px] font-mono text-kraft-300 bg-military-900 border border-military-850 px-3 py-1 rounded-full">
                {language === "ko" ? "💡 카드 클릭 개별 공식웹 새창 이동" : language === "tr" ? "💡 Web Sitelerini Ziyaret Edin" : "💡 Click to open partners' websites"}
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling Track with Hover Pause Control */}
        <div className="relative w-full overflow-hidden py-4 bg-black/40 border-y border-gray-900/80 animate-marquee-paused">
          {/* Fading side covers for seamless aesthetic finish */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-4 flex shrink-0">
            {/* Double/triple mapping items to guarantee smooth infinite horizontal scroll loop */}
            {[...defensePartners, ...defensePartners, ...defensePartners].map((partner, idx) => {
              const displayName = language === "ko" ? partner.name : language === "tr" ? partner.nameTr : partner.nameEn;
              return (
                <a
                  key={idx}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-64 sm:w-[290px] bg-gradient-to-br from-military-900 via-gray-950 to-black hover:from-military-850 hover:to-military-950 border border-military-800/80 hover:border-kraft-500/80 rounded-xl p-4 flex flex-col justify-between transition-all duration-300 shadow-xl text-left select-none relative group cursor-pointer hover:-translate-y-1 shrink-0"
                >
                  <div className="flex items-center gap-3">
                    {partner.logo ? (
                      <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-military-700/30 overflow-hidden">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-military-850 flex items-center justify-center shrink-0 border border-military-700/40 text-xl shadow-inner">
                        {partner.logoIcon}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <span className="block text-xs font-black text-white group-hover:text-kraft-350 transition-colors leading-tight truncate">
                        {displayName}
                      </span>
                      <span className="block text-[10px] text-gray-400 mt-0.5 font-light truncate">
                        {partner.badge}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-military-850/60 text-[9px] font-mono text-gray-500">
                    <span className="tracking-widest uppercase text-military-305 group-hover:text-kraft-300 transition-colors">ACTIVE DEFENSE NETWORK</span>
                    <ExternalLink className="w-3 h-3 text-kraft-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-right" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1.5 K-방산 실시간 군수 뉴스 & 시장 동향 (LIVE DEFENSE INTELLIGENCE BENTO) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-950 via-military-950 to-gray-950 text-white relative overflow-hidden border-b border-gray-900 font-sans">
        {/* Ambient glow effects */}
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-kraft-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-military-600/15 blur-[130px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 relative z-10 text-left">
          
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="space-y-3 max-w-4xl">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-military-850 border border-red-500/40">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] sm:text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
                  REAL-TIME DEFENSE INTELLIGENCE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3.5xl font-black text-white tracking-tight leading-tight flex flex-wrap items-center gap-3">
                <span>
                  {language === "ko" 
                    ? "K-방산 실시간 군수 뉴스 & 시장 동향" 
                    : language === "tr" 
                      ? "K-Savunma Canlı Askeri Haberler & Piyasa Trendleri" 
                      : "Real-Time K-Defense Logistics & Market News"}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {language === "ko" ? "실시간 연동 활성" : language === "tr" ? "Canlı Senkronizasyon Aktif" : "Live Sync Active"}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                {language === "ko"
                  ? "실시간으로 K-방산 최신 속보와, 수원지관산업의 실무 인사이트를 전달합니다."
                  : language === "tr"
                    ? "Kore savunma sanayii son dakika haberleri ve Suwon Paper Tube'un askeri üretim ve teknik değerlendirmeleri anlık olarak sunulmaktadır."
                    : "Delivering real-time K-Defense breaking news and operational insights from Suwon Paper Tube."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onTabChange("news")}
                className="py-3 px-5 rounded-xl bg-kraft-500 hover:bg-kraft-400 text-gray-950 text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 border-0 group"
              >
                <span>{language === "ko" ? "방산뉴스 허브 전체보기" : language === "tr" ? "Savunma Haberleri Merkezine Git" : "View Defense News Hub"}</span>
                <ArrowRight className="w-4 h-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Main Featured Story Card (7 Cols) */}
            <div 
              onClick={() => onTabChange("news")}
              className="lg:col-span-7 bg-gradient-to-br from-military-900/90 via-military-850/80 to-gray-900/95 border border-military-700/80 hover:border-kraft-400/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-5">
                
                {/* Meta Top Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 py-1 px-3 rounded-md bg-red-600/90 text-white text-[11px] font-black tracking-wide">
                      <Flame className="w-3.5 h-3.5" />
                      {language === "ko" ? "최신 주요 속보" : language === "tr" ? "Son Dakika" : "Breaking News"}
                    </span>
                    <span className="py-1 px-3 rounded-md bg-military-800 text-kraft-300 text-[11px] font-mono font-bold border border-military-600/50">
                      {locFeatured.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-kraft-400" />
                    {featuredArticle.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-kraft-300 transition-colors leading-snug">
                  {locFeatured.title}
                </h3>

                {/* Image & Summary Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {featuredArticle.imageUrl && (
                    <div className="sm:col-span-5 h-44 sm:h-48 rounded-2xl overflow-hidden bg-military-950 border border-military-700/60 shrink-0">
                      <img 
                        src={featuredArticle.imageUrl} 
                        alt={locFeatured.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className={`${featuredArticle.imageUrl ? "sm:col-span-5" : "sm:col-span-12"} space-y-3`}>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-4 font-light">
                      {locFeatured.summary}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-kraft-400">
                      <span>{language === "ko" ? "출처: " : language === "tr" ? "Kaynak: " : "Source: "}{locFeatured.source}</span>
                    </div>
                  </div>
                </div>

                {/* Highlighted Perspective Box */}
                <div className="bg-gradient-to-r from-kraft-950/80 via-military-900/90 to-military-950/90 border border-kraft-500/30 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-kraft-350 text-xs font-bold font-mono uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-kraft-400" />
                    <span>
                      {language === "ko" 
                        ? "수원지관산업 제조 관점 (Suwon Manufacturing Insight)" 
                        : language === "tr" 
                          ? "Suwon Paper Üretim ve Mühendislik Perspektifi" 
                          : "Suwon Paper Manufacturing Insight"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {locFeatured.perspective}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 pt-4 border-t border-military-800/80 flex items-center justify-between text-xs text-kraft-400 font-bold group-hover:text-kraft-300">
                <span className="flex items-center gap-1">
                  {language === "ko" 
                    ? "뉴스 본문 & 군수 포장 사양 분석 전문 읽기" 
                    : language === "tr" 
                      ? "Haber Metni & Askeri Ambalaj Analizini Oku" 
                      : "Read Full Article & Military Packaging Analysis"}
                </span>
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{language === "ko" ? "자세히 보기" : language === "tr" ? "Detayları Gör" : "View Details"}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Right Real-time Feed List (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5 flex-1">
                {recentArticles.map((art, idx) => {
                  const locArt = getLocalizedNews(art, language);
                  return (
                    <div
                      key={art.id || idx}
                      onClick={() => onTabChange("news")}
                      className="p-4 rounded-2xl bg-military-900/70 hover:bg-military-850/90 border border-military-800/80 hover:border-kraft-500/50 transition-all duration-200 cursor-pointer group shadow-sm flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-kraft-350 bg-military-800 px-2 py-0.5 rounded border border-military-700/50">
                          {locArt.category}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {art.date}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-[13.5px] font-bold text-white group-hover:text-kraft-200 transition-colors leading-snug line-clamp-2">
                        {locArt.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 font-light leading-relaxed">
                        {locArt.summary}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-military-800/50 flex items-center justify-between text-[10px] text-gray-400 group-hover:text-kraft-300 font-mono">
                        <span>{locArt.source}</span>
                        <span className="flex items-center gap-0.5 font-bold">
                          {language === "ko" ? "읽기" : language === "tr" ? "Oku" : "Read"} <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Sync Status Info Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-military-950 via-gray-900 to-black border border-military-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 text-left w-full sm:w-auto">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-white">
                      {language === "ko" ? "수원지관 뉴스 실시간 연동" : language === "tr" ? "Suwon Paper Haber Senkronizasyonu" : "Suwon Paper Real-Time News Sync"}
                    </span>
                    <span className="block text-[10px] font-mono text-gray-400">
                      {language === "ko" ? "최근 동기화: " : language === "tr" ? "Son Güncelleme: " : "Last Synced: "}
                      {lastSyncTime.includes("2026") 
                        ? (language === "ko" ? "2026-08-22 (정상)" : language === "tr" ? "22.08.2026 (Aktif)" : "2026-08-22 (OK)") 
                        : lastSyncTime}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onTabChange("news")}
                  className="w-full sm:w-auto py-2 px-3.5 rounded-xl bg-military-800 hover:bg-military-750 text-kraft-300 text-xs font-bold border border-military-600 transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0 hover:border-kraft-500/60"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === "ko" ? "수원지관 동기화 센터" : language === "tr" ? "Suwon Senkronizasyon Merkezi" : "Suwon Sync Center"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. AMMUNITION TUBE CORNER KEY INTRO (탄약지환통 핵심 소개) */}
      <section className="py-20 bg-gray-50/50 border-b border-gray-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Ammunition illustration card */}
            <div className="lg:col-span-5 relative space-y-6">
              <div className="absolute -top-4 -left-4 w-36 h-36 bg-kraft-100/40 rounded-full blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-xl p-4">
                <img 
                  src="https://lh3.googleusercontent.com/d/12bfTAyaEkjVVhjr4rJlRyDT5GxiAmxCy"
                  alt="Ammunition Tube"
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-64 sm:h-72 object-cover bg-military-950"
                />
                <div className="mt-4 flex justify-between items-center bg-military-900 text-white rounded-lg p-3.5">
                  <div>
                    <span className="block text-[10px] text-kraft-300 font-mono">AMMUNITION TYPE</span>
                    <span className="block text-xs font-bold font-sans leading-tight">
                      {t.home.customQuantityConsult}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 py-0.5 px-2 rounded">
                    {t.home.sizesCustomisable}
                  </span>
                </div>
              </div>
            </div>

            {/* Content info block */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-mono font-bold text-military-800 tracking-widest uppercase bg-military-100 px-3 py-1 rounded-full">
                AMMUNITION CONTAINER
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                {t.home.ammoTitle}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {t.home.ammoDesc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-white border border-gray-150 rounded-xl space-y-1 shadow-xs">
                  <span className="text-xs font-bold text-military-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-kraft-500" />
                    {t.home.ammoPerf1Title}
                  </span>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                    {t.home.ammoPerf1Desc}
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-gray-150 rounded-xl space-y-1 shadow-xs">
                  <span className="text-xs font-bold text-military-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-kraft-500" />
                    {t.home.ammoPerf2Title}
                  </span>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                    {t.home.ammoPerf2Desc}
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onTabChange("ammunition")}
                  className="py-2.5 px-5 rounded-lg border border-military-600 hover:bg-military-50 text-military-850 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  {t.home.moreAmmoBtn}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* 2.2 WIDESCREEN PARTNER ECOSYSTEM */}
          <div className="mt-20 pt-12 border-t border-gray-200/90">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="text-left space-y-2 max-w-4xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-military-600 animate-pulse shrink-0" />
                  <h3 className="text-sm sm:text-base font-black text-military-950 uppercase tracking-wider font-sans">
                    {t.home.partnersHeader}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                  {language === "ko" 
                    ? "60년 신전통의 기술력으로 대한민국 자주국방의 핵심 유관 기관 및 체계(완성탄) 정밀 설계 기업에 공인 보존 포재를 독자 가공·공급합니다."
                    : language === "tr"
                      ? "60 yıllık birikimli üretim teknolojisiyle, Güney Kore milli savunmasının kilit kurumlarına ve mühimmat geliştirme şirketlerine onaylı koruyucu muhafazalar tedarik etmekteyiz."
                      : "Using certified 60-year precision manufacturing, Suwon Paper is the exclusive core contractor supplying to Defense Authorities and Completed Ammunition Companies."
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-military-50 to-military-100/50 border border-military-200 rounded-full self-start md:self-auto shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs text-military-900 font-extrabold font-mono tracking-wide">MIL-SPEC 100% COMPLIANT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Panel A: 핵심 수요군 */}
              <div className="lg:col-span-5 bg-gradient-to-b from-white to-gray-50/30 border border-gray-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xs flex flex-col justify-between">
                <div className="text-left space-y-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-150 pb-3.5">
                    <span className="py-0.5 px-2.5 rounded-md bg-military-900 text-kraft-350 font-mono text-[10px] sm:text-xs font-black">
                      01
                    </span>
                    <span className="font-black text-sm sm:text-base text-gray-950 tracking-tight">
                      {language === "ko" ? "핵심 수요군" : language === "tr" ? "Kilit Kurumlar" : "Defense Authorities"}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium ml-auto font-mono">Defense Authorities</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                    {language === "ko"
                      ? "군 전술 규격을 관리 수립하고 국가 영토 방위를 책임지는 핵심 거점 기관군입니다. 60년 노하우로 설계된 당사의 품질 규격을 전적으로 신뢰합니다."
                      : language === "tr"
                        ? "Askeri taktik şartnameleri yöneten ve ulusal savunmadan sorumlu olan kurumlardır. 60 yıllık uzmanlığımıza ve kalite standartlarımıza tam güven duyarlar."
                        : "Key defense organizations responsible for establishing military specifications and national territorial defense, fully trusting our 60-year engineering heritage."}
                  </p>
                </div>

                <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-4 pt-4">
                  {/* 국방부 */}
                  <div className="p-4 bg-white border border-gray-200 hover:border-military-500 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:shadow-md transition-all duration-300 group cursor-default">
                    <div className="h-14 sm:h-18 w-full flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1TMm1GB-kYqNNI3rTaKo6yLr7wd6NDKwL"
                        alt="Ministry of National Defense"
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-gray-850 tracking-tight mt-3 leading-none whitespace-nowrap">
                      {language === "ko" ? "대한민국 국방부" : "국방부 (MND)"}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-mono scale-90 mt-1 whitespace-nowrap font-medium">MND</span>
                  </div>

                  {/* 방사청 */}
                  <div className="p-4 bg-white border border-gray-200 hover:border-military-500 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:shadow-md transition-all duration-300 group cursor-default">
                    <div className="h-14 sm:h-18 w-full flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1UT5mmcEtz_gh392ncjV3jYIWIEPeBh39"
                        alt="DAPA"
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-gray-850 tracking-tight mt-3 leading-none whitespace-nowrap">
                      {language === "ko" ? "방위사업청" : "DAPA"}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-mono scale-90 mt-1 whitespace-nowrap font-medium">DAPA</span>
                  </div>

                  {/* 탄지원사 */}
                  <div className="p-4 bg-white border border-gray-200 hover:border-military-500 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:shadow-md transition-all duration-300 group cursor-default">
                    <div className="h-14 sm:h-18 w-full flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1YeEFMNVO4g_Bs1gqDJGGTifgltIHrH8H"
                        alt="Army Ammunition Support Command"
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-gray-850 tracking-tight mt-3 leading-none whitespace-nowrap">
                      {language === "ko" ? "육군 탄지원사" : "육군 탄지원사 (AASC)"}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-mono scale-90 mt-1 whitespace-nowrap font-medium">AASC</span>
                  </div>
                </div>
              </div>

              {/* Panel B: 체계(완성탄)업체 */}
              <div className="lg:col-span-7 bg-gradient-to-b from-white to-gray-50/30 border border-gray-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xs flex flex-col justify-between">
                <div className="text-left space-y-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-150 pb-3.5">
                    <span className="py-0.5 px-2.5 rounded-md bg-kraft-900 text-kraft-350 font-mono text-[10px] sm:text-xs font-black">
                      02
                    </span>
                    <span className="font-black text-sm sm:text-base text-gray-950 tracking-tight">
                      {language === "ko" ? "체계(완성탄)업체 & 주요 협력사" : language === "tr" ? "Mühimmat Entegratörleri" : "Ammunition System Integrators"}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium ml-auto font-mono font-sans">Ammunition Partners</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                    {language === "ko"
                      ? "탄약지환통에 보존적재될 최종 탄약 및 전술 완성탄 하드웨어를 설계·조립하는 국내 굴지의 대표 방위산업종합 제조 파트너입니다."
                      : language === "tr"
                        ? "Karton muhafazaların içine yerleştirilecek nihai canlı mühimmatları ve taktik donanımları tasarlayıp birleştiren lider savunma sanayii entegratörleridir."
                        : "Leading defense prime contractors that design and assemble state-of-the-art live ammunition and tactical weapon hardware loaded inside our containers."}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {/* 한화에어로 */}
                  <div className="p-4 bg-white border border-gray-200 hover:border-kraft-500 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:shadow-md transition-all duration-300 group cursor-default">
                    <div className="h-14 sm:h-18 w-full flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1q04UKpLEFNpXhY5L49l5usZC7kzHaZX5"
                        alt="Hanwha Aerospace"
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-gray-850 tracking-tight mt-3 leading-none whitespace-nowrap">
                      {language === "ko" ? "한화에어로" : "한화에어로"}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-mono scale-90 mt-1 whitespace-nowrap font-medium">Hanwha</span>
                  </div>

                  {/* 풍산 */}
                  <div className="p-4 bg-white border border-gray-200 hover:border-kraft-500 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:shadow-md transition-all duration-300 group cursor-default">
                    <div className="h-14 sm:h-18 w-full flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1IBcG1Fg2fmYoP1rqV9pa6HPigwSAw4vo"
                        alt="Poongsan"
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-gray-850 tracking-tight mt-3 leading-none whitespace-nowrap">
                      {language === "ko" ? "풍산" : "풍산"}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-mono scale-90 mt-1 whitespace-nowrap font-medium">Poongsan</span>
                  </div>

                  {/* 삼양화학 */}
                  <div className="p-4 bg-white border border-gray-200 hover:border-kraft-500 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:shadow-md transition-all duration-300 group cursor-default">
                    <div className="h-14 sm:h-18 w-full flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1LiuhnDf3UFNy3gik9GlhOxUWAn1ybVhj"
                        alt="Samyang Chemical"
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-gray-850 tracking-tight mt-3 leading-none whitespace-nowrap">
                      {language === "ko" ? "삼양화학" : "삼양화학"}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-mono scale-90 mt-1 whitespace-nowrap font-medium">Samyang</span>
                  </div>

                  {/* LIG넥스원 */}
                  <div className="p-4 bg-white border border-gray-200 hover:border-kraft-500 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:shadow-md transition-all duration-300 group cursor-default">
                    <div className="h-14 sm:h-18 w-full flex items-center justify-center">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1-4Y0wX-5omGAIOH_Ih5pfVtGLIwdOxUm"
                        alt="LIG Nex1"
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-xs sm:text-[13px] font-extrabold text-gray-850 tracking-tight mt-3 leading-none whitespace-nowrap">
                      {language === "ko" ? "LIG넥스원" : "LIG넥스원"}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-400 font-mono scale-90 mt-1 whitespace-nowrap font-medium">LIG Nex1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIAL TUBE CORNER KEY INTRO (일반지관 생산 가능 안내) */}
      <section className="py-20 bg-white border-b border-gray-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-none">
          <div className="space-y-12">
            
            {/* Top row: Text info & description */}
            <div className="max-w-4xl space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-kraft-520 rounded-full" />
                <span className="text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-50/80 border border-kraft-100 px-3 py-1 rounded-md">
                  INDUSTRIAL PAPER TUBE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3.5xl font-black text-gray-950 tracking-tight leading-tight">
                {t.home.industrialTitle}
              </h2>
              <p className="text-gray-650 text-sm sm:text-[15px] leading-relaxed font-light">
                {t.home.industrialDesc}
              </p>
            </div>
            
            {/* 3-Column Premium Bento Spec Cards (Full width for maximum screen usage) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Card 1: Small Cores */}
              <div 
                className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100/40 p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-kraft-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer"
                onClick={() => onTabChange("industrial")}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-100 px-2.5 py-1 rounded-md">
                      01 / PRECISION
                    </span>
                    <div className="p-2 bg-kraft-50 text-kraft-600 group-hover:bg-military-900 group-hover:text-kraft-350 rounded-xl transition-colors duration-300">
                      <Settings className="w-4.5 h-4.5 shrink-0" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                      {t.home.indCat1}
                    </h3>
                    <span className="inline-block mt-1.5 text-[10px] font-mono font-extrabold text-kraft-700 bg-kraft-50 border border-kraft-100 px-2 py-0.5 rounded">
                      내경/Inner Ø10 ~ Ø50mm • T 1 ~ 5mm
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                    {t.home.indCat1Desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-gray-150 flex items-center justify-between text-xs text-kraft-700 font-bold group-hover:text-gray-950 duration-200">
                  <span>{language === "ko" ? "사양 가이드 보기" : language === "tr" ? "Teknik Detaylar" : "Specs Guide"}</span>
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Medium Cores */}
              <div 
                className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100/40 p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-kraft-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer"
                onClick={() => onTabChange("industrial")}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-100 px-2.5 py-1 rounded-md">
                      02 / STANDARD
                    </span>
                    <div className="p-2 bg-kraft-50 text-kraft-600 group-hover:bg-military-900 group-hover:text-kraft-350 rounded-xl transition-colors duration-300">
                      <Layers className="w-4.5 h-4.5 shrink-0" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                      {t.home.indCat2}
                    </h3>
                    <span className="inline-block mt-1.5 text-[10px] font-mono font-extrabold text-kraft-700 bg-kraft-50 border border-kraft-100 px-2 py-0.5 rounded">
                      내경/Inner Ø50 ~ Ø150mm • T 3 ~ 10mm
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                    {t.home.indCat2Desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-gray-150 flex items-center justify-between text-xs text-kraft-700 font-bold group-hover:text-gray-950 duration-200">
                  <span>{language === "ko" ? "사양 가이드 보기" : language === "tr" ? "Teknik Detaylar" : "Specs Guide"}</span>
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Large Cores */}
              <div 
                className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100/40 p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-kraft-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer"
                onClick={() => onTabChange("industrial")}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-100 px-2.5 py-1 rounded-md">
                      03 / HEAVY DUTY
                    </span>
                    <div className="p-2 bg-kraft-50 text-kraft-600 group-hover:bg-military-900 group-hover:text-kraft-350 rounded-xl transition-colors duration-300">
                      <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                      {t.home.indCat3}
                    </h3>
                    <span className="inline-block mt-1.5 text-[10px] font-mono font-extrabold text-kraft-700 bg-kraft-50 border border-kraft-100 px-2 py-0.5 rounded">
                      내경/Inner Ø150 ~ Ø500mm • T 5 ~ 25mm
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                    {t.home.indCat3Desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-gray-150 flex items-center justify-between text-xs text-kraft-700 font-bold group-hover:text-gray-950 duration-200">
                  <span>{language === "ko" ? "사양 가이드 보기" : language === "tr" ? "Teknik Detaylar" : "Specs Guide"}</span>
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Action button matching group style */}
            <div className="pt-2 text-left">
              <button
                onClick={() => onTabChange("industrial")}
                className="group relative inline-flex items-center gap-2 py-3 px-6 rounded-xl border border-kraft-500 bg-kraft-50 hover:bg-kraft-100 hover:border-kraft-600 text-kraft-900 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shadow-3xs hover:shadow active:scale-98"
              >
                {t.home.moreIndBtn}
                <ChevronRight className="w-4 h-4 text-kraft-700 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Bottom Row: Large wide horizontal image cards */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. 권취용 지관 Card */}
                <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-md p-4 hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                  <div className="bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-4 h-64 sm:h-80 md:h-[350px] lg:h-[400px]">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1Jlt5fXYzYDQRlf8P-8qGFw9idrgZNmOE"
                      alt={t.home.windingCard}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="inline-block bg-kraft-50 text-kraft-900 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border border-kraft-100 shadow-3xs">
                        {t.home.windingCard}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">SPINNING CORE</span>
                  </div>
                </div>

                {/* 2. 포장용 지통 Card */}
                <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md p-4 hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                  <div className="bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-4 h-64 sm:h-80 md:h-[350px] lg:h-[400px]">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1okYLonZ8wBHx0tWwcBo8cSiF1ruH-FL5"
                      alt={t.home.packagingCard}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="inline-block bg-military-50 text-military-850 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border border-military-100 shadow-3xs">
                        {t.home.packagingCard}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">PREMIUM PACKAGING</span>
                  </div>
                </div>
              </div>

              {/* Info ribbon below the two cards */}
              <div className="flex justify-between items-center bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3.5 shadow-3xs">
                <span className="text-[11px] sm:text-xs font-bold flex items-center gap-1.5 text-gray-700">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t.home.ecoRibbon}
                </span>
                <span className="text-[9px] font-mono text-gray-400 uppercase font-black tracking-wider">ECO-FRIENDLY</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SHORTCUT GRID: SIMULATOR & STOCK SALES (규격 시뮬레이터 & 재고판매 바로가기) */}
      <section className="py-16 bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Quick Card 1: Specs Simulator shortcut */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all text-left">
              <div className="space-y-4">
                <div className="p-3.5 bg-military-50 text-military-700 rounded-xl w-fit">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t.home.simTitle}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
                  {t.home.simDesc}
                </p>
              </div>
              <button
                onClick={() => onTabChange("simulator")}
                className="mt-6 py-2.5 px-4 rounded-xl bg-military-600 hover:bg-military-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all self-start border-0"
              >
                {t.home.simBtn}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Card 2: Stock Sales shortcut */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all text-left">
              <div className="space-y-4">
                <div className="p-3.5 bg-kraft-50 text-kraft-700 rounded-xl w-fit">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t.home.stockTitle}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
                  {t.home.stockDesc}
                </p>
              </div>
              <button
                onClick={() => onTabChange("stock")}
                className="mt-6 py-2.5 px-4 rounded-xl bg-kraft-500 hover:bg-kraft-600 text-gray-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all self-start border-0"
              >
                {t.home.stockBtn}
                <ChevronRight className="w-4 h-4 text-gray-950" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. QUALITY & PRODUCTION WRAP (품질·생산 요약) */}
      <section className="py-20 bg-military-950 text-white relative overflow-hidden font-sans">
        <div className="absolute inset-0 tech-grid-dark opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-left space-y-6">
            <span className="text-xs font-mono font-bold text-kraft-400 tracking-widest uppercase">
              RELIABLE PROCESS & HISTORIC EXPERTISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t.home.qualityTitle}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light break-keep whitespace-pre-line">
              {t.home.qualityDesc}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="border-l border-kraft-500/40 pl-4 space-y-1">
                <span className="block font-mono text-xs text-kraft-300 font-bold tracking-widest">EST. 1964</span>
                <span className="block text-sm font-semibold">
                  {t.home.qualityStat1}
                </span>
              </div>
              <div className="border-l border-kraft-500/40 pl-4 space-y-1">
                <span className="block font-mono text-xs text-kraft-300 font-bold tracking-widest">DEFENSE EXPERIENCE</span>
                <span className="block text-sm font-semibold">
                  {t.home.qualityStat2}
                </span>
              </div>
              <div className="border-l border-kraft-500/40 pl-4 space-y-1">
                <span className="block font-mono text-xs text-kraft-300 font-bold tracking-widest">ISO 9001 / 14001</span>
                <span className="block text-sm font-semibold">
                  {t.home.qualityStat3}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onTabChange("quality")}
                className="py-3 px-6 rounded-xl bg-kraft-500 text-gray-950 font-bold text-xs hover:bg-kraft-600 transition-all cursor-pointer flex items-center justify-center gap-1.5 border-0"
              >
                {t.home.qualityBtn}
                <ChevronRight className="w-4 h-4 text-gray-950" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM BANNER INQUIRY ACTION BUTTON (문의하기 버튼) */}
      <section className="py-20 bg-white font-sans text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
            {t.home.bottomTitle}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-light mt-4 max-w-2xl mx-auto leading-relaxed">
            {t.home.bottomDesc}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => onTabChange("contact")}
              className="py-3.5 px-8 rounded-xl bg-military-850 hover:bg-military-900 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-lg active:scale-95 transition-all border-0"
            >
              {t.home.bottomBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 7. HIGH-RESOLUTION ZOOM MODAL (탄약지환통 고해상도 확대 뷰어 모달) */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 lg:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2.5">
                <span className="bg-kraft-500 text-gray-950 text-[11px] font-mono font-black px-2.5 py-1 rounded">
                  {activeAmmoSlide.tag}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    {activeAmmoSlide.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono hidden sm:block">
                    {activeAmmoSlide.spec}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-400 bg-military-900 px-3 py-1 rounded-lg border border-military-800">
                  {`0${currentAmmoIdx + 1} / 0${AMMO_PRODUCT_SLIDES.length}`}
                </span>
                <button
                  onClick={() => setIsZoomModalOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="닫기 (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Main Image Stage */}
            <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4" onClick={(e) => e.stopPropagation()}>
              {/* Prev Button */}
              <button
                onClick={handlePrevAmmoSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-military-800 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-110 z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Main Enlarged Image */}
              <div className="w-full h-full max-h-[72vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeAmmoSlide.id}
                    src={activeAmmoSlide.url}
                    alt={activeAmmoSlide.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-military-800/80 bg-gradient-to-b from-military-950 to-black p-3"
                  />
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextAmmoSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-military-800 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-110 z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Bottom Thumbnail Strip & Detail Bar */}
            <div className="max-w-6xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-military-900/90 border border-military-800 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs sm:text-sm font-bold text-kraft-300 block">
                    {activeAmmoSlide.sub}
                  </span>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {activeAmmoSlide.desc}
                  </p>
                </div>

                {/* Thumbnails */}
                <div className="flex items-center gap-2">
                  {AMMO_PRODUCT_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentAmmoIdx(idx)}
                      className={`relative w-12 h-10 sm:w-14 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-black ${
                        currentAmmoIdx === idx
                          ? "border-kraft-400 scale-105 shadow-[0_0_10px_rgba(230,180,80,0.6)]"
                          : "border-gray-700 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={slide.url}
                        alt={slide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
