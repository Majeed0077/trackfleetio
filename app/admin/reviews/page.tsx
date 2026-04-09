import { AdminPagination, AdminStatusBadge, AdminTable, AdminTableCard } from "@/components/admin/AdminUi";
import { adminReviews } from "@/lib/admin";
import { getPagination, type AdminSearchParams } from "@/lib/admin-pagination";

export default async function AdminReviewsPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const resolvedSearchParams = await searchParams;
  const reviewsPagination = getPagination(adminReviews, resolvedSearchParams);

  return (
    <AdminTableCard
      title="Reviews"
      description="Moderate product feedback, approve testimonial copy, and manage storefront trust signals."
    >
      <AdminTable
        headers={["Reviewer", "Product", "Rating", "Status", "Summary"]}
        rows={reviewsPagination.items.map((review) => (
          <tr key={`${review.name}-${review.product}`}>
            <td>{review.name}</td>
            <td>{review.product}</td>
            <td>{review.rating}</td>
            <td><AdminStatusBadge value={review.status} /></td>
            <td>{review.summary}</td>
          </tr>
        ))}
      />
      <AdminPagination {...reviewsPagination} searchParams={resolvedSearchParams} />
    </AdminTableCard>
  );
}
