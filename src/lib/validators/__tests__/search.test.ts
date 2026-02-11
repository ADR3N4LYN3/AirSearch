import { describe, it, expect } from "vitest";
import { validateSearchRequest } from "../search";

describe("validateSearchRequest", () => {
  const valid = (body: unknown) => {
    const result = validateSearchRequest(body);
    expect(result.valid).toBe(true);
    if (result.valid) return result.data;
    throw new Error("Expected valid");
  };

  const invalid = (body: unknown) => {
    const result = validateSearchRequest(body);
    expect(result.valid).toBe(false);
    if (!result.valid) return result.error;
    throw new Error("Expected invalid");
  };

  // --- destination ---
  it("rejects null/undefined body", () => {
    expect(invalid(null)).toContain("invalide");
    expect(invalid(undefined)).toContain("invalide");
  });

  it("rejects missing destination", () => {
    expect(invalid({})).toContain("destination");
  });

  it("rejects empty destination", () => {
    expect(invalid({ destination: "  " })).toContain("vide");
  });

  it("rejects destination > 200 chars", () => {
    expect(invalid({ destination: "a".repeat(201) })).toContain("200");
  });

  it("rejects destination with special chars", () => {
    expect(invalid({ destination: "Paris <script>" })).toContain("non autorisés");
  });

  it("strips control characters from destination", () => {
    const data = valid({ destination: "Paris\x00\x1F" });
    expect(data.destination).toBe("Paris");
  });

  it("accepts accented destinations", () => {
    const data = valid({ destination: "Saint-Rémy-de-Provence" });
    expect(data.destination).toBe("Saint-Rémy-de-Provence");
  });

  // --- adults / children / infants ---
  it("defaults adults to 2", () => {
    const data = valid({ destination: "Paris" });
    expect(data.adults).toBe(2);
  });

  it("rejects adults out of range", () => {
    expect(invalid({ destination: "Paris", adults: 0 })).toContain("adultes");
    expect(invalid({ destination: "Paris", adults: 17 })).toContain("adultes");
  });

  it("floors fractional adults", () => {
    const data = valid({ destination: "Paris", adults: 3.9 });
    expect(data.adults).toBe(3);
  });

  it("defaults children to 0", () => {
    const data = valid({ destination: "Paris" });
    expect(data.children).toBe(0);
  });

  it("rejects children > 10", () => {
    expect(invalid({ destination: "Paris", children: 11 })).toContain("enfants");
  });

  it("rejects infants > 5", () => {
    expect(invalid({ destination: "Paris", infants: 6 })).toContain("bébés");
  });

  // --- dates ---
  it("accepts valid dates", () => {
    const data = valid({ destination: "Paris", checkin: "2025-07-01", checkout: "2025-07-08" });
    expect(data.checkin).toBe("2025-07-01");
    expect(data.checkout).toBe("2025-07-08");
  });

  it("rejects bad date format", () => {
    expect(invalid({ destination: "Paris", checkin: "01/07/2025" })).toContain("AAAA-MM-JJ");
  });

  it("rejects checkout <= checkin", () => {
    expect(
      invalid({ destination: "Paris", checkin: "2025-07-08", checkout: "2025-07-01" })
    ).toContain("postérieure");
  });

  // --- budget ---
  it("accepts valid budget range", () => {
    const data = valid({ destination: "Paris", budgetMin: 50, budgetMax: 200 });
    expect(data.budgetMin).toBe(50);
    expect(data.budgetMax).toBe(200);
  });

  it("rejects negative budget", () => {
    expect(invalid({ destination: "Paris", budgetMin: -10 })).toContain("positif");
  });

  it("rejects min > max", () => {
    expect(
      invalid({ destination: "Paris", budgetMin: 300, budgetMax: 100 })
    ).toContain("supérieur");
  });

  // --- propertyType ---
  it("accepts string propertyType", () => {
    const data = valid({ destination: "Paris", propertyType: "apartment" });
    expect(data.propertyType).toBe("apartment");
  });

  it("accepts array propertyType", () => {
    const data = valid({ destination: "Paris", propertyType: ["apartment", "house"] });
    expect(data.propertyType).toEqual(["apartment", "house"]);
  });

  // --- amenities ---
  it("filters non-string amenities", () => {
    const data = valid({ destination: "Paris", amenities: ["wifi", 42, "pool"] });
    expect(data.amenities).toEqual(["wifi", "pool"]);
  });

  // --- geo ---
  it("accepts valid coordinates", () => {
    const data = valid({ destination: "Paris", lat: 48.85, lng: 2.35, radius: 10 });
    expect(data.lat).toBe(48.85);
    expect(data.lng).toBe(2.35);
    expect(data.radius).toBe(10);
  });

  it("silently discards out-of-range lat", () => {
    const data = valid({ destination: "Paris", lat: 999 });
    expect(data.lat).toBeUndefined();
  });

  it("silently discards radius < 1 or > 100", () => {
    const d1 = valid({ destination: "Paris", radius: 0 });
    expect(d1.radius).toBeUndefined();
    const d2 = valid({ destination: "Paris", radius: 101 });
    expect(d2.radius).toBeUndefined();
  });

  // --- extraNotes ---
  it("accepts extraNotes", () => {
    const data = valid({ destination: "Paris", extraNotes: "Near Eiffel Tower" });
    expect(data.extraNotes).toBe("Near Eiffel Tower");
  });

  it("rejects extraNotes > 500 chars", () => {
    expect(invalid({ destination: "Paris", extraNotes: "x".repeat(501) })).toContain("500");
  });
});
