import { type ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
}

export default function LegalLayout({
  breadcrumb,
  title,
  description,
  sections,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Header />

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

      <Footer />
    </div>
  );
}
