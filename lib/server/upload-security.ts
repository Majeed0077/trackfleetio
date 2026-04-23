import "server-only";

const IMAGE_SIGNATURES: Array<{ mimeType: string; bytes: number[] }> = [
  { mimeType: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mimeType: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mimeType: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] },
];

const VIDEO_SIGNATURES: Array<{ mimeType: string; bytes: number[] }> = [
  { mimeType: "video/webm", bytes: [0x1a, 0x45, 0xdf, 0xa3] },
];

const hasSignature = (buffer: Uint8Array, signature: number[]) =>
  signature.every((byte, index) => buffer[index] === byte);

const hasMp4CompatibleFtyp = (buffer: Uint8Array) => {
  const text = new TextDecoder().decode(buffer.slice(4, 16));
  return text.includes("ftyp");
};

const isWebpFile = (buffer: Uint8Array) =>
  hasSignature(buffer, [0x52, 0x49, 0x46, 0x46]) &&
  new TextDecoder().decode(buffer.slice(8, 12)) === "WEBP";

export const uploadPolicies = {
  image: {
    maxBytes: 10 * 1024 * 1024,
    mimeTypes: new Set(["image/png", "image/jpeg", "image/webp"]),
  },
  video: {
    maxBytes: 50 * 1024 * 1024,
    mimeTypes: new Set(["video/mp4", "video/webm", "video/quicktime"]),
  },
} as const;

export const validateUploadedFile = async ({
  file,
  resourceType,
}: {
  file: File;
  resourceType: "image" | "video";
}) => {
  const policy = uploadPolicies[resourceType];

  if (!policy.mimeTypes.has(file.type)) {
    return {
      ok: false as const,
      status: 400,
      message:
        resourceType === "video"
          ? "Use an MP4, WebM, or MOV video."
          : "Use a PNG, JPG, or WEBP image.",
    };
  }

  if (file.size > policy.maxBytes) {
    return {
      ok: false as const,
      status: 400,
      message:
        resourceType === "video"
          ? "Video uploads must be 50 MB or smaller."
          : "Image uploads must be 10 MB or smaller.",
    };
  }

  const fileHeader = new Uint8Array(await file.slice(0, 32).arrayBuffer());

  if (resourceType === "image") {
    const matchingImageSignature = IMAGE_SIGNATURES.find((signature) =>
      signature.mimeType === "image/webp"
        ? isWebpFile(fileHeader)
        : hasSignature(fileHeader, signature.bytes),
    );

    if (!matchingImageSignature || matchingImageSignature.mimeType !== file.type) {
      return {
        ok: false as const,
        status: 400,
        message: "Uploaded image content does not match the provided file type.",
      };
    }
  } else {
    const isWebm = VIDEO_SIGNATURES.some((signature) => hasSignature(fileHeader, signature.bytes));
    const isMp4Like = hasMp4CompatibleFtyp(fileHeader);

    if ((file.type === "video/webm" && !isWebm) || ((file.type === "video/mp4" || file.type === "video/quicktime") && !isMp4Like)) {
      return {
        ok: false as const,
        status: 400,
        message: "Uploaded video content does not match the provided file type.",
      };
    }
  }

  return { ok: true as const };
};
