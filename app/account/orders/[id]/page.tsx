import Link from "next/link";

import { accountOrderTimeline, accountOrders } from "@/lib/account";

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = accountOrders.find((item) => item.id === id) ?? accountOrders[0];
  const timeline = accountOrderTimeline.find((item) => item.id === order.id)?.entries ?? [];

  return (
    <div className="account-grid">
      <article className="account-card">
        <p className="cart-drawer-label">Order detail</p>
        <h2>{order.id}</h2>
        <p>
          {order.date} • {order.total}
        </p>
        <div className="state-meta">
          <span>{order.payment}</span>
          <span>{order.fulfillment}</span>
          <span>{order.items} items</span>
        </div>
        <div className="state-actions">
          <Link className="button button-secondary" href="/account/orders">
            Back to orders
          </Link>
          <Link className="button button-primary" href="/contact">
            Ask support
          </Link>
        </div>
      </article>

      <article className="account-card">
        <p className="cart-drawer-label">Timeline</p>
        <h3>Operational progress</h3>
        <ul className="timeline-list">
          {timeline.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
