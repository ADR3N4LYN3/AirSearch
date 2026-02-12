import type { Page } from "playwright-core";
import type { ScrapedListing } from "../types";

export async function extractHolidu(page: Page): Promise<ScrapedListing[]> {
  // Holidu is a React SPA — listings are in window.listPage JS object.
  // Keep timeout short (6s) so DOM fallback has time within the 15s extractor limit.
  await page.waitForFunction(
    () => {
      const w = window as unknown as Record<string, unknown>;
      const lp = w.listPage as Record<string, unknown> | undefined;
      if (lp?.offersV2 != null) return true;
      // Also check for DOM links as early signal
      return document.querySelectorAll('a[href*="/d/"]').length > 0;
    },
    { timeout: 6000 },
  ).catch(() => {});

  return page.evaluate(() => {
    const listings: Array<{
      title: string; price: string | null; rating: number | null;
      reviewCount: number | null; url: string | null; location: string | null;
      image: string | null;
    }> = [];

    // Primary: extract from window.listPage.offersV2.offers (structured JS object)
    try {
      const w = window as unknown as Record<string, unknown>;
      const listPage = w.listPage as Record<string, unknown> | undefined;
      const offersV2 = listPage?.offersV2 as Record<string, unknown> | undefined;
      const offers = offersV2?.offers as Record<string, Record<string, unknown>> | undefined;

      if (offers) {
        const entries = Object.values(offers).slice(0, 8);
        for (const offer of entries) {
          const details = offer.details as Record<string, unknown> | undefined;
          const priceObj = offer.price as Record<string, unknown> | undefined;
          const ratingObj = offer.rating as Record<string, unknown> | undefined;
          const locationObj = offer.location as Record<string, unknown> | undefined;
          const photos = offer.photos as Array<Record<string, string>> | undefined;

          const title = (details?.name as string) || "";
          if (!title) continue;

          let price: string | null = null;
          const daily = priceObj?.daily as number | undefined;
          if (daily != null && daily > 0) price = `${Math.round(daily)}€`;

          let rating: number | null = null;
          const ratingValue = ratingObj?.value as number | undefined;
          if (ratingValue != null && ratingValue > 0) {
            // Holidu uses 0-100 scale → convert to /5
            rating = Math.round((ratingValue / 20) * 10) / 10;
          }

          const reviewCount = (ratingObj?.count as number) || null;

          let url: string | null = null;
          const internalLink = offer.internalLink as string | undefined;
          if (internalLink) {
            url = internalLink.startsWith("http") ? internalLink : `https://www.holidu.fr${internalLink}`;
          }

          const image = photos?.[0]?.m || photos?.[0]?.l || null;

          listings.push({
            title,
            price,
            rating,
            reviewCount,
            url,
            location: (locationObj?.name as string) || null,
            image,
          });
        }
      }
    } catch { /* JS object extraction failed, try DOM fallback */ }

    // Fallback: parse DOM links if JS object not available
    if (listings.length === 0) {
      const links = document.querySelectorAll('a[href*="/d/"]');
      links.forEach((link) => {
        const titleEl = link.querySelector("h3, h2") as HTMLElement | null;
        const title = titleEl?.textContent?.trim() || "";
        if (!title) return;

        const priceText = link.textContent || "";
        const priceMatch = priceText.match(/(\d[\d\s,.]*)\s*€/) || priceText.match(/€\s*(\d[\d\s,.]*)/);
        const price = priceMatch ? priceMatch[1].replace(/\s/g, "") + "€" : null;

        const ratingText = link.textContent || "";
        const ratingMatch = ratingText.match(/([\d,.]+)\s*[·/]/);
        let rating: number | null = null;
        if (ratingMatch) {
          const raw = parseFloat(ratingMatch[1].replace(",", "."));
          rating = raw > 5 ? Math.round((raw / 2) * 10) / 10 : raw;
        }

        const href = (link as HTMLAnchorElement).href;
        const url = href.startsWith("http") ? href : `https://www.holidu.fr${href}`;

        const imgEl = link.querySelector("img") as HTMLImageElement | null;
        const image = imgEl?.src || imgEl?.getAttribute("data-src") || null;

        listings.push({
          title,
          price,
          rating,
          reviewCount: null,
          url,
          location: null,
          image,
        });
      });
    }

    return listings.slice(0, 8);
  }).then((items: Array<Omit<ScrapedListing, "platform">>) =>
    items.map((item) => ({ ...item, platform: "Holidu" as const }))
  );
}
