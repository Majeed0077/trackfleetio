"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  LayoutDashboard,
  Layers3,
  MapPinned,
  Radar,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";

import { getProductById, getProductHref } from "@/data/products";
import { InlineEditableSection } from "@/components/InlineEditableSection";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { solutionsList, type SolutionDetail } from "@/lib/solutions";
import { useAppStore } from "@/store/store";

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

type SolutionExperienceMetric = {
  value: string;
  label: string;
  detail: string;
};

type SolutionExperienceStep = {
  title: string;
  detail: string;
};

type SolutionExperienceVisual = {
  title: string;
  detail: string;
  icon: typeof LayoutDashboard;
};

type SolutionShowcaseImage = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
};

type SolutionExperience = {
  heroHeadline: string;
  heroBenefit: string;
  demoLabel: string;
  visualLabel: string;
  metrics: SolutionExperienceMetric[];
  steps: SolutionExperienceStep[];
  visuals: SolutionExperienceVisual[];
};

type SolutionVariant = "tracking" | "monitoring" | "video" | "operations";

type SolutionBlueprint = {
  variant: SolutionVariant;
  heading: string;
  description: string;
  sections: string[];
  imageryTypes: string[];
  resultsTitle: string;
  visualTitle: string;
  challengeTitle: string;
  processTitle: string;
};

const solutionBlueprints: Record<string, SolutionBlueprint> = {
  "monitoring-systems": {
    variant: "monitoring",
    heading: "Monitoring pages should feel like an alerting and reporting system, not a generic solution shell.",
    description: "Lead with dashboards, threshold logic, and operational proof so the buyer immediately understands the monitoring stack.",
    sections: ["Control-state hero", "Alert thresholds", "Reporting proof", "Sensor-fit hardware", "Rollout CTA"],
    imageryTypes: ["Unified dashboard placeholder", "Sensor telemetry placeholder", "Alert/report snapshot placeholder"],
    resultsTitle: "Turn monitoring signals into business-ready reporting and response.",
    visualTitle: "Show the alerting layer, reporting layer, and field context together.",
    challengeTitle: "The monitoring problems buyers want solved first",
    processTitle: "Explain how monitoring goes from sensor install to live exception control.",
  },
  "fuel-monitoring-system": {
    variant: "monitoring",
    heading: "Fuel pages should center on loss detection, route comparison, and refill or drainage visibility.",
    description: "The page should look more like a cost-control system with dashboard, anomaly, and reporting placeholders.",
    sections: ["Fuel-visibility hero", "Loss or anomaly proof", "Usage reporting", "Hardware stack", "Buyer CTA"],
    imageryTypes: ["Fuel dashboard placeholder", "Tanker or fleet placeholder", "Anomaly alert placeholder"],
    resultsTitle: "Frame fuel telemetry as cost control, anomaly detection, and route efficiency.",
    visualTitle: "Use dashboard-led visuals that show tank levels, route context, and exception review.",
    challengeTitle: "The fuel-control gaps this page should help a buyer close",
    processTitle: "Show how teams move from install to live fuel visibility and reporting.",
  },
  "temperature-monitoring-system": {
    variant: "monitoring",
    heading: "Temperature pages need cold-chain flow, threshold alerts, and compliance readiness placeholders.",
    description: "The visual story should make it obvious that this solution protects condition-sensitive operations across motion and storage.",
    sections: ["Cold-chain hero", "Threshold alerts", "Compliance proof", "Sensor and telemetry stack", "Demo CTA"],
    imageryTypes: ["Reefer or cold-chain placeholder", "Threshold dashboard placeholder", "Storage or route diagram placeholder"],
    resultsTitle: "Show how live temperature monitoring protects cargo, audit trails, and response times.",
    visualTitle: "Blend delivery visuals with threshold, compliance, and route-monitoring placeholders.",
    challengeTitle: "The cold-chain risks this solution should make easier to control",
    processTitle: "Explain the path from sensing hardware to live threshold alerts and records.",
  },
  "tire-pressure-monitoring-system": {
    variant: "monitoring",
    heading: "TPMS pages should feel safety-led, with preventive maintenance and road-readiness placeholders.",
    description: "The page should explain why pressure data matters operationally before it becomes a maintenance emergency.",
    sections: ["Safety hero", "Pressure alert proof", "Vehicle health overview", "TPMS hardware", "Buyer CTA"],
    imageryTypes: ["Vehicle fleet placeholder", "Pressure alert placeholder", "Maintenance workflow placeholder"],
    resultsTitle: "Translate tire pressure visibility into safer fleets and fewer emergency disruptions.",
    visualTitle: "Use maintenance and alert visuals instead of generic product storytelling.",
    challengeTitle: "The road-risk and maintenance issues TPMS should solve earlier",
    processTitle: "Map the rollout from pressure sensors to live alerting and maintenance action.",
  },
  "water-management-system": {
    variant: "operations",
    heading: "Water operations pages should focus on tank visibility, service timing, and remote field execution.",
    description: "This page should feel like a field workflow with route, service, and replenishment placeholders rather than a generic monitoring page.",
    sections: ["Remote-service hero", "Tank status view", "Route planning placeholder", "Hardware fit", "Field CTA"],
    imageryTypes: ["Tank or utility fleet placeholder", "Remote operations dashboard placeholder", "Service route placeholder"],
    resultsTitle: "Show how route timing, tank awareness, and service accountability work together.",
    visualTitle: "Present a field-operations story with level monitoring and route execution side by side.",
    challengeTitle: "The service and visibility gaps remote water teams need to remove first",
    processTitle: "Explain how teams deploy level monitoring and act on it in the field.",
  },
  "field-force-management": {
    variant: "operations",
    heading: "Field force pages should be dispatch-led, with mobile status, arrival proof, and supervisor visibility.",
    description: "The page needs to look like a service execution workflow, not just another tracking page.",
    sections: ["Dispatch hero", "Mobile app placeholder", "Arrival or proof block", "Hardware fit", "Supervisor CTA"],
    imageryTypes: ["Service van placeholder", "Dispatch dashboard placeholder", "Mobile workflow placeholder"],
    resultsTitle: "Connect route visibility, service proof, and supervisor control into one story.",
    visualTitle: "Show dispatch, mobile teams, and field proof in one operating flow.",
    challengeTitle: "The field execution problems this solution is designed to clean up",
    processTitle: "Map how dispatch turns into arrivals, proof, and closed service loops.",
  },
  "school-bus-tracking": {
    variant: "tracking",
    heading: "School-bus pages should feel route-led and safety-led, with stop visibility and passenger confidence.",
    description: "The visual story should emphasize route timing, operator oversight, and safer service review.",
    sections: ["Transit hero", "Route timing placeholder", "Safety review placeholder", "Hardware fit", "Operator CTA"],
    imageryTypes: ["School bus placeholder", "Route map placeholder", "Control-room or review placeholder"],
    resultsTitle: "Show how route confidence and service review improve day-to-day school transport operations.",
    visualTitle: "Use transit visuals, stop visibility, and route confidence placeholders throughout.",
    challengeTitle: "The transport and safety questions school-bus buyers ask first",
    processTitle: "Explain how buses, route data, and safety visibility connect in one workflow.",
  },
  "smart-waste-collection-tracking": {
    variant: "tracking",
    heading: "Waste-collection pages should focus on route execution, stop completion, and proof of service.",
    description: "This page should feel municipal and route-heavy, with clear proof that work happened where and when it should.",
    sections: ["Route-execution hero", "Stop proof placeholder", "Service accountability", "Hardware stack", "Ops CTA"],
    imageryTypes: ["Collection fleet placeholder", "Route completion placeholder", "Proof-of-service placeholder"],
    resultsTitle: "Make route completion and service proof feel operationally valuable, not abstract.",
    visualTitle: "Use route, stop, and completion visuals instead of generic fleet scenes.",
    challengeTitle: "The route and service-proof gaps collection teams want to remove",
    processTitle: "Show how tracking and evidence layers turn into accountable route execution.",
  },
  "parts-tracking": {
    variant: "tracking",
    heading: "Parts-tracking pages should feel like a movement-control and handoff-visibility workflow.",
    description: "The buyer should immediately see depots, handoffs, and in-transit asset awareness as the core story.",
    sections: ["Parts-visibility hero", "Movement placeholder", "Handoff control", "Asset hardware", "Logistics CTA"],
    imageryTypes: ["Depot placeholder", "Inventory or handoff placeholder", "Movement map placeholder"],
    resultsTitle: "Show how parts visibility reduces blind spots across logistics and depot handoffs.",
    visualTitle: "Use depot and inventory movement placeholders to make the use case concrete.",
    challengeTitle: "The visibility and recovery issues parts-tracking buyers are trying to solve",
    processTitle: "Map how assets move from depots to routes with fewer blind spots.",
  },
  "indoor-tracking": {
    variant: "tracking",
    heading: "Indoor-tracking pages should look facility-led, with zone visibility and faster search-time control.",
    description: "The story should emphasize internal movement, asset awareness, and workflow coordination inside facilities.",
    sections: ["Facility hero", "Zone map placeholder", "Workflow visibility", "Asset hardware", "Ops CTA"],
    imageryTypes: ["Warehouse placeholder", "Zone map placeholder", "Indoor workflow placeholder"],
    resultsTitle: "Translate indoor visibility into less search time and better internal coordination.",
    visualTitle: "Present facility movement, zone awareness, and workflow placeholders together.",
    challengeTitle: "The facility blind spots indoor-tracking buyers want fixed first",
    processTitle: "Explain how asset devices and workflow visibility improve indoor operations.",
  },
  "lorawan-technology": {
    variant: "monitoring",
    heading: "LoRaWAN pages should emphasize remote coverage, distributed telemetry, and low-power monitoring.",
    description: "This page should look like a wide-area sensing system with network coverage and remote-status placeholders.",
    sections: ["Coverage hero", "Remote telemetry placeholder", "Distributed sensing", "Device fit", "Deployment CTA"],
    imageryTypes: ["Remote infrastructure placeholder", "Network coverage placeholder", "Sensor telemetry placeholder"],
    resultsTitle: "Frame LoRaWAN as coverage efficiency, battery-conscious telemetry, and remote visibility.",
    visualTitle: "Use remote-site and network placeholders that make distributed monitoring feel practical.",
    challengeTitle: "The range, coverage, and power questions buyers ask about remote telemetry",
    processTitle: "Show how low-power sensing becomes an actionable remote monitoring workflow.",
  },
  "public-transport-business-solution": {
    variant: "video",
    heading: "Transit pages should combine route operations with passenger-safety review and control-room visibility.",
    description: "This page should feel like a transit oversight system with route, event, and service-readiness placeholders.",
    sections: ["Transit operations hero", "Route oversight", "Safety review placeholder", "Stack fit", "Transit CTA"],
    imageryTypes: ["Public transport placeholder", "Control-room placeholder", "Safety review placeholder"],
    resultsTitle: "Show how route reliability and passenger safety review fit into one transport stack.",
    visualTitle: "Mix transit movement, review, and control-room placeholders instead of static product stories.",
    challengeTitle: "The service and passenger-safety pressures public transport teams face first",
    processTitle: "Explain how route tracking, video review, and readiness monitoring work together.",
  },
  "electric-vehicle-management": {
    variant: "operations",
    heading: "EV pages should feel like a fleet-operations workflow with movement visibility and service planning.",
    description: "The page should emphasize route coordination, utilization, and operational review for electric fleets.",
    sections: ["EV operations hero", "Route visibility", "Service oversight", "Hardware fit", "Program CTA"],
    imageryTypes: ["EV fleet placeholder", "Operations dashboard placeholder", "Service-planning placeholder"],
    resultsTitle: "Show how connected visibility makes electric fleet programs easier to run and review.",
    visualTitle: "Use EV fleet placeholders that focus on route, review, and service coordination.",
    challengeTitle: "The coordination issues electric fleet buyers want solved before rollout",
    processTitle: "Show how EV programs move from route visibility to live operational review.",
  },
  "oil-tanker-monitoring-solutions": {
    variant: "video",
    heading: "Oil-tanker pages should feel high-control, with route oversight, load awareness, and safety evidence.",
    description: "This page should look stricter and more operationally sensitive than a general fleet page.",
    sections: ["Controlled-route hero", "Load visibility placeholder", "Safety evidence", "Hardware stack", "Ops CTA"],
    imageryTypes: ["Tanker fleet placeholder", "Load or volume placeholder", "Evidence review placeholder"],
    resultsTitle: "Show route control, load awareness, and safety review as one high-control monitoring system.",
    visualTitle: "Use sensitive-cargo placeholders that make the risk profile and oversight obvious.",
    challengeTitle: "The high-control operational risks tanker buyers want to reduce first",
    processTitle: "Map how monitoring, route visibility, and evidence work together for tanker operations.",
  },
};

const showcaseImagesBySlug: Record<string, SolutionShowcaseImage[]> = {
  "monitoring-systems": [
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "Fleet management monitoring dashboard",
      eyebrow: "Control View",
      title: "Unified monitoring across active fleet operations",
    },
    {
      src: "/Products/logistics.png",
      alt: "Logistics fleet operations",
      eyebrow: "Field Context",
      title: "Live oversight for logistics and service-heavy deployments",
    },
  ],
  "fuel-monitoring-system": [
    {
      src: "/Products/logistics.png",
      alt: "Fuel-monitoring logistics fleet",
      eyebrow: "Fleet Context",
      title: "Fuel visibility across long-haul and route-based fleets",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "Fuel monitoring dashboard",
      eyebrow: "Telemetry View",
      title: "Usage, route, and anomaly signals in one control layer",
    },
  ],
  "temperature-monitoring-system": [
    {
      src: "/Products/delivery.png",
      alt: "Delivery vehicle for temperature-sensitive logistics",
      eyebrow: "Cold Chain",
      title: "Protect condition-sensitive deliveries in motion",
    },
    {
      src: "/Products/Fleet management system diagram transparent.png",
      alt: "Temperature monitoring platform",
      eyebrow: "Live View",
      title: "Track thresholds, exceptions, and route context together",
    },
  ],
  "tire-pressure-monitoring-system": [
    {
      src: "/Products/cargo vans.png",
      alt: "Commercial cargo vans for tire pressure monitoring",
      eyebrow: "Vehicle Fleet",
      title: "Safer daily movement for active commercial fleets",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "TPMS monitoring dashboard",
      eyebrow: "Alert Layer",
      title: "Pressure alerts and vehicle readiness in one view",
    },
  ],
  "water-management-system": [
    {
      src: "/Products/construction.png",
      alt: "Industrial water operations field fleet",
      eyebrow: "Service Field",
      title: "Remote tank and route operations with better timing",
    },
    {
      src: "/Products/Fleet management system diagram transparent.png",
      alt: "Remote operations dashboard",
      eyebrow: "Operations View",
      title: "Track levels, routes, and service response from one screen",
    },
  ],
  "field-force-management": [
    {
      src: "/Products/delivery.png",
      alt: "Field force delivery and service vehicle",
      eyebrow: "Mobile Teams",
      title: "Dispatch and route execution for field service crews",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "Field force management dashboard",
      eyebrow: "Dispatch View",
      title: "Live team status, arrivals, and service proof in one place",
    },
  ],
  "school-bus-tracking": [
    {
      src: "/Products/Hero-image.png",
      alt: "School and passenger transport fleet",
      eyebrow: "Transit Fleet",
      title: "Route timing and student transport visibility",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "School bus route visibility dashboard",
      eyebrow: "Route View",
      title: "Track routes, stops, and service status with more confidence",
    },
  ],
  "smart-waste-collection-tracking": [
    {
      src: "/Products/construction.png",
      alt: "Waste collection and industrial fleet context",
      eyebrow: "Route Execution",
      title: "Collection route accountability for service-heavy operations",
    },
    {
      src: "/Products/Fleet management system diagram transparent.png",
      alt: "Collection route monitoring dashboard",
      eyebrow: "Control Layer",
      title: "Monitor stops, route proof, and exceptions with less friction",
    },
  ],
  "parts-tracking": [
    {
      src: "/Products/logistics.png",
      alt: "Logistics vehicle for parts tracking",
      eyebrow: "Supply Chain",
      title: "Track valuable parts through depot and route handoffs",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "Parts tracking operations view",
      eyebrow: "Movement View",
      title: "Keep mobile inventory and exceptions visible in one workflow",
    },
  ],
  "indoor-tracking": [
    {
      src: "/Products/delivery.png",
      alt: "Indoor logistics and handling workflow context",
      eyebrow: "Facility Flow",
      title: "Improve indoor movement visibility for internal operations",
    },
    {
      src: "/Products/Fleet management system diagram transparent.png",
      alt: "Indoor tracking platform",
      eyebrow: "Tracking View",
      title: "Locate assets and workflow status with less search time",
    },
  ],
  "lorawan-technology": [
    {
      src: "/Products/Hero-image.png",
      alt: "Remote fleet and distributed telemetry context",
      eyebrow: "Remote Coverage",
      title: "Low-power monitoring for distributed field operations",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "LoRaWAN telemetry dashboard",
      eyebrow: "Network View",
      title: "Connect remote signals into one operating layer",
    },
  ],
  "public-transport-business-solution": [
    {
      src: "/Products/Hero-image.png",
      alt: "Public transport and bus operations fleet",
      eyebrow: "Transit Service",
      title: "Passenger mobility, route reliability, and safety review",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "Public transport control dashboard",
      eyebrow: "Operations View",
      title: "Service status, route adherence, and fleet readiness together",
    },
  ],
  "electric-vehicle-management": [
    {
      src: "/Products/cargo vans.png",
      alt: "Electric service fleet and vans",
      eyebrow: "EV Fleet",
      title: "Coordinate connected movement across electric service operations",
    },
    {
      src: "/Products/Fleet management system diagram transparent.png",
      alt: "Electric fleet operations dashboard",
      eyebrow: "Live Control",
      title: "See route status, service flow, and review points in one place",
    },
  ],
  "oil-tanker-monitoring-solutions": [
    {
      src: "/Products/logistics.png",
      alt: "Sensitive cargo and tanker fleet context",
      eyebrow: "Sensitive Routes",
      title: "High-control monitoring for regulated cargo movement",
    },
    {
      src: "/Products/Fleet management system diagram.png",
      alt: "Oil tanker monitoring dashboard",
      eyebrow: "Command View",
      title: "Combine route evidence, monitoring, and oversight in one view",
    },
  ],
};

const experienceByTone: Record<SolutionTheme["tone"], Omit<SolutionExperience, "heroHeadline" | "heroBenefit">> = {
  monitoring: {
    demoLabel: "Book monitoring demo",
    visualLabel: "Live monitoring preview",
    metrics: [
      { value: "30%", label: "less avoidable operating loss", detail: "when alerts surface earlier" },
      { value: "24/7", label: "condition visibility", detail: "across vehicles, assets, and exceptions" },
      { value: "< 5m", label: "faster issue response", detail: "once live telemetry and alerts are connected" },
    ],
    steps: [
      { title: "Install monitoring hardware", detail: "Connect the right sensors and gateway hardware to each asset or vehicle." },
      { title: "Stream live telemetry", detail: "Bring thresholds, route context, and device health into one operating layer." },
      { title: "Monitor exceptions in real time", detail: "See abnormal conditions quickly instead of waiting for delayed field reports." },
      { title: "Act on alerts and reports", detail: "Escalate exceptions, compare trends, and close the reporting loop faster." },
    ],
    visuals: [
      { title: "Live sensor map", detail: "Fleet units, site alerts, and condition status in one screen.", icon: MapPinned },
      { title: "Alert dashboard", detail: "Threshold breaches and service risk ranked by urgency.", icon: LayoutDashboard },
      { title: "Supervisor mobile view", detail: "Fast checks for field teams without opening multiple systems.", icon: Smartphone },
    ],
  },
  operations: {
    demoLabel: "Book operations demo",
    visualLabel: "Operations workflow preview",
    metrics: [
      { value: "25%", label: "faster dispatch response", detail: "with clearer team and route status" },
      { value: "20%", label: "less service delay", detail: "once field visibility improves" },
      { value: "24/7", label: "execution control", detail: "across live jobs, routes, and proof" },
    ],
    steps: [
      { title: "Deploy the field stack", detail: "Install the devices and video layer matched to the route or service workflow." },
      { title: "Connect teams to one platform", detail: "Surface route timing, arrivals, and job status in one operating view." },
      { title: "Track work as it happens", detail: "Monitor active jobs, route deviations, and service proof live." },
      { title: "Review and optimize", detail: "Use alerts, playback, and reports to tighten execution over time." },
    ],
    visuals: [
      { title: "Dispatch board", detail: "Vehicle status, task progression, and live route context together.", icon: LayoutDashboard },
      { title: "Proof-of-service stream", detail: "Completed stops and event evidence visible without manual chasing.", icon: BellRing },
      { title: "Mobile field sync", detail: "Supervisors and drivers stay aligned from the same operating status.", icon: Smartphone },
    ],
  },
  tracking: {
    demoLabel: "Book tracking demo",
    visualLabel: "Live tracking preview",
    metrics: [
      { value: "99%", label: "better asset awareness", detail: "when routes and movement status are centralized" },
      { value: "18%", label: "less route uncertainty", detail: "with live telemetry and faster exception checks" },
      { value: "24/7", label: "location confidence", detail: "across mobile assets and operating teams" },
    ],
    steps: [
      { title: "Install tracking devices", detail: "Fit the right tracker or accessory based on asset type and environment." },
      { title: "Connect movement telemetry", detail: "Bring location, status, and route data into a single live view." },
      { title: "Monitor routes and assets", detail: "Watch active movement, stop history, and deviations in real time." },
      { title: "Respond with cleaner evidence", detail: "Use alerts, route history, and proof to improve accountability." },
    ],
    visuals: [
      { title: "Fleet map board", detail: "Routes, stops, and tracked assets arranged for quick operator scanning.", icon: MapPinned },
      { title: "Tracking control view", detail: "Movement status and exceptions shown in one operator workspace.", icon: LayoutDashboard },
      { title: "Mobile route check", detail: "Field teams get simple live updates without losing visibility.", icon: Smartphone },
    ],
  },
  mobility: {
    demoLabel: "Book fleet demo",
    visualLabel: "Mobility operations preview",
    metrics: [
      { value: "22%", label: "faster service coordination", detail: "through connected route and review workflows" },
      { value: "30%", label: "better exception clarity", detail: "with combined telemetry and evidence capture" },
      { value: "24/7", label: "operational oversight", detail: "for public, remote, and sensitive fleet movements" },
    ],
    steps: [
      { title: "Roll out the connected stack", detail: "Deploy tracking, video, and monitoring hardware where each route needs it." },
      { title: "Unify route and review data", detail: "Bring movement, safety, and vehicle health into one fleet operating layer." },
      { title: "Watch live operations", detail: "Monitor reliability, safety signals, and active exceptions as routes unfold." },
      { title: "Improve readiness and control", detail: "Use evidence, reporting, and workflow checks to sharpen decision-making." },
    ],
    visuals: [
      { title: "Mobility route view", detail: "Route adherence and safety context visible at the same time.", icon: MapPinned },
      { title: "Service control board", detail: "Transit or remote fleet status organized for operational review.", icon: LayoutDashboard },
      { title: "Driver and supervisor mobile", detail: "Key status and exception signals available on the go.", icon: Smartphone },
    ],
  },
};

function getHeroHeadline(theme: SolutionTheme, solution: SolutionDetail) {
  switch (theme.tone) {
    case "monitoring":
      return `Reduce blind spots and respond faster with ${solution.title.toLowerCase()}.`;
    case "operations":
      return `Run ${solution.title.toLowerCase()} with clearer execution control.`;
    case "tracking":
      return `Get real-time movement visibility with ${solution.title.toLowerCase()}.`;
    case "mobility":
      return `Improve route control and service oversight with ${solution.title.toLowerCase()}.`;
    default:
      return solution.title;
  }
}

function getHeroBenefit(theme: SolutionTheme, solution: SolutionDetail) {
  return `${theme.valueLine} ${solution.description}`;
}

function getSolutionExperience(theme: SolutionTheme, solution: SolutionDetail): SolutionExperience {
  const toneExperience = experienceByTone[theme.tone];

  return {
    ...toneExperience,
    heroHeadline: getHeroHeadline(theme, solution),
    heroBenefit: getHeroBenefit(theme, solution),
  };
}

function getSolutionShowcaseImages(solution: SolutionDetail): SolutionShowcaseImage[] {
  return (
    showcaseImagesBySlug[solution.slug] ?? [
      {
        src: "/Products/Hero-image.png",
        alt: `${solution.title} fleet operations context`,
        eyebrow: "Fleet Context",
        title: "Connected field operations matched to this workflow",
      },
      {
        src: "/Products/Fleet management system diagram.png",
        alt: `${solution.title} platform dashboard`,
        eyebrow: "Platform View",
        title: "Map, alerts, and workflow visibility in one layer",
      },
    ]
  );
}

function getSolutionBlueprint(solution: SolutionDetail): SolutionBlueprint {
  return (
    solutionBlueprints[solution.slug] ?? {
      variant: "operations",
      heading: "This page should blend workflow context, hardware fit, and buyer outcomes.",
      description: "Use shared premium design patterns, then plug in visuals and modules that match the actual solution story.",
      sections: ["Hero", "Visual story", "How it works", "Hardware fit", "CTA"],
      imageryTypes: ["Fleet context placeholder", "Dashboard placeholder", "Workflow placeholder"],
      resultsTitle: "Translate the workflow into business-ready outcomes and deployment clarity.",
      visualTitle: "Show the workflow, dashboard, and field context in a buyer-friendly way.",
      challengeTitle: "The operational gaps this solution should solve first",
      processTitle: "Explain the rollout from install to active daily use in clear steps.",
    }
  );
}

export function SolutionDetailPage({ solution: initialSolution }: { solution: SolutionDetail }) {
  const solutionDrafts = useAppStore((state) => state.cmsDrafts.solutionDetails);
  const solution = solutionDrafts[initialSolution.slug] ?? initialSolution;
  const theme = getSolutionTheme(solution);
  const blueprint = getSolutionBlueprint(solution);
  const experience = getSolutionExperience(theme, solution);
  const showcaseImages = getSolutionShowcaseImages(solution);
  const hardwareProducts = getSolutionProducts(solution);
  const heroProducts = hardwareProducts.slice(0, 3);
  const relatedSolutions = getRelatedSolutions(solution);
  const primaryCapabilities = solution.useCases.slice(0, 3).map((item) => item.title);

  return (
    <main
      id="main-content"
      className={`site-main solution-detail-page solution-detail-page-redesign solution-detail-tone-${theme.tone} solution-detail-variant-${blueprint.variant}`}
    >
      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.hero` as const}
        title={`${solution.title} Hero`}
        description="Solution headline, intro copy, and primary CTA."
      >
      <section className="solution-detail-hero-redesign">
        <div className="container">
          <div className="solution-detail-hero-shell-redesign">
            <div className="solution-detail-hero-copy-redesign">
              <span className="products-badge">Solution</span>
              <p className="solution-detail-segment">{theme.segment}</p>
              <h1>{experience.heroHeadline}</h1>
              <p className="solution-detail-hero-description">{experience.heroBenefit}</p>

              <div className="solution-detail-hero-actions-redesign">
                <Link className="button button-primary" href="/contact">
                  {experience.demoLabel}
                </Link>
                <Link className="button button-secondary" href="#solution-results">
                  See expected results
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
                  <p>{experience.visualLabel}</p>
                  <strong>{theme.segment}</strong>
                </div>
                <div className="solution-detail-hero-device-grid">
                  {heroProducts.map((hardware) => (
                    <article className="solution-detail-hero-device-card" key={`${solution.slug}-${hardware.title}`}>
                      <div className="solution-detail-hero-device-media">
                        <Image
                          src={resolveCloudinaryAsset(hardware.imageSrc)}
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.results` as const}
        title={`${solution.title} Results`}
        description="Proof metrics and business outcome framing."
      >
      <section className="solution-detail-section-redesign solution-detail-results-section" id="solution-results">
        <div className="container">
          <div className="solution-detail-section-heading solution-detail-section-heading-split">
            <div>
              <p className="eyebrow">Proven Results</p>
              <h2>{blueprint.resultsTitle}</h2>
            </div>
            <p className="section-subtitle">
              Strong B2B solution pages translate telemetry and workflow visibility into operational outcomes buyers can
              justify internally.
            </p>
          </div>

          <div className="solution-detail-results-grid">
            {experience.metrics.map((metric) => (
              <article className="solution-detail-results-card" key={`${solution.slug}-${metric.label}`}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.intro` as const}
        title={`${solution.title} Intro Fit`}
        description="Best-fit audience and deployment summary."
      >
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.blueprint` as const}
        title={`${solution.title} Page Direction`}
        description="Variant strategy and page blueprint."
      >
      <section className="solution-detail-section-redesign solution-detail-blueprint-section">
        <div className="container">
          <div className="solution-detail-blueprint-shell">
            <div className="solution-detail-blueprint-copy">
              <p className="eyebrow">Page Direction</p>
              <h2>{blueprint.heading}</h2>
              <p className="section-subtitle">{blueprint.description}</p>
            </div>

            <div className="solution-detail-blueprint-panel">
              <div className="solution-detail-blueprint-meta">
                <article className="solution-detail-blueprint-meta-card">
                  <span>Page Name</span>
                  <strong>{solution.title}</strong>
                </article>
                <article className="solution-detail-blueprint-meta-card">
                  <span>Variant</span>
                  <strong>{blueprint.variant}</strong>
                </article>
              </div>

              <div className="solution-detail-blueprint-grid">
                <article className="solution-detail-blueprint-block">
                  <span>Sections</span>
                  <div className="solution-detail-blueprint-list">
                    {blueprint.sections.map((section) => (
                      <div className="solution-detail-blueprint-item" key={`${solution.slug}-${section}`}>
                        <CheckCircle2 size={15} strokeWidth={1.9} />
                        <strong>{section}</strong>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="solution-detail-blueprint-block">
                  <span>Imagery Type</span>
                  <div className="solution-detail-blueprint-tags">
                    {blueprint.imageryTypes.map((item) => (
                      <span className="solution-detail-blueprint-tag" key={`${solution.slug}-${item}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.visuals` as const}
        title={`${solution.title} Visual Story`}
        description="Showcase imagery and visual proof section."
      >
      <section className="solution-detail-section-redesign">
        <div className="container">
          <div className="solution-detail-see-shell">
            <div className="solution-detail-section-heading">
              <p className="eyebrow">See It In Action</p>
              <h2>{blueprint.visualTitle}</h2>
              <p className="section-subtitle">
                Pair the hardware story with a platform story so teams can picture the map, alert stream, and mobile
                workflow they actually use day to day.
              </p>
            </div>

            <div className="solution-detail-showcase-grid">
              {showcaseImages.map((item) => (
                <article className="solution-detail-showcase-card" key={`${solution.slug}-${item.title}`}>
                  <div className="solution-detail-showcase-media">
                    <Image
                      src={resolveCloudinaryAsset(item.src)}
                      alt={item.alt}
                      width={720}
                      height={420}
                      className="solution-detail-showcase-image"
                    />
                  </div>
                  <div className="solution-detail-showcase-copy">
                    <span>{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="solution-detail-see-grid">
              {experience.visuals.map((visual) => {
                const Icon = visual.icon;

                return (
                  <article className="solution-detail-see-card" key={`${solution.slug}-${visual.title}`}>
                    <div className="solution-detail-see-icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.9} />
                    </div>
                    <strong>{visual.title}</strong>
                    <p>{visual.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.challenges` as const}
        title={`${solution.title} Challenges`}
        description="Operational pain points and challenge cards."
      >
      <section className="solution-detail-section-redesign">
        <div className="container">
          <div className="solution-detail-section-heading">
            <p className="eyebrow">Operational Pressure</p>
            <h2>{blueprint.challengeTitle}</h2>
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.hardware` as const}
        title={`${solution.title} Hardware`}
        description="Recommended hardware stack for this workflow."
      >
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
                    src={resolveCloudinaryAsset(hardware.imageSrc)}
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.process` as const}
        title={`${solution.title} Process`}
        description="How-it-works rollout explanation."
      >
      <section className="solution-detail-section-redesign">
        <div className="container">
          <div className="solution-detail-section-heading solution-detail-section-heading-split">
            <div>
              <p className="eyebrow">How It Works</p>
              <h2>{blueprint.processTitle}</h2>
            </div>
            <p className="section-subtitle">
              Buyers should understand how the system goes from hardware install to live monitoring and reporting without
              decoding the stack themselves.
            </p>
          </div>

          <div className="solution-detail-steps-grid">
            {experience.steps.map((step, index) => (
              <article className="solution-detail-step-card" key={`${solution.slug}-${step.title}`}>
                <span className="solution-detail-step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.workflow` as const}
        title={`${solution.title} Workflow Fit`}
        description="Use cases and execution outcomes."
      >
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.decision` as const}
        title={`${solution.title} Decision Criteria`}
        description="Why buyers choose this path."
      >
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.deployment` as const}
        title={`${solution.title} Deployment Fit`}
        description="Deployment CTA and buyer-oriented summary."
      >
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
              <div className="solution-detail-deployment-actions">
                <Link className="button button-primary" href="/contact">
                  Book live demo
                </Link>
                <Link className="solutions-inline-link is-muted" href="/products">
                  Review hardware fit <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </div>
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.related` as const}
        title={`${solution.title} Related Paths`}
        description="Related solution recommendations."
      >
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
      </InlineEditableSection>

      <InlineEditableSection
        sectionId={`solutions.detail.${solution.slug}.cta` as const}
        title={`${solution.title} Bottom CTA`}
        description="Final conversion block at the end of the page."
      >
      <section className="solution-detail-bottom-cta">
        <div className="container">
          <div className="solution-detail-bottom-cta-panel">
            <div className="solution-detail-bottom-cta-copy">
              <p className="eyebrow">Next Step</p>
              <h2>Book a live walkthrough for this solution path.</h2>
              <p>
                See the workflow, hardware, and rollout recommendations mapped to your fleet before you commit to the next
                step.
              </p>
            </div>
            <div className="solution-detail-bottom-cta-actions">
              <Link className="button button-primary" href="/contact">
                {experience.demoLabel}
              </Link>
              <Link className="button button-secondary" href="/solutions">
                Back to Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
      </InlineEditableSection>
    </main>
  );
}
