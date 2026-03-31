import Link from "next/link";

import { AdminPageHeader, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminCategories } from "@/lib/admin";

export default function AdminCategoriesPage() {
  return (
    <>
      <AdminPageHeader
        title="Category management"
        description="Manage storefront-facing category taxonomy and merchandising order."
        actions={<Link className="button button-primary" href="/admin/category-form">Add category</Link>}
      />
      <AdminTableCard title="Storefront categories" description="Current category records with display order and status.">
        <AdminTable
          headers={["Name", "Slug", "Featured", "Order", "Status", "Action"]}
          rows={adminCategories.map((category) => (
            <tr key={category.slug}>
              <td><span className={styles.adminTableTitle}>{category.name}</span></td>
              <td>{category.slug}</td>
              <td>{category.featured}</td>
              <td>{category.order}</td>
              <td><AdminStatusBadge value={category.status} /></td>
              <td><Link className={styles.adminTextLink} href="/admin/category-form">Edit</Link></td>
            </tr>
          ))}
        />
      </AdminTableCard>
    </>
  );
}
