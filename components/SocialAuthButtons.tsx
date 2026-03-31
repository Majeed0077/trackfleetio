"use client";

type SocialAuthButtonsProps = {
  onAction: (provider: "google" | "microsoft") => void;
};

export function SocialAuthButtons({ onAction }: SocialAuthButtonsProps) {
  return (
    <div className="auth-social-grid" aria-label="Single sign-on options">
      <button
        type="button"
        className="auth-social-button"
        onClick={() => onAction("google")}
      >
        <span className="auth-social-icon auth-social-icon-google" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M21 12.23c0-.72-.06-1.25-.2-1.8H12v3.38h5.16c-.1.84-.64 2.1-1.84 2.95l-.02.11 2.67 2.03.18.02c1.64-1.48 2.85-3.66 2.85-6.69Z" fill="currentColor" />
            <path d="M12 21c2.52 0 4.64-.81 6.18-2.2l-2.94-2.25c-.78.54-1.84.92-3.24.92-2.46 0-4.54-1.59-5.29-3.79l-.11.01-2.78 2.11-.04.1C5.3 18.97 8.37 21 12 21Z" fill="currentColor" />
            <path d="M6.71 13.68A5.63 5.63 0 0 1 6.4 12c0-.58.11-1.14.29-1.68l-.01-.11-2.82-2.14-.09.04A8.82 8.82 0 0 0 3 12c0 1.41.34 2.75.95 3.95l2.76-2.27Z" fill="currentColor" />
            <path d="M12 6.53c1.78 0 2.98.75 3.67 1.38l2.67-2.55C16.63 3.81 14.52 3 12 3 8.37 3 5.3 5.03 3.77 8.11l2.92 2.21c.76-2.2 2.84-3.79 5.31-3.79Z" fill="currentColor" />
          </svg>
        </span>
        Continue with Google
      </button>

      <button
        type="button"
        className="auth-social-button"
        onClick={() => onAction("microsoft")}
      >
        <span className="auth-social-icon auth-social-icon-microsoft" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 3h8.5v8.5H3V3Zm9.5 0H21v8.5h-8.5V3ZM3 12.5h8.5V21H3v-8.5Zm9.5 0H21V21h-8.5v-8.5Z" fill="currentColor" />
          </svg>
        </span>
        Continue with Microsoft
      </button>
    </div>
  );
}
