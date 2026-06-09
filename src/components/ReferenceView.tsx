/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo } from "react";
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase, 
  Info, 
  ExternalLink,
  Award,
  Users,
  Search,
  Filter,
  Check,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface ReferenceViewProps {
  onTabChange?: (tabId: string) => void;
}

export default function ReferenceView({ onTabChange }: ReferenceViewProps) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "gov" | "def-corp" | "ind">("all");

  // Dynamic translated helper UI strings
  const searchPlaceholder = useMemo(() => {
    switch (language) {
      case "ko": return "기관명, 기업명 또는 업무 분야를 입력해보세요...";
      case "tr": return "Kurum, şirket adı veya faaliyet alanı aratın...";
      default: return "Search by organization, company, or task area...";
    }
  }, [language]);

  const searchLabel = language === "ko" ? "네트워크 검색" : language === "tr" ? "Arama" : "Network Search";
  
  const filterLabels = {
    all: language === "ko" ? "전체 네트워크" : language === "tr" ? "Tüm Liste" : "Full Network",
    gov: language === "ko" ? "공공 및 군 관련기관" : language === "tr" ? "Devlet/Askeri Kurumlar" : "Gov & Military",
    "def-corp": language === "ko" ? "지정방산업체" : language === "tr" ? "Savunma Sanayi Devleri" : "Defense Giants",
    ind: language === "ko" ? "일반 제조/산업체" : language === "tr" ? "Endüstriyel & Diğer" : "Industrial Partners"
  };

  const getBadgeColors = (color?: string) => {
    switch (color) {
      case "military":
        return "bg-military-50 text-military-800 border-military-100/80";
      case "blue":
        return "bg-blue-50 text-blue-800 border-blue-100/80";
      case "red":
        return "bg-red-50 text-red-800 border-red-100/80";
      case "amber":
        return "bg-amber-50 text-amber-800 border-amber-100/80";
      case "green":
        return "bg-emerald-50 text-emerald-800 border-emerald-150";
      case "kraft":
        return "bg-kraft-50 text-kraft-850 border-kraft-150";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200/80";
    }
  };

  const governmentOrgs = [
    { 
      name: language === "ko" 
        ? "대한민국 국방부" 
        : language === "tr" 
          ? "Kore Cumhuriyeti Savunma Bakanlığı" 
          : "Ministry of National Defense (MND)", 
      type: language === "ko" 
        ? "조달 및 표준화 관련" 
        : language === "tr" 
          ? "Askeri Tedarik ve Şartname Teknik Görüşme" 
          : "Procurement & Standardization Standards",
      logo: "https://lh3.googleusercontent.com/d/1TMm1GB-kYqNNI3rTaKo6yLr7wd6NDKwL",
      initials: "MND",
      color: "military",
      category: "gov"
    },
    { 
      name: language === "ko" 
        ? "육군 탄약지원사령부" 
        : language === "tr" 
          ? "Kara Kuvvetleri Mühimmat Destek Komutanlığı" 
          : "Army Ammunition Support Command", 
      type: language === "ko" 
        ? "탄약지환통 검증 제품 공급" 
        : language === "tr" 
          ? "Mühimmat Kutusu Tedarik ve Taşıma Doğrulama" 
          : "Packaging Verification & Core Supply",
      logo: "https://lh3.googleusercontent.com/d/1YeEFMNVO4g_Bs1gqDJGGTifgltIHrH8H",
      initials: "AASC",
      color: "military",
      category: "gov"
    },
    { 
      name: language === "ko" 
        ? "방위사업청" 
        : language === "tr" 
          ? "Savunma Tedarik Programı Ajansı (DAPA)" 
          : "Defense Acquisition Program Administration (DAPA)", 
      type: language === "ko" 
        ? "방산물자 사업 검토 협의" 
        : language === "tr" 
          ? "Resmi Savunma Sipariş Koşulları Danışma" 
          : "Defense Material Business Review Alignment",
      logo: "https://lh3.googleusercontent.com/d/1UT5mmcEtz_gh392ncjV3jYIWIEPeBh39",
      initials: "DAPA",
      color: "blue",
      category: "gov"
    },
    { 
      name: language === "ko" 
        ? "한국방위산업진흥회" 
        : language === "tr" 
          ? "Kore Savunma Sanayii Derneği (KDIA)" 
          : "Korea Defense Industry Association (KDIA)", 
      type: language === "ko" 
        ? "정회원 활동 및 규격 연구" 
        : language === "tr" 
          ? "Aktif Üye İşbirlikleri ve Standart Analizler" 
          : "Active Member Collaborations & Standard Research",
      initials: "KDIA",
      color: "military",
      category: "gov"
    },
    { 
      name: language === "ko" 
        ? "국방기술품질원" 
        : language === "tr" 
          ? "Savunma Teknolojisi 및 Kalite Ajansı (DTaQ)" 
          : "Defense Agency for Technology and Quality (DTaQ)", 
      type: language === "ko" 
        ? "품질보증 및 제도 협의 이력" 
        : language === "tr" 
          ? "Kalite Güvence ve Şartname Uygunluk Testler" 
          : "Quality Assurance & Production Audit Track",
      initials: "DTaQ",
      color: "blue",
      category: "gov"
    },
    { 
      name: language === "ko" 
        ? "국방과학연구소" 
        : language === "tr" 
          ? "Savunma Geliştirme Ajansı (ADD)" 
          : "Agency for Defense Development (ADD)", 
      type: language === "ko" 
        ? "시제품 가공 자문 및 품질 기술" 
        : language === "tr" 
          ? "Askeri Prototipler İmalat ve AR-GE İşbirliği" 
          : "Prototype Material Consultation & R&D Projects",
      initials: "ADD",
      color: "red",
      category: "gov"
    },
    { 
      name: language === "ko" 
        ? "국방기술진흥연구소" 
        : language === "tr" 
          ? "Savunma Teknolojilerini Teşvik Enstitüsü (KRIT)" 
          : "Korea Research Institute for Defense Technology (KRIT)", 
      type: language === "ko" 
        ? "장기 보존 패키지 선도 조사" 
        : language === "tr" 
          ? "Uzun Dönem Koruyucu Paketleme Teknik Çalışmalar" 
          : "Next-Gen Tactical Storage Material Alignment",
      initials: "KRIT",
      color: "amber",
      category: "gov"
    }
  ];

  const corporateClients = [
    { 
      name: language === "ko" ? "한화에어로스페이스" : "Hanwha Aerospace", 
      biz: language === "ko" 
        ? "방산용 특수 패키지 협의" 
        : language === "tr" 
          ? "Savunma Sanayi Özel Ambalaj Projeleri" 
          : "Special Defense Packaging Specifications",
      logo: "https://lh3.googleusercontent.com/d/1q04UKpLEFNpXhY5L49l5usZC7kzHaZX5",
      link: "https://www.hanwhaaerospace.co.kr",
      initials: "HANWHA",
      color: "kraft",
      category: "def-corp"
    },
    { 
      name: language === "ko" ? "풍산" : "Poongsan Corporation", 
      biz: language === "ko" 
        ? "탄종 유격 장비 포장 지재 가공" 
        : language === "tr" 
          ? "Balistik Mühimmat Koruyucu Masura İmalati" 
          : "Ballistic Ammo Protective Core Fabrication",
      logo: "https://lh3.googleusercontent.com/d/1IBcG1Fg2fmYoP1rqV9pa6HPigwSAw4vo",
      link: "https://www.poongsan.co.kr",
      initials: "POONGSAN",
      color: "kraft",
      category: "def-corp"
    },
    { 
      name: language === "ko" ? "삼양화학공업" : "Samyang Chemical", 
      biz: language === "ko" 
        ? "내화학 기밀성 지관 조립 검토" 
        : language === "tr" 
          ? "Yüksek Korozyon Dirençli Tüp İnceleme" 
          : "Corrosive-Resistant Tube Alignments",
      logo: "https://lh3.googleusercontent.com/d/1LiuhnDf3UFNy3gik9GlhOxUWAn1ybVhj",
      link: "http://www.samyangchem.co.kr",
      initials: "SAMYANG",
      color: "kraft",
      category: "def-corp"
    },
    { 
      name: language === "ko" ? "LIG넥스원" : "LIG Nex1", 
      biz: language === "ko" 
        ? "정밀 안전 방전 유도 지관 대응" 
        : language === "tr" 
          ? "Hassas Askeri Elektronik Koruyucu Boru" 
          : "Strategic Precision Shielding Sleeves",
      logo: "https://lh3.googleusercontent.com/d/1-4Y0wX-5omGAIOH_Ih5pfVtGLIwdOxUm",
      link: "https://www.lignex1.com",
      initials: "LIG NEX1",
      color: "kraft",
      category: "def-corp"
    },
    { 
      name: language === "ko" ? "한국CNO테크" : "Korea CNO Tech", 
      biz: language === "ko" 
        ? "시생산 탄종 차단 패키지 운용" 
        : language === "tr" 
          ? "Eğitim Mühimmatı Koruyucu Ambalajlama" 
          : "Tactical Blank Ammo Transport Packs",
      initials: "CNO TECH",
      color: "military",
      category: "def-corp"
    },
    { 
      name: language === "ko" ? "고려화공" : "Koryo Pyro", 
      biz: language === "ko" 
        ? "화공 자재 방습 실링관 기장 검토" 
        : language === "tr" 
          ? "Kimyasal Malzeme Nem Yalıtımlı Kapak" 
          : "Pyrotechnic Moisture Barrier Sleeves",
      initials: "KORYO",
      color: "red",
      category: "def-corp"
    },
    { 
      name: language === "ko" ? "FITS 에프아이티에스" : "FITS Corporation", 
      biz: language === "ko" 
        ? "고강도 산업용 코어 롤 지관" 
        : language === "tr" 
          ? "Endüstriyel Mukavemetli Bobin Göbeği" 
          : "Heavy-Gauge Winding Industrial Cores",
      initials: "FITS",
      color: "blue",
      category: "ind"
    },
    { 
      name: language === "ko" ? "대신코퍼레이션" : "Daeshin Corp", 
      biz: language === "ko" 
        ? "수송 하중 분산 지관 보호캡" 
        : language === "tr" 
          ? "Lojistik Yük Dağıtıcı Koruyucu Parça" 
          : "Heavy Transits Cushioning Overpacks",
      initials: "DAESHIN",
      color: "amber",
      category: "ind"
    },
    { 
      name: language === "ko" ? "대화공업" : "Daehwa Industry", 
      biz: language === "ko" 
        ? "기계 와인딩 특화 자재 검토" 
        : language === "tr" 
          ? "Makine Sarımı Özel Mukavva Borular" 
          : "High-Speed Bobbin Rolling Sleeves",
      initials: "DAEHWA",
      color: "gray",
      category: "ind"
    },
    { 
      name: language === "ko" ? "동양정공" : "Dongyang Precision", 
      biz: language === "ko" 
        ? "스틸 조립 보강 플랜지 기술" 
        : language === "tr" 
          ? "Metal Destek Çemberi Kaynak Kalite" 
          : "Steel Band Stamping Reinforcement",
      initials: "DYP",
      color: "blue",
      category: "ind"
    },
    { 
      name: language === "ko" ? "케이씨아이" : "KCI Adhesive Co", 
      biz: language === "ko" 
        ? "정밀 점착 가공 배합 기밀성" 
        : language === "tr" 
          ? "Özel Reçine Karışım Sızdırmazlığı" 
          : "Complex Liquid Resin Isolation",
      initials: "KCI ADHESIVE",
      color: "amber",
      category: "ind"
    },
    { 
      name: language === "ko" ? "페리만" : "Ferriman Co", 
      biz: language === "ko" 
        ? "배송 및 투명 랩 권취용 튜브" 
        : language === "tr" 
          ? "Yüksek Gerilimli Stretch Film Rulosu" 
          : "Stretch film high-tension winders",
      initials: "FERRIMAN",
      color: "military",
      category: "ind"
    },
    { 
      name: language === "ko" ? "티젠" : "Teazen Core Mfg", 
      biz: language === "ko" 
        ? "특수 대경 축 압축 강도 조율" 
        : language === "tr" 
          ? "Büyük Çaplı Eksenel Ezilme Ayarı" 
          : "Articulated Large-Bore Compression",
      initials: "TEAZEN",
      color: "green",
      category: "ind"
    },
    { 
      name: language === "ko" ? "기타 산업용 지관 및 포장재 관련 고객사" : "Other Industrial Core & Tube Enterprise Clients", 
      biz: language === "ko" 
        ? "공업 배송 및 튜브 가공 네트워크" 
        : language === "tr" 
          ? "Endüstriyel Boru Dağıtım ve Lojistik" 
          : "National Industrial Tubes Logistics",
      initials: "ETC CLIENTS",
      color: "gray",
      category: "ind"
    }
  ];

  const introCards = [
    {
      num: "01",
      eng: "Defense & Government Related Organizations",
      title: language === "ko" ? "관련기관 협력" : language === "tr" ? "Müteahhit Kurumlar" : "Organizations",
      desc: language === "ko"
        ? "군수품 포장, 품질관리, 조달 및 기술 검토 분야에서 오랜 관련 업무 신뢰와 규격 협증 경험을 완벽히 축적하고 있습니다."
        : language === "tr"
          ? "Mühimmat paketleme, askeri kalite denetimi ve şartname inceleme konularında üst düzey lojistik paydaşlığı yürüttük."
          : "We have acquired professional technical backgrounds working closely in defense-packaging alignments and material reviews."
    },
    {
      num: "02",
      eng: "Defense & Industrial Clients",
      title: language === "ko" ? "핵심 기업 거래망" : language === "tr" ? "Kurumsal Müşteriler" : "Enterprise Clients",
      desc: language === "ko"
        ? "국내 대표 방산 기업, 정밀 화학, 첨단 산업용 제조 기업까지 최고 품질의 고강도 지관을 중단없이 적기 생산 및 정밀 포장 협력 중입니다."
        : language === "tr"
          ? "Küresel savunma sanayi, petrokimya 및 bobin sarama sektörünün dev markalarıyla ürün tedariki yapmaktayız."
          : "We supply ballistic pack sleeves and bespoke winding cylinders to top chemical, aerospace, and metallurgy groups."
    },
    {
      num: "03",
      eng: "Custom Manufacturing Network",
      title: language === "ko" ? "맞춤형 기술 설계" : language === "tr" ? "Özel Üretim Ekosistemi" : "Bespoke Manufacturing",
      desc: language === "ko"
        ? "수백 종에 달하는 자체 금형 및 방습 왁싱 배합 노하우를 살려 특수한 환경과 대구경 기밀 조건에도 1:1 커스텀 맞춤 대응이 가능합니다."
        : language === "tr"
          ? "Farklı uzunluk, iç çap, duvar kalınlığı ve neme dayanıklılık limitlerine uygun dairesel konik 및 silindirik üretim çözümleri."
          : "Provides full-scope customization services adjusting bore width, density rating, and moisture wax recipes."
    }
  ];

  // Merge government and corporate clients into a unified list for filter & search, keeping their respective tags
  const allPartnersCombined = useMemo(() => {
    const list = [
      ...governmentOrgs.map(item => ({ 
        ...item, 
        isGov: true, 
        isCorp: false, 
        biz: "", 
        link: "", 
        subTitle: item.type 
      })),
      ...corporateClients.map(item => ({ 
        ...item, 
        isGov: false, 
        isCorp: true, 
        type: "", 
        logo: item.logo || "", 
        link: item.link || "", 
        subTitle: item.biz 
      }))
    ];

    return list.filter(item => {
      // Metric Filter Check
      if (activeCategory === "gov" && !item.isGov) return false;
      if (activeCategory === "def-corp" && (item.category !== "def-corp" || !item.isCorp)) return false;
      if (activeCategory === "ind" && (item.category !== "ind" || !item.isCorp)) return false;

      // Query Search Check
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(query);
        const bizMatch = item.subTitle.toLowerCase().includes(query);
        const initials = item.initials.toLowerCase().includes(query);
        return nameMatch || bizMatch || initials;
      }

      return true;
    });
  }, [searchQuery, activeCategory, language]);

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const cardFadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 16 } 
    }
  };

  return (
    <div className="bg-[#fcfdfa] min-h-screen pt-28 pb-20 font-sans text-left relative overflow-hidden">
      {/* Premium subtle background accents */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#e5ebe4]/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 right-[-10%] w-96 h-96 bg-[#c49861]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] left-[-10%] w-[500px] h-[500px] bg-military-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with tech grid texture overlay */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-0 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 tech-grid opacity-[0.25] pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-military-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="relative">
            <span className="text-xs font-mono font-black text-military-800 tracking-widest uppercase bg-military-100/70 border border-military-200/80 px-3 py-1.5 rounded inline-flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-military-600 animate-pulse" />
              {t.referencePage.badge}
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight font-display">
              {language === "ko" ? (
                <span className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                  <span className="text-4xl sm:text-6xl font-extrabold text-military-850 font-mono tracking-tighter">60</span>
                  <span>년 제조 경험으로 이어온 신뢰 네트워크</span>
                </span>
              ) : (
                t.referencePage.title
              )}
            </h1>
            <div className="w-20 h-1.5 bg-kraft-500 mt-5 rounded-full" />

            {/* Custom Description Layout */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <p className="lg:col-span-7 text-gray-800 text-sm sm:text-base leading-relaxed font-semibold break-keep">
                {t.referencePage.descBold}
              </p>
              <div className="lg:col-span-5 p-4 rounded-xl bg-kraft-50/60 border border-kraft-100 text-gray-600 text-xs sm:text-sm font-light leading-relaxed break-keep">
                {t.referencePage.descLight}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Interactive Stats / Core Trust Metrics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-5 bg-gradient-to-br from-white to-military-50/20 border border-military-105 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-military-600/10 flex items-center justify-center text-military-700 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-black text-military-800 font-mono tracking-tight">45+ Years</span>
              <span className="text-xs text-gray-500 font-medium">
                {language === "ko" ? "군수/산업 보조 포장 전문 지위" : "Military Packaging Authority"}
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-5 bg-gradient-to-br from-white to-kraft-50/30 border border-kraft-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-kraft-500/10 flex items-center justify-center text-kraft-700 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-black text-kraft-700 font-mono tracking-tight">Mil-Spec Verified</span>
              <span className="text-xs text-gray-500 font-medium">
                {language === "ko" ? "엄격한 군품격 심사 및 시험 충족" : "Rigid Quality Audit Passed"}
              </span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-5 bg-gradient-to-br from-white to-blue-50/10 border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-700 shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-black text-blue-800 font-mono tracking-tight">108+ Molds</span>
              <span className="text-xs text-gray-500 font-medium">
                {language === "ko" ? "신규 금형 비용 면제 혜택" : "Pre-engineered Mold Directory"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3 Overview Segment Cards Plan */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-8 border-l-4 border-military-700 pl-4 tracking-tight">
            {language === "ko" ? "신뢰 협동 가치 분류" : language === "tr" ? "Güven Değer Odakları" : "Collaboration Segments"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {introCards.map((card, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, shadow: "0 10px 25px -5px rgba(0,0,0,0.06)" }}
                key={idx} 
                className="p-7 rounded-2xl border border-gray-200 bg-white hover:border-military-500 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-military-50 to-transparent rounded-full opacity-60 group-hover:scale-150 transition-transform duration-500" />
                <span className="absolute top-5 right-5 text-4xl font-extrabold text-gray-100/80 font-mono group-hover:text-military-100/40 transition-colors">
                  {card.num}
                </span>
                <div>
                  <span className="block text-[10px] font-mono font-extrabold text-kraft-600 uppercase tracking-widest mb-3">
                    {card.eng}
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 block group-hover:text-military-700 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed break-keep">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-end text-neutral-300 group-hover:text-military-500 transition-colors">
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Interactive Partner Explorer */}
        <div className="border-t border-gray-100 pt-16 mb-20" id="explorer">
          
          {/* Header Title with Subtext */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f0d] flex items-center gap-2.5 tracking-tight">
                <ShieldCheck className="w-7 h-7 text-military-700 shrink-0" />
                {language === "ko" ? "수원 파트너십 네트워크" : "Suwon Partnership Network"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light mt-2 max-w-2xl leading-relaxed">
                {language === "ko" ? "대한민국 육군본부, 조달 부서 등의 핵심 국가기관들과 현대 로템, 한화 등의 방위기지 지정방산업체 거래망을 직접 확인하실 수 있습니다." : "Verify our long-standing relationships supporting elite institutions and major defense contractors."}
              </p>
            </div>
            
            {/* Inline Count Indicator */}
            <div className="bg-military-50 border border-military-100 text-military-800 text-xs px-3.5 py-1.5 rounded-full font-mono font-bold self-start mt-2 md:mt-0 flex items-center gap-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-military-600 animate-ping" />
              <span>Total Active Partners: {allPartnersCombined.length}</span>
            </div>
          </div>

          {/* Interactive Toolbar: Category Tab & Word Search */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-md shadow-gray-100/50 mb-8 space-y-4">
            
            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase text-gray-400 mr-2 flex items-center gap-1 font-mono">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {(Object.keys(filterLabels) as Array<"all" | "gov" | "def-corp" | "ind">).map(catKey => {
                const isActive = activeCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => {
                      setActiveCategory(catKey);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border-0 cursor-pointer ${
                      isActive 
                        ? "bg-military-850 text-white shadow-md shadow-military-800/10 select-none scale-102" 
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {filterLabels[catKey]}
                  </button>
                );
              })}
            </div>

            {/* Search Box Row */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400 rounded-xl pl-10 pr-10 py-3 border border-gray-200 focus:border-military-500 focus:ring-2 focus:ring-military-500/10 focus:outline-none transition-all text-xs sm:text-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Combined Dynamic Grid Rendering */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            key={`${activeCategory}-${searchQuery}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {allPartnersCombined.length > 0 ? (
                allPartnersCombined.map((partner, idx) => {
                  const isGov = partner.isGov;
                  // If it's corporate, confirm active external link
                  const hasActiveLink = partner.isCorp && !!partner.link;

                  const CardInner = (
                    <div className="relative p-5 h-36 flex flex-col justify-between overflow-hidden group bg-linear-to-b from-white to-gray-50/40">
                      
                      {/* Watermark Logo Backing */}
                      {partner.logo ? (
                        <img 
                          src={partner.logo} 
                          alt="" 
                          className="absolute right-[-15px] bottom-[-15px] h-28 w-28 object-contain opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 group-hover:rotate-[-8deg] transition-all duration-500 pointer-events-none select-none filter contrast-125 saturate-50"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="absolute right-2 -bottom-4 text-[42px] font-mono font-black tracking-tighter text-gray-400 opacity-[0.04] group-hover:opacity-[0.09] transition-all duration-500 pointer-events-none select-none leading-none">
                          {partner.initials}
                        </span>
                      )}

                      {/* Accent Top Dot */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#141d16]/5 group-hover:bg-military-500 transition-colors" />

                      {/* Card Header Content */}
                      <div className="space-y-1.5 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className={`text-[8.5px] font-mono font-black tracking-widest px-2 py-0.5 rounded border ${
                            isGov 
                              ? "bg-military-50 text-military-800 border-military-100" 
                              : "bg-kraft-50 text-kraft-700 border-kraft-100"
                          }`}>
                            {isGov ? t.referencePage.tableThOrg : t.referencePage.tableThClient}
                          </span>
                          
                          {/* Go to web label */}
                          {hasActiveLink && (
                            <div className="text-[8px] text-kraft-900 font-bold bg-kraft-50 border border-kraft-100/60 px-1.5 py-0.5 rounded flex items-center gap-1 opacity-75 group-hover:opacity-100 group-hover:bg-kraft-100/50 transition-all scale-95 group-hover:scale-100">
                              <span>WEB</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-[15px] font-black text-gray-900 tracking-tight leading-snug group-hover:text-military-800 transition-colors pt-1 line-clamp-2">
                          {partner.name}
                        </h4>
                      </div>

                      {/* Card Footer Content */}
                      <div className="pt-2 border-t border-gray-100/80 flex items-center justify-between font-normal relative z-10 bg-transparent">
                        <span className="text-[10.5px] text-gray-500 font-light truncate max-w-[85%] group-hover:text-gray-700 transition-colors" title={partner.subTitle}>
                          {partner.subTitle}
                        </span>
                        
                        {isGov ? (
                          <CheckCircle2 className="w-4 h-4 text-military-500 shrink-0 opacity-60 group-hover:opacity-100 transition-all" />
                        ) : (
                          <Briefcase className="w-3.5 h-3.5 text-kraft-500 shrink-0 opacity-60 group-hover:opacity-100 transition-all" />
                        )}
                      </div>

                    </div>
                  );

                  return (
                    <motion.div
                      layout
                      variants={cardFadeIn}
                      key={`${partner.name}-${idx}`}
                      className="rounded-2xl border border-gray-200/80 bg-white hover:border-military-500/80 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden"
                    >
                      {hasActiveLink ? (
                        <a 
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block cursor-pointer h-full"
                          title="Open official client website"
                        >
                          {CardInner}
                        </a>
                      ) : (
                        CardInner
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3 text-gray-300">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold">{language === "ko" ? "검색 결과가 발견되지 않았습니다." : "No matching partners found."}</p>
                  <p className="text-xs text-gray-400 mt-1">{language === "ko" ? "다른 검색어나 필터를 조합하여 다시 조회해 보세요." : "Try choosing a different category or clearing the search query."}</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Polished Disclaimer Notice with Amber Palette */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 text-amber-900 flex items-start gap-4 max-w-4xl mx-auto my-12"
        >
          <Info className="w-5.5 h-5.5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-left font-normal">
            <span className="block font-bold text-xs text-amber-950 tracking-tight">{t.referencePage.disclaimerTitle}</span>
            <p className="text-[11px] sm:text-xs leading-relaxed text-amber-850 font-normal break-keep">
              {t.referencePage.disclaimerDesc}
            </p>
          </div>
        </motion.div>

        {/* Inquire Redirect Button with Stunning micro-interactions */}
        {onTabChange && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-10 mt-12 border-t border-gray-150 font-normal"
          >
            <p className="text-xs sm:text-sm text-gray-400 mb-5 font-light">
              {t.referencePage.btnContactSub}
            </p>
            <button
              onClick={() => onTabChange("contact")}
              className="group py-3.5 px-10 rounded-2xl bg-military-850 hover:bg-military-950 text-white text-xs sm:text-sm font-bold tracking-tight transition-all shadow-md hover:shadow-lg hover:shadow-military-900/10 active:scale-95 cursor-pointer border-0 inline-flex items-center gap-2"
            >
              <span>{t.referencePage.btnContactText}</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
