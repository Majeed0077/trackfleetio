import type { Metadata } from "next";

import { SignUpForm } from "@/components/SignUpForm";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Create Account | Track Fleetio",
    description: "Create a Track Fleetio account to manage hardware deployments and fleet operations.",
    path: "/signup",
  });
}

export default function SignUpPage() {
  return <SignUpForm />;
}
