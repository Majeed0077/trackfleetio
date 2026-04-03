export type SolutionCard = {
  title: string;
  description: string;
};

export type SolutionsOverviewNode = {
  title: string;
  href: string;
  icon: "tracking" | "video" | "monitoring" | "asset" | "industry";
};

export type SolutionDetail = {
  slug: string;
  title: string;
  description: string;
  challenges: SolutionCard[];
  hardware: {
    category: string;
    title: string;
    specs: string;
    description: string;
    productId?: string;
  }[];
  useCases: SolutionCard[];
  cta: string;
};

export const solutionsList: SolutionDetail[] = [
  {
    slug: "monitoring-systems",
    title: "Monitoring Systems",
    description:
      "Connected monitoring systems for fuel, temperature, tire pressure, and service-critical operational visibility.",
    challenges: [
      {
        title: "Fragmented monitoring signals",
        description:
          "Operations teams need one clearer view across multiple monitoring inputs and alerting sources.",
      },
      {
        title: "Delayed issue detection",
        description:
          "Sensor problems are often discovered too late without dependable live hardware feedback.",
      },
      {
        title: "Inconsistent reporting",
        description:
          "Teams require cleaner telemetry and repeatable data collection across vehicle fleets.",
      },
    ],
    hardware: [
      {
        category: "Sensors",
        title: "Fuel Sensors",
        specs: "Fuel Monitoring | Live Data | Alerts",
        description: "Sensor hardware for real-time fuel visibility and anomaly monitoring.",
        productId: "fuel-sensors",
      },
      {
        category: "Sensors",
        title: "Temperature Sensors",
        specs: "Temp Monitoring | Cold Chain | Alerts",
        description: "Monitoring hardware for temperature-sensitive operations and compliance.",
        productId: "temperature-sensors",
      },
      {
        category: "Sensors",
        title: "TPMS",
        specs: "Pressure | Tire Health | Safety",
        description: "Tire pressure monitoring hardware for safer fleet performance oversight.",
        productId: "tpms",
      },
    ],
    useCases: [
      {
        title: "Condition monitoring",
        description: "Track service-critical thresholds with fewer manual checks and delayed escalations.",
      },
      {
        title: "Exception alerts",
        description: "Detect operating issues earlier with more dependable hardware-triggered alerts.",
      },
      {
        title: "Compliance visibility",
        description: "Support reporting and operational accountability through cleaner monitoring data.",
      },
    ],
    cta: "Deploy monitoring systems built for dependable fleet oversight.",
  },
  {
    slug: "fuel-monitoring-system",
    title: "Fuel Monitoring System",
    description:
      "A connected fuel monitoring solution for usage visibility, loss detection, and operational efficiency tracking.",
    challenges: [
      {
        title: "Fuel loss visibility",
        description: "Teams need faster awareness of abnormal usage, theft, or leakage behavior.",
      },
      {
        title: "Manual fuel checks",
        description: "Operations lose time when fuel reporting depends on delayed field updates.",
      },
      {
        title: "Cost control gaps",
        description: "Clearer fuel telemetry is needed for route, driver, and equipment optimization.",
      },
    ],
    hardware: [
      {
        category: "Sensors",
        title: "Fuel Sensors",
        specs: "Fuel Monitoring | Live Data | Alerts",
        description: "Primary sensing hardware for live tank-level awareness and event alerts.",
        productId: "fuel-sensors",
      },
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Connectivity hardware for transmitting fuel-related telemetry in real time.",
        productId: "4g-gps-device",
      },
    ],
    useCases: [
      {
        title: "Consumption tracking",
        description: "Monitor operating fuel usage more accurately across active vehicles and assets.",
      },
      {
        title: "Loss detection",
        description: "Support faster response to suspicious level changes and unexpected consumption.",
      },
      {
        title: "Efficiency analysis",
        description: "Compare routes and equipment performance with clearer fuel data inputs.",
      },
    ],
    cta: "Gain cleaner fuel visibility with a connected monitoring system.",
  },
  {
    slug: "temperature-monitoring-system",
    title: "Temperature Monitoring System",
    description:
      "A fleet-connected temperature monitoring solution for cold-chain visibility and condition-sensitive logistics.",
    challenges: [
      {
        title: "Condition-sensitive cargo risk",
        description: "Temperature drift can damage shipments without timely monitoring alerts.",
      },
      {
        title: "Cold-chain compliance pressure",
        description: "Operators need clearer historical and live temperature records for service assurance.",
      },
      {
        title: "Remote asset uncertainty",
        description: "Teams need confidence in temperature status across moving and parked assets.",
      },
    ],
    hardware: [
      {
        category: "Sensors",
        title: "Temperature Sensors",
        specs: "Temp Monitoring | Cold Chain | Alerts",
        description: "Dedicated sensing hardware for live temperature status and threshold alerts.",
        productId: "temperature-sensors",
      },
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Live connectivity for sending condition data and route context together.",
        productId: "4g-gps-device",
      },
    ],
    useCases: [
      {
        title: "Cold-chain monitoring",
        description: "Maintain clearer visibility across shipments that require stable environmental conditions.",
      },
      {
        title: "Exception alerts",
        description: "React faster to temperature spikes and service interruptions.",
      },
      {
        title: "Audit readiness",
        description: "Support stronger operational documentation with cleaner monitoring trails.",
      },
    ],
    cta: "Protect temperature-sensitive operations with live monitoring hardware.",
  },
  {
    slug: "tire-pressure-monitoring-system",
    title: "Tire Pressure Monitoring System",
    description:
      "A fleet safety solution for continuous tire pressure visibility, maintenance alerts, and safer day-to-day operations.",
    challenges: [
      {
        title: "Hidden tire health issues",
        description: "Pressure problems often go undetected until they affect safety or route reliability.",
      },
      {
        title: "Reactive maintenance",
        description: "Teams need earlier warning before pressure issues turn into road events.",
      },
      {
        title: "Service disruption risk",
        description: "Underinflation and imbalance can reduce fleet readiness and uptime.",
      },
    ],
    hardware: [
      {
        category: "Sensors",
        title: "TPMS",
        specs: "Pressure | Tire Health | Safety",
        description: "Pressure monitoring sensors for safer fleet maintenance visibility.",
        productId: "tpms",
      },
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Connectivity layer for real-time tire alerts and operational telemetry.",
        productId: "4g-gps-device",
      },
    ],
    useCases: [
      {
        title: "Preventive maintenance",
        description: "Surface tire pressure issues earlier and reduce emergency service risk.",
      },
      {
        title: "Road safety support",
        description: "Support safer driving conditions with cleaner vehicle health awareness.",
      },
      {
        title: "Fleet uptime",
        description: "Keep vehicles operating more reliably with better pressure visibility.",
      },
    ],
    cta: "Improve fleet safety with connected tire pressure monitoring.",
  },
  {
    slug: "water-management-system",
    title: "Water Management System",
    description:
      "A connected monitoring solution for water handling, tank-level awareness, and service accountability.",
    challenges: [
      {
        title: "Tank visibility gaps",
        description: "Teams need better awareness of fill levels and operating cycles in the field.",
      },
      {
        title: "Service inefficiency",
        description: "Route execution suffers when water operations rely on delayed manual updates.",
      },
      {
        title: "Asset oversight",
        description: "Operators need stronger monitoring for remote tank and service equipment status.",
      },
    ],
    hardware: [
      {
        category: "Sensors",
        title: "Grain Level Sensor",
        specs: "Cargo Level | Material Load | Monitoring",
        description: "Level monitoring hardware adaptable for tank and volume visibility workflows.",
        productId: "grain-level-sensor",
      },
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Connected telemetry for route, service, and tank monitoring visibility.",
        productId: "4g-gps-device",
      },
    ],
    useCases: [
      {
        title: "Tank-level monitoring",
        description: "Understand asset status and replenishment needs with cleaner level visibility.",
      },
      {
        title: "Route planning",
        description: "Improve field service timing with better operating awareness.",
      },
      {
        title: "Remote operations",
        description: "Support off-site monitoring without relying on manual reporting.",
      },
    ],
    cta: "Modernize water operations with connected monitoring and telemetry.",
  },
  {
    slug: "field-force-management",
    title: "Field Force Management",
    description:
      "A connected fleet operations solution for live field visibility, mobile workforce coordination, and service performance.",
    challenges: [
      {
        title: "Dispatch visibility",
        description: "Supervisors need clearer live status across mobile teams and service units.",
      },
      {
        title: "Field accountability",
        description: "Teams require cleaner evidence of route, arrival, and service completion.",
      },
      {
        title: "Coordination delays",
        description: "Operations slow down without dependable real-time telemetry from the field.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Core field visibility hardware for route, ignition, and fleet status data.",
        productId: "4g-gps-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description: "Video visibility for service quality, incident review, and accountability.",
        productId: "ai-dashcam",
      },
    ],
    useCases: [
      {
        title: "Mobile team tracking",
        description: "Track live deployment status across technicians, service vans, and field units.",
      },
      {
        title: "Service verification",
        description: "Support stronger completion evidence and route oversight.",
      },
      {
        title: "Dispatch optimization",
        description: "Respond faster with cleaner movement and field availability data.",
      },
    ],
    cta: "Equip field teams with better visibility and operational control.",
  },
  {
    slug: "school-bus-tracking",
    title: "School Bus Tracking",
    description:
      "A connected public fleet solution for route visibility, student transport oversight, and safer school service operations.",
    challenges: [
      {
        title: "Route uncertainty",
        description: "Transport coordinators need clearer live awareness across school bus movement.",
      },
      {
        title: "Safety review",
        description: "Operators benefit from better incident context for passenger transport operations.",
      },
      {
        title: "Service accountability",
        description: "Schools and operators need stronger timing and fleet status visibility.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Live route telemetry hardware for school transport oversight.",
        productId: "4g-gps-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description: "Video safety hardware for event review and passenger transport visibility.",
        productId: "ai-dashcam",
      },
    ],
    useCases: [
      {
        title: "Route monitoring",
        description: "Track school vehicle movement with stronger real-time visibility.",
      },
      {
        title: "Safety review",
        description: "Improve operational confidence with better event context and footage.",
      },
      {
        title: "Service timing",
        description: "Support pickup and service reliability through cleaner fleet telemetry.",
      },
    ],
    cta: "Improve school transport visibility with connected fleet hardware.",
  },
  {
    slug: "smart-waste-collection-tracking",
    title: "Smart Waste Collection Tracking",
    description:
      "A route-connected tracking solution for waste collection fleets, service verification, and operational efficiency.",
    challenges: [
      {
        title: "Collection route visibility",
        description: "Teams need stronger oversight across scheduled pickups and service completion.",
      },
      {
        title: "Service proof gaps",
        description: "Operators benefit from clearer route and event records across field activity.",
      },
      {
        title: "Fleet utilization",
        description: "Waste collection efficiency depends on dependable live movement insights.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Core tracking hardware for route execution and operational oversight.",
        productId: "4g-gps-device",
      },
      {
        category: "Dashcam & DVR",
        title: "DVR System",
        specs: "Multi-Channel | Recording | Review",
        description: "Multi-channel video coverage for event review and field service proof.",
        productId: "dvr-system",
      },
    ],
    useCases: [
      {
        title: "Route performance",
        description: "Track collection patterns and improve scheduling visibility.",
      },
      {
        title: "Service verification",
        description: "Support proof-of-service workflows with stronger operational records.",
      },
      {
        title: "Incident review",
        description: "Capture on-road and operational context for claims and coaching.",
      },
    ],
    cta: "Modernize waste collection tracking with connected route visibility.",
  },
  {
    slug: "parts-tracking",
    title: "Parts Tracking",
    description:
      "A connected tracking solution for high-value parts, movement visibility, and logistics accountability.",
    challenges: [
      {
        title: "Inventory movement blind spots",
        description: "Teams need cleaner oversight when valuable parts move across sites and vehicles.",
      },
      {
        title: "Recovery risk",
        description: "Detached assets and shipments require stronger location awareness.",
      },
      {
        title: "Logistics coordination",
        description: "Operational handoffs are harder to manage without dependable status visibility.",
      },
    ],
    hardware: [
      {
        category: "Asset Tracking",
        title: "Asset Tracking Device",
        specs: "Battery Powered | BLE | GNSS",
        description: "Battery-powered hardware for parts, containers, and shipment visibility.",
        productId: "asset-tracking-device",
      },
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Connected telemetry for mobile fleet-linked parts movement tracking.",
        productId: "4g-gps-device",
      },
    ],
    useCases: [
      {
        title: "Parts location awareness",
        description: "Track movement across sites, depots, and in-transit workflows.",
      },
      {
        title: "Recovery readiness",
        description: "Improve control over high-value parts and mobile inventory.",
      },
      {
        title: "Operational handoffs",
        description: "Support smoother logistics coordination with cleaner location context.",
      },
    ],
    cta: "Improve parts visibility with connected tracking hardware.",
  },
  {
    slug: "indoor-tracking",
    title: "Indoor Tracking",
    description:
      "A connected tracking solution for indoor asset visibility, facility movement monitoring, and operational control.",
    challenges: [
      {
        title: "Facility visibility gaps",
        description: "Indoor assets can be difficult to locate consistently without better telemetry support.",
      },
      {
        title: "Movement accountability",
        description: "Teams need stronger awareness across internal fleet and asset activity.",
      },
      {
        title: "Operational delays",
        description: "Search time and poor asset visibility reduce productivity in controlled facilities.",
      },
    ],
    hardware: [
      {
        category: "Asset Tracking",
        title: "Asset Tracking Device",
        specs: "Battery Powered | BLE | GNSS",
        description: "Flexible asset hardware for movement visibility and indoor-aware workflows.",
        productId: "asset-tracking-device",
      },
      {
        category: "Accessories",
        title: "Harness & Relays",
        specs: "Install Kit | Wiring | Deployment",
        description: "Accessory hardware for cleaner indoor deployment and installation consistency.",
        productId: "harness-relays",
      },
    ],
    useCases: [
      {
        title: "Asset location visibility",
        description: "Reduce search time with clearer facility movement and location context.",
      },
      {
        title: "Workflow monitoring",
        description: "Support stronger oversight of internal logistics and handling operations.",
      },
      {
        title: "Operational coordination",
        description: "Improve productivity through more dependable indoor tracking visibility.",
      },
    ],
    cta: "Bring clearer indoor visibility to connected facility operations.",
  },
  {
    slug: "lorawan-technology",
    title: "LoRaWAN Technology",
    description:
      "A long-range low-power connectivity solution for remote sensors, asset monitoring, and distributed field telemetry.",
    challenges: [
      {
        title: "Remote coverage needs",
        description: "Field deployments need dependable communication in lower-power monitoring environments.",
      },
      {
        title: "Battery-sensitive operations",
        description: "Distributed sensing depends on efficient communication and extended runtime.",
      },
      {
        title: "Scattered infrastructure",
        description: "Operators need better visibility across broad, distributed hardware footprints.",
      },
    ],
    hardware: [
      {
        category: "Asset Tracking",
        title: "Asset Tracking Device",
        specs: "Battery Powered | BLE | GNSS",
        description: "Low-touch tracking hardware suitable for wide-area distributed deployments.",
        productId: "asset-tracking-device",
      },
      {
        category: "Sensors",
        title: "Temperature Sensors",
        specs: "Temp Monitoring | Cold Chain | Alerts",
        description: "Low-power monitoring endpoints for environmental awareness use cases.",
        productId: "temperature-sensors",
      },
    ],
    useCases: [
      {
        title: "Remote monitoring",
        description: "Support field sensors and devices where low-power coverage matters most.",
      },
      {
        title: "Distributed asset visibility",
        description: "Track remote operating conditions across wide-area deployments.",
      },
      {
        title: "Efficient telemetry",
        description: "Balance visibility and power efficiency for distributed monitoring networks.",
      },
    ],
    cta: "Extend low-power field visibility with connected LoRaWAN-ready workflows.",
  },
  {
    slug: "public-transport-business-solution",
    title: "Public Transport Business Solution",
    description:
      "A complete public transport operations solution for route visibility, service reliability, and passenger safety oversight.",
    challenges: [
      {
        title: "Transit service reliability",
        description: "Operators need stronger route and timing visibility across public fleet operations.",
      },
      {
        title: "Passenger safety review",
        description: "Transit service quality improves with better event and cabin visibility.",
      },
      {
        title: "Fleet readiness",
        description: "Teams need dependable oversight across vehicle usage and maintenance conditions.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Connected route telemetry for daily public transport performance visibility.",
        productId: "4g-gps-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description: "Video safety hardware for cabin and roadway event review.",
        productId: "ai-dashcam",
      },
      {
        category: "Sensors",
        title: "TPMS",
        specs: "Pressure | Tire Health | Safety",
        description: "Tire safety monitoring for high-usage public service fleets.",
        productId: "tpms",
      },
    ],
    useCases: [
      {
        title: "Route oversight",
        description: "Track live service movement and improve passenger service visibility.",
      },
      {
        title: "Safety monitoring",
        description: "Support incident review with stronger on-road and in-cabin visibility.",
      },
      {
        title: "Transit fleet readiness",
        description: "Improve service confidence with better operational and health monitoring.",
      },
    ],
    cta: "Upgrade public transport service visibility with a connected solution stack.",
  },
  {
    slug: "electric-vehicle-management",
    title: "Electric Vehicle Management",
    description:
      "A connected fleet solution for EV tracking, operational oversight, and service performance visibility.",
    challenges: [
      {
        title: "EV fleet visibility",
        description: "Operators need dependable route and usage oversight across electric fleets.",
      },
      {
        title: "Service planning",
        description: "Electric fleets require stronger usage awareness for scheduling and maintenance.",
      },
      {
        title: "Operational control",
        description: "Teams need cleaner telemetry to support reliable electric fleet operations.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Connected tracking hardware for route and operational EV visibility.",
        productId: "4g-gps-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description: "Safety and review hardware for electric fleet operations.",
        productId: "ai-dashcam",
      },
    ],
    useCases: [
      {
        title: "Fleet movement tracking",
        description: "Track active EV operations with stronger real-time visibility.",
      },
      {
        title: "Service oversight",
        description: "Support cleaner route and asset coordination across electric fleet programs.",
      },
      {
        title: "Safety and review",
        description: "Combine route telemetry and event visibility for stronger control.",
      },
    ],
    cta: "Manage electric vehicle operations with clearer connected visibility.",
  },
  {
    slug: "oil-tanker-monitoring-solutions",
    title: "Oil Tanker Monitoring Solutions",
    description:
      "A connected fleet solution for tanker route visibility, load awareness, and high-control operational monitoring.",
    challenges: [
      {
        title: "High-risk route visibility",
        description: "Tanker fleets require dependable oversight across long-haul and controlled routes.",
      },
      {
        title: "Load accountability",
        description: "Operators need clearer awareness of transported volume and related operating conditions.",
      },
      {
        title: "Safety event review",
        description: "Sensitive cargo operations need stronger evidence and route-control visibility.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description: "Live tanker telemetry for route, movement, and operating awareness.",
        productId: "4g-gps-device",
      },
      {
        category: "Sensors",
        title: "Fuel Sensors",
        specs: "Fuel Monitoring | Live Data | Alerts",
        description: "Monitoring hardware adaptable to tanker-level and volume visibility workflows.",
        productId: "fuel-sensors",
      },
      {
        category: "Dashcam & DVR",
        title: "DVR System",
        specs: "Multi-Channel | Recording | Review",
        description: "Video evidence and route review hardware for sensitive cargo operations.",
        productId: "dvr-system",
      },
    ],
    useCases: [
      {
        title: "Tanker route visibility",
        description: "Maintain clearer oversight across long-haul and regulated transport routes.",
      },
      {
        title: "Load monitoring",
        description: "Support operational control with stronger cargo and movement visibility.",
      },
      {
        title: "Safety review",
        description: "Improve route evidence and event response with connected video visibility.",
      },
    ],
    cta: "Strengthen tanker operations with connected monitoring and route visibility.",
  },
];

export const solutionDirectoryCards = solutionsList.map((solution) => ({
  title: solution.title,
  description: solution.description,
  href: `/solutions/${solution.slug}`,
}));

export const solutionsOverviewContent = {
  eyebrow: "Solution Coverage",
  heading: "Connected solutions across tracking, monitoring, and fleet control",
  description:
    "A focused overview of the core solution areas Track Fleetio supports for B2B fleet operations.",
  nodes: [
    {
      title: "Fleet Tracking",
      href: "/solutions/field-force-management",
      icon: "tracking",
    },
    {
      title: "Video Telematics",
      href: "/solutions/monitoring-systems",
      icon: "video",
    },
    {
      title: "Fuel Monitoring",
      href: "/solutions/fuel-monitoring-system",
      icon: "monitoring",
    },
    {
      title: "Asset Visibility",
      href: "/solutions/parts-tracking",
      icon: "asset",
    },
    {
      title: "Industry Solutions",
      href: "/industries",
      icon: "industry",
    },
  ] satisfies SolutionsOverviewNode[],
  chips: [
    "Deployment Planning",
    "Safety Review",
    "Operational Alerts",
  ],
  image: {
    src: "/Products/3Products.png",
    alt: "Track Fleetio hardware stack supporting connected fleet solutions",
  },
} as const;

export const getSolutionBySlug = (slug: string) =>
  solutionsList.find((solution) => solution.slug === slug);
