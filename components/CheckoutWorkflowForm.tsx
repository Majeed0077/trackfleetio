"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CommerceSelectionItem } from "@/components/CommerceSelectionItem";
import { useAppStore, useFleetSummaryRows, useStoreHydrated } from "@/store/store";
import styles from "@/components/CheckoutPage.module.css";

type CheckoutStep = "access" | "details" | "review";

const paymentMethods = ["Bank transfer", "Card payment", "Cash on delivery", "Request invoice"] as const;

export function CheckoutWorkflowForm() {
  const router = useRouter();
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
  const [step, setStep] = useState<CheckoutStep>("access");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [checkoutMode, setCheckoutMode] = useState<"guest" | "account">("guest");
  const [paymentMethod, setPaymentMethod] = useState<(typeof paymentMethods)[number]>("Bank transfer");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateDetails = (formData: FormData) => {
    const nextErrors: Record<string, string> = {};

    if (!String(formData.get("name") || "").trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!String(formData.get("email") || "").trim()) {
      nextErrors.email = "Work email is required.";
    }

    if (!String(formData.get("billing") || "").trim()) {
      nextErrors.billing = "Billing address is required.";
    }

    if (!String(formData.get("shipping") || "").trim()) {
      nextErrors.shipping = "Shipping address is required.";
    }

    return nextErrors;
  };

  return (
    <main id="main-content" className="site-main">
      <section className="products-hero commerce-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Fast Purchase Flow</span>
            <h1>Checkout</h1>
            <p>Complete your hardware order with a structured review, payment preference, and delivery capture flow.</p>
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
                      Step through account choice, address validation, payment preference, and final order review.
                    </p>
                  </div>
                </div>

                <div className="checkout-steps">
                  {[
                    { key: "access", label: "Access" },
                    { key: "details", label: "Details" },
                    { key: "review", label: "Review" },
                  ].map((item) => (
                    <span key={item.key} className={`checkout-step-chip ${step === item.key ? "is-active" : ""}`}>
                      {item.label}
                    </span>
                  ))}
                </div>

                <form
                  className="company-contact-form checkout-form-grid"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    setStatusMessage("");

                    if (step === "access") {
                      setStep("details");
                      return;
                    }

                    if (step === "details") {
                      const nextErrors = validateDetails(formData);
                      setFieldErrors(nextErrors);

                      if (Object.keys(nextErrors).length) {
                        setStatusMessage("Check the highlighted fields before moving to review.");
                        return;
                      }

                      setStep("review");
                      return;
                    }

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
                          checkoutMode,
                          paymentMethod,
                        }),
                      });

                      const payload = (await response.json()) as {
                        ok?: boolean;
                        message?: string;
                        orderId?: string;
                      };

                      if (!response.ok || !payload.ok) {
                        const message = payload.message || "Unable to complete checkout.";
                        setStatusMessage(message);
                        router.push(`/checkout/failure?reason=${encodeURIComponent(message)}`);
                        return;
                      }

                      completeCheckout();
                      setOrderId(payload.orderId || "");
                      setStatusMessage(payload.message || "Checkout completed successfully.");
                      showToast(payload.orderId ? `Order ${payload.orderId} created` : "Checkout completed");
                      event.currentTarget.reset();
                      router.push(`/checkout/success?order=${encodeURIComponent(payload.orderId || "TF-NEW")}`);
                    } catch {
                      setStatusMessage("Unable to reach the checkout service.");
                      router.push("/checkout/failure?reason=Unable%20to%20reach%20the%20checkout%20service.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  {step === "access" ? (
                    <div className="checkout-panel checkout-field-full">
                      <h3>Choose how to continue</h3>
                      <div className="checkout-choice-grid">
                        <button
                          type="button"
                          className={`checkout-choice-card ${checkoutMode === "guest" ? "is-active" : ""}`}
                          onClick={() => setCheckoutMode("guest")}
                        >
                          <strong>Guest checkout</strong>
                          <span>Place the order first and create an account later if needed.</span>
                        </button>
                        <button
                          type="button"
                          className={`checkout-choice-card ${checkoutMode === "account" ? "is-active" : ""}`}
                          onClick={() => setCheckoutMode("account")}
                        >
                          <strong>Sign in to account</strong>
                          <span>Use a customer account for order history, saved addresses, and notifications.</span>
                        </button>
                      </div>
                      {checkoutMode === "account" ? (
                        <div className="checkout-inline-actions">
                          <Link className="button button-secondary" href="/signin?next=/checkout">
                            Sign in first
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {step !== "access" ? (
                    <>
                      <input className="checkout-field" type="text" name="name" placeholder="Full name" />
                      <input className="checkout-field" type="text" name="company" placeholder="Company" />
                      <input className="checkout-field" type="email" name="email" placeholder="Work email" />
                      <input className="checkout-field" type="tel" name="phone" placeholder="Phone number" />
                      <div className="checkout-field checkout-field-full">
                        <label className="checkout-field-label">Billing address</label>
                        <input className="checkout-field" type="text" name="billing" placeholder="Billing address" />
                        {fieldErrors.billing ? <span className={styles.statusError}>{fieldErrors.billing}</span> : null}
                      </div>
                      <div className="checkout-field checkout-field-full">
                        <label className="checkout-field-label">Shipping address</label>
                        <input className="checkout-field" type="text" name="shipping" placeholder="Shipping address" />
                        {fieldErrors.shipping ? <span className={styles.statusError}>{fieldErrors.shipping}</span> : null}
                      </div>
                      <div className="checkout-field checkout-field-full">
                        <label className="checkout-field-label">Payment method</label>
                        <div className="checkout-choice-grid">
                          {paymentMethods.map((item) => (
                            <button
                              key={item}
                              type="button"
                              className={`checkout-choice-card ${paymentMethod === item ? "is-active" : ""}`}
                              onClick={() => setPaymentMethod(item)}
                            >
                              <strong>{item}</strong>
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        className="checkout-field checkout-field-full"
                        name="notes"
                        placeholder="Order notes / deployment instructions"
                      ></textarea>
                    </>
                  ) : null}

                  {step === "review" ? (
                    <div className="checkout-panel checkout-field-full">
                      <h3>Review before placing order</h3>
                      <p>
                        Confirm quantity mix, selected payment method, and shipping/billing details before final submission.
                      </p>
                      <div className="checkout-review-grid">
                        {summaryRows.map((row) => (
                          <div className="account-stat-card" key={row.label}>
                            <strong>{row.count}</strong>
                            <span>{row.label}</span>
                          </div>
                        ))}
                        <div className="account-stat-card">
                          <strong>{paymentMethod}</strong>
                          <span>Selected payment path</span>
                        </div>
                        <div className="account-stat-card">
                          <strong>{checkoutMode === "guest" ? "Guest" : "Account"}</strong>
                          <span>Checkout access mode</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="checkout-form-actions checkout-field-full">
                    {step !== "access" ? (
                      <button
                        className="button button-secondary"
                        type="button"
                        onClick={() => setStep(step === "review" ? "details" : "access")}
                      >
                        Back
                      </button>
                    ) : null}

                    <button className="button button-primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting
                        ? "Submitting..."
                        : step === "access"
                          ? "Continue to details"
                          : step === "details"
                            ? "Review order"
                            : "Place order"}
                    </button>
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
                  This checkout flow now includes guest/account decision, payment preference, and review UI before schema integration.
                </p>
              </aside>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
