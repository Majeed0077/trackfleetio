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
  specTable?: Record<string, string>;
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
  specTable,
  features,
  useCases,
  related = ["ai-dashcam", "ai-mdvr", "dvr-system"],
  imageSrc = "/Products/DR03.png",
  imageClass = "catalog-card-image-dashcam",
}: {
  id: string;
  title: string;
  shortDescription: string;
  specs: string[];
  specTable?: Record<string, string>;
  features: string[];
  useCases: string[];
  related?: string[];
  imageSrc?: string;
  imageClass?: string;
}): ProductSeed => ({
  id,
  category: "video",
  categoryLabel: "Video Telematics",
  title,
  shortDescription,
  specs,
  specTable,
  features,
  useCases,
  related,
  imageSrc,
  imageAlt: title,
  imageClass,
});

const createTrackingProduct = ({
  id,
  title,
  shortDescription,
  specs,
  specTable,
  features,
  useCases,
  related = ["gps-tracker", "4g-gps-device", "asset-tracking-device"],
  imageSrc = "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
  imageClass = "catalog-card-image-gps",
}: {
  id: string;
  title: string;
  shortDescription: string;
  specs: string[];
  specTable?: Record<string, string>;
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
  specTable,
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
    title: "MR01 2-CH Motorcycle Dashcam",
    shortDescription:
      "Motorcycle-ready 4G dashcam built for two-channel recording, starlight visibility, and IP67 deployment across two-wheel fleets.",
    specs: ["2-CH Video", "4G CAT.4", "IP67 Waterproof"],
    features: ["Motorcycle-specific rugged housing", "Starlight front camera", "GNSS with GPS, Galileo, BeiDou, and GLONASS", "FOTA and configurator support"],
    useCases: ["Motorcycle fleet monitoring", "Rider incident evidence", "Two-wheel delivery safety review", "Outdoor route and trip capture"],
    imageSrc: "/Products/MR01.png",
    related: ["ai-dashcam", "dr033-channel-ai-dashcam", "eh21-1-ch-4g-dashcam"],
  }),
  createVideoProduct({
    id: "dr033-channel-ai-dashcam",
    title: "DR03 3-CH AI Dashcam",
    shortDescription:
      "Modular three-channel AI dashcam with built-in ADAS and DMS, 4G CAT.4 connectivity, and GNSS-led fleet video visibility.",
    specs: ["3-CH Video", "ADAS + DMS", "4G CAT.4"],
    features: ["Built-in forward ADAS camera", "Built-in in-cabin DMS camera", "Optional LoRa support", "TF storage up to 512GB"],
    useCases: ["Driver behavior monitoring", "Road and cabin event capture", "Incident evidence retention", "Connected video telematics rollout"],
    imageSrc: "/Products/DR03.png",
    related: ["ai-dashcam", "eh15-v2-4-ch-ai-dashcam", "eh03t-4-ch-ai-dashcam"],
  }),
  createVideoProduct({
    id: "eh80-1-ch-aov-dash-camera",
    title: "EH80 1-CH AOV Dashcam",
    shortDescription:
      "Always-on single-channel dashcam with low-power human and vehicle detection, starlight night vision, and 4G fleet connectivity.",
    specs: ["1-CH Video", "AOV Mode", "Starlight Vision"],
    features: ["Low-power always-on monitoring", "Human and vehicle detection in AOV mode", "9-90V operating power", "Optional LoRa support"],
    useCases: ["Off-hours parking surveillance", "Vehicle perimeter monitoring", "Night-time incident capture", "Low-power fleet security workflows"],
    related: ["ai-dashcam", "eh21-1-ch-4g-dashcam", "dr033-channel-ai-dashcam"],
  }),
  createVideoProduct({
    id: "eh21-1-ch-4g-dashcam",
    title: "EH21 1-CH 4G ADAS Dashcam",
    shortDescription:
      "Single-channel AI dashcam with ADAS, 4G CAT.1 connectivity, GNSS positioning, and compact road-facing deployment.",
    specs: ["1-CH Video", "4G CAT.1", "ADAS"],
    features: ["AI-assisted forward safety alerts", "GNSS with four-satellite support", "Optional LoRa module", "Type-C debug and TF storage support"],
    useCases: ["Road-facing fleet monitoring", "Remote route review", "Driver accountability programs", "Entry-level connected dashcam rollout"],
    imageSrc: "/Products/EH21.png",
    related: ["ai-dashcam", "eh80-1-ch-aov-dash-camera", "eh24-2-ch-smart-dashcam"],
  }),
  createVideoProduct({
    id: "dr02-3-ch-4g-ai-dashcam",
    title: "DR02 3-CH 4G AI Dashcam",
    shortDescription:
      "Three-channel 4G AI dashcam for broader cabin and road coverage with connected fleet video intelligence.",
    specs: ["3-CH Video", "4G Connectivity", "AI Dashcam"],
    features: ["Multi-angle fleet coverage", "Connected AI video workflows", "Driver behavior visibility", "Remote incident review"],
    useCases: ["Cabin and road monitoring", "Safety coaching", "Incident investigation", "Connected fleet oversight"],
  }),
  createVideoProduct({
    id: "eh15-v2-4-ch-ai-dashcam",
    title: "EH15-V2 4/6-CH AI Dashcam",
    shortDescription:
      "Expandable AI dashcam with four- or six-channel recording, ADAS and DMS support, 4G connectivity, and GNSS-led video operations.",
    specs: ["4/6-CH Video", "ADAS + DMS", "4G CAT.4"],
    features: ["Supports six-channel or full-HD four-channel modes", "Integrated forward and cabin cameras", "Super capacitor design", "Optional LoRa and Wi-Fi support"],
    useCases: ["Commercial vehicle video coverage", "Bus and van safety review", "Multi-view incident investigation", "Compliance-focused fleet recording"],
    imageSrc: "/Products/EH15-V2.png",
    related: ["ai-dashcam", "eh03t-4-ch-ai-dashcam", "dr033-channel-ai-dashcam"],
  }),
  createVideoProduct({
    id: "eh03t-4-ch-ai-dashcam",
    title: "EH03T-V2 4-CH AI Dashcam",
    shortDescription:
      "Four-channel AI dashcam with ADAS, DMS, 4G connectivity, GNSS positioning, and optional LoRa for connected fleet video deployments.",
    specs: ["4-CH Video", "ADAS + DMS", "2G/3G/4G"],
    features: ["2.0 TOPS AI processing", "Four-channel full-HD recording", "Optional LoRa and Wi-Fi", "Dual TF storage up to 512GB"],
    useCases: ["Driver coaching programs", "Cabin and road visibility", "Connected fleet video management", "Incident and safety event investigation"],
    imageSrc: "/Products/EH03T-V2.png",
    related: ["ai-dashcam", "eh15-v2-4-ch-ai-dashcam", "dr033-channel-ai-dashcam"],
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
    title: "EH24 2-CH 4G Dashcam",
    shortDescription:
      "Dual-channel 4G dashcam with forward and cabin cameras, GNSS support, and dependable two-view fleet evidence capture.",
    specs: ["2-CH Video", "4G CAT.1", "GNSS"],
    features: ["Forward and cabin 1080p cameras", "9-36V fleet installation support", "LiFePO4 battery backup", "Configurator and FOTA readiness"],
    useCases: ["Dual-view driver monitoring", "Cabin and road incident review", "Route evidence capture", "Connected vehicle safety programs"],
    imageSrc: "/Products/EH24.png",
    related: ["ai-dashcam", "eh25-2-ch-4g-dashcam", "eh21-1-ch-4g-dashcam"],
  }),
  createVideoProduct({
    id: "eh25-2-ch-4g-dashcam",
    title: "EH25 2-CH 4G Dashcam",
    shortDescription:
      "Compact two-channel 4G dashcam with GNSS positioning, H.265 recording, and dependable road-plus-cabin fleet coverage.",
    specs: ["2-CH Video", "4G CAT.1", "GNSS"],
    features: ["Forward 1080p main camera", "Supports second 1080p or 720p channel", "3-axis G-sensor", "Configurator and FOTA web support"],
    useCases: ["Connected fleet video monitoring", "Road and cabin evidence capture", "Daily route review", "Compact dashcam deployments"],
    imageSrc: "/Products/EH25.png",
    related: ["ai-dashcam", "eh24-2-ch-smart-dashcam", "eh21-1-ch-4g-dashcam"],
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
    title: "ED02R-V2 4-CH AI MDVR",
    shortDescription:
      "Professional 4-channel AI MDVR built on Linux with 2.0 TOPS NPU, ADAS/DMS/BSD algorithms, and connected 4G + GNSS fleet visibility.",
    specs: ["4-CH 1080p/720p", "2.0 TOPS NPU", "ADAS + DMS + BSD", "4G CAT.4 + GNSS"],
    specTable: {
      OS: "Linux",
      "AI Compute": "2.0 TOPS NPU",
      "AI Algorithms": "ADAS / DMS / BSD",
      "Video Channels": "4 channels @ 1080p or 720p",
      Encoding: "H.265 / H.264",
      Cellular: "2G / 3G / 4G CAT.4",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      LoRa: "Optional",
      "Power Input": "9-36V DC",
      "Built-in Battery": "Supercapacitor",
      Storage: "2x SD (32GB-512GB, Class 10)",
      "Acceleration Sensor": "3-axis G-sensor",
      Dimensions: "161 x 124.8 x 41 mm",
      Weight: "558 g",
      Certification: "CE, FCC",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "4-channel recording with H.265/H.264 encoding",
      "Dual SD storage (2x SD, Class 10, 32GB-512GB per card)",
      "9-36V DC input with supercapacitor for safe shutdown",
      "3-axis G-sensor for event capture support",
      "Optional LoRa module support",
      "GNSS support: GPS, Galileo, BeiDou, GLONASS",
      "Rich vehicle I/O: ACC/SOS/ADC, turn, brake, door, 1-WIRE, RS-485, RS-232",
      "Configurator and FOTA web support",
    ],
    useCases: [
      "Bus and coach multi-camera monitoring",
      "School transport safety review",
      "Logistics and delivery incident evidence",
      "Heavy-vehicle compliance and operational oversight",
    ],
    related: ["ai-mdvr", "ed08r-8-ch-ai-powered-mdvr", "d8-4-ch-smart-android-video-terminal"],
    imageSrc: "/Products/Professional MDVR with lockable cover.png",
  }),
  createVideoProduct({
    id: "ed08r-8-ch-ai-powered-mdvr",
    title: "ED08R-V2 8-CH AI MDVR",
    shortDescription:
      "Enterprise 8-channel AI MDVR with 2.0 TOPS NPU, ADAS/DMS/BSD algorithms, 4G CAT.4 + GNSS connectivity, and high-capacity storage for large fleets.",
    specs: ["8-CH 1080p/720p", "2.0 TOPS NPU", "ADAS + DMS + BSD", "4G CAT.4 + GNSS + Wi-Fi"],
    specTable: {
      OS: "Linux",
      "AI Compute": "2.0 TOPS NPU",
      "AI Algorithms": "ADAS / DMS / BSD",
      "Video Channels": "8 channels @ 1080p or 720p",
      Encoding: "H.265 / H.264",
      Cellular: "2G / 3G / 4G CAT.4",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      WiFi: "2.4GHz",
      LoRa: "Optional",
      "Power Input": "9-36V DC",
      Storage: "SD (32GB-512GB) + Disk (128GB-2TB)",
      "Acceleration Sensor": "3-axis G-sensor",
      Dimensions: "170 x 150 x 65 mm",
      Weight: "1260 g",
      Certification: "CE, FCC",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "8-channel recording with H.265/H.264 encoding (1080p or 720p)",
      "Storage: SD (Class 10, 32GB-512GB) + Disk (128GB-2TB)",
      "9-36V DC input for commercial vehicle installations",
      "2.4GHz Wi-Fi support for local connectivity",
      "Optional LoRa module support",
      "GNSS support: GPS, Galileo, BeiDou, GLONASS",
      "9-channel audio input support (AV3-AV8 + external microphone)",
      "Rich vehicle I/O with 1-WIRE, plus RS-485 and RS-232 ports",
      "Configurator and FOTA web support",
    ],
    useCases: [
      "Large fleet and public transport monitoring",
      "Multi-camera safety coverage (road, cabin, perimeter)",
      "Longer retention recording with disk storage",
      "Enterprise compliance and incident review workflows",
    ],
    related: ["ai-mdvr", "ed02r-v2-4-ch-ai-powered-mdvr", "d8-4-ch-smart-android-video-terminal"],
    imageSrc: "/Products/Vehicle MDVR device with detailed front panel.png",
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
    imageSrc: "/Products/Vehicle MDVR device with detailed front panel.png",
  }),
]);

const gpsTrackerModelProducts = buildProductMap([
  createTrackingProduct({
    id: "kg-27-4g-vehicle-gps-tracker",
    title: "KG-27 4G Vehicle GPS Tracker",
    shortDescription:
      "High-performance fleet tracker with wide 9-90V input, 2G + 4G Cat.1 connectivity, LoRa sensor support, and rich I/O for industrial-grade deployments.",
    specs: ["2G + 4G Cat.1", "GNSS <2m", "LoRa 868/915", "9-90V DC"],
    specTable: {
      Cellular: "2G + 4G Cat.1",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      "Position Accuracy": "< 2.0m CEP",
      "Power Input": "9-90V DC",
      Battery: "3.7V 400mAh",
      "LoRa Frequency": "868 / 915MHz",
      "Blind Spot Storage": "6000 entries",
      "Interfaces / I-O": "1-WIRE, RS485, RS232, ADC",
      "SIM / Ports": "Nano-SIM, Type-C",
      Dimensions: "93 x 50 x 19 mm",
      Weight: "75 g",
      Certification: "CE, FCC",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "2G + 4G Cat.1 with SMS support (TXT/PDU) and dual-IP",
      "GNSS: GPS, Galileo, BeiDou, GLONASS with <2.0m CEP accuracy (datasheet)",
      "LoRa 868/915MHz for sensor connectivity (datasheet)",
      "Abundant external interfaces: 1-WIRE, RS485, RS232, ADC (datasheet)",
      "Remote fuel/oil cut-off circuit support",
      "Alerts: vibration, position change, power-cut, low voltage, speeding, harsh driving, collision (datasheet)",
      "6000 blind-spot storage entries (total for both IPs)",
      "Configurator and FOTA web support",
    ],
    useCases: [
      "Commercial vehicle live tracking and route replay",
      "Industrial fleet telemetry with sensor expansion (LoRa)",
      "Driver safety alerts and harsh driving review",
      "Remote immobilization workflows (where permitted)",
    ],
    related: ["gps-tracker", "4g-gps-device", "kg22-4g-wired-gps-tracker"],
    imageSrc: "/Products/Compact rugged GPS tracker.png",
  }),
  createTrackingProduct({
    id: "c02g-2g-4g-gps-tracker",
    title: "C02G 2G/4G GPS Tracker",
    shortDescription:
      "Industrial high-voltage tracker with 2G + 4G Cat.1, wide 9-90V input, GNSS positioning, ACC detection, and fuel cut-off support.",
    specs: ["2G + 4G Cat.1", "GNSS <2m", "9-90V DC", "ACC + Cut-off"],
    specTable: {
      Cellular: "2G + 4G Cat.1",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      "Position Accuracy": "< 2.0m CEP",
      "Power Input": "9-90V DC",
      "Backup Battery": "3.7V 180mAh",
      "Ingress Protection": "IP54",
      Functions: "ACC detection, cut-off oil circuit",
      "SIM / Ports": "Micro-SIM, Type-C",
      Dimensions: "86 x 43 x 15 mm",
      Weight: "70 g",
      Certification: "CE, FCC, EMARK, UKCA",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "2G + 4G Cat.1 with SMS support (TXT/PDU)",
      "GNSS: GPS, Galileo, BeiDou, GLONASS with <2.0m CEP accuracy (datasheet)",
      "ACC detection and monitoring support",
      "Fuel/oil circuit cut-off support (datasheet)",
      "Backup battery: 3.7V 180mAh (datasheet)",
      "Alerts: low voltage, SOS, speeding, harsh driving, collision (datasheet)",
      "Configurator and FOTA web support",
      "IP54 ingress protection (datasheet)",
    ],
    useCases: [
      "Mixed-network fleet tracking (2G + 4G coverage)",
      "High-voltage vehicle installs (industrial and heavy-duty)",
      "Dispatch monitoring with ACC status awareness",
      "Security workflows with cut-off support (where permitted)",
    ],
    related: ["gps-tracker", "2g-gps-device", "4g-gps-device"],
    imageSrc: "/Products/Compact GPS tracker with color-coded wires.png",
  }),
  createTrackingProduct({
    id: "eg06g-4g-solar-gps-tracker",
    title: "EG06G 4G Solar GPS Tracker",
    shortDescription:
      "4G Cat.1 solar tracker with powerful magnetic mount, IP67 protection, and 7500mAh battery for long-term outdoor asset visibility.",
    specs: ["4G Cat.1", "Solar + Type-C", "IP67", "7500mAh"],
    specTable: {
      Cellular: "4G Cat.1",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      "Position Accuracy": "< 2.0m CEP",
      "Ingress Protection": "IP67",
      Battery: "3.7V 7500mAh",
      Charging: "Solar panel (6V 90mA max) + Type-C 5V",
      Mount: "Powerful magnetic mount",
      Storage: "Up to 10,000 entries (optional flash)",
      Dimensions: "157 x 70 x 26.5 mm",
      Weight: "310 g",
      Certification: "CE, FCC, UKCA",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "High-efficiency solar panel charging (6V 90mA max, datasheet)",
      "Type-C charging input (DC 5V)",
      "Powerful magnetic mount for discreet installs",
      "Battery life modes (datasheet): deep power saving, smart power saving, tracking",
      "Alerts: tamper, SOS, low voltage, speeding, harsh driving, collision (datasheet)",
      "Expandable storage up to 10,000 entries with optional flash (datasheet)",
      "GNSS: GPS, Galileo, BeiDou, GLONASS with <2.0m CEP accuracy (datasheet)",
      "Configurator and FOTA web support",
    ],
    useCases: [
      "Trailer and container tracking",
      "Outdoor equipment monitoring",
      "Long-term asset visibility with solar top-up",
      "Theft recovery and tamper detection programs",
    ],
    related: ["gps-tracker", "asset-tracking-device", "eg01g-4g-wireless-gps-tracker"],
    imageSrc: "/Products/Solar-powered GPS tracker close-up.png",
    imageClass: "catalog-card-image-asset",
  }),
  createTrackingProduct({
    id: "eg01g-4g-wireless-gps-tracker",
    title: "EG01G 4G Wireless GPS Tracker",
    shortDescription:
      "Rechargeable 4G Cat.1 magnetic tracker with IP67 protection and 7500mAh battery for extended asset visibility and recovery workflows.",
    specs: ["4G Cat.1", "Magnetic Mount", "IP67", "7500mAh"],
    specTable: {
      Cellular: "4G Cat.1",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      "Position Accuracy": "< 2.0m CEP",
      "Ingress Protection": "IP67",
      Battery: "3.7V 7500mAh",
      Charging: "Type-C 5V",
      Mount: "Powerful magnetic mount",
      Storage: "Up to 10,000 entries (optional flash)",
      Dimensions: "95 x 72 x 35 mm",
      Weight: "291 g",
      Certification: "CE, FCC, EMARK, UKCA",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "Powerful magnetic mount for concealed installation",
      "Battery life modes (datasheet): deep power saving, smart power saving, tracking",
      "Expandable storage up to 10,000 entries with optional flash (datasheet)",
      "Alerts: light sensor, SOS, low voltage, speeding, harsh driving, collision (datasheet)",
      "GNSS: GPS, Galileo, BeiDou, GLONASS with <2.0m CEP accuracy (datasheet)",
      "Type-C charging input (DC 5V)",
      "Configurator and FOTA web support",
    ],
    useCases: [
      "Asset recovery and theft protection",
      "Portable equipment tracking",
      "Discreet magnetic installs on vehicles and assets",
      "Longer runtime deployments without hardwiring",
    ],
    related: ["gps-tracker", "asset-tracking-device", "eg06g-4g-solar-gps-tracker"],
    imageSrc: "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
    imageClass: "catalog-card-image-asset",
  }),
  createTrackingProduct({
    id: "kg22-4g-wired-gps-tracker",
    title: "KG22 4G Wired GPS Tracker",
    shortDescription:
      "Rugged IP67 4G Cat.1 tracker with wide 9-90V input and ultra-low power modes for harsh-environment vehicle deployments.",
    specs: ["4G Cat.1", "IP67", "9-90V DC", "16,000 Storage"],
    specTable: {
      Cellular: "4G Cat.1",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      "Position Accuracy": "< 2.0m CEP",
      "Power Input": "9-90V DC",
      "Ingress Protection": "IP67",
      Battery: "3.7V 55mAh",
      "Blind Spot Storage": "16,000 entries",
      "Working Modes": "Normal, online sleep, offline deep sleep",
      "SIM / Ports": "Nano-SIM, Type-C",
      Dimensions: "158 x 42 x 17 mm",
      Weight: "51 g",
      Certification: "CE, FCC, UKCA",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "Ultra-low power: 10uA offline deep sleep (datasheet)",
      "Online sleep and offline deep sleep working modes (datasheet)",
      "16,000 blind-spot storage entries (total for both IPs)",
      "Dual-IP support",
      "Alerts: vibration, position change, power-cut, low voltage, speeding, harsh driving, collision (datasheet)",
      "GNSS: GPS, Galileo, BeiDou, GLONASS with <2.0m CEP accuracy (datasheet)",
      "Nano-SIM + Type-C (datasheet)",
      "Configurator and FOTA web support",
    ],
    useCases: [
      "Permanent vehicle installs in harsh environments",
      "Low-maintenance fleet tracking with deep sleep modes",
      "Route oversight and dispatch monitoring",
      "Security alerts (vibration/power-cut) for parked vehicles",
    ],
    related: ["gps-tracker", "4g-gps-device", "kg-27-4g-vehicle-gps-tracker"],
    imageSrc: "/Products/Sleek black GPS tracker with cable.png",
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
      "Compact wireless 4G Cat.1 positioning device with Type-C charging, 1500mAh battery, and extended standby options for discreet installs.",
    specs: ["4G Cat.1", "1500mAh", "Type-C", "GNSS <2m"],
    specTable: {
      Cellular: "4G Cat.1",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      "Position Accuracy": "< 2.0m CEP",
      Battery: "3.7V 1500mAh",
      Charging: "Type-C 5V",
      Storage: "Expandable up to 500 entries",
      "Deep Sleep Current": "76uA (offline deep sleep)",
      "SIM / Ports": "Nano-SIM, Type-C",
      Dimensions: "55.4 x 36.6 x 20 mm",
      Weight: "70 g",
      Certification: "CE, FCC, UKCA",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "Working modes: tracking, smart power saving, deep power saving (datasheet)",
      "Very low deep sleep current: 76uA (datasheet)",
      "Expandable storage up to 500 entries (datasheet)",
      "Light sensor alert + standard safety alerts (SOS, low voltage, harsh driving, collision) (datasheet)",
      "GNSS: GPS, Galileo, BeiDou, GLONASS with <2.0m CEP accuracy (datasheet)",
      "Nano-SIM + Type-C (datasheet)",
      "Configurator and FOTA web support",
    ],
    useCases: [
      "Discreet vehicle tracking installs",
      "Personnel or equipment positioning",
      "Portable tracking with extended standby",
      "Low-touch recovery workflows",
    ],
    related: ["gps-tracker", "asset-tracking-device", "eg01g-4g-wireless-gps-tracker"],
    imageSrc: "/Products/Compact black electronic device.png",
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
    title: "PET12 Smart GPS Pet Locator",
    shortDescription:
      "Compact 4G Cat.1 pet locator with Bluetooth nearby search, geo-fence alerts, and acoustic + light finding modes for quick recovery.",
    specs: ["4G Cat.1", "Bluetooth 5.0", "IP67", "700mAh"],
    specTable: {
      Cellular: "4G Cat.1",
      GNSS: "GPS / Galileo / BeiDou / GLONASS",
      "Position Accuracy": "< 2m CEP",
      Bluetooth: "5.0",
      "Ingress Protection": "IP67",
      Battery: "3.7V 700mAh",
      Charging: "Magnetic connector (DC 5V)",
      "Working Modes": "Standby, smart power saving, extended battery life, smart geo-fence",
      Dimensions: "63.9 x 36.1 x 19.2 mm",
      Weight: "34 g",
      Certification: "CE",
      "FOTA / Configurator": "Supported",
    },
    features: [
      "Bluetooth-based nearby pet finding (pet search mode)",
      "Geo-fence alert support (datasheet)",
      "Acoustic and light pet finding modes (datasheet)",
      "Magnetic charging connector",
      "Working modes: standby, smart power saving, extended battery life, smart geo-fence (datasheet)",
      "GNSS: GPS, Galileo, BeiDou, GLONASS with <2m CEP accuracy (datasheet)",
      "Configurator and FOTA web support",
    ],
    useCases: ["Pet safety and location visibility", "Near-by recovery search", "Geo-fence alerts", "Outdoor pet tracking"],
    related: ["pet-tracker", "smart-watch", "asset-tracking-device"],
    imageSrc: "/Products/Pet tracker with LED indicator.png",
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
    imageSrc: "/Products/smartwatch.png",
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
    imageSrc: "/Products/Compact black electronic device.png",
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
    imageSrc: "/Products/Compact GPS tracker with color-coded wires.png",
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
    imageSrc: "/Products/Sleek black GPS tracker with cable.png",
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
    imageSrc: "/Products/Compact black electronic device.png",
    imageAlt: "Asset tracking device",
    imageClass: "catalog-card-image-asset",
  },
  "ai-dashcam": {
    id: "ai-dashcam",
    category: "video",
    categoryLabel: "Video Telematics",
    title: "AI Dashcam",
    shortDescription:
      "Connected dashcam range covering single, dual, three, four, and six-channel deployments with ADAS, DMS, GNSS, and 4G-ready fleet visibility.",
    specs: ["1-6 CH Range", "4G + GNSS", "ADAS / DMS"],
    features: [
      "Single-channel to multi-channel video coverage",
      "ADAS and DMS safety alert support",
      "Connected 4G and GNSS video workflows",
      "FOTA and configurator-ready deployment",
    ],
    useCases: [
      "Driver coaching and safety review",
      "Incident evidence and route playback",
      "Cabin and road monitoring programs",
      "Connected fleet video deployments",
    ],
    related: [
      "dr033-channel-ai-dashcam",
      "eh15-v2-4-ch-ai-dashcam",
      "eh24-2-ch-smart-dashcam",
    ],
    imageSrc: "/Products/DR03.png",
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
    imageSrc: "/Products/Vehicle MDVR device with detailed front panel.png",
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
    imageSrc: "/Products/Professional MDVR with lockable cover.png",
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
    imageSrc: "/Products/EH25.png",
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
    imageSrc: "/Products/Compact rugged GPS tracker.png",
    imageAlt: "GPS tracker",
    imageClass: "catalog-card-image-gps",
  },
  "pet-tracker": {
    id: "pet-tracker",
    category: "tracking",
    categoryLabel: "Tracking Devices",
    title: "PET Tracker",
    shortDescription:
      "Compact 4G pet locator family with GNSS tracking, geo-fence alerts, and quick nearby recovery search support.",
    specs: ["4G", "Geo-fence", "Bluetooth Search"],
    features: [
      "Portable tracker form factor with rechargeable battery",
      "Geo-fence alert workflows (supported models)",
      "Nearby recovery via Bluetooth search (supported models)",
      "Acoustic and light finding support (supported models)",
    ],
    useCases: [
      "Pet location visibility",
      "Near-by recovery search",
      "Geo-fence alerts",
      "Outdoor pet tracking",
    ],
    related: ["pet10-gps-tracker", "smart-watch", "asset-tracking-device"],
    imageSrc: "/Products/Pet tracker with LED indicator.png",
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
    imageSrc: "/Products/smartwatch.png",
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
    imageSrc: "/Products/LoRaWAN fuel sensor device close-up.png",
    imageAlt: "Fuel sensors",
    imageClass: "catalog-card-image-sensor",
  },
  "temperature-sensors": {
    id: "temperature-sensors",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "Temperature Sensors",
    shortDescription:
      "Industrial wireless LoRa temperature sensor for cold-chain monitoring, deep-signal penetration, and dependable condition logging.",
    specs: ["LoRa 868/915MHz", "IP67", "±0.5°C Precision", "Battery Powered"],
    specTable: {
      Sensor: "Temperature",
      LoRa: "868MHz / 915MHz",
      "Ingress Protection": "IP67",
      "Detection Cycle": "60s",
      "Upload Cycle": "Up to 1,440 times/day",
      Precision: "Up to ±0.5°C (datasheet claim)",
      "Operating Temperature": "-30°C to 70°C",
      Battery: "1500mAh Li-Mn dry battery",
      Interface: "Type-C",
      Certification: "CE, FCC",
      Configurator: "Supported",
    },
    features: [
      "Temperature measurement with datasheet-listed precision down to ±0.5°C (high-range)",
      "Low-power design with 1500mAh Li-Mn dry battery",
      "Detection cycle: 60s",
      "Upload cycle: up to 1,440 times per day",
      "Type-C port",
      "Configurator support",
      "Operating temperature: -30°C to 70°C",
    ],
    useCases: [
      "Cold-chain tracking",
      "Food transport compliance",
      "Pharma fleet monitoring",
      "Warehouse and storage condition alerts",
    ],
    related: ["tpms", "fuel-sensors", "grain-level-sensor"],
    imageSrc: "/Products/Industrial temperature sensor close-up.png",
    imageAlt: "Temperature sensors",
    imageClass: "catalog-card-image-sensor",
  },
  "rfid-01-nfc-reader": {
    id: "rfid-01-nfc-reader",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "RFID-01 NFC Reader",
    shortDescription:
      "High-precision NFC reader for driver identification and card programming in integrated fleet safety and access workflows.",
    specs: ["NFC Reader", "RS232 Upload", "< 5cm Range", "IP54"],
    specTable: {
      Sensor: "NFC reader",
      Range: "< 5 cm",
      "Card Types": "1443A, 15693",
      Interface: "Type-C, RS232 upload",
      "Ingress Protection": "IP54",
      "Operating Temperature": "-25°C to 70°C",
      Power: "DC 5V",
      "Power Consumption": "150mA working, 5mA standby",
      Feedback: "LED + buzzer (>=85dB at 10cm)",
      Dimensions: "104 x 70 x 10 mm",
      Weight: "74 g",
      Certification: "CE, FCC",
      Configurator: "Supported",
    },
    features: [
      "Supports NFC card types 1443A and 15693",
      "RS232 data upload for embedded/vehicle integrations",
      "LED + buzzer interaction feedback",
      "Low power: 5V 150mA working, 5V 5mA standby (datasheet)",
      "Type-C port",
      "Operating temperature: -25°C to 70°C",
      "Configurator support",
    ],
    useCases: [
      "Driver identity check-in and authentication",
      "Fleet safety monitoring integrations",
      "Card programming for staff access",
      "Shift start and compliance workflows",
    ],
    related: ["ai-dashcam", "ai-mdvr", "dvr-system"],
    imageSrc: "/Products/RFID reader close-up shot.png",
    imageAlt: "RFID-01 NFC reader",
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
    imageSrc: "/Products/RFID reader close-up shot.png",
    imageAlt: "TPMS sensors",
    imageClass: "catalog-card-image-sensor",
  },
  "wireless-fuel-sensor": {
    id: "wireless-fuel-sensor",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "FUEL-01 Wireless Fuel Sensor",
    shortDescription:
      "Next-gen wireless LoRa ultrasonic fuel sensor with easy installation, IP67 protection, and no drilling required for most retrofit deployments.",
    specs: ["LoRa 868/915MHz", "Ultrasonic", "IP67", "DC 9-36V"],
    specTable: {
      Sensor: "Ultrasonic fuel level",
      LoRa: "868MHz / 915MHz",
      "Ingress Protection": "IP67",
      "Detection Cycle": "3s",
      "Upload Cycle": "30s",
      Power: "DC 9-36V",
      "Power Consumption": "43.5mA working @12V, 10.72mA standby @12V",
      Interface: "Type-C",
      "Operating Temperature": "-25°C to 70°C",
      Dimensions: "85 x 53 x 24 mm",
      Weight: "200 g",
      Certification: "CE, FCC",
      Configurator: "Supported",
    },
    features: [
      "Ultrasonic fuel level detection",
      "Fast detection cycle: 3s",
      "Upload cycle: 30s",
      "Easy installation with no drilling needed (datasheet claim)",
      "Type-C port",
      "Low power: ~43.5mA working at 12V, ~10.72mA standby at 12V (datasheet)",
      "Configurator support",
    ],
    useCases: [
      "Fuel theft awareness programs",
      "Fleet fuel consumption monitoring",
      "Tank level visibility for dispatch and operations",
      "Retrofit installs where drilling is not preferred",
    ],
    related: ["fuel-sensors", "wired-fuel-level-sensor", "harness-relays"],
    imageSrc: "/Products/LoRaWAN fuel sensor device close-up.png",
    imageAlt: "Wireless fuel sensor",
    imageClass: "catalog-card-image-sensor",
  },
  "mt01-door-magnetic-sensor": {
    id: "mt01-door-magnetic-sensor",
    category: "sensors",
    categoryLabel: "Sensors",
    title: "MT01 LoRa Door Magnetic Sensor",
    shortDescription:
      "Ultra-endurance wireless LoRa door sensor for vehicle door monitoring, perimeter security, and low-maintenance fleet deployments.",
    specs: ["LoRa 868/915MHz", "Hall + Reed Sensor", "IP67", "1500mAh Battery"],
    specTable: {
      Sensor: "Door magnetic (hall + reed)",
      LoRa: "868MHz / 915MHz",
      "Ingress Protection": "IP67",
      Battery: "1500mAh",
      Power: "DC 3V",
      "Standby Current": "10uA @3V",
      "Service Life": "Up to 3 years (<=20 cycles/day, datasheet)",
      Interface: "Type-C",
      "Operating Temperature": "-20°C to 70°C",
      Dimensions: "Sensor 86.8 x 31.4 x 7.9 mm; Magnet 90 x 32 x 12.5 mm",
      Weight: "Sensor 59 g; Magnet 59 g",
      Certification: "CE, FCC",
      Configurator: "Supported",
    },
    features: [
      "Vehicle door monitoring with hall + reed sensors",
      "Service life: up to 3 years (≤ 20 cycles/day, datasheet)",
      "Very low standby power: 10uA at 3V (datasheet)",
      "IP67 environmental protection",
      "Built-in LED status indicator (red)",
      "Type-C port",
      "Easy installation with magnet block",
      "Configurator support",
    ],
    useCases: [
      "Cargo door open/close alerts",
      "Cold-chain door monitoring",
      "Perimeter security for parked vehicles",
      "Unauthorized access awareness",
    ],
    related: ["asset-tracking-device", "temperature-sensors", "4g-gps-device"],
    imageSrc: "/Products/Magnetic door sensor set close-up.png",
    imageAlt: "MT01 door magnetic sensor",
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
    imageSrc: "/Products/LoRaWAN fuel sensor device close-up.png",
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
    imageSrc: "/Products/Magnetic door sensor set close-up.png",
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
    imageSrc: "/Products/Compact black electronic device.png",
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
    imageSrc: "/Products/Compact black electronic device.png",
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
    related: ["ups-01-vehicle-ups", "4g-gps-device", "wireless-fuel-sensor", "asset-tracking-device"],
    imageSrc: "/Products/Industrial-grade UPS device with cables.png",
    imageAlt: "Industrial-grade power accessory with cables",
    imageClass: "catalog-card-image-asset",
  },
  "ups-01-vehicle-ups": {
    id: "ups-01-vehicle-ups",
    category: "accessories",
    categoryLabel: "Accessories",
    title: "UPS-01 Vehicle UPS",
    shortDescription:
      "Professional vehicle uninterruptible power supply (UPS) for uninterrupted fleet intelligence and safe shutdown during power loss events.",
    specs: ["9-36V Input", "16V Output", "LiFePO4 38.4Wh", "≤5ms Transfer"],
    specTable: {
      Application: "Emergency electrical power supply",
      "Power Input": "9-36V",
      "Power Output": "16V (without main power)",
      "Transfer Time": "<= 5ms",
      Capacity: "4000mAh @10.5V (38.4Wh), LiFePO4",
      "Max Discharge": "2.5A @16V",
      "Charging Current": "800mA",
      "Power Consumption": "245uA standby, 7mA working",
      "Battery Runtime": "16h @16V/100mA; 3.2h @16V/500mA; 1.6h @16V/1000mA",
      "Ingress Protection": "IP54",
      Protection: "Overload/short-circuit, over/under voltage",
      Interface: "Type-C",
      "Operating Temperature": "-20°C to 70°C",
      "Service Life": ">= 5 years",
      Dimensions: "109 x 80 x 50 mm",
      Weight: "550 g",
      Certification: "CE, FCC",
    },
    features: [
      "Emergency power output: 16V when main power is lost (datasheet)",
      "Wide input range: 9-36V",
      "Transfer time ≤ 5ms to keep critical devices running",
      "LiFePO4 battery: 4000mAh at 10.5V (38.4Wh, datasheet)",
      "Input protection: overload/short-circuit, over/under voltage",
      "Power failure alarm support (datasheet)",
      "Configurable discharge duration and switch status via software (datasheet)",
      "Max discharge current: 2.5A at 16V (datasheet)",
      "Low consumption: 245uA standby, 7mA working (datasheet)",
    ],
    useCases: [
      "Prevent MDVR/dashcam recording loss during engine-off events",
      "Graceful shutdown for video and telematics devices",
      "Power stability for fleet safety systems",
      "Short power-cut resilience for commercial vehicles",
    ],
    related: ["ai-mdvr", "ai-dashcam", "dvr-system", "harness-relays"],
    imageSrc: "/Products/Industrial-grade UPS device with cables.png",
    imageAlt: "UPS-01 vehicle uninterruptible power supply",
    imageClass: "catalog-card-image-asset",
  },
} satisfies Record<string, Omit<Product, "gallery">>;

const galleries: Record<string, ProductImage[]> = {
  "2g-gps-device": [
    {
      src: "/Products/Compact GPS tracker with color-coded wires.png",
      alt: "2G GPS device front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/Sleek black GPS tracker with cable.png",
      alt: "2G GPS device alternate view",
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
      src: "/Products/Sleek black GPS tracker with cable.png",
      alt: "4G GPS device front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/Compact rugged GPS tracker.png",
      alt: "4G GPS device alternate view",
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
      src: "/Products/Compact black electronic device.png",
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
      src: "/Products/DR03.png",
      alt: "AI dashcam product family hero view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/EH15-V2.png",
      alt: "Multi-channel AI dashcam hardware for commercial fleets",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/EH24.png",
      alt: "Two-channel connected dashcam hardware",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "AI dashcam hardware lineup comparison",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "mr012-ch-dashcam-for-motorcycle": [
    {
      src: "/Products/MR01.png",
      alt: "MR01 motorcycle dashcam front hardware view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "MR01 motorcycle dashcam product family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "dr033-channel-ai-dashcam": [
    {
      src: "/Products/DR03.png",
      alt: "DR03 three-channel AI dashcam front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "DR03 AI dashcam lineup and deployment family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "eh80-1-ch-aov-dash-camera": [
    {
      src: "/Products/EH21.png",
      alt: "EH80 always-on dash camera hardware view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "EH80 AOV dashcam range comparison view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "eh21-1-ch-4g-dashcam": [
    {
      src: "/Products/EH21.png",
      alt: "EH21 single-channel 4G dashcam front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "EH21 connected dashcam family lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "eh15-v2-4-ch-ai-dashcam": [
    {
      src: "/Products/EH15-V2.png",
      alt: "EH15-V2 multi-channel AI dashcam hardware view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "EH15-V2 fleet dashcam lineup comparison",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "eh03t-4-ch-ai-dashcam": [
    {
      src: "/Products/EH03T-V2.png",
      alt: "EH03T-V2 four-channel AI dashcam front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "EH03T-V2 fleet dashcam product family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "eh24-2-ch-smart-dashcam": [
    {
      src: "/Products/EH24.png",
      alt: "EH24 two-channel 4G dashcam front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "EH24 connected dashcam family lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "eh25-2-ch-4g-dashcam": [
    {
      src: "/Products/EH25.png",
      alt: "EH25 two-channel 4G dashcam front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "EH25 compact dashcam product family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "dvr-system": [
    {
      src: "/Products/Vehicle MDVR device with detailed front panel.png",
      alt: "DVR system front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/Professional MDVR with lockable cover.png",
      alt: "DVR system alternate view",
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
      src: "/Products/Professional MDVR with lockable cover.png",
      alt: "AI MDVR front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/Vehicle MDVR device with detailed front panel.png",
      alt: "AI MDVR alternate view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "AI MDVR hardware lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "ed02r-v2-4-ch-ai-powered-mdvr": [
    {
      src: "/Products/Professional MDVR with lockable cover.png",
      alt: "ED02R-V2 4-channel AI MDVR front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/Vehicle MDVR device with detailed front panel.png",
      alt: "ED02R-V2 AI MDVR alternate view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "MDVR product family lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "ed08r-8-ch-ai-powered-mdvr": [
    {
      src: "/Products/Vehicle MDVR device with detailed front panel.png",
      alt: "ED08R-V2 8-channel AI MDVR front view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/Professional MDVR with lockable cover.png",
      alt: "ED08R-V2 AI MDVR alternate view",
      imageClass: "catalog-card-image-dashcam",
    },
    {
      src: "/Products/3Products.png",
      alt: "MDVR product family lineup",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "camera-systems": [
    {
      src: "/Products/EH25.png",
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
      src: "/Products/Compact rugged GPS tracker.png",
      alt: "GPS tracker front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/Sleek black GPS tracker with cable.png",
      alt: "GPS tracker alternate view",
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
      src: "/Products/Pet tracker with LED indicator.png",
      alt: "PET tracker front view",
      imageClass: "catalog-card-image-asset",
    },
    {
      src: "/Products/Compact black electronic device.png",
      alt: "PET tracker alternate view",
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
      src: "/Products/smartwatch.png",
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
      src: "/Products/LoRaWAN fuel sensor device close-up.png",
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
      src: "/Products/Industrial temperature sensor close-up.png",
      alt: "Temperature sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Temperature sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "rfid-01-nfc-reader": [
    {
      src: "/Products/RFID reader close-up shot.png",
      alt: "RFID-01 NFC reader front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Sensor hardware family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  tpms: [
    {
      src: "/Products/RFID reader close-up shot.png",
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
      src: "/Products/LoRaWAN fuel sensor device close-up.png",
      alt: "Wireless fuel sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Wireless fuel sensor family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "mt01-door-magnetic-sensor": [
    {
      src: "/Products/Magnetic door sensor set close-up.png",
      alt: "MT01 door magnetic sensor front view",
      imageClass: "catalog-card-image-sensor",
    },
    {
      src: "/Products/3Products.png",
      alt: "Sensor hardware family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "wired-fuel-level-sensor": [
    {
      src: "/Products/LoRaWAN fuel sensor device close-up.png",
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
      src: "/Products/Magnetic door sensor set close-up.png",
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
      src: "/Products/Compact black electronic device.png",
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
      src: "/Products/Compact black electronic device.png",
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
      src: "/Products/Rugged GPS tracking device close-up The Datasheet of EG01G.png",
      alt: "Harness and relays front view",
      imageClass: "catalog-card-image-gps",
    },
    {
      src: "/Products/Industrial-grade UPS device with cables.png",
      alt: "Industrial-grade power accessory with cables",
      imageClass: "catalog-card-image-asset",
    },
    {
      src: "/Products/3Products.png",
      alt: "Harness and relays hardware family view",
      imageClass: "catalog-card-image-dashcam",
    },
  ],
  "ups-01-vehicle-ups": [
    {
      src: "/Products/Industrial-grade UPS device with cables.png",
      alt: "UPS-01 vehicle UPS front view",
      imageClass: "catalog-card-image-asset",
    },
    {
      src: "/Products/3Products.png",
      alt: "Accessory hardware family view",
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

const tokenizeRelatedHints = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+/-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

export const getRelatedProducts = (product: Product) => {
  const explicitRelated = product.related.filter(Boolean);
  const explicitIndex = new Map(explicitRelated.map((id, index) => [id, index]));
  const explicitSet = new Set(explicitRelated);
  const baseTokens = new Set(
    [
      ...tokenizeRelatedHints(product.title),
      ...tokenizeRelatedHints(product.categoryLabel),
      ...product.specs.flatMap((spec) => tokenizeRelatedHints(spec)),
    ].filter(Boolean),
  );

  const scored = productOrder
    .filter((id) => id !== product.id)
    .map((id) => {
      const candidate = products[id];

      if (!candidate) {
        return { id, score: -1 };
      }

      let score = 0;
      const explicitRank = explicitIndex.get(id);

      if (explicitRank !== undefined) {
        // Preserve intentional ordering while still letting the scorer fill gaps smartly.
        score += 1000 - explicitRank;
      }

      if (candidate.category === product.category) {
        score += 80;
      }

      if (candidate.categoryLabel === product.categoryLabel) {
        score += 20;
      }

      const candidateTokens = [
        ...tokenizeRelatedHints(candidate.title),
        ...candidate.specs.flatMap((spec) => tokenizeRelatedHints(spec)),
      ];

      candidateTokens.forEach((token) => {
        if (baseTokens.has(token)) {
          score += 8;
        }
      });

      // Keep explicit related items ahead even when text similarity is low.
      if (explicitSet.has(id)) {
        score += 40;
      }

      return { id, score };
    })
    .filter((item) => item.score >= 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.id.localeCompare(b.id);
    });

  return scored.slice(0, 3).map((item) => products[item.id]).filter(Boolean);
};
