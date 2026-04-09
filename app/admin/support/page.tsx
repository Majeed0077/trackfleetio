import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminSupportTickets } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminSupportPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const supportPagination = getPagination(adminSupportTickets, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Support"
      description="Handle customer tickets, installation requests, and post-purchase operational issues."
    >
      <AdminTable
        headers={["Ticket", "Customer", "Topic", "Priority", "Status"]}
        rows={supportPagination.items.map((ticket) => (
          <tr key={ticket.ticketId}>
            <td>{ticket.ticketId}</td>
            <td>{ticket.customer}</td>
            <td>{ticket.topic}</td>
            <td><AdminStatusBadge value={ticket.priority} /></td>
            <td><AdminStatusBadge value={ticket.status} /></td>
          </tr>
        ))}
      />
      <AdminPagination {...supportPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
