import { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per window
const MAX_MAP_SIZE = 10_000; // LRU cap — prevent unbounded memory growth

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const IP_V4_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const IP_V6_REGEX = /^[0-9a-fA-F:]+$/;

function isValidIp(ip: string): boolean {
  return IP_V4_REGEX.test(ip) || IP_V6_REGEX.test(ip);
}

export function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp && isValidIp(cfIp)) return cfIp;

  const vercelIp = request.headers.get("x-real-ip")?.trim();
  if (vercelIp && isValidIp(vercelIp)) return vercelIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (!isValidIp(ip)) return "unknown";
    const isPrivate172 = ip.startsWith("172.") && (() => {
      const second = parseInt(ip.split(".")[1], 10);
      return second >= 16 && second <= 31;
    })();
    if (ip.startsWith("10.") || ip.startsWith("192.168.") || isPrivate172) {
      return "unknown";
    }
    return ip;
  }

  return "unknown";
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Evict expired entries
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }

  // LRU eviction: if map is still too large, drop oldest entries
  if (rateLimitMap.size >= MAX_MAP_SIZE) {
    const keysToDelete = rateLimitMap.size - MAX_MAP_SIZE + 1;
    const iter = rateLimitMap.keys();
    for (let i = 0; i < keysToDelete; i++) {
      const key = iter.next().value;
      if (key !== undefined) rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  return false;
}
