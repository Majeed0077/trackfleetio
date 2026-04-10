import { ok, error } from "@/lib/server/api";
import { forgotPassword } from "@/lib/server/auth-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const result = await forgotPassword(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok({
    ok: true,
    message: result.message,
    resetUrl: result.resetUrl,
  });
}
