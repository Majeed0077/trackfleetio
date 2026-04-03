export type NavigationLinkItem = {
  title: string;
  href: string;
};

export type NavigationColumn = {
  label: string;
  links: NavigationLinkItem[];
};

const getProductsSearchHref = (query: string) => `/products?q=${encodeURIComponent(query)}`;

export const primaryNavigationItems = [
  { label: "Home", link: "/", order: 1, visibility: "Visible" },
  { label: "Products", link: "/products", order: 2, visibility: "Visible" },
  { label: "Solutions", link: "/solutions", order: 3, visibility: "Visible" },
  { label: "Industries", link: "/industries", order: 4, visibility: "Visible" },
  { label: "Company", link: "/about", order: 5, visibility: "Visible" },
] as const;

export const productMenuColumns: NavigationColumn[] = [
  {
    label: "Tracking Devices",
    links: [
      { title: "2G GPS Devices", href: getProductsSearchHref("2G GPS Device") },
      { title: "4G GPS Devices", href: getProductsSearchHref("4G GPS Device") },
      { title: "GPS Tracker", href: getProductsSearchHref("GPS Tracker") },
      { title: "Asset Trackers", href: getProductsSearchHref("Asset") },
      { title: "PET Tracker", href: getProductsSearchHref("PET") },
      { title: "Smart Watch", href: getProductsSearchHref("Watch") },
    ],
  },
  {
    label: "Video Telematics",
    links: [
      { title: "AI Dashcams", href: getProductsSearchHref("Dashcam") },
      { title: "AI MDVR", href: getProductsSearchHref("MDVR") },
      { title: "DVR Systems", href: getProductsSearchHref("DVR") },
      { title: "Camera Systems", href: getProductsSearchHref("Camera") },
    ],
  },
  {
    label: "Sensors & Accessories",
    links: [
      { title: "Fuel Sensors", href: getProductsSearchHref("Fuel Sensors") },
      { title: "Temperature Sensors", href: getProductsSearchHref("Temperature Sensors") },
      { title: "TPMS", href: getProductsSearchHref("TPMS") },
      { title: "Load Sensors", href: getProductsSearchHref("Axle Load Sensor") },
      { title: "Harness", href: getProductsSearchHref("Harness") },
      { title: "Relays", href: getProductsSearchHref("Relays") },
    ],
  },
];

export const solutionsMenuColumns: NavigationColumn[] = [
  {
    label: "Monitoring Systems",
    links: [
      { title: "Fuel Monitoring System", href: "/solutions/fuel-monitoring-system" },
      { title: "Temperature Monitoring System", href: "/solutions/temperature-monitoring-system" },
      { title: "Tire Pressure Monitoring System", href: "/solutions/tire-pressure-monitoring-system" },
      { title: "Water Management System", href: "/solutions/water-management-system" },
    ],
  },
  {
    label: "Fleet Operations",
    links: [
      { title: "Field Force Management", href: "/solutions/field-force-management" },
      { title: "School Bus Tracking", href: "/solutions/school-bus-tracking" },
      { title: "Smart Waste Collection Tracking", href: "/solutions/smart-waste-collection-tracking" },
      { title: "Parts Tracking", href: "/solutions/parts-tracking" },
      { title: "Indoor Tracking", href: "/solutions/indoor-tracking" },
    ],
  },
  {
    label: "Advanced Mobility",
    links: [
      { title: "LoRaWAN Technology", href: "/solutions/lorawan-technology" },
      { title: "Public Transport Business Solution", href: "/solutions/public-transport-business-solution" },
      { title: "Electric Vehicle Management", href: "/solutions/electric-vehicle-management" },
      { title: "Oil Tanker Monitoring Solutions", href: "/solutions/oil-tanker-monitoring-solutions" },
    ],
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
  label: "Featured Hardware",
  title: "4G GPS Tracker",
  description: "Reliable live fleet tracking hardware for modern telematics visibility.",
  ctaLabel: "Explore Hardware",
  ctaHref: "/products",
  footerCtaLabel: "Explore Hardware",
  footerCtaHref: "/products",
} as const;

export const solutionsMenuFeaturedPanel = {
  label: "Operational Visibility",
  title: "Connected Fleet Control",
  description:
    "Connected monitoring and intelligent tracking solutions for high-control fleet operations.",
  ctaLabel: "Explore Solutions",
  ctaHref: "/solutions",
  footerCtaLabel: "View all solutions",
  footerCtaHref: "/solutions",
} as const;

export const navigationUtilityLabels = {
  searchPlaceholder: "Search products, devices...",
  cart: "Cart",
  themeToggle: "Theme toggle",
  signIn: "Sign in",
  createAccount: "Create account",
  support: "Support",
} as const;
