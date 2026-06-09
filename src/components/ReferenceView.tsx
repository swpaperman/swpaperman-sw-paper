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
  ExternalLink
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ReferenceViewProps {
  onTabChange?: (tabId: string) => void;
}

export default function ReferenceView({ onTabChange }: ReferenceViewProps) {
  const { language, t } = useLanguage();

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
      color: "military"
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
      color: "military"
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
      color: "blue"
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
      color: "military"
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
      color: "blue"
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
      color: "red"
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
      color: "amber"
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
      color: "kraft"
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
      color: "kraft"
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
      color: "kraft"
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
      color: "kraft"
    },
    { 
      name: language === "ko" ? "한국CNO테크" : "Korea CNO Tech", 
      biz: language === "ko" 
        ? "시생산 탄종 차단 패키지 운용" 
        : language === "tr" 
          ? "Eğitim Mühimmatı Koruyucu Ambalajlama" 
          : "Tactical Blank Ammo Transport Packs",
      initials: "CNO TECH",
      color: "military"
    },
    { 
      name: language === "ko" ? "고려화공" : "Koryo Pyro", 
      biz: language === "ko" 
        ? "화공 자재 방습 실링관 기장 검토" 
        : language === "tr" 
          ? "Kimyasal Malzeme Nem Yalıtımlı Kapak" 
          : "Pyrotechnic Moisture Barrier Sleeves",
      initials: "KORYO",
      color: "red"
    },
    { 
      name: language === "ko" ? "FITS 에프아이티에스" : "FITS Corporation", 
      biz: language === "ko" 
        ? "고강도 산업용 코어 롤 지관" 
        : language === "tr" 
          ? "Endüstriyel Mukavemetli Bobin Göbeği" 
          : "Heavy-Gauge Winding Industrial Cores",
      initials: "FITS",
      color: "blue"
    },
    { 
      name: language === "ko" ? "대신코퍼레이션" : "Daeshin Corp", 
      biz: language === "ko" 
        ? "수송 하중 분산 지관 보호캡" 
        : language === "tr" 
          ? "Lojistik Yük Dağıtıcı Koruyucu Parça" 
          : "Heavy Transits Cushioning Overpacks",
      initials: "DAESHIN",
      color: "amber"
    },
    { 
      name: language === "ko" ? "대화공업" : "Daehwa Industry", 
      biz: language === "ko" 
        ? "기계 와인딩 특화 자재 검토" 
        : language === "tr" 
          ? "Makine Sarımı Özel Mukavva Borular" 
          : "High-Speed Bobbin Rolling Sleeves",
      initials: "DAEHWA",
      color: "gray"
    },
    { 
      name: language === "ko" ? "동양정공" : "Dongyang Precision", 
      biz: language === "ko" 
        ? "스틸 조립 보강 플랜지 기술" 
        : language === "tr" 
          ? "Metal Destek Çemberi Kaynak Kalite" 
          : "Steel Band Stamping Reinforcement",
      initials: "DYP",
      color: "blue"
    },
    { 
      name: language === "ko" ? "케이씨아이" : "KCI Adhesive Co", 
      biz: language === "ko" 
        ? "정밀 점착 가공 배합 기밀성" 
        : language === "tr" 
          ? "Özel Reçine Karışım Sızdırmazlığı" 
          : "Complex Liquid Resin Isolation",
      initials: "KCI ADHESIVE",
      color: "amber"
    },
    { 
      name: language === "ko" ? "페리만" : "Ferriman Co", 
      biz: language === "ko" 
        ? "배송 및 투명 랩 권취용 튜브" 
        : language === "tr" 
          ? "Yüksek Gerilimli Stretch Film Rulosu" 
          : "Stretch film high-tension winders",
      initials: "FERRIMAN",
      color: "military"
    },
    { 
      name: language === "ko" ? "티젠" : "Teazen Core Mfg", 
      biz: language === "ko" 
        ? "특수 대경 축 압축 강도 조율" 
        : language === "tr" 
          ? "Büyük Çaplı Eksenel Ezilme Ayarı" 
          : "Articulated Large-Bore Compression",
      initials: "TEAZEN",
      color: "green"
    },
    { 
      name: language === "ko" ? "기타 산업용 지관 및 포장재 관련 고객사" : "Other Industrial Core & Tube Enterprise Clients", 
      biz: language === "ko" 
        ? "공업 배송 및 튜브 가공 네트워크" 
        : language === "tr" 
          ? "Endüstriyel Boru Dağıtım ve Lojistik" 
          : "National Industrial Tubes Logistics",
      initials: "ETC CLIENTS",
      color: "gray"
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
          ? "Küresel savunma sanayi, petrokimya 및 bobin sarama sektörünün dev markalarıyla ürün tedariki yapmaktayız."
          : "We supply ballistic pack sleeves and bespoke winding cylinders to top chemical, aerospace, and metallurgy groups."
    },
    {
      num: "03",
      eng: "Custom Manufacturing Network",
      title: language === "ko" ? "맞춤 제조 네트워크" : language === "tr" ? "Özel Üretim Ekosistemi" : "Bespoke Manufacturing",
      desc: language === "ko"
        ? "탄약지환통, 일반지관, 특수 포장용 지관 등 고객 요구 사양에 따른 맞춤 생산 상담이 가능합니다."
        : language === "tr"
          ? "Farklı uzunluk, iç çap, duvar kalınlığı ve neme dayanıklılık limitlerine uygun dairesel konik 및 silindirik üretim çözümleri."
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
          <div className="pb-3 border-b border-gray-150 mb-6 font-semibold">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-military-700" />
              {t.referencePage.section1Title}
            </h3>
            <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed font-normal">
              {t.referencePage.section1Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {governmentOrgs.map((org, idx) => {
              // Now government links are disabled, so isClickable will always be false
              const isClickable = false;
              const CardContent = (
                <div className="relative p-5 h-36 flex flex-col justify-between overflow-hidden group">
                  {/* Watermark Faded Image Background inside card */}
                  {org.logo ? (
                    <img 
                      src={org.logo} 
                      alt="" 
                      className="absolute right-[-14px] bottom-[-14px] h-28 w-28 object-contain opacity-[0.06] group-hover:opacity-[0.11] group-hover:scale-105 group-hover:rotate-[-6deg] transition-all duration-500 pointer-events-none select-none filter contrast-125 saturate-50"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="absolute right-2 -bottom-4 text-6xl font-mono font-black tracking-tighter text-gray-400 opacity-[0.04] group-hover:opacity-[0.09] transition-all duration-500 pointer-events-none select-none">
                      {org.initials}
                    </span>
                  )}

                  {/* Top content */}
                  <div className="space-y-1.5 relative z-10">
                    <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-military-500 block">
                      {t.referencePage.tableThOrg}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight leading-snug">
                      {org.name}
                    </h4>
                  </div>

                  {/* Bottom content */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-normal relative z-10 bg-transparent">
                    <span className="text-[11px] text-gray-400 font-light truncate max-w-[85%]" title={org.type}>
                      {org.type}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-military-500/80 shrink-0" />
                  </div>
                </div>
              );

              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-gray-200/80 bg-white hover:border-military-500 hover:shadow-sm transition-all duration-300"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: 주요 고객사 및 협력사 */}
        <div className="mb-16">
          <div className="pb-3 border-b border-gray-150 mb-6 font-semibold">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-military-700" />
              {t.referencePage.section2Title}
            </h3>
            <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed font-normal">
              {t.referencePage.section2Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {corporateClients.map((client, idx) => {
              // Only 4 active partners have clickable links: Hanwha, Poongsan, Samyang, LIG Nex1
              const hasActiveLink = !!client.link;
              
              const CardContent = (
                <div className="relative p-5 h-36 flex flex-col justify-between overflow-hidden group">
                  {/* Watermark Faded Image Background inside card */}
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt="" 
                      className="absolute right-[-14px] bottom-[-14px] h-28 w-28 object-contain opacity-[0.06] group-hover:opacity-[0.11] group-hover:scale-105 group-hover:rotate-[-6deg] transition-all duration-500 pointer-events-none select-none filter contrast-125 saturate-50"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="absolute right-2 -bottom-4 text-5xl font-mono font-black tracking-tighter text-gray-400 opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none select-none">
                      {client.initials}
                    </span>
                  )}

                  {/* Top content */}
                  <div className="space-y-1.5 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-kraft-600">
                        {t.referencePage.tableThClient}
                      </span>
                      {hasActiveLink && (
                        <div className="text-[8px] text-kraft-800 font-bold bg-kraft-50 border border-kraft-100/60 px-1.5 py-0.5 rounded flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <span>{language === "ko" ? "공식홈" : "Web"}</span>
                          <ExternalLink className="w-2 h-2" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight leading-snug group-hover:text-kraft-800 transition-colors">
                      {client.name}
                    </h4>
                  </div>

                  {/* Bottom content */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-normal relative z-10 bg-transparent">
                    <span className="text-[11px] text-gray-400 font-light truncate max-w-[85%]" title={client.biz}>
                      {client.biz}
                    </span>
                    <Briefcase className="w-3.5 h-3.5 text-kraft-500/80 shrink-0" />
                  </div>
                </div>
              );

              return hasActiveLink ? (
                <a 
                  key={idx} 
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-gray-200/80 bg-white hover:border-kraft-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 block cursor-pointer"
                >
                  {CardContent}
                </a>
              ) : (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-3xs transition-all duration-300"
                >
                  {CardContent}
                </div>
              );
            })}
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
