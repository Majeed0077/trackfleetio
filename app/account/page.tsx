import Link from "next/link";

import { accountOrders, accountSummary } from "@/lib/account";

export default function AccountOverviewPage() {
  return (
    <div className="account-grid">
      <article className="account-card">
        <p className="cart-drawer-label">Workspace summary</p>
        <h2>Customer account overview</h2>
        <div className="account-stat-grid">
          <div className="account-stat-card">
            <strong>{accountSummary.activeOrders}</strong>
            <span>Active orders</span>
          </div>
          <div className="account-stat-card">
            <strong>{accountSummary.savedAddresses}</strong>
            <span>Saved addresses</span>
          </div>
          <div className="account-stat-card">
            <strong>{accountSummary.notificationChannels}</strong>
            <span>Notification channels</span>
          </div>
        </div>
        <p>{accountSummary.securityStatus}</p>
      </article>

      <article className="account-card">
        <p className="cart-drawer-label">Recent orders</p>
        <h3>Latest order activity</h3>
        <div className="state-list">
          {accountOrders.slice(0, 2).map((order) => (
            <div className="state-list-item" key={order.id}>
              <div>
                <strong>{order.id}</strong>
                <p>
                  {order.payment} • {order.fulfillment}
                </p>
              </div>
              <Link className="auth-switch-link" href={`/account/orders/${order.id}`}>
                View
              </Link>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
