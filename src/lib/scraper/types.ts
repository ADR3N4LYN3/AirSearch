export interface PlatformUrl {
  platform: "Airbnb" | "Booking.com" | "Abritel";
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
  platform: "Airbnb" | "Booking.com" | "Abritel";
}

export interface ScrapeResult {
  platform: "Airbnb" | "Booking.com" | "Abritel";
  success: boolean;
  listings: ScrapedListing[];
  error?: string;
}