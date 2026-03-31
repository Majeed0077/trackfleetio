import Link from "next/link";
import Image from "next/image";

import { AdminPageHeader, AdminTable, AdminTableCard, AdminToolbar, AdminStatusBadge } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminProducts } from "@/lib/admin";

export default function AdminProductsPage() {
  return (
    <>
      <AdminPageHeader
        title="Product management"
        description="Manage hardware listings, pricing, merchandising status, and operational metadata for the storefront."
        actions={<Link className="button button-primary" href="/admin/product-form">Add product</Link>}
      />
      <AdminToolbar
        left={
          <>
            <label className={styles.adminSearchShell} aria-label="Search products">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="5.5" /><path d="m16 16 4 4" /></svg>
              <input type="search" placeholder="Search products or SKU" />
            </label>
            <span className={styles.adminFilter}>All categories</span>
            <span className={styles.adminFilter}>Status: Any</span>
          </>
        }
        right={<button className="button button-secondary" type="button">Export CSV</button>}
      />
      <AdminTableCard title="Storefront products" description="Current ecommerce-facing product records with operational fields.">
        <AdminTable
          headers={["Image", "Product", "SKU", "Category", "Stock", "Price", "Status", "Actions"]}
          rows={adminProducts.map((product) => (
            <tr key={product.sku}>
              <td><Image className={styles.adminThumbnail} src={product.image} alt={product.name} width={44} height={44} /></td>
              <td><div className={styles.adminInlineStack}><span className={styles.adminTableTitle}>{product.name}</span><small>{product.category}</small></div></td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td><AdminStatusBadge value={product.status} /></td>
              <td><div className={styles.adminActionsInline}><Link className={styles.adminTextLink} href="/admin/product-form">Edit</Link><button className={styles.adminTextLink} type="button">Archive</button></div></td>
            </tr>
          ))}
        />
      </AdminTableCard>
    </>
  );
}
