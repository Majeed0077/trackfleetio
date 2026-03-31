import { AdminPageHeader, AdminStatusBadge, AdminTable, AdminTableCard, AdminToolbar } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminOrders } from "@/lib/admin";

export default function AdminOrdersPage() {
  return (
    <>
      <AdminPageHeader title="Order operations" description="Track payment state, fulfillment state, and customer handoff for hardware orders." />
      <AdminToolbar
        left={<><span className={styles.adminFilter}>Payment: All</span><span className={styles.adminFilter}>Fulfillment: All</span><span className={styles.adminFilter}>Date: Last 30 days</span></>}
        right={<button className="button button-secondary" type="button">Export orders</button>}
      />
      <AdminTableCard title="Order queue" description="Operational order list with payment and fulfillment tracking shells.">
        <AdminTable
          headers={["Order ID", "Customer", "Date", "Total", "Payment", "Fulfillment", "Action"]}
          rows={adminOrders.map((order) => (
            <tr key={order.id}>
              <td><span className={styles.adminTableTitle}>{order.id}</span></td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td><AdminStatusBadge value={order.payment} /></td>
              <td><AdminStatusBadge value={order.fulfillment} /></td>
              <td><button className={styles.adminTextLink} type="button">View</button></td>
            </tr>
          ))}
        />
      </AdminTableCard>
    </>
  );
}
