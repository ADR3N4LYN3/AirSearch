import type { SearchResponse } from "../types";
import { tryParseJson } from "./json-parser";

/**
 * Detect the platform from a booking URL when the AI doesn't specify it.
 */
export function detectPlatform(url: string | null): string {
  if (!url) return "Autre";
  const lower = url.toLowerCase();
  if (lower.includes("airbnb")) return "Airbnb";
  if (lower.includes("booking.com")) return "Booking.com";
  if (lower.includes("abritel")) return "Abritel";
  if (lower.includes("vrbo")) return "Vrbo";
  if (lower.includes("expedia")) return "Expedia";
  if (lower.includes("hotels.com")) return "Hotels.com";
  if (lower.includes("tripadvisor")) return "TripAdvisor";
  return "Autre";
}

/**
 * Map raw API text response into a structured SearchResponse.
 */
export function mapApiResponse(rawText: string): SearchResponse {
  const parsed = tryParseJson(rawText);

  if (parsed && parsed.summary && Array.isArray(parsed.results)) {
    return {
      success: true,
      data: {
        summary: String(parsed.summary),
        results: parsed.results.map((r: Record<string, unknown>) => {
          const url = r.url ? String(r.url) : null;
          const rawRating = r.rating != null ? Number(r.rating) : null;
          const rating = rawRating != null && !isNaN(rawRating) && rawRating > 0 && rawRating <= 5
            ? Math.round(rawRating * 10) / 10
            : null;
          const rawReviews = r.reviewCount != null ? Number(r.reviewCount) : null;
          const reviewCount = rawReviews != null && !isNaN(rawReviews) && rawReviews > 0
            ? Math.floor(rawReviews)
            : null;
          return {
            title: String(r.title || "Sans titre"),
            location: String(r.location || "Localisation inconnue"),
            price: String(r.price || "Prix non spécifié"),
            description: String(r.description || ""),
            highlights: Array.isArray(r.highlights)
              ? r.highlights.map(String)
              : [],
            url,
            platform: r.platform ? String(r.platform) : detectPlatform(url),
            rating,
            reviewCount,
          };
        }),
        tips: String(parsed.tips || ""),
      },
      rawText,
    };
  }

  // If JSON parsing failed, return raw text so the frontend can still display something
  return {
    success: true,
    rawText,
    data: undefined,
  };
}
