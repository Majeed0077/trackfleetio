import type { Metadata } from "next";

import { AuthStatusPage } from "@/components/AuthStatusPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Verify Email | Track Fleetio",
    description: "Verify your email to activate Track Fleetio workflows and admin notifications.",
    path: "/verify-email",
  });
}

export default function VerifyEmailPage() {
  return (
    <AuthStatusPage
      badge="Email verification"
      title="Verify your email address"
      description="This state confirms the user has a valid verification token and can activate protected account features."
      visualLabel="Identity check"
      visualTitle="Verification should unlock orders, notifications, and workspace actions"
      visualDescription="Once the schema is wired, this page will consume a hashed token, mark the account verified, and log the event."
      trustLine="Email verify tokens | Account activation ready | Audit-safe identity flow"
      actions={[
        { href: "/signin", label: "Go to sign in" },
        { href: "/forgot-password", label: "Resend verification flow", tone: "secondary" },
      ]}
    />
  );
}
