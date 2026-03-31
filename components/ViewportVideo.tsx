"use client";

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
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
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
    >
      <source src={src} type={type} />
    </video>
  );
}
