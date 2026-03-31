"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import { useAppStore, useStoreHydrated } from "@/store/store";

type MenuKey = "products" | "solutions" | "industries" | "company";
type ViewTransitionHandle = {
  ready: Promise<void>;
};
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

const getProductsSearchHref = (query: string) => `/products?q=${encodeURIComponent(query)}`;
const menuKeys: MenuKey[] = ["products", "solutions", "industries", "company"];

const productColumns = [
  {
    label: "Tracking Devices",
    links: [
      { title: "2G GPS Devices", href: getProductsSearchHref("2G GPS Device") },
      { title: "4G GPS Devices", href: getProductsSearchHref("4G GPS Device") },
      { title: "Asset Trackers", href: getProductsSearchHref("Asset Tracking Device") },
    ],
  },
  {
    label: "Video Telematics",
    links: [
      { title: "AI Dashcams", href: getProductsSearchHref("AI Dashcam") },
      { title: "DVR Systems", href: getProductsSearchHref("DVR System") },
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

const solutionColumns = [
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

const industryLinks = [
  { title: "Transportation", href: "/industries/transportation" },
  { title: "Logistics", href: "/industries/logistics" },
  { title: "Construction", href: "/industries/construction" },
  { title: "Manufacturing", href: "/industries/manufacturing" },
  { title: "Farming", href: "/industries/farming" },
  { title: "Public Transport", href: "/industries/public-transport" },
];

const companyLinks = [
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Partners", href: "/partners" },
  { title: "Contact", href: "/contact" },
];

const menuDefinitions = [
  { key: "products", label: "Products", panelClassName: "nav-menu nav-menu-mega" },
  { key: "solutions", label: "Solutions", panelClassName: "nav-menu nav-menu-mega" },
  { key: "industries", label: "Industries", panelClassName: "nav-menu nav-menu-structured" },
  { key: "company", label: "Company", panelClassName: "nav-menu nav-menu-simple" },
] as const satisfies ReadonlyArray<{
  key: MenuKey;
  label: string;
  panelClassName: string;
}>;

const getCurrentSection = (pathname: string) => {
  if (pathname.startsWith("/solutions")) {
    return "solutions";
  }

  if (
    pathname.startsWith("/products") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout")
  ) {
    return "products";
  }

  if (pathname.startsWith("/industries")) {
    return "industries";
  }

  if (
    pathname.startsWith("/about") ||
    pathname.startsWith("/careers") ||
    pathname.startsWith("/partners") ||
    pathname.startsWith("/contact")
  ) {
    return "company";
  }

  return "home";
};

const getUserInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "TF";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchQuery = searchParams.get("q") ?? "";
  const hasHydrated = useStoreHydrated();
  const authUser = useAppStore((state) => state.authUser);
  const clearAuthUser = useAppStore((state) => state.clearAuthUser);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const cartCount = useAppStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Hover only previews a menu while the pointer/focus stays on it.
  // Click pins a menu open until the same trigger, another trigger, or an outside click closes it.
  const [hoveredMenu, setHoveredMenu] = useState<MenuKey | null>(null);
  const [clickedMenu, setClickedMenu] = useState<MenuKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const accountRef = useRef<HTMLDivElement | null>(null);
  const themeToggleRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRefs = useRef<Record<MenuKey, HTMLButtonElement | null>>({
    products: null,
    solutions: null,
    industries: null,
    company: null,
  });
  const closeMenus = () => {
    setHoveredMenu(null);
    setClickedMenu(null);
  };

  const closeMenuNavigation = () => {
    closeMenus();
    setMobileNavOpen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 820px)");

    const syncMobileState = () => {
      const nextIsMobile = mediaQuery.matches;
      setIsMobile(nextIsMobile);

      if (!nextIsMobile) {
        setMobileNavOpen(false);
      }
    };

    syncMobileState();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMobileState);
    } else {
      mediaQuery.addListener(syncMobileState);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncMobileState);
      } else {
        mediaQuery.removeListener(syncMobileState);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", mobileNavOpen);

    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (navRef.current && !navRef.current.contains(target)) {
        closeMenus();
      }

      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }

      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountOpen(false);
      }
    };

    const onDocumentKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
        setMobileNavOpen(false);
        setSearchOpen(false);
        setAccountOpen(false);
      }
    };

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onDocumentKeydown);
    };
  }, []);

  const currentSection = getCurrentSection(pathname);
  const activeMenu = clickedMenu ?? hoveredMenu;
  const highlightedMenu =
    activeMenu ??
    (currentSection === "products" ||
    currentSection === "solutions" ||
    currentSection === "industries" ||
    currentSection === "company"
      ? currentSection
      : null);
  const resolvedAuthUser = hasHydrated ? authUser : null;
  const resolvedTheme = hasHydrated ? theme : "dark";
  const resolvedCartCount = hasHydrated ? cartCount : 0;
  const nextThemeLabel = resolvedTheme === "light" ? "dark" : "light";
  const currentSearchValue = searchOpen ? searchDraft : currentSearchQuery;

  const focusMenuButton = (menuKey: MenuKey) => {
    menuButtonRefs.current[menuKey]?.focus();
  };

  const focusFirstMenuItem = (menuKey: MenuKey) => {
    const panel = document.getElementById(`nav-menu-${menuKey}`);
    const firstInteractiveElement = panel?.querySelector<HTMLElement>("a[href], button:not([disabled])");

    firstInteractiveElement?.focus();
  };

  const openMenuByHover = (menuKey: MenuKey) => {
    if (isMobile || clickedMenu) {
      return;
    }

    setHoveredMenu(menuKey);
  };

  const openMenuByFocus = (menuKey: MenuKey) => {
    if (isMobile || clickedMenu) {
      return;
    }

    setHoveredMenu(menuKey);
  };

  const openMenuByClick = (menuKey: MenuKey) => {
    if (clickedMenu === menuKey) {
      setClickedMenu(null);
      setHoveredMenu(null);
      return;
    }

    setClickedMenu(menuKey);
    setHoveredMenu(null);
  };

  const moveToSiblingMenu = (menuKey: MenuKey, direction: 1 | -1) => {
    const currentIndex = menuKeys.indexOf(menuKey);
    const nextIndex = (currentIndex + direction + menuKeys.length) % menuKeys.length;
    const nextMenu = menuKeys[nextIndex];

    setClickedMenu(nextMenu);
    setHoveredMenu(null);
    focusMenuButton(nextMenu);
  };

  const handleMenuKeyDown =
    (menuKey: MenuKey) => (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setClickedMenu(menuKey);
        setHoveredMenu(null);
        requestAnimationFrame(() => {
          focusFirstMenuItem(menuKey);
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveToSiblingMenu(menuKey, 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveToSiblingMenu(menuKey, -1);
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMenuByClick(menuKey);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenus();
      }
    };

  const handleMenuBlur =
    (menuKey: MenuKey) => (event: ReactFocusEvent<HTMLDivElement>) => {
      if (clickedMenu || event.currentTarget.contains(event.relatedTarget as Node | null)) {
        return;
      }

      setHoveredMenu((currentValue) => (currentValue === menuKey ? null : currentValue));
    };

  const handleMenuMouseLeave = (menuKey: MenuKey) => {
    if (isMobile || clickedMenu) {
      return;
    }

    setHoveredMenu((currentValue) => (currentValue === menuKey ? null : currentValue));
  };

  const renderMenuContent = (menuKey: MenuKey): ReactNode => {
    switch (menuKey) {
      case "products":
        return (
          <div className="nav-menu-surface">
            <div className="nav-menu-layout">
              <div className="nav-menu-columns nav-menu-columns-products">
                {productColumns.map((column) => (
                  <div className="nav-menu-column" key={column.label}>
                    <p className="nav-menu-label">{column.label}</p>
                    <div className="nav-menu-links">
                      {column.links.map((linkItem, index) => (
                        <Link
                          key={`${column.label}-${linkItem.title}`}
                          className={`nav-menu-link${index < 2 && column.label !== "Sensors & Accessories" ? " nav-menu-link-with-icon" : ""}`}
                          href={linkItem.href}
                          onClick={closeMenuNavigation}
                        >
                          {index < 2 && column.label !== "Sensors & Accessories" ? (
                            <span className="nav-menu-link-icon" aria-hidden="true">
                              <svg viewBox="0 0 16 16" fill="none">
                                <rect x="3.25" y="2.75" width="9.5" height="10.5" rx="2.25" />
                                <path d="M6 11h4" />
                              </svg>
                            </span>
                          ) : null}
                          <span>{linkItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <aside className="nav-menu-panel">
                <p className="nav-menu-panel-label">Featured Hardware</p>
                <h3 className="nav-menu-panel-title">4G GPS Tracker</h3>
                <p className="nav-menu-panel-copy">
                  Reliable live fleet tracking hardware for modern telematics visibility.
                </p>
                <Link className="nav-menu-panel-link" href="/products" onClick={closeMenuNavigation}>
                  Explore Product <span aria-hidden="true">&rarr;</span>
                </Link>
              </aside>
            </div>

            <div className="nav-menu-footer">
              <Link className="nav-menu-footer-link" href="/products" onClick={closeMenuNavigation}>
                View all products <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        );

      case "solutions":
        return (
          <div className="nav-menu-surface">
            <div className="nav-menu-layout">
              <div className="nav-menu-columns nav-menu-columns-solutions">
                {solutionColumns.map((column) => (
                  <div className="nav-menu-column" key={column.label}>
                    <p className="nav-menu-label">{column.label}</p>
                    <div className="nav-menu-links">
                      {column.links.map((linkItem) => (
                        <Link
                          key={`${column.label}-${linkItem.title}`}
                          className="nav-menu-link"
                          href={linkItem.href}
                          onClick={closeMenuNavigation}
                        >
                          {linkItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <aside className="nav-menu-panel">
                <p className="nav-menu-panel-label">Operational Visibility</p>
                <h3 className="nav-menu-panel-title">Connected Fleet Control</h3>
                <p className="nav-menu-panel-copy">
                  Connected monitoring and intelligent tracking solutions for high-control fleet operations.
                </p>
                <Link className="nav-menu-panel-link" href="/solutions" onClick={closeMenuNavigation}>
                  Explore Solutions <span aria-hidden="true">&rarr;</span>
                </Link>
              </aside>
            </div>

            <div className="nav-menu-footer">
              <Link className="nav-menu-footer-link" href="/solutions" onClick={closeMenuNavigation}>
                View all solutions <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        );

      case "industries":
        return (
          <div className="nav-menu-surface">
            <div className="nav-menu-intro">
              <p className="nav-menu-label">Industry Solutions</p>
              <p className="nav-menu-helper">Built for sector-specific fleet operations.</p>
            </div>
            <div className="nav-menu-grid-links">
              {industryLinks.map((linkItem) => (
                <Link
                  key={linkItem.title}
                  className="nav-menu-link"
                  href={linkItem.href}
                  onClick={closeMenuNavigation}
                >
                  {linkItem.title}
                </Link>
              ))}
            </div>
          </div>
        );

      case "company":
        return (
          <div className="nav-menu-surface">
            <div className="nav-menu-links nav-menu-links-simple">
              {companyLinks.map((linkItem) => (
                <Link
                  key={linkItem.title}
                  className="nav-menu-link"
                  href={linkItem.href}
                  onClick={closeMenuNavigation}
                >
                  {linkItem.title}
                </Link>
              ))}
            </div>
          </div>
        );
    }
  };

  const submitSearch = () => {
    if (!searchOpen) {
      setSearchDraft(currentSearchQuery);
      setSearchOpen(true);
      return;
    }

    const query = searchDraft.trim();

    if (!query) {
      return;
    }

    router.push(`/products?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const handleThemeToggle = () => {
    const supportsViewTransition =
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      typeof (document as DocumentWithViewTransition).startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsViewTransition || !themeToggleRef.current) {
      toggleTheme();
      return;
    }

    const toggleBounds = themeToggleRef.current.getBoundingClientRect();
    const transitionCenterX = toggleBounds.left + toggleBounds.width / 2;
    const transitionCenterY = toggleBounds.top + toggleBounds.height / 2;
    const transitionRadius = Math.hypot(
      Math.max(transitionCenterX, window.innerWidth - transitionCenterX),
      Math.max(transitionCenterY, window.innerHeight - transitionCenterY),
    );

    try {
      const transition = (document as DocumentWithViewTransition).startViewTransition?.(() => {
        flushSync(() => {
          toggleTheme();
        });
      });

      void transition?.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${transitionCenterX}px ${transitionCenterY}px)`,
                `circle(${transitionRadius}px at ${transitionCenterX}px ${transitionCenterY}px)`,
              ],
            },
            {
              duration: 650,
              easing: "cubic-bezier(.22, 1, .36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          // A rapid second toggle can abort the active view transition; theme state is already updated.
        });
    } catch {
      toggleTheme();
    }
  };

  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}${mobileNavOpen ? " is-mobile-nav-open" : ""}`}
    >
      <div className="container">
        <nav className="nav" aria-label="Primary navigation" ref={navRef}>
          <div className="nav-zone nav-zone-left">
            <Link className="brand" href="/" aria-label="Track Fleetio home">
              <span className="logo-container">
                <Image
                  className="brand-logo"
                  src="/New-logo.png"
                  alt="Track Fleetio logo"
                  width={164}
                  height={40}
                  priority
                  style={{ width: "100px", height: "70px" }}
                />
              </span>
            </Link>
          </div>

          <div className="nav-zone nav-zone-center" id="nav-mobile-panel">
            <div className="nav-links" role="menubar" aria-label="Main navigation">
              <div className="nav-item" role="none">
                <Link
                  className={`nav-link${currentSection === "home" ? " nav-link-active" : ""}`}
                  data-nav-section="home"
                  href="/"
                  role="menuitem"
                >
                  Home
                </Link>
              </div>

              {menuDefinitions.map((menuItem) => {
                const isOpen = activeMenu === menuItem.key;
                const isSectionActive = highlightedMenu === menuItem.key;

                return (
                  <div
                    key={menuItem.key}
                    className={`nav-item nav-item-has-menu${isOpen ? " is-open" : ""}`}
                    role="none"
                    onMouseEnter={() => openMenuByHover(menuItem.key)}
                    onBlur={handleMenuBlur(menuItem.key)}
                    onMouseLeave={() => handleMenuMouseLeave(menuItem.key)}
                  >
                    <button
                      className={`nav-link nav-link-button${isSectionActive ? " nav-link-active" : ""}`}
                      id={`nav-trigger-${menuItem.key}`}
                      type="button"
                      role="menuitem"
                      aria-label={`Open ${menuItem.label} menu`}
                      aria-expanded={isOpen ? "true" : "false"}
                      aria-haspopup="true"
                      aria-controls={`nav-menu-${menuItem.key}`}
                      onClick={() => openMenuByClick(menuItem.key)}
                      onFocus={() => openMenuByFocus(menuItem.key)}
                      onKeyDown={handleMenuKeyDown(menuItem.key)}
                      ref={(node) => {
                        menuButtonRefs.current[menuItem.key] = node;
                      }}
                    >
                      <span>{menuItem.label}</span>
                      <span className="nav-chevron" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="m3 4.5 3 3 3-3" />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={menuItem.panelClassName}
                      id={`nav-menu-${menuItem.key}`}
                      aria-labelledby={`nav-trigger-${menuItem.key}`}
                    >
                      {renderMenuContent(menuItem.key)}
                    </div>
                  </div>
                );
              })}

              {!resolvedAuthUser ? (
                <div className="nav-mobile-auth">
                  <Link className="button button-secondary nav-auth-button" href="/signin">
                    Sign in
                  </Link>
                  <Link className="button button-primary nav-auth-button" href="/signup">
                    Create account
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <div className="nav-zone nav-zone-right">
            <div className="nav-utilities" aria-label="Utility actions">
              <div className={`nav-search${searchOpen ? " is-open" : ""}`} data-nav-search ref={searchRef}>
                <button
                  className="nav-utility nav-search-toggle"
                  type="button"
                  aria-label={searchOpen ? "Submit search" : "Open search"}
                  aria-expanded={searchOpen ? "true" : "false"}
                  aria-controls="nav-search-input"
                  onClick={() => submitSearch()}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="5.5" />
                    <path d="m16 16 4 4" />
                  </svg>
                </button>
                <form
                  className="nav-search-surface"
                  role="search"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitSearch();
                  }}
                >
                  <label className="sr-only" htmlFor="nav-search-input">
                    Search products, devices...
                  </label>
                  <input
                    className="nav-search-input"
                    id="nav-search-input"
                    name="q"
                    type="search"
                    placeholder="Search products, devices..."
                    autoComplete="off"
                    value={currentSearchValue}
                    ref={searchInputRef}
                    onChange={(event) => setSearchDraft(event.target.value)}
                  />
                  <button
                    className="nav-search-clear"
                    type="button"
                    aria-label="Clear search"
                    hidden={!currentSearchValue.trim()}
                    onClick={() => setSearchDraft("")}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="m7 7 10 10M17 7 7 17" />
                    </svg>
                  </button>
                </form>
              </div>
              <Link className="nav-utility nav-utility-cart" href="/cart" aria-label="Cart">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 5h2l2.2 9.2h8.8l2-7H7.2" />
                  <circle cx="10" cy="18" r="1.5" />
                  <circle cx="17" cy="18" r="1.5" />
                </svg>
                <span className="nav-utility-badge" aria-hidden="true" hidden={resolvedCartCount === 0}>
                  {resolvedCartCount}
                </span>
              </Link>
              <button
                className={`nav-utility nav-theme-toggle nav-theme-toggle-${resolvedTheme}`}
                type="button"
                data-theme-toggle
                aria-label={`Switch to ${nextThemeLabel} theme`}
                title={`Switch to ${nextThemeLabel} theme`}
                aria-pressed={resolvedTheme === "light" ? "true" : "false"}
                onClick={handleThemeToggle}
                ref={themeToggleRef}
              >
                <span className="theme-icon theme-icon-moon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 15.5A8.5 8.5 0 1 1 8.5 4 6.5 6.5 0 0 0 20 15.5Z" />
                  </svg>
                </span>
                <span className="theme-icon theme-icon-sun" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
                  </svg>
                </span>
              </button>
              {!resolvedAuthUser ? (
                <div className="nav-auth-actions">
                  <Link className="button button-secondary nav-auth-button nav-auth-button-secondary" href="/signin">
                    Sign in
                  </Link>
                  <Link className="button button-primary nav-auth-button" href="/signup">
                    Create account
                  </Link>
                </div>
              ) : (
                <div
                  className={`nav-account${accountOpen ? " is-open" : ""}`}
                  data-account-menu
                  ref={accountRef}
                >
                  <button
                    className="nav-utility nav-account-toggle"
                    type="button"
                    aria-label={accountOpen ? "Close account menu" : "Open account menu"}
                    aria-haspopup="menu"
                    aria-expanded={accountOpen ? "true" : "false"}
                    aria-controls="nav-account-menu"
                    onClick={() => setAccountOpen((currentValue) => !currentValue)}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8.5" r="3.5" />
                      <path d="M5 19a7 7 0 0 1 14 0" />
                    </svg>
                  </button>
                  <div className="nav-account-menu" id="nav-account-menu" role="menu" aria-label="Account menu">
                    <div className="nav-account-identity">
                      <span className="nav-account-avatar" aria-hidden="true">
                        {getUserInitials(resolvedAuthUser.name)}
                      </span>
                      <div className="nav-account-meta">
                        <p className="nav-account-name">{resolvedAuthUser.name}</p>
                        <p className="nav-account-email">{resolvedAuthUser.email}</p>
                        <p className="nav-account-role">{resolvedAuthUser.roleLabel}</p>
                      </div>
                    </div>
                    <div className="nav-account-links">
                      <button className="nav-account-link" type="button" role="menuitem">
                        My Profile
                      </button>
                      <button className="nav-account-link" type="button" role="menuitem">
                        Orders
                      </button>
                      <button className="nav-account-link" type="button" role="menuitem">
                        Account Settings
                      </button>
                      <Link className="nav-account-link" href="/contact" role="menuitem">
                        Support
                      </Link>
                    </div>
                    <div className="nav-account-footer">
                      <button
                        className="nav-account-link nav-account-link-danger"
                        type="button"
                        role="menuitem"
                        onClick={async () => {
                          await fetch("/api/auth/logout", {
                            method: "POST",
                            credentials: "same-origin",
                          }).catch(() => null);
                          clearAuthUser();
                          setAccountOpen(false);
                          router.push("/signin");
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              className="nav-utility nav-mobile-toggle"
              type="button"
              aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileNavOpen ? "true" : "false"}
              aria-controls="nav-mobile-panel"
              onClick={() => setMobileNavOpen((currentValue) => !currentValue)}
            >
              <span className="nav-mobile-toggle-lines" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </nav>
      </div>
      <button
        className="nav-mobile-backdrop"
        type="button"
        aria-label="Close navigation menu"
        onClick={() => {
          setMobileNavOpen(false);
          closeMenus();
        }}
      ></button>
    </header>
  );
}













