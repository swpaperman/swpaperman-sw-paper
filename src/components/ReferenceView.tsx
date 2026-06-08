/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase, 
  Info, 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ReferenceViewProps {
  onTabChange?: (tabId: string) => void;
}

export default function ReferenceView({ onTabChange }: ReferenceViewProps) {
  const { language, t } = useLanguage();

  const governmentOrgs = [
    { 
      name: language === "ko" 
        ? "국방부" 
        : language === "tr" 
          ? "Kore Cumhuriyeti Savunma Bakanlığı" 
          : "Ministry of National Defense (MND)", 
      type: language === "ko" 
        ? "조달 및 표준화 관련" 
        : language === "tr" 
          ? "Askeri Tedarik ve Şartname Teknik Görüşme" 
          : "Procurement & Standardization Standards" 
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
          : "Packaging Verification & Core Supply" 
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
          : "Defense Material Business Review Alignment" 
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
          : "Active Member Collaborations & Standard Research" 
    },
    { 
      name: language === "ko" 
        ? "국방기술품질원" 
        : language === "tr" 
          ? "Savunma Teknolojisi ve Kalite Ajansı (DTaQ)" 
          : "Defense Agency for Technology and Quality (DTaQ)", 
      type: language === "ko" 
        ? "품질보증 및 제도 협의 이력" 
        : language === "tr" 
          ? "Kalite Güvence ve Şartname Uygunluk Testler" 
          : "Quality Assurance & Production Audit Track" 
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
          : "Prototype Material Consultation & R&D Projects" 
    },
    { 
      name: language === "ko" 
        ? "국방기술진흥연소" 
        : language === "tr" 
          ? "Savunma Teknolojilerini Teşvik Enstitüsü (KRIT)" 
          : "Korea Research Institute for Defense Technology (KRIT)", 
      type: language === "ko" 
        ? "장기 보존 패키지 선도 조사" 
        : language === "tr" 
          ? "Uzun Dönem Koruyucu Paketleme Teknik Çalışmalar" 
          : "Next-Gen Tactical Storage Material Alignment" 
    }
  ];

  const corporateClients = [
    { 
      name: language === "ko" ? "한화에어로스페이스" : "Hanwha Aerospace", 
      biz: language === "ko" 
        ? "방산용 특수 패키지 협의" 
        : language === "tr" 
          ? "Savunma Sanayi Özel Ambalaj Projeleri" 
          : "Special Defense Packaging Specifications" 
    },
    { 
      name: language === "ko" ? "풍산" : "Poongsan Corporation", 
      biz: language === "ko" 
        ? "탄종 유격 장비 포장 지재 가공" 
        : language === "tr" 
          ? "Balistik Mühimmat Koruyucu Masura İmalati" 
          : "Ballistic Ammo Protective Core Fabrication" 
    },
    { 
      name: language === "ko" ? "삼양화학" : "Samyang Chemical", 
      biz: language === "ko" 
        ? "내화학 기밀성 지관 조립 검토" 
        : language === "tr" 
          ? "Yüksek Korozyon Dirençli Tüp İnceleme" 
          : "Corrosive-Resistant Tube Alignments" 
    },
    { 
      name: language === "ko" ? "LIG넥스원" : "LIG Nex1", 
      biz: language === "ko" 
        ? "정밀 안전 방전 유도 지관 대응" 
        : language === "tr" 
          ? "Hassas Askeri Elektronik Koruyucu Boru" 
          : "Strategic Precision Shielding Sleeves" 
    },
    { 
      name: language === "ko" ? "한국CNO테크" : "Korea CNO Tech", 
      biz: language === "ko" 
        ? "시생산 탄종 차단 패키지 운용" 
        : language === "tr" 
          ? "Eğitim Mühimmatı Koruyucu Ambalajlama" 
          : "Tactical Blank Ammo Transport Packs" 
    },
    { 
      name: language === "ko" ? "고려화공" : "Koryo Pyro", 
      biz: language === "ko" 
        ? "화공 자재 방습 실링관 기장 검토" 
        : language === "tr" 
          ? "Kimyasal Malzeme Nem Yalıtımlı Kapak" 
          : "Pyrotechnic Moisture Barrier Sleeves" 
    },
    { 
      name: language === "ko" ? "FITS 에프아이티에스" : "FITS Corporation", 
      biz: language === "ko" 
        ? "고강도 산업용 코어 롤 지관" 
        : language === "tr" 
          ? "Endüstriyel Mukavemetli Bobin Göbeği" 
          : "Heavy-Gauge Winding Industrial Cores" 
    },
    { 
      name: language === "ko" ? "대신코퍼레이션" : "Daeshin Corp", 
      biz: language === "ko" 
        ? "수송 하중 분산 지관 보호캡" 
        : language === "tr" 
          ? "Lojistik Yük Dağıtıcı Koruyucu Parça" 
          : "Heavy Transits Cushioning Overpacks" 
    },
    { 
      name: language === "ko" ? "대화공업" : "Daehwa Industry", 
      biz: language === "ko" 
        ? "기계 와인딩 특화 자재 검토" 
        : language === "tr" 
          ? "Makine Sarımı Özel Mukavva Borular" 
          : "High-Speed Bobbin Rolling Sleeves" 
    },
    { 
      name: language === "ko" ? "동양정공" : "Dongyang Precision", 
      biz: language === "ko" 
        ? "스틸 조립 보강 플랜지 기술" 
        : language === "tr" 
          ? "Metal Destek Çemberi Kaynak Kalite" 
          : "Steel Band Stamping Reinforcement" 
    },
    { 
      name: language === "ko" ? "케이씨아이" : "KCI Adhesive Co", 
      biz: language === "ko" 
        ? "정밀 점착 가공 배합 기밀성" 
        : language === "tr" 
          ? "Özel Reçine Karışım Sızdırmazlığı" 
          : "Complex Liquid Resin Isolation" 
    },
    { 
      name: language === "ko" ? "페리만" : "Ferriman Co", 
      biz: language === "ko" 
        ? "범용 인쇄 연신 필름 권취용" 
        : language === "tr" 
          ? "Yüksek Gerilimli Stretch Film Rulosu" 
          : "Stretch film high-tension winders" 
    },
    { 
      name: language === "ko" ? "티젠" : "Teazen Core Mfg", 
      biz: language === "ko" 
        ? "특수 대경 축 압축 강도 조율" 
        : language === "tr" 
          ? "Büyük Çaplı Eksenel Ezilme Ayarı" 
          : "Articulated Large-Bore Compression" 
    },
    { 
      name: language === "ko" ? "기타 산업용 지관 및 포장재 관련 고객사" : "Other Industrial Core & Tube Enterprise Clients", 
      biz: language === "ko" 
        ? "공업 배송 및 튜브 가공 네트워크" 
        : language === "tr" 
          ? "Endüstriyel Boru Dağıtım ve Lojistik" 
          : "National Industrial Tubes Logistics" 
    }
  ];

  const introCards = [
    {
      num: "01",
      eng: "Defense & Government Related Organizations",
      title: language === "ko" ? "관련기관" : language === "tr" ? "Müteahhit Kurumlar" : "Organizations",
      desc: language === "ko"
        ? "군수품 포장, 품질관리, 조달 및 기술 검토 분야에서 관련 업무 경험을 축적해 왔습니다."
        : language === "tr"
          ? "Mühimmat paketleme, askeri kalite denetimi ve şartname inceleme konularında üst düzey lojistik paydaşlığı yürüttük."
          : "We have acquired professional technical backgrounds working closely in defense-packaging alignments and material reviews."
    },
    {
      num: "02",
      eng: "Defense & Industrial Clients",
      title: language === "ko" ? "주요 고객사" : language === "tr" ? "Kurumsal Müşteriler" : "Enterprise Clients",
      desc: language === "ko"
        ? "방산, 화학, 산업용 포장 분야 기업들과 제품 공급 및 규격 협의를 진행해 왔습니다."
        : language === "tr"
          ? "Küresel savunma sanayi, petrokimya ve bobin sarama sektörünün dev markalarıyla ürün tedariki yapmaktayız."
          : "We supply ballistic pack sleeves and bespoke winding cylinders to top chemical, aerospace, and metallurgy groups."
    },
    {
      num: "03",
      eng: "Custom Manufacturing Network",
      title: language === "ko" ? "맞춤 제조 네트워크" : language === "tr" ? "Özel Üretim Ekosistemi" : "Bespoke Manufacturing",
      desc: language === "ko"
        ? "탄약지환통, 일반지관, 특수 포장용 지관 등 고객 요구 사양에 따른 맞춤 생산 상담이 가능합니다."
        : language === "tr"
          ? "Farklı uzunluk, iç çap, duvar kalınlığı ve neme dayanıklılık limitlerine uygun dairesel konik ve silindirik üretim çözümleri."
          : "Provides full-scope customization services adjusting bore width, density rating, and moisture wax recipes."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="mb-12 border-0">
          <span className="text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-50 px-3 py-1 rounded inline-block">
            {t.referencePage.badge}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
            {t.referencePage.title}
          </h1>
          <div className="w-12 h-1 bg-kraft-500 mt-4 rounded-full" />
        </div>

        {/* Top Description Box */}
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-150 mb-16 shadow-xs font-normal">
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-semibold break-keep">
            {t.referencePage.descBold}
          </p>
          <p className="mt-3 text-gray-600 text-xs sm:text-sm font-light leading-relaxed break-keep">
            {t.referencePage.descLight}
          </p>
        </div>

        {/* 3 Overview Cards Layout */}
        <div className="mb-16">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-8 border-l-4 border-military-700 pl-3">
            {language === "ko" ? "신뢰 협동 가치 분류 (Collaboration Segments)" : language === "tr" ? "Güven Değer Odakları" : "Collaboration Segments"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {introCards.map((card, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-military-500 hover:shadow-md transition-all space-y-4 relative overflow-hidden"
              >
                <span className="absolute top-4 right-4 text-3xl font-black text-gray-100 font-mono">
                  {card.num}
                </span>
                <span className="block text-[9px] font-mono font-semibold text-gray-400 uppercase tracking-wider pr-10">
                  {card.eng}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 pt-1">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: 관련기관 */}
        <div className="mb-16">
          <div className="pb-3 border-b border-gray-150 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-military-700" />
              {t.referencePage.section1Title}
            </h3>
            <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed font-normal">
              {t.referencePage.section1Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {governmentOrgs.map((org, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl border border-gray-150 bg-gray-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-military-600 font-mono font-bold uppercase tracking-wider block">
                    {t.referencePage.tableThOrg}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900">
                    {org.name}
                  </h4>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-normal">
                  <span className="text-[11px] text-gray-400 font-light">
                    {org.type}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-military-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 주요 고객사 및 협력사 */}
        <div className="mb-16">
          <div className="pb-3 border-b border-gray-150 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-military-700" />
              {t.referencePage.section2Title}
            </h3>
            <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed font-normal">
              {t.referencePage.section2Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {corporateClients.map((client, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl border border-gray-150 bg-white hover:border-military-500 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-kraft-700 font-mono font-bold uppercase tracking-wider block">
                    {t.referencePage.tableThClient}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {client.name}
                  </h4>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-normal">
                  <span className="text-[11px] text-gray-400 font-light truncate">
                    {client.biz}
                  </span>
                  <Briefcase className="w-3.5 h-3.5 text-kraft-500 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Disclaimer Notice */}
        <div className="p-6 rounded-2xl bg-amber-50/45 border border-amber-200 text-amber-900 flex items-start gap-4 max-w-4xl mx-auto my-8">
          <Info className="w-5.5 h-5.5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-left font-normal">
            <span className="block font-bold text-xs text-amber-950">{t.referencePage.disclaimerTitle}</span>
            <p className="text-[11px] sm:text-xs leading-relaxed text-amber-850 font-light">
              {t.referencePage.disclaimerDesc}
            </p>
          </div>
        </div>

        {/* Inquire Redirect Button */}
        {onTabChange && (
          <div className="text-center pt-8 mt-12 border-t border-gray-100 font-normal">
            <p className="text-xs text-gray-400 mb-4 font-light">
              {t.referencePage.btnContactSub}
            </p>
            <button
              onClick={() => onTabChange("contact")}
              className="py-3 px-8 rounded-xl bg-military-850 hover:bg-military-900 text-white text-xs font-bold transition-all shadow active:scale-95 cursor-pointer border-0"
            >
              {t.referencePage.btnContactText}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
