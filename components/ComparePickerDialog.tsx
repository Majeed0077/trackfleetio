"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

import { productsList, type Product } from "@/data/products";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { compareStoreConfig, useCompareActions, useCompareIds } from "@/lib/compare-store";

const ITEM_IMAGE_WIDTH = 64;
const ITEM_IMAGE_HEIGHT = 48;

type ComparePickerDialogProps = {
  open: boolean;
  onClose: () => void;
  preferredCategory?: Product["category"];
};

export function ComparePickerDialog({
  open,
  onClose,
  preferredCategory,
}: ComparePickerDialogProps) {
  const ids = useCompareIds();
  const { add } = useCompareActions();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const items = useMemo(() => {
    const selected = new Set(ids);
    const base = productsList.filter((product) => !selected.has(product.id));

    const byCategory = preferredCategory
      ? base.filter((product) => product.category === preferredCategory)
      : base;

    if (!normalizedQuery) {
      return byCategory.slice(0, 30);
    }

    const filtered = byCategory.filter((product) => {
      const haystack = [
        product.title,
        product.categoryLabel,
        product.specs.join(" "),
        product.features.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    return filtered.slice(0, 30);
  }, [ids, normalizedQuery, preferredCategory]);

  if (!open) {
    return null;
  }

  return (
    <div className="compare-dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="compare-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Add product to compare"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="compare-dialog-header">
          <div>
            <strong>Add product</strong>
            <p className="compare-dialog-subtitle">
              Choose up to {compareStoreConfig.maxItems} products to compare.
            </p>
          </div>
          <button className="compare-dialog-close" type="button" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="compare-dialog-search">
          <input
            className="compare-dialog-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            autoFocus
          />
        </div>

        <div className="compare-dialog-list" role="list">
          {items.length ? (
            items.map((product) => (
              <button
                key={`compare-add-${product.id}`}
                type="button"
                className="compare-dialog-item"
                role="listitem"
                onClick={() => {
                  add(product.id);
                  onClose();
                }}
              >
                <Image
                  className={`catalog-card-image ${product.imageClass}`}
                  src={resolveCloudinaryAsset(product.imageSrc)}
                  alt={product.imageAlt}
                  width={ITEM_IMAGE_WIDTH}
                  height={ITEM_IMAGE_HEIGHT}
                />
                <span className="compare-dialog-item-copy">
                  <span className="compare-dialog-item-title">{product.title}</span>
                  <span className="compare-dialog-item-meta">{product.categoryLabel}</span>
                </span>
              </button>
            ))
          ) : (
            <div className="compare-dialog-empty">No matching products.</div>
          )}
        </div>
      </div>
    </div>
  );
}

