// REMINDER: Add 'better-sqlite3' to serverExternalPackages in next.config.ts
// Example:
//   serverExternalPackages: ['better-sqlite3']

import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

type DatabaseInstance = InstanceType<typeof Database>;

let db: DatabaseInstance | null = null;

/**
 * Returns the singleton SQLite database instance.
 * Creates the database file and tables on first call.
 * Activates WAL mode for better concurrent read performance.
 */
export function getDb(): DatabaseInstance {
  if (db) return db;

  try {
    const dataDir = path.resolve(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, "airsearch.db");
    db = new Database(dbPath);

    // Enable WAL mode for better performance
    db.pragma("journal_mode = WAL");

    // Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS search_cache (
        cache_key TEXT PRIMARY KEY,
        response TEXT NOT NULL,
        destination TEXT NOT NULL,
        checkin TEXT,
        checkout TEXT,
        guests INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        hits INTEGER DEFAULT 0,
        ttl_seconds INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS search_vectors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cache_key TEXT NOT NULL,
        vector TEXT NOT NULL,
        destination TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        ttl_seconds INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS rate_limits (
        ip TEXT PRIMARY KEY,
        count INTEGER NOT NULL,
        reset_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT,
        url TEXT,
        title TEXT,
        location TEXT,
        price TEXT,
        timestamp TEXT
      );
    `);

    // Start periodic cleanup of expired entries (every 10 minutes)
    startCleanupInterval();

    return db;
  } catch (error) {
    console.error("[cache/db] Failed to initialize SQLite database:", error);
    throw error;
  }
}

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Purges expired entries from search_cache and search_vectors.
 * Runs every 10 minutes via setInterval.
 */
function startCleanupInterval(): void {
  // Avoid duplicate intervals (e.g. if getDb() is called multiple times in tests)
  if (cleanupTimer) return;

  const TEN_MINUTES_MS = 10 * 60 * 1000;

  cleanupTimer = setInterval(() => {
    try {
      if (!db) return;

      const now = Date.now();

      db.prepare(
        `DELETE FROM search_cache WHERE created_at + (ttl_seconds * 1000) < ?`
      ).run(now);

      db.prepare(
        `DELETE FROM search_vectors WHERE created_at + (ttl_seconds * 1000) < ?`
      ).run(now);

      db.prepare(`DELETE FROM rate_limits WHERE reset_at < ?`).run(now);
    } catch (error) {
      console.error("[cache/db] Cleanup error:", error);
    }
  }, TEN_MINUTES_MS);

  // Allow the Node.js process to exit even if the timer is still active
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}
