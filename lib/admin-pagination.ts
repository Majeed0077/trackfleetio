export const ADMIN_ITEMS_PER_PAGE = 10;

export type AdminResolvedSearchParams = Record<string, string | string[] | undefined>;
export type AdminSearchParams = Promise<AdminResolvedSearchParams>;

export function getPageFromSearchParams(searchParams: AdminResolvedSearchParams, pageKey = "page") {
  const rawValue = searchParams[pageKey];
  const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
  const page = Number.parseInt(value ?? "1", 10);

  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function paginateItems<T>(
  items: ReadonlyArray<T>,
  currentPage: number,
  perPage = ADMIN_ITEMS_PER_PAGE,
) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    currentPage: safePage,
    items: items.slice(startIndex, endIndex),
    perPage,
    totalItems,
    totalPages,
  };
}

export function getPagination<T>(
  items: ReadonlyArray<T>,
  searchParams: AdminResolvedSearchParams,
  pageKey = "page",
  perPage = ADMIN_ITEMS_PER_PAGE,
) {
  return paginateItems(items, getPageFromSearchParams(searchParams, pageKey), perPage);
}
