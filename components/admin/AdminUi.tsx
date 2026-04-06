import Image from "next/image";
import Link from "next/link";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import styles from "@/components/admin/Admin.module.css";
export { AdminPagination } from "@/components/admin/AdminPagination";

const positiveStatuses = new Set(["live", "paid", "active", "in stock", "shipped", "delivered", "connected"]);
const warningStatuses = new Set(["draft", "pending", "low", "review", "processing", "queued"]);

export function AdminPageHeader({ title, description, actions }: { title: string; description: string; actions?: ReactNode }) {
  return (
    <section className={styles.adminPageHeader}>
      <div className={styles.adminPageHeaderCopy}>
        <h2 className={styles.adminPageHeaderTitle}>{title}</h2>
        <p className={styles.adminPageHeaderText}>{description}</p>
      </div>
      {actions ? <div className={styles.adminActions}>{actions}</div> : null}
    </section>
  );
}

export function AdminToolbar({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  return (
    <section className={styles.adminToolbar}>
      <div className={styles.adminToolbarGroup}>{left}</div>
      <div className={styles.adminToolbarGroup}>{right}</div>
    </section>
  );
}

export function AdminMetricGrid({ items }: { items: ReadonlyArray<{ label: string; value: string; meta: string }> }) {
  return (
    <section className={styles.adminStatGrid}>
      {items.map((item) => (
        <article className={styles.adminStatCard} key={item.label}>
          <span className={styles.adminStatLabel}>{item.label}</span>
          <strong className={styles.adminStatValue}>{item.value}</strong>
          <span className={styles.adminStatMeta}>{item.meta}</span>
        </article>
      ))}
    </section>
  );
}

export function AdminGridTwo({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return <section className={styles.adminGridTwo}>{primary}{secondary}</section>;
}

export function AdminTableCard({ title, description, action, children }: { title: string; description: string; action?: ReactNode; children: ReactNode }) {
  return (
    <article className={styles.adminTableCard}>
      <div className={styles.adminCardHeader}>
        <div>
          <h3 className={styles.adminCardHeaderTitle}>{title}</h3>
          <p className={styles.adminCardHeaderText}>{description}</p>
        </div>
        {action}
      </div>
      <div className={styles.adminTableWrap}>{children}</div>
    </article>
  );
}

export function AdminTable({ headers, rows }: { headers: string[]; rows: ReactNode }) {
  return (
    <table className={styles.adminTable}>
      <thead>
        <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export function AdminStatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();
  const toneClass = positiveStatuses.has(normalized)
    ? styles.adminStatusPositive
    : warningStatuses.has(normalized)
      ? styles.adminStatusWarning
      : styles.adminStatusDanger;

  return <span className={`${styles.adminStatus} ${toneClass}`}>{value}</span>;
}

export function AdminActivityCard({ title, description, items }: { title: string; description: string; items: ReadonlyArray<{ title: string; description: string; time: string }> }) {
  return (
    <article className={styles.adminListCard}>
      <div className={styles.adminCardHeader}>
        <div>
          <h3 className={styles.adminCardHeaderTitle}>{title}</h3>
          <p className={styles.adminCardHeaderText}>{description}</p>
        </div>
      </div>
      <div className={styles.adminActivityList}>
        {items.map((item) => (
          <div className={styles.adminActivityItem} key={`${item.title}-${item.time}`}>
            <strong className={styles.adminActivityTitle}>{item.title}</strong>
            <p className={styles.adminActivityText}>{item.description}</p>
            <time className={styles.adminActivityTime}>{item.time}</time>
          </div>
        ))}
      </div>
    </article>
  );
}

export function AdminFormCard({ children }: { children: ReactNode }) {
  return <article className={styles.adminFormCard}>{children}</article>;
}

export function AdminFormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className={styles.adminFormSection}>
      <div className={styles.adminFormSectionHeader}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

export function AdminFieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.adminFieldGroup}>
      <label>{label}</label>
      {children}
    </div>
  );
}

export const AdminTextInput = (props: InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={styles.adminField} />;
export const AdminTextarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} className={styles.adminField} />;
export const AdminSelect = (props: SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className={styles.adminField} />;

export function AdminUploadBox({ copy, action }: { copy: string; action?: ReactNode }) {
  return (
    <div className={styles.adminUploadBox}>
      <p className={styles.adminMetaText}>{copy}</p>
      {action}
    </div>
  );
}

export function AdminSectionList({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={[styles.adminSectionList, className].filter(Boolean).join(" ")}>{children}</section>;
}

export function AdminSectionRow({
  title,
  description,
  status,
  footer,
  className,
}: {
  title: string;
  description: string;
  status: string;
  footer: ReactNode;
  className?: string;
}) {
  return (
    <article className={[styles.adminSectionCard, className].filter(Boolean).join(" ")}>
      <div className={styles.adminSectionRowHead}>
        <div>
          <h3 className={styles.adminCardHeaderTitle}>{title}</h3>
          <p className={styles.adminSectionCopy}>{description}</p>
        </div>
        <AdminStatusBadge value={status} />
      </div>
      {footer}
    </article>
  );
}

export function AdminListGrid({ children }: { children: ReactNode }) {
  return <section className={styles.adminListGrid}>{children}</section>;
}

export function AdminSettingsGroup({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <article className={styles.adminSettingsGroup}>
      <div className={styles.adminSettingsGroupHead}>
        <div>
          <h3 className={styles.adminSettingsGroupTitle}>{title}</h3>
          <p className={styles.adminSettingsGroupText}>{description}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

export function AdminMediaGrid({ items }: { items: ReadonlyArray<{ name: string; meta: string; image: string }> }) {
  return (
    <section className={styles.adminMediaGrid}>
      {items.map((item) => (
        <article className={styles.adminMediaCard} key={item.name}>
          <Image className={styles.adminMediaThumb} src={item.image} alt={item.name} width={320} height={240} />
          <div className={styles.adminMediaCardHead}>
            <div>
              <h3 className={styles.adminMediaCardTitle}>{item.name}</h3>
              <p className={styles.adminMediaCardText}>{item.meta}</p>
            </div>
            <button className={styles.adminTextLink} type="button">Select</button>
          </div>
          <div className={styles.adminFieldGroup}>
            <label>Alt text</label>
            <input className={styles.adminField} type="text" defaultValue={item.name.replace(/\.[^.]+$/, "").replace(/-/g, " ")} />
          </div>
        </article>
      ))}
    </section>
  );
}

export function AdminEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <section className={styles.adminEmptyState}>
      <strong className={styles.adminCardHeaderTitle}>{title}</strong>
      <p className={styles.adminMetaText}>{description}</p>
    </section>
  );
}

export function AdminTextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className={styles.adminTextLink} href={href}>{children}</Link>;
}
