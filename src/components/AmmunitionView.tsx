/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  Calculator, 
  EyeOff,
  Search,
  Award,
  ShieldCheck,
  Activity,
  Calendar,
  Filter,
  CheckCircle2,
  Bookmark,
  Info
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface AmmunitionViewProps {
  onTabChange: (tabId: string) => void;
  onQuotePrefill: (prodName: string, specs: string) => void;
  hideHeader?: boolean;
}

export default function AmmunitionView({ onTabChange, onQuotePrefill, hideHeader = false }: AmmunitionViewProps) {
  const { language, t } = useLanguage();
  const [selectedEra, setSelectedEra] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const productHistory = [
    { 
      name: language === "ko" 
        ? "60MM KM 576 지환통" 
        : language === "tr" 
          ? "60MM KM 576 Mühimmat Kutusu" 
          : "60MM KM 576 Handheld Tube", 
      devYear: "1973-1974", 
      prodYear: language === "ko" ? "1975-현재" : language === "tr" ? "1975-Aktif" : "1975-Present" 
    },
    { 
      name: language === "ko" 
        ? "81MM KM 252A4 지환통" 
        : language === "tr" 
          ? "81MM KM 252A4 Havan Kutusu" 
          : "81MM KM 252A4 Mortar Tube", 
      devYear: "1973-1974", 
      prodYear: language === "ko" ? "1975-현재" : language === "tr" ? "1975-Aktif" : "1975-Present" 
    },
    { 
      name: language === "ko" 
        ? "105MM KM 105A3 지환통" 
        : language === "tr" 
          ? "105MM KM 105A3 Obüs Kutusu" 
          : "105MM KM 105A3 Artillery Tube", 
      devYear: "1973-1974", 
      prodYear: language === "ko" ? "1975-현재" : language === "tr" ? "1975-Aktif" : "1975-Present" 
    },
    { 
      name: language === "ko" 
        ? "세열수류탄용 지환통" 
        : language === "tr" 
          ? "El Bombası Koruyucu Silindiri" 
          : "Frag Grenade Container", 
      devYear: "1975-1976", 
      prodYear: language === "ko" ? "1977-현재" : language === "tr" ? "1977-Aktif" : "1977-Present" 
    },
    { 
      name: language === "ko" 
        ? "90MM(R) KPA56 지환통" 
        : language === "tr" 
          ? "90MM(R) KPA56 Roket Kutusu" 
          : "90MM(R) KPA56 Rocket Tube", 
      devYear: "1975-1976", 
      prodYear: language === "ko" ? "1977-현재" : language === "tr" ? "1977-Aktif" : "1977-Present" 
    },
    { 
      name: language === "ko" 
        ? "90MM(G) KM411 지환통" 
        : language === "tr" 
          ? "90MM(G) KM411 Tank Mühimmat Kutusu" 
          : "90MM(G) KM411 Recoilless Rifle Tube", 
      devYear: "1975-1976", 
      prodYear: language === "ko" ? "1977-현재" : language === "tr" ? "1977-Aktif" : "1977-Present" 
    },
    { 
      name: language === "ko" 
        ? "106MM(R) KM316 지환통" 
        : language === "tr" 
          ? "106MM(R) KM316 Geri Tepmesiz Top Kutusu" 
          : "106MM(R) KM316 Artillery Tube", 
      devYear: "1975-1976", 
      prodYear: language === "ko" ? "1977-현재" : language === "tr" ? "1977-Aktif" : "1977-Present" 
    },
    { 
      name: language === "ko" 
        ? "최루수류탄용 지환통" 
        : language === "tr" 
          ? "Göz Yaşartıcı El Bombası Kutusu" 
          : "Tear Gas Grenade Sleeve", 
      devYear: "1978", 
      prodYear: "1979-1993" 
    },
    { 
      name: language === "ko" 
        ? "35MM K1 지환통" 
        : language === "tr" 
          ? "35MM K1 Uçaksavar Mühimmat Kutusu" 
          : "35MM K1 Anti-Air Shell Sleeve", 
      devYear: "1980", 
      prodYear: language === "ko" ? "1981-현재" : language === "tr" ? "1981-Aktif" : "1981-Present" 
    },
    { 
      name: language === "ko" 
        ? "105MM KM435 지환통" 
        : language === "tr" 
          ? "105MM KM435 Tank Namlu Kutusu" 
          : "105MM KM435 Tank Ammo Sleeve", 
      devYear: "1980", 
      prodYear: language === "ko" ? "1981-현재" : language === "tr" ? "1981-Aktif" : "1981-Present" 
    },
    { 
      name: language === "ko" 
        ? "130MM 탄두, 모타 지환통" 
        : language === "tr" 
          ? "130MM Çok Namlulu Roket Kartuşu" 
          : "130MM Warhead Rocket Motor core", 
      devYear: "1981-1982", 
      prodYear: language === "ko" ? "1982-현재" : language === "tr" ? "1982-Aktif" : "1982-Present" 
    },
    { 
      name: language === "ko" 
        ? "2.75인치 탄두, 모타, 완성탄 지환통" 
        : language === "tr" 
          ? "2.75 İnç Roket Motoru Komple Kutusu" 
          : "2.75-Inch Rocket Warhead & Motor Tube", 
      devYear: "1981-1982", 
      prodYear: language === "ko" ? "1983-현재" : language === "tr" ? "1983-Aktif" : "1983-Present" 
    },
    { 
      name: language === "ko" 
        ? "90MM 철갑탄 지환통" 
        : language === "tr" 
          ? "90MM Zırh Delici Mermi Kutusu" 
          : "90MM Armor-Piercing Shell Wavelength core", 
      devYear: "1981-1982", 
      prodYear: language === "ko" ? "1983-현재" : language === "tr" ? "1983-Aktif" : "1983-Present" 
    },
    { 
      name: language === "ko" 
        ? "60MM 조명탄 지환통" 
        : language === "tr" 
          ? "60MM Aydınlatma Havanı Kutusu" 
          : "60MM Illumination Flare Winder core", 
      devYear: "1981-1982", 
      prodYear: language === "ko" ? "1983-현재" : language === "tr" ? "1983-Aktif" : "1983-Present" 
    },
    { 
      name: language === "ko" 
        ? "105MM 철갑탄 지환통" 
        : language === "tr" 
          ? "105MM APFSDS Zırh Delici Kutusu" 
          : "105MM APFSDS Projectile Tube", 
      devYear: "1982-1983", 
      prodYear: language === "ko" ? "1984-현재" : language === "tr" ? "1984-Aktif" : "1984-Present" 
    },
    { 
      name: language === "ko" 
        ? "81MM 조명탄 지환통" 
        : language === "tr" 
          ? "81MM Aydınlatma Havan Kutusu" 
          : "81MM Illumination Flare Sleeve", 
      devYear: "1982-1983", 
      prodYear: language === "ko" ? "1984-현재" : language === "tr" ? "1984-Aktif" : "1984-Present" 
    },
    { 
      name: language === "ko" 
        ? "4.2 KM251A1A 지환통" 
        : language === "tr" 
          ? "4.2 Inç KM251A1A Havan Kutusu" 
          : "4.2-Inch KM251A1A Heavy Mortar Tube", 
      devYear: "1982-1983", 
      prodYear: language === "ko" ? "1984-현재" : language === "tr" ? "194-Aktif" : "1984-Present" 
    },
    { 
      name: language === "ko" 
        ? "60MM(신형) 지환통" 
        : language === "tr" 
          ? "60MM (Yeni Tip) Havan Kutusu" 
          : "60MM (New Model) Mortar Tube", 
      devYear: "1984", 
      prodYear: language === "ko" ? "1985-현재" : language === "tr" ? "1985-Aktif" : "1985-Present" 
    },
    { 
      name: language === "ko" 
        ? "90MM(신형) HE, TP 지환통" 
        : language === "tr" 
          ? "90MM (Yeni) Tahrip / Eğitim Başlığı Kutusu" 
          : "90MM (New Model) HE & TP Shell Sleeve", 
      devYear: "1984", 
      prodYear: language === "ko" ? "1985-현재" : language === "tr" ? "1985-Aktif" : "1985-Present" 
    },
    { 
      name: language === "ko" 
        ? "81MM(신형) 지환통" 
        : language === "tr" 
          ? "81MM (Yeni Tip) Havan Kutusu" 
          : "81MM (New Model) Shell Tube", 
      devYear: "1996", 
      prodYear: language === "ko" ? "1996-현재" : language === "tr" ? "1996-Aktif" : "1996-Present" 
    },
    { 
      name: language === "ko" 
        ? "105MM(신형) 철갑탄 지환통" 
        : language === "tr" 
          ? "105MM (Yeni) APFSDS Zırh Delici Kutusu" 
          : "105MM (New Model) APFSDS Tank Sleeve", 
      devYear: "1997", 
      prodYear: language === "ko" ? "1997-현재" : language === "tr" ? "1997-Aktif" : "1997-Present" 
    },
    { 
      name: language === "ko" 
        ? "K5 지환통(K413 세열수류탄용)" 
        : language === "tr" 
          ? "K5 Koruyucu Kutusu (K413 Savunma Bombası)" 
          : "K5 Grenade Carrier (K413 Grenade)", 
      devYear: "1997", 
      prodYear: language === "ko" ? "1998-현재" : language === "tr" ? "1998-Aktif" : "1998-Present" 
    },
    { 
      name: language === "ko" 
        ? "K413 세열수류탄 친환경" 
        : language === "tr" 
          ? "K413 Geri Dönüştürülebilir El Bombası Haznesi" 
          : "K413 Eco Frag Grenade Body core", 
      devYear: "2015", 
      prodYear: language === "ko" ? "2015-현재" : language === "tr" ? "2015-Aktif" : "2015-Present" 
    },
    { 
      name: language === "ko" 
        ? "친환경 탄약포장용 지관통" 
        : language === "tr" 
          ? "Doğa Dostu Mühimmat Ambalaj Silindiri" 
          : "Biodegradable Defense Packaging Sleeve", 
      devYear: "2015", 
      prodYear: language === "ko" ? "2015-현재" : language === "tr" ? "2015-Aktif" : "2015-Present" 
    },
    { 
      name: language === "ko" 
        ? "120MM 6종 지환통" 
        : language === "tr" 
          ? "120MM Tank Mühimmat 6 Farklı Boyut Kutusu" 
          : "120MM Multi-Purpose Heavy Ammunition Cores", 
      devYear: "2015", 
      prodYear: language === "ko" ? "2015-현재" : language === "tr" ? "2015-Aktif" : "2015-Present" 
    },
    { 
      name: language === "ko" 
        ? "2.75인치 유도로켓" 
        : language === "tr" 
          ? "2.75 Inç Güdümlü Roket Kartuş Kılıfı" 
          : "2.75-Inch Guided LOGIR Tactical Core", 
      devYear: "2015", 
      prodYear: language === "ko" ? "2015-현재" : language === "tr" ? "2015-Aktif" : "2015-Present" 
    },
    { 
      name: language === "ko" 
        ? "세라믹이 함유된 친환경 플라스틱 탄약통 및 탄약상자" 
        : language === "tr" 
          ? "Kompozit Seramik Katkılı Çelik Destekli Kutu" 
          : "Ceramic-Reinforced Hybrid Ammo Crate Core", 
      devYear: "2016", 
      prodYear: language === "ko" ? "2016-현재" : language === "tr" ? "2016-Aktif" : "2016-Present" 
    },
    { 
      name: language === "ko" 
        ? "KMK25 MOD4 해상위치표시탄(New MLM)" 
        : language === "tr" 
          ? "KMK25 MOD4 Deniz İşaretleme Fişeği Kutusu" 
          : "KMK25 MOD4 Marine Location Marker (New MLM) Container", 
      devYear: "2023", 
      prodYear: language === "ko" ? "2023-현재" : language === "tr" ? "2023-Aktif" : "2023-Present" 
    },
    { 
      name: language === "ko" 
        ? "KDS8140-4005규격 친환경 탄약지환통 제조생산" 
        : language === "tr" 
          ? "KDS8140-4005 Askeri Şartnameli Doğa Dostu Üretim" 
          : "KDS8140-4005 Spec Eco-Friendly Ammunition Core", 
      devYear: "2023", 
      prodYear: language === "ko" ? "2023-현재" : language === "tr" ? "2023-Aktif" : "2023-Present" 
    },
    { 
      name: language === "ko" 
        ? "주탄두, 선구탄두, 대어뢰용지환통" 
        : language === "tr" 
          ? "Ana Savaş Başlığı, Torpido Savunma Kovanı" 
          : "Main Warhead, Anti-Torpedo Protective Heavy core", 
      devYear: "2025", 
      prodYear: language === "ko" ? "2025-현재" : language === "tr" ? "2025-Aktif" : "2025-Present" 
    },
    { 
      name: language === "ko" 
        ? "기타 (KM18연막수류탄, 항공연막통, 섬광폭음탄, 점화기, 연막제용기 등)" 
        : language === "tr" 
          ? "Diğerleri (KM18 Sis Bombası, Hava Sis Kutusu, Flaş Fişeği Haznesi vb.)" 
          : "Others (KM18 Smoke Grenade, Flares, Flash-bang body, Initiators, etc.)", 
      devYear: "-", 
      prodYear: language === "ko" ? "~현재까지 제조생산" : language === "tr" ? "Halen Aktif" : "Manufacturing till Date" 
    }
  ];

  const getEra = (devYear: string) => {
    if (devYear === "-") return "era-10-now";
    const yearMatch = devYear.match(/^(\d{4})/);
    if (!yearMatch) return "all";
    const year = parseInt(yearMatch[1], 10);
    if (year < 1990) return "era-70-80";
    if (year >= 1990 && year < 2010) return "era-90-00";
    if (year >= 2010) return "era-10-now";
    return "all";
  };

  const getSubBadge = (devYear: string, name: string) => {
    // Special mapping requested for KDS8140 item: "신규 국방규격 최초생산품 합격"
    if (name.includes("KDS8140") || name.includes("KDS8140-4005")) {
      return {
        text: language === "ko" ? "신규 국방규격 최초생산품 합격" : language === "tr" ? "Yeni Askeri Şartname Onaylı İlk Ürün" : "First-Article Approved (New Spec)",
        classes: "bg-emerald-50 text-emerald-850 border border-emerald-250 font-bold"
      };
    }

    // Special mapping requested for KM18 "기타" item: "소구경 신규 국방규격 최초생산품 합격"
    if (name.includes("KM18") || name.includes("연막수류탄") || name.includes("Others (KM18")) {
      return {
        text: language === "ko" ? "소구경 신규 국방규격 최초생산품 합격" : language === "tr" ? "Küçük Çaplı Yeni Askeri Şartname Onaylı" : "First-Article Approved (Small Caliber)",
        classes: "bg-teal-50 text-teal-850 border border-teal-250 font-bold"
      };
    }

    const isEco = name.includes("친환경") || name.includes("플라스틱") || name.includes("Eco") || name.includes("Doğa");
    if (isEco) {
      return {
        text: language === "ko" ? "친환경 독자기술" : language === "tr" ? "Biyo-uyumlu Doğa Dostu" : "Proprietary Eco Tech",
        classes: "bg-emerald-50 text-emerald-800 border border-emerald-200"
      };
    }
    const isTactical = name.includes("유도로켓") || name.includes("대어뢰용") || name.includes("KMK25") || name.includes("Savaş Başlığı") || name.includes("Torpido") || name.includes("Tactical") || name.includes("Guided");
    if (isTactical) {
      return {
        text: language === "ko" ? "정밀 전략무기" : language === "tr" ? "Taktik Muharebe" : "Tactical Grade",
        classes: "bg-amber-50 text-amber-800 border border-amber-200"
      };
    }
    const yearMatch = devYear.match(/^(\d{4})/);
    if (!yearMatch) {
      return {
        text: language === "ko" ? "국방 규격 승인" : language === "tr" ? "Askeri Şartname" : "Standard Mil-Spec",
        classes: "bg-gray-100 text-gray-700 border border-gray-200"
      };
    }
    const year = parseInt(yearMatch[1], 10);
    if (year < 1980) {
      return {
        text: language === "ko" ? "1세대 자주국방 모델" : language === "tr" ? "Gen-1 Yerlileştirme" : "Gen-1 Localization",
        classes: "bg-blue-50 text-blue-800 border border-blue-200"
      };
    } else if (year < 1990) {
      return {
        text: language === "ko" ? "국방규격 KDS" : language === "tr" ? "KDS Askeri Şartname" : "KDS Military Standard",
        classes: "bg-indigo-50 text-indigo-800 border border-indigo-200"
      };
    } else {
      return {
        text: language === "ko" ? "국방규격 KDS" : language === "tr" ? "KDS Askeri Şartname" : "KDS Spec Certified",
        classes: "bg-purple-50 text-purple-800 border border-purple-200"
      };
    }
  };

  const filteredHistory = productHistory.filter((item) => {
    if (selectedEra !== "all") {
      const era = getEra(item.devYear);
      if (era !== selectedEra) return false;
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = item.name.toLowerCase().includes(query);
      const devMatch = item.devYear.toLowerCase().includes(query);
      const prodMatch = item.prodYear.toLowerCase().includes(query);
      return nameMatch || devMatch || prodMatch;
    }
    return true;
  });

  const performances = [
    { 
      title: language === "ko" ? "방습성 (Moisture Block)" : language === "tr" ? "Nem Direnci (Moisture Block)" : "Humidity Shielding", 
      desc: language === "ko" 
        ? "다층의 수용성 점착제와 왁싱 가공으로 외부 우수 및 공기 중 습기 유입을 차단합니다." 
        : language === "tr"
          ? "Su bazlı bariyer reçineleri ve termal mum kaplama prosesleri ile su sızmalarını ve hava nemini bloke eder."
          : "Multi-layered waterborne safe sealants and custom waxing recipes completely arrest moisture ingress." 
    },
    { 
      title: language === "ko" ? "내구성 (Durability)" : language === "tr" ? "Mekanik Dayanıklılık" : "Mechanical Durability", 
      desc: language === "ko" 
        ? "나선형 와인딩 기하 공법을 통한 섬유질 응축 결합으로 고도 낙하 및 수송 충격을 흡수 분산합니다." 
        : language === "tr"
          ? "Helisel helezon sarım geometrisi ve sıkıştırılmış kraft lif dokusu sayesinde yüksekten düşme şoklarını soğurur."
          : "Symmetrical spiral winding and dense cellulosic molecular cohesion absorb drop shocks and rough transit vibration." 
    },
    { 
      title: language === "ko" ? "치수 안정성 (Stability)" : language === "tr" ? "Form ve Ebat Kararlılığı" : "Structural Stability", 
      desc: language === "ko" 
        ? "정밀 절단 및 자동화 프레싱을 거쳐 영하 혹한 또는 폭우 등 야전 극기에서도 비틀림이 없습니다." 
        : language === "tr"
          ? "Dairesel kalıp kesimi ve fırınlama aşamalarından sonra dondurucu soğuklarda ve aşırı sıcakta sıfır form kaybı."
          : "Precision cut margins and optimal drying parameters eliminate physical expansion or warping under toxic fields." 
    },
    { 
      title: language === "ko" ? "개폐성 (Sealing Care)" : language === "tr" ? "Hassas Kapak Kapatma" : "Sealing Performance", 
      desc: language === "ko" 
        ? "인체공학적 조립 결합형 안전 스틸 캡 또는 특수 플라스틱 밀봉 마개로 탈착과 기밀을 보완합니다." 
        : language === "tr"
          ? "Ergonomik tırnaklı koruyucu metal kapaklar veya sızdırmaz conta plastik tıpaları ile kusursuz sızdırmazlık."
          : "Ergonomically engineered metallic safety caps or specialized polymer plugs guarantee hermetic sealing." 
    },
    { 
      title: language === "ko" ? "맞춤 제작 (Customization)" : language === "tr" ? "Özel Milimetrik Üretim" : "Tailored Calibration", 
      desc: language === "ko" 
        ? "고객별 상이한 지경, 전장 길이, 공차 기준 설계 도서에 부합하는 자동 설비 기어 세팅을 지원합니다." 
        : language === "tr"
          ? "Farklı iç çap, dış çap, uzunluk ve tolerans sınırlarına tam uyumlu bilgisayarlı kesim kalibrasyonu."
          : "Universal tooling capabilities easily adjust internal diameters, wall depths, and tight tolerances." 
    },
    { 
      title: language === "ko" ? "품질관리 (Quality Control)" : language === "tr" ? "Sıkı Kalite Kontrol" : "Quality Assurance", 
      desc: language === "ko" 
        ? "국방품질경영체계 기준을 엄격히 참고한 치수 및 누설 전수 검수 시트를 누적 보관합니다." 
        : language === "tr"
          ? "Askeri kalite güvence (DQMS) standartlarına bağlı kalarak milimetrik kontroller ve sızdırmazlık basınç testleri."
          : "Maintains absolute traceability with active compliance with defense standards and rigorous leakage testing log sheets." 
    }
  ];

  const handleAction = (prodName: string, specs: string) => {
    onQuotePrefill(prodName, specs);
    onTabChange("contact");
  };

  return (
    <div className={`bg-white font-sans ${hideHeader ? "pb-20" : "min-h-screen pt-28 pb-20"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        {!hideHeader && (
          <div className="text-left mb-12">
            <span className="text-xs font-mono font-bold text-military-700 tracking-widest uppercase bg-military-50 px-3 py-1 rounded inline-block">
              {t.ammo.badge}
            </span>
            <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
              {t.ammo.title}
            </h1>
            <div className="w-12 h-1 bg-kraft-500 mt-4 rounded-full" />
          </div>
        )}

        {/* Horizontal Image Showcase */}
        <div className="relative w-full mb-12 space-y-4">
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-kraft-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-military-100/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2">
            <span className="bg-military-850 text-white text-[9px] sm:text-xs font-mono font-bold tracking-wider px-3 py-1 rounded shadow-xs uppercase">
              AMMUNITION TUBE SHOWCASE
            </span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all">
            <img 
              src="https://lh3.googleusercontent.com/d/1uqFLlJdJYsa499QEw2glDiP4n-02x5lK"
              alt={language === "ko" ? "수원지관산업 고강도 탄약지환통 제품" : "Suwon High-Strength Ammunition Containers"}
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Detailed Copy & Warning Layout */}
        <div className="max-w-5xl mx-auto space-y-8 text-left leading-relaxed mb-16">
          <div className="border-b border-gray-150 pb-6 mb-6">
            <p className="text-gray-800 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
              {t.ammo.descBold}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm sm:text-[15px] font-light leading-relaxed">
            <p className="text-gray-650">
              {language === "ko" 
                ? "수원지관산업은 60년 이상 축적된 지관 제조 기술을 기반으로, MIL-SPEC 및 KDS 8140-4005 국방규격의 요구 조건을 참고하여 탄약 포장용 지환통을 생산하고 있습니다."
                : language === "tr"
                  ? "Suwon Paper Cone & Tube, 60 yılı aşan imalat birikimiyle MIL-SPEC ve KDS 8140-4005 Kore Ulusal Savunma standartlarına tam uyumlu mühimmat koruyucu ambalaj tüpleri üretmektedir."
                  : "Leveraging over 60 years of production expertise, SUWON manufactures container systems referencing demanding MIL-SPEC and KDS 8140-4005 national defense parameters."}
            </p>
            <p className="text-gray-655">
              {language === "ko" 
                ? "원지 투입 및 지관 성형, 방습 처리, 정밀 절단, 금속 플랜지 및 칼라 조립, 보호 캡 조립에 이르는 제조 공정을 통해 탄약의 장기 저장성과 운송 안정성을 높이는 지환통을 제작합니다."
                : language === "tr"
                  ? "Karton besleme, helisel sarım, nem koruyucu kaplama, dairesel dilimleme ve metal/plastik sızdırmaz kapak montaj adımları ile mühimmatın açık havada saklama ömrünü uzatıyoruz."
                  : "Our strict manufacturing pipeline (wrapping, humidity wax barriers, high-speed cutting, and airtight metallic cap assembly) assures excellent storage stamina for extreme military logistical fields."}
            </p>
            <p className="text-gray-650 col-span-1 md:col-span-2 border-t border-gray-100 pt-6">
              {language === "ko"
                ? "탄약지환통은 단순한 포장재가 아니라 탄약의 성능과 가치를 보존하는 보호 용기입니다. 수원지관산업은 다양한 탄종의 도면, 치수, 포장 조건에 맞춘 1:1 맞춤 제작을 지원하며, 군수품 포장 분야에서 축적한 생산 경험과 공정 품질 데이터를 바탕으로 안정적인 제조 대응을 이어가고 있습니다."
                : language === "tr"
                  ? "Mühimmat kutusu sadece bir dış paket değil, içerikteki patlayıcının balistik hassasiyetini ve mekanik yapısını koruyan kritik bir muhafazadır. Suwon Paper Cone; farklı çaplardaki havan, obüs, roket füze ve bombalar için 1:1 ölçekli tasarımlar yapabilmektedir."
                  : "These container assemblies actively defend the ballistic readiness of weapons and field materials. SUWON supports bespoke 1:1 custom specifications matching diverse blueprints and logistics limits, keeping comprehensive QA logs of each project."}
            </p>
            <p className="text-gray-650 col-span-1 md:col-span-2">
              {language === "ko"
                ? "수원지관산업의 탄약지환통은 국방 K-방산 분야에서 요구되는 방습성, 내구성, 치수 정밀성, 조립 안정성을 고려하여 제작되며, 탄약의 보관 중 외부 환경으로 인한 품질 저하를 줄이고 장기간 안정적인 보관이 가능하도록 설계됩니다."
                : language === "tr"
                  ? "Suwon Paper Cone mühimmat spiral boruları; K-Savunma sanayiinde talep edilen nem yalıtımı, sarsıntı direnci, milimetrik ebat kararlılığı ve montaj güvencesini sağlamak üzere özel olarak tasarlanır."
                  : "We calibrate every parameter for optimal moisture block, bullet safety, structural stability, and airtight closure, minimizing external degradation during active deployments or outdoor stacking."}
            </p>
          </div>
          
          {/* Regulatory Guidance / Safe Phrase (법적 오해 방지 문구) */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-900 flex items-start gap-4 shadow-sm mt-8">
            <EyeOff className="w-5.5 h-5.5 text-amber-700 mt-0.5 shrink-0" />
            <div className="space-y-1.5 font-normal">
              <span className="block font-bold text-xs sm:text-sm">
                {language === "ko" ? "구매 및 상담 유의사항" : language === "tr" ? "Satış ve Tedarik Bilgilendirmesi" : "Regulatory Advisory Note"}
              </span>
              <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-light">
                {language === "ko"
                  ? "본 탄약지환통 제품군은 일반 구매 상담이 가능한 포장용 지관(빈 용기)으로 전개됩니다. 안전 거래 및 관련 규정 준출 등 법적 오해가 발생하지 않기를 바라며, 오직 “사용 목적 및 규격 확인 후 공급 상담” 방식으로 정해진 수주 절차 계약에 의거하여 견적 및 납품 공급 상담을 진행합니다."
                  : language === "tr"
                    ? "Burada sergilenen mühimmat koruyucu ambalaj tüpleri, iç kısmı tamamen boş olan ambalaj malzemeleridir. Herhangi bir yasal yanlış anlaşılmayı önlemek amacıyla; siparişleriniz ve ortaklık talepleriniz sadece resmi B2B teklif usulü ve ticari ambalaj tedariki anlaşmaları kapsamında değerlendirilir."
                    : "Ammunition fiber tubes displayed in this web catalog are shipped as empty hollow packaging containers. To eliminate regulatory misunderstandings, all quotes and sales agreements are transacted exclusively under institutional B2B contract terms for tactical logistics overpack shipping materials."}
              </p>
            </div>
          </div>
        </div>

        {/* Applicable fields (적용 가능 분야 - 국방 규격 탄약지환통 통합 대장) */}
        <div className="mb-20 text-left">
          <div className="border-l-4 border-military-700 pl-4 mb-4">
            <span className="text-[10px] sm:text-xs font-mono font-black text-military-700 tracking-widest uppercase block mb-1">
              NATIONAL DEFENSE CAPABILITY LOG
            </span>
            <h3 className="text-xl sm:text-2.5xl font-black text-gray-950 tracking-tight leading-tight">
              {language === "ko" ? "탄약지환통 개발 및 생산 연혁" : language === "tr" ? "Mühimmat Kutusu Üretim Portföyümüz" : "Ammunition Sleeve Production Milestone Logistics"}
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-1 max-w-4xl leading-relaxed">
              {language === "ko"
                ? "주식회사 수원지관산업은 1973년 이래 국방과학연구소(ADD), 국방기술품질원(DTaQ), 풍산, 한화 등 국가 방산 협력업체의 핵심 벤더로서 탄약 보존을 위한 방습 수밀 지질 규격을 공동 제안하여 국산화 생산을 선도해왔습니다."
                : language === "tr"
                  ? "Savunma Teknolojileri Ajansı (ADD), Kore Kalite Enstitüsü (DTaQ), Hanwha Aerospace ve Poongsan ile ortaklaşa geliştirip ürettiğimiz askeri ambalaj parçalarıdır."
                  : "High-integrity bullet protective pack tubes co-developed and supplied alongside ADD, DTaQ, Hanwha, Poongsan, and aerospace projects."}
            </p>
          </div>

          {/* Heavy Military Capability Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-military-900 to-black p-5 rounded-2xl border border-military-800 text-white relative overflow-hidden shadow-md">
              <div className="absolute right-3 top-3 opacity-15">
                <Award className="w-16 h-16 text-kraft-350" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-military-300 uppercase font-bold block">SINCE 1973 MILITARY CONTRACT</span>
              <span className="text-2.5xl font-black text-kraft-100 tracking-tight block mt-1">50+ Years</span>
              <p className="text-[12px] text-military-150 mt-2 font-medium leading-relaxed text-gray-200/95">
                {language === "ko" 
                  ? "반세기 동안 축적해 온 독보적인 고강도 방습 나선 지관 제조 원제 제어 기조" 
                  : "Over 50 years of robust military packaging R&D and serial manufacturing excellence."}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-950 to-black p-5 rounded-2xl border border-gray-800 text-white relative overflow-hidden shadow-md">
              <div className="absolute right-3 top-3 opacity-15">
                <ShieldCheck className="w-16 h-16 text-military-300" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block">SPECIFICATION AUDIT</span>
              <span className="text-2.5xl font-black text-military-205 tracking-tight block mt-1 text-gray-100">KDS Standard Approved</span>
              <p className="text-[12px] text-gray-300 mt-2 font-medium leading-relaxed">
                {language === "ko" 
                  ? "KDS 8140-4005 국방규격, US MIL-SPEC 및 NATO 완벽 대응 성능" 
                  : "100% compliant with strict Korean KDS and US military standards."}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#26170a] to-[#0a0502] p-5 rounded-2xl border border-kraft-800 text-white relative overflow-hidden shadow-md">
              <div className="absolute right-3 top-3 opacity-20">
                <Activity className="w-16 h-16 text-kraft-300" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-kraft-200 uppercase font-bold block">ACTIVE SUPPLY REPUTATION</span>
              <span className="text-2.5xl font-black text-white tracking-tight block mt-1">Zero Defect Mass Production</span>
              <p className="text-[12px] text-kraft-100/95 mt-2 font-medium leading-relaxed">
                {language === "ko" 
                  ? "체계업체(한화, 풍산 등)와 군수 야전 저장 30년 이상 품질 무결점 안전 입증" 
                  : "Trusted partners of Hanwha Aerospace, Poongsan, and military forces with flawless logs."}
              </p>
            </div>
          </div>

          {/* Interactive Filtering and Searching Cockpit */}
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-150 mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Category-Era Tabs */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedEra("all")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedEra === "all"
                      ? "bg-military-850 text-white border-military-850 shadow-sm"
                      : "bg-white hover:bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {language === "ko" ? "전체 이력" : language === "tr" ? "Tüm Tarihçe" : "Full History"} ({productHistory.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEra("era-70-80")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedEra === "era-70-80"
                      ? "bg-military-850 text-white border-military-850 shadow-sm"
                      : "bg-white hover:bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {language === "ko" ? "자주국방 초석기 (1970~80s)" : language === "tr" ? "Yerlileştirme (1970~80s)" : "Foundation Era (1970~80s)"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEra("era-90-00")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedEra === "era-90-00"
                      ? "bg-military-850 text-white border-military-850 shadow-sm"
                      : "bg-white hover:bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {language === "ko" ? "경쟁력 고도화기 (1990~00s)" : language === "tr" ? "Modernizasyon (1990~00s)" : "Precision Era (1990~00s)"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEra("era-10-now")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedEra === "era-10-now"
                      ? "bg-military-850 text-white border-military-850 shadow-sm"
                      : "bg-white hover:bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {language === "ko" ? "현대 & 친환경 스마트기 (2010s~)" : language === "tr" ? "Sürdürülebilir Dönem (2010s~)" : "Strategic & Eco-Tech (2010s~)"}
                </button>
              </div>

              {/* Dynamic Live Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={language === "ko" ? "규격 또는 탄종 검색 (예: KM, 수류탄, 105MM)..." : language === "tr" ? "Model / Şartname Ara..." : "Search specs / calibers..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white rounded-xl text-xs border border-gray-200 focus:outline-none focus:border-military-800 focus:ring-1 focus:ring-military-800 shadow-xs text-gray-800"
                />
              </div>

            </div>
          </div>

          {/* Ledger Table Section */}
          <div className="overflow-hidden rounded-2xl border border-gray-150 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-100/80 border-b border-gray-150 text-gray-700 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 sm:px-6 w-2/3 sm:w-1/2">{language === "ko" ? "국방 규격 / 납품 모델명" : language === "tr" ? "Ürün Adı ve Şartname" : "Product Designation & Spec Name"}</th>
                    <th className="hidden sm:table-cell py-3 px-4 w-1/4 sm:w-1/5">{language === "ko" ? "분 류 테 그" : "Classification"}</th>
                    <th className="py-3 px-4 text-center w-1/3 sm:w-28">{language === "ko" ? "개 발 년 도" : language === "tr" ? "Tasarım Yılı" : "R&D Year"}</th>
                    <th className="hidden sm:table-cell py-3 px-4 text-center sm:text-left w-28 sm:w-36">{language === "ko" ? "생 산 및 양 산" : language === "tr" ? "İmalat Durumu" : "Active Production"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-650 font-normal leading-relaxed">
                  {filteredHistory.length === 0 ? (
                    <>
                      {/* Mobile Alert */}
                      <tr className="sm:hidden">
                        <td colSpan={2} className="py-16 text-center text-gray-400 font-normal">
                          <Info className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <span className="block text-xs font-semibold text-gray-500">
                            {language === "ko" ? "일치하는 군수 규격 이력이 검색되지 않았습니다." : "No spec histories found matching your query."}
                          </span>
                        </td>
                      </tr>
                      {/* Desktop Alert */}
                      <tr className="hidden sm:table-row">
                        <td colSpan={4} className="py-16 text-center text-gray-400 font-normal">
                          <Info className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <span className="block text-xs font-semibold text-gray-500">
                            {language === "ko" ? "일치하는 군수 규격 이력이 검색되지 않았습니다." : "No spec histories found matching your query."}
                          </span>
                          <span className="block text-[10px] text-gray-400 mt-1">
                            {language === "ko" ? "철자나 검색어를 확인하시거나 다른 탭을 활용해 보세요." : "Check details or select 'Full History'."}
                          </span>
                        </td>
                      </tr>
                    </>
                  ) : (
                    filteredHistory.map((item, idx) => {
                      const badgeInfo = getSubBadge(item.devYear, item.name);
                      const isActive = item.prodYear.includes("현재") || item.prodYear.includes("Aktif") || item.prodYear.includes("Present");
                      
                      const isPre2008 = (() => {
                        const devYearStr = item.devYear;
                        if (devYearStr && devYearStr !== "-") {
                          const match = devYearStr.match(/^(\d{4})/);
                          if (match) {
                            return parseInt(match[1], 10) < 2008;
                          }
                        }
                        const prodYearStr = item.prodYear;
                        if (prodYearStr) {
                          const match = prodYearStr.match(/^(\d{4})/);
                          if (match) {
                            return parseInt(match[1], 10) < 2008;
                          }
                        }
                        return false;
                      })();
                      
                      return (
                        <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                          {/* Product / Spec Name */}
                          <td className="py-3 px-4 sm:px-6 font-bold text-gray-850">
                            <div className="flex items-center gap-2">
                              <Bookmark className="w-3.5 h-3.5 text-military-500 shrink-0" />
                              <span className="tracking-tight text-left block leading-tight">{item.name}</span>
                            </div>
                          </td>

                          {/* Dynamic Technical Classification Tag */}
                          <td className="hidden sm:table-cell py-3 px-4">
                            <span className={`inline-block text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-tight ${badgeInfo.classes}`}>
                              {badgeInfo.text}
                            </span>
                          </td>

                          {/* Development Year */}
                          <td className="py-3 px-4 text-center font-mono text-gray-500 text-xs font-semibold whitespace-nowrap">
                            {item.devYear}
                          </td>

                          {/* Active Production Status */}
                          <td className="hidden sm:table-cell py-3 px-4 text-center sm:text-left">
                            {isActive ? (
                              isPre2008 ? (
                                <span className="inline-flex items-center gap-1.5 bg-military-50 text-military-850 border border-military-200 px-2.5 py-1 rounded-lg text-[10px] font-black tracking-tight">
                                  <span className="w-1.5 h-1.5 rounded-full bg-military-600 block" />
                                  {language === "ko" ? "방산 전략물자" : language === "tr" ? "Stratejik Savunma Malzemesi" : "Strategic Defense Materiel"}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-lg text-[10px] font-black tracking-tight animate-pulse">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block" />
                                  {language === "ko" ? "실시간 양산 공급 중" : item.prodYear}
                                </span>
                              )
                            ) : (
                              <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-50 border border-gray-150 px-2.5 py-0.5 rounded-lg text-[11px] font-medium font-mono">
                                <Calendar className="w-3 h-3 text-gray-450 shrink-0" />
                                {item.prodYear}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {/* Total Results Micro Counter */}
            <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-150 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>LEDGER COMPILATION: ACTIVE REGISTRY</span>
              <span>{filteredHistory.length} / {productHistory.length} {language === "ko" ? "개 규격 노출 중" : "Items Filtered"}</span>
            </div>
          </div>
        </div>

        {/* Core performance (핵심 성능) */}
        <div className="mb-16 text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 border-l-4 border-military-700 pl-3">
            {language === "ko" ? "핵심 성능 지표" : language === "tr" ? "Temel Performans Kriterleri" : "Core Performance Parameters"}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* High-quality performance illustration image (Left) */}
            <div className="lg:col-span-5 relative w-full h-full flex flex-col justify-center">
              <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all">
                <img 
                  src="https://lh3.googleusercontent.com/d/1q0yn78xlS50ve0fES4oSHZZNsL2Yj8DG"
                  alt={language === "ko" ? "수원지관산업 탄약지환통 정밀 기능 검토 및 성능" : "SUWON Ammunition Containers Quality Assurance Inspection"}
                  className="w-full h-auto block hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Performance metrics list (Right) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {performances.map((p, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50/50 border border-gray-150 hover:bg-white hover:shadow-lg transition-all space-y-2">
                  <span className="block text-xs sm:text-sm font-bold text-military-850 font-mono tracking-tight">{p.title}</span>
                  <p className="text-[11px] sm:text-xs text-gray-600 font-light leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ammunition Container Structure Detail Image (Moved from Top) */}
        <div className="relative w-full mb-16 space-y-4 text-left font-normal">
          <div className="flex items-center gap-2">
            <span className="bg-military-850 text-white text-[9px] sm:text-xs font-mono font-bold tracking-wider px-3 py-1 rounded shadow-xs uppercase">
              AMMUNITION CONTAINER STRUCTURE & DETAILS
            </span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all">
            <img 
              src="https://lh3.googleusercontent.com/d/1XD2FdS55S_T5GY4gQ06hR5TZmyzD836K"
              alt={language === "ko" ? "수원지관산업 고강도 탄약지환통 외형 디테일 및 안전 마개 어셈블리" : "SUWON Ammunition Container Technical Drawing & Cap Assembly details"}
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Actions Button Zone */}
        <div className="border border-gray-150 rounded-2xl p-6 sm:p-10 bg-gray-50 text-center space-y-6">
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {language === "ko"
              ? "탄약지환통은 사용 목적, 요구 규격, 수량, 도면 보유 여부 등을 확인한 후 제작 상담이 가능합니다."
              : language === "tr"
                ? "Mühimmat koruma tüplerimiz sipariş üzerine üretilir; teknik çizimleriniz, adet ve teslim süreleri için bizimle iletişime geçin."
                : "Bespoke ammunition tubes require verification of technical designs, specific parameters, and requested volumes before quoting."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleAction(
                language === "ko" ? "탄약지환통 규격 상담" : "Ammunition Tube Sizing Consulting", 
                language === "ko" ? "사용구분: 탄약지환통 규격 상담" : "Category: Tactical Tube specs alignment"
              )}
              className="py-3 px-5 rounded-xl bg-military-850 hover:bg-military-900 text-white font-bold text-xs sm:text-sm transition-all shadow active:scale-95 cursor-pointer border-0"
            >
              {language === "ko" ? "탄약지환통 규격 상담하기" : language === "tr" ? "Teknik Destek ve Ebat Görüşmesi" : "Request Spec Consulting"}
            </button>
            <button
              onClick={() => handleAction(
                language === "ko" ? "도면 기반 탄약지환통 제작 문의" : "Blueprint-Based Defense Order Inquiry", 
                language === "ko" ? "사용구분: 도면 기반 제작 문의 / 도면 보유 상태 확인필요" : "Category: Armed forces packaging / Technical design review"
              )}
              className="py-3 px-5 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-850 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
            >
              {language === "ko" ? "도면 기반 제작 문의하기" : language === "tr" ? "Proje Taslaklı Sipariş Gönder" : "Inquire with Specifications"}
            </button>
            <button
              onClick={() => onTabChange("simulator")}
              className="py-3 px-5 rounded-xl bg-kraft-500 hover:bg-kraft-600 text-gray-950 font-black text-xs sm:text-sm transition-all shadow active:scale-95 cursor-pointer flex items-center gap-1.5 border-0"
            >
              <Calculator className="w-4 h-4 text-gray-950" />
              {language === "ko" ? "시뮬레이터로 규격 검토하기" : language === "tr" ? "Simülatör ile Kontrol Et" : "Check Specs on Simulator"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
