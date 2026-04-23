import { NextResponse } from "next/server";

type ErrorPayload = {
  ok: false;
  message: string;
};

export const ok = <T extends Record<string, unknown>>(payload: T, init?: ResponseInit) =>
  NextResponse.json(payload, init);

export const error = (message: string, status = 400, extra?: Record<string, unknown>) =>
  NextResponse.json(
    {
      ok: false,
      message,
      ...extra,
    } satisfies ErrorPayload & Record<string, unknown>,
    { status },
  );

export const withRateLimitHeaders = (
  response: NextResponse,
  options: { limit: number; remaining: number; resetAt: number },
) => {
  response.headers.set("X-RateLimit-Limit", String(options.limit));
  response.headers.set("X-RateLimit-Remaining", String(options.remaining));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil(options.resetAt / 1000)));
  return response;
};

export const tooManyRequests = (message: string, retryAfterSeconds: number, limit: number, resetAt: number) => {
  const response = error(message, 429);
  response.headers.set("Retry-After", String(retryAfterSeconds));
  return withRateLimitHeaders(response, {
    limit,
    remaining: 0,
    resetAt,
  });
};
