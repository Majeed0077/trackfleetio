"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getProductHref, type Product } from "@/data/products";
import { useAppStore, useStoreHydrated } from "@/store/store";

const PRODUCT_CARD_IMAGE_WIDTH = 420;
const PRODUCT_CARD_IMAGE_HEIGHT = 320;

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const hasHydrated = useStoreHydrated();
  const quickAddToCart = useAppStore((state) => state.quickAddToCart);
  const startImmediateCheckout = useAppStore((state) => state.startImmediateCheckout);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const wishlist = useAppStore((state) => state.wishlist);
  const isSaved = hasHydrated && wishlist.includes(product.id);

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
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 20.25 4.875 13.5a4.5 4.5 0 0 1 6.364-6.364L12 7.896l.761-.76A4.5 4.5 0 0 1 19.125 13.5L12 20.25Z" />
            </svg>
          </button>
          <button
            className="catalog-card-tool catalog-card-tool-quick-cart"
            type="button"
            aria-label="Quick add to cart"
            title="Quick add to cart"
            onClick={() => quickAddToCart(product.id)}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 5h2l2.2 9.2h8.8l2-7H7.2" />
              <circle cx="10" cy="18" r="1.5" />
              <circle cx="17" cy="18" r="1.5" />
            </svg>
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
        {product.features.map((feature) => (
          <li key={`${product.id}-${feature}`}>{feature}</li>
        ))}
      </ul>
      <div className="catalog-card-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={() => {
            startImmediateCheckout(product.id);
            router.push("/checkout");
          }}
        >
          Buy Now
        </button>
        <Link className="catalog-card-detail-link" href={getProductHref(product.id)}>
          View Details <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}



