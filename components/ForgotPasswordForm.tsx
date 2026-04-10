"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthShell } from "@/components/AuthShell";
import { TrustFooter } from "@/components/TrustFooter";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"info" | "error">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  return (
    <AuthShell
      cardBadge="Password recovery"
      title="Recover account access"
      description="Enter your work email to receive a reset link, verification reminder, and account recovery guidance."
      visualLabel="Account recovery"
      visualTitle="Protect access for admin, support, and customer teams"
      visualDescription="Reset, verify, and session recovery flows should be visible before the real auth service lands."
      visualImageSrc="/Products/DR03.png"
      visualImageAlt="Track Fleetio recovery flow"
      trustLine="Token-based recovery | Session revocation ready | Audit-friendly access control"
      footer={
        <>
          <TrustFooter text="Password reset emails, verification reminders, and session revocation will be driven by auth tokens." />
          <p className="auth-switch">
            Back to{" "}
            <Link className="auth-switch-link" href="/signin">
              sign in
            </Link>
          </p>
        </>
      }
    >
      <form
        className="auth-form auth-form-premium"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!email.trim()) {
            setTone("error");
            setResetUrl("");
            setMessage("Enter your work email to continue.");
            return;
          }

          setIsSubmitting(true);

          try {
            const response = await fetch("/api/auth/forgot-password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            });

            const payload = (await response.json().catch(() => null)) as
              | { ok?: boolean; message?: string; resetUrl?: string }
              | null;

            if (!response.ok || !payload?.ok) {
              setTone("error");
              setResetUrl("");
              setMessage(payload?.message || "Unable to start password recovery.");
              return;
            }

            setTone("info");
            setMessage(payload.message || "If the account exists, a reset link has been prepared.");
            setResetUrl(payload.resetUrl || "");
          } catch {
            setTone("error");
            setResetUrl("");
            setMessage("Unable to reach the recovery service.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div className="auth-input-group">
          <label htmlFor="forgot-email">Work email</label>
          <input
            className="auth-field"
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ops@company.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
              setResetUrl("");
            }}
          />
        </div>

        <div className="auth-button-group auth-button-group-premium">
          <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Preparing reset link..." : "Send reset link"}
          </button>
          {message ? (
            <p className={`auth-form-status is-${tone}`} aria-live="polite">
              {message}
            </p>
          ) : null}
          {resetUrl ? (
            <p className="auth-form-status is-info" aria-live="polite">
              Development reset link: <Link className="auth-switch-link" href={resetUrl}>Open reset page</Link>
            </p>
          ) : null}
        </div>
      </form>
    </AuthShell>
  );
}
