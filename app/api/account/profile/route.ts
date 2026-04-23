import { error, ok } from "@/lib/server/api";
import { verifyCsrfToken } from "@/lib/server/request-security";
import { updateCurrentUserProfile } from "@/lib/server/profile-service";

export async function PATCH(request: Request) {
  const csrfResult = await verifyCsrfToken(request);

  if (!csrfResult.ok) {
    return error(csrfResult.message, csrfResult.status);
  }

  const body = (await request.json().catch(() => null)) as
    | {
        fullName?: string;
        workEmail?: string;
        phone?: string;
        company?: string;
        gender?: string;
        currentPassword?: string;
      }
    | null;
  const result = await updateCurrentUserProfile(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok({
    ok: true,
    user: result.user,
    message: "message" in result ? result.message : undefined,
    pendingEmail: "pendingEmail" in result ? result.pendingEmail : undefined,
    verifyUrl: "verifyUrl" in result ? result.verifyUrl : undefined,
  });
}
