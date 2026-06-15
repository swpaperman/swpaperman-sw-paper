/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { ShieldAlert, Cookie, Check, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getCookieConsent, updateGAConsent } from "../lib/ga4";

interface CookieBannerProps {
  forceOpen: boolean;
  onCloseForce: () => void;
}

export default function CookieBanner({ forceOpen, onCloseForce }: CookieBannerProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a selection
    const consent = getCookieConsent();
    if (consent === "unanswered" || forceOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [forceOpen]);

  const handleAccept = () => {
    updateGAConsent(true);
    setIsVisible(false);
    onCloseForce();
  };

  const handleDecline = () => {
    updateGAConsent(false);
    setIsVisible(false);
    onCloseForce();
  };

  if (!isVisible) return null;

  // Render translations inline to keep everything unified and robust
  const texts = {
    ko: {
      title: "쿠키 및 개인정보 수집에 대한 안내",
      desc: "수원지관산업은 홈페이지 이용현황 분석 및 서비스 개선을 위해 Google Analytics 4(GA4) 분석 쿠키를 사용합니다. 동의해주시면 이용기록(방문 기록, 기기 사양, 유입 경로 등)이 안전하게 수집됩니다. 동의를 거부하셔도 모든 서비스를 정상적으로 이용하실 수 있으며, 방문자 성함, 이메일, 전화번호 등 개인을 직접 식별할 수 있는 민감 정보는 절대로 수집하거나 전송하지 않습니다.",
      accept: "분석 허용 (Accept)",
      decline: "거부 (Decline)",
      more: "개인정보처리방침 자세히 보기",
    },
    en: {
      title: "Notice on Cookie and Visitor Analytics",
      desc: "Suwon Paper Cone & Tube uses Google Analytics 4 (GA4) analytical cookies to evaluate website utilization patterns and improve service experience. If approved, user activity logs (visit history, device specifications, traffic channel sources) are securely processed. You can freely decline cookie usage containing zero restriction on website access. Absolutely no personally identifiable information (PII) like names, emails or contact records is ever compiled.",
      accept: "Accept Analytics",
      decline: "Decline",
      more: "View Privacy Policy",
    },
    tr: {
      title: "Çerezler ve Ziyaretçi Analizi Hakkında Bilgilendirme",
      desc: "Suwon Karton Masura, web sitemizin kullanım istatistiklerini analiz etmek ve hizmetlerimizi iyileştirmek amacıyla Google Analytics 4 (GA4) analiz çerezleri kullanmaktadır. Kabul ettiğinizde, kullanım verileri (ziyaret geçmişi, cihaz özellikleri, yönlendirme kanalları) güvenli bir şekilde değerlendirilir. Reddetmeniz durumunda da web sitemizi tüm özellikleriyle kesintisiz kullanabilirsiniz. Şahsi kimliğinizi ifşa edebilecek ad, e-posta veya telefon gibi kişisel veriler asla toplanmaz.",
      accept: "Kabul Et (Accept)",
      decline: "Reddet (Decline)",
      more: "Gizlilik Politikasını İncele",
    },
  };

  const activeText = texts[language] || texts.ko;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fade-in-slide font-sans">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/90 p-5 sm:p-6 space-y-4 text-left">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-kraft-50 text-kraft-600 rounded-xl shrink-0 mt-0.5 border border-kraft-100">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-gray-950 tracking-tight leading-tight flex items-center gap-1.5">
              {activeText.title}
              <span className="text-[9px] font-mono font-bold bg-military-50 border border-military-100 px-1.5 py-0.5 rounded text-military-800">
                Consent v2
              </span>
            </h4>
            <p className="text-xs text-gray-550 leading-relaxed font-light break-keep">
              {activeText.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-gray-150/80">
          <button
            onClick={handleDecline}
            className="flex-1 py-2 px-3 text-xs font-semibold text-gray-550 bg-neutral-100 hover:bg-neutral-150 rounded-xl border border-neutral-200/50 hover:text-gray-900 transition-colors cursor-pointer text-center"
          >
            {activeText.decline}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-3 text-xs font-bold text-white bg-military-900 hover:bg-military-800 rounded-xl border border-military-950 shadow-3xs transition-colors cursor-pointer text-center"
          >
            {activeText.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
