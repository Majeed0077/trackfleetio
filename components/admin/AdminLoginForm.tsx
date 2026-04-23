"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "@/components/admin/Admin.module.css";
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  getSafeAdminRedirectPath,
} from "@/lib/demo-auth";
import { useAppStore } from "@/store/store";

export function AdminLoginForm({ redirectPath = "" }: { redirectPath?: string }) {
  const router = useRouter();
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const [email, setEmail] = useState("admin@trackfleetio.com");
  const [password, setPassword] = useState("Admin123!");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className={styles.adminLoginShell}>
      <article className={styles.adminLoginCard}>
        <div className={styles.adminLoginHeader}>
          <h1>Admin sign in</h1>
          <p>Access the Track Fleetio operations workspace.</p>
        </div>

        <form
          className={styles.adminLoginForm}
          onSubmit={async (event) => {
            event.preventDefault();
            setStatusMessage("");
            setIsSubmitting(true);

            try {
              const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "same-origin",
                body: JSON.stringify({ email, password }),
              });

              const contentType = response.headers.get("content-type") ?? "";
              const payload = (contentType.includes("application/json") ? await response.json() : null) as {
                ok?: boolean;
                user?: { role?: string };
                message?: string;
              } | null;

              if (response.status === 404) {
                setStatusMessage("Admin sign-in API route is not loaded. Restart the dev server and try again.");
                return;
              }

              if (!response.ok || !payload?.ok || payload.user?.role !== "admin") {
                setStatusMessage(payload?.message || "Admin access is required.");
                return;
              }

              setAuthUser(payload.user as Parameters<typeof setAuthUser>[0]);
              router.replace(getSafeAdminRedirectPath(redirectPath));
            } catch {
              setStatusMessage("Unable to reach the admin sign-in service.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className={styles.adminFieldGroup}>
            <label htmlFor="admin-email">Email</label>
            <input
              className={styles.adminField}
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles.adminFieldGroup}>
            <label htmlFor="admin-password">Password</label>
            <input
              className={styles.adminField}
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className={styles.adminLoginActions}>
            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in to admin"}
            </button>
            <p className={`${styles.adminLoginStatus} ${statusMessage ? styles.adminLoginStatusError : ""}`} aria-live="polite">
              {statusMessage}
            </p>
            <p className={styles.adminLoginDemo}>Demo admin: {DEMO_ADMIN_EMAIL} / {DEMO_ADMIN_PASSWORD}</p>
          </div>
        </form>

        <div className={styles.adminLoginBack}>
          <Link href="/signin">Back to storefront sign in</Link>
        </div>
      </article>
    </div>
  );
}
