import { DEMO_ACCESS_MESSAGE } from "@/lib/demo-auth";
import { authCookieConfig, authenticateDemoUser, createSessionToken, createSignedUser, getSessionUser } from "@/lib/auth";
import type { AuthUser } from "@/store/store";

export type LoginInput = {
  email?: string;
  password?: string;
};

export type SignupInput = {
  name?: string;
  email?: string;
  password?: string;
  company?: string;
  phone?: string;
};

export const loginDemoUser = async (input: LoginInput) => {
  const email = input.email?.trim() ?? "";
  const password = input.password ?? "";

  if (!email || !password) {
    return {
      ok: false as const,
      status: 400,
      message: "Email and password are required.",
    };
  }

  const account = authenticateDemoUser(email, password);

  if (!account) {
    return {
      ok: false as const,
      status: 401,
      message: DEMO_ACCESS_MESSAGE,
    };
  }

  const user: AuthUser = {
    isAuthenticated: true,
    name: account.name,
    email: account.email,
    role: account.role,
    roleLabel: account.roleLabel,
    company: account.company,
    phone: account.phone,
  };

  return {
    ok: true as const,
    user,
    token: await createSessionToken(account),
  };
};

export const signupDemoUser = async (input: SignupInput) => {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const password = input.password ?? "";

  if (!name || !email || password.length < 8) {
    return {
      ok: false as const,
      status: 400,
      message: "Name, email, and a password with at least 8 characters are required.",
    };
  }

  const user = createSignedUser({
    name,
    email,
    company: input.company,
    phone: input.phone,
  });

  return {
    ok: true as const,
    user,
    token: await createSessionToken(user),
  };
};

export const getDemoSession = async () => {
  const user = await getSessionUser();

  return {
    ok: true as const,
    user,
  };
};

export const getLogoutCookieConfig = () => ({
  ...authCookieConfig,
  maxAge: 0,
  value: "",
});
