import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Track Fleetio",
    description:
      "Track Fleetio provides fleet tracking devices, AI dashcams, asset trackers, and sensors for connected fleet operations.",
    path: "/",
  });
}

export default function HomePageRoute() {
  return <HomePage />;
}
