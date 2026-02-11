import { NextRequest, NextResponse } from "next/server";
import { buildSearchPrompt, callAnthropic } from "@/lib/anthropic";
import { buildSearchUrls, scrapeAllPlatforms, buildAnalysisPrompt } from "@/lib/scraper";
import type { ScrapeResult } from "@/lib/scraper/types";
import type { SearchResponse } from "@/lib/types";
import { getClientIp, isRateLimited } from "@/lib/rate-limiter";
import { validateSearchRequest } from "@/lib/validators/search";
import { GLOBAL_TIMEOUT_MS, ANTHROPIC_FALLBACK_TIMEOUT_MS } from "@/lib/constants";
import { sanitizeUrl } from "@/lib/anthropic/response-mapper";
import {
  buildCacheKey,
  buildSearchVector,
  getFromMemory,
  setInMemory,
  getFromSqlite,
  setInSqlite,
  findSimilarSearch,
  storeSearchVector,
} from "@/lib/cache";

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function injectScrapedImages(result: SearchResponse, scrapeResults: ScrapeResult[]): void {
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

// ---------------------------------------------------------------------------
// POST /api/search
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        success: false,
        error: "Trop de requêtes. Veuillez patienter une minute avant de réessayer.",
      },
      { status: 429 }
    );
  }

  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "JSON invalide dans le corps de la requête." },
      { status: 400 }
    );
  }

  // Validate
  const validation = validateSearchRequest(body);
  if (!validation.valid) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: 400 }
    );
  }

  const searchRequest = validation.data;

  // --- Cache lookup: L1 (memory) → L2 (SQLite) → L3 (vector similarity) ---
  const cacheKey = buildCacheKey(searchRequest);

  const memoryHit = getFromMemory(cacheKey);
  if (memoryHit) {
    console.log(`[Search] L1 cache hit for ${cacheKey}`);
    return NextResponse.json(memoryHit, { status: 200 });
  }

  const sqliteHit = getFromSqlite(cacheKey);
  if (sqliteHit) {
    console.log(`[Search] L2 cache hit for ${cacheKey}`);
    setInMemory(cacheKey, sqliteHit);
    return NextResponse.json(sqliteHit, { status: 200 });
  }

  const searchVector = buildSearchVector(searchRequest);
  const vectorHit = findSimilarSearch(searchVector);
  if (vectorHit) {
    console.log(`[Search] L3 vector cache hit (similar search found)`);
    setInMemory(cacheKey, vectorHit);
    return NextResponse.json(vectorHit, { status: 200 });
  }

  // --- Scraping + AI analysis (with fallback to web_search) ---

  const operationPromise = (async () => {
    let result;

    try {
      const urls = buildSearchUrls(searchRequest);
      const scrapeResults = await scrapeAllPlatforms(urls);

      const totalListings = scrapeResults.reduce(
        (sum, r) => sum + (r.success ? r.listings.length : 0),
        0
      );

      if (totalListings > 0) {
        console.log(
          `[Search] Scraped ${totalListings} listings from ${scrapeResults.filter((r) => r.success).length}/${scrapeResults.length} platforms`
        );
        const analysisPrompt = buildAnalysisPrompt(searchRequest, scrapeResults);
        result = await callAnthropic(analysisPrompt, { useTools: false, timeout: ANTHROPIC_FALLBACK_TIMEOUT_MS });
        injectScrapedImages(result, scrapeResults);
      } else {
        console.log("[Search] Scraping returned 0 listings, falling back to web_search");
        const prompt = buildSearchPrompt(searchRequest);
        result = await callAnthropic(prompt);
      }
    } catch (error) {
      console.error(
        "[Search] Scraper error, falling back to web_search:",
        error instanceof Error ? error.message : "Unknown error"
      );
      const prompt = buildSearchPrompt(searchRequest);
      result = await callAnthropic(prompt);
    }

    return result;
  })();

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Global timeout exceeded")), GLOBAL_TIMEOUT_MS)
  );

  let result;
  try {
    result = await Promise.race([operationPromise, timeoutPromise]);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Search] Operation timed out or failed: ${msg}`);
    return NextResponse.json(
      { success: false, error: "La recherche a pris trop de temps. Veuillez réessayer." },
      { status: 504 }
    );
  }

  // --- Cache write-back on success ---
  if (result.success) {
    setInMemory(cacheKey, result);
    setInSqlite(cacheKey, result, {
      destination: searchRequest.destination,
      checkin: searchRequest.checkin ?? "",
      checkout: searchRequest.checkout ?? "",
      guests: searchRequest.adults + searchRequest.children,
    });
    storeSearchVector(cacheKey, searchVector, searchRequest.destination);
  }

  const statusCode = result.success ? 200 : 502;
  return NextResponse.json(result, { status: statusCode });
}
