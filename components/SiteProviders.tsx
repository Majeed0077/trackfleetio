"use client";

import { useEffect, type ReactNode } from "react";

import { useAppStore, useStoreHydrated } from "@/store/store";

export function SiteProviders({ children }: { children: ReactNode }) {
  const hasHydrated = useStoreHydrated();
  const theme = useAppStore((state) => state.theme);
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
