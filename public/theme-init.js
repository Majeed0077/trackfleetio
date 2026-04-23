(() => {
  const root = document.documentElement;
  const storeKey = "trackfleetio-store";

  const applyTheme = (themeMode, resolvedTheme) => {
    root.dataset.themeMode = themeMode;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
  };

  try {
    const storageValue = localStorage.getItem(storeKey);
    let themeMode = "system";
    const parsedValue = JSON.parse(storageValue ?? "null");
    const persistedState =
      parsedValue && typeof parsedValue === "object" && "state" in parsedValue
        ? parsedValue.state
        : parsedValue;

    if (persistedState && typeof persistedState === "object") {
      if (
        persistedState.themeMode === "light" ||
        persistedState.themeMode === "dark" ||
        persistedState.themeMode === "system"
      ) {
        themeMode = persistedState.themeMode;
      } else if (persistedState.theme === "light" || persistedState.theme === "dark") {
        themeMode = persistedState.theme;
      }
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const resolvedTheme = themeMode === "system" ? systemTheme : themeMode;
    applyTheme(themeMode, resolvedTheme);
  } catch {
    const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    applyTheme("system", fallbackTheme);
  }
})();
