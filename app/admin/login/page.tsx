import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Access | Track Fleetio",
  description: "Admin access now uses the shared Track Fleetio sign-in flow.",
};

export default async function AdminLoginPage() {
  redirect("/signin?next=/admin/dashboard");
}
