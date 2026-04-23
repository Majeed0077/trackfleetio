import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Track Fleetio",
    description:
      "Track Fleetio provides B2B fleet solutions across tracking, video telematics, and monitoring hardware for connected operations.",
    path: "/",
  });
}

export default function HomePageRoute() {
  return <HomePage />;
}
