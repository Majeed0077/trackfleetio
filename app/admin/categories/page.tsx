import Link from "next/link";

import { AdminPageHeader, AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminCategories } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminCategoriesPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoriesPagination = getPagination(adminCategories, resolvedSearchParams);

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
          rows={categoriesPagination.items.map((category) => (
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
        <AdminPagination {...categoriesPagination} searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
