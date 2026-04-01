"use client";

import { useEffect, type ReactNode } from "react";

import { RegionSelectorModal } from "@/components/RegionSelectorModal";
import {
  resolveThemeMode,
  useAppStore,
  useStoreHydrated,
  useSystemTheme,
} from "@/store/store";

export function SiteProviders({ children }: { children: ReactNode }) {
  const hasHydrated = useStoreHydrated();
  const themeMode = useAppStore((state) => state.themeMode);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const toastMessage = useAppStore((state) => state.toastMessage);
  const toastVisible = useAppStore((state) => state.toastVisible);
  const systemTheme = useSystemTheme();
  const resolvedTheme = hasHydrated
    ? resolveThemeMode(themeMode, systemTheme)
    : systemTheme;

  useEffect(() => {
    if (!useAppStore.persist.hasHydrated()) {
      void useAppStore.persist.rehydrate();
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "same-origin",
        });
        const payload = (await response.json()) as { user?: unknown };

        if (isMounted) {
          setAuthUser((payload.user as Parameters<typeof setAuthUser>[0]) ?? null);
        }
      } catch {
        if (isMounted) {
          setAuthUser(null);
        }
      }
    };

    void syncSession();

    return () => {
      isMounted = false;
    };
  }, [setAuthUser]);

  return (
    <>
      {children}
      <RegionSelectorModal />
      <div
        className={`cart-toast${toastVisible ? " is-visible" : ""}`}
        data-cart-toast
        hidden={!toastVisible}
      >
        {toastMessage}
      </div>
    </>
  );
}
