"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getProductById,
  productSummaryLabels,
  type ProductCategory,
} from "@/data/products";
import { footerEditorialContent } from "@/lib/content/footer";
import {
  architectureContent,
  buyingPrioritiesContent,
  fieldUseCasesContent,
  hardwareEcosystemContent,
  heroContent,
  homeIndustriesContent,
  homepageMetrics,
  homepageSupportContent,
  homepageTrustContent,
  resultsContent,
  type HomepageArchitectureLayer,
  type HomepageHardwareCard,
  type HomepageIndustryCard,
  type HomepageIndustryFeature,
  type HomepageMetric,
  type HomepageOutcome,
  type HomepageProofArea,
  type HomepageSupportCard,
  type HomepageTrustReview,
  type HomepageTrustStat,
} from "@/lib/content/homepage";
import {
  solutionsMenuColumns,
  solutionsMenuFeaturedPanel,
  type NavigationColumn,
} from "@/lib/content/navigation";
import { solutionsList, type SolutionDetail } from "@/lib/solutions";
import { SITE_STORE_KEY, SSR_THEME_FALLBACK } from "@/lib/theme";

export type AuthUser = {
  id: string;
  isAuthenticated: true;
  name: string;
  email: string;
  role: "admin" | "user";
  roleLabel: string;
  company: string;
  phone: string;
  gender: "male" | "female";
  avatarUrl: string;
};

export type CartItem = {
  id: string;
  quantity: number;
};

export type CheckoutSelection = {
  mode: "buy-now" | "cart";
  items: CartItem[];
} | null;

export type SignUpPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
};

export type SiteRegion = "Pakistan" | "UAE" | "UK" | "USA";
export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";
export type InlineCmsSectionId =
  | "homepage.hero"
  | "homepage.buying-priorities"
  | "homepage.story"
  | "homepage.architecture"
  | "homepage.industries"
  | "homepage.hardware"
  | "homepage.trust"
  | "homepage.results"
  | "homepage.support"
  | "footer.editorial"
  | "solutions.catalog"
  | "navigation.solutions-menu"
  | `solutions.detail.${string}`
  | `solutions.detail.${string}.${string}`;

type InlineCmsHeroDraft = {
  visible: boolean;
  heading: [string, string, string];
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustLine: string;
  backgroundImageSrc: string;
  imageSrc: string;
  imageAlt: string;
  metrics: Array<Pick<HomepageMetric, "title" | "description">>;
};

type InlineCmsSimpleSectionDraft = {
  visible: boolean;
  eyebrow: string;
  heading: string;
  description: string;
};

type InlineCmsBuyingPrioritiesDraft = InlineCmsSimpleSectionDraft & {
  proofAreas: HomepageProofArea[];
};

type InlineCmsStoryDraft = InlineCmsSimpleSectionDraft & {
  videoCard: {
    title: string;
    description: string;
    ctaLabel: string;
    videoSrc: string;
    posterSrc: string;
  };
  imageCard: {
    title: string;
    description: string;
    ctaLabel: string;
    imageSrc: string;
    imageAlt: string;
  };
};

type InlineCmsArchitectureDraft = InlineCmsSimpleSectionDraft & {
  layers: HomepageArchitectureLayer[];
};

type InlineCmsIndustriesDraft = InlineCmsSimpleSectionDraft & {
  featuredImageSrc: string;
  featuredImageAlt: string;
  featuredMicroLabel: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredCapabilities: string[];
  featuredFeatureItems: Array<Pick<HomepageIndustryFeature, "label" | "text">>;
  featuredCtaLabel: string;
  stackIntroLabel: string;
  stackIntroDescription: string;
  stackCards: Array<Pick<HomepageIndustryCard, "microLabel" | "title" | "description" | "href">>;
};

type InlineCmsResultsDraft = {
  visible: boolean;
  eyebrow: string;
  heading: [string, string];
  description: string;
  outcomes: HomepageOutcome[];
};

type InlineCmsTrustDraft = InlineCmsSimpleSectionDraft & {
  stats: HomepageTrustStat[];
  reviews: HomepageTrustReview[];
};

type InlineCmsHardwareCardContentDraft = Pick<
  HomepageHardwareCard,
  "category" | "title" | "specs" | "description" | "href"
> & {
  bullets: string[];
};

type InlineCmsSupportCardDraft = Pick<
  HomepageSupportCard,
  "title" | "description" | "value" | "href"
>;

type InlineCmsFooterDraft = {
  visible: boolean;
  eyebrow: string;
  heading: string;
  description: string;
  contactEmail: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

type InlineCmsSolutionsCatalogDraft = {
  visible: boolean;
  heroHeadline: string;
  heroBenefit: string;
  heroCtaLabel: string;
  heroImageSrc: string;
  platformEyebrow: string;
  platformHeading: string;
  platformDescription: string;
  resultsEyebrow: string;
  resultsHeading: string;
  resultsCards: Array<{ value: string; label: string; detail: string }>;
  featuredEyebrow: string;
  featuredHeading: string;
  featuredDescription: string;
  libraryEyebrow: string;
  libraryHeading: string;
  browseEyebrow: string;
  browseHeading: string;
  browseDescription: string;
  bottomCtaEyebrow: string;
  bottomCtaHeading: string;
  bottomCtaDescription: string;
  bottomCtaPrimaryLabel: string;
  bottomCtaSecondaryLabel: string;
};

type InlineCmsSolutionsMenuDraft = {
  columns: NavigationColumn[];
  featuredPanel: {
    label: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    footerCtaLabel: string;
    footerCtaHref: string;
  };
};

type InlineCmsDrafts = {
  homepageHero: InlineCmsHeroDraft;
  homepageBuyingPriorities: InlineCmsBuyingPrioritiesDraft;
  homepageStory: InlineCmsStoryDraft;
  homepageArchitecture: InlineCmsArchitectureDraft;
  homepageIndustries: InlineCmsIndustriesDraft;
  homepageHardware: InlineCmsSimpleSectionDraft & {
    ctaLabel: string;
    cardButtonLabel: string;
    cardMedia: Array<{ imageSrc: string; imageAlt: string }>;
    cardContent: InlineCmsHardwareCardContentDraft[];
  };
  homepageTrust: InlineCmsTrustDraft;
  homepageResults: InlineCmsResultsDraft;
  homepageSupport: InlineCmsSimpleSectionDraft & {
    cards: InlineCmsSupportCardDraft[];
  };
  footerEditorial: InlineCmsFooterDraft;
  solutionsCatalog: InlineCmsSolutionsCatalogDraft;
  solutionsMenu: InlineCmsSolutionsMenuDraft;
  solutionDetails: Record<string, SolutionDetail>;
};

type FleetSummary = {
  totalDevices: number;
  groups: Record<ProductCategory, number>;
};

type CheckoutContext = {
  mode: "buy-now" | "cart";
  items: CartItem[];
};

type StoreState = {
  themeMode: ThemeMode;
  region: SiteRegion | null;
  authUser: AuthUser | null;
  authResolved: boolean;
  cmsEditMode: boolean;
  cmsPreviewMode: boolean;
  cmsActiveSection: InlineCmsSectionId | null;
  cmsDrafts: InlineCmsDrafts;
  cart: CartItem[];
  wishlist: string[];
  checkoutSelection: CheckoutSelection;
  toastMessage: string;
  toastVisible: boolean;
  toggleTheme: () => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setRegion: (region: SiteRegion) => void;
  setAuthUser: (user: AuthUser | null) => void;
  clearAuthUser: () => void;
  toggleCmsEditMode: () => void;
  setCmsEditMode: (enabled: boolean) => void;
  openCmsSection: (sectionId: InlineCmsSectionId) => void;
  closeCmsSection: () => void;
  updateCmsDraft: <TSection extends keyof InlineCmsDrafts>(
    section: TSection,
    patch: Partial<InlineCmsDrafts[TSection]>,
  ) => void;
  saveCmsDraft: () => void;
  enterCmsPreview: () => void;
  publishCmsDraft: () => void;
  toggleWishlist: (productId: string) => boolean;
  addToCart: (productId: string) => void;
  quickAddToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  startImmediateCheckout: (productId: string) => void;
  startCartCheckout: () => void;
  updateCheckoutQuantity: (productId: string, delta: number) => void;
  removeFromCheckout: (productId: string) => void;
  completeCheckout: () => void;
  getCheckoutContext: () => CheckoutContext;
  getFleetSummary: (items: CartItem[]) => FleetSummary;
  showToast: (message: string) => void;
};

let toastTimeout: ReturnType<typeof setTimeout> | null = null;
const defaultHeroBackgroundImageSrc =
  "https://res.cloudinary.com/dj7zo10jf/image/upload/f_auto,q_auto/v1775771763/trackfleetio/Images/hero-bgg.png";

const defaultCmsDrafts: InlineCmsDrafts = {
  homepageHero: {
    visible: true,
    heading: [...heroContent.heading] as [string, string, string],
    description: heroContent.description,
    primaryCtaLabel: heroContent.primaryCta.label,
    secondaryCtaLabel: heroContent.secondaryCta.label,
    trustLine: heroContent.trustLine,
    backgroundImageSrc: defaultHeroBackgroundImageSrc,
    imageSrc: heroContent.image.src,
    imageAlt: heroContent.image.alt,
    metrics: homepageMetrics.map((metric) => ({
      title: metric.title,
      description: metric.description,
    })),
  },
  homepageBuyingPriorities: {
    visible: true,
    eyebrow: buyingPrioritiesContent.eyebrow,
    heading: buyingPrioritiesContent.heading,
    description: buyingPrioritiesContent.description,
    proofAreas: buyingPrioritiesContent.proofAreas.map((area) => ({ ...area })),
  },
  homepageStory: {
    visible: true,
    eyebrow: fieldUseCasesContent.eyebrow,
    heading: fieldUseCasesContent.heading,
    description: fieldUseCasesContent.description,
    videoCard: {
      title: fieldUseCasesContent.cards[0].title,
      description: fieldUseCasesContent.cards[0].description,
      ctaLabel: fieldUseCasesContent.cards[0].ctaLabel,
      videoSrc: "/Products/Video 1.mp4",
      posterSrc: "/Products/DR03.png",
    },
    imageCard: {
      title: fieldUseCasesContent.cards[1].title,
      description: fieldUseCasesContent.cards[1].description,
      ctaLabel: fieldUseCasesContent.cards[1].ctaLabel,
      imageSrc: fieldUseCasesContent.cards[1].imageSrc ?? "",
      imageAlt: fieldUseCasesContent.cards[1].imageAlt ?? "",
    },
  },
  homepageArchitecture: {
    visible: true,
    eyebrow: architectureContent.eyebrow,
    heading: architectureContent.heading,
    description: architectureContent.description,
    layers: architectureContent.layers.map((layer) => ({ ...layer })),
  },
  homepageIndustries: {
    visible: true,
    eyebrow: homeIndustriesContent.eyebrow,
    heading: homeIndustriesContent.heading,
    description: homeIndustriesContent.description,
    featuredImageSrc: homeIndustriesContent.featured.imageSrc,
    featuredImageAlt: homeIndustriesContent.featured.imageAlt,
    featuredMicroLabel: homeIndustriesContent.featured.microLabel,
    featuredTitle: homeIndustriesContent.featured.title,
    featuredDescription: homeIndustriesContent.featured.description,
    featuredCapabilities: [...homeIndustriesContent.featured.keyCapabilities],
    featuredFeatureItems: homeIndustriesContent.featured.featureItems.map((item) => ({
      label: item.label,
      text: item.text,
    })),
    featuredCtaLabel: "Explore Industry",
    stackIntroLabel: "Operating Environments",
    stackIntroDescription:
      "Choose the industry lens that matches the fleet workflow you want to explore.",
    stackCards: homeIndustriesContent.stackCards.map((card) => ({
      microLabel: card.microLabel,
      title: card.title,
      description: card.description,
      href: card.href,
    })),
  },
  homepageHardware: {
    visible: true,
    eyebrow: hardwareEcosystemContent.eyebrow,
    heading: hardwareEcosystemContent.heading,
    description: hardwareEcosystemContent.description,
    ctaLabel: hardwareEcosystemContent.cta.label,
    cardButtonLabel: "View Details",
    cardMedia: hardwareEcosystemContent.cards.map((card) => ({
      imageSrc: card.imageSrc,
      imageAlt: card.imageAlt,
    })),
    cardContent: hardwareEcosystemContent.cards.map((card) => ({
      category: card.category,
      title: card.title,
      specs: card.specs,
      description: card.description,
      href: card.href,
      bullets: [...card.bullets],
    })),
  },
  homepageTrust: {
    visible: true,
    eyebrow: homepageTrustContent.eyebrow,
    heading: homepageTrustContent.heading,
    description: homepageTrustContent.description,
    stats: homepageTrustContent.stats.map((stat) => ({ ...stat })),
    reviews: homepageTrustContent.reviews.map((review) => ({ ...review })),
  },
  homepageResults: {
    visible: true,
    eyebrow: resultsContent.eyebrow,
    heading: [...resultsContent.heading] as [string, string],
    description: resultsContent.description,
    outcomes: resultsContent.outcomes.map((outcome) => ({ ...outcome })),
  },
  homepageSupport: {
    visible: true,
    eyebrow: homepageSupportContent.eyebrow,
    heading: homepageSupportContent.heading,
    description: homepageSupportContent.description,
    cards: homepageSupportContent.cards.map((card) => ({
      title: card.title,
      description: card.description,
      value: card.value,
      href: card.href,
    })),
  },
  footerEditorial: {
    visible: true,
    eyebrow: footerEditorialContent.eyebrow,
    heading: footerEditorialContent.heading,
    description: footerEditorialContent.description,
    contactEmail: footerEditorialContent.contactEmail,
    primaryCtaLabel: footerEditorialContent.primaryCta.label,
    secondaryCtaLabel: footerEditorialContent.secondaryCta.label,
  },
  solutionsCatalog: {
    visible: true,
    heroHeadline: "Get complete visibility and control across fleet operations.",
    heroBenefit:
      "Compare the highest-impact solution paths first, then move into the workflow and hardware fit that closes delays, losses, and blind spots.",
    heroCtaLabel: "Book live demo",
    heroImageSrc: "/Images/Banner-size.png",
    platformEyebrow: "See It In Action",
    platformHeading: "Bring routes, dashboards, and field visibility into one story.",
    platformDescription:
      "Premium solution pages should feel visual first. Show the buyer the operating environment, then explain the workflow underneath it.",
    resultsEyebrow: "Proven Results",
    resultsHeading: "Operational impact should feel immediate, not buried in copy.",
    resultsCards: [
      { value: "30%", label: "less avoidable fuel waste", detail: "after route and usage visibility improve" },
      { value: "25%", label: "faster operational response", detail: "when alerts and workflows are connected" },
      { value: "24/7", label: "live fleet awareness", detail: "across routes, assets, and exceptions" },
    ],
    featuredEyebrow: "Our Core Solutions",
    featuredHeading: "Start with the solution paths buyers usually evaluate first.",
    featuredDescription:
      "Lead with strong visual anchors, then move into the workflow and hardware fit that closes the gap.",
    libraryEyebrow: "Solution Library",
    libraryHeading: "Browse all workflows grouped for faster scanning.",
    browseEyebrow: "Start Here",
    browseHeading: "Start from your problem, then narrow the best-fit path.",
    browseDescription:
      "Choose a common operational need. We will narrow the library without hiding anything.",
    bottomCtaEyebrow: "Ready To Shortlist?",
    bottomCtaHeading: "Book a live walkthrough and see the right solution path first.",
    bottomCtaDescription:
      "Share the vehicles, assets, or operating issue you need to control. We will recommend the right workflow, hardware stack, and rollout starting point.",
    bottomCtaPrimaryLabel: "Book live demo",
    bottomCtaSecondaryLabel: "See hardware fit",
  },
  solutionsMenu: {
    columns: solutionsMenuColumns.map((column) => ({
      ...column,
      links: column.links.map((link) => ({ ...link })),
      preview: { ...column.preview },
    })),
    featuredPanel: { ...solutionsMenuFeaturedPanel },
  },
  solutionDetails: Object.fromEntries(
    solutionsList.map((solution) => [
      solution.slug,
      {
        ...solution,
        challenges: solution.challenges.map((challenge) => ({ ...challenge })),
        hardware: solution.hardware.map((hardware) => ({ ...hardware })),
        useCases: solution.useCases.map((useCase) => ({ ...useCase })),
      },
    ]),
  ),
};

const createFleetSummary = (items: CartItem[]): FleetSummary => {
  const summary: FleetSummary = {
    totalDevices: 0,
    groups: {
      tracking: 0,
      video: 0,
      sensors: 0,
      accessories: 0,
    },
  };

  items.forEach((item) => {
    const product = getProductById(item.id);

    if (!product) {
      return;
    }

    summary.totalDevices += item.quantity;
    summary.groups[product.category] += item.quantity;
  });

  return summary;
};

const syncCheckoutSelectionFromCart = (
  currentSelection: CheckoutSelection,
  nextCart: CartItem[],
): CheckoutSelection => {
  if (!currentSelection || currentSelection.mode !== "cart") {
    return currentSelection;
  }

  if (!nextCart.length) {
    return null;
  }

  return {
    mode: "cart",
    items: nextCart,
  };
};

export const normalizeAuthUser = (user: unknown): AuthUser | null => {
  if (!user || typeof user !== "object") {
    return null;
  }

  const candidate = user as Record<string, unknown>;

  if (typeof candidate.email !== "string") {
    return null;
  }

  const role = candidate.role === "admin" || candidate.type === "admin" ? "admin" : "user";

  return {
    id: typeof candidate.id === "string" ? candidate.id : "",
    isAuthenticated: true,
    name:
      typeof candidate.name === "string" && candidate.name.trim()
        ? candidate.name
        : "Track Fleetio User",
    email: candidate.email,
    role,
    roleLabel:
      typeof candidate.roleLabel === "string" && candidate.roleLabel.trim()
        ? candidate.roleLabel
        : role === "admin"
          ? "Super Admin"
          : "Fleet Operations",
    company: typeof candidate.company === "string" ? candidate.company : "",
    phone: typeof candidate.phone === "string" ? candidate.phone : "",
    gender: candidate.gender === "female" ? "female" : "male",
    avatarUrl:
      typeof candidate.avatarUrl === "string"
        ? candidate.avatarUrl
        : typeof candidate.profilePhotoUrl === "string"
          ? candidate.profilePhotoUrl
          : "",
  };
};

export const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {
    return SSR_THEME_FALLBACK;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const resolveThemeMode = (
  themeMode: ThemeMode,
  systemTheme: ResolvedTheme,
): ResolvedTheme => (themeMode === "system" ? systemTheme : themeMode);

export const getNextThemeMode = (
  themeMode: ThemeMode,
  systemTheme: ResolvedTheme,
): Exclude<ThemeMode, "system"> => {
  const activeTheme = resolveThemeMode(themeMode, systemTheme);

  return activeTheme === "dark" ? "light" : "dark";
};

const normalizeThemeMode = (themeMode: unknown, legacyTheme?: unknown): ThemeMode => {
  if (themeMode === "light" || themeMode === "dark" || themeMode === "system") {
    return themeMode;
  }

  if (legacyTheme === "light" || legacyTheme === "dark") {
    return legacyTheme;
  }

  return "system";
};

const normalizeRegion = (region: unknown): SiteRegion | null =>
  region === "Pakistan" || region === "UAE" || region === "UK" || region === "USA"
    ? region
    : null;

const mergeList = <T extends Record<string, unknown>>(
  defaults: T[],
  persistedList?: Array<Partial<T>>,
): T[] => defaults.map((item, index) => ({ ...item, ...(persistedList?.[index] ?? {}) }));

const mergeCmsDrafts = (
  persistedDrafts?: Partial<InlineCmsDrafts>,
): InlineCmsDrafts => {
  const persisted = persistedDrafts ?? {};
  const hero = persisted.homepageHero;
  const buyingPriorities = persisted.homepageBuyingPriorities;
  const story = persisted.homepageStory;
  const architecture = persisted.homepageArchitecture;
  const industries = persisted.homepageIndustries;
  const hardware = persisted.homepageHardware;
  const trust = persisted.homepageTrust;
  const results = persisted.homepageResults;
  const support = persisted.homepageSupport;
  const footer = persisted.footerEditorial;
  const solutionsCatalog = persisted.solutionsCatalog;
  const solutionsMenu = persisted.solutionsMenu;

  return {
    ...defaultCmsDrafts,
    ...persisted,
    homepageHero: {
      ...defaultCmsDrafts.homepageHero,
      ...hero,
      heading: [
        hero?.heading?.[0] ?? defaultCmsDrafts.homepageHero.heading[0],
        hero?.heading?.[1] ?? defaultCmsDrafts.homepageHero.heading[1],
        hero?.heading?.[2] ?? defaultCmsDrafts.homepageHero.heading[2],
      ],
      metrics: mergeList(defaultCmsDrafts.homepageHero.metrics, hero?.metrics),
    },
    homepageBuyingPriorities: {
      ...defaultCmsDrafts.homepageBuyingPriorities,
      ...buyingPriorities,
      proofAreas: mergeList(
        defaultCmsDrafts.homepageBuyingPriorities.proofAreas,
        buyingPriorities?.proofAreas,
      ),
    },
    homepageStory: {
      ...defaultCmsDrafts.homepageStory,
      ...story,
      videoCard: {
        ...defaultCmsDrafts.homepageStory.videoCard,
        ...(story?.videoCard ?? {}),
      },
      imageCard: {
        ...defaultCmsDrafts.homepageStory.imageCard,
        ...(story?.imageCard ?? {}),
      },
    },
    homepageArchitecture: {
      ...defaultCmsDrafts.homepageArchitecture,
      ...architecture,
      layers: mergeList(defaultCmsDrafts.homepageArchitecture.layers, architecture?.layers),
    },
    homepageIndustries: {
      ...defaultCmsDrafts.homepageIndustries,
      ...industries,
      featuredCapabilities: defaultCmsDrafts.homepageIndustries.featuredCapabilities.map(
        (capability, index) => industries?.featuredCapabilities?.[index] ?? capability,
      ),
      featuredFeatureItems: mergeList(
        defaultCmsDrafts.homepageIndustries.featuredFeatureItems,
        industries?.featuredFeatureItems,
      ),
      stackCards: mergeList(
        defaultCmsDrafts.homepageIndustries.stackCards,
        industries?.stackCards,
      ),
    },
    homepageHardware: {
      ...defaultCmsDrafts.homepageHardware,
      ...hardware,
      cardMedia: mergeList(defaultCmsDrafts.homepageHardware.cardMedia, hardware?.cardMedia),
      cardContent: defaultCmsDrafts.homepageHardware.cardContent.map((card, index) => {
        const persistedCard = hardware?.cardContent?.[index];

        return {
          ...card,
          ...(persistedCard ?? {}),
          bullets: card.bullets.map(
            (bullet, bulletIndex) => persistedCard?.bullets?.[bulletIndex] ?? bullet,
          ),
        };
      }),
    },
    homepageTrust: {
      ...defaultCmsDrafts.homepageTrust,
      ...trust,
      stats: mergeList(defaultCmsDrafts.homepageTrust.stats, trust?.stats),
      reviews: mergeList(defaultCmsDrafts.homepageTrust.reviews, trust?.reviews),
    },
    homepageResults: {
      ...defaultCmsDrafts.homepageResults,
      ...results,
      heading: [
        results?.heading?.[0] ?? defaultCmsDrafts.homepageResults.heading[0],
        results?.heading?.[1] ?? defaultCmsDrafts.homepageResults.heading[1],
      ],
      outcomes: mergeList(defaultCmsDrafts.homepageResults.outcomes, results?.outcomes),
    },
    homepageSupport: {
      ...defaultCmsDrafts.homepageSupport,
      ...support,
      cards: mergeList(defaultCmsDrafts.homepageSupport.cards, support?.cards),
    },
    footerEditorial: {
      ...defaultCmsDrafts.footerEditorial,
      ...(footer ?? {}),
    },
    solutionsCatalog: {
      ...defaultCmsDrafts.solutionsCatalog,
      ...(solutionsCatalog ?? {}),
      resultsCards: mergeList(
        defaultCmsDrafts.solutionsCatalog.resultsCards,
        solutionsCatalog?.resultsCards,
      ),
    },
    solutionsMenu: {
      ...defaultCmsDrafts.solutionsMenu,
      ...(solutionsMenu ?? {}),
      columns: defaultCmsDrafts.solutionsMenu.columns.map((column, index) => {
        const persistedColumn = solutionsMenu?.columns?.[index];

        return {
          ...column,
          ...(persistedColumn ?? {}),
          links: mergeList(column.links, persistedColumn?.links),
          preview: {
            ...column.preview,
            ...(persistedColumn?.preview ?? {}),
          },
        };
      }),
      featuredPanel: {
        ...defaultCmsDrafts.solutionsMenu.featuredPanel,
        ...(solutionsMenu?.featuredPanel ?? {}),
      },
    },
  };
};

export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      themeMode: "system",
      region: null,
      authUser: null,
      authResolved: false,
      cmsEditMode: false,
      cmsPreviewMode: false,
      cmsActiveSection: null,
      cmsDrafts: defaultCmsDrafts,
      cart: [],
      wishlist: [],
      checkoutSelection: null,
      toastMessage: "",
      toastVisible: false,
      toggleTheme: () => {
        set((state) => ({
          themeMode: getNextThemeMode(state.themeMode, getSystemTheme()),
        }));
      },
      setThemeMode: (themeMode) => {
        set({ themeMode });
      },
      setRegion: (region) => {
        set({ region });
      },
      setAuthUser: (user) => {
        set({
          authUser: normalizeAuthUser(user),
          authResolved: true,
        });
      },
      clearAuthUser: () => {
        set({
          authUser: null,
          authResolved: true,
        });
      },
      toggleCmsEditMode: () => {
        set((state) => ({
          cmsEditMode: !state.cmsEditMode,
          cmsPreviewMode: state.cmsEditMode ? false : state.cmsPreviewMode,
          cmsActiveSection: state.cmsEditMode ? null : state.cmsActiveSection,
        }));
      },
      setCmsEditMode: (enabled) => {
        set({
          cmsEditMode: enabled,
          cmsPreviewMode: enabled ? get().cmsPreviewMode : false,
          cmsActiveSection: enabled ? get().cmsActiveSection : null,
        });
      },
      openCmsSection: (sectionId) => {
        set({
          cmsEditMode: true,
          cmsActiveSection: sectionId,
        });
      },
      closeCmsSection: () => {
        set({ cmsActiveSection: null });
      },
      updateCmsDraft: (section, patch) => {
        set((state) => ({
          cmsDrafts: {
            ...state.cmsDrafts,
            [section]: {
              ...state.cmsDrafts[section],
              ...patch,
            },
          },
          cmsPreviewMode: false,
        }));
      },
      saveCmsDraft: () => {
        get().showToast("Draft saved");
      },
      enterCmsPreview: () => {
        set({ cmsPreviewMode: true });
        get().showToast("Preview updated");
      },
      publishCmsDraft: () => {
        set({ cmsPreviewMode: false, cmsActiveSection: null, cmsEditMode: false });
        get().showToast("Changes marked ready to publish");
      },
      toggleWishlist: (productId) => {
        let isSaved = false;

        set((state) => {
          const nextWishlist = [...state.wishlist];
          const existingIndex = nextWishlist.indexOf(productId);
          isSaved = existingIndex === -1;

          if (isSaved) {
            nextWishlist.push(productId);
          } else {
            nextWishlist.splice(existingIndex, 1);
          }

          return {
            wishlist: nextWishlist,
          };
        });

        get().showToast(isSaved ? "Saved to wishlist" : "Removed from wishlist");
        return isSaved;
      },
      addToCart: (productId) => {
        set((state) => {
          const nextCart = [...state.cart];
          const existingItem = nextCart.find((item) => item.id === productId);

          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            nextCart.push({ id: productId, quantity: 1 });
          }

          return {
            cart: nextCart,
            checkoutSelection: syncCheckoutSelectionFromCart(
              state.checkoutSelection,
              nextCart,
            ),
          };
        });
      },
      quickAddToCart: (productId) => {
        get().addToCart(productId);
        get().showToast("Added to cart");
      },
      removeFromCart: (productId) => {
        set((state) => {
          const nextCart = state.cart.filter((item) => item.id !== productId);

          return {
            cart: nextCart,
            checkoutSelection: syncCheckoutSelectionFromCart(
              state.checkoutSelection,
              nextCart,
            ),
          };
        });
      },
      updateCartQuantity: (productId, delta) => {
        set((state) => {
          const nextCart = state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          );

          return {
            cart: nextCart,
            checkoutSelection: syncCheckoutSelectionFromCart(
              state.checkoutSelection,
              nextCart,
            ),
          };
        });
      },
      startImmediateCheckout: (productId) => {
        set({
          checkoutSelection: {
            mode: "buy-now",
            items: [{ id: productId, quantity: 1 }],
          },
        });
      },
      startCartCheckout: () => {
        const cart = get().cart;

        if (!cart.length) {
          return;
        }

        set({
          checkoutSelection: {
            mode: "cart",
            items: cart,
          },
        });
      },
      updateCheckoutQuantity: (productId, delta) => {
        const checkoutContext = get().getCheckoutContext();

        if (checkoutContext.mode === "cart") {
          get().updateCartQuantity(productId, delta);
          return;
        }

        set((state) => {
          if (!state.checkoutSelection || state.checkoutSelection.mode !== "buy-now") {
            return state;
          }

          return {
            checkoutSelection: {
              ...state.checkoutSelection,
              items: state.checkoutSelection.items.map((item) =>
                item.id === productId
                  ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                  : item,
              ),
            },
          };
        });
      },
      removeFromCheckout: (productId) => {
        const checkoutContext = get().getCheckoutContext();

        if (checkoutContext.mode === "cart") {
          get().removeFromCart(productId);
          return;
        }

        set((state) => {
          if (!state.checkoutSelection || state.checkoutSelection.mode !== "buy-now") {
            return state;
          }

          const nextItems = state.checkoutSelection.items.filter(
            (item) => item.id !== productId,
          );

          return {
            checkoutSelection: nextItems.length
              ? {
                  ...state.checkoutSelection,
                  items: nextItems,
                }
              : null,
          };
        });
      },
      completeCheckout: () => {
        const checkoutContext = get().getCheckoutContext();

        if (checkoutContext.mode === "cart") {
          set({
            cart: [],
            checkoutSelection: null,
          });
          return;
        }

        set({ checkoutSelection: null });
      },
      getCheckoutContext: () => {
        const { cart, checkoutSelection } = get();

        if (
          checkoutSelection?.mode === "buy-now" &&
          checkoutSelection.items.length
        ) {
          return checkoutSelection;
        }

        return {
          mode: "cart",
          items: checkoutSelection?.mode === "cart" ? cart : cart,
        };
      },
      getFleetSummary: (items) => createFleetSummary(items),
      showToast: (message) => {
        if (toastTimeout) {
          clearTimeout(toastTimeout);
        }

        set({
          toastMessage: message,
          toastVisible: true,
        });

        toastTimeout = setTimeout(() => {
          set({ toastVisible: false });
        }, 1800);
      },
    }),
    {
      name: SITE_STORE_KEY,
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        region: state.region,
        cmsDrafts: state.cmsDrafts,
        cart: state.cart,
        wishlist: state.wishlist,
        checkoutSelection: state.checkoutSelection,
      }),
      merge: (persistedState, currentState) => {
        const typedState = (persistedState ?? {}) as Partial<StoreState>;
        const legacyState = typedState as Partial<StoreState> & { theme?: unknown };
        const currentCart = Array.isArray(currentState.cart) ? currentState.cart : [];
        const persistedCart = Array.isArray(typedState.cart) ? typedState.cart : null;
        const currentWishlist = Array.isArray(currentState.wishlist) ? currentState.wishlist : [];
        const persistedWishlist = Array.isArray(typedState.wishlist) ? typedState.wishlist : null;

        return {
          ...currentState,
          ...typedState,
          themeMode: normalizeThemeMode(typedState.themeMode, legacyState.theme),
          region: normalizeRegion(typedState.region),
          authUser: null,
          authResolved: false,
          cmsEditMode: false,
          cmsPreviewMode: false,
          cmsActiveSection: null,
          cmsDrafts: mergeCmsDrafts(typedState.cmsDrafts),
          cart: currentCart.length ? currentCart : (persistedCart ?? currentState.cart),
          wishlist: currentWishlist.length
            ? currentWishlist
            : (persistedWishlist ?? currentState.wishlist),
          checkoutSelection:
            currentState.checkoutSelection ?? typedState.checkoutSelection ?? currentState.checkoutSelection,
        };
      },
    },
  ),
);

export const useStoreHydrated = () => {
  const persistApi = useAppStore.persist;
  // Always start with `false` to ensure server + client initial render match.
  // Persist hydration can complete before React mounts on the client, so we sync in `useEffect`.
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (!persistApi) {
      return;
    }

    let hydrationTimeout: number | null = null;

    const unsubscribeHydrate = persistApi.onHydrate(() => {
      setHasHydrated(false);
    });
    const unsubscribeFinishHydration = persistApi.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // If hydration already finished before this effect runs, sync immediately.
    hydrationTimeout = window.setTimeout(() => {
      setHasHydrated(persistApi.hasHydrated());
    }, 0);

    return () => {
      if (hydrationTimeout !== null) {
        window.clearTimeout(hydrationTimeout);
      }

      unsubscribeHydrate();
      unsubscribeFinishHydration();
    };
  }, [persistApi]);

  return hasHydrated;
};

export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => {
    if (typeof document !== "undefined") {
      const domTheme = document.documentElement.dataset.theme;

      if (domTheme === "light" || domTheme === "dark") {
        return domTheme;
      }
    }

    return getSystemTheme();
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    syncTheme();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncTheme);
    } else {
      mediaQuery.addListener(syncTheme);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncTheme);
      } else {
        mediaQuery.removeListener(syncTheme);
      }
    };
  }, []);

  return systemTheme;
};

export const useFleetSummaryRows = (items: CartItem[]) => {
  const getFleetSummary = useAppStore((state) => state.getFleetSummary);
  const summary = getFleetSummary(items);

  return Object.entries(summary.groups)
    .filter(([, count]) => count > 0)
    .map(([key, count]) => ({
      label: productSummaryLabels[key as ProductCategory],
      count,
    }));
};







