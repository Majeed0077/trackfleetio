const recentSessions = [
  {
    device: "Chrome on Windows",
    location: "Karachi, Pakistan",
    status: "Current session",
  },
  {
    device: "Safari on iPhone",
    location: "Lahore, Pakistan",
    status: "Last active 2 hours ago",
  },
  {
    device: "Edge on Windows",
    location: "Islamabad, Pakistan",
    status: "Last active yesterday",
  },
];

export default function AccountSecurityPage() {
  return (
    <div className="account-grid">
      <article className="account-card">
        <div className="account-profile-head">
          <div>
            <p className="cart-drawer-label">Security</p>
            <h2>Password settings</h2>
            <p className="account-profile-copy">
              Update your password with compact fields and keep your account access secure.
            </p>
          </div>
          <div className="account-profile-actions">
            <button className="button button-secondary" type="button">
              Cancel
            </button>
            <button className="button button-primary" type="button">
              Update password
            </button>
          </div>
        </div>

        <div className="account-profile-form-card">
          <div className="account-profile-section">
            <div className="account-profile-section-head">
              <h3>Change password</h3>
              <p>Use a strong password with a mix of letters, numbers, and symbols.</p>
            </div>
            <div className="account-security-fields">
              <label className="account-profile-field">
                <span>Current password</span>
                <input
                  className="checkout-field account-profile-input"
                  type="password"
                  placeholder="Enter current password"
                />
              </label>
              <label className="account-profile-field">
                <span>New password</span>
                <input
                  className="checkout-field account-profile-input"
                  type="password"
                  placeholder="Enter new password"
                />
              </label>
              <label className="account-profile-field">
                <span>Confirm password</span>
                <input
                  className="checkout-field account-profile-input"
                  type="password"
                  placeholder="Repeat new password"
                />
              </label>
            </div>
          </div>
        </div>
      </article>

      <article className="account-card">
        <p className="cart-drawer-label">Sessions</p>
        <h3>Recent devices</h3>
        <div className="account-security-session-list">
          {recentSessions.map((session) => (
            <div className="account-security-session-item" key={`${session.device}-${session.location}`}>
              <div>
                <strong>{session.device}</strong>
                <p>{session.location}</p>
                <span>{session.status}</span>
              </div>
              <button className="button button-secondary" type="button">
                Revoke
              </button>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
