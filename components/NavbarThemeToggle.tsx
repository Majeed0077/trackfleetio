"use client";

import { MoonStar, SunMedium } from "lucide-react";

import {
  getNextThemeMode,
  resolveThemeMode,
  useAppStore,
  useStoreHydrated,
  useSystemTheme,
} from "@/store/store";
import { SSR_THEME_FALLBACK } from "@/lib/theme";

const themeModeLabels = {
  system: "System",
  light: "Light",
  dark: "Dark",
} as const;

export function NavbarThemeToggle() {
  const hasHydrated = useStoreHydrated();
  const themeMode = useAppStore((state) => state.themeMode);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const systemTheme = useSystemTheme();
  const resolvedTheme = hasHydrated
    ? resolveThemeMode(themeMode, systemTheme)
    : SSR_THEME_FALLBACK;
  const nextThemeMode = hasHydrated
    ? getNextThemeMode(themeMode, systemTheme)
    : "light";
  const nextThemeModeLabel = themeModeLabels[nextThemeMode];
  const currentThemeModeLabel = themeModeLabels[themeMode];
  const currentThemeStateLabel =
    themeMode === "system"
      ? `${currentThemeModeLabel} (${resolvedTheme})`
      : currentThemeModeLabel;

  return (
    <button
      className={`nav-utility nav-theme-toggle nav-theme-toggle-${resolvedTheme} nav-theme-toggle-mode-${resolvedTheme}`}
      type="button"
      data-theme-toggle
      aria-label={`Theme mode: ${currentThemeStateLabel}. Switch to ${nextThemeModeLabel}.`}
      title={`Theme mode: ${currentThemeStateLabel}. Click to switch to ${nextThemeModeLabel}.`}
      aria-pressed={resolvedTheme === "light" ? "true" : "false"}
      onClick={toggleTheme}
      data-theme-mode={themeMode}
    >
      <span className="theme-icon theme-icon-moon" aria-hidden="true">
        <MoonStar size={18} strokeWidth={1.9} />
      </span>
      <span className="theme-icon theme-icon-sun" aria-hidden="true">
        <SunMedium size={18} strokeWidth={1.9} />
      </span>
    </button>
  );
}
