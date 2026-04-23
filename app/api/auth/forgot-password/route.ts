import { normalizeEmail } from "@/lib/server/auth-password";
import { error, ok, tooManyRequests, withRateLimitHeaders } from "@/lib/server/api";
import { forgotPassword } from "@/lib/server/auth-service";
import { applyRateLimit } from "@/lib/server/rate-limit";
import { getClientIpAddress } from "@/lib/server/request-security";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const ipAddress = getClientIpAddress(request);
  const emailKey = typeof body?.email === "string" ? normalizeEmail(body.email) : "anonymous";
  const ipRateLimit = applyRateLimit({
    key: `forgot-password:ip:${ipAddress}`,
    limit: 5,
    windowMs: 30 * 60 * 1000,
  });

  if (!ipRateLimit.ok) {
    return tooManyRequests(
      "Too many reset requests. Try again later.",
      ipRateLimit.retryAfterSeconds,
      ipRateLimit.limit,
      ipRateLimit.resetAt,
    );
  }

  const emailRateLimit = applyRateLimit({
    key: `forgot-password:email:${ipAddress}:${emailKey}`,
    limit: 3,
    windowMs: 30 * 60 * 1000,
  });

  if (!emailRateLimit.ok) {
    return tooManyRequests(
      "Too many reset requests. Try again later.",
      emailRateLimit.retryAfterSeconds,
      emailRateLimit.limit,
      emailRateLimit.resetAt,
    );
  }

  const result = await forgotPassword(body ?? {});

  if (!result.ok) {
    return withRateLimitHeaders(error(result.message, result.status), emailRateLimit);
  }

  return withRateLimitHeaders(ok({
    ok: true,
    message: result.message,
    resetUrl: result.resetUrl,
  }), emailRateLimit);
}
