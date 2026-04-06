import type { Metadata } from "next";

import { AuthStatusPage } from "@/components/AuthStatusPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Unauthorized | Track Fleetio",
    description: "You do not have permission to access this Track Fleetio workflow.",
    path: "/unauthorized",
  });
}

export default function UnauthorizedPage() {
  return (
    <AuthStatusPage
      badge="Access denied"
      title="You do not have permission for this area"
      description="This state should be used when a valid user lacks the required role or permission for admin and operator workflows."
      visualLabel="Role-based access"
      visualTitle="Protected routes need an explicit unauthorized state"
      visualDescription="Role checks, invite acceptance, and permission matrix work best when the user sees a clear denial state instead of a blank redirect."
      trustLine="RBAC-ready access control | Operator-safe admin boundaries"
      actions={[
        { href: "/signin", label: "Sign in with another account" },
        { href: "/", label: "Return to homepage", tone: "secondary" },
      ]}
    />
  );
}
