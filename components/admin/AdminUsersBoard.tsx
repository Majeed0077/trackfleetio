"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateAdminUserQuickSettings } from "@/app/admin/users/actions";
import { AdminStatusBadge } from "@/components/admin/AdminUi";
import styles from "@/components/admin/Admin.module.css";

type AdminUserStatusOption = {
  value: string;
  label: string;
};

type AdminUsersBoardUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  roleLabel: string;
  status: string;
  statusLabel: string;
  company: string;
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

const getRolePills = (roleLabel: string) =>
  roleLabel
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean);

export function AdminUsersBoard({
  users,
  statusOptions,
}: {
  users: AdminUsersBoardUser[];
  statusOptions: ReadonlyArray<AdminUserStatusOption>;
}) {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users],
  );

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedUser]);

  return (
    <>
      <div className={styles.adminUsersBoard}>
        <div className={styles.adminUsersBoardHeader}>
          <span>Name</span>
          <span>Company</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        <div className={styles.adminUsersCardList}>
          {users.map((user) => {
            const rolePills = getRolePills(user.roleLabel);
            const companyPill = rolePills[1] ?? user.company ?? "No company";

            return (
              <article className={styles.adminUserCard} key={user.id}>
                <div className={styles.adminUserCardMain}>
                  <div className={styles.adminUserIdentity}>
                    <div className={styles.adminUserAvatarWrap}>
                      <span className={styles.adminUserAvatarLarge}>{getInitials(user.name)}</span>
                      <span className={styles.adminUserPresence} aria-hidden="true" />
                    </div>
                    <div className={styles.adminUserIdentityCopy}>
                      <strong className={styles.adminUserIdentityName}>{user.name}</strong>
                      <span className={styles.adminUserIdentityEmail}>{user.email}</span>
                    </div>
                  </div>

                  <div className={styles.adminUserRolePills}>
                    <span className={styles.adminUserRolePill}>{companyPill}</span>
                  </div>

                  <div className={styles.adminUserStatusWrap}>
                    <AdminStatusBadge value={user.statusLabel} />
                  </div>

                  <div className={styles.adminUserCardActions}>
                    <button className="button button-secondary" type="button" onClick={() => setSelectedUserId(user.id)}>
                      Edit
                    </button>

                    <Link className="button button-secondary" href={`/admin/users/manage?email=${encodeURIComponent(user.email)}`}>
                      Manage
                    </Link>

                    <Link
                      aria-label={`Open more actions for ${user.name}`}
                      className={styles.adminUserMoreButton}
                      href={`/admin/users/manage?email=${encodeURIComponent(user.email)}`}
                    >
                      <MoreVertical size={16} strokeWidth={1.8} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedUser ? (
        <div className={styles.adminModalBackdrop} role="presentation" onClick={() => setSelectedUserId(null)}>
          <div
            className={styles.adminModalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-user-edit-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.adminModalHeader}>
              <div className={styles.adminPageHeaderCopy}>
                <h2 className={styles.adminPageHeaderTitle} id="admin-user-edit-title">Edit user access</h2>
                <p className={styles.adminPageHeaderText}>
                  Update account status for {selectedUser.name}.
                </p>
              </div>
              <button
                className={styles.adminModalClose}
                type="button"
                aria-label="Close edit user modal"
                onClick={() => setSelectedUserId(null)}
              >
                x
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(event.currentTarget);

                startTransition(() => {
                  void updateAdminUserQuickSettings(formData).then(() => {
                    setSelectedUserId(null);
                    router.refresh();
                  });
                });
              }}
            >
              <div className={styles.adminModalScroll}>
                <input type="hidden" name="userId" value={selectedUser.id} />
                <input type="hidden" name="userEmail" value={selectedUser.email} />

                <div className={styles.adminFieldRow}>
                  <label className={styles.adminUserEditField}>
                    <span>Status</span>
                    <select
                      className={styles.adminInlineSelect}
                      name="status"
                      defaultValue={selectedUser.status}
                      aria-label={`Status for ${selectedUser.name}`}
                    >
                      {statusOptions.map((statusOption) => (
                        <option key={statusOption.value} value={statusOption.value}>
                          {statusOption.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className={styles.adminModalActions}>
                <button className="button button-secondary" type="button" onClick={() => setSelectedUserId(null)}>
                  Cancel
                </button>
                <button className="button button-primary" type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
