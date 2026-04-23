import "server-only";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitConfig = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitResult =
  | {
      ok: true;
      limit: number;
      remaining: number;
      resetAt: number;
    }
  | {
      ok: false;
      limit: number;
      remaining: number;
      resetAt: number;
      retryAfterSeconds: number;
    };

const rateLimitStore = new Map<string, RateLimitEntry>();

const cleanupExpiredEntries = (now: number) => {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
};

export const applyRateLimit = ({ key, limit, windowMs }: RateLimitConfig): RateLimitResult => {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const currentEntry = rateLimitStore.get(key);

  if (!currentEntry || currentEntry.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });

    return {
      ok: true,
      limit,
      remaining: Math.max(0, limit - 1),
      resetAt,
    };
  }

  if (currentEntry.count >= limit) {
    return {
      ok: false,
      limit,
      remaining: 0,
      resetAt: currentEntry.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((currentEntry.resetAt - now) / 1000)),
    };
  }

  currentEntry.count += 1;
  rateLimitStore.set(key, currentEntry);

  return {
    ok: true,
    limit,
    remaining: Math.max(0, limit - currentEntry.count),
    resetAt: currentEntry.resetAt,
  };
};
