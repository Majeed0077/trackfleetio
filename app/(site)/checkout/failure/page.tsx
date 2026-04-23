import { CheckoutRedirectClient } from "@/components/CheckoutRedirectClient";
import { Suspense } from "react";

export default function CheckoutFailurePage() {
  return (
    <Suspense fallback={null}>
      <CheckoutRedirectClient mode="failure" />
    </Suspense>
  );
}
