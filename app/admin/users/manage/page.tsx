import { redirect } from "next/navigation";

import { updateAdminUserQuickSettings } from "@/app/admin/users/actions";
import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminSelect,
  AdminTextInput,
  AdminTextarea,
} from "@/components/admin/AdminUi";
import { isSuperAdminUser } from "@/lib/admin-access";
import styles from "@/components/admin/Admin.module.css";
import { getSessionUser } from "@/lib/server/auth-session";
import { adminUserStatusOptions, getAdminRoleLabelOptions, getAdminUserByEmail } from "@/lib/server/admin-users";

export default async function AdminManageUserPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const currentUser = await getSessionUser();

  if (!isSuperAdminUser(currentUser)) {
    redirect("/unauthorized");
  }

  const params = await searchParams;
  const user = await getAdminUserByEmail(params.email);

  if (!user) {
    return null;
  }

  const roleLabelOptions = getAdminRoleLabelOptions(user.roleLabel);

  return (
    <>
      <AdminPageHeader
        title={`Manage ${user.name}`}
        description="Review status, role assignment, workspace permissions, and account lifecycle controls."
      />
      <AdminFormCard>
        <AdminFormSection title="User profile" description="Staff account state prior to schema-backed role and audit integration.">
          <form action={updateAdminUserQuickSettings} className={styles.adminFormSection}>
            <input type="hidden" name="userId" value={user.id} />
            <input type="hidden" name="userEmail" value={user.email} />

            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Name">
                <AdminTextInput type="text" defaultValue={user.name} disabled />
              </AdminFieldGroup>
              <AdminFieldGroup label="Email">
                <AdminTextInput type="email" defaultValue={user.email} disabled />
              </AdminFieldGroup>
            </div>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Role label">
                <AdminSelect name="roleLabel" defaultValue={user.roleLabel}>
                  {roleLabelOptions.map((roleLabel) => (
                    <option key={roleLabel} value={roleLabel}>{roleLabel}</option>
                  ))}
                </AdminSelect>
              </AdminFieldGroup>
              <AdminFieldGroup label="Status">
                <AdminSelect name="status" defaultValue={user.status}>
                  {adminUserStatusOptions.map((statusOption) => (
                    <option key={statusOption.value} value={statusOption.value}>{statusOption.label}</option>
                  ))}
                </AdminSelect>
              </AdminFieldGroup>
            </div>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="System access">
                <AdminTextInput
                  type="text"
                  defaultValue={user.role === "admin" ? "Admin access" : "Customer access"}
                  disabled
                />
              </AdminFieldGroup>
              <AdminFieldGroup label="Last login">
                <AdminTextInput
                  type="text"
                  defaultValue={user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Not yet"}
                  disabled
                />
              </AdminFieldGroup>
            </div>
            <AdminFieldGroup label="Admin note">
              <AdminTextarea defaultValue="Use this note field for handover context, training state, or temporary restrictions." />
            </AdminFieldGroup>
            <div className={styles.adminActions}>
              <button className="button button-primary" type="submit">Save user access</button>
            </div>
          </form>
        </AdminFormSection>
      </AdminFormCard>
    </>
  );
}
