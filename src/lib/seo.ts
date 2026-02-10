/**
 * SEO utilities and constants for AirSearch
 */

export const SITE_CONFIG = {
  name: "AirSearch",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://airsearch.fr",
  description:
    "Comparez les locations de vacances sur Airbnb, Booking et Abritel en un clic. Trouvez le meilleur prix pour votre logement idéal.",
  ogImage: "/og-image.png",
  twitter: "@AirSearch",
} as const;

export const DEFAULT_KEYWORDS = [
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
] as const;

/**
 * Generate JSON-LD structured data for WebSite with SearchAction
 */
export function generateWebsiteSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: siteUrl,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: SITE_CONFIG.description,
    sameAs: [
      "https://twitter.com/AirSearch",
      "https://facebook.com/AirSearch",
    ],
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = SITE_CONFIG.url;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Truncate text to a specific length for meta descriptions
 */
export function truncateText(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + "...";
}
