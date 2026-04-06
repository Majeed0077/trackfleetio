import Link from "next/link";
import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Checkout Issue | Track Fleetio",
    description: "Track Fleetio checkout failure state for retry and support escalation.",
    path: "/checkout/failure",
  });
}

export default async function CheckoutFailurePage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const params = await searchParams;
  const reason = params.reason || "Unable to complete checkout.";

  return (
    <main className="site-main state-page" id="main-content">
      <section className="products-hero commerce-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Checkout issue</span>
            <h1>We could not complete your order</h1>
            <p>Use this state for payment failures, validation errors, or retryable service issues.</p>
          </div>
        </div>
      </section>

      <section className="state-section">
        <div className="container">
          <article className="state-card">
            <p>{reason}</p>
            <div className="state-actions">
              <Link className="button button-primary" href="/checkout">
                Retry checkout
              </Link>
              <Link className="button button-secondary" href="/contact">
                Contact support
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
