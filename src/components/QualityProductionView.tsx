/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  Cpu, 
  Settings, 
  Layers, 
  Flame, 
  Crop, 
  FileCheck, 
  CheckCircle2, 
  RotateCw,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface SafeImageProps {
  driveId: string;
  fallbackUrl: string;
  alt: string;
  className?: string;
  id?: string;
}

function SafeGoogleDriveImage({ driveId, fallbackUrl, alt, className = "", id }: SafeImageProps) {
  const [imgSrc, setImgSrc] = React.useState<string>(
    `https://lh3.googleusercontent.com/d/${driveId}`
  );
  const [retryCount, setRetryCount] = React.useState(0);

  const handleError = () => {
    if (retryCount === 0) {
      setImgSrc(`https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`);
      setRetryCount(1);
    } else if (retryCount === 1) {
      setImgSrc(`https://docs.google.com/uc?export=view&id=${driveId}`);
      setRetryCount(2);
    } else {
      setImgSrc(fallbackUrl);
    }
  };

  return (
    <img
      id={id}
      src={imgSrc}
      onError={handleError}
      referrerPolicy="no-referrer"
      alt={alt}
      className={className}
    />
  );
}

export default function QualityProductionView() {
  const { language, t } = useLanguage();

  const steps = [
    {
      num: "01",
      title: language === "ko" 
        ? "원지 투입 및 장력 조율" 
        : language === "tr" 
          ? "Bobin Besleme & Gerginlik Dengesi" 
          : "Roll Feeding & Tension Alignment",
      eng: "Roll Feeding & Tension Alignment",
      desc: language === "ko"
        ? "고평량 크라프트 고강도 원자재 롤을 전용 축에 거치한 다음 성형 풀러의 인장 구배에 맞춰 사행(좌우 흔들림) 없이 다단계 피드로 안정되게 투입 제어합니다."
        : language === "tr"
          ? "Yüksek yoğunluklu ve mukavemetli kraft kağıt bobini ana aks üzerine yerleştirilir. Dijital gerilim frenleyici sistemi ile katmanların kayması engellenerek spiral sarım ünitesine beslenir."
          : "Heavy-duty high-density raw kraft rolls are fed via tension-controlled shafts to ensure smooth processing under uniform dragging strain.",
      icon: RotateCw
    },
    {
      num: "02",
      title: language === "ko" 
        ? "다층 나선 결착 및 정밀 점착 가공" 
        : language === "tr" 
          ? "Çok Katmanlı Helisel Bobin Sarım & Pres" 
          : "Multi-Spiral Winding & Glue Adhesion",
      eng: "Multi-Spiral Winding & Glue Adhesion",
      desc: language === "ko"
        ? "다양한 두께 조합을 지닌 크라프트 원지 슬롯에 천연 생분해성 고강성 점료 배합을 도포한 다음, 각 도면 각도에 정확하게 겹쳐 돌려 감는 나선 교차 성형을 전개합니다."
        : language === "tr"
          ? "Değişik kalınlık kombinasyonuna sahip kraft katmanlarına biyo-uyumlu yüksek mukavemetli doğal yapıştırıcı formülü sürülür ve ardından tam dairesel kalıpla üst üste bindirilerek helisel presleme yapılır."
          : "Specialized bio-degradable stiff binders propagate multi-layered kraft slots, overlapping precisely along scheduled angles.",
      icon: Layers
    },
    {
      num: "03",
      title: language === "ko" 
        ? "왁스 융착 실시간 함침 및 가열 건조" 
        : language === "tr" 
          ? "Isıl Mum Kaplama & Kurutma Prosesi" 
          : "Wax Impregnation & Thermo Cure",
      eng: "Wax Impregnation & Thermo Cure",
      desc: language === "ko"
        ? "기밀성 및 안전 방습 수치 충족을 기하기 위해 섭씨 120도의 고온 조건 하에서 특수 수용성 발수 왁스 원료를 벽체 중심부까지 고압 함침 및 열 순환 건조시킵니다."
        : language === "tr"
          ? "Nefes alan korozyon önleyici ve su geçirmezlik koşullarının sağlanması için 120 Celcius sıcaklıkta özel formüllü mum/vakslama işlemi uygulanır."
          : "Airtight sealing and humidity guidelines are resolved via 120°C high-pressure waterborne wax impregnation and thermal curing.",
      icon: Flame
    },
    {
      num: "04",
      title: language === "ko" 
        ? "정밀 슬리터를 이용한 기장 절단" 
        : language === "tr" 
          ? "Robotik Disk Bıçaklı Milimetrik Kesim" 
          : "Micro-Precision Segment Slitting",
      eng: "Micro-Precision Segment Slitting",
      desc: language === "ko"
        ? "절단면 끝자리 마포나 변형을 완벽히 억제하는 고속 수평 회전 프레스 연마 블레이드가 도면 치수를 밀리미터 오차 밑으로 기밀 가공해 실시간 배출시킵니다."
        : language === "tr"
          ? "Ağız uçlarındaki ezilme ve pürüzleşmeleri tamamen saf dışı bırakan yüksek devirli pürüzsüz dilme makineleriyle milimetrik tolerans dahilinde kesim yapılır."
          : "Horizontal automated slitting knives clip perfect perpendicular edges with fractional millimeter accuracy, discarding physical deviations.",
      icon: Crop
    },
    {
      num: "05",
      title: language === "ko" 
        ? "단구 보강 특수 플랜지 및 캡 공압 조립" 
        : language === "tr" 
          ? "Metal Çemberleme & Sızdırmaz Kapak" 
          : "Steel Collar Fit & Safe Cap Assembly",
      eng: "Steel Collar Fit & Safe Cap Assembly",
      desc: language === "ko"
        ? "용기 강성을 비약화하고 장기 보관에 필요한 스틸 안전 고리 링 프레스 가판 조립과 기밀 오링 가스켓이 안착된 밀봉 안전 수지 캡 체결 라인을 공압식으로 완결 조립합니다."
        : language === "tr"
          ? "Taşıma mukavemetini artırmak amacıyla dairesel basınca dayanıklı çelik sac halkalar ve sızdırmaz conta tıpaları hava basınçlı pnömatik ünitelerce montajlanır."
          : "Secures high structural load ratings by stamping defense-grade reinforcing steel bands and tight sealing caps with internal locking gaskets.",
      icon: Settings
    },
    {
      num: "06",
      title: language === "ko" 
        ? "내압 기밀 누설 및 치수 전수 검사" 
        : language === "tr" 
          ? "Hava Basınç Sızdırmazlık & Ebat Kontrol" 
          : "Pneumatic leakage & Calibration Checks",
      eng: "Pneumatic leakage & Calibration Checks",
      desc: language === "ko"
        ? "마이크로미터 단위 단면 수치 확인, 정밀 압축 저항계 계측 및 가압 공기 누출 시험을 마지막 품질 전수 조사 라인에서 검증하고 데이터 리포트 시트를 축적 기록합니다."
        : language === "tr"
          ? "Mikrometre düzeyinde ebat ölçümleri, hidrolik test presi direnç baskıları ve yüksek basınçlı hava sızdırmazlığı son kalite tescil hattında denetlenerek raporlanır."
          : "Examines microscopic dimensions, compress strength coefficients, and pneumatic air leak ratios to compile complete quality log books.",
      icon: FileCheck
    }
  ];

  const highlights = [
    { 
      title: language === "ko" ? "국방품질경영 기준 참조 관리" : language === "tr" ? "Milli Savunma Kalite Normlar" : "Military Standards Framework", 
      desc: language === "ko" 
        ? "2015년 DQMS 인증 이력과 수십 년간 다져온 군수 용기 납품 관리 공력을 기반 삼아, 비록 현재 공식 인증 보유사는 아니지만 국방 방산물자 수준의 원스톱 품질 보증 규정을 수동 참조 운영합니다." 
        : language === "tr"
          ? "Daha önce tescil ettiğimiz askeri kalite belgemiz (DQMS) ve 50 yılı aşan askeri lojistik birikimimiz sayesinde mühimmat kutularını üst düzey askeri sevk reçetelerine paralel denetliyoruz."
          : "Maintains absolute system controls referencing tactical standards derived from decades of history as a major defense contractor." 
    },
    { 
      title: language === "ko" ? "ISO 9001 / ISO 14001 품질·환경 체계" : language === "tr" ? "ISO 9001 / ISO 14001 Sistemleri" : "ISO 9001 / ISO 14001 Standards", 
      desc: language === "ko" 
        ? "KS Q ISO 9001 / KS Q ISO 14001 표준 품질 경영 및 환경 보전 시스템을 유지 정착하여 전 공정에 필요한 검교정 시방을 빈틈없이 실행하고 있습니다." 
        : language === "tr"
          ? "KS Q ISO 9001 ve ISO 14001 yönergelerine bağlı kalarak çevre dostu yeşil enerji sertifikaları ve uluslararası nitelik taşıyan kalite sertifikasyon takibi yapmaktayız."
          : "Certified compliance with global ISO protocols guarantees reproducible quality metrics, raw materials grading, and thorough record keeping." 
    },
    { 
      title: language === "ko" ? "항온·항습 내부 자재 정비 보관" : language === "tr" ? "İklimlendirilmiş Hammadde Sahası" : "Climate-Controlled Storage Cells", 
      desc: language === "ko" 
        ? "지재류 생산의 핵심인 다공 수분 편차를 방지하도록 원자재 및 반제품 보관 구역의 상태 가습 환원 처리를 규칙적으로 통제해 고유의 조립 안정 강도를 다잡습니다." 
        : language === "tr"
          ? "Kağıt katmanlarının nem değişikliklerinden etkilenerek mukavemet kaybetmesini önlemek için stok ve üretim sahalarını gelişmiş nem alma cihazlarıyla dengede tutuyoruz."
          : "Regulates humidity within dedicated mills to eliminate moisture variation, preserving original material stiffness limits." 
    },
    { 
      title: language === "ko" ? "고객 맞춤 도 도면 정합 관리 보장" : language === "tr" ? "CAD Entegrasyonu & Hassas Kalibrasyon" : "CAD Blueprint Calibration Guarantee", 
      desc: language === "ko" 
        ? "국군 표준 서식이나 민수 필름사 맞춤 치수(1인치, 3인치, 6인치 등 특수 규격) 도면을 넘겨주시면 100% CAD 축척에 대응하는 가공 피치 오치를 달성해 검증 데이터로 보증해 드립니다." 
        : language === "tr"
          ? "Askeri teknik şartnameler veya sivil sanayicilerin özel ölçüleri (1 inç, 3 inç, 6 inç vb.) için hazırlanan CAD çizimlerini mikron tolerans ile kusursuz olarak üretime aktarıyoruz."
          : "Accommodates precise sizing blueprinted in CAD formats (including standard 1-inch, 3-inch, and 6-inch film cores), guaranteeing micrometer compliance." 
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-50 px-3 py-1 rounded inline-block">
            PROCESS PRECISION & RIGOROUS STANDARDS
          </span>
          <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-tight">
            {t.qualityPage.title}
          </h1>
          <div className="w-12 h-1 bg-kraft-500 mt-4 rounded-full" />
        </div>

        {/* Quality Nuance Banner (DQMS 정확한 서술) */}
        <div className="p-6 rounded-2xl bg-military-900 text-white border border-military-800 shadow-lg relative overflow-hidden mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-kraft-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2.5 max-w-4xl text-left">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-extrabold text-kraft-350 bg-military-800 py-1 px-3 rounded-full inline-block">
              QUALITY COMPLIANCE REPORT
            </span>
            <h3 className="text-lg font-black text-gray-100">{t.qualityPage.dqmsTitle}</h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              {t.qualityPage.dqmsDesc}
            </p>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              {language === "ko" 
                ? "오랜 군수품 포장 제조 경험을 바탕으로 치수 정밀성, 방습성, 내구성, 조립 안정성을 중점 관리하며, 고객 도면과 요구 규격에 적합한 제품을 안정적으로 생산하기 위해 현장 중심의 품질관리 체계를 유지하고 있습니다."
                : language === "tr"
                  ? "Uzun yıllara dayanan askeri sevkiyat ambalajı yönetim becerilerimiz ile ebat pürüzsüzlüğü, nem direnci, sarsıntı emilimi ve dişli kapakların kilit kararlılığını önceliklendiriyoruz."
                  : "Through our long-standing defense history, we actively trace dimension conformity, weather limits, and structural tolerances to align perfectly with all requested technical parameters."}
            </p>
          </div>
        </div>

        {/* Real-world Inspection & Manufacturing Gallery Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4 border-l-4 border-military-700 pl-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {language === "ko" ? "품질 보증 및 제조 생생 현장" : language === "tr" ? "Canlı Üretim ve Kalite Gözlem Odası" : "Quality Assurance & Manufacturing Live Archive"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-light mb-8 max-w-3xl leading-relaxed">
            {language === "ko"
              ? "원재료의 정밀 투입부터 실시간 가열 융착, 엄격한 계측실 시험, 신속 안전한 물류 출하 적재까지 모든 과정은 실제 정밀 통제 설비 환경 하에서 철저하게 전개됩니다."
              : language === "tr"
                ? "Karton bobin girişlerinden helisel preslemeye, hassas laboratuvar analizlerinden sızdırmaz kapak montajına kadar tüm faaliyetlerimiz kontrollü fabrika sahamızda sürdürülmektedir."
                : "From strategic raw material feeding, real-time waxing impregnation, microscopic lab testing, to secure pallet loading, everything takes place under a meticulously monitored plant environment."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Direct Image Card 1: Lab */}
            <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left" id="gallery-lab-card">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <SafeGoogleDriveImage 
                  id="gallery-lab-img"
                  driveId="1iU6rDwZjaQU7_c3R9xzBmTZ4rMVQolSk"
                  fallbackUrl="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  alt="Test Lab"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-military-900/80 backdrop-blur-xs text-kraft-300 py-1 px-2.5 rounded-md text-[10px] font-mono tracking-wider font-bold">
                  TEST LABORATORY
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900">
                      {language === "ko" ? "검실 종합 시험 연구실" : language === "tr" ? "Metroloji Kalibrasyon Laboratuvarı" : "QA Metrology Laboratory"}
                    </h4>
                    <a 
                      href="https://drive.google.com/file/d/1iU6rDwZjaQU7_c3R9xzBmTZ4rMVQolSk/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-military-600 hover:text-military-900 font-medium whitespace-nowrap flex items-center gap-0.5"
                    >
                      {language === "ko" ? "원본 보기 ↗" : "Original ↗"}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 font-light leading-relaxed font-normal">
                    {language === "ko"
                      ? "마이크로미터 단위의 치수 캘리브레이션 정합, 비파괴 내압 압축 항력 측정, 초정밀 오차 배제 기밀 누출 압착 검증 등이 실행되는 정부 군수 조달급 규격 대응 시험 공간입니다."
                      : language === "tr"
                        ? "Mikro-tolerans hassas ebat kalibrasyonu, hidrolik dairesel basınç ezme mukavemet testleri ve bilgisayarlı hava sızıntısı taramalarının yapıldığı laboratuvarımız."
                        : "Our dedicated testing center houses micrometer calibration tools, circular side-crush press testers, and pneumatic air tightness systems."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-2xs text-military-800 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-military-600 animate-pulse" />
                  {language === "ko" ? "실시간 검교정 시방 정밀 대조 통제" : "Active Blueprint Spec Alignment"}
                </div>
              </div>
            </div>

            {/* Direct Image Card 2: Production Line */}
            <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left" id="gallery-line-card">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <SafeGoogleDriveImage 
                  id="gallery-line-img"
                  driveId="1njxhdAqPbEjmGDx5oRBW2Q2k6FjRu05q"
                  fallbackUrl="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
                  alt="Production Line"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-military-900/80 backdrop-blur-xs text-kraft-300 py-1 px-2.5 rounded-md text-[10px] font-mono tracking-wider font-bold">
                  PRODUCTION LINE
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900">
                      {language === "ko" ? "고강성 나선 성형 자동 라인" : language === "tr" ? "Yüksek Gerdirmeli Otomatik Sarım Hattı" : "Automated High-Tension Coiling line"}
                    </h4>
                    <a 
                      href="https://drive.google.com/file/d/1njxhdAqPbEjmGDx5oRBW2Q2k6FjRu05q/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-military-600 hover:text-military-900 font-medium whitespace-nowrap flex items-center gap-0.5"
                    >
                      {language === "ko" ? "원본 보기 ↗" : "Original ↗"}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 font-light leading-relaxed font-normal">
                    {language === "ko"
                      ? "다원식 축 장력 자동 동조 가공 방식과 균결 친환경 점착 가판 함침 헤드를 거쳐 높은 기민성과 원형 복원 항력을 유지하는 핵심 지관 성형 고압 라인입니다."
                      : language === "tr"
                        ? "Otomatik mil dönme gergi senkronizasyonu ve homojen yapıştırıcı sürme kafaları vasıtasıyla, mukavva gövdeleri katman boşluğu olmaksızın saran ana üretim ünitesi."
                        : "High-speed automated spiral winders sync winding angles and continuous raw paper feed speed to negate wall delamination."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-2xs text-military-800 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-military-600" />
                  {language === "ko" ? "소경 10mm부터 특수 대경 맞춤 동성 대응" : "Sizing parameters from Ø 10mm up to 500mm"}
                </div>
              </div>
            </div>

            {/* Direct Image Card 3: Shipment */}
            <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left" id="gallery-ship-card">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <SafeGoogleDriveImage 
                  id="gallery-ship-img"
                  driveId="1bVQzCZ0PcuDiYnh_9K_OkRWzZ9k-Eqcq"
                  fallbackUrl="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
                  alt="Logistic Output"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-military-900/80 backdrop-blur-xs text-kraft-300 py-1 px-2.5 rounded-md text-[10px] font-mono tracking-wider font-bold">
                  SHIPMENT & LOGISTICS
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900">
                      {language === "ko" ? "완벽 검수 출하 및 전수 적재" : language === "tr" ? "Muhafazalı Sevkiyat & Paletleme" : "Zero-Defect Shipment & Loading Area"}
                    </h4>
                    <a 
                      href="https://drive.google.com/file/d/1bVQzCZ0PcuDiYnh_9K_OkRWzZ9k-Eqcq/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-military-600 hover:text-military-900 font-medium whitespace-nowrap flex items-center gap-0.5"
                    >
                      {language === "ko" ? "원본 보기 ↗" : "Original ↗"}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 font-light leading-relaxed font-normal">
                    {language === "ko"
                      ? "전 공정 오차 스코어 검수가 끝난 완성품을 방습 오링 수지 캡 완결 조립 후, 항온·항습 보호 구조의 정밀 팩 마감 처리를 완료하여 파손 없이 무결점 현장 도달 대송합니다."
                      : language === "tr"
                        ? "Boyutsal tolerans onayını geçen mamuller nem yalıtımlı sızdırmaz kapak montajından sonra, nakliye hasarlarını önleyen shrink kaplı ambalajlarla alıcılara ulaştırılır."
                        : "Fully inspected batches are capped with security seals, layered on clean pallets under thermal film wrapping, ensuring safe cross-country transits."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-2xs text-military-800 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-military-600" />
                  {language === "ko" ? "엄격 가압 가습 래핑 실무 적재 규정 준수" : "Compliance with tactical overpack shipping guidelines"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Step Manufacturing Process Story with modern layout */}
        <div className="mb-16">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-8 border-l-4 border-military-700 pl-3">
            {t.qualityPage.techHeader}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-gray-150 bg-white hover:bg-gray-50/20 hover:shadow-md transition-all space-y-4 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 py-2 px-3 text-2xl font-mono font-black text-gray-100 group-hover:text-kraft-100 transition-colors">
                    {s.num}
                  </div>
                  
                  <div className="p-3 bg-military-50 text-military-700 rounded-xl w-fit">
                    <IconComp className="w-5 h-5 animate-none" />
                  </div>
                  
                  <div className="space-y-1 font-normal">
                    <span className="block text-2xs font-mono font-bold text-gray-400 uppercase tracking-widest">{s.eng}</span>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900">{s.title}</h4>
                  </div>
                  
                  <p className="text-[11px] sm:text-xs text-gray-500 font-light leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality Management Highlights block */}
        <div className="mb-16 font-normal">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-8 border-l-4 border-military-700 pl-3">
            {t.qualityPage.systemsHeader}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((h, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gray-50/50 border border-gray-150 space-y-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-military-850">
                  <CheckCircle2 className="w-4 h-4 text-military-600 flex-shrink-0" />
                  {h.title}
                </span>
                <p className="text-[11px] sm:text-xs text-gray-600 font-light leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Facility Spec Summary Alert */}
        <div className="rounded-2xl border border-gray-150 bg-gray-50 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 font-normal">
          <div className="text-left space-y-1 max-w-xl">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">FACILITY STANDARDS</span>
            <h4 className="text-sm sm:text-base font-bold text-gray-800">
              {language === "ko" ? "정부 60년 신뢰의 수원지능 조율 설비 가동" : language === "tr" ? "60 Yıllık Güvenle Gelişmiş Üretim Parkuru" : "60 Years of Trusted Coiling Automation Machinery"}
            </h4>
            <p className="text-[11px] sm:text-xs text-gray-500 font-light leading-relaxed">
              {language === "ko"
                ? "본사는 내경 최소 10mm부터 최대 500mm에 도달하는 소경 및 초대구경 지관용 자동 성형 동력을 구비해두고 있어, 다양한 특제 조건에 알맞는 피드백 건조 설비를 고온 스팀 방식으로 실현합니다."
                : language === "tr"
                  ? "Tesisimiz, iç çapı 10mm'den başlayıp 500mm'ye kadar her boyutta masura için otomatik sarım üniteleri barındırır. Isıl işlem hatlarımız kartonu neme dayanıklı hale getirir."
                  : "We leverage state-of-the-art winding systems handling inner core diameters from Ø 10mm to 500mm. Warm steam chamber dry pipelines lock moisture content at absolute specifications."}
            </p>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-white text-gray-700 text-xs font-bold transition-all shrink-0 cursor-pointer text-center bg-white"
          >
            {language === "ko" ? "화면 상단으로 돌아가기" : language === "tr" ? "Yukarı Dön" : "Scroll to Top"}
          </button>
        </div>

      </div>
    </div>
  );
}
