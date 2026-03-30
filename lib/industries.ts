export type IndustryCard = {
  title: string;
  description: string;
};

export type IndustrySolution = {
  slug: string;
  title: string;
  description: string;
  challenges: IndustryCard[];
  hardware: {
    category: string;
    title: string;
    specs: string;
    description: string;
    productId?: string;
  }[];
  useCases: IndustryCard[];
  cta: string;
};

export const industriesList: IndustrySolution[] = [
  {
    slug: "transportation",
    title: "Transportation Hardware Solutions",
    description:
      "Fleet hardware for route visibility, safety monitoring, and operational telemetry across commercial transportation fleets.",
    challenges: [
      {
        title: "Mixed fleet visibility",
        description:
          "Operators need clearer route, ignition, and status data across varied vehicle classes.",
      },
      {
        title: "Road safety events",
        description:
          "Incident review requires dependable video and event capture hardware in motion.",
      },
      {
        title: "Maintenance blind spots",
        description:
          "Teams need better telemetry for utilization, service timing, and asset readiness.",
      },
      {
        title: "Dispatch performance",
        description:
          "Operational leaders need better route oversight and service accountability.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description:
          "Advanced live fleet tracking hardware with stronger connectivity and modern telematics support.",
        productId: "4g-gps-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description:
          "Dual-facing dashcam hardware built for safety events, driver review, and fleet video capture.",
        productId: "ai-dashcam",
      },
      {
        category: "Dashcam & DVR",
        title: "DVR System",
        specs: "Multi-Channel | Recording | Review",
        description:
          "On-road video recording hardware for multi-channel vehicle monitoring and incident review.",
        productId: "dvr-system",
      },
    ],
    useCases: [
      {
        title: "Route tracking",
        description:
          "Improve dispatch visibility with dependable live telematics across active trips.",
      },
      {
        title: "Incident review",
        description:
          "Capture road events for safer operations and clearer claims workflows.",
      },
      {
        title: "Utilization monitoring",
        description:
          "Understand vehicle movement and status for better fleet planning.",
      },
      {
        title: "Driver support",
        description:
          "Support safer driving behavior with event-based video hardware insight.",
      },
    ],
    cta: "Equip transportation fleets with dependable connected hardware.",
  },
  {
    slug: "logistics",
    title: "Logistics Hardware Solutions",
    description:
      "Connected tracking, video, and sensing hardware for dispatch visibility, trailer recovery, route intelligence, and operational monitoring across logistics fleets.",
    challenges: [
      {
        title: "Route visibility gaps",
        description:
          "Dispatch teams need live movement data across mixed routes, stops, and delivery schedules.",
      },
      {
        title: "Trailer recovery risk",
        description:
          "Detached and mobile assets require dependable tracking outside the powered vehicle environment.",
      },
      {
        title: "Safety event review",
        description:
          "Fleet teams need clearer incident visibility for coaching, claims, and risk management workflows.",
      },
      {
        title: "Fuel and cargo awareness",
        description:
          "Operational leaders need better sensing for efficiency, monitoring, and service accountability.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description:
          "Advanced live fleet tracking hardware with stronger connectivity and modern telematics support.",
        productId: "4g-gps-device",
      },
      {
        category: "Asset Tracking",
        title: "Asset Tracking Device",
        specs: "Battery Powered | BLE | GNSS",
        description:
          "Battery-powered tracker designed for trailers, mobile assets, and field equipment monitoring.",
        productId: "asset-tracking-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description:
          "Dual-facing dashcam hardware built for safety events, driver review, and fleet video capture.",
        productId: "ai-dashcam",
      },
      {
        category: "Sensors",
        title: "Fuel Sensors",
        specs: "Fuel Monitoring | Live Data | Alerts",
        description:
          "Sensor extension for live fuel monitoring and consumption awareness.",
        productId: "fuel-sensors",
      },
    ],
    useCases: [
      {
        title: "Live fleet dispatch",
        description:
          "Track delivery movement and improve ETA visibility across active runs.",
      },
      {
        title: "Trailer monitoring",
        description:
          "Maintain awareness across detached trailers and mobile logistics assets.",
      },
      {
        title: "Incident capture",
        description:
          "Review road events with clearer video hardware visibility and driver context.",
      },
      {
        title: "Fuel efficiency control",
        description:
          "Support operational cost tracking with better sensor data and reporting.",
      },
    ],
    cta: "Deploy logistics hardware built for live fleet visibility.",
  },
  {
    slug: "construction",
    title: "Construction Hardware Solutions",
    description:
      "Rugged telematics hardware for mobile equipment, site visibility, safety oversight, and field asset monitoring.",
    challenges: [
      {
        title: "Equipment visibility",
        description:
          "Field assets move across sites and need dependable monitoring outside traditional yard environments.",
      },
      {
        title: "Safety accountability",
        description:
          "Operations teams need clearer event data to improve driver and equipment safety.",
      },
      {
        title: "Asset misuse risk",
        description:
          "Construction fleets require better oversight for unauthorized movement and recovery.",
      },
      {
        title: "Load and motion awareness",
        description:
          "Sites need stronger sensing for movement, tilt, and heavy equipment utilization.",
      },
    ],
    hardware: [
      {
        category: "Asset Tracking",
        title: "Asset Tracking Device",
        specs: "Battery Powered | BLE | GNSS",
        description:
          "Battery-powered tracker designed for trailers, mobile assets, and field equipment monitoring.",
        productId: "asset-tracking-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description:
          "Dual-facing dashcam hardware built for safety events, driver review, and fleet video capture.",
        productId: "ai-dashcam",
      },
      {
        category: "Sensors",
        title: "Tilt Sensor",
        specs: "Angle Detection | Motion | Alerts",
        description:
          "Detects movement angle changes for safety and operational awareness.",
        productId: "tilt-sensor",
      },
      {
        category: "Sensors",
        title: "Axle Load Sensor",
        specs: "Load Data | Compliance | Alerts",
        description:
          "Load monitoring sensor for fleet safety and overloading prevention.",
        productId: "axle-load-sensor",
      },
    ],
    useCases: [
      {
        title: "Asset recovery",
        description:
          "Keep mobile equipment visible across active jobs and storage locations.",
      },
      {
        title: "Site safety review",
        description:
          "Support incident visibility across on-road and on-site vehicle activity.",
      },
      {
        title: "Equipment movement alerts",
        description:
          "Track tilt and motion changes for sensitive equipment operations.",
      },
      {
        title: "Load monitoring",
        description:
          "Improve awareness around overloading and heavy fleet deployment.",
      },
    ],
    cta: "Support construction fleets with rugged connected hardware.",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing Hardware Solutions",
    description:
      "Operational hardware for yard visibility, movement monitoring, and fleet-connected manufacturing logistics.",
    challenges: [
      {
        title: "Yard visibility gaps",
        description:
          "Manufacturing sites need better awareness across trailers, service vehicles, and internal fleet movement.",
      },
      {
        title: "Material monitoring",
        description:
          "Operations teams need dependable sensor data for loads, storage, and sensitive inventory conditions.",
      },
      {
        title: "Movement accountability",
        description:
          "Vehicle and asset activity needs clearer monitoring for scheduling and control.",
      },
      {
        title: "Installation consistency",
        description:
          "Deployment across facility fleets requires dependable hardware fitment and accessory support.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description:
          "Advanced live fleet tracking hardware with stronger connectivity and modern telematics support.",
        productId: "4g-gps-device",
      },
      {
        category: "Sensors",
        title: "Temperature Sensors",
        specs: "Temp Monitoring | Cold Chain | Alerts",
        description:
          "Designed for temperature-sensitive operations and cold-chain visibility.",
        productId: "temperature-sensors",
      },
      {
        category: "Sensors",
        title: "Grain Level Sensor",
        specs: "Cargo Level | Material Load | Monitoring",
        description:
          "Monitoring sensor for material and cargo level measurement.",
        productId: "grain-level-sensor",
      },
      {
        category: "Accessories",
        title: "Harness & Relays",
        specs: "Install Kit | Wiring | Deployment",
        description:
          "Essential installation accessories for clean and dependable hardware deployment.",
        productId: "harness-relays",
      },
    ],
    useCases: [
      {
        title: "Yard asset tracking",
        description:
          "Track trailers, handling units, and support fleets around industrial facilities.",
      },
      {
        title: "Condition monitoring",
        description:
          "Support temperature-sensitive or monitored storage operations.",
      },
      {
        title: "Load awareness",
        description:
          "Improve oversight across mobile material movement and level measurement.",
      },
      {
        title: "Deployment control",
        description:
          "Standardize hardware installation across facility vehicles and equipment.",
      },
    ],
    cta: "Connect manufacturing operations with dependable fleet hardware.",
  },
  {
    slug: "farming",
    title: "Farming Hardware Solutions",
    description:
      "Hardware systems for agricultural equipment visibility, fuel awareness, and field-based operational monitoring.",
    challenges: [
      {
        title: "Remote asset visibility",
        description:
          "Mobile agricultural equipment requires tracking beyond facility-based operations.",
      },
      {
        title: "Fuel monitoring",
        description:
          "Field fleets need clearer fuel awareness across flexible and remote deployments.",
      },
      {
        title: "Load and material checks",
        description:
          "Operations need better measurement for transported materials and equipment condition.",
      },
      {
        title: "Movement alerts",
        description:
          "Unexpected equipment angle or movement changes require clearer awareness in the field.",
      },
    ],
    hardware: [
      {
        category: "Asset Tracking",
        title: "Asset Tracking Device",
        specs: "Battery Powered | BLE | GNSS",
        description:
          "Battery-powered tracker designed for trailers, mobile assets, and field equipment monitoring.",
        productId: "asset-tracking-device",
      },
      {
        category: "Sensors",
        title: "Fuel Sensors",
        specs: "Fuel Monitoring | Live Data | Alerts",
        description:
          "Sensor extension for live fuel monitoring and consumption awareness.",
        productId: "fuel-sensors",
      },
      {
        category: "Sensors",
        title: "Grain Level Sensor",
        specs: "Cargo Level | Material Load | Monitoring",
        description:
          "Monitoring sensor for material and cargo level measurement.",
        productId: "grain-level-sensor",
      },
      {
        category: "Sensors",
        title: "Tilt Sensor",
        specs: "Angle Detection | Motion | Alerts",
        description:
          "Detects movement angle changes for safety and operational awareness.",
        productId: "tilt-sensor",
      },
    ],
    useCases: [
      {
        title: "Field equipment tracking",
        description:
          "Maintain visibility across tractors, trailers, and mobile agricultural assets.",
      },
      {
        title: "Fuel control",
        description:
          "Monitor usage and improve operational awareness in remote field environments.",
      },
      {
        title: "Material level measurement",
        description:
          "Track grain or cargo levels across agricultural transport workflows.",
      },
      {
        title: "Movement alerts",
        description:
          "Support safer and more controlled operation with tilt and motion detection.",
      },
    ],
    cta: "Deploy agricultural hardware built for field visibility and control.",
  },
  {
    slug: "public-transport",
    title: "Public Transport Hardware Solutions",
    description:
      "Route-connected telematics hardware for safer passenger fleets, service visibility, and transit event review.",
    challenges: [
      {
        title: "Service reliability",
        description:
          "Transit operations need clearer route and schedule visibility across daily fleet movement.",
      },
      {
        title: "Passenger safety review",
        description:
          "Road and cabin visibility are critical for safer public transport service operations.",
      },
      {
        title: "Vehicle oversight",
        description:
          "Teams need better monitoring for incidents, vehicle status, and maintenance readiness.",
      },
      {
        title: "Tire and equipment health",
        description:
          "Public fleets benefit from stronger safety monitoring across high-usage vehicles.",
      },
    ],
    hardware: [
      {
        category: "4G Devices",
        title: "4G GPS Device",
        specs: "LTE | GNSS | CAN",
        description:
          "Advanced live fleet tracking hardware with stronger connectivity and modern telematics support.",
        productId: "4g-gps-device",
      },
      {
        category: "Dashcam & DVR",
        title: "AI Dashcam",
        specs: "1080p | Dual Cam | ADAS",
        description:
          "Dual-facing dashcam hardware built for safety events, driver review, and fleet video capture.",
        productId: "ai-dashcam",
      },
      {
        category: "Dashcam & DVR",
        title: "DVR System",
        specs: "Multi-Channel | Recording | Review",
        description:
          "On-road video recording hardware for multi-channel vehicle monitoring and incident review.",
        productId: "dvr-system",
      },
      {
        category: "Sensors",
        title: "TPMS",
        specs: "Pressure | Tire Health | Safety",
        description:
          "Tire pressure monitoring sensors for safer vehicle performance and maintenance visibility.",
        productId: "tpms",
      },
    ],
    useCases: [
      {
        title: "Route performance",
        description:
          "Track service movement and improve visibility across active public routes.",
      },
      {
        title: "Passenger safety review",
        description:
          "Support incident review with stronger on-road and interior video hardware coverage.",
      },
      {
        title: "Transit maintenance visibility",
        description:
          "Improve oversight across vehicle status and safety-related usage patterns.",
      },
      {
        title: "Tire safety monitoring",
        description:
          "Support safer operations with better pressure and vehicle health awareness.",
      },
    ],
    cta: "Connect public transport fleets with reliable hardware infrastructure.",
  },
];

export const industryDirectoryCards = [
  {
    title: "Transportation",
    description:
      "Connected fleet hardware for route visibility, driver safety, and operational control.",
    href: "/industries/transportation",
  },
  {
    title: "Logistics",
    description:
      "Tracking and monitoring hardware for delivery networks, trailers, and dispatch workflows.",
    href: "/industries/logistics",
  },
  {
    title: "Construction",
    description:
      "Rugged hardware solutions for field assets, safety visibility, and equipment deployment.",
    href: "/industries/construction",
  },
  {
    title: "Manufacturing",
    description:
      "Hardware systems for yard visibility, material movement, and operational monitoring.",
    href: "/industries/manufacturing",
  },
  {
    title: "Farming",
    description:
      "Telematics devices and sensors for mobile assets, fuel visibility, and agricultural field activity.",
    href: "/industries/farming",
  },
  {
    title: "Public Transport",
    description:
      "Fleet safety, route monitoring, and passenger service visibility for public transit operations.",
    href: "/industries/public-transport",
  },
];

export const getIndustryBySlug = (slug: string) =>
  industriesList.find((industry) => industry.slug === slug);
