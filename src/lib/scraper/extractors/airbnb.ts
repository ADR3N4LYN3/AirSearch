import type { Page } from "playwright-core";
import type { ScrapedListing } from "../types";

export async function extractAirbnb(page: Page): Promise<ScrapedListing[]> {
  await page.waitForSelector('[itemprop="itemListElement"], [data-testid="card-container"]', { timeout: 8000 }).catch(() => {});

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
    }> = [];

    const cards = document.querySelectorAll('[itemprop="itemListElement"], [data-testid="card-container"]');
    cards.forEach((card) => {
      const titleEl = card.querySelector('meta[itemprop="name"], span[data-testid="listing-card-name"], [data-testid="listing-card-title"], [id^="title_"]') as HTMLElement | null;
      const priceEl = card.querySelector('[data-testid="price-availability-row"] span') as HTMLElement | null;
      const ratingEl = card.querySelector('[aria-label*="note"], [aria-label*="rating"]') as HTMLElement | null;
      const linkEl = card.querySelector('a[href*="/rooms/"]') as HTMLAnchorElement | null;
      const locationEl = card.querySelector('[data-testid="listing-card-subtitle"]') as HTMLElement | null;

      const title = (titleEl?.getAttribute("content") || titleEl?.textContent || "").trim();
      if (!title) return;

      let price: string | null = null;
      const priceText = priceEl?.textContent?.trim() || "";
      const priceMatch = priceText.match(/(\d[\d\s,.]*)\s*[€$]/);
      if (priceMatch) price = priceMatch[1].replace(/\s/g, "") + "€";

      let rating: number | null = null;
      let reviewCount: number | null = null;
      const ratingText = ratingEl?.getAttribute("aria-label") || ratingEl?.textContent || "";
      const ratingMatch = ratingText.match(/([\d,.]+)/);
      if (ratingMatch) rating = parseFloat(ratingMatch[1].replace(",", "."));
      const reviewMatch = ratingText.match(/(\d+)\s*(?:avis|commentaire|review)/i);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1]);

      let url: string | null = null;
      if (linkEl) {
        url = linkEl.href.startsWith("http") ? linkEl.href : `https://www.airbnb.fr${linkEl.getAttribute("href")}`;
      }

      listings.push({
        title,
        price,
        rating,
        reviewCount,
        url,
        location: locationEl?.textContent?.trim() || null,
      });
    });

    return listings.slice(0, 8);
  }).then((items: Array<Omit<ScrapedListing, "platform">>) =>
    items.map((item) => ({ ...item, platform: "Airbnb" as const }))
  );
}