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
import { ChevronDown, MoonStar, Search, ShoppingCart, Smartphone, SunMedium, UserRound, X } from "lucide-react";

import {
  getNextThemeMode,
  resolveThemeMode,
  useAppStore,
  useStoreHydrated,
  useSystemTheme,
} from "@/store/store";
import { SSR_THEME_FALLBACK } from "@/lib/theme";
import { startRouteLoader } from "@/lib/route-loader";
import {
  companyMenuLinks,
  industriesMenuLinks,
  navigationUtilityLabels,
  productMenuColumns,
  productsMenuFeaturedPanel,
  solutionsMenuColumns,
  solutionsMenuFeaturedPanel,
} from "@/lib/content/navigation";

type MenuKey = "products" | "solutions" | "industries" | "company";
type ViewTransitionHandle = {
  ready: Promise<void>;
};
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

const menuKeys: MenuKey[] = ["products", "solutions", "industries", "company"];
const themeModeLabels = {
  light: "Light",
  dark: "Dark",
} as const;

const menuDefinitions = [
  { key: "products", label: "Products", href: "/products", panelClassName: "nav-menu nav-menu-mega" },
  { key: "solutions", label: "Solutions", href: "/solutions", panelClassName: "nav-menu nav-menu-mega" },
  { key: "industries", label: "Industries", href: "/industries", panelClassName: "nav-menu nav-menu-structured" },
  { key: "company", label: "Company", href: "/about", panelClassName: "nav-menu nav-menu-simple" },
] as const satisfies ReadonlyArray<{
  key: MenuKey;
  label: string;
  href: string;
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
  const themeMode = useAppStore((state) => state.themeMode);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const systemTheme = useSystemTheme();
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
  const resolvedTheme = hasHydrated
    ? resolveThemeMode(themeMode, systemTheme)
    : SSR_THEME_FALLBACK;
  const resolvedCartCount = hasHydrated ? cartCount : 0;
  const nextThemeMode = hasHydrated
    ? getNextThemeMode(themeMode, systemTheme)
    : "light";
  const nextThemeModeLabel = themeModeLabels[nextThemeMode];
  const currentThemeModeLabel = themeModeLabels[resolvedTheme];
  const currentSearchValue = searchOpen ? searchDraft : currentSearchQuery;
  const authUiReady = hasHydrated;

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

  const openParentDirectory = (href: string) => {
    closeMenuNavigation();
    startRouteLoader();
    router.push(href);
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
    (menuKey: MenuKey, href: string) => (event: ReactKeyboardEvent<HTMLButtonElement>) => {
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
        openParentDirectory(href);
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
                {productMenuColumns.map((column) => (
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
                              <Smartphone size={14} strokeWidth={1.9} />
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
                <p className="nav-menu-panel-label">{productsMenuFeaturedPanel.label}</p>
                <h3 className="nav-menu-panel-title">{productsMenuFeaturedPanel.title}</h3>
                <p className="nav-menu-panel-copy">{productsMenuFeaturedPanel.description}</p>
                <Link className="nav-menu-panel-link" href={productsMenuFeaturedPanel.ctaHref} onClick={closeMenuNavigation}>
                  {productsMenuFeaturedPanel.ctaLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </aside>
            </div>

            <div className="nav-menu-footer">
              <Link className="nav-menu-footer-link" href={productsMenuFeaturedPanel.footerCtaHref} onClick={closeMenuNavigation}>
                {productsMenuFeaturedPanel.footerCtaLabel} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        );

      case "solutions":
        return (
          <div className="nav-menu-surface">
            <div className="nav-menu-layout">
              <div className="nav-menu-columns nav-menu-columns-solutions">
                {solutionsMenuColumns.map((column) => (
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
                <p className="nav-menu-panel-label">{solutionsMenuFeaturedPanel.label}</p>
                <h3 className="nav-menu-panel-title">{solutionsMenuFeaturedPanel.title}</h3>
                <p className="nav-menu-panel-copy">{solutionsMenuFeaturedPanel.description}</p>
                <Link className="nav-menu-panel-link" href={solutionsMenuFeaturedPanel.ctaHref} onClick={closeMenuNavigation}>
                  {solutionsMenuFeaturedPanel.ctaLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </aside>
            </div>

            <div className="nav-menu-footer">
              <Link className="nav-menu-footer-link" href={solutionsMenuFeaturedPanel.footerCtaHref} onClick={closeMenuNavigation}>
                {solutionsMenuFeaturedPanel.footerCtaLabel} <span aria-hidden="true">&rarr;</span>
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
              {industriesMenuLinks.map((linkItem) => (
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
              {companyMenuLinks.map((linkItem) => (
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

    startRouteLoader();
    router.push(`/products?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const handleThemeToggle = () => {
    const nextResolvedTheme = nextThemeMode;
    const supportsViewTransition =
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      typeof (document as DocumentWithViewTransition).startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      !supportsViewTransition ||
      !themeToggleRef.current ||
      nextResolvedTheme === resolvedTheme
    ) {
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
                      aria-label={`${isOpen ? "Close" : "Open"} ${menuItem.label} menu`}
                      aria-expanded={isOpen ? "true" : "false"}
                      aria-haspopup="true"
                      aria-controls={`nav-menu-${menuItem.key}`}
                      onClick={() => openParentDirectory(menuItem.href)}
                      onFocus={() => openMenuByFocus(menuItem.key)}
                      onKeyDown={handleMenuKeyDown(menuItem.key, menuItem.href)}
                      ref={(node) => {
                        menuButtonRefs.current[menuItem.key] = node;
                      }}
                    >
                      <span>{menuItem.label}</span>
                      <span className="nav-chevron" aria-hidden="true">
                        <ChevronDown size={14} strokeWidth={1.9} />
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

              {authUiReady && !resolvedAuthUser ? (
                <div className="nav-mobile-auth">
                  <Link className="button button-secondary nav-auth-button" href="/signin">
                    {navigationUtilityLabels.signIn}
                  </Link>
                  <Link className="button button-primary nav-auth-button" href="/signup">
                    {navigationUtilityLabels.createAccount}
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
                  <Search size={18} strokeWidth={1.9} />
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
                    {navigationUtilityLabels.searchPlaceholder}
                  </label>
                  <input
                    className="nav-search-input"
                    id="nav-search-input"
                    name="q"
                    type="search"
                    placeholder={navigationUtilityLabels.searchPlaceholder}
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
                    <X size={16} strokeWidth={1.9} />
                  </button>
                </form>
              </div>
              <Link className="nav-utility nav-utility-cart" href="/cart" aria-label="Cart">
                <ShoppingCart size={18} strokeWidth={1.9} />
                <span className="nav-utility-badge" aria-hidden="true" hidden={resolvedCartCount === 0}>
                  {resolvedCartCount}
                </span>
              </Link>
              <button
                className={`nav-utility nav-theme-toggle nav-theme-toggle-${resolvedTheme} nav-theme-toggle-mode-${resolvedTheme}`}
                type="button"
                data-theme-toggle
                aria-label={`Theme: ${currentThemeModeLabel}. Switch to ${nextThemeModeLabel}.`}
                title={`Theme: ${currentThemeModeLabel}. Click to switch to ${nextThemeModeLabel}.`}
                aria-pressed={resolvedTheme === "light" ? "true" : "false"}
                onClick={handleThemeToggle}
                data-theme-mode={resolvedTheme}
                ref={themeToggleRef}
              >
                <span className="theme-icon theme-icon-moon" aria-hidden="true">
                  <MoonStar size={18} strokeWidth={1.9} />
                </span>
                <span className="theme-icon theme-icon-sun" aria-hidden="true">
                  <SunMedium size={18} strokeWidth={1.9} />
                </span>
              </button>
              {authUiReady ? (
                !resolvedAuthUser ? (
                <div className="nav-auth-actions">
                  <Link className="button button-secondary nav-auth-button nav-auth-button-secondary" href="/signin">
                    {navigationUtilityLabels.signIn}
                  </Link>
                  <Link className="button button-primary nav-auth-button" href="/signup">
                    {navigationUtilityLabels.createAccount}
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
                    <UserRound size={18} strokeWidth={1.9} />
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
                        {navigationUtilityLabels.support}
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
                          startRouteLoader();
                          router.push("/signin");
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
                )
              ) : null}
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






















