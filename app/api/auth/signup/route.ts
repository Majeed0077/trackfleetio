import { ok, error } from "@/lib/server/api";
import { signupUser } from "@/lib/server/auth-service";

const getRequestMetadata = (request: Request) => ({
  userAgent: request.headers.get("user-agent"),
  ipAddress:
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip"),
});

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        name?: string;
        email?: string;
        password?: string;
        company?: string;
        phone?: string;
      }
    | null;
  const result = await signupUser(body ?? {}, getRequestMetadata(request));

  if (!result.ok) {
    return error(result.message, result.status);
  }

  const response = ok({ ok: true, user: result.user });
  response.cookies.set(result.cookieConfig.name, result.token, result.cookieConfig);
  return response;
}
