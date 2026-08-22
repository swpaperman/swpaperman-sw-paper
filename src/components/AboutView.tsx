/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { 
  Building, 
  MapPin, 
  Award, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  History,
  Shield,
  Cpu,
  Sparkles,
  Search,
  Check,
  Lock,
  Unlock,
  Settings,
  Key,
  RefreshCw
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HistoryEvent {
  date: string;
  text: string;
  isHighlight?: boolean;
  type: "defense" | "cert" | "business" | "rnd" | "founding";
}

interface HistoryEra {
  id: "era3" | "era2" | "era1";
  title: string;
  period: string;
  badge: string;
  color: string;
  bg: string;
  text: string;
  border: string;
  icon: string;
  desc: string;
  events: HistoryEvent[];
}

export default function AboutView() {
  const { language } = useLanguage();
  const [activeEra, setActiveEra] = useState<"all" | "era3" | "era2" | "era1">("all");
  const [sortBy, setSortBy] = useState<"desc" | "asc">("desc");

  // Admin passcode-changing portal state
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [checkPass, setCheckPass] = useState("");
  const [checkError, setCheckError] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [changeError, setChangeError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem("suwon_admin_passcode") || "swpaper7638**";
    
    if (checkPass === storedPass) {
      setIsAdminActive(true);
      setCheckError("");
    } else {
      setCheckError(
        language === "ko"
          ? "보안 인증코드가 올바르지 않습니다. 수원지관산업 최고 마스터 패스워드를 입력해주세요."
          : language === "tr"
            ? "Girdiğiniz güvenlik şifresi geçersizdir! Lütfen yetkili yönetici şifresini yazın."
            : "Authorized passcode is invalid! Please enter the authorized master passcode."
      );
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || !newPassConfirm) {
      setChangeError(
        language === "ko"
          ? "모든 빈칸을 빠짐없이 채워주세요."
          : language === "tr"
            ? "Lütfen tüm boşlukları eksiksiz doldurun."
            : "Please fill in all blanks."
      );
      return;
    }
    if (newPass !== newPassConfirm) {
      setChangeError(
        language === "ko"
          ? "새로 입력하신 암호 두 개가 서로 다릅니다. 정확히 재확인해 주세요."
          : language === "tr"
            ? "Girdiğiniz yeni şifreler eşleşmiyor!"
            : "The two new passcodes you entered do not match."
      );
      return;
    }
    if (newPass.length < 4) {
      setChangeError(
        language === "ko"
          ? "암호 보안 기준에 맞게 최소 4자 이상의 새 규격 암호를 설정해 주십시오."
          : language === "tr"
            ? "Yönetici şifresi en az 4 karakter olmalıdır."
            : "Passcode must be at least 4 characters long."
      );
      return;
    }

    localStorage.setItem("suwon_admin_passcode", newPass);
    alert(
      language === "ko" 
        ? "최고 마스터 암호가 성공적으로 변경 및 안전하게 보관되었습니다." 
        : language === "tr" 
          ? "Yönetici şifresi başarıyla güncellendi." 
          : "Master passcode has been successfully updated and stored."
    );
    setIsAdminActive(false);
    setCheckPass("");
    setNewPass("");
    setNewPassConfirm("");
    setChangeError("");
  };

  const historyEras: HistoryEra[] = language === "tr" ? [
    {
      id: "era3",
      title: "Çevre Dostu Malzemeler & Üretimde İnovasyon",
      period: "2015 ~ Günümüz",
      badge: "Eco-Innovation",
      color: "emerald",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      text: "text-emerald-700",
      border: "border-emerald-100",
      icon: "🌱",
      desc: "İklim değişikliklerine dayanıklı çevre dostu nem bariyere sahip özel selüloz malzemelerin geliştirilmesi, akıllı otomasyon hatlarına geçiş ve yerli savunma sanayii kalite yeterlilik tescilleri dönemi.",
      events: [
        { date: "2023 ~ Günümüz", text: "KDS8140-4005 askeri şartnameleri doğrultusunda çevre dostu mühimmat fiber boru kutularının seri üretimi (Savunma Teknolojisi ve Kalite Ajansı - DTaQ onaylı)", isHighlight: true, type: "defense" },
        { date: "Ekim 2020", text: "Kore Gıda ve İlaç Güvenliği Bakanlığı (MFDS) tescilli yarı-tıbbi ürün üretici lisansı alımı", type: "cert" },
        { date: "Aralık 2019", text: "Savunma Kalite (DQ) Mark Sertifikasının Alınması (Mühimmat Kutuları Bölümü)", isHighlight: true, type: "defense" },
        { date: "Eylül 2015", text: "Savunma Teknolojisi ve Kalite Ajansı çevre dayanıklılık saha testlerinin başarıyla tamamlanması (Çevre dostu mühimmat ambalajları)", isHighlight: true, type: "defense" },
        { date: "Mayıs 2015", text: "Şirket bünyesinde resmi Ar-Ge Laboratuvarı kuruluş ve tescili", type: "rnd" },
        { date: "Mart 2015", text: "Mühimmat Kutuları imalatı için resmi Savunma Kalite Yönetim Sistemi (DQMS) Uygunluk Belgesinin alınışı", isHighlight: true, type: "defense" }
      ]
    },
    {
      id: "era2",
      title: "Kalite Standardizasyonu & Kurumsallaşma",
      period: "2001 ~ 2014",
      badge: "Quality Leadership",
      color: "amber",
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      text: "text-amber-800",
      border: "border-amber-100",
      icon: "⚡",
      desc: "Kantitatif ISO Kalite Yönetim çerçevesinin kurulması, Hyangnam'daki modern üretim kompleksine taşınılması ve Suwon Paper Cone & Tube unvanıyla kurumsallaşma.",
      events: [
        { date: "Nisan 2014", text: "Teknolojik İnovasyon Şirketi (Inno-Biz) Sertifikasyonunun Alınması", type: "cert" },
        { date: "Nisan 2014", text: "Yönetim İnovasyonu Şirketi (Main-Biz) Sertifikasyonunun Alınması", type: "cert" },
        { date: "Nisan 2013", text: "Resmi Kadın Girişimci İşletmesi Tescilinin Alınması", type: "business" },
        { date: "Haziran 2010", text: "Resmi Girişimci (Startup Venture) Teknoloji Şirketi olarak tescillenme", type: "business" },
        { date: "Nisan 2010", text: "Mühimmat silindirik masuraları ve hedef İHA'lar için Resmi Kalite Güvence (Q-Mark) sertifikasının alınışı", isHighlight: true, type: "defense" },
        { date: "Nisan 2010", text: "Çevre Yönetim Sistemi Uygunluk Belgesinin alınması (KS Q ISO 14001)", type: "cert" },
        { date: "Mart 2010", text: "Kore Endüstriyel Teknoloji Derneği bünyesinde resmi Ar-Ge departmanının tescili", type: "rnd" },
        { date: "Mart 2010", text: "Kore Endüstriyel Teknoloji Derneği aktif üyeliğine kabul edilme", type: "rnd" },
        { date: "Ağustos 2009", text: "Kalite Yönetim Sistemi Sertifikasyonunun Alınması (KS Q ISO 9001)", type: "cert" },
        { date: "Mart 2007", text: "Ticaret, Sanayi ve Enerji Bakanlığı tarafından resmi Savunma Sanayi Tedarikçisi olarak tayin edilme", isHighlight: true, type: "defense" },
        { date: "Ocak 2007", text: "Yasal tüzel kişiliğin Suwon Paper Cone & Tube Mfg. Co., Ltd. olarak değiştirilmesi ve sermaye artırımı", isHighlight: true, type: "business" },
        { date: "Haziran 2004", text: "İlk ISO 9001 Kalite Sertifikasının alınması", type: "cert" },
        { date: "Ağustos 2003", text: "Hyangnam, Hwaseong'daki entegre modern üretim tesislerine genişleme ve taşınma", type: "business" },
        { date: "Mart 2001", text: "ISO 9002 Kalite Sertifikasyonunun alınışı", type: "cert" }
      ]
    },
    {
      id: "era1",
      title: "Milli Savunma İşbirliği & Kuruluş",
      period: "1964 ~ 1997",
      badge: "Defense Heritage",
      color: "blue",
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      text: "text-blue-700",
      border: "border-blue-100",
      icon: "🛡️",
      desc: "Kurucu imalatçılık ruhunun doğuşu, Kore Cumhuriyeti Milli Savunma Bakanlığı tarafından mühimmat silindirik ambalajlarının resmi savunma tedarikçisi tayin edilmesiyle başlayan adanmışlık.",
      events: [
        { date: "Şubat 1997", text: "Kore Cumhuriyeti Milli Savunma Bakanlığı'ndan resmi askeri malzeme ihracat lisansının alınması", isHighlight: true, type: "defense" },
        { date: "Kasım 1989", text: "Milli Savunma Sanayii Birincil Yüklenicisi olarak tayin edilme", isHighlight: true, type: "defense" },
        { date: "Aralık 1984", text: "Savunma Geliştirme Enstitüsü (ADD) tarafınca Gelecek Vaat Eden Küçük Sanayi Kuruluşu seçilmesi", type: "rnd" },
        { date: "Haziran 1982", text: "Resmi ithalat-ihracat ticari ticaret tescilinin yapılması", type: "business" },
        { date: "Ekim 1979", text: "Savunma Bakanlığı tarafından Üstün Ulusal Askeri Tedarik Müteahhidi seçilmesi", isHighlight: true, type: "defense" },
        { date: "Mart 1979", text: "Savunma Bakanlığı tarafından taktik hava-hedef İHA sistemlerinin resmi tedarikçisi seçilmesi", isHighlight: true, type: "defense" },
        { date: "Nisan 1978", text: "Ticaret Bakanı tarafından Birincil Temel Savunma Sanayii Yüklenicisi tayin edilmesi", isHighlight: true, type: "defense" },
        { date: "Kasım 1975", text: "Mühimmat silindirik fiber karton kutuların resmi askeri lojistik tedarik malzemesi olarak tayin edilmesi", isHighlight: true, type: "defense" },
        { date: "Nisan 1964", text: "Suwon Paper Cone kuruldu (Kurucunun ödünsüz imalat zanaat mirasının başlatılması)", isHighlight: true, type: "founding" }
      ]
    }
  ] : language === "en" ? [
    {
      id: "era3",
      title: "Eco-Friendly Material & Manufacturing Innovation",
      period: "2015 ~ Present",
      badge: "Eco-Innovation",
      color: "emerald",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      text: "text-emerald-700",
      border: "border-emerald-100",
      icon: "🌱",
      desc: "Development of advanced eco-friendly waterproof/moisture-proof paper materials to combat climate spikes, plus transition to automated smart factory cells and proprietary defense quality certifications.",
      events: [
        { date: "2023 ~ Present", text: "Mass production of eco-friendly ammunition packaging fiberboard tubes under KDS8140-4005 national defense specifications (Assured & Approved by DTaQ - Defense Agency for Technology and Quality)", isHighlight: true, type: "defense" },
        { date: "Oct 2020", text: "Registered as a quasi-drug manufacturer with the Ministry of Food and Drug Safety (MFDS)", type: "cert" },
        { date: "Dec 2019", text: "Acquired Defense Quality (DQ) Mark Certification (Ammunition Containers Division)", isHighlight: true, type: "defense" },
        { date: "Sep 2015", text: "Passed environmental durability performance evaluations at Defense Agency for Technology and Quality (Ammunition Containers)", isHighlight: true, type: "defense" },
        { date: "May 2015", text: "Established and certified an in-house Corporate R&D Laboratory", type: "rnd" },
        { date: "Mar 2015", text: "Obtained official Defense Quality Management System (DQMS) Certificate for Ammo Containers mfg.", isHighlight: true, type: "defense" }
      ]
    },
    {
      id: "era2",
      title: "Quality Standardization & Incorporation",
      period: "2001 ~ 2014",
      badge: "Quality Leadership",
      color: "amber",
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      text: "text-amber-800",
      border: "border-amber-100",
      icon: "⚡",
      desc: "Establishment of the quantitative ISO Quality Management Framework, relocation to the modern manufacturing complex in Hyangnam, and corporate incorporation as Suwon Paper Cone & Tube.",
      events: [
        { date: "Apr 2014", text: "Acquired Technological Innovation Small Business (Inno-Biz) Certificate", type: "cert" },
        { date: "Apr 2014", text: "Acquired Management Innovation Small Business (Main-Biz) Certificate", type: "cert" },
        { date: "Apr 2013", text: "Certified as a Women-Owned Business Enterprise (WBE)", type: "business" },
        { date: "Jun 2010", text: "Registered officially as a Venture Capitalist Backed Tech Company", type: "business" },
        { date: "Apr 2010", text: "Obtained Quality Assurance (Q-Mark) Certificate for ammunition barrels and target drones", isHighlight: true, type: "defense" },
        { date: "Apr 2010", text: "Obtained Environmental Management System Certification (KS Q ISO 14001)", type: "cert" },
        { date: "Mar 2010", text: "Registered Corporate R&D Division with the Korea Industrial Technology Association", type: "rnd" },
        { date: "Mar 2010", text: "Admitted as an active member of the Korea Industrial Technology Association", type: "rnd" },
        { date: "Aug 2009", text: "Obtained Quality Management System Certification (KS Q ISO 9001)", type: "cert" },
        { date: "Mar 2007", text: "Designated as an official Defense Industry Contract Firm by the Ministry of Commerce, Industry and Energy", isHighlight: true, type: "defense" },
        { date: "Jan 2007", text: "Converted legal identity to Suwon Paper Cone & Tube Mfg. Co., Ltd. (Modernized operations)", isHighlight: true, type: "business" },
        { date: "Jun 2004", text: "Obtained initial ISO 9001 Certification", type: "cert" },
        { date: "Aug 2003", text: "Relocated head factory to Hyangnam, Hwaseong, to establish a high-capacity production hub", type: "business" },
        { date: "Mar 2001", text: "Obtained ISO 9002 Certification", type: "cert" }
      ]
    },
    {
      id: "era1",
      title: "National Self-Defense Cooperation & Inception",
      period: "1964 ~ 1997",
      badge: "Defense Heritage",
      color: "blue",
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      text: "text-blue-700",
      border: "border-blue-100",
      icon: "🛡️",
      desc: "Dawn of the founder's paper cone craft spirit. Designated as South Korea's official prime military ammunition tube defense supplier under National Security plans.",
      events: [
        { date: "Feb 1997", text: "Received official military export registration license from the ROK Ministry of National Defense", isHighlight: true, type: "defense" },
        { date: "Nov 1989", text: "Designated as a Prime Defense Industry Contractor (National Security Logistics)", isHighlight: true, type: "defense" },
        { date: "Dec 1984", text: "Selected as a Highly Promising Venture by Agency for Defense Development (ADD) / Defense Research Labs", type: "rnd" },
        { date: "Jun 1982", text: "Registered under national export/import merchant networks", type: "business" },
        { date: "Oct 1979", text: "Selected as an Outstanding Military Service Supplier by ROK Ministry of National Defense", isHighlight: true, type: "defense" },
        { date: "Mar 1979", text: "Designated as the official manufacturer of tactical air-tow target drones by ROK Ministry of National Defense", isHighlight: true, type: "defense" },
        { date: "Apr 1978", text: "Designated as a Core Defense Prime Contractor by the Minister of Commerce and Industry", isHighlight: true, type: "defense" },
        { date: "Nov 1975", text: "Designated as the national military specification supplier of Paper Ammunition Containers (Moisture barrier)", isHighlight: true, type: "defense" },
        { date: "Apr 1964", text: "Founded Suwon Paper Cone (Upholding the founder's pure manufacturing legacy)", isHighlight: true, type: "founding" }
      ]
    }
  ] : [
    {
      id: "era3",
      title: "친환경 신소재 & 혁신 도약기",
      period: "2015 ~ 현재",
      badge: "Eco-Innovation",
      color: "emerald",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      text: "text-emerald-700",
      border: "border-emerald-100",
      icon: "🌱",
      desc: "기후 변화에 대응하는 친환경 특수 발습 소재 개발과 지능형 스마트 제조 공정 및 국방 독점 품질 규격 완성 시대",
      events: [
        { date: "2023 ~ 현재", text: "국방규격 KDS8140-4005 친환경 탄약지환통 양산진행 (품질확인 및 승인 : 기품원 - 국방기술품질원)", isHighlight: true, type: "defense" },
        { date: "2020. 10", text: "의약외품 제조업 신고 (식약처 등록)", type: "cert" },
        { date: "2019. 12", text: "DQ마크인증서 획득 (탄약지환통)", isHighlight: true, type: "defense" },
        { date: "2015. 09", text: "국방기술품질원 성능시험평가 충족 (친환경 탄약지환통)", isHighlight: true, type: "defense" },
        { date: "2015. 05", text: "기업부설연구소 인증 획득", type: "rnd" },
        { date: "2015. 03", text: "국방품질경영체제 DQMS 인증 획득 (탄약지환통류의 제조)", isHighlight: true, type: "defense" }
      ]
    },
    {
      id: "era2",
      title: "품질 표준화 & 법인 도약기",
      period: "2001 ~ 2014",
      badge: "Quality Leadership",
      color: "amber",
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      text: "text-amber-800",
      border: "border-amber-100",
      icon: "⚡",
      desc: "ISO 품질 경영 체제 정량화, 화성 향남 현대식 신공장 이전 및 ㈜수원지관산업 법인 출범을 골자로 한 성장 기반 확립 시대",
      events: [
        { date: "2014. 04", text: "기술혁신형 중소기업 (Inno-Biz) 인증 획득", type: "cert" },
        { date: "2014. 04", text: "경영혁신형 중소기업 (Main-Biz) 인증 획득", type: "cert" },
        { date: "2013. 04", text: "여성기업인증 획득", type: "business" },
        { date: "2010. 06", text: "벤처기업 등록", type: "business" },
        { date: "2010. 04", text: "품질보증 (Q마크) 획득 (탄약지환통 / 창형표적기)", isHighlight: true, type: "defense" },
        { date: "2010. 04", text: "환경경영시스템인증 (KS Q ISO 14001)", type: "cert" },
        { date: "2010. 03", text: "연구개발전담부서 등록 (한국산업기술진흥협회)", type: "rnd" },
        { date: "2010. 03", text: "한국산업기술진흥협회 회원 등록", type: "rnd" },
        { date: "2009. 08", text: "품질경영시스템인증 (KS Q ISO 9001)", type: "cert" },
        { date: "2007. 03", text: "방산업체지정 (산업자원부)", isHighlight: true, type: "defense" },
        { date: "2007. 01", text: "㈜수원지관산업 법인변경 (제조 주권 현대화 및 자본 확충)", isHighlight: true, type: "business" },
        { date: "2004. 06", text: "ISO 9001 인증 획득", type: "cert" },
        { date: "2003. 08", text: "수원공장 현주소지 (화성시 향남읍) 종합 생산 거점으로 확장 이전", type: "business" },
        { date: "2001. 03", text: "ISO 9002 인증 획득", type: "cert" }
      ]
    },
    {
      id: "era1",
      title: "자주국방 협력 & 기술 창업기",
      period: "1964 ~ 1997",
      badge: "Defense Heritage",
      color: "blue",
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      text: "text-blue-700",
      border: "border-blue-100",
      icon: "🛡️",
      desc: "초대 수원지관 태동 및 국방부 공식 탄약지환통 군수물자 정식 조달 지정 등 대한민국 안보 산업과 궤를 같이 해온 헌신",
      events: [
        { date: "1997. 02", text: "주요 방산물자 수출업 정식 허가 취득 (국방부)", isHighlight: true, type: "defense" },
        { date: "1989. 11", text: "주요 방위산업체 지정", isHighlight: true, type: "defense" },
        { date: "1984. 12", text: "유망 중소기업체 선정 (국방과학연구소)", type: "rnd" },
        { date: "1982. 06", text: "수출 · 입 업체 등록", type: "business" },
        { date: "1979. 10", text: "우수군납업체 지정 (국방부)", isHighlight: true, type: "defense" },
        { date: "1979. 03", text: "항공견인표적기 군수물자 지정 (국방부)", isHighlight: true, type: "defense" },
        { date: "1978. 04", text: "주요 방위산업체 지정 (상공부)", isHighlight: true, type: "defense" },
        { date: "1975. 11", text: "탄약지환통 군수물자 지정 (안보 수호 납품 실증)", isHighlight: true, type: "defense" },
        { date: "1964. 04", text: "수원지관 설립 (창립자 정신 계승 발족)", isHighlight: true, type: "founding" }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-50 px-3 py-1 rounded inline-block">
            {language === "ko" ? "TAILORED HERITAGE SINCE 1964" : language === "tr" ? "1964'TEN BERİ MİRAS VE ZANAAT" : "TAILORED HERITAGE SINCE 1964"}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
            {language === "ko" ? "수원지관산업 소개" : language === "tr" ? "Suwon Paper Cone & Tube Tanıtımı" : "About Suwon Paper Cone"}
          </h1>
          <p className="mt-2 text-gray-400 font-mono text-xs sm:text-sm uppercase tracking-wider">
            SUWON PAPER CONE & TUBE MFG. CO., LTD.
          </p>
          <div className="w-12 h-1 bg-kraft-500 mt-4 rounded-full" />
        </div>

        {/* Company Landscape Image Cover */}
        <div className="mb-16 relative rounded-3xl overflow-hidden border border-gray-200 shadow-sm group">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/d/1ZhiLrzge9tJnzzMUwPHSNTUyOOYq4dS4" 
              alt={language === "ko" ? "수원지관산업 전경" : language === "tr" ? "Suwon Fabrikası Genel Görünüm" : "Suwon HQ Complex Overview"} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kraft-400 animate-pulse" />
              {language === "ko" 
                ? "주식회사 수원지관산업 생산본부 및 제1공장 전경" 
                : language === "tr" 
                  ? "Suwon Paper Cone & Tube Mfg. Üretim Genel Merkezi ve 1. Fabrikası" 
                  : "Suwon Paper Cone & Tube Mfg. Production HQ and Plant 1 Aerial View"}
            </span>
            <span className="text-kraft-300 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest bg-military-900/90 px-3 py-1 rounded-sm backdrop-blur-xs border border-military-800">
              PRODUCTION HQ (HWASEONG, KOREA)
            </span>
          </div>
        </div>

        {/* Corporate Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Main Info Columns: 7 cols */}
          <div className="lg:col-span-7 space-y-6 text-gray-700 leading-relaxed font-light text-sm sm:text-base">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
              {language === "ko" ? (
                <>지관 기술 제조의 역사와 진정성으로 <br />고품질 최정밀 군수 탄약지환통 공급에 임합니다.</>
              ) : language === "tr" ? (
                <>Köklü üretim tarihimiz ve dürüstlüğümüzle <br />yüksek kaliteli mühimmat kutuları tedarik ediyoruz.</>
              ) : (
                <>With our rich inheritance and integrity, <br />we supply premium-grade military containers.</>
              )}
            </h3>
            
            <p>
              {language === "ko" 
                ? "주식회사 수원지관산업(SUWON PAPER CONE & TUBE MFG. CO., LTD.)은 1964년 초대 수원지관 설립 이래 60년이 넘는 세월 동안 오직 나선 성형 지관 및 방습 패키지 가공의 정밀 한 길을 굳건히 걸어왔습니다."
                : language === "tr"
                  ? "Suwon Paper Cone & Tube Mfg. Co., Ltd., kurucumuzun ilk adımı attığı 1964 yılından bu yana, yüksek hassasiyetli dairesel masura sarımı ve neme dayanıklı ambalaj işleme odaklı tek bir yolda 60 yılı aşkın süredir kararlılıkla yürümektedir."
                  : "Suwon Paper Cone & Tube Mfg. Co., Ltd. has steadfastly walked a single path of high-precision spiral tube winding and moisture-proof protective packaging process for over 60 years since its inception in 1964."}
            </p>
            <p>
              {language === "ko"
                ? "특히 당사는 탄약지환통 제조를 주력으로 하여, 장기 비치 중 습기로부터 기동 탄약을 보호할 수 있는 습기 차단 코팅막 제조 능력과 군수품 수송 기준의 강하력 낙하 충격을 분산시키는 대각 나선 결착 와인더 기술을 정량화하고 지속 개선해 왔습니다."
                : language === "tr"
                  ? "Özellikle mühimmat silindirik ambalajlarında uzmanlaşan firmamız, neme karşı koruyucu özel bariyer kaplama hatlarımızı (mühimmatı uzun süreli depolama şartlarında nemden tam koruyan) ve düşme-darbe kuvvetlerini sönümleyen diagonal spiral sarım teknolojilerimizi sürekli olarak geliştirip standartlaştırmıştır."
                  : "In particular, specializing in ammunition fiber containers, we have quantified and continually refined our specialty barrier coating line (protecting active ammo from humidity during long-term storage) and diagonal spiral winding structure (dissipating impact from drops and rough military transits)."}
            </p>
            <p>
              {language === "ko"
                ? "또한, 이와 같은 군수용 특수 지관 제조 역량을 고대로 전수하여 일반 배송 우편 지관, 연신 인쇄 필름 권취용 지관 등 민수 산업 파트너들의 섬세한 구경과 공차 요구 사양에도 높은 일관된 품질률로 협응하고 있습니다."
                : language === "tr"
                  ? "Ayrıca, askeri standartlardaki bu üst düzey hassasiyetimizi sivil endüstriyel sektörlere de aktarıyor; esnek ambalaj filmleri, endüstriyel bobinler, rulo sarım masuraları ve postalama kutuları gibi sivil ürünleri mikron seviyesindeki hassas paylar ve sıfır hata prensipleri ile üretiyoruz."
                  : "Furthermore, we transfer this top-tier defense manufacturing prowess into the civilian sectors, servicing paper cores for stretch print films, posting mailing tubes, and other industrial applications with microscopic tolerance controls and consistent zero-defect rates."}
            </p>
          </div>

          {/* Core Stats / Cards: 5 cols */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-150 rounded-2xl p-6 sm:p-8 space-y-5">
            <h4 className="text-xs font-bold text-gray-400 font-mono tracking-widest uppercase pb-2 border-b border-gray-200">
              CORPORATE SNAPSHOT
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex gap-3">
                <Building className="w-5 h-5 text-military-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-900">{language === "ko" ? "회사명" : language === "tr" ? "Şirket Adı" : "Company Name"}</span>
                  <p className="text-gray-500 font-medium text-xs mt-0.5">
                    주식회사 수원지관산업 <br />
                    SUWON PAPER CONE & TUBE MFG. CO., LTD.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-military-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-900">{language === "ko" ? "설립일" : language === "tr" ? "Kuruluş Tarihi" : "Founded Date"}</span>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {language === "ko" 
                      ? "1964년 4월 수원지관 설립 발족" 
                      : language === "tr" 
                        ? "Nisan 1964, Suwon Paper Cone olarak faaliyete başlama" 
                        : "April 1964, established as Suwon Paper Cone"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-military-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-900">{language === "ko" ? "본사공장" : language === "tr" ? "Genel Merkez & Fabrika" : "HQ Factory"}</span>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {language === "ko" 
                      ? "경기도 화성시 만세구 향남읍 발안로 679-14" 
                      : "679-14, Baran-ro, Hyangnam-eup, Hwaseong-si, Gyeonggi-do, Republic of Korea"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Award className="w-5 h-5 text-military-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-900">{language === "ko" ? "주요 사업군" : language === "tr" ? "Ana Faaliyet Alanı" : "Core Business"}</span>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {language === "ko" 
                      ? "탄약지환통 전문 제조, 민수/공업 범용 대·소규격 스파이럴 종이 지관 가공" 
                      : language === "tr"
                        ? "Askeri mühimmat ambalaj muhafaza boruları ve sivil çapta endüstriyel spiral mihver karton boru imalatı"
                        : "Specialized defense ammunition paperboard containers and civilian-industrial spiral paper tubes manufacturing"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Office & Headquarters Spaces Gallery Section */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-5 h-5 text-military-700" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {language === "ko" 
                ? "최첨단 스마트 융합 오피스 및 기술교류 공간" 
                : language === "tr" 
                  ? "Modern Entegre Akıllı Ofis ve Teknik İşbirliği Alanları" 
                  : "State-of-the-Art Smart Integrated Office & Tech Hub"}
            </h3>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          
          <p className="text-xs sm:text-sm text-gray-500 font-light mb-8 max-w-3xl leading-relaxed">
            {language === "ko"
              ? "주식회사 수원지관산업은 고내구 탄약지환통 부설 기술연구소와 엄격한 품질 보증 관제를 실현하는 스마트 비즈니스 오피스 공간을 가동하여, 완벽한 국가 군수 보급 시스템과 글로벌 거래처 대응 인프라를 구축하고 있습니다."
              : language === "tr"
                ? "Şirketimiz bünyesinde, yüksek dayanıklılığa sahip askeri kutular için kurulan resmi Ar-Ge Laboratuvarı ve sıkı Kalite Güvence denetim kurgularını yönettiğimiz akıllı ofisimiz ile sarsıntısız bir ulusal askeri sevkiyat zinciri entegrasyonu sunuyoruz."
                : "By operating a dedicated R&D lab for high-durability defense containers alongside a smart administration office for strict Quality Assurance control, Suwon Paper Cone guarantees a perfect national military logistics supply chain and global responsive networks."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="about-hq-gallery">
            {/* Office 1 */}
            <div className="group rounded-2xl border border-gray-150 overflow-hidden bg-white shadow-xs transition-all hover:shadow-md hover:border-gray-300" id="hq-space-1">
              <div className="aspect-[4/3] w-full bg-slate-900 overflow-hidden relative">
                <img 
                  src="https://lh3.googleusercontent.com/d/1xJpQ_P_aEwXVVHaiS3CJIPIYJ9g9xqXr" 
                  alt={language === "ko" ? "전략 비즈니스 기획 및 다목적 회의실" : "Strategic Conference Room"} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-military-900/90 text-white text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow">
                  HQ SPACE 01
                </span>
              </div>
              <div className="p-4 sm:p-5 text-left">
                <h4 className="font-extrabold text-sm text-gray-900">
                  {language === "ko" 
                    ? "전략 비즈니스 기획 및 다목적 회의실" 
                    : language === "tr" 
                      ? "Stratejik İş Planlama ve Çok Fonksiyonlu Toplantı Salonu" 
                      : "Strategic Business Planning & Boardroom"}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5 leading-relaxed font-light">
                  {language === "ko"
                    ? "국내외 주요 군수 파트너 정기 조정 및 중장기 자주국방 보급 품질 기획이 수립되는 브레인스토밍 허브 공간입니다."
                    : language === "tr"
                      ? "Ulusal ve uluslararası savunma ortaklarımızla düzenli işbirlikleri gerçekleştirdiğimiz ve uzun vadeli askeri sevkiyat kalite stratejileri geliştirdiğimiz beyin fırtınası odak noktamızdır."
                      : "A collaborative brainstorm hub where we coordinate with domestic and global defense partners to formulate mid-to-long-term military logistics logistics policies."}
                </p>
              </div>
            </div>

            {/* Office 2 */}
            <div className="group rounded-2xl border border-gray-150 overflow-hidden bg-white shadow-xs transition-all hover:shadow-md hover:border-gray-300" id="hq-space-2">
              <div className="aspect-[4/3] w-full bg-slate-900 overflow-hidden relative">
                <img 
                  src="https://lh3.googleusercontent.com/d/1__b4BiW-TRWo069ib6XQWFAtleivrLh4" 
                  alt={language === "ko" ? "스마트 품질경영 및 디지털 행정 오피스" : "Smart Administration Office"} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-military-900/90 text-white text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow">
                  HQ SPACE 02
                </span>
              </div>
              <div className="p-4 sm:p-5 text-left">
                <h4 className="font-extrabold text-sm text-gray-900">
                  {language === "ko" 
                    ? "스마트 품질경영 및 디지털 행정 오피스" 
                    : language === "tr" 
                      ? "Akıllı Kalite Yönetimi ve Dijital Yönetim Ofisi" 
                      : "Smart Quality Management & Digital Administration"}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5 leading-relaxed font-light">
                  {language === "ko"
                    ? "원부자재 안정성 검사 전산 트래킹, 납품 일정 관리 및 전 방위적 행정 서비스를 지원하는 현대식 스마트 오피스입니다."
                    : language === "tr"
                      ? "Hammadde kalite testlerinin kayıt altına alınması, teslimat planlamalarının yönetimi ve tüm resmi belgelerin dijital takibi için tasarlanmış modern yönetim merkezimizdir."
                      : "A modern administrative center optimized for logging raw material inspection compliance, logistics schedules tracking, and full-spectrum documentation processing."}
                </p>
              </div>
            </div>

            {/* Office 3 */}
            <div className="group rounded-2xl border border-gray-150 overflow-hidden bg-white shadow-xs transition-all hover:shadow-md hover:border-gray-300" id="hq-space-3">
              <div className="aspect-[4/3] w-full bg-slate-900 overflow-hidden relative">
                <img 
                  src="https://lh3.googleusercontent.com/d/1dEx49zeqxp0pA9zFzSIS-AZd6ZsY_5cR" 
                  alt={language === "ko" ? "탄약지환통 R&D 연구실 및 핵심 미팅 회의실" : "Ammunition Tube R&D Lab"} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-military-900/90 text-white text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow">
                  HQ SPACE 03
                </span>
              </div>
              <div className="p-4 sm:p-5 text-left">
                <h4 className="font-extrabold text-sm text-gray-900">
                  {language === "ko" 
                    ? "탄약지환통 R&D 연구실 및 핵심 미팅 회의실" 
                    : language === "tr" 
                      ? "Mühimmat Kutusu Ar-Ge Laboratuvarı ve Ana Toplantı Alanı" 
                      : "Ammunition Tube R&D Laboratory & Core Meeting Room"}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5 leading-relaxed font-light">
                  {language === "ko"
                    ? "탄약지환통 R&D 가공 기술연구실 및 핵심 미팅룸 공간으로, 군수 관계진들이 당사 방문 시 도안 미팅 및 사양을 조율하는 공간입니다."
                    : language === "tr"
                      ? "Askeri delegasyonlar ve savunma sanayii temsilcileri bizi ziyaret ettiklerinde tasarım detaylarını gözden geçirdiğimiz, Ar-Ge odaklı teknik toplantı ve şartname netleştirme alanımızdır."
                      : "Our dedicated defense container R&D laboratory and core meeting space, where we map layout blueprints and calibrate compliance specifications when military officials and clients visit."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate History Timeline Block */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-l-4 border-military-700 pl-3">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-military-700" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {language === "ko" 
                  ? "수원지관산업 60년 신뢰 연혁 (Historical Milestone)" 
                  : language === "tr" 
                    ? "Suwon Paper Cone'un 60 Yıllık Güven ve Başarı Tarihi" 
                    : "Suwon Paper Cone's 60-Year Legacy of Trust"}
              </h3>
            </div>
            
            {/* Filter Controllers */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              {/* Descending/Ascending Sorter */}
              <button
                onClick={() => setSortBy(sortBy === "desc" ? "asc" : "desc")}
                className="py-1 px-3 text-2xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center gap-1 active:scale-95 transition-all select-none"
              >
                <Clock className="w-3.5 h-3.5" />
                {language === "ko" 
                  ? (sortBy === "desc" ? "최신순 정렬" : "과거순 정렬") 
                  : language === "tr" 
                    ? (sortBy === "desc" ? "Yeniden Eskiye" : "Eskiden Yeniye") 
                    : (sortBy === "desc" ? "Newest First" : "Oldest First")}
              </button>

              <div className="h-4 w-px bg-gray-200" />

              {/* View Mode Switching Tabs */}
              <div className="inline-flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                <button
                  onClick={() => setActiveEra("all")}
                  className={`py-1 px-2.5 rounded-md text-2xs font-bold transition-all select-none pr-3 pl-3 ${
                    activeEra === "all"
                      ? "bg-white text-gray-950 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {language === "ko" ? "전체 연속 보기" : language === "tr" ? "Tümünü Gör" : "View All"}
                </button>
                <button
                  onClick={() => setActiveEra("era3")}
                  className={`py-1 px-2.5 rounded-md text-2xs font-bold transition-all select-none pr-3 pl-3 ${
                    activeEra !== "all"
                      ? "bg-white text-gray-950 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {language === "ko" ? "시대별 모아보기" : language === "tr" ? "Döneme Göre" : "View by Era"}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 font-light mb-8 max-w-3xl leading-relaxed">
            {language === "ko"
              ? "1964년 초대 설립부터 가깝게는 친환경 탄약지환통의 국가 국방 규격 지정 양산에 이르기까지, 주식회사 수원지관산업의 강도 높은 정밀 제조 역사는 대한민국 자주국방의 발자취와 함께 성장해 왔습니다."
              : language === "tr"
                ? "1964 yılındaki kuruluşumuzdan, askeri nitelikteki çevre dostu mühimmat fiber boru kutularının seri üretimine uzanan süreçte; hassas üretim kültürümüz Kore Cumhuriyeti'nin milli savunma sanayi hamleleriyle omuz omuza yükselmiştir."
                : "From our founding in 1964 to the mass production of military-spec eco-friendly ammunition storage tubes, our high-precision manufacturing history has progressed hand-in-hand with the growth of South Korea's sovereign national defense."}
          </p>

          {/* Era Select Tabs (Active when group filtering selected) */}
          {activeEra !== "all" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
              {historyEras.map((era) => {
                const isActive = activeEra === era.id;
                return (
                  <button
                    key={era.id}
                    onClick={() => setActiveEra(era.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 select-none ${
                      isActive 
                        ? `${era.bg} ring-2 ring-military-700/20 shadow-sm` 
                        : "bg-white hover:bg-gray-50/50 border-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-400">
                        {era.badge}
                      </span>
                      <span className="text-base">{era.icon}</span>
                    </div>
                    
                    <h4 className="font-bold text-xs sm:text-sm mt-2 text-gray-900 block truncate">
                      {era.title}
                    </h4>
                    <span className="text-[11px] font-mono font-black block mt-0.5 text-gray-500">
                      {era.period}
                    </span>
                    <p className="text-[10px] text-gray-400 font-normal leading-relaxed text-slate-500 mt-2 line-clamp-2">
                      {era.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* Visual Interactive Timeline Trees */}
          <div className="relative border-l-2 border-slate-100 pl-4 sm:pl-8 space-y-12">
            
            {historyEras
              .filter(era => activeEra === "all" || activeEra === era.id)
              .map((era, groupIdx) => {
                // Determine sorted list
                const sortedEvents = [...era.events].sort((a, b) => {
                  const parseDate = (dStr: string) => {
                    const parsed = parseFloat(dStr.replace(/[^0-9.]/g, ""));
                    return isNaN(parsed) ? 9999 : parsed;
                  };
                  return sortBy === "desc" ? parseDate(b.date) - parseDate(a.date) : parseDate(a.date) - parseDate(b.date);
                });

                return (
                  <div key={era.id} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Era Indicator Badge inside tree */}
                    {activeEra === "all" && (
                      <div className="relative -left-[28px] sm:-left-[44px] flex items-center gap-2 mb-4 select-none">
                        <div className={`p-1.5 rounded-full ring-4 ring-white ${
                          era.id === "era3" 
                            ? "bg-emerald-50 text-white" 
                            : era.id === "era2" 
                              ? "bg-amber-50 text-white" 
                              : "bg-blue-500 text-white"
                        }`}>
                          <span className="text-xs w-5 h-5 flex items-center justify-center font-bold">
                            {era.icon}
                          </span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 py-1 px-3 rounded-xl">
                          <span className="text-2xs font-bold text-gray-900 block leading-none">
                            {era.title}
                          </span>
                          <span className="text-[9px] font-mono text-gray-400 block mt-0.5">
                            {era.period}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Timeline Event list */}
                    <div className="space-y-4">
                      {sortedEvents.map((act, idx) => {
                        // Badge type configurations
                        const badgeConf = {
                          defense: { 
                            label: language === "ko" ? "🛡️ 국방지정" : language === "tr" ? "🛡️ Askeri Proje" : "🛡️ Defense Prime", 
                            color: "bg-olive-50 text-olive-850 border-olive-200" 
                          },
                          cert: { 
                            label: language === "ko" ? "📜 품질표준" : language === "tr" ? "📜 Kalite Std" : "📜 Quality Std", 
                            color: "bg-purple-50 text-purple-800 border-purple-100" 
                          },
                          rnd: { 
                            label: language === "ko" ? "🔬 기술개발" : language === "tr" ? "🔬 Ar-Ge" : "🔬 Tech R&D", 
                            color: "bg-blue-50 text-blue-800 border-blue-100" 
                          },
                          business: { 
                            label: language === "ko" ? "🏛️ 기업성장" : language === "tr" ? "🏛️ Kurumsal" : "🏛️ Corporate", 
                            color: "bg-slate-105 text-slate-800 border-slate-200" 
                          },
                          founding: { 
                            label: language === "ko" ? "🏡 창업기반" : language === "tr" ? "🏡 Kuruluş" : "🏡 Foundation", 
                            color: "bg-kraft-50 text-kraft-800 border-kraft-200" 
                          }
                        }[act.type] || { 
                          label: language === "ko" ? "일반" : language === "tr" ? "Genel" : "General", 
                          color: "bg-gray-50 text-gray-700 border-gray-150" 
                        };

                        return (
                          <div 
                            key={idx} 
                            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-150 relative ${
                              act.isHighlight 
                                ? "bg-amber-50/20 border-amber-200/60 shadow-xs" 
                                : "bg-white border-gray-150 hover:border-gray-300"
                            }`}
                          >
                            {/* Dot anchor on timeline line */}
                            <div className={`absolute -left-[29px] sm:-left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-all ${
                              act.isHighlight 
                                ? "bg-amber-500 ring-2 ring-amber-100" 
                                : era.id === "era3" 
                                  ? "bg-emerald-500" 
                                  : era.id === "era2" 
                                    ? "bg-amber-400" 
                                    : "bg-blue-500"
                            }`} />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-start sm:items-center gap-3">
                                {/* Chronological Year Label */}
                                <span className={`text-sm sm:text-base font-mono font-black shrink-0 tracking-tight ${
                                  act.isHighlight ? "text-amber-800" : "text-gray-900"
                                }`}>
                                  {act.date}
                                </span>

                                {/* Category Custom Badge */}
                                <span className={`text-[10px] font-bold py-0.5 px-2 rounded-md border shrink-0 ${badgeConf.color}`}>
                                  {badgeConf.label}
                                </span>

                                {/* Special Highlight Sparkle Indicator */}
                                {act.isHighlight && (
                                  <span className="bg-amber-100 text-amber-700 p-0.5 rounded text-[10px] sm:inline-block hidden" title="주요 이정표">
                                    <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Event Main Description */}
                            <p className={`text-xs sm:text-sm mt-2 font-normal leading-relaxed text-left ${
                              act.isHighlight ? "text-gray-900 font-semibold" : "text-gray-600"
                            }`}>
                              {act.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

          </div>

        </div>

        {/* 최고관리자 암호 변경 포털 */}
        <div className="mt-20 border-t border-gray-150 pt-16">
          <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-kraft-100 rounded-full blur-2xl opacity-40 pointer-events-none" />
            
            <div className="w-12 h-12 bg-military-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 border border-military-800">
              <Settings className="w-5 h-5 text-kraft-300 animate-[spin_10s_linear_infinite]" />
            </div>

            <h3 className="text-base font-black text-gray-950 flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4 text-kraft-600" />
              {language === "ko" 
                ? "최고관리자 암호 설정 통합 관제기" 
                : language === "tr" 
                  ? "Yönetici Şifresi Değiştirme Portalı" 
                  : "Master Passcode Control Portal"}
            </h3>
            <p className="text-xs text-gray-500 mt-1.5 font-light leading-relaxed">
              {language === "ko"
                ? "실시간 재고·공정 제품군 등록 및 주요 물류 카탈로그 제어에 필요한 마스터 인증 패스워드를 실시간 변경하여 보관합니다."
                : language === "tr"
                  ? "Canlı stok verilerini güncellemek, teknik parametreleri değiştirmeki ve üst düzey lojistik yetkilerini açmak için gerekli olan ana yönetici şifresini güncelleyin."
                  : "Update and store the master administrator passcode required to manage live container stock, specify technical parameters, and unlock high-level logistics options."}
            </p>

            {!isAdminActive ? (
              <form onSubmit={handleUnlockAdmin} className="mt-6 space-y-3">
                <div className="text-left">
                  <label className="block text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-wider">
                    {language === "ko" ? "현재 최고관리자 마스터 암호" : language === "tr" ? "Mevcut Yönetici Şifresi" : "Current Master Passcode"}
                  </label>
                  <input
                    type="password"
                    required
                    value={checkPass}
                    onChange={(e) => {
                      setCheckPass(e.target.value);
                      setCheckError("");
                    }}
                    placeholder={
                      language === "ko" 
                        ? "기존 암호를 입력해 주세요" 
                        : language === "tr" 
                          ? "Mevcut şifreyi girin" 
                          : "Enter current passcode"
                    }
                    className="block w-full py-2.5 px-4 text-xs tracking-widest border border-gray-250 rounded-xl bg-white text-gray-950 font-mono text-center outline-none focus:border-military-600"
                  />
                </div>
                {checkError && (
                  <p className="text-[10px] text-red-650 font-semibold text-left">
                    {language === "tr" 
                      ? "Girdiğiniz şifre geçersizdir! Lütfen yetkili yönetici şifresini yazın." 
                      : language === "en" 
                        ? "Passcode is invalid! Please enter the authorized master passcode." 
                        : checkError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-military-850 hover:bg-military-900 text-white rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  {language === "ko" ? "기존 암호 실시간 대조 인증" : language === "tr" ? "Şifreyi Doğrula ve Giriş Yap" : "Verify Current Passcode"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleChangePasscode} className="mt-6 space-y-4 text-left">
                <div className="bg-emerald-50 border border-emerald-150 p-3 rounded-xl text-emerald-900 text-[11px] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === "ko" 
                      ? "최고 마스터 인가 완료 (공식 패스워드 재설정)" 
                      : language === "tr" 
                        ? "Yetki Verildi (Yeni şifrenizi tanımlayabilirsiniz)" 
                        : "Authorization Granted (Define new passcode below)"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-wider text-left">
                      {language === "ko" ? "수용 가능한 새로운 암호" : language === "tr" ? "Uygulanacak Yeni Şifre" : "New Passcode to Apply"}
                    </label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder={language === "ko" ? "설정할 신규 암호 입력" : "New passcode"}
                      className="block w-full py-2.5 px-4 text-xs tracking-widest border border-gray-250 rounded-xl bg-white text-gray-950 font-mono text-center outline-none focus:border-military-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-wider text-left">
                      {language === "ko" ? "신규 암호 재확인 (똑같이 원모어)" : language === "tr" ? "Yeni Şifreyi Doğrulayın" : "Confirm New Passcode"}
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassConfirm}
                      onChange={(e) => setNewPassConfirm(e.target.value)}
                      placeholder={language === "ko" ? "한번 더 동일하게 입력" : "Confirm once more"}
                      className="block w-full py-2.5 px-4 text-xs tracking-widest border border-gray-250 rounded-xl bg-white text-gray-950 font-mono text-center outline-none focus:border-military-600"
                    />
                  </div>
                </div>

                {changeError && (
                  <p className="text-[10px] text-red-650 font-bold leading-normal">
                    {language === "tr" 
                      ? "Girdiğiniz yeni şifreler eşleşmiyor ya da çok kısa! Lütfen en az 4 hane girin." 
                      : language === "en" 
                        ? "Passcodes do not match or are too short (must be at least 4 chars)." 
                        : changeError}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminActive(false);
                      setCheckPass("");
                      setNewPass("");
                      setNewPassConfirm("");
                      setChangeError("");
                    }}
                    className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-250 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    {language === "ko" ? "인증권한 회수" : language === "tr" ? "Oturumu Kapat" : "Revoke Session"}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-military-850 hover:bg-military-900 text-white rounded-xl text-xs font-black transition-all cursor-pointer text-center shadow-xs"
                  >
                    {language === "ko" ? "마스터 암호 교체 반영" : language === "tr" ? "Yönetici Şifresini Değiştir" : "Apply New Passcode"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}