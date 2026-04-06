"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeLogo } from "@/components/ThemeLogo";
import { useAppStore, useStoreHydrated, type SiteRegion } from "@/store/store";

const regions: { value: SiteRegion; helper: string }[] = [
  { value: "Pakistan", helper: "South Asia team" },
  { value: "UAE", helper: "Middle East team" },
  { value: "UK", helper: "United Kingdom team" },
  { value: "USA", helper: "North America team" },
];

export function RegionSelectorModal() {
  const pathname = usePathname();
  const hasHydrated = useStoreHydrated();
  const region = useAppStore((state) => state.region);
  const setRegion = useAppStore((state) => state.setRegion);
  const [selectedRegion, setSelectedRegion] = useState<SiteRegion | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname === "/signin" || pathname === "/signup";
  const shouldShow = hasHydrated && !region && !isAdminRoute && !isAuthRoute && !dismissed;

  useEffect(() => {
    if (!shouldShow) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [shouldShow]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="region-modal-backdrop" role="presentation">
      <div
        className="region-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="region-modal-title"
        aria-describedby="region-modal-description"
      >
        <button
          type="button"
          className="region-modal-close"
          aria-label="Close region selector"
          onClick={() => setDismissed(true)}
        >
          <X size={18} strokeWidth={1.9} />
        </button>

        <div className="region-modal-brand">
          <ThemeLogo
            className="region-modal-logo"
            alt="Track Fleetio logo"
            width={164}
            height={40}
            priority
            style={{ width: "110px", height: "78px" }}
          />
        </div>

        <div className="region-modal-copy">
          <p className="region-modal-eyebrow">Track Fleetio Network</p>
          <h2 id="region-modal-title">Choose your region</h2>
          <p id="region-modal-description">
            Select the market that best matches your business so we can route
            inquiries, support, and product guidance to the right team.
          </p>
        </div>

        <div className="region-modal-grid" role="list" aria-label="Available regions">
          {regions.map((item) => {
            const isActive = selectedRegion === item.value;

            return (
              <button
                key={item.value}
                type="button"
                className={`region-option${isActive ? " is-active" : ""}`}
                onClick={() => setSelectedRegion(item.value)}
                aria-pressed={isActive}
              >
                <span className="region-option-radio" aria-hidden="true" />
                <span className="region-option-text">
                  <span className="region-option-title">{item.value}</span>
                  <span className="region-option-helper">{item.helper}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="region-modal-footer">
          <p className="region-modal-note">
            You can use the full website after selecting your region.
          </p>
          <button
            type="button"
            className="button button-primary region-modal-submit"
            disabled={!selectedRegion}
            onClick={() => {
              if (selectedRegion) {
                setRegion(selectedRegion);
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
