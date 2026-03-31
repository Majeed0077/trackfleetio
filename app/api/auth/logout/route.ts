import { ok } from "@/lib/server/api";
import { getLogoutCookieConfig } from "@/lib/server/auth-service";

export async function POST() {
  const response = ok({ ok: true });
  const logoutCookie = getLogoutCookieConfig();
  response.cookies.set(logoutCookie.name, logoutCookie.value, logoutCookie);
  return response;
}
