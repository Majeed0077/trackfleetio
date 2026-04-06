"use client";

import Link from "next/link";
import { Menu, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import { ThemeLogo } from "@/components/ThemeLogo";
import { AdminIcon } from "@/components/admin/AdminIcons";
import styles from "@/components/admin/Admin.module.css";
import { adminNavSections, adminPageInfo } from "@/lib/admin";
import { startRouteLoader } from "@/lib/route-loader";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pageInfo = useMemo(
    () => adminPageInfo[pathname] ?? { title: "Admin", section: "Admin" },
    [pathname],
  );

  return (
    <div
      className={`${styles.adminRoot} ${sidebarOpen ? styles.sidebarOpen : ""} ${
        sidebarCollapsed ? styles.sidebarCollapsed : ""
      }`}
    >
      <div className={styles.adminShell}>
        <aside className={styles.adminSidebar}>
          <div className={styles.adminSidebarTools}>
            <button
              className={styles.adminSidebarToggle}
              type="button"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setSidebarCollapsed((value) => !value)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={16} strokeWidth={1.9} /> : <PanelLeftClose size={16} strokeWidth={1.9} />}
            </button>
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
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <span className={styles.adminNavIcon} aria-hidden="true">
                        <AdminIcon icon={item.icon} />
                      </span>
                      <span className={styles.adminNavLabel}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </nav>

          <div className={styles.adminSidebarFooter}>
            <p className={styles.adminSidebarFooterCopy}>Simple admin workspace.</p>
            <button
              className="button button-secondary"
              type="button"
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => null);
                startRouteLoader();
                router.push("/signin");
              }}
            >
              Log out
            </button>
          </div>
        </aside>

        <div className={styles.adminMain}>
          <header className={styles.adminTopbar}>
            <div className={styles.adminTopbarLead}>
              <Link className={styles.adminTopbarBrand} href="/admin/dashboard" aria-label="Track Fleetio admin home">
                <ThemeLogo className={styles.adminTopbarBrandLogo} alt="Track Fleetio logo" width={120} height={32} />
              </Link>
              <div className={styles.adminTopbarCopy}>
                <p className={styles.adminBreadcrumb}>{pageInfo.section}</p>
                <h1 className={styles.adminTopbarTitle}>{pageInfo.title}</h1>
              </div>
            </div>
            <div className={styles.adminTopbarActions}>
              <button className={styles.adminMobileToggle} type="button" aria-label="Open admin navigation" onClick={() => setSidebarOpen((value) => !value)}>
                <Menu size={18} strokeWidth={1.9} />
              </button>
              <label className={styles.adminSearchShell} aria-label="Admin search">
                <Search size={17} strokeWidth={1.9} />
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
                        startRouteLoader();
                        router.push("/signin");
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
