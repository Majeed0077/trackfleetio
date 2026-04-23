"use client";

import type { CSSProperties } from "react";

import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";

type ThemeLogoProps = {
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
};

export function ThemeLogo({
  alt,
  width,
  height,
  priority = false,
  className,
  wrapperClassName,
  style,
}: ThemeLogoProps) {
  const normalizedStyle = {
    ...style,
    "--theme-logo-width": `${width}px`,
    "--theme-logo-height": `${height}px`,
    aspectRatio: `${width} / ${height}`,
  } as CSSProperties & {
    "--theme-logo-width": string;
    "--theme-logo-height": string;
  };

  if (style?.width && !style?.height) {
    normalizedStyle.height = "auto";
  }

  if (style?.height && !style?.width) {
    normalizedStyle.width = "auto";
  }

  return (
    <span
      className={["theme-logo", wrapperClassName, className].filter(Boolean).join(" ")}
      style={normalizedStyle}
      role="img"
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="theme-logo-image theme-logo-image-light"
        src={resolveCloudinaryAsset("/Light.png")}
        alt=""
        aria-hidden="true"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="theme-logo-image theme-logo-image-dark"
        src={resolveCloudinaryAsset("/Dark.png")}
        alt=""
        aria-hidden="true"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </span>
  );
}
