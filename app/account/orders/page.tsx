import Link from "next/link";

import { accountOrders } from "@/lib/account";

export default function AccountOrdersPage() {
  return (
    <article className="account-card">
      <p className="cart-drawer-label">Orders</p>
      <h2>Order history</h2>
      <div className="state-list">
        {accountOrders.map((order) => (
          <div className="state-list-item" key={order.id}>
            <div>
              <strong>{order.id}</strong>
              <p>
                {order.date} • {order.items} items • {order.total}
              </p>
              <span>
                {order.payment} / {order.fulfillment}
              </span>
            </div>
            <Link className="button button-secondary" href={`/account/orders/${order.id}`}>
              Track order
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
}
