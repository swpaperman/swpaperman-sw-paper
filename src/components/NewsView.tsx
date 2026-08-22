import React, { useState, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  TrendingUp, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  Globe, 
  Sliders, 
  X,
  PlusCircle,
  HelpCircle,
  RefreshCw,
  Cpu,
  Layers,
  Radio,
  FileSpreadsheet,
  Database,
  CheckCircle2,
  AlertCircle,
  Settings,
  Download,
  LogIn
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { trackNewsView, trackCTAClick } from "../lib/ga4";
import { 
  DEFAULT_DEFENSE_NEWS_SHEET_ID, 
  fetchDefenseNewsFromGoogleSheet, 
  googleSignIn, 
  getAccessToken 
} from "../lib/googleWorkspace";

const defensePartners = [
  {
    name: "한화에어로스페이스",
    nameTr: "Hanwha Aerospace",
    nameEn: "Hanwha Aerospace",
    badge: "K-방산 화포/탄약 체계 체계업체",
    link: "https://www.hanwhaaerospace.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1q04UKpLEFNpXhY5L49l5usZC7kzHaZX5"
  },
  {
    name: "풍산",
    nameTr: "Poongsan",
    nameEn: "Poongsan Corp",
    badge: "한국군 탄약 및 포병탄 주도공급",
    link: "https://www.poongsan.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1IBcG1Fg2fmYoP1rqV9pa6HPigwSAw4vo"
  },
  {
    name: "삼양화학공업",
    nameTr: "Samyang Chemical",
    nameEn: "Samyang Chemical",
    badge: "K-방산 특수 화학/연막탄 제조",
    link: "http://www.samyangchem.co.kr/",
    logo: "https://lh3.googleusercontent.com/d/1LiuhnDf3UFNy3gik9GlhOxUWAn1ybVhj"
  },
  {
    name: "LIG넥스원",
    nameTr: "LIG Nex1",
    nameEn: "LIG Nex1",
    badge: "해군/공군 정밀 항공유도무기 선도",
    link: "https://www.lignex1.com/",
    logo: "https://lh3.googleusercontent.com/d/1-4Y0wX-5omGAIOH_Ih5pfVtGLIwdOxUm"
  },
  {
    name: "대한민국 국방부",
    nameTr: "MND Korea",
    nameEn: "Ministry of Defense",
    badge: "국방 정책 수립 & 국방규격 통제기관",
    link: "https://www.mnd.go.kr/",
    logo: "https://lh3.googleusercontent.com/d/1TMm1GB-kYqNNI3rTaKo6yLr7wd6NDKwL"
  },
  {
    name: "방위사업청",
    nameTr: "DAPA",
    nameEn: "DAPA",
    badge: "방위력개선 및 국방 군수 조달 총괄",
    link: "https://www.dapa.go.kr/",
    logo: "https://lh3.googleusercontent.com/d/1UT5mmcEtz_gh392ncjV3jYIWIEPeBh39"
  },
  {
    name: "국방과학연구소",
    nameTr: "ADD",
    nameEn: "ADD Research",
    badge: "대한민국 국방 과학 핵심 무기 R&D",
    link: "https://www.add.re.kr/",
    logo: "https://lh3.googleusercontent.com/d/1YeEFMNVO4g_Bs1gqDJGGTifgltIHrH8H"
  },
  {
    name: "한국항공우주산업 (KAI)",
    nameTr: "KAI Corp",
    nameEn: "Korea Aerospace Industries",
    badge: "KF-21 / FA-50 / 수리온 국산 항공기 우뚝",
    link: "https://www.koreaaero.com/",
    logoIcon: "✈️"
  },
  {
    name: "한화시스템",
    nameTr: "Hanwha Systems",
    nameEn: "Hanwha Systems",
    badge: "방산 ICT, 에이사(AESA) 레이더 및 전술통신",
    link: "https://www.hanwhasystems.com/",
    logoIcon: "📡"
  },
  {
    name: "현대로뎀",
    nameTr: "Hyundai Rotem",
    nameEn: "Hyundai Rotem",
    badge: "K2 흑표 전차 및 지상 기동장비 원조",
    link: "https://www.hyundai-rotem.co.kr/",
    logoIcon: "⚙️"
  },
  {
    name: "빅텍",
    nameTr: "Victek",
    nameEn: "Victek Co.",
    badge: "방산 전자전 시스템 & 피아식별 군인프라",
    link: "https://www.victek.co.kr/",
    logoIcon: "⚡"
  },
  {
    name: "기아 군수차량",
    nameTr: "Kia Military Veh.",
    nameEn: "Kia Military Vehicles",
    badge: "한국형 소형전술차(KLTV) & 군용 트럭 명가",
    link: "https://military.kia.com",
    logoIcon: "🚚"
  }
];

interface NewsArticle {
  id: string;
  tab: "suwon" | "domestic" | "global";
  category: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  imageUrl?: string;   // 기사 대표 이미지
  coreSummary: string; // 핵심 요약
  bodyText: string;    // 본문 요약
  perspective: string; // 수원지관산업 제조 관점
}

interface NewsViewProps {
  onTabChange: (tab: string) => void;
}

export default function NewsView({ onTabChange }: NewsViewProps) {
  const { language, t } = useLanguage();

  // Basic initial articles reflecting professional real-world parameters
  const initialArticles: NewsArticle[] = [
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
      id: "news-sw-1",
      tab: "suwon",
      category: "수원지관 소식",
      title: "수원지관산업, 탄약 포장용 지환통 중심 홈페이지 개편",
      summary: "수원지관산업은 탄약 포장용 지환통 전문 제조기업으로서 제품 정보, 규격 상담, 재고판매 문의 기능을 강화한 홈페이지를 준비하고 있습니다.",
      source: "수원지관산업 공식 공지",
      date: "2026-06-08",
      url: "https://www.combat-packaging.com",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      coreSummary: "사용자 편의성을 대폭 보강하고 군수 및 산업 분야의 다변화된 요구사항에 즉시 대응할 수 있는 인터랙티브 채널 구축",
      bodyText: "60년 이상의 제조 기술을 보유한 수원지관산업은 더욱 정교하고 엄밀한 탄약지환통 및 산업용 고강도 지관 규격을 고객사 도면에 맞춰 공급하기 위해 홈페이지를 개편했습니다. 견적 양식 전송 시스템과 오차 시뮬레이터, 세금계산서 전용 특판 코너를 전면 배치했습니다.",
      perspective: "탄약 생산과 공급이 확대될수록 탄약의 보관, 수송, 취급 과정에서 포장재의 역할은 더욱 중요해집니다. 탄약 포장용 지환통은 단순 포장재가 아니라 탄약의 장기 저장성과 운송 안정성을 보완하는 기능성 보호 용기입니다."
    },
    {
      id: "news-sw-2",
      tab: "suwon",
      category: "수원지관 소식",
      title: "탄약지환통 및 일반 산업용 지관 맞춤 제작 상담 운영",
      summary: "고객 도면과 요구 규격에 따라 탄약 포장용 지환통과 일반 산업용 지관의 맞춤 제작 상담을 진행합니다.",
      source: "수원지관산업 생산본부",
      date: "2026-06-05",
      url: "https://www.combat-packaging.com",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
      coreSummary: "군용 및 산업용 정밀 지관의 기계적 물성과 내수성, 내열 요건을 만족하는 맞춤 다층 가공 대응 체계 가동",
      bodyText: "수원지관산업은 국내외 다양한 방산 가동 기업 및 제조업체들의 고유 규격 도면에 따른 소량 주문 제작부터 연속 양산 생산까지 폭넓은 유연 생산 체계를 보유하고 있으며, 정밀 구경 오차 최소화와 견고한 패키징 보존 성능을 담보합니다.",
      perspective: "정밀 절단 치수와 진원도(Roundness) 관리는 지환통 결합 시 군용 탄약의 조립 정밀도 및 현장 신속 장전에 결정적인 품질 인자입니다. 당사의 오랜 기계 가동 축적 기술이 이를 뒷받침합니다."
    },
    {
      id: "news-sw-3",
      tab: "suwon",
      category: "수원지관 소식",
      title: "재고 지관 및 샘플 제품 판매 문의 접수 안내",
      summary: "보유 중인 재고 지관, 샘플 제품, 잔여 생산품은 문의 접수 후 견적서 및 전자세금계산서 방식으로 거래가 가능합니다.",
      source: "수원지관산업 영업부",
      date: "2026-06-03",
      url: "https://www.combat-packaging.com",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
      coreSummary: "일반 소비자 카드 정산 채널을 배제하고 투명한 기업 대 기업(B2B) 세금계산서 정식 거래 방식 준수",
      bodyText: "생산 공정에서 발생하는 검수 적합 샘플 및 여분 잔여 수량에 대해 실용적인 단가 조정을 거친 특판을 항시 업데이트하고 있습니다. 모든 특판 물량은 정식 도면 사양 및 환경 요구 조건에 따라 검증된 완제품들이며 안전하고 신속한 공급 시스템을 보장합니다.",
      perspective: "합리적인 완제품 자원 순환과 신속 공급은 탄포 및 각종 지관 포장재를 긴급히 요하는 전방 사양 테스터 고객사들에게 빠르고 효과적인 납품 솔루션을 지원하는 실질 통로입니다."
    },
    {
      id: "news-sw-4",
      tab: "suwon",
      category: "수원지관 소식",
      title: "국방규격 기반 공정 품질관리 운영",
      summary: "수원지관산업은 탄약 포장용 지환통 생산 과정에서 원자재 확인, 성형, 방습 처리, 절단, 조립, 출하 검사 등 공정별 품질관리를 운영하고 있습니다.",
      source: "수원지관산업 품질보증부",
      date: "2026-05-28",
      url: "https://www.combat-packaging.com",
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      coreSummary: "다층 방습 공법 함입 및 수치 제어 커팅을 통한 영하 및 고온 조건 하 치수 규격 안정성 확보",
      bodyText: "국방규격에 부합하는 가공 성능 요건을 반영하여 외압에 견디는 복합 압축 강도를 엄격히 검수합니다. 특수 적층 수지 왁스를 지환 원지 내외면에 일정 온도 이상에서 골고루 진공 함침 시켜 군 요구사항 중 가장 밀접한 방습 계수를 완전히 준수하고 있습니다.",
      perspective: "종이 소재 원천 기술을 바탕으로 개발된 당사의 방습 처리와 정밀 절단 기술은 수분 유입에 지극히 민감한 추진제 장약의 오발 및 화약 보존 실패 가능성을 완벽히 억제합니다."
    },
    {
      id: "news-1",
      tab: "domestic",
      category: "탄약·화약류 산업",
      title: "K-방산 자주포 및 소화기 수출 호조에 따른 국내 탄약 생산라인 전면 가동 증가",
      summary: "세계적인 국방 긴장 조율과 대한민국 자주포 탄약 수출 이행 계약 증대에 따라 국내 탄약 전방위 주관 제조 인프라 공급 물량이 급증하고 있습니다.",
      source: "방산총연 보도자료",
      date: "2026-05-15",
      url: "https://kookbang.dema.mil.kr/",
      imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
      coreSummary: "폴란드 2차 이행계약 및 유럽 긴급 전술 자산 소요 대처로 인한 국산 탄약 신호탄 점화",
      bodyText: "최근 대한민국 핵심 자주포 체계의 수조원대 해외 수주를 필두로, 실포 사격 훈련과 정밀 비축 목적 of 155mm 자주포 탄약 수요가 기하급수적으로 폭증했습니다. 이로 인해 풍산 등 탄약 완제품 조립 체계업체를 둘러싼 국내 다공정 부품 공급망이 최고 가동률을 이어가고 있으며, 안전 보증과 방출 성능 통제를 위한 군수 포장재 산업 또한 대규모 증산 주기에 진입했습니다.",
      perspective: "탄약 생산과 공급이 확대될수록 탄약의 보관, 수송, 취급 과정에서 포장재의 역할은 더욱 중요해집니다. 탄약 포장용 지환통은 단순 포장재가 아니라 탄약의 장기 저장성과 야지 기동 시 가해지는 물리 충격 흡수 등 운송 안정성을 보안하는 핵심 기능성 보호 용기입니다."
    },
    {
      id: "news-2",
      tab: "global",
      category: "탄약 수요",
      title: "글로벌 155mm 포탄 규격 쇼티지 장기화 및 방습 장기 안전보관 포장 중요성 대두",
      summary: "지정학적 리스크 장기화에 따른 미·유럽 연합군의 포탄 비축량 개선 요구사항이 늘어남에 따라 극한 조건에서도 고성능을 보장하는 특수 적층 패키징 관심이 증대되고 있습니다.",
      source: "Global Defense Review",
      date: "2026-05-02",
      url: "https://www.defense.gov",
      imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
      coreSummary: "기존 일반 비축 체계의 한계를 탈피하고 보존 품질 연한을 획기적으로 연장하는 특수 패키징 가치 제고",
      bodyText: "유럽 주요 군사 당국 및 우방국 작전 사령부 통계에 따르면 155mm급 야포 포탄 수요 대비 글로벌 실질 제조 능력이 한계에 봉착했습니다. 단순 긴급 납품에 그쳤던 품질 기조에서 벗어나 극한 야지 및 원거리 다습 해상 이동 경로상의 장기 열화 방지 처리가 규제화되고 있으며 탄약 패키지 보강이 시급 과제로 지적됩니다.",
      perspective: "보관 환경의 상대습도 극단 통제는 탄약 내부 추진 화약재의 열화를 방지하는 최선책입니다. 당사가 60년 넘게 축적해온 고밀도 원지 적층 성형 기술과 레진 코팅 수분 차단 기술은 글로벌 우방군의 장기 화약 품질 연한 유지 요구규격에 최적화된 대안입니다."
    },
    {
      id: "news-3",
      tab: "domestic",
      category: "군수품 포장·보관·수송",
      title: "차세대 한국형 탄약 포장용 고강도 특수 지환통 국방 규격 성능 평가 추진",
      summary: "습기 투과 인자 방침 마련 및 다층 방습 가공 지환통의 충격 및 낙하 시 변형 억제 시험이 양호한 품질 지표를 갱신하고 있습니다.",
      source: "방위산업진흥학회 저널",
      date: "2026-04-18",
      url: "https://www.kdia.or.kr",
      imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
      coreSummary: "온·습도 극한 편차를 극복하는 다층 복합 지환 원통의 열화 억제 인장 내력 증명 완료",
      bodyText: "국가별 극한 지리 기후 변화에 대응할 수 있도록 탄약 보호용 종이 지환통관의 다층 습기 유입 차단 계수가 중요한 시험 항목으로 추가 연구 및 제안되고 있습니다. 방습 왁스 코팅 함침을 고도화하여 기상 변화 시에도 외경 변동이 최소화되는 수축 복원력이 주요 성능으로 조명받았습니다.",
      perspective: "기존의 일반 지관통 공정과 달리, 당사가 제조하는 탄약 포장용 지환통은 초미세 이음새 정밀 가열 접합 및 진공 함침 공법을 사용하여 내경 치수를 밀리미터 단위를 넘어서는 정확도로 생산합니다. 이는 극한 상황 속 포격 장비 장전 시 지장을 주지 않는 완벽한 제원 준수를 입증합니다."
    },
    {
      id: "news-4",
      tab: "global",
      category: "방산 공급망",
      title: "나토(NATO) 탄약 부품 보존망 표준 제정 : 재생 크라프트 원지 기반 군수 지환통 적용 검토",
      summary: "탄소 배출 완화 규범에 따라 군수 부문 친환경 패키징 및 운송 자원 보전성에 있어 고강도 튜브 지환통이 최선의 효율적 규격으로 제안되고 있습니다.",
      source: "NATO Logistics Division Reports",
      date: "2026-03-12",
      url: "https://www.nato.int",
      imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
      coreSummary: "플라스틱 대체 친환경 군수 부자재 확대와 단단한 적층 지환관의 비용대비 보호 하이라이트",
      bodyText: "글로벌 방위 협약국 기조 아래에서 신속 제염 처리와 저탄소 생분해 특성을 갖춘 포장 조달 체계 비중이 높아졌습니다. 고강도 친환경 크라프트 목재 펄프 가공 튜브 패키징은 소멸식 사격 후 잔여 포장재 폐기를 원활하게 해 정전 야전 편의를 극대화 시킵니다.",
      perspective: "폐기 시 친환경성이 우수한 지환 원통은 아군 보급 진지의 흔적을 최소화하는 방산 작전 전술 of 일부이기도 합니다. 이와 동시에 가벼운 중량으로 군수 화물 수송 연비를 획기적으로 개선하여 전술적 강점을 보유하게 합니다."
    }
  ];

  // Load from LocalStorage or Fallback
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem("sw_defense_news");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const cleaned = Array.isArray(parsed)
          ? parsed.map((art: any) => {
              const updated = { ...art };
              if (["제품·생산 공지", "재고판매 안내", "품질·생산 관리", "수원지관 소식"].includes(art.category) || art.id?.startsWith("news-sw-")) {
                if (art.tab !== "domestic" && art.tab !== "global") {
                  updated.category = "수원지관 소식";
                  updated.tab = "suwon";
                }
              }
              // Force-overwrite template layouts with our non-broken IDs
              const matchedTemplate = initialArticles.find((init) => init.id === updated.id);
              if (matchedTemplate) {
                updated.imageUrl = matchedTemplate.imageUrl;
              }

              // Dynamically inject default image if missing or resolving to old broken/flat pictures
              if (!updated.imageUrl || updated.imageUrl.includes("1579713591404-585a97576f3f") || updated.imageUrl.includes("1508873699372-7aeab60b44ab")) {
                if (updated.tab === "suwon") {
                  updated.imageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80";
                } else if (updated.tab === "domestic") {
                  updated.imageUrl = "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80";
                } else {
                  updated.imageUrl = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80";
                }
              }
              return updated;
            })
          : [];

        // Merge initial 2026-08-22 articles if missing in stored data
        const initial2026Ids = initialArticles.filter(a => a.date === "2026-08-22");
        const existingIds = new Set(cleaned.map((a: any) => a.id));
        const missingAugust22 = initial2026Ids.filter(a => !existingIds.has(a.id));

        const combined = [...missingAugust22, ...cleaned];

        // Perform strict duplicate ID elimination before setting state
        const seen = new Set();
        return combined.filter((art: NewsArticle) => {
          if (!art.id) return false;
          if (seen.has(art.id)) return false;
          seen.add(art.id);
          return true;
        });
      } catch (err) {
        return initialArticles;
      }
    }
    return initialArticles;
  });

  // Save to LocalStorage whenever articles change
  useEffect(() => {
    localStorage.setItem("sw_defense_news", JSON.stringify(articles));
  }, [articles]);

  // Google Sheets Synchronization States
  const [sheetId, setSheetId] = useState<string>(() => {
    return localStorage.getItem("sw_defense_sheet_id") || DEFAULT_DEFENSE_NEWS_SHEET_ID;
  });
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);
  const [sheetSyncError, setSheetSyncError] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => {
    return localStorage.getItem("sw_defense_last_sync_time") || "매일 아침 08:00 자동 동기화 활성 (최신: 2026-08-22)";
  });
  const [isSheetSettingsOpen, setIsSheetSettingsOpen] = useState(false);
  const [sheetInputVal, setSheetInputVal] = useState(sheetId);
  const [googleUserEmail, setGoogleUserEmail] = useState<string | null>(null);

  // Synchronize from Google Sheet
  const syncWithGoogleSheet = async (forceAuth = false) => {
    setIsSyncingSheet(true);
    setSheetSyncError(null);

    let token = getAccessToken();

    // If explicit auth requested or token missing when forced
    if (forceAuth && !token) {
      try {
        const signResult = await googleSignIn();
        if (signResult) {
          token = signResult.accessToken;
          if (signResult.user.email) {
            setGoogleUserEmail(signResult.user.email);
          }
        }
      } catch (authErr: any) {
        console.error("Google Auth failed during sync:", authErr);
        setSheetSyncError("구글 로그인 인증이 취소되었거나 실패했습니다.");
        setIsSyncingSheet(false);
        return;
      }
    }

    try {
      const result = await fetchDefenseNewsFromGoogleSheet(sheetId, token);
      if (result.success && result.articles.length > 0) {
        // Merge fetched sheet articles into state
        setArticles(prev => {
          const newSheetIds = new Set(result.articles.map(a => a.id));
          const newSheetTitles = new Set(result.articles.map(a => a.title.trim()));
          
          // Remove existing items that duplicate the new sheet items
          const filteredPrev = prev.filter(a => !newSheetIds.has(a.id) && !newSheetTitles.has(a.title.trim()));
          const merged = [...result.articles, ...filteredPrev];

          // Sort by date descending
          return merged.sort((a, b) => b.date.localeCompare(a.date));
        });

        const nowTimeStr = `${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
        setLastSyncTime(nowTimeStr);
        localStorage.setItem("sw_defense_last_sync_time", nowTimeStr);
        showNotification(`구글 시트(K-방산 뉴스 모니터링)에서 ${result.articles.length}건의 최신 뉴스를 성공적으로 동기화했습니다!`);
      } else {
        if (result.error) {
          setSheetSyncError(result.error);
        } else {
          showNotification("구글 시트에 신규 데이터가 없거나 이미 최신 상태입니다.");
        }
      }
    } catch (err: any) {
      console.error("Sheet sync error:", err);
      setSheetSyncError("구글 시트 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsSyncingSheet(false);
    }
  };

  // Save new Sheet ID / URL
  const handleSaveSheetId = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanId = sheetInputVal.trim();
    // Extract ID if full Google Sheets URL provided
    const urlMatch = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      cleanId = urlMatch[1];
    }

    if (!cleanId) {
      alert("올바른 Google 스프레드시트 ID 또는 URL을 입력해주세요.");
      return;
    }

    setSheetId(cleanId);
    localStorage.setItem("sw_defense_sheet_id", cleanId);
    setIsSheetSettingsOpen(false);
    showNotification("구글 시트 연동 설정이 저장되었습니다. 동기화를 진행합니다.");
    setTimeout(() => {
      syncWithGoogleSheet();
    }, 300);
  };

  // Live AI News States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSources, setAiSources] = useState<{ title: string; uri: string }[]>([]);

  const fetchLiveAiNews = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch("/api/defense-news/live", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.success && data.articles && data.articles.length > 0) {
        // Enforce uniqueness of IDs in the fetched articles to prevent duplicate key errors in React
        const sanitizedArticles = data.articles.map((art: any, index: number) => {
          // If Gemini returned articles with duplicate/non-unique/no IDs, we guarantee a unique ID
          const cleanId = art.id ? (art.id.startsWith("news-ai-") ? art.id : `news-ai-${art.id}`) : `news-ai-${index}`;
          // Add timestamp/index to avoid collisions
          return {
            ...art,
            id: `${cleanId}-${index}-${Date.now()}`
          };
        });

        setArticles(prev => {
          const liveIds = new Set(sanitizedArticles.map((art: any) => art.id));
          const filteredPrev = prev.filter(art => art.id && !liveIds.has(art.id));
          const merged = [...sanitizedArticles, ...filteredPrev];
          
          // Deduplicate by ID just in case to be 100% robust
          const seen = new Set();
          return merged.filter(art => {
            if (!art.id) return false;
            if (seen.has(art.id)) return false;
            seen.add(art.id);
            return true;
          });
        });
        
        if (data.sources) {
          setAiSources(data.sources);
        }
        showNotification("실시간 AI 기반 K-방산 최신 뉴스 분석이 완료되었습니다.");
      } else {
        setAiError(data.error || "실시간 AI 데이터를 수집할 수 없었습니다. API 서버 상태를 확인해주세요.");
      }
    } catch (err: any) {
      console.error(err);
      setAiError("실시간 AI 서버 연결에 실패했습니다. AI Studio 비밀 키가 설정되어 있는지 확인해주세요.");
    } finally {
      setAiLoading(false);
    }
  };

  // Automatically trigger AI fetch on mount if there's no live-analysis news yet
  useEffect(() => {
    const hasLiveArticles = articles.some(art => art.id?.startsWith("news-ai-"));
    if (!hasLiveArticles) {
      fetchLiveAiNews();
    }
  }, []);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabFilter, setActiveTabFilter] = useState<"all" | "suwon" | "domestic" | "global">("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Admin Mode State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Article creation/editing dialog state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  
  // Register Form Fields
  const [formTab, setFormTab] = useState<"suwon" | "domestic" | "global">("suwon");
  const [formCategory, setFormCategory] = useState("수원지관 소식");
  const [formTitle, setFormTitle] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [formSource, setFormSource] = useState("");
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formUrl, setFormUrl] = useState("https://");
  const [formImageUrl, setFormImageUrl] = useState(""); // Image field
  const [formCore, setFormCore] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formPerspective, setFormPerspective] = useState("탄약 생산과 공급이 확대될수록 탄약의 보관, 수송, 취급 과정에서 포장재의 역할은 더욱 중요해집니다. 탄약 포장용 지환통은 단순 포장재가 아니라 탄약의 장기 저장성과 운송 안정성을 보완하는 기능성 보호 용기입니다.");

  const [notification, setNotification] = useState<string | null>(null);

  // Subcategories mapping
  const subCategories = {
    suwon: [
      "수원지관 소식"
    ],
    domestic: [
      "방산 정책",
      "국방 조달",
      "국내 방산기업",
      "탄약·화약류 산업",
      "군수품 포장·보관·수송"
    ],
    global: [
      "글로벌 방산시장",
      "탄약 수요",
      "군수 물류",
      "방산 공급망",
      "해외 분쟁 및 국방 예산"
    ]
  };

  // Switch form category options automatically when formTab changes
  useEffect(() => {
    if (subCategories[formTab]) {
      setFormCategory(subCategories[formTab][0]);
    }
  }, [formTab]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem("suwon_admin_passcode") || "swpaper7638**";
    if (adminPassword === storedPass) {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      setLoginError("");
      showNotification("관리자 콘솔 모드가 활성화되었습니다.");
    } else {
      setLoginError("인증 정보가 바르지 않습니다.");
    }
  };

  const logoutAdmin = () => {
    setIsAdminMode(false);
    showNotification("안전하게 로그아웃 되었습니다.");
  };

  const openRegisterNewForm = () => {
    setEditingArticleId(null);
    setFormTab("domestic");
    setFormCategory("방산 정책");
    setFormTitle("");
    setFormSummary("");
    setFormSource("국방 공인 보고서");
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormUrl("https://");
    setFormImageUrl("");
    setFormCore("");
    setFormBody("");
    setFormPerspective("탄약 생산과 공급이 확대될수록 탄약의 보관, 수송, 취급 과정에서 포장재의 역할은 더욱 중요해집니다. 탄약 포장용 지환통은 단순 포장재가 아니라 탄약의 장기 저장성과 운송 안정성을 보완하는 기능성 보호 용기입니다.");
    setIsFormOpen(true);
  };

  const openEditForm = (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingArticleId(article.id);
    setFormTab(article.tab);
    setFormCategory(article.category);
    setFormTitle(article.title);
    setFormSummary(article.summary);
    setFormSource(article.source);
    setFormDate(article.date);
    setFormUrl(article.url);
    setFormImageUrl(article.imageUrl || "");
    setFormCore(article.coreSummary);
    setFormBody(article.bodyText);
    setFormPerspective(article.perspective);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("선택한 기사를 게시판에서 영구 삭제하시겠습니까?")) {
      const filtered = articles.filter(a => a.id !== id);
      setArticles(filtered);
      showNotification("게시물이 삭제되었습니다.");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim() || !formCore.trim() || !formBody.trim()) {
      alert("필수 항목을 모두 작성해주세요.");
      return;
    }

    const resolvedImageUrl = formImageUrl.trim() || (
      formTab === "suwon"
        ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
        : formTab === "domestic"
          ? "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80"
          : "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
    );

    if (editingArticleId) {
      // Edit mode
      const updated = articles.map(a => {
        if (a.id === editingArticleId) {
          return {
            ...a,
            tab: formTab,
            category: formCategory,
            title: formTitle,
            summary: formSummary,
            source: formSource,
            date: formDate,
            url: formUrl,
            imageUrl: resolvedImageUrl,
            coreSummary: formCore,
            bodyText: formBody,
            perspective: formPerspective
          };
        }
        return a;
      });
      setArticles(updated);
      showNotification("게시물이 수정되었습니다.");
    } else {
      // Add mode
      const newArticle: NewsArticle = {
        id: `news-${Date.now()}`,
        tab: formTab,
        category: formCategory,
        title: formTitle,
        summary: formSummary,
        source: formSource,
        date: formDate,
        url: formUrl,
        imageUrl: resolvedImageUrl,
        coreSummary: formCore,
        bodyText: formBody,
        perspective: formPerspective
      };
      setArticles([newArticle, ...articles]);
      showNotification("신규 K-방산 동향이 등록되었습니다.");
    }
    setIsFormOpen(false);
  };

  // Reset Articles to default
  const resetToDefault = () => {
    if (window.confirm("초기 데이터로 다시 복구하시겠습니까?")) {
      setArticles(initialArticles);
      showNotification("기본 데이터로 리셋되었습니다.");
    }
  };

  // Simulate RSS / AI Summary Integration
  const simulateAPIImport = () => {
    const mockFeed = [
      {
        id: `news-sim-${Date.now()}`,
        tab: "domestic" as const,
        category: "국방 조달",
        title: "[API 수신] 2026-2030 방위사업청 주요 탄약 조달 예산안 발표 분석",
        summary: "방위사업청의 5개년 추가 군사 부품 및 탄약 보존 자재 통합 조달 예산 방향성이 승인되었습니다.",
        source: "방위사업청 공고 요약봇",
        date: new Date().toISOString().split('T')[0],
        url: "https://www.dapa.go.kr",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        coreSummary: "신속 전술 재배치용 방습 규격 지환통 등 국내 수급 국방포장 예산 최적 배정",
        bodyText: "이번 전술 장기 화약 안정화 계획의 일환으로 극한 보존 포장재 조달 단가가 현실화되어, 습기에 극도로 강한 특수 레진 코팅 종관 보급 예산이 정식 편입될 예정입니다. 지환 적층 가공 업체의 기술 변별력이 더욱 강조됩니다.",
        perspective: "군용 전술 지환통의 신뢰성 가치가 정식 승인되어 가고 있음을 보여주는 변화입니다. 수원지관산업은 60년이 넘는 오랜 축적 제조 가공 지표를 기반으로, 어떤 국방 조달 입찰 및 규격 세분화 요구사항 사항에도 안전 규격을 만족할 수 있는 만반의 준비를 유지합니다."
      }
    ];

    setArticles([mockFeed[0], ...articles]);
    showNotification("RSS API & AI 요약봇 모듈 시뮬레이션: 1건 수신 성공!");
  };
  const filteredArticles = articles.filter(art => {
    // 1. Tab filter
    if (activeTabFilter !== "all" && art.tab !== activeTabFilter) return false;
    
    // 2. Sub Category filter
    if (selectedSubCategory !== "all" && art.category !== selectedSubCategory) return false;

    // 3. Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSummary = art.summary.toLowerCase().includes(q);
      const matchBody = art.bodyText.toLowerCase().includes(q);
      const matchCategory = art.category.toLowerCase().includes(q);
      const matchPerspective = art.perspective.toLowerCase().includes(q);
      return matchTitle || matchSummary || matchBody || matchCategory || matchPerspective;
    }

    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 font-sans relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-military-900 border border-kraft-500/30 text-white min-w-[320px] max-w-md py-3 px-5 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-kraft-400 shrink-0 animate-pulse" />
            <span className="text-xs font-semibold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative bg-military-900 overflow-hidden py-14 sm:py-16 text-white border-b border-military-850">
        <div className="absolute inset-0 tech-grid-dark opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-military-700/10 blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 py-0.5 px-3 rounded-full bg-kraft-500/10 border border-kraft-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-kraft-400" />
                <span className="text-[11px] font-mono font-bold text-kraft-300 uppercase tracking-widest leading-none">
                  INTELLIGENCE BULLETIN
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {language === "ko" && "K-방산 뉴스 & 동향"}
                {language === "en" && "K-Defense News & Trends"}
                {language === "tr" && "Milli Savunma Dünyası"}
              </h1>
              <p className="text-gray-350 text-sm sm:text-base leading-relaxed max-w-[800px] font-light">
                {language === "ko" && (
                  <>
                    국내외 방산 산업의 주요 흐름과 군수품 포장 시장의 변화를 정리하는 수원지관산업의 산업 뉴스 페이지입니다.
                    탄약 포장용 지환통 전문 제조기업으로서, K-방산 산업의 변화, 탄약 수요, 군수품 보관·수송·포장 기술의 흐름을 
                    지속적으로 관찰하고 실질 동향에 대응합니다.
                  </>
                )}
                {language === "en" && (
                  <>
                    Suwon Paper Cone & Tube summarizes major shifts in military logistics, domestic K-Defense, and ammunition packaging fields. 
                    As specialized engineers in shell canisters, we constantly track technological developments to satisfy multi-nation standard tests.
                  </>
                )}
                {language === "tr" && (
                  <>
                    Karton mühimmat muhafaza kutularında lider üretici olan Suwon Paper olarak, küresel askeri lojistik standartlarını 및 mühimmat ambalaj 
                    pazarı değişimlerini sektörel analiz sayfamızda takipçilerimizle paylaşıyoruz.
                  </>
                )}
              </p>
            </div>

            {/* Admin toggle console box & Google Sheets Live Automation (Admin Only) */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              {isAdminMode ? (
                <>
                  {/* Google Sheets Sync Card (Visible to Admin Only) */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-military-920 via-military-900 to-gray-950 border border-kraft-500/40 shadow-lg flex flex-col justify-between gap-3 min-w-[300px] max-w-sm text-left">
                    <div className="flex items-center justify-between gap-2 border-b border-military-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-kraft-400" />
                        <div>
                          <span className="text-xs font-bold text-white block">K-방산 뉴스 시트 자동화</span>
                          <span className="text-[9.5px] font-mono text-gray-400">매일 아침 08:00 자동 모니터링</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9.5px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        관리자 제어
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-gray-300">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                        <span>최근 동기화:</span>
                        <span className="text-kraft-350 truncate max-w-[170px]">{lastSyncTime}</span>
                      </div>
                      {sheetSyncError && (
                        <div className="p-1.5 bg-red-950/60 border border-red-800/60 rounded text-[10px] text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span className="truncate">{sheetSyncError}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 pt-1">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => syncWithGoogleSheet(false)}
                          disabled={isSyncingSheet}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-kraft-500 hover:bg-kraft-450 text-gray-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheet ? "animate-spin" : ""}`} />
                          <span>{isSyncingSheet ? "시트 동기화 중..." : "시트 실시간 동기화"}</span>
                        </button>
                        <button
                          onClick={() => setIsSheetSettingsOpen(true)}
                          className="p-1.5 rounded-lg bg-military-850 hover:bg-military-800 text-gray-300 text-xs border border-military-750 transition-colors cursor-pointer"
                          title="구글 시트 ID 설정"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-military-800/60 text-[10px]">
                        <a
                          href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-kraft-350 transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" /> 원본 구글시트 열기
                        </a>
                        <button
                          onClick={() => syncWithGoogleSheet(true)}
                          className="text-kraft-350 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <LogIn className="w-2.5 h-2.5" /> Google 로그인 동기화
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Admin Management Console (Logged In) */}
                  <div className="p-4 rounded-xl bg-military-920 border border-military-800 shadow-inner flex flex-col justify-between gap-2 min-w-[220px] text-left">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Unlock className="w-4 h-4 text-kraft-400" />
                          <span className="text-xs font-bold text-gray-300">관리자 콘솔</span>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-kraft-500 animate-ping" />
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        <div className="text-[10.5px] text-kraft-350 font-normal leading-tight">관리자 권한 인증됨</div>
                        <div className="flex gap-2">
                          <button 
                            onClick={openRegisterNewForm}
                            className="flex-1 py-1 px-2.5 rounded bg-kraft-500 text-gray-950 text-xs font-black hover:bg-kraft-600 transition-all cursor-pointer text-center"
                          >
                            뉴스 수기 등록
                          </button>
                          <button 
                            onClick={logoutAdmin}
                            className="py-1 px-2.5 rounded bg-military-800 text-gray-300 text-xs font-medium hover:bg-military-700 transition-all cursor-pointer"
                          >
                            로그아웃
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Developer RSS Simulator shortcut buttons */}
                    <div className="mt-1 border-t border-military-800 pt-2 flex flex-col gap-1 font-sans">
                      <button 
                        onClick={simulateAPIImport}
                        className="w-full py-1 text-center bg-military-850 hover:bg-military-800 text-[10px] font-mono font-bold text-kraft-300 rounded border border-military-750/50 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-kraft-400" /> RSS / AI 요약 시뮬레이터
                      </button>
                      {articles.length !== initialArticles.length && (
                        <button 
                          onClick={resetToDefault}
                          className="w-full text-center text-[9.5px] text-gray-400 hover:text-gray-300 border border-dashed border-military-800 py-0.5 rounded cursor-pointer"
                        >
                          품질 데이터 초기화 복구
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* Admin Login Prompt (When Not Logged In) */
                <div className="p-4 rounded-xl bg-military-920 border border-military-800 shadow-inner flex flex-col justify-between gap-2 min-w-[260px] max-w-sm text-left">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-bold text-gray-300">관리자 전용 콘솔</span>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-gray-600" />
                    </div>

                    <div className="space-y-2 mt-2">
                      <p className="text-[10.5px] text-gray-400 leading-snug">
                        구글 시트 실시간 동기화, 원본 시트 관리 및 뉴스 편집은 관리자 로그인 후 가능합니다.
                      </p>

                      {showAdminLogin ? (
                        <form onSubmit={handleAdminAccess} className="space-y-2 pt-1">
                          <input 
                            type="password" 
                            placeholder="관리자 암호 입력" 
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="w-full text-xs py-1.5 px-2.5 rounded bg-military-950 border border-military-700 text-white placeholder-gray-500 focus:outline-none focus:border-kraft-500"
                            autoFocus
                          />
                          {loginError && <p className="text-[9.5px] text-red-400 font-medium">{loginError}</p>}
                          <div className="flex gap-1.5 justify-end">
                            <button 
                              type="button"
                              onClick={() => setShowAdminLogin(false)}
                              className="py-1 px-2 text-[10.5px] hover:text-white text-gray-400"
                            >
                              취소
                            </button>
                            <button 
                              type="submit"
                              className="py-1 px-3 rounded bg-kraft-500 text-gray-950 text-xs font-bold hover:bg-kraft-450 transition-colors"
                            >
                              확인
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="pt-1">
                          <button 
                            onClick={() => setShowAdminLogin(true)}
                            className="w-full py-2 px-3 rounded-lg bg-military-800 hover:bg-military-750 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-military-700/80 shadow-xs"
                          >
                            <Lock className="w-3.5 h-3.5 text-kraft-400" /> 관리자 로그인
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* K-방산 전략 협력 네트워크 (K-Defense Strategic Network Slider) */}
      <section className="bg-gray-950 text-white py-8 border-b border-gray-900 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[35vw] h-[100px] rounded-full bg-kraft-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[100px] rounded-full bg-military-500/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500/90 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-kraft-350 font-bold uppercase">
              K-Defense Strategic Partnership Network
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-3 bg-black/40 border-y border-gray-900/60 animate-marquee-paused animate-marquee-active">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-4 flex shrink-0">
            {[...defensePartners, ...defensePartners, ...defensePartners].map((partner, idx) => {
              const displayName = language === "ko" ? partner.name : language === "tr" ? partner.nameTr : partner.nameEn;
              return (
                <a
                  key={idx}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-56 sm:w-64 bg-gradient-to-br from-military-900 via-gray-950 to-black hover:from-military-850 hover:to-military-950 border border-military-800/80 hover:border-kraft-500/80 rounded-xl p-3 flex flex-col justify-between transition-all duration-300 shadow-lg text-left select-none relative group cursor-pointer hover:-translate-y-0.5 shrink-0"
                >
                  <div className="flex items-center gap-2.5">
                    {partner.logo ? (
                      <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-military-700/30 overflow-hidden font-sans">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-military-850 flex items-center justify-center shrink-0 border border-military-700/40 text-sm shadow-inner font-sans">
                        {partner.logoIcon}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <span className="block text-[11px] font-black text-white group-hover:text-kraft-350 transition-colors leading-tight truncate">
                        {displayName}
                      </span>
                      <span className="block text-[9px] text-gray-400 mt-0.5 font-light truncate">
                        {partner.badge}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="bg-white border-b border-gray-200 py-5 sticky top-[56px] sm:top-[68px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Primary Tab filters (All / Suwon / Domestic / Global) */}
            <div className="flex flex-wrap items-center p-1 bg-gray-100 rounded-xl w-fit shrink-0 gap-1 sm:gap-0">
              <button
                onClick={() => {
                  setActiveTabFilter("all");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeTabFilter === "all"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ko" ? "전체 보기" : "Show All"}
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter("suwon");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === "suwon"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-kraft-500 animate-pulse" />
                {language === "ko" ? "수원지관 소식" : "Suwon Paper News"}
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter("domestic");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === "domestic"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {language === "ko" ? "국내 K-방산" : "Domestic K-Defense"}
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter("global");
                  setSelectedSubCategory("all");
                }}
                className={`py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === "global"
                    ? "bg-military-800 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-orange-500 animate-spin-slow" />
                {language === "ko" ? "해외 방산 동향" : "Global Defense Trends"}
              </button>
            </div>

            {/* Keyword Search input */}
            <div className="flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ko"
                    ? "방산, 탄약, 군수품 포장, 보관 수색..."
                    : "Search military keywords..."
                }
                className="w-full bg-gray-50 border border-gray-300 focus:border-military-600 text-sm py-2 px-10 rounded-xl focus:outline-none transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Subcategory selectors driven by current tab */}
          {(activeTabFilter === "suwon" || activeTabFilter === "domestic" || activeTabFilter === "global") && (
            <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Sliders className="w-3 h-3" /> 세부 카테고리:
              </span>
              <button
                onClick={() => setSelectedSubCategory("all")}
                className={`py-1 px-3 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  selectedSubCategory === "all"
                    ? "bg-military-50 text-military-800 border-military-300 font-extrabold"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                전체
              </button>
              {subCategories[activeTabFilter].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSubCategory(cat)}
                  className={`py-1 px-3 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    selectedSubCategory === cat
                      ? "bg-military-50 text-military-800 border-military-300 font-extrabold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. NEWS GRID & LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-xs flex flex-col justify-center items-center max-w-xl mx-auto space-y-4">
            <HelpCircle className="w-12 h-12 text-gray-400" />
            <h3 className="text-lg font-bold text-gray-800">검색 필터 결과가 존재하지 않습니다</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed max-w-sm">
              인텔리전스 DB에 등록된 뉴스가 없거나 매칭 키워드가 부합하지 않습니다. 검색어를 간소화하거나 상단 헤더 관리자 시뮬레이터를 이용하여 기사를 추가해보세요.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTabFilter("all");
                setSelectedSubCategory("all");
              }}
              className="py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-all border-0 cursor-pointer"
            >
              전체 필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => {
                const isDomestic = article.tab === "domestic";
                
                return (
                  <motion.div
                    key={article.id}
                    layoutId={article.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onClick={() => {
                      setSelectedArticle(article);
                      trackNewsView(article.title, article.category, language);
                      trackCTAClick("뉴스 상세 브리핑 읽기", "news_list_card", "/news", language);
                    }}
                    className="bg-white rounded-2xl border border-gray-200/80 hover:border-kraft-500/55 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left relative overflow-hidden h-full"
                  >
                    {/* Cover Image inside Card */}
                    {article.imageUrl && (
                      <div className="h-48 w-full overflow-hidden relative bg-gray-150 shrink-0">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle dark overlay for premium defense styling */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Interactive floating relative-time tag */}
                        <span className="absolute bottom-3 right-3 bg-military-900/85 backdrop-blur-xs text-[9px] text-kraft-350 font-mono py-1 px-2.5 rounded-full border border-kraft-500/10 uppercase tracking-widest flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-kraft-400 animate-pulse" />
                          LIVE FEED
                        </span>
                      </div>
                    )}

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      {/* Visual accents for selected tabs (now inside content area for cleaner alignment) */}
                      <div className="space-y-4 relative">
                        <div className={`absolute -left-6 top-1.5 w-1 h-6 rounded-r ${
                          isDomestic ? "bg-blue-500" : "bg-orange-500"
                        }`} />

                        {/* Meta header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold px-2 px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            isDomestic 
                              ? "bg-blue-50 text-blue-700 border border-blue-100" 
                              : "bg-orange-50 text-orange-700 border border-orange-100"
                          }`}>
                            {article.category}
                          </span>
                          
                          <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {article.date}
                            </span>
                            <span>•</span>
                            <span>{article.source}</span>
                          </div>
                        </div>

                        {/* Title & Summary */}
                        <div className="space-y-2">
                          <h3 className="text-base sm:text-[17px] font-black leading-snug text-gray-900 group-hover:text-military-800 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
                            {article.summary}
                          </p>
                        </div>

                        {/* 수원지관산업 요약 브리프 시선 표시 */}
                        <div className="bg-military-50/50 p-3 rounded-lg border border-military-100 mt-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-military-800 uppercase tracking-wider mb-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-kraft-600 animate-pulse" />
                            <span>수원 제조 관점 핵심</span>
                          </div>
                          <p className="text-[11.5px] text-gray-600 leading-relaxed font-medium line-clamp-2 italic">
                            "{article.perspective}"
                          </p>
                        </div>
                      </div>

                      {/* Bottom Action Section */}
                      <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-gray-150 relative">
                        <div className="flex items-center gap-2">
                          {isAdminMode && (
                            <div className="flex gap-1.5">
                              <button
                                onClick={(e) => openEditForm(article, e)}
                                className="p-1 px-2 text-[10.5px] rounded bg-gray-100 hover:bg-gray-200 hover:text-military-800 text-gray-600 font-bold border-0 cursor-pointer flex items-center gap-1"
                                title="기사 수정"
                              >
                                <Edit className="w-3 h-3" /> 수정
                              </button>
                              <button
                                onClick={(e) => handleDelete(article.id, e)}
                                className="p-1 px-2 text-[10.5px] rounded bg-red-50 hover:bg-red-100 text-red-600 font-bold border-0 cursor-pointer flex items-center gap-1"
                                title="기사 삭제"
                              >
                                <Trash2 className="w-3 h-3" /> 삭제
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 font-bold text-xs text-military-800 group-hover:text-kraft-600 transition-colors">
                          <span>상세 브리핑 읽기</span>
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 4. DETAILS MODAL (Populates all sub-items clearly) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-military-900/80 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-gray-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 border border-military-800/10"
            >
              {/* Header Visual Stripe */}
              <div className={`h-2.5 w-full ${
                selectedArticle.tab === "domestic" ? "bg-blue-500" : "bg-orange-500"
              }`} />

              <div className="p-6 sm:p-8 space-y-6 text-left">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border-0"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Subcategory, Source, Date heading block */}
                <div className="flex flex-wrap items-center gap-3.5 border-b border-gray-100 pb-4">
                  <span className={`text-[10.5px] font-extrabold px-3 py-0.5 rounded-md uppercase tracking-wider ${
                    selectedArticle.tab === "domestic" 
                      ? "bg-blue-50 text-blue-700 border border-blue-150" 
                      : "bg-orange-50 text-orange-700 border border-orange-150"
                  }`}>
                    {selectedArticle.category}
                  </span>

                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}
                  </span>

                  <span className="text-xs text-gray-400 font-semibold">• {selectedArticle.source}</span>
                  
                  {selectedArticle.url && (
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-kraft-600 hover:text-kraft-700 hover:underline inline-flex items-center gap-1 font-bold ml-auto"
                    >
                      <span>원문 원본 링크</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-snug">
                  {selectedArticle.title}
                </h2>

                {/* Article Cover Image in Modal */}
                {selectedArticle.imageUrl && (
                  <div className="w-full h-64 sm:h-80 overflow-hidden rounded-2xl relative shadow-md bg-gray-100">
                    <img 
                      src={selectedArticle.imageUrl} 
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle info label overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-4 left-4 text-xs font-mono text-white flex items-center gap-1.5 backdrop-blur-xs bg-black/35 px-3 py-1 rounded-md border border-white/10">
                      <FileText className="w-3.5 h-3.5 text-kraft-300" />
                      IMAGE SOURCE: INTEL_DYNAMICS
                    </span>
                  </div>
                )}

                {/* 핵심 요약 (Core Summary) Bullet box */}
                <div className="bg-kraft-50/40 border border-kraft-500/20 p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-black text-kraft-800 uppercase tracking-widest mb-1.5">
                    <TrendingUp className="w-4 h-4 text-kraft-600" />
                    <span>핵심 인텔리전스 요약</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-850 leading-relaxed">
                    "{selectedArticle.coreSummary}"
                  </p>
                </div>

                {/* 본문 요약 (Body Summary) */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> 동향 분석 보고서 요약
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-light">
                    {selectedArticle.bodyText}
                  </p>
                </div>

                {/* 수원지관산업 제조 관점 (Suwon Packaging Perspective) - HIGHLY HIGHLIGHTED */}
                <div className="bg-military-920 p-5 rounded-2xl text-white relative overflow-hidden shadow-inner border border-military-800">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-kraft-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 text-xs font-black text-kraft-300 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
                    <Sparkles className="w-4 h-4 text-kraft-400 animate-pulse" />
                    <span>수원지관산업 제조·공학적 관점 코멘트</span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-250 leading-relaxed font-normal italic">
                    "{selectedArticle.perspective}"
                  </p>
                </div>

                {/* Related Action buttons matching product navigation */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider sm:mr-auto">
                    관련 규격 연계 대응 서비스
                  </span>

                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      // Go directly to the products ammunition tab
                      onTabChange("ammunition");
                    }}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-military-800 text-white hover:bg-military-900 transition-all text-xs font-bold cursor-pointer transition-all border-0 shadow-sm"
                  >
                    탄약지환통 사양 보기
                  </button>

                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      onTabChange("contact");
                    }}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-kraft-500 text-gray-950 hover:bg-kraft-600 text-xs font-black cursor-pointer transition-all border-0 shadow-sm"
                  >
                    맞춤 규격 상담하기
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. ADMIN MANAGE FORM (Registration of custom contents) */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-military-900/85 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-y-auto max-h-[85vh] shadow-2xl relative z-10 border border-gray-100"
            >
              <div className="p-6 sm:p-8 space-y-5 text-left">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border-0"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-kraft-500" />
                  <h3 className="text-lg font-black text-military-900">
                    {editingArticleId ? "K-방산 기사내역 수동 수정" : "K-방산 뉴스 신규 수동 등록"}
                  </h3>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Tab Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">대분류 (탭 구분) *</label>
                      <div className="flex rounded-lg bg-gray-100 p-0.5 border border-gray-200">
                        <button
                          type="button"
                          onClick={() => setFormTab("suwon")}
                          className={`flex-1 text-center py-2 text-[10.5px] font-bold rounded-md cursor-pointer ${
                            formTab === "suwon" ? "bg-white text-military-850 shadow-sm" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          수원 소식
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormTab("domestic")}
                          className={`flex-1 text-center py-2 text-[10.5px] font-bold rounded-md cursor-pointer ${
                            formTab === "domestic" ? "bg-white text-military-850 shadow-sm" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          국내 방산
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormTab("global")}
                          className={`flex-1 text-center py-2 text-[10.5px] font-bold rounded-md cursor-pointer ${
                            formTab === "global" ? "bg-white text-military-850 shadow-sm" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          해외 동향
                        </button>
                      </div>
                    </div>

                    {/* Sub Category */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">세부 사양 카테고리 *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-military-600"
                      >
                        {subCategories[formTab]?.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">뉴스 제목 *</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="K-방산 글로벌 수요 급증 및 지환통 연계 검증 완료..."
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                      required
                    />
                  </div>

                  {/* Top-level Summary and Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">기사 출처 *</label>
                      <input
                        type="text"
                        value={formSource}
                        onChange={(e) => setFormSource(e.target.value)}
                        placeholder="예: 국방일보, 예비군 포럼"
                        className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">기록 일자 *</label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Custom link URL */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">원문 링크 주소 *</label>
                    <input
                      type="url"
                      value={formUrl}
                      onChange={(e) => setFormUrl(e.target.value)}
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                    />
                  </div>

                  {/* Representative Image URL field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">기사 대표 이미지 URL (선택)</label>
                      <span className="text-[10px] text-gray-400 font-light">비워두면 각 대분류별 공장/군수 템플릿 실시간 자동 지정</span>
                    </div>
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... (또는 아래의 권장 고해상도 프리셋 클릭)"
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600 mb-2"
                    />
                    
                    {/* Visual suggestion buttons for high quality imagery */}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <button
                        type="button"
                        onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80")}
                        className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-gray-50 text-gray-600 hover:text-kraft-700 cursor-pointer"
                      >
                        🏭 정밀제조 공공라인
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80")}
                        className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-gray-50 text-gray-600 hover:text-kraft-700 cursor-pointer"
                      >
                        💂 군수 전략자산
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80")}
                        className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-gray-50 text-gray-650 text-gray-600 hover:text-kraft-700 cursor-pointer"
                      >
                        📦 원격 화물 물류관
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormImageUrl("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80")}
                        className="text-[10px] py-1 px-2 border border-gray-200 hover:border-kraft-400 rounded-md bg-gray-50 text-gray-650 text-gray-600 hover:text-kraft-700 cursor-pointer"
                      >
                        🌲 친환경 재생펄프관
                      </button>
                    </div>
                  </div>

                  {/* Short Summary text */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">카드 노출 요약 (3줄 이내) *</label>
                    <textarea
                      value={formSummary}
                      onChange={(e) => setFormSummary(e.target.value)}
                      placeholder="카드의 본문 미리보기 구절을 적어주세요."
                      rows={2}
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                      required
                    />
                  </div>

                  {/* Core summary bullet */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">핵심 인텔리전스 요약 *</label>
                    <input
                      type="text"
                      value={formCore}
                      onChange={(e) => setFormCore(e.target.value)}
                      placeholder="보고서의 핵심 가치 요점을 한 문장으로 압축 요약"
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                      required
                    />
                  </div>

                  {/* Body analysis description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">상세 분석 설명 본문 *</label>
                    <textarea
                      value={formBody}
                      onChange={(e) => setFormBody(e.target.value)}
                      placeholder="상세 팝업창에서 보여질 풍부한 동향 보고서 요약 텍스트를 작성해주세요."
                      rows={4}
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-600"
                      required
                    />
                  </div>

                  {/* Perspective comment */}
                  <div className="bg-military-50 p-4 rounded-xl border border-military-200">
                    <label className="block text-xs font-bold text-military-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-kraft-600" />
                      수원지관산업 제조·공학적 관점 코멘트 (강조 영역) *
                    </label>
                    <textarea
                      value={formPerspective}
                      onChange={(e) => setFormPerspective(e.target.value)}
                      placeholder="제품의 탄약 안정성 확보, 방습력 등 제조사의 공학 관점을 덧붙여 기업 신뢰감을 도출하세요."
                      rows={2.5}
                      className="w-full text-xs py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-military-500 bg-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all border-0 cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-kraft-500 hover:bg-kraft-600 text-gray-950 text-xs font-black transition-all border-0 cursor-pointer shadow-md"
                    >
                      {editingArticleId ? "변경사항 저장" : "새 기사 정식 발행"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Sheet Settings Modal */}
      <AnimatePresence>
        {isSheetSettingsOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetSettingsOpen(false)}
              className="fixed inset-0 bg-military-900/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-gray-800 rounded-3xl w-full max-w-lg shadow-2xl relative z-10 border border-military-800/10 overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-kraft-500 via-military-700 to-kraft-400" />
              <div className="p-6 sm:p-7 text-left space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-kraft-600" />
                    <h3 className="text-lg font-black text-gray-900">구글 시트 뉴스 연동 설정</h3>
                  </div>
                  <button
                    onClick={() => setIsSheetSettingsOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  제미나이 스파크 또는 Google Sheets 매크로/앱스스크립트로 매일 아침 8시 자동 업데이트되는 K-방산 뉴스 모니터링 시트 주소를 연동합니다.
                </p>

                <form onSubmit={handleSaveSheetId} className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      구글 스프레드시트 URL 또는 ID
                    </label>
                    <input
                      type="text"
                      value={sheetInputVal}
                      onChange={(e) => setSheetInputVal(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                      className="w-full text-xs py-2.5 px-3 rounded-xl border border-gray-300 font-mono text-gray-800 focus:outline-none focus:border-kraft-500 focus:ring-1 focus:ring-kraft-500"
                      required
                    />
                  </div>

                  <div className="p-3 bg-military-50 rounded-xl border border-military-150 text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
                    <div className="font-bold text-military-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-kraft-600" />
                      자동화 및 권한 안내
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                      <li>시트가 <strong>'링크가 있는 사용자(뷰어)'</strong>로 공유되어 있으면 즉시 실시간 동기화됩니다.</li>
                      <li>비공개 사내 시트의 경우 상단 <strong>[Google 로그인 동기화]</strong> 버튼을 누르면 권한을 안전하게 인증하여 불러옵니다.</li>
                      <li>시트의 열(제목, 요약, 출처, 일자, 원문링크, 핵심요약 등)이 자동으로 매핑됩니다.</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-kraft-700 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> 현재 연동 시트 열기
                    </a>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSheetSettingsOpen(false)}
                        className="py-2 px-3 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 text-xs font-bold text-gray-950 bg-kraft-500 hover:bg-kraft-600 rounded-lg shadow-sm"
                      >
                        설정 저장 및 동기화
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. COMPLIANT NOTICE BANNER FOOT DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-5.5 rounded-2xl bg-white border border-gray-200 text-left space-y-2 max-w-4xl mx-auto shadow-xs">
          <p className="text-[11px] font-mono tracking-widest font-extrabold text-kraft-700 bg-kraft-100/60 py-0.5 px-2 rounded inline-block uppercase leading-none">
            DEFENSE MEDIA COMPLIANCE DISCLAIMER
          </p>
          <p className="text-[11.5px] text-gray-400 leading-relaxed font-light">
            {language === "ko" && "본 페이지는 공개된 군수 시장 자료와 언론 보도, 관련 국방 기관 발표 내용을 기반으로 작성되었으며, 특정 군 부대나 계약 기관의 대변 또는 기밀 정보를 노출하지 않고 투명한 공개 분석만을 수렴합니다."}
            {language === "en" && "This sector briefing board is aggregated from publicly declared defense logistics bulletins and validated web news source feeds. It does not represent the official stance of any ministry of national defense."}
            {language === "tr" && "Bu bülten sayfamızdaki içerikler tamamen kamuya açık askeri lojistik yayınları ve haber ajansları kaynak alınarak derlenmiştir, hiçbir askeri birimin gizli bilgisini ifşa etmemektedir."}
          </p>
        </div>
      </section>

    </div>
  );
}
