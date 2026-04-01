"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthShell } from "@/components/AuthShell";
import { PasswordField } from "@/components/PasswordField";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { TrustFooter } from "@/components/TrustFooter";
import { startRouteLoader } from "@/lib/route-loader";
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
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"error" | "info">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFeedback = () => {
    setStatusMessage("");
    setStatusTone("info");
  };

  return (
    <AuthShell
      cardBadge="Secure sign in"
      title="Access your fleet platform"
      description="Sign in with your work account to review hardware, orders, and fleet operations."
      visualLabel="Fleet platform"
      visualTitle="Connected hardware access for modern fleet teams"
      visualDescription="A focused workspace for telematics devices, dashcams, sensors, and deployment operations."
      visualImageSrc="/Products/3Products.png"
      visualImageAlt="Track Fleetio connected hardware bundle"
      trustLine="50K+ devices deployed | 99.9% reliability | 24/7 support"
      footer={
        <>
          <TrustFooter text="Trusted by fleet operators and logistics teams." />
          <p className="auth-switch">
            New to Track Fleetio?{" "}
            <Link className="auth-switch-link" href="/signup">
              Create account
            </Link>
          </p>
        </>
      }
    >
      <div className="auth-social-stack">
        <SocialAuthButtons
          onAction={(provider) => {
            setStatusTone("info");
            setStatusMessage(
              provider === "google"
                ? "Google SSO can be connected for your workspace during setup."
                : "Microsoft SSO can be connected for your workspace during setup.",
            );
          }}
        />
        <div className="auth-divider">or continue with email</div>
      </div>

      <form
        className="auth-form auth-form-premium"
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
            setStatusTone("error");
            setStatusMessage("Check the required fields and try again.");
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
              body: JSON.stringify({ email, password, rememberMe }),
            });

            const payload = (await response.json()) as {
              ok?: boolean;
              user?: unknown;
              message?: string;
            };

            if (!response.ok || !payload.ok || !payload.user) {
              setFieldErrors({ password: "Invalid email or password." });
              setStatusTone("error");
              setStatusMessage(payload.message || "Unable to sign in.");
              return;
            }

            setAuthUser(payload.user as Parameters<typeof setAuthUser>[0]);
            startRouteLoader();
            router.push(getSafeRedirectPath(redirectPath) || "/");
          } catch {
            setStatusTone("error");
            setStatusMessage("Unable to reach the sign-in service.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div className={`auth-input-group${fieldErrors.email ? " is-error" : ""}`}>
          <label htmlFor="signin-email">Work email</label>
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
              resetFeedback();
            }}
          />
          <span className="auth-field-error" aria-live="polite">
            {fieldErrors.email || ""}
          </span>
        </div>

        <PasswordField
          id="signin-password"
          name="password"
          label="Password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          showPassword={showPassword}
          error={fieldErrors.password}
          onChange={(value) => {
            setPassword(value);
            setFieldErrors((currentValue) => ({ ...currentValue, password: "" }));
            resetFeedback();
          }}
          onToggleVisibility={() => setShowPassword((currentValue) => !currentValue)}
        />

        <div className="auth-meta-row auth-meta-row-premium">
          <label className="auth-checkbox">
            <input
              type="checkbox"
              name="remember"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span className="auth-checkbox-label">Remember me</span>
          </label>

          <div className="auth-meta-actions">
            <button
              type="button"
              className="auth-inline-button"
              onClick={() => {
                setStatusTone("info");
                setStatusMessage("Passkeys can be enabled when your workspace is configured.");
              }}
            >
              Use passkey
            </button>
            <Link className="auth-inline-link" href="/contact">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="auth-button-group auth-button-group-premium">
          <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
          <p className={`auth-form-status is-${statusTone}`} aria-live="polite">
            {statusMessage}
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
