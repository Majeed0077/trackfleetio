import type { Metadata } from "next";

import { FavoritesPage } from "@/components/FavoritesPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Favorites | Track Fleetio",
    description: "Review saved Track Fleetio hardware and move into a guided quote request flow.",
    path: "/favorites",
  });
}

export default function FavoritesRoutePage() {
  return <FavoritesPage />;
}
