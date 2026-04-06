import Link from "next/link";

import {
  AdminPagination,
  AdminPageHeader,
  AdminTable,
  AdminTableCard,
} from "@/components/admin/AdminUi";
import { adminPermissionGroups, adminRoleItems } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminRolesPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const rolesPagination = getPagination(adminRoleItems, resolvedSearchParams, "rolesPage");
  const permissionsPagination = getPagination(adminPermissionGroups, resolvedSearchParams, "permissionsPage");

  return (
    <>
      <AdminPageHeader
        title="Roles and permissions"
        description="Define how admin can create staff users, restrict capabilities, and keep workflows role-driven."
        actions={<Link className="button button-primary" href="/admin/roles/new">Create role</Link>}
      />

      <AdminTableCard title="Role templates" description="Current workspace role design before Mongo-backed RBAC is connected.">
        <AdminTable
          headers={["Role", "Members", "Description", "Permissions", "Action"]}
          rows={rolesPagination.items.map((role) => (
            <tr key={role.name}>
              <td>{role.name}</td>
              <td>{role.members}</td>
              <td>{role.description}</td>
              <td>{role.permissions.join(", ")}</td>
              <td><Link className="button button-secondary" href={`/admin/roles/edit?name=${encodeURIComponent(role.name)}`}>Edit</Link></td>
            </tr>
          ))}
        />
        <AdminPagination {...rolesPagination} pageKey="rolesPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>

      <AdminTableCard title="Permission matrix" description="Use this as the basis for a real role-permission collection.">
        <AdminTable
          headers={["Group", "Permissions"]}
          rows={permissionsPagination.items.map((group) => (
            <tr key={group.title}>
              <td>{group.title}</td>
              <td>{group.permissions.join(", ")}</td>
            </tr>
          ))}
        />
        <AdminPagination {...permissionsPagination} pageKey="permissionsPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
