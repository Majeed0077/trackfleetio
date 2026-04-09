import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

import { AdminPageHeader, AdminPagination, AdminTable, AdminTableCard, AdminToolbar, AdminStatusBadge } from "@/components/admin/AdminUi";
import { AdminProductQuickAddModal } from "@/components/admin/AdminProductQuickAddModal";
import styles from "@/components/admin/Admin.module.css";
import { adminProducts } from "@/lib/admin";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { productsList } from "@/data/products";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function isDashcamTitle(title: string) {
  const normalized = title.trim().toLowerCase();

  if (!normalized) {
    return false;
  }

  if (!(normalized.includes("dashcam") || normalized.includes("dash camera"))) {
    return false;
  }

  // Avoid pulling in accessory camera modules that happen to include "dashcam" in the title.
  if (normalized.includes("camera for dashcam") || (normalized.includes("camera") && normalized.includes("dashcam"))) {
    return false;
  }

  return true;
}

export default async function AdminProductsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const dashcamView = getSingleValue(resolvedSearchParams.view) === "dashcam";
  const searchQuery = getSingleValue(resolvedSearchParams.q).trim().toLowerCase();
  const selectedCategory = getSingleValue(resolvedSearchParams.category) || (dashcamView ? "Video Telematics" : "");
  const selectedStatus = getSingleValue(resolvedSearchParams.status);

  const availableCategories = Array.from(new Set(adminProducts.map((product) => product.category)));
  const availableStatuses = Array.from(new Set(adminProducts.map((product) => product.status)));

  const filteredAdminProducts = adminProducts.filter((product) => {
    const matchesCategory = !selectedCategory || selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === "all" || product.status === selectedStatus;
    const searchableText = [product.name, product.sku, product.category, product.status].join(" ").toLowerCase();
    const matchesQuery = searchQuery ? searchableText.includes(searchQuery) : true;
    const matchesDashcamView = !dashcamView || isDashcamTitle(product.name);

    return matchesDashcamView && matchesCategory && matchesStatus && matchesQuery;
  });

  const filteredStorefrontProducts = productsList.filter((product) => {
    const matchesCategory = !selectedCategory || selectedCategory === "all" || product.categoryLabel === selectedCategory;
    const searchableText = [product.title, product.id, product.shortDescription, product.categoryLabel].join(" ").toLowerCase();
    const matchesQuery = searchQuery ? searchableText.includes(searchQuery) : true;
    const matchesDashcamView = !dashcamView || isDashcamTitle(product.title);

    return matchesDashcamView && matchesCategory && matchesQuery;
  });

  const productsPagination = getPagination(filteredAdminProducts, resolvedSearchParams, "productsPage");
  const storefrontPagination = getPagination(filteredStorefrontProducts, resolvedSearchParams, "catalogPage");

  return (
    <>
      <AdminPageHeader
        title={dashcamView ? "Dashcam catalog" : "Product management"}
        description={
          dashcamView
            ? "Review dashcam hardware listings and content coverage. (Accessory camera modules are hidden in this view.)"
            : "Manage hardware listings, pricing, merchandising status, and operational metadata for the storefront."
        }
        actions={<AdminProductQuickAddModal />}
      />
      <AdminToolbar
        left={
          <form className={styles.adminToolbarGroup} method="get">
            {dashcamView ? <input type="hidden" name="view" value="dashcam" /> : null}
            <label className={styles.adminSearchShell} aria-label="Search products">
              <Search size={17} strokeWidth={1.9} />
              <input type="search" name="q" defaultValue={getSingleValue(resolvedSearchParams.q)} placeholder="Search products or SKU" />
            </label>
            {!dashcamView ? (
              <label className={styles.adminFilterSelect}>
                <span className={styles.adminFilterSelectLabel}>Category</span>
                <select name="category" defaultValue={selectedCategory || "all"}>
                  <option value="all">All categories</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            ) : (
              <input type="hidden" name="category" value={selectedCategory || "Video Telematics"} />
            )}
            {!dashcamView ? (
              <label className={styles.adminFilterSelect}>
                <span className={styles.adminFilterSelectLabel}>Status</span>
                <select name="status" defaultValue={selectedStatus || "all"}>
                  <option value="all">Status: Any</option>
                  {availableStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
            ) : (
              <input type="hidden" name="status" value={selectedStatus || "all"} />
            )}
            <button className="button button-secondary" type="submit">Apply</button>
          </form>
        }
        right={
          <div className={styles.adminToolbarGroup}>
            <Link className="button button-secondary" href="/admin/products?view=dashcam" data-skip-route-loader>
              Dashcams
            </Link>
            <Link className="button button-secondary" href="/admin/products" data-skip-route-loader>
              All
            </Link>
            <button className="button button-secondary" type="button">Export CSV</button>
          </div>
        }
      />
      <AdminTableCard title="Storefront products" description="Current ecommerce-facing product records with operational fields.">
        <AdminTable
          headers={["Image", "Product", "SKU", "Category", "Stock", "Price", "Status", "Actions"]}
          rows={productsPagination.items.map((product) => (
            <tr key={product.sku}>
              <td><Image className={styles.adminThumbnail} src={resolveCloudinaryAsset(product.image)} alt={product.name} width={44} height={44} /></td>
              <td><div className={styles.adminInlineStack}><span className={styles.adminTableTitle}>{product.name}</span><small>{product.category}</small></div></td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td><AdminStatusBadge value={product.status} /></td>
              <td><div className={styles.adminActionsInline}><Link className={styles.adminTextLink} href={`/admin/product-form?id=${encodeURIComponent(product.productId)}`}>Edit</Link><button className={styles.adminTextLink} type="button">Archive</button></div></td>
            </tr>
          ))}
        />
        <AdminPagination {...productsPagination} pageKey="productsPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>

      <AdminTableCard
        title="Actual storefront content coverage"
        description="Real product entries already rendered by catalog and detail pages. This is the content inventory you will want the API to own later."
      >
        <AdminTable
          headers={["Product", "ID", "Category", "Specs", "Features", "Use Cases", "Gallery"]}
          rows={storefrontPagination.items.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.adminInlineStack}>
                  <span className={styles.adminTableTitle}>{product.title}</span>
                  <small>{product.shortDescription}</small>
                </div>
              </td>
              <td>{product.id}</td>
              <td>{product.categoryLabel}</td>
              <td>{product.specs.length}</td>
              <td>{product.features.length}</td>
              <td>{product.useCases.length}</td>
              <td>{product.gallery.length}</td>
            </tr>
          ))}
        />
        <AdminPagination {...storefrontPagination} pageKey="catalogPage" searchParams={resolvedSearchParams} />
      </AdminTableCard>
    </>
  );
}
