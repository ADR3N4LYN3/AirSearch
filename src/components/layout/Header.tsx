"use client";

import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "À propos", href: "/a-propos" },
];

export default function Header() {
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

        <ThemeToggle />
      </div>
    </header>
  );
}
