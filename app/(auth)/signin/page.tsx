import { SignInForm } from "@/components/SignInForm";
import { createPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Sign In | Track Fleetio",
  description: "Sign in to your Track Fleetio account to manage fleet hardware operations.",
  path: "/signin",
});

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
