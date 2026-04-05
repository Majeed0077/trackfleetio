"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { productsList } from "@/data/products";

export function ProductCatalogPage({ initialQuery = "" }: { initialQuery?: string }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTimeoutRef = useRef<number | null>(null);
  const lastAutoLoadAtCountRef = useRef<number>(-1);

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

  const loadMoreStep = 4;
  const loadMoreDelayMs = 2000;
  const canAutoLoad = shouldPaginate && showLoadMore;

  const loadMore = useMemo(() => {
    return () => {
      if (!shouldPaginate || !showLoadMore || isLoadingMore) {
        return;
      }

      setIsLoadingMore(true);

      if (loadMoreTimeoutRef.current !== null) {
        window.clearTimeout(loadMoreTimeoutRef.current);
      }

      loadMoreTimeoutRef.current = window.setTimeout(() => {
        setVisibleCount((currentValue) => currentValue + loadMoreStep);
        setIsLoadingMore(false);
      }, loadMoreDelayMs);
    };
  }, [isLoadingMore, loadMoreDelayMs, loadMoreStep, shouldPaginate, showLoadMore]);

  useEffect(() => {
    return () => {
      if (loadMoreTimeoutRef.current !== null) {
        window.clearTimeout(loadMoreTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canAutoLoad) {
      return;
    }

    const sentinel = loadMoreSentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry || !entry.isIntersecting) {
          return;
        }

        if (isLoadingMore || !showLoadMore) {
          return;
        }

        if (lastAutoLoadAtCountRef.current === visibleCount) {
          return;
        }

        lastAutoLoadAtCountRef.current = visibleCount;
        loadMore();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [canAutoLoad, isLoadingMore, loadMore, showLoadMore, visibleCount]);

  return (
    <main id="main-content" className="site-main">
      <section className="products-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">B2B Hardware Catalog</span>
              <h1>Hardware for Connected Fleet Solutions</h1>
              <p>Browse tracking, video telematics, and sensing devices used across deployment-ready fleet solutions.</p>
              <div className="products-hero-actions">
                <Link className="button button-secondary" href="/solutions">
                  Explore Solutions
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
                if (loadMoreTimeoutRef.current !== null) {
                  window.clearTimeout(loadMoreTimeoutRef.current);
                  loadMoreTimeoutRef.current = null;
                }

                setIsLoadingMore(false);
                setActiveFilter(value);
                setVisibleCount(8);
                lastAutoLoadAtCountRef.current = -1;
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
              onClick={loadMore}
              disabled={isLoadingMore}
              aria-busy={isLoadingMore ? "true" : "false"}
            >
              {isLoadingMore ? (
                "Loading..."
              ) : (
                <>
                  Load more products <span aria-hidden="true">&rarr;</span>
                </>
              )}
            </button>
          </div>

          <div ref={loadMoreSentinelRef} className="catalog-load-more-sentinel" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
