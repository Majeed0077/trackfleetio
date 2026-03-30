import type { Metadata } from "next";

import { SignInForm } from "@/components/SignInForm";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Sign In | Track Fleetio",
    description: "Sign in to your Track Fleetio account to manage fleet hardware operations.",
    path: "/signin",
  });
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; redirect?: string }>;
}) {
  const params = await searchParams;
  const redirectPath = params.next || params.redirect || "";

  return <SignInForm redirectPath={redirectPath} />;
}
