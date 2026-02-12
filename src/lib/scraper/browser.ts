import { chromium } from "patchright";
import type { Browser, BrowserContext, Page, Route } from "patchright";
import { FingerprintGenerator } from "fingerprint-generator";
import { FingerprintInjector } from "fingerprint-injector";
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

// ---------------------------------------------------------------------------
// Fingerprint generation (realistic browser profiles)
// ---------------------------------------------------------------------------
const fingerprintGenerator = new FingerprintGenerator({
  browsers: [{ name: "chrome", minVersion: 120 }],
  devices: ["desktop"],
  operatingSystems: ["windows", "macos"],
  locales: ["fr-FR"],
});
const fingerprintInjector = new FingerprintInjector();

// ---------------------------------------------------------------------------
// Platform-specific configuration
// ---------------------------------------------------------------------------
// Use domcontentloaded for page.goto — modern SPAs never reach "networkidle" due to
// analytics, websockets, and continuous polling. The extractors handle SPA rendering
// wait via their own waitForSelector/waitForFunction with 10s timeouts.
const PLATFORM_CONFIG: Record<string, { waitUntil: "domcontentloaded" | "load"; timeout: number }> = {};

const DEFAULT_PLATFORM_CONFIG = { waitUntil: "domcontentloaded" as const, timeout: 18000 };

// ---------------------------------------------------------------------------
// Platform health tracking
// ---------------------------------------------------------------------------
const platformHealth = new Map<string, { success: number; fail: number; lastFailTime: number }>();
const HEALTH_COOLDOWN_MS = 30 * 60 * 1000; // 30 min
const HEALTH_FAIL_THRESHOLD = 2;

function recordPlatformResult(platform: string, success: boolean): void {
  const entry = platformHealth.get(platform) ?? { success: 0, fail: 0, lastFailTime: 0 };
  if (success) {
    entry.success++;
    entry.fail = 0; // Reset consecutive fail counter on success
  } else {
    entry.fail++;
    entry.lastFailTime = Date.now();
  }
  platformHealth.set(platform, entry);
}

function isPlatformHealthy(platform: string): boolean {
  const entry = platformHealth.get(platform);
  if (!entry) return true;
  if (entry.fail >= HEALTH_FAIL_THRESHOLD && Date.now() - entry.lastFailTime < HEALTH_COOLDOWN_MS) {
    const total = entry.success + entry.fail;
    console.log(`[Scraper] Skipping ${platform} — ${entry.fail} consecutive failures (${entry.success}/${total} success rate). Cooldown until ${new Date(entry.lastFailTime + HEALTH_COOLDOWN_MS).toISOString()}`);
    return false;
  }
  return true;
}

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
const EXTRACTOR_TIMEOUT_MS = 12_000;

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
      "--disable-blink-features=AutomationControlled",
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
  getBrowser()
    .then(() => console.log("[Scraper] Browser warmed up successfully"))
    .catch((err) => console.error("[Scraper] CRITICAL: Browser warmup failed:", err instanceof Error ? err.message : err));
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
  // datadome.co deliberately NOT blocked — blocking it prevents anti-bot challenges from resolving
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
  let context: BrowserContext | null = null;
  let page: Page | null = null;

  browserInUse++;
  try {
    // Generate a realistic fingerprint for this session
    const { fingerprint, headers } = fingerprintGenerator.getFingerprint();

    context = await browser.newContext({
      userAgent: fingerprint.navigator.userAgent,
      viewport: {
        width: fingerprint.screen.innerWidth,
        height: fingerprint.screen.innerHeight,
      },
      locale: "fr-FR",
      timezoneId: "Europe/Paris",
    });

    // Inject fingerprint overrides (navigator, screen, WebGL, etc.)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await fingerprintInjector.attachFingerprintToPlaywright(context as any, { fingerprint, headers });

    page = await context.newPage();

    await page.route("**/*", (route: Route) => {
      const type = route.request().resourceType();
      if (["media", "font"].includes(type)) {
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
      "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
    });

    const config = PLATFORM_CONFIG[platform] ?? DEFAULT_PLATFORM_CONFIG;
    await page.goto(url, { waitUntil: config.waitUntil, timeout: config.timeout });

    // Simulate human behavior — small random mouse movement + scroll
    await page.mouse.move(
      200 + Math.random() * 400,
      150 + Math.random() * 300,
      { steps: 5 },
    ).catch(() => {});
    await page.evaluate(() => window.scrollBy(0, 100 + Math.random() * 200)).catch(() => {});

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
      let reason = "No listings matched selectors";
      try {
        const html = await page.content();
        const isChallenge = /captcha|challenge|verify|robot|datadome|perimeter/i.test(html);
        reason = isChallenge ? "Anti-bot challenge page" : reason;
        console.warn(
          `[Scraper] ${platform}: 0 listings found | HTML length: ${html.length} | Challenge page: ${isChallenge} | URL: ${url}`
        );
      } catch {
        console.warn(`[Scraper] ${platform}: 0 listings found | Page already closed | URL: ${url}`);
      }
      recordPlatformResult(platform, false);
      return { platform, success: false, listings: [], error: reason };
    }

    recordPlatformResult(platform, true);
    return { platform, success: true, listings };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Scraper] ${platform} failed: ${msg}`);
    recordPlatformResult(platform, false);
    return { platform, success: false, listings: [], error: msg };
  } finally {
    browserInUse--;
    if (page) await page.close().catch(() => {});
    if (context) await context.close().catch(() => {});
  }
}

export async function scrapeAllPlatforms(
  urls: PlatformUrl[],
  onProgress?: (platform: string, success: boolean, listingCount: number) => void,
): Promise<ScrapeResult[]> {
  try {
    const browser = await getBrowser();

    // Filter out unhealthy platforms
    const healthyUrls = urls.filter((u) => isPlatformHealthy(u.platform));
    const skippedUrls = urls.filter((u) => !isPlatformHealthy(u.platform));

    // Report skipped platforms immediately
    const skippedResults: ScrapeResult[] = skippedUrls.map((u) => {
      const result: ScrapeResult = {
        platform: u.platform,
        success: false,
        listings: [],
        error: "Skipped (health cooldown)",
      };
      onProgress?.(u.platform, false, 0);
      return result;
    });

    const results = await Promise.allSettled(
      healthyUrls.map(async (u) => {
        const result = await scrapeSingle(browser, u);
        onProgress?.(result.platform, result.success, result.listings.length);
        return result;
      })
    );

    const mapped = results.map((r, i) => {
      if (r.status === "fulfilled") return r.value;
      const fallback: ScrapeResult = {
        platform: healthyUrls[i].platform,
        success: false,
        listings: [],
        error: r.reason?.message || "Scrape failed",
      };
      onProgress?.(fallback.platform, false, 0);
      return fallback;
    });

    const allResults = [...skippedResults, ...mapped];

    for (const r of allResults) {
      console.log(`[Scraper] ${r.platform}: ${r.success ? r.listings.length + ' listings' : 'FAILED - ' + r.error}`);
    }

    return allResults;
  } catch (error) {
    console.error("[Scraper] Browser launch failed:", error instanceof Error ? error.message : error);
    return urls.map((u) => {
      onProgress?.(u.platform, false, 0);
      return {
        platform: u.platform,
        success: false,
        listings: [],
        error: "Browser unavailable",
      };
    });
  }
}