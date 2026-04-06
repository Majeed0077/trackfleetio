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
import { adminRoleItems } from "@/lib/admin";

export default function AdminInviteUserPage() {
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
              <AdminSelect defaultValue={adminRoleItems[1].name}>
                {adminRoleItems.map((role) => (
                  <option key={role.name}>{role.name}</option>
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
