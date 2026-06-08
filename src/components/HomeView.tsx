/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { 
  ShieldCheck, 
  Settings, 
  Layers, 
  Calculator, 
  Package, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HomeViewProps {
  onTabChange: (tabId: string) => void;
}

export default function HomeView({ onTabChange }: HomeViewProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-military-900 flex items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 xl:pt-36 xl:pb-24">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 tech-grid-dark opacity-25 z-0 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-military-700/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[25vw] h-[25vw] rounded-full bg-kraft-600/10 blur-[90px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 relative z-10 w-full text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-[80px] xl:gap-[110px]">
            
            {/* Left Column: Core Copy */}
            <div className="w-full lg:max-w-[720px] flex-1 flex flex-col justify-center">
              
              {/* Reliable Badge */}
              <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-military-800/90 border border-military-600/40 backdrop-blur-sm w-fit mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-kraft-500 animate-pulse" />
                <span className="text-[12.5px] sm:text-[13.5px] font-sans font-bold text-kraft-300 uppercase tracking-wide leading-none">
                  {t.home.heroBadge}
                </span>
              </div>

              {/* Majestic Titles */}
              <h1 className="text-3xl sm:text-[42px] md:text-[46px] lg:text-[44px] xl:text-[48px] 2xl:text-[52px] font-black text-white tracking-tight leading-[1.15] break-keep">
                <span className="block font-sans font-medium text-kraft-400 text-[16px] sm:text-[17px] xl:text-[18px] uppercase tracking-widest font-mono mb-2">
                  {t.mainTitleEng}
                </span>
                {t.mainTitle}
              </h1>

              {/* Body paragraph content area wrapped in tailored spacing */}
              <div className="mt-4.5 space-y-3.5 max-w-[640px] break-keep">
                <p className="font-semibold text-white/95 text-[15px] sm:text-[16.5px] xl:text-[17.5px] leading-relaxed">
                  {t.mainSubtitle}
                </p>
                <p className="font-light text-gray-300/75 text-[13.5px] sm:text-[14.5px] xl:text-[15px] leading-[1.65]">
                  {t.mainDesc}
                </p>
              </div>

              {/* Hero CTA Actions */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => onTabChange("contact")}
                  className="py-3.5 px-6 rounded-xl bg-kraft-500 text-gray-950 text-[15px] sm:text-[16px] font-black hover:bg-kraft-600 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 border-0"
                >
                  {t.home.customInquiryBtn}
                  <ArrowRight className="w-4.5 h-4.5 text-gray-950" />
                </button>
                <button
                  onClick={() => onTabChange("products")}
                  className="py-3.5 px-6 rounded-xl bg-military-800 text-white text-[15px] sm:text-[16px] font-semibold border border-military-600 hover:bg-military-750 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {t.home.viewAmmoBtn}
                  <ChevronRight className="w-4.5 h-4.5 text-white" />
                </button>
              </div>
            </div>

            {/* Right Column: Visual Wireframe Simulation Panel */}
            <div className="w-full max-w-[475px] sm:max-w-[495px] lg:max-w-[510px] xl:max-w-[520px] shrink-0">
              <div className="p-5 sm:p-6 rounded-2xl bg-military-850/90 border border-military-700/80 backdrop-blur-sm shadow-2xl relative overflow-hidden text-white flex flex-col justify-between h-full min-h-[420px] lg:min-h-[460px] xl:min-h-[490px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-kraft-50/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-mono font-bold text-kraft-400 tracking-wider uppercase">
                    {t.home.specHeader}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase tracking-wider">
                    MIL-SPEC / KDS BASED
                  </span>
                </div>

                {/* Real Product Image Container */}
                <div className="bg-military-900 rounded-xl p-3 flex flex-col justify-center items-center border border-military-800/80 shadow-inner relative group/img mb-4 flex-1">
                  <div className="w-full h-36 sm:h-44 xl:h-46 rounded-lg overflow-hidden bg-military-950 flex items-center justify-center relative">
                     <img 
                       src="https://lh3.googleusercontent.com/d/1tXrnyb3Y_ApswrRWveDzk5O9ua8F9gqV" 
                       alt="SUWON AMMUNITION CONTAINER" 
                       referrerPolicy="no-referrer"
                       className="w-full h-full object-cover rounded-md group-hover/img:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute top-2 right-2 bg-military-900/90 backdrop-blur-xs text-[9.5px] font-mono font-bold text-kraft-400 px-2 py-0.5 rounded border border-military-700/40">
                       EST. 1964
                     </div>
                  </div>
                  
                  <span className="mt-3 block text-xs sm:text-sm font-sans font-black text-kraft-300 uppercase tracking-wider text-center leading-tight">
                    {t.home.realProductTitle}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-300 font-medium font-sans mt-1 text-center opacity-95 tracking-wide leading-tight">
                    {t.home.realProductSub}
                  </span>
                </div>

                {/* Parameter Metrics list with aligned typography */}
                <div className="space-y-1 text-[11px] sm:text-xs">
                  <div className="flex justify-between py-2 border-b border-military-800/40 items-center gap-4">
                    <span className="text-gray-400 shrink-0 font-bold tracking-tight">
                      {t.home.designSpecLabel}
                    </span>
                    <span className="text-kraft-300 font-bold text-right text-[11px] sm:text-xs">
                      {t.home.designSpecVal}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-military-800/40 items-center gap-4">
                    <span className="text-gray-400 shrink-0 font-bold tracking-tight">
                      {t.home.moistureLabel}
                    </span>
                    <span className="text-kraft-300 font-bold text-right text-[11px] sm:text-xs">
                      {t.home.moistureVal}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-military-800/40 items-center gap-4">
                    <span className="text-gray-400 shrink-0 font-bold tracking-tight">
                      {t.home.strengthLabel}
                    </span>
                    <span className="text-kraft-300 font-bold text-right text-[11px] sm:text-xs">
                      {t.home.strengthVal}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 items-center gap-4">
                    <span className="text-gray-300 shrink-0 font-bold tracking-tight">
                       {t.home.qualityLabel}
                    </span>
                    <span className="text-white text-right font-black text-[11px] sm:text-xs leading-tight break-keep">
                      {t.home.qualityVal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. AMMUNITION TUBE CORNER KEY INTRO (탄약지환통 핵심 소개) */}
      <section className="py-20 bg-gray-50/50 border-b border-gray-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Ammunition illustration card + Partner Logo Strip */}
            <div className="lg:col-span-5 relative space-y-6">
              <div className="absolute -top-4 -left-4 w-36 h-36 bg-kraft-100/40 rounded-full blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-xl p-4">
                <img 
                  src="https://lh3.googleusercontent.com/d/12bfTAyaEkjVVhjr4rJlRyDT5GxiAmxCy"
                  alt="Ammunition Tube"
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-56 object-cover bg-military-950"
                />
                <div className="mt-4 flex justify-between items-center bg-military-900 text-white rounded-lg p-3.5">
                  <div>
                    <span className="block text-[10px] text-kraft-300 font-mono">AMMUNITION TYPE</span>
                    <span className="block text-xs font-bold font-sans leading-tight">
                      {t.home.customQuantityConsult}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 py-0.5 px-2 rounded">
                    {t.home.sizesCustomisable}
                  </span>
                </div>
              </div>

              {/* 주요 공급 및 군수 협력체 (Supply & Defense Partners Showcase) */}
              <div className="space-y-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono font-bold text-kraft-700 bg-kraft-100/60 px-2 py-0.5 rounded tracking-wider uppercase">
                    {t.home.partnersHeader}
                  </span>
                  <div className="h-px bg-gray-200 flex-1" />
                </div>
                
                {/* 7 logos with clean official images/graphics */}
                <div className="bg-gray-100/40 border border-gray-200 rounded-xl p-2 grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-4 xl:grid-cols-4 gap-1.5">
                  {/* 1. 대한민국 국방부 */}
                  <div className="p-1 px-1.5 bg-white border border-gray-200/60 rounded-lg hover:border-kraft-400 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center h-[60px] shadow-3xs overflow-hidden">
                    <div className="flex-1 w-full flex items-center justify-center p-0.5">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1TMm1GB-kYqNNI3rTaKo6yLr7wd6NDKwL"
                        alt="Ministry of National Defense"
                        className="max-h-7.5 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[8px] font-black text-gray-700 tracking-tighter leading-none mt-0.5 pb-0.5 shrink-0">국방부</span>
                  </div>

                  {/* 2. 방위사업청 */}
                  <div className="p-1 px-1.5 bg-white border border-gray-200/60 rounded-lg hover:border-kraft-400 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center h-[60px] shadow-3xs overflow-hidden">
                    <div className="flex-1 w-full flex items-center justify-center p-0.5">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1UT5mmcEtz_gh392ncjV3jYIWIEPeBh39"
                        alt="DAPA"
                        className="max-h-7.5 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[8px] font-black text-gray-700 tracking-tighter leading-none mt-0.5 pb-0.5 shrink-0">방사청</span>
                  </div>

                  {/* 3. 탄약지원사령부 */}
                  <div className="p-1 px-1.5 bg-white border border-gray-200/60 rounded-lg hover:border-kraft-400 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center h-[60px] shadow-3xs overflow-hidden">
                    <div className="flex-1 w-full flex items-center justify-center p-0.5">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1YeEFMNVO4g_Bs1gqDJGGTifgltIHrH8H"
                        alt="Army Ammunition Support Command"
                        className="max-h-7.5 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[8px] font-black text-gray-700 tracking-tighter leading-none mt-0.5 pb-0.5 shrink-0">탄지원사</span>
                  </div>

                  {/* 4. 한화에어로스페이스 */}
                  <div className="p-1 px-1.5 bg-white border border-gray-200/60 rounded-lg hover:border-kraft-400 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center h-[60px] shadow-3xs overflow-hidden">
                    <div className="flex-1 w-full flex items-center justify-center p-0.5">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1q04UKpLEFNpXhY5L49l5usZC7kzHaZX5"
                        alt="Hanwha Aerospace"
                        className="max-h-7.5 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[8px] font-black text-gray-700 tracking-tighter leading-none mt-0.5 pb-0.5 shrink-0">한화에어로</span>
                  </div>

                  {/* 5. 풍산 */}
                  <div className="p-1 px-1.5 bg-white border border-gray-200/60 rounded-lg hover:border-kraft-400 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center h-[60px] shadow-3xs overflow-hidden">
                    <div className="flex-1 w-full flex items-center justify-center p-0.5">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1IBcG1Fg2fmYoP1rqV9pa6HPigwSAw4vo"
                        alt="Poongsan Logo"
                        className="max-h-7.5 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[8px] font-black text-gray-700 tracking-tighter leading-none mt-0.5 pb-0.5 shrink-0">풍산</span>
                  </div>

                  {/* 6. 삼양화학 */}
                  <div className="p-1 px-1.5 bg-white border border-gray-200/60 rounded-lg hover:border-kraft-400 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center h-[60px] shadow-3xs overflow-hidden">
                    <div className="flex-1 w-full flex items-center justify-center p-0.5">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1LiuhnDf3UFNy3gik9GlhOxUWAn1ybVhj"
                        alt="Samyang Chemical Logo"
                        className="max-h-7.5 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[8px] font-black text-gray-700 tracking-tighter leading-none mt-0.5 pb-0.5 shrink-0">삼양화학</span>
                  </div>

                  {/* 7. LIG넥스원 */}
                  <div className="p-1 px-1.5 bg-white border border-gray-200/60 rounded-lg hover:border-kraft-400 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center h-[60px] shadow-3xs overflow-hidden col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-2">
                    <div className="flex-1 w-full flex items-center justify-center p-0.5">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1-4Y0wX-5omGAIOH_Ih5pfVtGLIwdOxUm"
                        alt="LIG Nex1"
                        className="max-h-7.5 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[8px] font-black text-gray-700 tracking-tighter leading-none mt-0.5 pb-0.5 shrink-0">LIG넥스원</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content info block */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-mono font-bold text-military-800 tracking-widest uppercase bg-military-100 px-3 py-1 rounded-full">
                AMMUNITION CONTAINER
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                {t.home.ammoTitle}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {t.home.ammoDesc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-white border border-gray-150 rounded-xl space-y-1 shadow-xs">
                  <span className="text-xs font-bold text-military-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-kraft-500" />
                    {t.home.ammoPerf1Title}
                  </span>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                    {t.home.ammoPerf1Desc}
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-gray-150 rounded-xl space-y-1 shadow-xs">
                  <span className="text-xs font-bold text-military-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-kraft-500" />
                    {t.home.ammoPerf2Title}
                  </span>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                    {t.home.ammoPerf2Desc}
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onTabChange("ammunition")}
                  className="py-2.5 px-5 rounded-lg border border-military-600 hover:bg-military-50 text-military-850 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  {t.home.moreAmmoBtn}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INDUSTRIAL TUBE CORNER KEY INTRO (일반지관 생산 가능 안내) */}
      <section className="py-20 bg-white border-b border-gray-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-none">
          <div className="space-y-12">
            
            {/* Top row: Text info & description */}
            <div className="max-w-4xl space-y-6 text-left">
              <span className="text-xs font-mono font-bold text-kraft-700 tracking-widest uppercase bg-kraft-100 px-3 py-1 rounded-full">
                INDUSTRIAL PAPER TUBE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                {t.home.industrialTitle}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {t.home.industrialDesc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-gray-50/70 p-5 rounded-2xl border border-gray-150">
                <div className="flex items-start gap-2.5 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-kraft-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-950 mb-0.5 text-xs sm:text-sm">
                      {t.home.indCat1}
                    </strong>
                    <span className="text-gray-550 font-light text-[11px] leading-relaxed">
                      {t.home.indCat1Desc}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-kraft-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-950 mb-0.5 text-xs sm:text-sm">
                      {t.home.indCat2}
                    </strong>
                    <span className="text-gray-550 font-light text-[11px] leading-relaxed">
                      {t.home.indCat2Desc}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-kraft-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-950 mb-0.5 text-xs sm:text-sm">
                      {t.home.indCat3}
                    </strong>
                    <span className="text-gray-550 font-light text-[11px] leading-relaxed">
                      {t.home.indCat3Desc}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onTabChange("industrial")}
                  className="py-2.5 px-5 rounded-lg border border-kraft-500 bg-kraft-50 hover:bg-kraft-100 text-kraft-900 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-3xs"
                >
                  {t.home.moreIndBtn}
                  <ChevronRight className="w-4 h-4 text-kraft-700" />
                </button>
              </div>
            </div>

            {/* Bottom Row: Large wide horizontal image cards */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. 권취용 지관 Card */}
                <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-md p-4 hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                  <div className="bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-4 h-64 sm:h-80 md:h-[350px] lg:h-[400px]">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1Jlt5fXYzYDQRlf8P-8qGFw9idrgZNmOE"
                      alt={t.home.windingCard}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="inline-block bg-kraft-50 text-kraft-900 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border border-kraft-100 shadow-3xs">
                        {t.home.windingCard}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">SPINNING CORE</span>
                  </div>
                </div>

                {/* 2. 포장용 지통 Card */}
                <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md p-4 hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                  <div className="bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-4 h-64 sm:h-80 md:h-[350px] lg:h-[400px]">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1okYLonZ8wBHx0tWwcBo8cSiF1ruH-FL5"
                      alt={t.home.packagingCard}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="inline-block bg-military-50 text-military-850 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border border-military-100 shadow-3xs">
                        {t.home.packagingCard}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">PREMIUM PACKAGING</span>
                  </div>
                </div>
              </div>

              {/* Info ribbon below the two cards */}
              <div className="flex justify-between items-center bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3.5 shadow-3xs">
                <span className="text-[11px] sm:text-xs font-bold flex items-center gap-1.5 text-gray-700">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t.home.ecoRibbon}
                </span>
                <span className="text-[9px] font-mono text-gray-400 uppercase font-black tracking-wider">ECO-FRIENDLY</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SHORTCUT GRID: SIMULATOR & STOCK SALES (규격 시뮬레이터 & 재고판매 바로가기) */}
      <section className="py-16 bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Quick Card 1: Specs Simulator shortcut */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all text-left">
              <div className="space-y-4">
                <div className="p-3.5 bg-military-50 text-military-700 rounded-xl w-fit">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t.home.simTitle}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
                  {t.home.simDesc}
                </p>
              </div>
              <button
                onClick={() => onTabChange("simulator")}
                className="mt-6 py-2.5 px-4 rounded-xl bg-military-600 hover:bg-military-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all self-start border-0"
              >
                {t.home.simBtn}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Card 2: Stock Sales shortcut */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all text-left">
              <div className="space-y-4">
                <div className="p-3.5 bg-kraft-50 text-kraft-700 rounded-xl w-fit">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t.home.stockTitle}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
                  {t.home.stockDesc}
                </p>
              </div>
              <button
                onClick={() => onTabChange("stock")}
                className="mt-6 py-2.5 px-4 rounded-xl bg-kraft-500 hover:bg-kraft-600 text-gray-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all self-start border-0"
              >
                {t.home.stockBtn}
                <ChevronRight className="w-4 h-4 text-gray-950" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. QUALITY & PRODUCTION WRAP (품질·생산 요약) */}
      <section className="py-20 bg-military-950 text-white relative overflow-hidden font-sans">
        <div className="absolute inset-0 tech-grid-dark opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-left space-y-6">
            <span className="text-xs font-mono font-bold text-kraft-400 tracking-widest uppercase">
              RELIABLE PROCESS & HISTORIC EXPERTISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t.home.qualityTitle}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light break-keep whitespace-pre-line">
              {t.home.qualityDesc}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="border-l border-kraft-500/40 pl-4 space-y-1">
                <span className="block font-mono text-xs text-kraft-300 font-bold tracking-widest">EST. 1964</span>
                <span className="block text-sm font-semibold">
                  {t.home.qualityStat1}
                </span>
              </div>
              <div className="border-l border-kraft-500/40 pl-4 space-y-1">
                <span className="block font-mono text-xs text-kraft-300 font-bold tracking-widest">DEFENSE EXPERIENCE</span>
                <span className="block text-sm font-semibold">
                  {t.home.qualityStat2}
                </span>
              </div>
              <div className="border-l border-kraft-500/40 pl-4 space-y-1">
                <span className="block font-mono text-xs text-kraft-300 font-bold tracking-widest">ISO 9001 / 14001</span>
                <span className="block text-sm font-semibold">
                  {t.home.qualityStat3}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onTabChange("quality")}
                className="py-3 px-6 rounded-xl bg-kraft-500 text-gray-950 font-bold text-xs hover:bg-kraft-600 transition-all cursor-pointer flex items-center justify-center gap-1.5 border-0"
              >
                {t.home.qualityBtn}
                <ChevronRight className="w-4 h-4 text-gray-950" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM BANNER INQUIRY ACTION BUTTON (문의하기 버튼) */}
      <section className="py-20 bg-white font-sans text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
            {t.home.bottomTitle}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-light mt-4 max-w-2xl mx-auto leading-relaxed">
            {t.home.bottomDesc}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => onTabChange("contact")}
              className="py-3.5 px-8 rounded-xl bg-military-850 hover:bg-military-900 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-lg active:scale-95 transition-all border-0"
            >
              {t.home.bottomBtn}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
