import type { Metadata } from "next";

import { InviteAcceptForm } from "@/components/InviteAcceptForm";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Accept Invite | Track Fleetio",
    description: "Accept your Track Fleetio workspace invitation and set your password.",
    path: "/invite/accept",
  });
}

export default function InviteAcceptPage() {
  return <InviteAcceptForm />;
}
