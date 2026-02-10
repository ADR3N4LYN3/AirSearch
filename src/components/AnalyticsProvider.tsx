"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function AnalyticsProvider() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    // Check initial consent
    checkConsent();

    // Listen for consent changes (fired by CookieBanner)
    const handleConsent = () => checkConsent();
    window.addEventListener("cookie-consent-update", handleConsent);
    return () => window.removeEventListener("cookie-consent-update", handleConsent);
  }, []);

  function checkConsent() {
    try {
      const prefsRaw = localStorage.getItem("cookie-preferences");
      if (prefsRaw) {
        const prefs = JSON.parse(prefsRaw);
        setAnalyticsAllowed(prefs.analytics === true);
      }
    } catch {
      // ignore
    }
  }

  // Don't render anything if no GA ID or no consent
  if (!GA_MEASUREMENT_ID || !analyticsAllowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
