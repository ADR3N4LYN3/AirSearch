import type { Page } from "playwright-core";
import type { ScrapedListing } from "../types";

export async function extractGitesDeFrance(page: Page): Promise<ScrapedListing[]> {
  await page.waitForSelector('.search-result-item, .gite-card, [data-type="gite"], article.accommodation', { timeout: 4000 }).catch(() => {});

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
      image: string | null;
    }> = [];

    const cards = document.querySelectorAll('.search-result-item, .gite-card, [data-type="gite"], article.accommodation');
    cards.forEach((card) => {
      const titleEl = card.querySelector('h2, h3, .gite-name, .accommodation-title') as HTMLElement | null;
      const priceEl = card.querySelector('.price, .price-value, [class*="price"]') as HTMLElement | null;
      const ratingEl = card.querySelector('.epis, [class*="epi"], [class*="rating"]') as HTMLElement | null;
      const linkEl = card.querySelector('a[href*="/location-vacances/"], a[href*="/gite/"]') as HTMLAnchorElement | null;
      const locationEl = card.querySelector('.location, .city, [class*="location"], .address') as HTMLElement | null;
      const imgEl = card.querySelector('img[class*="photo"], img[data-src], img[loading="lazy"], img') as HTMLImageElement | null;

      const title = titleEl?.textContent?.trim() || "";
      if (!title) return;

      let price: string | null = null;
      const priceText = priceEl?.textContent?.trim() || "";
      const priceMatch = priceText.match(/([\d\s,.]+)\s*[€]/) || priceText.match(/[€]\s*([\d\s,.]+)/);
      if (priceMatch) {
        const rawPrice = parseInt(priceMatch[1].replace(/[\s,.]/g, ""));
        // Si le prix est > 200€, c'est probablement un prix à la semaine
        if (rawPrice > 200) {
          const pricePerNight = Math.round(rawPrice / 7);
          price = pricePerNight + "€/nuit (estimé)";
        } else {
          price = rawPrice + "€";
        }
      }

      // Les "épis" sont notés de 1 à 5, directement compatible avec notre échelle /5
      let rating: number | null = null;
      const ratingText = ratingEl?.textContent?.trim() || ratingEl?.getAttribute("data-rating") || "";
      const ratingMatch = ratingText.match(/([\d,.]+)/);
      if (ratingMatch) {
        rating = parseFloat(ratingMatch[1].replace(",", "."));
        // S'assurer que la note est bien entre 0 et 5
        if (rating > 5) rating = 5;
      }

      let reviewCount: number | null = null;
      const reviewText = card.textContent || "";
      const reviewMatch = reviewText.match(/([\d\s,.]+)\s*(?:avis|commentaire|review)/i);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1].replace(/[\s,.]/g, ""));

      let url: string | null = null;
      if (linkEl) {
        url = linkEl.href.startsWith("http") ? linkEl.href : `https://www.gites-de-france.com${linkEl.getAttribute("href")}`;
      }

      const image = imgEl?.getAttribute("data-src") || imgEl?.src || null;

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
    items.map((item) => ({ ...item, platform: "Gîtes de France" as const }))
  );
}
