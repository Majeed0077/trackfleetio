import Image from "next/image";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="content-section section-cta" data-reveal>
      <div className="container">
        <div className="cta-panel">
          <div className="cta-panel-copy">
            <p className="cta-panel-eyebrow">Ready to deploy</p>
            <h2>Smarter fleet hardware for real-time visibility, safety, and cost control.</h2>
            <p className="cta-panel-description">
              Talk to our team about trackers, dashcams, sensors, and deployment guidance for
              operations across Pakistan, UAE, UK, and USA.
            </p>
            <div className="cta-panel-actions">
              <Link className="button button-primary" href="/contact">
                Request Demo
              </Link>
              <Link className="button button-secondary" href="/products">
                Explore Hardware
              </Link>
            </div>
          </div>

          <div className="cta-panel-visual" aria-hidden="true">
            <div className="cta-visual-device">
              <Image
                className="cta-visual-image"
                src="/Products/3Products.png"
                alt=""
                width={720}
                height={520}
                sizes="(max-width: 991px) 100vw, 38vw"
              />
            </div>
            <div className="cta-panel-metrics">
              <div className="cta-metric">
                <strong>50K+</strong>
                <span>Devices deployed</span>
              </div>
              <div className="cta-metric">
                <strong>99.9%</strong>
                <span>Reliability focus</span>
              </div>
              <div className="cta-metric">
                <strong>24/7</strong>
                <span>Specialist support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
