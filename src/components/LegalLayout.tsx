"use client";

import { type ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Fonctionnalités", href: "/#features" },
  { label: "Comment ça marche", href: "/#how-it-works" },
  { label: "À propos", href: "/a-propos" },
];

const FOOTER_LINKS = [
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Conditions", href: "/conditions" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

export interface LegalSection {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

interface LegalLayoutProps {
  breadcrumb: string;
  title: string;
  description: string;
  sections: LegalSection[];
  currentPath: string;
}

export default function LegalLayout({
  breadcrumb,
  title,
  description,
  sections,
  currentPath,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Header */}
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
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Navigation principale"
            style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover-nav-link"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "clamp(40px, 6vw, 64px) clamp(16px, 4vw, 32px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            className="inline-flex items-center gap-2"
            style={{
              fontSize: "13px",
              color: "var(--text-tertiary)",
              marginBottom: "16px",
            }}
          >
            <a href="/" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              Accueil
            </a>
            <span>/</span>
            <span>{breadcrumb}</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 800,
              marginBottom: "16px",
              lineHeight: 1.15,
            }}
          >
            {title}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto" }}>
            {description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "clamp(32px, 6vw, 64px) clamp(16px, 4vw, 32px)", flex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          {sections.map((section, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "clamp(20px, 3vw, 32px)",
              }}
            >
              <div className="flex items-start gap-4" style={{ marginBottom: "16px" }}>
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
                  {section.icon}
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-nunito), sans-serif",
                    color: "var(--text-primary)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    paddingTop: "10px",
                  }}
                >
                  {i + 1}. {section.title}
                </h2>
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", paddingLeft: "60px" }}>
                {section.content}
              </div>
            </div>
          ))}

          <p
            className="text-center"
            style={{ color: "var(--text-tertiary)", fontSize: "13px", marginTop: "16px" }}
          >
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          padding: "24px clamp(16px, 4vw, 32px)",
          textAlign: "center",
        }}
      >
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>
            &copy; {new Date().getFullYear()} AirSearch
          </div>
          <div className="flex items-center gap-4" style={{ fontSize: "13px" }}>
            {FOOTER_LINKS.filter((link) => link.href !== currentPath).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
