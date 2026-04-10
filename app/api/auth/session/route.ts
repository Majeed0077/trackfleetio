import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { ok } from "@/lib/server/api";
import { getCurrentSession } from "@/lib/server/auth-service";

export async function GET() {
  const cookieStore = await cookies();
  const user = await getCurrentSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  return ok({
    ok: true,
    user,
  });
}
