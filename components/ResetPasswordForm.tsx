"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { AuthShell } from "@/components/AuthShell";
import { PasswordField } from "@/components/PasswordField";
import { TrustFooter } from "@/components/TrustFooter";
import { useAppStore } from "@/store/store";

export function ResetPasswordForm({ token }: { token?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"info" | "error">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resolvedToken = token || searchParams.get("token") || undefined;

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
        onSubmit={async (event) => {
          event.preventDefault();

          if (!resolvedToken) {
            setTone("error");
            setMessage("Reset token is missing. Request a new reset link.");
            return;
          }

          if (password.length < 12) {
            setTone("error");
            setMessage("Password must be at least 12 characters.");
            return;
          }

          if (password !== confirmPassword) {
            setTone("error");
            setMessage("Passwords do not match.");
            return;
          }

          setIsSubmitting(true);

          try {
            const response = await fetch("/api/auth/reset-password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "same-origin",
              body: JSON.stringify({ token: resolvedToken, password, confirmPassword }),
            });

            const payload = (await response.json().catch(() => null)) as
              | { ok?: boolean; message?: string; user?: unknown }
              | null;

            if (!response.ok || !payload?.ok || !payload.user) {
              setTone("error");
              setMessage(payload?.message || "Unable to reset password.");
              return;
            }

            setAuthUser(payload.user as Parameters<typeof setAuthUser>[0]);
            setTone("info");
            setMessage(payload.message || "Password reset successful.");
            router.replace("/account/profile");
          } catch {
            setTone("error");
            setMessage("Unable to reach the reset service.");
          } finally {
            setIsSubmitting(false);
          }
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
          <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving new password..." : "Save new password"}
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
