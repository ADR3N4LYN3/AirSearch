import type { Metadata, Viewport } from "next";
import { Nunito_Sans, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://airsearch.fr";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "AirSearch - Comparateur de locations vacances | Airbnb, Booking, Abritel",
    template: "%s | AirSearch",
  },
  description:
    "Comparez les locations de vacances sur Airbnb, Booking et Abritel en un clic. Trouvez le meilleur prix pour votre logement idéal grâce à notre comparateur intelligent.",
  keywords: [
    "comparateur location vacances",
    "location vacances",
    "Airbnb",
    "Booking",
    "Abritel",
    "comparateur Airbnb",
    "hébergement vacances",
    "appartement vacances",
    "location saisonnière",
    "meilleur prix location",
  ],
  authors: [{ name: "AirSearch" }],
  creator: "AirSearch",
  publisher: "AirSearch",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "AirSearch",
    title: "AirSearch - Comparateur de locations vacances | Airbnb, Booking, Abritel",
    description:
      "Comparez les locations de vacances sur Airbnb, Booking et Abritel. Trouvez le meilleur prix pour votre logement idéal en quelques secondes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AirSearch - Comparateur intelligent de locations de vacances",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirSearch - Comparateur de locations vacances",
    description:
      "Comparez Airbnb, Booking et Abritel pour trouver le meilleur prix sur votre location de vacances.",
    images: ["/og-image.png"],
    creator: "@AirSearch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AirSearch",
    url: SITE_URL,
    description:
      "Comparateur intelligent de locations de vacances. Comparez Airbnb, Booking et Abritel pour trouver le meilleur prix.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AirSearch",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Comparateur de locations de vacances sur Airbnb, Booking et Abritel.",
    sameAs: [
      "https://twitter.com/AirSearch",
      "https://facebook.com/AirSearch",
    ],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AirSearch",
    url: SITE_URL,
    description:
      "Comparateur intelligent de locations de vacances. Comparez Airbnb, Booking et Abritel.",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    featureList: [
      "Comparaison multi-plateformes",
      "Recherche en temps réel",
      "Filtres avancés",
      "Meilleur prix garanti",
    ],
  };

  return (
    <html lang="fr" className={`${nunitoSans.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
      </head>
      <body
        className="min-h-screen"
        style={{
          fontFamily: "var(--font-dm-sans), var(--font-nunito), sans-serif",
          backgroundColor: "var(--bg)",
          color: "var(--text-primary)",
        }}
      >
        {children}
        <AnalyticsProvider />
        <CookieBanner />
      </body>
    </html>
  );
}
