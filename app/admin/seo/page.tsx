import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminSeoRedirects } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminSeoPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const seoPagination = getPagination(adminSeoRedirects, resolvedSearchParams);

  return (
    <AdminTableCard
      title="SEO / Redirects"
      description="Maintain redirects, cleanup old campaign URLs, and protect search-facing route changes."
    >
      <AdminTable
        headers={["Source", "Destination", "Type", "Status"]}
        rows={seoPagination.items.map((redirect) => (
          <tr key={redirect.source}>
            <td>{redirect.source}</td>
            <td>{redirect.destination}</td>
            <td>{redirect.type}</td>
            <td><AdminStatusBadge value={redirect.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...seoPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
