import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminReturns } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminReturnsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const returnsPagination = getPagination(adminReturns, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Returns"
      description="Review return requests, replacement status, and refund-ready order exceptions."
    >
      <AdminTable
        headers={["Request", "Customer", "Order", "Reason", "Status"]}
        rows={returnsPagination.items.map((item) => (
          <tr key={item.requestId}>
            <td>{item.requestId}</td>
            <td>{item.customer}</td>
            <td>{item.orderId}</td>
            <td>{item.reason}</td>
            <td><AdminStatusBadge value={item.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...returnsPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
