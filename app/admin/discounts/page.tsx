import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminDiscounts } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminDiscountsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const discountsPagination = getPagination(adminDiscounts, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Discounts"
      description="Manage promo codes, usage limits, and seasonal discount rules for the storefront."
    >
      <AdminTable
        headers={["Code", "Type", "Value", "Usage", "Status"]}
        rows={discountsPagination.items.map((discount) => (
          <tr key={discount.code}>
            <td>{discount.code}</td>
            <td>{discount.type}</td>
            <td>{discount.value}</td>
            <td>{discount.usage}</td>
            <td><AdminStatusBadge value={discount.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...discountsPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
