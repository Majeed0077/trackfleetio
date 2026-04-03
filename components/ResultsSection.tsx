import styles from "./ResultsSection.module.css";
import { resultsContent } from "@/lib/content/homepage";

export function ResultsSection() {
  return (
    <section className={`content-section ${styles.section}`} data-reveal>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{resultsContent.eyebrow}</p>
            <h2 className={styles.heading}>
              {resultsContent.heading[0]}
              <br />
              {resultsContent.heading[1]}
            </h2>
            <p className={styles.copy}>{resultsContent.description}</p>
          </div>

          <ol className={styles.list} data-reveal-group>
            {resultsContent.outcomes.map((outcome) => (
              <li className={styles.row} key={outcome.number} data-reveal-item>
                <span className={styles.number}>{outcome.number}</span>
                <div className={styles.content}>
                  <h3 className={styles.title}>{outcome.title}</h3>
                  <p className={styles.description}>{outcome.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
