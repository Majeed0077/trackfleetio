"use client";

import { useEffect, useState } from "react";

import {
  AdminFieldGroup,
  AdminFormSection,
  AdminSelect,
  AdminTextInput,
  AdminTextarea,
  AdminUploadBox,
} from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminCategories } from "@/lib/admin";

export function AdminProductQuickAddModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button className="button button-primary" type="button" onClick={() => setOpen(true)}>
        Add product
      </button>

      {open ? (
        <div className={styles.adminModalBackdrop} role="presentation" onClick={() => setOpen(false)}>
          <div
            className={styles.adminModalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-add-product-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.adminModalHeader}>
              <div className={styles.adminPageHeaderCopy}>
                <h2 className={styles.adminPageHeaderTitle} id="quick-add-product-title">Add product</h2>
                <p className={styles.adminPageHeaderText}>
                  Quick add only. Use the edit screen later for deeper product-page content.
                </p>
              </div>
              <button
                className={styles.adminModalClose}
                type="button"
                aria-label="Close add product modal"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.adminModalScroll}>
              <AdminFormSection title="Quick setup" description="Only the fields needed to create a basic product entry.">
                <AdminFieldGroup label="Product name">
                  <AdminTextInput type="text" placeholder="4G GPS Device" />
                </AdminFieldGroup>
                <div className={styles.adminFieldRow}>
                  <AdminFieldGroup label="Product ID / route key">
                    <AdminTextInput type="text" placeholder="4g-gps-device" />
                  </AdminFieldGroup>
                  <AdminFieldGroup label="Category">
                    <AdminSelect defaultValue={adminCategories[0]?.name ?? ""}>
                      {adminCategories.map((category) => (
                        <option key={category.slug} value={category.name}>{category.name}</option>
                      ))}
                    </AdminSelect>
                  </AdminFieldGroup>
                </div>
                <AdminFieldGroup label="Short description">
                  <AdminTextarea placeholder="Reliable live fleet tracking hardware for modern telematics visibility." />
                </AdminFieldGroup>
                <div className={styles.adminFieldRow}>
                  <AdminFieldGroup label="Price">
                    <AdminTextInput type="text" placeholder="189.00" />
                  </AdminFieldGroup>
                  <AdminFieldGroup label="Stock">
                    <AdminTextInput type="number" placeholder="186" />
                  </AdminFieldGroup>
                </div>
                <div className={styles.adminFieldRow}>
                  <AdminFieldGroup label="SKU">
                    <AdminTextInput type="text" placeholder="TF-4G-110" />
                  </AdminFieldGroup>
                  <AdminFieldGroup label="Status">
                    <AdminSelect defaultValue="Draft">
                      <option>Draft</option>
                      <option>Live</option>
                      <option>Archived</option>
                    </AdminSelect>
                  </AdminFieldGroup>
                </div>
              </AdminFormSection>

              <AdminFormSection title="Main image" description="Primary storefront image only. Additional gallery items can be added later.">
                <AdminUploadBox
                  copy="Main product image upload shell"
                  action={<button className="button button-secondary" type="button">Upload media</button>}
                />
                <div className={styles.adminFieldRow}>
                  <AdminFieldGroup label="Card image class">
                    <AdminTextInput type="text" placeholder="catalog-card-image-gps" />
                  </AdminFieldGroup>
                  <AdminFieldGroup label="Primary image alt">
                    <AdminTextInput type="text" placeholder="4G GPS device" />
                  </AdminFieldGroup>
                </div>
              </AdminFormSection>
            </div>

            <div className={styles.adminModalActions}>
              <button className="button button-secondary" type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="button button-primary" type="button">
                Save product
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
