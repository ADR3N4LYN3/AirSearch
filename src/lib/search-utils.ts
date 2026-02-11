import type { ScrapeResult } from "@/lib/scraper/types";
import type { SearchResponse } from "@/lib/types";
import { sanitizeUrl } from "@/lib/anthropic/response-mapper";

export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function injectScrapedImages(result: SearchResponse, scrapeResults: ScrapeResult[]): void {
  if (!result.success || !result.data) return;

  // Build multiple lookup maps for robust matching
  const byTitlePlatform = new Map<string, string>();
  const byTitle = new Map<string, string>();
  const byNormTitle = new Map<string, string>();
  const byUrl = new Map<string, string>();

  for (const sr of scrapeResults) {
    for (const l of sr.listings) {
      if (!l.image) continue;
      byTitlePlatform.set(`${l.title}::${sr.platform}`, l.image);
      byTitle.set(l.title, l.image);
      byNormTitle.set(normalize(l.title), l.image);
      if (l.url) byUrl.set(l.url, l.image);
    }
  }

  for (const r of result.data.results) {
    const rawImage =
      byTitlePlatform.get(`${r.title}::${r.platform}`) ||
      byTitle.get(r.title) ||
      (r.url ? byUrl.get(r.url) : null) ||
      byNormTitle.get(normalize(r.title)) ||
      null;
    // Validate scraped image URL before injection
    r.image = rawImage ? sanitizeUrl(rawImage) : null;
  }
}
