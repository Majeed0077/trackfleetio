import { AdminPageHeader, AdminPagination, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminIntegrationItems } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminIntegrationStatusPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const integrationsPagination = getPagination(adminIntegrationItems, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Integration status"
        description="Detailed status shell for warehouse, CRM, analytics, and webhook-style integrations."
      />
      <AdminTableCard title="Connection details" description="Use this page for webhook last-run state, retry counts, and delivery notes.">
        <AdminTable
          headers={["Integration", "Status", "Operational note"]}
          rows={integrationsPagination.items.map((item) => (
            <tr key={item.title}>
              <td>{item.title}</td>
              <td>{item.status}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        />
        <AdminPagination {...integrationsPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
