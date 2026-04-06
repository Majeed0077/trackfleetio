import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPagination,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableCard,
  AdminTextInput,
} from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminInventory, adminInventoryMovements } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminInventoryPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const inventoryPagination = getPagination(adminInventory, resolvedSearchParams, "inventoryPage");
  const movementsPagination = getPagination(adminInventoryMovements, resolvedSearchParams, "movementsPage");

  return (
    <>
      <AdminPageHeader title="Inventory operations" description="Track stock thresholds, reserved units, movements, and hardware availability." />
      <AdminTableCard title="Inventory status" description="Operational stock list with thresholds and reservation visibility.">
        <AdminTable
          headers={["Product", "SKU", "Qty", "Reserved", "Threshold", "Status", "Action"]}
          rows={inventoryPagination.items.map((item) => (
            <tr key={item.sku}>
              <td><span className={styles.adminTableTitle}>{item.product}</span></td>
              <td>{item.sku}</td>
              <td>{item.qty}</td>
              <td>{Math.max(0, item.threshold - 8)}</td>
              <td>{item.threshold}</td>
              <td><AdminStatusBadge value={item.status} /></td>
              <td><button className={styles.adminTextLink} type="button">Adjust</button></td>
            </tr>
          ))}
        />
        <AdminPagination {...inventoryPagination} pageKey="inventoryPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection title="Stock adjustment" description="Prepare quantity corrections, restocks, and manual reservations.">
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="SKU">
                <AdminTextInput type="text" defaultValue="TF-SEN-410" />
              </AdminFieldGroup>
              <AdminFieldGroup label="Adjustment quantity">
                <AdminTextInput type="number" defaultValue="5" />
              </AdminFieldGroup>
            </div>
            <AdminFieldGroup label="Reason">
              <AdminTextInput type="text" defaultValue="Cycle count correction" />
            </AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection title="Threshold configuration" description="Control replenishment alerts and reserved stock visibility.">
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Low stock threshold">
                <AdminTextInput type="number" defaultValue="20" />
              </AdminFieldGroup>
              <AdminFieldGroup label="Reserved stock floor">
                <AdminTextInput type="number" defaultValue="8" />
              </AdminFieldGroup>
            </div>
          </AdminFormSection>
        </AdminFormCard>
      </section>

      <AdminTableCard title="Movement history" description="This should map to inventory movements once the schema is added.">
        <AdminTable
          headers={["Product", "Type", "Quantity", "Reference", "Time"]}
          rows={movementsPagination.items.map((item) => (
            <tr key={`${item.product}-${item.time}`}>
              <td>{item.product}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.reference}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        />
        <AdminPagination {...movementsPagination} pageKey="movementsPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
