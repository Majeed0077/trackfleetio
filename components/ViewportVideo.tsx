"use client";

import { useEffect, useRef } from "react";

import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";

type ViewportVideoProps = {
  className?: string;
  src: string;
  type?: string;
  poster?: string;
  ariaLabel: string;
};

export function ViewportVideo({
  className,
  src,
  type = "video/mp4",
  poster,
  ariaLabel,
}: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const normalizedSrc = src.trim();
  const normalizedPoster = poster?.trim();
  const resolvedSrc = normalizedSrc ? resolveCloudinaryAsset(normalizedSrc) : null;
  const resolvedPoster = normalizedPoster
    ? resolveCloudinaryAsset(normalizedPoster, { transforms: ["w_1280", "c_fill"] })
    : undefined;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !resolvedSrc) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const legacyReducedMotion = reducedMotion as MediaQueryList & {
      addListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
    };
    let isVisible = false;

    const syncPlayback = () => {
      if (reducedMotion.matches || !isVisible) {
        video.pause();
        return;
      }

      if (video.readyState === 0) {
        video.load();
      }

      const playPromise = video.play();

      if (playPromise) {
        playPromise.catch(() => {
          // Retry on media readiness events instead of failing permanently on a cold production load.
        });
      }
    };

    const playWhenVisible = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (!entry) {
        return;
      }

      isVisible = entry.isIntersecting;
      syncPlayback();
    };

    const handleCanPlay = () => {
      syncPlayback();
    };

    const handleMotionPreferenceChange = () => {
      syncPlayback();
    };

    video.addEventListener("loadeddata", handleCanPlay);
    video.addEventListener("canplay", handleCanPlay);

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    } else if (typeof legacyReducedMotion.addListener === "function") {
      legacyReducedMotion.addListener(handleMotionPreferenceChange);
    };

    const observer = new IntersectionObserver(playWhenVisible, {
      threshold: 0.25,
      rootMargin: "0px 0px -5% 0px",
    });

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("canplay", handleCanPlay);
      if (typeof reducedMotion.removeEventListener === "function") {
        reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      } else if (typeof legacyReducedMotion.removeListener === "function") {
        legacyReducedMotion.removeListener(handleMotionPreferenceChange);
      }
      video.pause();
    };
  }, [resolvedSrc]);

  if (!resolvedSrc) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={resolvedPoster}
      aria-label={ariaLabel}
    >
      <source src={resolvedSrc} type={type} />
    </video>
  );
}
