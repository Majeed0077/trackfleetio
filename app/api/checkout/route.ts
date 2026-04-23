import { error, ok, tooManyRequests, withRateLimitHeaders } from "@/lib/server/api";
import { applyRateLimit } from "@/lib/server/rate-limit";
import { getClientIpAddress } from "@/lib/server/request-security";
import { createMockCheckout } from "@/lib/server/checkout-service";

export async function POST(request: Request) {
  const ipAddress = getClientIpAddress(request);
  const rateLimit = applyRateLimit({
    key: `checkout:${ipAddress}`,
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.ok) {
    return tooManyRequests(
      "Too many checkout attempts. Try again shortly.",
      rateLimit.retryAfterSeconds,
      rateLimit.limit,
      rateLimit.resetAt,
    );
  }

  const body = (await request.json().catch(() => null)) as
    | {
        items?: Array<{ id?: string; quantity?: number }>;
        name?: string;
        company?: string;
        email?: string;
        phone?: string;
        billing?: string;
        shipping?: string;
        notes?: string;
      }
    | null;
  const result = await createMockCheckout(body ?? {});

  if (!result.ok) {
    return withRateLimitHeaders(error(result.message, result.status), rateLimit);
  }

  return withRateLimitHeaders(ok(result), rateLimit);
}
