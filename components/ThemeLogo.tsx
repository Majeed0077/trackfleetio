"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

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
  const src = resolvedTheme === "dark" ? "/Logo-dark.png" : "/Logo-light.png";

  return (
    <span className={["theme-logo", wrapperClassName].filter(Boolean).join(" ")}>
      <Image
        key={src}
        className={["theme-logo-image", className].filter(Boolean).join(" ")}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        style={style}
      />
    </span>
  );
}
