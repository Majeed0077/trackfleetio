import { AdminPageHeader, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminInventory } from "@/lib/admin";

export default function AdminInventoryPage() {
  return (
    <>
      <AdminPageHeader title="Inventory operations" description="Track stock thresholds, replenishment priorities, and hardware availability." />
      <AdminTableCard title="Inventory status" description="Operational stock list with thresholds and action shells.">
        <AdminTable
          headers={["Product", "SKU", "Qty", "Threshold", "Status", "Action"]}
          rows={adminInventory.map((item) => (
            <tr key={item.sku}>
              <td><span className={styles.adminTableTitle}>{item.product}</span></td>
              <td>{item.sku}</td>
              <td>{item.qty}</td>
              <td>{item.threshold}</td>
              <td><AdminStatusBadge value={item.status} /></td>
              <td><button className={styles.adminTextLink} type="button">Update</button></td>
            </tr>
          ))}
        />
      </AdminTableCard>
    </>
  );
}
