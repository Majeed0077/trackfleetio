import { error, ok } from "@/lib/server/api";
import { removeCurrentUserProfilePhoto, uploadCurrentUserProfilePhoto } from "@/lib/server/profile-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const maybeFile = formData.get("file");

  if (!(maybeFile instanceof File)) {
    return error("File is required.", 400);
  }

  const result = await uploadCurrentUserProfilePhoto(maybeFile);

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok({
    ok: true,
    user: result.user,
  });
}

export async function DELETE() {
  const result = await removeCurrentUserProfilePhoto();

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok({
    ok: true,
    user: result.user,
  });
}
