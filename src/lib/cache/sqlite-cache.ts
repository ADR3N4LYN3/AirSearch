import type { SearchResponse } from "@/lib/types";
import { getDb } from "./db";

const DEFAULT_TTL_SECONDS = 6 * 60 * 60; // 6 hours

interface CacheMeta {
  destination: string;
  checkin: string;
  checkout: string;
  guests: number;
}

/**
 * L2 cache — retrieves a cached search response from SQLite.
 * Returns null if the key is missing, expired, or if SQLite fails.
 * Increments the hit counter on successful reads.
 */
export function getFromSqlite(key: string): SearchResponse | null {
  try {
    const db = getDb();
    const now = Date.now();

    const row = db
      .prepare(
        `SELECT response FROM search_cache
         WHERE cache_key = ? AND created_at + (ttl_seconds * 1000) > ?`
      )
      .get(key, now) as { response: string } | undefined;

    if (!row) return null;

    // Increment hit counter (fire-and-forget, non-blocking for the caller)
    db.prepare(
      `UPDATE search_cache SET hits = hits + 1 WHERE cache_key = ?`
    ).run(key);

    return JSON.parse(row.response) as SearchResponse;
  } catch (error) {
    console.error("[cache/sqlite] getFromSqlite error:", error);
    return null;
  }
}

/**
 * L2 cache — stores a search response in SQLite with metadata.
 * Uses INSERT OR REPLACE so repeated writes for the same key overwrite the old entry.
 * Default TTL is 6 hours.
 */
export function setInSqlite(
  key: string,
  data: SearchResponse,
  meta: CacheMeta
): void {
  try {
    const db = getDb();

    db.prepare(
      `INSERT OR REPLACE INTO search_cache
         (cache_key, response, destination, checkin, checkout, guests, created_at, hits, ttl_seconds)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)`
    ).run(
      key,
      JSON.stringify(data),
      meta.destination,
      meta.checkin,
      meta.checkout,
      meta.guests,
      Date.now(),
      DEFAULT_TTL_SECONDS
    );
  } catch (error) {
    console.error("[cache/sqlite] setInSqlite error:", error);
  }
}
