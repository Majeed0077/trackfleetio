import type { Metadata } from "next";

import { ComparePageClient } from "@/components/ComparePageClient";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Compare Products | Track Fleetio",
  description: "Compare Track Fleetio hardware products side by side.",
  path: "/compare",
});

export default function ComparePage() {
  return <ComparePageClient />;
}

