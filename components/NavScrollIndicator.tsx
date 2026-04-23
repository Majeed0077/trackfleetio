"use client";

import { useEffect } from "react";

export function NavScrollIndicator() {
  useEffect(() => {
    const header = document.getElementById("site-header");

    if (!header) {
      return undefined;
    }

    let rafId = 0;
    let lastScrolledState: boolean | null = null;

    const syncScrolledState = () => {
      const nextScrolledState = window.scrollY > 12;

      if (lastScrolledState === nextScrolledState) {
        return;
      }

      lastScrolledState = nextScrolledState;
      header.classList.toggle("is-scrolled", nextScrolledState);
    };

    const onScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        syncScrolledState();
      });
    };

    syncScrolledState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      header.classList.remove("is-scrolled");
    };
  }, []);

  return null;
}
