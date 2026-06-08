/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { 
  Calculator, 
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface IndustrialViewProps {
  onTabChange: (tabId: string) => void;
  onQuotePrefill: (prodName: string, specs: string) => void;
  hideHeader?: boolean;
}

export default function IndustrialView({ onTabChange, onQuotePrefill, hideHeader = false }: IndustrialViewProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"small" | "medium" | "large">("small");

  const categories = {
    small: {
      title: language === "ko" 
        ? "소형 전용 지관 (Small Diameter Core)" 
        : language === "tr" 
          ? "Küçük Çaplı Özel Masuralar" 
          : "Small Diameter Cores",
      range: "내경/Inner Ø 10mm ─ 50mm | 두께/Thickness 1mm ─ 5mm",
      desc: language === "ko"
        ? "정밀 부품, 원사 권취, 소경 필름 코어, 감열지 및 점착 리본 등 경량이면서 극정밀 치수 공차를 필요로 하는 섬세한 가공을 위한 고강성 슬리팅 지관입니다."
        : language === "tr"
          ? "Hassas bileşenler, ince iplik bobinleri, küçük ebatlı film göbekleri, termal kağıt ve yapışkanlı şerit ruloları için hafif ve yüksek toleranslı dairesel kesim masuralarımzı."
          : "High-rigidity slitted cores engineered for precision parts, medical spools, fine film winders, thermal ribbons, and applications requiring tight dimensional tolerances.",
      usages: language === "ko"
        ? ["원사 및 섬유 연사 회전 코어", "점착 테이프, 감열지 리본 코어", "의료용·특수 미세 포장 피복용 관", "디자인 샘플 지제 발송 튜브"]
        : language === "tr"
          ? ["İplik ve Tekstil Büküm Masuraları", "Yapışkan Bant ve Termal Kağıt Rulo Masuraları", "Tıbbi ve Özel İlaç Ambalaj Boruları", "Tasarım Projeleri ve Numune Gönderim Posta Tüpleri"]
          : ["Aramid/Textile Spun Yarn Winding Cores", "Adhesive Tapes & Thermal Printer Ribbons", "Medical Spec Precision Sleeves", "Design Blueprint Mailing Tubes"]
    },
    medium: {
      title: language === "ko"
        ? "중형 표준 지관 (Medium Diameter Core)"
        : language === "tr"
          ? "Standart Orta Çaplı Masuralar & Rulolar"
          : "Standard Medium Diameter Cores",
      range: "내경/Inner Ø 50mm ─ 150mm | 두께/Thickness 3mm ─ 10mm",
      desc: language === "ko"
        ? "제지, 원단 인쇄, 일반 포장용 플라스틱 필름 권취 롤 기재 등의 표준 장력과 회전 횡하중을 지탱하는 데 가장 범용적으로 적용되는 고품질 표준 산업관입니다."
        : language === "tr"
          ? "Tekstil kumaş baskı, plastik ambalaj filmleri, kağıt ruloları ve benzeri bobin sarımlarında dairesel mukavemet sağlayan en yaygın kullanılan standart endüstriyel mukavva borulardır."
          : "Standard high-performance industrial cores optimized to support printing paper rolls, fabric spools, stretching film winders, and general protective industrial packaging needs.",
      usages: language === "ko"
        ? ["원단 권치 및 의류 인쇄 가이드 롤", "포장용 자가점착 플라스틱 필름 권취 기재", "제지 및 알루미늄 배리어 은박 권치 코어", "다양한 공업 원자재 보호 충전관"]
        : language === "tr"
          ? ["Baskılı Kumaş Sarım Masuraları", "Kendinden Yapışkanlı Stretch Film Göbekleri", "Kağıt Rulo ve Alüminyum Folyo Bobinleri", "Endüstriyel Parça Koruma ve Destek Boruları"]
          : ["Fabric & Garment Printing Guide Rolls", "Self-Adhesive Stretch Film Winding", "Paper mills & Aluminum Foil Winding Cores", "Industrial Raw Materials Protective Sleeves"]
    },
    large: {
      title: language === "ko"
        ? "대형 초강도 지관 (Large Diameter Core)"
        : language === "tr"
          ? "Ağır Hizmet Tipi Büyük Çaplı Spiral Borular"
          : "Heavy-Duty Large Diameter Cores",
      range: "내경/Inner Ø 150mm ─ 500mm | 두께/Thickness 5mm ─ 25mm",
      desc: language === "ko"
        ? "고밀도 고중량 시트물, 철강 가공 보호재, 고배율 압진용 권취 및 대구경 산업용 코어 등 강력한 수평 횡압과 수직 하부 하중 적층을 견뎌내는 보강 구조관입니다."
        : language === "tr"
          ? "Yüksek yoğunluklu ve tonajlı sac metal bobinleri, ağır inşaat kalıp boruları, büyük çorap masuraları ve dikey yük istifleme mukavemetine sahip özel takviyeli kalın borulardır."
          : "Reinforced high-gauge sleeves designed to withstand intense side pressures and heavy stacking loads, ideal for industrial sheet metals, heavy films, paper mills, and civil engineering structures.",
      usages: language === "ko"
        ? ["초강도 철판·금속 시트 권취 중심축", "건축 토목 교량 배수 지주 및 콘크리트 원형 폼관", "거대 고중중량 산업 롤 원자재 홀더", "장하중 야외 야적물 보전 장거리 수송용 보호관"]
        : language === "tr"
          ? ["Yüksek Mukavemetli Çelik/Metal Bobin Sarım Göbekleri", "İnşaat Sektörü Beton Kolon Kalıp Boruları", "Büyük Ebatlı ve Ağır Rulo Taşıyıcı Miller", "Açık Alanda Depolanan Malzemeler İçin Koruyucu Dış Muhafazalar"]
          : ["Heavy Steel/Metal Sheet Cores", "Civil Circular Concrete Column Formliner Tubes", "Highly Loaded Industrial Raw Material Spindles", "Weatherproof Outdoor Stacking Overpack Containers"]
    }
  };

  const handlesPrefill = (prodName: string, specs: string) => {
    onQuotePrefill(prodName, specs);
    onTabChange("contact");
  };

  return (
    <div className={`bg-white font-sans text-left ${hideHeader ? "pb-20" : "min-h-screen pt-28 pb-20"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        {!hideHeader && (
          <div className="mb-12">
            <span className="text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-50 px-3 py-1 rounded inline-block">
              {t.industrialPage.badge}
            </span>
            <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
              {t.industrialPage.title}
            </h1>
            <div className="w-12 h-1 bg-kraft-500 mt-4 rounded-full" />
          </div>
        )}

        {/* Content detail layout - Stacked with large wide cards underneath */}
        <div className="space-y-10 mb-16">
          <div className="max-w-4xl space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>{t.home.industrialTitle}</strong>은 {t.industrialPage.desc1}
            </p>
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed font-normal">
              {t.industrialPage.desc2}
            </p>
            <p className="text-gray-650 text-sm sm:text-base font-light leading-relaxed font-normal">
              {t.industrialPage.desc3}
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. 권취용 지관 Card */}
              <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-md p-4 hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                <div className="bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-4 h-64 sm:h-80 md:h-[350px] lg:h-[400px]">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1Jlt5fXYzYDQRlf8P-8qGFw9idrgZNmOE"
                    alt={t.industrialPage.card1Title}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="inline-block bg-kraft-50 text-kraft-900 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border border-kraft-100 shadow-3xs">
                      {t.industrialPage.card1Title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">SPINNING CORE</span>
                </div>
              </div>

              {/* 2. 포장용 지통 Card */}
              <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-md p-4 hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                <div className="bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-4 h-64 sm:h-80 md:h-[350px] lg:h-[400px]">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1okYLonZ8wBHx0tWwcBo8cSiF1ruH-FL5"
                    alt={t.industrialPage.card2Title}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="inline-block bg-military-50 text-military-850 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border border-military-100 shadow-3xs">
                      {t.industrialPage.card2Title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">PREMIUM PACKAGING</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex justify-between items-center text-xs text-gray-700 font-medium shadow-3xs">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                {t.industrialPage.ribbonText}
              </span>
              <span className="font-mono text-kraft-700 text-[10px] font-bold">TOLERANCE ±0.1mm</span>
            </div>
          </div>
        </div>

        {/* Interactive Tabs for Sizes with high-contrast design */}
        <div className="mb-16">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 border-l-4 border-kraft-500 pl-3">
            {t.industrialPage.specHeader}
          </h3>
          
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2">
            {(["small", "medium", "large"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`py-3 px-5 text-xs sm:text-sm font-bold uppercase transition-all tracking-tight shrink-0 cursor-pointer border-0 ${
                  activeTab === cat
                    ? "border-b-2 border-kraft-650 text-kraft-900 bg-kraft-50/50"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat === "small" 
                  ? (language === "ko" ? "소형지관 (Ø10~50mm)" : language === "tr" ? "Küçük Masuralar (Ø10~50mm)" : "Small Core (Ø10~50mm)") 
                  : cat === "medium" 
                    ? (language === "ko" ? "중형지관 (Ø50~150mm)" : language === "tr" ? "Orta Masuralar (Ø50~150mm)" : "Medium Core (Ø50~150mm)") 
                    : (language === "ko" ? "대형지관 (Ø150~500mm)" : language === "tr" ? "Büyük Bobinler (Ø150~500mm)" : "Large Core (Ø150~500mm)")
                }
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-gray-150 bg-gray-50/40 text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h4 className="text-lg font-black text-gray-900">{categories[activeTab].title}</h4>
              <span className="py-1 px-3 bg-military-900 text-kraft-350 text-xs font-mono font-bold rounded-lg w-fit">
                {categories[activeTab].range}
              </span>
            </div>
            
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-4xl">
              {categories[activeTab].desc}
            </p>

            <div className="space-y-3">
              <span className="block text-xs font-bold text-gray-700">{t.industrialPage.specSub}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories[activeTab].usages.map((u, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{u}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Core values */}
        <div className="mb-16">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 border-l-4 border-kraft-500 pl-3">
            {language === "ko" ? "수원지관만의 제조 강점" : language === "tr" ? "Suwon Paper Cone İmalat Güvenceleri" : "Manufacturing Strengths of SUWON"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border border-gray-150 rounded-2xl bg-white space-y-2">
              <span className="block font-bold text-xs sm:text-sm text-gray-900">
                {language === "ko" ? "1. 초밀착 고단면 정밀 연마 절단" : language === "tr" ? "1. Hassas Milimetrik Pürüzsüz Kesim" : "1. Micro-Tolerance Precision Cutting"}
              </span>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-light font-normal">
                {language === "ko"
                  ? "절단 시 측벽 함몰이나 마모를 방지하는 독자 설계 프레스 기어와 고경도 메탈 블레이드를 통해 밀리미터 단위 정밀 피치를 맞춥니다."
                  : language === "tr"
                    ? "Dairesel deformasyonları ve ezilmeleri önleyen özel tasarlanmış bıçak takımları ile pürüzsüz milimetrik kesim finisajı sunuyoruz."
                    : "Employs high-durability circular hard steel alloy knives and rigid tooling sets to ensure perfect right-angle edges and zero burring."}
              </p>
            </div>
            <div className="p-5 border border-gray-150 rounded-2xl bg-white space-y-2">
              <span className="block font-bold text-xs sm:text-sm text-gray-900">
                {language === "ko" ? "2. 다구경 자동 나선식 성형 라인" : language === "tr" ? "2. Gelişmiş Helisel Bobin Sarma Hatları" : "2. Helical Multi-Diameter Automated Winders"}
              </span>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-light font-normal">
                {language === "ko"
                  ? "안정성에 필수적인 장력 구배를 일정하게 조율하여 성형 시 주름이나 벽부 보이드 발생을 사전에 방지하는 최신 자동 제어 시스템을 가동합니다."
                  : language === "tr"
                    ? "Sürekli gerginlik denge kontrol ünitesi ile karton katmanların kaymasını ve hava boşluklarını engelleyen modern sarım sistemi."
                    : "Continuous tension monitoring systems coordinate paper feeding angles, blocking structural voids or delamination under high rotation."}
              </p>
            </div>
            <div className="p-5 border border-gray-150 rounded-2xl bg-white space-y-2">
              <span className="block font-bold text-xs sm:text-sm text-gray-900">
                {language === "ko" ? "3. 천연 자원 유래 친환경 결착제" : language === "tr" ? "3. Doğal Mineral Esaslı Yapıştırıcılar" : "3. Eco-Friendly Bio-Degradable Adhesives"}
              </span>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-light font-normal">
                {language === "ko"
                  ? "유독성 휘발 물질 방출이 전혀 없는 물 배합 가용 왁싱 점료를 도입, 완전한 생분해력과 우수한 접착 강성을 조율하여 자원 배려 생산을 다합니다."
                  : language === "tr"
                    ? "%100 Geri dönüştürülebilir bilesenler ve uçucu organik bileşik (VOC) içermeyen doğal yapıştırıcılar ile çevreye saygılı üretim."
                    : "Zero-VOC water-soluble natural binders preserve extreme composite rigidity while providing full biodegradability."}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons Action */}
        <div className="border border-gray-150 rounded-2xl p-6 sm:p-10 bg-gray-50 text-center space-y-6">
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {language === "ko"
              ? "일반지관은 다품종 주문 생산 및 소량이라도 생산 및 가용한 규정 사양 협상이 가능합니다."
              : language === "tr"
                ? "Endüstriyel ürünlerimiz esnek siparişe uygundur; farklı ebat alternatifleri ve teslim koşulları için bizimle iletişime geçin."
                : "All industrial tubes are open to flexible bespoke options. We cater to multi-spec production even for specialized parameters."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handlesPrefill(
                language === "ko" ? "일반지관 맞춤 제작 문의" : "Industrial Customized Order Consulting", 
                language === "ko" ? "구분: 일반지관 맞춤 조율 상담요청 / 사이즈: 소형~대형 선택" : "Sector: Winding core / Custom sizing details"
              )}
              className="py-3 px-5 rounded-xl bg-kraft-500 hover:bg-kraft-600 text-gray-950 font-black text-xs sm:text-sm transition-all shadow active:scale-95 cursor-pointer border-0"
            >
              {language === "ko" ? "일반지관 맞춤 제작 문의하기" : language === "tr" ? "Özel Sipariş Talebi Gönder" : "Inquire Customized Fabrication"}
            </button>
            <button
              onClick={() => handlesPrefill(
                language === "ko" ? "일반지관 생산 단가 견적 요청" : "Industrial Paper Core Bulk Price Inquiry", 
                language === "ko" ? "구분: 대량 양산 및 단단가표 협상용" : "Sector: Bulk manufacturing contract negotiation"
              )}
              className="py-3 px-5 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-850 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
            >
              {language === "ko" ? "생산 단가 견적 요청하기" : language === "tr" ? "Toptan Teklif Talep Et" : "Request Bulk Pricing"}
            </button>
            <button
              onClick={() => onTabChange("simulator")}
              className="py-3 px-5 rounded-xl bg-military-850 hover:bg-military-900 text-white font-bold text-xs sm:text-sm transition-all shadow active:scale-95 cursor-pointer flex items-center gap-1.5 border-0"
            >
              <Calculator className="w-4 h-4 text-white" />
              {language === "ko" ? "실시간 규격 계산해보기" : language === "tr" ? "Ebat Hesaplayıcıyı Aç" : "Launch Visual Calculator"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
