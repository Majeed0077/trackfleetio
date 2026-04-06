import { AdminPageHeader, AdminPagination, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminSystemHealth } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminSystemHealthPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const systemHealthPagination = getPagination(adminSystemHealth, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="System health"
        description="Operational snapshot for APIs, notifications, payments, and background workflow readiness."
      />
      <AdminTableCard title="Service status" description="This page should evolve into a live runtime and integration health dashboard.">
        <AdminTable
          headers={["Service", "Status", "Detail"]}
          rows={systemHealthPagination.items.map((item) => (
            <tr key={item.service}>
              <td>{item.service}</td>
              <td>{item.status}</td>
              <td>{item.detail}</td>
            </tr>
          ))}
        />
        <AdminPagination {...systemHealthPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
