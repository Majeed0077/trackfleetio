import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Briefcase,
  Cable,
  Crosshair,
  Gauge,
  Globe2,
  LifeBuoy,
  Mail,
  MapPinned,
  Package,
  PhoneCall,
  Radar,
  Route,
  ServerCog,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from "lucide-react";

import { ViewportVideo } from "@/components/ViewportVideo";
import { QuoteRequestLauncher } from "@/components/QuoteRequestLauncher";
import resultsStyles from "@/components/ResultsSection.module.css";
import trustStyles from "@/components/TrustEvidenceSection.module.css";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import {
  architectureContent,
  buyingPrioritiesContent,
  fieldUseCasesContent,
  hardwareEcosystemContent,
  heroContent,
  homeIndustriesContent,
  homepageMetrics,
  homepageSupportContent,
  homepageTrustContent,
  resultsContent,
} from "@/lib/content/homepage";

const heroMetricIconMap = {
  boxes: Boxes,
  route: Route,
  shield: ShieldCheck,
  wrench: Wrench,
} as const;

const architectureIconMap = {
  gauge: Gauge,
  cable: Cable,
  "server-cog": ServerCog,
  radar: Radar,
} as const;

const industriesIconMap = {
  boxes: Boxes,
  briefcase: Briefcase,
  crosshair: Crosshair,
  package: Package,
  route: Route,
  truck: Truck,
  wrench: Wrench,
} as const;

const supportIconMap = {
  chat: LifeBuoy,
  mail: Mail,
  phone: PhoneCall,
} as const;

const trustIconMap = {
  globe: Globe2,
  route: Route,
  boxes: Boxes,
  map: MapPinned,
} as const;

const defaultHeroBackgroundImageSrc =
  "https://res.cloudinary.com/dj7zo10jf/image/upload/f_auto,q_auto/v1775771763/trackfleetio/Images/hero-bgg.png";

export function PublicHeroSection() {
  const heroSectionStyle = {
    "--hero-section-image-url": `url("${resolveCloudinaryAsset(defaultHeroBackgroundImageSrc, {
      transforms: ["w_1800", "c_fill"],
    })}")`,
  } as CSSProperties;

  return (
    <>
      <section className="hero-section" style={heroSectionStyle}>
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
                <QuoteRequestLauncher className="button button-primary" label={heroContent.primaryCta.label}>
                  {heroContent.primaryCta.label}
                </QuoteRequestLauncher>
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
                  src={resolveCloudinaryAsset(heroContent.image.src)}
                  alt={heroContent.image.alt}
                  width={920}
                  height={920}
                  priority
                  sizes="(max-width: 991px) 100vw, 48vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-section" aria-label="Fleet buying signals" data-reveal-group>
        <div className="container">
          <div className="metrics-strip">
            {homepageMetrics.map((metric, index) => {
              const Icon = heroMetricIconMap[metric.icon];

              return (
                <article className="metric-card" data-reveal-item key={`${metric.icon}-${index}`}>
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

export function PublicClientsSection() {
  return (
    <section className="content-section section-client" data-reveal data-defer-render>
      <div className="container">
        <div className="client-proof-band" data-reveal-group>
          <div className="client-proof-header" data-reveal-item>
            <p className="eyebrow">{buyingPrioritiesContent.eyebrow}</p>
            <h2>{buyingPrioritiesContent.heading}</h2>
            <p className="section-subtitle">{buyingPrioritiesContent.description}</p>
          </div>

          <div className="client-proof-grid" aria-label="Fleet hardware evaluation areas" data-reveal-item>
            {buyingPrioritiesContent.proofAreas.map((area) => (
              <article className="client-proof-card" key={area.title}>
                <p className="client-proof-card-label">{area.label}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PublicFeatureStorytellingSection() {
  const [videoCard, imageCard] = fieldUseCasesContent.cards;

  return (
    <section
      id="story"
      className="content-section content-section-last section-story"
      data-reveal
      data-defer-render
    >
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{fieldUseCasesContent.eyebrow}</p>
          <h2>{fieldUseCasesContent.heading}</h2>
          <p className="section-subtitle">{fieldUseCasesContent.description}</p>
        </div>

        <div className="story-layout" data-reveal-group>
          <article className="story-card" data-reveal-item>
            <div className="story-media story-media-shell">
              <div className="story-media-frame">
                <ViewportVideo
                  className="story-media-video story-media-video-dashcam"
                  src="/Products/Video 1.mp4"
                  poster={resolveCloudinaryAsset("/Products/DR03.png")}
                  ariaLabel="Driver monitoring dashcam video"
                />
                <div className="story-media-overlay" aria-hidden="true">
                  <div className="story-overlay-top">
                    <span className="story-overlay-badge story-overlay-rec">
                      <span className="story-overlay-dot"></span>
                      <span>REC</span>
                    </span>
                    <span className="story-overlay-badge">1080P</span>
                  </div>
                  <div className="story-overlay-corners">
                    <span className="story-corner story-corner-tl"></span>
                    <span className="story-corner story-corner-tr"></span>
                    <span className="story-corner story-corner-bl"></span>
                    <span className="story-corner story-corner-br"></span>
                  </div>
                  <div className="story-overlay-bottom">
                    <span className="story-overlay-caption">GPS ACTIVE</span>
                    <span className="story-overlay-caption">AI MONITORING</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-copy-block">
              <h3>{videoCard.title}</h3>
              <p>{videoCard.description}</p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href={videoCard.ctaHref}>
                  {videoCard.ctaLabel}
                </Link>
              </div>
            </div>
          </article>

          <article className="story-card story-card-reverse" data-reveal-item>
            <div className="story-copy-block">
              <h3>{imageCard.title}</h3>
              <p>{imageCard.description}</p>
              <div className="story-copy-actions">
                <Link className="button button-outline story-button" href={imageCard.ctaHref}>
                  {imageCard.ctaLabel}
                </Link>
              </div>
            </div>
            <div className="story-media story-media-alt story-media-shell">
              <div className="story-media-frame">
                <ViewportVideo
                  className="story-media-video"
                  src="/Videos/trailers.mp4"
                  poster={imageCard.imageSrc ?? "/Products/logistics.png"}
                  ariaLabel={imageCard.imageAlt ?? "Tracked refrigerated trailer parked in a logistics yard"}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function PublicFleetArchitectureSection() {
  return (
    <section className="content-section section-architecture" data-reveal data-defer-render>
      <div className="container">
        <div className="section-heading section-heading-centered architecture-heading">
          <p className="eyebrow">{architectureContent.eyebrow}</p>
          <h2>{architectureContent.heading}</h2>
          <p>{architectureContent.description}</p>
        </div>

        <div className="architecture-shell" data-reveal-group>
          <div className="architecture-grid">
            {architectureContent.layers.map((layer, index) => {
              const Icon = architectureIconMap[layer.icon];
              const isMultiLineConnector = layer.connector?.includes("\n");
              const layerLabel = layer.label.replace(/\s*\d+\s*$/, "").trim() || layer.label;

              return (
                <div className="architecture-node-group" key={layer.id} data-reveal-item>
                  <article className={`architecture-card${layer.highlighted ? " is-highlighted" : ""}`}>
                    <div className="architecture-card-topline">
                      <div className="architecture-layer-shell">
                        <span className="architecture-step-badge">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="architecture-layer-label">{layerLabel}</span>
                      </div>
                      <span className="architecture-card-icon" aria-hidden="true">
                        <Icon size={16} strokeWidth={1.9} />
                      </span>
                    </div>
                    <h3>{layer.title}</h3>
                    <p>{layer.description}</p>
                  </article>

                  {index < architectureContent.layers.length - 1 ? (
                    <div className="architecture-connector" aria-hidden="true">
                      <span className="architecture-connector-line" />
                      <span
                        className={`architecture-connector-chip${isMultiLineConnector ? " is-multiline" : ""}`}
                      >
                        {isMultiLineConnector
                          ? layer.connector?.split("\n").map((part, partIndex) => (
                              <span key={`${layer.id}-${part}-${partIndex}`}>{part}</span>
                            ))
                          : layer.connector}
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PublicHomeIndustriesSection() {
  const featured = homeIndustriesContent.featured;
  const FeaturedIcon = industriesIconMap[featured.icon];

  return (
    <section id="industries" className="content-section section-industries" data-reveal data-defer-render>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{homeIndustriesContent.eyebrow}</p>
          <h2>{homeIndustriesContent.heading}</h2>
          <p className="section-subtitle">{homeIndustriesContent.description}</p>
        </div>

        <div className="industries-showcase" data-reveal-group>
          <div className="industry-featured-card" data-reveal-item>
            <Link
              className="industry-featured-media-link"
              href={featured.href}
              aria-label="View logistics industry details"
            >
              <div className="industry-featured-media">
                <Image
                  className="industry-featured-image"
                  src={resolveCloudinaryAsset(featured.imageSrc)}
                  alt={featured.imageAlt}
                  width={720}
                  height={520}
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
            </Link>

            <div className="industry-featured-content">
              <div className="industry-card-copy">
                <div className="industry-card-meta">
                  <span className="industry-card-icon" aria-hidden="true">
                    <FeaturedIcon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="industry-card-micro-label">{featured.microLabel}</span>
                </div>
                <h3>{featured.title}</h3>
                <p>{featured.description}</p>

                <ul className="industry-capabilities-list">
                  {featured.keyCapabilities.slice(0, 3).map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>

                <div className="industry-featured-features" aria-label="Logistics highlights">
                  {featured.featureItems.map((item) => {
                    const Icon = industriesIconMap[item.icon];

                    return (
                      <div className="industry-feature-chip" key={item.label}>
                        <span className="industry-feature-icon" aria-hidden="true">
                          <Icon size={16} strokeWidth={1.9} />
                        </span>
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>

                <Link className="industry-featured-link" href={featured.href}>
                  Explore Industry <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          <aside className="industries-stack" aria-label="Industry selector">
            <div className="industries-stack-intro" data-reveal-item>
              <span className="industry-card-micro-label">Operating Environments</span>
              <p>Choose the industry lens that matches the fleet workflow you want to explore.</p>
            </div>

            {homeIndustriesContent.stackCards.map((card, index) => {
              const Icon = industriesIconMap[card.icon];
              const isActive = index === 0;

              return (
                <Link
                  className={`industry-stack-card${isActive ? " is-active" : ""}`}
                  href={card.href}
                  aria-label={`View ${card.title} industry details`}
                  aria-current={isActive ? "page" : undefined}
                  data-reveal-item
                  key={card.title}
                >
                  <span className="industry-stack-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="industry-stack-content">
                    <div className="industry-card-copy">
                      <div className="industry-card-meta">
                        <span className="industry-card-icon" aria-hidden="true">
                          <Icon size={16} strokeWidth={1.9} />
                        </span>
                        <span className="industry-card-micro-label">{card.microLabel}</span>
                      </div>
                      <div className="industry-stack-heading">
                        <h3>{card.title}</h3>
                        <span className="industry-stack-arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      </div>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </aside>
        </div>
      </div>
    </section>
  );
}

export function PublicHardwareSection() {
  return (
    <section id="hardware" className="content-section" data-reveal data-defer-render>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{hardwareEcosystemContent.eyebrow}</p>
          <h2>{hardwareEcosystemContent.heading}</h2>
          <p className="section-subtitle">{hardwareEcosystemContent.description}</p>
        </div>

        <div className="hardware-grid" data-reveal-group>
          {hardwareEcosystemContent.cards.map((card, index) => (
            <article
              className={`product-card${card.featured ? " product-card-featured" : ""}`}
              data-reveal-item
              key={`${card.href}-${index}`}
            >
              <div className={`product-media${card.lightMedia ? " product-media-light" : ""}`}>
                <Image
                  className={`product-media-image ${card.imageClass}`}
                  src={resolveCloudinaryAsset(card.imageSrc)}
                  alt={card.imageAlt}
                  width={360}
                  height={280}
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
                />
              </div>
              <p className="product-category">{card.category}</p>
              <h3>{card.title}</h3>
              <p className="product-specs">{card.specs}</p>
              <p>{card.description}</p>
              <ul className="product-list">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link className="button button-outline" href={card.href}>
                View Details
              </Link>
            </article>
          ))}
        </div>

        <div className="product-section-actions" data-reveal>
          <Link className="button button-primary" href={hardwareEcosystemContent.cta.href}>
            {hardwareEcosystemContent.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PublicTrustEvidenceSection() {
  return (
    <section className={`content-section ${trustStyles.section}`} data-reveal data-defer-render>
      <div className="container">
        <div className={trustStyles.topline} data-reveal-group>
          <div className={trustStyles.intro} data-reveal-item>
            <p className={trustStyles.eyebrow}>{homepageTrustContent.eyebrow}</p>
            <h2 className={trustStyles.heading}>{homepageTrustContent.heading}</h2>
            <p className={trustStyles.copy}>{homepageTrustContent.description}</p>
            <div className={trustStyles.platformStrip} aria-label="Review platforms">
              {homepageTrustContent.reviews.map((review) => (
                <span className={trustStyles.platformPill} key={`${review.platform}-pill`}>
                  {review.platform}
                </span>
              ))}
            </div>
          </div>

          <aside className={trustStyles.validationPanel} data-reveal-item>
            <p className={trustStyles.validationEyebrow}>Validation Snapshot</p>
            <div className={trustStyles.reviewStack}>
              {homepageTrustContent.reviews.map((review) => (
                <article className={trustStyles.reviewItem} key={review.platform}>
                  <div className={trustStyles.reviewHeader}>
                    <span className={trustStyles.reviewPlatform}>{review.platform}</span>
                    <span className={trustStyles.reviewScore}>{review.score}</span>
                  </div>
                  <div
                    className={trustStyles.reviewStars}
                    aria-label={`${review.platform} rating ${review.score}`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${review.platform}-${index}`}
                        size={14}
                        strokeWidth={1.8}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className={trustStyles.reviewSummary}>{review.summary}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className={trustStyles.metricsGrid} data-reveal-group>
          {homepageTrustContent.stats.map((stat) => {
            const Icon = trustIconMap[stat.icon];

            return (
              <article className={trustStyles.metricCard} key={stat.label} data-reveal-item>
                <div className={trustStyles.metricTopline}>
                  <span className={trustStyles.metricIcon} aria-hidden="true">
                    <Icon size={16} strokeWidth={1.9} />
                  </span>
                  <span className={trustStyles.metricLabel}>{stat.label}</span>
                </div>
                <strong className={trustStyles.metricValue}>{stat.value}</strong>
                <p className={trustStyles.metricDetail}>{stat.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PublicResultsSection() {
  return (
    <section className={`content-section ${resultsStyles.section}`} data-reveal data-defer-render>
      <div className="container">
        <div className={resultsStyles.shell}>
          <div className={resultsStyles.intro}>
            <p className={resultsStyles.eyebrow}>{resultsContent.eyebrow}</p>
            <h2 className={resultsStyles.heading}>
              {resultsContent.heading[0]}
              <br />
              {resultsContent.heading[1]}
            </h2>
            <p className={resultsStyles.copy}>{resultsContent.description}</p>
          </div>

          <ol className={resultsStyles.list} data-reveal-group>
            {resultsContent.outcomes.map((outcome) => (
              <li className={resultsStyles.row} key={outcome.number} data-reveal-item>
                <span className={resultsStyles.number}>{outcome.number}</span>
                <div className={resultsStyles.content}>
                  <h3 className={resultsStyles.title}>{outcome.title}</h3>
                  <p className={resultsStyles.description}>{outcome.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function PublicHomeSupportSection() {
  return (
    <section className="content-section section-home-support" data-reveal data-defer-render>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{homepageSupportContent.eyebrow}</p>
          <h2>{homepageSupportContent.heading}</h2>
          <p className="section-subtitle">{homepageSupportContent.description}</p>
        </div>

        <div className="home-support-grid" data-reveal-group>
          {homepageSupportContent.cards.map((card, index) => {
            const Icon = supportIconMap[card.icon];

            return (
              <article className="home-support-card" key={`${card.title}-${index}`} data-reveal-item>
                <span className="home-support-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                <p className="home-support-title">{card.title}</p>
                <p className="home-support-description">{card.description}</p>
                <Link className="home-support-link" href={card.href}>
                  {card.value}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
