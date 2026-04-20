"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, LayoutDashboard, MapPinned, Smartphone } from "lucide-react";
import { startTransition, type CSSProperties } from "react";

import { CmsEditableBoundary } from "@/components/CmsEditableBoundary";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { solutionsList, type SolutionDetail } from "@/lib/solutions";
import { useAppStore } from "@/store/store";

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

type SolutionsHeroMessage = {
  headline: string;
  benefit: string;
  ctaLabel: string;
};

type SolutionScene = {
  src: string;
  alt: string;
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

const heroMessages: Record<DiscoveryFilter, SolutionsHeroMessage> = {
  all: {
    headline: "Get complete visibility and control across fleet operations.",
    benefit:
      "Compare the highest-impact solution paths first, then move into the workflow and hardware fit that closes delays, losses, and blind spots.",
    ctaLabel: "Book live demo",
  },
  tracking: {
    headline: "Track every vehicle, route, and field asset with less guesswork.",
    benefit:
      "Start with the tracking paths buyers use to improve location confidence, recovery readiness, and route accountability.",
    ctaLabel: "See tracking in action",
  },
  monitoring: {
    headline: "Catch fuel, temperature, and safety issues before they become downtime.",
    benefit:
      "Review monitoring solutions built to surface abnormal conditions early and give teams cleaner operational control.",
    ctaLabel: "Book monitoring demo",
  },
  video: {
    headline: "See what happened on the road and respond faster with evidence.",
    benefit: "Focus on driver safety, incident review, and operational proof with video-led solution paths.",
    ctaLabel: "View live video workflows",
  },
  operations: {
    headline: "Run field teams and service workflows with better live coordination.",
    benefit:
      "Narrow the solution paths that improve dispatch timing, service proof, and route execution without extra admin overhead.",
    ctaLabel: "Talk to operations specialist",
  },
  "public-sector": {
    headline: "Improve compliance oversight and service visibility across public fleets.",
    benefit:
      "Review solutions tuned for public transport, school fleets, and field operations that need stronger accountability.",
    ctaLabel: "See public fleet solutions",
  },
  industrial: {
    headline: "Reduce visibility gaps across industrial fleets and remote assets.",
    benefit:
      "Start from the solutions that connect monitoring, tracking, and deployment control in heavy-duty operations.",
    ctaLabel: "Explore industrial workflows",
  },
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

const filterAliases: Record<string, DiscoveryFilter> = {
  all: "all",
  tracking: "tracking",
  monitoring: "monitoring",
  video: "video",
  operations: "operations",
  "public-sector": "public-sector",
  industrial: "industrial",
};

const platformVisuals = [
  {
    title: "Live map visibility",
    description: "Vehicles, routes, and field assets surfaced in one operating view.",
    icon: MapPinned,
  },
  {
    title: "Operations dashboard",
    description: "Alerts, exceptions, and efficiency trends visible without manual follow-up.",
    icon: LayoutDashboard,
  },
  {
    title: "Mobile workflow preview",
    description: "Drivers and supervisors stay aligned with field-ready status and proof.",
    icon: Smartphone,
  },
];

const heroFeatureBullets: Record<DiscoveryFilter, string[]> = {
  all: [
    "Live fleet visibility",
    "Alert-driven operations",
    "Route and asset control",
    "Faster incident response",
  ],
  tracking: [
    "Real-time route tracking",
    "Vehicle and asset recovery",
    "Movement history",
    "Stop and idle visibility",
  ],
  monitoring: [
    "Fuel and temperature alerts",
    "Sensor-led exception control",
    "Threshold monitoring",
    "Service-risk visibility",
  ],
  video: [
    "Driver safety review",
    "Incident evidence capture",
    "Road event visibility",
    "Live video context",
  ],
  operations: [
    "Dispatch visibility",
    "Arrival and service proof",
    "Cleaner field coordination",
    "Route execution control",
  ],
  "public-sector": [
    "Public fleet oversight",
    "Route timing confidence",
    "Passenger or service safety",
    "Compliance-ready workflows",
  ],
  industrial: [
    "Remote asset monitoring",
    "Heavy-duty route control",
    "Distributed field visibility",
    "Telemetry-led decisions",
  ],
};

const heroSceneByFilter: Record<DiscoveryFilter, SolutionScene> = {
  all: { src: "/Images/banner.png", alt: "Fleet vehicles lineup" },
  tracking: { src: "/Products/cargo vans.png", alt: "Cargo vans fleet" },
  monitoring: { src: "/Products/construction.png", alt: "Industrial fleet context" },
  video: { src: "/Images/banner.png", alt: "Transit and vehicle fleet" },
  operations: { src: "/Products/delivery.png", alt: "Field service vehicle" },
  "public-sector": { src: "/Images/banner.png", alt: "Public fleet and transport context" },
  industrial: { src: "/Products/construction.png", alt: "Industrial site fleet" },
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

function getCategoryScene(meta: SolutionMeta) {
  switch (meta.category) {
    case "Tracking":
      return "/Products/cargo vans.png";
    case "Monitoring":
      return "/Products/construction.png";
    case "Video":
      return "/Images/banner.png";
    case "Operations":
      return "/Products/delivery.png";
    default:
      return "/Products/logistics.png";
  }
}

function getFeaturedScene(solutionSlug: string, meta: SolutionMeta) {
  switch (solutionSlug) {
    case "monitoring-systems":
      return "/Images/banner.png";
    case "fuel-monitoring-system":
      return "/Products/logistics.png";
    case "field-force-management":
      return "/Products/delivery.png";
    case "public-transport-business-solution":
      return "/Images/banner.png";
    case "school-bus-tracking":
      return "/Images/banner.png";
    default:
      return getCategoryScene(meta);
  }
}

function getAnimatedHeadlineParts(headline: string) {
  return headline.split(" ").map((word, index) => (
    <span className="solutions-hero-word" style={{ "--word-delay": `${index * 70}ms` } as CSSProperties} key={`${word}-${index}`}>
      {word}
    </span>
  ));
}

export function SolutionsCatalogPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedFilter = searchParams.get("group");
  const activeFilter = requestedFilter ? filterAliases[requestedFilter] ?? "all" : "all";
  const solutionsCatalogDraft = useAppStore((state) => state.cmsDrafts.solutionsCatalog);
  const solutionDetailDrafts = useAppStore((state) => state.cmsDrafts.solutionDetails);

  const filteredSolutions = solutionsList.filter((solution) => matchesFilter(activeFilter, solution));
  const featuredSolutions = filteredSolutions.filter((solution) => getSolutionMeta(solution).featured);
  const featuredShelf = (featuredSolutions.length >= 3 ? featuredSolutions : filteredSolutions).slice(0, 3);
  const heroMessage =
    activeFilter === "all"
      ? {
          headline: solutionsCatalogDraft.heroHeadline,
          benefit: solutionsCatalogDraft.heroBenefit,
          ctaLabel: solutionsCatalogDraft.heroCtaLabel,
        }
      : heroMessages[activeFilter];
  const heroScene = heroSceneByFilter[activeFilter];
  const heroBullets = heroFeatureBullets[activeFilter];
  const solutionsHeroImage = resolveCloudinaryAsset(
    activeFilter === "all" ? solutionsCatalogDraft.heroImageSrc : "/Images/Banner-size.png",
  );

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
      <CmsEditableBoundary
        sectionId="solutions.catalog"
        title="Solutions Catalog"
        description="Solutions page hero, sections, results band, and CTA content."
        draftKey="solutionsCatalog"
      >
      <section className="solutions-hero">
        <div className="container">
          <div
            className="solutions-hero-shell"
            style={{ "--solutions-hero-image": `url("${solutionsHeroImage}")` } as CSSProperties}
          >
            <div className="solutions-hero-copy">
              <span className="products-badge">Solutions</span>
              <div className="solutions-hero-content">
                <h1 className="solutions-hero-title">{getAnimatedHeadlineParts(heroMessage.headline)}</h1>
                <p className="solutions-hero-text">{heroMessage.benefit}</p>
                <div className="solutions-hero-bullet-list" aria-label="Primary solution capabilities">
                  {heroBullets.map((item) => (
                    <div className="solutions-hero-bullet" key={item}>
                      <CheckCircle2 size={16} strokeWidth={2} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="solutions-hero-actions">
                  <Link className="button button-primary" href="/contact">
                    {heroMessage.ctaLabel}
                  </Link>
                  <Link className="button button-secondary" href="#solutions-core">
                    Explore core solutions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </CmsEditableBoundary>

      <section className="solutions-platform-section">
        <div className="container">
          <div className="solutions-platform-shell">
            <div className="solutions-platform-copy">
              <p className="eyebrow">{solutionsCatalogDraft.platformEyebrow}</p>
              <h2>{solutionsCatalogDraft.platformHeading}</h2>
              <p className="section-subtitle">
                {solutionsCatalogDraft.platformDescription}
              </p>
            </div>

            <div className="solutions-platform-stage">
              <article className="solutions-platform-visual">
                <div className="solutions-platform-visual-media">
                  <Image
                    src={resolveCloudinaryAsset(heroScene.src)}
                    alt={heroScene.alt}
                    width={1200}
                    height={720}
                    className="solutions-platform-visual-image"
                  />
                </div>
              </article>

              <div className="solutions-platform-grid">
                {platformVisuals.map((visual) => {
                  const Icon = visual.icon;

                  return (
                    <article className="solutions-platform-card" key={visual.title}>
                      <div className="solutions-platform-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <strong>{visual.title}</strong>
                      <p>{visual.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-results-band">
        <div className="container">
          <div className="solutions-results-shell">
            <div className="solutions-results-copy">
              <p className="eyebrow">{solutionsCatalogDraft.resultsEyebrow}</p>
              <h2>{solutionsCatalogDraft.resultsHeading}</h2>
            </div>
            <div className="solutions-results-grid">
              {solutionsCatalogDraft.resultsCards.map((result) => (
                <article className="solutions-results-card" key={result.label}>
                  <strong>{result.value}</strong>
                  <span>{result.label}</span>
                  <p>{result.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-browse-section">
        <div className="container">
          <div className="solutions-section-head solutions-section-head-balanced">
            <div className="solutions-section-head-main">
              <p className="eyebrow">{solutionsCatalogDraft.browseEyebrow}</p>
              <h2>{solutionsCatalogDraft.browseHeading}</h2>
              <p className="section-subtitle">
                {solutionsCatalogDraft.browseDescription}
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

      <section className="solutions-featured-section" id="solutions-core">
        <div className="container">
          <div className="solutions-section-head solutions-section-head-split solutions-section-head-featured">
            <div>
              <p className="eyebrow">{solutionsCatalogDraft.featuredEyebrow}</p>
              <h2>{solutionsCatalogDraft.featuredHeading}</h2>
            </div>
            <p className="section-subtitle">
              {solutionsCatalogDraft.featuredDescription}
            </p>
          </div>

          <div className="solutions-featured-grid">
            {featuredShelf.map((solution) => {
              const solutionDraft = solutionDetailDrafts[solution.slug] ?? solution;
              const meta = getSolutionMeta(solutionDraft);

              return (
                <article className="solutions-featured-card" key={solution.slug}>
                  <div className="solutions-featured-media">
                    <Image
                      src={resolveCloudinaryAsset(getFeaturedScene(solution.slug, meta))}
                      alt={solutionDraft.title}
                      width={720}
                      height={420}
                      className="solutions-featured-image"
                    />
                    <div className="solutions-featured-overlay">
                      <div className="solutions-featured-topline">
                        <span>{meta.category}</span>
                        <span>{meta.market}</span>
                      </div>
                      <div className="solutions-featured-overlay-copy">
                        <h3>{solutionDraft.title}</h3>
                        <p className="solutions-featured-description">{meta.outcome}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="solutions-library-list solutions-featured-list" aria-label={`${solutionDraft.title} highlights`}>
                    {solutionDraft.useCases.slice(0, 2).map((useCase) => (
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
                      aria-label={`View details for ${solutionDraft.title}`}
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
              <p className="eyebrow">{solutionsCatalogDraft.libraryEyebrow}</p>
              <h2>{solutionsCatalogDraft.libraryHeading}</h2>
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
                      const solutionDraft = solutionDetailDrafts[solution.slug] ?? solution;
                      const meta = getSolutionMeta(solutionDraft);

                      return (
                        <article className="solutions-library-card" key={solution.slug}>
                          <div className="solutions-library-media">
                            <Image
                              src={resolveCloudinaryAsset(getFeaturedScene(solution.slug, meta))}
                              alt={solutionDraft.title}
                              width={720}
                              height={420}
                              className="solutions-library-image"
                            />
                            <div className="solutions-library-overlay">
                              <div className="solutions-library-topline">
                                <p>{meta.category}</p>
                                <span>{meta.market}</span>
                              </div>
                              <div className="solutions-library-overlay-copy">
                                <h3>{solutionDraft.title}</h3>
                                <p className="solutions-library-description">{meta.outcome}</p>
                              </div>
                            </div>
                          </div>
                          <ul className="solutions-library-list" aria-label={`${solutionDraft.title} highlights`}>
                            {solutionDraft.useCases.slice(0, 2).map((useCase) => (
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
                              aria-label={`View details for ${solutionDraft.title}`}
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

      <section className="solutions-bottom-cta">
        <div className="container">
          <div className="solutions-bottom-cta-panel">
            <div className="solutions-bottom-cta-copy">
              <p className="eyebrow">{solutionsCatalogDraft.bottomCtaEyebrow}</p>
              <h2>{solutionsCatalogDraft.bottomCtaHeading}</h2>
              <p>
                {solutionsCatalogDraft.bottomCtaDescription}
              </p>
            </div>
            <div className="solutions-bottom-cta-actions">
              <Link className="button button-primary" href="/contact">
                {solutionsCatalogDraft.bottomCtaPrimaryLabel}
              </Link>
              <Link className="solutions-inline-link is-muted solutions-bottom-text-link" href="/products">
                {solutionsCatalogDraft.bottomCtaSecondaryLabel} <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

