import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  MapPinned,
  Radar,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { getProductById, getProductHref } from "@/data/products";
import { solutionsList, type SolutionDetail } from "@/lib/solutions";

type SolutionTheme = {
  tone: "monitoring" | "operations" | "tracking" | "mobility";
  segment: string;
  audience: string;
  valueLine: string;
  bestFor: string[];
  deploymentModel: string;
  industries: string[];
  proofHighlights: { label: string; value: string }[];
  decisionPoints: string[];
};

const solutionThemes: Record<string, SolutionTheme> = {
  "monitoring-systems": {
    tone: "monitoring",
    segment: "Monitoring Control",
    audience: "Fleet, compliance, and service teams",
    valueLine: "Unify alerts, thresholds, and condition data across mission-critical assets.",
    bestFor: ["Mixed monitoring programs", "Compliance-heavy fleets", "Multi-signal visibility"],
    deploymentModel: "Sensor-led rollout with shared telemetry and alerting across multiple operating conditions.",
    industries: ["Logistics", "Industrial fleets", "Public transport"],
    proofHighlights: [
      { label: "Best for", value: "Cross-signal fleet monitoring" },
      { label: "Rollout", value: "Sensors + connected telemetry" },
    ],
    decisionPoints: ["Single-pane condition visibility", "Earlier exception detection", "Cleaner reporting trail"],
  },
  "fuel-monitoring-system": {
    tone: "monitoring",
    segment: "Fuel Visibility",
    audience: "Operations and cost-control teams",
    valueLine: "Spot suspicious fuel behavior faster and improve operating efficiency with live telemetry.",
    bestFor: ["Fuel accountability", "Loss detection", "Cost-sensitive fleets"],
    deploymentModel: "Tank-level sensing paired with live telematics for route and consumption context.",
    industries: ["Logistics", "Construction", "Heavy fleets"],
    proofHighlights: [
      { label: "Best for", value: "Fuel loss and usage control" },
      { label: "Rollout", value: "Sensor + 4G device stack" },
    ],
    decisionPoints: ["Anomaly visibility", "Driver and route comparison", "Lower manual fuel reporting"],
  },
  "temperature-monitoring-system": {
    tone: "monitoring",
    segment: "Cold-Chain Monitoring",
    audience: "Logistics and condition-sensitive operations",
    valueLine: "Protect shipments with live temperature visibility, cleaner audit trails, and faster exception response.",
    bestFor: ["Cold-chain logistics", "Condition-sensitive storage", "Audit-heavy operations"],
    deploymentModel: "Temperature sensing with live route connectivity for mobile and parked assets.",
    industries: ["Cold chain", "Logistics", "Food distribution"],
    proofHighlights: [
      { label: "Best for", value: "Condition-sensitive deliveries" },
      { label: "Rollout", value: "Sensor-led compliance monitoring" },
    ],
    decisionPoints: ["Threshold alerts", "Audit readiness", "Remote asset confidence"],
  },
  "tire-pressure-monitoring-system": {
    tone: "monitoring",
    segment: "Fleet Safety Monitoring",
    audience: "Safety, maintenance, and uptime teams",
    valueLine: "Reduce preventable road events by surfacing tire health issues before they affect service reliability.",
    bestFor: ["Preventive maintenance", "Safety-sensitive fleets", "Uptime improvement"],
    deploymentModel: "Pressure sensors paired with live fleet telemetry for maintenance and road-risk awareness.",
    industries: ["Transport", "Logistics", "Public transport"],
    proofHighlights: [
      { label: "Best for", value: "Vehicle safety and uptime" },
      { label: "Rollout", value: "Pressure sensing + live alerts" },
    ],
    decisionPoints: ["Earlier maintenance triggers", "Safer day-to-day driving", "Less emergency disruption"],
  },
  "water-management-system": {
    tone: "operations",
    segment: "Remote Tank Operations",
    audience: "Field service and utility teams",
    valueLine: "Connect tank visibility, route timing, and field accountability in one operating workflow.",
    bestFor: ["Tank-level oversight", "Remote servicing", "Utility field planning"],
    deploymentModel: "Level monitoring with route telemetry for remote assets and service fleets.",
    industries: ["Utilities", "Field services", "Industrial operations"],
    proofHighlights: [
      { label: "Best for", value: "Remote tank and service operations" },
      { label: "Rollout", value: "Level sensor + route telemetry" },
    ],
    decisionPoints: ["Tank awareness", "Service timing", "Remote accountability"],
  },
  "field-force-management": {
    tone: "operations",
    segment: "Field Operations",
    audience: "Dispatch and mobile workforce teams",
    valueLine: "Give supervisors live visibility across technicians, arrivals, service proof, and route execution.",
    bestFor: ["Mobile teams", "Service proof", "Dispatch control"],
    deploymentModel: "Tracking and video visibility deployed across technician vehicles and field units.",
    industries: ["Field services", "Utilities", "Maintenance"],
    proofHighlights: [
      { label: "Best for", value: "Dispatch-led service teams" },
      { label: "Rollout", value: "4G tracking + dashcam proof" },
    ],
    decisionPoints: ["Cleaner dispatch visibility", "Field accountability", "Service verification"],
  },
  "school-bus-tracking": {
    tone: "tracking",
    segment: "Student Transport Visibility",
    audience: "School transport operators",
    valueLine: "Support route reliability and safer school transport operations with live fleet awareness.",
    bestFor: ["School operators", "Passenger safety review", "Route timing visibility"],
    deploymentModel: "Route tracking with video review for school transport coordination and service assurance.",
    industries: ["Education", "Public sector", "Passenger transport"],
    proofHighlights: [
      { label: "Best for", value: "Student transport programs" },
      { label: "Rollout", value: "Tracking + safety visibility" },
    ],
    decisionPoints: ["Route confidence", "Safer service review", "Operator accountability"],
  },
  "smart-waste-collection-tracking": {
    tone: "operations",
    segment: "Route Execution",
    audience: "Municipal and private collection teams",
    valueLine: "Track service completion, route performance, and field accountability with cleaner records.",
    bestFor: ["Collection fleets", "Proof of service", "Municipal route control"],
    deploymentModel: "Tracking plus multi-channel evidence capture for service-heavy collection workflows.",
    industries: ["Municipal fleets", "Waste operations", "Field services"],
    proofHighlights: [
      { label: "Best for", value: "Collection route accountability" },
      { label: "Rollout", value: "Tracking + route evidence" },
    ],
    decisionPoints: ["Proof of service", "Route performance", "Incident review"],
  },
  "parts-tracking": {
    tone: "tracking",
    segment: "High-Value Asset Tracking",
    audience: "Depot, logistics, and inventory teams",
    valueLine: "Keep valuable parts visible across handoffs, depots, and in-transit workflows.",
    bestFor: ["High-value inventory", "Cross-site logistics", "Recovery readiness"],
    deploymentModel: "Asset tracking supported by mobile fleet telemetry across depots and transport legs.",
    industries: ["Logistics", "Warehousing", "Service supply chains"],
    proofHighlights: [
      { label: "Best for", value: "Parts and mobile inventory" },
      { label: "Rollout", value: "Asset tag + vehicle telemetry" },
    ],
    decisionPoints: ["Movement visibility", "Handoff control", "Recovery readiness"],
  },
  "indoor-tracking": {
    tone: "tracking",
    segment: "Facility Visibility",
    audience: "Warehouse and operations teams",
    valueLine: "Reduce search time and improve internal coordination with dependable indoor asset awareness.",
    bestFor: ["Warehouses", "Internal logistics", "Indoor asset control"],
    deploymentModel: "Asset tracking and deployment accessories tuned for indoor workflow visibility.",
    industries: ["Warehousing", "Manufacturing", "Facilities"],
    proofHighlights: [
      { label: "Best for", value: "Indoor asset movement" },
      { label: "Rollout", value: "Asset devices + install kit" },
    ],
    decisionPoints: ["Less search time", "Better workflow monitoring", "Stronger facility control"],
  },
  "lorawan-technology": {
    tone: "mobility",
    segment: "Low-Power Telemetry",
    audience: "Distributed field operations",
    valueLine: "Extend remote monitoring coverage where battery life, range, and efficient telemetry matter.",
    bestFor: ["Remote monitoring", "Wide-area coverage", "Battery-sensitive deployments"],
    deploymentModel: "Low-power sensing and asset visibility across distributed remote environments.",
    industries: ["Remote sites", "Industrial operations", "Environmental monitoring"],
    proofHighlights: [
      { label: "Best for", value: "Distributed remote telemetry" },
      { label: "Rollout", value: "Low-power sensor networks" },
    ],
    decisionPoints: ["Coverage efficiency", "Battery-conscious deployments", "Remote field visibility"],
  },
  "public-transport-business-solution": {
    tone: "mobility",
    segment: "Transit Operations",
    audience: "Public transport service teams",
    valueLine: "Combine route oversight, passenger safety review, and fleet readiness in one solution stack.",
    bestFor: ["Transit operators", "Passenger safety", "Route reliability"],
    deploymentModel: "Tracking, video, and vehicle-health stack built for public transport oversight.",
    industries: ["Public transport", "Passenger mobility", "Transit authorities"],
    proofHighlights: [
      { label: "Best for", value: "Transit route operations" },
      { label: "Rollout", value: "Tracking + video + TPMS" },
    ],
    decisionPoints: ["Service reliability", "Passenger safety review", "Fleet readiness"],
  },
  "electric-vehicle-management": {
    tone: "mobility",
    segment: "Electric Fleet Operations",
    audience: "EV fleet and service planning teams",
    valueLine: "Coordinate route visibility, service oversight, and fleet review across electric operations.",
    bestFor: ["EV programs", "Service planning", "Electric route operations"],
    deploymentModel: "Connected route and review stack for fleets running electric service operations.",
    industries: ["EV logistics", "Urban mobility", "Service fleets"],
    proofHighlights: [
      { label: "Best for", value: "Connected EV oversight" },
      { label: "Rollout", value: "Tracking + video review" },
    ],
    decisionPoints: ["Route visibility", "Service coordination", "Operational review"],
  },
  "oil-tanker-monitoring-solutions": {
    tone: "mobility",
    segment: "High-Control Monitoring",
    audience: "Sensitive cargo and regulated fleet teams",
    valueLine: "Support tanker route oversight, load visibility, and safety review with a tighter control stack.",
    bestFor: ["Regulated cargo fleets", "Sensitive routes", "Load-aware operations"],
    deploymentModel: "Monitoring, route telemetry, and multi-channel review for tightly controlled tanker workflows.",
    industries: ["Oil and gas", "Hazmat transport", "Long-haul logistics"],
    proofHighlights: [
      { label: "Best for", value: "Sensitive cargo visibility" },
      { label: "Rollout", value: "Monitoring + route evidence" },
    ],
    decisionPoints: ["Route control", "Load awareness", "Safety evidence"],
  },
};

function getSolutionTheme(solution: SolutionDetail): SolutionTheme {
  return (
    solutionThemes[solution.slug] ?? {
      tone: "operations",
      segment: "Connected Fleet Solution",
      audience: "B2B fleet operations teams",
      valueLine: solution.cta,
      bestFor: ["B2B fleet operations", "Deployment-ready workflows", "Connected hardware programs"],
      deploymentModel: "Connected hardware and operating workflows matched to one deployment path.",
      industries: ["Transport", "Logistics", "Industrial fleets"],
      proofHighlights: [
        { label: "Best for", value: "Connected fleet operations" },
        { label: "Rollout", value: "Workflow + hardware alignment" },
      ],
      decisionPoints: ["Operational fit", "Hardware clarity", "Buyer confidence"],
    }
  );
}

function getSolutionProducts(solution: SolutionDetail) {
  return solution.hardware.map((hardware) => {
    const product = hardware.productId ? getProductById(hardware.productId) : undefined;

    return {
      ...hardware,
      href: hardware.productId ? getProductHref(hardware.productId) : "/products",
      imageSrc: product?.imageSrc ?? "/Products/3Products.png",
      imageAlt: product?.imageAlt ?? hardware.title,
      imageClass: product?.imageClass ?? "catalog-card-image-gps",
      categoryLabel: product?.categoryLabel ?? hardware.category,
    };
  });
}

function getRelatedSolutions(solution: SolutionDetail) {
  const matchingSolutions = solutionsList.filter(
    (candidate) =>
      candidate.slug !== solution.slug &&
      candidate.hardware.some((item) =>
        solution.hardware.some((currentItem) => currentItem.productId && currentItem.productId === item.productId),
      ),
  );

  if (matchingSolutions.length >= 3) {
    return matchingSolutions.slice(0, 3);
  }

  const fallbackSolutions = solutionsList.filter(
    (candidate) => candidate.slug !== solution.slug && !matchingSolutions.includes(candidate),
  );

  return [...matchingSolutions, ...fallbackSolutions].slice(0, 3);
}

export function SolutionDetailPage({ solution }: { solution: SolutionDetail }) {
  const theme = getSolutionTheme(solution);
  const hardwareProducts = getSolutionProducts(solution);
  const heroProducts = hardwareProducts.slice(0, 3);
  const relatedSolutions = getRelatedSolutions(solution);
  const primaryCapabilities = solution.useCases.slice(0, 3).map((item) => item.title);

  return (
    <main
      id="main-content"
      className={`site-main solution-detail-page solution-detail-page-redesign solution-detail-tone-${theme.tone}`}
    >
      <section className="solution-detail-hero-redesign">
        <div className="container">
          <div className="solution-detail-hero-shell-redesign">
            <div className="solution-detail-hero-copy-redesign">
              <span className="products-badge">Solution</span>
              <p className="solution-detail-segment">{theme.segment}</p>
              <h1>{solution.title}</h1>
              <p className="solution-detail-hero-description">{solution.description}</p>

              <div className="solution-detail-hero-actions-redesign">
                <Link className="button button-secondary" href="/solutions">
                  Back to Solutions
                </Link>
              </div>

              <div className="solution-detail-proof-grid" aria-label="Solution summary">
                {theme.proofHighlights.map((item) => (
                  <article className="solution-detail-proof-card" key={`${solution.slug}-${item.label}`}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
                <article className="solution-detail-proof-card">
                  <span>Built For</span>
                  <strong>{theme.audience}</strong>
                </article>
              </div>
            </div>

            <div className="solution-detail-hero-visual">
              <div className="solution-detail-hero-visual-frame">
                <div className="solution-detail-hero-visual-copy">
                  <p>Recommended stack</p>
                  <strong>{theme.segment}</strong>
                </div>
                <div className="solution-detail-hero-device-grid">
                  {heroProducts.map((hardware) => (
                    <article className="solution-detail-hero-device-card" key={`${solution.slug}-${hardware.title}`}>
                      <div className="solution-detail-hero-device-media">
                        <Image
                          src={hardware.imageSrc}
                          alt={hardware.imageAlt}
                          width={360}
                          height={260}
                          className={`solution-detail-hero-device-image ${hardware.imageClass}`}
                        />
                      </div>
                      <div className="solution-detail-hero-device-copy">
                        <span>{hardware.categoryLabel}</span>
                        <strong>{hardware.title}</strong>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="solution-detail-hero-capabilities" aria-label="Primary capabilities">
                  {primaryCapabilities.map((capability) => (
                    <span className="solution-detail-capability-chip" key={`${solution.slug}-${capability}`}>
                      <Radar size={14} strokeWidth={1.9} />
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solution-detail-intro-strip">
        <div className="container">
          <div className="solution-detail-intro-grid">
            <article className="solution-detail-intro-card">
              <p className="eyebrow">Best Fit</p>
              <h2>Who this solution is built for</h2>
              <div className="solution-detail-bullet-list">
                {theme.bestFor.map((item) => (
                  <div className="solution-detail-bullet-item" key={`${solution.slug}-${item}`}>
                    <CheckCircle2 size={16} strokeWidth={2} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="solution-detail-intro-card solution-detail-intro-card-wide">
              <p className="eyebrow">Typical Deployment</p>
              <h2>How teams usually roll this out</h2>
              <p className="solution-detail-intro-copy">{theme.deploymentModel}</p>
              <div className="solution-detail-industry-chips" aria-label="Relevant industries">
                {theme.industries.map((industry) => (
                  <span className="solution-detail-industry-chip" key={`${solution.slug}-${industry}`}>
                    <MapPinned size={14} strokeWidth={1.9} />
                    {industry}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="solution-detail-section-redesign">
        <div className="container">
          <div className="solution-detail-section-heading">
            <p className="eyebrow">Operational Pressure</p>
            <h2>What teams need to solve first</h2>
            <p className="section-subtitle">
              These are the pressure points this solution is designed to control in day-to-day fleet operations.
            </p>
          </div>

          <div className="solution-detail-challenge-grid">
            {solution.challenges.map((challenge, index) => (
              <article className="solution-detail-challenge-card" key={`${solution.slug}-${challenge.title}`}>
                <span className="solution-detail-card-index">0{index + 1}</span>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-detail-section-redesign">
        <div className="container">
          <div className="solution-detail-section-heading solution-detail-section-heading-split">
            <div>
              <p className="eyebrow">Recommended Hardware</p>
              <h2>The hardware stack behind this workflow</h2>
            </div>
            <p className="section-subtitle">
              Every solution path is backed by installable tracking, video, or sensing hardware. No abstract platform story.
            </p>
          </div>

          <div className="solution-detail-hardware-grid-redesign">
            {hardwareProducts.map((hardware) => (
              <article className="solution-detail-hardware-card" key={`${solution.slug}-${hardware.title}`}>
                <div className="solution-detail-hardware-media">
                  <Image
                    src={hardware.imageSrc}
                    alt={hardware.imageAlt}
                    width={420}
                    height={300}
                    className={`solution-detail-hardware-image ${hardware.imageClass}`}
                  />
                </div>
                <div className="solution-detail-hardware-copy">
                  <p className="solution-detail-hardware-category">{hardware.category}</p>
                  <h3>{hardware.title}</h3>
                  <p className="solution-detail-hardware-specs">{hardware.specs}</p>
                  <p className="solution-detail-hardware-description">{hardware.description}</p>
                </div>
                <Link className="solutions-inline-link" href={hardware.href}>
                  View hardware <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-detail-section-redesign">
        <div className="container">
          <div className="solution-detail-operating-panel">
            <div className="solution-detail-operating-copy">
              <p className="eyebrow">Workflow Fit</p>
              <h2>How teams put this solution to work</h2>
              <p className="section-subtitle">
                The strongest solution pages should show not just hardware, but how that stack changes execution in the field.
              </p>
            </div>

            <div className="solution-detail-usecase-grid-redesign">
              {solution.useCases.map((useCase) => (
                <article className="solution-detail-usecase-card" key={`${solution.slug}-${useCase.title}`}>
                  <div className="solution-detail-usecase-icon" aria-hidden="true">
                    <Workflow size={18} strokeWidth={1.9} />
                  </div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="solution-detail-section-redesign solution-detail-section-decision">
        <div className="container">
          <div className="solution-detail-section-heading solution-detail-section-heading-split">
            <div>
              <p className="eyebrow">Decision Criteria</p>
              <h2>Why buyers choose this solution path</h2>
            </div>
            <p className="section-subtitle">
              A good B2B page should help a buyer understand why this solution deserves budget and deployment attention now.
            </p>
          </div>

          <div className="solution-detail-decision-grid">
            {theme.decisionPoints.map((point) => (
              <article className="solution-detail-decision-card" key={`${solution.slug}-${point}`}>
                <div className="solution-detail-decision-icon" aria-hidden="true">
                  <Radar size={16} strokeWidth={1.9} />
                </div>
                <strong>{point}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-detail-section-redesign">
        <div className="container">
          <div className="solution-detail-deployment-panel">
            <div className="solution-detail-deployment-copy">
              <p className="eyebrow">Deployment Fit</p>
              <h2>{solution.cta}</h2>
              <p>
                This page is built for B2B buyers who need to connect operational problems, deployment hardware,
                and measurable workflow outcomes without jumping between disconnected pages.
              </p>
            </div>

            <div className="solution-detail-deployment-points">
              <article className="solution-detail-deployment-item">
                <CheckCircle2 size={18} strokeWidth={2} />
                <div>
                  <strong>Operational challenge coverage</strong>
                  <p>{solution.challenges[0]?.description}</p>
                </div>
              </article>
              <article className="solution-detail-deployment-item">
                <Layers3 size={18} strokeWidth={2} />
                <div>
                  <strong>Stack-ready solution design</strong>
                  <p>
                    {hardwareProducts.map((hardware) => hardware.title).slice(0, 3).join(", ")} aligned to one workflow.
                  </p>
                </div>
              </article>
              <article className="solution-detail-deployment-item">
                <ShieldCheck size={18} strokeWidth={2} />
                <div>
                  <strong>Business-ready outcome</strong>
                  <p>{theme.valueLine}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="solution-detail-section-redesign solution-detail-section-related">
        <div className="container">
          <div className="solution-detail-section-heading solution-detail-section-heading-split">
            <div>
              <p className="eyebrow">Related Paths</p>
              <h2>Nearby solution pages your buyer may compare next</h2>
            </div>
            <p className="section-subtitle">
              These related solution paths share similar hardware, adjacent workflows, or the same operating audience.
            </p>
          </div>

          <div className="solution-detail-related-grid">
            {relatedSolutions.map((relatedSolution) => (
              <article className="solution-detail-related-card" key={relatedSolution.slug}>
                <p className="solution-detail-related-label">Solution</p>
                <h3>{relatedSolution.title}</h3>
                <p>{relatedSolution.description}</p>
                <Link className="solutions-inline-link" href={`/solutions/${relatedSolution.slug}`}>
                  Explore solution <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
