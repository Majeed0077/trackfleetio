import Link from "next/link";

export default function SolutionNotFound() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero industry-directory-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Solutions</span>
            <h1>Solution not found</h1>
            <p>The requested solution page is not available. Browse the solutions directory.</p>
            <div className="products-hero-actions">
              <Link className="button button-primary" href="/solutions">
                Back to Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
