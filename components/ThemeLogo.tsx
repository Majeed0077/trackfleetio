"use client";

import type { CSSProperties } from "react";

import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { SSR_THEME_FALLBACK } from "@/lib/theme";
import { resolveThemeMode, useAppStore, useStoreHydrated, useSystemTheme } from "@/store/store";

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
  const hasHydrated = useStoreHydrated();
  const themeMode = useAppStore((state) => state.themeMode);
  const systemTheme = useSystemTheme();
  const resolvedTheme = hasHydrated
    ? resolveThemeMode(themeMode, systemTheme)
    : SSR_THEME_FALLBACK;
  const src = resolveCloudinaryAsset(
    resolvedTheme === "dark" ? "/Dark.png" : "/Light.png",
  );
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
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={src}
        className="theme-logo-image"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </span>
  );
}
