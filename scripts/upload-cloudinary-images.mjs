import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const manifestPath = path.join(projectRoot, "data", "cloudinary-image-manifest.json");
const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);

function parseDotEnv(content) {
  const result = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    result[key] = value;
  }

  return result;
}

async function loadCloudinaryConfig() {
  const envPath = path.join(projectRoot, ".env.local");
  const envContent = await fs.readFile(envPath, "utf8");
  const env = parseDotEnv(envContent);
  const cloudinaryUrl = env.CLOUDINARY_URL || process.env.CLOUDINARY_URL;

  if (!cloudinaryUrl) {
    throw new Error("CLOUDINARY_URL is missing in .env.local");
  }

  const parsedUrl = new URL(cloudinaryUrl);
  const cloudName = parsedUrl.hostname;
  const apiKey = parsedUrl.username;
  const apiSecret = parsedUrl.password;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("CLOUDINARY_URL is not in a valid cloudinary://<key>:<secret>@<cloud> format");
  }

  return { cloudName, apiKey, apiSecret };
}

async function collectFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function createPublicId(filePath) {
  const relativePath = toPosix(path.relative(publicDir, filePath));
  const withoutExtension = relativePath.replace(/\.[^.]+$/, "");
  return `trackfleetio/${withoutExtension}`
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/-+/g, "-");
}

function createSignature(params, apiSecret) {
  const filteredEntries = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([left], [right]) => left.localeCompare(right));

  const signatureBase = filteredEntries.map(([key, value]) => `${key}=${value}`).join("&");
  return createHash("sha1").update(`${signatureBase}${apiSecret}`).digest("hex");
}

async function uploadImage(filePath, config) {
  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = createPublicId(filePath);
  const signedParams = {
    invalidate: "true",
    overwrite: "true",
    public_id: publicId,
    timestamp: String(timestamp),
  };

  const signature = createSignature(signedParams, config.apiSecret);
  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;
  const fileBuffer = await fs.readFile(filePath);
  const formData = new FormData();

  formData.append("file", new Blob([fileBuffer]), path.basename(filePath));
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", signedParams.timestamp);
  formData.append("public_id", signedParams.public_id);
  formData.append("overwrite", signedParams.overwrite);
  formData.append("invalidate", signedParams.invalidate);
  formData.append("signature", signature);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed for ${filePath}: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const relativePath = `/${toPosix(path.relative(publicDir, filePath))}`;

  return {
    localPath: relativePath,
    publicId: payload.public_id,
    secureUrl: payload.secure_url,
    width: payload.width ?? null,
    height: payload.height ?? null,
    bytes: payload.bytes ?? null,
    format: payload.format ?? null,
  };
}

async function main() {
  const config = await loadCloudinaryConfig();
  const files = await collectFiles(publicDir);
  const uploaded = [];

  console.log(`Found ${files.length} image files in public/`);

  for (const filePath of files) {
    console.log(`Uploading ${path.relative(projectRoot, filePath)} ...`);
    uploaded.push(await uploadImage(filePath, config));
  }

  uploaded.sort((left, right) => left.localPath.localeCompare(right.localPath));
  await fs.writeFile(manifestPath, `${JSON.stringify(uploaded, null, 2)}\n`, "utf8");

  console.log(`Uploaded ${uploaded.length} images.`);
  console.log(`Manifest written to ${path.relative(projectRoot, manifestPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
