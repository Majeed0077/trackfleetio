import Link from "next/link";
import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Quote Request Received | Track Fleetio",
    description: "Confirmation state for Track Fleetio quote requests.",
    path: "/quote-request/success",
  });
}

export default async function QuoteRequestSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ quote?: string }>;
}) {
  const params = await searchParams;
  const quoteId = params.quote || "TFQ-NEW";

  return (
    <main className="site-main state-page" id="main-content">
      <section className="products-hero commerce-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Quote request received</span>
            <h1>We have your quote request</h1>
            <p>Our team will review the fleet context, prepare the right hardware mix, and get back to you directly.</p>
          </div>
        </div>
      </section>

      <section className="state-section">
        <div className="container">
          <article className="state-card">
            <p className="cart-drawer-label">Reference</p>
            <h2>{quoteId}</h2>
            <p>Next step: internal review, pricing alignment, and direct follow-up from the Track Fleetio team.</p>
            <div className="state-actions">
              <Link className="button button-primary" href="/products">
                Continue browsing
              </Link>
              <Link className="button button-secondary" href="/contact">
                Talk to sales
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
