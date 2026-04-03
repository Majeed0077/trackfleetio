"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

import { getProductHref, type Product } from "@/data/products";
import { useAppStore, useStoreHydrated } from "@/store/store";

const PRODUCT_CARD_IMAGE_WIDTH = 420;
const PRODUCT_CARD_IMAGE_HEIGHT = 320;

export function ProductCard({ product }: { product: Product }) {
  const hasHydrated = useStoreHydrated();
  const quickAddToCart = useAppStore((state) => state.quickAddToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const wishlist = useAppStore((state) => state.wishlist);
  const isSaved = hasHydrated && wishlist.includes(product.id);
  const topFeatures = product.features.slice(0, 3);

  return (
    <article
      className="catalog-card"
      data-category={product.category}
      data-product={product.id}
    >
      <div className="catalog-card-media">
        <div className="catalog-card-tools">
          <button
            className={`catalog-card-tool catalog-card-tool-favorite${isSaved ? " is-saved" : ""}`}
            type="button"
            aria-label="Save to wishlist"
            title="Save to wishlist"
            aria-pressed={isSaved ? "true" : "false"}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart size={18} strokeWidth={1.9} />
          </button>
          <button
            className="catalog-card-tool catalog-card-tool-quick-cart"
            type="button"
            aria-label="Quick add to cart"
            title="Quick add to cart"
            onClick={() => quickAddToCart(product.id)}
          >
            <ShoppingCart size={18} strokeWidth={1.9} />
          </button>
        </div>

        <Link
          className="catalog-card-media-link"
          href={getProductHref(product.id)}
          aria-label={`View details for ${product.title}`}
        >
          <Image
            className={`catalog-card-image ${product.imageClass}`}
            src={product.imageSrc}
            alt={product.imageAlt}
            width={PRODUCT_CARD_IMAGE_WIDTH}
            height={PRODUCT_CARD_IMAGE_HEIGHT}
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
          />
        </Link>
      </div>
      <p className="product-category">{product.categoryLabel}</p>
      <h3>
        <Link className="catalog-card-title-link" href={getProductHref(product.id)}>
          {product.title}
        </Link>
      </h3>
      <p className="product-specs">{product.specs.join(" | ")}</p>
      <ul className="catalog-card-list">
        {topFeatures.map((feature) => (
          <li key={`${product.id}-${feature}`}>{feature}</li>
        ))}
      </ul>
      <div className="catalog-card-actions">
        <Link className="button button-primary catalog-card-buy-now" href={getProductHref(product.id)}>
          View Details
        </Link>
        <Link className="button button-secondary catalog-card-secondary-link" href="/contact">
          Talk to Sales
        </Link>
      </div>
    </article>
  );
}
