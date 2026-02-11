import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { Browser, Page, Route } from "playwright-core";
import type { PlatformUrl, ScrapedListing, ScrapeResult } from "./types";
import { extractAirbnb } from "./extractors/airbnb";
import { extractBooking } from "./extractors/booking";
import { extractVrbo } from "./extractors/vrbo";
import { extractHolidu } from "./extractors/holidu";
import { extractHomeToGo } from "./extractors/hometogo";
import { extractExpedia } from "./extractors/expedia";
import { extractHotels } from "./extractors/hotels";
import { extractGitesDeFrance } from "./extractors/gites-de-france";
import { SCRAPE_TIMEOUT_MS } from "@/lib/constants";

chromium.use(StealthPlugin());

// ---------------------------------------------------------------------------
// Browser singleton (with shared promise to prevent race conditions)
// ---------------------------------------------------------------------------
let browserInstance: Browser | null = null;
let browserLaunchPromise: Promise<Browser> | null = null;
let browserUseCount = 0;
let browserCreatedAt = 0;
let browserInUse = 0;
let consecutiveLaunchFailures = 0;
let lastFailureTime = 0;

const MAX_BROWSER_USES = 100;
const MAX_BROWSER_AGE_MS = 30 * 60 * 1000; // 30 minutes
const CIRCUIT_BREAKER_COOLDOWN_MS = 30_000; // 30 seconds
const CIRCUIT_BREAKER_THRESHOLD = 3;
const EXTRACTOR_TIMEOUT_MS = 8_000;

async function getBrowser(): Promise<Browser> {
  // Circuit breaker: if too many consecutive failures, wait before retrying
  if (
    consecutiveLaunchFailures >= CIRCUIT_BREAKER_THRESHOLD &&
    Date.now() - lastFailureTime < CIRCUIT_BREAKER_COOLDOWN_MS
  ) {
    throw new Error(
      `[Scraper] Circuit breaker open: ${consecutiveLaunchFailures} consecutive launch failures. Retry after cooldown.`
    );
  }

  // Recycle browser after MAX_BROWSER_USES to prevent memory leaks
  if (browserInstance && browserUseCount >= MAX_BROWSER_USES) {
    console.log(`[Scraper] Recycling browser after ${browserUseCount} uses`);
    if (browserInUse <= 0) {
      await browserInstance.close().catch(() => {});
      browserInstance = null;
      browserUseCount = 0;
    }
  }

  // Recycle browser after maxAge to prevent memory leaks
  if (
    browserInstance &&
    browserCreatedAt > 0 &&
    Date.now() - browserCreatedAt > MAX_BROWSER_AGE_MS
  ) {
    console.log(`[Scraper] Recycling browser after maxAge (${MAX_BROWSER_AGE_MS}ms)`);
    if (browserInUse <= 0) {
      await browserInstance.close().catch(() => {});
      browserInstance = null;
      browserUseCount = 0;
      browserCreatedAt = 0;
    }
  }

  if (browserInstance?.isConnected()) {
    browserUseCount++;
    return browserInstance;
  }

  if (browserLaunchPromise) return browserLaunchPromise;

  browserLaunchPromise = chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  }).then(browser => {
    browserInstance = browser;
    browserLaunchPromise = null;
    browserUseCount = 1;
    browserCreatedAt = Date.now();
    consecutiveLaunchFailures = 0;
    return browser;
  }).catch(err => {
    browserLaunchPromise = null;
    consecutiveLaunchFailures++;
    lastFailureTime = Date.now();
    throw err;
  });

  return browserLaunchPromise;
}

function cleanupBrowser() {
  if (browserInstance) {
    browserInstance.close().catch((err) => {
      console.error("[Scraper] Error closing browser during cleanup:", err);
    });
    browserInstance = null;
  }
}
process.on('SIGTERM', cleanupBrowser);
process.on('SIGINT', cleanupBrowser);

// Warm up browser on module load (non-blocking)
if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
  getBrowser().catch(() => {});
}

// ---------------------------------------------------------------------------
// Third-party script domains to block (analytics, tracking, ads)
// ---------------------------------------------------------------------------
const BLOCKED_SCRIPT_DOMAINS = [
  "google-analytics.com",
  "googletagmanager.com",
  "facebook.net",
  "doubleclick.net",
  "hotjar.com",
  "clarity.ms",
  "sentry.io",
  "datadome.co",
  "newrelic.com",
  "segment.io",
  "optimizely.com",
  "cdn.cookielaw.org",
  "cookiebot.com",
];

// ---------------------------------------------------------------------------
// Extractor registry
// ---------------------------------------------------------------------------
const EXTRACTORS: Record<string, (page: Page) => Promise<ScrapedListing[]>> = {
  Airbnb: extractAirbnb,
  "Booking.com": extractBooking,
  Vrbo: extractVrbo,
  Holidu: extractHolidu,
  HomeToGo: extractHomeToGo,
  Expedia: extractExpedia,
  "Hotels.com": extractHotels,
  "Gîtes de France": extractGitesDeFrance,
};

// ---------------------------------------------------------------------------
// Scrape orchestration
// ---------------------------------------------------------------------------
async function scrapeSingle(browser: Browser, platformUrl: PlatformUrl): Promise<ScrapeResult> {
  const { platform, url } = platformUrl;
  let page: Page | null = null;

  browserInUse++;
  try {
    page = await browser.newPage();

    await page.route("**/*", (route: Route) => {
      const type = route.request().resourceType();
      if (["image", "media", "font", "stylesheet"].includes(type)) {
        return route.abort();
      }
      // Block third-party tracking/analytics scripts
      if (type === "script") {
        const reqUrl = route.request().url();
        if (BLOCKED_SCRIPT_DOMAINS.some((d) => reqUrl.includes(d))) {
          return route.abort();
        }
      }
      return route.continue();
    });

    await page.setExtraHTTPHeaders({
      "Accept-Language": "fr-FR,fr;q=0.9",
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: SCRAPE_TIMEOUT_MS });

    const extractor = EXTRACTORS[platform];
    let listings: ScrapedListing[] = [];
    if (extractor) {
      listings = await Promise.race([
        extractor(page),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Extractor timeout (${EXTRACTOR_TIMEOUT_MS}ms)`)), EXTRACTOR_TIMEOUT_MS)
        ),
      ]);
    }

    if (listings.length === 0) {
      console.warn(`[Scraper] ${platform}: 0 listings found. Selectors may have failed for URL: ${url}`);
    }

    return { platform, success: listings.length > 0, listings };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Scraper] ${platform} failed: ${msg}`);
    return { platform, success: false, listings: [], error: msg };
  } finally {
    browserInUse--;
    if (page) await page.close().catch(() => {});
  }
}

export async function scrapeAllPlatforms(urls: PlatformUrl[]): Promise<ScrapeResult[]> {
  try {
    const browser = await getBrowser();

    const results = await Promise.allSettled(
      urls.map((u) => scrapeSingle(browser, u))
    );

    const mapped = results.map((r, i) => {
      if (r.status === "fulfilled") return r.value;
      return {
        platform: urls[i].platform,
        success: false,
        listings: [] as ScrapedListing[],
        error: r.reason?.message || "Scrape failed",
      };
    });

    for (const r of mapped) {
      console.log(`[Scraper] ${r.platform}: ${r.success ? r.listings.length + ' listings' : 'FAILED - ' + r.error}`);
    }

    return mapped;
  } catch (error) {
    console.error("[Scraper] Browser launch failed:", error instanceof Error ? error.message : error);
    return urls.map((u) => ({
      platform: u.platform,
      success: false,
      listings: [],
      error: "Browser unavailable",
    }));
  }
}