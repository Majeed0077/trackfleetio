import { AdminPageHeader, AdminSectionList, AdminSectionRow } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";
import { adminHomepageSections } from "@/lib/admin";

export default function AdminContentHomepagePage() {
  return (
    <>
      <AdminPageHeader
        title="Homepage CMS"
        description="Section-based editing for structured homepage content. Layout and design remain controlled in code."
        actions={<><button className="button button-secondary" type="button">Preview homepage</button><button className="button button-primary" type="button">Publish changes</button></>}
      />
      <AdminSectionList>
        {adminHomepageSections.map((section, index) => (
          <AdminSectionRow
            key={section.title}
            title={section.title}
            description={section.desc}
            status={section.status}
            footer={
              <div className={styles.adminToolbar}>
                <div className={styles.adminToolbarGroup}>
                  <span className={styles.adminChip}>Order {index + 1}</span>
                  <label className={styles.adminToggle}><input type="checkbox" defaultChecked={section.visible} /> Visible</label>
                </div>
                <div className={styles.adminToolbarGroup}>
                  <button className="button button-secondary" type="button">Edit</button>
                  <button className="button button-secondary" type="button">Reorder</button>
                </div>
              </div>
            }
          />
        ))}
      </AdminSectionList>
    </>
  );
}
