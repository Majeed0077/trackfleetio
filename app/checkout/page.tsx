import type { Metadata } from "next";

import { CheckoutPage } from "@/components/CheckoutPage";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Checkout | Track Fleetio",
    description: "Complete your Track Fleetio hardware order and review your fleet commerce selection.",
    path: "/checkout",
  });
}

export default function CheckoutRoutePage() {
  return <CheckoutPage />;
}
