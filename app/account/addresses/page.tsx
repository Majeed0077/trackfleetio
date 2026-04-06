import { accountAddresses } from "@/lib/account";

export default function AccountAddressesPage() {
  return (
    <article className="account-card">
      <p className="cart-drawer-label">Addresses</p>
      <h2>Saved billing and delivery addresses</h2>
      <div className="account-grid-nested">
        {accountAddresses.map((address) => (
          <div className="account-stat-card" key={address.label}>
            <strong>{address.label}</strong>
            <span>{address.company}</span>
            <span>{address.line1}</span>
            <span>
              {address.city}, {address.country}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
