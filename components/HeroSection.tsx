import Image from "next/image";
import Link from "next/link";
import { Boxes, Route, ShieldCheck, Wrench } from "lucide-react";
import { heroContent, homepageMetrics } from "@/lib/content/homepage";

const metricIconMap = {
  boxes: Boxes,
  route: Route,
  shield: ShieldCheck,
  wrench: Wrench,
} as const;

export function HeroSection() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid" data-reveal-group>
            <div className="hero-copy" data-reveal-item>
              <h1>
                {heroContent.heading[0].replace(" ", "\u00a0")}
                <br />
                {heroContent.heading[1].replace(/ /g, "\u00a0")}
                <br />
                {heroContent.heading[2]}
              </h1>
              <p className="hero-text">{heroContent.description}</p>

              <div className="hero-actions">
                <Link className="button button-primary" href={heroContent.primaryCta.href}>
                  {heroContent.primaryCta.label}
                </Link>
                <Link className="button button-secondary" href={heroContent.secondaryCta.href}>
                  {heroContent.secondaryCta.label}
                </Link>
              </div>

              <p className="hero-trust">{heroContent.trustLine}</p>
            </div>

            <div className="hero-visual" data-reveal-item>
              <div className="hero-devices" aria-label="Track Fleetio hardware showcase" data-parallax="soft">
                <Image
                  className="hero-cluster-image"
                  src={heroContent.image.src}
                  alt={heroContent.image.alt}
                  width={790}
                  height={590}
                  loading="eager"
                  fetchPriority="high"
                  priority
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-section" aria-label="Fleet buying signals" data-reveal-group>
        <div className="container">
          <div className="metrics-strip">
            {homepageMetrics.map((metric) => {
              const Icon = metricIconMap[metric.icon];

              return (
                <article className="metric-card" data-reveal-item key={metric.title}>
                  <strong>{metric.title}</strong>
                  <div className="metric-meta">
                    <span className="metric-icon" aria-hidden="true">
                      <Icon size={15} strokeWidth={1.9} />
                    </span>
                    <span>{metric.description}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
