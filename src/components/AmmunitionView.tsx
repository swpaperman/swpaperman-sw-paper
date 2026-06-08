/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  Calculator, 
  EyeOff
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface AmmunitionViewProps {
  onTabChange: (tabId: string) => void;
  onQuotePrefill: (prodName: string, specs: string) => void;
  hideHeader?: boolean;
}

export default function AmmunitionView({ onTabChange, onQuotePrefill, hideHeader = false }: AmmunitionViewProps) {
  const { language, t } = useLanguage();

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
              {t.home.ammunitionBadge}
            </span>
            <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
              {t.home.ammunitionTitle}
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
              <strong>{t.home.ammunitionTitle}</strong>은 {t.home.ammunitionDesc}
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

        {/* Applicable fields (적용 가능 분야) */}
        <div className="mb-16 text-left">
          <div className="border-l-4 border-military-700 pl-3 mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {language === "ko" ? "탄약지환통 개발 및 생산 연혁" : language === "tr" ? "Mühimmat Kutusu Üretim Portföyümüz" : "Ammunition Sleeve Production Milestone Logistics"}
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-500 font-light mt-0.5">
              {language === "ko"
                ? "국방과학연구소(ADD), 국방기술품질원(DTaQ), 한화, 풍산 등과 공동 개발 및 생산을 이어온 고품질 탄약지환통 제품군입니다."
                : language === "tr"
                  ? "Savunma Teknolojileri Ajansı (ADD), Kore Kalite Enstitüsü (DTaQ), Hanwha Aerospace ve Poongsan ile ortaklaşa geliştirip ürettiğimiz askeri ambalaj parçalarıdır."
                  : "High-integrity bullet protective pack tubes co-developed and supplied alongside ADD, DTaQ, Hanwha, Poongsan, and aerospace projects."}
            </p>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-gray-150 shadow-xs bg-white mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-150 text-gray-700 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 sm:px-6">{language === "ko" ? "품 명" : language === "tr" ? "Ürün Adı" : "Product Designation"}</th>
                    <th className="py-3 px-4 text-center md:text-left w-24 sm:w-32">{language === "ko" ? "개 발 년 도" : language === "tr" ? "Tasarım Yılı" : "R&D Year"}</th>
                    <th className="py-3 px-4 text-center md:text-left w-28 sm:w-36">{language === "ko" ? "생 산 년 도" : language === "tr" ? "İmalat Yılı" : "Active Production"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-650 font-normal leading-relaxed">
                  {productHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6 font-semibold text-gray-850">{item.name}</td>
                      <td className="py-2.5 px-4 text-center md:text-left font-mono text-gray-500">{item.devYear}</td>
                      <td className="py-2.5 px-4 text-center md:text-left font-mono">
                        {item.prodYear.includes("현재") || item.prodYear.includes("Aktif") || item.prodYear.includes("Present") ? (
                          <span className="inline-block bg-military-50 text-military-850 px-2 py-0.5 rounded text-[10px] font-bold">
                            {item.prodYear}
                          </span>
                        ) : (
                          <span className="text-gray-500">{item.prodYear}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
