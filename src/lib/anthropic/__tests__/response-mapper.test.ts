import { describe, it, expect } from "vitest";
import { mapApiResponse, detectPlatform } from "../response-mapper";

describe("detectPlatform", () => {
  it("detects Airbnb", () => {
    expect(detectPlatform("https://www.airbnb.fr/rooms/123")).toBe("Airbnb");
  });

  it("detects Booking.com", () => {
    expect(detectPlatform("https://www.booking.com/hotel/fr/test.html")).toBe("Booking.com");
  });

  it("detects Abritel", () => {
    expect(detectPlatform("https://www.abritel.fr/location/123")).toBe("Abritel");
  });

  it("detects Vrbo", () => {
    expect(detectPlatform("https://www.vrbo.com/123")).toBe("Vrbo");
  });

  it("returns Autre for unknown", () => {
    expect(detectPlatform("https://example.com")).toBe("Autre");
  });

  it("returns Autre for null", () => {
    expect(detectPlatform(null)).toBe("Autre");
  });
});

describe("mapApiResponse", () => {
  const makeJson = (overrides: Record<string, unknown> = {}) =>
    JSON.stringify({
      summary: "Marché actif",
      results: [
        {
          title: "Villa Test",
          location: "Nice",
          price: "120€/nuit",
          description: "Belle villa",
          highlights: ["Piscine", "Vue mer"],
          platform: "Airbnb",
          rating: 4.8,
          reviewCount: 150,
          url: "https://www.airbnb.fr/rooms/123",
        },
      ],
      tips: "Réservez tôt",
      ...overrides,
    });

  it("parses valid JSON response", () => {
    const res = mapApiResponse(makeJson());
    expect(res.success).toBe(true);
    expect(res.data?.results).toHaveLength(1);
    expect(res.data?.results[0].title).toBe("Villa Test");
    expect(res.data?.results[0].rating).toBe(4.8);
    expect(res.data?.results[0].reviewCount).toBe(150);
    expect(res.data?.summary).toBe("Marché actif");
    expect(res.data?.tips).toBe("Réservez tôt");
  });

  it("sanitizes disallowed URL domains to null", () => {
    const res = mapApiResponse(
      makeJson({
        results: [
          {
            title: "Test",
            location: "X",
            price: "50€",
            description: "",
            highlights: [],
            platform: "Evil",
            url: "https://evil.com/phishing",
          },
        ],
      })
    );
    expect(res.success).toBe(true);
    expect(res.data?.results[0].url).toBeNull();
  });

  it("allows whitelisted domains", () => {
    const res = mapApiResponse(makeJson());
    expect(res.data?.results[0].url).toBe("https://www.airbnb.fr/rooms/123");
  });

  it("clamps rating outside 0-5 to null", () => {
    const res = mapApiResponse(
      makeJson({
        results: [
          {
            title: "X",
            location: "X",
            price: "X",
            description: "",
            highlights: [],
            platform: "Airbnb",
            rating: 6,
            url: null,
          },
        ],
      })
    );
    expect(res.data?.results[0].rating).toBeNull();
  });

  it("handles negative rating as null", () => {
    const res = mapApiResponse(
      makeJson({
        results: [
          {
            title: "X",
            location: "X",
            price: "X",
            description: "",
            highlights: [],
            platform: "Airbnb",
            rating: -1,
            url: null,
          },
        ],
      })
    );
    expect(res.data?.results[0].rating).toBeNull();
  });

  it("rounds rating to 1 decimal", () => {
    const res = mapApiResponse(
      makeJson({
        results: [
          {
            title: "X",
            location: "X",
            price: "X",
            description: "",
            highlights: [],
            platform: "Airbnb",
            rating: 4.567,
            url: null,
          },
        ],
      })
    );
    expect(res.data?.results[0].rating).toBe(4.6);
  });

  it("floors reviewCount", () => {
    const res = mapApiResponse(
      makeJson({
        results: [
          {
            title: "X",
            location: "X",
            price: "X",
            description: "",
            highlights: [],
            platform: "Airbnb",
            reviewCount: 99.9,
            url: null,
          },
        ],
      })
    );
    expect(res.data?.results[0].reviewCount).toBe(99);
  });

  it("falls back to detectPlatform when platform is missing", () => {
    const res = mapApiResponse(
      makeJson({
        results: [
          {
            title: "X",
            location: "X",
            price: "X",
            description: "",
            highlights: [],
            url: "https://www.booking.com/hotel/test.html",
          },
        ],
      })
    );
    expect(res.data?.results[0].platform).toBe("Booking.com");
  });

  it("returns error for unparseable text", () => {
    const res = mapApiResponse("This is not JSON at all.");
    expect(res.success).toBe(false);
    expect(res.error).toBeTruthy();
    expect(res.rawText).toBe("This is not JSON at all.");
  });

  it("parses JSON wrapped in markdown backticks", () => {
    const json = makeJson();
    const wrapped = "```json\n" + json + "\n```";
    const res = mapApiResponse(wrapped);
    expect(res.success).toBe(true);
    expect(res.data?.results).toHaveLength(1);
  });

  it("uses defaults for missing optional fields", () => {
    const res = mapApiResponse(
      makeJson({
        results: [
          {
            title: null,
            location: null,
            price: null,
            description: null,
            highlights: "not-an-array",
            url: null,
          },
        ],
        tips: null,
      })
    );
    expect(res.success).toBe(true);
    expect(res.data?.results[0].title).toBe("Sans titre");
    expect(res.data?.results[0].location).toBe("Localisation inconnue");
    expect(res.data?.results[0].price).toBe("Prix non spécifié");
    expect(res.data?.results[0].highlights).toEqual([]);
  });
});
