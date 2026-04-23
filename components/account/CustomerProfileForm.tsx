"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";

import { ProfileAvatar } from "@/components/ProfileAvatar";
import { getBrowserCsrfToken } from "@/lib/csrf";
import { getDefaultAvatarSrc, getResolvedAvatarSrc } from "@/lib/profile-avatar";
import { useAppStore, type AuthUser } from "@/store/store";

const MAX_AVATAR_DIMENSION = 720;
const AVATAR_OUTPUT_TYPE = "image/webp";
const AVATAR_OUTPUT_QUALITY = 0.86;

const getAvatarSrc = (user: AuthUser | null) =>
  getResolvedAvatarSrc({ avatarUrl: user?.avatarUrl, gender: user?.gender });

const getFormValuesFromUser = (user: AuthUser | null) => ({
  fullName: user?.name ?? "Track Fleetio User",
  workEmail: user?.email ?? "workspace@trackfleetio.com",
  phone: user?.phone ?? "",
  company: user?.company ?? "Track Fleetio",
  gender: user?.gender ?? "male",
});

const loadImageFromFile = async (file: File) => {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new window.Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Image preview failed."));
      nextImage.src = objectUrl;
    });

    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const optimizeAvatarFile = async (file: File) => {
  if (typeof window === "undefined") {
    return file;
  }

  const image = await loadImageFromFile(file);
  const longestSide = Math.max(image.naturalWidth, image.naturalHeight);

  if (!longestSide) {
    return file;
  }

  const scale = Math.min(1, MAX_AVATAR_DIMENSION / longestSide);
  const targetWidth = Math.max(1, Math.round(image.naturalWidth * scale));
  const targetHeight = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, AVATAR_OUTPUT_TYPE, AVATAR_OUTPUT_QUALITY);
  });

  if (!blob) {
    return file;
  }

  const optimizedExtension = AVATAR_OUTPUT_TYPE === "image/webp" ? "webp" : "jpg";
  const optimizedName = file.name.replace(/\.[^.]+$/, "") || "avatar";

  return new File([blob], `${optimizedName}.${optimizedExtension}`, {
    type: AVATAR_OUTPUT_TYPE,
    lastModified: Date.now(),
  });
};

export function CustomerProfileForm({ user }: { user: AuthUser | null }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setAuthUser = useAppStore((state) => state.setAuthUser);
  const showToast = useAppStore((state) => state.showToast);
  const [savedUser, setSavedUser] = useState(user);
  const initialAvatarSrc = useMemo(() => getAvatarSrc(savedUser), [savedUser]);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarSrc);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [removeAvatarOnSave, setRemoveAvatarOnSave] = useState(false);
  const [formState, setFormState] = useState(getFormValuesFromUser(user));
  const [currentPassword, setCurrentPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSavedUser(user);
    setFormState(getFormValuesFromUser(user));
    setAvatarPreview(getAvatarSrc(user));
    setPendingAvatarFile(null);
    setRemoveAvatarOnSave(false);
    setCurrentPassword("");
  }, [user]);

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

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setErrorMessage("");
    const optimizedFile = await optimizeAvatarFile(file).catch(() => file);

    setPendingAvatarFile(optimizedFile);
    setRemoveAvatarOnSave(false);
    setAvatarPreview((currentValue) => {
      if (currentValue.startsWith("blob:")) {
        URL.revokeObjectURL(currentValue);
      }

      return URL.createObjectURL(optimizedFile);
    });
  };

  const resetToCurrentUser = (nextUser: AuthUser | null = user) => {
    setErrorMessage("");
    setPendingAvatarFile(null);
    setRemoveAvatarOnSave(false);
    setSavedUser(nextUser);
    setFormState(getFormValuesFromUser(nextUser));
    setCurrentPassword("");
    setAvatarPreview((currentValue) => {
      if (currentValue.startsWith("blob:")) {
        URL.revokeObjectURL(currentValue);
      }

      return getAvatarSrc(nextUser);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasProfileChanges = useMemo(() => {
    const baselineValues = getFormValuesFromUser(savedUser);

    return (
      formState.fullName !== baselineValues.fullName ||
      formState.workEmail !== baselineValues.workEmail ||
      formState.phone !== baselineValues.phone ||
      formState.company !== baselineValues.company ||
      formState.gender !== baselineValues.gender ||
      Boolean(pendingAvatarFile) ||
      removeAvatarOnSave
    );
  }, [formState, pendingAvatarFile, removeAvatarOnSave, savedUser]);

  const handleRemoveAvatar = () => {
    setErrorMessage("");
    setPendingAvatarFile(null);
    setRemoveAvatarOnSave(Boolean(user?.avatarUrl));
    setAvatarPreview((currentValue) => {
      if (currentValue.startsWith("blob:")) {
        URL.revokeObjectURL(currentValue);
      }

      return getDefaultAvatarSrc(formState.gender);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const savePhotoChange = async (nextUser: AuthUser) => {
    if (removeAvatarOnSave && user?.avatarUrl) {
      const response = await fetch("/api/account/profile-photo", {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "x-csrf-token": getBrowserCsrfToken(),
        },
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; user?: AuthUser }
        | null;

      if (!response.ok || !payload?.ok || !payload.user) {
        throw new Error(payload?.message || "Photo remove failed.");
      }

      return payload.user;
    }

    if (!pendingAvatarFile) {
      return nextUser;
    }

    const formData = new FormData();
    formData.append("file", pendingAvatarFile);

    const response = await fetch("/api/account/profile-photo", {
      method: "POST",
      body: formData,
      credentials: "same-origin",
      headers: {
        "x-csrf-token": getBrowserCsrfToken(),
      },
    });
    const payload = (await response.json().catch(() => null)) as
      | { ok?: boolean; message?: string; user?: AuthUser }
      | null;

    if (!response.ok || !payload?.ok || !payload.user) {
      throw new Error(payload?.message || "Photo upload failed.");
    }

    return payload.user;
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setErrorMessage("");
    let latestUser: AuthUser | null = null;

    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": getBrowserCsrfToken(),
        },
        credentials: "same-origin",
        body: JSON.stringify({
          ...formState,
          currentPassword,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; pendingEmail?: string; user?: AuthUser }
        | null;

      if (!response.ok || !payload?.ok || !payload.user) {
        throw new Error(payload?.message || "Profile update failed.");
      }

      latestUser = payload.user;
      const updatedUser = await savePhotoChange(payload.user);
      latestUser = updatedUser;
      setAuthUser(updatedUser);
      resetToCurrentUser(updatedUser);
      showToast(payload?.message || "Profile updated");
    } catch (error) {
      if (latestUser) {
        setAuthUser(latestUser);
        resetToCurrentUser(latestUser);
      }

      setErrorMessage(error instanceof Error ? error.message : "Profile update failed.");
    } finally {
      setIsSaving(false);
    }
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
          <button className="button button-secondary" type="button" onClick={() => resetToCurrentUser()} disabled={isSaving}>
            Cancel
          </button>
          <button
            className="button button-primary"
            type="button"
            onClick={handleSaveChanges}
            disabled={isSaving || !hasProfileChanges}
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {errorMessage ? <p className="account-profile-feedback account-profile-feedback-error">{errorMessage}</p> : null}

      <div className="account-profile-layout">
        <section className="account-profile-avatar-card">
          <ProfileAvatar
            alt="Profile preview"
            className="account-profile-avatar-frame"
            imageClassName="account-profile-avatar-image"
            sizes="220px"
            src={avatarPreview}
            unoptimized={avatarPreview.startsWith("blob:")}
          />
          <div className="account-profile-avatar-meta">
            <strong>{formState.fullName}</strong>
            <span>{formState.company}</span>
          </div>
          <div className="account-profile-avatar-actions">
            <button
              className="button button-secondary account-profile-avatar-button"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving}
            >
              Change photo
            </button>
            <button
              className="button account-profile-avatar-button"
              type="button"
              onClick={handleRemoveAvatar}
              disabled={
                isSaving ||
                (!user?.avatarUrl &&
                  !pendingAvatarFile &&
                  avatarPreview === getDefaultAvatarSrc(formState.gender))
              }
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
                  disabled={isSaving}
                />
              </label>
              <label className="account-profile-field">
                <span>Work email</span>
                <input
                  className="checkout-field account-profile-input"
                  type="email"
                  value={formState.workEmail}
                  onChange={handleFieldChange("workEmail")}
                  disabled={isSaving}
                />
              </label>
              <label className="account-profile-field">
                <span>Current password</span>
                <input
                  className="checkout-field account-profile-input"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Required only to change email"
                  autoComplete="current-password"
                  disabled={isSaving}
                />
              </label>
              <label className="account-profile-field">
                <span>Phone</span>
                <input
                  className="checkout-field account-profile-input"
                  type="text"
                  value={formState.phone}
                  onChange={handleFieldChange("phone")}
                  disabled={isSaving}
                />
              </label>
              <label className="account-profile-field">
                <span>Gender</span>
                <select
                  className="checkout-field account-profile-input"
                  value={formState.gender}
                  onChange={(event) => {
                    const nextGender = event.target.value === "female" ? "female" : "male";

                    setFormState((currentValue) => ({
                      ...currentValue,
                      gender: nextGender,
                    }));

                    if (!pendingAvatarFile && (!user?.avatarUrl || removeAvatarOnSave)) {
                      setAvatarPreview((currentValue) => {
                        if (currentValue.startsWith("blob:")) {
                          URL.revokeObjectURL(currentValue);
                        }

                        return getDefaultAvatarSrc(nextGender);
                      });
                    }
                  }}
                  disabled={isSaving}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                  disabled={isSaving}
                />
              </label>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
