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
  const featured = homeIndustriesContent.featured;
  const FeaturedIcon = iconMap[featured.icon];
  const featuredImageSrc = industriesDraft.featuredImageSrc.trim() || featured.imageSrc;
  const featuredImageAlt = industriesDraft.featuredImageAlt.trim() || featured.imageAlt;
  const featuredMicroLabel = industriesDraft.featuredMicroLabel.trim() || featured.microLabel;
  const featuredTitle = industriesDraft.featuredTitle.trim() || featured.title;
  const featuredDescription = industriesDraft.featuredDescription.trim() || featured.description;
  const featuredCapabilities = featured.keyCapabilities.map(
    (capability, index) => industriesDraft.featuredCapabilities[index]?.trim() || capability,
  );
  const featuredFeatureItems = featured.featureItems.map((item, index) => ({
    ...item,
    label: industriesDraft.featuredFeatureItems[index]?.label?.trim() || item.label,
    text: industriesDraft.featuredFeatureItems[index]?.text?.trim() || item.text,
  }));
  const featuredCtaLabel = industriesDraft.featuredCtaLabel.trim() || "Explore Industry";
  const stackIntroLabel = industriesDraft.stackIntroLabel.trim() || "Operating Environments";
  const stackIntroDescription =
    industriesDraft.stackIntroDescription.trim() ||
    "Choose the industry lens that matches the fleet workflow you want to explore.";
  const stackCards = homeIndustriesContent.stackCards.map((card, index) => ({
    ...card,
    microLabel: industriesDraft.stackCards[index]?.microLabel?.trim() || card.microLabel,
    title: industriesDraft.stackCards[index]?.title?.trim() || card.title,
    description: industriesDraft.stackCards[index]?.description?.trim() || card.description,
    href: industriesDraft.stackCards[index]?.href?.trim() || card.href,
  }));

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
              href={featured.href}
              aria-label="View logistics industry details"
            >
              <div className="industry-featured-media">
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
                  <span className="industry-card-micro-label">{featuredMicroLabel}</span>
                </div>
                <h3>{featuredTitle}</h3>
                <p>{featuredDescription}</p>

                <ul className="industry-capabilities-list">
                  {featuredCapabilities.slice(0, 3).map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>

                <div className="industry-featured-features" aria-label="Logistics highlights">
                  {featuredFeatureItems.map((item) => {
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

                <Link className="industry-featured-link" href={featured.href}>
                  {featuredCtaLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          <aside className="industries-stack" aria-label="Industry selector">
            <div className="industries-stack-intro" data-reveal-item>
              <span className="industry-card-micro-label">{stackIntroLabel}</span>
              <p>{stackIntroDescription}</p>
            </div>

            {stackCards.map((card, index) => {
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
