import { cookies } from "next/headers";

import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  DEMO_USER_EMAIL,
  DEMO_USER_PASSWORD,
} from "@/lib/demo-auth";
import type { AuthUser } from "@/store/store";

export const AUTH_COOKIE_NAME = "trackfleetio_session";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const AUTH_SECRET = process.env.TRACKFLEETIO_AUTH_SECRET || "trackfleetio-dev-secret";

type DemoAccount = AuthUser & {
  password: string;
};

type SessionPayload = Omit<AuthUser, "isAuthenticated"> & {
  exp: number;
};

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    isAuthenticated: true,
    name: "Track Fleetio Demo",
    email: DEMO_USER_EMAIL,
    password: DEMO_USER_PASSWORD,
    role: "user",
    roleLabel: "Operations Lead, Track Fleetio",
    company: "Track Fleetio",
    phone: "",
  },
  {
    isAuthenticated: true,
    name: "Admin Operator",
    email: DEMO_ADMIN_EMAIL,
    password: DEMO_ADMIN_PASSWORD,
    role: "admin",
    roleLabel: "Super Admin",
    company: "Track Fleetio",
    phone: "",
  },
];

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

export const authenticateDemoUser = (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();

  return (
    DEMO_ACCOUNTS.find(
      (account) =>
        account.email.toLowerCase() === normalizedEmail && account.password === password,
    ) ?? null
  );
};

export const createSessionToken = async (user: AuthUser) => {
  const payload: SessionPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    roleLabel: user.roleLabel,
    company: user.company,
    phone: user.phone,
    exp: Math.floor(Date.now() / 1000) + AUTH_COOKIE_MAX_AGE,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

export const verifySessionToken = async (token: string | undefined | null): Promise<AuthUser | null> => {
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
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as SessionPayload;

    if (!payload.email || !payload.role || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      isAuthenticated: true,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      roleLabel: payload.roleLabel,
      company: payload.company,
      phone: payload.phone,
    };
  } catch {
    return null;
  }
};

export const getSessionUser = async () => {
  const cookieStore = await cookies();
  return await verifySessionToken(cookieStore.get(AUTH_COOKIE_NAME)?.value);
};

export const createSignedUser = (payload: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}): AuthUser => ({
  isAuthenticated: true,
  name: payload.name.trim() || "Track Fleetio User",
  email: payload.email.trim(),
  role: "user",
  roleLabel: payload.company?.trim()
    ? `Admin, ${payload.company.trim()}`
    : "Fleet Operations",
  company: payload.company?.trim() || "",
  phone: payload.phone?.trim() || "",
});

export const authCookieConfig = {
  name: AUTH_COOKIE_NAME,
  maxAge: AUTH_COOKIE_MAX_AGE,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};
