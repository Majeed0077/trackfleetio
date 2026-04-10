import { error, ok } from "@/lib/server/api";
import { updateCurrentUserProfile } from "@/lib/server/profile-service";

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        fullName?: string;
      workEmail?: string;
      phone?: string;
      company?: string;
      gender?: string;
    }
    | null;
  const result = await updateCurrentUserProfile(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok({
    ok: true,
    user: result.user,
  });
}
