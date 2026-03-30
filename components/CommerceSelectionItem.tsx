import Image from "next/image";
import Link from "next/link";

import { getProductById, getProductHref } from "@/data/products";

export function CommerceSelectionItem({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: {
  item: { id: string; quantity: number };
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}) {
  const product = getProductById(item.id);

  if (!product) {
    return null;
  }

  return (
    <article className="cart-drawer-item">
      <div className="cart-drawer-item-media">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          width={120}
          height={90}
          sizes="120px"
        />
      </div>
      <div className="cart-drawer-item-copy">
        <p className="cart-drawer-item-category">{product.categoryLabel}</p>
        <Link className="cart-drawer-item-title" href={getProductHref(product.id)}>
          {product.title}
        </Link>
      </div>
      <div className="cart-drawer-item-controls">
        <div className="cart-drawer-item-qty" aria-label="Quantity controls">
          <button
            className="cart-drawer-stepper-button"
            type="button"
            aria-label="Decrease quantity"
            onClick={onDecrease}
          >
            <span aria-hidden="true">&minus;</span>
          </button>
          <strong>{item.quantity}</strong>
          <button
            className="cart-drawer-stepper-button"
            type="button"
            aria-label="Increase quantity"
            onClick={onIncrease}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
        <button
          className="cart-drawer-remove"
          type="button"
          aria-label={`Remove ${product.title}`}
          title="Remove"
          onClick={onRemove}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16" />
            <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
            <path d="M7 7l1 12h8l1-12" />
            <path d="M10 11v5" />
            <path d="M14 11v5" />
          </svg>
        </button>
      </div>
    </article>
  );
}
