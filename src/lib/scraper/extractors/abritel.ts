import type { Page } from "playwright-core";
import type { ScrapedListing } from "../types";

export async function extractAbritel(page: Page): Promise<ScrapedListing[]> {
  await page.waitForSelector('[data-test="PROPERTY_LISTING"], .HitCollection__hit', { timeout: 4000 }).catch(() => {});

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
      image: string | null;
    }> = [];

    const cards = document.querySelectorAll('[data-test="PROPERTY_LISTING"], .HitCollection__hit');
    cards.forEach((card) => {
      const titleEl = card.querySelector('h3, [data-test="property-name"]') as HTMLElement | null;
      const priceEl = card.querySelector('[data-test="price-summary"], .HitCollection__hit__price') as HTMLElement | null;
      const ratingEl = card.querySelector('[data-test="guest-rating"], [aria-label*="note"]') as HTMLElement | null;
      const linkEl = card.querySelector('a[href*="/location-vacances/"], a[href*="/p/"]') as HTMLAnchorElement | null;
      const imgEl = card.querySelector('img[data-test="property-image"], img') as HTMLImageElement | null;

      const title = titleEl?.textContent?.trim() || "";
      if (!title) return;

      let price: string | null = null;
      const priceText = priceEl?.textContent?.trim() || "";
      const priceMatch = priceText.match(/([\d\s,.]+)\s*[€$£]/) || priceText.match(/[€$£]\s*([\d\s,.]+)/);
      if (priceMatch) price = priceMatch[1].replace(/\s/g, "") + "€";

      let rating: number | null = null;
      let reviewCount: number | null = null;
      const ratingText = ratingEl?.textContent || card.textContent || "";
      const ratingMatch = ratingText.match(/([\d,.]+)\s*\/\s*5/);
      if (ratingMatch) rating = parseFloat(ratingMatch[1].replace(",", "."));
      const reviewMatch = ratingText.match(/(\d+)\s*(?:avis|commentaire|review)/i);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1]);

      let url: string | null = null;
      if (linkEl) {
        url = linkEl.href.startsWith("http") ? linkEl.href : `https://www.abritel.fr${linkEl.getAttribute("href")}`;
      }

      const image = imgEl?.src || null;

      listings.push({
        title,
        price,
        rating,
        reviewCount,
        url,
        location: null,
        image,
      });
    });

    return listings.slice(0, 8);
  }).then((items: Array<Omit<ScrapedListing, "platform">>) =>
    items.map((item) => ({ ...item, platform: "Abritel" as const }))
  );
}