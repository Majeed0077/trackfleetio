export default function AccountProfilePage() {
  return (
    <article className="account-card">
      <p className="cart-drawer-label">Profile</p>
      <h2>Edit profile details</h2>
      <div className="account-grid-nested">
        <div className="account-stat-card">
          <label className="checkout-field-label">Full name</label>
          <input className="checkout-field" type="text" defaultValue="Track Fleetio User" />
        </div>
        <div className="account-stat-card">
          <label className="checkout-field-label">Work email</label>
          <input className="checkout-field" type="email" defaultValue="demo@trackfleetio.com" />
        </div>
        <div className="account-stat-card">
          <label className="checkout-field-label">Company</label>
          <input className="checkout-field" type="text" defaultValue="Track Fleetio" />
        </div>
        <div className="account-stat-card">
          <label className="checkout-field-label">Phone</label>
          <input className="checkout-field" type="text" defaultValue="+92 300 1234567" />
        </div>
      </div>
    </article>
  );
}
