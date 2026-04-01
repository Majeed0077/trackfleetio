"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { routeLoaderEvents } from "@/lib/route-loader";

const COMPLETE_HIDE_DELAY_MS = 220;

const isInternalNavigationLink = (anchor: HTMLAnchorElement) => {
  if (!anchor.href || anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return false;
  }

  const nextUrl = new URL(anchor.href, window.location.href);
  const currentUrl = new URL(window.location.href);

  if (nextUrl.origin !== currentUrl.origin) {
    return false;
  }

  if (
    nextUrl.pathname === currentUrl.pathname &&
    nextUrl.search === currentUrl.search &&
    nextUrl.hash === currentUrl.hash
  ) {
    return false;
  }

  if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search && nextUrl.hash) {
    return false;
  }

  return true;
};

export function TopRouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const activeRef = useRef(false);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishRouteRef = useRef<(() => void) | null>(null);
  const routeSignature = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    const clearTimers = () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
        finishTimeoutRef.current = null;
      }
    };

    const finish = () => {
      if (!activeRef.current && !isVisible) {
        return;
      }

      clearTimers();
      activeRef.current = false;
      setIsVisible(true);
      setIsFinishing(true);
      setProgress(100);
      finishTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setIsFinishing(false);
        setProgress(0);
      }, COMPLETE_HIDE_DELAY_MS);
    };
    finishRouteRef.current = finish;

    const start = () => {
      clearTimers();
      activeRef.current = true;
      setIsVisible(true);
      setIsFinishing(false);
      setProgress((currentValue) => (currentValue > 12 ? currentValue : 12));

      progressIntervalRef.current = setInterval(() => {
        setProgress((currentValue) => {
          if (currentValue >= 88) {
            return currentValue;
          }

          if (currentValue >= 72) {
            return currentValue + 2;
          }

          if (currentValue >= 48) {
            return currentValue + 4;
          }

          return currentValue + 7;
        });
      }, 140);
    };

    const handleRouteStart = () => {
      start();
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]");

      if (!anchor || !(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (isInternalNavigationLink(anchor)) {
        start();
      }
    };

    const handlePopState = () => {
      start();
    };

    window.addEventListener(routeLoaderEvents.start, handleRouteStart as EventListener);
    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimers();
      finishRouteRef.current = null;
      window.removeEventListener(routeLoaderEvents.start, handleRouteStart as EventListener);
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!activeRef.current) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      finishRouteRef.current?.();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [routeSignature]);

  return (
    <div
      className={`top-route-loader${isVisible ? " is-visible" : ""}${isFinishing ? " is-finishing" : ""}`}
      aria-hidden="true"
    >
      <span className="top-route-loader-bar" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
