import type { ReactNode } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Recherche intelligente",
    description:
      "Décrivez simplement ce que vous cherchez en langage naturel. Notre technologie comprend vos préférences et trouve les meilleurs logements.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Multi-plateformes",
    description:
      "Analyse simultanée sur Airbnb, Booking.com, Abritel et d\u2019autres plateformes pour comparer les meilleures offres.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Localisation précise",
    description:
      "Sélectionnez une zone sur la carte avec un rayon de recherche personnalisé pour des résultats ultra-ciblés.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "Conseils personnalisés",
    description:
      "Recevez des recommandations sur les quartiers, les périodes idéales et les bons plans pour votre destination.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px)",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: "clamp(32px, 5vw, 64px)", textAlign: "center", width: "100%" }}>
            <h2
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                fontWeight: 700,
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              Pourquoi AirSearch ?
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontSize: "1.05rem",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                width: "100%",
              }}
            >
              Fini les heures passées à comparer les annonces. Laissez
              la technologie faire le travail pour vous.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {FEATURES.map((feature, i) => (
            <StaggerItem key={i}>
              <div
                className="feature-card"
                style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--border)",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "var(--accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
