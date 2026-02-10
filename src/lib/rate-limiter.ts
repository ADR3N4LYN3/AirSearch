import { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per window

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const vercelIp = request.headers.get("x-real-ip");
  if (vercelIp) return vercelIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
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

  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
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
