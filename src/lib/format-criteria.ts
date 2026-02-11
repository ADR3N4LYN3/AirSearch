import type { SearchRequest } from "./types";
import { AMENITIES, PROPERTY_TYPES } from "./constants";

/**
 * Format search criteria into human-readable lines for prompt construction.
 * Shared between anthropic prompt builder and scraper analysis prompt.
 */
export function formatCriteria(criteria: SearchRequest, options?: { includeGeo?: boolean }): string[] {
  const includeGeo = options?.includeGeo ?? true;
  const parts: string[] = [];

  parts.push(`- Destination : ${criteria.destination}`);

  if (criteria.checkin && criteria.checkout) {
    parts.push(`- Dates : du ${criteria.checkin} au ${criteria.checkout}`);
  } else if (criteria.checkin) {
    parts.push(`- Date d'arrivée : ${criteria.checkin}`);
  } else if (criteria.checkout) {
    parts.push(`- Date de départ : ${criteria.checkout}`);
  }

  const totalGuests = criteria.adults + criteria.children;
  const guestParts: string[] = [`${criteria.adults} adulte${criteria.adults > 1 ? "s" : ""}`];
  if (criteria.children > 0) {
    guestParts.push(`${criteria.children} enfant${criteria.children > 1 ? "s" : ""}`);
  }
  if (criteria.infants > 0) {
    guestParts.push(`${criteria.infants} bébé${criteria.infants > 1 ? "s" : ""}`);
  }
  parts.push(`- Voyageurs : ${guestParts.join(", ")} (${totalGuests} au total)`);

  if (criteria.children > 0 || criteria.infants > 0) {
    parts.push(`- IMPORTANT : Le logement doit être adapté aux enfants/bébés (sécurité, équipements bébé si besoin)`);
  }

  if (criteria.budgetMin && criteria.budgetMax) {
    parts.push(`- Budget : entre ${criteria.budgetMin}€ et ${criteria.budgetMax}€ par nuit`);
  } else if (criteria.budgetMin) {
    parts.push(`- Budget minimum : ${criteria.budgetMin}€ par nuit`);
  } else if (criteria.budgetMax) {
    parts.push(`- Budget maximum : ${criteria.budgetMax}€ par nuit`);
  }

  if (criteria.propertyType) {
    const label = Array.isArray(criteria.propertyType)
      ? criteria.propertyType.map((p) => PROPERTY_TYPES.find((pt) => pt.id === p)?.label || p).join(", ")
      : PROPERTY_TYPES.find((p) => p.id === criteria.propertyType)?.label || criteria.propertyType;
    parts.push(`- Type de logement : ${label}`);
  }

  if (criteria.amenities.length > 0) {
    const labels = criteria.amenities
      .map((id) => AMENITIES.find((a) => a.id === id)?.label || id)
      .join(", ");
    parts.push(`- Équipements souhaités : ${labels}`);
  }

  if (includeGeo && criteria.lat !== undefined && criteria.lng !== undefined) {
    parts.push(`- Coordonnées GPS : ${criteria.lat.toFixed(4)}, ${criteria.lng.toFixed(4)}`);
    if (criteria.radius) {
      parts.push(`- Rayon de recherche : ${criteria.radius} km autour de ce point`);
    }
  }

  if (criteria.extraNotes) {
    parts.push(`- Précisions supplémentaires : ${criteria.extraNotes}`);
  }

  return parts;
}