import type { SearchRequest } from "../types";

// Only allow letters (including accented), numbers, spaces, hyphens, commas, apostrophes, dots
const SAFE_TEXT_REGEX = /^[\p{L}\p{N}\s\-,.'()]+$/u;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function sanitizeText(input: string): string {
  // Strip control characters and zero-width chars
  return input.replace(/[\x00-\x1F\x7F\u200B-\u200F\u2028-\u202F]/g, "").trim();
}

export function validateSearchRequest(
  body: unknown
): { valid: true; data: SearchRequest } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Corps de la requête invalide." };
  }

  const b = body as Record<string, unknown>;

  // destination -- required, max 200 chars, safe characters only
  if (!b.destination || typeof b.destination !== "string") {
    return { valid: false, error: "Le champ 'destination' est requis." };
  }
  const destination = sanitizeText(b.destination);
  if (destination.length === 0) {
    return { valid: false, error: "Le champ 'destination' ne peut pas être vide." };
  }
  if (destination.length > 200) {
    return { valid: false, error: "Le champ 'destination' ne doit pas dépasser 200 caractères." };
  }
  // Anti-SSRF: reject anything that looks like a URL
  if (/(:\/\/|^https?|^ftp|^file|^www\.)/i.test(destination)) {
    return { valid: false, error: "Le champ 'destination' contient des caractères non autorisés." };
  }
  if (!SAFE_TEXT_REGEX.test(destination)) {
    return { valid: false, error: "Le champ 'destination' contient des caractères non autorisés." };
  }

  // adults -- default to 2
  let adults = 2;
  if (b.adults !== undefined) {
    adults = Number(b.adults);
    if (isNaN(adults) || adults < 1 || adults > 16) {
      return { valid: false, error: "Le nombre d'adultes doit être entre 1 et 16." };
    }
    adults = Math.floor(adults);
  }

  // children -- default to 0
  let children = 0;
  if (b.children !== undefined) {
    children = Number(b.children);
    if (isNaN(children) || children < 0 || children > 10) {
      return { valid: false, error: "Le nombre d'enfants doit être entre 0 et 10." };
    }
    children = Math.floor(children);
  }

  // infants -- default to 0
  let infants = 0;
  if (b.infants !== undefined) {
    infants = Number(b.infants);
    if (isNaN(infants) || infants < 0 || infants > 5) {
      return { valid: false, error: "Le nombre de bébés doit être entre 0 et 5." };
    }
    infants = Math.floor(infants);
  }

  // extraNotes -- optional, max 500 chars, sanitized
  let extraNotes: string | undefined;
  if (b.extraNotes !== undefined && b.extraNotes !== null) {
    if (typeof b.extraNotes !== "string") {
      return { valid: false, error: "Le champ 'extraNotes' doit être une chaîne de caractères." };
    }
    if (b.extraNotes.length > 500) {
      return { valid: false, error: "Le champ 'extraNotes' ne doit pas dépasser 500 caractères." };
    }
    const sanitized = sanitizeText(b.extraNotes);
    extraNotes = sanitized || undefined;
  }

  // checkin / checkout -- optional, must be YYYY-MM-DD format
  let checkin: string | undefined;
  let checkout: string | undefined;

  if (typeof b.checkin === "string" && b.checkin.trim()) {
    const val = b.checkin.trim();
    if (!DATE_REGEX.test(val) || isNaN(Date.parse(val))) {
      return { valid: false, error: "La date d'arrivée doit être au format AAAA-MM-JJ." };
    }
    checkin = val;
  }
  if (typeof b.checkout === "string" && b.checkout.trim()) {
    const val = b.checkout.trim();
    if (!DATE_REGEX.test(val) || isNaN(Date.parse(val))) {
      return { valid: false, error: "La date de départ doit être au format AAAA-MM-JJ." };
    }
    checkout = val;
  }
  if (checkin && checkout && checkout <= checkin) {
    return { valid: false, error: "La date de départ doit être postérieure à la date d'arrivée." };
  }

  // budgetMin / budgetMax -- optional numbers
  let budgetMin: number | undefined;
  let budgetMax: number | undefined;
  if (b.budgetMin !== undefined && b.budgetMin !== null && b.budgetMin !== "") {
    budgetMin = Number(b.budgetMin);
    if (isNaN(budgetMin) || budgetMin < 0) {
      return { valid: false, error: "Le budget minimum doit être un nombre positif." };
    }
  }
  if (b.budgetMax !== undefined && b.budgetMax !== null && b.budgetMax !== "") {
    budgetMax = Number(b.budgetMax);
    if (isNaN(budgetMax) || budgetMax < 0) {
      return { valid: false, error: "Le budget maximum doit être un nombre positif." };
    }
  }
  if (budgetMin !== undefined && budgetMax !== undefined && budgetMin > budgetMax) {
    return { valid: false, error: "Le budget minimum ne peut pas être supérieur au budget maximum." };
  }

  // propertyType -- optional string or string[]
  let propertyType: string | string[] | undefined;
  if (typeof b.propertyType === "string" && b.propertyType.trim()) {
    propertyType = b.propertyType.trim();
  } else if (Array.isArray(b.propertyType)) {
    const filtered = b.propertyType
      .filter((p): p is string => typeof p === "string")
      .map((p) => p.trim())
      .filter(Boolean);
    propertyType = filtered.length > 0 ? filtered : undefined;
  }

  // amenities -- optional array of strings
  let amenities: string[] = [];
  if (Array.isArray(b.amenities)) {
    amenities = b.amenities
      .filter((a): a is string => typeof a === "string")
      .map((a) => a.trim())
      .filter(Boolean);
  }

  // lat / lng / radius -- optional geo coordinates
  let lat: number | undefined;
  let lng: number | undefined;
  let radius: number | undefined;

  if (b.lat !== undefined && b.lat !== null) {
    lat = Number(b.lat);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      lat = undefined;
    }
  }
  if (b.lng !== undefined && b.lng !== null) {
    lng = Number(b.lng);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      lng = undefined;
    }
  }
  if (b.radius !== undefined && b.radius !== null) {
    radius = Number(b.radius);
    if (isNaN(radius) || radius < 1 || radius > 100) {
      radius = undefined;
    }
  }

  return {
    valid: true,
    data: {
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
      extraNotes,
      lat,
      lng,
      radius,
    },
  };
}
