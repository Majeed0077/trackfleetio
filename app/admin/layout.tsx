import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getSessionUser } from "@/lib/server/auth-session";

export const metadata: Metadata = {
  title: "Admin | Track Fleetio",
  description: "Track Fleetio admin workspace for catalog, orders, content, and operations.",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/signin?next=/admin");
  }

  if (user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
