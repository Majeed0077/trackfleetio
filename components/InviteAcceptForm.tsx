"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthShell } from "@/components/AuthShell";
import { PasswordField } from "@/components/PasswordField";
import { TrustFooter } from "@/components/TrustFooter";

export function InviteAcceptForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"info" | "error">("info");

  return (
    <AuthShell
      cardBadge="Team invite"
      title="Accept workspace invitation"
      description="This is the staff onboarding state for content editors, order operators, and data entry users created by admin."
      visualLabel="Role-based access"
      visualTitle="Invite flow should assign role, permissions, and first session"
      visualDescription="This screen prepares the UI for invited staff users before role and token-backed onboarding are connected."
      visualImageSrc="/Products/3Products.png"
      visualImageAlt="Track Fleetio workspace invite"
      trustLine="Admin-created users | Role assignment ready | Invite token workflow"
      footer={
        <>
          <TrustFooter text="Invite acceptance will map to auth tokens, role assignment, and first-login audit logs." />
          <p className="auth-switch">
            Already onboarded?{" "}
            <Link className="auth-switch-link" href="/signin">
              Sign in
            </Link>
          </p>
        </>
      }
    >
      <form
        className="auth-form auth-form-premium"
        onSubmit={(event) => {
          event.preventDefault();

          if (!name.trim() || password.length < 8) {
            setTone("error");
            setMessage("Enter your full name and a password with at least 8 characters.");
            return;
          }

          setTone("info");
          setMessage("Invite acceptance staged. In production this will consume the invite token, activate the staff user, and create a session.");
        }}
      >
        <div className="auth-input-group">
          <label htmlFor="invite-name">Full name</label>
          <input
            className="auth-field"
            id="invite-name"
            type="text"
            placeholder="Areeb Khan"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
            }}
          />
        </div>

        <PasswordField
          id="invite-password"
          name="password"
          label="Create password"
          value={password}
          placeholder="Set your workspace password"
          autoComplete="new-password"
          showPassword={showPassword}
          onChange={(value) => {
            setPassword(value);
            setMessage("");
          }}
          onToggleVisibility={() => setShowPassword((currentValue) => !currentValue)}
        />

        <div className="auth-button-group auth-button-group-premium">
          <button className="button button-primary auth-submit" type="submit">
            Accept invite
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
