"use client";

import { useEffect } from "react";

export function NavScrollIndicator() {
  useEffect(() => {
    const header = document.getElementById("site-header");

    if (!header) {
      return undefined;
    }

    const syncScrolledState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    syncScrolledState();
    window.addEventListener("scroll", syncScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncScrolledState);
      header.classList.remove("is-scrolled");
    };
  }, []);

  return null;
}
