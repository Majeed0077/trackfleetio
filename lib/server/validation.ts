import "server-only";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^[+()\-\d\s]{7,20}$/;

export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const hasOnlyAllowedKeys = (
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
) => Object.keys(value).every((key) => allowedKeys.includes(key));

export const normalizeText = (value: unknown, maxLength?: number) => {
  void maxLength;
  return typeof value === "string" ? value.trim() : "";
};

export const normalizeOptionalText = (value: unknown, maxLength: number) => {
  const normalized = normalizeText(value, maxLength);
  return normalized || "";
};

export const normalizeEmailAddress = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";
