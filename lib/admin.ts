import { footerLinkGroups } from "@/lib/content/footer";
import { homepageSectionRegistry } from "@/lib/content/homepage";
import { primaryNavigationItems } from "@/lib/content/navigation";

export type AdminIconKey =
  | "grid"
  | "chart"
  | "receipt"
  | "box"
  | "layers"
  | "archive"
  | "users"
  | "home"
  | "menu"
  | "columns"
  | "image"
  | "file-text"
  | "briefcase"
  | "settings"
  | "shield"
  | "bell"
  | "plug";

export type AdminNavItem = {
  key: string;
  label: string;
  href: string;
  icon: AdminIconKey;
};

export const adminNavSections: Array<{
  title: string;
  items: AdminNavItem[];
}> = [
  {
    title: "Main",
    items: [
      { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "grid" },
      { key: "reports", label: "Reports", href: "/admin/reports", icon: "chart" },
      { key: "orders", label: "Orders", href: "/admin/orders", icon: "receipt" },
      { key: "products", label: "Products", href: "/admin/products", icon: "box" },
      { key: "categories", label: "Categories", href: "/admin/categories", icon: "layers" },
      { key: "inventory", label: "Inventory", href: "/admin/inventory", icon: "archive" },
      { key: "customers", label: "Customers", href: "/admin/customers", icon: "users" },
    ],
  },
  {
    title: "Content",
    items: [
      { key: "content-homepage", label: "Homepage", href: "/admin/content/homepage", icon: "home" },
      { key: "content-navigation", label: "Navigation", href: "/admin/content/navigation", icon: "menu" },
      { key: "content-solutions", label: "Solutions", href: "/admin/content/solutions", icon: "file-text" },
      { key: "content-industries", label: "Industries", href: "/admin/content/industries", icon: "briefcase" },
      { key: "content-footer", label: "Footer", href: "/admin/content/footer", icon: "columns" },
      { key: "media", label: "Banners / Media", href: "/admin/media", icon: "image" },
    ],
  },
  {
    title: "System",
    items: [
      { key: "settings", label: "Site Settings", href: "/admin/settings", icon: "settings" },
      { key: "users", label: "Users / Roles", href: "/admin/users", icon: "shield" },
      { key: "notifications", label: "Notifications", href: "/admin/notifications", icon: "bell" },
      { key: "integrations", label: "Integrations", href: "/admin/integrations", icon: "plug" },
    ],
  },
];

export const adminPageInfo: Record<
  string,
  { title: string; section: string }
> = {
  "/admin/dashboard": { title: "Dashboard", section: "Main" },
  "/admin/reports": { title: "Reports", section: "Main" },
  "/admin/orders": { title: "Orders", section: "Main" },
  "/admin/products": { title: "Products", section: "Main" },
  "/admin/product-form": { title: "Add / Edit Product", section: "Main" },
  "/admin/categories": { title: "Categories", section: "Main" },
  "/admin/category-form": { title: "Add / Edit Category", section: "Main" },
  "/admin/inventory": { title: "Inventory", section: "Main" },
  "/admin/customers": { title: "Customers", section: "Main" },
  "/admin/content/homepage": { title: "Homepage Content", section: "Content" },
  "/admin/content/navigation": { title: "Navigation Content", section: "Content" },
  "/admin/content/solutions": { title: "Solutions Content", section: "Content" },
  "/admin/content/industries": { title: "Industries Content", section: "Content" },
  "/admin/content/footer": { title: "Footer Content", section: "Content" },
  "/admin/media": { title: "Banners / Media", section: "Content" },
  "/admin/settings": { title: "Site Settings", section: "System" },
  "/admin/users": { title: "Users / Roles", section: "System" },
  "/admin/notifications": { title: "Notifications", section: "System" },
  "/admin/integrations": { title: "Integrations", section: "System" },
};

export const adminMetrics = [
  { label: "Total Products", value: "42", meta: "12 active hardware SKUs in storefront" },
  { label: "Total Orders", value: "318", meta: "23 new orders this week" },
  { label: "Customers", value: "126", meta: "17 enterprise accounts onboarded" },
  { label: "Low Stock", value: "4", meta: "Fuel sensors and relays need replenishment" },
  { label: "Revenue", value: "$84.2K", meta: "Placeholder GMV for current period" },
  { label: "Content Tasks", value: "7", meta: "Homepage and footer updates pending review" },
] as const;

export const adminRecentActivity = [
  {
    title: "Homepage hero updated",
    description: "Content team staged new hardware headline and CTA copy.",
    time: "10 minutes ago",
  },
  {
    title: "Order #TF-2048 marked processing",
    description: "Warehouse team confirmed allocation for 4G GPS Tracker batch.",
    time: "42 minutes ago",
  },
  {
    title: "Fuel Sensor inventory threshold triggered",
    description: "Stock level fell below configured operational minimum.",
    time: "1 hour ago",
  },
  {
    title: "Footer support links revised",
    description: "Support and deployment content group moved into review state.",
    time: "Today",
  },
] as const;

export const adminProducts = [
  {
    name: "4G GPS Tracker",
    sku: "TF-4G-110",
    category: "Tracking Devices",
    stock: 186,
    price: "$189",
    status: "Live",
    image: "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
  },
  {
    name: "AI Dashcam",
    sku: "TF-CAM-220",
    category: "Video Telematics",
    stock: 48,
    price: "$329",
    status: "Live",
    image: "/Products/DR03.png",
  },
  {
    name: "Battery Asset Tracker",
    sku: "TF-AST-310",
    category: "Asset Tracking",
    stock: 22,
    price: "$149",
    status: "Review",
    image: "/Products/Compact black electronic device close-up.png",
  },
  {
    name: "Fuel Sensor",
    sku: "TF-SEN-410",
    category: "Sensors",
    stock: 12,
    price: "$79",
    status: "Low",
    image: "/Products/Compact black electronic device close-up.png",
  },
] as const;

export const adminOrders = [
  {
    id: "#TF-2048",
    customer: "BlueLine Logistics",
    date: "Mar 26, 2026",
    total: "$2,460",
    payment: "Paid",
    fulfillment: "Processing",
  },
  {
    id: "#TF-2047",
    customer: "Northgate Transport",
    date: "Mar 26, 2026",
    total: "$1,280",
    payment: "Pending",
    fulfillment: "Queued",
  },
  {
    id: "#TF-2046",
    customer: "FleetCore Systems",
    date: "Mar 25, 2026",
    total: "$4,920",
    payment: "Paid",
    fulfillment: "Shipped",
  },
  {
    id: "#TF-2045",
    customer: "Atlas Construction",
    date: "Mar 24, 2026",
    total: "$940",
    payment: "Paid",
    fulfillment: "Delivered",
  },
] as const;

export const adminReports = [
  {
    label: "Conversion Rate",
    value: "3.8%",
    meta: "Quote requests to completed demo checkouts",
  },
  {
    label: "Top Category",
    value: "Tracking Devices",
    meta: "Highest product engagement this month",
  },
  {
    label: "AOV",
    value: "$264",
    meta: "Average mock order value across recent orders",
  },
] as const;

export const adminTrafficSources = [
  { source: "Organic Search", visits: "12.4K", conversion: "4.2%", trend: "Up" },
  { source: "Direct", visits: "8.1K", conversion: "3.7%", trend: "Up" },
  { source: "Partner Referrals", visits: "2.8K", conversion: "5.1%", trend: "Review" },
  { source: "Paid Campaigns", visits: "6.2K", conversion: "2.4%", trend: "Down" },
] as const;

export const adminCustomers = [
  {
    name: "BlueLine Logistics",
    email: "procurement@blueline.co",
    company: "BlueLine Logistics",
    orders: 12,
    status: "Active",
  },
  {
    name: "Northgate Transport",
    email: "ops@northgatefleet.com",
    company: "Northgate Transport",
    orders: 5,
    status: "Active",
  },
  {
    name: "Atlas Construction",
    email: "fleet@atlasbuild.com",
    company: "Atlas Construction",
    orders: 3,
    status: "Review",
  },
  {
    name: "Metro Transit Ops",
    email: "admin@metrotransit.io",
    company: "Metro Transit Ops",
    orders: 9,
    status: "Active",
  },
] as const;

export const adminInventory = [
  { product: "4G GPS Tracker", sku: "TF-4G-110", qty: 186, threshold: 40, status: "In stock" },
  { product: "AI Dashcam", sku: "TF-CAM-220", qty: 48, threshold: 25, status: "In stock" },
  { product: "Fuel Sensor", sku: "TF-SEN-410", qty: 12, threshold: 20, status: "Low" },
  { product: "Harness & Relays", sku: "TF-ACC-515", qty: 0, threshold: 12, status: "Out" },
] as const;

export const adminCategories = [
  { name: "Tracking Devices", slug: "tracking-devices", featured: "Yes", order: 1, status: "Live" },
  { name: "Video Telematics", slug: "video-telematics", featured: "Yes", order: 2, status: "Live" },
  { name: "Sensors", slug: "sensors", featured: "Yes", order: 3, status: "Live" },
  { name: "Accessories", slug: "accessories", featured: "No", order: 4, status: "Draft" },
] as const;

export const adminUsers = [
  { name: "Admin Operator", email: "admin@trackfleetio.com", role: "Super Admin", status: "Active" },
  { name: "Majeed Abro", email: "majeed@trackfleetio.com", role: "Content Manager", status: "Active" },
  { name: "Areeb Khan", email: "areeb@trackfleetio.com", role: "Store Ops", status: "Active" },
  { name: "Support Desk", email: "support@trackfleetio.com", role: "Support", status: "Inactive" },
] as const;

export const adminMedia = [
  {
    name: "hero-4g-tracker.png",
    meta: "Hero / Homepage",
    image: "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
  },
  { name: "ai-dashcam.png", meta: "Product / Video", image: "/Products/DR03.png" },
  { name: "asset-tracker.png", meta: "Product / Asset", image: "/Products/Compact black electronic device close-up.png" },
  { name: "sensor-device.png", meta: "Product / Sensor", image: "/Products/Compact black electronic device close-up.png" },
] as const;

export const adminHomepageSections = homepageSectionRegistry;

export const adminNavigationItems = primaryNavigationItems;

export const adminFooterGroups = footerLinkGroups.map((group) => ({
  title: group.title,
  links: group.links.map((link) => link.label).join(", "),
})) as ReadonlyArray<{ title: string; links: string }>;

export const adminNotificationItems = [
  { title: "Low stock alerts", description: "Notify ops when inventory falls below thresholds.", enabled: true },
  { title: "Order processing alerts", description: "Send fulfilment updates for queued and processing orders.", enabled: true },
  { title: "Content review reminders", description: "Flag homepage or footer edits awaiting approval.", enabled: false },
] as const;

export const adminIntegrationItems = [
  { title: "Warehouse API", description: "Sync stock and shipment state with fulfillment systems.", status: "Connected" },
  { title: "CRM Export", description: "Push enterprise leads and orders into the sales workspace.", status: "Queued" },
  { title: "Analytics Webhook", description: "Deliver purchase and engagement events to reporting tools.", status: "Review" },
] as const;
