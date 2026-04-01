"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useState, type CSSProperties } from "react";

import { getProductHref, getRelatedProducts, type Product } from "@/data/products";
import { useAppStore, useStoreHydrated } from "@/store/store";

const PRODUCT_DETAIL_IMAGE_WIDTH = 900;
const PRODUCT_DETAIL_IMAGE_HEIGHT = 680;
const PRODUCT_THUMBNAIL_IMAGE_WIDTH = 160;
const PRODUCT_THUMBNAIL_IMAGE_HEIGHT = 120;
const PRODUCT_RELATED_IMAGE_WIDTH = 420;
const PRODUCT_RELATED_IMAGE_HEIGHT = 320;

const getFeatureSupportCopy = (product: Product, feature: string) => {
  const context = product.categoryLabel.toLowerCase();
  const lowerFeature = feature.toLowerCase();

  if (lowerFeature.includes("tracking")) {
    return `Gives operations teams clearer live visibility across connected ${context} deployments.`;
  }

  if (lowerFeature.includes("battery")) {
    return "Built for lower-touch field deployment where dependable runtime and recovery matter.";
  }

  if (lowerFeature.includes("video") || lowerFeature.includes("record")) {
    return "Supports safer incident review and stronger evidence capture across active fleet routes.";
  }

  if (lowerFeature.includes("fuel")) {
    return "Helps fleet managers monitor fuel behaviour with more dependable operating data.";
  }

  if (lowerFeature.includes("temperature")) {
    return "Designed for condition-sensitive operations that need continuous environmental awareness.";
  }

  if (lowerFeature.includes("pressure") || lowerFeature.includes("tpms")) {
    return "Improves maintenance visibility and supports safer day-to-day vehicle performance.";
  }

  if (lowerFeature.includes("load")) {
    return "Adds clearer compliance insight for teams managing heavier-duty vehicle programs.";
  }

  return `Designed to strengthen ${lowerFeature} across modern fleet hardware workflows.`;
};

const getUseCaseSupportCopy = (useCase: string) => {
  const lowerUseCase = useCase.toLowerCase();

  if (lowerUseCase.includes("install")) {
    return "Useful for faster deployment planning and more consistent field rollouts.";
  }

  if (lowerUseCase.includes("driver")) {
    return "Helps safety teams improve coaching, review, and day-to-day operating confidence.";
  }

  if (lowerUseCase.includes("asset") || lowerUseCase.includes("trailer")) {
    return "Fits workflows that require stronger recovery readiness and asset visibility.";
  }

  if (lowerUseCase.includes("load") || lowerUseCase.includes("cargo")) {
    return "Supports operators who need better control over utilization, safety, and condition monitoring.";
  }

  return `Fits teams managing ${lowerUseCase} with clearer operational context and hardware visibility.`;
};

export function ProductDetailPage({ product }: { product: Product }) {
  const router = useRouter();
  const hasHydrated = useStoreHydrated();
  const addToCart = useAppStore((state) => state.addToCart);
  const showToast = useAppStore((state) => state.showToast);
  const startImmediateCheckout = useAppStore((state) => state.startImmediateCheckout);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const wishlist = useAppStore((state) => state.wishlist);
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [isZooming, setIsZooming] = useState(false);
  const [pan, setPan] = useState({ x: "0px", y: "0px", zoom: "1" });
  const isSaved = hasHydrated && wishlist.includes(product.id);
  const relatedProducts = getRelatedProducts(product);

  return (
    <main id="main-content" className="site-main">
      <div className="container">
        <section className="product-detail-hero">
          <div className="product-detail-shell">
            <div className="product-detail-media">
              <div className="product-detail-gallery">
                <div
                  className={`product-detail-media-card${isZooming ? " is-zooming" : ""}`}
                  style={
                    {
                      "--gallery-pan-x": pan.x,
                      "--gallery-pan-y": pan.y,
                      "--gallery-zoom": pan.zoom,
                    } as CSSProperties
                  }
                  onMouseEnter={() => {
                    setIsZooming(true);
                    setPan((currentValue) => ({ ...currentValue, zoom: "1.7" }));
                  }}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
                    const yRatio = (event.clientY - rect.top) / rect.height - 0.5;

                    setPan({
                      x: `${(xRatio * -28).toFixed(2)}px`,
                      y: `${(yRatio * -28).toFixed(2)}px`,
                      zoom: "1.7",
                    });
                  }}
                  onMouseLeave={() => {
                    setIsZooming(false);
                    setPan({ x: "0px", y: "0px", zoom: "1" });
                  }}
                >
                  <Image
                    className={`product-detail-main-image catalog-card-image ${activeImage.imageClass}`}
                    src={activeImage.src}
                    alt={activeImage.alt}
                    width={PRODUCT_DETAIL_IMAGE_WIDTH}
                    height={PRODUCT_DETAIL_IMAGE_HEIGHT}
                    sizes="(max-width: 991px) 100vw, 50vw"
                    priority
                  />
                </div>
                {product.gallery.length > 1 ? (
                  <div className="product-detail-thumbnails" aria-label={`${product.title} gallery thumbnails`}>
                    {product.gallery.map((image, index) => {
                      const isActive = activeImage.src === image.src && activeImage.alt === image.alt;

                      return (
                        <button
                          className={`product-detail-thumbnail${isActive ? " is-active" : ""}`}
                          type="button"
                          key={`${image.src}-${index}`}
                          aria-label={`View image ${index + 1} for ${product.title}`}
                          aria-pressed={isActive ? "true" : "false"}
                          onClick={() => {
                            setActiveImage(image);
                            setIsZooming(false);
                            setPan({ x: "0px", y: "0px", zoom: "1" });
                          }}
                        >
                          <Image
                            className={`catalog-card-image ${image.imageClass}`}
                            src={image.src}
                            alt={image.alt}
                            width={PRODUCT_THUMBNAIL_IMAGE_WIDTH}
                            height={PRODUCT_THUMBNAIL_IMAGE_HEIGHT}
                            sizes="120px"
                          />
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="product-detail-copy">
              <p className="product-category">{product.categoryLabel}</p>
              <h1>{product.title}</h1>
              <p className="product-detail-description">{product.shortDescription}</p>
              <p className="product-specs product-detail-specs-line">{product.specs.join(" | ")}</p>
              <ul className="product-detail-feature-list">
                {product.features.map((feature) => (
                  <li key={`${product.id}-${feature}`}>{feature}</li>
                ))}
              </ul>
              <div className="product-detail-actions">
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
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => {
                    addToCart(product.id);
                    router.push("/cart");
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className={`catalog-card-tool product-detail-favorite${isSaved ? " is-saved" : ""}`}
                  type="button"
                  aria-label="Save to wishlist"
                  title="Save to wishlist"
                  aria-pressed={isSaved ? "true" : "false"}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart size={18} strokeWidth={1.9} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="product-detail-section">
          <div className="product-detail-section-heading">
            <p className="eyebrow">Quick Specs</p>
            <h2>Technical Profile</h2>
          </div>
          <div className="product-detail-spec-grid">
            {product.specs.map((spec) => (
              <article className="product-detail-spec-card" key={`${product.id}-${spec}`}>
                <span className="product-detail-spec-label">Specification</span>
                <strong>{spec}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="product-detail-section">
          <div className="product-detail-section-heading">
            <p className="eyebrow">Key Features</p>
            <h2>Operational Capabilities</h2>
          </div>
          <div className="product-detail-feature-grid">
            {product.features.map((feature) => (
              <article className="product-detail-feature-item" key={`${product.id}-${feature}-detail`}>
                <span className="product-detail-feature-marker" aria-hidden="true"></span>
                <div className="product-detail-feature-content">
                  <h3>{feature}</h3>
                  <p>{getFeatureSupportCopy(product, feature)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="product-detail-section">
          <div className="product-detail-section-heading">
            <p className="eyebrow">Use Cases</p>
            <h2>Deployment Scenarios</h2>
          </div>
          <div className="product-detail-use-case-grid">
            {product.useCases.map((useCase) => (
              <article className="product-detail-use-case-item" key={`${product.id}-${useCase}`}>
                <span className="product-detail-feature-marker" aria-hidden="true"></span>
                <div className="product-detail-feature-content">
                  <h3>{useCase}</h3>
                  <p>{getUseCaseSupportCopy(useCase)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="product-detail-section">
          <div className="product-detail-section-heading">
            <p className="eyebrow">Related Products</p>
            <h2>Explore adjacent hardware</h2>
          </div>
          <div className="product-detail-related-grid">
            {relatedProducts.map((relatedProduct) => (
              <article className="product-detail-related-card" key={relatedProduct.id}>
                <Link className="product-detail-related-media" href={getProductHref(relatedProduct.id)}>
                  <Image
                    className={`catalog-card-image ${relatedProduct.imageClass}`}
                    src={relatedProduct.imageSrc}
                    alt={relatedProduct.imageAlt}
                    width={PRODUCT_RELATED_IMAGE_WIDTH}
                    height={PRODUCT_RELATED_IMAGE_HEIGHT}
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
                  />
                </Link>
                <p className="product-category">{relatedProduct.categoryLabel}</p>
                <h3>
                  <Link className="catalog-card-title-link" href={getProductHref(relatedProduct.id)}>
                    {relatedProduct.title}
                  </Link>
                </h3>
                <p className="product-specs">{relatedProduct.specs.join(" | ")}</p>
                <p className="product-detail-related-copy">{relatedProduct.shortDescription}</p>
                <div className="catalog-card-actions product-detail-related-actions">
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => {
                      startImmediateCheckout(relatedProduct.id);
                      router.push("/checkout");
                    }}
                  >
                    Buy Now
                  </button>
                  <Link className="catalog-card-detail-link" href={getProductHref(relatedProduct.id)}>
                    View Details <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-cta product-detail-cta">
          <div className="cta-panel">
            <h2>Need help selecting the right hardware mix?</h2>
            <div className="products-hero-actions product-detail-cta-actions">
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
              <button
                className="button button-outline"
                type="button"
                onClick={() => {
                  addToCart(product.id);
                  showToast("Added to cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}





