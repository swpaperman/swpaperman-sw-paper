/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Layers, ChevronRight, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import AmmunitionView from "./AmmunitionView";
import IndustrialView from "./IndustrialView";

interface ProductsViewProps {
  onTabChange: (tabId: string) => void;
  onQuotePrefill: (prodName: string, specs: string) => void;
  initialSubTab?: "ammunition" | "industrial";
  key?: string;
}

export default function ProductsView({ 
  onTabChange, 
  onQuotePrefill, 
  initialSubTab = "ammunition" 
}: ProductsViewProps) {
  const { language, t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<"ammunition" | "industrial">(initialSubTab);

  // Localization resources
  const content = {
    ko: {
      badge: "제품 라인업",
      title: "제품소개",
      subtitle: "수원지관산업은 탄약 포장용 지환통을 중심으로, 일반 산업용 지관까지 고객의 용도와 규격에 맞춘 맞춤형 지관 제품을 생산합니다.",
      
      ammoCard: {
        engTitle: "AMMUNITION FIBERBOARD CONTAINERS",
        korTitle: "탄약 포장용 지환통",
        desc: "국방 K-방산 분야에서 요구되는 방습성, 내구성, 치수 안정성을 고려한 기능성 포장용 지관입니다. 고객 도면과 요구 규격에 따라 다양한 탄종용 지환통 제작 상담이 가능합니다.",
        tags: ["KDS 8140-4005 규격 대응", "밀폐식 알루미늄 배리어 공법", "우수한 장기 보관안정성", "1:1 맞춤형 도면 설계"],
        actionBtn: "탄약지환통 핵심 스펙 및 라인업 보기"
      },
      indCard: {
        engTitle: "INDUSTRIAL PAPER TUBES",
        korTitle: "일반 산업용 지관",
        desc: "소형 포장용 지관부터 중형·대형 권취용 지관까지 산업 현장의 용도와 치수에 맞춰 제작 가능한 일반 지관 제품입니다.",
        tags: ["Ø10mm ~ Ø200mm+ 대응", "초고강도 압착 회전력 지지", "신속한 맞춤 납기", "환경 친화적 크라프트 100%"],
        actionBtn: "일반 산업용 지관 특징 및 상세 보기"
      },
      currentSelectionTitle: "상세 스펙 & 제품 세부안내"
    },
    en: {
      badge: "PRODUCT PORTFOLIO",
      title: "PRODUCTS",
      subtitle: "Suwon Paper Cone & Tube produces tailor-made paper tubes and fiber containers customized to client parameters, centered on ammunition protective overpacks and scaling up to industrial paper cores.",
      
      ammoCard: {
        engTitle: "AMMUNITION FIBERBOARD CONTAINERS",
        korTitle: "Tactical Overpack Tubes",
        desc: "High-durability moisture-proof containers engineered for K-Defense weapons. Bespoke fabrication available matching custom military blueprints and severe logistical profiles.",
        tags: ["MIL-SPEC & KDS Certified", "Vacuum Alu Barrier Seal", "High Storage Stability", "1:1 Drawing Assistance"],
        actionBtn: "Explore Ammunition Tubes Specifications"
      },
      indCard: {
        engTitle: "INDUSTRIAL PAPER TUBES",
        korTitle: "Industrial Spiral Cores",
        desc: "Versatile industrial winding cores, protective packaging sleeves, and parcel tubes manufactured in custom diameters and thicknesses for diverse processing fields.",
        tags: ["Range Ø10mm ~ Ø200mm+", "Tension-Resistant Build", "Rapid Order Delivery", "Eco-Friendly 100% Recyclable"],
        actionBtn: "View Industrial Core Features"
      },
      currentSelectionTitle: "Specs & Product Configurations"
    },
    tr: {
      badge: "SATIŞ KATALOĞU",
      title: "ÜRÜNLERİMİZ",
      subtitle: "Suwon Paper Cone & Tube, savunma sanayii odaklı mühimmat koruyucu fiberborudan endüstriyel bobin masuralarına kadar müşteri taleplerine göre uyarlanmış özel çözümler üretmektedir.",
      
      ammoCard: {
        engTitle: "AMMUNITION FIBERBOARD CONTAINERS",
        korTitle: "Askeri Mühimmat Muhafazası",
        desc: "K-Savunma sanayiinin yüksek mekanik direnç ve nem yalıtımı talepleri doğrultusunda tasarlanmış, askeri çizimlere uyumlu sızdırmaz boş ambalaj kovanları.",
        tags: ["Askeri KDS Standartı", "Vakum Alüminyum Bariyer", "Uzun Depolama Ömrü", "B2B Teknik Çizim Destek"],
        actionBtn: "Mühimmat Kutusu Ölçülerini İncele"
      },
      indCard: {
        engTitle: "INDUSTRIAL PAPER TUBES",
        korTitle: "Endüstriyel Karton Masuralar",
        desc: "Hafif ambalaj rulosundan ağır sanayi bobin masuralarına kadar çeşitli boyutsal parametrelere ve mukavemet kademelerine uygun standart kraft silindir borular.",
        tags: ["Ø10mm'den Ø200mm'ye Çap", "Yüksek Dönme Momenti Direnci", "Hızlı Teslimat Güvencesi", "%100 Geri Dönüştürülebilir"],
        actionBtn: "Endüstriyel Boru Detaylarını Görüntüle"
      },
      currentSelectionTitle: "Özellikler & Ürün Segmentleri"
    }
  };

  const currentLocalText = content[language === "ko" || language === "tr" ? language : "en"];

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Badge & Main Title Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-military-850 tracking-widest uppercase bg-military-50 px-3 py-1 rounded inline-block">
            {currentLocalText.badge}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4.5xl font-black text-gray-900 tracking-tight leading-none">
            {currentLocalText.title}
          </h1>
          <div className="w-12 h-1 bg-kraft-500 mt-4 rounded-full mx-auto md:mx-0" />
          <p className="mt-5 text-gray-650 text-base sm:text-lg leading-relaxed max-w-4xl font-normal">
            {currentLocalText.subtitle}
          </p>
        </div>

        {/* 2-Card Premium Multi-Choice Selector Layout */}
        <div id="product-tabs" className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-14">
          
          {/* Card 1: Ammunition Containers (Larger, higher emphasis, militarily prominent) */}
          <div 
            onClick={() => setSelectedTab("ammunition")}
            className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg ${
              selectedTab === "ammunition"
                ? "border-military-800 bg-military-50/20 ring-4 ring-military-700/5 -translate-y-1.5"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <div>
              {/* Product Visual Photo */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 border-b border-gray-100">
                <img 
                  src="https://lh3.googleusercontent.com/d/1uqFLlJdJYsa499QEw2glDiP4n-02x5lK" 
                  alt="Ammunition Tubes" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-military-900/90 text-white text-[10px] font-mono font-extrabold tracking-widest px-2.5 py-1 rounded shadow-xs uppercase">
                  CORE DEFENSE PRODUCT
                </div>
                {selectedTab === "ammunition" && (
                  <div className="absolute top-3 right-3 bg-military-700 text-white p-1 rounded-full shadow-xs">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Text Information Block */}
              <div className="p-6 sm:p-8 text-left">
                <span className="block text-[11px] font-mono font-bold text-military-800 tracking-wider uppercase mb-1">
                  {currentLocalText.ammoCard.engTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <ShieldAlert className="w-5.5 h-5.5 text-military-800 shrink-0" />
                  {currentLocalText.ammoCard.korTitle}
                </h3>
                <p className="mt-3.5 text-gray-600 text-sm leading-relaxed font-light font-normal">
                  {currentLocalText.ammoCard.desc}
                </p>

                {/* Technical Keywords Block */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {currentLocalText.ammoCard.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-military-50 text-military-900 border border-military-200"
                    >
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* View Details Action Button Area */}
            <div className="p-6 pt-0">
              <button 
                type="button"
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedTab === "ammunition"
                    ? "bg-military-800 text-white shadow-md hover:bg-military-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{currentLocalText.ammoCard.actionBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Industrial Paper Tubes (Standard emphasis, civil expansion line) */}
          <div 
            onClick={() => setSelectedTab("industrial")}
            className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-md ${
              selectedTab === "industrial"
                ? "border-military-800 bg-military-50/20 ring-4 ring-military-700/5 -translate-y-1.5"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <div>
              {/* Product Visual Photo */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 border-b border-gray-100">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Jlt5fXYzYDQRlf8P-8qGFw9idrgZNmOE" 
                  alt="Industrial Tubes" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-kraft-800 text-white text-[10px] font-mono font-extrabold tracking-widest px-2.5 py-1 rounded shadow-xs uppercase">
                  CIVIL REINFORCEMENT
                </div>
                {selectedTab === "industrial" && (
                  <div className="absolute top-3 right-3 bg-military-700 text-white p-1 rounded-full shadow-xs">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Text Information Block */}
              <div className="p-6 sm:p-8 text-left">
                <span className="block text-[11px] font-mono font-bold text-kraft-700 tracking-wider uppercase mb-1">
                  {currentLocalText.indCard.engTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-5.5 h-5.5 text-kraft-700 shrink-0" />
                  {currentLocalText.indCard.korTitle}
                </h3>
                <p className="mt-3.5 text-gray-600 text-sm leading-relaxed font-light font-normal">
                  {currentLocalText.indCard.desc}
                </p>

                {/* Technical Keywords Block */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {currentLocalText.indCard.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-kraft-50 text-kraft-900 border border-kraft-200"
                    >
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* View Details Action Button Area */}
            <div className="p-6 pt-0">
              <button 
                type="button"
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedTab === "industrial"
                    ? "bg-military-800 text-white shadow-md hover:bg-military-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{currentLocalText.indCard.actionBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Content Divider */}
        <div className="border-t border-gray-100 pt-8 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-5 bg-military-800 rounded-full" />
            <h4 className="text-sm font-extrabold text-military-900 tracking-widest uppercase">
              {currentLocalText.currentSelectionTitle}
            </h4>
            <div className="h-px bg-gray-100 flex-1" />
          </div>
        </div>

        {/* Dynamic Nested View Rendering */}
        <div id="nested-product-content" className="relative">
          <AnimatePresence mode="wait">
            {selectedTab === "ammunition" ? (
              <motion.div
                key="ammo-sub-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AmmunitionView 
                  onTabChange={onTabChange} 
                  onQuotePrefill={onQuotePrefill} 
                  hideHeader={true}
                />
              </motion.div>
            ) : (
              <motion.div
                key="ind-sub-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <IndustrialView 
                  onTabChange={onTabChange} 
                  onQuotePrefill={onQuotePrefill} 
                  hideHeader={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
