"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

import type { AuthUser } from "@/store/store";

const defaultAvatar = "/Logo-L.png";

export function CustomerProfileForm({ user }: { user: AuthUser | null }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const [formState, setFormState] = useState({
    fullName: user?.name ?? "Track Fleetio User",
    workEmail: user?.email ?? "workspace@trackfleetio.com",
    phone: user?.phone ?? "+92 300 1234567",
    company: user?.company ?? "Track Fleetio",
  });

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleFieldChange =
    (field: keyof typeof formState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormState((currentValue) => ({
        ...currentValue,
        [field]: event.target.value,
      }));
    };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarPreview((currentValue) => {
      if (currentValue.startsWith("blob:")) {
        URL.revokeObjectURL(currentValue);
      }

      return URL.createObjectURL(file);
    });
  };

  return (
    <article className="account-card">
      <div className="account-profile-head">
        <div>
          <p className="cart-drawer-label">Profile</p>
          <h2>My profile</h2>
          <p className="account-profile-copy">
            Keep your contact details current for order updates, account access, and support.
          </p>
        </div>
        <div className="account-profile-actions">
          <button className="button button-secondary" type="button">
            Cancel
          </button>
          <button className="button button-primary" type="button">
            Save changes
          </button>
        </div>
      </div>

      <div className="account-profile-layout">
        <section className="account-profile-avatar-card">
          <div className="account-profile-avatar-frame">
            <Image
              className="account-profile-avatar-image"
              src={avatarPreview}
              alt="Profile preview"
              fill
              sizes="220px"
              unoptimized={avatarPreview.startsWith("blob:")}
            />
          </div>
          <div className="account-profile-avatar-meta">
            <strong>{formState.fullName}</strong>
            <span>{formState.company}</span>
          </div>
          <div className="account-profile-avatar-actions">
            <button
              className="button button-secondary account-profile-avatar-button"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              Change photo
            </button>
            <button
              className="button account-profile-avatar-button"
              type="button"
              onClick={() => {
                if (avatarPreview.startsWith("blob:")) {
                  URL.revokeObjectURL(avatarPreview);
                }
                setAvatarPreview(defaultAvatar);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Remove
            </button>
            <input
              ref={fileInputRef}
              className="sr-only"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleAvatarChange}
            />
          </div>
          <p className="account-profile-helper">PNG, JPG, or WEBP. Square photo works best.</p>
        </section>

        <section className="account-profile-form-card">
          <div className="account-profile-section">
            <div className="account-profile-section-head">
              <h3>Personal details</h3>
              <p>Small, quick-edit fields for your everyday account info.</p>
            </div>
            <div className="account-profile-fields">
              <label className="account-profile-field">
                <span>Full name</span>
                <input
                  className="checkout-field account-profile-input"
                  type="text"
                  value={formState.fullName}
                  onChange={handleFieldChange("fullName")}
                />
              </label>
              <label className="account-profile-field">
                <span>Work email</span>
                <input
                  className="checkout-field account-profile-input"
                  type="email"
                  value={formState.workEmail}
                  onChange={handleFieldChange("workEmail")}
                />
              </label>
              <label className="account-profile-field">
                <span>Phone</span>
                <input
                  className="checkout-field account-profile-input"
                  type="text"
                  value={formState.phone}
                  onChange={handleFieldChange("phone")}
                />
              </label>
            </div>
          </div>

          <div className="account-profile-section">
            <div className="account-profile-section-head">
              <h3>Company</h3>
              <p>Business name linked with your orders, quotes, and support requests.</p>
            </div>
            <div className="account-profile-fields">
              <label className="account-profile-field">
                <span>Company</span>
                <input
                  className="checkout-field account-profile-input"
                  type="text"
                  value={formState.company}
                  onChange={handleFieldChange("company")}
                />
              </label>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
