import { notFound } from "next/navigation";

import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminSelect,
  AdminTextInput,
  AdminTextarea,
} from "@/components/admin/AdminUi";
import { AdminOrderWorkflowPanel } from "@/components/AdminOrderWorkflowPanel";
import styles from "@/components/admin/Admin.module.css";
import { adminOrderDetails } from "@/lib/admin";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = adminOrderDetails.find((item) => item.id === id);

  if (!order) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        title={`Order ${order.id}`}
        description="Review payment state, fulfillment progress, internal notes, and staff assignment for this order."
        actions={<AdminOrderWorkflowPanel />}
      />

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection title="Customer and logistics" description="Primary customer handoff and shipment data.">
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Customer">
                <AdminTextInput type="text" defaultValue={order.customer} />
              </AdminFieldGroup>
              <AdminFieldGroup label="Assigned staff">
                <AdminTextInput type="text" defaultValue={order.assignedTo} />
              </AdminFieldGroup>
            </div>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Email">
                <AdminTextInput type="email" defaultValue={order.email} />
              </AdminFieldGroup>
              <AdminFieldGroup label="Phone">
                <AdminTextInput type="text" defaultValue={order.phone} />
              </AdminFieldGroup>
            </div>
            <AdminFieldGroup label="Billing address">
              <AdminTextarea defaultValue={order.billing} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Shipping address">
              <AdminTextarea defaultValue={order.shipping} />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection title="Workflow controls" description="Payment, fulfillment, notes, and notification-facing status.">
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Payment status">
                <AdminSelect defaultValue={order.payment}>
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Failed</option>
                  <option>Refunded</option>
                  <option>Canceled</option>
                </AdminSelect>
              </AdminFieldGroup>
              <AdminFieldGroup label="Fulfillment status">
                <AdminSelect defaultValue={order.fulfillment}>
                  <option>Queued</option>
                  <option>Processing</option>
                  <option>Packed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Canceled</option>
                </AdminSelect>
              </AdminFieldGroup>
            </div>
            <AdminFieldGroup label="Internal notes">
              <AdminTextarea defaultValue={order.notes} />
            </AdminFieldGroup>
            <AdminFieldGroup label="Refund or cancel reason">
              <AdminTextarea placeholder="Add reason before triggering cancellation or refund notification." />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection title="Order timeline" description="This should map to order_events in the schema.">
            <ul className="timeline-list">
              {order.timeline.map((item) => (
                <li key={`${item.title}-${item.time}`}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                  <small>{item.time}</small>
                </li>
              ))}
            </ul>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
