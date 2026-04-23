import { QuoteRequestSuccessState } from "@/components/QuoteRequestSuccessState";
import { createPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Quote Request Received | Track Fleetio",
  description: "Confirmation state for Track Fleetio quote requests.",
  path: "/quote-request/success",
});

export default function QuoteRequestSuccessPage() {
  return (
    <Suspense fallback={null}>
      <QuoteRequestSuccessState />
    </Suspense>
  );
}
