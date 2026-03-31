import Link from "next/link";

import {
  AdminActivityCard,
  AdminGridTwo,
  AdminMetricGrid,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableCard,
  AdminTextLink,
} from "@/components/admin/AdminUi";
import { adminMetrics, adminOrders, adminRecentActivity } from "@/lib/admin";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        title="Operations overview"
        description="Monitor catalog readiness, incoming orders, customer activity, and editorial work across the storefront."
        actions={
          <>
            <Link className="button button-secondary" href="/admin/content/homepage">
              Review homepage
            </Link>
            <Link className="button button-primary" href="/admin/product-form">
              Add product
            </Link>
          </>
        }
      />

      <AdminMetricGrid items={adminMetrics} />

      <AdminGridTwo
        primary={
          <AdminTableCard
            title="Recent orders"
            description="Latest storefront orders requiring operational follow-up."
            action={<AdminTextLink href="/admin/orders">View all</AdminTextLink>}
          >
            <AdminTable
              headers={["Order", "Customer", "Date", "Total", "Payment", "Fulfillment"]}
              rows={adminOrders.map((order) => (
                <tr key={order.id}>
                  <td><span>{order.id}</span></td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td><AdminStatusBadge value={order.payment} /></td>
                  <td><AdminStatusBadge value={order.fulfillment} /></td>
                </tr>
              ))}
            />
          </AdminTableCard>
        }
        secondary={
          <AdminActivityCard
            title="Recent activity"
            description="Mock operational events across content, inventory, and order workflows."
            items={adminRecentActivity}
          />
        }
      />
    </>
  );
}
