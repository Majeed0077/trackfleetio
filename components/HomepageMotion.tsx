"use client";

import { useEffect } from "react";

export function HomepageMotion() {
  useEffect(() => {
    const motionRoot = document.querySelector<HTMLElement>(
      "[data-homepage-motion-root]",
    );

    if (!motionRoot) {
      return undefined;
    }

    const standaloneTargets = Array.from(
      motionRoot.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const groupedTargets = Array.from(
      motionRoot.querySelectorAll<HTMLElement>("[data-reveal-group]"),
    );
    const parallaxTargets = Array.from(
      motionRoot.querySelectorAll<HTMLElement>(
        ".hero-section [data-parallax='soft']",
      ),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      !standaloneTargets.length &&
      !groupedTargets.length &&
      !parallaxTargets.length
    ) {
      return undefined;
    }

    const motionDoneTimeoutIds: number[] = [];
    const getGroupItems = (group: HTMLElement) =>
      Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    const parseTransitionTime = (value: string) => {
      const parsedValue = Number.parseFloat(value);

      if (!Number.isFinite(parsedValue)) {
        return 0;
      }

      return value.trim().endsWith("ms") ? parsedValue : parsedValue * 1000;
    };
    const getTransitionTotal = (target: HTMLElement) => {
      const computedStyle = window.getComputedStyle(target);
      const durations = computedStyle.transitionDuration
        .split(",")
        .map((value) => parseTransitionTime(value));
      const delays = computedStyle.transitionDelay
        .split(",")
        .map((value) => parseTransitionTime(value));

      return durations.reduce((longestTransition, duration, index) => {
        const delay = delays[index] ?? delays[delays.length - 1] ?? 0;
        return Math.max(longestTransition, duration + delay);
      }, 0);
    };
    const markMotionDone = (targets: HTMLElement[]) => {
      targets.forEach((target) => {
        target.dataset.motionDone = "true";
      });
    };
    const scheduleMotionDone = (targets: HTMLElement[]) => {
      targets.forEach((target) => {
        const transitionTotal = getTransitionTotal(target);

        if (transitionTotal <= 0) {
          target.dataset.motionDone = "true";
          return;
        }

        motionDoneTimeoutIds.push(
          window.setTimeout(() => {
            target.dataset.motionDone = "true";
          }, transitionTotal + 50),
        );
      });
    };

    const finalizeVisibility = () => {
      standaloneTargets.forEach((target) => {
        target.classList.remove("reveal-pending");
        target.classList.add("is-visible");
      });
      markMotionDone(standaloneTargets);

      groupedTargets.forEach((group) => {
        group.classList.remove("reveal-group-pending");
        group.classList.add("is-visible");
        markMotionDone(getGroupItems(group));
      });
    };

    groupedTargets.forEach((group) => {
      group.classList.add("reveal-group-pending");

      getGroupItems(group).forEach((item, index) => {
        item.style.setProperty("--reveal-index", String(index));
        delete item.dataset.motionDone;
      });
    });

    standaloneTargets.forEach((target) => {
      target.classList.add("reveal-pending");
      delete target.dataset.motionDone;
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
            scheduleMotionDone(getGroupItems(target));
          } else {
            target.classList.remove("reveal-pending");
            scheduleMotionDone([target]);
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

    const resetParallax = () => {
      parallaxTargets.forEach((target) => {
        target.classList.remove("parallax-active");
        target.style.removeProperty("--parallax-offset");
      });
    };

    resetParallax();

    return () => {
      observer.disconnect();
      motionDoneTimeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      resetParallax();
    };
  }, []);

  return null;
}
