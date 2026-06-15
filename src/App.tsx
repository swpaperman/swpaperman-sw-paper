/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HomeView from "./components/HomeView";
import ProductsView from "./components/ProductsView";
import SimulatorView from "./components/SimulatorView";
import StockSalesView from "./components/StockSalesView";
import QualityProductionView from "./components/QualityProductionView";
import ReferenceView from "./components/ReferenceView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import NewsView from "./components/NewsView";
import Footer from "./components/Footer";
import PrivacyView from "./components/PrivacyView";
import CookieBanner from "./components/CookieBanner";
import { useLanguage } from "./context/LanguageContext";
import { initializeGA4, trackPageView } from "./lib/ga4";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const { language, t } = useLanguage();
  
  // Prefill states shared between pages and the Contact inquiry form
  const [prefilledProduct, setPrefilledProduct] = useState("");
  const [prefilledSpecs, setPrefilledSpecs] = useState("");
  const [forceCookieBanner, setForceCookieBanner] = useState(false);

  // Initialize GA4 with Consent Mode v2 once on load
  useEffect(() => {
    initializeGA4();
  }, []);

  // Track page view cleanly whenever activeTab or language shifts
  useEffect(() => {
    let pageTitle = "";
    let classification = "home";

    switch (activeTab) {
      case "home":
        pageTitle = t.nav.home;
        classification = "home";
        break;
      case "products":
      case "ammunition":
        pageTitle = language === "ko" ? "탄약지환통 제품군" : language === "tr" ? "Mühimmat Kutuları" : "Ammunition Containers";
        classification = "defense_product";
        break;
      case "industrial":
        pageTitle = language === "ko" ? "일반 산업용 지관" : language === "tr" ? "Endüstriyel Masuralar" : "Industrial Paper Cores";
        classification = "industrial_product";
        break;
      case "simulator":
        pageTitle = t.nav.simulator;
        classification = "industrial_product";
        break;
      case "stock":
        pageTitle = t.nav.stock;
        classification = "product_sales";
        break;
      case "quality":
        pageTitle = t.nav.quality;
        classification = "technology";
        break;
      case "reference":
        pageTitle = t.nav.reference;
        classification = "certification";
        break;
      case "news":
        pageTitle = t.nav.news;
        classification = "news";
        break;
      case "about":
        pageTitle = t.nav.about;
        classification = "company";
        break;
      case "contact":
        pageTitle = t.nav.contact;
        classification = "inquiry";
        break;
      case "privacy":
        pageTitle = language === "ko" ? "개인정보처리방침" : language === "tr" ? "Gizlilik Politikası" : "Privacy Policy";
        classification = "privacy";
        break;
      case "terms":
        pageTitle = language === "ko" ? "이용약관" : language === "tr" ? "Kullanım Şartları" : "Terms of Service";
        classification = "terms";
        break;
      default:
        pageTitle = t.nav.home;
        classification = "home";
    }

    trackPageView(pageTitle, `/${activeTab}`, language, classification);
  }, [activeTab, language, t]);

  // Smooth-snap to top of page when changing page tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleQuotePrefill = (productName: string, specsStr: string) => {
    setPrefilledProduct(productName);
    setPrefilledSpecs(specsStr);
  };

  const handleInquiryActionHeader = () => {
    setActiveTab("contact");
  };

  const clearPrefill = () => {
    setPrefilledProduct("");
    setPrefilledSpecs("");
  };

  return (
    <div className="bg-white min-h-screen selection:bg-kraft-200 selection:text-kraft-900 text-gray-800 antialiased overflow-x-hidden font-sans flex flex-col justify-between">
      
      {/* 8-Item Modular Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onInquiryClick={handleInquiryActionHeader}
      />

      {/* Main Pages Router wrapper */}
      <main className="flex-grow">
        {activeTab === "home" && (
          <HomeView onTabChange={setActiveTab} />
        )}
        
        {activeTab === "products" && (
          <ProductsView 
            onTabChange={setActiveTab} 
            onQuotePrefill={handleQuotePrefill} 
          />
        )}

        {activeTab === "ammunition" && (
          <ProductsView 
            onTabChange={setActiveTab} 
            onQuotePrefill={handleQuotePrefill} 
            initialSubTab="ammunition"
            key="products-ammo"
          />
        )}
        
        {activeTab === "industrial" && (
          <ProductsView 
            onTabChange={setActiveTab} 
            onQuotePrefill={handleQuotePrefill} 
            initialSubTab="industrial"
            key="products-ind"
          />
        )}
        
        {activeTab === "simulator" && (
          <SimulatorView 
            onTabChange={setActiveTab} 
            onQuotePrefill={handleQuotePrefill} 
          />
        )}
        
        {activeTab === "stock" && (
          <StockSalesView 
            onTabChange={setActiveTab} 
            onQuotePrefill={handleQuotePrefill} 
          />
        )}
        
        {activeTab === "quality" && (
          <QualityProductionView />
        )}

        {activeTab === "reference" && (
          <ReferenceView onTabChange={setActiveTab} />
        )}
        
        {activeTab === "about" && (
          <AboutView />
        )}

        {activeTab === "news" && (
          <NewsView onTabChange={setActiveTab} />
        )}
        
        {activeTab === "contact" && (
          <ContactView 
            prefilledProduct={prefilledProduct}
            prefilledSpecs={prefilledSpecs}
            onClearPrefills={clearPrefill}
          />
        )}

        {(activeTab === "privacy" || activeTab === "terms") && (
          <PrivacyView 
            type={activeTab as "privacy" | "terms"}
            onTabChange={setActiveTab}
            onOpenCookieSettings={() => setForceCookieBanner(true)}
          />
        )}
      </main>

      {/* Corporate compliant footer */}
      <Footer 
        onTabChange={setActiveTab}
        onOpenCookieSettings={() => setForceCookieBanner(true)}
      />

      {/* Cookie Consent banner (Consent Mode v2) */}
      <CookieBanner 
        forceOpen={forceCookieBanner}
        onCloseForce={() => setForceCookieBanner(false)}
      />
    </div>
  );
}
