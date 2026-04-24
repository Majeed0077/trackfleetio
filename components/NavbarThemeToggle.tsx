"use client";

import { MoonStar, SunMedium } from "lucide-react";

import {
  getNextThemeMode,
  resolveThemeMode,
  useAppStore,
  useSystemTheme,
} from "@/store/store";

const themeModeLabels = {
  system: "System",
  light: "Light",
  dark: "Dark",
} as const;

export function NavbarThemeToggle() {
  const themeMode = useAppStore((state) => state.themeMode);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const systemTheme = useSystemTheme();
  const resolvedTheme = resolveThemeMode(themeMode, systemTheme);
  const nextThemeMode = getNextThemeMode(themeMode, systemTheme);
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
