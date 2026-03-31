export type ContactInput = {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
};

export const submitMockContact = async (input: ContactInput) => {
  if (!input.name?.trim() || !input.email?.trim() || !input.message?.trim()) {
    return {
      ok: false as const,
      status: 400,
      message: "Name, email, and message are required.",
    };
  }

  return {
    ok: true as const,
    message: "Contact request received. Track Fleetio will respond soon.",
  };
};
