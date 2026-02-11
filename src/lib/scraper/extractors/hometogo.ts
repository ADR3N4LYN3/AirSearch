import type { Page } from "playwright-core";
import type { ScrapedListing } from "../types";

export async function extractHomeToGo(page: Page): Promise<ScrapedListing[]> {
  await page.waitForSelector('[data-testid="result-item"], [class*="SearchResultCard"], [class*="OfferCard"], article', { timeout: 4000 }).catch(() => {});

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
      image: string | null;
    }> = [];

    const cards = document.querySelectorAll('[data-testid="result-item"], [class*="SearchResultCard"], [class*="OfferCard"]');
    cards.forEach((card) => {
      const titleEl = card.querySelector('[data-testid="result-title"], h2, h3, [class*="title"]') as HTMLElement | null;
      const priceEl = card.querySelector('[data-testid="result-price"], [class*="price"], [class*="Price"]') as HTMLElement | null;
      const ratingEl = card.querySelector('[data-testid="result-rating"], [class*="rating"], [class*="Rating"]') as HTMLElement | null;
      const linkEl = card.querySelector('a[href*="/offers/"], a[href*="/accommodation/"]') as HTMLAnchorElement | null
        || card.closest('a') as HTMLAnchorElement | null;
      const locationEl = card.querySelector('[data-testid="result-location"], [class*="location"]') as HTMLElement | null;
      const imgEl = card.querySelector('[data-testid="result-image"] img, img[loading], img') as HTMLImageElement | null;

      const title = titleEl?.textContent?.trim() || "";
      if (!title) return;

      let price: string | null = null;
      const priceText = priceEl?.textContent?.trim() || "";
      const priceMatch = priceText.match(/([\d\s,.]+)\s*[€$£]/) || priceText.match(/[€$£]\s*([\d\s,.]+)/);
      if (priceMatch) price = priceMatch[1].replace(/\s/g, "") + "€";

      let rating: number | null = null;
      let reviewCount: number | null = null;
      const ratingText = ratingEl?.textContent?.trim() || "";
      const ratingMatch = ratingText.match(/([\d,.]+)/);
      if (ratingMatch) {
        const raw = parseFloat(ratingMatch[1].replace(",", "."));
        // HomeToGo uses /10 scale → convert to /5
        rating = raw > 5 ? Math.round((raw / 2) * 10) / 10 : raw;
      }
      const reviewMatch = ratingText.match(/([\d\s,.]+)\s*(?:avis|review|commentaire)/i);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1].replace(/[\s,.]/g, ""));

      let url: string | null = null;
      if (linkEl) {
        url = linkEl.href.startsWith("http") ? linkEl.href : `https://www.hometogo.fr${linkEl.getAttribute("href")}`;
      }

      const image = imgEl?.src || imgEl?.getAttribute("data-src") || null;

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
    items.map((item) => ({ ...item, platform: "HomeToGo" as const }))
  );
}
