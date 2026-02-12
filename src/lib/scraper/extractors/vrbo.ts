import type { Page } from "playwright-core";
import type { ScrapedListing } from "../types";

export async function extractVrbo(page: Page): Promise<ScrapedListing[]> {
  const found = await page.waitForSelector('[data-stid="lodging-card-responsive"], [data-stid="property-listing-results"] > div', { timeout: 10000, state: "attached" }).catch(() => null);
  if (!found) console.warn("[Scraper] Vrbo: waitForSelector timeout — selectors not found in DOM");

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
      image: string | null;
    }> = [];

    const cards = document.querySelectorAll('[data-stid="lodging-card-responsive"], [data-stid="property-listing-results"] > div');
    cards.forEach((card) => {
      const titleEl = card.querySelector('[data-stid="content-hotel-title"], h3') as HTMLElement | null;
      const priceEl = card.querySelector('[data-stid="price-lockup"] span, [data-stid="price-summary"] span') as HTMLElement | null
        || card.querySelector('.uitk-type-500, .uitk-type-600') as HTMLElement | null;
      const ratingEl = card.querySelector('[data-stid="content-hotel-review-rating"] span, .uitk-badge-base-text') as HTMLElement | null;
      const reviewCountEl = card.querySelector('[data-stid="content-hotel-review-total"] span') as HTMLElement | null;
      const linkEl = card.querySelector('a[data-stid="open-hotel-information"], a[href*="/vacation-rental/"], a[href*="/p/"]') as HTMLAnchorElement | null;
      const locationEl = card.querySelector('[data-stid="content-hotel-subtitle"] span, .uitk-text-emphasis-theme') as HTMLElement | null;
      const imgEl = card.querySelector('img[data-stid="lodging-card-image"], img[src*="vrbo"], img[src*="expedia"]') as HTMLImageElement | null;

      const title = titleEl?.textContent?.trim() || "";
      if (!title) return;

      let price: string | null = null;
      const priceText = priceEl?.textContent?.trim() || "";
      const priceMatch = priceText.match(/([\d\s,.]+)\s*[€$£]/) || priceText.match(/[€$£]\s*([\d\s,.]+)/);
      if (priceMatch) price = priceMatch[1].replace(/\s/g, "") + "€";

      let rating: number | null = null;
      const ratingText = ratingEl?.textContent?.trim() || "";
      const ratingMatch = ratingText.match(/([\d,.]+)/);
      if (ratingMatch) {
        const raw = parseFloat(ratingMatch[1].replace(",", "."));
        // Vrbo uses /10 scale like Booking → convert to /5
        rating = raw > 5 ? Math.round((raw / 2) * 10) / 10 : raw;
      }

      let reviewCount: number | null = null;
      const reviewText = reviewCountEl?.textContent || ratingEl?.parentElement?.textContent || "";
      const reviewMatch = reviewText.match(/([\d\s,.]+)\s*(?:avis|review|évaluation|opinion)/i);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1].replace(/[\s,.]/g, ""));

      let url: string | null = null;
      if (linkEl) {
        url = linkEl.href.startsWith("http") ? linkEl.href : `https://www.vrbo.com${linkEl.getAttribute("href")}`;
      }

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
    items.map((item) => ({ ...item, platform: "Vrbo" as const }))
  );
}
