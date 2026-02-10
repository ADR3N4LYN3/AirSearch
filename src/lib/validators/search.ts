import type { SearchRequest } from "../types";

export function validateSearchRequest(
  body: unknown
): { valid: true; data: SearchRequest } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Corps de la requête invalide." };
  }

  const b = body as Record<string, unknown>;

  // destination -- required, max 200 chars
  if (!b.destination || typeof b.destination !== "string") {
    return { valid: false, error: "Le champ 'destination' est requis." };
  }
  const destination = b.destination.trim();
  if (destination.length === 0) {
    return { valid: false, error: "Le champ 'destination' ne peut pas être vide." };
  }
  if (destination.length > 200) {
    return { valid: false, error: "Le champ 'destination' ne doit pas dépasser 200 caractères." };
  }

  // adults -- default to 1
  let adults = 1;
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

  // extraNotes -- optional, max 500 chars
  let extraNotes: string | undefined;
  if (b.extraNotes !== undefined && b.extraNotes !== null) {
    if (typeof b.extraNotes !== "string") {
      return { valid: false, error: "Le champ 'extraNotes' doit être une chaîne de caractères." };
    }
    if (b.extraNotes.length > 500) {
      return { valid: false, error: "Le champ 'extraNotes' ne doit pas dépasser 500 caractères." };
    }
    extraNotes = b.extraNotes.trim() || undefined;
  }

  // checkin / checkout -- optional strings
  const checkin =
    typeof b.checkin === "string" && b.checkin.trim() ? b.checkin.trim() : undefined;
  const checkout =
    typeof b.checkout === "string" && b.checkout.trim() ? b.checkout.trim() : undefined;

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
    },
  };
}
