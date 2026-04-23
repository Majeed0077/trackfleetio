import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/server/auth-session";
import { uploadToCloudinary } from "@/lib/server/cloudinary-upload";
import { applyRateLimit } from "@/lib/server/rate-limit";
import { getClientIpAddress, verifyCsrfToken } from "@/lib/server/request-security";
import { validateUploadedFile } from "@/lib/server/upload-security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const csrfResult = await verifyCsrfToken(request);

    if (!csrfResult.ok) {
      return NextResponse.json({ error: csrfResult.message }, { status: csrfResult.status });
    }

    const currentUser = await getSessionUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const ipAddress = getClientIpAddress(request);
    const ipRateLimit = applyRateLimit({
      key: `media-upload:ip:${ipAddress}`,
      limit: 20,
      windowMs: 10 * 60 * 1000,
    });

    if (!ipRateLimit.ok) {
      const response = NextResponse.json(
        { error: "Too many upload attempts. Try again later." },
        { status: 429 },
      );
      response.headers.set("Retry-After", String(ipRateLimit.retryAfterSeconds));
      return response;
    }

    const userRateLimit = applyRateLimit({
      key: `media-upload:user:${currentUser.id}`,
      limit: 40,
      windowMs: 60 * 60 * 1000,
    });

    if (!userRateLimit.ok) {
      const response = NextResponse.json(
        { error: "Upload limit reached for this account. Try again later." },
        { status: 429 },
      );
      response.headers.set("Retry-After", String(userRateLimit.retryAfterSeconds));
      return response;
    }

    const formData = await request.formData();
    const maybeFile = formData.get("file");
    const maybeResourceType = formData.get("resourceType");

    if (!(maybeFile instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const resourceType = maybeResourceType === "video" ? "video" : "image";
    const fileValidationResult = await validateUploadedFile({
      file: maybeFile,
      resourceType,
    });

    if (!fileValidationResult.ok) {
      return NextResponse.json({ error: fileValidationResult.message }, { status: fileValidationResult.status });
    }

    const uploaded = await uploadToCloudinary({
      file: maybeFile,
      resourceType,
      folder: resourceType === "video" ? "trackfleetio/inline-cms/videos" : "trackfleetio/inline-cms/images",
    });

    return NextResponse.json({
      secureUrl: uploaded.secureUrl,
      resourceType: uploaded.resourceType,
      width: uploaded.width,
      height: uploaded.height,
      duration: uploaded.duration,
      format: uploaded.format,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
