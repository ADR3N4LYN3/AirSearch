import type { SearchResponse } from "@/lib/types";

const MAX_ENTRIES = 500;
const TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CacheEntry {
  data: SearchResponse;
  createdAt: number;
}

/**
 * L1 in-memory LRU cache backed by a Map.
 * Map preserves insertion order, so we delete + re-insert to promote entries.
 * Oldest entries are evicted first when the cache is full.
 */
const cache = new Map<string, CacheEntry>();

/**
 * Retrieves a value from the in-memory LRU cache.
 * Returns null if the key is missing or expired.
 * Promotes the entry to the end (most-recently-used) on hit.
 */
export function getFromMemory(key: string): SearchResponse | null {
  const entry = cache.get(key);
  if (!entry) return null;

  // Check TTL
  if (Date.now() - entry.createdAt > TTL_MS) {
    cache.delete(key);
    return null;
  }

  // LRU promotion: delete and re-insert to move to the end of the Map
  cache.delete(key);
  cache.set(key, entry);

  return entry.data;
}

/**
 * Stores a value in the in-memory LRU cache.
 * Evicts the least-recently-used entry if the cache exceeds MAX_ENTRIES.
 */
export function setInMemory(key: string, data: SearchResponse): void {
  // If key already exists, remove it so it gets re-inserted at the end
  if (cache.has(key)) {
    cache.delete(key);
  }

  // Evict oldest entries if at capacity
  while (cache.size >= MAX_ENTRIES) {
    // Map.keys().next() returns the oldest (first-inserted) key
    const oldestKey = cache.keys().next().value;
    if (oldestKey !== undefined) {
      cache.delete(oldestKey);
    }
  }

  cache.set(key, {
    data,
    createdAt: Date.now(),
  });
}
