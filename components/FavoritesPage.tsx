"use client";

import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { QuoteRequestLauncher } from "@/components/QuoteRequestLauncher";
import { getProductById } from "@/data/products";
import { useAppStore, useStoreHydrated } from "@/store/store";

const isDefined = <T,>(value: T | null | undefined): value is T => Boolean(value);

export function FavoritesPage() {
  const hasHydrated = useStoreHydrated();
  const wishlist = useAppStore((state) => state.wishlist);
  const savedProducts = (hasHydrated ? wishlist : []).map((productId) => getProductById(productId)).filter(isDefined);

  return (
    <main id="main-content" className="site-main">
      <section className="products-hero favorites-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Saved Hardware</span>
            <h1>Favorites built for your next quote</h1>
            <p>Keep shortlisted devices here, compare them, then move into a guided quote request when you are ready.</p>
            <div className="products-hero-actions">
              <QuoteRequestLauncher className="button button-primary" label="Get Quote">
                Get Quote
              </QuoteRequestLauncher>
              <Link className="button button-secondary" href="/products">
                Browse More Hardware
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="products-catalog favorites-page">
        <div className="container">
          {!savedProducts.length ? (
            <div className="commerce-empty favorites-empty">
              <p className="cart-drawer-label">Favorites</p>
              <h2>No saved hardware yet</h2>
              <p>Tap the heart icon on any device to keep it here for later review and quote planning.</p>
              <div className="products-hero-actions">
                <Link className="button button-primary" href="/products">
                  Explore Products
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="favorites-summary">
                <p className="cart-drawer-label">Saved list</p>
                <h2>{savedProducts.length} shortlist item{savedProducts.length === 1 ? "" : "s"} ready</h2>
                <p>Open any saved product to compare details or request a quote directly from its page.</p>
              </div>
              <div className="catalog-grid catalog-grid-unified">
                {savedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} prioritizeImage={index === 0} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
