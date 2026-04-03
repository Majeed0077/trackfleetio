"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, SlidersHorizontal } from "lucide-react";
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

const discoveryFilters: { value: DiscoveryFilter; label: string }[] = [
  { value: "all", label: "All solutions" },
  { value: "tracking", label: "Tracking" },
  { value: "monitoring", label: "Monitoring" },
  { value: "video", label: "Video telematics" },
  { value: "operations", label: "Field ops" },
  { value: "public-sector", label: "Public sector" },
  { value: "industrial", label: "Industrial" },
];

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
                Track fleets, monitor conditions, review safety footage, and run field
                workflows from a solution stack designed around actual deployment needs.
              </p>
              <div className="solutions-hero-actions">
                <Link className="button button-primary" href="/contact">
                  Explore with Sales
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

            <div className="solutions-hero-panel">
              <div className="solutions-hero-panel-heading">
                <p>Find the right solution path in one pass</p>
                <span>Use case coverage</span>
              </div>

              <div className="solutions-hero-highlights">
                <article className="solutions-highlight-card solutions-highlight-card-primary">
                  <span className="solutions-highlight-eyebrow">Coverage</span>
                  <strong>{solutionsList.length} solution workflows</strong>
                  <p>Tracking, monitoring, field execution, public transport, and specialized mobility programs.</p>
                </article>
                <div className="solutions-highlight-list" aria-label="Core solution qualities">
                  <article className="solutions-highlight-row">
                    <strong>Hardware-ready deployment</strong>
                    <p>Every solution maps to an actual installable stack, not a vague concept slide.</p>
                  </article>
                  <article className="solutions-highlight-row">
                    <strong>Clearer buying path</strong>
                    <p>Filter by workflow first, then go deeper into the exact hardware and team fit.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-browse-section">
        <div className="container">
          <div className="solutions-section-head">
            <p className="eyebrow">Browse By Need</p>
            <h2>Start from the operational problem, not the product list.</h2>
            <p className="section-subtitle">
              Filter the catalog by workflow type to find the right solution path faster.
            </p>
          </div>

          <div className="solutions-filter-bar" aria-label="Solution filters">
            <div className="solutions-filter-title">
              <SlidersHorizontal size={16} strokeWidth={1.9} />
              <span>Solution filters</span>
            </div>
            <div className="solutions-filter-pills">
              {discoveryFilters.map((filter) => (
                <button
                  key={filter.value}
                  className={`solutions-filter-pill${activeFilter === filter.value ? " is-active" : ""}`}
                  type="button"
                  onClick={() => updateFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-featured-section">
        <div className="container">
          <div className="solutions-section-head solutions-section-head-split solutions-section-head-featured">
            <div>
              <p className="eyebrow">Featured Solutions</p>
              <h2>Priority solution paths for buyers who need a fast starting point.</h2>
            </div>
            <p className="section-subtitle">
              These are the strongest entry points for the current filter, with clearer
              use-case framing and faster next steps.
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
                  <p className="solutions-featured-description">{solution.description}</p>
                  <p className="solutions-featured-outcome">{meta.outcome}</p>
                  <div className="solutions-featured-badges" aria-label={`${solution.title} tags`}>
                    {meta.badges.map((badge) => (
                      <span className="solutions-featured-badge" key={`${solution.slug}-${badge}`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="solutions-featured-actions">
                    <Link className="solutions-inline-link" href={`/solutions/${solution.slug}`}>
                      Explore solution <ArrowRight size={15} strokeWidth={2} />
                    </Link>
                    <Link className="solutions-inline-link is-muted" href="/contact">
                      Talk to sales
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
              <h2>All solution workflows, with clearer scan value.</h2>
            </div>
            <p className="section-subtitle">
              {filteredSolutions.length} result{filteredSolutions.length === 1 ? "" : "s"} shown for{" "}
              {
                discoveryFilters.find((filter) => filter.value === activeFilter)?.label ??
                "All solutions"
              }
              .
            </p>
          </div>

          <div className="solutions-library-grid">
            {filteredSolutions.map((solution) => {
              const meta = getSolutionMeta(solution);

              return (
                <article className="solutions-library-card" key={solution.slug}>
                  <div className="solutions-library-topline">
                    <p>{meta.category}</p>
                    <span>{meta.market}</span>
                  </div>
                  <h3>{solution.title}</h3>
                  <p className="solutions-library-description">{solution.description}</p>
                  <ul className="solutions-library-list" aria-label={`${solution.title} highlights`}>
                    {solution.useCases.slice(0, 2).map((useCase) => (
                      <li key={`${solution.slug}-${useCase.title}`}>
                        <CheckCircle2 size={15} strokeWidth={2} />
                        <span>{useCase.title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="solutions-library-footer">
                    <div className="solutions-library-meta">
                      <span>{solution.hardware.length} hardware components</span>
                      <span>{solution.challenges.length} challenge areas</span>
                    </div>
                    <Link className="solutions-inline-link" href={`/solutions/${solution.slug}`}>
                      View details <ArrowRight size={15} strokeWidth={2} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="solutions-bottom-cta">
        <div className="container">
          <div className="solutions-bottom-cta-panel">
            <div className="solutions-bottom-cta-copy">
              <p className="eyebrow">Need A Recommendation?</p>
              <h2>Get the right solution shortlist before you spec hardware.</h2>
              <p>
                Use the solutions team if you want help narrowing the workflow, deployment model,
                or hardware mix for your fleet.
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
    </main>
  );
}
