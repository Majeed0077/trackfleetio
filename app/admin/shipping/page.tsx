import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminShippingZones } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminShippingPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const shippingPagination = getPagination(adminShippingZones, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Shipping"
      description="Configure delivery zones, carrier methods, and expected fulfillment windows."
    >
      <AdminTable
        headers={["Zone", "Method", "Rate", "ETA", "Status"]}
        rows={shippingPagination.items.map((zone) => (
          <tr key={`${zone.zone}-${zone.method}`}>
            <td>{zone.zone}</td>
            <td>{zone.method}</td>
            <td>{zone.rate}</td>
            <td>{zone.eta}</td>
            <td><AdminStatusBadge value={zone.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...shippingPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
