import Image from "next/image";
import Link from "next/link";
import { homepageCtaContent } from "@/lib/content/homepage";

export function CtaSection() {
  return (
    <section className="content-section section-cta" data-reveal>
      <div className="container">
        <div className="cta-panel">
          <div className="cta-panel-copy">
            <p className="cta-panel-eyebrow">{homepageCtaContent.eyebrow}</p>
            <h2>{homepageCtaContent.heading}</h2>
            <p className="cta-panel-description">{homepageCtaContent.description}</p>
            <div className="cta-panel-actions">
              <Link className="button button-primary" href={homepageCtaContent.primaryCta.href}>
                {homepageCtaContent.primaryCta.label}
              </Link>
              <Link className="button button-secondary" href={homepageCtaContent.secondaryCta.href}>
                {homepageCtaContent.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="cta-panel-visual" aria-hidden="true">
            <div className="cta-visual-device">
              <Image
                className="cta-visual-image"
                src={homepageCtaContent.image.src}
                alt=""
                width={720}
                height={520}
                sizes="(max-width: 991px) 100vw, 38vw"
              />
            </div>
            <div className="cta-panel-metrics">
              {homepageCtaContent.metrics.map((metric) => (
                <div className="cta-metric" key={metric.title}>
                  <strong>{metric.title}</strong>
                  <span>{metric.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
