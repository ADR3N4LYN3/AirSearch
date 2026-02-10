import type { Metadata } from "next";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/destinations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://airsearch.fr";

export const metadata: Metadata = {
  title: "Destinations populaires - Locations de vacances en France",
  description:
    "Découvrez nos destinations populaires en France : Paris, Nice, Lyon, Marseille, Bordeaux. Comparez les locations Airbnb, Booking et Abritel dans toute la France.",
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

export default function DestinationsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>Destinations</span>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Destinations populaires en France
        </h1>
        <p
          className="text-lg mb-12 max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Découvrez nos destinations les plus populaires et comparez les meilleures offres de
          location de vacances sur Airbnb, Booking.com et Abritel.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destination/${destination.slug}`}
              className="group block"
            >
              <div
                className="p-6 rounded-xl h-full transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <h2
                  className="text-2xl font-bold mb-2 group-hover:underline"
                  style={{ color: "var(--text-primary)" }}
                >
                  {destination.name}
                </h2>
                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {destination.region}
                </p>
                <p
                  className="mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {destination.shortDescription}
                </p>
                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span>{destination.avgPrice}/nuit</span>
                  <span>•</span>
                  <span>{destination.bestSeason}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <section className="mt-16 max-w-4xl">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Pourquoi utiliser AirSearch pour vos locations de vacances ?
          </h2>
          <div
            className="prose prose-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            <p className="mb-4">
              AirSearch est le comparateur intelligent qui vous permet de trouver la meilleure
              location de vacances en France. Notre technologie compare en temps réel les offres
              disponibles sur Airbnb, Booking.com et Abritel pour vous présenter les meilleures
              options selon vos critères.
            </p>
            <p className="mb-4">
              Que vous recherchiez un appartement à Paris, une villa sur la Côte d'Azur, un
              logement à Lyon ou un hébergement à Bordeaux, AirSearch vous fait gagner du temps
              et de l'argent en centralisant toutes les offres en un seul endroit.
            </p>
            <p>
              Notre comparateur vous permet de filtrer par prix, équipements, quartier et dates
              pour trouver exactement ce que vous cherchez. Plus besoin de consulter plusieurs
              sites - AirSearch fait le travail pour vous.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
