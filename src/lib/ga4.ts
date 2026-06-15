/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

const GA_MEASUREMENT_ID = "G-902J17J1HQ";

// Explicit check for real production hostnames to avoid polluting live tracking with localhost or dev reviews
const isProdDomain = (): boolean => {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  return hostname === "sw-paper.com" || hostname === "www.sw-paper.com";
};

// Access standard dataLayer and gtag safely
/* eslint-disable @typescript-eslint/no-explicit-any */
const getGtag = (): any => {
  if (typeof window === "undefined") return null;
  return (window as any).gtag;
};

// Log GA4 calls for development / debugging inspection
const logDebug = (msg: string, ...args: any[]) => {
  // Always log in development so the user can see validation
  if (!isProdDomain()) {
    console.log(`%c[GA4-Simulated]%c ${msg}`, "color: #b45309; font-weight: bold;", "", ...args);
  }
};

/**
 * Get current cookie consent status from localStorage
 */
export const getCookieConsent = (): "granted" | "denied" | "unanswered" => {
  if (typeof window === "undefined") return "unanswered";
  const saved = localStorage.getItem("suwon_cookie_consent");
  if (saved === "granted") return "granted";
  if (saved === "denied") return "denied";
  return "unanswered";
};

/**
 * Configure default Consent Mode and dynamically load the Google Analytics gtag script.
 * Respects the user's domain and consent requirements.
 */
export const initializeGA4 = () => {
  if (typeof window === "undefined") return;

  const currentConsent = getCookieConsent();
  const consentString = currentConsent === "granted" ? "granted" : "denied";

  // 1. Initialize dataLayer and gtag if they don't exist
  const win = window as any;
  win.dataLayer = win.dataLayer || [];
  
  function gtag(..._args: any[]) {
    win.dataLayer.push(arguments);
  }
  win.gtag = gtag;

  // 2. Set default consent using Consent Mode v2 (Default analytics_storage based on choice, ads are denied)
  gtag("consent", "default", {
    analytics_storage: consentString,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  logDebug("Initialized Consent Mode v2 default:", {
    analytics_storage: consentString,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  // 3. Prevent loading the actual Google script if not on valid production domain (fully safe installation)
  if (!isProdDomain()) {
    logDebug("Skipped live analytics script injection on dev/preview domain:", window.location.hostname);
    return;
  }

  // 4. Inject script tag asynchronously only on live domain
  const scriptId = "ga4-gtag-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    
    script.onload = () => {
      gtag("js", new Date());
      // Config GA4 on production without auto-sending initial page views to prevent double counts in SPA
      gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
        anonymize_ip: true,
      });
      logDebug("Loaded GA4 official script successfully.");
    };

    document.head.appendChild(script);
  }
};

/**
 * Updates consent status dynamically when user accepts/rejects cookies.
 */
export const updateGAConsent = (granted: boolean) => {
  if (typeof window === "undefined") return;

  const consentString = granted ? "granted" : "denied";
  localStorage.setItem("suwon_cookie_consent", consentString);

  const gtagFn = getGtag();
  if (gtagFn) {
    gtagFn("consent", "update", {
      analytics_storage: consentString,
    });
  }

  logDebug(`Consent status updated to: ${consentString}`);

  // Re-initialize GA4 to force reload or reconfigure
  initializeGA4();
};

/**
 * General helper to dispatch events safely checking domain constraints
 */
const sendEvent = (eventName: string, params: Record<string, any>) => {
  // Personal privacy guarantee: Clean dynamic fields of direct identifiers to ensure complete PII shielding
  const cleanedParams = { ...params };
  const piiKeys = [
    "name", "username", "contactName", "companyName", "phoneNumber", 
    "phone", "email", "emailAddress", "address", "comments", "memo"
  ];
  
  piiKeys.forEach(key => {
    if (key in cleanedParams) {
      delete cleanedParams[key];
    }
  });

  logDebug(`Event dispatched: "${eventName}"`, cleanedParams);

  if (!isProdDomain()) return;

  const gtagFn = getGtag();
  if (gtagFn) {
    gtagFn("event", eventName, cleanedParams);
  }
};

/**
 * 2. Page View tracking for SPAs (Tab shifts)
 */
export const trackPageView = (pageTitle: string, pagePath: string, language: string, classification: string) => {
  sendEvent("page_view", {
    page_title: pageTitle,
    page_location: window.location.origin + pagePath,
    page_path: pagePath,
    language: language,
    page_classification: classification, // custom parameter for page classification
  });
};

/**
 * 3.a Language change event
 */
export const trackLanguageChange = (previousLanguage: string, selectedLanguage: string, pagePath: string) => {
  sendEvent("language_change", {
    previous_language: previousLanguage,
    selected_language: selectedLanguage,
    page_path: pagePath,
  });
};

/**
 * 3.b Product detail views
 */
export const trackProductView = (
  productName: string,
  productCategory: "grenade_and_small_caliber" | "2_75_inch" | "60mm_81mm" | "105mm_120mm" | "industrial_paper_tube" | string,
  productType: string,
  language: string,
  pagePath: string
) => {
  sendEvent("product_view", {
    product_name: productName,
    product_category: productCategory,
    product_type: productType,
    language,
    page_path: pagePath,
  });
};

/**
 * 3.c Major navigation item clicked
 */
export const trackNavigationClick = (menuName: string, destination: string, language: string) => {
  sendEvent("navigation_click", {
    menu_name: menuName,
    destination: destination,
    language: language,
  });
};

/**
 * 3.d Core call-to-action (CTA) clicks
 */
export const trackCTAClick = (
  buttonName: string,
  buttonLocation: string,
  pagePath: string,
  language: string
) => {
  sendEvent("cta_click", {
    button_name: buttonName,
    button_location: buttonLocation,
    page_path: pagePath,
    language,
  });
};

/**
 * 3.e Contacts clicked
 */
export const trackContactClick = (
  contactType: "phone" | "email" | "contact_form" | "map",
  pagePath: string,
  language: string
) => {
  sendEvent("contact_click", {
    contact_type: contactType,
    page_path: pagePath,
    language,
  });
};

/**
 * 3.f File download event (catalogs, specifications etc.)
 */
export const trackFileDownload = (
  fileName: string,
  fileType: string,
  documentCategory: string,
  pagePath: string,
  language: string
) => {
  sendEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
    document_category: documentCategory,
    page_path: pagePath,
    language,
  });
};

/**
 * 3.g News/press release views
 */
export const trackNewsView = (newsTitle: string, newsCategory: "suwon_news" | "domestic_defense" | "global_defense" | string, language: string) => {
  sendEvent("news_view", {
    news_title: newsTitle,
    news_category: newsCategory,
    language,
  });
};

/**
 * 3.h Inquiry form filling start event
 */
export const trackFormStart = (formName: string, pagePath: string, language: string) => {
  sendEvent("form_start", {
    form_name: formName,
    page_path: pagePath,
    language,
  });
};

/**
 * 3.i Lead generation (Actual submit success verified server/database-side)
 */
export const trackGenerateLead = (
  formName: string,
  inquiryType: string,
  productCategory: string,
  language: string,
  success: boolean
) => {
  sendEvent("generate_lead", {
    form_name: formName,
    inquiry_type: inquiryType,
    product_category: productCategory,
    language,
    success,
  });
};

/**
 * 3.j Inquiry submit failure errors
 */
export const trackFormError = (formName: string, errorType: string, language: string) => {
  sendEvent("form_error", {
    form_name: formName,
    error_type: errorType,
    language,
  });
};
