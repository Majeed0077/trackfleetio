import type { Metadata } from "next";

import { CartPage } from "@/components/CartPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Cart | Track Fleetio",
    description: "Review selected Track Fleetio hardware before continuing to checkout.",
    path: "/cart",
  });
}

export default function CartRoutePage() {
  return <CartPage />;
}
