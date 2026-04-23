import { error, ok, tooManyRequests, withRateLimitHeaders } from "@/lib/server/api";
import { applyRateLimit } from "@/lib/server/rate-limit";
import { getClientIpAddress } from "@/lib/server/request-security";
import { submitMockNewsletter } from "@/lib/server/newsletter-service";

export async function POST(request: Request) {
  const ipAddress = getClientIpAddress(request);
  const rateLimit = applyRateLimit({
    key: `newsletter:${ipAddress}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.ok) {
    return tooManyRequests(
      "Too many newsletter requests. Try again shortly.",
      rateLimit.retryAfterSeconds,
      rateLimit.limit,
      rateLimit.resetAt,
    );
  }

  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const result = await submitMockNewsletter(body ?? {});

  if (!result.ok) {
    return withRateLimitHeaders(error(result.message, result.status), rateLimit);
  }

  return withRateLimitHeaders(ok(result), rateLimit);
}
