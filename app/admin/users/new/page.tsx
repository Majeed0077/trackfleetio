import { redirect } from "next/navigation";

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
import { adminUserRoleLabelPresets } from "@/lib/server/admin-users";

export default async function AdminInviteUserPage() {
  const currentUser = await getSessionUser();

  if (!isSuperAdminUser(currentUser)) {
    redirect("/unauthorized");
  }

  const inviteRoleOptions = adminUserRoleLabelPresets.filter((roleLabel) => roleLabel !== "Super Admin");

  return (
    <>
      <AdminPageHeader
        title="Invite workspace user"
        description="Create staff users for data entry, content management, support, and operations."
      />
      <AdminFormCard>
        <AdminFormSection title="Invitation details" description="Admin-owned onboarding flow for staff accounts.">
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Full name">
              <AdminTextInput type="text" placeholder="Support Operator" />
            </AdminFieldGroup>
            <AdminFieldGroup label="Work email">
              <AdminTextInput type="email" placeholder="support@trackfleetio.com" />
            </AdminFieldGroup>
          </div>
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Role">
              <AdminSelect defaultValue={inviteRoleOptions[0]}>
                {inviteRoleOptions.map((roleLabel) => (
                  <option key={roleLabel}>{roleLabel}</option>
                ))}
              </AdminSelect>
            </AdminFieldGroup>
            <AdminFieldGroup label="Status">
              <AdminSelect defaultValue="Invited">
                <option>Invited</option>
                <option>Active</option>
                <option>Inactive</option>
              </AdminSelect>
            </AdminFieldGroup>
          </div>
          <AdminFieldGroup label="Welcome note">
            <AdminTextarea placeholder="Explain the workspace scope, shift ownership, and expected first actions." />
          </AdminFieldGroup>
        </AdminFormSection>
      </AdminFormCard>
    </>
  );
}
