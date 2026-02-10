import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDestination,
  getAllDestinationSlugs,
  type Destination,
} from "@/lib/destinations";
import SearchForm from "@/components/SearchForm";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://airsearch.fr";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllDestinationSlugs();
  return slugs.map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params;
  const destination = getDestination(city);

  if (!destination) {
    return {
      title: "Destination non trouvée",
    };
  }

  const canonicalUrl = `${SITE_URL}/destination/${destination.slug}`;

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: canonicalUrl,
      siteName: "AirSearch",
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: `Location vacances à ${destination.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [destination.image],
    },
  };
}

function DestinationJsonLd({ destination }: { destination: Destination }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `${SITE_URL}/destination`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: `${SITE_URL}/destination/${destination.slug}`,
      },
    ],
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "City",
    name: destination.name,
    description: destination.description,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: destination.region,
    },
    touristAttraction: destination.attractions.map((attr) => ({
      "@type": "TouristAttraction",
      name: attr,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: destination.metaTitle,
    description: destination.metaDescription,
    url: `${SITE_URL}/destination/${destination.slug}`,
    breadcrumb: breadcrumbList,
    mainEntity: placeSchema,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList),
        }}
      />
    </>
  );
}

export default async function DestinationPage({ params }: PageProps) {
  const { city } = await params;
  const destination = getDestination(city);

  if (!destination) {
    notFound();
  }

  return (
    <>
      <DestinationJsonLd destination={destination} />

      <style dangerouslySetInnerHTML={{__html: `
        .quarter-card {
          transition: all 0.2s ease;
        }
        .quarter-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }
        .attraction-pill {
          transition: all 0.2s ease;
        }
        .attraction-pill:hover {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
        .cta-button {
          transition: all 0.2s ease;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        }
      `}} />

      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        {/* Header matching homepage */}
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
            {/* Logo */}
            <Link
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
            </Link>

            {/* Breadcrumb navigation */}
            <nav className="hidden md:flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <Link href="/" style={{ textDecoration: "none", color: "var(--text-secondary)" }}>
                Accueil
              </Link>
              <span>/</span>
              <Link href="/destination" style={{ textDecoration: "none", color: "var(--text-secondary)" }}>
                Destinations
              </Link>
              <span>/</span>
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{destination.name}</span>
            </nav>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>

        <main className="w-full">
          {/* Hero Section */}
          <section
            className="w-full"
            style={{
              padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px) clamp(32px, 5vw, 56px)",
            }}
          >
            <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
              <h1
                className="font-extrabold"
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                {destination.h1}
              </h1>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                  maxWidth: "800px",
                }}
              >
                {destination.shortDescription}
              </p>
              <div
                className="flex flex-wrap gap-6"
                style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
              >
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span>{destination.avgPrice}/nuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{destination.bestSeason}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Search Form CTA */}
          <section
            className="w-full"
            style={{
              background: "var(--bg-secondary)",
              padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-nunito), sans-serif",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                    marginBottom: "16px",
                  }}
                >
                  Trouvez votre location à {destination.name}
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                  Comparez instantanément les offres Airbnb, Booking.com et Abritel
                </p>
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius-card)",
                  padding: "clamp(24px, 4vw, 32px)",
                  boxShadow: "var(--shadow-xl)",
                  border: "1px solid var(--border)",
                }}
              >
                <SearchForm defaultLocation={destination.name} />
              </div>
            </div>
          </section>

          {/* Intro Text */}
          <section
            className="w-full"
            style={{
              padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <div style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                {destination.introText.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: "24px" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Why Visit Section */}
          <section
            className="w-full"
            style={{
              background: "var(--bg-secondary)",
              padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <div
                style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--border)",
                  padding: "clamp(32px, 5vw, 48px)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-nunito), sans-serif",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    marginBottom: "24px",
                  }}
                >
                  {destination.whyVisit.title}
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                  {destination.whyVisit.content}
                </p>
              </div>
            </div>
          </section>

          {/* Popular Quarters */}
          <section
            className="w-full"
            style={{
              padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
            }}
          >
            <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
              <h2
                className="font-bold"
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  marginBottom: "clamp(32px, 5vw, 48px)",
                  textAlign: "center",
                }}
              >
                Quartiers populaires à {destination.name}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {destination.popularQuarters.map((quarter) => (
                  <div
                    key={quarter.name}
                    className="quarter-card"
                    style={{
                      background: "var(--surface)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--border)",
                      padding: "32px 24px",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <h3
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        marginBottom: "16px",
                      }}
                    >
                      {quarter.name}
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                      {quarter.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Attractions */}
          <section
            className="w-full"
            style={{
              background: "var(--bg-secondary)",
              padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
              <h2
                className="font-bold"
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  marginBottom: "clamp(32px, 5vw, 48px)",
                  textAlign: "center",
                }}
              >
                Attractions incontournables
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "16px",
                }}
              >
                {destination.attractions.map((attraction) => (
                  <div
                    key={attraction}
                    className="attraction-pill"
                    style={{
                      background: "var(--surface)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--border)",
                      padding: "20px 16px",
                      textAlign: "center",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {attraction}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section for SEO */}
          <section
            className="w-full"
            style={{
              padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)",
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <div
                style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--border)",
                  padding: "clamp(32px, 5vw, 48px)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-nunito), sans-serif",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                    marginBottom: "clamp(32px, 5vw, 40px)",
                    textAlign: "center",
                  }}
                >
                  Questions fréquentes
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                  <div>
                    <h3
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      Quel est le prix moyen d'une location à {destination.name} ?
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
                      Le prix moyen d'une location de vacances à {destination.name} varie entre{" "}
                      {destination.avgPrice} par nuit selon le quartier, la saison et les équipements.
                      Utilisez AirSearch pour comparer les prix en temps réel sur toutes les plateformes.
                    </p>
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      Quelle est la meilleure période pour visiter {destination.name} ?
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
                      La meilleure période pour visiter {destination.name} est {destination.bestSeason.toLowerCase()},
                      quand le climat est agréable et les activités touristiques sont en pleine saison.
                    </p>
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      Pourquoi utiliser AirSearch pour trouver une location à {destination.name} ?
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
                      AirSearch compare automatiquement les offres de Airbnb, Booking.com et Abritel pour vous
                      présenter toutes les options disponibles en un seul endroit. Vous économisez du temps et
                      de l'argent en trouvant le meilleur rapport qualité-prix sans avoir à consulter plusieurs sites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA matching homepage */}
          <section
            className="w-full"
            style={{
              background: "linear-gradient(135deg, #FF385C 0%, #bd1e59 100%)",
              padding: "clamp(56px, 10vw, 96px) clamp(24px, 4vw, 48px)",
            }}
          >
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
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
                Prêt à découvrir {destination.name} ?
              </h2>
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
                Lancez votre recherche et comparez les meilleures offres de location en quelques secondes
              </p>
              <Link
                href="/"
                className="cta-button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: "#fff",
                  color: "#FF385C",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                Commencer ma recherche
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
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
