"use client";

import { useEffect } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function HomepageMotion() {
  useEffect(() => {
    const standaloneTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const groupedTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal-group]"),
    );
    const parallaxTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax='soft']"),
    ).filter((target) => Boolean(target.closest(".hero-section")));
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const finalizeVisibility = () => {
      standaloneTargets.forEach((target) => {
        target.classList.remove("reveal-pending");
        target.classList.add("is-visible");
      });

      groupedTargets.forEach((group) => {
        group.classList.remove("reveal-group-pending");
        group.classList.add("is-visible");
      });
    };

    groupedTargets.forEach((group) => {
      group.classList.add("reveal-group-pending");

      Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]")).forEach(
        (item, index) => {
          item.style.setProperty("--reveal-index", String(index));
        },
      );
    });

    standaloneTargets.forEach((target) => {
      target.classList.add("reveal-pending");
    });

    if (prefersReducedMotion.matches) {
      finalizeVisibility();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          const isGroup = target.hasAttribute("data-reveal-group");

          if (isGroup) {
            target.classList.remove("reveal-group-pending");
          } else {
            target.classList.remove("reveal-pending");
          }

          target.classList.add("is-visible");
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    standaloneTargets.forEach((target) => observer.observe(target));
    groupedTargets.forEach((group) => observer.observe(group));

    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;

      parallaxTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          target.style.setProperty("--parallax-offset", "0px");
          return;
        }

        const progress = clamp(
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
          0,
          1,
        );
        const offset = (0.5 - progress) * 10;

        target.style.setProperty("--parallax-offset", `${offset.toFixed(2)}px`);
      });
    };

    const requestParallaxFrame = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxFrame, { passive: true });
    window.addEventListener("resize", requestParallaxFrame);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestParallaxFrame);
      window.removeEventListener("resize", requestParallaxFrame);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return null;
}
