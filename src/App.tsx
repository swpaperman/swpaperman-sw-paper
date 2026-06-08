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

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  
  // Prefill states shared between pages and the Contact inquiry form
  const [prefilledProduct, setPrefilledProduct] = useState("");
  const [prefilledSpecs, setPrefilledSpecs] = useState("");

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
      </main>

      {/* Corporate compliant footer */}
      <Footer />
    </div>
  );
}
