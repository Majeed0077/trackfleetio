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
                src="/logo.png"
                alt="Track Fleetio logo"
                width={164}
                height={40}
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

