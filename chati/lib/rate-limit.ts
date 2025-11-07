import { NextResponse } from "next/server";

// ==========================================
// RATE LIMITING UTILITIES
// ==========================================

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// For production with multiple instances, use Redis
const rateLimitStore = new Map<string, RateLimitStore>();

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests allowed in the window
  message?: string; // Custom error message
  skipSuccessfulRequests?: boolean; // Don't count successful requests
}

/**
 * Default rate limit configurations for different endpoints
 */
export const RATE_LIMIT_CONFIGS = {
  // Strict limits for authentication
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts
    message: "Too many authentication attempts. Please try again later.",
  },
  // Moderate limits for password changes
  password: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 3, // 3 attempts
    message: "Too many password change attempts. Please try again later.",
  },
  // Standard limits for user creation
  userCreate: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 users
    message: "Too many user creation requests. Please try again later.",
  },
  // Standard limits for user updates
  userUpdate: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 20, // 20 updates
    message: "Too many update requests. Please try again later.",
  },
  // Stricter limits for user deletion
  userDelete: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5, // 5 deletions
    message: "Too many deletion requests. Please try again later.",
  },
  // Generous limits for read operations
  userRead: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 reads
    message: "Too many requests. Please try again later.",
  },
} as const;

/**
 * Cleans up expired entries from the rate limit store
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Gets the identifier for rate limiting (IP address or user ID)
 */
export function getRateLimitIdentifier(
  request: Request,
  userId?: string
): string {
  // Prefer user ID if available (more accurate for authenticated requests)
  if (userId) {
    return `user:${userId}`;
  }

  // Fall back to IP address
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip =
    forwardedFor?.split(",")[0].trim() ||
    realIp ||
    "unknown";

  return `ip:${ip}`;
}

/**
 * Checks if a request should be rate limited
 * Returns null if allowed, or a NextResponse error if rate limited
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
  endpoint: string
): NextResponse | null {
  // Clean up expired entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  const key = `${endpoint}:${identifier}`;
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  // No existing entry or expired - create new
  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return null;
  }

  // Check if rate limit exceeded
  if (existing.count >= config.maxRequests) {
    const retryAfter = Math.ceil((existing.resetTime - now) / 1000);

    return NextResponse.json(
      {
        message: config.message || "Too many requests. Please try again later.",
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          "X-RateLimit-Limit": config.maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(existing.resetTime).toISOString(),
        },
      }
    );
  }

  // Increment count
  existing.count += 1;
  rateLimitStore.set(key, existing);

  return null;
}

/**
 * Middleware wrapper that applies rate limiting to a request handler
 */
export async function withRateLimit<T>(
  request: Request,
  config: RateLimitConfig,
  endpoint: string,
  userId?: string,
  handler?: () => Promise<T>
): Promise<T | NextResponse> {
  const identifier = getRateLimitIdentifier(request, userId);
  const rateLimitError = checkRateLimit(identifier, config, endpoint);

  if (rateLimitError) {
    return rateLimitError;
  }

  // If handler is provided, execute it
  if (handler) {
    return await handler();
  }

  // Otherwise, just return null (caller will handle the request)
  return null as T;
}

/**
 * Resets rate limit for a specific identifier and endpoint
 * Useful for testing or manual overrides
 */
export function resetRateLimit(identifier: string, endpoint: string): void {
  const key = `${endpoint}:${identifier}`;
  rateLimitStore.delete(key);
}

/**
 * Gets current rate limit status for an identifier
 */
export function getRateLimitStatus(
  identifier: string,
  endpoint: string,
  config: RateLimitConfig
): {
  remaining: number;
  resetTime: Date;
  isLimited: boolean;
} {
  const key = `${endpoint}:${identifier}`;
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetTime) {
    return {
      remaining: config.maxRequests,
      resetTime: new Date(now + config.windowMs),
      isLimited: false,
    };
  }

  return {
    remaining: Math.max(0, config.maxRequests - existing.count),
    resetTime: new Date(existing.resetTime),
    isLimited: existing.count >= config.maxRequests,
  };
}

/**
 * Clears all rate limit data
 * Use with caution - primarily for testing
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear();
}
