"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { ProfileAvatar } from "@/components/ProfileAvatar";
import { useAppStore, type AuthUser } from "@/store/store";

const customerAccountLinks = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/security", label: "Security" },
  { href: "/account/notifications", label: "Notifications" },
];

const adminAccountLinks = [
  { href: "/account/profile", label: "Profile" },
  { href: "/account/security", label: "Security" },
  { href: "/admin/dashboard", label: "Admin dashboard" },
];

export function AccountShell({
  user,
  title,
  description,
  children,
}: {
  user: AuthUser | null;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const authUser = useAppStore((state) => state.authUser);
  const authResolved = useAppStore((state) => state.authResolved);
  const resolvedUser = authResolved ? authUser : user;
  const workspaceLabel = resolvedUser?.role === "admin" ? "Admin workspace" : "Customer workspace";
  const accountLinks = resolvedUser?.role === "admin" ? adminAccountLinks : customerAccountLinks;

  return (
    <main className="site-main account-page" id="main-content">
      <section className="products-hero account-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">{workspaceLabel}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>

      <section className="account-section">
        <div className="container">
          <div className="account-shell">
            <aside className="account-sidebar">
              <div className="account-sidebar-card">
                {resolvedUser ? (
                  <ProfileAvatar
                    alt={`${resolvedUser.name || "User"} avatar`}
                    avatarUrl={resolvedUser.avatarUrl}
                    className="account-sidebar-avatar"
                    gender={resolvedUser.gender}
                    imageClassName="account-sidebar-avatar-image"
                    sizes="56px"
                  />
                ) : null}
                <p className="account-sidebar-label">Signed in as</p>
                <strong>{resolvedUser?.name || "Track Fleetio User"}</strong>
                <span>{resolvedUser?.email || "workspace@trackfleetio.com"}</span>
              </div>

              <nav className="account-nav" aria-label="Account navigation">
                {accountLinks.map((link) => (
                  <Link
                    key={link.href}
                    className={`account-nav-link ${
                      pathname === link.href || (link.href !== "/account" && pathname.startsWith(`${link.href}/`))
                        ? "is-active"
                        : ""
                    }`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <section className="account-content">{children}</section>
          </div>
        </div>
      </section>
    </main>
  );
}
