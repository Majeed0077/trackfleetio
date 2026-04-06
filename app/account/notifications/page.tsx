import { accountNotificationPreferences } from "@/lib/account";

export default function AccountNotificationsPage() {
  return (
    <article className="account-card">
      <p className="cart-drawer-label">Notifications</p>
      <h2>Notification preferences</h2>
      <div className="state-list">
        {accountNotificationPreferences.map((item) => (
          <div className="state-list-item" key={`${item.title}-${item.channel}`}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.channel}</p>
            </div>
            <span>{item.enabled ? "Enabled" : "Disabled"}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
