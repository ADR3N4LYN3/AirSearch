import type { Page } from "playwright-core";
import type { ScrapedListing } from "../types";

export async function extractBooking(page: Page): Promise<ScrapedListing[]> {
  await page.waitForSelector('[data-testid="property-card"]', { timeout: 4000 }).catch(() => {});

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
      image: string | null;
    }> = [];

    const cards = document.querySelectorAll('[data-testid="property-card"]');
    cards.forEach((card) => {
      const titleEl = card.querySelector('[data-testid="title"]') as HTMLElement | null;
      const priceEl = card.querySelector('[data-testid="price-and-discounted-price"]') as HTMLElement | null
        || card.querySelector('.prco-valign-middle-helper') as HTMLElement | null
        || card.querySelector('[data-testid="price-for-x-nights"]') as HTMLElement | null;
      const ratingEl = card.querySelector('[data-testid="review-score"] > div:first-child, .d10a6220b4') as HTMLElement | null;
      const reviewCountEl = card.querySelector('[data-testid="review-score"] .abf093bdfe, .d8eab2cf7f') as HTMLElement | null;
      const linkEl = card.querySelector('a[data-testid="title-link"], a[data-testid="property-card-desktop-single-image"]') as HTMLAnchorElement | null;
      const locationEl = card.querySelector('[data-testid="address"], .f4bd0794db') as HTMLElement | null;
      const imgEl = card.querySelector('img[data-testid="image"], img.hotel_image, img[src*="bstatic"]') as HTMLImageElement | null;

      const title = titleEl?.textContent?.trim() || "";
      if (!title) return;

      let price: string | null = null;
      const priceText = priceEl?.textContent?.trim() || "";
      const priceMatch = priceText.match(/([\d\s,.]+)\s*[€$£]/) || priceText.match(/[€$£]\s*([\d\s,.]+)/);
      if (priceMatch) price = priceMatch[1].replace(/\s/g, "") + "€";

      // Booking ALWAYS uses /10 scale → convert systematically to /5
      let rating: number | null = null;
      const ratingText = ratingEl?.textContent?.trim() || "";
      const ratingMatch = ratingText.match(/([\d,.]+)/);
      if (ratingMatch) {
        const raw = parseFloat(ratingMatch[1].replace(",", "."));
        rating = Math.round((raw / 2) * 10) / 10;
      }

      let reviewCount: number | null = null;
      const reviewText = reviewCountEl?.textContent || "";
      const reviewMatch = reviewText.match(/([\d\s,.]+)\s*(?:avis|commentaire|review|évaluation)/i);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1].replace(/[\s,.]/g, ""));

      let url: string | null = null;
      if (linkEl) url = linkEl.href;

      const image = imgEl?.src || null;

      listings.push({
        title,
        price,
        rating,
        reviewCount,
        url,
        location: locationEl?.textContent?.trim() || null,
        image,
      });
    });

    return listings.slice(0, 8);
  }).then((items: Array<Omit<ScrapedListing, "platform">>) =>
    items.map((item) => ({ ...item, platform: "Booking.com" as const }))
  );
}