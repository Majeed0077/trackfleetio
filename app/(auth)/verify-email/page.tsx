import type { Metadata } from "next";

import { AuthStatusPage } from "@/components/AuthStatusPage";
import { createPageMetadata } from "@/lib/metadata";
import { verifyPendingEmailChange } from "@/lib/server/profile-service";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Verify Email | Track Fleetio",
    description: "Verify your email to activate Track Fleetio workflows and admin notifications.",
    path: "/verify-email",
  });
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const result = await verifyPendingEmailChange(params.token);

  return (
    <AuthStatusPage
      badge="Email verification"
      title={result.ok ? "Email verified" : "Verification link issue"}
      description={
        result.ok
          ? result.message
          : result.message || "The verification link is invalid or expired."
      }
      visualLabel="Identity check"
      visualTitle={
        result.ok
          ? "Your workspace email is now confirmed"
          : "Verification tokens protect account ownership and email changes"
      }
      visualDescription={
        result.ok
          ? "You can continue using your workspace with the updated email address."
          : "Request a new verification flow if the token has expired or was already used."
      }
      trustLine="Email verify tokens | Account ownership checks | Audit-safe identity flow"
      actions={[
        { href: "/signin", label: "Go to sign in" },
        { href: "/account/profile", label: "Back to profile", tone: "secondary" },
      ]}
    />
  );
}
