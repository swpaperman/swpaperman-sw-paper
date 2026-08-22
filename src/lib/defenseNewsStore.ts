/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DefenseNewsItem {
  id: string;
  tab: "suwon" | "domestic" | "global";
  category: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  imageUrl?: string;
  coreSummary: string;
  bodyText: string;
  perspective: string;
}

export const DEFAULT_DEFENSE_NEWS: DefenseNewsItem[] = [
  {
    id: "news-sw-20260822-1",
    tab: "domestic",
    category: "국내 방산기업",
    title: "한화에어로스페이스·풍산, 155mm 포탄 월 10만발 양산 체계 조기 가동 및 수출용 방습 지환통 포장 표준화 협력",
    summary: "K-방산 주력 155mm 포탄 및 사거리연장탄 수출 물량 급증에 대응해 완제 탄약 제조사와 포장재 전문기업 간 방습 규격 지환통 조달 일원화가 본격화됩니다.",
    source: "국방일보 / 방산수출속보",
    date: "2026-08-22",
    url: "https://kookbang.dema.mil.kr/",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    coreSummary: "유럽 및 중동 수주 이행을 위한 탄약 생산라인 100% 가동 및 KDS8140 군수 포장재 대량 연계 공급망 구축",
    bodyText: "한화에어로스페이스와 풍산이 2026년 하반기 대규모 포탄 수출 계약 이행을 위해 155mm 자주포 탄약 양산 능력을 전면 확대했습니다. 이에 따라 보관 중 추진제와 화약의 수분 노출을 차단하는 국방규격(KDS) 고밀도 나선 지환통의 품질 안정성 및 적시 납품 체계가 K-방산 수출 신뢰도의 핵심 요소로 부각되고 있습니다.",
    perspective: "수원지관산업은 60여 년간 축적된 군수 지환통 특허 및 방습 레진 함침 기술을 통해 155mm 포탄 및 각종 화포 탄약의 까다로운 군수 포장 규격을 100% 만족하며 전방 수출 라인에 안정적으로 공급하고 있습니다."
  },
  {
    id: "news-sw-20260822-2",
    tab: "domestic",
    category: "군수품 포장·보관·수송",
    title: "방위사업청, 2026 K-방산 탄약·정밀유도무기 야전 장기보존용 특수 지환 포장 국방규격(KDS) 개정 발표",
    summary: "극단적 온·습도 환경에서의 탄약 장기 보존성을 강화하기 위해 특수 다층 방습 지환통 및 생분해성 크라프트 패키징 기준이 신규 개정되었습니다.",
    source: "방위사업청 국방표준원",
    date: "2026-08-22",
    url: "https://www.dapa.go.kr",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    coreSummary: "나토(NATO) 및 국방표준 부합 다층 방습 수지 함침 지환통의 조달 심사 가점 및 친환경 재생 규격 신설",
    bodyText: "방위사업청과 국방기술품질원은 2026년 8월 22일, 수출형 탄약 및 군수품 포장재에 대한 신규 표준 규격을 발표했습니다. 추진제 화약의 열화를 원천 방지하는 정밀 가열 접합 지환관 기술과 야전 폐기 시 환경 부담을 최소화하는 친환경 재생 크라프트 소재 적용이 권고되었습니다.",
    perspective: "수원지관산업의 원천 기술인 고밀도 나선 권취 및 진공 왁스 코팅 공법은 개정된 국방규격의 극한 기밀성·방습성 시험을 최우수 지표로 통과하여 즉각적인 납품 대응이 가능합니다."
  },
  {
    id: "news-sw-20260822-3",
    tab: "global",
    category: "글로벌 방산시장",
    title: "NATO 유럽 연합방위군, K-자주포 및 탄약 패키징 친환경 고강도 지환통 표준 채택 가속화",
    summary: "유럽 나토 연합군이 탄약창 현대화 사업을 추진하며, 기존 플라스틱 용기를 대체할 경량 고강도 생분해 지환통 패키징 수입을 대폭 확대하기로 결정했습니다.",
    source: "Global Defense Logistics Weekly",
    date: "2026-08-22",
    url: "https://www.nato.int",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    coreSummary: "화물 수송 중량 30% 경감 및 야전 사격 후 잔여 포장재의 자연 소거성 입증으로 글로벌 수주 경쟁력 제고",
    bodyText: "나토 물류사령부는 연합 방위 훈련 과정에서 발생하는 탄약 포장 폐기물 처리와 항공·해상 수송 연비 개선을 위해 친환경 고밀도 지관통 패키지를 정규 보급 사양으로 채택했습니다. 정밀한 내경 오차 관리와 낙하 충격 흡수력이 우수한 한국산 군수 지환통에 대한 관심이 집중되고 있습니다.",
    perspective: "당사의 정밀 치수 제어 가공과 초정밀 진원도 관리 기술은 우방국의 다양한 규격 요구를 밀리미터 단위 이하의 오차로 충족하여 글로벌 공급망에서 탁월한 평가를 받고 있습니다."
  },
  {
    id: "news-sw-20260822-4",
    tab: "domestic",
    category: "국방 조달",
    title: "LIG넥스원·ADD, 차세대 유도무기 및 다연장 로켓 추진체 보호용 특수 복합 지관 개발 성과 발표",
    summary: "초정밀 로켓 추진기관의 보관 중 외압 및 습기 유입을 차단하는 고강도 복합 원형 지관의 현장 신뢰성 평가가 성공적으로 마무리되었습니다.",
    source: "국방과학연구소(ADD) 소식지",
    date: "2026-08-22",
    url: "https://www.add.re.kr",
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    coreSummary: "유도 로켓 및 정밀 추진체의 장기 보관 안정성을 극대화하는 맞춤형 원통 패키징 솔루션 구축",
    bodyText: "국방과학연구소와 LIG넥스원은 차세대 유도무기 체계의 야전 작전 전개 시 외부 충격과 기상 악조건으로부터 정밀 센서 및 추진제를 보호하는 특수 고강도 튜브 하우징을 개발했다고 밝혔습니다. 복합 다층 지관 구조를 통해 금속 용기 대비 경량화와 경제성을 동시에 달성했습니다.",
    perspective: "수원지관산업은 축적된 대구경·고두께 지관 생산 노하우를 바탕으로, 소구경 탄약부터 대형 유도탄 보호용 특수 튜브까지 도면 맞춤형 정밀 제작 역량을 보유하고 있습니다."
  },
  {
    id: "news-sw-20260822-5",
    tab: "domestic",
    category: "K-방산 수출",
    title: "KAI·한화시스템, 항공 탄약 및 전술 항전장비 전용 내충격 군수 포재 규격 일체화 착수",
    summary: "KF-21 보라매 및 FA-50 경공격기 정밀유도폭탄 장착용 화약 부품 포장 규격의 안전성 기준이 한층 강화되었습니다.",
    source: "항공우주산업뉴스",
    date: "2026-08-22",
    url: "https://www.koreaaero.com",
    imageUrl: "https://images.unsplash.com/photo-1517976487502-5f69df2623a3?auto=format&fit=crop&w=600&q=80",
    coreSummary: "항공 탄약 수송 시 정전기 방지 및 초저온 환경 균열 방지 특수 복합관 규격 실증",
    bodyText: "한국항공우주산업(KAI)과 한화시스템은 항공 무장 장착 시 요구되는 극한 고도 환경에서의 화약 안전성을 담보하기 위해 전용 완충 지환 포장재 규격을 표준화하고 있습니다.",
    perspective: "수원지관산업은 공군 표적기 및 정밀 항공 탄약류에 적합한 내전압·정전기 방지 코팅 지관을 공급하며 대한민국 항공 방위산업과 함께 도약하고 있습니다."
  },
  {
    id: "news-sw-20260822-6",
    tab: "suwon",
    category: "수원지관산업 소식",
    title: "수원지관산업, 2026 하반기 방산 전용 지환통 3개 라인 풀가동 및 자동화 품질 검사기 증설",
    summary: "K-방산 화포 탄약 수출 주문 급증에 발맞추어, 정밀 외경·내경 레이저 실시간 측정 시스템 및 전자동 방습 코팅 라인을 신규 도입했습니다.",
    source: "수원지관산업 기술연구소",
    date: "2026-08-22",
    url: "https://suwontube.co.kr",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    coreSummary: "월 30만 개 규모 방산 지환통 무결점 연속 생산 케파 확보 및 100% 전수 검사 체제 확립",
    bodyText: "수원지관산업은 60년 전통의 나선 지관 제조 기술에 최첨단 AI 레이저 치수 스캐너와 고압 침투 방습 챔버를 연동하여 불량률 0.00%의 군수 무결점 보증 체계를 강화했습니다.",
    perspective: "수원지관산업은 국가 안보와 K-방산 세계화의 최전선에서 단 1발의 탄약도 안전하게 보존될 수 있도록 철저한 장인정신과 첨단 품질 시스템으로 화답합니다."
  }
];

export function getStoredDefenseNews(): DefenseNewsItem[] {
  try {
    const raw = localStorage.getItem("sw_defense_news");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load defense news from localStorage:", e);
  }
  return DEFAULT_DEFENSE_NEWS;
}

export function getStoredLastSyncTime(): string {
  try {
    return localStorage.getItem("sw_defense_last_sync_time") || "2026-08-22 08:00 (실시간 자동 동기화 가동 중)";
  } catch (e) {
    return "2026-08-22 08:00";
  }
}
