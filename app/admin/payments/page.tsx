import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminPayments } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminPaymentsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const paymentsPagination = getPagination(adminPayments, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Payments"
      description="Track transaction status, payment methods, and gateway references across storefront orders."
    >
      <AdminTable
        headers={["Order", "Gateway", "Amount", "Method", "Status", "Reference"]}
        rows={paymentsPagination.items.map((payment) => (
          <tr key={payment.reference}>
            <td>{payment.orderId}</td>
            <td>{payment.gateway}</td>
            <td>{payment.amount}</td>
            <td>{payment.method}</td>
            <td><AdminStatusBadge value={payment.status} /></td>
            <td>{payment.reference}</td>
          </tr>
        ))}
      />
      <AdminPagination {...paymentsPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
