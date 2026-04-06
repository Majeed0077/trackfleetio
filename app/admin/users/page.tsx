import Link from "next/link";

import { AdminPageHeader, AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminUsers } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminUsersPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const usersPagination = getPagination(adminUsers, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Users and roles"
        description="Manage admin access, storefront operators, and support roles."
        actions={
          <>
            <Link className="button button-secondary" href="/admin/roles">
              Roles
            </Link>
            <Link className="button button-primary" href="/admin/users/new">
              Invite user
            </Link>
          </>
        }
      />
      <AdminTableCard title="Workspace users" description="Current team members and role assignments for the admin workspace.">
        <AdminTable
          headers={["Name", "Email", "Role", "Status", "Action"]}
          rows={usersPagination.items.map((user) => (
            <tr key={user.email}>
              <td><span className={styles.adminTableTitle}>{user.name}</span></td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><AdminStatusBadge value={user.status} /></td>
              <td><Link className={styles.adminTextLink} href={`/admin/users/manage?email=${encodeURIComponent(user.email)}`}>Manage</Link></td>
            </tr>
          ))}
        />
        <AdminPagination {...usersPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
