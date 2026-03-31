import { AdminPageHeader, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminUsers } from "@/lib/admin";

export default function AdminUsersPage() {
  return (
    <>
      <AdminPageHeader title="Users and roles" description="Manage admin access, storefront operators, and support roles." />
      <AdminTableCard title="Workspace users" description="Current team members and role assignments for the admin workspace.">
        <AdminTable
          headers={["Name", "Email", "Role", "Status", "Action"]}
          rows={adminUsers.map((user) => (
            <tr key={user.email}>
              <td><span className={styles.adminTableTitle}>{user.name}</span></td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><AdminStatusBadge value={user.status} /></td>
              <td><button className={styles.adminTextLink} type="button">Manage</button></td>
            </tr>
          ))}
        />
      </AdminTableCard>
    </>
  );
}
