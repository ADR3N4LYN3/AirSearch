"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "refused" | "custom" | null;

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function useCookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cookie-consent") as Consent;
    setConsent(saved);
    const savedPrefs = localStorage.getItem("cookie-preferences");
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs));
      } catch (error) {
        console.warn("[CookieConsent] Failed to parse saved preferences:", error);
      }
    }
  }, []);

  const handleConsent = (choice: "accepted" | "refused") => {
    localStorage.setItem("cookie-consent", choice);
    if (choice === "accepted") {
      const allOn: CookiePreferences = { essential: true, analytics: true, marketing: true };
      localStorage.setItem("cookie-preferences", JSON.stringify(allOn));
    } else {
      localStorage.setItem("cookie-preferences", JSON.stringify(DEFAULT_PREFERENCES));
    }
    setConsent(choice);
    window.dispatchEvent(new Event("cookie-consent-update"));
  };

  const handleSaveCustom = () => {
    localStorage.setItem("cookie-consent", "custom");
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    setConsent("custom");
    window.dispatchEvent(new Event("cookie-consent-update"));
  };

  const isDismissed = consent === "accepted" || consent === "refused" || consent === "custom";

  return {
    mounted,
    isDismissed,
    preferences,
    setPreferences,
    handleConsent,
    handleSaveCustom,
  };
}
