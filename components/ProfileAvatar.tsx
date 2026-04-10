"use client";

import Image from "next/image";

import { getResolvedAvatarSrc, isDefaultAvatarSrc, type ProfileAvatarGender } from "@/lib/profile-avatar";

type ProfileAvatarProps = {
  alt: string;
  avatarUrl?: string | null;
  className?: string;
  gender?: ProfileAvatarGender | null;
  imageClassName?: string;
  sizes: string;
  src?: string;
  unoptimized?: boolean;
};

const joinClasses = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export function ProfileAvatar({
  alt,
  avatarUrl,
  className,
  gender,
  imageClassName,
  sizes,
  src,
  unoptimized = false,
}: ProfileAvatarProps) {
  const resolvedSrc =
    typeof src === "string" && src.trim()
      ? src.trim()
      : getResolvedAvatarSrc({ avatarUrl, gender });
  const isDefaultAvatar = isDefaultAvatarSrc(resolvedSrc);

  return (
    <span className={joinClasses("profile-avatar", className)}>
      <Image
        alt={alt}
        className={joinClasses(
          "profile-avatar-image",
          isDefaultAvatar && "profile-avatar-image-default",
          imageClassName,
        )}
        fill
        sizes={sizes}
        src={resolvedSrc}
        unoptimized={unoptimized}
      />
    </span>
  );
}
