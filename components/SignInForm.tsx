"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppStore } from "@/store/store";

const getSafeRedirectPath = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/admin")) {
    return "";
  }

  return value;
};

export function SignInForm({ redirectPath = "" }: { redirectPath?: string }) {
  const router = useRouter();
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className="auth-page-main" id="main-content">
      <section className="auth-layout auth-layout-signin">
        <div className="container">
          <div className="auth-signin-shell">
            <aside className="auth-context-panel" aria-label="Platform overview">
              <div className="auth-context-copy">
                <p className="eyebrow">Fleet Platform Access</p>
                <h2>Connected hardware operations for modern fleet teams</h2>
                <p>
                  Sign in to manage telematics hardware, review fleet activity, and keep operational data aligned across deployment workflows.
                </p>
              </div>

              <div className="auth-context-chips" aria-label="Platform highlights">
                <span className="auth-context-chip">Tracking devices</span>
                <span className="auth-context-chip">Video telematics</span>
                <span className="auth-context-chip">Enterprise support</span>
              </div>

              <ul className="auth-context-list" aria-label="Platform capabilities">
                <li>Monitor deployed tracking devices and hardware readiness.</li>
                <li>Review product orders, support workflows, and fulfillment status.</li>
                <li>Coordinate fleet visibility across devices, sensors, and video systems.</li>
                <li>Keep team access and operational updates in one controlled workspace.</li>
              </ul>

              <p className="auth-context-note">
                Structured for fleet operators, logistics teams, and enterprise deployment workflows.
              </p>
            </aside>

            <article className="auth-card">
              <div className="auth-card-header">
                <h1>Sign in</h1>
                <p>Access your fleet hardware platform</p>
              </div>

              <form
                className="auth-form"
                noValidate
                onSubmit={async (event) => {
                  event.preventDefault();

                  const nextErrors: Record<string, string> = {};

                  if (!email.trim()) {
                    nextErrors.email = "Enter your work email.";
                  }

                  if (!password) {
                    nextErrors.password = "Enter your password.";
                  }

                  setFieldErrors(nextErrors);

                  if (Object.keys(nextErrors).length) {
                    setStatusMessage("Check the highlighted fields and try again.");
                    return;
                  }

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

                    const payload = (await response.json()) as {
                      ok?: boolean;
                      user?: unknown;
                      message?: string;
                    };

                    if (!response.ok || !payload.ok || !payload.user) {
                      setFieldErrors({ password: "Invalid email or password." });
                      setStatusMessage(payload.message || "Unable to sign in.");
                      return;
                    }

                    setAuthUser(payload.user as Parameters<typeof setAuthUser>[0]);
                    router.push(getSafeRedirectPath(redirectPath) || "/");
                  } catch {
                    setStatusMessage("Unable to reach the sign-in service.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className={`auth-input-group${fieldErrors.email ? " is-error" : ""}`}>
                  <label htmlFor="signin-email">Email address</label>
                  <input
                    className="auth-field"
                    id="signin-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setFieldErrors((currentValue) => ({ ...currentValue, email: "" }));
                      setStatusMessage("");
                    }}
                  />
                  <span className="auth-field-error" aria-live="polite">
                    {fieldErrors.email || ""}
                  </span>
                </div>

                <div className={`auth-input-group${fieldErrors.password ? " is-error" : ""}`}>
                  <label htmlFor="signin-password">Password</label>
                  <div className="auth-input-wrap">
                    <input
                      className="auth-field"
                      id="signin-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setFieldErrors((currentValue) => ({ ...currentValue, password: "" }));
                        setStatusMessage("");
                      }}
                    />
                    <button
                      className="auth-password-toggle"
                      type="button"
                      aria-label={`${showPassword ? "Hide" : "Show"} password`}
                      onClick={() => setShowPassword((currentValue) => !currentValue)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <span className="auth-field-error" aria-live="polite">
                    {fieldErrors.password || ""}
                  </span>
                </div>

                <div className="auth-meta-row">
                  <label className="auth-checkbox">
                    <input type="checkbox" name="remember" />
                    <span className="auth-checkbox-label">Remember me</span>
                  </label>
                  <Link className="auth-inline-link" href="/contact">
                    Forgot password?
                  </Link>
                </div>

                <div className="auth-button-group">
                  <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                  <p className={`auth-form-status${statusMessage ? " is-error" : ""}`} aria-live="polite">
                    {statusMessage}
                  </p>
                  <p className="auth-security-note">Secure enterprise access</p>
                  <p className="auth-security-note">Demo user: demo@trackfleetio.com / TrackFleet123</p>
                  <p className="auth-security-note">Demo admin: admin@trackfleetio.com / Admin123!</p>
                </div>
              </form>

              <p className="auth-switch">
                Don&apos;t have an account?{" "}
                <Link className="auth-switch-link" href="/signup">
                  Create account
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
