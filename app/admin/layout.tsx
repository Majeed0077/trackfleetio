import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | Track Fleetio",
  description: "Track Fleetio admin workspace for catalog, orders, content, and operations.",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  return <AdminShell user={user}>{children}</AdminShell>;
}
