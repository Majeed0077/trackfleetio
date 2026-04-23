import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { createPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Reset Password | Track Fleetio",
  description: "Reset your Track Fleetio password and restore account access.",
  path: "/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
