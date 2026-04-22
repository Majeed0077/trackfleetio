export const getQuoteRequestHref = (productId?: string | null) =>
  productId ? `/quote-request?product=${encodeURIComponent(productId)}` : "/quote-request";
