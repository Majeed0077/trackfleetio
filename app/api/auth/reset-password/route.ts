import { getCsrfCookieConfig, getRequestMetadata } from "@/lib/server/request-security";
import { error, ok } from "@/lib/server/api";
import { resetPassword } from "@/lib/server/auth-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { token?: string; password?: string; confirmPassword?: string }
    | null;
  const result = await resetPassword(body ?? {}, getRequestMetadata(request));

  if (!result.ok) {
    return error(result.message, result.status);
  }

  const response = ok({ ok: true, message: result.message, user: result.user });
  response.cookies.set(result.cookieConfig.name, result.token, result.cookieConfig);
  const csrfCookie = getCsrfCookieConfig();
  response.cookies.set(csrfCookie.name, csrfCookie.value, csrfCookie);
  return response;
}
