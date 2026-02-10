export interface PlatformUrl {
  platform: "Airbnb" | "Booking.com" | "Abritel";
  url: string;
}

export interface ScrapedListing {
  title: string;
  price: string | null;
  rating: number | null;
  reviewCount: number | null;
  url: string | null;
  location: string | null;
  platform: "Airbnb" | "Booking.com" | "Abritel";
}

export interface ScrapeResult {
  platform: "Airbnb" | "Booking.com" | "Abritel";
  success: boolean;
  listings: ScrapedListing[];
  error?: string;
}