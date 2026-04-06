"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import type { AuthUser } from "@/store/store";

const accountLinks = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/security", label: "Security" },
  { href: "/account/notifications", label: "Notifications" },
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

  return (
    <main className="site-main account-page" id="main-content">
      <section className="products-hero account-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Customer workspace</span>
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
                <p className="account-sidebar-label">Signed in as</p>
                <strong>{user?.name || "Track Fleetio User"}</strong>
                <span>{user?.email || "workspace@trackfleetio.com"}</span>
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
