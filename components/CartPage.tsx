"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { CommerceSelectionItem } from "@/components/CommerceSelectionItem";
import { startRouteLoader } from "@/lib/route-loader";
import { useAppStore, useFleetSummaryRows, useStoreHydrated } from "@/store/store";

export function CartPage() {
  const router = useRouter();
  const hasHydrated = useStoreHydrated();
  const cart = useAppStore((state) => state.cart);
  const getFleetSummary = useAppStore((state) => state.getFleetSummary);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const startCartCheckout = useAppStore((state) => state.startCartCheckout);
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity);
  const resolvedCart = hasHydrated ? cart : [];
  const summaryRows = useFleetSummaryRows(resolvedCart);
  const summary = getFleetSummary(resolvedCart);

  return (
    <main id="main-content" className="site-main">
      <section className="products-hero commerce-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Fleet Commerce</span>
            <h1>Cart</h1>
            <p>Review selected hardware, update quantities, and continue toward checkout.</p>
          </div>
        </div>
      </section>

      <section className="commerce-page">
        {!resolvedCart.length ? (
          <div className="container">
            <div className="commerce-empty">
              <p className="cart-drawer-label">Cart</p>
              <h2>Your cart is empty</h2>
              <p>Select hardware from the catalog to build your fleet setup.</p>
              <div className="products-hero-actions">
                <Link className="button button-primary" href="/products">
                  Browse Hardware
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="commerce-layout">
              <section className="commerce-card">
                <div className="commerce-card-header">
                  <div>
                    <p className="cart-drawer-label">Cart</p>
                    <h2>Review your selected hardware</h2>
                  </div>
                </div>
                <div className="cart-drawer-items">
                  {resolvedCart.map((item) => (
                    <CommerceSelectionItem
                      key={item.id}
                      item={item}
                      onDecrease={() => updateCartQuantity(item.id, -1)}
                      onIncrease={() => updateCartQuantity(item.id, 1)}
                      onRemove={() => removeFromCart(item.id)}
                    />
                  ))}
                </div>
              </section>

              <aside className="commerce-summary-column">
                <div className="cart-drawer-summary-card">
                  <div>
                    <p className="cart-drawer-summary-label">Cart Summary</p>
                    <h3>{summary.totalDevices} device{summary.totalDevices === 1 ? "" : "s"} selected</h3>
                  </div>
                  <div className="cart-drawer-summary-groups">
                    {summaryRows.map((row) => (
                      <div className="cart-drawer-summary-row" key={row.label}>
                        <span>{row.label}</span>
                        <strong>{row.count}</strong>
                      </div>
                    ))}
                  </div>
                  <p className="cart-drawer-note">
                    Pricing can be finalized during checkout or procurement review.
                  </p>
                  <div className="cart-drawer-actions">
                    <Link className="button button-secondary" href="/products">
                      Continue Shopping
                    </Link>
                    <Link className="button button-outline" href="/contact">
                      Request Quote
                    </Link>
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={() => {
                        startCartCheckout();
                        startRouteLoader();
                        router.push("/checkout");
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}





