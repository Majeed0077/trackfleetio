"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getProductById,
  productSummaryLabels,
  type ProductCategory,
} from "@/data/products";

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

type DemoAccount = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  roleLabel: string;
  company: string;
  phone?: string;
};

type FleetSummary = {
  totalDevices: number;
  groups: Record<ProductCategory, number>;
};

type LoginResult = {
  ok: boolean;
  user?: AuthUser;
  message?: string;
};

type CheckoutContext = {
  mode: "buy-now" | "cart";
  items: CartItem[];
};

type StoreState = {
  theme: "light" | "dark";
  authUser: AuthUser | null;
  demoAccount: DemoAccount | null;
  cart: CartItem[];
  wishlist: string[];
  checkoutSelection: CheckoutSelection;
  toastMessage: string;
  toastVisible: boolean;
  toggleTheme: () => void;
  login: (email: string, password: string) => LoginResult;
  signup: (payload: SignUpPayload, password: string) => AuthUser;
  logout: () => void;
  toggleWishlist: (productId: string) => boolean;
  addToCart: (productId: string) => void;
  quickAddToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  startImmediateCheckout: (productId: string) => void;
  startCartCheckout: () => void;
  updateCheckoutQuantity: (productId: string, delta: number) => void;
  removeFromCheckout: (productId: string) => void;
  getCheckoutContext: () => CheckoutContext;
  getFleetSummary: (items: CartItem[]) => FleetSummary;
  showToast: (message: string) => void;
};

const USER_ACCOUNT: DemoAccount = {
  name: "Track Fleetio Demo",
  email: "demo@trackfleetio.com",
  password: "TrackFleet123",
  role: "user",
  roleLabel: "Operations Lead, Track Fleetio",
  company: "Track Fleetio",
};

const ADMIN_ACCOUNT: DemoAccount = {
  name: "Admin Operator",
  email: "admin@trackfleetio.com",
  password: "Admin123!",
  role: "admin",
  roleLabel: "Super Admin",
  company: "Track Fleetio",
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

const normalizeAuthUser = (user: unknown): AuthUser | null => {
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

const normalizeTheme = (theme: unknown): "light" | "dark" =>
  theme === "light" || theme === "dark" ? theme : "dark";

export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      authUser: null,
      demoAccount: null,
      cart: [],
      wishlist: [],
      checkoutSelection: null,
      toastMessage: "",
      toastVisible: false,
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      },
      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const storedAccount = get().demoAccount;
        const candidates: Array<DemoAccount | null> = [
          USER_ACCOUNT,
          ADMIN_ACCOUNT,
          storedAccount,
        ];

        const match = candidates.find(
          (candidate) =>
            candidate &&
            candidate.email.toLowerCase() === normalizedEmail &&
            candidate.password === password,
        );

        if (!match) {
          return {
            ok: false,
            message:
              "Use demo@trackfleetio.com / TrackFleet123 or admin@trackfleetio.com / Admin123! for demo access.",
          };
        }

        const nextUser = normalizeAuthUser(match);

        if (!nextUser) {
          return {
            ok: false,
            message: "Unable to sign in.",
          };
        }

        set({ authUser: nextUser });
        return { ok: true, user: nextUser };
      },
      signup: (payload, password) => {
        const demoAccount: DemoAccount = {
          name: payload.name.trim() || "Track Fleetio User",
          email: payload.email.trim(),
          password,
          role: "user",
          roleLabel: payload.company?.trim()
            ? `Admin, ${payload.company.trim()}`
            : "Fleet Operations",
          company: payload.company?.trim() || "",
          phone: payload.phone?.trim() || "",
        };

        const nextUser = normalizeAuthUser(demoAccount) as AuthUser;
        set({
          authUser: nextUser,
          demoAccount,
        });

        return nextUser;
      },
      logout: () => {
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
      name: "trackfleetio-store",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        authUser: state.authUser,
        demoAccount: state.demoAccount,
        cart: state.cart,
        wishlist: state.wishlist,
        checkoutSelection: state.checkoutSelection,
      }),
      merge: (persistedState, currentState) => {
        const typedState = (persistedState ?? {}) as Partial<StoreState>;

        return {
          ...currentState,
          ...typedState,
          theme: normalizeTheme(typedState.theme),
          authUser: normalizeAuthUser(typedState.authUser),
          demoAccount: typedState.demoAccount ?? null,
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
  const [hasHydrated, setHasHydrated] = useState(() => persistApi?.hasHydrated?.() ?? false);

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

    if (persistApi.hasHydrated()) {
      hydrationTimeout = window.setTimeout(() => {
        setHasHydrated(true);
      }, 0);
    }

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







