import type { ReactNode } from "react";

import { AccountShell } from "@/components/AccountShell";
import { getSessionUser } from "@/lib/auth";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  return (
    <AccountShell
      user={user}
      title="My account"
      description="Manage orders, addresses, notifications, and security preferences."
    >
      {children}
    </AccountShell>
  );
}
