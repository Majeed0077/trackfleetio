type UserLike = {
  role?: string;
} | null | undefined;

export const DEMO_USER_EMAIL = "demo@trackfleetio.com";
export const DEMO_USER_PASSWORD = "TrackFleet123";
export const DEMO_ADMIN_EMAIL = "admin@trackfleetio.com";
export const DEMO_ADMIN_PASSWORD = "Admin123!";
export const DEMO_ACCESS_MESSAGE = `Use ${DEMO_USER_EMAIL} / ${DEMO_USER_PASSWORD} or ${DEMO_ADMIN_EMAIL} / ${DEMO_ADMIN_PASSWORD} for demo access.`;

export const getSafeStorefrontRedirectPath = (value: string | null | undefined) => {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/admin")) {
    return "";
  }

  return value;
};

export const getSafeAdminRedirectPath = (value: string | null | undefined) => {
  if (!value || !value.startsWith("/admin") || value.startsWith("//")) {
    return "/admin/dashboard";
  }

  return value;
};

export const getPostLoginPath = (
  user: UserLike,
  redirectPath?: string | null,
) => {
  if (user?.role === "admin") {
    return getSafeAdminRedirectPath(redirectPath);
  }

  return getSafeStorefrontRedirectPath(redirectPath) || "/";
};
