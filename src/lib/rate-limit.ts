/**
 * Light In-Memory Rate Limiter for Next.js API Routes & Edge Runtime
 * Provides protection for /api/auth/*, /api/leads, and /api/bookings.
 * (In production, Vercel WAF rules on Pro tier will augment this at the network edge).
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  limit?: number;     // Max allowed requests in interval (default: 10)
  interval?: number;  // Time window in seconds (default: 60)
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): { isAllowed: boolean; limit: number; remaining: number; reset: number } {
  const limit = options.limit ?? 10;
  const intervalMs = (options.interval ?? 60) * 1000;
  const now = Date.now();

  const existing = rateLimitMap.get(identifier);

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + intervalMs,
    });

    return {
      isAllowed: true,
      limit,
      remaining: limit - 1,
      reset: Math.ceil((now + intervalMs) / 1000),
    };
  }

  if (existing.count >= limit) {
    return {
      isAllowed: false,
      limit,
      remaining: 0,
      reset: Math.ceil(existing.resetAt / 1000),
    };
  }

  existing.count += 1;
  return {
    isAllowed: true,
    limit,
    remaining: limit - existing.count,
    reset: Math.ceil(existing.resetAt / 1000),
  };
}

/**
 * Extracts client IP address from Request headers
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}
