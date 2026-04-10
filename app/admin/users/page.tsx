import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminUsersBoard } from "@/components/admin/AdminUsersBoard";
import { AdminEmptyState, AdminPageHeader, AdminPagination, AdminTableCard } from "@/components/admin/AdminUi";
import { isSuperAdminUser } from "@/lib/admin-access";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";
import { getSessionUser } from "@/lib/server/auth-session";
import { adminUserStatusOptions, getAdminUsers } from "@/lib/server/admin-users";

export default async function AdminUsersPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const currentUser = await getSessionUser();

  if (!isSuperAdminUser(currentUser)) {
    redirect("/unauthorized");
  }

  const resolvedSearchParams = await searchParams;
  const adminUsers = await getAdminUsers();
  const usersPagination = getPagination(adminUsers, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Manage workspace users and account status from one place."
        actions={
          <Link className="button button-primary" href="/admin/users/new">
            Invite user
          </Link>
        }
      />
      <AdminTableCard title="Workspace users" description="Current team members and role assignments for the admin workspace.">
        {usersPagination.items.length ? (
          <>
            <AdminUsersBoard users={usersPagination.items} statusOptions={adminUserStatusOptions} />
            <AdminPagination {...usersPagination} searchParams={resolvedSearchParams} />
          </>
        ) : (
          <AdminEmptyState
            title="No users available"
            description="Create or invite a user first. User cards and modal access controls will appear here automatically."
          />
        )}
      </AdminTableCard>
    </>
  );
}
