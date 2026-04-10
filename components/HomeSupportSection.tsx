"use client";

import Link from "next/link";
import { LifeBuoy, Mail, PhoneCall } from "lucide-react";

import { homepageSupportContent } from "@/lib/content/homepage";
import { useAppStore } from "@/store/store";

const supportIconMap = {
  chat: LifeBuoy,
  mail: Mail,
  phone: PhoneCall,
} as const;

export function HomeSupportSection() {
  const supportDraft = useAppStore((state) => state.cmsDrafts.homepageSupport);
  const supportCards = homepageSupportContent.cards.map((card, index) => ({
    ...card,
    title: supportDraft.cards[index]?.title?.trim() || card.title,
    description: supportDraft.cards[index]?.description?.trim() || card.description,
    value: supportDraft.cards[index]?.value?.trim() || card.value,
    href: supportDraft.cards[index]?.href?.trim() || card.href,
  }));

  return (
    <section className="content-section section-home-support" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">{supportDraft.eyebrow}</p>
          <h2>{supportDraft.heading}</h2>
          <p className="section-subtitle">{supportDraft.description}</p>
        </div>

        <div className="home-support-grid" data-reveal-group>
          {supportCards.map((card, index) => {
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
