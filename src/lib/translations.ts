/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationSchema {
  companyName: string;
  companyNameEng: string;
  mainTitle: string;
  mainTitleEng: string;
  mainSubtitle: string;
  mainDesc: string;
  nav: {
    home: string;
    products: string;
    simulator: string;
    stock: string;
    quality: string;
    reference: string;
    about: string;
    contact: string;
    news: string;
  };
  contactInfo: {
    tel: string;
    fax: string;
    email: string;
    address: string;
    addressLabel: string;
    hours: string;
    hoursVal: string;
  };
  footer: {
    desc: string;
    copyright: string;
    directions: string;
    telLabel: string;
    faxLabel: string;
    hqAddress: string;
    credentialsTitle: string;
    specialist: string;
    trust60: string;
    credentials: string[];
  };
  home: {
    heroBadge: string;
    customInquiryBtn: string;
    viewAmmoBtn: string;
    specHeader: string;
    realProductTitle: string;
    realProductSub: string;
    designSpecLabel: string;
    designSpecVal: string;
    moistureLabel: string;
    moistureVal: string;
    strengthLabel: string;
    strengthVal: string;
    qualityLabel: string;
    qualityVal: string;
    customQuantityConsult: string;
    sizesCustomisable: string;
    partnersHeader: string;
    ammoTitle: string;
    ammoDesc: string;
    ammoPerf1Title: string;
    ammoPerf1Desc: string;
    ammoPerf2Title: string;
    ammoPerf2Desc: string;
    moreAmmoBtn: string;
    industrialTitle: string;
    industrialDesc: string;
    indCat1: string;
    indCat1Desc: string;
    indCat2: string;
    indCat2Desc: string;
    indCat3: string;
    indCat3Desc: string;
    moreIndBtn: string;
    windingCard: string;
    packagingCard: string;
    ecoRibbon: string;
    simTitle: string;
    simDesc: string;
    simBtn: string;
    stockTitle: string;
    stockDesc: string;
    stockBtn: string;
    qualityTitle: string;
    qualityDesc: string;
    qualityStat1: string;
    qualityStat2: string;
    qualityStat3: string;
    qualityBtn: string;
    bottomTitle: string;
    bottomDesc: string;
    bottomBtn: string;
  };
  ammo: {
    badge: string;
    title: string;
    showcaseLabel: string;
    subtitle: string;
    descBold: string;
    desc1: string;
    desc2: string;
    desc3: string;
    desc4: string;
    noticeTitle: string;
    noticeDesc: string;
    historyTitle: string;
    historyDesc: string;
    tableThProduct: string;
    tableThDev: string;
    tableThProd: string;
    perfTitle: string;
    inquireProductBtn: string;
  };
  industrialPage: {
    badge: string;
    title: string;
    desc1: string;
    desc2: string;
    desc3: string;
    card1Title: string;
    card2Title: string;
    ribbonText: string;
    specHeader: string;
    specSub: string;
    btnRequest: string;
  };
  simulatorPage: {
    badge: string;
    title: string;
    desc: string;
    warningTitle: string;
    warningDesc: string;
    labelPreset: string;
    labelManual: string;
    placeholderManual: string;
    labelThickness: string;
    labelLength: string;
    labelQuantity: string;
    labelTreatment: string;
    treatmentKraft: string;
    treatmentWax: string;
    treatmentBarrier: string;
    subGraphicTitle: string;
    subScale: string;
    liveId: string;
    liveOd: string;
    liveThick: string;
    liveLength: string;
    analBadge: string;
    analTitle: string;
    analSpecId: string;
    analWeight: string;
    analTotalPaper: string;
    analTotalQty: string;
    analStructural: string;
    structuralStrong: string;
    structuralStandard: string;
    structuralCustom: string;
    btnSubmitSpecs: string;
    outStructuralOpt: string;
    outStructuralLight: string;
    outStructuralHeavy: string;
    outStructuralCaution: string;
    sub: string;
    tabSelectMold: string;
    tabDirectInput: string;
    listHeaderTitle: string;
    listHeaderSub: string;
    searchPlaceholder: string;
    catAll: string;
    catSmall: string;
    catMedium: string;
    catLarge: string;
    lblInnerDirect: string;
    lblThickness: string;
    lblLength: string;
    lblQty: string;
    lblTreatment: string;
    trtPlain: string;
    trtWax: string;
    trtAlu: string;
    outHeader: string;
    outId: string;
    outOd: string;
    outThick: string;
    outMatchingTitle: string;
    outMatchingNormal: string;
    outWeightUnit: string;
    outWeightTotal: string;
    outStructuralHeader: string;
    btnActionText: string;
    btnActionSub: string;
  };
  stockPage: {
    badge: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    approxPrice: string;
    promoPrice: string;
    btnInquireStock: string;
    badgeSurplus: string;
    labelCondition: string;
    labelStockQty: string;
    labelStockPrice: string;
    labelStockDesc: string;
    panelAdminUnlock: string;
    btnRequestPrefill: string;
  };
  qualityPage: {
    badge: string;
    title: string;
    desc: string;
    stepsHeader: string;
    stepsSub: string;
    machineHeader: string;
    machineSub: string;
    colModel: string;
    colCap: string;
    colQty: string;
    colDesc: string;
    envHeader: string;
    envSub: string;
    envPart1: string;
    envPart2: string;
  };
  referencePage: {
    badge: string;
    title: string;
    descBold: string;
    descLight: string;
    segmentsTitle: string;
    tableThOrg: string;
    tableThRole: string;
    tableThClient: string;
    tableThBiz: string;
    section1Title: string;
    section1Desc: string;
    section2Title: string;
    section2Desc: string;
    disclaimerTitle: string;
    disclaimerDesc: string;
    btnContactSub: string;
    btnContactText: string;
  };
  aboutPage: {
    badge: string;
    title: string;
    descBold: string;
    descLight: string;
    philosophyTitle: string;
    phil1Title: string;
    phil1Desc: string;
    phil2Title: string;
    phil2Desc: string;
    phil3Title: string;
    phil3Desc: string;
    historyTitle: string;
    historySub: string;
    allEras: string;
    adminBtnText: string;
    adminCardTitle: string;
    adminPlaceholder: string;
    adminVerifyBtn: string;
    adminCloseBtn: string;
    adminNewPass: string;
    adminConfirmPass: string;
    adminChangeBtn: string;
  };
  contactPage: {
    badge: string;
    title: string;
    subtitle: string;
    noticeTitle: string;
    noticeDesc: string;
    formClassification: string;
    formProductType: string;
    formCompany: string;
    formContactName: string;
    formPhone: string;
    formEmail: string;
    formProductName: string;
    formQuantity: string;
    formDimensions: string;
    formInnerDia: string;
    formOuterDia: string;
    formThickness: string;
    formLength: string;
    formHasBlueprint: string;
    formHasPhotos: string;
    formUploadArea: string;
    formUploadDesc: string;
    formUploadDragText: string;
    formComment: string;
    formSubmitBtn: string;
    successTitle: string;
    successDesc: string;
    alertMaxFiles: string;
    alertFileCountLimit: string;
    alertFileSizeLimit: string;
    blueprintY: string;
    blueprintN: string;
    photoY: string;
    photoN: string;
    class1: string;
    class2: string;
    class3: string;
    class4: string;
    cat1: string;
    cat2: string;
    cat3: string;
    cat4: string;
    placeCompany: string;
    placeContact: string;
    placePhone: string;
    placeEmail: string;
    placeProduct: string;
    placeQty: string;
    placeComment: string;
    anotherInquiryBtn: string;
  };
}

export const translations: Record<"ko" | "en" | "tr", TranslationSchema> = {
  ko: {
    companyName: "주식회사 수원지관산업",
    companyNameEng: "SUWON PAPER CONE & TUBE MFG. CO., LTD.",
    mainTitle: "탄약 포장용 지환통 전문 제조기업",
    mainTitleEng: "AMMUNITION FIBERBOARD CONTAINER SPECIALIST",
    mainSubtitle: "60년 이상 축적된 지관 제조 기술을 기반으로, 국방 K-방산 포장 분야에서 요구되는 품질과 신뢰성을 갖춘 탄약 포장용 지환통을 생산합니다.",
    mainDesc: "수원지관산업은 탄약의 보관·수송·취급 과정에서 필요한 방습성, 내구성, 치수 안정성을 고려하여 탄약의 장기 저장성과 운송 안정성을 높이는 기능성 지환통을 제조합니다.\n\n탄약의 가치는 안전한 보관에서 지켜집니다. 수원지관산업은 그 가치를 지키는 포장 기술에 집중합니다.",
    nav: {
      home: "HOME",
      products: "제품소개",
      simulator: "맞춤 규격 설계",
      stock: "제품판매",
      quality: "품질·생산",
      reference: "레퍼런스",
      about: "회사소개",
      contact: "문의하기",
      news: "K-방산 뉴스"
    },
    contactInfo: {
      tel: "Phone: 031-353-7034",
      fax: "Fax: 031-353-7369",
      email: "Email: swpaper@hanmail.net",
      address: "주소: 경기도 화성시 만세구 향남읍 발안로 679-14",
      addressLabel: "경기도 화성시 만세구 향남읍 발안로 679-14",
      hours: "상담 시간",
      hoursVal: "평일 08:30 ~ 18:00 (토/일/공휴일 휴무)"
    },
    footer: {
      desc: "수원지관산업은 탄약 포장용 지환통 및 일반 산업용 지관 전문 제조기업으로, 수십 년 축적된 제조 및 정밀 절단 프레스 공법을 바탕으로 신뢰성 높은 최상의 제품 규격을 공급합니다.",
      copyright: "© 2026 SUWON PAPER CONE & TUBE MFG. CO., LTD. All Rights Reserved.",
      directions: "연락처 및 오시는 길",
      telLabel: "대표전화: 031-353-7034",
      faxLabel: "팩스: 031-353-7369",
      hqAddress: "본사공장: 경기도 화성시 만세구 향남읍 발안로 679-14",
      credentialsTitle: "역량 및 보유 지표",
      specialist: "군수포장 정밀 지관 전공",
      trust60: "신뢰 60주년",
      credentials: [
        "군수용 다구경 탄약지환통 제조생산",
        "국방규격 기반 제품 개발 및 조율 생산 숙련",
        "국방품질경영체계 기준을 참고한 내부 생산관리",
        "ISO 9001:2015 / ISO 14001:2015 전 공정 품질검수 가동",
        "설립연도: 1964년 이래 축적된 나선 와인딩 기술력",
        "국방부 및 체계업체(한화,풍산,삼양화학,LIG넥스원등) 네트워크"
      ]
    },
    home: {
      heroBadge: "SINCE 1964 • 탄약지환통 전문 제조기업",
      customInquiryBtn: "맞춤 제작 문의하기",
      viewAmmoBtn: "제품소개 보기",
      specHeader: "탄약지환통 핵심 사양",
      realProductTitle: "수원지관산업 탄약지환통",
      realProductSub: "방습·내구성 기반 탄약 포장",
      designSpecLabel: "설계 규격",
      designSpecVal: "MIL-SPEC 기반 KDS 국방규격 설계",
      moistureLabel: "방습 구조",
      moistureVal: "Resin규격 함침 기반 방습 보호 구조",
      strengthLabel: "구조 강도",
      strengthVal: "고강도 다층 지관 성형 구조",
      qualityLabel: "품질 관리",
      qualityVal: "국방규격 기반 공정 품질관리",
      customQuantityConsult: "군수 포장용 맞춤형 수량 상담",
      sizesCustomisable: "규격조율가능",
      partnersHeader: "핵심 수요군 및 체계(완성탄)업체",
      ammoTitle: "탄약지환통(국가전략 탄 보호용)",
      ammoDesc: "탄약지환통은 탄약의 보관, 수송, 취급 과정에서 외부의 습기나 물리적 외력으로부터 정밀 화약류 및 동체를 안전하게 보호하는 전비용 기능성 포장재입니다. 수원지관산업은 미국 국방 MIL 규격 및 NATO 기준의 모든 탄종을 수용하며, 사막과 아열대 기후 등 전 세계 극한 조건을 극복합니다. 실제 30년 이상 노후화된 탄약고 환경에서도 단 하나의 결함도 없는 최상의 성능을 증증해 왔습니다.",
      ammoPerf1Title: "방수·방습막 & MIL·NATO 규격",
      ammoPerf1Desc: "미국 국방 MIL 규격 및 NATO 모든 탄종에 대응하며 고온다습 사막 및 전천후 기후를 극복합니다.",
      ammoPerf2Title: "치수 안정성 & 30년 신뢰성",
      ammoPerf2Desc: "봄·여름·가을·겨울 겪으며 30년 이상 장기 적치된 현역 탄약고 내에서도 변형 없이 안전한 보전 성능을 보장합니다.",
      moreAmmoBtn: "자세한 탄종 적용 분야 확인",
      industrialTitle: "일반 산업용 및 권취용 지관",
      industrialDesc: "탄약 포장용 지환통 생산을 통해 확보한 초고횡압 분산 와인딩 기술을 기반으로 일반 산업 현장의 권취용 지관, 포장용 지관, 원단 권치용 종이 롤 등 다양한 민수용 제품군을 정밀 가공하여 공급합니다. 소형에서부터 수 미터에 달하는 대형 권취 구조체까지 완벽한 공차가 강점입니다.",
      indCat1: "소형 지관",
      indCat1Desc: "소형 IT 기기 부품 보호용, 필름 소형 롤, 샘플 발송 유선관",
      indCat2: "중형 지관",
      indCat2Desc: "인쇄용 원단, 박막 필름 복합 권치 회전 보강 코어",
      indCat3: "대형 지관",
      indCat3Desc: "중중량 원자재 권취, 장재물 수송 포장용 특수 대경관",
      moreIndBtn: "상담용 일반지관 사양 명세 보기",
      windingCard: "일반지관 및 권취용지관",
      packagingCard: "완성형 포장용지통",
      ecoRibbon: "100% 생분해성 재생 크라프트 펄프 원료 적용 및 정밀 축 가공",
      simTitle: "지관 설계 규격 시뮬레이터",
      simDesc: "필요한 내경, 두께, 길이를 시각적으로 모델링하고 예상 중량, 필요 원지량 및 적격 강도 조건 수준을 즉석에서 시뮬레션해 상담 서식을 전송해보십시오.",
      simBtn: "규격 설계 시뮬레이터 바로가기",
      stockTitle: "즉시 출고 가능 제품 및 공급 상담",
      stockDesc: "수원지관산업에서 현재 공급 가능한 탄약 포장용 지환통, 일반 산업용 지관, 샘플 지관 및 기타 지관류 제품을 확인하고 문의하실 수 있습니다. 제품별 공급 가능 수량, 단가, 납기 조건은 담당자 확인 후 안내되며, 거래는 견적서 및 전자세금계산서 발행 방식으로 진행됩니다.",
      stockBtn: "공급 가능 제품 확인하기",
      qualityTitle: "오랜 제조 이력으로 검증된 생산 신뢰성",
      qualityDesc: "수원지관산업은 60년 이상 축적해 온 지관 성형 기술과 군수품 포장 제조 경험을 바탕으로, 탄약 포장용 지환통 생산 전 공정에서 체계적인 품질관리를 운영하고 있습니다.\n\n탄약의 보관·수송·취급 과정에서 요구되는 방습성, 내구성, 치수 정밀성, 조립 안정성을 고려하여 원자재 확인, 성형, 방습 처리, 정밀 절단, 조립, 출하 검사에 이르는 주요 생산 공정을 관리하고 있으며, 국방규격 기반 품질 요구사항을 반영한 제조 대응을 이어가고 있습니다.\n\n또한 고객 도면과 요구 규격에 부합하는 제품 생산을 위해 내부 생산관리 기준과 공정별 품질 확인 체계를 지속적으로 운영하고 있습니다.",
      qualityStat1: "60년 이상 지관 제조 기술 축적",
      qualityStat2: "군수품 포장 제조 경험",
      qualityStat3: "품질·환경경영 기준 기반 운영",
      qualityBtn: "품질·생산 관리 자세히 보기",
      bottomTitle: "도면 기준 주문 가공 및 주문 제작 문의",
      bottomDesc: "필요 사양 규격(형상, 내경, 화벽 두께, 길이 등)을 기재하여 견적 제안 서식을 접수해주시면, 인보이스 및 세금계산서 중심의 안전한 거래 검토 및 상세 양산 단가표를 송부하여 드립니다.",
      bottomBtn: "상담 접수실 바로 이동"
    },
    ammo: {
      badge: "AMMUNITION FIBERBOARD CONTAINER",
      title: "탄약지환통",
      showcaseLabel: "AMMUNITION TUBE SHOWCASE",
      subtitle: "수원지관산업 고강도 탄약지환통 제품",
      descBold: "탄약지환통은 탄약의 보관, 수송, 취급 과정에서 외부 충격, 습기, 온도 변화 등 다양한 환경 요인으로부터 탄약을 안정적으로 보호하기 위한 고강도 기능성 포장용기입니다.",
      desc1: "수원지관산업은 60년 이상 축적된 지관 제조 기술을 기반으로, MIL-SPEC 및 KDS 8140-4005 국방규격의 요구 조건을 참고하여 탄약 포장용 지환통을 생산하고 있습니다.",
      desc2: "원지 투입 및 지관 성형, 방습 처리, 정밀 절단, 금속 플랜지 및 칼라 조립, 보호 캡 조립에 이르는 제조 공정을 통해 탄약의 장기 저장성과 운송 안정성을 높이는 지환통을 제작합니다.",
      desc3: "탄약지환통은 단순한 포장재가 아니라 탄약의 성능과 가치를 보존하는 보호 용기입니다. 수원지관산업은 다양한 탄종의 도면, 치수, 포장 조건에 맞춘 1:1 맞춤 제작을 지원하며, 군수품 포장 분야에서 축적한 생산 경험과 공정 품질 데이터를 바탕으로 안정적인 제조 대응을 이어가고 있습니다.",
      desc4: "수원지관산업의 탄약지환통은 국방 K-방산 분야에서 요구되는 방습성, 내구성, 치수 정밀성, 조립 안정성을 고려하여 제작되며, 탄약의 보관 중 외부 환경으로 인한 품질 저하를 줄이고 장기간 안정적인 보관이 가능하도록 설계됩니다.",
      noticeTitle: "구매 및 상담 유의사항",
      noticeDesc: "본 탄약지환통 제품군은 일반 구매 상담이 가능한 포장용 지관(빈 용기)으로 전개됩니다. 안전 거래 및 관련 규정 준출 등 법적 오해가 발생하지 않기를 바라며, 오직 “사용 목적 및 규격 확인 후 공급 상담” 방식으로 정해진 수주 절차 계약에 의거하여 견적 및 납품 공급 상담을 진행합니다.",
      historyTitle: "탄약지환통 개발 및 생산 실적",
      historyDesc: "국방과학연구소(ADD), 국방기술품질원(DTaQ), 한화에어로스페이스, 풍산 등과 공동 개발 및 생산을 이어온 고품질 탄약지환통 제품군입니다.",
      tableThProduct: "품 명 (Product Name)",
      tableThDev: "개 발 년 도",
      tableThProd: "생 산 년 도",
      perfTitle: "핵심 성능 지표",
      inquireProductBtn: "해당 탄종 맞춤 제작 상담 및 수주 규격 문의"
    },
    industrialPage: {
      badge: "COORDINATED MANUFACTURING PORTFOLIO",
      title: "일반 팩토리 산업용 지관",
      desc1: "일반 산업용 및 권취용 지관은 섬유 원사, 플라스틱 필름, 제지 롤, 포장 수배 및 가공 등 다양한 현대식 공장 운용 공정에서 원재료를 회전 권취하고 보관 수송할 때 지목되는 필수 기초 부품재입니다.",
      desc2: "수원지관산업은 60개 성상에 달성하는 지관 펄프 가압 노하우와 고온 가용 왁싱 점착 프로세스를 통틀어, 외부 변형을 최소화하고 높은 회전력 및 축방향 인장 장력을 끝까지 버텨낼 수 있도록 대각 횡결착 나선식으로 다층 적층 결합 가공합니다.",
      desc3: "고객사의 생산 기종 릴 사양에 맞추어 내외경 수치를 밀리미터 단위까지 조절 세팅하여 양산 공급하며, 100% 재생 펄프 섬유를 사용해 완벽히 재활용 가능한 에코 프렌들리 마감을 다합니다.",
      card1Title: "일반지관 및 권취용지관",
      card2Title: "완성형 포장용지통",
      ribbonText: "100% 생분해성 재생 크라프트 펄프 원료 적용 및 정밀 축 가공",
      specHeader: "사양 기준 상세 구분",
      specSub: "오랜 와인딩 숙련을 통해 구축된 대표적인 세 가지 가공 범주입니다.",
      btnRequest: "해당 사양 가공 의뢰 및 견적제출"
    },
    simulatorPage: {
      badge: "COMPREHENSIVE TUBE SIMULATION DATABASE",
      title: "맞춤 규격 설계",
      desc: "수원지관산업이 보유한 국내 최다 규격의 금형 리스트를 확인하고 필요한 지관 외경, 예상 단위 중량 및 최적의 원재료 소요량을 실시간 모델링할 수 있습니다.",
      warningTitle: "설계 한계치 유의안내",
      warningDesc: "기장(L)이 1,800mm를 초과하는 수치는 특수 수직 가압 지지 및 광폭 특장 설비 성형으로 정렬되며, 가공 난이도에 따른 단위 공임 격차가 발생할 수 있습니다.",
      labelPreset: "1. 수원 표준 내경 몰드(금형) 자동 산출",
      labelManual: "2. 맞춤 내경 직접 수동 입력",
      placeholderManual: "원하는 내경 수치 (mm)",
      labelThickness: "지관 벽 두께 (Thickness - T)",
      labelLength: "원통형 지관 기장 (Length - L)",
      labelQuantity: "제안 제작 수량 (Quantity)",
      labelTreatment: "방수 및 특수 표면 처리 기능 (Barrier Profile)",
      treatmentKraft: "일반 재생 크라프트",
      treatmentWax: "고온 표면 왁싱 가공",
      treatmentBarrier: "알루미늄 방습 배리어",
      subGraphicTitle: "실시간 입체 원형지관 설계도 (3D Cylinder Diagram)",
      subScale: "나선 성형 측정규격",
      liveId: "내경 (원경)",
      liveOd: "외경 (원경)",
      liveThick: "지관 두께",
      liveLength: "길이 (기장)",
      analBadge: "ENGINEERING ANALYSIS",
      analTitle: "시뮬레이션 기술 분석 보고 요약",
      analSpecId: "지관 사양 지름",
      analWeight: "지공당 추정 전중량",
      analTotalPaper: "배합 투입 필요 원지 중량",
      analTotalQty: "총 수량 기준 원지 추정량",
      analStructural: "예상 횡압 압축 강도 수준",
      structuralStrong: "우수 (고중량 권취 적합)",
      structuralStandard: "보통 (일반 포장용 적합)",
      structuralCustom: "별도 조율 필요",
      btnSubmitSpecs: "시뮬레이션 규격 그대로 견적 신청하기",
      outStructuralOpt: "최적 (안정적인 고강도 구조)",
      outStructuralLight: "경량 (가벼운 포장재 권장)",
      outStructuralHeavy: "초고압 특수 보증 설계 (중하중 적합)",
      outStructuralCaution: "주의 (횡압 파손 우려, 벽 두께 증강 권장)",
      sub: "수원지관산업이 보유한 국내 최다 규격의 금형 리스트를 확인하고 필요한 지관 외경, 예상 단위 중량 및 최적의 원재료 소요량을 실시간 모델링할 수 있습니다.",
      tabSelectMold: "수원 표준 금형 조회하기",
      tabDirectInput: "맞춤 규격 직접 입력",
      listHeaderTitle: "보유 중인 108종 표준 몰드 리스트",
      listHeaderSub: "공장 보유 금형을 적용하시면 금형 신규 제작 비용(최대 수백만원)을 차감하여 납기를 획기적으로 낮출 수 있습니다.",
      searchPlaceholder: "내경 규격 검색 (예: 76.3)...",
      catAll: "전체 보기",
      catSmall: "소경 (Ø10~40)",
      catMedium: "중경 (Ø40~100)",
      catLarge: "대경 (Ø100 이상)",
      lblInnerDirect: "원하는 지관 내경 수치 (ID)",
      lblThickness: "지관 벽 두께 (Thickness - T)",
      lblLength: "원통형 지관 기장 (Length - L)",
      lblQty: "제안 요청 수량",
      lblTreatment: "방수 및 방습 표면 마감 가공처리",
      trtPlain: "순수 크라프트",
      trtWax: "방수 왁싱 코팅",
      trtAlu: "방습 알루미늄 배리어",
      outHeader: "실시간 입체 원형지관 설계도",
      outId: "내경 (ID)",
      outOd: "외경 (OD)",
      outThick: "두께 (T)",
      outMatchingTitle: "수원 보유 표준 금형과 100% 완벽 일치!",
      outMatchingNormal: "비표준 금형 맞춤규격 설계 중",
      outWeightUnit: "개당 추정 중량 (Unit)",
      outWeightTotal: "총 수량 기준 추정 전중량 (Bulk)",
      outStructuralHeader: "구조 역학적 횡압 견고 수준 분석",
      btnActionText: "이 설계 규격으로 맞춤 제작 의뢰하기",
      btnActionSub: "※ 원버튼 송신으로 제품 상세와 규격 값이 본사 담당자에게 연동 전달됩니다."
    },
    stockPage: {
      badge: "PRODUCT DIRECT SUPPLY",
      title: "즉시 출고 가능 제품 및 공급 상담",
      desc: "수원지관산업에서 현재 공급 가능한 탄약 포장용 지환통, 일반 산업용 지관, 샘플 지관 및 기타 지관류 제품을 확인하고 문의하실 수 있습니다.\n제품별 공급 가능 수량, 단가, 납기 조건은 담당자 확인 후 안내되며, 거래는 견적서 및 전자세금계산서 발행 방식으로 진행됩니다.",
      searchPlaceholder: "제품명, 규격, 상태 검색...",
      approxPrice: "상담 협의",
      promoPrice: "특가 상담",
      btnInquireStock: "제품 공급 문의하기",
      badgeSurplus: "즉시 출고 가능",
      labelCondition: "상태",
      labelStockQty: "공급 가능 수량",
      labelStockPrice: "공급 조건",
      labelStockDesc: "제품 설명",
      panelAdminUnlock: "제품 관리자 권한 해제",
      btnRequestPrefill: "제품 공급 문의하기"
    },
    qualityPage: {
      badge: "MILITARY AND PRIVATE PACKAGING EXCELLENCE",
      title: "품질 및 정밀 제조 공정",
      desc: "전비 태세에 직결되는 서열 무결 보전 지환통 제조를 위해, 원재료 입고 수입 검사부터 나선 성형 각도 산출, 고온 건조 방습 증폭, 기밀 전수 진공 검사까지 한 치의 타협도 없는 전 공정 치수 보증을 이어가고 있습니다.",
      stepsHeader: "단계별 단위 제조 프로세스",
      stepsSub: "완벽한 방습 기밀 배리어를 만들기 위한 수원지관산업의 정교한 프레스 및 함침 공법입니다.",
      machineHeader: "주요 정밀 양산 제조 장비 현황",
      machineSub: "초고압 횡압 와인더와 자동 고속 유압식 정밀 컷터가 상시 작동 중입니다.",
      colModel: "보유 장비 및 기종 모델",
      colCap: "최대 가공 허용 사양",
      colQty: "가동 대수",
      colDesc: "핵심 공정 기능",
      envHeader: "엄격한 친환경 인증 및 프로세스",
      envSub: "친환경 생분해 포재 기준을 준수하며, 유해 화학 물질 일체를 철저히 배제합니다.",
      envPart1: "100% 생분해 가능 무독성 접료 배합",
      envPart2: "야전 장기 보존에 최적화된 왁스 코팅 보전 기술"
    },
    referencePage: {
      badge: "60 YEARS OF TRUSTED INTEGRITY",
      title: "60년 제조 경험으로 이어온 신뢰 네트워크",
      descBold: "수원지관산업은 60여 년간 축적해 온 지관 제조 기술과 품질관리 경험을 바탕으로 탄약 포장용 지환통 및 산업용 지관 분야에서 안정적인 제품을 공급해 왔습니다.",
      descLight: "군수품 포장 분야에서 요구되는 치수 정밀성, 내구성, 방습성, 조립성 등을 고려하여 고객 요구 규격에 맞춘 제품을 생산하고 있으며, 다양한 기관 및 기업과의 업무 경험을 바탕으로 신뢰받는 제조 파트너로 성장해 왔습니다.",
      segmentsTitle: "신뢰 협동 가치 분류",
      tableThOrg: "관련 정부부처 및 기관 명칭",
      tableThRole: "수행 업무 및 협력 역할",
      tableThClient: "주요 고객 및 파트너 기업",
      tableThBiz: "공동 개발 및 납품 제품 분야",
      section1Title: "정부 및 유관기관 협력 네트워킹",
      section1Desc: "대한민국 국방부, 국방기술품질원(DTaQ), 국방과학연구소(ADD) 등의 표준 검하 규격 및 연구 용역 경험을 구축하였습니다.",
      section2Title: "주요 체계 종합 방산기업 및 파트너사",
      section2Desc: "풍산, 한화 에어로스페이스 등 국내외 대표 종합 체계 업체에 군용 탄약 지환통 및 포장 보관 용기 부품들을 정밀 공급해 왔습니다.",
      disclaimerTitle: "국방 표준 및 대외 보안 준수 조항",
      disclaimerDesc: "본 페이지의 협력사 및 정부 실적 목록은 일반에 공개 가능한 계약 범위 내의 정보만을 수록하고 있으며, 국가 방위 보안 규정 및 하청 업체 준수 요구 조건을 완벽히 이행하고 있습니다. 상세 도면 및 전략 사양은 유선 승인 전에는 외부 유출이 엄격히 금지됩니다.",
      btnContactSub: "방산용 도면 보유 혹은 맞춤지관 견적이 필요하신가요?",
      btnContactText: "맞춤 규격 온라인 설계 및 문의 송신"
    },
    aboutPage: {
      badge: "HERITAGE & CORE DEFENSE SPIRIT",
      title: "주식회사 수원지관산업에 대하여",
      descBold: "수원지관산업은 1964년 창립 이래 60년이 넘는 세월 동안 군수용 탄약지환통과 산업용 정밀 지관 전문 제조의 길을 우직하게 걸어왔습니다.",
      descLight: "비록 오랜 역사를 가진 정통 중소 제조사이지만, 국가 방위력 증강과 방산 수출 확대의 숨은 주역으로서 국방 표준 품질을 완벽히 지켜내고 있습니다. 나선 와인딩 프레스 압밀 성형과 친환경 고밀도 방습 표면 처리 원천 기술력을 바탕으로, 전천후 극한 환경에서도 내용물을 안전하게 보관하는 완벽한 기밀 수송 보호통을 제조합니다.",
      philosophyTitle: "경영 가치관",
      phil1Title: "최고의 기술력과 장인 정신",
      phil1Desc: "60년 이상 축적된 정밀 나선 와인딩 기술로 불량률 0%를 목표로 합니다.",
      phil2Title: "완벽한 품질 보증 체계",
      phil2Desc: "실질적인 국방 규격 참고 치수 및 누설 검사 시트로 철저히 통제합니다.",
      phil3Title: "친환경 순환 자원 사용",
      phil3Desc: "100% 생분해 가능한 재생 자원을 사용하여 지속가능성을 실현합니다.",
      historyTitle: "수원지관산업 연혁",
      historySub: "지난 60년간 조국의 자주국방과 산업 기초 발전을 뒷받침해 온 땀방울의 연대기입니다.",
      allEras: "전체 연대",
      adminBtnText: "마스터 관리 등급 설정",
      adminCardTitle: "최고 보안 등급 해제",
      adminPlaceholder: "최고 마스터 물리 키보드 암호",
      adminVerifyBtn: "보안 해제",
      adminCloseBtn: "취소",
      adminNewPass: "새로 변경할 마스터 비밀번호 설정 (4자 이상)",
      adminConfirmPass: "새 암호 한번 더 똑같이 입력하여 확인",
      adminChangeBtn: "최고 암호 강제 업데이트"
    },
    contactPage: {
      badge: "INQUIRY BOARD & BILLING TERMS",
      title: "상담 신청 및 맞춤 수주",
      subtitle: "공급 제안 상세 서식",
      noticeTitle: "전자세금계산서 발행 및 은행 송금 거래 안내",
      noticeDesc: "본사는 기업 대 기업 거래(B2B) 위주 공정으로, 온라인 신용카드 결제 등은 제공하지 않습니다. 상호 합의 날인된 가인보이스를 통해 전자세금계산서 청구/영수 및 기업 계좌 이체 방식으로 거래대금을 수령하고 거래합니다.",
      formClassification: "문의 구분 *",
      formProductType: "제품 분류 *",
      formCompany: "회사명 / 상호 *",
      formContactName: "담당자명 *",
      formPhone: "연락처 *",
      formEmail: "이메일 주소 *",
      formProductName: "제품명 (희망 형상)",
      formQuantity: "희망 생산 수량",
      formDimensions: "치수 규격 사양 (DIMENSION SPECIFICATIONS - 선택사항)",
      formInnerDia: "내경 (ID - mm)",
      formOuterDia: "외경 (OD - mm)",
      formThickness: "두께 (T - mm)",
      formLength: "길이 (L - mm)",
      formHasBlueprint: "도면 보유 여부",
      formHasPhotos: "실물 사진 첨부 여부",
      formUploadArea: "실물 사진 & 도면 첨부파일 등록 (Drag & Drop or Click)",
      formUploadDesc: "도면 (DWG, DXF, PDF), 이미지 (JPG, PNG) 최대 3개 | 파일당 2.5MB 제한",
      formUploadDragText: "이곳에 파일을 드래그하여 놓거나 클릭하여 선택하세요",
      formComment: "상세 추가 요구사항 및 도면 가이드 조율",
      formSubmitBtn: "맞춤 가공 공급 상담 등록하기",
      successTitle: "문의 서식이 안전하게 접수되었습니다.",
      successDesc: "접수일자 기준 영업부 가치 통제 라인 검토 후 담당자가 신속히 기재하신 연락처 및 메일주소로 조명 단가 협약을 조율 전송하여 드리겠습니다.",
      alertMaxFiles: "이미 최대 개수(3개)의 파일이 첨부되어 있습니다.",
      alertFileCountLimit: "첨부파일은 최대 3개까지만 등록 가능합니다. 첫 개수만 임시 추가됩니다.",
      alertFileSizeLimit: "용량 초과. 2.5MB 이하의 파일만 첨부할 수 있습니다.",
      blueprintY: "Y (도면 있음)",
      blueprintN: "N (도면 없음)",
      photoY: "Y (있음)",
      photoN: "N (없음)",
      class1: "일반지관 가공 (Industrial/Standard Core)",
      class2: "탄약지환통 공급 협정 상담 (Ammunition Cube)",
      class3: "도면 제작 문의 (Custom Layout)",
      class4: "Surplus 특가 재고 협의",
      cat1: "일반 산업용 및 종이 롤 지관 (Industrial)",
      cat2: "탄약 포장용 지환통 포장재 (Military)",
      cat3: "특가 잔여 보유 물자 (Surplus Stock)",
      cat4: "기타 가공 특화 (Others)",
      placeCompany: "(주)수원지관산업, 개인 등",
      placeContact: "성함 및 직급 기재",
      placePhone: "010-0000-0000",
      placeEmail: "receive@company.com",
      placeProduct: "예: 3인치 지관 or 81밀리 탄약지환통 등",
      placeQty: "숫자 및 단위 (예: 500개)",
      placeComment: "나선 성형 목적, 상세 희망 공차 규격을 자유롭게 남겨주십시오.",
      anotherInquiryBtn: "새로운 문의 접수하기"
    }
  },
  en: {
    companyName: "SUWON PAPER CONE & TUBE MFG. CO., LTD.",
    companyNameEng: "SUWON PAPER CONE & TUBE MFG. CO., LTD.",
    mainTitle: "AMMUNITION FIBERBOARD CONTAINER SPECIALIST",
    mainTitleEng: "AMMUNITION FIBERBOARD CONTAINER SPECIALIST",
    mainSubtitle: "Responsive solutions from small to large-scale general industrial paper tubes.",
    mainDesc: "Since our establishment in 1964, SUWON PAPER CONE & TUBE CO. has specialized in precision-engineered spiral tube manufacturing. In the field of ammunition fiberboard containers, we produce highly reliable products designed for moisture resistance, mechanical durability, and strict dimensional tolerances while supporting target custom fabrication from design prints. We also provide responsive specifications for general industrial paper winding cores, sleeves, and parcel tubes from small to large sizes.",
    nav: {
      home: "HOME",
      products: "PRODUCTS",
      simulator: "CUSTOM SPEC",
      stock: "STOCK SALES",
      quality: "QUALITY",
      reference: "REFERENCES",
      about: "ABOUT",
      contact: "CONTACT",
      news: "K-Defense News"
    },
    contactInfo: {
      tel: "Phone: +82-31-353-7034",
      fax: "Fax: +82-31-353-7369",
      email: "Email: swpaper@hanmail.net",
      address: "Address: 679-14, Baran-ro, Hyangnam-eup, Manse-gu, Hwaseong-si, Gyeonggi-do, Republic of Korea",
      addressLabel: "679-14, Baran-ro, Hyangnam-eup, Manse-gu, Hwaseong-si, Gyeonggi-do, Republic of Korea",
      hours: "Operating Hours",
      hoursVal: "Weekdays 08:30 ~ 18:00 (Closed Weekends & National Holidays)"
    },
    footer: {
      desc: "SUWON PAPER CONE & TUBE MFG. CO., LTD. is a leading specialist in ammunition fiberboard packaging and small-to-large high-wall industrial winding cores. We operate modern automatic winders and precision fabrication equipment under rigorous process control.",
      copyright: "© 2026 SUWON PAPER CONE & TUBE MFG. CO., LTD. All Rights Reserved.",
      directions: "CONTACT & DIRECTIONS",
      telLabel: "Phone: +82-31-353-7034",
      faxLabel: "Fax: +82-31-353-7369",
      hqAddress: "HQ Factory: 679-14, Baran-ro, Hyangnam-eup, Manse-gu, Hwaseong-si, Gyeonggi-do, Republic of Korea",
      credentialsTitle: "CREDENTIALS & KEY PERFORMANCE",
      specialist: "Composite Spiral Tubes Specialist",
      trust60: "TRUST SINCE 1964",
      credentials: [
        "Mfg of multi-caliber military ammo fiberboard containers",
        "Expertise in mil-spec product development & custom orders",
        "Process management and QC aligned with military standards",
        "ISO 9001:2015 / ISO 14001:2015 certified QA active",
        "Established 1964: decades of spiral wound tube mastery",
        "Deep defense network with ROK MND & prime systems integrators"
      ]
    },
    home: {
      heroBadge: "SINCE 1964 • AMMUNITION FIBERBOARD SPECIALIST",
      customInquiryBtn: "Request Custom Quote",
      viewAmmoBtn: "View Product Catalog",
      specHeader: "Ammunition Tube Key Specifications",
      realProductTitle: "SUWON Ammunition Container",
      realProductSub: "Moisture & Durability Based Protection",
      designSpecLabel: "Design Standard",
      designSpecVal: "KDS Military Specifications Design",
      moistureLabel: "Moisture Barrier",
      moistureVal: "Resin Impregnated Protective Barrier",
      strengthLabel: "Structural Strength",
      strengthVal: "High-Strength Multi-Layer Spiral Tube",
      qualityLabel: "Quality Assurance",
      qualityVal: "Mil-Spec Based Process Quality Control",
      customQuantityConsult: "Custom Quantity & Sizing Inquiry Supported",
      sizesCustomisable: "Custom Sizes Available",
      partnersHeader: "MAJOR RECIPIENTS & DEFENSE PARTNERS",
      ammoTitle: "Ammunition Container (National Strategic Munitions)",
      ammoDesc: "Ammunition containers protect precision military munitions from moisture and shock during transit and storage. Supporting US MIL-SPEC/NATO requirements for all shells, they withstand extreme desert heat, humid tropical climates, coastal salt-fogs, and sub-zero winter chills. As a steadfast pillar of national defense, our containers have a proven record of chemical/structural stability—safeguarding live ammunition for over 30 years in real outdoor munitions depots without a single defect.",
      ammoPerf1Title: "Waterproof & MIL-SPEC/NATO Standard",
      ammoPerf1Desc: "Complied with MIL-SPEC/NATO. Reliable barrier protection against high humidity, desert heat, and corrosion.",
      ammoPerf2Title: "Stability & 30-Year Performance",
      ammoPerf2Desc: "Proven structural stability. Perfect preservation over 30 years under extreme 4-season climate spikes.",
      moreAmmoBtn: "Explore Supported Ammunition Calibers",
      industrialTitle: "General Industrial Paper Cores & Tubes",
      industrialDesc: "Leveraging our high-compressive winding technology honed through ammunition tube manufacturing, we fabricate a comprehensive range of industrial paper cores, winding tubes, and heavy sleeves. From miniature spools to multi-meter industrial structural sleeves, we maintain millimetric precision tolerances.",
      indCat1: "Miniature Spools",
      indCat1Desc: "Protected packaging for miniature electronic parts, film spools, small parcel mailing cases",
      indCat2: "Medium Winding",
      indCat2Desc: "Winding cores for standard textile fabrics, stretch films, laminating papers",
      indCat3: "Heavy-Duty Large",
      indCat3Desc: "High-gauge industrial sheet metal cores, heavy parcel mailing tubes, pile conduits",
      moreIndBtn: "Explore Industrial Tube Specifications",
      windingCard: "Winding Cores & Tubes",
      packagingCard: "Finished Premium Tubes & Canisters",
      ecoRibbon: "100% biodegradable recyclable kraft pulp materials & precision dimensional fabrication",
      simTitle: "Tube Dimensions Simulator",
      simDesc: "Visually model your required tube inner diameter, wall thickness, and length to instantly calculate estimated weight, material usage, and strength specs.",
      simBtn: "Launch Specifications Simulator",
      stockTitle: "Stock Clearance & Promo Sales",
      stockDesc: "Inquire about remaining factory-direct unreleased stocks, test batches, and excess materials at special discounted/clearance rates. (※ Corporate Account Tax Invoice Trades only)",
      stockBtn: "Check Available Stocks",
      qualityTitle: "Production Reliability Proven by Long Manufacturing History",
      qualityDesc: "Suwon Paper Cone & Tube operates a systematic quality control system across the entire production process of ammunition container manufacturing based on over 60 years of accumulated paper tube technology and defense packaging manufacturing experience.\n\nWe manage major manufacturing processes—from raw material verification and forming to moisture-proofing, precision cutting, assembly, and final shipping verification—with careful consideration for moisture resistance, durability, dimensional precision, and assembly stability demanded in defense-grade specifications.\n\nFurthermore, we continuously run internal performance compliance guidelines and process-specific validation frameworks to produce custom items that perfectly align with customer-provided schematics and requested defense standard requirements.",
      qualityStat1: "Over 60 Years of Paper Tube Tech",
      qualityStat2: "Defense Packaging Manufacturing",
      qualityStat3: "ISO 9001 / 14001 Standards",
      qualityBtn: "View Process & Quality Control",
      bottomTitle: "Technical Print-Based Custom Fabrication Inquiry",
      bottomDesc: "Submit your specific sizing parameters (inner diameter, wall thickness, overall length, etc.) through our digital inquiry form. We will review the specs and transmit custom volume pricing sheets.",
      bottomBtn: "Go to Inquiry Desk"
    },
    ammo: {
      badge: "AMMUNITION FIBERBOARD CONTAINER",
      title: "Ammunition Containers",
      showcaseLabel: "AMMUNITION TUBE SHOWCASE",
      subtitle: "SUWON High-Strength Ammunition Packaging",
      descBold: "Ammunition fiberboard containers are high-strength, functional protective packaging designed to safeguard military munitions from impacts, moisture, and extreme temperature fluctuations during transit, handling, and storage.",
      desc1: "With over 60 years of spiral winding expertise, Suwon Paper Cone manufactures highly reliable defense-geared packaging matching US MIL-SPEC and South Korean KDS 8140-4005 guidelines.",
      desc2: "Comprehensive in-house stages—from kraft roll feeding, vacuum wax coating, precision slitting, steel flange crimping, to airtight rubber-gasket cap assemblies—maximize long-term shell stability.",
      desc3: "Far beyond simple wrappers, these are hermetic vessels preserving firepower. We support 1:1 tailored custom fabrications for diverse diameters and overall lengths, backed by rich historical production runs and strict QA calibration logs.",
      desc4: "Engineered specifically to survive rugged field conditions, they prevent structural bending or degradation of chemical propellants under volatile climates, ensuring mission success.",
      noticeTitle: "Procurement Notice",
      noticeDesc: "This product line constitutes custom protective containers (empty packaging) available for industrial orders. To prevent regulatory confusion, we conduct trade consults solely under standard corporate agreements after confirming the target military application and specifications.",
      historyTitle: "Ammunition Winding & R&D Milestones",
      historyDesc: "A timeline of high-performance ammunition packaging manufactured in partnership with the Agency for Defense Development (ADD), Defense Agency for Technology and Quality (DTaQ), Hanwha Aerospace, Poongsan, and more.",
      tableThProduct: "Product Designation",
      tableThDev: "Development Year",
      tableThProd: "Production Period",
      perfTitle: "Key Performance Indicators",
      inquireProductBtn: "Request Ammo Sizing Consult"
    },
    industrialPage: {
      badge: "COORDINATED MANUFACTURING PORTFOLIO",
      title: "Industrial Paper Tubes & Cores",
      desc1: "Industrial winding and shipping tubes serve as indispensable baselines across textile, film extrusion, paper mills, and packing plants to spool raw materials evenly under massive rotational tension.",
      desc2: "Our high-pressure spiral-winding and thermal adhesion cures ensure that every cylinder withstands structural deflection, maintaining its form under extreme winding draws.",
      desc3: "We modify outer shell gauges, inner diameters, and lengths down to the millimeter to perfectly align with your factory spool reels. Crafted from 100% biodegradable recycled fibers.",
      card1Title: "Winding Cores & Tubes",
      card2Title: "Finished Premium Canisters",
      ribbonText: "100% Recyclable Eco-Friendly Raw Kraft Pulp & Precision Spindle Cutting",
      specHeader: "Industrial Specifications Overview",
      specSub: "Three primary manufacturing standards backed by decades of process calibration.",
      btnRequest: "Retrieve Custom Bid"
    },
    simulatorPage: {
      badge: "COMPREHENSIVE TUBE SIMULATION DATABASE",
      title: "Custom Sizing & Design",
      desc: "Retrieve standard dimensions from Korea's largest internal mold database. Model custom diameters, calculate expected unit weight, and approximate raw paper pulp requirements instantly.",
      warningTitle: "Structural limit notice",
      warningDesc: "Sizing lengths (L) over 1,800mm require custom vertical pressure stabilization and wide-span machine layouts, which may involve added manufacturing craft surcharges.",
      labelPreset: "1. Auto-Select Standard Core Molds",
      labelManual: "2. Input Custom Inner Diameter (ID)",
      placeholderManual: "Desired Inner Diameter (mm)",
      labelThickness: "Wall Thickness (T - mm)",
      labelLength: "Overall Length (L - mm)",
      labelQuantity: "Desired Volume (Quantity)",
      labelTreatment: "Airtight & Moisture Treatment Barrier",
      treatmentKraft: "Unprocessed Standard Kraft",
      treatmentWax: "High-Temp Outer Wax Coating",
      treatmentBarrier: "Vacuum Aluminum Foil Barrier",
      subGraphicTitle: "Real-time 3D CAD Cylinder Preview",
      subScale: "Mechanical Specifications",
      liveId: "Inner Diameter",
      liveOd: "Outer Diameter",
      liveThick: "Wall Thickness",
      liveLength: "Overall Length",
      analBadge: "ENGINEERING ANALYSIS",
      analTitle: "Simulation Quality & Material Audit",
      analSpecId: "Tube Gauge Spec",
      analWeight: "Expected Unit Weight",
      analTotalPaper: "Pulp Material Weight needed",
      analTotalQty: "Total Order Paper Mass",
      analStructural: "Est. Radial Deflection Strength",
      structuralStrong: "High (Suitable for multi-ton spooling)",
      structuralStandard: "Moderate (Great for general parcel/shipping)",
      structuralCustom: "Requires specific review",
      btnSubmitSpecs: "Import Simulation Stats to Proposal",
      outStructuralOpt: "Optimal (Excellent structural integrity)",
      outStructuralLight: "Lightweight (Suitable for light duty)",
      outStructuralHeavy: "Heavy Duty (High axial tension tolerance)",
      outStructuralCaution: "Caution (Prone to collapse, increase T)",
      sub: "Retrieve standard dimensions from Korea's largest internal mold database. Model custom diameters, calculate expected unit weight, and approximate raw paper pulp requirements instantly.",
      tabSelectMold: "Search Catalog",
      tabDirectInput: "Direct Custom Specs",
      listHeaderTitle: "108 Standard Mandrels Inventory",
      listHeaderSub: "Select matching mandrels to waive the expensive custom tooling setup cost and dramatically optimize your shipment lead time.",
      searchPlaceholder: "Search ID e.g. 76.3 or 100...",
      catAll: "Show All",
      catSmall: "Small (Ø10~40)",
      catMedium: "Medium (Ø40~100)",
      catLarge: "Large (Ø100+)",
      lblInnerDirect: "Desired Inner Diameter (ID)",
      lblThickness: "Wall Thickness (T - mm)",
      lblLength: "Overall Sizing Length (L - mm)",
      lblQty: "Target Quantity (PCS)",
      lblTreatment: "Airtight & Moisture Protection Layer",
      trtPlain: "Kraft Core",
      trtWax: "Outer Waxing",
      trtAlu: "Vacuum Alu Foil",
      outHeader: "Live Spec View (3D Isometric Model)",
      outId: "Inner Dia (ID)",
      outOd: "Outer Dia (OD)",
      outThick: "Thickness (T)",
      outMatchingTitle: "Ideal Match with Pre-Existing Tooling!",
      outMatchingNormal: "Custom Dimension Setup Configured",
      outWeightUnit: "Estimated Weight per Unit",
      outWeightTotal: "Bulk Estimated Weight for batch",
      outStructuralHeader: "Structural Stiffness Analysis",
      btnActionText: "Submit Sizing Custom Quote Inquiry",
      btnActionSub: "※ One-click synch attaches all custom parameters to our central client routing queue."
    },
    stockPage: {
      badge: "SURPLUS AND EXTRA STOCKS",
      title: "Direct Stock & Excess Inventory Sales",
      desc: "Secure unreleased pilot run, surplus, and test batch containers directly from our factory floor at heavily discounted cost-clearing pricing.",
      searchPlaceholder: "Search by title, size, status...",
      approxPrice: "Negotiable",
      promoPrice: "Promo Quote",
      btnInquireStock: "Request stock volume quote",
      badgeSurplus: "Factory-direct excess stock",
      labelCondition: "Condition",
      labelStockQty: "Available Qty",
      labelStockPrice: "Estimated Price",
      labelStockDesc: "Item Description",
      panelAdminUnlock: "Unlock Admin Desk",
      btnRequestPrefill: "Select and Inquire"
    },
    qualityPage: {
      badge: "MILITARY AND PRIVATE PACKAGING EXCELLENCE",
      title: "Precision Manufacturing & Quality Control",
      desc: "For ammunition protection where chemical preservation dictates safety, our entire floor operates under military inspection practices—monitoring tension draw, spiral bevels, moisture baking, and vacuum seals.",
      stepsHeader: "Step-by-Step Production Process",
      stepsSub: "Our highly calibrated winder and hot wax coating phases ensuring complete airtight seals.",
      machineHeader: "Core Production Machinery",
      machineSub: "High-tonnage automatic winders and CNC cutters running under active digital calibration.",
      colModel: "Machinery Designation",
      colCap: "Max Capacity Specifications",
      colQty: "Units",
      colDesc: "Core Functional Role",
      envHeader: "Strict Environmental Protocols",
      envSub: "We prioritize local ecology, avoiding volatile solvents and artificial toxins completely.",
      envPart1: "100% natural water-soluble eco glues",
      envPart2: "Biodegradable heat-infused protective paraffin barrier coatings"
    },
    referencePage: {
      badge: "60 YEARS OF TRUSTED INTEGRITY",
      title: "Our Trust & Collaborative Network",
      descBold: "For more than 60 years, Suwon Paper Cone has supplied highly stable protective products for defense agencies and national industrial plants.",
      descLight: "Our work covers critical dimensional requirements, ensuring mechanical toughness, moisture seals, and tight tolerances. This reliable delivery has positioned us as a trusted contract manufacturer.",
      segmentsTitle: "Collaboration Categories",
      tableThOrg: "Defense & Government Bodies",
      tableThRole: "Operational Role & Coordination",
      tableThClient: "Major Systems Integrators",
      tableThBiz: "Joint Development Projects",
      section1Title: "Government & Institutional Networking",
      section1Desc: "Establishing deep production and alignment portfolios conforming to the strict requirements of DTaQ, ADD, and public procurement.",
      section2Title: "Major Defense Systems Integrators & Industrial Corporates",
      section2Desc: "Highly reliable contract manufacturing and material supply lines for defense powerhouses like Poongsan, Hanwha Aerospace, and commercial agencies.",
      disclaimerTitle: "Military Confidentiality & Security Compliance Notice",
      disclaimerDesc: "The entities listed are part of non-classified contract scopes conforming strictly to Korean military defense security protocols. Direct drawings, MIL-SPEC blueprints, and sensitive product dimensional specifications are never released without formal counter-authorization.",
      btnContactSub: "Do you possess custom blueprints or require military-grade industrial estimates?",
      btnContactText: "Send Online Sizing Inquiry"
    },
    aboutPage: {
      badge: "HERITAGE & CORE DEFENSE SPIRIT",
      title: "About SUWON Paper Cone & Tube",
      descBold: "Since our modest beginning in 1964, SUWON PAPER CONE & TUBE has strictly specialized in manufacturing ammunition fiberboard sleeves and industrial composite cores.",
      descLight: "As a heritage-driven manufacturer, we are incredibly proud to support South Korea's national defense architecture. Utilizing robust spiral winding structures and custom environmentally safe moisture treatments, we engineer optimal protective vessels designed to safeguard ammunition under volatile climates.",
      philosophyTitle: "Corporate Philosophy",
      phil1Title: "Artisanal Manufacturing Pride",
      phil1Desc: "Targeting zero structural defects through deep winding mastery.",
      phil2Title: "Rigorous Safety Controls",
      phil2Desc: "Adhering strictly to reference military guidelines to guarantee reliability.",
      phil3Title: "Eco-Friendly Operations",
      phil3Desc: "Harnessing 100% biodegradable and recyclable materials for green growth.",
      historyTitle: "TIMELINE OF MILESTONES",
      historySub: "Sixty years of relentless labor protecting strategic assets and keeping industries moving.",
      allEras: "All Eras",
      adminBtnText: "Configure Access Codes",
      adminCardTitle: "Master Security Authorization",
      adminPlaceholder: "Master Passcode Key",
      adminVerifyBtn: "Authorize",
      adminCloseBtn: "Cancel",
      adminNewPass: "Configure New Master Passcode (Min 4 chars)",
      adminConfirmPass: "Confirm New Passcode",
      adminChangeBtn: "Update Master Code"
    },
    contactPage: {
      badge: "INQUIRY BOARD & BILLING TERMS",
      title: "Inquiry Desk & Custom Orders",
      subtitle: "Custom Specifications Proposal Form",
      noticeTitle: "B2B Trade & Corporate Invoicing Terms",
      noticeDesc: "We exclusively operate as a B2B manufacturer; online credit card payment gateways are not provided. All orders are processed via corporate bank transfers following the execution of official performance-guaranteed proforma invoices and electronic tax invoicing.",
      formClassification: "Inquiry Type *",
      formProductType: "Sector Classification *",
      formCompany: "Company Name *",
      formContactName: "Contact Persona *",
      formPhone: "Phone Number *",
      formEmail: "Email Address *",
      formProductName: "Target Product Name",
      formQuantity: "Target Quantity",
      formDimensions: "Sizing Specifications (Optional)",
      formInnerDia: "Inner Dia (ID - mm)",
      formOuterDia: "Outer Dia (OD - mm)",
      formThickness: "Thickness (T - mm)",
      formLength: "Length (L - mm)",
      formHasBlueprint: "Technical Print Available",
      formHasPhotos: "Product Photo Attached",
      formUploadArea: "Upload Diagrams and reference files (Drag & Drop or Click)",
      formUploadDesc: "PDF, DWG, DXF, JPG, PNG files, max 3 files | 2.5MB limit",
      formUploadDragText: "Drag files here to upload or select manually",
      formComment: "Specific requirements and engineering comments",
      formSubmitBtn: "Dispatch Specifications to Engineering",
      successTitle: "Proposal successfully logged",
      successDesc: "Our industrial sales department will review your specifications, verify tolerances, and transmit a detailed quotation sheet shortly.",
      alertMaxFiles: "You have reached the maximum allowance of 3 physical files.",
      alertFileCountLimit: "Allowed physical attachments capped at 3 files.",
      alertFileSizeLimit: "File size limit exceeded. Upload files under 2.5MB.",
      blueprintY: "Yes (Diagram exists)",
      blueprintN: "No (Blank/Co-design needed)",
      photoY: "Yes (Available)",
      photoN: "No",
      class1: "Industrial Core Manufacturing",
      class2: "Defense Ammunition Container",
      class3: "Co-design technical draft consultation",
      class4: "Surplus stock clearance",
      cat1: "Industrial winding paper tube (Industrial)",
      cat2: "Mil-spec ammunition fiber sleeve (Military)",
      cat3: "Discounted Surplus inventory (Surplus Stock)",
      cat4: "Special custom fabrication (Others)",
      placeCompany: "e.g., Hyundai Heavy, Siemens AG, Individual etc.",
      placeContact: "Your Full Name and Title",
      placePhone: "+82-10-0000-0000",
      placeEmail: "client@workplace.com",
      placeProduct: "e.g., 3-inch high-def film core or 120mm shell container",
      placeQty: "e.g., 1,500 units",
      placeComment: "Please specify target radial pressure constraints, exact tolerances, and overall purposes.",
      anotherInquiryBtn: "Log another inquiry"
    }
  },
  tr: {
    companyName: "SUWON PAPER CONE & TUBE MFG. CO., LTD.",
    companyNameEng: "SUWON PAPER CONE & TUBE MFG. CO., LTD.",
    mainTitle: "MÜHİMMAT AMBALAJI İÇİN SİLİNDİRİK FİBER KARTON KUTU UZMANI",
    mainTitleEng: "AMMUNITION FIBERBOARD CONTAINER SPECIALIST",
    mainSubtitle: "60 yılı aşkın birikimli mukavva masura ve spiral bobin boru imalatı teknolojisiyle, milli savunma sanayi ambalajlama sektöründe mühimmat silindirik ambalaj muhafaza kutuları üretmekteyiz.",
    mainDesc: "Suwon Paper Cone & Tube Mfg., mühimmatların depolanması, nakliyesi ve taşınması süreçlerinde gereksinim duyulan neme karşı yüksek direnç, mekanik dayanıklılık ve boyutsal kararlılığı gözeterek; mühimmatın uzun süreli saklama ömrünü ve sevkiyat güvenliğini artıran fonksiyonel fiber karton muhafazalar üretmektedir.\n\nMühimmatın değeri, güvenli koşullarda saklanmasıyla korunur. Suwon Paper Cone & Tube, bu değeri koruyan koruyucu ambalaj teknolojilerine odaklanmaktadır.",
    nav: {
      home: "ANA SAYFA",
      products: "ÜRÜNLER",
      simulator: "ÖZEL ÖLÇÜ",
      stock: "STOK SATIŞI",
      quality: "KALİTE",
      reference: "REFERANSLAR",
      about: "HAKKIMIZDA",
      contact: "İLETİŞİM",
      news: "K-Savunma Haberleri"
    },
    contactInfo: {
      tel: "Telefon: +82-31-353-7034",
      fax: "Faks: +82-31-353-7369",
      email: "E-posta: swpaper@hanmail.net",
      address: "Adres: 679-14, Baran-ro, Hyangnam-eup, Manse-gu, Hwaseong-si, Gyeonggi-do, Kore Cumhuriyeti",
      addressLabel: "679-14, Baran-ro, Hyangnam-eup, Manse-gu, Hwaseong-si, Gyeonggi-do, Kore Cumhuriyeti",
      hours: "Çalışma Saatleri",
      hoursVal: "Hafta içi 08:30 ~ 18:00 (Hafta sonu ve resmi tatillerde kapalıdır)"
    },
    footer: {
      desc: "Suwon Paper Cone & Tube Mfg. Co., Ltd., mühimmat ambalajı silindirik fiber kutuları ve her ebatta yüksek mukavemetli endüstriyel bobin boruları alanında lider bir üreticidir. Titiz süreç kontrolü altında otomatik spiral sarım hatları ve hassas işleme ekipmanları işletmekteyiz.",
      copyright: "© 2026 SUWON PAPER CONE & TUBE MFG. CO., LTD. Tüm Hakları Saklıdır.",
      directions: "İLETİŞİM BİLGİLERİ",
      telLabel: "Telefon: +82-31-353-7034",
      faxLabel: "Faks: +82-31-353-7369",
      hqAddress: "Merkez Fabrika: 679-14, Baran-ro, Hyangnam-eup, Manse-gu, Hwaseong-si, Gyeonggi-do, Kore Cumhuriyeti",
      credentialsTitle: "YETKİNLİKLER VE KALİTE GÖSTERGELERİ",
      specialist: "Kompozit Spiral Boru Uzmanı",
      trust60: "1964'TEN BERİ GÜVEN",
      credentials: [
        "Askeri çok çaplı mühimmat fiber boru üretimi",
        "Askeri standartlara göre ürün Ar-Ge ve özelleştirilmiş imalat",
        "Savunma Kalite Güvence Sistemi (DQMS) odaklı imalat yönetimi",
        "ISO 9001:2015 / ISO 14001:2015 tescilli kalite gözetimi",
        "Kuruluş 1964: Onlarca yıllık spiral karton sarım tecrübesi",
        "Savunma Müsteşarlığı ve ana yüklenicilerle işbirliği"
      ]
    },
    home: {
      heroBadge: "1964'TEN BERİ • MÜHİMMAT AMBALAJ SİLİNDİR BORU UZMANI",
      customInquiryBtn: "Özel Tasarım Teklif İste",
      viewAmmoBtn: "Ürünlerimizi İnceleyin",
      specHeader: "Mühimmat Kutusu Temel Özellikleri",
      realProductTitle: "Suwon Mühimmat Muhafaza Kutusu",
      realProductSub: "Nem ve Dayanıklılık Esaslı Muhafaza",
      designSpecLabel: "Tasarım Standardı",
      designSpecVal: "MIL-SPEC / KDS Askeri Şartnameleri",
      moistureLabel: "Nem Bariyeri",
      moistureVal: "Reçine Emprenyeli Koruyucu Nem Bariyeri",
      strengthLabel: "Yapısal Dayanım",
      strengthVal: "Yüksek Mukavemetli Çok Katmanlı Sarım",
      qualityLabel: "Kalite Güvence",
      qualityVal: "Mil-Spec Şartnamesine Dayalı Kalite Kontrolü",
      customQuantityConsult: "Siparişe Özel Ölçü ve Miktar Danışmanlığı",
      sizesCustomisable: "Ebat Özelleştirilebilir",
      partnersHeader: "KİLİT KURUMLAR VE SAVUNMA ORTAKLARI",
      ammoTitle: "Savaş Mühimmat Koruyucu Silindirik Muhafazaları",
      ammoDesc: "Mühimmat silindirik karton muhafazaları; depolama, taşıma ve kullanım süreçlerinde hassas patlayıcı unsurları ve mühimmat gövdesini nemden, yağmurdan ve fiziksel darbelerden güvenle koruyan yüksek performanslı askeri ambalaj sistemleridir. Suwon Paper Cone, ABD askeri MIL-SPEC ve NATO standartlarına uygun olarak tasarlanmış tüm mühimmat ebatlarını destekler. Çöl sıcaklarından nemli tropikal iklimlere, kıyı tuzu sislerinden dondurucu kış soğuklarına kadar tüm ekstrem çevre koşullarına dayanıklıdır. Kore savunma sanayiinin gururlu ortağı olarak muhafazalarımız, askeri depolarda 30 yılı aşan uzun vadeli beklemelerde dahi mühimmat yapısını ilk günkü gibi sarsıntısız ve kuru tutabildiğini sahada tescillemiştir.",
      ammoPerf1Title: "Su / Nem Bariyeri & MIL/NATO",
      ammoPerf1Desc: "ABD askeri MIL-SPEC ve NATO standartlarında tüm mühimmat tiplerine tam uyum. Çöl sıcağında ve nemli tropikal şartlarda üstün koruma.",
      ammoPerf2Title: "Bozulmaz Yapı & 30 Yıllık Mukavemet",
      ammoPerf2Desc: "Dört mevsim zorlu iklim döngülerine maruz kalan mühimmat depolarında 30 yılı aşkın süre bozulmadan yüksek koruma performansı.",
      moreAmmoBtn: "Desteklenen Mühimmat Çaplarını Gör",
      industrialTitle: "Endüstriyel Masuralar ve Spiral Rulolar",
      industrialDesc: "Askeri mühimmat muhafazalarındaki yüksek mukavemetli helisel sarım teknolojimizden yararlanarak; tekstil, plastik film, ambalaj sanayisi ve kargo taşımacılığı için her ebatta hassas mukavva masuralar üretmekteyiz. Küçük masuralardan metrelerce uzunluktaki rulo borulara kadar mükemmel milimetrik tolerans sağlıyoruz.",
      indCat1: "Minik / Küçük Ebat",
      indCat1Desc: "Hassas elektronik parça koruma masuraları, film, ribon sarım göbekleri ve kurye gönderi tüpleri",
      indCat2: "Orta Ebat Bobinler",
      indCat2Desc: "Tekstil kumaş rulo masuraları, esnek ambalaj, folyo ve teknik kağıt sarım göbekleri",
      indCat3: "Büyük Ağır Hizmet",
      indCat3Desc: "Ağır sanayi metalleri, sac levha, kargo taşıma silindirleri, beton döküm kalıpları",
      moreIndBtn: "Endüstriyel Masura Spesifikasyonlarını Gör",
      windingCard: "Endüstriyel Bobin & Masura",
      packagingCard: "Premium Özel Silindirik Kutular",
      ecoRibbon: "%100 Geri dönüştürülebilir biyo-bozunur kraft selülozu ve yüksek basınçlı helisel sarım",
      simTitle: "Karton Boru Ebat Simülatörü",
      simDesc: "Gerekli iç çap, et kalınlığı ve uzunluk ölçülerini girerek tahmini ağırlık, kağıt tüketimi ve mukavemet değerlerini anında görün ve teklif alın.",
      simBtn: "Ebat Simülatörüne Git",
      stockTitle: "Stok Fazlası & Hazır Ürün Fırsatları",
      stockDesc: "Fabrika stoklarımızda yer alan teslim edilmemiş hazır masuralar, deneme numuneleri ve standart ebatlı boruları indirimli fiyatlarla satın alın.",
      stockBtn: "Mevcut Stoğu Kontrol Et",
      qualityTitle: "Köklü Üretim Geçmişi ile Kanıtlanmış Üretim Güvenilirliği",
      qualityDesc: "Suwon Karton Masura, 60 yılı aşkın süredir biriktirdiği masura şekillendirme teknolojisi ve askeri mühimmat paketleme üretim tecrübesine dayanarak, mühimmat ambalajı üretiminin tüm süreçlerinde sistemli bir kalite kontrol düzeyi işletmektedir.\n\nMühimmatların depolanması, taşınması ve kullanımı esnasında talep edilen nem dayanımı, yüksek direnç, boyutsal hassasiyet ve montaj kararlılığı gibi askeri kriterleri göz önünde bulundurarak; hammadde kontrolü, sarım, neme karşı koruma, hassas kesme, birleştirme ve sevkiyat kalite kontrolleri dahil tüm ana üretim aşamalarını titizlikle yönetmekteyiz.\n\nAyrıca, müşteri teknik çizimleri ve talep edilen standartlar ile tam uyumlu ürün tedariki sağlamak amacıyla dahili üretim standartlarımızı ve prosese özel kalite denetim mekanizmalarimizi kesintisiz olarak aktif tutuyoruz.",
      qualityStat1: "60 Yılı Aşkın Masura Üretim Teknolojisi",
      qualityStat2: "Askeri Mühimmat Paketleme Deneyimi",
      qualityStat3: "ISO 9001 / 14001 Standartları",
      qualityBtn: "Kalite ve Üretim Yönetimini İncele",
      bottomTitle: "Teknik Çizim Odaklı Özel Üretim ve Fiyat Teklifi",
      bottomDesc: "Gerekli teknik ölçüleri (iç çap, et kalınlığı, uzunluk, ek katmanlar vb.) belirterek teklif formunu iletin. Uzman ekibimiz detaylı fiyatlandırma ve teknik incelemelerle size dönüş sağlayacaktır.",
      bottomBtn: "Teklif Talep Formuna Git"
    },
    ammo: {
      badge: "ASKERİ FİBER MÜHİMMAT KUTUSU",
      title: "Mühimmat Kutuları",
      showcaseLabel: "GÖRSEL MATRİS REHBERİ",
      subtitle: "Suwon Yüksek Mukavemetli Askeri螺旋Silindirik Borular",
      descBold: "Mühimmat silindirik fiber karton muhafazaları; depolama, taşıma ve kullanım süreçlerinde hassas patlayıcı unsurları ve mühimmat gövdesini nemden, yağmurdan ve fiziksel darbelerden güvenle koruyan yüksek performanslı askeri ambalaj sistemleridir.",
      desc1: "60 yılı aşkın karton spiral sarım birikimiyle Suwon Paper Cone, ABD askeri MIL-SPEC ve Kore KDS 8140-4005 şartnamelerine mükemmel uyum sağlayan savunma sanayii ambalajları üretir.",
      desc2: "Hammadde besleme, vakumlu parafin kaplama, dairesel dilimleme ve metal kapak entegrasyonu aşamaları tamamen yerli entegre tesislerimizde sıkı askeri toleranslara göre yürütülür.",
      desc3: "Mühimmat kutularımız basit koruyuculardan öte, mühimmatın kimyasal ve fiziksel stabilitesini 30 yılı aşkın süre koruyabilen test edilmiş özel muhafazalardır.",
      desc4: "Zorlu kış iklimlerinden çöl sıcaklarına kadar ekstrem dış ortam koşullarında, mühimmat ateşleme mekanizmalarını kusursuz ve nemsiz şekilde muhafaza eder.",
      noticeTitle: "Tedarik Dikkat Hususları",
      noticeDesc: "Bu gruptaki ürünler, askeri projelere yönelik boş kompozit muhafaza karton tüpleridir. Yasal karışıklıkları önlemek adına, yalnızca resmi savunma yüklenicileri ve askeri kurumlarla teknik onay sonrası sözleşmeli tedarik müzakereleri yürütülmektedir.",
      historyTitle: "Mühimmat Kutusu Ar-Ge ve Tarihsel Üretim Portföyü",
      historyDesc: "Savunma Geliştirme Enstitüsü (ADD), Savunma Kalite Güvence Ajansı (DTaQ), Hanwha, Poongsan ve diğer müttefik ana yüklenicilerle ortak geliştirilen mühimmat kutusu projelerimiz.",
      tableThProduct: "Ürün Tanımı ve Çapı",
      tableThDev: "Geliştirme Yılı",
      tableThProd: "Seri Üretim Dönemi",
      perfTitle: "Askeri Teknik Performans Kriterleri",
      inquireProductBtn: "Ebat ve Çap Danışmanlığı İste"
    },
    industrialPage: {
      badge: "ENDÜSTRİYEL SARMAL SİSTEMLER",
      title: "Endüstriyel Mukavva Masuralar ve Borular",
      desc1: "Endüstriyel spiral sarma masuraları; tekstil bobinaj, film ekstrüzyon hatları, kağıt fabrikaları ve kargo ambalajlama tesislerinde hammaddelerin bükülmeden, eşit tansiyonla sarılmasını sağlayan yaşamsal elemanlardır.",
      desc2: "Gelişmiş helisel sarım ve yüksek sıcaklıkta tutkal sertleştirme fırınlarımız sayesinde bobinlerimiz, devasa sargı gerilimlerine karşı gövde ezilmesi veya kırılması yaşamadan formunu korur.",
      desc3: "Üretim makinenizin mil ve aparat ebatlarına göre iç çap, et kalınlığı ve uzunluğu milimetrenin onda biri hassasiyetle üretiyoruz. %100 biyo-bozunur geri dönüştürülmüş lifler kullanılır.",
      card1Title: "Sanayi Bobin ve Masuraları",
      card2Title: "Özel Kapaklı Kargo/Tüp Kutuları",
      ribbonText: "%100 Doğa Dostu Kraft Selülozu ve Gelişmiş Hassas Ebat Dairesel Dilimleme",
      specHeader: "Endüstriyel Ürün Sınıfları",
      specSub: "Kullanım alanına ve uygulanan basınca göre ayarlanmış üç ana üretim segmentimiz.",
      btnRequest: "Endüstriyel Fiyat Teklifi Al"
    },
    simulatorPage: {
      badge: "KAPSAMLI KARTON EBAT SİMÜLATÖRÜ",
      title: "Ebat ve Özel Tasarım",
      desc: "İhtiyacınız olan iç çap, et kalınlığı ve uzunluk ölçülerini optimize edin. Türkiye ve Kore standartlarındaki en geniş kalıp veri tabanına göre ürün ağırlığını ve kağıt sarfiyatını anında hesaplayın.",
      warningTitle: "Yapısal sınır kılavuzu",
      warningDesc: "1,800 mm'yi aşan silindir borular, özel hidrolik dikey presleme ve geniş hat kalibrasyonu gerektirdiğinden ek işçilik maliyetlerine tabi olabilir.",
      labelPreset: "1. Standart İç Çap Kalıplarından Seçin",
      labelManual: "2. Özel İç Çap Değeri Girin (ID)",
      placeholderManual: "İstenen İç Çap Değeri (mm)",
      labelThickness: "Karton Et Kalınlığı (T - mm)",
      labelLength: "Toplam Boru Boyu (L - mm)",
      labelQuantity: "Talep Edilen Sipariş Miktarı",
      labelTreatment: "Koruyucu Nem Bariyer Katmanı",
      treatmentKraft: "İşlem Görmemiş Doğal Kraft",
      treatmentWax: "Sıcak Parafin/Balmumu Kaplama",
      treatmentBarrier: "Airtight Alüminyum Folyo Bariyeri",
      subGraphicTitle: "Canlı 3D Tasarım Teknik Resmi",
      subScale: "Sınai Ölçülendirme Parametreleri",
      liveId: "İç Çap",
      liveOd: "Dış Çap (Yaklaşık)",
      liveThick: "Boru Et Kalınlığı",
      liveLength: "Toplam Boy",
      analBadge: "MÜHENDİSLİK ANALİZLERİ",
      analTitle: "Simülasyon Mukavemet ve Hammadde Raporu",
      analSpecId: "Karton Masura Ölçü Sınıfı",
      analWeight: "Tahmini Birim Ağırlığı",
      analTotalPaper: "Gerekli Selüloz Hammadde Ağırlığı",
      analTotalQty: "Toplam Sipariş Kağıt Tonajı",
      analStructural: "Radyal Basınç Direnç Seviyesi",
      structuralStrong: "Yüksek (Ağır bobin sarımlarına uygun)",
      structuralStandard: "Orta (Standart kargo ve ambalaj için)",
      structuralCustom: "Özel mühendislik incelemesi gerekir",
      btnSubmitSpecs: "Simülasyon Verileriyle Teklif Talep Et",
      outStructuralOpt: "Optimal (Yüksek mukavemet seviyesi)",
      outStructuralLight: "Hafif (Hafif ambalajlar için uygun)",
      outStructuralHeavy: "Ağır Hizmet (Yüksek dikey yük kapasitesi)",
      outStructuralCaution: "Dikkat (Yorulma ve çökme riski, et kalınlığını artırın)",
      sub: "İhtiyacınız olan iç çap, et kalınlığı ve uzunluk ölçülerini optimize edin. Türkiye ve Kore standartlarındaki en geniş kalıp veri tabanına göre ürün ağırlığını ve kağıt sarfiyatını anında hesaplayın.",
      tabSelectMold: "Hazır Kalıplarda Ara",
      tabDirectInput: "Özel Ölçü Gir",
      listHeaderTitle: "Mevcut 108 Hazır Kalıp Listesi",
      listHeaderSub: "Hazır kalıplarımızdan seçim yapmak ekstra kalıp döküm maliyetini sıfırlar ve teslimat süresini önemli ölçüde kısaltır.",
      searchPlaceholder: "İç çap ara örn: 76.3 veya 100...",
      catAll: "Tümü",
      catSmall: "Küçük (Ø10~40)",
      catMedium: "Orta (Ø40~100)",
      catLarge: "Büyük (Ø100+)",
      lblInnerDirect: "Karton İç Çapı Değeri (ID)",
      lblThickness: "Karton Et Kalınlığı (T - mm)",
      lblLength: "Boru Toplam Uzunluğu (L - mm)",
      lblQty: "Talep Edilen Miktar (Adet)",
      lblTreatment: "Dış Gövde Nem Koruma Katmanı",
      trtPlain: "İşlemsiz Kraft",
      trtWax: "Parafin Kaplama",
      trtAlu: "Alüminyum Folyo",
      outHeader: "Canlı 3B Şematik Gösterim",
      outId: "İç Çap (ID)",
      outOd: "Dış Çap (OD)",
      outThick: "Et Kalınlığı (T)",
      outMatchingTitle: "Suwon Hazır Kalıpları ile Tam Eşleşme!",
      outMatchingNormal: "Özel Ölçüde Sınai Üretim Planlaması",
      outWeightUnit: "Birim Başına Tahmini Ağırlık",
      outWeightTotal: "Toplam Sipariş Ağırlığı",
      outStructuralHeader: "Yapısal Dayanım ve Yük Analizi",
      btnActionText: "Bu Teknik Ölçülerle Fiyat Teklifi Al",
      btnActionSub: "※ Tek tıkla tüm simülasyon ölçüleriniz bizzat fabrikayla paylaşılır."
    },
    stockPage: {
      badge: "RESERVE STOK SATIŞLARI",
      title: "Hazır Stok & Prototip Malzeme Satışı",
      desc: "Üretim fazlası, test serileri veya teslim edilmemiş standart ebatlı spiral karton boruları doğrudan fabrika depomuzdan indirimli birim fiyatlarla sipariş edin.",
      searchPlaceholder: "Ürün ismi, ebat, kalite durumuna göre ara...",
      approxPrice: "Görüşülür",
      promoPrice: "Promosyonlu Fiyat",
      btnInquireStock: "Seçili stok için teklif iste",
      badgeSurplus: "Fabrika Deposu Stok Fırsatı",
      labelCondition: "Kalite Durumu",
      labelStockQty: "Mevcut Miktar",
      labelStockPrice: "Öngörülen Fiyat",
      labelStockDesc: "Açıklama Detayları",
      panelAdminUnlock: "Yönetici Panelini Aç",
      btnRequestPrefill: "Seç ve Bilgi Al"
    },
    qualityPage: {
      badge: "SAVAŞ SANAYİİ VE SINAİ AMBALAJ STANDARTLARI",
      title: "Gelişmiş Üretim fırınları & Kalite Yönetimi",
      desc: "Propellant kimyasallarının bozulmadan saklanması gereken mühimmat kutularında sıfır hata prensipleriyle çalışıyor; sıcak parafin kürleri, nem fırınlaması ve vakumlu sızdırmazlık testleri uyguluyoruz.",
      stepsHeader: "Adım Adım Helisel İmalat Süreci",
      stepsSub: "Hassas dairesel bıçaklarımız ve hermetik sızdırmazlık aparatlarımızla yürütülen ileri teknoloji adımlar.",
      machineHeader: "İmalat Makine Parkurumuz",
      machineSub: "CNC hassas kesim aparatları ve yüksek torklu helisel spiral sarım üniteleri.",
      colModel: "Makine / Ekipman Tanımı",
      colCap: "Maksimum İşleme Kapasitesi",
      colQty: "Adet",
      colDesc: "Süreçteki Kritik Görevi",
      envHeader: "Ekolojik Üretim Hassasiyetleri",
      envSub: "Doğal yaşamı ve çevremizi korumak amacıyla ağır uçucu kimyasalları ve solventleri tamamen eliyor, çevre lisanslı geri dönüşüm süreçleri yürütüyoruz.",
      envPart1: "Suda çözünebilen %100 zehirsiz doğal mısır nişastası bazlı tutkallar",
      envPart2: "Uzun yıllar askeri hangarlarda çürüme önleyici doğada çözünür parafin kaplamalar"
    },
    referencePage: {
      badge: "1964'TEN BERİ GÜVEN",
      title: "Kurumsal Referanslar ve İş Ortaklarımız",
      descBold: "60 yılı aşkın süredir Suwon Paper Cone; ulusal savunma sanayi şirketlerine, kimya tesislerine ve ama metal ambalaj üreticilerine yüksek mukavemetli spiral borular tedarik etmektedir.",
      descLight: "Askeri şartnamelere uyum sağlama kabiliyetimiz, sıkı boyutsal toleranslar sunabilmemiz ve yüksek nem direncimiz bizi ana savunma müteahhitlerinin ve endüstrinin güvenilir ortağı kılmıştır.",
      segmentsTitle: "Sektörel İşbirliği Ağımız",
      tableThOrg: "Savunma & Devlet Kurumları",
      tableThRole: "Sorumluluk Alanı ve Koordinasyon",
      tableThClient: "Havacılık, Kimya ve Sanayi Devleri",
      tableThBiz: "Ortak Geliştirilen Ürün / Proje",
      section1Title: "Devlet ve Kurumsal Savunma İşbirlikleri",
      section1Desc: "Güney Kore Savunma Bakanlığı, DTaQ ve ADD standartlarına uygun yüksek askeri güvence düzeyine sahip ortak imalatlar.",
      section2Title: "Ana Savunma Sanayi ve Kimya Ambalaj Devleri",
      section2Desc: "Poongsan, Hanwha Aerospace ve ulusal sanayi kuruluşları için mühimmat fiber koruyucu muhafazaları ve dairesel boru imalatı.",
      disclaimerTitle: "Askeri Güvenlik ve Gizlilik Taahhütnamesi",
      disclaimerDesc: "Yukarıda belirtilen referanslar, gizlilik dışı askeri ambalaj tedariki kapsamında yer almakta olup ulusal savunma güvenliği protokollerine tam uyum sağlar. Gizli teknik dökümanlar ve kalibre ölçüleri yazılı resmi onay olmaksızın paylaşılamaz.",
      btnContactSub: "Özel askeri teknik resimleriniz için fiyat teklifi mi istiyorsunuz?",
      btnContactText: "Sipariş ve Ebat Görüşmesi Başlat"
    },
    aboutPage: {
      badge: "MİRAS VE ASKERİ GÜVEN RUHU",
      title: "Suwon Paper Cone & Tube Hakkında",
      descBold: "1964 yılındaki kuruluşumuzdan bu yana SUWON PAPER CONE & TUBE olarak yalnızca mühimmat silindirik koruyucu boruları ve endüstriyel mukavemetli mukavva masuralar alanına odaklandık.",
      descLight: "Zorlu dış iklim dalgalanmalarına, çöl nemsizliğine ve deniz tuzu korozyonuna karşı mühimmatları 30 yılı aşkın süre koruyan muhafazalarımız yüksek düzeyde helisel sıkıştırma ve gelişmiş organik nem bariyeri tekniklerine dayanır. Hem Kore Cumhuriyeti ordusunun hem de küresel sivil sektörün vazgeçilmez ambalaj üreticileriyiz.",
      philosophyTitle: "Kurumsal Değerlerimiz",
      phil1Title: "Zanaat ve Endüstriyel Gurur",
      phil1Desc: "Helisel sarımda kusursuz gerilim kontrolüyle sıfır hata hedefi.",
      phil2Title: "Sıkı Güvence Standartları",
      phil2Desc: "Askeri MIL-SPEC gereksinimlerini üretim aşamalarında eksiksiz uygulayarak güven sağlama.",
      phil3Title: "Doğa Dostu Yaklaşımlar",
      phil3Desc: "%100 çözünebilir kağıt lifleri ve yeşil enerji döngüsü.",
      historyTitle: "DÖNÜM NOKTALARI KRONOLOJİSİ",
      historySub: "Stratejik mühimmatları korumak ve makine çarklarını döndürmek için geçen altmış gururlu yıl.",
      allEras: "Tüm Tarih",
      adminBtnText: "Yönetici Erişim Ayarları",
      adminCardTitle: "Yüksek Güvenlik Yetkilendirmesi",
      adminPlaceholder: "Ana Yetki Şifresi",
      adminVerifyBtn: "Yetkilendir",
      adminCloseBtn: "İptal",
      adminNewPass: "Yeni Ana Şifreyi Ayarla (En az 4 karakter)",
      adminConfirmPass: "Yeni Şifreyi Doğrula",
      adminChangeBtn: "Şifreyi Güncelle"
    },
    contactPage: {
      badge: "İLETİŞİM VE ANLAŞMA PROTOKOLLERİ",
      title: "Talep ve Sipariş Yönetimi",
      subtitle: "Teknik Ölçülendirme ve Sipariş Formu",
      noticeTitle: "B2B Kurumsal Ticaret ve Faturalandırma Kuralları",
      noticeDesc: "Şirketimiz yalnızca kurumsal B2B ticaretine odaklanmıştır; web sitemiz üzerinden kredi kartlı anlık ödemeler kabul edilmemektedir. Tüm sevkiyatlar, karşılıklı proforma fatura teatisini müteakip kurumsal banka havalesi ve elektronik fatura kesilerek gerçekleştirilir.",
      formClassification: "İrtibat Konusu *",
      formProductType: "Sektörel Sınıflandırma *",
      formCompany: "Firme / Kurum Adı *",
      formContactName: "Iletişim Kurulacak Kişi *",
      formPhone: "Telefon Numarası *",
      formEmail: "E-Posta Adresi *",
      formProductName: "Talep Edilen Ürün Adı",
      formQuantity: "İstenen Sipariş Adeti",
      formDimensions: "Boyutsal Ölçüler (Opsiyonel)",
      formInnerDia: "İç Çap (ID - mm)",
      formOuterDia: "Dış Çap (OD - mm)",
      formThickness: "Et Kalınlığı (T - mm)",
      formLength: "Boru Boyu (L - mm)",
      formHasBlueprint: "Teknik Çizim / Cad Dosyası Var",
      formHasPhotos: "Numune Fotoğrafı Var",
      formUploadArea: "Şema, CAD çizimi ve resimleri bu alana yükleyin (Sürükleyin veya Tıklayın)",
      formUploadDesc: "PDF, DWG, DXF, JPG, PNG formatları, maks 3 dosya | Belge başı maks 2.5MB",
      formUploadDragText: "Dosyaları buraya sürükleyin veya manuel seçin",
      formComment: "Ek Açıklamalar ve Özel İstekleriniz",
      formSubmitBtn: "Teknik Formu Mühendislik Departmanına Gönder",
      successTitle: "Talebiniz başarıyla kaydedilmiştir",
      successDesc: "Müşteri ilişkileri ekibimiz ve üretim mühendislerimiz ebatları inceleyerek tarafınıza resmi detaylı teklif mektubu ve termin planı iletecektir.",
      alertMaxFiles: "Maksimum limit olan 3 fiziksel dosya yüklemesini doldurdunuz.",
      alertFileCountLimit: "Eklenebilecek maksimum fiziksel dosya adeti 3'tür.",
      alertFileSizeLimit: "Dosya boyutu çok büyük. Lütfen 2.5MB'in altındaki belgeleri yükleyin.",
      blueprintY: "Evet (Teknik çizim mevcut)",
      blueprintN: "Hayır (Mühendis tarafından çizilmeli)",
      photoY: "Evet (Mevcut)",
      photoN: "Hayır",
      class1: "Sınai Mukavva Masura Üretimi",
      class2: "Askeri Mühimmat Fiber Ambalajı",
      class3: "Teknik Ortak Tasarım & CAD Danışmanlığı",
      class4: "Stok Fazlası Alım Talebi",
      cat1: "Endüstriyel bobin sarma borusu (Industrial)",
      cat2: "Askeri mühimmat fiber muhafazası (Military)",
      cat3: "Depo stok fazlası karton masura (Surplus Stock)",
      cat4: "Özel tasarım silindirik kutu üretimi / Diğer (Others)",
      placeCompany: "Örn: Aselsan, Vestel A.Ş, Şahsi vb.",
      placeContact: "Adınız, Soyadınız ve Ünvanınız",
      placePhone: "+90-500-000-0000",
      placeEmail: "musteri@kurum.com",
      placeProduct: "Örn: 3 inö yüksek devirli film masurası veya 120mm mühimmat kutusu",
      placeQty: "Örn: 1,500 adet",
      placeComment: "Lütfen maruz kalacağı radyal gerilimleri, aranan milimetre toleranslarını ve kullanım amacını detaylandırın.",
      anotherInquiryBtn: "Yeni bir talep kaydet"
    }
  }
};
