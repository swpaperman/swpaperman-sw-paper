/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationSchema } from "../lib/translations";

type LanguageType = "ko" | "en" | "tr";

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    // Check local storage or browser language
    const saved = localStorage.getItem("suwon_pref_lang");
    if (saved === "ko" || saved === "en" || saved === "tr") {
      return saved as LanguageType;
    }
    // Check browser default
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang === "tr") return "tr";
    if (browserLang === "en") return "en";
    return "ko";
  });

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem("suwon_pref_lang", lang);
  };

  // Synchronize html lang tag
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextProps = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
