import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminTextarea,
  AdminTextInput,
} from "@/components/admin/AdminUi";
import { adminRoleItems } from "@/lib/admin";

export default async function AdminEditRolePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const params = await searchParams;
  const role = adminRoleItems.find((item) => item.name === params.name) ?? adminRoleItems[0];

  return (
    <>
      <AdminPageHeader
        title={`Edit ${role.name}`}
        description="Adjust permission sets, member expectations, and role lifecycle before the RBAC schema lands."
      />
      <AdminFormCard>
        <AdminFormSection title="Role details" description="Edit labels and permission scopes.">
          <AdminFieldGroup label="Role name">
            <AdminTextInput type="text" defaultValue={role.name} />
          </AdminFieldGroup>
          <AdminFieldGroup label="Description">
            <AdminTextarea defaultValue={role.description} />
          </AdminFieldGroup>
          <AdminFieldGroup label="Permissions">
            <AdminTextarea defaultValue={role.permissions.join("\n")} />
          </AdminFieldGroup>
        </AdminFormSection>
      </AdminFormCard>
    </>
  );
}
