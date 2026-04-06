import Link from "next/link";

import { AdminListGrid, AdminPageHeader, AdminPagination, AdminSectionRow } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminNotificationItems } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminNotificationsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const notificationsPagination = getPagination(adminNotificationItems, resolvedSearchParams);

  return (
    <>
      <AdminPageHeader
        title="Notifications"
        description="Control internal admin notifications and operational alerts."
        actions={
          <>
            <Link className="button button-secondary" href="/admin/notifications/templates">Templates</Link>
            <Link className="button button-secondary" href="/admin/notifications/logs">View logs</Link>
          </>
        }
      />
      <AdminListGrid>
        {notificationsPagination.items.map((item) => (
          <AdminSectionRow
            key={item.title}
            title={item.title}
            description={item.description}
            status={item.enabled ? "Live" : "Draft"}
            footer={
              <div className={styles.adminToolbar}>
                <div className={styles.adminToolbarGroup}>
                  <label className={styles.adminToggle}><input type="checkbox" defaultChecked={item.enabled} /> Enabled</label>
                </div>
                <div className={styles.adminToolbarGroup}>
                  <span className={styles.adminFilter}>Email</span>
                  <span className={styles.adminFilter}>Internal</span>
                </div>
              </div>
            }
          />
        ))}
      </AdminListGrid>
      <AdminPagination {...notificationsPagination} searchParams={resolvedSearchParams} />
    </>
  );
}
