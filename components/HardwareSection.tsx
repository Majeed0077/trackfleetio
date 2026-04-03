import Image from "next/image";
import Link from "next/link";
import { hardwareEcosystemContent } from "@/lib/content/homepage";

export function HardwareSection() {
  return (
    <section id="hardware" className="content-section" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{hardwareEcosystemContent.eyebrow}</p>
          <h2>{hardwareEcosystemContent.heading}</h2>
          <p className="section-subtitle">{hardwareEcosystemContent.description}</p>
        </div>

        <div className="hardware-grid" data-reveal-group>
          {hardwareEcosystemContent.cards.map((card) => (
            <article
              className={`product-card${card.featured ? " product-card-featured" : ""}`}
              data-reveal-item
              key={card.title}
            >
              <div className={`product-media${card.lightMedia ? " product-media-light" : ""}`} data-parallax="soft">
                <Image
                  className={`product-media-image ${card.imageClass}`}
                  src={card.imageSrc}
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
