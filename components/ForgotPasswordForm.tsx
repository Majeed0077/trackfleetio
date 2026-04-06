"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthShell } from "@/components/AuthShell";
import { TrustFooter } from "@/components/TrustFooter";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"info" | "error">("info");

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
        onSubmit={(event) => {
          event.preventDefault();

          if (!email.trim()) {
            setTone("error");
            setMessage("Enter your work email to continue.");
            return;
          }

          setTone("info");
          setMessage("Recovery link staged. In production this will create a reset token and send the email automatically.");
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
            }}
          />
        </div>

        <div className="auth-button-group auth-button-group-premium">
          <button className="button button-primary auth-submit" type="submit">
            Send reset link
          </button>
          {message ? (
            <p className={`auth-form-status is-${tone}`} aria-live="polite">
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </AuthShell>
  );
}
