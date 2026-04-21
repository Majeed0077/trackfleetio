"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const [isUpMode, setIsUpMode] = useState(false);
  const motionReducedRef = useRef(false);

  const iconSize = 18;
  const threshold = useMemo(() => 360, []);

  useEffect(() => {
    motionReducedRef.current = prefersReducedMotion();

    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      motionReducedRef.current = prefersReducedMotion();
    };

    mediaQuery?.addEventListener?.("change", handleMotionChange);

    let rafId = 0;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const show = scrollY > 200;
      setIsVisible((currentValue) =>
        currentValue === show ? currentValue : show,
      );

      if (!show) {
        setIsUpMode((currentValue) =>
          currentValue === false ? currentValue : false,
        );
        return;
      }

      const viewportSwitchPoint = Math.max(threshold, window.innerHeight * 0.6);
      const nextIsUpMode = scrollY > viewportSwitchPoint;
      setIsUpMode((currentValue) =>
        currentValue === nextIsUpMode ? currentValue : nextIsUpMode,
      );
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
  }, [threshold]);

  const actionLabel = isUpMode ? "Scroll to top" : "Scroll to bottom";
  const tooltipLabel = isUpMode ? "Back to top" : "Explore more";

  return (
    <button
      className={`scroll-toggle${isVisible ? " is-visible" : ""}`}
      type="button"
      aria-label={actionLabel}
      data-mode={isUpMode ? "up" : "down"}
      onClick={() => {
        const behavior = motionReducedRef.current ? "auto" : "smooth";

        if (isUpMode) {
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
      <span className="scroll-toggle-tooltip" role="tooltip">
        {tooltipLabel}
      </span>
    </button>
  );
}
