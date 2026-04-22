import { redirect } from "next/navigation";

export default async function CheckoutFailurePage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const params = await searchParams;
  redirect(
    params.reason
      ? `/quote-request/failure?reason=${encodeURIComponent(params.reason)}`
      : "/quote-request/failure",
  );
}
