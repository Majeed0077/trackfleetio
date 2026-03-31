import { authCookieConfig } from "@/lib/auth";
import { ok, error } from "@/lib/server/api";
import { loginDemoUser } from "@/lib/server/auth-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const result = await loginDemoUser(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  const response = ok({
    ok: true,
    user: result.user,
  });

  response.cookies.set(authCookieConfig.name, result.token, authCookieConfig);
  return response;
}
