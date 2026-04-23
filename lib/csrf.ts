export const CSRF_COOKIE_NAME = "trackfleetio_csrf";
export const CSRF_HEADER_NAME = "x-csrf-token";

const parseCookieValue = (cookieName: string) => {
  if (typeof document === "undefined") {
    return "";
  }

  const cookiePrefix = `${cookieName}=`;
  const cookie = document.cookie
    .split(";")
    .map((segment) => segment.trim())
    .find((segment) => segment.startsWith(cookiePrefix));

  if (!cookie) {
    return "";
  }

  return decodeURIComponent(cookie.slice(cookiePrefix.length));
};

export const getBrowserCsrfToken = () => parseCookieValue(CSRF_COOKIE_NAME);
