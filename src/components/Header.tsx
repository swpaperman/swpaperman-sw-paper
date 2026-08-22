/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";
import { TranslationSchema } from "../lib/translations";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onInquiryClick?: () => void;
}

interface NavItem {
  id: string;
  labelKey: keyof TranslationSchema["nav"];
}

// All 9 navigation items parallel back as standard, fully responsive
const navItems: NavItem[] = [
  { id: "home", labelKey: "home" },
  { id: "products", labelKey: "products" },
  { id: "simulator", labelKey: "simulator" },
  { id: "stock", labelKey: "stock" },
  { id: "quality", labelKey: "quality" },
  { id: "reference", labelKey: "reference" },
  { id: "news", labelKey: "news" },
  { id: "about", labelKey: "about" },
  { id: "contact", labelKey: "contact" },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  const { isAdmin, openLoginModal, logoutAdmin } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500); // Toggle logo brand texts every 4.5 seconds for a dynamic modern feel
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    
    // Smooth scroll to top of page
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full overflow-hidden transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-150/80 py-2.5" 
          : "bg-military-900/90 border-b border-military-800/40 py-3.5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo Brand Title Area - Max Width Restricted to prevent menu pushing */}
          <div 
            className="logo-area flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink min-w-0 max-w-[210px] min-[370px]:max-w-[270px] sm:max-w-[370px]"
            onClick={() => handleNavClick("home")}
          >
            <div className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center shrink-0 ${
              scrolled ? "bg-military-50" : "bg-white/10"
            }`}>
              <img 
                src="https://lh3.googleusercontent.com/d/1Z7FBFivl_l9l4NeCED5ZsecPXDZDpGP3" 
                alt="수원지관산업 CI" 
                referrerPolicy="no-referrer"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-105 transition-all duration-300"
              />
            </div>
            
            {/* Stable container to prevent layout shifting during text slide transitions */}
            <div className="shrink text-left relative overflow-hidden w-[120px] min-[370px]:w-[155px] min-[400px]:w-[185px] sm:w-[250px] xl:w-[280px] h-10 sm:h-12 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={logoIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute left-0 right-0 w-full"
                >
                  {logoIndex === 0 ? (
                    <>
                      <span className={`block font-sans font-extrabold text-[12.5px] min-[370px]:text-[14px] sm:text-[16px] xl:text-[18px] tracking-tight transition-colors duration-300 leading-none whitespace-nowrap ${
                        scrolled ? "text-gray-900 font-black" : "text-white"
                      }`}>
                        수원지관산업
                      </span>
                      <span className={`block font-mono text-[8px] sm:text-[9px] xl:text-[10px] tracking-tighter mt-1.5 transition-colors duration-300 leading-none whitespace-nowrap ${
                        scrolled ? "text-gray-500 font-semibold" : "text-kraft-400"
                      } hidden sm:block`}>
                        suwon paper cone & tube mfg. co.,ltd
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={`block font-display font-black text-[10px] min-[370px]:text-[11.5px] min-[400px]:text-[13px] sm:text-[15.5px] xl:text-[17.5px] tracking-tight transition-colors duration-300 leading-none whitespace-nowrap ${
                        scrolled ? "text-gray-900" : "text-white"
                      }`}>
                        SUWON PAPER CONE & TUBE
                      </span>
                      <span className={`block font-mono text-[8px] sm:text-[9px] xl:text-[10px] uppercase tracking-tighter mt-1.5 transition-colors duration-300 leading-none whitespace-nowrap ${
                        scrolled ? "text-gray-500 font-semibold" : "text-kraft-400"
                      } hidden sm:block`}>
                        MFG. CO.,LTD
                      </span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* PC Desktop Navigation Menu: Displays all 9 items parallel above 1025px */}
          <nav className="hidden min-[1025px]:flex items-center gap-1.5 xl:gap-3 2xl:gap-4.5 shrink-0 overflow-hidden whitespace-nowrap">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const labelText = t.nav[item.labelKey];
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative group py-1 px-0.5 bg-transparent border-0 cursor-pointer shrink-0 transition-all font-sans"
                >
                  <span className={`block text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-extrabold tracking-tight transition-all duration-200 text-center whitespace-nowrap uppercase ${
                    isActive
                      ? scrolled ? "text-military-800" : "text-kraft-400"
                      : scrolled ? "text-gray-600 group-hover:text-gray-900" : "text-gray-300 group-hover:text-white"
                  }`}>
                    {labelText}
                  </span>
                  
                  {/* Underline current page indicator */}
                  <span className={`absolute bottom-0 left-1 right-1 h-[2px] transition-all duration-300 origin-center ${
                    isActive 
                      ? scrolled ? "bg-military-700 scale-x-100" : "bg-kraft-400 scale-x-100"
                      : "bg-transparent scale-x-0 group-hover:scale-x-100 group-hover:bg-kraft-500"
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Separate Right-aligned Language Selection & Admin Auth Block */}
          <div className="hidden min-[1025px]:flex items-center gap-2 shrink-0">
            <div className={`flex rounded-lg p-0.5 border transition-colors duration-300 ${
              scrolled 
                ? "bg-gray-100 border-gray-200" 
                : "bg-white/5 border-white/10"
            }`}>
              {(["ko", "en", "tr"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[10.5px] font-black px-2.5 py-1 rounded transition-all duration-200 uppercase cursor-pointer ${
                    language === lang
                      ? scrolled 
                        ? "bg-military-600 text-white shadow-sm" 
                        : "bg-kraft-500 text-gray-950 shadow-sm"
                      : scrolled
                        ? "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                        : "text-white/75 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Admin status pill */}
            {isAdmin ? (
              <button
                id="header-admin-active-btn"
                onClick={openLoginModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-400/40 text-[11px] font-extrabold tracking-tight transition"
                title="관리자 모드 활성 (클릭 시 관리자 설정)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xl:inline">{language === "ko" ? "관리자 모드" : "Admin"}</span>
              </button>
            ) : (
              <button
                id="header-admin-login-btn"
                onClick={openLoginModal}
                className={`p-1.5 rounded-lg text-xs transition border cursor-pointer ${
                  scrolled
                    ? "text-gray-400 hover:text-gray-700 hover:bg-gray-100 border-transparent"
                    : "text-white/40 hover:text-white hover:bg-white/10 border-transparent"
                }`}
                title={language === "ko" ? "관리자 로그인" : "Admin Login"}
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile/Tablet/Notebook < 1025px UI Button interface */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 min-[1025px]:hidden">
            {/* Admin pill on mobile if logged in */}
            {isAdmin && (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-600/30 text-emerald-300 text-[10px] font-bold border border-emerald-400/30"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>관리자</span>
              </button>
            )}

            {/* Small inline Language choice */}
            <div className={`flex rounded-lg p-0.5 border ${
              scrolled 
                ? "bg-gray-100 border-gray-200" 
                : "bg-white/10 border-white/10"
            }`}>
              {(["ko", "en", "tr"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded transition-all duration-150 uppercase cursor-pointer ${
                    language === lang
                      ? scrolled 
                        ? "bg-military-600 text-white shadow-xs" 
                        : "bg-kraft-500 text-gray-950 shadow-xs"
                      : scrolled
                        ? "text-gray-500 hover:text-gray-900"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile/Tablet Sliding drawer menu block */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="min-[1025px]:hidden bg-white border-t border-gray-250 shadow-xl overflow-y-auto max-h-[calc(100vh-4.5rem)] sm:max-h-[calc(100vh-5rem)]"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5 text-left">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const labelText = t.nav[item.labelKey];
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors cursor-pointer text-left ${
                      isActive 
                        ? "bg-military-50 text-military-800 font-extrabold" 
                        : "text-gray-700 hover:bg-gray-55 hover:text-gray-950"
                    }`}
                  >
                    <span className="text-sm tracking-tight font-bold uppercase">{labelText}</span>
                    <ChevronRight className={`w-4 h-4 transition-colors ${
                      isActive ? "text-military-600" : "text-gray-400"
                    }`} />
                  </button>
                );
              })}

              {/* Mobile Admin login / status link */}
              <div className="pt-3 border-t border-gray-100 mt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openLoginModal();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className={`w-4 h-4 ${isAdmin ? "text-emerald-600" : "text-gray-400"}`} />
                    {isAdmin ? (language === "ko" ? "관리자 콘솔 모드 (활성)" : "Admin Console (Active)") : (language === "ko" ? "관리자 로그인" : "Admin Login")}
                  </span>
                  <span className="text-[10px] text-gray-400">{isAdmin ? "설정/로그아웃" : "접속"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
