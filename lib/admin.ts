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
  superAdminOnly?: boolean;
};

export const adminNavSections: Array<{
  title: string;
  items: AdminNavItem[];
}> = [
  {
    title: "Commerce",
    items: [
      { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "grid" },
      { key: "reports", label: "Reports", href: "/admin/reports", icon: "chart" },
      { key: "orders", label: "Orders", href: "/admin/orders", icon: "receipt" },
      { key: "payments", label: "Payments", href: "/admin/payments", icon: "receipt" },
      { key: "discounts", label: "Discounts", href: "/admin/discounts", icon: "briefcase" },
      { key: "products", label: "Products", href: "/admin/products", icon: "box" },
      { key: "categories", label: "Categories", href: "/admin/categories", icon: "layers" },
      { key: "inventory", label: "Inventory", href: "/admin/inventory", icon: "archive" },
      { key: "shipping", label: "Shipping", href: "/admin/shipping", icon: "briefcase" },
      { key: "taxes", label: "Tax Rules", href: "/admin/taxes", icon: "settings" },
      { key: "returns", label: "Returns", href: "/admin/returns", icon: "archive" },
      { key: "customers", label: "Customers", href: "/admin/customers", icon: "users" },
      { key: "support", label: "Support", href: "/admin/support", icon: "users" },
    ],
  },
  {
    title: "Growth",
    items: [
      { key: "leads", label: "Leads", href: "/admin/leads", icon: "users" },
      { key: "newsletter", label: "Newsletter", href: "/admin/newsletter", icon: "bell" },
      { key: "reviews", label: "Reviews", href: "/admin/reviews", icon: "file-text" },
      { key: "seo", label: "SEO / Redirects", href: "/admin/seo", icon: "menu" },
    ],
  },
  {
    title: "System",
    items: [
      { key: "settings", label: "Site Settings", href: "/admin/settings", icon: "settings" },
      { key: "users", label: "Users", href: "/admin/users", icon: "users", superAdminOnly: true },
      { key: "roles", label: "Roles", href: "/admin/roles", icon: "shield", superAdminOnly: true },
      { key: "notifications", label: "Notifications", href: "/admin/notifications", icon: "bell" },
      { key: "integrations", label: "Integrations", href: "/admin/integrations", icon: "plug" },
      { key: "audit", label: "Audit Logs", href: "/admin/audit-logs", icon: "file-text" },
      { key: "system-health", label: "System Health", href: "/admin/system-health", icon: "chart" },
    ],
  },
];

export const adminPageInfo: Record<
  string,
  { title: string; section: string }
> = {
  "/admin/dashboard": { title: "Dashboard", section: "Commerce" },
  "/admin/reports": { title: "Reports", section: "Commerce" },
  "/admin/orders": { title: "Orders", section: "Commerce" },
  "/admin/payments": { title: "Payments", section: "Commerce" },
  "/admin/discounts": { title: "Discounts", section: "Commerce" },
  "/admin/products": { title: "Products", section: "Commerce" },
  "/admin/product-form": { title: "Add / Edit Product", section: "Commerce" },
  "/admin/categories": { title: "Categories", section: "Commerce" },
  "/admin/category-form": { title: "Add / Edit Category", section: "Commerce" },
  "/admin/inventory": { title: "Inventory", section: "Commerce" },
  "/admin/shipping": { title: "Shipping", section: "Commerce" },
  "/admin/taxes": { title: "Tax Rules", section: "Commerce" },
  "/admin/returns": { title: "Returns", section: "Commerce" },
  "/admin/customers": { title: "Customers", section: "Commerce" },
  "/admin/support": { title: "Support", section: "Commerce" },
  "/admin/leads": { title: "Leads", section: "Growth" },
  "/admin/newsletter": { title: "Newsletter", section: "Growth" },
  "/admin/reviews": { title: "Reviews", section: "Growth" },
  "/admin/seo": { title: "SEO / Redirects", section: "Growth" },
  "/admin/content/homepage": { title: "Homepage Content", section: "Content" },
  "/admin/content/navigation": { title: "Navigation Content", section: "Content" },
  "/admin/content/solutions": { title: "Solutions Content", section: "Content" },
  "/admin/content/industries": { title: "Industries Content", section: "Content" },
  "/admin/content/footer": { title: "Footer Content", section: "Content" },
  "/admin/media": { title: "Banners / Media", section: "Content" },
  "/admin/settings": { title: "Site Settings", section: "System" },
  "/admin/users": { title: "Users", section: "System" },
  "/admin/notifications": { title: "Notifications", section: "System" },
  "/admin/notifications/logs": { title: "Notification Logs", section: "System" },
  "/admin/notifications/templates": { title: "Notification Templates", section: "System" },
  "/admin/integrations": { title: "Integrations", section: "System" },
  "/admin/integrations/status": { title: "Integration Status", section: "System" },
  "/admin/roles": { title: "Roles", section: "System" },
  "/admin/roles/new": { title: "Create Role", section: "System" },
  "/admin/roles/edit": { title: "Edit Role", section: "System" },
  "/admin/users/new": { title: "Invite User", section: "System" },
  "/admin/users/manage": { title: "Manage User", section: "System" },
  "/admin/audit-logs": { title: "Audit Logs", section: "System" },
  "/admin/system-health": { title: "System Health", section: "System" },
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
    productId: "4g-gps-device",
    name: "4G GPS Tracker",
    sku: "TF-4G-110",
    category: "Tracking Devices",
    stock: 186,
    price: "$189",
    status: "Live",
    image: "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
  },
  {
    productId: "ai-dashcam",
    name: "AI Dashcam",
    sku: "TF-CAM-220",
    category: "Video Telematics",
    stock: 48,
    price: "$329",
    status: "Live",
    image: "/Products/DR03.png",
  },
  {
    productId: "asset-tracking-device",
    name: "Battery Asset Tracker",
    sku: "TF-AST-310",
    category: "Asset Tracking",
    stock: 22,
    price: "$149",
    status: "Review",
    image: "/Products/Compact black electronic device.png",
  },
  {
    productId: "fuel-sensors",
    name: "Fuel Sensor",
    sku: "TF-SEN-410",
    category: "Sensors",
    stock: 12,
    price: "$79",
    status: "Low",
    image: "/Products/Compact black electronic device.png",
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

export const adminRoleItems = [
  {
    name: "Super Admin",
    members: 1,
    description: "Full access across users, content, commerce, inventory, and settings.",
    permissions: ["users.manage", "orders.write", "content.publish", "notifications.manage"],
  },
  {
    name: "Content Manager",
    members: 1,
    description: "Manages homepage, footer, industries, and solution content.",
    permissions: ["content.read", "content.write", "content.publish", "media.read"],
  },
  {
    name: "Store Ops",
    members: 1,
    description: "Handles products, stock adjustments, order processing, and fulfillment.",
    permissions: ["products.write", "inventory.write", "orders.write", "customers.read"],
  },
  {
    name: "Support",
    members: 1,
    description: "Views customer accounts, notes, and operational notification history.",
    permissions: ["customers.read", "orders.read", "notifications.read"],
  },
] as const;

export const adminPermissionGroups = [
  {
    title: "Commerce",
    permissions: ["products.read", "products.write", "orders.read", "orders.write", "payments.read"],
  },
  {
    title: "Operations",
    permissions: ["inventory.read", "inventory.write", "customers.read", "customers.write"],
  },
  {
    title: "Content & Media",
    permissions: ["content.read", "content.write", "content.publish", "media.read", "media.write"],
  },
  {
    title: "System",
    permissions: ["users.manage", "roles.manage", "notifications.manage", "integrations.read"],
  },
] as const;

export const adminMedia = [
  {
    name: "hero-4g-tracker.png",
    meta: "Hero / Homepage",
    image: "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
  },
  { name: "ai-dashcam.png", meta: "Product / Video", image: "/Products/DR03.png" },
  { name: "asset-tracker.png", meta: "Product / Asset", image: "/Products/Compact black electronic device.png" },
  { name: "sensor-device.png", meta: "Product / Sensor", image: "/Products/Compact black electronic device.png" },
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

export const adminNotificationLogs = [
  {
    type: "Order created",
    recipient: "ops@trackfleetio.com",
    channel: "Email",
    status: "Sent",
    time: "5 minutes ago",
  },
  {
    type: "Payment success",
    recipient: "procurement@blueline.co",
    channel: "Email",
    status: "Sent",
    time: "11 minutes ago",
  },
  {
    type: "Order canceled",
    recipient: "support@trackfleetio.com",
    channel: "Internal",
    status: "Queued",
    time: "29 minutes ago",
  },
  {
    type: "Password reset",
    recipient: "majeed@trackfleetio.com",
    channel: "Email",
    status: "Failed",
    time: "1 hour ago",
  },
] as const;

export const adminOrderDetails = [
  {
    id: "TF-2048",
    customer: "BlueLine Logistics",
    company: "BlueLine Logistics",
    email: "procurement@blueline.co",
    phone: "+92 300 7788990",
    payment: "Paid",
    fulfillment: "Processing",
    assignedTo: "Areeb Khan",
    billing: "Suite 8, Shahrah-e-Faisal, Karachi",
    shipping: "Plot 14, Logistics Park, Lahore",
    notes: "Priority deployment for 4G trackers and two AI dashcams.",
    timeline: [
      { title: "Order created", detail: "Checkout submitted from public storefront.", time: "Apr 4, 2026 11:32 AM" },
      { title: "Payment captured", detail: "Gateway callback marked payment successful.", time: "Apr 4, 2026 11:34 AM" },
      { title: "Assigned to ops", detail: "Store Ops picked the order for allocation.", time: "Apr 4, 2026 12:10 PM" },
      { title: "Processing", detail: "Warehouse preparing package and labels.", time: "Apr 4, 2026 1:20 PM" },
    ],
  },
  {
    id: "TF-2047",
    customer: "Northgate Transport",
    company: "Northgate Transport",
    email: "ops@northgatefleet.com",
    phone: "+92 321 4455667",
    payment: "Pending",
    fulfillment: "Queued",
    assignedTo: "Support Desk",
    billing: "Northgate Transit Hub, Islamabad",
    shipping: "Northgate Transit Hub, Islamabad",
    notes: "Waiting on payment confirmation before stock reservation.",
    timeline: [
      { title: "Order created", detail: "Bulk sensor request submitted.", time: "Apr 3, 2026 10:02 AM" },
      { title: "Payment pending", detail: "Awaiting bank confirmation.", time: "Apr 3, 2026 10:05 AM" },
      { title: "Queued", detail: "Order visible to ops but not released to warehouse.", time: "Apr 3, 2026 10:12 AM" },
    ],
  },
] as const;

export const adminIntegrationItems = [
  { title: "Warehouse API", description: "Sync stock and shipment state with fulfillment systems.", status: "Connected" },
  { title: "CRM Export", description: "Push enterprise leads and orders into the sales workspace.", status: "Queued" },
  { title: "Analytics Webhook", description: "Deliver purchase and engagement events to reporting tools.", status: "Review" },
] as const;

export const adminNotificationTemplates = [
  {
    key: "order_created",
    subject: "Your Track Fleetio order has been received",
    channel: "Email",
    status: "Live",
  },
  {
    key: "payment_success",
    subject: "Payment confirmed for your hardware order",
    channel: "Email",
    status: "Live",
  },
  {
    key: "order_canceled",
    subject: "Your order has been canceled",
    channel: "Email",
    status: "Draft",
  },
  {
    key: "password_reset",
    subject: "Reset your Track Fleetio password",
    channel: "Email",
    status: "Live",
  },
] as const;

export const adminInventoryMovements = [
  {
    product: "4G GPS Tracker",
    type: "Reserve",
    quantity: 12,
    reference: "Order TF-2048",
    time: "Apr 4, 2026 12:14 PM",
  },
  {
    product: "Fuel Sensor",
    type: "Adjust",
    quantity: -4,
    reference: "Cycle count correction",
    time: "Apr 4, 2026 9:30 AM",
  },
  {
    product: "AI Dashcam",
    type: "Restock",
    quantity: 20,
    reference: "PO 3118",
    time: "Apr 3, 2026 4:10 PM",
  },
] as const;

export const adminCmsRevisions = [
  {
    area: "Homepage hero",
    status: "Review",
    author: "Majeed Abro",
    time: "25 minutes ago",
    note: "Updated heading and metrics strip.",
  },
  {
    area: "Footer links",
    status: "Draft",
    author: "Support Desk",
    time: "1 hour ago",
    note: "Added deployment support link group.",
  },
  {
    area: "Solutions directory",
    status: "Live",
    author: "Admin Operator",
    time: "Today",
    note: "Published revised CTA copy.",
  },
] as const;

export const adminAuditLogs = [
  {
    actor: "Admin Operator",
    action: "Updated order status to Processing",
    entity: "Order TF-2048",
    time: "Apr 4, 2026 1:20 PM",
  },
  {
    actor: "Majeed Abro",
    action: "Staged homepage hero revision",
    entity: "CMS Homepage",
    time: "Apr 4, 2026 12:50 PM",
  },
  {
    actor: "Areeb Khan",
    action: "Adjusted stock threshold",
    entity: "Fuel Sensor inventory",
    time: "Apr 4, 2026 10:08 AM",
  },
] as const;

export const adminSystemHealth = [
  {
    service: "Storefront API",
    status: "Healthy",
    detail: "Auth, contact, and checkout routes responding normally.",
  },
  {
    service: "Notification worker",
    status: "Review",
    detail: "One failed password reset email pending retry.",
  },
  {
    service: "Payment webhooks",
    status: "Draft",
    detail: "Webhook receiver UI prepared but gateway not connected yet.",
  },
] as const;

export const adminPayments = [
  {
    orderId: "#TF-2048",
    gateway: "Stripe",
    amount: "$2,460",
    method: "Card",
    status: "Paid",
    reference: "pi_2048_trackfleetio",
  },
  {
    orderId: "#TF-2047",
    gateway: "Bank Transfer",
    amount: "$1,280",
    method: "Transfer",
    status: "Pending",
    reference: "bank_ref_99814",
  },
  {
    orderId: "#TF-2046",
    gateway: "Stripe",
    amount: "$4,920",
    method: "Card",
    status: "Paid",
    reference: "pi_2046_trackfleetio",
  },
] as const;

export const adminDiscounts = [
  {
    code: "FLEET10",
    type: "Percentage",
    value: "10%",
    usage: "34 / 100",
    status: "Live",
  },
  {
    code: "OPS500",
    type: "Fixed",
    value: "$500",
    usage: "7 / 20",
    status: "Draft",
  },
  {
    code: "APRILB2B",
    type: "Percentage",
    value: "15%",
    usage: "12 / 50",
    status: "Live",
  },
] as const;

export const adminShippingZones = [
  {
    zone: "Karachi",
    method: "Same day dispatch",
    rate: "$18",
    eta: "0-1 day",
    status: "Live",
  },
  {
    zone: "Punjab Metro",
    method: "Priority courier",
    rate: "$24",
    eta: "1-2 days",
    status: "Live",
  },
  {
    zone: "Remote regions",
    method: "Freight partner",
    rate: "$42",
    eta: "3-5 days",
    status: "Review",
  },
] as const;

export const adminReturns = [
  {
    requestId: "RT-118",
    customer: "Northgate Transport",
    orderId: "#TF-2031",
    reason: "Damaged unit on delivery",
    status: "Pending",
  },
  {
    requestId: "RT-117",
    customer: "Metro Transit Ops",
    orderId: "#TF-2028",
    reason: "Wrong model supplied",
    status: "Review",
  },
  {
    requestId: "RT-116",
    customer: "BlueLine Logistics",
    orderId: "#TF-2014",
    reason: "Approved replacement",
    status: "Delivered",
  },
] as const;

export const adminLeads = [
  {
    company: "Falcon Haulage",
    contact: "Imran Raza",
    channel: "Quote request",
    interest: "4G GPS + fuel sensors",
    status: "New",
  },
  {
    company: "Rapid Fleet",
    contact: "Sana Yousaf",
    channel: "Contact form",
    interest: "AI dashcam rollout",
    status: "Review",
  },
  {
    company: "Desert Movers",
    contact: "Ali Jafri",
    channel: "WhatsApp referral",
    interest: "Cold chain monitoring",
    status: "Active",
  },
] as const;

export const adminNewsletterSubscribers = [
  {
    email: "ops@northgatefleet.com",
    segment: "Customers",
    source: "Footer signup",
    status: "Active",
  },
  {
    email: "fleet@atlasbuild.com",
    segment: "Leads",
    source: "Contact page",
    status: "Active",
  },
  {
    email: "support@metrotransit.io",
    segment: "Partners",
    source: "Manual import",
    status: "Review",
  },
] as const;

export const adminReviews = [
  {
    name: "BlueLine Logistics",
    product: "4G GPS Tracker",
    rating: "5/5",
    status: "Live",
    summary: "Clean install and dependable route visibility.",
  },
  {
    name: "Northgate Transport",
    product: "AI Dashcam",
    rating: "4/5",
    status: "Review",
    summary: "Strong camera clarity with useful safety playback.",
  },
  {
    name: "Atlas Construction",
    product: "Fuel Sensor",
    rating: "5/5",
    status: "Draft",
    summary: "Helpful monitoring for usage and refill behaviour.",
  },
] as const;

export const adminSupportTickets = [
  {
    ticketId: "SUP-401",
    customer: "BlueLine Logistics",
    topic: "Installation support",
    priority: "Active",
    status: "Processing",
  },
  {
    ticketId: "SUP-398",
    customer: "Atlas Construction",
    topic: "Warranty clarification",
    priority: "Review",
    status: "Pending",
  },
  {
    ticketId: "SUP-392",
    customer: "Metro Transit Ops",
    topic: "Dashcam playback issue",
    priority: "Active",
    status: "Connected",
  },
] as const;

export const adminTaxRules = [
  {
    region: "Pakistan",
    type: "Standard sales tax",
    rate: "18%",
    scope: "All hardware",
    status: "Live",
  },
  {
    region: "Export orders",
    type: "Zero-rated",
    rate: "0%",
    scope: "Verified export invoices",
    status: "Live",
  },
  {
    region: "Special projects",
    type: "Manual override",
    rate: "Custom",
    scope: "Enterprise contracts",
    status: "Review",
  },
] as const;

export const adminSeoRedirects = [
  {
    source: "/fleet-trackers",
    destination: "/products",
    type: "301",
    status: "Live",
  },
  {
    source: "/old-dashcam-range",
    destination: "/products/ai-dashcam",
    type: "301",
    status: "Live",
  },
  {
    source: "/gps-monitoring-demo",
    destination: "/solutions/monitoring-systems",
    type: "302",
    status: "Draft",
  },
] as const;
