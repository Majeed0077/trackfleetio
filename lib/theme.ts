export const SITE_STORE_KEY = "trackfleetio-store";
export const SSR_THEME_FALLBACK = "dark";

export const readPersistedThemeMode = (storageValue: string | null) => {
  let themeMode: "light" | "dark" | "system" = "system";

  if (!storageValue) {
    return themeMode;
  }

  const parsedValue = JSON.parse(storageValue);
  const persistedState =
    parsedValue && typeof parsedValue === "object" && "state" in parsedValue
      ? parsedValue.state
      : parsedValue;

  if (!persistedState || typeof persistedState !== "object") {
    return themeMode;
  }

  if (
    persistedState.themeMode === "light" ||
    persistedState.themeMode === "dark" ||
    persistedState.themeMode === "system"
  ) {
    themeMode = persistedState.themeMode;
  } else if (
    persistedState.theme === "light" ||
    persistedState.theme === "dark"
  ) {
    themeMode = persistedState.theme;
  }

  return themeMode;
};
