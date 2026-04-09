import Link from "next/link";

import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminOrders } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminOrdersPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const ordersPagination = getPagination(adminOrders, resolvedSearchParams);

  return (
    <>
      <AdminTableCard
        title="Order operations"
        description="Track payment state, fulfillment state, and customer handoff for hardware orders."
        action={
          <div className={styles.adminOrdersCardAction}>
            <div className={styles.adminFilterRowCompact} aria-label="Order filters">
              <span className={styles.adminFilter}>Payment: All</span>
              <span className={styles.adminFilter}>Fulfillment: All</span>
              <span className={styles.adminFilter}>Date: Last 30 days</span>
            </div>
            <button className="button button-secondary" type="button">Export orders</button>
          </div>
        }
      >
        <AdminTable
          headers={["Order ID", "Customer", "Date", "Total", "Payment", "Fulfillment", "Action"]}
          rows={ordersPagination.items.map((order) => (
            <tr key={order.id}>
              <td><span className={styles.adminTableTitle}>{order.id}</span></td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td><AdminStatusBadge value={order.payment} /></td>
              <td><AdminStatusBadge value={order.fulfillment} /></td>
              <td><Link className={styles.adminTextLink} href={`/admin/orders/${order.id.replace(/^#/, "")}`}>View</Link></td>
            </tr>
          ))}
        />
        <AdminPagination {...ordersPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
