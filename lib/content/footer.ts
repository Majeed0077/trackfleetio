export type FooterLinkGroup = {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export const footerEditorialContent = {
  eyebrow: "Track Fleetio",
  headingLines: [
    "Fleet hardware for teams that need",
    "visibility without compromise.",
  ],
  description:
    "Tracking devices, video telematics, and sensors designed for rollout, day-to-day control, and support after deployment.",
  contactEmail: "hello@trackfleetio.com",
  primaryCta: {
    label: "Request Demo",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explore Hardware",
    href: "/products",
  },
} as const;

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Products",
    links: [
      { label: "GPS Trackers", href: "/products" },
      { label: "AI Dashcams", href: "/products" },
      { label: "Sensors", href: "/products" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Fleet Management", href: "/solutions" },
      { label: "Safety & Compliance", href: "/solutions" },
      { label: "Asset Tracking", href: "/solutions" },
      { label: "Operations Intelligence", href: "/solutions" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Transportation", href: "/industries/transportation" },
      { label: "Construction", href: "/industries/construction" },
      { label: "Logistics", href: "/industries/logistics" },
      { label: "Public Transport", href: "/industries/public-transport" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const footerSocialLinks = [
  { label: "Twitter", href: "https://x.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
] as const;

export const footerLegalLinks = ["Privacy", "Terms", "Security"] as const;

export const footerBranding = {
  brandLabel: "Track Fleetio",
  copyrightLabel: "Track Fleetio",
} as const;
