import { getProductById } from "@/data/products";

export type QuoteRequestInput = {
  productId?: string | null;
  industry?: string;
  fleetSize?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
};

export const submitMockQuoteRequest = async (input: QuoteRequestInput) => {
  if (
    !input.industry?.trim() ||
    !input.fleetSize?.trim() ||
    !input.firstName?.trim() ||
    !input.lastName?.trim() ||
    !input.phone?.trim() ||
    !input.email?.trim() ||
    !input.company?.trim()
  ) {
    return {
      ok: false as const,
      status: 400,
      message: "Industry, fleet size, and full contact details are required.",
    };
  }

  const selectedProduct = input.productId ? getProductById(input.productId) : null;
  const quoteId = `TFQ-${Math.floor(Date.now() / 1000)}`;

  return {
    ok: true as const,
    quoteId,
    product: selectedProduct?.title ?? null,
    message: "Quote request captured successfully.",
  };
};
