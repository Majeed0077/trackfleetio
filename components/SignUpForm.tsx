"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { AuthShell } from "@/components/AuthShell";
import { PasswordField } from "@/components/PasswordField";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { startRouteLoader } from "@/lib/route-loader";
import { useAppStore } from "@/store/store";

const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score += 35;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[a-z]/.test(password)) score += 15;
  if (/\d/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  if (score < 45) {
    return { label: "Weak", value: score || 18 };
  }

  if (score < 75) {
    return { label: "Good", value: score };
  }

  return { label: "Strong", value: score };
};

export function SignUpForm() {
  const router = useRouter();
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"error" | "info">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formValues.password),
    [formValues.password],
  );

  const resetFeedback = () => {
    setStatusMessage("");
    setStatusTone("info");
  };

  return (
    <AuthShell
      cardBadge="Create workspace"
      title="Create your fleet workspace"
      description="Set up a secure account for telematics hardware, device visibility, and enterprise buying."
      visualLabel="Enterprise-ready"
      visualTitle="Built for operators, buyers, and deployment teams"
      visualDescription="A cleaner start for product access, hardware planning, and fleet operations across your organization."
      visualImageSrc="/Products/DR03.png"
      visualImageAlt="Track Fleetio AI dashcam hardware"
      trustLine="Fleet-first onboarding | Multi-region coverage | 24/7 specialist support"
      cardClassName="auth-card-wide"
      footer={
        <p className="auth-switch">
          Already have an account?{" "}
          <Link className="auth-switch-link" href="/signin">
            Sign in
          </Link>
        </p>
      }
    >
      <div className="auth-social-stack">
        <SocialAuthButtons
          onAction={() => {
            resetFeedback();
          }}
        />
        <div className="auth-divider">or create with work email</div>
      </div>

      <form
        className="auth-form auth-form-premium auth-form-signup-premium"
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

          if (!formValues.company.trim()) {
            nextErrors.company = "Enter your company name.";
          }

          if (formValues.password.length < 8) {
            nextErrors.password = "Password must be at least 8 characters.";
          }

          setFieldErrors(nextErrors);

          if (Object.keys(nextErrors).length) {
            setStatusTone("error");
            setStatusMessage("Check the required fields and try again.");
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
              setStatusTone("error");
              setStatusMessage(payload.message || "Unable to create your account.");
              return;
            }

            setAuthUser(payload.user as Parameters<typeof setAuthUser>[0]);
            startRouteLoader();
            router.push("/");
          } catch {
            setStatusTone("error");
            setStatusMessage("Unable to reach the account service.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div className="auth-form-row auth-form-row-premium">
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
                resetFeedback();
              }}
            />
            <span className="auth-field-error" aria-live="polite">
              {fieldErrors.name || ""}
            </span>
          </div>

          <div className={`auth-input-group${fieldErrors.company ? " is-error" : ""}`}>
            <label htmlFor="signup-company">Company name</label>
            <input
              className="auth-field"
              id="signup-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Logistics"
              value={formValues.company}
              onChange={(event) => {
                setFormValues((currentValue) => ({ ...currentValue, company: event.target.value }));
                setFieldErrors((currentValue) => ({ ...currentValue, company: "" }));
                resetFeedback();
              }}
            />
            <span className="auth-field-error" aria-live="polite">
              {fieldErrors.company || ""}
            </span>
          </div>
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
              resetFeedback();
            }}
          />
          <span className="auth-field-error" aria-live="polite">
            {fieldErrors.email || ""}
          </span>
        </div>

        <PasswordField
          id="signup-password"
          name="password"
          label="Password"
          value={formValues.password}
          placeholder="Create a secure password"
          autoComplete="new-password"
          showPassword={showPassword}
          error={fieldErrors.password}
          onChange={(value) => {
            setFormValues((currentValue) => ({ ...currentValue, password: value }));
            setFieldErrors((currentValue) => ({ ...currentValue, password: "" }));
            resetFeedback();
          }}
          onToggleVisibility={() => setShowPassword((currentValue) => !currentValue)}
          hint="Use at least 8 characters with a mix of letters and numbers."
          strengthLabel={formValues.password ? passwordStrength.label : undefined}
          strengthValue={passwordStrength.value}
        />

        <div className="auth-optional-panel">
          <button
            type="button"
            className="auth-inline-button auth-inline-button-strong"
            onClick={() => setShowCompanyDetails((currentValue) => !currentValue)}
            aria-expanded={showCompanyDetails}
            aria-controls="signup-optional-panel"
          >
            {showCompanyDetails ? "Hide extra company details" : "Add company details"}
          </button>

          {showCompanyDetails ? (
            <div className="auth-form-row auth-form-row-premium" id="signup-optional-panel">
              <div className="auth-input-group">
                <label htmlFor="signup-phone">Phone <span aria-hidden="true">(optional)</span></label>
                <input
                  className="auth-field"
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+92 300 1234567"
                  value={formValues.phone}
                  onChange={(event) => {
                    setFormValues((currentValue) => ({ ...currentValue, phone: event.target.value }));
                    resetFeedback();
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="auth-button-group auth-button-group-premium">
          <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
          {statusMessage ? (
            <p className={`auth-form-status is-${statusTone}`} aria-live="polite">
              {statusMessage}
            </p>
          ) : null}
          <p className="auth-legal-copy">
            By continuing, you agree to our{" "}
            <span className="auth-switch-link">Terms</span>{" "}
            and{" "}
            <span className="auth-switch-link">Privacy Policy</span>
            .
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
