"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppWindow, ArrowLeft, ArrowRight, Camera, LocateFixed, PackageSearch, Radar } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { productsList, type ProductCategory } from "@/data/products";

const PRODUCTS_PER_PAGE = 20;
const MAX_VISIBLE_PAGE_BUTTONS = 5;
const CATEGORY_SCROLL_STEP = 320;

type FilterValue = "all" | ProductCategory;

const PRODUCT_FILTERS: Array<{
  value: FilterValue;
  label: string;
  subtitle: string;
  Icon: typeof AppWindow;
}> = [
  { value: "all", label: "All Hardware", subtitle: "Complete catalog", Icon: AppWindow },
  { value: "tracking", label: "Tracking Devices", subtitle: "GPS and telematics", Icon: LocateFixed },
  { value: "video", label: "Video Telematics", subtitle: "Dashcam and MDVR", Icon: Camera },
  { value: "sensors", label: "Sensors", subtitle: "Fuel, temperature, RFID", Icon: Radar },
  { value: "accessories", label: "Accessories", subtitle: "UPS, relays, add-ons", Icon: PackageSearch },
];

function getVisiblePageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= MAX_VISIBLE_PAGE_BUTTONS) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const halfWindow = Math.floor(MAX_VISIBLE_PAGE_BUTTONS / 2);
  let startPage = Math.max(currentPage - halfWindow, 1);
  let endPage = startPage + MAX_VISIBLE_PAGE_BUTTONS - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - MAX_VISIBLE_PAGE_BUTTONS + 1;
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}

export function ProductCatalogPage({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const categoryRailRef = useRef<HTMLDivElement | null>(null);

  const normalizedQuery = (searchParams.get("q") ?? initialQuery).trim().toLowerCase();
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      tracking: 0,
      video: 0,
      sensors: 0,
      accessories: 0,
    };

    for (const product of productsList) {
      counts[product.category] += 1;
    }

    return counts;
  }, []);

  const scrollCategoryRail = (direction: -1 | 1) => {
    const rail = categoryRailRef.current;
    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction * CATEGORY_SCROLL_STEP,
      behavior: "smooth",
    });
  };

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

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginationStartIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(
    paginationStartIndex,
    paginationStartIndex + PRODUCTS_PER_PAGE,
  );
  const shouldShowPagination = filteredProducts.length > PRODUCTS_PER_PAGE;
  const pageNumbers = useMemo(
    () => getVisiblePageNumbers(safeCurrentPage, totalPages),
    [safeCurrentPage, totalPages],
  );
  const showLeadingEllipsis = pageNumbers[0] > 1;
  const showTrailingEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;
  const rangeStart = filteredProducts.length === 0 ? 0 : paginationStartIndex + 1;
  const rangeEnd = paginationStartIndex + visibleProducts.length;

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
          <div className="catalog-category-rail" aria-label="Product categories">
            <button
              className="catalog-category-scroll-button"
              type="button"
              aria-label="Scroll categories left"
              onClick={() => scrollCategoryRail(-1)}
            >
              <ArrowLeft size={17} strokeWidth={2} />
            </button>
            <div className="catalog-category-scroll" ref={categoryRailRef}>
              <div className="catalog-category-track" role="tablist" aria-label="Product category filters">
                {PRODUCT_FILTERS.map(({ value, label, subtitle, Icon }) => {
                  const count = value === "all" ? productsList.length : categoryCounts[value];
                  const isActive = activeFilter === value;

                  return (
                    <button
                      key={value}
                      className={`catalog-category-item${isActive ? " is-active" : ""}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive ? "true" : "false"}
                      onClick={() => {
                        setActiveFilter(value);
                        setCurrentPage(1);
                      }}
                    >
                      <span className="catalog-category-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span className="catalog-category-copy">
                        <span className="catalog-category-title">{label}</span>
                        <span className="catalog-category-subtitle">{subtitle}</span>
                      </span>
                      <span className="catalog-category-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              className="catalog-category-scroll-button"
              type="button"
              aria-label="Scroll categories right"
              onClick={() => scrollCategoryRail(1)}
            >
              <ArrowRight size={17} strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      <section className="products-catalog">
        <div className="container">
          <div className="catalog-grid catalog-grid-unified">
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} prioritizeImage={index === 0} />
            ))}
          </div>

          <div className="catalog-pagination" hidden={!shouldShowPagination}>
            {shouldShowPagination ? (
              <>
                <div className="catalog-pagination-summary">
                  <span className="catalog-pagination-kicker">Catalog Pages</span>
                  <p className="catalog-pagination-text">
                    Showing <strong>{rangeStart}</strong> to <strong>{rangeEnd}</strong> of{" "}
                    <strong>{filteredProducts.length}</strong> products
                  </p>
                </div>

                <div className="catalog-pagination-controls" aria-label="Product catalog pagination">
                  <button
                    className="catalog-pagination-nav"
                    type="button"
                    onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
                    disabled={safeCurrentPage === 1}
                  >
                    Previous
                  </button>

                  <div className="catalog-pagination-pages">
                    {showLeadingEllipsis ? (
                      <>
                        <button
                          className={`catalog-pagination-page${safeCurrentPage === 1 ? " is-active" : ""}`}
                          type="button"
                          onClick={() => setCurrentPage(1)}
                          aria-current={safeCurrentPage === 1 ? "page" : undefined}
                        >
                          1
                        </button>
                        <span className="catalog-pagination-ellipsis" aria-hidden="true">
                          ...
                        </span>
                      </>
                    ) : null}

                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`catalog-pagination-page${safeCurrentPage === pageNumber ? " is-active" : ""}`}
                        type="button"
                        onClick={() => setCurrentPage(pageNumber)}
                        aria-current={safeCurrentPage === pageNumber ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    {showTrailingEllipsis ? (
                      <>
                        <span className="catalog-pagination-ellipsis" aria-hidden="true">
                          ...
                        </span>
                        <button
                          className={`catalog-pagination-page${safeCurrentPage === totalPages ? " is-active" : ""}`}
                          type="button"
                          onClick={() => setCurrentPage(totalPages)}
                          aria-current={safeCurrentPage === totalPages ? "page" : undefined}
                        >
                          {totalPages}
                        </button>
                      </>
                    ) : null}
                  </div>

                  <button
                    className="catalog-pagination-nav"
                    type="button"
                    onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}
                    disabled={safeCurrentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : null}
          </div>

          <div className="catalog-pagination-empty" hidden={filteredProducts.length > 0}>
            <button
              className="catalog-pagination-single"
              type="button"
              disabled
            >
              No products found
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
