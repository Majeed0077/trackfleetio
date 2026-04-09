"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ComparePickerDialog } from "@/components/ComparePickerDialog";
import { getProductHref, getRelatedProducts, products, type Product } from "@/data/products";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { clearRecentComparisons, recordRecentComparison, useRecentComparisons } from "@/lib/compare-history";
import { compareStoreConfig, useCompareActions, useCompareIds } from "@/lib/compare-store";
import { startRouteLoader } from "@/lib/route-loader";

const PRODUCT_IMAGE_WIDTH = 420;
const PRODUCT_IMAGE_HEIGHT = 320;

function getCategoryName(product: Product) {
  return product.categoryLabel || product.category;
}

const SPEC_TABLE_PREFERRED_ORDER = [
  "Video Channels",
  "Encoding",
  "AI Compute",
  "AI Algorithms",
  "Cellular",
  "GNSS",
  "WiFi",
  "Bluetooth",
  "LoRa",
  "Power Input",
  "Power Output",
  "Power",
  "Battery",
  "Charging",
  "Storage",
  "Blind Spot Storage",
  "Interfaces / I-O",
  "SIM / Ports",
  "Ingress Protection",
  "Operating Temperature",
  "Dimensions",
  "Weight",
  "Certification",
  "FOTA / Configurator",
];

type ComparisonPair = {
  ids: [string, string];
  left: Product;
  right: Product;
};

function buildPopularComparisons(): ComparisonPair[] {
  const byCategory = {
    video: Object.values(products).filter((p) => p.category === "video"),
    tracking: Object.values(products).filter((p) => p.category === "tracking"),
    sensors: Object.values(products).filter((p) => p.category === "sensors"),
    accessories: Object.values(products).filter((p) => p.category === "accessories"),
  };

  const pairs: Array<[Product, Product]> = [];

  for (const list of Object.values(byCategory)) {
    if (pairs.length >= 4) {
      break;
    }

    if (list.length >= 2) {
      pairs.push([list[0], list[1]]);
    }

    if (pairs.length >= 4) {
      break;
    }

    if (list.length >= 4) {
      pairs.push([list[2], list[3]]);
    }
  }

  return pairs
    .slice(0, 4)
    .map(([left, right]) => ({ ids: [left.id, right.id], left, right }));
}

export function ComparePageClient() {
  const router = useRouter();
  const ids = useCompareIds();
  const { remove, clear, add, set } = useCompareActions();
  const [pickerOpen, setPickerOpen] = useState(false);
  const recentComparisons = useRecentComparisons();

  const selectedProducts = ids.map((id) => products[id]).filter(Boolean);
  const categorySet = new Set(selectedProducts.map((product) => product.category));
  const crossCategory = categorySet.size > 1;
  const preferredCategory = selectedProducts[0]?.category;
  const canAddMore = selectedProducts.length < compareStoreConfig.maxItems;
  const idsKey = ids.join("|");

  useEffect(() => {
    if (!idsKey) {
      return;
    }

    recordRecentComparison(idsKey.split("|"));
  }, [idsKey]);

  const specTableKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const product of selectedProducts) {
      const table = product.specTable;
      if (!table) {
        continue;
      }
      for (const key of Object.keys(table)) {
        keys.add(key);
      }
    }

    const all = Array.from(keys);
    const preferredIndex = new Map(SPEC_TABLE_PREFERRED_ORDER.map((key, index) => [key, index]));

    all.sort((a, b) => {
      const ai = preferredIndex.get(a);
      const bi = preferredIndex.get(b);
      if (ai !== undefined && bi !== undefined) {
        return ai - bi;
      }
      if (ai !== undefined) {
        return -1;
      }
      if (bi !== undefined) {
        return 1;
      }
      return a.localeCompare(b);
    });

    return all;
  }, [selectedProducts]);

  const suggestedProducts = useMemo(() => {
    const first = selectedProducts[0];
    if (!first) {
      return [];
    }

    const selected = new Set(selectedProducts.map((p) => p.id));
    return getRelatedProducts(first)
      .filter((item) => item.category === first.category)
      .filter((item) => !selected.has(item.id))
      .slice(0, 10);
  }, [selectedProducts]);

  const popularComparisons = useMemo(() => buildPopularComparisons(), []);

  if (selectedProducts.length === 0) {
    return (
      <main id="main-content" className="site-main">
        <section className="compare-page">
          <div className="container">
            <div className="compare-empty">
              <h1>Compare products</h1>
              <p>Select up to {compareStoreConfig.maxItems} products from the catalog to compare.</p>
              <Link className="button button-primary" href="/products">
                Browse products
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className="site-main">
      <section className="compare-page">
        <div className="container">
          <header className="compare-header">
            <div className="compare-header-title">
              <h1>Comparison</h1>
              <p>
                Comparing <strong>{selectedProducts.length}</strong> products
              </p>
            </div>
            <div className="compare-header-actions">
              <button className="button button-secondary" type="button" onClick={clear}>
                Clear all
              </button>
              <button
                className="button button-outline"
                type="button"
                onClick={() => {
                  startRouteLoader();
                  router.push("/products");
                }}
              >
                Back to products
              </button>
            </div>
          </header>

          {crossCategory ? (
            <div className="compare-warning" role="status">
              You are comparing products from different categories. For best results, compare within the same category.
            </div>
          ) : null}

          <div className="compare-top">
            <div className="compare-top-heading">
              <span className="compare-top-label">Comparison slots</span>
              <span className="compare-top-meta">
                {selectedProducts.length}/{compareStoreConfig.maxItems}
              </span>
            </div>
            <div className="compare-top-slots" role="list">
              {selectedProducts.map((product) => (
                <div className="compare-slot" role="listitem" key={`slot-${product.id}`}>
                  <Link className="compare-slot-link" href={getProductHref(product.id)}>
                    <Image
                      className={`catalog-card-image ${product.imageClass}`}
                      src={resolveCloudinaryAsset(product.imageSrc)}
                      alt={product.imageAlt}
                      width={120}
                      height={90}
                    />
                    <span className="compare-slot-copy">
                      <span className="compare-slot-title">{product.title}</span>
                      <span className="compare-slot-meta">{getCategoryName(product)}</span>
                    </span>
                  </Link>
                  <button
                    className="compare-slot-remove"
                    type="button"
                    aria-label={`Remove ${product.title}`}
                    onClick={() => remove(product.id)}
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </div>
              ))}

              {canAddMore ? (
                <button
                  className="compare-slot compare-slot-add"
                  type="button"
                  onClick={() => setPickerOpen(true)}
                >
                  <Plus size={18} strokeWidth={2} />
                  <span>Add product</span>
                </button>
              ) : null}
            </div>
          </div>

          <div className="compare-grid" role="region" aria-label="Product comparison">
            <div className="compare-row compare-row-cards">
              {selectedProducts.map((product) => (
                <article className="compare-product" key={`compare-product-${product.id}`}>
                  <div className="compare-product-toolbar">
                    <span className="compare-product-category">{getCategoryName(product)}</span>
                    <button
                      className="compare-product-remove"
                      type="button"
                      aria-label={`Remove ${product.title} from compare`}
                      onClick={() => remove(product.id)}
                    >
                      <X size={18} strokeWidth={2} />
                    </button>
                  </div>
                  <Link className="compare-product-link" href={getProductHref(product.id)}>
                    <Image
                      className={`catalog-card-image ${product.imageClass}`}
                      src={resolveCloudinaryAsset(product.imageSrc)}
                      alt={product.imageAlt}
                      width={PRODUCT_IMAGE_WIDTH}
                      height={PRODUCT_IMAGE_HEIGHT}
                      sizes="(max-width: 767px) 80vw, (max-width: 1199px) 33vw, 25vw"
                    />
                    <h2>{product.title}</h2>
                    <p className="compare-product-summary">{product.shortDescription}</p>
                  </Link>
                </article>
              ))}
            </div>

            {specTableKeys.length ? (
              <div className="compare-section">
                <h3>Specifications</h3>
                <div className="compare-spec-table" role="table" aria-label="Specifications comparison table">
                  <div className="compare-spec-header" role="row">
                    <div className="compare-spec-cell compare-spec-key" role="columnheader">
                      Specification
                    </div>
                    {selectedProducts.map((product) => (
                      <div
                        key={`spec-col-${product.id}`}
                        className="compare-spec-cell compare-spec-col"
                        role="columnheader"
                      >
                        {product.title}
                      </div>
                    ))}
                  </div>

                  {specTableKeys.map((key) => (
                    <div className="compare-spec-row" role="row" key={`spec-row-${key}`}>
                      <div className="compare-spec-cell compare-spec-key" role="rowheader">
                        {key}
                      </div>
                      {selectedProducts.map((product) => {
                        const value = product.specTable?.[key];
                        return (
                          <div
                            key={`spec-${product.id}-${key}`}
                            className={`compare-spec-cell compare-spec-value${value ? "" : " is-empty"}`}
                            role="cell"
                          >
                            {value || "-"}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="compare-section">
              <h3>Key Specs</h3>
              <div className="compare-row">
                {selectedProducts.map((product) => (
                  <div className="compare-cell" key={`specs-${product.id}`}>
                    <ul className="compare-list">
                      {product.specs.map((spec) => (
                        <li key={`${product.id}-${spec}`}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="compare-section">
              <h3>Features</h3>
              <div className="compare-row">
                {selectedProducts.map((product) => (
                  <div className="compare-cell" key={`features-${product.id}`}>
                    <ul className="compare-list">
                      {product.features.map((feature) => (
                        <li key={`${product.id}-${feature}`}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="compare-section">
              <h3>Use Cases</h3>
              <div className="compare-row">
                {selectedProducts.map((product) => (
                  <div className="compare-cell" key={`usecases-${product.id}`}>
                    <ul className="compare-list">
                      {product.useCases.map((useCase) => (
                        <li key={`${product.id}-${useCase}`}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {suggestedProducts.length ? (
              <div className="compare-section">
                <h3>Suggested comparisons</h3>
                <div className="compare-suggestions">
                  {suggestedProducts.map((product) => (
                    <button
                      key={`suggest-${product.id}`}
                      className="compare-suggestion"
                      type="button"
                      disabled={!canAddMore}
                      onClick={() => {
                        if (!canAddMore) {
                          return;
                        }

                        add(product.id);
                      }}
                    >
                      <Image
                        className={`catalog-card-image ${product.imageClass}`}
                        src={resolveCloudinaryAsset(product.imageSrc)}
                        alt={product.imageAlt}
                        width={120}
                        height={90}
                      />
                      <span className="compare-suggestion-copy">
                        <span className="compare-suggestion-title">{product.title}</span>
                        <span className="compare-suggestion-meta">
                          {product.specs.slice(0, 2).join(" | ")}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {popularComparisons.length ? (
              <div className="compare-section">
                <div className="compare-section-header">
                  <h3>Popular comparisons</h3>
                </div>
                <div className="compare-popular-grid">
                  {popularComparisons.map(({ ids: pairIds, left, right }) => (
                    <button
                      key={`popular-${pairIds.join("-")}`}
                      className="compare-popular-card"
                      type="button"
                      onClick={() => {
                        set(pairIds);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <span className="compare-popular-media">
                        <Image
                          className={`catalog-card-image ${left.imageClass}`}
                          src={resolveCloudinaryAsset(left.imageSrc)}
                          alt={left.imageAlt}
                          width={84}
                          height={64}
                        />
                        <span className="compare-popular-vs" aria-hidden="true">
                          vs
                        </span>
                        <Image
                          className={`catalog-card-image ${right.imageClass}`}
                          src={resolveCloudinaryAsset(right.imageSrc)}
                          alt={right.imageAlt}
                          width={84}
                          height={64}
                        />
                      </span>
                      <span className="compare-popular-copy">
                        <span className="compare-popular-title">
                          {left.title} vs {right.title}
                        </span>
                        <span className="compare-popular-meta">
                          {left.specs.slice(0, 2).join(" | ")} · {right.specs.slice(0, 2).join(" | ")}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {recentComparisons.length ? (
              <div className="compare-section">
                <div className="compare-section-header">
                  <h3>Recent comparisons</h3>
                  <button
                    className="button button-tertiary"
                    type="button"
                    onClick={() => clearRecentComparisons()}
                  >
                    Clear
                  </button>
                </div>
                <div className="compare-recent-grid">
                  {recentComparisons.map((entry) => {
                    const left = products[entry.ids[0]];
                    const right = products[entry.ids[1]];
                    if (!left || !right) {
                      return null;
                    }

                    const key = `recent-${entry.ids.join("-")}-${entry.ts}`;
                    return (
                      <button
                        key={key}
                        className="compare-recent-card"
                        type="button"
                        onClick={() => {
                          set([left.id, right.id]);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <span className="compare-recent-media">
                          <Image
                            className={`catalog-card-image ${left.imageClass}`}
                            src={resolveCloudinaryAsset(left.imageSrc)}
                            alt={left.imageAlt}
                            width={64}
                            height={48}
                          />
                          <span className="compare-recent-vs" aria-hidden="true">
                            vs
                          </span>
                          <Image
                            className={`catalog-card-image ${right.imageClass}`}
                            src={resolveCloudinaryAsset(right.imageSrc)}
                            alt={right.imageAlt}
                            width={64}
                            height={48}
                          />
                        </span>
                        <span className="compare-recent-copy">
                          <span className="compare-recent-title">
                            {left.title} vs {right.title}
                          </span>
                          <span className="compare-recent-meta">
                            {left.categoryLabel || left.category} · {right.categoryLabel || right.category}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <ComparePickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        preferredCategory={preferredCategory}
      />
    </main>
  );
}
