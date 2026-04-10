import { ok, error } from "@/lib/server/api";
import { resetPassword } from "@/lib/server/auth-service";

const getRequestMetadata = (request: Request) => ({
  userAgent: request.headers.get("user-agent"),
  ipAddress:
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip"),
});

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
  return response;
}
