"use client";

import { Star } from "lucide-react";

import styles from "./TrustEvidenceSection.module.css";
import { useAppStore } from "@/store/store";

export function TrustEvidenceSection() {
  const trustDraft = useAppStore((state) => state.cmsDrafts.homepageTrust);

  return (
    <section className={`content-section ${styles.section}`} data-reveal>
      <div className="container">
        <div className={styles.intro} data-reveal-item>
          <div className={styles.introLead}>
            <p className={styles.eyebrow}>{trustDraft.eyebrow}</p>
            <h2 className={styles.heading}>{trustDraft.heading}</h2>
          </div>
          <div className={styles.introSupport}>
            <p className={styles.copy}>{trustDraft.description}</p>
          </div>
        </div>

        <div className={styles.statsRow} data-reveal-group>
          {trustDraft.stats.map((stat) => (
            <div className={styles.statItem} key={stat.label} data-reveal-item>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.reviewsRow} data-reveal-group>
          {trustDraft.reviews.map((review) => (
            <div className={styles.reviewItem} key={review.platform} data-reveal-item>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewPlatform}>{review.platform}</span>
                <span className={styles.reviewScore}>{review.score}</span>
              </div>
              <div className={styles.reviewStars} aria-label={`${review.platform} rating ${review.score}`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`${review.platform}-${index}`} size={14} strokeWidth={1.8} fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.divider} aria-hidden="true" />
      </div>
    </section>
  );
}
