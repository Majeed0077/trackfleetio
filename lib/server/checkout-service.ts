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
  if (!input.items?.length || !input.name?.trim() || !input.email?.trim()) {
    return {
      ok: false as const,
      status: 400,
      message: "Checkout items, name, and email are required.",
    };
  }

  const orderId = `TF-${Math.floor(Date.now() / 1000)}`;

  return {
    ok: true as const,
    orderId,
    message: "Mock checkout captured successfully.",
  };
};
