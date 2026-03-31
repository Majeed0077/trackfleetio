"use client";

import { useEffect, type ReactNode } from "react";

import { useAppStore, useStoreHydrated } from "@/store/store";

export function SiteProviders({ children }: { children: ReactNode }) {
  const hasHydrated = useStoreHydrated();
  const theme = useAppStore((state) => state.theme);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const toastMessage = useAppStore((state) => state.toastMessage);
  const toastVisible = useAppStore((state) => state.toastVisible);
  const resolvedTheme = hasHydrated ? theme : "dark";

  useEffect(() => {
    if (!useAppStore.persist.hasHydrated()) {
      void useAppStore.persist.rehydrate();
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
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
