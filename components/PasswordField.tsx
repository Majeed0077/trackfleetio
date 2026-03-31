"use client";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  showPassword: boolean;
  error?: string;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
  hint?: string;
  strengthLabel?: string;
  strengthValue?: number;
};

export function PasswordField({
  id,
  name,
  label,
  value,
  placeholder,
  autoComplete,
  showPassword,
  error,
  onChange,
  onToggleVisibility,
  hint,
  strengthLabel,
  strengthValue = 0,
}: PasswordFieldProps) {
  return (
    <div className={`auth-input-group${error ? " is-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <input
          className="auth-field"
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          className="auth-password-toggle"
          type="button"
          aria-label={`${showPassword ? "Hide" : "Show"} password`}
          onClick={onToggleVisibility}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {typeof strengthLabel === "string" ? (
        <div className="auth-password-strength" aria-live="polite">
          <div className="auth-password-strength-track" aria-hidden="true">
            <span
              className={`auth-password-strength-fill auth-password-strength-${strengthLabel.toLowerCase()}`}
              style={{ width: `${Math.max(18, Math.min(strengthValue, 100))}%` }}
            />
          </div>
          <span className="auth-password-strength-label">{strengthLabel}</span>
        </div>
      ) : null}

      {hint ? <p className="auth-password-hint">{hint}</p> : null}
      <span className="auth-field-error" aria-live="polite">
        {error || ""}
      </span>
    </div>
  );
}
