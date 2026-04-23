"use client";

import { useEffect } from "react";

const REVEAL_DURATION_MS = 280;
const REVEAL_BUFFER_MS = 80;
const GROUP_OFFSET_STEP_MS = 28;

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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!standaloneTargets.length && !groupedTargets.length) {
      return undefined;
    }

    const motionDoneTimeoutIds: number[] = [];
    const sectionGroups = new Map<HTMLElement, HTMLElement[]>();
    const getGroupItems = (group: HTMLElement) =>
      Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    const getRevealStaggerStep = () => (window.innerWidth <= 991 ? 40 : 56);
    const parseCssTime = (value: string) => {
      const trimmedValue = value.trim();
      const parsedValue = Number.parseFloat(trimmedValue);

      if (!Number.isFinite(parsedValue)) {
        return 0;
      }

      return trimmedValue.endsWith("ms") ? parsedValue : parsedValue * 1000;
    };
    const observedGroupTargets = groupedTargets.filter((group) => {
      const parentSection = group.closest<HTMLElement>("[data-reveal]");

      if (!parentSection || parentSection === group) {
        return true;
      }

      const groups = sectionGroups.get(parentSection) ?? [];
      groups.push(group);
      sectionGroups.set(parentSection, groups);
      return false;
    });
    groupedTargets.forEach((group) => {
      const parentSection = group.closest<HTMLElement>("[data-reveal]");
      const groupIndex = parentSection ? sectionGroups.get(parentSection)?.indexOf(group) ?? 0 : 0;
      group.style.setProperty("--reveal-group-offset", `${Math.max(groupIndex, 0) * GROUP_OFFSET_STEP_MS}ms`);
    });
    const markMotionDone = (targets: HTMLElement[]) => {
      targets.forEach((target) => {
        target.dataset.motionDone = "true";
        target.classList.remove("reveal-animating");
      });
    };
    const scheduleMotionDone = (targets: HTMLElement[]) => {
      const pendingTargets = targets.filter((target) => target.dataset.motionDone !== "true");

      if (!pendingTargets.length) {
        targets.forEach((target) => target.classList.remove("reveal-animating"));
        return;
      }

      pendingTargets.forEach((target) => {
        target.classList.add("reveal-animating");
      });

      const maxRevealIndex = pendingTargets.reduce((highestIndex, target) => {
        const revealIndex = Number.parseInt(
          target.style.getPropertyValue("--reveal-index") || "0",
          10,
        );

        return Math.max(highestIndex, Number.isFinite(revealIndex) ? revealIndex : 0);
      }, 0);
      const maxGroupOffset = pendingTargets.reduce((highestOffset, target) => {
        const parentGroup = target.closest<HTMLElement>("[data-reveal-group]");
        const offsetValue = parentGroup?.style.getPropertyValue("--reveal-group-offset") ?? "0ms";

        return Math.max(highestOffset, parseCssTime(offsetValue));
      }, 0);

      motionDoneTimeoutIds.push(
        window.setTimeout(() => {
          markMotionDone(pendingTargets);
        }, REVEAL_DURATION_MS + maxGroupOffset + maxRevealIndex * getRevealStaggerStep() + REVEAL_BUFFER_MS),
      );
    };
    const revealGroup = (group: HTMLElement) => {
      group.classList.remove("reveal-group-pending");
      group.classList.add("is-visible");
      scheduleMotionDone(getGroupItems(group));
    };
    const revealSection = (section: HTMLElement) => {
      section.classList.remove("reveal-pending");
      section.classList.add("is-visible");
      scheduleMotionDone([section]);
      sectionGroups.get(section)?.forEach((group) => {
        revealGroup(group);
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

    let observer: IntersectionObserver | null = null;
    let idleCallbackId: number | null = null;
    let initTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let flushId = 0;
    const queuedTargets = new Set<HTMLElement>();

    const initializeObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            queuedTargets.add(entry.target as HTMLElement);
          });

          if (flushId) {
            return;
          }

          flushId = window.requestAnimationFrame(() => {
            flushId = 0;

            queuedTargets.forEach((target) => {
              if (target.hasAttribute("data-reveal-group")) {
                revealGroup(target);
              } else {
                revealSection(target);
              }

              observer?.unobserve(target);
            });
            queuedTargets.clear();
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -10% 0px",
        },
      );

      standaloneTargets.forEach((target) => observer?.observe(target));
      observedGroupTargets.forEach((group) => observer?.observe(group));
    };

    if ("requestIdleCallback" in globalThis) {
      idleCallbackId = globalThis.requestIdleCallback(
        () => {
          initializeObserver();
        },
        { timeout: 180 },
      );
    } else {
      initTimeoutId = globalThis.setTimeout(() => {
        initializeObserver();
      }, 120);
    }

    return () => {
      if (idleCallbackId !== null && "cancelIdleCallback" in globalThis) {
        globalThis.cancelIdleCallback(idleCallbackId);
      }
      if (initTimeoutId !== null) {
        globalThis.clearTimeout(initTimeoutId);
      }
      observer?.disconnect();
      if (flushId) {
        window.cancelAnimationFrame(flushId);
      }
      motionDoneTimeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      queuedTargets.clear();
    };
  }, []);

  return null;
}
