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

export default function AdminProductFormPage() {
  return (
    <>
      <AdminPageHeader
        title="Product form"
        description="Structured product editor for hardware listings, operational specs, and storefront visibility."
        actions={
          <>
            <Link className="button button-secondary" href="/admin/products">Back to products</Link>
            <button className="button button-primary" type="button">Save product</button>
          </>
        }
      />

      <section className={styles.adminFormGrid}>
        <AdminFormCard>
          <AdminFormSection title="Core information" description="Primary storefront data and product identity fields.">
            <AdminFieldGroup label="Product name"><AdminTextInput type="text" defaultValue="4G GPS Tracker" /></AdminFieldGroup>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Slug"><AdminTextInput type="text" defaultValue="4g-gps-tracker" /></AdminFieldGroup>
              <AdminFieldGroup label="Category"><AdminSelect defaultValue="Tracking Devices"><option>Tracking Devices</option><option>Video Telematics</option><option>Sensors</option></AdminSelect></AdminFieldGroup>
            </div>
            <AdminFieldGroup label="Short description"><AdminTextarea defaultValue="Reliable live fleet tracking hardware for modern telematics visibility." /></AdminFieldGroup>
            <AdminFieldGroup label="Long description"><AdminTextarea defaultValue="Detailed hardware description, installation notes, compatibility summary, and operational value messaging." /></AdminFieldGroup>
          </AdminFormSection>

          <AdminFormSection title="Pricing & inventory" description="Commerce and stock-related fields used by the storefront and admin reporting.">
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Price"><AdminTextInput type="text" defaultValue="189.00" /></AdminFieldGroup>
              <AdminFieldGroup label="Compare price"><AdminTextInput type="text" defaultValue="219.00" /></AdminFieldGroup>
            </div>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="SKU"><AdminTextInput type="text" defaultValue="TF-4G-110" /></AdminFieldGroup>
              <AdminFieldGroup label="Stock"><AdminTextInput type="number" defaultValue="186" /></AdminFieldGroup>
            </div>
            <div className={styles.adminFieldRow}>
              <AdminFieldGroup label="Warranty"><AdminTextInput type="text" defaultValue="12 months" /></AdminFieldGroup>
              <AdminFieldGroup label="Status"><AdminSelect defaultValue="Live"><option>Live</option><option>Draft</option><option>Archived</option></AdminSelect></AdminFieldGroup>
            </div>
          </AdminFormSection>
        </AdminFormCard>

        <AdminFormCard>
          <AdminFormSection title="Media & merchandising" description="Gallery, key features, and specification shells used by product detail pages.">
            <AdminUploadBox copy="Gallery / images upload shell" action={<button className="button button-secondary" type="button">Upload media</button>} />
            <AdminFieldGroup label="Features"><AdminTextarea defaultValue={"LTE connectivity\nGNSS tracking\nCAN support\nFleet-ready enclosure"} /></AdminFieldGroup>
            <AdminFieldGroup label="Specifications"><AdminTextarea defaultValue={"LTE | GNSS | CAN\nVoltage range\nMounting notes"} /></AdminFieldGroup>
          </AdminFormSection>
        </AdminFormCard>
      </section>
    </>
  );
}
