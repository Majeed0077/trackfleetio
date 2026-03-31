"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppStore } from "@/store/store";

export function SignUpForm() {
  const router = useRouter();
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

            <article className="auth-card auth-card-signup">
              <div className="auth-card-header">
                <h1>Create account</h1>
                <p>Set up enterprise access for your hardware operations</p>
              </div>

              <form
                className="auth-form auth-form-signup"
                noValidate
                onSubmit={async (event) => {
                  event.preventDefault();

                  const nextErrors: Record<string, string> = {};

                  if (!formValues.name.trim()) {
                    nextErrors.name = "Enter your full name.";
                  }

                  if (!formValues.email.trim()) {
                    nextErrors.email = "Enter your work email.";
                  }

                  if (formValues.password.length < 8) {
                    nextErrors.password = "Password must be at least 8 characters.";
                  }

                  if (!formValues.confirmPassword) {
                    nextErrors.confirmPassword = "Confirm your password.";
                  } else if (formValues.confirmPassword !== formValues.password) {
                    nextErrors.confirmPassword = "Passwords do not match.";
                  }

                  setFieldErrors(nextErrors);

                  if (Object.keys(nextErrors).length) {
                    setStatusMessage("Check the highlighted fields and try again.");
                    return;
                  }

                  setIsSubmitting(true);

                  try {
                    const response = await fetch("/api/auth/signup", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "same-origin",
                      body: JSON.stringify({
                        name: formValues.name,
                        email: formValues.email,
                        password: formValues.password,
                        company: formValues.company,
                        phone: formValues.phone,
                      }),
                    });

                    const payload = (await response.json()) as {
                      ok?: boolean;
                      user?: unknown;
                      message?: string;
                    };

                    if (!response.ok || !payload.ok || !payload.user) {
                      setStatusMessage(payload.message || "Unable to create your account.");
                      return;
                    }

                    setAuthUser(payload.user as Parameters<typeof setAuthUser>[0]);
                    router.push("/");
                  } catch {
                    setStatusMessage("Unable to reach the account service.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="auth-form-row auth-form-row-signup-top">
                  <div className={`auth-input-group${fieldErrors.name ? " is-error" : ""}`}>
                    <label htmlFor="signup-name">Full name</label>
                    <input
                      className="auth-field"
                      id="signup-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Abdul Majeed"
                      value={formValues.name}
                      onChange={(event) => {
                        setFormValues((currentValue) => ({ ...currentValue, name: event.target.value }));
                        setFieldErrors((currentValue) => ({ ...currentValue, name: "" }));
                        setStatusMessage("");
                      }}
                    />
                    <span className="auth-field-error" aria-live="polite">
                      {fieldErrors.name || ""}
                    </span>
                  </div>

                  <div className={`auth-input-group${fieldErrors.email ? " is-error" : ""}`}>
                    <label htmlFor="signup-email">Work email</label>
                    <input
                      className="auth-field"
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={formValues.email}
                      onChange={(event) => {
                        setFormValues((currentValue) => ({ ...currentValue, email: event.target.value }));
                        setFieldErrors((currentValue) => ({ ...currentValue, email: "" }));
                        setStatusMessage("");
                      }}
                    />
                    <span className="auth-field-error" aria-live="polite">
                      {fieldErrors.email || ""}
                    </span>
                  </div>
                </div>

                <div className={`auth-input-group${fieldErrors.password ? " is-error" : ""}`}>
                  <label htmlFor="signup-password">Password</label>
                  <div className="auth-input-wrap">
                    <input
                      className="auth-field"
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      value={formValues.password}
                      onChange={(event) => {
                        setFormValues((currentValue) => ({ ...currentValue, password: event.target.value }));
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
                  <p className="auth-password-hint">Minimum 8 characters</p>
                </div>

                <div className={`auth-input-group${fieldErrors.confirmPassword ? " is-error" : ""}`}>
                  <label htmlFor="signup-confirm-password">Confirm password</label>
                  <div className="auth-input-wrap">
                    <input
                      className="auth-field"
                      id="signup-confirm-password"
                      name="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={formValues.confirmPassword}
                      onChange={(event) => {
                        setFormValues((currentValue) => ({
                          ...currentValue,
                          confirmPassword: event.target.value,
                        }));
                        setFieldErrors((currentValue) => ({ ...currentValue, confirmPassword: "" }));
                        setStatusMessage("");
                      }}
                    />
                    <button
                      className="auth-password-toggle"
                      type="button"
                      aria-label={`${showConfirmPassword ? "Hide" : "Show"} password`}
                      onClick={() => setShowConfirmPassword((currentValue) => !currentValue)}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <span className="auth-field-error" aria-live="polite">
                    {fieldErrors.confirmPassword || ""}
                  </span>
                </div>

                <div className="auth-form-row">
                  <div className="auth-input-group">
                    <label htmlFor="signup-company">
                      Company name <span aria-hidden="true">(optional)</span>
                    </label>
                    <input
                      className="auth-field"
                      id="signup-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Logistics"
                      value={formValues.company}
                      onChange={(event) =>
                        setFormValues((currentValue) => ({ ...currentValue, company: event.target.value }))
                      }
                    />
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="signup-phone">
                      Phone <span aria-hidden="true">(optional)</span>
                    </label>
                    <input
                      className="auth-field"
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+92 300 1234567"
                      value={formValues.phone}
                      onChange={(event) =>
                        setFormValues((currentValue) => ({ ...currentValue, phone: event.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="auth-button-group">
                  <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Create account"}
                  </button>
                  <p className={`auth-form-status${statusMessage ? " is-error" : ""}`} aria-live="polite">
                    {statusMessage}
                  </p>
                  <p className="auth-security-note">Used by fleet operators and logistics teams.</p>
                </div>
              </form>

              <p className="auth-switch">
                Already have an account?{" "}
                <Link className="auth-switch-link" href="/signin">
                  Sign in
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
