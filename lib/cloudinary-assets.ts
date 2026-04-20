import cloudinaryImageManifest from "@/data/cloudinary-image-manifest.json";
import cloudinaryVideoManifest from "@/data/cloudinary-video-manifest.json";

type CloudinaryAssetRecord = {
  localPath: string;
  secureUrl: string;
};

type ResolveCloudinaryAssetOptions = {
  transforms?: string[];
};

const cloudinaryAssetMap = new Map(
  [...(cloudinaryImageManifest as CloudinaryAssetRecord[]), ...(cloudinaryVideoManifest as CloudinaryAssetRecord[])]
    .map((asset) => [asset.localPath, asset.secureUrl]),
);

const CLOUDINARY_HOST_PATTERN = /^https:\/\/res\.cloudinary\.com\//;
const FALLBACK_ASSET_SRC = "/Products/3Products.png";

function optimizeCloudinaryUrl(url: string, transforms: string[] = []) {
  if (!CLOUDINARY_HOST_PATTERN.test(url)) {
    return url;
  }

  const normalizedUrl = url.includes("/upload/f_auto,q_auto/")
    ? url
    : url.replace("/upload/", "/upload/f_auto,q_auto/");

  if (!transforms.length) {
    return normalizedUrl;
  }

  const [prefix, remainder] = normalizedUrl.split("/upload/");

  if (!prefix || !remainder) {
    return normalizedUrl;
  }

  const slashIndex = remainder.indexOf("/");

  if (slashIndex === -1) {
    return normalizedUrl;
  }

  const existingTransforms = remainder
    .slice(0, slashIndex)
    .split(",")
    .filter(Boolean);
  const remainingPath = remainder.slice(slashIndex + 1);
  const mergedTransforms = [...existingTransforms];

  transforms.forEach((transform) => {
    if (transform && !mergedTransforms.includes(transform)) {
      mergedTransforms.push(transform);
    }
  });

  return `${prefix}/upload/${mergedTransforms.join(",")}/${remainingPath}`;
}

export function resolveCloudinaryAsset(src: string, options: ResolveCloudinaryAssetOptions = {}) {
  const normalizedSrc = typeof src === "string" ? src.trim() : "";
  if (!normalizedSrc) {
    return FALLBACK_ASSET_SRC;
  }

  return optimizeCloudinaryUrl(cloudinaryAssetMap.get(normalizedSrc) ?? normalizedSrc, options.transforms);
}
