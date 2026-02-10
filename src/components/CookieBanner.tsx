"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCookieConsent } from "./cookie/useCookieConsent";
import CookieToggle from "./cookie/CookieToggle";

const LEGAL_PAGES = ["/confidentialite", "/conditions", "/mentions-legales"];

export default function CookieBanner() {
  const {
    mounted,
    isDismissed,
    preferences,
    setPreferences,
    handleConsent,
    handleSaveCustom,
  } = useCookieConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const pathname = usePathname();

  if (!mounted || isDismissed) return null;

  const isLegalPage = LEGAL_PAGES.includes(pathname);

  return (
    <>
      {/* Backdrop blur overlay */}
      {!isLegalPage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            background: "rgba(0, 0, 0, 0.3)",
          }}
        />
      )}

      {/* Banner */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          padding: "clamp(16px, 4vw, 32px)",
          pointerEvents: "none",
        }}
      >
        <div
          className="animate-fade-in"
          style={{
            width: "100%",
            maxWidth: showCustomize ? "620px" : "560px",
            pointerEvents: "auto",
            transition: "max-width 0.3s ease",
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-card)",
              boxShadow: "var(--shadow-xl)",
              padding: "clamp(20px, 4vw, 28px)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Icon + Text */}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "var(--accent-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 14v.01" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-nunito), sans-serif",
                    color: "var(--text-primary)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    marginBottom: "8px",
                  }}
                >
                  Cookies &amp; confidentialité
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  AirSearch utilise des cookies essentiels (thème, session) et,
                  avec votre accord, des cookies analytiques pour améliorer le service.{" "}
                  <a
                    href="/confidentialite"
                    style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
                  >
                    En savoir plus
                  </a>
                </p>
              </div>
            </div>

            {/* Customize panel */}
            {showCustomize && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <CookieToggle
                  label="Cookies essentiels"
                  description="Nécessaires au fonctionnement du site (thème, session)"
                  enabled={true}
                  disabled={true}
                />
                <CookieToggle
                  label="Cookies analytiques"
                  description="Mesure d'audience anonyme pour améliorer le service"
                  enabled={preferences.analytics}
                  onToggle={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                />
                <CookieToggle
                  label="Cookies marketing"
                  description="Publicités personnalisées et contenus ciblés"
                  enabled={preferences.marketing}
                  onToggle={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                  showBorder={false}
                />
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", flexWrap: "wrap" }}>
              <button
                onClick={() => handleConsent("refused")}
                className="cookie-btn-secondary"
                style={{
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Refuser
              </button>
              {showCustomize ? (
                <button
                  onClick={handleSaveCustom}
                  className="cookie-btn-primary"
                  style={{
                    padding: "10px 24px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(255, 56, 92, 0.3)",
                  }}
                >
                  Enregistrer mes choix
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowCustomize(true)}
                    className="cookie-btn-secondary"
                    style={{
                      padding: "10px 20px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "inherit",
                      background: "transparent",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-full)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Personnaliser
                  </button>
                  <button
                    onClick={() => handleConsent("accepted")}
                    className="cookie-btn-primary"
                    style={{
                      padding: "10px 24px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "inherit",
                      background: "var(--accent)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "var(--radius-full)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 12px rgba(255, 56, 92, 0.3)",
                    }}
                  >
                    Accepter
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
