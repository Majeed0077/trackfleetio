import { CheckoutRedirectClient } from "@/components/CheckoutRedirectClient";
import { Suspense } from "react";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutRedirectClient mode="success" />
    </Suspense>
  );
}
