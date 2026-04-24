export type HomepageMetric = {
  title: string;
  description: string;
  icon: "boxes" | "route" | "shield" | "wrench";
};

export type HomepageProofArea = {
  label: string;
  title: string;
  description: string;
};

export type HomepageHardwareCard = {
  category: string;
  title: string;
  specs: string;
  description: string;
  bullets: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageClass: string;
  lightMedia?: boolean;
  featured?: boolean;
};

export type HomepageStoryCard = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  media: "video" | "image";
  imageSrc?: string;
  imageAlt?: string;
  imageClass?: string;
};

export type HomepageOutcome = {
  number: string;
  title: string;
  description: string;
};

export type HomepageArchitectureLayer = {
  id: string;
  label: string;
  title: string;
  description: string;
  connector?: string;
  icon: "gauge" | "cable" | "server-cog" | "radar";
  highlighted?: boolean;
};

export type HomepageIndustryFeature = {
  label: string;
  text: string;
  icon: "crosshair" | "route" | "boxes";
};

export type HomepageIndustryCard = {
  microLabel: string;
  title: string;
  description: string;
  href: string;
  icon: "package" | "wrench" | "briefcase" | "truck";
};

export type HomepageSupportCard = {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: "chat" | "mail" | "phone";
};

export type HomepageTrustStat = {
  value: string;
  label: string;
  detail: string;
  icon: "globe" | "route" | "boxes" | "map";
};

export type HomepageTrustReview = {
  platform: string;
  score: string;
  summary: string;
};

export const homepageSectionRegistry = [
  { title: "Hero", desc: "Headline, subtext, primary CTA, device collage.", visible: true, status: "Live" },
  { title: "Metrics", desc: "Trust metrics strip under hero with operational proof points.", visible: true, status: "Live" },
  { title: "Buying Priorities", desc: "Client-proof band and operational decision blocks.", visible: true, status: "Live" },
  { title: "Hardware Ecosystem", desc: "Primary product cards and category CTA.", visible: true, status: "Live" },
  { title: "Field Use Cases", desc: "Video and asset-tracking story cards with action links.", visible: true, status: "Live" },
  { title: "Results", desc: "Outcomes and operational improvement section.", visible: true, status: "Live" },
  { title: "Architecture", desc: "How-it-works system layers and connector chips.", visible: true, status: "Live" },
  { title: "Industries", desc: "Primary industry block and supporting cards.", visible: true, status: "Live" },
  { title: "Why Track Fleetio", desc: "Differentiator cards and value narrative.", visible: false, status: "Merged" },
  { title: "Support & Contact", desc: "Homepage contact cards for sales, support, and direct outreach.", visible: true, status: "Live" },
] as const;

export const heroContent = {
  heading: ["Enterprise Fleet", "Visibility Without", "Operational Guesswork"],
  description:
    "Track Fleetio helps operations, safety, and procurement leaders standardize the right mix of tracking, video telematics, and sensor hardware across mixed fleets so teams can improve visibility, review incidents faster, and scale deployment with confidence.",
  primaryCta: { label: "Get Quote", href: "/quote-request" },
  secondaryCta: { label: "Explore Solutions", href: "/solutions" },
  trustLine:
    "Designed for enterprise fleets managing vehicles, trailers, and mobile assets across complex operations.",
  image: {
    src: "/Products/Telematics hardware architecture.png",
    alt: "Telematics hardware architecture",
  },
} as const;

export const homepageMetrics: HomepageMetric[] = [
  {
    title: "Mixed Fleet Fit",
    description: "Vehicles, trailers, and mobile assets",
    icon: "boxes",
  },
  {
    title: "Connected Visibility",
    description: "Tracking, video, and sensor workflows",
    icon: "route",
  },
  {
    title: "Operational Control",
    description: "Safety, compliance, and review coverage",
    icon: "shield",
  },
  {
    title: "Rollout Support",
    description: "Planning before deployment starts",
    icon: "wrench",
  },
] as const;

export const buyingPrioritiesContent = {
  eyebrow: "B2B Solution Planning",
  heading: "Built around how fleet buying decisions actually get made",
  description:
    "Align operations, safety, deployment, and procurement before a rollout moves forward.",
  highlights: [
    "Operations review",
    "Safety workflows",
    "Deployment fit",
    "Procurement clarity",
  ],
  proofAreas: [
    {
      label: "Operations",
      title: "Daily fleet visibility",
      description: "Keep vehicles, trailers, and assets visible across daily work.",
    },
    {
      label: "Safety",
      title: "Review real driving events",
      description: "Review incidents with dashcam footage and field telemetry context.",
    },
    {
      label: "Deployment",
      title: "Plan rollout without guesswork",
      description: "Match hardwired, battery, and sensor hardware to your fleet mix.",
    },
    {
      label: "Procurement",
      title: "Choose the right hardware mix",
      description: "Shortlist device categories with clarity before you buy at scale.",
    },
  ] satisfies HomepageProofArea[],
} as const;

export const hardwareEcosystemContent = {
  eyebrow: "Solution Stack",
  heading: "Hardware that supports the full fleet solution",
  description:
    "Use the catalog to review the device layer behind each deployment, from telematics and video to mobile asset and condition monitoring.",
  cards: [
    {
      category: "Telematics Device",
      title: "4G GPS Tracker",
      specs: "LTE | GNSS | CAN Support",
      description:
        "Track Fleetio hardwireable fleet tracking devices deliver dependable location, ignition, and status data.",
      bullets: [
        "Live vehicle telemetry",
        "Rugged install profile",
        "Operational visibility",
        "Fleet tracking ready",
      ],
      href: "/products/4g-gps-device",
      imageSrc: "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
      imageAlt: "Track Fleetio GPS tracker",
      imageClass: "product-media-image-gps",
      featured: true,
    },
    {
      category: "Video Telematics",
      title: "AI Dashcam DVR",
      specs: "1080p | Dual Cam | ADAS",
      description:
        "Dual facing camera hardware built for event visibility, safer driving, and fleet video review.",
      bullets: [
        "Event video capture",
        "Driver review ready",
        "Cab-ready enclosure",
        "DVR recording support",
      ],
      href: "/products/ai-dashcam",
      imageSrc: "/Products/DR03.png",
      imageAlt: "Track Fleetio AI dashcam",
      imageClass: "product-media-image-dashcam",
    },
    {
      category: "Tracking Devices",
      title: "Battery Asset Tracker",
      specs: "3yr Battery | BLE | GNSS",
      description:
        "Compact battery powered devices designed for trailers, mobile assets, and field equipment monitoring.",
      bullets: [
        "Asset recovery ready",
        "Long life battery",
        "Reliable asset visibility",
        "Trailer monitoring",
      ],
      href: "/products/asset-tracking-device",
      imageSrc: "/Products/Compact black electronic device.png",
      imageAlt: "Track Fleetio asset tracker",
      imageClass: "product-media-image-asset",
    },
    {
      category: "Sensors",
      title: "Industrial Sensors",
      specs: "Temp | Fuel | TPMS",
      description:
        "Sensor extensions for temperature, door, and cargo awareness across higher control operations.",
      bullets: [
        "Remote condition inputs",
        "Operational awareness",
        "Dependable sensor feed",
        "Fuel, temp, TPMS",
      ],
      href: "/products/fuel-sensors",
      imageSrc: "/Products/Industrial temperature sensor close-up.png",
      imageAlt: "Track Fleetio sensor device",
      imageClass: "product-media-image-sensor",
      lightMedia: true,
    },
  ] satisfies HomepageHardwareCard[],
  cta: { label: "View Hardware Stack", href: "/products" },
} as const;

export const fieldUseCasesContent = {
  eyebrow: "Solution Workflows",
  heading: "Solutions built around real fleet workflows",
  description:
    "Start with the operational workflows buyers ask about first, then map the right hardware and rollout model behind them.",
  cards: [
    {
      title: "Detect harsh braking and review footage",
      description:
        "Safety teams can catch the event, review the clip, and follow up without relying on incomplete field reports.",
      ctaLabel: "Explore Monitoring Solution",
      ctaHref: "/solutions/monitoring-systems",
      media: "video",
    },
    {
      title: "Track trailers without vehicle power",
      description:
        "Battery-powered trackers keep trailers and portable assets visible when hardwired installation is not practical.",
      ctaLabel: "View Logistics Use Case",
      ctaHref: "/industries/logistics",
      media: "image",
      imageSrc: "/Products/Trailer (2).png",
      imageAlt: "Tracked refrigerated trailer parked in a logistics yard",
      imageClass: "story-media-image-asset",
    },
  ] satisfies HomepageStoryCard[],
} as const;

export const resultsContent = {
  eyebrow: "Business Outcomes",
  heading: ["What B2B teams improve", "after rollout"],
  description:
    "The hardware layer matters because it changes how quickly teams respond, review, recover, and manage daily fleet activity.",
  outcomes: [
    {
      number: "01",
      title: "Incident review speed",
      description: "See how quickly teams can capture footage, review events, and respond.",
    },
    {
      number: "02",
      title: "Asset visibility coverage",
      description: "Track how well vehicles, trailers, and portable assets stay visible in the field.",
    },
    {
      number: "03",
      title: "Recovery readiness",
      description: "Measure whether teams can locate and recover mobile assets before they disappear.",
    },
    {
      number: "04",
      title: "Response consistency",
      description: "Turn alerts and footage into repeatable follow-up across safety and operations.",
    },
  ] satisfies HomepageOutcome[],
} as const;

export const homepageTrustContent = {
  eyebrow: "Trust & Reach",
  heading: "Operational proof, presented where buyers expect it",
  description:
    "Placed after the hardware story so the numbers reinforce credibility right before the outcomes section and final conversion path.",
  stats: [
    {
      value: "05+",
      label: "Countries",
      detail: "Active rollout coverage across multiple fleet operating regions.",
      icon: "globe",
    },
    {
      value: "18K+",
      label: "Collection Trips",
      detail: "Tracked field movements and repeat operational journeys.",
      icon: "route",
    },
    {
      value: "1,200K+",
      label: "Assets & Bins",
      detail: "Connected containers, vehicles, and movable fleet equipment.",
      icon: "boxes",
    },
    {
      value: "25+",
      label: "Towns",
      detail: "Local area coverage for regional operations and route visibility.",
      icon: "map",
    },
  ] satisfies HomepageTrustStat[],
  reviews: [
    {
      platform: "G2",
      score: "4.8/5",
      summary: "Operational teams rate deployment clarity and day-to-day visibility highly.",
    },
    {
      platform: "Capterra",
      score: "4.9/5",
      summary: "Strong fit for buyers comparing telematics, sensors, and video in one stack.",
    },
    {
      platform: "SourceForge",
      score: "5.0/5",
      summary: "Consistently valued for practical workflows and clean fleet rollout support.",
    },
  ] satisfies HomepageTrustReview[],
} as const;

export const architectureContent = {
  eyebrow: "How It Works",
  heading: "From hardware deployment to operational control",
  description:
    "Plan the device mix, connect the data flow, and support the workflows your team already runs across operations and reporting.",
  layers: [
    {
      id: "hardware",
      label: "Layer 01",
      title: "Install Hardware",
      description: "Fit GPS trackers, AI dashcams, sensors, and OBD/CAN devices to the fleet.",
      connector: "LTE / CAN",
      icon: "gauge",
      highlighted: true,
    },
    {
      id: "edge",
      label: "Layer 02",
      title: "Stream Data",
      description: "Send telemetry, footage events, and firmware updates from the field.",
      connector: "Secure\nStream",
      icon: "cable",
    },
    {
      id: "platform",
      label: "Layer 03",
      title: "Get Alerts",
      description: "Turn incoming fleet data into alerts, review workflows, and operational visibility.",
      connector: "REST / API",
      icon: "server-cog",
    },
    {
      id: "operations",
      label: "Layer 04",
      title: "Connect Systems",
      description: "Push fleet data into dispatch, compliance, reporting, and business systems.",
      icon: "radar",
    },
  ] satisfies HomepageArchitectureLayer[],
} as const;

export const homeIndustriesContent = {
  eyebrow: "Industry Solutions",
  heading: "Solutions shaped around each operating environment",
  description:
    "Each industry needs a different mix of visibility, safety, sensing, and deployment planning.",
  featured: {
    href: "/industries/logistics",
    imageSrc: "/Products/logistics2.png",
    imageAlt: "Tracked trailers parked in a logistics yard",
    microLabel: "Primary Industry",
    title: "Logistics",
    description:
      "Track trailers across routes, depots, and yards without losing operational visibility.",
    keyCapabilities: [
      "Route and yard visibility",
      "Trailer location awareness",
      "Driver event review",
      "Asset movement tracking",
    ],
    icon: "truck" as const,
    featureItems: [
      {
        label: "Tracking",
        text: "Track trailers across routes",
        icon: "crosshair",
      },
      {
        label: "Routing",
        text: "Watch route and yard movement",
        icon: "route",
      },
      {
        label: "Visibility",
        text: "Review asset movement fast",
        icon: "boxes",
      },
    ] satisfies HomepageIndustryFeature[],
  },
  stackCards: [
    {
      microLabel: "Logistics",
      title: "Delivery",
      description: "Track stops, route exceptions, and last-mile fleet activity in one view.",
      href: "/industries/logistics",
      icon: "package",
    },
    {
      microLabel: "Industry Use Case",
      title: "Construction",
      description:
        "Monitor unpowered equipment and active jobsite movement without fixed installs.",
      href: "/industries/construction",
      icon: "wrench",
    },
    {
      microLabel: "Transportation",
      title: "Transportation",
      description:
        "Watch route adherence, safety events, and service activity across mixed fleets.",
      href: "/industries/transportation",
      icon: "briefcase",
    },
    {
      microLabel: "Operations",
      title: "Fleet Operations",
      description:
        "Keep field teams, vehicles, and trailers visible across daily dispatch and yard work.",
      href: "/industries/transportation",
      icon: "truck",
    },
  ] satisfies HomepageIndustryCard[],
} as const;

export const whyTrackFleetioContent = {
  eyebrow: "Why Track Fleetio",
  heading: "Why B2B teams choose a solution-led rollout",
  description:
    "Fleet technology is easy to oversell and hard to deploy. What matters is whether the solution fits real vehicles, workflows, and operating conditions.",
  transition: "A B2B buying decision only works if deployment still makes sense after the demo.",
  benefits: [
    {
      number: "01",
      title: "Installation planning that limits downtime",
      description: "Roll out across vehicles and assets without treating every install the same way.",
    },
    {
      number: "02",
      title: "Hardware that fits mixed fleet conditions",
      description:
        "Support hardwired, battery, and sensor-based deployments across real operating environments.",
    },
    {
      number: "03",
      title: "A stack that fits operational workflows",
      description:
        "Connect hardware decisions to dispatch, compliance, review, and reporting needs.",
    },
    {
      number: "04",
      title: "Support from evaluation through rollout",
      description:
        "Keep the buying conversation tied to deployment reality instead of stopping at the demo.",
    },
  ] satisfies HomepageOutcome[],
} as const;

export const homepageCtaContent = {
  eyebrow: "Plan Your Rollout",
  heading: "Build a fleet solution that fits your operation.",
  description:
    "Review the relevant solutions, then work through deployment fit, install requirements, and the right hardware stack for your fleet.",
  primaryCta: { label: "Talk to Solutions Team", href: "/contact" },
  secondaryCta: { label: "Explore Solutions", href: "/solutions" },
  image: {
    src: "/Products/3Products.png",
  },
  metrics: [
    {
      title: "Use-Case Coverage",
      description: "Tracking, monitoring, and safety workflows",
    },
    {
      title: "Industry Fit",
      description: "Logistics, transport, construction, and more",
    },
    {
      title: "Deployment Support",
      description: "Planning from consultation to rollout",
    },
  ],
} as const;

export const homepageSupportContent = {
  eyebrow: "Support & Contact",
  heading: "Get help from the right team",
  description: "Reach sales, solution planning, or support in one step.",
  cards: [
    {
      title: "Talk to Us",
      description: "Quick guidance for your requirements",
      value: "Contact our team",
      href: "/contact",
      icon: "chat",
    },
    {
      title: "Sales Inquiries",
      description: "Talk through the right solution fit",
      value: "hello@trackfleetio.com",
      href: "mailto:hello@trackfleetio.com",
      icon: "mail",
    },
    {
      title: "Call Us",
      description: "Direct discussion for deployment planning",
      value: "+000 000 0520",
      href: "tel:+000000520",
      icon: "phone",
    },
  ] satisfies HomepageSupportCard[],
} as const;
