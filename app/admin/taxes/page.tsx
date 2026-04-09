import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminTaxRules } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminTaxesPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const taxesPagination = getPagination(adminTaxRules, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Tax rules"
      description="Review tax rates, regional exemptions, and pricing rules applied to storefront orders."
    >
      <AdminTable
        headers={["Region", "Type", "Rate", "Scope", "Status"]}
        rows={taxesPagination.items.map((rule) => (
          <tr key={`${rule.region}-${rule.type}`}>
            <td>{rule.region}</td>
            <td>{rule.type}</td>
            <td>{rule.rate}</td>
            <td>{rule.scope}</td>
            <td><AdminStatusBadge value={rule.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...taxesPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
