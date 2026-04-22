import { redirect } from "next/navigation";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  redirect(params.order ? `/quote-request/success?quote=${encodeURIComponent(params.order)}` : "/quote-request/success");
}
