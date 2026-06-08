/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Suwon Paper Tube Specification & Mold Core Simulator Component
 */

import React, { useState } from "react";
import { 
  Calculator, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Database, 
  Sparkles, 
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface SimulatorViewProps {
  onTabChange: (tabId: string) => void;
  onQuotePrefill: (prodName: string, specs: string) => void;
}

interface MoldItem {
  id: number;
  diameter: number; // in mm
  inchSize?: string; // e.g. '1인치', '3인치'
  type: "small" | "medium" | "large";
  name: string; // descriptive Korean name
}

// Suwon Paper Tube's comprehensive industry-leading mold (금형 / 내경) database
const SUWON_MOLDS: MoldItem[] = [
  // 소형 (Ø 28.0 ~ Ø 47.5)
  { id: 1, diameter: 28.0, type: "small", name: "Ø 28.0 소형 와인다 정밀 보호관" },
  { id: 2, diameter: 28.3, type: "small", name: "Ø 28.3 소형 라벨 기복 코어" },
  { id: 3, diameter: 29.0, type: "small", name: "Ø 29.0 소형 권취 섬세 튜브" },
  { id: 4, diameter: 30.0, type: "small", name: "Ø 30.0 슬림 부직포 수송 코어" },
  { id: 5, diameter: 30.4, type: "small", name: "Ø 30.4 테이프 및 소형 인쇄 고정관" },
  { id: 6, diameter: 30.5, type: "small", name: "Ø 30.5 모바일 라벨 박막 필름용" },
  { id: 7, diameter: 31.4, type: "small", name: "Ø 31.4 전자 부품 패키징 코어" },
  { id: 8, diameter: 33.5, type: "small", name: "Ø 33.5 광학 기기 내부 롤" },
  { id: 9, diameter: 34.5, type: "small", name: "Ø 34.5 폼 박막 전도성 금속 롤" },
  { id: 10, diameter: 36.0, type: "small", name: "Ø 36.0 가구 보호용 내경 몰딩" },
  { id: 11, diameter: 38.8, type: "small", name: "Ø 38.8 정밀 기어박스 소형 심재" },
  { id: 12, diameter: 40.4, type: "small", name: "Ø 40.4 점착 테이프 인양 와인딩" },
  { id: 13, diameter: 42.1, type: "small", name: "Ø 42.1 모바일 완충 케이스 축" },
  { id: 14, diameter: 43.7, type: "small", name: "Ø 43.7 정밀 전도 레진 롤축" },
  { id: 15, diameter: 45.0, type: "small", name: "Ø 45.0 전극 전해액 운반 기둥관" },
  { id: 16, diameter: 46.2, type: "small", name: "Ø 46.2 광박막 압착 드라이브롤" },
  { id: 17, diameter: 47.3, type: "small", name: "Ø 47.3 고장력 특수 인쇄지 드레인" },
  { id: 18, diameter: 47.5, type: "small", name: "Ø 47.5 정밀 연사 섬유용 지참관" },

  // 중형 (Ø 48.5 ~ Ø 128.0)
  { id: 19, diameter: 48.5, type: "medium", name: "Ø 48.5 반도체 고청정 특수 포장" },
  { id: 20, diameter: 50.5, type: "medium", name: "Ø 50.5 원단 드럼 및 수공 코팅용" },
  { id: 21, diameter: 53.0, type: "medium", name: "Ø 53.0 2차전지 양/음극 박막 허브" },
  { id: 22, diameter: 54.0, type: "medium", name: "Ø 54.0 기밀 부품 수송용 중형 지통" },
  { id: 23, diameter: 54.5, type: "medium", name: "Ø 54.5 정밀 도료 배출 슬라이더" },
  { id: 24, diameter: 55.0, type: "medium", name: "Ø 55.0 절연 점착 마스킹 테이프롤" },
  { id: 25, diameter: 56.0, type: "medium", name: "Ø 56.0 정방 기어 릴 가이드관" },
  { id: 26, diameter: 58.0, type: "medium", name: "Ø 58.0 중중량 화학 원지 보호용" },
  { id: 27, diameter: 58.7, type: "medium", name: "Ø 58.7 전력 케이블 고강성 릴" },
  { id: 28, diameter: 60.5, type: "medium", name: "Ø 60.5 진공 가압 알루미늄 배리어" },
  { id: 29, diameter: 61.5, type: "medium", name: "Ø 61.5 수명 연장형 압밀 성형롤" },
  { id: 30, diameter: 62.2, type: "medium", name: "Ø 62.2 장섬유 고속 코어 와인딩" },
  { id: 31, diameter: 63.0, type: "medium", name: "Ø 63.0 고기밀 액체 보관 지관통" },
  { id: 32, diameter: 65.0, type: "medium", name: "Ø 65.0 가구용 구조 지탱 코어 축" },
  { id: 33, diameter: 65.3, type: "medium", name: "Ø 65.3 가죽 원단 감쇠 보호지관" },
  { id: 34, diameter: 66.0, type: "medium", name: "Ø 66.0 전기 부품 절연 가이드관" },
  { id: 35, diameter: 67.0, type: "medium", name: "Ø 67.0 방청 배관 수송 몰드용" },
  { id: 36, diameter: 67.3, type: "medium", name: "Ø 67.3 정밀 스핀 직조 중형 지환" },
  { id: 37, diameter: 68.2, type: "medium", name: "Ø 68.2 원형 보호 배리어 슬라이브" },
  { id: 38, diameter: 68.8, type: "medium", name: "Ø 68.8 중하중용 화물 적치 가로대" },
  { id: 39, diameter: 70.4, type: "medium", name: "Ø 70.4 부직포 장식 폼 운반롤" },
  { id: 40, diameter: 71.5, type: "medium", name: "Ø 71.5 가속 롤 권선 전선 가방" },
  { id: 41, diameter: 72.2, type: "medium", name: "Ø 72.2 군수 보관 장기 밀폐 배관" },
  { id: 42, diameter: 72.5, type: "medium", name: "Ø 72.5 수용성 수제 수조 튜브" },
  { id: 43, diameter: 73.2, type: "medium", name: "Ø 73.2 합성 가공지 압착 드럼축" },
  { id: 44, diameter: 74.2, type: "medium", name: "Ø 74.2 특수 필름 배리어 인가용" },
  { id: 45, diameter: 75.2, type: "medium", name: "Ø 75.2 모바일 회로용 얇은 원지" },
  { id: 46, diameter: 76.3, inchSize: "3인치 (76.3)", type: "medium", name: "Ø 76.3 3인치 국내 와인다 표준 규격 (수원지관 주력 보유)" },
  { id: 47, diameter: 77.0, type: "medium", name: "Ø 77.0 동축 고압선 절지 롤 코어" },
  { id: 48, diameter: 77.8, type: "medium", name: "Ø 77.8 전동 블라인드 구조 가동용" },
  { id: 49, diameter: 78.7, type: "medium", name: "Ø 78.7 산업용 일반 제지 와인딩" },
  { id: 50, diameter: 79.3, type: "medium", name: "Ø 79.3 직물 감용 표준 중경도 튜브" },
  { id: 51, diameter: 80.5, type: "medium", name: "Ø 80.5 박막 가압 접착 필름 코어" },
  { id: 52, diameter: 80.8, type: "medium", name: "Ø 80.8 철선 보호 와인더 홀" },
  { id: 53, diameter: 81.5, type: "medium", name: "Ø 81.5 정전기 방지 부품 보관용" },
  { id: 54, diameter: 82.5, type: "medium", name: "Ø 82.5 고하중 가전 전선 수송 릴" },
  { id: 55, diameter: 83.0, type: "medium", name: "Ø 83.0 도막 이송 특수 원통 코어" },
  { id: 56, diameter: 83.9, type: "medium", name: "Ø 83.9 도료 건조 순환 챔버 지관" },
  { id: 57, diameter: 85.9, type: "medium", name: "Ø 85.9 단열 하우징 보강용 심지" },
  { id: 58, diameter: 87.8, type: "medium", name: "Ø 87.8 제지 중량 와인딩 마운트" },
  { id: 59, diameter: 88.7, type: "medium", name: "Ø 88.7 건축 구조 모립형 튜브" },
  { id: 60, diameter: 89.0, type: "medium", name: "Ø 89.0 박막 동판 주조 전사 코어" },
  { id: 61, diameter: 90.6, type: "medium", name: "Ø 90.6 화학 용제 차단용 배리어" },
  { id: 62, diameter: 90.9, type: "medium", name: "Ø 90.9 고강도 권선 알루미늄 배관" },
  { id: 63, diameter: 92.2, type: "medium", name: "Ø 92.2 섬유 회전용 고스핀 가이드" },
  { id: 64, diameter: 93.0, type: "medium", name: "Ø 93.0 광폭 인쇄 고정 기어롤" },
  { id: 65, diameter: 94.0, type: "medium", name: "Ø 94.0 특종 단열 배관 기초 피브" },
  { id: 66, diameter: 95.0, type: "medium", name: "Ø 95.0 초대형 포스터 안전 보관함" },
  { id: 67, diameter: 99.8, type: "medium", name: "Ø 99.8 해상 정밀 탄약 완충 사양" },
  { id: 68, diameter: 102.1, type: "medium", name: "Ø 102.1 4인치 대역 가공지 최적화" },
  { id: 69, diameter: 102.6, type: "medium", name: "Ø 102.6 고장력 합성 섬유 실린더" },
  { id: 70, diameter: 105.0, type: "medium", name: "Ø 105.0 전술 레이더 장비 밀폐 포장" },
  { id: 71, diameter: 106.0, type: "medium", name: "Ø 106.0 고중량 직물 보호 가죽 롤" },
  { id: 72, diameter: 107.0, type: "medium", name: "Ø 107.0 양제지 도포 와인더 드럼" },
  { id: 73, diameter: 107.6, type: "medium", name: "Ø 107.6 알루미늄 연속 권사용" },
  { id: 74, diameter: 108.0, type: "medium", name: "Ø 108.0 고장력 필름 슬리터 전용" },
  { id: 75, diameter: 109.4, type: "medium", name: "Ø 109.4 고성능 정밀 유압관 보호" },
  { id: 76, diameter: 110.0, type: "medium", name: "Ø 110.0 초고장력 필름 롤 수송" },
  { id: 77, diameter: 110.3, type: "medium", name: "Ø 110.3 기밀 도료 이형 복합 심판" },
  { id: 78, diameter: 112.0, type: "medium", name: "Ø 112.0 토목 하향 지보용 캡" },
  { id: 79, diameter: 118.6, type: "medium", name: "Ø 118.6 수송용 대용 부직포 릴" },
  { id: 80, diameter: 120.0, type: "medium", name: "Ø 120.0 케이블 드럼 대경 보강관" },
  { id: 81, diameter: 121.0, type: "medium", name: "Ø 121.0 마분지 및 압축 배크" },
  { id: 82, diameter: 121.1, type: "medium", name: "Ø 121.1 산업 고기밀 기둥 원심" },
  { id: 83, diameter: 121.8, type: "medium", name: "Ø 121.8 포장 보호 고강성 강판롤" },
  { id: 84, diameter: 123.0, type: "medium", name: "Ø 123.0 배리어 코팅 정밀 차폐" },
  { id: 85, diameter: 124.4, type: "medium", name: "Ø 124.4 중량 토목 압박 하향 코어" },
  { id: 86, diameter: 128.0, type: "medium", name: "Ø 128.0 5인치 대용 원심 강성관" },

  // 대형 (Ø 130.8 ~ Ø 287.5)
  { id: 87, diameter: 130.8, type: "large", name: "Ø 130.8 대구경 부직포 수송 롤심" },
  { id: 88, diameter: 132.0, type: "large", name: "Ø 132.0 철강 코일 와인딩 지보관" },
  { id: 89, diameter: 132.8, type: "large", name: "Ø 132.8 특수 금속관 고고성능 코어" },
  { id: 90, diameter: 134.0, type: "large", name: "Ø 134.0 정밀 해상 기밀 포장용" },
  { id: 91, diameter: 135.5, type: "large", name: "Ø 135.5 토목 건축 보강 필라 기둥" },
  { id: 92, diameter: 136.6, type: "large", name: "Ø 136.6 고속 전권 와인더 중심축" },
  { id: 93, diameter: 140.6, type: "large", name: "Ø 140.6 고강성 원심 제지 포장" },
  { id: 94, diameter: 142.2, type: "large", name: "Ø 142.2 대구경 플랜지 유체 배관" },
  { id: 95, diameter: 149.3, type: "large", name: "Ø 149.3 화학 장재물 수송 드럼축" },
  { id: 96, diameter: 150.0, type: "large", name: "Ø 150.0 6인치 대형 고수명 원지통" },
  { id: 97, diameter: 150.8, type: "large", name: "Ø 150.8 대경 장재 패킹 기밀용" },
  { id: 98, diameter: 153.0, type: "large", name: "Ø 153.0 광폭 케이블용 고강 구조관" },
  { id: 100, diameter: 154.0, type: "large", name: "Ø 154.0 고강성 수송 배관 드럼통" },
  { id: 101, diameter: 158.0, type: "large", name: "Ø 158.0 정적 복함 이송 드라이버" },
  { id: 102, diameter: 164.0, type: "large", name: "Ø 164.0 알루미늄 보호 고하중판" },
  { id: 103, diameter: 164.2, type: "large", name: "Ø 164.2 수송용 특수 대구경 보호관" },
  { id: 104, diameter: 171.0, type: "large", name: "Ø 171.0 건설 인양 기초 배각 실린더" },
  { id: 105, diameter: 172.0, type: "large", name: "Ø 172.0 국방 탄약지환 격실 지보" },
  { id: 106, diameter: 181.1, type: "large", name: "Ø 181.1 해군 수송 고기밀 보호 지보" },
  { id: 107, diameter: 184.0, type: "large", name: "Ø 184.0 초대형 코일 서스펜션 드럼" },
  { id: 108, diameter: 281.0, type: "large", name: "Ø 281.0 철강 초중량 코일 마운팅 축" },
  { id: 109, diameter: 287.5, type: "large", name: "Ø 287.5 수원 최장 대경 표준 와인다 금형" }
];

export default function SimulatorView({ onTabChange, onQuotePrefill }: SimulatorViewProps) {
  const { language, t } = useLanguage();
  
  // Mode selection state: moldSearch (inventory mode) vs customEdit (arbitrary entry mode)
  const [activeTab, setActiveTab] = useState<"moldSearch" | "customEdit">("moldSearch");
  
  // Simulator input states
  const [innerDiameter, setInnerDiameter] = useState<number>(76.3); // Default to common 3 inch standard (Ø 76.3)
  const [thickness, setThickness] = useState<number>(6); // Wall thickness in T
  const [length, setLength] = useState<number>(1200); // Length in mm
  const [quantity, setQuantity] = useState<number>(1000); // Quantity
  const [treatment, setTreatment] = useState<string>("none"); // Surface treatment

  // Search states for mold database
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "small" | "medium" | "large">("all");

  const getMoldDescription = (diameter: number, type: string, inchSize?: string, defaultKoreanName?: string) => {
    if (language === "ko") {
      return defaultKoreanName || `Ø ${diameter} 표준 지관 금형`;
    } else if (language === "tr") {
      let sizeStr = type === "small" ? "Küçük Cap" : type === "medium" ? "Orta Boy" : "Büyük Kalibre";
      let desc = `Ø ${diameter} mm ${sizeStr}`;
      if (inchSize) desc += ` (${inchSize})`;
      return desc + " Haddeleme Mandreli";
    } else {
      let sizeStr = type === "small" ? "Small-Bore" : type === "medium" ? "Medium-Bore" : "Heavy Large-Bore";
      let desc = `Ø ${diameter} mm ${sizeStr}`;
      if (inchSize) desc += ` (${inchSize})`;
      return desc + " Hard-Winding Mandrel Core";
    }
  };

  // Format utility for standard output
  const outerDiameter = Number((innerDiameter + 2 * thickness).toFixed(1));
  
  // Estimate weight of Kraft Paper Core (density approx 0.95 g/cm3)
  const volumeCm3 = (Math.PI * (Math.pow(outerDiameter / 10, 2) - Math.pow(innerDiameter / 10, 2)) / 4) * (length / 10);
  const unitWeightG = volumeCm3 * 0.95; 
  const totalWeightKg = (unitWeightG * quantity) / 1000;

  // Determine standard match of mold in catalog
  const matchedMold = SUWON_MOLDS.find(
    (mold) => Math.abs(mold.diameter - innerDiameter) < 0.05
  );
  const isMoldMatching = !!matchedMold;

  // Search closest available standard mold
  const closestStandard = SUWON_MOLDS.reduce((prev, curr) => {
    return Math.abs(curr.diameter - innerDiameter) < Math.abs(prev.diameter - innerDiameter) ? curr : prev;
  });

  // Handle manual input fields with range boundaries safely
  const handleIDRawChange = (val: string) => {
    let num = Number(val);
    if (isNaN(num)) return;
    if (num < 1) num = 1;
    if (num > 1000) num = 1000; // Allow huge range for customs
    setInnerDiameter(num);
  };

  const handleThickRawChange = (val: string) => {
    let num = Number(val);
    if (isNaN(num)) return;
    if (num < 0.5) num = 0.5;
    if (num > 15) num = 15;
    setThickness(num);
  };

  const handleLenRawChange = (val: string) => {
    let num = Number(val);
    if (isNaN(num)) return;
    if (num < 10) num = 10;
    if (num > 10000) num = 10000;
    setLength(num);
  };

  const handleQtyRawChange = (val: string) => {
    let num = Number(val);
    if (isNaN(num)) return;
    if (num < 1) num = 1;
    if (num > 1000000) num = 1000000;
    setQuantity(num);
  };

  // Toggle selection on a specific standard mold badge
  const selectStandardMold = (diameter: number) => {
    setInnerDiameter(diameter);
  };

  // Switch to exactly matched closest standard mold
  const handleApplyClosestMold = () => {
    setInnerDiameter(closestStandard.diameter);
  };

  // Calculate scaling for live 3D visual render (Viewbox size: 400x270)
  const cx = 185; 
  const cy = 45;  
  
  // Outer diameter renderer scaling (restrict visually bounded between 35px and 100px rad)
  const baseOuterRad = 35 + (outerDiameter / 350) * 55; 
  const rOuter = Math.min(100, Math.max(35, baseOuterRad));
  const rInner = rOuter * (innerDiameter / outerDiameter);

  const rxOuter = rOuter;
  const ryOuter = rOuter * 0.48;
  const rxInner = rInner;
  const ryInner = rInner * 0.48;

  // Cylinder standing length scale
  const lScaled = 40 + (length / 3000) * 155;
  const cx_back = cx; 
  const cy_back = cy + Math.min(185, lScaled);

  // Structural check levels
  let structuralStatusText = t.simulatorPage.outStructuralOpt;
  let structuralStatusClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (thickness < 1.5) {
    structuralStatusText = t.simulatorPage.outStructuralLight;
    structuralStatusClass = "text-amber-700 bg-amber-50 border-amber-200";
  } else if (thickness >= 12.0) {
    structuralStatusText = t.simulatorPage.outStructuralHeavy;
    structuralStatusClass = "text-indigo-700 bg-indigo-50 border-indigo-200";
  } else if (outerDiameter / thickness > 45) {
    structuralStatusText = t.simulatorPage.outStructuralCaution;
    structuralStatusClass = "text-rose-700 bg-rose-50 border-rose-200";
  }

  // prefill email contact data
  const handleTransferToQuote = () => {
    let moldStatus = "";
    if (innerDiameter < 28.0) {
      moldStatus = language === "ko" 
        ? `Ø28 이하 소형 규격 - [별도제작 대상] (요청 ID: Ø${innerDiameter})` 
        : `Below Ø28 Small Bore - [Custom Mandrel Required]`;
    } else if (innerDiameter > 287.5) {
      moldStatus = language === "ko" 
        ? `Ø287.5 초과 대구경 규격 - [별도제작 대상] (요청 ID: Ø${innerDiameter})` 
        : `Over Ø287.5 Heavy-Gauge - [Bespoke Core Required]`;
    } else if (isMoldMatching) {
      moldStatus = language === "ko" 
        ? `보유 와인다 금형 일치 (ID: Ø${innerDiameter} 표준 와인다 금형)` 
        : `SUWON Standard Mold Exact Match Detected (Ø ${innerDiameter} mm)`;
    } else {
      moldStatus = language === "ko" 
        ? `비표준 임의 규격 (ID: Ø${innerDiameter} / 가장 유사한 보유 금형: Ø${closestStandard.diameter})` 
        : `Arbitrary Custom Bore Size (Ø ${innerDiameter} mm / closest: Ø ${closestStandard.diameter} mm)`;
    }

    const lengthStatus = length > 1800 
      ? (language === "ko" ? "별도가공 대상 (1800mm 초과)" : "Custom Oversized Length (>1800mm)") 
      : (language === "ko" ? "표준 가공 대상" : "Standard Automatic Processing Size");

    const specsString = `내경(ID): Ø${innerDiameter}mm / 외경(OD): Ø${outerDiameter}mm / 두께(T): ${thickness}T / 기장(L): ${length}mm / 가공구분: ${lengthStatus} / 제작수량: ${quantity.toLocaleString()} / 마감: ${
      treatment === "wax" ? "방수 왁스 코팅(Waxed)" : treatment === "barrier" ? "알루미늄 배리어(Al-Barrier)" : "크라프트 미코팅(Plain)"
    } / 금형판정: ${moldStatus}`;
    
    onQuotePrefill(language === "ko" ? "지관 시뮬레이터 자동 설계 견적 문의" : "Automated Cylinder Specifications Brief", specsString);
    onTabChange("contact");
  };

  // Filter mold DB based on query and tabs
  const filteredMolds = SUWON_MOLDS.filter((m) => {
    const query = searchQuery.trim().toLowerCase();
    const matchQuery = 
      m.diameter.toString().includes(query) ||
      (m.inchSize && m.inchSize.toLowerCase().includes(query)) ||
      m.name.toLowerCase().includes(query);
    const matchCat = selectedCategory === "all" || m.type === selectedCategory;
    return matchQuery && matchCat;
  });

  return (
    <div className="bg-gray-50/50 min-h-screen pt-28 pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="mb-10 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-3xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-4xl text-left">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-kraft-700 tracking-wider uppercase bg-kraft-50 border border-kraft-100 px-3 py-1 rounded-full inline-block">
              {t.simulatorPage.badge || "TECHNOLOGY MEETS PRECISION • EST. 1964"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {t.simulatorPage.title}
            </h1>
            <p className="text-gray-550 text-xs sm:text-sm font-light leading-relaxed font-normal">
              {t.simulatorPage.sub}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-150 p-4 rounded-2xl flex flex-row items-center gap-3 shrink-0">
            <div className="bg-kraft-500 p-2.5 rounded-xl text-gray-900 shadow-3xs">
              <Database className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-kraft-700">SUWON INVENTORY</span>
              <span className="text-base font-extrabold text-gray-900 font-mono">108 Standard Molds</span>
            </div>
          </div>
        </div>

        {/* Master Control Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Mold Selector & Multi Controllers (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Navigational Tabs: Search Catalog VS Direct Custom Specs */}
            <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-3xs grid grid-cols-2">
              <button
                onClick={() => {
                  setActiveTab("moldSearch");
                  setInnerDiameter(76.3);
                }}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border-0 ${
                  activeTab === "moldSearch"
                    ? "bg-kraft-500 text-gray-950 font-black shadow-xs"
                    : "text-gray-550 bg-transparent hover:bg-gray-50 hover:text-gray-905"
                }`}
              >
                <Database className="w-4 h-4" />
                {t.simulatorPage.tabSelectMold}
              </button>
              <button
                onClick={() => setActiveTab("customEdit")}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border-0 ${
                  activeTab === "customEdit"
                    ? "bg-kraft-500 text-gray-950 font-black shadow-xs"
                    : "text-gray-550 bg-transparent hover:bg-gray-50 hover:text-gray-905"
                }`}
              >
                <Settings className="w-4 h-4 animate-none" />
                {t.simulatorPage.tabDirectInput}
              </button>
            </div>

            {/* Content area: Inner Diameter Selector depending on Tabs */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-3xs space-y-6">
              
              {activeTab === "moldSearch" ? (
                // 1. ADVANCED MOLD CATALOG VIEW
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 text-left">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-kraft-600" />
                        {t.simulatorPage.listHeaderTitle}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light font-normal">
                        {t.simulatorPage.listHeaderSub}
                      </p>
                    </div>
                    
                    {/* Compact search input */}
                    <div className="relative max-w-xs w-full">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t.simulatorPage.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-gray-55 focus:bg-white focus:outline-none focus:ring-1 focus:ring-kraft-500"
                      />
                    </div>
                  </div>

                  {/* Category badging */}
                  <div className="flex flex-wrap gap-1.5 justify-start">
                    {[
                      { id: "all", label: t.simulatorPage.catAll },
                      { id: "small", label: t.simulatorPage.catSmall },
                      { id: "medium", label: t.simulatorPage.catMedium },
                      { id: "large", label: t.simulatorPage.catLarge }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? "bg-kraft-100 border-kraft-300 text-kraft-900"
                            : "bg-gray-55 border-gray-150 text-gray-500 hover:bg-gray-150"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic catalog listing */}
                  <div className="overflow-y-auto max-h-64 border border-gray-150 rounded-xl p-3 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredMolds.length > 0 ? (
                      filteredMolds.map((m) => {
                        const isCurrent = Math.abs(m.diameter - innerDiameter) < 0.05;
                        const dynamicDesc = getMoldDescription(m.diameter, m.type, m.inchSize, m.name);
                        return (
                          <button
                            key={m.id}
                            onClick={() => selectStandardMold(m.diameter)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                              isCurrent
                                ? "bg-kraft-600 border-kraft-700 text-gray-950 font-bold shadow-xs scale-[1.01]"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-2xs"
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-black font-mono">
                                  {language === "ko" ? "내경" : "ID"}: Ø {m.diameter} mm
                                </span>
                                {m.inchSize && (
                                  <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                                    isCurrent ? "bg-gray-950/20 text-gray-950" : "bg-gray-100 text-gray-550"
                                  }`}>
                                    {m.inchSize}
                                  </span>
                                )}
                              </div>
                              <p className={`text-[10px] font-normal leading-tight truncate max-w-[190px] ${
                                isCurrent ? "text-gray-950/80 font-semibold" : "text-gray-400"
                              }`}>
                                {dynamicDesc}
                              </p>
                            </div>
                            <CheckCircle2 className={`w-4.5 h-4.5 shrink-0 ${
                              isCurrent ? "text-gray-950 opacity-100" : "text-gray-250 opacity-0"
                            }`} />
                          </button>
                        );
                      })
                    ) : (
                      <div className="col-span-2 py-8 text-center text-gray-400 text-xs font-normal">
                        {language === "ko" 
                          ? "검색 조건에 맞는 규격이 존재하지 않습니다." 
                          : "No matching standard sizing found."}<br />
                        {language === "ko"
                          ? "상주 고객 엔지니어가 새로운 규격의 지관과 금형 인수를 도와드립니다."
                          : "Our engineering team will assist your custom specification alignment."}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // 2. RAW MANUAL SLIDER & TEXT INPUT SPECIFICATION
                <div className="space-y-5 text-left">
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center bg-transparent">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-kraft-600 animate-none" />
                        {language === "ko" ? "정교한 맞춤 내경 설계" : "Bespoke Internal Calibration"}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light font-normal">
                        {language === "ko" 
                          ? "원하시는 어떠한 소수점 단위 내경이라도 기입 또는 슬라이더 조절로 실시간 계산됩니다."
                          : "Enter any arbitrary decimals to render and calculate high-stiffness configurations in real-time."}
                      </p>
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-kraft-100 bg-kraft-50/20 space-y-3 font-normal">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-700">{t.simulatorPage.lblInnerDirect}</span>
                        <div className="flex items-center gap-1.5">
                          <input 
                            type="number"
                            step="0.1"
                            min="1"
                            max="800"
                            value={innerDiameter}
                            onChange={(e) => handleIDRawChange(e.target.value)}
                            className="bg-white border border-gray-300 rounded px-2 py-1 w-20 text-right font-mono font-bold text-xs text-gray-950 focus:border-kraft-500 focus:outline-none"
                          />
                          <span className="font-bold text-gray-500">Ø</span>
                        </div>
                      </div>
                      <input 
                        type="range"
                        min="10"
                        max="300"
                        step="0.5"
                        value={innerDiameter}
                        onChange={(e) => setInnerDiameter(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kraft-600"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                        <span>Min: Ø 10.0</span>
                        <span>Max: Ø 300.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slider variables common to both viewports (Thickness, Length, Quantity) */}
              <div className="space-y-5 pt-3 border-t border-gray-100 text-left font-normal">
                
                {/* 2. Wall Thickness */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700 flex items-center gap-1">
                      {t.simulatorPage.lblThickness}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="15"
                        value={thickness}
                        onChange={(e) => handleThickRawChange(e.target.value)}
                        className="bg-white border border-gray-200 rounded px-2 py-0.5 w-16 text-right font-mono font-bold text-xs text-kraft-900 focus:border-kraft-500 focus:outline-none"
                      />
                      <span className="font-bold text-gray-400">mm</span>
                    </div>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={thickness}
                    onChange={(e) => setThickness(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kraft-600"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                    <span>{language === "ko" ? "최소지관" : "Min"}: 1.0mm</span>
                    <span>{language === "ko" ? "최대두께" : "Max"}: 15.0mm</span>
                  </div>
                </div>

                {/* 3. Length */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700 flex items-center gap-1">
                      {t.simulatorPage.lblLength}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="number"
                        step="10"
                        min="10"
                        max="6000"
                        value={length}
                        onChange={(e) => handleLenRawChange(e.target.value)}
                        className="bg-white border border-gray-200 rounded px-2 py-0.5 w-20 text-right font-mono font-bold text-xs text-kraft-900 focus:border-kraft-500 focus:outline-none"
                      />
                      <span className="font-bold text-gray-400">mm</span>
                    </div>
                  </div>
                  <input 
                    type="range"
                    min="50"
                    max="3000"
                    step="10"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kraft-600"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                    <span>{language === "ko" ? "최소기장" : "Min length"}: 50mm</span>
                    {length >= 1800 ? (
                      <span className="font-bold text-rose-500 animate-pulse">
                        {language === "ko" ? "※ 1,800mm 이상: 별도가공 (비용추가)" : "※ Over 1,800mm: Custom handling fee"}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        {language === "ko" ? "※ 1,800mm 이상은 별도가공" : "※ Length > 1800mm triggers special handling"}
                      </span>
                    )}
                    <span>{language === "ko" ? "최대기공" : "Max physical limit"}: 3,000mm</span>
                  </div>
                </div>

                {/* 4. Desire Quantity */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700 flex items-center gap-1">
                      {t.simulatorPage.lblQty}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="number"
                        step="10"
                        min="10"
                        max="100000"
                        value={quantity}
                        onChange={(e) => handleQtyRawChange(e.target.value)}
                        className="bg-white border border-gray-200 rounded px-2 py-0.5 w-24 text-right font-mono font-bold text-xs text-kraft-900 focus:border-kraft-500 focus:outline-none"
                      />
                      <span className="font-bold text-gray-400">{language === "ko" ? "개" : "PCS"}</span>
                    </div>
                  </div>
                  <input 
                    type="range"
                    min="50"
                    max="10000"
                    step="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kraft-600"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                    <span>Min: 50 {language === "ko" ? "개" : "PCS"}</span>
                    <span>Max: 10,000 {language === "ko" ? "개" : "PCS"}</span>
                  </div>
                </div>

                {/* Surface Laminate Treatment Selector */}
                <div className="space-y-2.5 pt-2 text-left">
                  <span className="block text-xs font-bold text-gray-700">{t.simulatorPage.lblTreatment}</span>
                  <div className="grid grid-cols-3 gap-2.5 bg-transparent">
                    {[
                      { id: "none", label: t.simulatorPage.trtPlain, sub: "Plain Kraft Core" },
                      { id: "wax", label: t.simulatorPage.trtWax, sub: "Water Resistant" },
                      { id: "barrier", label: t.simulatorPage.trtAlu, sub: "Hermetic Moisture-Proof" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setTreatment(opt.id)}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-20 bg-transparent ${
                          treatment === opt.id
                            ? "bg-kraft-600 border-kraft-700 text-gray-950 font-bold shadow-xs scale-102"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs font-black block truncate">{opt.label}</span>
                        <span className={`text-[9px] font-mono leading-none block ${
                          treatment === opt.id ? "text-gray-950/70" : "text-gray-400"
                        }`}>
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right panel: Live 3D Vector Render & Analysis Console (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Live 3D Round paper tube SVG viewport */}
            <div className="rounded-2xl border border-gray-200 p-6 bg-military-900 text-white flex flex-col items-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 py-1 px-3 bg-military-850 border-b border-l border-military-750 text-[8px] font-mono tracking-widest text-kraft-350 rounded-bl-lg font-bold">
                REAL-TIME CORE GRAPHICS
              </div>

              <span className="text-[10px] font-mono text-kraft-350 self-start uppercase tracking-widest font-black mb-3">
                {t.simulatorPage.outHeader}
              </span>

              {/* Dynamic Isometric Round Tube (원형지통) CAD simulation with high-fidelity side indicators */}
              <div className="w-full bg-[#13231B] rounded-xl border border-military-800 shadow-inner p-3 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center relative overflow-hidden">
                
                {/* Left panel: Compact status/legend dashboard (5 columns) */}
                <div className="col-span-1 md:col-span-5 bg-military-950/85 border border-military-800 p-3.5 rounded-lg space-y-2.5 shadow-md flex flex-col justify-center h-full text-left w-full font-normal">
                  <span className="block text-[10px] font-bold text-kraft-350 border-b border-military-800/40 pb-1.5 uppercase tracking-widest font-mono leading-relaxed">
                    {language === "ko" ? "나선 성형 측정규격" : "DIMENSIONAL SPECS"}
                    <span className="block mt-0.5 text-[9px] font-medium text-kraft-400 font-sans tracking-normal">(LIVE SCALE)</span>
                  </span>
                  
                  <div className="space-y-1.5 font-normal text-xs">
                    <div className="flex justify-between items-center bg-military-900/50 px-2.5 py-1.5 rounded-md border border-military-800/30 gap-1.5 text-xs">
                      <span className="text-[9px] sm:text-[9.5px] text-gray-400 font-sans font-medium whitespace-nowrap">{t.simulatorPage.outId}</span>
                      <span className="text-2xs sm:text-xs font-bold text-white font-mono whitespace-nowrap">Ø {innerDiameter} mm</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-military-900/50 px-2.5 py-1.5 rounded-md border border-military-800/30 gap-1.5 text-xs">
                      <span className="text-[9px] sm:text-[9.5px] text-gray-400 font-sans font-medium whitespace-nowrap">{t.simulatorPage.outOd}</span>
                      <span className="text-2xs sm:text-xs font-bold text-white font-mono whitespace-nowrap">Ø {outerDiameter} mm</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-military-900/50 px-2.5 py-1.5 rounded-md border border-military-800/30 gap-1.5 text-xs">
                      <span className="text-[9px] sm:text-[9.5px] text-gray-400 font-sans font-medium whitespace-nowrap">{t.simulatorPage.outThick}</span>
                      <span className="text-2xs sm:text-xs font-bold text-kraft-350 font-mono whitespace-nowrap">{thickness} T (mm)</span>
                    </div>
                  </div>

                  {/* Dynamic cutting length alarm with reduced sizes for perfect sizing */}
                  <div className="pt-1 select-none font-normal text-xs">
                    {length >= 1800 ? (
                      <div className="text-[9px] text-rose-300 bg-rose-950/40 border border-rose-900/50 rounded-md p-2 font-bold leading-relaxed font-mono">
                        <span className="whitespace-nowrap block">⚠️ L: {length} mm ({language === "ko" ? "장척" : "Long"})</span>
                        <span className="text-[8px] font-normal text-rose-250/90 block mt-0.5 font-sans">
                          {language === "ko" ? "※ 1.8m 이상: 별도가공" : "※ Requires oversize handling"}
                        </span>
                      </div>
                    ) : (
                      <div className="text-[9px] text-emerald-300 bg-emerald-950/40 border border-emerald-900/40 rounded-md p-2 font-semibold leading-relaxed font-mono">
                        <span className="whitespace-nowrap block">✓ L: {length} mm ({language === "ko" ? "표준" : "Std"})</span>
                        <span className="text-[8px] font-light text-emerald-200/80 block mt-0.5 font-sans">
                          {language === "ko" ? "표준 자동화 양산 범위" : "Automated quantity range"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right panel: SVG representation (7 columns) */}
                <div className="col-span-1 md:col-span-7 w-full flex items-center justify-center p-0.5">
                  <svg viewBox="0 0 400 270" className="w-full h-full max-h-[260px] md:max-h-[300px]">
                    <defs>
                      <linearGradient id="cylinderSleeveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8c5f32" />
                        <stop offset="15%" stopColor="#ab7b4c" />
                        <stop offset="45%" stopColor="#d5aa7d" />
                        <stop offset="68%" stopColor="#ab7b4c" />
                        <stop offset="90%" stopColor="#8c5f32" />
                        <stop offset="100%" stopColor="#5d3b14" />
                      </linearGradient>

                      <radialGradient id="cardboardRingGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                        <stop offset="0%" stopColor="#e3caaa" />
                        <stop offset="50%" stopColor="#c29b70" />
                        <stop offset="70%" stopColor="#9e7448" />
                        <stop offset="90%" stopColor="#bfa17c" />
                        <stop offset="100%" stopColor="#7a542b" />
                      </radialGradient>

                      <radialGradient id="boreBrakerGrad" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#0a0502" />
                        <stop offset="40%" stopColor="#1e1106" />
                        <stop offset="85%" stopColor="#301b0a" />
                        <stop offset="100%" stopColor="#080401" />
                      </radialGradient>
                    </defs>

                    {/* 1. Receding back end circle */}
                    <ellipse cx={cx_back} cy={cy_back} rx={rxOuter} ry={ryOuter} fill="#7a542b" opacity="0.3" />

                    {/* 2. Solid 3D Cylinder Barrel Sleeve */}
                    <path 
                      d={`
                        M ${cx - rxOuter} ${cy} 
                        L ${cx - rxOuter} ${cy_back} 
                        A ${rxOuter} ${ryOuter} 0 0 0 ${cx + rxOuter} ${cy_back} 
                        L ${cx + rxOuter} ${cy} 
                        A ${rxOuter} ${ryOuter} 0 0 1 ${cx - rxOuter} ${cy} 
                        Z
                      `} 
                      fill="url(#cylinderSleeveGrad)" 
                      stroke="#5d3b14"
                      strokeWidth="0.8"
                    />

                    {/* 3. Spiral Wind Joint overlay lines */}
                    {Array.from({ length: 5 }).map((_, i) => {
                      const step = 32;
                      const spiralY = cy + 20 + i * step;
                      const spiralYMax = spiralY + 12;
                      if (spiralY < cy_back - 15) {
                        return (
                          <path 
                            key={i}
                            d={`M ${cx - rxOuter} ${spiralY} A ${rxOuter} ${ryOuter} 0 0 0 ${cx + rxOuter} ${Math.min(cy_back, spiralYMax)}`}
                            stroke="#70441a"
                            strokeWidth="1.2"
                            fill="none"
                            opacity="0.5"
                          />
                        );
                      }
                      return null;
                    })}

                    {/* 4. Multi-Layer Cardboard Rim */}
                    <ellipse cx={cx} cy={cy} rx={rxOuter} ry={ryOuter} fill="url(#cardboardRingGrad)" stroke="#70441a" strokeWidth="0.8" />
                    
                    {thickness > 2 && (
                      <>
                        <ellipse cx={cx} cy={cy} rx={rxInner + (rxOuter - rxInner) * 0.7} ry={ryInner + (ryOuter - ryInner) * 0.7} fill="none" stroke="#ebd1b5" strokeWidth="0.5" opacity="0.4" />
                        <ellipse cx={cx} cy={cy} rx={rxInner + (rxOuter - rxInner) * 0.4} ry={ryInner + (ryOuter - ryInner) * 0.4} fill="none" stroke="#aa794b" strokeWidth="0.5" opacity="0.5" />
                      </>
                    )}

                    {/* 5. Deep dark bore opening hollow interior */}
                    <ellipse cx={cx} cy={cy} rx={rxInner} ry={ryInner} fill="url(#boreBrakerGrad)" stroke="#4d2f10" strokeWidth="1" />

                    {/* 6. Dynamic CAD Dimension Brackets */}
                    <path 
                      d={`M ${cx + rxOuter + 8} ${cy} L ${cx + rxOuter + 22} ${cy}`} 
                      stroke="#ab7b4c" 
                      strokeWidth="0.8" 
                    />
                    <path 
                      d={`M ${cx + rxOuter + 8} ${cy_back} L ${cx + rxOuter + 22} ${cy_back}`} 
                      stroke="#ab7b4c" 
                      strokeWidth="0.8" 
                    />
                    <path 
                      d={`M ${cx + rxOuter + 15} ${cy + 4} L ${cx + rxOuter + 15} ${cy_back - 4}`} 
                      stroke="#d5aa7d" 
                      strokeWidth="0.8" 
                      markerStart="url(#arrow)" 
                      markerEnd="url(#arrow)" 
                    />
                    <text 
                      x={cx + rxOuter + 24} 
                      y={(cy + cy_back) / 2 + 3} 
                      textAnchor="start" 
                      className="text-[10px] font-mono fill-kraft-350 font-extrabold"
                    >
                      L: {length} mm
                    </text>

                    <path 
                      d={`M ${cx - rxInner} ${cy} L ${cx - rxInner - 20} ${cy}`} 
                      stroke="#d5aa7d" 
                      strokeWidth="0.8" 
                    />
                    <path 
                      d={`M ${cx + rxInner} ${cy} L ${cx + rxInner + 20} ${cy}`} 
                      stroke="#d5aa7d" 
                      strokeWidth="0.8" 
                    />
                    <line 
                      x1={cx - rxInner} 
                      y1={cy} 
                      x2={cx + rxInner} 
                      y2={cy} 
                      stroke="#d5aa7d" 
                      strokeWidth="0.8" 
                      strokeDasharray="2,2" 
                    />
                    
                    <text 
                      x={cx} 
                      y={cy + 3} 
                      textAnchor="middle" 
                      className="text-[10px] font-mono fill-yellow-450 font-bold drop-shadow-md"
                    >
                      ID: Ø {innerDiameter} mm
                    </text>
                    
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#d5aa7d" />
                      </marker>
                    </defs>
                  </svg>
                </div>

              </div>

              <div className="w-full mt-3 flex items-center justify-between text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  {language === "ko" ? "나선 교차 성형 기공식" : "Winding Sync Model"}
                </span>
                <span className="font-bold text-kraft-350">CAD Standard 1:1.55</span>
              </div>
            </div>

            {/* 2. Suwon Mold Match Advantage Alert */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isMoldMatching 
                ? "bg-emerald-50/70 border-emerald-200 text-emerald-950" 
                : "bg-amber-50/80 border-amber-200 text-amber-950"
            }`}>
              <div className="flex gap-3 items-start text-left font-normal">
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  isMoldMatching ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                }`}>
                  {isMoldMatching ? (
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  ) : (
                    <AlertTriangle className="w-4.5 h-4.5" />
                  )}
                </div>
                <div className="space-y-1.5 flex-1 font-normal text-xs">
                  <h4 className="text-sm font-bold tracking-tight">
                    {isMoldMatching 
                      ? t.simulatorPage.outMatchingTitle 
                      : t.simulatorPage.outMatchingNormal}
                  </h4>
                  <p className="text-xs font-light leading-relaxed text-gray-700">
                    {isMoldMatching ? (
                      language === "ko" ? (
                        <>
                          입력된 내경 <strong>{innerDiameter}mm</strong>는 수원지관이 이미 완벽히 보유 중인 
                          표준 금형 수치군에 해당합니다. <strong>금형 맞춤비(초도 비용) 0원 면제 혜택</strong>과 함께 
                          신속히 주문 양산 개시가 가능합니다!
                        </>
                      ) : language === "tr" ? (
                        <>
                          Girdiğiniz <strong>{innerDiameter}mm</strong> iç çapı, Suwon fabrikasında hazır bulunan mandrel kalıpları eşleşmektedir. <strong>Ekstra kalıp kurulum faturası 0 TL</strong> olarak yansıtılarak hemen imalata başlanabilir.
                        </>
                      ) : (
                        <>
                          The entered ID size of <strong>{innerDiameter} mm</strong> exactly matches our pre-loaded steel tooling catalog. <strong>Zero mandrel setup premium</strong> applies instantly to your order processing step.
                        </>
                      )
                    ) : (
                      language === "ko" ? (
                        <>
                          입력된 내경 <strong>{innerDiameter}mm</strong>는 보유 표준 외 커스텀 비표준 규격입니다. 
                          설계 생산 시 신규 가공비가 별도 부가됩니다. 아래 보유 유사 규격으로 자동 변경하시면 설계비를 즉시 차감할 수 있습니다.
                        </>
                      ) : language === "tr" ? (
                        <>
                          Girdiğiniz <strong>{innerDiameter}mm</strong> özel bir kalibre ölçüsüdür ve özel torna ayarı gerektirebilir. Aşağıdaki en yakın standart kalıba geçerek kurulum maliyetini sıfırlayabilirsiniz.
                        </>
                      ) : (
                        <>
                          The entered ID <strong>{innerDiameter} mm</strong> is a customized, non-standard thickness sizing. Tooling premium may apply. Switch to our closest standard mandrel option below to offset setup metrics completely.
                        </>
                      )
                    )}
                  </p>
                  
                  {/* Custom logic: Give switch option button if not standard match */}
                  {!isMoldMatching && (
                    <div className="pt-2">
                      <button
                        onClick={handleApplyClosestMold}
                        className="py-1.5 px-3 rounded-lg bg-amber-505 hover:bg-amber-600 text-white text-[11px] font-bold shadow-3xs hover:shadow-2xs transition-all flex items-center gap-1 text-left cursor-pointer border-0 bg-amber-500"
                      >
                        <RefreshCw className="w-3.5 h-3.5 shrink-0 animate-none" />
                        {language === "ko" 
                          ? `가장 유사한 ${closestStandard.diameter}mm 표준 금형 적용 (무공비)` 
                          : language === "tr"
                            ? `En yakın Ø ${closestStandard.diameter}mm standardına geç (Kurulum Ücretsiz)`
                            : `Apply closest standard Ø ${closestStandard.diameter}mm mandrel (Free Setup)`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Weight, raw materials and stability calculation outputs */}
            <div className="rounded-2xl border border-gray-200 p-6 bg-white space-y-4 shadow-3xs">
              <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2 text-left">
                <Calculator className="w-4 h-4 text-kraft-700" />
                {language === "ko" ? "자동 역학 설계 연산 (Calculator Engine)" : "Engineering Calculator Engine"}
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs text-left font-normal">
                <div className="space-y-1 bg-gray-50/50 border border-gray-150 rounded-xl p-3">
                  <span className="text-gray-400 text-[10px] block">{t.simulatorPage.outWeightUnit}</span>
                  <p className="font-mono font-black text-gray-950 text-sm">
                    ~ {unitWeightG.toFixed(1)} g
                  </p>
                </div>
                <div className="space-y-1 bg-gray-50/50 border border-gray-150 rounded-xl p-3">
                  <span className="text-gray-400 text-[10px] block">{t.simulatorPage.outWeightTotal}</span>
                  <p className="font-mono font-black text-gray-950 text-sm">
                    ~ {totalWeightKg.toFixed(1)} kg
                  </p>
                </div>
                
                <div className="col-span-2 space-y-1 text-left font-normal">
                  <span className="text-gray-550 text-[10px] block font-bold">{t.simulatorPage.outStructuralHeader}</span>
                  <div className={`py-2 px-3 border rounded-xl text-xs font-bold leading-tight ${structuralStatusClass}`}>
                    {structuralStatusText}
                  </div>
                </div>
              </div>

              {/* Inquiry Action Call */}
              <div className="pt-2 text-left font-normal">
                <button
                  onClick={handleTransferToQuote}
                  className="w-full py-4 rounded-xl bg-kraft-500 hover:bg-kraft-600 text-gray-950 font-black text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer border border-kraft-650"
                >
                  <Calculator className="w-4.5 h-4.5 animate-none" />
                  {t.simulatorPage.btnActionText}
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <span className="block text-[10px] text-gray-400 text-center mt-2 font-normal leading-relaxed">
                  {t.simulatorPage.btnActionSub}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
