import { AdminFieldGroup, AdminFormCard, AdminFormSection, AdminPageHeader, AdminSelect, AdminTable, AdminTableCard, AdminTextInput, AdminTextarea } from "@/components/admin/AdminUi";
import { adminNavigationItems } from "@/lib/admin";
import styles from "@/components/admin/Admin.module.css";

export default function AdminContentNavigationPage() {
  return (
    <>
      <AdminPageHeader title="Navigation editor" description="Structured management for header nav labels, links, order, visibility, and submenu shells." actions={<button className="button button-primary" type="button">Add nav item</button>} />
      <AdminTableCard title="Primary navigation items" description="Public website header configuration shell.">
        <AdminTable
          headers={["Label", "Link", "Order", "Visibility", "Action"]}
          rows={adminNavigationItems.map((item) => (
            <tr key={item.label}>
              <td><span className={styles.adminTableTitle}>{item.label}</span></td>
              <td>{item.link}</td>
              <td>{item.order}</td>
              <td>{item.visibility}</td>
              <td><button className={styles.adminTextLink} type="button">Edit</button></td>
            </tr>
          ))}
        />
      </AdminTableCard>
      <AdminFormCard>
        <AdminFormSection title="Submenu shell" description="Prepare nested nav items for future CMS wiring.">
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Parent label"><AdminTextInput type="text" defaultValue="Products" /></AdminFieldGroup>
            <AdminFieldGroup label="Visibility"><AdminSelect defaultValue="Visible"><option>Visible</option><option>Hidden</option></AdminSelect></AdminFieldGroup>
          </div>
          <AdminFieldGroup label="Submenu items"><AdminTextarea defaultValue={"Tracking Devices\nVideo Telematics\nSensors & Accessories"} /></AdminFieldGroup>
        </AdminFormSection>
      </AdminFormCard>
    </>
  );
}
