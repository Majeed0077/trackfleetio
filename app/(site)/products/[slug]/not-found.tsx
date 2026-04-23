import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main id="main-content" className="site-main">
      <section className="products-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Product Catalog</span>
            <h1>Product not found</h1>
            <p>The product you requested is not available. Browse the full catalog instead.</p>
            <div className="products-hero-actions">
              <Link className="button button-primary" href="/products">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
