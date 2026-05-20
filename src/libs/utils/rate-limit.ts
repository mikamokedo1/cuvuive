import { NextResponse } from "next/server";
import { headers } from "next/headers";

interface RateLimitEntry {
  timestamps: number[];
}

/**
 * In-memory sliding window rate limiter.
 *
 * Suitable for single-process deployments (single VPS / Docker container).
 * For multi-instance deployments, replace with Redis-backed solution.
 *
 * Automatically cleans up stale entries every 60 seconds to prevent memory leaks.
 */
class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Auto-cleanup every 60 seconds
    if (typeof globalThis !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 60_000);
      // Allow process to exit without waiting for this interval
      if (this.cleanupInterval && "unref" in this.cleanupInterval) {
        this.cleanupInterval.unref();
      }
    }
  }

  /**
   * Check if a request should be rate-limited.
   *
   * @param key     Unique identifier (e.g. IP address, user ID)
   * @param limit   Maximum number of requests allowed in the window
   * @param windowMs   Time window in milliseconds
   * @returns { limited: boolean, remaining: number, resetMs: number }
   */
  check(
    key: string,
    limit: number,
    windowMs: number,
  ): { limited: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const windowStart = now - windowMs;

    let entry = this.store.get(key);
    if (!entry) {
      entry = { timestamps: [] };
      this.store.set(key, entry);
    }

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

    if (entry.timestamps.length >= limit) {
      const oldestInWindow = entry.timestamps[0];
      const resetMs = oldestInWindow + windowMs - now;
      return { limited: true, remaining: 0, resetMs };
    }

    entry.timestamps.push(now);
    const remaining = limit - entry.timestamps.length;
    return { limited: false, remaining, resetMs: windowMs };
  }

  /** Remove entries with no recent timestamps */
  private cleanup() {
    const now = Date.now();
    // Remove entries older than 5 minutes (covers any reasonable window)
    const maxAge = 5 * 60_000;

    for (const [key, entry] of this.store.entries()) {
      const latest = entry.timestamps[entry.timestamps.length - 1];
      if (!latest || now - latest > maxAge) {
        this.store.delete(key);
      }
    }
  }
}

// Global singleton — survives across requests in the same Node.js process
const globalForRateLimit = globalThis as typeof globalThis & {
  __rateLimiter?: RateLimiter;
};

if (!globalForRateLimit.__rateLimiter) {
  globalForRateLimit.__rateLimiter = new RateLimiter();
}

const rateLimiter = globalForRateLimit.__rateLimiter;

/**
 * Extract client IP from request headers.
 * Supports X-Forwarded-For (behind reverse proxy / nginx), X-Real-IP, and fallback.
 */
function getIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

// ============================================================
// Helpers for API Route Handlers
// ============================================================

interface RateLimitConfig {
  /** Max requests per window */
  limit: number;
  /** Window duration in milliseconds (default: 60_000 = 1 minute) */
  windowMs?: number;
  /** Custom key extractor. Defaults to client IP. */
  keyFn?: (request: Request) => string;
}

/**
 * Rate limit check for Next.js API route handlers.
 *
 * Returns a NextResponse with 429 status if rate limited, or `null` if allowed.
 *
 * Usage:
 * ```ts
 * export async function POST(request: NextRequest) {
 *   const rateLimited = applyRateLimit(request, { limit: 5 });
 *   if (rateLimited) return rateLimited;
 *   // ... handle request
 * }
 * ```
 */
export function applyRateLimit(
  request: Request,
  config: RateLimitConfig,
): NextResponse | null {
  const { limit, windowMs = 60_000, keyFn } = config;
  const key = keyFn ? keyFn(request) : getIpFromRequest(request);

  const result = rateLimiter.check(key, limit, windowMs);

  if (result.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(result.resetMs / 1000)),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  return null;
}

// ============================================================
// Helper for Server Actions ("use server" functions)
// ============================================================

/**
 * Extract client IP inside a server action using next/headers.
 */
async function getIpFromHeaders(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return headersList.get("x-real-ip") || "unknown";
}

/**
 * Rate limit check for Next.js server actions.
 *
 * Returns `{ limited: true }` if rate limited, or `{ limited: false }` if allowed.
 *
 * Usage:
 * ```ts
 * export async function submitFeedbackAction(data: {...}) {
 *   const rl = await checkServerActionRateLimit({ limit: 3 });
 *   if (rl.limited) return { success: false, error: "rate_limited" };
 *   // ... handle action
 * }
 * ```
 */
export async function checkServerActionRateLimit(config: {
  /** Max requests per window */
  limit: number;
  /** Window duration in milliseconds (default: 60_000 = 1 minute) */
  windowMs?: number;
  /** Custom key. If not provided, uses client IP. */
  key?: string;
  /** Prefix for the rate limit key to separate different actions */
  prefix?: string;
}): Promise<{ limited: boolean; remaining: number }> {
  const { limit, windowMs = 60_000, prefix = "action" } = config;
  const ip = config.key || (await getIpFromHeaders());
  const fullKey = `${prefix}:${ip}`;

  const result = rateLimiter.check(fullKey, limit, windowMs);
  return { limited: result.limited, remaining: result.remaining };
}
