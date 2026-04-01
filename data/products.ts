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

type ProductSeed = Omit<Product, "gallery">;

const buildProductMap = (items: ProductSeed[]) =>
  Object.fromEntries(items.map((item) => [item.id, item])) as Record<string, ProductSeed>;

const createVideoProduct = ({
  id,
  title,
  shortDescription,
  specs,
  features,
  useCases,
  related = ["ai-dashcam", "ai-mdvr", "dvr-system"],
}: {
  id: string;
  title: string;
  shortDescription: string;
  specs: string[];
  features: string[];
  useCases: string[];
  related?: string[];
}): ProductSeed => ({
  id,
  category: "video",
  categoryLabel: "Video Telematics",
  title,
  shortDescription,
  specs,
  features,
  useCases,
  related,
  imageSrc: "/Products/dashcam.png",
  imageAlt: title,
  imageClass: "catalog-card-image-dashcam",
});

const createTrackingProduct = ({
  id,
  title,
  shortDescription,
  specs,
  features,
  useCases,
  related = ["gps-tracker", "4g-gps-device", "asset-tracking-device"],
  imageSrc = "/Products/product3.png",
  imageClass = "catalog-card-image-gps",
}: {
  id: string;
  title: string;
  shortDescription: string;
  specs: string[];
  features: string[];
  useCases: string[];
  related?: string[];
  imageSrc?: string;
  imageClass?: string;
}): ProductSeed => ({
  id,
  category: "tracking",
  categoryLabel: "Tracking Devices",
  title,
  shortDescription,
  specs,
  features,
  useCases,
  related,
  imageSrc,
  imageAlt: title,
  imageClass,
});

const aiDashcamModelProducts = buildProductMap([
  createVideoProduct({
    id: "mr012-ch-dashcam-for-motorcycle",
    title: "MR012-CH Dashcam for Motorcycle",
    shortDescription:
      "Motorcycle-ready AI dashcam hardware for road event capture, rider visibility, and two-wheel fleet safety review.",
    specs: ["1-CH", "Motorcycle", "AI Dashcam"],
    features: ["Road event capture", "Compact vehicle install", "Driver safety review", "Connected dashcam workflow"],
    useCases: ["Motorcycle fleet monitoring", "Incident review", "Rider safety programs", "Route evidence capture"],
  }),
  createVideoProduct({
    id: "dr033-channel-ai-dashcam",
    title: "DR033-Channel AI Dashcam",
    shortDescription:
      "AI dashcam hardware built for fleet driving event detection, road visibility, and operational video review.",
    specs: ["AI Dashcam", "Fleet Video", "Driver Review"],
    features: ["AI-assisted event capture", "Fleet video visibility", "Driver coaching support", "Road-facing evidence workflow"],
    useCases: ["Driver monitoring", "Safety event capture", "Incident evidence", "Operational review"],
  }),
  createVideoProduct({
    id: "eh80-1-ch-aov-dash-camera",
    title: "EH80 1-CH AOV Dash Camera",
    shortDescription:
      "Single-channel fleet dash camera for always-on road visibility and dependable incident footage retention.",
    specs: ["1-CH", "AOV", "Dash Camera"],
    features: ["Always-on video support", "Road-facing monitoring", "Fleet evidence retention", "Simple single-channel deployment"],
    useCases: ["Basic vehicle monitoring", "Incident footage capture", "Driver route review", "Entry fleet video rollout"],
  }),
  createVideoProduct({
    id: "eh21-1-ch-4g-dashcam",
    title: "EH21 1-CH 4G Dashcam",
    shortDescription:
      "4G-connected single-channel dashcam for live fleet visibility, route evidence, and remote review workflows.",
    specs: ["1-CH", "4G", "Dashcam"],
    features: ["4G video connectivity", "Remote review support", "Road-facing visibility", "Fleet deployment ready"],
    useCases: ["Live road monitoring", "Remote fleet review", "Driver accountability", "Incident response support"],
  }),
  createVideoProduct({
    id: "dr02-3-ch-4g-ai-dashcam",
    title: "DR02 3-CH 4G AI Dashcam",
    shortDescription:
      "Three-channel 4G AI dashcam for broader cabin and road coverage with connected fleet video intelligence.",
    specs: ["3-CH", "4G", "AI Dashcam"],
    features: ["Multi-angle fleet coverage", "Connected AI video workflows", "Driver behavior visibility", "Remote incident review"],
    useCases: ["Cabin and road monitoring", "Safety coaching", "Incident investigation", "Connected fleet oversight"],
  }),
  createVideoProduct({
    id: "eh15-v2-4-ch-ai-dashcam",
    title: "EH15-V2 4-CH AI Dashcam",
    shortDescription:
      "Four-channel AI dashcam hardware for commercial fleet video coverage, safety analysis, and review workflows.",
    specs: ["4-CH", "AI Dashcam", "Fleet Video"],
    features: ["Four-camera coverage", "Expanded fleet visibility", "AI-assisted review", "Operational evidence support"],
    useCases: ["Commercial vehicle monitoring", "Safety event analysis", "Multi-view route evidence", "Fleet compliance review"],
  }),
  createVideoProduct({
    id: "eh03t-4-ch-ai-dashcam",
    title: "EH03T 4-CH AI Dashcam",
    shortDescription:
      "Multi-channel AI dashcam for broader road and cabin visibility in connected telematics deployments.",
    specs: ["4-CH", "AI", "Dashcam"],
    features: ["Four-channel coverage", "Driver and road visibility", "AI event support", "Fleet video review"],
    useCases: ["Driver coaching", "Cabin review", "Road event investigation", "Connected fleet deployments"],
  }),
  createVideoProduct({
    id: "dr01-3-ch-4g-smart-dashcam",
    title: "DR01 3-CH 4G Smart Dashcam",
    shortDescription:
      "Smart 4G dashcam with three-channel coverage for connected road monitoring and fleet safety workflows.",
    specs: ["3-CH", "4G", "Smart Dashcam"],
    features: ["Smart connected video", "Three-angle monitoring", "Remote review access", "Operational route visibility"],
    useCases: ["Connected dashcam rollout", "Fleet incident capture", "Driver review", "Field route monitoring"],
  }),
  createVideoProduct({
    id: "eh24-2-ch-smart-dashcam",
    title: "EH24 2-CH Smart Dashcam",
    shortDescription:
      "Dual-channel smart dashcam hardware for streamlined fleet video capture and safer driving review workflows.",
    specs: ["2-CH", "Smart Dashcam", "Fleet Video"],
    features: ["Dual-camera visibility", "Smart video workflows", "Driver review support", "Compact fleet deployment"],
    useCases: ["Dual-view monitoring", "Safety coaching", "Incident evidence capture", "Operational video oversight"],
  }),
  createVideoProduct({
    id: "eh13-p-2-ch-smart-dashcam",
    title: "EH13-P 2-CH Smart Dashcam",
    shortDescription:
      "Two-channel smart dashcam for balanced road and cabin monitoring across fleet safety programs.",
    specs: ["2-CH", "Smart Dashcam", "Driver Review"],
    features: ["Road and cabin visibility", "Compact dual-channel setup", "Driver safety support", "Video evidence workflows"],
    useCases: ["Fleet safety monitoring", "Cabin review", "Incident analysis", "Driver accountability"],
  }),
  createVideoProduct({
    id: "eh16-1-ch-fleet-dashcam",
    title: "EH16 1-CH Fleet Dashcam",
    shortDescription:
      "Single-channel fleet dashcam for practical road coverage, event evidence, and day-to-day route review.",
    specs: ["1-CH", "Fleet Dashcam", "Road Video"],
    features: ["Fleet road visibility", "Simple deployment", "Evidence capture", "Route review support"],
    useCases: ["Daily fleet monitoring", "Basic video evidence", "Driver route review", "Safety documentation"],
  }),
  createVideoProduct({
    id: "es803-1-ch-ai-camera",
    title: "ES803 1-CH AI Camera",
    shortDescription:
      "Single-channel AI camera hardware for focused road visibility and connected fleet event detection.",
    specs: ["1-CH", "AI Camera", "Road Monitoring"],
    features: ["AI-assisted video monitoring", "Road-facing visibility", "Compact camera deployment", "Event detection support"],
    useCases: ["Road event capture", "Light fleet video rollout", "Safety review", "Connected camera monitoring"],
  }),
]);

const aiMdvrModelProducts = buildProductMap([
  createVideoProduct({
    id: "ed02r-v2-4-ch-ai-powered-mdvr",
    title: "ED02R-V2 4-CH AI-Powered MDVR",
    shortDescription:
      "Four-channel AI-powered MDVR for connected fleet recording, live review, and operational incident visibility.",
    specs: ["4-CH", "AI MDVR", "Remote Review"],
    features: ["Multi-channel recording", "AI-assisted fleet review", "Remote video access", "Operational evidence retention"],
    useCases: ["Public transport monitoring", "Commercial video telematics", "Incident review", "Fleet evidence workflows"],
    related: ["ai-mdvr", "ed08r-8-ch-ai-powered-mdvr", "d8-4-ch-smart-android-video-terminal"],
  }),
  createVideoProduct({
    id: "ed08r-8-ch-ai-powered-mdvr",
    title: "ED08R 8-CH AI-Powered MDVR",
    shortDescription:
      "Eight-channel AI MDVR platform for larger fleet video deployments requiring broader camera coverage.",
    specs: ["8-CH", "AI MDVR", "Fleet Video"],
    features: ["Expanded multi-camera support", "AI-powered recording workflows", "Large vehicle coverage", "Remote review readiness"],
    useCases: ["Bus and coach monitoring", "Heavy vehicle video systems", "Complex fleet recording", "Operations oversight"],
    related: ["ai-mdvr", "ed02r-v2-4-ch-ai-powered-mdvr", "d8-4-ch-smart-android-video-terminal"],
  }),
  createVideoProduct({
    id: "d8-4-ch-smart-android-video-terminal",
    title: "D8 4-CH Smart Android Video Terminal",
    shortDescription:
      "Smart Android video terminal for connected vehicle recording, telematics visibility, and multi-camera workflows.",
    specs: ["4-CH", "Android", "Video Terminal"],
    features: ["Smart Android platform", "Video and telematics integration", "Four-channel monitoring", "Connected vehicle workflow"],
    useCases: ["Smart fleet video operations", "Connected bus systems", "Mobile terminal deployments", "Operational review"],
    related: ["ai-mdvr", "ed02r-v2-4-ch-ai-powered-mdvr", "ed08r-8-ch-ai-powered-mdvr"],
  }),
]);

const gpsTrackerModelProducts = buildProductMap([
  createTrackingProduct({
    id: "kg-27-4g-vehicle-gps-tracker",
    title: "KG-27 4G Vehicle GPS Tracker",
    shortDescription:
      "4G vehicle GPS tracker for live route visibility, status alerts, and modern fleet telematics deployments.",
    specs: ["4G", "Vehicle GPS", "Tracker"],
    features: ["Live route visibility", "Vehicle status tracking", "Modern 4G deployment", "Fleet alert support"],
    useCases: ["Vehicle tracking", "Dispatch monitoring", "Operational telemetry", "Fleet movement control"],
    related: ["gps-tracker", "4g-gps-device", "kg22-4g-wired-gps-tracker"],
  }),
  createTrackingProduct({
    id: "c02g-2g-4g-gps-tracker",
    title: "C02G 2G/4G GPS Tracker",
    shortDescription:
      "Dual-network GPS tracker built for flexible fleet visibility across mixed telematics environments.",
    specs: ["2G/4G", "GNSS", "Fleet Tracking"],
    features: ["Flexible network support", "Live location status", "Movement alert workflows", "Mixed deployment ready"],
    useCases: ["Mixed fleet tracking", "Legacy-to-modern rollouts", "Asset visibility", "Operational oversight"],
    related: ["gps-tracker", "2g-gps-device", "4g-gps-device"],
  }),
  createTrackingProduct({
    id: "eg06g-4g-solar-gps-tracker",
    title: "EG06G 4G Solar GPS Tracker",
    shortDescription:
      "Solar-powered GPS tracker for lower-touch asset monitoring and long-runtime field visibility.",
    specs: ["4G", "Solar", "GPS Tracker"],
    features: ["Solar-assisted runtime", "Remote asset visibility", "Lower maintenance deployment", "Live tracking alerts"],
    useCases: ["Remote asset tracking", "Trailer visibility", "Outdoor equipment monitoring", "Lower-touch deployments"],
    related: ["gps-tracker", "asset-tracking-device", "eg01g-4g-wireless-gps-tracker"],
  }),
  createTrackingProduct({
    id: "eg01g-4g-wireless-gps-tracker",
    title: "EG01G 4G Wireless GPS Tracker",
    shortDescription:
      "Wireless 4G GPS tracker for flexible installs and dependable movement visibility across mobile assets.",
    specs: ["4G", "Wireless", "GPS Tracker"],
    features: ["Wireless deployment", "Live location reporting", "Flexible install workflow", "Asset movement visibility"],
    useCases: ["Portable asset tracking", "Retrofit tracking", "Field equipment monitoring", "Vehicle visibility"],
    related: ["gps-tracker", "asset-tracking-device", "eg03g-4g-wireless-gps-tracker"],
    imageSrc: "/Products/product2.png",
    imageClass: "catalog-card-image-asset",
  }),
  createTrackingProduct({
    id: "kg22-4g-wired-gps-tracker",
    title: "KG22 4G Wired GPS Tracker",
    shortDescription:
      "Wired 4G GPS tracker for permanent fleet installs, stable telemetry, and reliable vehicle visibility.",
    specs: ["4G", "Wired", "GPS Tracker"],
    features: ["Hardwired fleet install", "Stable location telemetry", "Vehicle status visibility", "Operational alert support"],
    useCases: ["Permanent vehicle tracking", "Commercial fleet deployment", "Route oversight", "Operational telemetry"],
    related: ["gps-tracker", "4g-gps-device", "kg-27-4g-vehicle-gps-tracker"],
  }),
  createTrackingProduct({
    id: "d03g-2g-4g-gps-tracker",
    title: "D03G 2G/4G GPS Tracker",
    shortDescription:
      "Flexible 2G/4G GPS tracker for fleet visibility programs that need broader network compatibility.",
    specs: ["2G/4G", "GPS Tracker", "Fleet Telemetry"],
    features: ["Broad network compatibility", "Location and route playback", "Fleet-ready alerts", "Mixed deployment support"],
    useCases: ["Fleet transition programs", "Vehicle visibility", "Asset tracking", "Dispatch coordination"],
    related: ["gps-tracker", "2g-gps-device", "4g-gps-device"],
  }),
  createTrackingProduct({
    id: "eg03g-4g-wireless-gps-tracker",
    title: "EG03G 4G Wireless GPS Tracker",
    shortDescription:
      "Wireless 4G GPS tracker for mobile asset visibility and lower-touch telematics deployment scenarios.",
    specs: ["4G", "Wireless", "GPS Tracker"],
    features: ["Wireless install flexibility", "Live movement visibility", "Battery-friendly tracking workflows", "Remote asset support"],
    useCases: ["Asset recovery", "Portable equipment monitoring", "Field deployment tracking", "Wireless fleet visibility"],
    related: ["gps-tracker", "asset-tracking-device", "eg01g-4g-wireless-gps-tracker"],
    imageSrc: "/Products/product2.png",
    imageClass: "catalog-card-image-asset",
  }),
  createTrackingProduct({
    id: "a02gl-8-2g-gps-tracker",
    title: "A02GL-8 2G GPS Tracker",
    shortDescription:
      "2G GPS tracker for dependable baseline fleet visibility in established telematics deployments.",
    specs: ["2G", "GPS Tracker", "Fleet Tracking"],
    features: ["Entry fleet tracking", "Dependable GNSS visibility", "Operational status awareness", "Field deployment ready"],
    useCases: ["Basic vehicle tracking", "Legacy fleet visibility", "Route playback", "Operational oversight"],
    related: ["gps-tracker", "2g-gps-device", "a02gl-4-2g-gps-tracker-4-wired"],
  }),
  createTrackingProduct({
    id: "a02g-2g-gps-tracker-8-wired",
    title: "A02G 2G GPS Tracker (8 wired)",
    shortDescription:
      "2G GPS tracker with 8-wired deployment support for extended telematics connectivity and I/O workflows.",
    specs: ["2G", "8 Wired", "GPS Tracker"],
    features: ["Expanded wired connectivity", "Vehicle tracking support", "I/O-ready deployment", "Operational status monitoring"],
    useCases: ["Wired fleet installs", "Vehicle telemetry", "Basic telematics control", "Route oversight"],
    related: ["gps-tracker", "2g-gps-device", "a02gl-8-2g-gps-tracker"],
  }),
  createTrackingProduct({
    id: "b02g-4g-gps-tracker",
    title: "B02G 4G GPS Tracker",
    shortDescription:
      "4G GPS tracker for fleet visibility, movement alerts, and connected telematics workflows.",
    specs: ["4G", "GPS Tracker", "Alerts"],
    features: ["Live movement tracking", "4G connectivity", "Alert-ready deployment", "Fleet route visibility"],
    useCases: ["Commercial fleet monitoring", "Vehicle security", "Dispatch control", "Operational visibility"],
    related: ["gps-tracker", "4g-gps-device", "kg-27-4g-vehicle-gps-tracker"],
  }),
  createTrackingProduct({
    id: "a02gl-4-2g-gps-tracker-4-wired",
    title: "A02GL-4 2G GPS Tracker (4 wired)",
    shortDescription:
      "2G GPS tracker with 4-wired support for practical fleet installs and dependable location reporting.",
    specs: ["2G", "4 Wired", "GPS Tracker"],
    features: ["Practical wired deployment", "Basic live tracking", "Vehicle location awareness", "Fleet-ready visibility"],
    useCases: ["Wired vehicle installs", "Entry telematics rollouts", "Route visibility", "Operational reporting"],
    related: ["gps-tracker", "2g-gps-device", "a02gl-8-2g-gps-tracker"],
  }),
]);

const cameraModelProducts = buildProductMap([
  createVideoProduct({
    id: "v832d-waterproof-vehicle-camera",
    title: "V832D Waterproof Vehicle Camera",
    shortDescription:
      "Waterproof fleet camera for exterior vehicle coverage in more demanding operating conditions.",
    specs: ["Waterproof", "Vehicle Camera", "Exterior View"],
    features: ["Weather-ready camera housing", "Exterior vehicle coverage", "Fleet video expansion", "Operational durability"],
    useCases: ["Exterior monitoring", "Harsh environment deployments", "Vehicle perimeter visibility", "Fleet video expansion"],
    related: ["camera-systems", "waterproof-exterior-camera-for-dashcam", "ai-mdvr"],
  }),
  createVideoProduct({
    id: "dms-driver-monitoring-camera",
    title: "DMS Driver Monitoring Camera",
    shortDescription:
      "Driver monitoring camera for safer fleet operations, in-cabin visibility, and coaching workflows.",
    specs: ["DMS", "Cabin View", "Driver Monitoring"],
    features: ["In-cabin driver visibility", "Driver behavior review", "Safety coaching support", "Camera integration ready"],
    useCases: ["Driver monitoring", "Cabin safety review", "Coaching workflows", "Operational visibility"],
    related: ["camera-systems", "v03d-dms-driver-monitoring-camera", "adas-driver-monitoring-camera"],
  }),
  createVideoProduct({
    id: "wide-dynamic-dms-camera-8pin-4pin",
    title: "Wide Dynamic DMS Camera (8PIN/4PIN)",
    shortDescription:
      "Wide dynamic driver monitoring camera for clearer cabin visibility across varied lighting conditions.",
    specs: ["DMS", "8PIN/4PIN", "Wide Dynamic"],
    features: ["Wide dynamic visibility", "Flexible connector support", "Cabin monitoring clarity", "Driver review workflows"],
    useCases: ["Driver monitoring", "Low-light cabin review", "Mixed hardware deployments", "Safety visibility"],
    related: ["camera-systems", "dms-driver-monitoring-camera", "wide-dynamic-dms-camera-5pin"],
  }),
  createVideoProduct({
    id: "wide-dynamic-dms-camera-5pin",
    title: "Wide Dynamic DMS Camera (5PIN)",
    shortDescription:
      "5PIN wide dynamic camera designed for driver monitoring and more stable cabin video clarity.",
    specs: ["DMS", "5PIN", "Wide Dynamic"],
    features: ["5PIN integration support", "Improved lighting performance", "Cabin visibility", "Driver monitoring readiness"],
    useCases: ["In-cabin video", "Driver safety review", "Dashcam expansion", "Operational monitoring"],
    related: ["camera-systems", "dms-driver-monitoring-camera", "wide-dynamic-dms-camera-8pin-4pin"],
  }),
  createVideoProduct({
    id: "interior-camera-for-dashcam",
    title: "Interior Camera for Dashcam",
    shortDescription:
      "Interior camera extension for dashcam deployments that require cabin visibility and event review.",
    specs: ["Interior Camera", "Dashcam", "Cabin View"],
    features: ["Cabin video coverage", "Dashcam extension support", "Interior event review", "Compact add-on deployment"],
    useCases: ["Cabin visibility", "Passenger transport review", "Driver monitoring support", "Interior event evidence"],
    related: ["camera-systems", "cabin-camera-for-dashcam", "ai-dashcam"],
  }),
  createVideoProduct({
    id: "cabin-camera-for-dashcam",
    title: "Cabin Camera for Dashcam",
    shortDescription:
      "Cabin camera accessory for dashcam systems that need broader in-vehicle video visibility.",
    specs: ["Cabin Camera", "Dashcam", "Vehicle Interior"],
    features: ["In-vehicle video expansion", "Passenger area visibility", "Dashcam integration support", "Safety review workflows"],
    useCases: ["Passenger fleet monitoring", "Interior route review", "Dashcam expansion", "Operational evidence support"],
    related: ["camera-systems", "interior-camera-for-dashcam", "ai-mdvr"],
  }),
  createVideoProduct({
    id: "waterproof-exterior-camera-for-dashcam",
    title: "Waterproof Exterior Camera for Dashcam",
    shortDescription:
      "Exterior waterproof camera module for dashcam systems that need broader perimeter and roadside visibility.",
    specs: ["Waterproof", "Exterior Camera", "Dashcam"],
    features: ["Weather-ready exterior monitoring", "Perimeter video coverage", "Dashcam system expansion", "Durable camera deployment"],
    useCases: ["Vehicle exterior visibility", "Harsh weather monitoring", "Perimeter review", "Fleet camera expansion"],
    related: ["camera-systems", "v832d-waterproof-vehicle-camera", "ai-mdvr"],
  }),
  createVideoProduct({
    id: "small-metal-conch-camera-for-dashcam",
    title: "Small Metal Conch Camera for Dashcam",
    shortDescription:
      "Compact metal-housing camera for dashcam deployments that need discreet additional coverage.",
    specs: ["Compact Camera", "Metal Housing", "Dashcam"],
    features: ["Compact add-on coverage", "Durable metal housing", "Discreet camera placement", "Dashcam integration ready"],
    useCases: ["Supplementary video coverage", "Compact vehicle installs", "Discrete monitoring", "Fleet camera expansion"],
    related: ["camera-systems", "interior-camera-for-dashcam", "cabin-camera-for-dashcam"],
  }),
  createVideoProduct({
    id: "v03d-dms-driver-monitoring-camera",
    title: "V03D DMS Driver Monitoring Camera",
    shortDescription:
      "DMS camera built for in-cabin visibility, driver review, and safety-led fleet video workflows.",
    specs: ["DMS", "Driver Monitoring", "Cabin Camera"],
    features: ["Driver-facing monitoring", "In-cabin video review", "Fleet safety support", "Connected camera workflow"],
    useCases: ["Driver coaching", "Cabin event review", "Safety monitoring", "Operational visibility"],
    related: ["camera-systems", "dms-driver-monitoring-camera", "adas-driver-monitoring-camera"],
  }),
  createVideoProduct({
    id: "adas-driver-monitoring-camera",
    title: "ADAS Driver Monitoring Camera",
    shortDescription:
      "ADAS-capable driver monitoring camera for visibility-led safety programs and in-cabin review.",
    specs: ["ADAS", "Driver Monitoring", "Fleet Safety"],
    features: ["ADAS-ready camera support", "Driver behavior visibility", "Safety workflow integration", "Fleet monitoring readiness"],
    useCases: ["Advanced safety monitoring", "Driver coaching", "Event review", "Connected camera deployments"],
    related: ["camera-systems", "dms-driver-monitoring-camera", "v03d-dms-driver-monitoring-camera"],
  }),
  createVideoProduct({
    id: "bsd-camera-for-mdvr",
    title: "BSD Camera for MDVR",
    shortDescription:
      "BSD camera module for MDVR systems that need added visibility and safer maneuvering review.",
    specs: ["BSD", "MDVR", "Safety Camera"],
    features: ["MDVR system integration", "Safety visibility support", "Additional camera coverage", "Operational review readiness"],
    useCases: ["Blind-spot awareness", "MDVR camera expansion", "Safety review", "Vehicle maneuver support"],
    related: ["camera-systems", "ai-mdvr", "ed02r-v2-4-ch-ai-powered-mdvr"],
  }),
]);

const wearableModelProducts = buildProductMap([
  createTrackingProduct({
    id: "pet10-gps-tracker",
    title: "PET10 GPS Tracker",
    shortDescription:
      "Portable GPS tracker for pets and small moving assets that need simple live location awareness.",
    specs: ["Portable", "GPS Tracker", "Battery Powered"],
    features: ["Portable live tracking", "Battery-powered deployment", "Recovery support", "Small asset visibility"],
    useCases: ["Pet visibility", "Portable asset monitoring", "Location alerts", "Recovery workflows"],
    related: ["pet-tracker", "smart-watch", "asset-tracking-device"],
    imageSrc: "/Products/product2.png",
    imageClass: "catalog-card-image-asset",
  }),
  createTrackingProduct({
    id: "s8-smart-watch",
    title: "S8 Smart Watch",
    shortDescription:
      "Connected smart watch for location visibility, field safety, and portable tracking scenarios.",
    specs: ["Wearable", "Smart Watch", "Location"],
    features: ["Wearable visibility", "Portable safety support", "Connected location workflows", "Compact field deployment"],
    useCases: ["Worker safety", "Portable location tracking", "School transport visibility", "Field team awareness"],
    related: ["smart-watch", "s6-smart-safety-wearable-for-kids", "pet-tracker"],
    imageSrc: "/Products/product2.png",
    imageClass: "catalog-card-image-asset",
  }),
  createTrackingProduct({
    id: "s6-smart-safety-wearable-for-kids",
    title: "S6 Smart Safety Wearable for Kids",
    shortDescription:
      "Child-focused safety wearable for location visibility and portable connected awareness.",
    specs: ["Wearable", "Safety", "Location"],
    features: ["Portable safety visibility", "Location awareness", "Compact wearable design", "Connected alert support"],
    useCases: ["Child location visibility", "School transport support", "Family safety workflows", "Portable awareness"],
    related: ["smart-watch", "s8-smart-watch", "pet-tracker"],
    imageSrc: "/Products/product2.png",
    imageClass: "catalog-card-image-asset",
  }),
]);

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
    related: [
      "mr012-ch-dashcam-for-motorcycle",
      "dr033-channel-ai-dashcam",
      "dr02-3-ch-4g-ai-dashcam",
    ],
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
  "ai-mdvr": {
    id: "ai-mdvr",
    category: "video",
    categoryLabel: "Video Telematics",
    title: "AI MDVR",
    shortDescription:
      "AI-powered mobile DVR hardware for multi-channel recording, live visibility, and fleet incident review.",
    specs: ["Multi-Channel", "AI Video", "Remote Review"],
    features: [
      "Multi-camera vehicle coverage",
      "AI-assisted event visibility",
      "Remote fleet video review",
      "Mobile DVR deployment ready",
    ],
    useCases: [
      "Public transport monitoring",
      "Commercial fleet video retention",
      "Incident review workflows",
      "Multi-channel cabin and road coverage",
    ],
    related: [
      "ed02r-v2-4-ch-ai-powered-mdvr",
      "ed08r-8-ch-ai-powered-mdvr",
      "d8-4-ch-smart-android-video-terminal",
    ],
    imageSrc: "/Products/dashcam.png",
    imageAlt: "AI MDVR device",
    imageClass: "catalog-card-image-dashcam",
  },
  "camera-systems": {
    id: "camera-systems",
    category: "video",
    categoryLabel: "Video Telematics",
    title: "Camera Systems",
    shortDescription:
      "Fleet camera hardware for road, cabin, and driver monitoring visibility across operational vehicles.",
    specs: ["Road View", "Cabin View", "Driver Monitoring"],
    features: [
      "Front and cabin monitoring",
      "Driver behavior visibility",
      "Video evidence support",
      "Expandable camera deployments",
    ],
    useCases: [
      "Driver monitoring programs",
      "Cabin and road visibility",
      "Event evidence collection",
      "Fleet safety reviews",
    ],
    related: [
      "v832d-waterproof-vehicle-camera",
      "dms-driver-monitoring-camera",
      "adas-driver-monitoring-camera",
    ],
    imageSrc: "/Products/dashcam.png",
    imageAlt: "Fleet camera system",
    imageClass: "catalog-card-image-dashcam",
  },
  "gps-tracker": {
    id: "gps-tracker",
    category: "tracking",
    categoryLabel: "Tracking Devices",
    title: "GPS Tracker",
    shortDescription:
      "General-purpose GPS tracking hardware for live vehicle, asset, and field movement visibility.",
    specs: ["GNSS", "Live Tracking", "Alerts"],
    features: [
      "Real-time location visibility",
      "Route history and playback",
      "Movement alerts",
      "Flexible deployment options",
    ],
    useCases: [
      "Vehicle tracking",
      "Asset visibility",
      "Dispatch monitoring",
      "Operational movement control",
    ],
    related: [
      "kg-27-4g-vehicle-gps-tracker",
      "c02g-2g-4g-gps-tracker",
      "eg06g-4g-solar-gps-tracker",
    ],
    imageSrc: "/Products/product3.png",
    imageAlt: "GPS tracker",
    imageClass: "catalog-card-image-gps",
  },
  "pet-tracker": {
    id: "pet-tracker",
    category: "tracking",
    categoryLabel: "Tracking Devices",
    title: "PET Tracker",
    shortDescription:
      "Compact portable tracking hardware for people, pets, and small moving assets that need live location awareness.",
    specs: ["Portable", "Battery Powered", "Location Alerts"],
    features: [
      "Portable tracking form factor",
      "Battery-powered deployment",
      "Live location status",
      "Alert and recovery support",
    ],
    useCases: [
      "Pet location visibility",
      "Portable asset tracking",
      "Personal safety tracking",
      "Recovery workflows",
    ],
    related: ["pet10-gps-tracker", "smart-watch", "asset-tracking-device"],
    imageSrc: "/Products/product2.png",
    imageAlt: "PET tracker",
    imageClass: "catalog-card-image-asset",
  },
  "smart-watch": {
    id: "smart-watch",
    category: "tracking",
    categoryLabel: "Tracking Devices",
    title: "Smart Watch",
    shortDescription:
      "Connected wearable hardware for safety, location visibility, and mobile workforce tracking scenarios.",
    specs: ["Wearable", "Location", "Safety Alerts"],
    features: [
      "Wearable live location support",
      "Safety alert workflows",
      "Portable field deployment",
      "Connected status visibility",
    ],
    useCases: [
      "Worker safety programs",
      "Student wearable tracking",
      "Mobile team visibility",
      "Personal alert scenarios",
    ],
    related: ["s8-smart-watch", "s6-smart-safety-wearable-for-kids", "pet-tracker"],
    imageSrc: "/Products/product2.png",
    imageAlt: "Smart watch tracker",
    imageClass: "catalog-card-image-asset",
  },
  ...aiDashcamModelProducts,
  ...aiMdvrModelProducts,
  ...gpsTrackerModelProducts,
  ...cameraModelProducts,
  ...wearableModelProducts,
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
  "ai-mdvr": [
    {
      src: "/Products/dashcam.png",
      alt: "AI MDVR front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "AI MDVR hardware lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "camera-systems": [
    {
      src: "/Products/dashcam.png",
      alt: "Camera system front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "Camera system hardware lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "gps-tracker": [
    {
      src: "/Products/product3.png",
      alt: "GPS tracker front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/3Products.png",
      alt: "GPS tracker hardware lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "pet-tracker": [
    {
      src: "/Products/product2.png",
      alt: "PET tracker front view",
      imageClass: "catalog-card-image-asset",
    },
    {
      src: "/Products/3Products.png",
      alt: "PET tracker hardware lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "smart-watch": [
    {
      src: "/Products/product2.png",
      alt: "Smart watch front view",
      imageClass: "catalog-card-image-asset",
    },
    {
      src: "/Products/3Products.png",
      alt: "Smart watch hardware lineup",
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
