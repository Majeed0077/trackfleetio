import { createHash } from "node:crypto";

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export function getCloudinaryConfig(): CloudinaryConfig {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if (!cloudinaryUrl) {
    throw new Error("CLOUDINARY_URL is missing");
  }

  const parsedUrl = new URL(cloudinaryUrl);
  const cloudName = parsedUrl.hostname;
  const apiKey = decodeURIComponent(parsedUrl.username);
  const apiSecret = decodeURIComponent(parsedUrl.password);

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("CLOUDINARY_URL must be in cloudinary://<key>:<secret>@<cloud> format");
  }

  return { cloudName, apiKey, apiSecret };
}

function createSignature(params: Record<string, string>, apiSecret: string) {
  const signatureBase = Object.entries(params)
    .filter(([, value]) => value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${signatureBase}${apiSecret}`).digest("hex");
}

function sanitizePublicIdSegment(value: string) {
  return value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/-+/g, "-");
}

export async function uploadToCloudinary({
  file,
  resourceType,
  folder,
}: {
  file: File;
  resourceType: "image" | "video";
  folder: string;
}) {
  const config = getCloudinaryConfig();
  const extension = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const timestamp = String(Math.floor(Date.now() / 1000));
  const publicId = `${sanitizePublicIdSegment(folder)}/${sanitizePublicIdSegment(baseName)}`.replace(/\/+/g, "/");
  const signedParams = {
    invalidate: "true",
    overwrite: "true",
    public_id: publicId,
    timestamp,
  };
  const signature = createSignature(signedParams, config.apiSecret);
  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`;
  const formData = new FormData();

  formData.append("file", file, `${baseName}${extension}`);
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", timestamp);
  formData.append("public_id", publicId);
  formData.append("overwrite", "true");
  formData.append("invalidate", "true");
  formData.append("signature", signature);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Cloudinary upload failed: ${response.status} ${detail}`);
  }

  const payload = await response.json();

  return {
    publicId: payload.public_id as string,
    secureUrl: payload.secure_url as string,
    width: (payload.width as number | undefined) ?? null,
    height: (payload.height as number | undefined) ?? null,
    duration: (payload.duration as number | undefined) ?? null,
    format: (payload.format as string | undefined) ?? null,
    bytes: (payload.bytes as number | undefined) ?? null,
    resourceType: (payload.resource_type as string | undefined) ?? resourceType,
  };
}
