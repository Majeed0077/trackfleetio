"use client";

import Image from "next/image";
import Link from "next/link";
import { Boxes, Briefcase, Crosshair, Package, Route, Truck, Wrench } from "lucide-react";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { homeIndustriesContent } from "@/lib/content/homepage";
import { useAppStore } from "@/store/store";

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
  const industriesDraft = useAppStore((state) => state.cmsDrafts.homepageIndustries);
  const FeaturedIcon = iconMap[homeIndustriesContent.featured.icon];
  const featuredImageSrc = industriesDraft.featuredImageSrc.trim() || homeIndustriesContent.featured.imageSrc;
  const featuredImageAlt = industriesDraft.featuredImageAlt.trim() || homeIndustriesContent.featured.imageAlt;

  return (
    <section id="industries" className="content-section section-industries" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{industriesDraft.eyebrow}</p>
          <h2>{industriesDraft.heading}</h2>
          <p className="section-subtitle">{industriesDraft.description}</p>
        </div>

        <div className="industries-showcase" data-reveal-group>
          <div className="industry-featured-card" data-reveal-item>
            <Link
              className="industry-featured-media-link"
              href={homeIndustriesContent.featured.href}
              aria-label="View logistics industry details"
            >
              <div className="industry-featured-media" data-parallax="soft">
                <Image
                  className="industry-featured-image"
                  src={resolveCloudinaryAsset(featuredImageSrc)}
                  alt={featuredImageAlt}
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
                  <span className="industry-card-micro-label">{homeIndustriesContent.featured.microLabel}</span>
                </div>
                <h3>{homeIndustriesContent.featured.title}</h3>
                <p>{homeIndustriesContent.featured.description}</p>

                <ul className="industry-capabilities-list">
                  {homeIndustriesContent.featured.keyCapabilities.slice(0, 3).map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>

                <div className="industry-featured-features" aria-label="Logistics highlights">
                  {homeIndustriesContent.featured.featureItems.map((item) => {
                    const Icon = iconMap[item.icon];

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

                <Link className="industry-featured-link" href={homeIndustriesContent.featured.href}>
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
              const Icon = iconMap[card.icon];
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
