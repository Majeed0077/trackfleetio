export type NewsletterInput = {
  email?: string;
};

export const submitMockNewsletter = async (input: NewsletterInput) => {
  const email = input.email?.trim() ?? "";

  if (!email) {
    return {
      ok: false as const,
      status: 400,
      message: "Enter a valid email address.",
    };
  }

  return {
    ok: true as const,
    message: "Newsletter request received. Our team will follow up shortly.",
  };
};
