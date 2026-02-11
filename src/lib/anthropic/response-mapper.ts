import type { SearchResponse } from "../types";
import { tryParseJson } from "./json-parser";

const ALLOWED_URL_DOMAINS = [
  "airbnb.fr", "airbnb.com",
  "booking.com",
  "abritel.fr", "vrbo.com",
  "expedia.fr", "expedia.com",
  "hotels.com",
  "tripadvisor.fr", "tripadvisor.com",
];

export function sanitizeUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const hostname = parsed.hostname.replace(/^www\./, "");
    if (!ALLOWED_URL_DOMAINS.some((d) => hostname === d || hostname.endsWith("." + d))) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

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

function normalizePriceDisplay(raw: unknown): string {
  if (!raw) return "Prix non disponible";
  const s = String(raw).trim();
  // If the price contains a number + currency symbol, it's valid
  if (/\d+.*[€$£]/.test(s) || /[€$£].*\d+/.test(s)) return s;
  // "Prix non disponible", "Prix non communiqué", etc. → standardize
  return "Prix non disponible";
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
          const url = sanitizeUrl(r.url ? String(r.url) : null);
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
            price: normalizePriceDisplay(r.price),
            description: String(r.description || ""),
            highlights: Array.isArray(r.highlights)
              ? r.highlights.map(String)
              : [],
            url,
            image: null,
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

  // If JSON parsing failed, return error with raw text
  return {
    success: false,
    rawText,
    error: "L'IA n'a pas pu structurer les résultats. Veuillez réessayer.",
  };
}
