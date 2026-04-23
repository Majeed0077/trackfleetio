import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { CSRF_COOKIE_NAME } from "@/lib/csrf";
import { ok } from "@/lib/server/api";
import { getCurrentSession } from "@/lib/server/auth-service";
import { getCsrfCookieConfig } from "@/lib/server/request-security";

export async function GET() {
  const cookieStore = await cookies();
  const user = await getCurrentSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  const response = ok({
    ok: true,
    user,
  });

  if (user && !cookieStore.get(CSRF_COOKIE_NAME)?.value) {
    const csrfCookie = getCsrfCookieConfig();
    response.cookies.set(csrfCookie.name, csrfCookie.value, csrfCookie);
  }

  return response;
}
