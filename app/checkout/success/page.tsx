import Link from "next/link";
import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Order Submitted | Track Fleetio",
    description: "Track Fleetio order success state for customer confirmation and next steps.",
    path: "/checkout/success",
  });
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.order || "TF-NEW";

  return (
    <main className="site-main state-page" id="main-content">
      <section className="products-hero commerce-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Order success</span>
            <h1>Order submitted</h1>
            <p>Your order has been captured and routed to operations for payment and fulfillment follow-up.</p>
          </div>
        </div>
      </section>

      <section className="state-section">
        <div className="container">
          <article className="state-card">
            <p className="cart-drawer-label">Reference</p>
            <h2>{orderId}</h2>
            <p>Next step: payment confirmation, warehouse allocation, and customer notification timeline.</p>
            <div className="state-actions">
              <Link className="button button-primary" href="/account/orders">
                View my orders
              </Link>
              <Link className="button button-secondary" href="/products">
                Continue browsing
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
