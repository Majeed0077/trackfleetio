import Link from "next/link";
import { LifeBuoy, Mail, PhoneCall } from "lucide-react";

import { homepageSupportContent } from "@/lib/content/homepage";

const supportIconMap = {
  chat: LifeBuoy,
  mail: Mail,
  phone: PhoneCall,
} as const;

export function HomeSupportSection() {
  return (
    <section className="content-section section-home-support" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{homepageSupportContent.eyebrow}</p>
          <h2>{homepageSupportContent.heading}</h2>
          <p className="section-subtitle">{homepageSupportContent.description}</p>
        </div>

        <div className="home-support-grid" data-reveal-group>
          {homepageSupportContent.cards.map((card) => {
            const Icon = supportIconMap[card.icon];

            return (
              <article className="home-support-card" key={card.title} data-reveal-item>
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
