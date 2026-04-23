import "server-only";

import { randomBytes } from "node:crypto";

import { cookies } from "next/headers";

import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "@/lib/csrf";

const CSRF_TOKEN_BYTES = 32;
const CSRF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const normalizeOrigin = (value: string) => value.replace(/\/+$/, "").toLowerCase();

const getConfiguredAppOrigin = () => {
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (!configuredOrigin) {
    return null;
  }

  try {
    return normalizeOrigin(new URL(configuredOrigin).origin);
  } catch {
    return null;
  }
};

export const getRequestMetadata = (request: Request) => ({
  userAgent: request.headers.get("user-agent"),
  ipAddress:
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    null,
});

export const getClientIpAddress = (request: Request) =>
  getRequestMetadata(request).ipAddress ?? "unknown";

export const createCsrfToken = () => randomBytes(CSRF_TOKEN_BYTES).toString("hex");

export const getCsrfCookieConfig = (token = createCsrfToken()) => ({
  name: CSRF_COOKIE_NAME,
  value: token,
  httpOnly: false,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: CSRF_COOKIE_MAX_AGE,
});

export const ensureTrustedOrigin = (request: Request) => {
  const requestOrigin = request.headers.get("origin");

  if (!requestOrigin) {
    return {
      ok: false as const,
      status: 403,
      message: "Origin header is required.",
    };
  }

  let expectedOrigin = getConfiguredAppOrigin();

  if (!expectedOrigin) {
    try {
      expectedOrigin = normalizeOrigin(new URL(request.url).origin);
    } catch {
      expectedOrigin = null;
    }
  }

  if (!expectedOrigin || normalizeOrigin(requestOrigin) !== expectedOrigin) {
    return {
      ok: false as const,
      status: 403,
      message: "Origin is not allowed.",
    };
  }

  return { ok: true as const };
};

export const verifyCsrfToken = async (request: Request) => {
  const originResult = ensureTrustedOrigin(request);

  if (!originResult.ok) {
    return originResult;
  }

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value ?? "";
  const headerToken = request.headers.get(CSRF_HEADER_NAME) ?? "";

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return {
      ok: false as const,
      status: 403,
      message: "CSRF validation failed.",
    };
  }

  return { ok: true as const };
};
