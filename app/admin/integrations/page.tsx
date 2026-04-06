import Link from "next/link";

import { AdminListGrid, AdminPageHeader, AdminPagination, AdminSectionRow } from "@/components/admin/AdminUi";
import { adminIntegrationItems } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminIntegrationsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const integrationsPagination = getPagination(adminIntegrationItems, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Integrations"
        description="Prepare operational integrations for warehouse, CRM, and analytics systems."
        actions={<Link className="button button-secondary" href="/admin/integrations/status">View status</Link>}
      />
      <AdminListGrid>
        {integrationsPagination.items.map((item) => (
          <AdminSectionRow
            key={item.title}
            title={item.title}
            description={item.description}
            status={item.status}
            footer={<button className="button button-secondary" type="button">Configure</button>}
          />
        ))}
      </AdminListGrid>
      <AdminPagination {...integrationsPagination} searchParams={resolvedSearchParams} />
    </>
  );
}
