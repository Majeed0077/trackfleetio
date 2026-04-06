import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminSelect,
  AdminTextInput,
  AdminTextarea,
} from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminUsers } from "@/lib/admin";

export default async function AdminManageUserPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const user = adminUsers.find((item) => item.email === params.email) ?? adminUsers[0];

  return (
    <>
      <AdminPageHeader
        title={`Manage ${user.name}`}
        description="Review status, role assignment, workspace permissions, and account lifecycle controls."
      />
      <AdminFormCard>
        <AdminFormSection title="User profile" description="Staff account state prior to schema-backed role and audit integration.">
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Name">
              <AdminTextInput type="text" defaultValue={user.name} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Email">
              <AdminTextInput type="email" defaultValue={user.email} />
            </AdminFieldGroup>
          </div>
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Role">
              <AdminTextInput type="text" defaultValue={user.role} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Status">
              <AdminSelect defaultValue={user.status}>
                <option>Active</option>
                <option>Invited</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </AdminSelect>
            </AdminFieldGroup>
          </div>
          <AdminFieldGroup label="Admin note">
            <AdminTextarea defaultValue="Use this note field for handover context, training state, or temporary restrictions." />
          </AdminFieldGroup>
          <div className={styles.adminActions}>
            <button className="button button-secondary" type="button">Deactivate user</button>
            <button className="button button-secondary" type="button">Reactivate user</button>
          </div>
        </AdminFormSection>
      </AdminFormCard>
    </>
  );
}
