import Link from "next/link";

import {
  AdminFieldGroup,
  AdminFormCard,
  AdminFormSection,
  AdminPageHeader,
  AdminSelect,
  AdminTextInput,
  AdminTextarea,
  AdminUploadBox,
} from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { getProductById } from "@/data/products";
import { adminCategories } from "@/lib/admin";

type ProductFormPageProps = {
  searchParams: Promise<{ id?: string }>;
};

type ProductFormValues = {
  title: string;
  id: string;
  category: string;
  categoryLabel: string;
  shortDescription: string;
  imageAlt: string;
  price: string;
  sku: string;
  stock: string;
  status: "Draft" | "Live" | "Archived";
  specs: string;
  features: string;
  useCases: string;
  related: string;
  galleryItems: string;
  cardImageClass: string;
};

const emptyProductFormValues: ProductFormValues = {
  title: "",
  id: "",
  category: adminCategories[0]?.name ?? "",
  categoryLabel: adminCategories[0]?.name ?? "",
  shortDescription: "",
  imageAlt: "",
  price: "",
  sku: "",
  stock: "",
  status: "Draft",
  specs: "",
  features: "",
  useCases: "",
  related: "",
  galleryItems: "",
  cardImageClass: "catalog-card-image-gps",
};

function buildProductFormValues(productId?: string): ProductFormValues {
  if (!productId) {
    return emptyProductFormValues;
  }

  const product = getProductById(productId);

  if (!product) {
    return emptyProductFormValues;
  }

  return {
    title: product.title,
    id: product.id,
    category: product.categoryLabel,
    categoryLabel: product.categoryLabel,
    shortDescription: product.shortDescription,
    imageAlt: product.imageAlt,
    price: "",
    sku: "",
    stock: "",
    status: "Live",
    specs: product.specs.join("\n"),
    features: product.features.join("\n"),
    useCases: product.useCases.join("\n"),
    related: product.related.join("\n"),
    galleryItems: product.gallery
      .map((item) => `${item.src} | ${item.alt} | ${item.imageClass}`)
      .join("\n"),
    cardImageClass: product.imageClass,
  };
}

export default async function AdminProductFormPage({ searchParams }: ProductFormPageProps) {
  const params = await searchParams;
  const productId = typeof params.id === "string" ? params.id : undefined;
  const formValues = buildProductFormValues(productId);
  const isEditing = Boolean(productId && formValues.id);

  return (
    <>
      <AdminPageHeader
        title={isEditing ? "Edit product" : "Add product"}
        description={
          isEditing
            ? "Update storefront data, merchandising fields, and product detail content."
            : "Create a new product record with operational fields, pricing, and storefront content."
        }
        actions={
          <>
            <Link className="button button-secondary" href="/admin/products">Back to products</Link>
            <button className="button button-primary" type="button">Save product</button>
          </>
        }
      />

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection title="Quick setup" description="Start with only the fields needed to create a product card and make it visible in admin.">
            <AdminFieldGroup label="Product name"><AdminTextInput type="text" defaultValue={formValues.title} placeholder="4G GPS Device" /></AdminFieldGroup>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Product ID / route key"><AdminTextInput type="text" defaultValue={formValues.id} placeholder="4g-gps-device" /></AdminFieldGroup>
              <AdminFieldGroup label="Category">
                <AdminSelect defaultValue={formValues.category}>
                  {adminCategories.map((category) => (
                    <option key={category.slug} value={category.name}>{category.name}</option>
                  ))}
                </AdminSelect>
              </AdminFieldGroup>
            </div>
            <AdminFieldGroup label="Short description"><AdminTextarea defaultValue={formValues.shortDescription} placeholder="Reliable live fleet tracking hardware for modern telematics visibility." /></AdminFieldGroup>
            <div className={styles.adminFieldQuad}>
              <AdminFieldGroup label="Price"><AdminTextInput type="text" defaultValue={formValues.price} placeholder="189.00" /></AdminFieldGroup>
              <AdminFieldGroup label="Stock"><AdminTextInput type="number" defaultValue={formValues.stock} placeholder="186" /></AdminFieldGroup>
              <AdminFieldGroup label="SKU"><AdminTextInput type="text" defaultValue={formValues.sku} placeholder="TF-4G-110" /></AdminFieldGroup>
              <AdminFieldGroup label="Status">
                <AdminSelect defaultValue={formValues.status}>
                  <option>Draft</option>
                  <option>Live</option>
                  <option>Archived</option>
                </AdminSelect>
              </AdminFieldGroup>
            </div>
          </AdminFormSection>

          <details className={styles.adminDetails} open={isEditing}>
            <summary className={styles.adminDetailsSummary}>
              <span>Advanced content</span>
              <small>Specs, features, related products, gallery, and product-page content fields.</small>
            </summary>
            <div className={styles.adminDetailsBody}>
              <AdminFormSection title="Storefront content" description="These fields are currently used by the catalog cards and product detail pages.">
                <div className={styles.adminFieldRow}>
                  <AdminFieldGroup label="Category label"><AdminTextInput type="text" defaultValue={formValues.categoryLabel} placeholder="Tracking Devices" /></AdminFieldGroup>
                  <AdminFieldGroup label="Primary image alt"><AdminTextInput type="text" defaultValue={formValues.imageAlt} placeholder="4G GPS device" /></AdminFieldGroup>
                </div>
                <AdminFieldGroup label="Specifications">
                  <AdminTextarea defaultValue={formValues.specs} placeholder={"LTE\nGNSS\nCAN Support"} />
                </AdminFieldGroup>
                <AdminFieldGroup label="Features">
                  <AdminTextarea defaultValue={formValues.features} placeholder={"Live vehicle telemetry\nRugged install profile\nOperational visibility"} />
                </AdminFieldGroup>
                <AdminFieldGroup label="Use cases">
                  <AdminTextarea defaultValue={formValues.useCases} placeholder={"Vehicle tracking\nDispatch monitoring\nOperational telemetry"} />
                </AdminFieldGroup>
                <AdminFieldGroup label="Related product IDs">
                  <AdminTextarea defaultValue={formValues.related} placeholder={"gps-tracker\nasset-tracking-device\nfuel-sensors"} />
                </AdminFieldGroup>
              </AdminFormSection>
            </div>
          </details>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection title="Main image" description="Upload the image you want to use for the product card and primary storefront preview.">
            <AdminUploadBox copy="Gallery / images upload shell" action={<button className="button button-secondary" type="button">Upload media</button>} />
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Card image class">
                <AdminTextInput type="text" defaultValue={formValues.cardImageClass} placeholder="catalog-card-image-gps" />
              </AdminFieldGroup>
              <AdminFieldGroup label="Primary image alt">
                <AdminTextInput type="text" defaultValue={formValues.imageAlt} placeholder="4G GPS device" />
              </AdminFieldGroup>
            </div>
          </AdminFormSection>

          <details className={styles.adminDetails}>
            <summary className={styles.adminDetailsSummary}>
              <span>Advanced media & merchandising</span>
              <small>Gallery items and extra media references used by the product page.</small>
            </summary>
            <div className={styles.adminDetailsBody}>
              <AdminFormSection title="Media & merchandising" description="Gallery, key features, and specification shells used by product detail pages.">
                <AdminFieldGroup label="Gallery items">
                  <AdminTextarea defaultValue={formValues.galleryItems} placeholder={"/Products/example.png | Product front view | catalog-card-image-gps"} />
                </AdminFieldGroup>
              </AdminFormSection>
            </div>
          </details>
        </AdminFormCard>
      </section>
    </>
  );
}
