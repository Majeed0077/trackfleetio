"use client";

import { Suspense, useEffect, type ReactNode } from "react";

import { RegionSelectorModal } from "@/components/RegionSelectorModal";
import { TopRouteLoader } from "@/components/TopRouteLoader";
import {
  resolveThemeMode,
  useAppStore,
  useStoreHydrated,
  useSystemTheme,
  type AuthUser,
} from "@/store/store";
import { SSR_THEME_FALLBACK } from "@/lib/theme";

export function SiteProviders({
  children,
  initialAuthUser,
}: {
  children: ReactNode;
  initialAuthUser: AuthUser | null;
}) {
  const hasHydrated = useStoreHydrated();
  const themeMode = useAppStore((state) => state.themeMode);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const toastMessage = useAppStore((state) => state.toastMessage);
  const toastVisible = useAppStore((state) => state.toastVisible);
  const systemTheme = useSystemTheme();
  const resolvedTheme = hasHydrated
    ? resolveThemeMode(themeMode, systemTheme)
    : SSR_THEME_FALLBACK;

  useEffect(() => {
    if (!useAppStore.persist.hasHydrated()) {
      void useAppStore.persist.rehydrate();
    }
  }, []);

  useEffect(() => {
    setAuthUser(initialAuthUser);
  }, [initialAuthUser, setAuthUser]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = themeMode;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, themeMode]);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      if (!initialAuthUser) {
        if (isMounted) {
          setAuthUser(null);
        }
        return;
      }

      try {
        const response = await fetch("/api/auth/session", {
          credentials: "same-origin",
        });
        const payload = (await response.json()) as { user?: unknown };

        if (isMounted) {
          setAuthUser((payload.user as Parameters<typeof setAuthUser>[0]) ?? null);
        }
      } catch {
        if (isMounted && !initialAuthUser) {
          setAuthUser(null);
        }
      }
    };

    void syncSession();

    return () => {
      isMounted = false;
    };
  }, [initialAuthUser, setAuthUser]);

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <TopRouteLoader />
      </Suspense>
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
