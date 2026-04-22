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
import {
  Bolt,
  Bus,
  Camera,
  ChevronDown,
  Droplets,
  Factory,
  Heart,
  MapPin,
  MoonStar,
  Radar,
  ShieldCheck,
  Smartphone,
  SunMedium,
  Thermometer,
} from "lucide-react";

import {
  getNextThemeMode,
  resolveThemeMode,
  useAppStore,
  useStoreHydrated,
  useSystemTheme,
  type AuthUser,
} from "@/store/store";
import { NavScrollIndicator } from "@/components/NavScrollIndicator";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ThemeLogo } from "@/components/ThemeLogo";
import { CommandSearch } from "@/components/CommandSearch";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { SSR_THEME_FALLBACK } from "@/lib/theme";
import { startRouteLoader } from "@/lib/route-loader";
import {
  companyMenuLinks,
  industriesMenuLinks,
  navigationUtilityLabels,
  productMenuColumns,
  productsMenuFeaturedPanel,
} from "@/lib/content/navigation";

type MenuKey = "solutions" | "products" | "industries" | "company";

const menuKeys: MenuKey[] = ["solutions", "products", "industries", "company"];
const themeModeLabels = {
  system: "System",
  light: "Light",
  dark: "Dark",
} as const;

const megaMenuIconMap = {
  pin: MapPin,
  camera: Camera,
  scan: Radar,
  shield: ShieldCheck,
  route: Smartphone,
  factory: Factory,
  bus: Bus,
  bolt: Bolt,
  droplet: Droplets,
  thermometer: Thermometer,
} as const;

const menuDefinitions = [
  { key: "solutions", label: "Solutions", href: "/solutions", panelClassName: "nav-menu nav-menu-mega" },
  { key: "products", label: "Products", href: "/products", panelClassName: "nav-menu nav-menu-mega" },
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
    pathname.startsWith("/favorites") ||
    pathname.startsWith("/quote-request") ||
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

export function Navbar({ initialAuthUser = null }: { initialAuthUser?: AuthUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchQuery = searchParams.get("q") ?? "";
  const hasHydrated = useStoreHydrated();
  const authUser = useAppStore((state) => state.authUser);
  const authResolved = useAppStore((state) => state.authResolved);
  const clearAuthUser = useAppStore((state) => state.clearAuthUser);
  const cmsEditMode = useAppStore((state) => state.cmsEditMode);
  const toggleCmsEditMode = useAppStore((state) => state.toggleCmsEditMode);
  const openCmsSection = useAppStore((state) => state.openCmsSection);
  const solutionsMenuDraft = useAppStore((state) => state.cmsDrafts.solutionsMenu);
  const themeMode = useAppStore((state) => state.themeMode);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const systemTheme = useSystemTheme();
  const wishlist = useAppStore((state) => state.wishlist);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Hover only previews a menu while the pointer/focus stays on it.
  // Click pins a menu open until the same trigger, another trigger, or an outside click closes it.
  const [hoveredMenu, setHoveredMenu] = useState<MenuKey | null>(null);
  const [clickedMenu, setClickedMenu] = useState<MenuKey | null>(null);
  const [solutionsMenuIndex, setSolutionsMenuIndex] = useState(0);
  const [productsMenuIndex, setProductsMenuIndex] = useState(0);
  const [accountOpen, setAccountOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const accountRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRefs = useRef<Record<MenuKey, HTMLButtonElement | null>>({
    solutions: null,
    products: null,
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
    document.body.classList.toggle("mobile-nav-open", mobileNavOpen);

    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (navRef.current && !navRef.current.contains(target)) {
        closeMenus();
      }

      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountOpen(false);
      }
    };

    const onDocumentKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
        setMobileNavOpen(false);
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
  const resolvedAuthUser = authResolved ? authUser : initialAuthUser;
  const resolvedTheme = hasHydrated
    ? resolveThemeMode(themeMode, systemTheme)
    : SSR_THEME_FALLBACK;
  const resolvedSavedCount = hasHydrated ? wishlist.length : 0;
  const nextThemeMode = hasHydrated
    ? getNextThemeMode(themeMode, systemTheme)
    : "light";
  const nextThemeModeLabel = themeModeLabels[nextThemeMode];
  const currentThemeModeLabel = themeModeLabels[themeMode];
  const currentThemeStateLabel =
    themeMode === "system"
      ? `${currentThemeModeLabel} (${resolvedTheme})`
      : currentThemeModeLabel;

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

  const isDropdownOnlyMenu = (menuKey: MenuKey) => menuKey === "solutions";

  const toggleMenuByClick = (menuKey: MenuKey) => {
    setHoveredMenu(null);
    setClickedMenu((currentValue) => (currentValue === menuKey ? null : menuKey));
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

        if (!isDropdownOnlyMenu(menuKey)) {
          openParentDirectory(href);
          return;
        }

        const shouldOpenMenu = clickedMenu !== menuKey;
        toggleMenuByClick(menuKey);

        if (shouldOpenMenu) {
          requestAnimationFrame(() => {
            focusFirstMenuItem(menuKey);
          });
        }
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
      case "products": {
        const activeColumn = productMenuColumns[productsMenuIndex] ?? productMenuColumns[0];

        return (
          <div className="nav-menu-surface">
            <div className="nav-menu-layout nav-menu-layout-tabbed">
              <div className="nav-menu-rail">
                <p className="nav-menu-label">Product Categories</p>
                <div className="nav-menu-rail-links" role="tablist" aria-label="Product categories">
                  {productMenuColumns.map((column, index) => (
                    <button
                      key={column.label}
                      className={`nav-menu-rail-link${index === productsMenuIndex ? " is-active" : ""}`}
                      type="button"
                      role="tab"
                      aria-selected={index === productsMenuIndex ? "true" : "false"}
                      onMouseEnter={() => setProductsMenuIndex(index)}
                      onFocus={() => setProductsMenuIndex(index)}
                    >
                      <span>{column.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="nav-menu-main" role="tabpanel">
                <p className="nav-menu-label">{activeColumn.label}</p>
                <div className="nav-menu-feature-list">
                  {activeColumn.links.map((linkItem) => {
                    const Icon = linkItem.icon ? megaMenuIconMap[linkItem.icon] : Smartphone;

                    return (
                      <Link
                        key={`${activeColumn.label}-${linkItem.title}`}
                        className="nav-menu-feature-link"
                        href={linkItem.href}
                        onClick={closeMenuNavigation}
                      >
                        <span className="nav-menu-feature-icon" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.9} />
                        </span>
                        <span className="nav-menu-feature-copy">
                          <span className="nav-menu-feature-title">{linkItem.title}</span>
                          {linkItem.description ? (
                            <span className="nav-menu-feature-description">{linkItem.description}</span>
                          ) : null}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <aside className="nav-menu-panel nav-menu-panel-preview">
                <div className="nav-menu-preview-media">
                  <Image
                    className={`nav-menu-preview-image${activeColumn.preview.imageFit === "contain" ? " nav-menu-preview-image-contain" : ""}`}
                    src={resolveCloudinaryAsset(activeColumn.preview.imageSrc)}
                    alt={activeColumn.preview.imageAlt}
                    width={320}
                    height={220}
                    sizes="280px"
                  />
                </div>
                <p className="nav-menu-panel-label">{activeColumn.preview.eyebrow}</p>
                <h3 className="nav-menu-panel-title">{activeColumn.preview.title}</h3>
                <p className="nav-menu-panel-copy">{activeColumn.preview.description}</p>
                <Link className="nav-menu-panel-link" href={activeColumn.preview.href} onClick={closeMenuNavigation}>
                  {activeColumn.preview.ctaLabel} <span aria-hidden="true">&rarr;</span>
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
      }

      case "solutions": {
        const solutionMenuColumns = solutionsMenuDraft.columns;
        const activeColumn = solutionMenuColumns[solutionsMenuIndex] ?? solutionMenuColumns[0];

        return (
          <div className="nav-menu-surface">
            <div className="nav-menu-layout nav-menu-layout-tabbed">
              <div className="nav-menu-rail">
                <div className="nav-menu-inline-head">
                  <p className="nav-menu-label">Solution Groups</p>
                  {resolvedAuthUser?.role === "admin" && cmsEditMode ? (
                    <button className="button button-secondary nav-menu-inline-edit" type="button" onClick={() => openCmsSection("navigation.solutions-menu")}>
                      Edit Menu
                    </button>
                  ) : null}
                </div>
                <div className="nav-menu-rail-links" role="tablist" aria-label="Solution groups">
                  {solutionMenuColumns.map((column, index) => (
                    <button
                      key={column.label}
                      className={`nav-menu-rail-link${index === solutionsMenuIndex ? " is-active" : ""}`}
                      type="button"
                      role="tab"
                      aria-selected={index === solutionsMenuIndex ? "true" : "false"}
                      onMouseEnter={() => setSolutionsMenuIndex(index)}
                      onFocus={() => setSolutionsMenuIndex(index)}
                    >
                      <span>{column.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="nav-menu-main" role="tabpanel">
                <p className="nav-menu-label">{activeColumn.label}</p>
                <div className="nav-menu-feature-list">
                  {activeColumn.links.map((linkItem) => {
                    const Icon = linkItem.icon ? megaMenuIconMap[linkItem.icon] : Smartphone;

                    return (
                      <Link
                        key={`${activeColumn.label}-${linkItem.title}`}
                        className="nav-menu-feature-link"
                        href={linkItem.href}
                        onClick={closeMenuNavigation}
                      >
                        <span className="nav-menu-feature-icon" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.9} />
                        </span>
                        <span className="nav-menu-feature-copy">
                          <span className="nav-menu-feature-title">{linkItem.title}</span>
                          {linkItem.description ? (
                            <span className="nav-menu-feature-description">{linkItem.description}</span>
                          ) : null}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <aside className="nav-menu-panel nav-menu-panel-preview">
                <div className="nav-menu-preview-media">
                  <Image
                    className={`nav-menu-preview-image${activeColumn.preview.imageFit === "contain" ? " nav-menu-preview-image-contain" : ""}`}
                    src={resolveCloudinaryAsset(activeColumn.preview.imageSrc)}
                    alt={activeColumn.preview.imageAlt}
                    width={320}
                    height={220}
                    sizes="280px"
                  />
                </div>
                <p className="nav-menu-panel-label">{activeColumn.preview.eyebrow}</p>
                <h3 className="nav-menu-panel-title">{activeColumn.preview.title}</h3>
                <p className="nav-menu-panel-copy">{activeColumn.preview.description}</p>
                <Link className="nav-menu-panel-link" href={activeColumn.preview.href} onClick={closeMenuNavigation}>
                  {activeColumn.preview.ctaLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </aside>
            </div>

            <div className="nav-menu-footer">
              <Link className="nav-menu-footer-link" href={solutionsMenuDraft.featuredPanel.footerCtaHref} onClick={closeMenuNavigation}>
                {solutionsMenuDraft.featuredPanel.footerCtaLabel} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        );
      }

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

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <header
      className={`site-header${mobileNavOpen ? " is-mobile-nav-open" : ""}`}
      id="site-header"
    >
      <NavScrollIndicator />
      <div className="container">
        <nav className="nav" aria-label="Primary navigation" ref={navRef}>
          <div className="nav-zone nav-zone-left">
            <Link className="brand" href="/" aria-label="Track Fleetio home">
              <span className="logo-container">
                <ThemeLogo
                  className="brand-logo"
                  alt="Track Fleetio logo"
                  width={188}
                  height={46}
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
                      onClick={() =>
                        isDropdownOnlyMenu(menuItem.key)
                          ? toggleMenuByClick(menuItem.key)
                          : openParentDirectory(menuItem.href)
                      }
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
                      {isOpen ? renderMenuContent(menuItem.key) : null}
                    </div>
                  </div>
                );
              })}

              {!resolvedAuthUser ? (
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
              <CommandSearch
                currentQuery={currentSearchQuery}
                placeholder={navigationUtilityLabels.searchPlaceholder}
                onOpen={() => {
                  closeMenus();
                  setMobileNavOpen(false);
                  setAccountOpen(false);
                }}
              />
              <Link className="nav-utility nav-utility-cart" href="/favorites" aria-label="Saved products">
                <Heart size={18} strokeWidth={1.9} />
                <span className="nav-utility-badge" aria-hidden="true" hidden={resolvedSavedCount === 0}>
                  {resolvedSavedCount}
                </span>
              </Link>
              <button
                className={`nav-utility nav-theme-toggle nav-theme-toggle-${resolvedTheme} nav-theme-toggle-mode-${resolvedTheme}`}
                type="button"
                data-theme-toggle
                aria-label={`Theme mode: ${currentThemeStateLabel}. Switch to ${nextThemeModeLabel}.`}
                title={`Theme mode: ${currentThemeStateLabel}. Click to switch to ${nextThemeModeLabel}.`}
                aria-pressed={resolvedTheme === "light" ? "true" : "false"}
                onClick={handleThemeToggle}
                data-theme-mode={themeMode}
              >
                <span className="theme-icon theme-icon-moon" aria-hidden="true">
                  <MoonStar size={18} strokeWidth={1.9} />
                </span>
                <span className="theme-icon theme-icon-sun" aria-hidden="true">
                  <SunMedium size={18} strokeWidth={1.9} />
                </span>
              </button>
              {resolvedAuthUser?.role === "admin" ? (
                <button
                  className={`button nav-inline-edit-toggle${cmsEditMode ? " is-active" : ""}`}
                  type="button"
                  onClick={toggleCmsEditMode}
                >
                  {cmsEditMode ? "Editing On" : "Edit Mode"}
                </button>
              ) : null}
              {!resolvedAuthUser ? (
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
                    <ProfileAvatar
                      alt={`${resolvedAuthUser.name} avatar`}
                      avatarUrl={resolvedAuthUser.avatarUrl}
                      className="nav-account-toggle-avatar-shell"
                      gender={resolvedAuthUser.gender}
                      imageClassName="nav-account-toggle-avatar"
                      sizes="40px"
                    />
                  </button>
                  <div className="nav-account-menu" id="nav-account-menu" role="menu" aria-label="Account menu">
                    <div className="nav-account-identity">
                      <ProfileAvatar
                        alt={`${resolvedAuthUser.name} avatar`}
                        avatarUrl={resolvedAuthUser.avatarUrl}
                        className="nav-account-avatar"
                        gender={resolvedAuthUser.gender}
                        imageClassName="nav-account-avatar-image"
                        sizes="42px"
                      />
                      <div className="nav-account-meta">
                        <p className="nav-account-name">{resolvedAuthUser.name}</p>
                        <p className="nav-account-email">{resolvedAuthUser.email}</p>
                        <p className="nav-account-role">{resolvedAuthUser.roleLabel}</p>
                      </div>
                    </div>
                    <div className="nav-account-links">
                      {resolvedAuthUser.role === "admin" ? (
                        <Link
                          className="nav-account-link"
                          href="/admin/dashboard"
                          role="menuitem"
                          data-skip-route-loader
                          onClick={() => setAccountOpen(false)}
                        >
                          Dashboard
                        </Link>
                      ) : null}
                      <Link
                        className="nav-account-link"
                        href="/account/profile"
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        className="nav-account-link"
                        href={resolvedAuthUser.role === "admin" ? "/admin/orders" : "/account/orders"}
                        role="menuitem"
                        data-skip-route-loader={resolvedAuthUser.role === "admin" ? true : undefined}
                        onClick={() => setAccountOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        className="nav-account-link"
                        href={resolvedAuthUser.role === "admin" ? "/admin/settings" : "/account/security"}
                        role="menuitem"
                        data-skip-route-loader={resolvedAuthUser.role === "admin" ? true : undefined}
                        onClick={() => setAccountOpen(false)}
                      >
                        Account Settings
                      </Link>
                      <Link className="nav-account-link" href="/contact" role="menuitem" onClick={() => setAccountOpen(false)}>
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






















