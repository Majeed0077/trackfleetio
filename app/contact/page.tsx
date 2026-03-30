import type { Metadata } from "next";

import { ContactPage } from "@/components/ContactPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Contact Track Fleetio",
    description:
      "Contact Track Fleetio for fleet tracking hardware, AI dashcams, sensors, and deployment support.",
    path: "/contact",
  });
}

export default function ContactRoutePage() {
  return <ContactPage />;
}
