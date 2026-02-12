import type { Page } from "patchright";
import type { ScrapedListing } from "../types";

/**
 * Hotels.com shares the Expedia Group UITK design system.
 * Nearly identical selectors to Vrbo and Expedia extractors.
 */
export async function extractHotels(page: Page): Promise<ScrapedListing[]> {
  const found = await page.waitForSelector('[data-stid="lodging-card-responsive"], [data-stid="property-listing-results"] > div, [data-testid="property-card"]', { timeout: 10000, state: "attached" }).catch(() => null);
  if (!found) console.warn("[Scraper] Hotels.com: waitForSelector timeout — selectors not found in DOM");

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
      image: string | null;
    }> = [];

    const cards = document.querySelectorAll('[data-stid="lodging-card-responsive"], [data-stid="property-listing-results"] > div, [data-testid="property-card"]');
    cards.forEach((card) => {
      const titleEl = card.querySelector('[data-stid="content-hotel-title"], h3') as HTMLElement | null;
      const priceEl = card.querySelector('[data-stid="price-lockup"] span, [data-stid="price-summary"] span') as HTMLElement | null
        || card.querySelector('.uitk-type-500, .uitk-type-600') as HTMLElement | null;
      const ratingEl = card.querySelector('[data-stid="content-hotel-review-rating"] span, .uitk-badge-base-text') as HTMLElement | null;
      const reviewCountEl = card.querySelector('[data-stid="content-hotel-review-total"] span') as HTMLElement | null;
      const linkEl = card.querySelector('a[data-stid="open-hotel-information"], a[href*="/hotel/"], a[href*="/ho"]') as HTMLAnchorElement | null;
      const locationEl = card.querySelector('[data-stid="content-hotel-subtitle"] span') as HTMLElement | null;
      const imgEl = card.querySelector('img[data-stid="lodging-card-image"], img[src*="hotels.com"], img[src*="trvl-media"]') as HTMLImageElement | null;

      const title = titleEl?.textContent?.trim() || "";
      if (!title) return;

      let price: string | null = null;
      const priceText = priceEl?.textContent?.trim() || "";
      const priceMatch = priceText.match(/([\d\s,.]+)\s*[€$£]/) || priceText.match(/[€$£]\s*([\d\s,.]+)/);
      if (priceMatch) price = priceMatch[1].replace(/\s/g, "") + "€";

      // Hotels.com uses /10 scale → convert to /5
      let rating: number | null = null;
      const ratingText = ratingEl?.textContent?.trim() || "";
      const ratingMatch = ratingText.match(/([\d,.]+)/);
      if (ratingMatch) {
        const raw = parseFloat(ratingMatch[1].replace(",", "."));
        rating = raw > 5 ? Math.round((raw / 2) * 10) / 10 : raw;
      }

      let reviewCount: number | null = null;
      const reviewText = reviewCountEl?.textContent || "";
      const reviewMatch = reviewText.match(/([\d\s,.]+)\s*(?:avis|review|évaluation)/i);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1].replace(/[\s,.]/g, ""));

      let url: string | null = null;
      if (linkEl) {
        url = linkEl.href.startsWith("http") ? linkEl.href : `https://fr.hotels.com${linkEl.getAttribute("href")}`;
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

    // JSON-LD fallback when CSS selectors return 0 results
    if (listings.length === 0) {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const script of scripts) {
        try {
          const data = JSON.parse(script.textContent || "");
          const items = data["@type"] === "ItemList" ? (data.itemListElement || []) :
                        Array.isArray(data) ? data : [data];
          for (const item of items) {
            if (!item.name) continue;
            listings.push({
              title: item.name,
              price: item.offers?.price ? `${item.offers.price}€` : null,
              rating: item.aggregateRating?.ratingValue ? parseFloat(item.aggregateRating.ratingValue) : null,
              reviewCount: item.aggregateRating?.reviewCount ? parseInt(item.aggregateRating.reviewCount) : null,
              url: item.url || null,
              location: item.address?.addressLocality || null,
              image: (Array.isArray(item.image) ? item.image[0] : item.image) || null,
            });
          }
        } catch { /* ignore malformed JSON-LD */ }
      }
    }

    return listings.slice(0, 8);
  }).then((items: Array<Omit<ScrapedListing, "platform">>) =>
    items.map((item) => ({ ...item, platform: "Hotels.com" as const }))
  );
}
