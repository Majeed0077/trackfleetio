"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthShell } from "@/components/AuthShell";
import { PasswordField } from "@/components/PasswordField";
import { TrustFooter } from "@/components/TrustFooter";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"info" | "error">("info");

  return (
    <AuthShell
      cardBadge="Set new password"
      title="Reset your password"
      description="Choose a new password. Production flow will validate a one-time token, rotate sessions, and log the event."
      visualLabel="Session security"
      visualTitle="Recovery should rotate sessions and protect staff access"
      visualDescription="This screen is ready for token validation, password hashing, and session invalidation once the auth schema lands."
      visualImageSrc="/Products/EH21.png"
      visualImageAlt="Track Fleetio secure reset"
      trustLine="Hashed tokens | Session rotation | Admin-safe recovery controls"
      footer={
        <>
          <TrustFooter text="After password reset, old sessions should be revoked and verification state rechecked." />
          <p className="auth-switch">
            Need a new token?{" "}
            <Link className="auth-switch-link" href="/forgot-password">
              Request another reset email
            </Link>
          </p>
        </>
      }
    >
      <form
        className="auth-form auth-form-premium"
        onSubmit={(event) => {
          event.preventDefault();

          if (password.length < 8) {
            setTone("error");
            setMessage("Password must be at least 8 characters.");
            return;
          }

          if (password !== confirmPassword) {
            setTone("error");
            setMessage("Passwords do not match.");
            return;
          }

          setTone("info");
          setMessage("Password reset staged. In production this will verify the token, update passwordHash, and revoke old sessions.");
        }}
      >
        <PasswordField
          id="reset-password"
          name="password"
          label="New password"
          value={password}
          placeholder="Create a secure password"
          autoComplete="new-password"
          showPassword={showPassword}
          onChange={(value) => {
            setPassword(value);
            setMessage("");
          }}
          onToggleVisibility={() => setShowPassword((currentValue) => !currentValue)}
        />

        <PasswordField
          id="reset-confirm-password"
          name="confirmPassword"
          label="Confirm password"
          value={confirmPassword}
          placeholder="Repeat your new password"
          autoComplete="new-password"
          showPassword={showConfirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            setMessage("");
          }}
          onToggleVisibility={() => setShowConfirmPassword((currentValue) => !currentValue)}
        />

        <div className="auth-button-group auth-button-group-premium">
          <button className="button button-primary auth-submit" type="submit">
            Save new password
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
