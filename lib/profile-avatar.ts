import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";

export type ProfileAvatarGender = "male" | "female";

export const getDefaultAvatarSrc = (gender: ProfileAvatarGender = "male") =>
  gender === "female" ? "/Female-avatar.png" : "/Male-avatar.png";

export const isDefaultAvatarSrc = (value?: string | null) =>
  value === "/Male-avatar.png" || value === "/Female-avatar.png";

const avatarTransformation = "c_fill,g_face,w_720,h_720,f_auto,q_auto";

const buildAvatarCloudinaryUrl = (value: string) => {
  const resolved = resolveCloudinaryAsset(value);

  if (resolved.includes("/upload/f_auto,q_auto/")) {
    return resolved.replace(
      "/upload/f_auto,q_auto/",
      `/upload/${avatarTransformation}/`,
    );
  }

  if (resolved.includes("/upload/")) {
    return resolved.replace("/upload/", `/upload/${avatarTransformation}/`);
  }

  return resolved;
};

export const getResolvedAvatarSrc = ({
  avatarUrl,
  gender,
}: {
  avatarUrl?: string | null;
  gender?: ProfileAvatarGender | null;
}) => (avatarUrl ? buildAvatarCloudinaryUrl(avatarUrl) : getDefaultAvatarSrc(gender ?? "male"));
