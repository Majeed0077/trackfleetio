import Link from "next/link";

import styles from "@/components/admin/Admin.module.css";
import type { AdminResolvedSearchParams } from "@/lib/admin-pagination";

function buildPaginationHref(searchParams: AdminResolvedSearchParams, pageKey: string, page: number) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === pageKey || value == null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }

    params.set(key, value);
  });

  if (page > 1) {
    params.set(pageKey, String(page));
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageKey = "page",
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageKey?: string;
  searchParams: AdminResolvedSearchParams;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const start = (currentPage - 1) * 10 + 1;
  const end = Math.min(currentPage * 10, totalItems);
  const previousHref = buildPaginationHref(searchParams, pageKey, currentPage - 1);
  const nextHref = buildPaginationHref(searchParams, pageKey, currentPage + 1);

  return (
    <nav className={styles.adminPagination} aria-label="Pagination">
      <p className={styles.adminPaginationMeta}>
        Showing {start}-{end} of {totalItems}
      </p>
      <div className={styles.adminPaginationActions}>
        {currentPage > 1 ? (
          <Link className={styles.adminPaginationLink} href={previousHref}>
            Previous
          </Link>
        ) : (
          <span className={styles.adminPaginationLinkDisabled}>Previous</span>
        )}
        <span className={styles.adminPaginationCurrent}>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Link className={styles.adminPaginationLink} href={nextHref}>
            Next
          </Link>
        ) : (
          <span className={styles.adminPaginationLinkDisabled}>Next</span>
        )}
      </div>
    </nav>
  );
}
