import { AdminListGrid, AdminPageHeader, AdminSectionRow } from "@/components/admin/AdminUi";
import { adminIntegrationItems } from "@/lib/admin";

export default function AdminIntegrationsPage() {
  return (
    <>
      <AdminPageHeader title="Integrations" description="Prepare operational integrations for warehouse, CRM, and analytics systems." />
      <AdminListGrid>
        {adminIntegrationItems.map((item) => (
          <AdminSectionRow
            key={item.title}
            title={item.title}
            description={item.description}
            status={item.status}
            footer={<button className="button button-secondary" type="button">Configure</button>}
          />
        ))}
      </AdminListGrid>
    </>
  );
}
