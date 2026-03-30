import Link from "next/link";

export default function IndustryNotFoundPage() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero industry-directory-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Industry Solutions</span>
            <h1>Industry not found</h1>
            <p>The requested industry page is not available. Browse the industry directory.</p>
            <div className="products-hero-actions">
              <Link className="button button-primary" href="/industries">
                Back to Industries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
