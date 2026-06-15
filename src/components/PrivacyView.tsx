/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { Shield, Lock, Eye, CheckCircle2, Sliders, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PrivacyViewProps {
  type: "privacy" | "terms"; // Renders either privacy policy or terms of service
  onTabChange: (tab: string) => void;
  onOpenCookieSettings: () => void;
}

export default function PrivacyView({ type, onTabChange, onOpenCookieSettings }: PrivacyViewProps) {
  const { language } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isPrivacy = type === "privacy";

  return (
    <section className="bg-neutral-50 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden text-left">
        
        {/* Document Header Panel */}
        <div className="p-6 sm:p-10 bg-military-900 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Shield className="w-32 h-32" />
          </div>
          <div className="space-y-3 relative z-10">
            <span className="inline-block text-[10px] font-mono font-extrabold tracking-widest text-kraft-400 uppercase bg-white/10 px-2.5 py-1 rounded">
              {isPrivacy 
                ? (language === "ko" ? "개인정보 처리 처리방침" : language === "tr" ? "Gizlilik Politikası" : "Privacy Policy Document")
                : (language === "ko" ? "이용 약관 협약" : language === "tr" ? "Kullanım Şartları" : "Terms & Conditions Document")
              }
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {isPrivacy 
                ? (language === "ko" ? "개인정보처리방침" : language === "tr" ? "Gizlilik Politikası" : "Privacy Policy")
                : (language === "ko" ? "이용약관" : language === "tr" ? "Kullanım Şartları" : "Terms of Service")
              }
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm font-light max-w-2xl">
              {isPrivacy
                ? (language === "ko" 
                    ? "본 방침은 주식회사 수원지관산업 홈페이지를 이용하시는 방문자 분들의 소중한 개인정보 보호 및 분석 분석 통제 규격을 명시합니다."
                    : language === "tr"
                      ? "Bu politika, Suwon Karton Masura web sitesi kullanıcılarının gizlilik haklarını ve veri analizi denetimlerini açıklar."
                      : "This statement outlines privacy safeguards and analytics collection practices for Suwon Paper Cone & Tube website users.")
                : (language === "ko"
                    ? "본 약관은 주식회사 수원지관산업 홈페이지 및 온라인 견적 문의 플랫폼 서비스의 이용에 관한 합리적인 규칙을 규정합니다."
                    : language === "tr"
                      ? "Bu koşullar, Suwon Karton Masura web sitesi kullanımı ve çevrimiçi teklif talepleri kurallarını belirler."
                      : "These terms describe normal rules for accessing the online quote inquiry service of Suwon Paper Cone & Tube.")
              }
            </p>
          </div>
        </div>

        {/* Dynamic Document Content Panel */}
        <div className="p-6 sm:p-10 space-y-8 text-gray-700 leading-relaxed font-light text-sm">
          {isPrivacy ? (
            // ==================== PRIVACY POLICY CONTENT ====================
            language === "ko" ? (
              <div className="space-y-6 break-keep">
                <div className="p-4 bg-military-50/50 rounded-xl border border-military-100 flex gap-3 text-military-900">
                  <Lock className="w-5 h-5 shrink-0 mt-0.5 text-military-700" />
                  <div className="text-xs leading-normal">
                    <p className="font-bold">Google Analytics 4 방문자 로그 분석 적용 안내</p>
                    <p className="mt-1 text-gray-600">수원지관산업은 사용자의 개인정보를 가장 중요한 가치로 여기며, 어떠한 민감한 개인 식별 정보(성함, 메일주소, 전화번호 등)도 Google Analytics(GA4)에 제공하지 않는 완벽한 프라이버시 안심 체계를 구축하였습니다.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">01.</span> Google Analytics 4(GA4)의 사용 목적 및 사실
                  </h3>
                  <p className="text-gray-600 pl-6">
                    당사는 홈페이지 접속 빈도, 페이지 체류 시간, 방문자 동선, 유입 경로, 브라우저/기기 사양 등 비개인적 행동 로그를 투명하게 수집하여, 서비스 개선 및 메뉴 편의성 제고를 위한 내부 통계 자료로 활용하고 있습니다. 본 분석은 글로벌 기술 표준 규격인 Google Analytics 4 방식을 통해 비동기 처리되어 서비스 이용 속도에 일체 부하를 주지 않습니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">02.</span> 개인 식별 정보(PII) 누출 제로화 보장
                  </h3>
                  <p className="text-gray-600 pl-6">
                    당사는 견적 문의서 작성 프로세스를 이용하시는 고객의 실제 성함, 회사명, 연락처, 이메일 주소, 제품 사양 상세 도면 및 견적 한계값 등 <strong>어떠한 형태의 직접적 개인 정보도 GA4 분석 서버로 일체 전송하지 않습니다.</strong> 문의 구분 및 제품 카테고리 기호 등 개별 주체를 절대 추론할 수 없는 원격 누적 수치만을 가용해 오남용 우려를 완천 차단합니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">03.</span> 분석 쿠키 거부권 및 자유로운 설정 철회 권장
                  </h3>
                  <p className="text-gray-600 pl-6">
                    본 웹사이트는 Google Consent Mode v2 정책을 성실히 준수합니다. 기본 상태에서 분석적 쿠키 보관 승인은 항상 거부(denied) 상태로 대기하며, 오직 사용자의 명시적인 동의가 있을 경우에만 활성화(granted) 처리됩니다. 분석 이용을 완전히 거부하셔도 군용 지환통 시뮬레이션 활용, 특가 재고 상세 조회 등 본 웹사이트의 핵심 품질 기능을 제한 없이 자유롭게 사용하실 수 있습니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">04.</span> 실시간 쿠키 도메인 제어 및 변경 방법
                  </h3>
                  <p className="text-gray-600 pl-6">
                    사용자는 언제든지 당사 홈페이지 최하단 푸터 영역에 탑재된 <strong className="text-military-850 cursor-pointer hover:underline" onClick={onOpenCookieSettings}>[쿠키 설정]</strong> 버튼을 다시 눌러 분석 동의 상태를 즉시 재구조할 수 있습니다. 동의 상태는 사용자의 디바이스 내부 로컬 영역에 즉시 안전 처리되어 기록 보존 및 파기 주기를 자율적으로 관리할 수 있습니다.
                  </p>
                </div>
              </div>
            ) : language === "tr" ? (
              <div className="space-y-6">
                <div className="p-4 bg-military-50/50 rounded-xl border border-military-100 flex gap-3 text-military-900">
                  <Lock className="w-5 h-5 shrink-0 mt-0.5 text-military-700" />
                  <div className="text-xs leading-normal">
                    <p className="font-bold">Google Analytics 4 Çerezleri Veri Politikası</p>
                    <p className="mt-1 text-gray-600">Suwon Paper, kişisel verilerinizin korunmasını garanti altına alır. Web sitemiz üzerinden hiçbir hassas kişisel bilgi (isim, e-posta, telefon vb.) GA4 servislerine aktarılmaz.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">01.</span> Google Analytics 4 (GA4) Kullanım Amacı
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Web sitemizde, ziyaretçi trafiği analizleri, tıklama döngüleri, oturum süreleri ve kullanılan tarayıcı/cihaz istatistiklerini anonim (kimliksiz) olarak izlemekteyiz. Elde edilen değerler tamamen hizmet kalitemizi ve sayfa yapımızı optimize etmek amacıyla kullanılır.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">02.</span> Kişisel Veri Güvenliği Garantisi (Zero PII)
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Teklif ve fiyat taleplerinizde yazdığınız isim, firma adı, telefon numarası ve eposta adresleri gibi <strong>hiçbir şahsi bilgi GA4 sunucularına aktarılmaz.</strong> Sadece kişisel bağ kurulamayan ürün kategorisi tercihleri gibi genel istatistiksel trendler değerlendirilir.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">03.</span> Analiz Seçenekleri & Reddetme Hakkı
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Web sitemiz Google Çerez İzin Modu v2 (Consent Mode v2) kurallarına uymaktadır. Varsayılan izin her zaman kapalı (denied) tutulur ve yalnızca kullanıcının onayı ile etkinleşir. Çerezleri reddetseniz dahi mühimmat kutusu simulasyonlarımız dahil tüm sitemiz kesintisiz biçimde hizmetinizdedir.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">04.</span> Çerez İzinlerinizi Güncelleme Yöntemi
                  </h3>
                  <p className="text-gray-600 pl-6">
                    İstediğiniz zaman sayfamızın en altındaki <strong className="text-military-850 cursor-pointer hover:underline" onClick={onOpenCookieSettings}>[Çerez Ayarları]</strong> düğmesinden tercihlerinizi güncelleyebilirsiniz. Değişiklikler tarayıcınızın lokal sisteminde anında devreye girer.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-military-50/50 rounded-xl border border-military-100 flex gap-3 text-military-900">
                  <Lock className="w-5 h-5 shrink-0 mt-0.5 text-military-700" />
                  <div className="text-xs leading-normal">
                    <p className="font-bold">Google Analytics 4 Implementation Notice</p>
                    <p className="mt-1 text-gray-600">Suwon Paper Cone & Tube highly prioritizes user privacy. No sensitive personally identifiable information (PII) like names, emails or phone contacts is shared with GA4 servers.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">01.</span> Purpose and Use of Google Analytics 4 (GA4)
                  </h3>
                  <p className="text-gray-600 pl-6">
                    This website processes aggregated, non-personally identifiable behavioral logs (session duration, device types, traffic channels, page navigation paths) to generate statistics to evaluate website usability and refine client services. GA4 loads script parameters asynchronously, presenting zero disruption to sitemaps core response latency.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">02.</span> PII Exposure Prevention Guarantee
                  </h3>
                  <p className="text-gray-600 pl-6">
                    When filling out contact or inquiry sheets, <strong>no actual telephone records, company titles, personal names, comments or attachment specifics are transmitted to GA4 analytics servers.</strong> Only generic fields such as selected form type or product category tags are utilized to prevent individual user tracking.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">03.</span> Consent Rules & Freedom to Decline Cookies
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Our platform conforms strictly with Google Consent Mode v2 specifications. The analytical authorization is set to denied by default, unless you explicitly choose to activate it. Disallowing cookie parsing does not interfere with the functionality or speed of the web, and you can leverage all catalog simulations safely.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">04.</span> Accessing and Changing Consent Choices
                  </h3>
                  <p className="text-gray-600 pl-6">
                    You can inspect or renegotiate your cookie choice at any point simply by selecting the <strong className="text-military-850 cursor-pointer hover:underline" onClick={onOpenCookieSettings}>[Cookie Settings]</strong> option placed at the footer. Saved consent values are recorded in standard local storage partitions of your browser.
                  </p>
                </div>
              </div>
            )
          ) : (
            // ==================== TERMS OF SERVICE CONTENT ====================
            language === "ko" ? (
              <div className="space-y-6 break-keep">
                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">01.</span> 목적 및 범주
                  </h3>
                  <p className="text-gray-600 pl-6">
                    이 이용약관은 (주)수원지관산업이 제공하는 홈페이지 정보 서비스 및 온라인 견적 상담 양식의 이용 기준과 책임 소지를 정의합니다. 본 사이트는 군사 규격 탄약 공급 포장재 및 일반 포장 지환통 관련 B2B 계약 상담 참고 플랫폼이며 원칙적으로 실제 유가물 제조 발주는 기업 간 개별 정식 계약 체결을 전제로 실행됩니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">02.</span> 정보의 기술적 한계 및 비상업적 참고
                  </h3>
                  <p className="text-gray-600 pl-6">
                    본 웹사이트에서 조율 제공하는 지환통 규격 데이터배이스 등은 시뮬레이션 기술 평가를 위한 참조 규격입니다. 실제 무기 체계 탑재 포장 혹은 대량 도면 성형 발주를 위해서는 승인된 사양 시제품 실사 및 엄격한 대국 기계 테스트(DTaQ, DQ 등) 검인을 반드시 경유해야 함을 확인해 주십시오.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">03.</span> 지식재산권 안내
                  </h3>
                  <p className="text-gray-600 pl-6">
                    본 사이트에 포함된 디자인, 구조적 특화 지문, 공정 사진 사본, 상표권 인쇄 디자인 등은 본사 및 적법한 협력사의 정통 재산권이며 어떠한 무단 복사나 영리 목적 복제 사용도 금지됩니다.
                  </p>
                </div>
              </div>
            ) : language === "tr" ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">01.</span> Amaç ve Kapsam
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Bu Kullanım Şartları, Suwon Karton Masura web sitemizin sağladığı kurumsal bilgiler ve dijital teklif sorgulamaları standartlarını tanımlar. Web sayfamızda sunulan tüm veriler bilgilendirme amaçlı olup, nihai mukavemet siparişleri şirketler arası birebir resmi sözleşmeler ile yasal statü kazanır.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">02.</span> Teknik Sorumluluk Sınırları
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Sayfadaki boru simülasyonları ve teknik veriler referans niteliğindedir. Havacılık veya savunma ambalajı kullanımlarında resmi akreditasyon kuruluşlarının askeri kabul test raporları geçerlidir.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">03.</span> Fikri Mülkiyet Hakları
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Sitede kullanılan tüm fotoğraflar, tescilli ambalaj şablonları ve kaynak kodlar Suwon Paper korumalı varlığıdır.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">01.</span> Objectives and Scope
                  </h3>
                  <p className="text-gray-600 pl-6">
                    These Terms of Service define access rules for information listings and quoting features on this web portal. This site functions primarily as a B2B specification guide, and formal physical orders are realized solely under individual signed legal supply contracts.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">02.</span> Technical Liability Disclaimers
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Sitemap material metrics shown are reference blueprints. Actual physical defense container implementation must secure specialized DTaQ/DQMS official component quality checks before fleet allocation.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                    <span className="text-kraft-600 font-mono">03.</span> Intellectual Property Protect
                  </h3>
                  <p className="text-gray-600 pl-6">
                    Layout structures, specialized defense item designs, graphic assets, and text materials displayed on this site are private property of Suwon Paper Cone & Tube. Unapproved distribution or copying is strictly prohibited.
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Back To Home Button Row */}
        <div className="p-6 sm:p-10 border-t border-gray-150/80 bg-neutral-50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-xs text-gray-400 font-mono uppercase">
            Last Updated: June 2026 | Suwon Paper Compliance Management
          </p>
          <button
            onClick={() => {
              onTabChange("home");
              handleScrollToTop();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-military-900 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-military-850 transition-colors cursor-pointer text-center"
          >
            {language === "ko" ? "메인 홈으로 가기" : language === "tr" ? "Ana Sayfaya Dön" : "Return to Home"}
          </button>
        </div>

      </div>
    </section>
  );
}
