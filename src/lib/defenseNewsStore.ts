/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, doc, setDoc, deleteDoc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "./googleWorkspace";

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
  isCustom?: boolean;
  updatedAt?: string;
}

export const DEFAULT_DEFENSE_NEWS: DefenseNewsItem[] = [
  {
    "id": "news-fact-20260822-12",
    "tab": "global",
    "category": "방산 정책",
    "title": "일본 정부, 방산기업 주주된다… 방위산업 공급망 강화 위해 직접 출자 검토",
    "summary": "일본 방위성이 방산 제조 기반 유지와 핵심 기술 유출 방지를 위해 민간 방산기업에 정부가 직접 출자하는 방안을 검토 중입니다.\n국가 안보 공급망을 정부 차원에서 직접 지원하고 생산 라인 가동률을 보장하려는 조치입니다.\n동아시아 지역의 국방 공급망 내재화 및 전략물자 비축 기조가 한층 강화되고 있습니다.",
    "source": "Daum / 종합뉴스",
    "date": "2026-08-22",
    "url": "https://v.daum.net/v/20260822093128457",
    "imageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "일본 정부가 민간 방산기업 직접 출자를 통해 국방 제조업 기반 강화와 공급망 내재화를 본격 추진합니다.",
    "bodyText": "일본 정부는 방위력 근본 강화를 위해 방산 장비 및 부품을 제조하는 민간 기업에 정부 기금을 통해 지분을 직접 출자하거나 자본을 지원하는 정책을 검토하고 있습니다. 채산성 악화로 방산 부문에서 철수하는 중소 협력사를 보호하고 전시 탄약 및 부품 생산 능력을 상시 유지하기 위한 전략으로, 전 세계적으로 국방 공급망이 '국가 전략 자산'으로 다루어지고 있음을 시사합니다.",
    "perspective": "각국의 방산 공급망 내재화 정책 속에서도 포탄·탄약의 정밀 포장 및 보관 자재는 호환성과 규격 검증이 핵심입니다. NATO 및 MIL-SPEC 규격을 만족하며 반세기 동안 국방 조달 품질을 입증해 온 당사의 탄약지환통 제조 기술은 해외 정부 및 방산 클러스터와의 협력에서도 높은 신뢰도를 제공합니다."
  },
  {
    "id": "news-fact-20260821-9",
    "tab": "domestic",
    "category": "방산 공급망",
    "title": "LG엔솔, 美 방산업 진입?…\"제안 검토 중\"",
    "summary": "LG에너지솔루션이 미국 국방 공급망 진입을 위한 군용 배터리 공급 제안을 검토 중입니다.\n미국 국방부의 중국산 배터리 조달 금지 조치로 인해 한국산 표준 규격 배터리 수요가 급증하고 있습니다.\n군용 드론, 무인 차량 및 특수 장비의 전력 공급망 다변화가 본격화되고 있습니다.",
    "source": "조선비즈",
    "date": "2026-08-21",
    "url": "https://biz.chosun.com/industry/company/2026/08/21/TJ7ODBTVXVHK5CGFUCHML7CV7M/",
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "미국의 중국산 배터리 배제 정책에 따라 K-배터리의 군용 드론 및 무인 무기체계 공급망 진입이 가시화되고 있습니다.",
    "bodyText": "미국 국방수권법(NDAA)에 따라 2027년부터 중국 6대 업체의 배터리 조달이 전면 금지되면서, 미국 정부 및 방산 체계업체들이 한국 배터리 기업과의 협력을 타진하고 있습니다. LG에너지솔루션은 2170 원통형 배터리 등 표준화된 배터리를 군용 수송 드론 및 무인 지상 장비에 즉시 공급할 수 있는 기술력을 보유하고 있어, K-방산 전자·부품 공급망의 미국 국방 조달 시장 진출이 가속화될 전망입니다.",
    "perspective": "드론 및 무인체계용 군용 배터리·전자부품 수송 및 보관 시 완충, 방습, 정밀 절연 패키징의 중요성이 증대됩니다. 탄약뿐만 아니라 고밀도 에너지원 및 전자모듈을 외부 충격과 환경 변화로부터 보호할 수 있는 고강도 방습·난연 탄약지환통 및 특수 포장 솔루션 개발로 당사의 방산 사업 영역을 다각화할 수 있습니다."
  },
  {
    "id": "news-fact-20260819-11",
    "tab": "global",
    "category": "탄약 수요",
    "title": "미 국방부 및 미 의회, 13개 핵심 탄약·미사일 대상 '다년 계약' 확대 추진",
    "summary": "미국 의회와 펜타곤이 PAC-3, THAAD, 토마호크 등 13개 핵심 탄약·미사일에 대해 다년 조달 계약(Multiyear Procurement)을 추진합니다.\n단년도 예산의 불확실성을 해소하고 방산 제조사들의 대규모 설비 투자와 공급망 확충을 유도합니다.\n글로벌 탄약 재고 부족 사태를 해결하기 위한 장기 안정 생산 체계가 정착될 전망입니다.",
    "source": "CFR Defense Analysis",
    "date": "2026-08-19",
    "url": "https://www.cfr.org/reports/out-of-ammo-a-two-year-sprint-to-rebuild-the-american-arsenal-and-deter-china",
    "imageUrl": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "미국 정부가 패트리어트 및 유도탄약 등 13개 핵심 무기체계에 다년 계약을 도입하여 탄약 공급망의 장기 안정성을 구축합니다.",
    "bodyText": "미국 외교협회(CFR) 보고서 및 국방수권법(NDAA) 개정안에 따르면, 펜타곤은 유도탄약 및 주요 미사일 공급망의 생산 예측 가능성을 높이기 위해 13개 핵심 무기체계에 대한 다년 계약 권한을 적극 추진하고 있습니다. 이는 단기 계약으로 인한 협력업체들의 설비 투자 지연을 방지하고 장기적인 생산 캐파를 확보하기 위한 조치로, 미국 및 동맹국 공급망 전반에 걸쳐 탄약 부품 수급 계약이 장기화될 것으로 보입니다.",
    "perspective": "글로벌 탄약 조달 방식이 '다년 장기 계약'으로 전환되는 것은 대량 양산 설비와 안정된 품질 관리 역량을 갖춘 1·2차 협력업체에 큰 기회입니다. 월 100만 개 이상의 탄약지환통 대량 양산 라인을 보유한 당사는 글로벌 체계업체의 장기 공급망(LTA) 파트너로서 최적의 공급 안정성을 입증할 수 있습니다."
  },
  {
    "id": "news-fact-20260814-10",
    "tab": "domestic",
    "category": "국방 조달",
    "title": "방사청, 탄도수정신관 체계개발 우선협상대상에 한화에어로 선정",
    "summary": "방위사업청이 155mm 포탄 등의 명중률을 획기적으로 높이는 탄도수정신관 체계개발 우선협상대상자로 한화에어로스페이스를 선정했습니다.\n재래식 포탄에 정밀 유도 기능을 부여하여 작전 효율성과 화력 집중도를 극대화합니다.\nK-방산 탄약체계의 고부가가치화 및 글로벌 정밀탄약 수출 경쟁력이 대폭 강화됩니다.",
    "source": "뉴스1",
    "date": "2026-08-14",
    "url": "https://www.news1.kr/diplomacy/defense-diplomacy/6259109",
    "imageUrl": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "한화에어로스페이스가 탄도수정신관 개발 우선협상대상자로 선정되며 155mm 등 재래식 포탄의 스마트 정밀 탄약화가 본격화됩니다.",
    "bodyText": "방위사업청이 추진하는 탄도수정신관(CCK) 체계개발 사업에 한화에어로스페이스가 우선협상대상자로 선정되었습니다. 탄도수정신관은 기존 155mm 곡사포탄의 신관 위치에 장착되어 GPS 유도를 통해 비행 궤도를 실시간 수정함으로써 명중 오차를 획기적으로 줄이는 첨단 무기체계입니다. 이를 통해 포탄 소모량을 절감하고 K9 자주포 및 천무 등과의 연계 화력 수출 경쟁력을 크게 향상시킬 것으로 기대됩니다.",
    "perspective": "포탄에 정밀 전자 센서 및 유도 날개가 결합된 탄도수정신관이 적용되면, 탄약 보관 및 수송 시 신관부 충격 완화와 방습 규격 요구 수준이 기존 일반 포탄 대비 크게 엄격해집니다. 당사의 MIL-SPEC 기준 고정밀 탄약지환통 씨밍 기술과 내충격성 탄약지환통 설계 역량은 정밀 유도 탄약의 신뢰성 보장을 위한 필수 파트너십 요소입니다."
  },
  {
    "id": "news-fact-20260805-5",
    "tab": "domestic",
    "category": "국방 조달",
    "title": "방위사업청, '소총에서 위성까지'...국방과학연구소 창립 56주년 및 첨단 무기·탄약 체계 자립 가속화",
    "summary": "국방과학연구소(ADD)가 창립 56주년을 맞아 자주국방 첨단 무기체계 및 핵심 탄약 R&D 성과를 발표했습니다.\n소총과 재래식 탄약부터 위성·유도무기·첨단 소재에 이르기까지 K-방산 핵심 기술 자립을 가속화합니다.\n국방부 및 방사청과의 협력을 통해 국내 방산 생태계 육성 및 기술 이전 지원을 대폭 강화합니다.",
    "source": "서울포커스",
    "date": "2026-08-05",
    "url": "https://www.seoulfocus.kr/news/articleView.html?idxno=306427",
    "imageUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "ADD 창립 56주년을 맞아 재래식 탄약·무기부터 최첨단 유도무기까지 K-방산 핵심 기술 국산화 및 독자 R&D가 가속화됩니다.",
    "bodyText": "방위사업청과 국방과학연구소(ADD)가 창립 56주년을 맞이하여 자주국방 기술 자립과 글로벌 K-방산 육성 성과를 발표했습니다. 과거 소총 및 재래식 탄약지환통·포장 규격 자립에서 시작해, 현재 위성, 감시정찰, 고성능 유도탄약 및 복합소재에 이르기까지 첨단 국방 R&D를 총괄하며 국내 방산 협력업체들과의 기술 이전 및 품질 고도화 프로젝트를 확대 추진하고 있습니다.",
    "perspective": "국방과학연구소와의 지속적인 핵심기술 R&D 협력 및 MIL-SPEC 기준 탄약지환통 고도화 과제 추진은 당사의 기술 경쟁력을 증명하는 주요 자산입니다. 국산 탄약 및 무기체계의 신뢰성을 확보하기 위한 정밀 탄약지환통 소재 연구개발 및 품질 인증 체계를 더욱 강화해 나가야 합니다."
  },
  {
    "id": "news-fact-20260805-6",
    "tab": "domestic",
    "category": "국내 방산기업",
    "title": "시스트란, 국방·방산 특화 보안 AI 솔루션 발표… K-방산 보안 및 군수 데이터 통합 강화",
    "summary": "방산 특화 AI·소프트웨어 기업 시스트란이 국방 고보안 시장을 위한 온프레미스 AI 솔루션을 출시했습니다.\n군수 데이터, 방산 기술 도면 및 수출 관련 문서의 기밀 유출을 방지하는 자체 보안 체계를 제공합니다.\n올해 12월 킨텍스에서 열리는 국내 최대 지상군 방산전시회 'K-DEX 2026'에서 대대적으로 공개될 예정입니다.",
    "source": "ZDNet Korea",
    "date": "2026-08-05",
    "url": "https://zdnet.co.kr/view/?no=20260804104358",
    "imageUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "국방·방산 분야의 도면 및 생산 데이터 기밀 보호를 위한 방산 특화 온프레미스 AI 및 보안 솔루션 도입이 확대됩니다.",
    "bodyText": "방산 보안 및 군수 데이터 관리가 K-방산 수출의 핵심 과제로 부상함에 따라, 외부 유출 위험을 차단하는 국방 특화 온프레미스 AI 솔루션이 개발되었습니다. 방산 대기업 및 부품 협력업체의 생산 도면, 국방 규격서, 공정 로그 등 기밀 데이터를 자체 망 내에서 안전하게 관리·번역·분석할 수 있도록 지원하며, 국내 최대 지상군 방산전시회인 K-DEX 2026을 통해 방산 생태계 전반으로 보급될 전망입니다.",
    "perspective": "탄약지환통 및 방산물자 생산 공정 데이터, 도면 관리 시 국방 보안 규격 준수는 필수적입니다. 당사의 ERP/MES 데이터베이스 및 연구소의 방산 규격서를 안전하게 보호하고 스마트 공장 관리를 보안화하는 국방 데이터 기술 적용을 적극 검토할 필요가 있습니다."
  },
  {
    "id": "news-fact-20260805-7",
    "tab": "global",
    "category": "탄약 수요",
    "title": "미 육군, 소형 드론 격추용 차세대 지대공 미사일(Next Gen C-sUAS) 긴급 개발·획득 착수",
    "summary": "미 육군이 고고도·사거리 16km 이상에서 소형 드론(Group 2/3 sUAS)을 격추할 차세대 지대공 미사일 획득에 착수했습니다.\n우크라이나 및 중동 전장의 드론 위협 급증에 대응하여 빠른 반응속도의 방공 탄약체계를 조기 도입합니다.\n기존 대공 미사일 수급난 해소를 위한 저비용·고효율 방공 탄약의 대량 양산 및 포장·보급 체계가 핵심 과제로 부상했습니다.",
    "source": "Defense News",
    "date": "2026-08-05",
    "url": "https://www.defensenews.com/industry/techwatch/2026/08/04/us-army-wants-a-surface-to-air-missile-that-can-destroy-small-drones/",
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "미 육군이 자폭 및 정찰 소형 드론 대응을 위해 차세대 사거리 연장 지대공 미사일 긴급 획득 절차를 가속화합니다.",
    "bodyText": "미 육군이 소형 무인기(Group 2/3 sUAS) 위협을 효과적으로 요격하기 위해 고도 6km, 사거리 16km 이상을 커버하는 '차세대 드론 요격 미사일(Next Gen C-sUAS Missile)' 소스요청서(Sources Sought)를 발표했습니다. 고가의 스팅어 및 대형 미사일 재고 소모를 줄이고 드론 소모전에 대응하기 위해 신속 반응형 요격 탄약체계를 신규 도입하는 조치로, 향후 신규 유도탄약의 대량 생산 및 글로벌 긴급 보급망 구축이 연계되어 진행될 예정입니다.",
    "perspective": "신규 방공 유도탄약의 대량 긴급 생산 및 전장 배치가 추진됨에 따라, 소형 유도탄 및 로켓탄을 신속하고 안전하게 운송·보관할 수 있는 충격 흡수 및 방습 탄약지환통의 중요성이 증대됩니다. 2.75인치 유도로켓 및 소형 탄약용 탄약지환통 분야에서 확보한 당사의 제조 기술을 해외 방공 유도 탄약 포장 체계로 확장할 기회입니다."
  },
  {
    "id": "news-fact-20260805-8",
    "tab": "global",
    "category": "글로벌 방산시장",
    "title": "라인메탈, 미 육군 차세대 궤도전투차량(XM30) 사업에 린스(Lynx) 장갑차 제안… 대규모 탄약·화력 체계 경쟁",
    "summary": "라인메탈(American Rheinmetall)이 미 육군의 브래들리 장갑차 교체 사업인 XM30 궤도전투차량 경합에 린스(Lynx)를 최종 제안했습니다.\n제너럴 다이내믹스(GDLS)와의 양자 구도 속에서 기관포 및 차세대 화력 탄약체계의 대규모 양산이 예고됩니다.\n미 육군 기갑전력 재편에 따라 대구경 및 중구경 탄약 공급망의 글로벌 외주 수주 경쟁이 뜨거워지고 있습니다.",
    "source": "Defence Industry Europe",
    "date": "2026-08-05",
    "url": "https://defence-industry.eu/american-rheinmetall-pitches-lynx-xm30-as-purpose-built-bradley-replacement-in-u-s-army-contest-against-general-dynamics/",
    "imageUrl": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "미 육군 차세대 보병전투장갑차(XM30) 획득 경합이 본격화되며 30mm/50mm 기관포 탄약 및 관련 군수물류 수요가 급증할 전망입니다.",
    "bodyText": "미국 라인메탈이 미 육군의 노후 브래들리 장갑차를 대체할 'XM30 메카나이즈드 보병전투차량' 입찰에 맞춤형 린스(Lynx) XM30 기종을 공식 제출했습니다. 제너럴 다이내믹스와의 수십조 원 규모 사업 경합에 따라, 차세대 50mm/30mm 주포 탄약 및 대전차 유도탄약의 대규모 양산 공급망이 재편되고 있습니다. 이에 따라 미 육군 및 유럽 우방국의 장갑차 탄약 재고 확보와 군수 포장물자 수급이 방산 시장의 화두로 떠올랐습니다.",
    "perspective": "글로벌 장갑차 및 화력 체계의 대형 획득 사업은 연계 기관포 탄약의 대량 양산으로 이어집니다. 중·대구경 탄약 포장 탄약지환통을 한화, 풍산, 방사청 등에 장기 공급해 온 당사의 정밀 씨밍 및 파라핀 함침 탄약지환통 공정 기술은 글로벌 체계업체 및 탄약 제조사의 납기 요구를 만족시킬 최적의 솔루션입니다."
  },
  {
    "id": "news-fact-20260804-1",
    "tab": "domestic",
    "category": "방산 정책",
    "title": "\"시장 환경 변했다\" 한화에어로, 4548억 UAM 계약 조기 종료",
    "summary": "한화에어로스페이스가 오버에어 관련 UAM 개발 계약을 4,548억 원 규모에서 조기 종료했습니다. 불확실성이 높은 신사업 리스크를 사전 차단하고 핵심 방산 제조 및 수출 공급망에 역량을 집중합니다. 글로벌 방산 수요 폭증에 맞춰 선택과 집중을 통한 경영 효율화 행보로 분석됩니다.",
    "source": "데일리디펜스",
    "date": "2026-08-04",
    "url": "https://www.dailydefense.co.kr/news/articleView.html?idxno=1672",
    "imageUrl": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "한화에어로스페이스가 신사업 리스크를 정리하고 K-방산 핵심 물량 생산 및 수출 공급망 강화에 집중합니다.",
    "bodyText": "한화에어로스페이스가 4,548억 원 규모의 UAM(도심항공교통) 개발 계약 및 지분 투자를 조기 종료하며 대대적인 사업 재편에 나섰습니다. 오버에어의 손실 및 투자 리스크를 학습한 후, 불확실한 미래 사업보다 현재 급증하는 글로벌 K-방산 수주 물량 생산과 수출 납기 준수에 사측의 핵심 자원을 집중하기 위한 결단입니다. 이에 따라 자주포, 탄약, 체계사업 등 방산 본업의 공급망 및 생산라인 확충이 더욱 가속화될 전망입니다.",
    "perspective": "체계업체의 방산 본업 집중 및 수출 물량 확대 정책은 당사의 탄약지환통 공급 안정성과 직결됩니다. 탄약 대량 생산 체계가 고도화될수록 고품질 탄약지환통의 적기 납품과 정밀 포장 규격 준수가 주요 과제로 부상하며, 당사의 방산 탄약지환통 대량 양산 및 품질 검증 역량이 더욱 유효하게 작용할 것입니다."
  },
  {
    "id": "news-fact-20260804-2",
    "tab": "domestic",
    "category": "군수품 포장·보관·수송",
    "title": "NCAGE 코드 시설별 발급 승인… 국내 조선·방산 기자재 美 방산시장 진입 숨통",
    "summary": "나토/미국 국방 공급망 등록 체계인 NCAGE 코드가 국내 기업의 제조 시설별로 발급 가능해졌습니다. 국내 방산 기자재 및 부품 협력업체들의 미국 국방 조달 시장 및 글로벌 공급망 진출 장벽이 대폭 낮아집니다. 군수 포장 및 보관·수송 용기 분야의 글로벌 국방 규격 인증 적용도 가속화될 것으로 예상됩니다.",
    "source": "데일리디펜스",
    "date": "2026-08-04",
    "url": "https://www.dailydefense.co.kr/news/articleView.html?idxno=1655",
    "imageUrl": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "NCAGE 코드의 시설별 발급 개편으로 국내 방산 중소·중견 제조사의 미국 및 나토 국방 공급망 진입이 가속화됩니다.",
    "bodyText": "국방부 및 방위사업청 협의를 통해 나토 및 미국 국방군수업체 코드(NCAGE)가 법인 단위에서 제조 시설 단위로 분리 발급될 수 있도록 제도가 개선되었습니다. 이를 통해 국내 주요 방산 협력업체 및 조선·군수품 포장 부품 제조사들이 개별 공장/생산라인 단위로 글로벌 방산 공급망에 직접 등록할 수 있게 되었습니다. 이는 미국 및 나토 회원국 대상의 군수물자 수출 및 해외 체계업체 B2B 공급선 확보에 결정적 기회가 될 것입니다.",
    "perspective": "미 국방규격(MIL-SPEC)을 충족하는 아스팔트 및 친환경 파라핀 탄약지환통을 생산하는 당사에 있어 NCAGE 코드의 개별 시설 인증 및 등록 활성화는 매우 긍정적인 신호입니다. 해외 군수 시장 진출 시 제조 시설의 MIL-DTL 규격 대응력을 직접 입증하고 B2B 직수출 파트너십을 확장하는 발판이 됩니다."
  },
  {
    "id": "news-fact-20260804-3",
    "tab": "global",
    "category": "탄약 수요",
    "title": "미 국방부, 패트리어트(PAC-3) 미사일 부품 3배 증산 프레임워크 협약 체결",
    "summary": "미 국방부(DoD)가 신규 획득 혁신 전략(ATS)에 의거해 PAC-3 미사일 부품 생산량을 3배로 대폭 늘립니다. 고체 로켓 모터(SRM) 및 점화 안전장치의 제2 공급처(Second Source) 확보를 위한 장기 프레임워크를 수립했습니다. 글로벌 유도탄 및 탄약 수급난 해소를 위해 군수 공급망 안정이 최우선 과제로 추진됩니다.",
    "source": "BidLink Defense News",
    "date": "2026-08-04",
    "url": "https://www.bidlink.net/news/2026/08/",
    "imageUrl": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "미 국방부가 미사일 및 고폭 탄약류의 대규모 증산을 위해 고체 로켓 모터 등 핵심 부품 공급망을 3배 확대합니다.",
    "bodyText": "미 국방부가 행정명령에 기초한 '획득 혁신 전략(ATS)'을 바탕으로 PAC-3 MSE 미사일의 부품 생산 능력을 3배로 확충하는 대형 프레임워크 협약을 발표했습니다. 특히 핵심 자재인 고체 로켓 모터(SRM)의 공급 병목현상을 해결하기 위해 이원화 공급처(Second Source)를 지정하고, 점화 안전장치 등 주요 부품 공급망 안정성을 대폭 강화했습니다. 이는 미군 및 동맹국의 유도탄·탄약 재고 고갈 문제를 해결하기 위한 구조적 대형 증산 조치입니다.",
    "perspective": "미사일 및 대구경 탄약의 3배 대량 증산 기조는 탄약 운송 및 장기 보관용 탄약지환통/보호용기의 대량 수급 필요성을 재확인합니다. 탄약 핵심부품 및 추진제의 완벽한 제습·방습 포장 규격이 체계의 신뢰성을 좌우하므로, MIL-SPEC 기준을 상회하는 탄약지환통 기술 요구가 글로벌 방산 시장 전반으로 확대될 것입니다."
  },
  {
    "id": "news-fact-20260804-4",
    "tab": "global",
    "category": "글로벌 방산시장",
    "title": "딜로이트 2026년 하반기 글로벌 항공방산 산업 전망 발표",
    "summary": "딜로이트가 2026년 하반기 글로벌 항공방산(A&D) 산업 중간 전망 보고서를 발간했습니다. 글로벌 지정학적 불안 속에서 주요국의 국방비 증액과 방산 공급망 재편이 지속되고 있습니다. 탄약·유도무기 대량 생산과 방산 제조업의 디지털/자동화 전환이 핵심 동인으로 꼽힙니다.",
    "source": "Deloitte Insights",
    "date": "2026-08-04",
    "url": "https://www.deloitte.com/us/en/insights/industry/aerospace-defense/midyear-update-aerospace-and-defense-industry-outlook.html",
    "imageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "coreSummary": "2026년 하반기 글로벌 방산 시장은 탄약 대량 생산 지속과 방산 제조업의 자동화·공급망 내재화가 성장을 주도합니다.",
    "bodyText": "딜로이트 글로벌 연구소의 2026년 하반기 항공방산 전망에 따르면, 세계 각국의 국방 예산 증액 기조가 고착화되면서 방산 기업들의 최대 과제가 '수주'에서 '적기 생산 및 공급망 관리'로 전환되고 있습니다. 특히 유럽 및 아시아·중동 지역을 중심으로 탄약, 유도무기, 무인체계의 대량 생산 주문이 급증함에 따라, 1~2차 부품 협력사 및 정밀 방산 포장·물류 기업과의 장기 공급 계약 체결이 활발히 이루어지고 있습니다.",
    "perspective": "글로벌 방산 시장의 패러다임이 '생산성 및 납기 준수'로 전환됨에 따라, 50년간 단 한 차례의 납기 지연 없이 탄약지환통을 공급해 온 당사의 제조 안정성과 대량 생산 인프라(월 100만 개 이상 생산 능력)는 해외 방산 체계업체들과의 JV 및 장기 공급 협상에서 강력한 차별화 경쟁력이 됩니다."
  }
];

const LOCAL_STORAGE_KEY = "sw_defense_news";
const LOCAL_CUSTOM_NEWS_KEY = "sw_defense_custom_news_map";
const LOCAL_DELETED_NEWS_KEY = "sw_defense_deleted_ids";

// Helper to get deleted news IDs list
export function getLocalDeletedNewsIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_DELETED_NEWS_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set(arr);
      }
    }
  } catch {
    // ignore
  }
  return new Set<string>();
}

export function saveLocalDeletedNewsId(id: string): void {
  try {
    const set = getLocalDeletedNewsIds();
    set.add(id);
    localStorage.setItem(LOCAL_DELETED_NEWS_KEY, JSON.stringify(Array.from(set)));
  } catch (err) {
    console.warn("Failed to save deleted news ID:", err);
  }
}

export function removeLocalDeletedNewsId(id: string): void {
  try {
    const set = getLocalDeletedNewsIds();
    set.delete(id);
    localStorage.setItem(LOCAL_DELETED_NEWS_KEY, JSON.stringify(Array.from(set)));
  } catch (err) {
    console.warn("Failed to remove deleted news ID:", err);
  }
}

// Helper to get custom news overrides map from localStorage
export function getLocalCustomNewsMap(): Record<string, DefenseNewsItem> {
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_NEWS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return {};
}

// Helper to save a single custom news override to localStorage
export function saveLocalCustomNews(item: DefenseNewsItem): void {
  try {
    const map = getLocalCustomNewsMap();
    map[item.id] = { ...item, isCustom: true, updatedAt: new Date().toISOString() };
    localStorage.setItem(LOCAL_CUSTOM_NEWS_KEY, JSON.stringify(map));
  } catch (err) {
    console.warn("Failed to save custom news map locally:", err);
  }
}

// Helper to remove custom news override
export function removeLocalCustomNews(id: string): void {
  try {
    const map = getLocalCustomNewsMap();
    delete map[id];
    localStorage.setItem(LOCAL_CUSTOM_NEWS_KEY, JSON.stringify(map));
  } catch (err) {
    console.warn("Failed to remove custom news map locally:", err);
  }
}

function normalizeTitle(title: string): string {
  return (title || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "").trim();
}

/**
 * Merges base items with custom items and Firestore items cleanly:
 * - Admin custom items (isCustom = true) ALWAYS take precedence and are NEVER overwritten by sheets or defaults.
 * - Matching occurs by both ID and normalized title.
 * - Deleted items are filtered out.
 */
export function mergeNewsSafely(
  baseList: DefenseNewsItem[],
  customMap: Record<string, DefenseNewsItem> = {},
  firestoreList: DefenseNewsItem[] = [],
  deletedIds: Set<string> = new Set()
): DefenseNewsItem[] {
  const customItemsById = new Map<string, DefenseNewsItem>();
  const customItemsByTitle = new Map<string, DefenseNewsItem>();

  // Collect Firestore custom items
  firestoreList.forEach((item) => {
    if (item && item.id && !deletedIds.has(item.id)) {
      const customItem = { ...item, isCustom: true };
      customItemsById.set(item.id, customItem);
      if (item.title) {
        customItemsByTitle.set(normalizeTitle(item.title), customItem);
      }
    }
  });

  // Collect local custom items (Highest precedence)
  Object.values(customMap).forEach((item) => {
    if (item && item.id && !deletedIds.has(item.id)) {
      const customItem = { ...item, isCustom: true };
      customItemsById.set(item.id, customItem);
      if (item.title) {
        customItemsByTitle.set(normalizeTitle(item.title), customItem);
      }
    }
  });

  const resultMap = new Map<string, DefenseNewsItem>();

  // Process incoming base or sheet items
  baseList.forEach((baseItem) => {
    if (!baseItem || !baseItem.id || deletedIds.has(baseItem.id)) return;

    // Check if there is a custom override by ID
    if (customItemsById.has(baseItem.id)) {
      resultMap.set(baseItem.id, customItemsById.get(baseItem.id)!);
      return;
    }

    // Check if there is a custom override by normalized Title
    const normTitle = normalizeTitle(baseItem.title);
    if (normTitle && customItemsByTitle.has(normTitle)) {
      const customOverride = customItemsByTitle.get(normTitle)!;
      resultMap.set(customOverride.id, customOverride);
      return;
    }

    resultMap.set(baseItem.id, baseItem);
  });

  // Ensure all custom items (even if not in baseList) are present
  customItemsById.forEach((customItem, id) => {
    if (!deletedIds.has(id)) {
      resultMap.set(id, customItem);
    }
  });

  const list = Array.from(resultMap.values());
  return list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getStoredDefenseNews(): DefenseNewsItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const customMap = getLocalCustomNewsMap();
    const deletedIds = getLocalDeletedNewsIds();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return mergeNewsSafely(parsed, customMap, [], deletedIds);
      }
    }
    return mergeNewsSafely(DEFAULT_DEFENSE_NEWS, customMap, [], deletedIds);
  } catch (e) {
    console.warn("Failed to load defense news from localStorage:", e);
  }
  return DEFAULT_DEFENSE_NEWS;
}

export function saveDefenseNewsToStorage(news: DefenseNewsItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(news));
  } catch (e) {
    console.warn("Failed to save defense news to localStorage:", e);
  }
}

/**
 * Saves an article to Firestore and local storage simultaneously.
 */
export async function saveDefenseNewsItem(article: DefenseNewsItem): Promise<void> {
  const itemToSave: DefenseNewsItem = {
    ...article,
    isCustom: true,
    updatedAt: new Date().toISOString()
  };

  // 1. Save locally
  saveLocalCustomNews(itemToSave);
  removeLocalDeletedNewsId(itemToSave.id);

  // 2. Save to Firestore
  try {
    await setDoc(doc(db, "defense_news", itemToSave.id), itemToSave);
  } catch (err) {
    console.warn("Firestore defense_news save error:", err);
  }
}

/**
 * Deletes an article from Firestore and local storage.
 */
export async function deleteDefenseNewsItem(id: string): Promise<void> {
  // 1. Record deletion locally
  removeLocalCustomNews(id);
  saveLocalDeletedNewsId(id);

  // 2. Delete from Firestore
  try {
    await deleteDoc(doc(db, "defense_news", id));
  } catch (err) {
    console.warn("Firestore defense_news delete error:", err);
  }
}

export function getStoredLastSyncTime(): string {
  try {
    return localStorage.getItem("sw_defense_last_sync_time") || "2026-08-22 (구글시트 실시간 연동)";
  } catch (e) {
    return "2026-08-22";
  }
}
