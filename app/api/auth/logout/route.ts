import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { error, ok } from "@/lib/server/api";
import { getCsrfCookieConfig, verifyCsrfToken } from "@/lib/server/request-security";
import { revokeSession } from "@/lib/server/auth-service";

export async function POST(request: Request) {
  const csrfResult = await verifyCsrfToken(request);

  if (!csrfResult.ok) {
    return error(csrfResult.message, csrfResult.status);
  }

  const cookieStore = await cookies();
  const logoutCookie = await revokeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);
  const response = ok({ ok: true });
  response.cookies.set(logoutCookie.name, logoutCookie.value, logoutCookie);
  const csrfCookie = getCsrfCookieConfig("");
  response.cookies.set(csrfCookie.name, csrfCookie.value, { ...csrfCookie, maxAge: 0 });
  return response;
}
