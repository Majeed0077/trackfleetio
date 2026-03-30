import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Track Fleetio</span>
            <h1>Page not found</h1>
            <p>The page you requested is not available. Continue browsing the storefront.</p>
            <div className="products-hero-actions">
              <Link className="button button-primary" href="/">
                Back to Home
              </Link>
              <Link className="button button-secondary" href="/products">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
