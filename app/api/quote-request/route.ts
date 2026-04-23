import { error, ok, tooManyRequests, withRateLimitHeaders } from "@/lib/server/api";
import { applyRateLimit } from "@/lib/server/rate-limit";
import { getClientIpAddress } from "@/lib/server/request-security";
import { submitMockQuoteRequest } from "@/lib/server/quote-service";

export async function POST(request: Request) {
  const ipAddress = getClientIpAddress(request);
  const rateLimit = applyRateLimit({
    key: `quote-request:${ipAddress}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.ok) {
    return tooManyRequests(
      "Too many quote requests. Try again shortly.",
      rateLimit.retryAfterSeconds,
      rateLimit.limit,
      rateLimit.resetAt,
    );
  }

  const body = (await request.json().catch(() => null)) as
    | {
        productId?: string | null;
        industry?: string;
        fleetSize?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        email?: string;
        company?: string;
      }
    | null;

  const result = await submitMockQuoteRequest(body ?? {});

  if (!result.ok) {
    return withRateLimitHeaders(error(result.message, result.status), rateLimit);
  }

  return withRateLimitHeaders(ok(result), rateLimit);
}
