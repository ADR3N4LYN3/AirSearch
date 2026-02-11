import { NextRequest, NextResponse } from "next/server";
import { buildSearchPrompt, callAnthropic } from "@/lib/anthropic";
import { buildSearchUrls, scrapeAllPlatforms, buildAnalysisPrompt } from "@/lib/scraper";
import type { ScrapeResult } from "@/lib/scraper/types";
import type { SearchRequest, SearchResponse } from "@/lib/types";
import { getClientIp, isRateLimited } from "@/lib/rate-limiter";
import { validateSearchRequest } from "@/lib/validators/search";
import { GLOBAL_TIMEOUT_MS, ANTHROPIC_FALLBACK_TIMEOUT_MS, SSE_HEARTBEAT_MS } from "@/lib/constants";
import { injectScrapedImages } from "@/lib/search-utils";
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

// ---------------------------------------------------------------------------
// GET /api/search/stream — SSE streaming search endpoint
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json(
      { success: false, error: "Paramètre 'q' manquant." },
      { status: 400 },
    );
  }

  // Decode base64-encoded JSON search request
  let body: unknown;
  try {
    const decoded = atob(q);
    body = JSON.parse(decoded);
  } catch {
    return NextResponse.json(
      { success: false, error: "Paramètre 'q' invalide (base64 JSON attendu)." },
      { status: 400 },
    );
  }

  // Rate limit check
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        success: false,
        error: "Trop de requêtes. Veuillez patienter une minute avant de réessayer.",
      },
      { status: 429 },
    );
  }

  // Validate
  const validation = validateSearchRequest(body);
  if (!validation.valid) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: 400 },
    );
  }

  const searchRequest = validation.data;

  // --- Cache lookup: L1 (memory) → L2 (SQLite) → L3 (vector similarity) ---
  const cacheKey = buildCacheKey(searchRequest);

  const memoryHit = getFromMemory(cacheKey);
  if (memoryHit) {
    console.log(`[Search] L1 cache hit for ${cacheKey}`);
    return sseResponse((send, close) => {
      send("result", { success: true, data: memoryHit.data });
      close();
    });
  }

  const sqliteHit = getFromSqlite(cacheKey);
  if (sqliteHit) {
    console.log(`[Search] L2 cache hit for ${cacheKey}`);
    setInMemory(cacheKey, sqliteHit);
    return sseResponse((send, close) => {
      send("result", { success: true, data: sqliteHit.data });
      close();
    });
  }

  const searchVector = buildSearchVector(searchRequest);
  const vectorHit = findSimilarSearch(searchVector);
  if (vectorHit) {
    console.log(`[Search] L3 vector cache hit (similar search found)`);
    setInMemory(cacheKey, vectorHit);
    return sseResponse((send, close) => {
      send("result", { success: true, data: vectorHit.data });
      close();
    });
  }

  // --- Streaming search pipeline ---
  return sseStreamingSearch(searchRequest, cacheKey, searchVector);
}

// ---------------------------------------------------------------------------
// SSE helpers
// ---------------------------------------------------------------------------
type SendFn = (event: string, data: unknown) => void;
type CloseFn = () => void;

function sseResponse(
  callback: (send: SendFn, close: CloseFn) => void,
): NextResponse {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send: SendFn = (event, data) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };
      const close: CloseFn = () => {
        controller.close();
      };
      callback(send, close);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

// ---------------------------------------------------------------------------
// Streaming search pipeline
// ---------------------------------------------------------------------------
function sseStreamingSearch(
  searchRequest: SearchRequest,
  cacheKey: string,
  searchVector: number[],
): NextResponse {
  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const send: SendFn = (event, data) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch { /* stream already closed */ }
      };

      const close: CloseFn = () => {
        if (closed) return;
        closed = true;
        try { controller.close(); } catch { /* already closed */ }
      };

      // Heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        if (closed) {
          clearInterval(heartbeat);
          return;
        }
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          clearInterval(heartbeat);
        }
      }, SSE_HEARTBEAT_MS);

      // Global timeout
      const globalTimeout = setTimeout(() => {
        clearInterval(heartbeat);
        send("error", { error: "La recherche a pris trop de temps. Veuillez réessayer." });
        close();
      }, GLOBAL_TIMEOUT_MS);

      // Run the pipeline
      runPipeline(searchRequest, cacheKey, searchVector, send)
        .then((result) => {
          clearTimeout(globalTimeout);
          clearInterval(heartbeat);

          if (!closed) {
            send("result", result);

            // Cache write-back on success
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
          }

          close();
        })
        .catch((error) => {
          clearTimeout(globalTimeout);
          clearInterval(heartbeat);
          const msg = error instanceof Error ? error.message : "Unknown error";
          console.error(`[Search/SSE] Pipeline error: ${msg}`);
          send("error", { error: "La recherche a pris trop de temps. Veuillez réessayer." });
          close();
        });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

// ---------------------------------------------------------------------------
// Parallel search pipeline
// ---------------------------------------------------------------------------
async function runPipeline(
  searchRequest: SearchRequest,
  _cacheKey: string,
  _searchVector: number[],
  send: SendFn,
): Promise<SearchResponse> {
  const urls = buildSearchUrls(searchRequest);

  // Track progress
  let completedPlatforms = 0;
  const totalPlatforms = urls.length;

  // Launch scraping + web search in parallel
  send("progress", { stage: "scraping", message: "Scraping des plateformes en cours...", percent: 5 });

  const scrapePromise = scrapeAllPlatforms(urls, (platform, success, listingCount) => {
    completedPlatforms++;
    const percent = Math.round((completedPlatforms / totalPlatforms) * 40) + 5; // 5-45%
    const statusText = success ? `${listingCount} résultat${listingCount > 1 ? "s" : ""}` : "échec";
    send("progress", {
      stage: "scraping",
      message: `${platform} analysé (${statusText})`,
      percent,
    });
  });

  send("progress", { stage: "websearch", message: "Recherche web IA en cours...", percent: 10 });
  const webSearchPrompt = buildSearchPrompt(searchRequest);
  const webSearchPromise = callAnthropic(webSearchPrompt, { timeout: ANTHROPIC_FALLBACK_TIMEOUT_MS });

  // Wait for scraping to complete
  let scrapeResults: ScrapeResult[];
  try {
    scrapeResults = await scrapePromise;
  } catch (error) {
    console.error("[Search/SSE] Scraping failed:", error instanceof Error ? error.message : "Unknown error");
    scrapeResults = [];
  }

  const totalListings = scrapeResults.reduce(
    (sum, r) => sum + (r.success ? r.listings.length : 0),
    0,
  );

  if (totalListings > 0) {
    // Scraping succeeded — analyze with Haiku
    console.log(
      `[Search/SSE] Scraped ${totalListings} listings from ${scrapeResults.filter((r) => r.success).length}/${scrapeResults.length} platforms`,
    );
    send("progress", { stage: "analyzing", message: "Analyse IA des résultats...", percent: 50 });

    const analysisPrompt = buildAnalysisPrompt(searchRequest, scrapeResults);
    const analysisResult = await callAnthropic(analysisPrompt, { useTools: false, timeout: ANTHROPIC_FALLBACK_TIMEOUT_MS });

    injectScrapedImages(analysisResult, scrapeResults);

    return analysisResult;
  }

  // No scrape results — fall back to web search (already running in parallel)
  console.log("[Search/SSE] Scraping returned 0 listings, using web search fallback");
  send("progress", { stage: "websearch", message: "Recherche web IA (résultats en cours)...", percent: 60 });

  const webResult = await webSearchPromise;

  return webResult;
}
