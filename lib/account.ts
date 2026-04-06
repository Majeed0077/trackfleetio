export const accountSummary = {
  activeOrders: 3,
  savedAddresses: 2,
  notificationChannels: 3,
  securityStatus: "Verified email and recent session activity recorded.",
};

export const accountOrders = [
  {
    id: "TF-2048",
    date: "April 4, 2026",
    total: "$2,460",
    payment: "Paid",
    fulfillment: "Processing",
    items: 4,
  },
  {
    id: "TF-2046",
    date: "April 1, 2026",
    total: "$4,920",
    payment: "Paid",
    fulfillment: "Shipped",
    items: 8,
  },
  {
    id: "TF-2039",
    date: "March 22, 2026",
    total: "$940",
    payment: "Paid",
    fulfillment: "Delivered",
    items: 2,
  },
] as const;

export const accountAddresses = [
  {
    label: "Primary billing",
    company: "BlueLine Logistics",
    line1: "Suite 8, Shahrah-e-Faisal",
    city: "Karachi",
    country: "Pakistan",
  },
  {
    label: "Warehouse delivery",
    company: "BlueLine Logistics",
    line1: "Plot 14, Logistics Park",
    city: "Lahore",
    country: "Pakistan",
  },
] as const;

export const accountNotificationPreferences = [
  { title: "Order created", channel: "Email", enabled: true },
  { title: "Payment success", channel: "Email", enabled: true },
  { title: "Shipment updates", channel: "WhatsApp", enabled: true },
  { title: "Low stock procurement alerts", channel: "Email", enabled: false },
] as const;

export const accountOrderTimeline = [
  {
    id: "TF-2048",
    entries: [
      "Order created from web checkout.",
      "Payment marked paid by gateway callback.",
      "Ops team assigned order for allocation.",
      "Shipment packing pending.",
    ],
  },
  {
    id: "TF-2046",
    entries: [
      "Order created from enterprise bulk request.",
      "Payment confirmed and invoice generated.",
      "Warehouse packed the dashcam and sensor batch.",
      "Tracking number shared with customer.",
    ],
  },
  {
    id: "TF-2039",
    entries: [
      "Order created and reviewed by admin.",
      "Payment received.",
      "Order delivered to customer warehouse.",
      "Customer accepted deployment batch.",
    ],
  },
] as const;
