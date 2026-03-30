import Link from "next/link";

export function CtaSection() {
  return (
    <section className="content-section section-cta">
      <div className="container">
        <div className="cta-panel">
          <h2>Build a More Reliable Fleet with Track Fleetio Hardware</h2>
          <Link className="button button-primary" href="#footer">
            Request Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
