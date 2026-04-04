"use client";

import Link from "next/link";
import { useState } from "react";

import { CommerceSelectionItem } from "@/components/CommerceSelectionItem";
import { useAppStore, useFleetSummaryRows, useStoreHydrated } from "@/store/store";
import styles from "@/components/CheckoutPage.module.css";

export function CheckoutPage() {
  const hasHydrated = useStoreHydrated();
  const completeCheckout = useAppStore((state) => state.completeCheckout);
  const getCheckoutContext = useAppStore((state) => state.getCheckoutContext);
  const getFleetSummary = useAppStore((state) => state.getFleetSummary);
  const removeFromCheckout = useAppStore((state) => state.removeFromCheckout);
  const showToast = useAppStore((state) => state.showToast);
  const updateCheckoutQuantity = useAppStore((state) => state.updateCheckoutQuantity);
  const checkoutSelection = useAppStore((state) => state.checkoutSelection);
  const checkoutContext =
    hasHydrated
      ? getCheckoutContext()
      : checkoutSelection?.mode === "buy-now" && checkoutSelection.items.length
        ? checkoutSelection
        : { mode: "cart" as const, items: [] };
  const checkoutLabel = checkoutContext.mode === "buy-now" ? "Buy Now" : "Checkout";
  const summary = getFleetSummary(checkoutContext.items);
  const summaryRows = useFleetSummaryRows(checkoutContext.items);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  return (
    <main id="main-content" className="site-main">
      <section className="products-hero commerce-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Fast Purchase Flow</span>
            <h1>Checkout</h1>
            <p>Complete your hardware order with a clean, direct purchase experience.</p>
          </div>
        </div>
      </section>

      <section className="commerce-page">
        {!checkoutContext.items.length ? (
          <div className="container">
            <div className="commerce-empty">
              <p className="cart-drawer-label">Checkout</p>
              <h2>{orderId ? "Order submitted" : "No product selected for checkout"}</h2>
              <p>
                {orderId
                  ? `${statusMessage} Order: ${orderId}`
                  : "Add hardware to your cart or choose Buy Now from a product page to start checkout."}
              </p>
              <div className="products-hero-actions">
                <Link className="button button-primary" href="/products">
                  Browse Hardware
                </Link>
                <Link className="button button-secondary" href="/cart">
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="checkout-layout">
              <section className="checkout-form-card">
                <div className="commerce-card-header">
                  <div>
                    <p className="cart-drawer-label">{checkoutLabel}</p>
                    <h2>Complete your hardware order</h2>
                    <p className="checkout-intro">
                      Share delivery and billing details to continue the purchase flow.
                    </p>
                  </div>
                </div>
                <form
                  className="company-contact-form checkout-form-grid"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    setStatusMessage("");
                    setIsSubmitting(true);

                    try {
                      const response = await fetch("/api/checkout", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "same-origin",
                        body: JSON.stringify({
                          items: checkoutContext.items,
                          name: String(formData.get("name") || ""),
                          company: String(formData.get("company") || ""),
                          email: String(formData.get("email") || ""),
                          phone: String(formData.get("phone") || ""),
                          billing: String(formData.get("billing") || ""),
                          shipping: String(formData.get("shipping") || ""),
                          notes: String(formData.get("notes") || ""),
                        }),
                      });

                      const payload = (await response.json()) as {
                        ok?: boolean;
                        message?: string;
                        orderId?: string;
                      };

                      if (!response.ok || !payload.ok) {
                        setStatusMessage(payload.message || "Unable to complete checkout.");
                        return;
                      }

                      completeCheckout();
                      setOrderId(payload.orderId || "");
                      setStatusMessage(payload.message || "Checkout completed successfully.");
                      showToast(payload.orderId ? `Order ${payload.orderId} created` : "Checkout completed");
                      event.currentTarget.reset();
                    } catch {
                      setStatusMessage("Unable to reach the checkout service.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <input className="checkout-field" type="text" name="name" placeholder="Full name" />
                  <input className="checkout-field" type="text" name="company" placeholder="Company" />
                  <input className="checkout-field" type="email" name="email" placeholder="Work email" />
                  <input className="checkout-field" type="tel" name="phone" placeholder="Phone number" />
                  <input className="checkout-field" type="text" name="billing" placeholder="Billing address" />
                  <input className="checkout-field" type="text" name="shipping" placeholder="Shipping address" />
                  <textarea
                    className="checkout-field checkout-field-full"
                    name="notes"
                    placeholder="Order notes / deployment instructions"
                  ></textarea>
                  <div className="checkout-form-actions checkout-field-full">
                    <button className="button button-primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Complete Checkout"}
                    </button>
                    <Link className="button button-secondary" href="/cart">
                      Back to Cart
                    </Link>
                  </div>
                  <p
                    className={`${styles.status} ${
                      statusMessage
                        ? orderId
                          ? styles.statusSuccess
                          : styles.statusError
                        : ""
                    } checkout-field-full`}
                    aria-live="polite"
                  >
                    {statusMessage}
                    {orderId ? ` Order: ${orderId}` : ""}
                  </p>
                </form>
              </section>

              <aside className="checkout-summary-card">
                <div className="commerce-card-header">
                  <div>
                    <p className="cart-drawer-summary-label">Order Summary</p>
                    <h3>{summary.totalDevices} device{summary.totalDevices === 1 ? "" : "s"} ready</h3>
                  </div>
                </div>
                <div className="cart-drawer-items">
                  {checkoutContext.items.map((item) => (
                    <CommerceSelectionItem
                      key={item.id}
                      item={item}
                      onDecrease={() => updateCheckoutQuantity(item.id, -1)}
                      onIncrease={() => updateCheckoutQuantity(item.id, 1)}
                      onRemove={() => removeFromCheckout(item.id)}
                    />
                  ))}
                </div>
                <div className="cart-drawer-summary-groups checkout-summary-groups">
                  {summaryRows.map((row) => (
                    <div className="cart-drawer-summary-row" key={row.label}>
                      <span>{row.label}</span>
                      <strong>{row.count}</strong>
                    </div>
                  ))}
                </div>
                <p className="cart-drawer-note">
                  This checkout page is ready for payment and fulfillment integration in the next ecommerce phase.
                </p>
              </aside>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}



