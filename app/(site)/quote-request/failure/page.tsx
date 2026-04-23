import { QuoteRequestFailureState } from "@/components/QuoteRequestFailureState";
import { createPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Quote Request Issue | Track Fleetio",
  description: "Failure state for Track Fleetio quote request submissions.",
  path: "/quote-request/failure",
});

export default function QuoteRequestFailurePage() {
  return (
    <Suspense fallback={null}>
      <QuoteRequestFailureState />
    </Suspense>
  );
}
