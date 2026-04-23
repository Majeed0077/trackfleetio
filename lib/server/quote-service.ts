import { getProductById } from "@/data/products";
import {
  emailPattern,
  hasOnlyAllowedKeys,
  isPlainObject,
  normalizeEmailAddress,
  normalizeText,
  phonePattern,
} from "@/lib/server/validation";

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
    !isPlainObject(input) ||
    !hasOnlyAllowedKeys(input, [
      "productId",
      "industry",
      "fleetSize",
      "firstName",
      "lastName",
      "phone",
      "email",
      "company",
    ])
  ) {
    return {
      ok: false as const,
      status: 400,
      message: "Unexpected quote request fields were provided.",
    };
  }

  const productId =
    typeof input.productId === "string" && input.productId.trim()
      ? input.productId.trim().slice(0, 80)
      : null;
  const industry = normalizeText(input.industry, 120);
  const fleetSize = normalizeText(input.fleetSize, 80);
  const firstName = normalizeText(input.firstName, 80);
  const lastName = normalizeText(input.lastName, 80);
  const phone = normalizeText(input.phone, 40);
  const email = normalizeEmailAddress(input.email);
  const company = normalizeText(input.company, 160);

  if (
    !industry ||
    !fleetSize ||
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !company
  ) {
    return {
      ok: false as const,
      status: 400,
      message: "Industry, fleet size, and full contact details are required.",
    };
  }

  if (!emailPattern.test(email)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid email address.",
    };
  }

  if (email.length > 320) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid email address.",
    };
  }

  if (!phonePattern.test(phone)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid phone number.",
    };
  }

  if (
    industry.length > 120 ||
    fleetSize.length > 80 ||
    firstName.length > 80 ||
    lastName.length > 80 ||
    phone.length > 40 ||
    company.length > 160
  ) {
    return {
      ok: false as const,
      status: 400,
      message: "One or more quote request fields are too long.",
    };
  }

  const selectedProduct = productId ? getProductById(productId) : null;
  const quoteId = `TFQ-${Math.floor(Date.now() / 1000)}`;

  return {
    ok: true as const,
    quoteId,
    product: selectedProduct?.title ?? null,
    message: "Quote request captured successfully.",
  };
};
