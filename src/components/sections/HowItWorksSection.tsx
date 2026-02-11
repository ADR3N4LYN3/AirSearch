"use client";

import type { ReactNode } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Décrivez votre séjour",
    description:
      "Renseignez votre destination, vos dates, votre budget et vos préférences. Soyez aussi précis que possible.",
  },
  {
    number: "02",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "Notre technologie compare en temps réel",
    description:
      "Notre technologie analyse simultanément Airbnb, Booking.com et Abritel pour trouver les meilleures offres correspondant à vos critères.",
  },
  {
    number: "03",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    title: "Choisissez et réservez",
    description:
      "Consultez les meilleurs résultats personnalisés avec prix, photos et liens directs. Réservez en toute confiance.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full"
      style={{ padding: "clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px)" }}
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
              Comment ça marche ?
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
              Trois étapes simples pour trouver votre prochain logement de vacances.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.15}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(24px, 4vw, 32px)",
          }}
        >
          {STEPS.map((step, i) => (
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
                  textAlign: "center",
                  gap: "20px",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    fontFamily: "var(--font-nunito), sans-serif",
                    color: "var(--accent)",
                    opacity: 0.3,
                    letterSpacing: "-0.04em",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </div>

                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "var(--accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>

                <h3
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
