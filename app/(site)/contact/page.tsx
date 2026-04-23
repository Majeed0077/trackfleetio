import type { Metadata } from "next";

import { ContactPage } from "@/components/ContactPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Contact Track Fleetio",
    description:
      "Contact Track Fleetio to discuss the right fleet solution, hardware stack, and rollout plan for your operation.",
    path: "/contact",
  });
}

export default function ContactRoutePage() {
  return <ContactPage />;
}
