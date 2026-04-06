import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminTextarea,
  AdminTextInput,
} from "@/components/admin/AdminUi";

export default function AdminCreateRolePage() {
  return (
    <>
      <AdminPageHeader
        title="Create role"
        description="Define a new role for staff members such as data entry, support, or content review."
      />
      <AdminFormCard>
        <AdminFormSection title="Role definition" description="This should map to the future roles collection.">
          <AdminFieldGroup label="Role name">
            <AdminTextInput type="text" placeholder="Data Entry Operator" />
          </AdminFieldGroup>
          <AdminFieldGroup label="Description">
            <AdminTextarea placeholder="Explain which workflows this role is allowed to handle." />
          </AdminFieldGroup>
          <AdminFieldGroup label="Permissions">
            <AdminTextarea placeholder="products.read&#10;orders.read&#10;orders.write" />
          </AdminFieldGroup>
        </AdminFormSection>
      </AdminFormCard>
    </>
  );
}
