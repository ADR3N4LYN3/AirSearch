import type { SearchResponse } from "@/lib/types";
import { getDb } from "./db";

const DEFAULT_TTL_SECONDS = 24 * 60 * 60; // 24 hours
const DEFAULT_THRESHOLD = 0.95;

interface VectorRow {
  cache_key: string;
  vector: string;
  created_at: number;
  ttl_seconds: number;
}

/**
 * Computes the cosine similarity between two numeric vectors.
 * Returns a value between -1 and 1 (1 = identical direction).
 * Returns 0 if either vector has zero magnitude (avoids division by zero).
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
  if (magnitude === 0) return 0;

  return dotProduct / magnitude;
}

/**
 * L3 vector cache — finds the most similar cached search by cosine similarity.
 * Loads all non-expired vectors from SQLite, computes similarity with the input,
 * and returns the best match if it exceeds the threshold.
 *
 * Returns null if no match is found, vectors are empty, or SQLite fails.
 */
export function findSimilarSearch(
  vector: number[],
  destination: string,
  threshold: number = DEFAULT_THRESHOLD
): SearchResponse | null {
  try {
    const db = getDb();
    const now = Date.now();

    // Filter by exact destination — cosine similarity only compares dates/guests/budget
    const normalizedDest = destination.toLowerCase().trim();
    const rows = db
      .prepare(
        `SELECT cache_key, vector FROM search_vectors
         WHERE LOWER(TRIM(destination)) = ? AND created_at + (ttl_seconds * 1000) > ?`
      )
      .all(normalizedDest, now) as VectorRow[];

    if (rows.length === 0) return null;

    let bestKey: string | null = null;
    let bestSimilarity = -1;

    for (const row of rows) {
      const storedVector = JSON.parse(row.vector) as number[];
      const similarity = cosineSimilarity(vector, storedVector);

      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestKey = row.cache_key;
      }
    }

    if (!bestKey || bestSimilarity < threshold) return null;

    // Retrieve the actual cached response for the best matching key
    const cacheRow = db
      .prepare(
        `SELECT response FROM search_cache
         WHERE cache_key = ? AND created_at + (ttl_seconds * 1000) > ?`
      )
      .get(bestKey, now) as { response: string } | undefined;

    if (!cacheRow) return null;

    return JSON.parse(cacheRow.response) as SearchResponse;
  } catch (error) {
    console.error("[cache/vector] findSimilarSearch error:", error);
    return null;
  }
}

/**
 * Stores a search vector in SQLite for future similarity lookups.
 * Default TTL is 24 hours.
 */
export function storeSearchVector(
  key: string,
  vector: number[],
  destination: string
): void {
  try {
    const db = getDb();

    db.prepare(
      `INSERT INTO search_vectors (cache_key, vector, destination, created_at, ttl_seconds)
       VALUES (?, ?, ?, ?, ?)`
    ).run(key, JSON.stringify(vector), destination, Date.now(), DEFAULT_TTL_SECONDS);
  } catch (error) {
    console.error("[cache/vector] storeSearchVector error:", error);
  }
}
