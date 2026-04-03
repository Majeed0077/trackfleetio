import styles from "./WhySection.module.css";
import { whyTrackFleetioContent } from "@/lib/content/homepage";

export function WhySection() {
  return (
    <section className={`content-section ${styles.section}`} data-reveal>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{whyTrackFleetioContent.eyebrow}</p>
            <h2 className={styles.heading}>{whyTrackFleetioContent.heading}</h2>
            <p className={styles.copy}>{whyTrackFleetioContent.description}</p>
            <p className={styles.transition}>{whyTrackFleetioContent.transition}</p>
          </div>

          <ol className={styles.list} data-reveal-group>
            {whyTrackFleetioContent.benefits.map((benefit) => (
              <li className={styles.row} key={benefit.number} data-reveal-item>
                <span className={styles.number}>{benefit.number}</span>
                <div className={styles.content}>
                  <h3 className={styles.title}>{benefit.title}</h3>
                  <p className={styles.description}>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
