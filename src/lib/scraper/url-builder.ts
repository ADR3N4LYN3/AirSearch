import type { SearchRequest } from "../types";
import type { PlatformUrl } from "./types";

export function buildSearchUrls(criteria: SearchRequest): PlatformUrl[] {
  const dest = encodeURIComponent(criteria.destination);

  // ── Airbnb ──
  const airbnbParams = new URLSearchParams();
  if (criteria.checkin) airbnbParams.set("checkin", criteria.checkin);
  if (criteria.checkout) airbnbParams.set("checkout", criteria.checkout);
  airbnbParams.set("adults", String(criteria.adults));
  if (criteria.children > 0) airbnbParams.set("children", String(criteria.children));
  if (criteria.infants > 0) airbnbParams.set("infants", String(criteria.infants));
  if (criteria.budgetMin) airbnbParams.set("price_min", String(criteria.budgetMin));
  if (criteria.budgetMax) airbnbParams.set("price_max", String(criteria.budgetMax));
  airbnbParams.set("display_currency", "EUR");
  const airbnbQuery = airbnbParams.toString();
  const airbnbUrl = `https://www.airbnb.fr/s/${dest}/homes${airbnbQuery ? `?${airbnbQuery}` : ""}`;

  // ── Booking.com ──
  const bookingParams = new URLSearchParams();
  bookingParams.set("ss", criteria.destination);
  bookingParams.set("lang", "fr");
  bookingParams.set("selected_currency", "EUR");
  if (criteria.checkin) bookingParams.set("checkin", criteria.checkin);
  if (criteria.checkout) bookingParams.set("checkout", criteria.checkout);
  bookingParams.set("group_adults", String(criteria.adults));
  if (criteria.children > 0) bookingParams.set("group_children", String(criteria.children));
  bookingParams.set("no_rooms", "1");
  const bookingUrl = `https://www.booking.com/searchresults.fr.html?${bookingParams.toString()}`;

  // ── Vrbo (replaces Abritel) ──
  const vrboParams = new URLSearchParams();
  vrboParams.set("destination", criteria.destination);
  if (criteria.checkin) vrboParams.set("startDate", criteria.checkin);
  if (criteria.checkout) vrboParams.set("endDate", criteria.checkout);
  vrboParams.set("adults", String(criteria.adults));
  if (criteria.children > 0) vrboParams.set("children", String(criteria.children));
  vrboParams.set("currency", "EUR");
  const vrboUrl = `https://www.vrbo.com/search?${vrboParams.toString()}`;

  // ── Holidu (meta-search) ──
  const holiduParams = new URLSearchParams();
  holiduParams.set("searchQuery", criteria.destination);
  if (criteria.checkin) holiduParams.set("checkin", criteria.checkin);
  if (criteria.checkout) holiduParams.set("checkout", criteria.checkout);
  holiduParams.set("adults", String(criteria.adults));
  if (criteria.children > 0) holiduParams.set("children", String(criteria.children));
  holiduParams.set("currency", "EUR");
  const holiduUrl = `https://www.holidu.fr/s/${dest}?${holiduParams.toString()}`;

  // ── HomeToGo (meta-search) ──
  const htgParams = new URLSearchParams();
  if (criteria.checkin) htgParams.set("arrival", criteria.checkin);
  if (criteria.checkout) htgParams.set("departure", criteria.checkout);
  htgParams.set("adults", String(criteria.adults));
  if (criteria.children > 0) htgParams.set("children", String(criteria.children));
  htgParams.set("currency", "EUR");
  const htgUrl = `https://www.hometogo.fr/search/${dest}/?${htgParams.toString()}`;

  // ── Expedia ──
  const expediaParams = new URLSearchParams();
  expediaParams.set("destination", criteria.destination);
  if (criteria.checkin) expediaParams.set("startDate", criteria.checkin);
  if (criteria.checkout) expediaParams.set("endDate", criteria.checkout);
  expediaParams.set("adults", String(criteria.adults));
  if (criteria.children > 0) expediaParams.set("children", String(criteria.children));
  expediaParams.set("rooms", "1");
  expediaParams.set("currency", "EUR");
  const expediaUrl = `https://www.expedia.fr/Hotel-Search?${expediaParams.toString()}`;

  // ── Hotels.com ──
  const hotelsParams = new URLSearchParams();
  hotelsParams.set("destination", criteria.destination);
  if (criteria.checkin) hotelsParams.set("startDate", criteria.checkin);
  if (criteria.checkout) hotelsParams.set("endDate", criteria.checkout);
  hotelsParams.set("adults", String(criteria.adults));
  if (criteria.children > 0) hotelsParams.set("children", String(criteria.children));
  hotelsParams.set("rooms", "1");
  hotelsParams.set("currency", "EUR");
  const hotelsUrl = `https://fr.hotels.com/Hotel-Search?${hotelsParams.toString()}`;

  // ── Gîtes de France (rural/countryside) ──
  const gdfParams = new URLSearchParams();
  gdfParams.set("destination", criteria.destination);
  if (criteria.checkin) gdfParams.set("from", criteria.checkin);
  if (criteria.checkout) gdfParams.set("to", criteria.checkout);
  gdfParams.set("adults", String(criteria.adults));
  if (criteria.children > 0) gdfParams.set("children", String(criteria.children));
  const gdfUrl = `https://www.gites-de-france.com/fr/search?${gdfParams.toString()}`;

  return [
    { platform: "Airbnb", url: airbnbUrl },
    { platform: "Booking.com", url: bookingUrl },
    { platform: "Vrbo", url: vrboUrl },
    { platform: "Holidu", url: holiduUrl },
    { platform: "HomeToGo", url: htgUrl },
    { platform: "Expedia", url: expediaUrl },
    { platform: "Hotels.com", url: hotelsUrl },
    { platform: "Gîtes de France", url: gdfUrl },
  ];
}
