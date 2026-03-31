import { AdminListGrid, AdminPageHeader, AdminSectionRow } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminNotificationItems } from "@/lib/admin";

export default function AdminNotificationsPage() {
  return (
    <>
      <AdminPageHeader title="Notifications" description="Control internal admin notifications and operational alerts." />
      <AdminListGrid>
        {adminNotificationItems.map((item) => (
          <AdminSectionRow
            key={item.title}
            title={item.title}
            description={item.description}
            status={item.enabled ? "Live" : "Draft"}
            footer={<label className={styles.adminToggle}><input type="checkbox" defaultChecked={item.enabled} /> Enabled</label>}
          />
        ))}
      </AdminListGrid>
    </>
  );
}
