export type ScrapePlatform =
  | "Airbnb"
  | "Booking.com"
  | "Abritel"
  | "Vrbo"
  | "Holidu"
  | "HomeToGo"
  | "Expedia"
  | "Hotels.com"
  | "Gîtes de France";

export interface PlatformUrl {
  platform: ScrapePlatform;
  url: string;
}

export interface ScrapedListing {
  title: string;
  price: string | null;
  /**
   * Rating on a scale of 0-5.
   * Note: Booking.com ratings are converted from /10 to /5 in the extractor.
   */
  rating: number | null;
  reviewCount: number | null;
  url: string | null;
  location: string | null;
  image: string | null;
  platform: ScrapePlatform;
}

export interface ScrapeResult {
  platform: ScrapePlatform;
  success: boolean;
  listings: ScrapedListing[];
  error?: string;
}