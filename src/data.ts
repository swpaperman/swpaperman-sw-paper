/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimelineEvent, ProductItem, CertificateInfo, FacilityItem } from "./types";

export const timelineData: TimelineEvent[] = [
  {
    year: "2004 ~ 2019",
    items: [
      "2019. 08 - 품질경영시스템 인증 획득 (KSQ ISO 9001)",
      "2015. 05 - 민수용 설비 자동화 증설 및 제조 혁신",
      "2015. 03 - 국방품질 경영시스템 인증 (DQMS) 획득",
      "2010. 04 - 환경경영시스템 인증 획득 (KSQ ISO 14001)",
      "2007. 01 - (주)수원지관산업 법인 설립 및 지배구조 현대화",
      "2004. 06 - 국제 표준 ISO 9001 최초 인증 획득"
    ]
  },
  {
    year: "1964 ~ 1998",
    items: [
      "1998. 04 - (주)안양지관 합병하여 영남·경인 권역 리더십 공고화",
      "1997. 02 - 대한민국 국방부 주요 방산물자 수출업 정식 허가 취득",
      "1984. 12 - 중소기업진흥공단 지정 우수유망 중소기업체 선정",
      "1978. 04 - 상공부 장관 지정 주요 방위산업체 선정",
      "1964. 04 - 주식회사 수원지관 설립 (창립자 정신 계승)"
    ]
  }
];

export const productData: ProductItem[] = [
  {
    id: "ammunition-tube",
    name: "탄약 포장용 지환통",
    englishName: "Ammunition Fiberboard Paper Tubes",
    badge: "방위산업 지정물자",
    category: "defense",
    summary: "밀폐, 방습, 고압축 설계로 장기 보관 및 격렬한 탄약 운송을 안전하게 보호하는 전군 납품용 특수 지관.",
    description: "MIL-SPEC(미군수 표준 규격 및 국방 규격) 표준을 완벽히 충족하며, 국방과학연구소(ADD)와 공동으로 국산화 및 혁신 개발에 참여하여 1975년 방위산업물자로 지정을 취득한 이래 전군에 무장 필수 보호 패키지로 공급해오고 있는 고기술 지환통입니다. 극한의 환경에서의 습기 유입을 차단하고 격렬한 야지 수송 과정 중 완벽한 물리적 강도로 정밀 기폭 원자재를 보호합니다.",
    features: [
      "방수/방습 차단막 다중 설계 (내벽 방습 알루미늄 배리어 및 왁스 임프레그네이션)",
      "격렬한 투하 및 차량 수송 시 충격을 흡수하는 나선형 고결합 강도 와인딩 공법",
      "정전기 및 극소 부식을 방지하기 위한 안전 라이너 내벽 가공",
      "특수 결착형 보호 스틸 및 특수 합성수지 오링 안전 복합 캡 시스템"
    ],
    specifications: [
      { label: "표준 규격", value: "MIL-P-3420H / 국방 특수 장비 표준 사양 준수" },
      { label: "외부 코팅", value: "특수 방습 방수 왁스 코팅막 피복" },
      { label: "주요 소재", value: "초고강도 크라프트 정밀 배리어 다중 시트, 스틸 플랜지 결착 캡" },
      { label: "주요 용도", value: "소총탄, 포탄, 항공 가압 유도탄 및 신관, 화약류 방수 저장/운송" },
      { label: "물리 정보", value: "외부 낙하 무파손 기준 합격, 기밀 가압 유지성 우수" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
    structureLayers: [
      { name: "내벽 배리어 (Melt Lamination)", desc: "기밀 유지를 통해 습기 및 염도 침투를 원천 차단하는 이중 레이어", color: "bg-slate-300" },
      { name: "핵심 지관부 (High-Wall Core)", desc: "정밀 압축을 위해 대각선 나선 와인딩한 친환경 고강도 파이버보드 펄프", color: "bg-amber-100" },
      { name: "방습 결합부 (Intermediate Wax Film)", desc: "고열 가용 왁싱 기법으로 다중 레이어 사이에 완전 방습막을 균형 형성", color: "bg-amber-200" },
      { name: "최외곽 가죽질 지층 (Outer Protective Shell)", desc: "낙하 충격 분산과 습기 차단을 완성하는 고함량 발수 피막 가공", color: "bg-amber-700" }
    ]
  },
  {
    id: "aerial-target",
    name: "공중표적기 창형",
    englishName: "Air Tactical Target Drone Cone & Fuselage",
    badge: "국산화 개발 성공 물자",
    category: "defense",
    summary: "대한민국 공군 조종사의 사격전 연마 및 결전에 쓰이는 국방과학연구소 공동 국산화 개발 비행 유닛 표적.",
    description: "대한민국 공군의 정예 전투 조종사 사격 훈련을 고도화하기 위하여 국방과학연구소와 긴밀한 국산화 프로세스를 밟아 국내 기술 자립을 일구어낸 정밀 군 전술 조종술 훈련 장비입니다. 고속 비행 기동 시 우수한 균형 유지력과 가혹한 공기 흐름 압발력 속에서 공군 실전에 필수적인 공대공/지대공 사격 과녁 역할을 충실히 실증 수행하도록 정교하게 조립 생산됩니다.",
    features: [
      "국방과학연구소 독점 규격 합격 및 수입 의존품 완벽 국산 대체 공급 실현",
      "고각 고진동 레이더 반사 각도를 유지하며 완벽하게 기능하는 전술 복합 설계",
      "공기역학적 동체(Fuselage)와 원뿔(Cone) 형태의 최첨단 기하학적 몰딩 패키징"
    ],
    specifications: [
      { label: "합격 인증", value: "국방과학연구소(ADD) 국산화 규격 승인완료" },
      { label: "구조 설계", value: "공기역학적 고속 예인 장력에 부합하는 경량-고강성 구조체" },
      { label: "주요 소재", value: "수지 가합형 고밀도 가압 페이퍼 복합 컴포지트, 레이더 시그니처 배리어" },
      { label: "활용 부대", value: "공군 전투비행단 공중 전술 훈련 및 사격 연마 시스템" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "wooden-crate",
    name: "군수용 특수 목재용기 (목상자)",
    englishName: "Tactical Wooden Storage Containers",
    badge: "군수용 목산자 장치",
    category: "wood",
    summary: "방부, 방진, 충격 댐퍼 구조를 채택해 총기 및 탄약 가공 장비를 철저하게 수송하는 목조형 특수 수송함.",
    description: "총기류, 대포 중화기 부품, 탄적포용 보관 장비 등을 해상 밀적 보관 또는 전술 야적장으로 신속 배포 수송할 때 사용되는 중하중용 특량 목재 용기입니다. 국제 검역 기준인 수출용 살균/열처리 규제(ISPM-15)를 기본적으로 원격 준수하는 목재 가공 기술을 구축하여 아연 도금 가드, 기정 래치 도아락이 적용되어 강력한 내후성을 가집니다.",
    features: [
      "ISPM-15 국제 연합 검역 완벽 준수 및 수출형 고압 열처리 건조 공정 완료",
      "충격 방진 및 완치 밀폐용 실리콘 가스켓 보완 보강",
      "총기, 박격포 부품, 탄통 맞춤형 안착 및 결착형 내장 유틸리티 거치 프레임 설계"
    ],
    specifications: [
      { label: "열처리 규격", value: "IPPC ISPM-15 국제 규격 살균 가공 승인목" },
      { label: "철물 마감", value: "아연 플레이팅 녹 방지 부식 지제 힌지, 세이프티 래클락 및 리벳 가공" },
      { label: "내장 유틸", value: "장비 밀착 맞춤형 발포 완충 장치 및 유동 방지 목재 턱" },
      { label: "적재 편의", value: "지게차 4방향 포크 진입로 하단 격자 일체화" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "eco-packaging",
    name: "친환경 산업용 지관 패키지",
    englishName: "Eco-Friendly Spiral Paper Tubes",
    badge: "60년 정밀 제조 지관",
    category: "eco",
    summary: "밀리미터 단위의 극소 편차와 초강력 회전 장력을 견디도록 정교하게 감아 올린 다양한 규격의 친환경 산업용 지관.",
    description: "60년 넘는 지관 원제 기술 리더십을 담아 현대식 첨단 나선 와인딩 전용 설비를 통해 오차를 극소화한 맞춤형 지관입니다. 섬유 연사 및 원사 회전용 지관, 연신 필름 권취 지관, 인쇄 프레스용 튜브, 친환경 지관 등 고객사의 설비 속도 및 장력 텐션에 기포가 일어나지 않도록 특수 점착 열처리 가공하며 100% 자원 재생율을 지닌 천연 수용성 점착 배합으로 생분해성이 탁월합니다.",
    features: [
      "사용자 치수 요구에 맞춘 정밀 자동 슬리터 공정 (내경 1인치 ~ 20인치 자유 조절)",
      "고부하 고속 풀링에도 변형이 일어나지 않는 강력한 축방향 횡합 분산 강도 실현",
      "100% 생분해성 재생 크라프트 신형 펄프 구성 및 고유 연마 가둠 코팅 공법"
    ],
    specifications: [
      { label: "내경 허용차", value: "±0.1mm 대역의 극정밀 가공 준수" },
      { label: "생산 공정", value: "초고속 다연 축 스파이럴(Spiral) 와인딩 및 정밀 연마" },
      { label: "길이/두께", value: "길이 50mm ~ 8000mm, 두께 1mm ~ 30mm 범위 맞춤 수주 생산" },
      { label: "주요 용도", value: "원단 및 비닐 권취 핵심 롤, 인쇄 기판 보호용 파이버관, 친환경 발송용 튜브" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800"
  }
];

export const certificateData: CertificateInfo[] = [
  {
    id: "iso-9001",
    title: "품질경영시스템인증서",
    subtitle: "KSQ ISO 9001 / ISO 9001",
    date: "2019년 08월 (최초 2004년 6월 획득)",
    authority: "한국품질재단(KFQ)",
    number: "지관 및 군사 암모 포장용 지환통의 설계, 개발 및 생산"
  },
  {
    id: "dqms",
    title: "국방품질경영시스템인증서",
    subtitle: "DQMS (Defense Quality Management System)",
    date: "2015년 03월",
    authority: "국방기술품질원 (DTaQ)",
    number: "군사 작전용 탄약 지환통 및 포장 보관 장치 분야의 연구개발 생산 및 품질 보증"
  },
  {
    id: "iso-14001",
    title: "환경경영시스템인증서",
    subtitle: "KSQ ISO 14001 / ISO 14001",
    date: "2010년 04월",
    authority: "한국환경인증원",
    number: "친환경 고강도 지관 및 군수 에코 포장류 제조 공정 전반의 환경 정화 규격 획득"
  }
];

export const facilityData: FacilityItem[] = [
  {
    id: "facility-1",
    title: "자동 나선 지관 성형기 (Spiral Tube Winder)",
    description: "다층의 크라프트 시트에 최적의 장력을 결합해 한 몸으로 꼬아 감아 올리는 고배율 자동 회전 다이 성형기입니다. 일정 간격 정밀 연마 블레이드가 결합되어 가열 성형과 긴 기장의 횡단 슬리팅이 완전 자동으로 구현됩니다.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "facility-2",
    title: "내외벽 특수 왁스 침투 가마 (Wax Impregnation System)",
    description: "탄약 포장의 군사 방수 규격에 따른 완벽 성비 극대화를 위해 섭씨 120도의 고온 조건 하에서 특수 합성수지계 발수 왁스를 지원지관 벽부 깊숙이 기밀 진공 침착시켜 우수를 물리치고 원자재 기밀을 반영구 보장합니다.",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "facility-3",
    title: "정밀 지관 보정 및 유틸리티 캡 정착 라인",
    description: "군용 지환통 마감에 투입되는 스틸 링 칼라 조립과 이중 안전 마개를 공압 장비로 완전 결속하며 복합 가습 상태 조절 시험 및 내낙하 하중 저정 실시간 샘플링 검사를 동시 거치는 최종 관수 품질 보증 시설입니다.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
  }
];
