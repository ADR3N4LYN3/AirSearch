import type { MetadataRoute } from "next";
import { getAllDestinationSlugs } from "@/lib/destinations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://airsearch.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all destination pages
  const destinationSlugs = getAllDestinationSlugs();
  const destinationPages = destinationSlugs.map((slug) => ({
    url: `${SITE_URL}/destination/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/destination`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...destinationPages,
  ];
}
