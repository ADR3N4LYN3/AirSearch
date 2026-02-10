"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "À propos", href: "/a-propos" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  return (
    <header
      className="w-full flex items-center"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "64px",
        padding: "0 clamp(24px, 4vw, 48px)",
      }}
    >
      <div className="w-full flex items-center justify-between">
        <a
          href="/"
          className="font-extrabold tracking-tight"
          aria-label="AirSearch - Accueil"
          style={{
            fontFamily: "var(--font-nunito), sans-serif",
            color: "var(--accent)",
            letterSpacing: "-0.03em",
            textDecoration: "none",
            fontSize: "1.75rem",
            fontWeight: 900,
          }}
        >
          AirSearch
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Navigation principale"
          style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover-nav-link"
              style={{
                color: "#fff",
                textDecoration: "none",
                background: "var(--accent)",
                border: "1px solid var(--accent)",
                borderRadius: "9999px",
                padding: "6px 16px",
                transition: "all 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-button, 8px)",
              border: "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h18" />
                <path d="M3 6h18" />
                <path d="M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          id="mobile-nav"
          role="navigation"
          aria-label="Navigation mobile"
          className="md:hidden animate-fade-in"
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
            padding: "16px clamp(24px, 4vw, 48px)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium"
              style={{
                color: "var(--text-primary)",
                textDecoration: "none",
                padding: "10px 16px",
                borderRadius: "var(--radius-button, 8px)",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
