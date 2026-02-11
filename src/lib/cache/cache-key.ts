import type { SearchRequest } from "@/lib/types";

/**
 * DJB2 hash function — fast, simple, no crypto dependency.
 * Returns a positive 32-bit integer as a string.
 */
function djb2(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    // hash * 33 + char
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  // Convert to unsigned 32-bit integer
  return (hash >>> 0).toString(36);
}

/**
 * Builds a deterministic cache key from a SearchRequest.
 * Normalizes all fields so that equivalent searches produce the same key.
 */
export function buildCacheKey(req: SearchRequest): string {
  const destination = req.destination.toLowerCase().trim();
  const checkin = req.checkin ?? "";
  const checkout = req.checkout ?? "";
  const adults = req.adults;
  const children = req.children;
  const infants = req.infants;
  const budgetMin = req.budgetMin ?? 0;
  const budgetMax = req.budgetMax ?? 0;

  const propertyType = Array.isArray(req.propertyType)
    ? [...req.propertyType].sort().join(",")
    : (req.propertyType ?? "");

  const amenities = [...req.amenities].sort().join(",");

  const raw = [
    destination,
    checkin,
    checkout,
    adults,
    children,
    infants,
    budgetMin,
    budgetMax,
    propertyType,
    amenities,
  ].join("|");

  return `search:${djb2(raw)}`;
}

/**
 * Converts a destination string into a simple numeric hash for the vector.
 */
function hashDestination(destination: string): number {
  let hash = 5381;
  const normalized = destination.toLowerCase().trim();
  for (let i = 0; i < normalized.length; i++) {
    hash = ((hash << 5) + hash + normalized.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

/**
 * Converts a date string (YYYY-MM-DD) into days since Unix epoch.
 * Returns 0 if the date is missing or invalid.
 */
function daysSinceEpoch(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  const ms = new Date(dateStr).getTime();
  if (isNaN(ms)) return 0;
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

/**
 * Builds a numeric vector representation of a search request
 * for cosine-similarity matching in the L3 vector cache.
 *
 * Vector: [hash_destination, checkin_days, checkout_days, adults, children, budgetMin, budgetMax]
 */
export function buildSearchVector(req: SearchRequest): number[] {
  return [
    hashDestination(req.destination),
    daysSinceEpoch(req.checkin),
    daysSinceEpoch(req.checkout),
    req.adults,
    req.children,
    req.budgetMin ?? 0,
    req.budgetMax ?? 0,
  ];
}
