import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminNewsletterSubscribers } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminNewsletterPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const newsletterPagination = getPagination(adminNewsletterSubscribers, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Newsletter"
      description="Track subscriber sources, list quality, and audience segments used for outbound updates."
    >
      <AdminTable
        headers={["Email", "Segment", "Source", "Status"]}
        rows={newsletterPagination.items.map((subscriber) => (
          <tr key={subscriber.email}>
            <td>{subscriber.email}</td>
            <td>{subscriber.segment}</td>
            <td>{subscriber.source}</td>
            <td><AdminStatusBadge value={subscriber.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...newsletterPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
