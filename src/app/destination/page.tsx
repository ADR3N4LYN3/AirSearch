import type { Metadata } from "next";
import Link from "next/link";
import { Search, DollarSign, SlidersHorizontal } from "lucide-react";
import { DESTINATIONS } from "@/lib/destinations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://airsearch.fr";

export const metadata: Metadata = {
  title: "Destinations populaires - Locations de vacances en France | AirSearch",
  description:
    "Découvrez nos destinations populaires en France : Paris, Nice, Lyon, Marseille, Bordeaux, Strasbourg, Toulouse, Montpellier, Biarritz, Annecy. Comparez les locations Airbnb, Booking et Abritel.",
  alternates: {
    canonical: `${SITE_URL}/destination`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}/destination`,
    siteName: "AirSearch",
    title: "Destinations populaires - Locations de vacances en France",
    description:
      "Trouvez votre location de vacances dans les plus belles villes de France. Comparez les prix sur toutes les plateformes.",
  },
};

const DESTINATION_EMOJIS: Record<string, string> = {
  paris: "🗼",
  nice: "☀️",
  lyon: "🍷",
  marseille: "⛵",
  bordeaux: "🍇",
  strasbourg: "🏰",
  toulouse: "🌹",
  montpellier: "🌞",
  biarritz: "🏄",
  annecy: "🏔️",
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Header />

      {/* Hero */}
      <section
        className="w-full"
        style={{
          background: "var(--accent-gradient)",
          padding: "clamp(56px, 10vw, 96px) clamp(24px, 4vw, 48px) clamp(48px, 8vw, 80px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1120px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <FadeIn delay={0}>
            <nav
              className="flex items-center gap-2 text-sm"
              style={{ color: "rgba(255,255,255,0.7)", marginBottom: "32px" }}
            >
              <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                Accueil
              </Link>
              <span>/</span>
              <span style={{ color: "#fff", fontWeight: 600 }}>Destinations</span>
            </nav>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="font-extrabold"
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                color: "#fff",
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              Nos destinations en France
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                lineHeight: 1.7,
                maxWidth: "640px",
              }}
            >
              Comparez les meilleures offres de location sur Airbnb, Booking.com et Abritel
              dans les plus belles villes de France.
            </p>
          </FadeIn>

          {/* Stats bar */}
          <FadeIn delay={0.3}>
            <div
              className="flex flex-wrap gap-8"
              style={{ marginTop: "36px", color: "rgba(255,255,255,0.9)", fontSize: "0.95rem" }}
            >
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span><strong>{DESTINATIONS.length}</strong> destinations</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span><strong>3</strong> plateformes comparées</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>À partir de <strong>55€</strong>/nuit</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <main className="w-full" style={{ flex: 1 }}>
        {/* Destination Cards */}
        <section
          className="w-full"
          style={{
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <StaggerContainer
              staggerDelay={0.12}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "28px",
              }}
            >
              {DESTINATIONS.map((destination) => (
                <StaggerItem key={destination.slug}>
                <Link
                  href={`/destination/${destination.slug}`}
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
                  <article
                    className="destination-card"
                    style={{
                      background: "var(--surface)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--border)",
                      padding: "0",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.25s ease",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {/* Card header with gradient */}
                    <div
                      style={{
                        background: "var(--accent-gradient)",
                        padding: "28px 28px 24px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "2.5rem",
                          lineHeight: 1,
                          marginBottom: "10px",
                        }}
                      >
                        {DESTINATION_EMOJIS[destination.slug] || "📍"}
                      </div>
                      <span
                        style={{
                          display: "inline-block",
                          background: "rgba(255,255,255,0.2)",
                          color: "#fff",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          padding: "4px 12px",
                          borderRadius: "9999px",
                          marginBottom: "14px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {destination.region}
                      </span>
                      <h2
                        className="font-extrabold"
                        style={{
                          fontFamily: "var(--font-nunito), sans-serif",
                          color: "#fff",
                          fontSize: "1.75rem",
                          letterSpacing: "-0.02em",
                          margin: 0,
                        }}
                      >
                        {destination.name}
                      </h2>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "24px 28px 28px", flex: 1, display: "flex", flexDirection: "column", textAlign: "center" }}>
                      <p
                        className="line-clamp-3"
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.95rem",
                          lineHeight: 1.7,
                          marginBottom: "20px",
                        }}
                      >
                        {destination.shortDescription}
                      </p>

                      {/* Info chips */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "8px",
                          marginBottom: "20px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            borderRadius: "9999px",
                            padding: "6px 14px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: "var(--text-primary)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                          {destination.avgPrice}/nuit
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            borderRadius: "9999px",
                            padding: "6px 14px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: "var(--text-primary)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {destination.bestSeason}
                        </span>
                      </div>

                      {/* Top attractions preview */}
                      <div style={{ marginBottom: "20px" }}>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: "var(--text-tertiary)",
                            marginBottom: "8px",
                          }}
                        >
                          Top attractions
                        </p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {destination.attractions.slice(0, 4).map((attraction) => (
                            <span
                              key={attraction}
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--text-secondary)",
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                                borderRadius: "6px",
                                padding: "3px 10px",
                              }}
                            >
                              {attraction}
                            </span>
                          ))}
                          {destination.attractions.length > 4 && (
                            <span
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--accent)",
                                fontWeight: 600,
                                padding: "3px 6px",
                              }}
                            >
                              +{destination.attractions.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div
                        className="destination-card-cta"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "16px",
                          borderTop: "1px solid var(--border)",
                          marginTop: "auto",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent)",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                          }}
                        >
                          Voir les locations
                        </span>
                        <span
                          className="destination-card-arrow"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "var(--accent)",
                            color: "#fff",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Why AirSearch - SEO Section */}
        <section
          className="w-full"
          style={{
            background: "var(--bg-secondary)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <FadeIn>
              <h2
                className="font-bold"
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  marginBottom: "40px",
                  textAlign: "center",
                }}
              >
                Pourquoi utiliser AirSearch pour vos locations ?
              </h2>
            </FadeIn>

            <StaggerContainer
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "48px",
              }}
            >
              {[
                {
                  icon: <Search size={24} color="var(--accent)" strokeWidth={2} />,
                  title: "Comparaison en temps réel",
                  text: "Notre technologie compare instantanément les offres Airbnb, Booking.com et Abritel pour vous présenter les meilleures options.",
                },
                {
                  icon: <DollarSign size={24} color="var(--accent)" strokeWidth={2} />,
                  title: "Meilleur prix garanti",
                  text: "Trouvez le meilleur rapport qualité-prix en centralisant toutes les offres en un seul endroit.",
                },
                {
                  icon: <SlidersHorizontal size={24} color="var(--accent)" strokeWidth={2} />,
                  title: "Filtres intelligents",
                  text: "Filtrez par prix, équipements, quartier et dates pour trouver exactement le logement que vous cherchez.",
                },
              ].map((feature) => (
                <StaggerItem key={feature.title}>
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
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "var(--accent-light)",
                        margin: "0 auto 16px",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: "10px",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                      {feature.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.2}>
              <div style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8 }}>
                <p style={{ marginBottom: "16px" }}>
                  Que vous recherchiez un appartement à Paris, une villa sur la Côte d&apos;Azur, un
                  logement à Lyon ou un hébergement à Bordeaux, AirSearch vous fait gagner du temps
                  et de l&apos;argent en centralisant toutes les offres en un seul endroit.
                </p>
                <p>
                  Notre comparateur vous permet de filtrer par prix, équipements, quartier et dates
                  pour trouver exactement ce que vous cherchez. Plus besoin de consulter plusieurs
                  sites — AirSearch fait le travail pour vous.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="w-full"
          style={{
            background: "var(--accent-gradient)",
            padding: "clamp(56px, 10vw, 96px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <FadeIn>
              <h2
                className="font-bold"
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(2rem, 5vw, 2.5rem)",
                  marginBottom: "20px",
                }}
              >
                Trouvez votre prochaine location
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1.7,
                  fontSize: "1.05rem",
                  marginBottom: "40px",
                  maxWidth: "540px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Comparez instantanément les offres de toutes les plateformes et réservez en quelques clics
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                href="/"
                className="transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: "#fff",
                  color: "var(--accent)",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                Lancer une recherche
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Hover styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .destination-card {
          cursor: pointer;
        }
        .destination-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-card-hover) !important;
          border-color: var(--accent) !important;
        }
        .destination-card:hover .destination-card-arrow {
          transform: translateX(4px);
        }
        @media (max-width: 400px) {
          .destination-card {
            min-width: 0 !important;
          }
        }
      `}} />

      <Footer />
    </div>
  );
}
