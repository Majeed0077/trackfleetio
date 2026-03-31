import Link from "next/link";

import { AdminFieldGroup, AdminFormCard, AdminFormSection, AdminPageHeader, AdminSelect, AdminTextInput, AdminTextarea } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";

export default function AdminCategoryFormPage() {
  return (
    <>
      <AdminPageHeader
        title="Category form"
        description="Structured editor for navigation-facing and catalog-facing category definitions."
        actions={
          <>
            <Link className="button button-secondary" href="/admin/categories">Back to categories</Link>
            <button className="button button-primary" type="button">Save category</button>
          </>
        }
      />

      <AdminFormCard>
        <AdminFormSection title="Category details" description="Storefront-facing copy and taxonomy controls.">
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Name"><AdminTextInput type="text" defaultValue="Tracking Devices" /></AdminFieldGroup>
            <AdminFieldGroup label="Slug"><AdminTextInput type="text" defaultValue="tracking-devices" /></AdminFieldGroup>
          </div>
          <AdminFieldGroup label="Description"><AdminTextarea defaultValue="GPS and telematics hardware used for live fleet visibility and operational monitoring." /></AdminFieldGroup>
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Icon / image"><AdminTextInput type="text" defaultValue="tracker-icon.svg" /></AdminFieldGroup>
            <AdminFieldGroup label="Sort order"><AdminTextInput type="number" defaultValue="1" /></AdminFieldGroup>
          </div>
          <div className={styles.adminFieldRow}>
            <label className={styles.adminToggle}><input type="checkbox" defaultChecked /> Featured category</label>
            <AdminFieldGroup label="Status"><AdminSelect defaultValue="Live"><option>Live</option><option>Draft</option></AdminSelect></AdminFieldGroup>
          </div>
        </AdminFormSection>
      </AdminFormCard>
    </>
  );
}
