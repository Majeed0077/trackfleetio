import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Forgot Password | Track Fleetio",
    description: "Recover your Track Fleetio account with a password reset link.",
    path: "/forgot-password",
  });
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
