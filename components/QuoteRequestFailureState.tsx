"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function QuoteRequestFailureState() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "Unable to submit your quote request.";

  return (
    <main className="site-main state-page" id="main-content">
      <section className="products-hero commerce-hero">
        <div className="container">
          <div className="products-hero-shell">
            <span className="products-badge">Quote request issue</span>
            <h1>We could not submit your request</h1>
            <p>Retry the quote form or contact the team directly if you need immediate pricing support.</p>
          </div>
        </div>
      </section>

      <section className="state-section">
        <div className="container">
          <article className="state-card">
            <p>{reason}</p>
            <div className="state-actions">
              <Link className="button button-primary" href="/quote-request">
                Retry quote request
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
