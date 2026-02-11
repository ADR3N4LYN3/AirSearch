// ---------------------------------------------------------------------------
// Platforms — single source of truth for all route handlers
// ---------------------------------------------------------------------------
export const PLATFORMS = [
  "Airbnb",
  "Booking.com",
  "Vrbo",
  "Holidu",
  "HomeToGo",
  "Expedia",
  "Hotels.com",
  "Gîtes de France",
  "TripAdvisor",
  "Autre",
] as const;

export type Platform = (typeof PLATFORMS)[number];

export const ALLOWED_PLATFORMS = new Set<string>(PLATFORMS);

// ---------------------------------------------------------------------------
// Timeouts (ms)
// ---------------------------------------------------------------------------
export const SCRAPE_TIMEOUT_MS = 12_000;
export const GLOBAL_TIMEOUT_MS = 60_000;
export const ANTHROPIC_TIMEOUT_MS = 30_000;
export const ANTHROPIC_FALLBACK_TIMEOUT_MS = 50_000;
export const SSE_HEARTBEAT_MS = 15_000;

// ---------------------------------------------------------------------------
// Validation limits
// ---------------------------------------------------------------------------
export const MAX_STRING_LENGTH = 500;

// ---------------------------------------------------------------------------
// UI chip data
// ---------------------------------------------------------------------------
export interface ChipItemData {
  id: string;
  label: string;
}

export const AMENITIES_DATA: ChipItemData[] = [
  { id: "wifi", label: "WiFi" },
  { id: "pool", label: "Piscine" },
  { id: "parking", label: "Parking" },
  { id: "kitchen", label: "Cuisine" },
  { id: "washer", label: "Lave-linge" },
  { id: "ac", label: "Climatisation" },
  { id: "heating", label: "Chauffage" },
  { id: "garden", label: "Jardin" },
  { id: "balcony", label: "Balcon/Terrasse" },
  { id: "pet_friendly", label: "Animaux acceptés" },
  { id: "bbq", label: "Barbecue" },
  { id: "sea_view", label: "Vue mer" },
];

export const PROPERTY_TYPES_DATA: ChipItemData[] = [
  { id: "apartment", label: "Appartement" },
  { id: "house", label: "Maison" },
  { id: "villa", label: "Villa" },
  { id: "cabin", label: "Chalet/Cabane" },
  { id: "studio", label: "Studio" },
  { id: "loft", label: "Loft" },
  { id: "guesthouse", label: "Maison d'hôtes" },
];

// Re-export with original names for server-side compatibility
export const AMENITIES = AMENITIES_DATA;
export const PROPERTY_TYPES = PROPERTY_TYPES_DATA;