"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function getScrollHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
  );
}

export function ScrollToggle() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const motionReducedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isUpModeRef = useRef(false);
  const iconSize = 18;
  const threshold = 360;

  useEffect(() => {
    motionReducedRef.current = prefersReducedMotion();

    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      motionReducedRef.current = prefersReducedMotion();
    };

    mediaQuery?.addEventListener?.("change", handleMotionChange);

    let rafId = 0;

    const applyState = (show: boolean, isUpMode: boolean) => {
      const button = buttonRef.current;

      if (!button) {
        return;
      }

      if (isVisibleRef.current !== show) {
        isVisibleRef.current = show;
        button.classList.toggle("is-visible", show);
      }

      if (isUpModeRef.current !== isUpMode) {
        isUpModeRef.current = isUpMode;
        button.dataset.mode = isUpMode ? "up" : "down";
        button.setAttribute("aria-label", isUpMode ? "Scroll to top" : "Scroll to bottom");

        if (tooltipRef.current) {
          tooltipRef.current.textContent = isUpMode ? "Back to top" : "Explore more";
        }
      }
    };

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const show = scrollY > 200;

      if (!show) {
        applyState(false, false);
        return;
      }

      const viewportSwitchPoint = Math.max(threshold, window.innerHeight * 0.6);
      const nextIsUpMode = scrollY > viewportSwitchPoint;
      applyState(true, nextIsUpMode);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      mediaQuery?.removeEventListener?.("change", handleMotionChange);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="scroll-toggle"
      type="button"
      aria-label="Scroll to bottom"
      data-mode="down"
      onClick={() => {
        const behavior = motionReducedRef.current ? "auto" : "smooth";

        if (isUpModeRef.current) {
          window.scrollTo({ top: 0, behavior });
          return;
        }

        window.scrollTo({ top: getScrollHeight(), behavior });
      }}
    >
      <span className="scroll-toggle-icon" aria-hidden="true">
        <ArrowDown className="scroll-toggle-icon-down" size={iconSize} strokeWidth={2.2} />
        <ArrowUp className="scroll-toggle-icon-up" size={iconSize} strokeWidth={2.2} />
      </span>
      <span ref={tooltipRef} className="scroll-toggle-tooltip" role="tooltip">
        Explore more
      </span>
    </button>
  );
}
