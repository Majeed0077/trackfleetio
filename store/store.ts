"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getProductById,
  productSummaryLabels,
  type ProductCategory,
} from "@/data/products";
import { SITE_STORE_KEY, SSR_THEME_FALLBACK } from "@/lib/theme";

export type AuthUser = {
  isAuthenticated: true;
  name: string;
  email: string;
  role: "admin" | "user";
  roleLabel: string;
  company: string;
  phone: string;
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

export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      themeMode: "system",
      region: null,
      authUser: null,
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
        set({ authUser: normalizeAuthUser(user) });
      },
      clearAuthUser: () => {
        set({ authUser: null });
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
        cart: state.cart,
        wishlist: state.wishlist,
        checkoutSelection: state.checkoutSelection,
      }),
      merge: (persistedState, currentState) => {
        const typedState = (persistedState ?? {}) as Partial<StoreState>;
        const legacyState = typedState as Partial<StoreState> & { theme?: unknown };

        return {
          ...currentState,
          ...typedState,
          themeMode: normalizeThemeMode(typedState.themeMode, legacyState.theme),
          region: normalizeRegion(typedState.region),
          authUser: null,
          cart: Array.isArray(typedState.cart) ? typedState.cart : currentState.cart,
          wishlist: Array.isArray(typedState.wishlist)
            ? typedState.wishlist
            : currentState.wishlist,
          checkoutSelection: typedState.checkoutSelection ?? currentState.checkoutSelection,
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







