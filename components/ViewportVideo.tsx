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
  const resolvedPoster = normalizedPoster ? resolveCloudinaryAsset(normalizedPoster) : undefined;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !resolvedSrc) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      video.pause();
      return;
    }

    const playWhenVisible = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (!entry) {
        return;
      }

      if (entry.isIntersecting) {
        const playPromise = video.play();

        if (playPromise) {
          playPromise.catch(() => {
            // Autoplay can be blocked transiently; keeping the video muted avoids hard failures.
          });
        }
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(playWhenVisible, {
      threshold: 0.4,
      rootMargin: "0px 0px -10% 0px",
    });

    observer.observe(video);

    return () => {
      observer.disconnect();
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
