import cloudinaryImageManifest from "@/data/cloudinary-image-manifest.json";
import cloudinaryVideoManifest from "@/data/cloudinary-video-manifest.json";

type CloudinaryAssetRecord = {
  localPath: string;
  secureUrl: string;
};

const cloudinaryAssetMap = new Map(
  [...(cloudinaryImageManifest as CloudinaryAssetRecord[]), ...(cloudinaryVideoManifest as CloudinaryAssetRecord[])]
    .map((asset) => [asset.localPath, asset.secureUrl]),
);

const CLOUDINARY_HOST_PATTERN = /^https:\/\/res\.cloudinary\.com\//;
const FALLBACK_ASSET_SRC = "/Products/3Products.png";

function optimizeCloudinaryUrl(url: string) {
  if (!CLOUDINARY_HOST_PATTERN.test(url)) {
    return url;
  }

  if (url.includes("/upload/f_auto,q_auto/")) {
    return url;
  }

  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

export function resolveCloudinaryAsset(src: string) {
  const normalizedSrc = typeof src === "string" ? src.trim() : "";
  if (!normalizedSrc) {
    return FALLBACK_ASSET_SRC;
  }

  return optimizeCloudinaryUrl(cloudinaryAssetMap.get(normalizedSrc) ?? normalizedSrc);
}
