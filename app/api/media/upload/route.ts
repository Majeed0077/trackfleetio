import { NextResponse } from "next/server";

import { uploadToCloudinary } from "@/lib/server/cloudinary-upload";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const maybeFile = formData.get("file");
    const maybeResourceType = formData.get("resourceType");
    const maybeFolder = formData.get("folder");

    if (!(maybeFile instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const resourceType = maybeResourceType === "video" ? "video" : "image";
    const folder =
      typeof maybeFolder === "string" && maybeFolder.trim()
        ? maybeFolder
        : "trackfleetio/inline-cms";

    const uploaded = await uploadToCloudinary({
      file: maybeFile,
      resourceType,
      folder,
    });

    return NextResponse.json(uploaded);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
