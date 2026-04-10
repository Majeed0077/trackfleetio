import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Reset Password | Track Fleetio",
    description: "Reset your Track Fleetio password and restore account access.",
    path: "/reset-password",
  });
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return <ResetPasswordForm token={token} />;
}
