/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { ChevronUp, Phone, Printer, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-military-900 text-white relative border-t border-military-850 font-sans text-left">
      
      {/* Scroll Up Button */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-kraft-500 hover:bg-kraft-600 text-gray-950 shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center border border-kraft-400"
          aria-label={language === "ko" ? "화면 상단으로 이동" : language === "tr" ? "Yukarı git" : "Scroll to top"}
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5px] text-gray-950" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12">
          
          {/* Logo Brand information */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-md bg-white flex items-center justify-center">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Z7FBFivl_l9l4NeCED5ZsecPXDZDpGP3" 
                  alt="주식회사 수원지관산업 CI" 
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <span className="block font-display font-black text-base sm:text-lg tracking-tight text-white leading-tight">
                  {t.companyName}
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-kraft-400 mt-1">
                  {t.companyNameEng}
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-xs font-light leading-relaxed max-w-sm break-keep">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick contact summary */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3.5">
            <span className="block text-[10px] font-mono font-bold tracking-widest text-kraft-300 uppercase">
              {t.footer.directions}
            </span>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-kraft-500 shrink-0" />
                <span>{t.footer.telLabel}</span>
              </li>
              <li className="flex items-center gap-2">
                <Printer className="w-3.5 h-3.5 text-kraft-500 shrink-0" />
                <span>{t.footer.faxLabel}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-kraft-500 shrink-0" />
                <span>swpaper@hanmail.net</span>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-kraft-500 shrink-0 mt-0.5" />
                <span>
                  {t.footer.hqAddress}
                </span>
              </li>
            </ul>
          </div>

          {/* Business Credentials (no export or raw DQMS owner claims) */}
          <div className="md:col-span-6 lg:col-span-4 space-y-3.5">
            <span className="block text-[10px] font-mono font-bold tracking-widest text-kraft-300 uppercase">
              {t.footer.credentialsTitle}
            </span>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              {t.footer.credentials.map((cred, idx) => (
                <li key={idx}>• {cred}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Lower Legal copyright bar */}
        <div className="pt-8 border-t border-military-850 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p className="font-light">
            {t.footer.copyright}
          </p>
          <div className="flex gap-4 text-gray-550 font-mono">
            <span>
              {t.footer.specialist}
            </span>
            <span className="font-light">|</span>
            <span>
              {t.footer.trust60}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
