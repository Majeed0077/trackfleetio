import { emailPattern, hasOnlyAllowedKeys, isPlainObject, normalizeEmailAddress, normalizeOptionalText, normalizeText } from "@/lib/server/validation";

export type ContactInput = {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
};

export const submitMockContact = async (input: ContactInput) => {
  if (!isPlainObject(input) || !hasOnlyAllowedKeys(input, ["name", "company", "email", "message"])) {
    return {
      ok: false as const,
      status: 400,
      message: "Unexpected contact fields were provided.",
    };
  }

  const name = normalizeText(input.name, 120);
  const company = normalizeOptionalText(input.company, 160);
  const email = normalizeEmailAddress(input.email);
  const message = normalizeText(input.message, 2000);

  if (!name || !email || !message) {
    return {
      ok: false as const,
      status: 400,
      message: "Name, email, and message are required.",
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

  if (name.length > 120) {
    return {
      ok: false as const,
      status: 400,
      message: "Name must be 120 characters or fewer.",
    };
  }

  if (company.length > 160) {
    return {
      ok: false as const,
      status: 400,
      message: "Company must be 160 characters or fewer.",
    };
  }

  if (message.length > 2000) {
    return {
      ok: false as const,
      status: 400,
      message: "Message must be 2000 characters or fewer.",
    };
  }

  return {
    ok: true as const,
    message: "Contact request received. Track Fleetio will respond soon.",
  };
};
