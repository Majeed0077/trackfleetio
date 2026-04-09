import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { getProductById, getProductHref } from "@/data/products";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";

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

  const productImageSrc = resolveCloudinaryAsset(product.imageSrc);

  return (
    <article className="cart-drawer-item">
      <div className="cart-drawer-item-media">
        <Image
          src={productImageSrc}
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
          <Trash2 size={18} strokeWidth={1.9} />
        </button>
      </div>
    </article>
  );
}
