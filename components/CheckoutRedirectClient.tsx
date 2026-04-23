"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function CheckoutRedirectClient({
  mode,
}: {
  mode: "success" | "failure";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (mode === "success") {
      const order = searchParams.get("order");
      router.replace(order ? `/quote-request/success?quote=${encodeURIComponent(order)}` : "/quote-request/success");
      return;
    }

    const reason = searchParams.get("reason");
    router.replace(
      reason
        ? `/quote-request/failure?reason=${encodeURIComponent(reason)}`
        : "/quote-request/failure",
    );
  }, [mode, router, searchParams]);

  return null;
}
