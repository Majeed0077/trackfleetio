import type { Metadata } from "next";
import { Suspense } from "react";

import { SolutionsCatalogPage } from "@/components/SolutionsCatalogPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Solutions | Track Fleetio",
    description:
      "Explore Track Fleetio monitoring systems, field operations solutions, public transport solutions, EV management, and connected fleet control workflows.",
    path: "/solutions",
  });
}

export default function SolutionsPage() {
  return (
    <Suspense fallback={null}>
      <SolutionsCatalogPage />
    </Suspense>
  );
}
