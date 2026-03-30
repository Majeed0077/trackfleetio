"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { productsList } from "@/data/products";

export function ProductCatalogPage({ initialQuery = "" }: { initialQuery?: string }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const normalizedQuery = initialQuery.trim().toLowerCase();
  const filteredProducts = productsList.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.category === activeFilter;
    const searchableText = [
      product.title,
      product.shortDescription,
      product.specs.join(" "),
      product.features.join(" "),
      product.useCases.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = normalizedQuery ? searchableText.includes(normalizedQuery) : true;
    return matchesFilter && matchesQuery;
  });

  const shouldPaginate = activeFilter === "all" && !normalizedQuery;
  const visibleProducts = shouldPaginate
    ? filteredProducts.slice(0, visibleCount)
    : filteredProducts;
  const showLoadMore = shouldPaginate && filteredProducts.length > visibleCount;

  return (
    <main id="main-content" className="site-main">
      <section className="products-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Enterprise Hardware / Product Catalog</span>
            <h1>Fleet Hardware Catalog</h1>
            <p>Enterprise-grade tracking, sensing and video telematics devices.</p>
            <div className="products-hero-actions">
              <Link className="button button-primary" href="/contact">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="products-catalog-nav">
        <div className="container">
          <div className="catalog-filter-bar" aria-label="Product categories">
            {[
              ["all", "All"],
              ["tracking", "Tracking Devices"],
              ["video", "Video Telematics"],
              ["sensors", "Sensors"],
              ["accessories", "Accessories"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`catalog-filter-pill${activeFilter === value ? " is-active" : ""}`}
                type="button"
                onClick={() => {
                  setActiveFilter(value);
                  setVisibleCount(8);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-catalog">
        <div className="container">
          <div className="catalog-grid catalog-grid-unified">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="catalog-load-more" hidden={!showLoadMore}>
            <button
              className="button button-outline"
              type="button"
              onClick={() => setVisibleCount((currentValue) => currentValue + 4)}
            >
              Load more products <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      <section className="content-section section-cta catalog-cta">
        <div className="container">
          <div className="cta-panel">
            <h2>Need help choosing hardware?</h2>
            <Link className="button button-primary" href="/contact">
              Request Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
