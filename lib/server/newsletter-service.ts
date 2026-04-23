import { emailPattern, hasOnlyAllowedKeys, isPlainObject, normalizeEmailAddress } from "@/lib/server/validation";

export type NewsletterInput = {
  email?: string;
};

export const submitMockNewsletter = async (input: NewsletterInput) => {
  if (!isPlainObject(input) || !hasOnlyAllowedKeys(input, ["email"])) {
    return {
      ok: false as const,
      status: 400,
      message: "Unexpected newsletter fields were provided.",
    };
  }

  const email = normalizeEmailAddress(input.email);

  if (!email || !emailPattern.test(email)) {
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

  return {
    ok: true as const,
    message: "Newsletter request received. Our team will follow up shortly.",
  };
};
