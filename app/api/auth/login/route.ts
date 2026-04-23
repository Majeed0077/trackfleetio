import { getCsrfCookieConfig } from "@/lib/server/request-security";
import { normalizeEmail } from "@/lib/server/auth-password";
import { error, ok, tooManyRequests, withRateLimitHeaders } from "@/lib/server/api";
import { loginUser } from "@/lib/server/auth-service";
import { applyRateLimit } from "@/lib/server/rate-limit";
import { getClientIpAddress, getRequestMetadata } from "@/lib/server/request-security";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string; rememberMe?: boolean }
    | null;
  const ipAddress = getClientIpAddress(request);
  const emailKey = typeof body?.email === "string" ? normalizeEmail(body.email) : "anonymous";
  const ipRateLimit = applyRateLimit({
    key: `login:ip:${ipAddress}`,
    limit: 12,
    windowMs: 10 * 60 * 1000,
  });

  if (!ipRateLimit.ok) {
    return tooManyRequests("Too many login attempts. Try again shortly.", ipRateLimit.retryAfterSeconds, ipRateLimit.limit, ipRateLimit.resetAt);
  }

  const emailRateLimit = applyRateLimit({
    key: `login:email:${ipAddress}:${emailKey}`,
    limit: 6,
    windowMs: 10 * 60 * 1000,
  });

  if (!emailRateLimit.ok) {
    return tooManyRequests("Too many login attempts. Try again shortly.", emailRateLimit.retryAfterSeconds, emailRateLimit.limit, emailRateLimit.resetAt);
  }

  const result = await loginUser(body ?? {}, getRequestMetadata(request));

  if (!result.ok) {
    return withRateLimitHeaders(error(result.message, result.status), emailRateLimit);
  }

  const response = ok({
    ok: true,
    user: result.user,
  });

  response.cookies.set(result.cookieConfig.name, result.token, result.cookieConfig);
  const csrfCookie = getCsrfCookieConfig();
  response.cookies.set(csrfCookie.name, csrfCookie.value, csrfCookie);
  return withRateLimitHeaders(response, emailRateLimit);
}
