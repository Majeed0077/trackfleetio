"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { startTransition } from "react";

import { solutionsList, type SolutionDetail } from "@/lib/solutions";

type DiscoveryFilter =
  | "all"
  | "tracking"
  | "monitoring"
  | "video"
  | "operations"
  | "public-sector"
  | "industrial";

type SolutionMeta = {
  category: "Tracking" | "Monitoring" | "Video" | "Operations";
  market: "Logistics" | "Public Sector" | "Industrial" | "Field Services";
  featured: boolean;
  badges: string[];
  outcome: string;
};

const problemEntryFilters: Array<{ value: Exclude<DiscoveryFilter, "all">; label: string }> = [
  { value: "video", label: "Improve driver safety" },
  { value: "tracking", label: "Track vehicles and assets" },
  { value: "monitoring", label: "Monitor conditions" },
  { value: "operations", label: "Manage field teams" },
  { value: "public-sector", label: "Improve compliance oversight" },
  { value: "industrial", label: "Reduce visibility gaps" },
];

const discoveryFilterLabels: Record<DiscoveryFilter, string> = {
  all: "All solutions",
  video: "Improve driver safety",
  tracking: "Track vehicles and assets",
  monitoring: "Monitor conditions",
  operations: "Manage field teams",
  "public-sector": "Improve compliance oversight",
  industrial: "Reduce visibility gaps",
};

const solutionMetaBySlug: Record<string, SolutionMeta> = {
  "monitoring-systems": {
    category: "Monitoring",
    market: "Industrial",
    featured: true,
    badges: ["Fuel", "Temperature", "TPMS"],
    outcome: "Unify fleet condition signals before service problems turn into downtime.",
  },
  "fuel-monitoring-system": {
    category: "Monitoring",
    market: "Industrial",
    featured: true,
    badges: ["Loss detection", "Tank levels", "Alerts"],
    outcome: "Expose abnormal fuel activity faster and tighten cost control across active assets.",
  },
  "temperature-monitoring-system": {
    category: "Monitoring",
    market: "Logistics",
    featured: false,
    badges: ["Cold chain", "Threshold alerts", "Audit trail"],
    outcome: "Protect temperature-sensitive deliveries with live telemetry and exception handling.",
  },
  "tire-pressure-monitoring-system": {
    category: "Monitoring",
    market: "Logistics",
    featured: false,
    badges: ["Safety", "Maintenance", "Uptime"],
    outcome: "Catch tire health issues earlier and reduce road-risk events.",
  },
  "water-management-system": {
    category: "Operations",
    market: "Industrial",
    featured: false,
    badges: ["Tank levels", "Remote ops", "Routing"],
    outcome: "Improve service timing and remote tank visibility without manual field updates.",
  },
  "field-force-management": {
    category: "Operations",
    market: "Field Services",
    featured: true,
    badges: ["Dispatch", "Verification", "Mobile teams"],
    outcome: "Give supervisors live field visibility across routes, arrivals, and service proof.",
  },
  "school-bus-tracking": {
    category: "Tracking",
    market: "Public Sector",
    featured: false,
    badges: ["Route timing", "Passenger safety", "School fleets"],
    outcome: "Strengthen school transport visibility for coordinators, drivers, and service teams.",
  },
  "smart-waste-collection-tracking": {
    category: "Tracking",
    market: "Public Sector",
    featured: false,
    badges: ["Proof of service", "Route review", "Collection fleets"],
    outcome: "Track scheduled pickups with better service evidence and route performance insight.",
  },
  "parts-tracking": {
    category: "Tracking",
    market: "Logistics",
    featured: false,
    badges: ["High-value assets", "Recovery", "Movement"],
    outcome: "Keep high-value parts visible through depot handoffs and in-transit workflows.",
  },
  "indoor-tracking": {
    category: "Tracking",
    market: "Industrial",
    featured: false,
    badges: ["Facility visibility", "Indoor assets", "Workflow control"],
    outcome: "Reduce search time and improve facility coordination with stronger asset awareness.",
  },
  "lorawan-technology": {
    category: "Monitoring",
    market: "Industrial",
    featured: false,
    badges: ["Low power", "Remote sensors", "Distributed telemetry"],
    outcome: "Extend monitoring coverage across remote deployments where power efficiency matters.",
  },
  "public-transport-business-solution": {
    category: "Video",
    market: "Public Sector",
    featured: true,
    badges: ["Passenger safety", "Transit routes", "Service reliability"],
    outcome: "Combine route telemetry, safety review, and fleet readiness for transit operations.",
  },
  "electric-vehicle-management": {
    category: "Operations",
    market: "Logistics",
    featured: false,
    badges: ["EV visibility", "Service planning", "Route oversight"],
    outcome: "Manage electric fleet operations with clearer movement and service insight.",
  },
  "oil-tanker-monitoring-solutions": {
    category: "Video",
    market: "Industrial",
    featured: false,
    badges: ["Sensitive cargo", "Load visibility", "Route control"],
    outcome: "Support high-control tanker operations with monitoring, telemetry, and evidence capture.",
  },
};

const heroProof = ["Transport", "Public Sector", "Field Services", "Industrial fleets"];
const filterAliases: Record<string, DiscoveryFilter> = {
  all: "all",
  tracking: "tracking",
  monitoring: "monitoring",
  video: "video",
  operations: "operations",
  "public-sector": "public-sector",
  industrial: "industrial",
};

function getSolutionMeta(solution: SolutionDetail): SolutionMeta {
  return (
    solutionMetaBySlug[solution.slug] ?? {
      category: "Operations",
      market: "Industrial",
      featured: false,
      badges: solution.useCases.slice(0, 3).map((useCase) => useCase.title),
      outcome: solution.description,
    }
  );
}

function matchesFilter(filter: DiscoveryFilter, solution: SolutionDetail) {
  if (filter === "all") {
    return true;
  }

  const meta = getSolutionMeta(solution);

  switch (filter) {
    case "tracking":
      return meta.category === "Tracking";
    case "monitoring":
      return meta.category === "Monitoring";
    case "video":
      return meta.category === "Video";
    case "operations":
      return meta.category === "Operations";
    case "public-sector":
      return meta.market === "Public Sector";
    case "industrial":
      return meta.market === "Industrial";
    default:
      return true;
  }
}

function toOneLineSummary(text: string, maxLength = 96) {
  const cleaned = text.replace(/\s+/g, " ").trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const truncated = cleaned.slice(0, maxLength).trimEnd();
  return `${truncated.replace(/[.,;:!?-]+$/g, "")}…`;
}

export function SolutionsCatalogPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedFilter = searchParams.get("group");
  const activeFilter = requestedFilter ? filterAliases[requestedFilter] ?? "all" : "all";

  const filteredSolutions = solutionsList.filter((solution) =>
    matchesFilter(activeFilter, solution),
  );
  const featuredSolutions = filteredSolutions.filter((solution) => getSolutionMeta(solution).featured);
  const featuredShelf = (featuredSolutions.length >= 3 ? featuredSolutions : filteredSolutions).slice(0, 3);
  const heroMostUsedShelf = (featuredSolutions.length ? featuredSolutions : solutionsList).slice(0, 3);

  const updateFilter = (filter: DiscoveryFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === "all") {
      params.delete("group");
    } else {
      params.set("group", filter);
    }

    const query = params.toString();

    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  return (
    <main id="main-content" className="site-main solutions-catalog-page">
      <section className="solutions-hero">
        <div className="container">
          <div className="solutions-hero-shell">
            <div className="solutions-hero-copy">
              <span className="products-badge">Solutions</span>
              <h1>Fleet solutions built for real operations.</h1>
              <p className="solutions-hero-text">
                Start from an operational problem, compare the most common solution paths, and then
                go deeper into the workflow and hardware fit for your fleet.
              </p>
              <div className="solutions-hero-actions">
                <Link className="button button-primary" href="/contact">
                  Talk to a solutions specialist
                </Link>
                <Link className="button button-secondary" href="/products">
                  View Hardware
                </Link>
              </div>
              <div className="solutions-hero-proof" aria-label="Primary markets">
                {heroProof.map((item) => (
                  <span className="solutions-proof-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="solutions-hero-panel" aria-label="Most-used solution paths">
              <div className="solutions-hero-panel-heading">
                <p>Most-used solution paths</p>
                <span>Quick picks</span>
              </div>

              <div className="solutions-hero-highlights" aria-label="Common starting points">
                {heroMostUsedShelf.map((solution) => {
                  const meta = getSolutionMeta(solution);

                  return (
                    <article className="solutions-highlight-row" key={`hero-${solution.slug}`}>
                      <strong>{solution.title}</strong>
                      <p>{toOneLineSummary(meta.outcome)}</p>
                      <Link
                        className="solutions-inline-link is-muted solutions-hero-mini-link"
                        href={`/solutions/${solution.slug}`}
                        aria-label={`View details for ${solution.title}`}
                      >
                        View details <ArrowRight size={15} strokeWidth={2} />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="solutions-browse-section">
        <div className="container">
          <div className="solutions-section-head solutions-section-head-balanced">
            <div className="solutions-section-head-main">
              <p className="eyebrow">Start Here</p>
              <h2>Start from your problem, then narrow the best-fit path.</h2>
              <p className="section-subtitle">
                Choose a common operational need. We will narrow the library without hiding anything.
              </p>
            </div>
            <div className="solutions-section-head-aside" aria-hidden="true" />
          </div>

          <div className="solutions-filter-bar" aria-label="Solution filters">
            <div className="solutions-filter-pills">
              {problemEntryFilters.map((filter) => (
                <button
                  key={filter.value}
                  className={`solutions-filter-pill${activeFilter === filter.value ? " is-active" : ""}`}
                  type="button"
                  onClick={() => updateFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
              {activeFilter !== "all" ? (
                <button className="solutions-filter-pill" type="button" onClick={() => updateFilter("all")}>
                  View all
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-featured-section">
        <div className="container">
          <div className="solutions-section-head solutions-section-head-split solutions-section-head-featured">
            <div>
              <p className="eyebrow">Common Starting Points</p>
              <h2>Most-used solution paths buyers start with.</h2>
            </div>
            <p className="section-subtitle">
              Pick one path to validate fit quickly, then compare nearby workflows in the library.
            </p>
          </div>

          <div className="solutions-featured-grid">
            {featuredShelf.map((solution) => {
              const meta = getSolutionMeta(solution);

              return (
                <article className="solutions-featured-card" key={solution.slug}>
                  <div className="solutions-featured-topline">
                    <span>{meta.category}</span>
                    <span>{meta.market}</span>
                  </div>
                  <h3>{solution.title}</h3>
                  <p className="solutions-featured-description">{meta.outcome}</p>
                  <ul className="solutions-library-list" aria-label={`${solution.title} highlights`}>
                    {solution.useCases.slice(0, 2).map((useCase) => (
                      <li key={`${solution.slug}-${useCase.title}`}>
                        <CheckCircle2 size={15} strokeWidth={2} />
                        <span>{useCase.title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="solutions-featured-actions">
                    <Link
                      className="solutions-inline-link"
                      href={`/solutions/${solution.slug}`}
                      aria-label={`View details for ${solution.title}`}
                    >
                      View details <ArrowRight size={15} strokeWidth={2} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="solutions-library-section">
        <div className="container">
          <div className="solutions-section-head solutions-section-head-split">
            <div>
              <p className="eyebrow">Solution Library</p>
              <h2>Browse all workflows grouped for faster scanning.</h2>
            </div>
            <p className="section-subtitle">
              {filteredSolutions.length} result{filteredSolutions.length === 1 ? "" : "s"} shown for{" "}
              {discoveryFilterLabels[activeFilter] ?? "All solutions"}.
            </p>
          </div>

          <div className="solutions-library-groups">
            {(["Tracking", "Monitoring", "Video", "Operations"] as const).map((category) => {
              const groupedSolutions = filteredSolutions.filter(
                (solution) => getSolutionMeta(solution).category === category,
              );

              if (!groupedSolutions.length) {
                return null;
              }

              const categoryLabel = category === "Video" ? "Video / Safety" : category;

              return (
                <section
                  className="solutions-library-group"
                  key={category}
                  aria-label={`${categoryLabel} solutions`}
                >
                  <div className="solutions-library-group-head">
                    <h3 className="solutions-library-group-title">{categoryLabel}</h3>
                  </div>
                  <div className="solutions-library-grid">
                    {groupedSolutions.map((solution) => {
                      const meta = getSolutionMeta(solution);

                      return (
                        <article className="solutions-library-card" key={solution.slug}>
                          <div className="solutions-library-topline">
                            <p>{meta.category}</p>
                            <span>{meta.market}</span>
                          </div>
                          <h3>{solution.title}</h3>
                          <p className="solutions-library-description">{meta.outcome}</p>
                          <ul className="solutions-library-list" aria-label={`${solution.title} highlights`}>
                            {solution.useCases.slice(0, 2).map((useCase) => (
                              <li key={`${solution.slug}-${useCase.title}`}>
                                <CheckCircle2 size={15} strokeWidth={2} />
                                <span>{useCase.title}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="solutions-library-footer">
                            <Link
                              className="solutions-inline-link"
                              href={`/solutions/${solution.slug}`}
                              aria-label={`View details for ${solution.title}`}
                            >
                              View details <ArrowRight size={15} strokeWidth={2} />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {false && (
      <section className="solutions-bottom-cta">
        <div className="container">
          <div className="solutions-bottom-cta-panel">
            <div className="solutions-bottom-cta-copy">
              <p className="eyebrow">Need help choosing?</p>
              <h2>Tell us your workflow and we’ll narrow the best fit.</h2>
              <p>
                Share your fleet mix and operational goals. We’ll recommend the right starting path and hardware stack.
              </p>
            </div>
            <div className="solutions-bottom-cta-actions">
              <Link className="button button-primary" href="/contact">
                Talk to Solutions Team
              </Link>
              <Link className="solutions-inline-link is-muted solutions-bottom-text-link" href="/products">
                Browse hardware first <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}
    </main>
  );
}
