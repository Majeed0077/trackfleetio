import { emailPattern, hasOnlyAllowedKeys, isPlainObject, normalizeEmailAddress, normalizeOptionalText, normalizeText, phonePattern } from "@/lib/server/validation";

export type CheckoutInput = {
  items?: Array<{
    id?: string;
    quantity?: number;
  }>;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  billing?: string;
  shipping?: string;
  notes?: string;
};

export const createMockCheckout = async (input: CheckoutInput) => {
  if (
    !isPlainObject(input) ||
    !hasOnlyAllowedKeys(input, [
      "items",
      "name",
      "company",
      "email",
      "phone",
      "billing",
      "shipping",
      "notes",
    ])
  ) {
    return {
      ok: false as const,
      status: 400,
      message: "Unexpected checkout fields were provided.",
    };
  }

  const name = normalizeText(input.name, 120);
  const company = normalizeOptionalText(input.company, 160);
  const email = normalizeEmailAddress(input.email);
  const phone = normalizeOptionalText(input.phone, 40);
  const billing = normalizeOptionalText(input.billing, 500);
  const shipping = normalizeOptionalText(input.shipping, 500);
  const notes = normalizeOptionalText(input.notes, 1000);
  const items = Array.isArray(input.items)
    ? input.items
        .filter((item): item is { id?: string; quantity?: number } => isPlainObject(item))
        .map((item) => ({
          id: normalizeText(item.id, 80),
          quantity: typeof item.quantity === "number" ? Math.trunc(item.quantity) : Number.NaN,
        }))
    : [];

  if (!items.length || !name || !email) {
    return {
      ok: false as const,
      status: 400,
      message: "Checkout items, name, and email are required.",
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

  if (phone && !phonePattern.test(phone)) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid phone number.",
    };
  }

  if (
    name.length > 120 ||
    company.length > 160 ||
    phone.length > 40 ||
    billing.length > 500 ||
    shipping.length > 500 ||
    notes.length > 1000
  ) {
    return {
      ok: false as const,
      status: 400,
      message: "One or more checkout fields are too long.",
    };
  }

  const hasInvalidItem = items.some((item) => !item.id || !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 999);

  if (hasInvalidItem) {
    return {
      ok: false as const,
      status: 400,
      message: "Checkout items are invalid.",
    };
  }

  void company;
  void billing;
  void shipping;
  void notes;

  const orderId = `TF-${Math.floor(Date.now() / 1000)}`;

  return {
    ok: true as const,
    orderId,
    message: "Mock checkout captured successfully.",
  };
};
