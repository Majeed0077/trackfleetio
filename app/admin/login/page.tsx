import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Sign In | Track Fleetio",
  description: "Sign in to the Track Fleetio admin workspace.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getSessionUser();
  const params = await searchParams;

  if (user?.role === "admin") {
    redirect(params.next?.startsWith("/admin") ? params.next : "/admin/dashboard");
  }

  return <AdminLoginForm redirectPath={params.next || ""} />;
}
