import type { Metadata } from "next";

import { AuthStatusPage } from "@/components/AuthStatusPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Session Expired | Track Fleetio",
    description: "Your Track Fleetio session has expired. Sign in again to continue.",
    path: "/session-expired",
  });
}

export default function SessionExpiredPage() {
  return (
    <AuthStatusPage
      badge="Session expired"
      title="Your session has expired"
      description="This is the recovery state for expired customer or staff sessions before protected routes return to sign-in."
      visualLabel="Session lifecycle"
      visualTitle="Protected workflows need a clear re-authentication state"
      visualDescription="When live sessions are moved to Mongo, this screen should appear after token expiry or manual revocation."
      trustLine="Session TTL ready | Re-authentication flow | Security-first protected routes"
      actions={[
        { href: "/signin", label: "Sign in again" },
        { href: "/", label: "Return to homepage", tone: "secondary" },
      ]}
    />
  );
}
