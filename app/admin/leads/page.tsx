import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminLeads } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminLeadsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const leadsPagination = getPagination(adminLeads, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Leads"
      description="Capture quote requests, inbound prospects, and channel-qualified hardware opportunities."
    >
      <AdminTable
        headers={["Company", "Contact", "Channel", "Interest", "Status"]}
        rows={leadsPagination.items.map((lead) => (
          <tr key={`${lead.company}-${lead.contact}`}>
            <td>{lead.company}</td>
            <td>{lead.contact}</td>
            <td>{lead.channel}</td>
            <td>{lead.interest}</td>
            <td><AdminStatusBadge value={lead.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...leadsPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
