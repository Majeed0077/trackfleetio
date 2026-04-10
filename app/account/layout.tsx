import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AccountShell } from "@/components/AccountShell";
import { getSessionUser } from "@/lib/server/auth-session";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/signin?next=/account");
  }

  const description =
    user.role === "admin"
      ? "Manage your profile photo, contact details, and account security."
      : "Manage orders, addresses, notifications, and security preferences.";

  return (
    <AccountShell
      user={user}
      title="My account"
      description={description}
    >
      {children}
    </AccountShell>
  );
}
