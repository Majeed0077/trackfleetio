import Image from "next/image";
import Link from "next/link";

export function AuthHeader() {
  return (
    <header className="auth-page-header">
      <div className="container">
        <div className="auth-page-header-shell">
          <Link className="brand" href="/" aria-label="Track Fleetio home">
            <span className="logo-container">
              <Image
                className="brand-logo"
                src="/New-logo.png"
                alt="Track Fleetio logo"
                width={164}
                height={40}
                priority
                style={{ width: "104px", height: "72px" }}
              />
            </span>
          </Link>

          <div className="auth-header-meta">
            <span className="auth-header-trust">Secure workspace</span>
            <Link className="auth-header-link" href="/">
              Back to site
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

