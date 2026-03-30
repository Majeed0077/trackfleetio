export type ProductCategory = "tracking" | "video" | "sensors" | "accessories";

export type ProductImage = {
  src: string;
  alt: string;
  imageClass: string;
};

export type Product = {
  id: string;
  category: ProductCategory;
  categoryLabel: string;
  title: string;
  shortDescription: string;
  specs: string[];
  features: string[];
  useCases: string[];
  related: string[];
  imageSrc: string;
  imageAlt: string;
  imageClass: string;
  gallery: ProductImage[];
};

const baseProducts = {
  "2g-gps-device": {
    id: "2g-gps-device",
    category: "tracking",
    categoryLabel: "Tracking Devices",
    title: "2G GPS Device",
    shortDescription:
      "Reliable entry-level tracking hardware for essential vehicle visibility and status monitoring.",
    specs: ["2G", "GNSS", "Basic I/O"],
    features: [
      "Entry-level live tracking",
      "Vehicle status visibility",
      "Hardwire deployment ready",
      "Basic operational telemetry",
    ],
    useCases: [
      "Daily vehicle tracking",
      "Basic fleet visibility",
      "Dispatch coordination",
      "Essential route oversight",
    ],
    related: ["4g-gps-device", "asset-tracking-device", "ai-dashcam"],
    imageSrc: "/Products/product3.png",
    imageAlt: "2G GPS device",
    imageClass: "catalog-card-image-gps",
  },
  "4g-gps-device": {
    id: "4g-gps-device",
    category: "tracking",
    categoryLabel: "Tracking Devices",
    title: "4G GPS Device",
    shortDescription:
      "Advanced live fleet tracking hardware with stronger connectivity and modern telematics support.",
    specs: ["LTE", "GNSS", "CAN"],
    features: [
      "Advanced fleet telemetry",
      "Stronger live connectivity",
      "CAN data support",
      "Modern hardware deployment",
    ],
    useCases: [
      "Live fleet tracking",
      "Maintenance data visibility",
      "Mixed fleet monitoring",
      "Operational control rooms",
    ],
    related: ["2g-gps-device", "asset-tracking-device", "fuel-sensors"],
    imageSrc: "/Products/product3.png",
    imageAlt: "4G GPS device",
    imageClass: "catalog-card-image-gps",
  },
  "asset-tracking-device": {
    id: "asset-tracking-device",
    category: "tracking",
    categoryLabel: "Tracking Devices",
    title: "Asset Tracking Device",
    shortDescription:
      "Battery-powered tracker designed for trailers, mobile assets, and field equipment monitoring.",
    specs: ["Battery Powered", "BLE", "GNSS"],
    features: [
      "Trailer tracking ready",
      "Battery-powered deployment",
      "Mobile asset visibility",
      "Field equipment monitoring",
    ],
    useCases: [
      "Trailer monitoring",
      "Equipment recovery workflows",
      "Container visibility",
      "Remote asset tracking",
    ],
    related: ["4g-gps-device", "harness-relays", "tilt-sensor"],
    imageSrc: "/Products/product2.png",
    imageAlt: "Asset tracking device",
    imageClass: "catalog-card-image-asset",
  },
  "ai-dashcam": {
    id: "ai-dashcam",
    category: "video",
    categoryLabel: "Video Telematics",
    title: "AI Dashcam",
    shortDescription:
      "Dual-facing dashcam hardware built for safety events, driver review, and fleet video capture.",
    specs: ["1080p", "Dual Cam", "ADAS"],
    features: [
      "Dual-facing event capture",
      "Driver review workflows",
      "ADAS-ready visibility",
      "Safety event recording",
    ],
    useCases: [
      "Driver coaching",
      "Incident review",
      "Safety event capture",
      "Video evidence workflows",
    ],
    related: ["dvr-system", "4g-gps-device", "tpms"],
    imageSrc: "/Products/dashcam.png",
    imageAlt: "AI dashcam",
    imageClass: "catalog-card-image-dashcam",
  },
  "dvr-system": {
    id: "dvr-system",
    category: "video",
    categoryLabel: "Video Telematics",
    title: "DVR System",
    shortDescription:
      "On-road video recording hardware for multi-channel vehicle monitoring and incident review.",
    specs: ["Multi-Channel", "Recording", "Review"],
    features: [
      "Multi-channel recording",
      "Vehicle incident review",
      "On-road video monitoring",
      "Fleet evidence workflows",
    ],
    useCases: [
      "Cabin and road monitoring",
      "Incident investigation",
      "Operational recording",
      "Fleet evidence retention",
    ],
    related: ["ai-dashcam", "4g-gps-device", "fuel-sensors"],
    imageSrc: "/Products/dashcam.png",
    imageAlt: "DVR system",
    imageClass: "catalog-card-image-dashcam",
  },
  "fuel-sensors": {
    id: "fuel-sensors",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Fuel Sensors",
    shortDescription:
      "Sensor extension for live fuel monitoring and consumption awareness.",
    specs: ["Fuel Monitoring", "Live Data", "Alerts"],
    features: [
      "Live fuel awareness",
      "Consumption tracking",
      "Exception alerts",
      "Operational monitoring",
    ],
    useCases: [
      "Fuel theft awareness",
      "Consumption tracking",
      "Route efficiency analysis",
      "Operational cost control",
    ],
    related: ["wireless-fuel-sensor", "wired-fuel-level-sensor", "4g-gps-device"],
    imageSrc: "/Products/product1.png",
    imageAlt: "Fuel sensors",
    imageClass: "catalog-card-image-sensor",
  },
  "temperature-sensors": {
    id: "temperature-sensors",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Temperature Sensors",
    shortDescription:
      "Designed for temperature-sensitive operations and cold-chain visibility.",
    specs: ["Temp Monitoring", "Cold Chain", "Alerts"],
    features: [
      "Cold-chain visibility",
      "Temp-sensitive workflows",
      "Threshold alert support",
      "Condition monitoring",
    ],
    useCases: [
      "Cold-chain tracking",
      "Food transport compliance",
      "Pharma fleet monitoring",
      "Storage condition alerts",
    ],
    related: ["tpms", "fuel-sensors", "grain-level-sensor"],
    imageSrc: "/Products/product1.png",
    imageAlt: "Temperature sensors",
    imageClass: "catalog-card-image-sensor",
  },
  tpms: {
    id: "tpms",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "TPMS",
    shortDescription:
      "Tire pressure monitoring sensors for safer vehicle performance and maintenance visibility.",
    specs: ["Pressure", "Tire Health", "Safety"],
    features: [
      "Tire pressure visibility",
      "Maintenance awareness",
      "Safety exception alerts",
      "Fleet health monitoring",
    ],
    useCases: [
      "Tire health monitoring",
      "Maintenance alerts",
      "Vehicle safety support",
      "Road performance visibility",
    ],
    related: ["temperature-sensors", "axle-load-sensor", "ai-dashcam"],
    imageSrc: "/Products/product1.png",
    imageAlt: "TPMS sensors",
    imageClass: "catalog-card-image-sensor",
  },
  "wireless-fuel-sensor": {
    id: "wireless-fuel-sensor",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Wireless Fuel Sensor",
    shortDescription:
      "Wireless sensor solution for flexible fuel monitoring deployments.",
    specs: ["Wireless", "Fuel Data", "Flexible Install"],
    features: [
      "Flexible deployment setup",
      "Wireless fuel reporting",
      "Fast retrofit support",
      "Operational fuel visibility",
    ],
    useCases: [
      "Retrofit fuel monitoring",
      "Flexible fleet installs",
      "Tank monitoring",
      "Rapid field rollout",
    ],
    related: ["fuel-sensors", "wired-fuel-level-sensor", "harness-relays"],
    imageSrc: "/Products/product1.png",
    imageAlt: "Wireless fuel sensor",
    imageClass: "catalog-card-image-sensor",
  },
  "wired-fuel-level-sensor": {
    id: "wired-fuel-level-sensor",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Wired Fuel Level Sensor",
    shortDescription:
      "Wired hardware for dependable fuel level measurement and reporting.",
    specs: ["Wired", "Fuel Level", "Reporting"],
    features: [
      "Dependable wired install",
      "Fuel level measurement",
      "Steady reporting output",
      "Fleet usage awareness",
    ],
    useCases: [
      "Fixed fleet monitoring",
      "Stable tank reporting",
      "Fuel control programs",
      "Operations reporting",
    ],
    related: ["fuel-sensors", "wireless-fuel-sensor", "4g-gps-device"],
    imageSrc: "/Products/product1.png",
    imageAlt: "Wired fuel level sensor",
    imageClass: "catalog-card-image-sensor",
  },
  "tilt-sensor": {
    id: "tilt-sensor",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Tilt Sensor",
    shortDescription:
      "Detects movement angle changes for safety and operational awareness.",
    specs: ["Angle Detection", "Motion", "Alerts"],
    features: [
      "Movement angle detection",
      "Motion event awareness",
      "Safety threshold alerts",
      "Operational condition visibility",
    ],
    useCases: [
      "Trailer movement alerts",
      "Equipment safety monitoring",
      "Unauthorized movement detection",
      "Operational condition tracking",
    ],
    related: ["asset-tracking-device", "axle-load-sensor", "tpms"],
    imageSrc: "/Products/product1.png",
    imageAlt: "Tilt sensor",
    imageClass: "catalog-card-image-sensor",
  },
  "grain-level-sensor": {
    id: "grain-level-sensor",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Grain Level Sensor",
    shortDescription:
      "Monitoring sensor for material and cargo level measurement.",
    specs: ["Cargo Level", "Material Load", "Monitoring"],
    features: [
      "Material level tracking",
      "Cargo load visibility",
      "Storage condition awareness",
      "Monitoring-ready reporting",
    ],
    useCases: [
      "Bulk material monitoring",
      "Agricultural load visibility",
      "Cargo level checks",
      "Storage reporting",
    ],
    related: ["temperature-sensors", "axle-load-sensor", "harness-relays"],
    imageSrc: "/Products/product1.png",
    imageAlt: "Grain level sensor",
    imageClass: "catalog-card-image-sensor",
  },
  "axle-load-sensor": {
    id: "axle-load-sensor",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Axle Load Sensor",
    shortDescription:
      "Load monitoring sensor for fleet safety and overloading prevention.",
    specs: ["Load Data", "Compliance", "Alerts"],
    features: [
      "Load compliance monitoring",
      "Overload prevention alerts",
      "Fleet safety support",
      "Operational load visibility",
    ],
    useCases: [
      "Load compliance workflows",
      "Overload prevention",
      "Vehicle safety programs",
      "Operational load awareness",
    ],
    related: ["tpms", "tilt-sensor", "grain-level-sensor"],
    imageSrc: "/Products/product1.png",
    imageAlt: "Axle load sensor",
    imageClass: "catalog-card-image-sensor",
  },
  "harness-relays": {
    id: "harness-relays",
    category: "accessories",
    categoryLabel: "Accessories",
    title: "Harness & Relays",
    shortDescription:
      "Essential installation accessories for clean and dependable hardware deployment.",
    specs: ["Install Kit", "Wiring", "Deployment"],
    features: [
      "Clean hardware installation",
      "Deployment-ready wiring",
      "Reliable accessory support",
      "Fleet rollout essentials",
    ],
    useCases: [
      "Faster installs",
      "Clean wiring runs",
      "Consistent field deployment",
      "Accessory support readiness",
    ],
    related: ["4g-gps-device", "wireless-fuel-sensor", "asset-tracking-device"],
    imageSrc: "/Products/product3.png",
    imageAlt: "Harness and relays",
    imageClass: "catalog-card-image-gps",
  },
} satisfies Record<string, Omit<Product, "gallery">>;

const galleries: Record<string, ProductImage[]> = {
  "2g-gps-device": [
    {
      src: "/Products/product3.png",
      alt: "2G GPS device front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/3Products.png",
      alt: "2G GPS device product family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "4g-gps-device": [
    {
      src: "/Products/product3.png",
      alt: "4G GPS device front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/3Products.png",
      alt: "4G GPS device with product lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "asset-tracking-device": [
    {
      src: "/Products/product2.png",
      alt: "Asset tracking device front view",
      imageClass: "catalog-card-image-asset",
    },
    {
      src: "/Products/3Products.png",
      alt: "Asset tracking device family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "ai-dashcam": [
    {
      src: "/Products/dashcam.png",
      alt: "AI dashcam front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "AI dashcam hardware lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "dvr-system": [
    {
      src: "/Products/dashcam.png",
      alt: "DVR system front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "DVR system hardware lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "fuel-sensors": [
    {
      src: "/Products/product1.png",
      alt: "Fuel sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Fuel sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "temperature-sensors": [
    {
      src: "/Products/product1.png",
      alt: "Temperature sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Temperature sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  tpms: [
    {
      src: "/Products/product1.png",
      alt: "TPMS front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "TPMS hardware family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "wireless-fuel-sensor": [
    {
      src: "/Products/product1.png",
      alt: "Wireless fuel sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Wireless fuel sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "wired-fuel-level-sensor": [
    {
      src: "/Products/product1.png",
      alt: "Wired fuel level sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Wired fuel level sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "tilt-sensor": [
    {
      src: "/Products/product1.png",
      alt: "Tilt sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Tilt sensor hardware family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "grain-level-sensor": [
    {
      src: "/Products/product1.png",
      alt: "Grain level sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Grain level sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "axle-load-sensor": [
    {
      src: "/Products/product1.png",
      alt: "Axle load sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Axle load sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "harness-relays": [
    {
      src: "/Products/product3.png",
      alt: "Harness and relays front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/3Products.png",
      alt: "Harness and relays hardware family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
};

export const products: Record<string, Product> = Object.fromEntries(
  Object.entries(baseProducts).map(([id, product]) => [
    id,
    {
      ...product,
      gallery: galleries[id] || [
        {
          src: product.imageSrc,
          alt: product.imageAlt,
          imageClass: product.imageClass,
        },
      ],
    },
  ]),
) as Record<string, Product>;

export const productOrder = Object.keys(products);
export const productsList = productOrder.map((id) => products[id]);

export const productCategoryLabels: Record<ProductCategory, string> = {
  tracking: "Tracking Devices",
  video: "Video Telematics",
  sensors: "Sensors",
  accessories: "Accessories",
};

export const productSummaryLabels: Record<ProductCategory, string> = {
  tracking: "Tracking devices",
  video: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
};

export const getProductHref = (productId: string) => `/products/${encodeURIComponent(productId)}`;

export const getProductById = (productId: string) => products[productId];

export const getRelatedProducts = (product: Product) => {
  const relatedIds = [...product.related];

  if (relatedIds.length < 3) {
    productOrder.forEach((id) => {
      if (id !== product.id && !relatedIds.includes(id) && relatedIds.length < 3) {
        relatedIds.push(id);
      }
    });
  }

  return relatedIds.slice(0, 3).map((id) => products[id]).filter(Boolean);
};
