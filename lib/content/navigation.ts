export type NavigationLinkItem = {
  title: string;
  href: string;
  description?: string;
  icon?: "pin" | "camera" | "scan" | "shield" | "route" | "factory" | "bus" | "bolt" | "droplet" | "thermometer";
};

export type NavigationColumn = {
  label: string;
  links: NavigationLinkItem[];
  preview: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
    imageSrc: string;
    imageAlt: string;
    imageFit?: "cover" | "contain";
  };
};

const getProductsSearchHref = (query: string) => `/products?q=${encodeURIComponent(query)}`;

export const primaryNavigationItems = [
  { label: "Home", link: "/", order: 1, visibility: "Visible" },
  { label: "Solutions", link: "/solutions", order: 2, visibility: "Visible" },
  { label: "Products", link: "/products", order: 3, visibility: "Visible" },
  { label: "Industries", link: "/industries", order: 4, visibility: "Visible" },
  { label: "Company", link: "/about", order: 5, visibility: "Visible" },
] as const;

export const productMenuColumns: NavigationColumn[] = [
  {
    label: "Tracking Devices",
    links: [
      { title: "2G GPS Devices", href: getProductsSearchHref("2G GPS Device"), description: "Entry telematics for basic route visibility.", icon: "pin" },
      { title: "4G GPS Devices", href: getProductsSearchHref("4G GPS Device"), description: "Deployment-ready live tracking for modern fleets.", icon: "route" },
      { title: "GPS Tracker", href: getProductsSearchHref("GPS Tracker"), description: "Core positioning and movement visibility hardware.", icon: "pin" },
      { title: "Asset Trackers", href: getProductsSearchHref("Asset"), description: "Battery-powered tracking for trailers and mobile assets.", icon: "scan" },
      { title: "PET Tracker", href: getProductsSearchHref("PET"), description: "Compact tracking for lightweight mobile coverage.", icon: "shield" },
      { title: "Smart Watch", href: getProductsSearchHref("Watch"), description: "Wearable field visibility for connected operations.", icon: "bolt" },
    ],
    preview: {
      eyebrow: "Tracking Layer",
      title: "Hardware for live fleet visibility",
      description: "Review tracking devices used across vehicle, trailer, and asset deployments.",
      href: "/products",
      ctaLabel: "Browse tracking hardware",
      imageSrc: "/Products/product3.png",
      imageAlt: "Track Fleetio GPS tracker hardware",
      imageFit: "contain",
    },
  },
  {
    label: "Video Telematics",
    links: [
      { title: "AI Dashcams", href: getProductsSearchHref("Dashcam"), description: "Driver-facing and road-facing event review systems.", icon: "camera" },
      { title: "AI MDVR", href: getProductsSearchHref("MDVR"), description: "Multi-channel video capture for operational oversight.", icon: "camera" },
      { title: "DVR Systems", href: getProductsSearchHref("DVR"), description: "Recording systems for evidence and service verification.", icon: "camera" },
      { title: "Camera Systems", href: getProductsSearchHref("Camera"), description: "Expanded visual coverage for fleet and field use.", icon: "camera" },
    ],
    preview: {
      eyebrow: "Video Visibility",
      title: "Safer operations through video telematics",
      description: "Build incident review, driver coaching, and service-proof workflows on the right video stack.",
      href: "/solutions/monitoring-systems",
      ctaLabel: "Explore monitoring solutions",
      imageSrc: "/Products/dashcam.png",
      imageAlt: "Track Fleetio dashcam hardware",
      imageFit: "contain",
    },
  },
  {
    label: "Sensors & Accessories",
    links: [
      { title: "Fuel Sensors", href: getProductsSearchHref("Fuel Sensors"), description: "Fuel level and consumption awareness across fleets.", icon: "droplet" },
      { title: "Temperature Sensors", href: getProductsSearchHref("Temperature Sensors"), description: "Condition monitoring for cold chain and sensitive cargo.", icon: "thermometer" },
      { title: "TPMS", href: getProductsSearchHref("TPMS"), description: "Pressure monitoring for safety and maintenance visibility.", icon: "shield" },
      { title: "Load Sensors", href: getProductsSearchHref("Axle Load Sensor"), description: "Compliance and overloading awareness in heavy fleets.", icon: "scan" },
      { title: "Harness", href: getProductsSearchHref("Harness"), description: "Clean installation accessories for dependable rollout.", icon: "bolt" },
      { title: "Relays", href: getProductsSearchHref("Relays"), description: "Control and switching support across connected devices.", icon: "bolt" },
    ],
    preview: {
      eyebrow: "Monitoring Inputs",
      title: "Sensor hardware behind high-control workflows",
      description: "Add temperature, fuel, pressure, and install accessories to complete the deployment stack.",
      href: "/solutions/fuel-monitoring-system",
      ctaLabel: "View monitoring use cases",
      imageSrc: "/Products/product1.png",
      imageAlt: "Track Fleetio sensor hardware",
      imageFit: "contain",
    },
  },
];

export const solutionsMenuColumns: NavigationColumn[] = [
  {
    label: "Monitoring Systems",
    links: [
      { title: "Fuel Monitoring System", href: "/solutions/fuel-monitoring-system", description: "Usage visibility, anomaly detection, and cost control.", icon: "droplet" },
      { title: "Temperature Monitoring System", href: "/solutions/temperature-monitoring-system", description: "Cold-chain visibility for condition-sensitive operations.", icon: "thermometer" },
      { title: "Tire Pressure Monitoring System", href: "/solutions/tire-pressure-monitoring-system", description: "Safer operations through pressure alerts and maintenance awareness.", icon: "shield" },
      { title: "Water Management System", href: "/solutions/water-management-system", description: "Tank-level visibility and service accountability in the field.", icon: "route" },
    ],
    preview: {
      eyebrow: "Monitoring Solutions",
      title: "Connected monitoring for operational control",
      description: "Start with live thresholds, alerts, and reporting workflows that support high-visibility fleet operations.",
      href: "/solutions?group=monitoring",
      ctaLabel: "Explore monitoring solutions",
      imageSrc: "/Products/product1.png",
      imageAlt: "Monitoring solution preview",
      imageFit: "contain",
    },
  },
  {
    label: "Fleet Operations",
    links: [
      { title: "Field Force Management", href: "/solutions/field-force-management", description: "Live field visibility and mobile workforce coordination.", icon: "route" },
      { title: "School Bus Tracking", href: "/solutions/school-bus-tracking", description: "Safer route monitoring for student transport fleets.", icon: "bus" },
      { title: "Smart Waste Collection Tracking", href: "/solutions/smart-waste-collection-tracking", description: "Route-connected tracking and proof-of-service workflows.", icon: "scan" },
      { title: "Parts Tracking", href: "/solutions/parts-tracking", description: "Movement visibility for high-value mobile inventory.", icon: "factory" },
      { title: "Indoor Tracking", href: "/solutions/indoor-tracking", description: "Facility-level asset visibility and workflow control.", icon: "scan" },
    ],
    preview: {
      eyebrow: "Operational Workflows",
      title: "B2B solutions built around daily execution",
      description: "Choose the workflow first, then match the right hardware stack and deployment model behind it.",
      href: "/solutions?group=operations",
      ctaLabel: "Explore field operations",
      imageSrc: "/Products/logistics.png",
      imageAlt: "Fleet operations solution preview",
      imageFit: "cover",
    },
  },
  {
    label: "Advanced Mobility",
    links: [
      { title: "LoRaWAN Technology", href: "/solutions/lorawan-technology", description: "Low-power telemetry for distributed field visibility.", icon: "bolt" },
      { title: "Public Transport Business Solution", href: "/solutions/public-transport-business-solution", description: "Route performance and passenger safety oversight.", icon: "bus" },
      { title: "Electric Vehicle Management", href: "/solutions/electric-vehicle-management", description: "Connected oversight for EV route and service operations.", icon: "bolt" },
      { title: "Oil Tanker Monitoring Solutions", href: "/solutions/oil-tanker-monitoring-solutions", description: "High-control monitoring for regulated cargo movement.", icon: "shield" },
    ],
    preview: {
      eyebrow: "Advanced Mobility",
      title: "Specialized solutions for complex fleet environments",
      description: "Support public transport, electric fleets, remote telemetry, and sensitive cargo with a tailored solution mix.",
      href: "/solutions?group=video",
      ctaLabel: "Explore advanced mobility",
      imageSrc: "/Products/Hero-image.png",
      imageAlt: "Advanced mobility solution preview",
      imageFit: "cover",
    },
  },
];

export const industriesMenuLinks: NavigationLinkItem[] = [
  { title: "Transportation", href: "/industries/transportation" },
  { title: "Logistics", href: "/industries/logistics" },
  { title: "Construction", href: "/industries/construction" },
  { title: "Manufacturing", href: "/industries/manufacturing" },
  { title: "Farming", href: "/industries/farming" },
  { title: "Public Transport", href: "/industries/public-transport" },
];

export const companyMenuLinks: NavigationLinkItem[] = [
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Partners", href: "/partners" },
  { title: "Contact", href: "/contact" },
];

export const productsMenuFeaturedPanel = {
  label: "Hardware Stack",
  title: "Devices behind the deployment",
  description: "Review trackers, dashcams, sensors, and accessories used across Track Fleetio solution rollouts.",
  ctaLabel: "Browse Hardware",
  ctaHref: "/products",
  footerCtaLabel: "Talk to sales about hardware fit",
  footerCtaHref: "/contact",
} as const;

export const solutionsMenuFeaturedPanel = {
  label: "Solution Planning",
  title: "Connected fleet solutions",
  description:
    "Start with the operational workflow, then map the right tracking, video, and monitoring stack behind it.",
  ctaLabel: "Explore solutions",
  ctaHref: "/solutions",
  footerCtaLabel: "Request a consultation",
  footerCtaHref: "/contact",
} as const;

export const navigationUtilityLabels = {
  searchPlaceholder: "Search solutions, products, devices...",
  cart: "Cart",
  themeToggle: "Theme toggle",
  signIn: "Sign in",
  createAccount: "Create account",
  support: "Support",
} as const;
