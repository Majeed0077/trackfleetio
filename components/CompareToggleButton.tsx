"use client";

import { ArrowLeftRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCompareActions, useCompareIds, compareStoreConfig } from "@/lib/compare-store";

type CompareToggleButtonProps = {
  productId: string;
  mode?: "tool" | "button";
  className?: string;
  label?: string;
  navigateToCompare?: boolean;
};

export function CompareToggleButton({
  productId,
  mode = "tool",
  className,
  label = "Compare",
  navigateToCompare = false,
}: CompareToggleButtonProps) {
  const router = useRouter();
  const ids = useCompareIds();
  const { toggle, setOnly } = useCompareActions();
  const isActive = ids.includes(productId);

  const title = isActive
    ? "Remove from compare"
    : ids.length >= compareStoreConfig.maxItems
      ? `Compare is limited to ${compareStoreConfig.maxItems} items`
      : "Add to compare";

  const content =
    mode === "button" ? (
      <>
        <ArrowLeftRight size={18} strokeWidth={1.9} />
        <span>{label}</span>
      </>
    ) : (
      <ArrowLeftRight size={18} strokeWidth={1.9} />
    );

  return (
    <button
      className={className}
      type="button"
      aria-label={label}
      title={title}
      aria-pressed={isActive ? "true" : "false"}
      onClick={() => {
        if (navigateToCompare) {
          // Start a fresh comparison every time the user clicks Compare from a product.
          setOnly(productId);
        } else {
          toggle(productId);
        }

        if (navigateToCompare) {
          router.push("/compare");
        }
      }}
    >
      {content}
    </button>
  );
}
