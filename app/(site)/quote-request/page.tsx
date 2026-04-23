import { QuoteRequestFlow } from "@/components/QuoteRequestFlow";
import { createPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Request a Quote | Track Fleetio",
  description: "Share your industry, fleet size, and contact details so Track Fleetio can prepare the right hardware quote.",
  path: "/quote-request",
});

export default function QuoteRequestPage() {
  return (
    <Suspense fallback={null}>
      <QuoteRequestFlow />
    </Suspense>
  );
}
