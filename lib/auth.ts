import type { UserRole } from "@/lib/server/models/user";

export const AUTH_COOKIE_NAME = "trackfleetio_session";
const DEFAULT_AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const AUTH_SECRET = process.env.TRACKFLEETIO_AUTH_SECRET;

if (!AUTH_SECRET) {
  throw new Error(
    "TRACKFLEETIO_AUTH_SECRET is required. Add TRACKFLEETIO_AUTH_SECRET=<strong-random-secret> to .env.local.",
  );
}

export type SessionCookiePayload = {
  sid: string;
  uid: string;
  role: UserRole;
  exp: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const bytesToBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const base64UrlToBytes = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const encodeBase64Url = (value: string) => bytesToBase64Url(encoder.encode(value));
const decodeBase64Url = (value: string) => decoder.decode(base64UrlToBytes(value));

const getSigningKey = async () =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

const sign = async (value: string) =>
  bytesToBase64Url(
    new Uint8Array(await crypto.subtle.sign("HMAC", await getSigningKey(), encoder.encode(value))),
  );

export const createSessionCookieValue = async (payload: SessionCookiePayload) => {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

export const verifySessionCookie = async (
  token: string | undefined | null,
): Promise<SessionCookiePayload | null> => {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const isValid = await crypto.subtle.verify(
    "HMAC",
    await getSigningKey(),
    base64UrlToBytes(signature),
    encoder.encode(encodedPayload),
  );

  if (!isValid) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as SessionCookiePayload;

    if (
      !payload.sid ||
      !payload.uid ||
      (payload.role !== "admin" && payload.role !== "user") ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const getAuthCookieConfig = (maxAge = DEFAULT_AUTH_COOKIE_MAX_AGE) => ({
  name: AUTH_COOKIE_NAME,
  maxAge,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
});

export const getLogoutCookieConfig = () => ({
  ...getAuthCookieConfig(),
  maxAge: 0,
  value: "",
});
