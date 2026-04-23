import { error, ok } from "@/lib/server/api";
import { verifyCsrfToken } from "@/lib/server/request-security";
import { removeCurrentUserProfilePhoto, uploadCurrentUserProfilePhoto } from "@/lib/server/profile-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const csrfResult = await verifyCsrfToken(request);

  if (!csrfResult.ok) {
    return error(csrfResult.message, csrfResult.status);
  }

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

export async function DELETE(request: Request) {
  const csrfResult = await verifyCsrfToken(request);

  if (!csrfResult.ok) {
    return error(csrfResult.message, csrfResult.status);
  }

  const result = await removeCurrentUserProfilePhoto();

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok({
    ok: true,
    user: result.user,
  });
}
