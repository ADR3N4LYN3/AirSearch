export interface SearchRequest {
  destination: string;
  checkin?: string;
  checkout?: string;
  adults: number;
  children: number;
  infants: number;
  budgetMin?: number;
  budgetMax?: number;
  propertyType?: string | string[];
  amenities: string[];
  extraNotes?: string;
  lat?: number;
  lng?: number;
  radius?: number; // km
}

export interface SearchResult {
  title: string;
  location: string;
  price: string;
  description: string;
  highlights: string[];
  url: string | null;
  platform: string;
  rating: number | null;
  reviewCount: number | null;
}

export interface SearchResponse {
  success: boolean;
  data?: {
    summary: string;
    results: SearchResult[];
    tips: string;
  };
  rawText?: string;
  error?: string;
}
