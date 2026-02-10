import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { Browser, Page, Route } from "playwright-core";
import type { PlatformUrl, ScrapedListing, ScrapeResult } from "./types";
import { extractAirbnb } from "./extractors/airbnb";
import { extractBooking } from "./extractors/booking";
import { extractAbritel } from "./extractors/abritel";

chromium.use(StealthPlugin());

// ---------------------------------------------------------------------------
// Browser singleton (with shared promise to prevent race conditions)
// ---------------------------------------------------------------------------
let browserInstance: Browser | null = null;
let browserLaunchPromise: Promise<Browser> | null = null;
let browserUseCount = 0;
const MAX_BROWSER_USES = 100;

async function getBrowser(): Promise<Browser> {
  // Recycle browser after MAX_BROWSER_USES to prevent memory leaks
  if (browserInstance && browserUseCount >= MAX_BROWSER_USES) {
    console.log(`[Scraper] Recycling browser after ${browserUseCount} uses`);
    await browserInstance.close().catch(() => {});
    browserInstance = null;
    browserUseCount = 0;
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
    return browser;
  }).catch(err => {
    browserLaunchPromise = null;
    throw err;
  });

  return browserLaunchPromise;
}

function cleanupBrowser() {
  if (browserInstance) {
    browserInstance.close().catch(() => {});
    browserInstance = null;
  }
}
process.on('SIGTERM', cleanupBrowser);
process.on('SIGINT', cleanupBrowser);

// ---------------------------------------------------------------------------
// Extractor registry
// ---------------------------------------------------------------------------
const EXTRACTORS: Record<string, (page: Page) => Promise<ScrapedListing[]>> = {
  Airbnb: extractAirbnb,
  "Booking.com": extractBooking,
  Abritel: extractAbritel,
};

// ---------------------------------------------------------------------------
// Scrape orchestration
// ---------------------------------------------------------------------------
async function scrapeSingle(browser: Browser, platformUrl: PlatformUrl): Promise<ScrapeResult> {
  const { platform, url } = platformUrl;
  let page: Page | null = null;

  try {
    page = await browser.newPage();

    await page.route("**/*", (route: Route) => {
      const type = route.request().resourceType();
      if (["image", "media", "font"].includes(type)) {
        return route.abort();
      }
      return route.continue();
    });

    await page.setExtraHTTPHeaders({
      "Accept-Language": "fr-FR,fr;q=0.9",
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 12000 });
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});

    const extractor = EXTRACTORS[platform];
    const listings = extractor ? await extractor(page) : [];

    if (listings.length === 0) {
      console.warn(`[Scraper] ${platform}: 0 listings found. Selectors may have failed for URL: ${url}`);
    }

    return { platform, success: listings.length > 0, listings };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Scraper] ${platform} failed: ${msg}`);
    return { platform, success: false, listings: [], error: msg };
  } finally {
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