"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import { AdminIcon } from "@/components/admin/AdminIcons";
import styles from "@/components/admin/Admin.module.css";
import { adminNavSections, adminPageInfo } from "@/lib/admin";
import type { AuthUser } from "@/store/store";

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "AD";

export function AdminShell({ children, user }: { children: ReactNode; user: AuthUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isLoginRoute = pathname === "/admin/login";
  const pageInfo = useMemo(
    () => adminPageInfo[pathname] ?? { title: "Admin", section: "Admin" },
    [pathname],
  );

  if (isLoginRoute) {
    return <div className={styles.adminRoot}>{children}</div>;
  }

  return (
    <div className={`${styles.adminRoot} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.adminShell}>
        <aside className={styles.adminSidebar}>
          <div className={styles.adminSidebarBrand}>
            <Link className="brand" href="/admin/dashboard" aria-label="Track Fleetio admin home">
              <span className="logo-container">
                <Image className="brand-logo" src="/logo.png" alt="Track Fleetio logo" width={164} height={40} style={{ width: "auto", height: "auto" }} />
              </span>
            </Link>
            <span className={styles.adminSidebarBrandLabel}>Admin Panel</span>
          </div>

          <nav className={styles.adminSidebarNav} aria-label="Admin navigation">
            {adminNavSections.map((section) => (
              <section className={styles.adminNavSection} key={section.title}>
                <p className={styles.adminNavSectionTitle}>{section.title}</p>
                <div className={styles.adminNavLinks}>
                  {section.items.map((item) => (
                    <Link
                      key={item.key}
                      className={`${styles.adminNavLink} ${pathname === item.href ? styles.adminNavLinkActive : ""}`}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className={styles.adminNavIcon} aria-hidden="true">
                        <AdminIcon icon={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </nav>

          <div className={styles.adminSidebarFooter}>
            <p className={styles.adminSidebarFooterCopy}>
              Frontend-ready admin workspace with API-backed login and modular styles.
            </p>
            <button
              className="button button-secondary"
              type="button"
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => null);
                router.push("/admin/login");
              }}
            >
              Log out
            </button>
          </div>
        </aside>

        <div className={styles.adminMain}>
          <header className={styles.adminTopbar}>
            <div className={styles.adminTopbarCopy}>
              <p className={styles.adminBreadcrumb}>{pageInfo.section}</p>
              <h1 className={styles.adminTopbarTitle}>{pageInfo.title}</h1>
            </div>
            <div className={styles.adminTopbarActions}>
              <button className={styles.adminMobileToggle} type="button" aria-label="Open admin navigation" onClick={() => setSidebarOpen((value) => !value)}>
                <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              </button>
              <label className={styles.adminSearchShell} aria-label="Admin search">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="5.5" /><path d="m16 16 4 4" /></svg>
                <input type="search" placeholder="Search admin" />
              </label>
              <div className={styles.adminUserMenu}>
                <button className={styles.adminUserTrigger} type="button" aria-label="Open admin account menu" onClick={() => setUserMenuOpen((value) => !value)}>
                  <span className={styles.adminUserAvatar}>{getInitials(user?.name || "Admin")}</span>
                  <span className={styles.adminUserMeta}>
                    <strong>{user?.name || "Admin Operator"}</strong>
                    <span>{user?.roleLabel || "Super Admin"}</span>
                  </span>
                </button>
                {userMenuOpen ? (
                  <div className={styles.adminUserDropdown}>
                    <Link className={styles.adminUserDropdownLink} href="/admin/users">Users &amp; roles</Link>
                    <Link className={styles.adminUserDropdownLink} href="/admin/settings">Site settings</Link>
                    <button
                      className={styles.adminUserDropdownLink}
                      type="button"
                      onClick={async () => {
                        await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => null);
                        router.push("/admin/login");
                      }}
                    >
                      Log out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </header>
          <main className={styles.adminContent}>{children}</main>
        </div>
      </div>
      <button className={styles.adminBackdrop} type="button" aria-label="Close admin navigation" onClick={() => setSidebarOpen(false)} />
    </div>
  );
}
