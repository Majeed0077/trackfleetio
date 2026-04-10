import Link from "next/link";
import { redirect } from "next/navigation";

import {
  AdminEmptyState,
  AdminPageHeader,
  AdminTableCard,
} from "@/components/admin/AdminUi";
import { isSuperAdminUser } from "@/lib/admin-access";
import type { AdminSearchParams } from "@/lib/admin-pagination";
import { getSessionUser } from "@/lib/server/auth-session";

export default async function AdminRolesPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const currentUser = await getSessionUser();

  if (!isSuperAdminUser(currentUser)) {
    redirect("/unauthorized");
  }

  await searchParams;

  return (
    <>
      <AdminPageHeader
        title="Roles"
        description="Role management will appear here once the real RBAC collections and permissions matrix are connected."
        actions={<Link className="button button-primary" href="/admin/roles/new">Create role</Link>}
      />

      <AdminTableCard title="Roles" description="No role definitions are being faked here anymore.">
        <AdminEmptyState
          title="No roles configured yet"
          description="Connect the real roles collection, permissions documents, and assignment flows before exposing RBAC data."
        />
      </AdminTableCard>
    </>
  );
}
