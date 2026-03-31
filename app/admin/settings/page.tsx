import { AdminFieldGroup, AdminListGrid, AdminPageHeader, AdminSettingsGroup, AdminTextInput, AdminTextarea, AdminUploadBox } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader title="Site settings" description="Global site-level configuration for branding assets, support channels, SEO defaults, and announcements." actions={<button className="button button-primary" type="button">Save settings</button>} />
      <AdminListGrid>
        <AdminSettingsGroup title="General" description="Core site metadata and support-facing identity.">
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Site name"><AdminTextInput type="text" defaultValue="Track Fleetio" /></AdminFieldGroup>
            <AdminFieldGroup label="Support email"><AdminTextInput type="email" defaultValue="support@trackfleetio.com" /></AdminFieldGroup>
          </div>
          <div className={styles.adminFieldRow}>
            <AdminFieldGroup label="Phone"><AdminTextInput type="text" defaultValue="+000 000 0520" /></AdminFieldGroup>
            <AdminFieldGroup label="Announcement bar"><AdminTextInput type="text" defaultValue="Fast deployment for enterprise fleets" /></AdminFieldGroup>
          </div>
        </AdminSettingsGroup>

        <AdminSettingsGroup title="Branding & SEO" description="Logo, social links, and default metadata shells.">
          <AdminUploadBox copy="Logo replacement shell" action={<button className="button button-secondary" type="button">Choose logo</button>} />
          <AdminFieldGroup label="SEO defaults"><AdminTextarea defaultValue={"Default title template\nDefault description\nOpen Graph image shell"} /></AdminFieldGroup>
          <AdminFieldGroup label="Social links"><AdminTextarea defaultValue={"X\nLinkedIn\nInstagram\nYouTube"} /></AdminFieldGroup>
        </AdminSettingsGroup>
      </AdminListGrid>
    </>
  );
}
