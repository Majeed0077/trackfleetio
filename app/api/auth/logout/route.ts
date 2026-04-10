import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { ok } from "@/lib/server/api";
import { revokeSession } from "@/lib/server/auth-service";

export async function POST() {
  const cookieStore = await cookies();
  const logoutCookie = await revokeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);
  const response = ok({ ok: true });
  response.cookies.set(logoutCookie.name, logoutCookie.value, logoutCookie);
  return response;
}
