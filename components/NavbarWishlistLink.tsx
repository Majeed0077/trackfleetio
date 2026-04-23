"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { useAppStore, useStoreHydrated } from "@/store/store";

export function NavbarWishlistLink() {
  const hasHydrated = useStoreHydrated();
  const wishlistCount = useAppStore((state) => state.wishlist.length);
  const resolvedSavedCount = hasHydrated ? wishlistCount : 0;

  return (
    <Link className="nav-utility nav-utility-cart" href="/favorites" aria-label="Saved products">
      <Heart size={18} strokeWidth={1.9} />
      <span className="nav-utility-badge" aria-hidden="true" hidden={resolvedSavedCount === 0}>
        {resolvedSavedCount}
      </span>
    </Link>
  );
}
