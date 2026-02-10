import type { SearchRequest } from "../types";
import type { PlatformUrl } from "./types";

export function buildSearchUrls(criteria: SearchRequest): PlatformUrl[] {
  const dest = encodeURIComponent(criteria.destination);
  const totalGuests = criteria.adults + criteria.children;

  // Airbnb
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

  // Booking.com
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

  // Abritel
  const abritelParams = new URLSearchParams();
  abritelParams.set("destination", criteria.destination);
  if (criteria.checkin) abritelParams.set("startDate", criteria.checkin);
  if (criteria.checkout) abritelParams.set("endDate", criteria.checkout);
  abritelParams.set("adults", String(totalGuests));
  const abritelUrl = `https://www.abritel.fr/search?${abritelParams.toString()}`;

  return [
    { platform: "Airbnb", url: airbnbUrl },
    { platform: "Booking.com", url: bookingUrl },
    { platform: "Abritel", url: abritelUrl },
  ];
}