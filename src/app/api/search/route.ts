import { NextRequest, NextResponse } from "next/server";
import { buildSearchPrompt, callAnthropic } from "@/lib/anthropic";
import { buildSearchUrls, scrapeAllPlatforms, buildAnalysisPrompt } from "@/lib/scraper";
import { getClientIp, isRateLimited } from "@/lib/rate-limiter";
import { validateSearchRequest } from "@/lib/validators/search";

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

  // --- Scraping + Claude analysis (with fallback to web_search) ---
  const GLOBAL_TIMEOUT_MS = 28_000;

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
          `[Search] Scraped ${totalListings} listings from ${scrapeResults.filter((r) => r.success).length}/3 platforms`
        );
        const analysisPrompt = buildAnalysisPrompt(searchRequest, scrapeResults);
        result = await callAnthropic(analysisPrompt, { useTools: false, timeout: 25000 });
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

  const statusCode = result.success ? 200 : 502;
  return NextResponse.json(result, { status: statusCode });
}
