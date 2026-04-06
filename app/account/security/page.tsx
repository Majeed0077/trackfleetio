export default function AccountSecurityPage() {
  return (
    <div className="account-grid">
      <article className="account-card">
        <p className="cart-drawer-label">Security</p>
        <h2>Password and session settings</h2>
        <div className="account-grid-nested">
          <div className="account-stat-card">
            <label className="checkout-field-label">Current password</label>
            <input className="checkout-field" type="password" placeholder="Enter current password" />
          </div>
          <div className="account-stat-card">
            <label className="checkout-field-label">New password</label>
            <input className="checkout-field" type="password" placeholder="Enter new password" />
          </div>
          <div className="account-stat-card">
            <label className="checkout-field-label">Confirm new password</label>
            <input className="checkout-field" type="password" placeholder="Repeat new password" />
          </div>
        </div>
        <ul className="timeline-list">
          <li>Email verification status and resend action should live above the password form.</li>
          <li>Password change should rotate current sessions except the active one.</li>
          <li>Recent device sessions should be listed with revoke support.</li>
        </ul>
      </article>

      <article className="account-card">
        <p className="cart-drawer-label">Recommended next step</p>
        <h3>Wire auth tokens before launch</h3>
        <p>This UI is ready for password change, session management, and recovery status once Mongo-backed sessions are added.</p>
      </article>
    </div>
  );
}
