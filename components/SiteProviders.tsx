"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { RegionSelectorModal } from "@/components/RegionSelectorModal";
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
  initialAuthUser = null,
}: {
  children: ReactNode;
  initialAuthUser?: AuthUser | null;
}) {
  const pathname = usePathname();
  const hasHydrated = useStoreHydrated();
  const themeMode = useAppStore((state) => state.themeMode);
  const authResolved = useAppStore((state) => state.authResolved);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const toastMessage = useAppStore((state) => state.toastMessage);
  const toastVisible = useAppStore((state) => state.toastVisible);
  const systemTheme = useSystemTheme();
  const resolvedTheme = hasHydrated
    ? resolveThemeMode(themeMode, systemTheme)
    : SSR_THEME_FALLBACK;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAccountRoute = pathname.startsWith("/account");
  const isAuthRoute =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-email" ||
    pathname === "/session-expired" ||
    pathname === "/unauthorized" ||
    pathname.startsWith("/invite/");
  const shouldSyncPublicSession = !isAdminRoute && !isAccountRoute && !isAuthRoute;

  useEffect(() => {
    if (!useAppStore.persist.hasHydrated()) {
      void useAppStore.persist.rehydrate();
    }
  }, []);

  useEffect(() => {
    setAuthUser(initialAuthUser ?? null);
  }, [initialAuthUser, setAuthUser]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = themeMode;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, themeMode]);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const syncSession = async () => {
      if (!shouldSyncPublicSession || authResolved || initialAuthUser) {
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
        if (isMounted) {
          setAuthUser(null);
        }
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => {
        void syncSession();
      }, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(() => {
        void syncSession();
      }, 250);
    }

    return () => {
      isMounted = false;
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [authResolved, initialAuthUser, setAuthUser, shouldSyncPublicSession]);

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
