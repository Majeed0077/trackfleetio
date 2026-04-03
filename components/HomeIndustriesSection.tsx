import Image from "next/image";
import Link from "next/link";
import { Boxes, Briefcase, Crosshair, Package, Route, Truck, Wrench } from "lucide-react";
import { homeIndustriesContent } from "@/lib/content/homepage";

const iconMap = {
  boxes: Boxes,
  briefcase: Briefcase,
  crosshair: Crosshair,
  package: Package,
  route: Route,
  truck: Truck,
  wrench: Wrench,
} as const;

export function HomeIndustriesSection() {
  const FeaturedIcon = iconMap[homeIndustriesContent.featured.icon];

  return (
    <section id="industries" className="content-section section-industries" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{homeIndustriesContent.eyebrow}</p>
          <h2>{homeIndustriesContent.heading}</h2>
          <p className="section-subtitle">{homeIndustriesContent.description}</p>
        </div>

        <div className="industries-showcase" data-reveal-group>
          <Link className="industry-featured-card" href={homeIndustriesContent.featured.href} aria-label="View logistics industry details" data-reveal-item>
            <div className="industry-featured-media" data-parallax="soft">
              <Image
                className="industry-featured-image"
                src={homeIndustriesContent.featured.imageSrc}
                alt={homeIndustriesContent.featured.imageAlt}
                width={720}
                height={520}
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
            <div className="industry-featured-content">
              <div className="industry-card-copy">
                <div className="industry-card-meta">
                  <span className="industry-card-icon" aria-hidden="true">
                    <FeaturedIcon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="industry-card-micro-label">{homeIndustriesContent.featured.microLabel}</span>
                </div>
                <h3>{homeIndustriesContent.featured.title}</h3>
                <p>{homeIndustriesContent.featured.description}</p>
                <div className="industry-capabilities">
                  <span className="industry-capabilities-label">Key Capabilities</span>
                  <ul className="industry-capabilities-list">
                    {homeIndustriesContent.featured.keyCapabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
                <div className="industry-featured-features" aria-label="Logistics highlights">
                  {homeIndustriesContent.featured.featureItems.map((item) => {
                    const Icon = iconMap[item.icon];

                    return (
                      <div className="industry-feature-item" key={item.label}>
                        <div className="industry-feature-meta">
                          <span className="industry-feature-icon" aria-hidden="true">
                            <Icon size={18} strokeWidth={1.9} />
                          </span>
                          <span className="industry-card-micro-label">{item.label}</span>
                        </div>
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Link>

          <div className="industries-stack">
            {homeIndustriesContent.stackCards.map((card) => {
              const Icon = iconMap[card.icon];

              return (
                <Link className="industry-stack-card" href={card.href} aria-label={`View ${card.title} industry details`} data-reveal-item key={card.title}>
                  <div className="industry-stack-content">
                    <div className="industry-card-copy">
                      <div className="industry-card-meta">
                        <span className="industry-card-icon" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.9} />
                        </span>
                        <span className="industry-card-micro-label">{card.microLabel}</span>
                      </div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
