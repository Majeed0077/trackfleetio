"use client";

import { useState } from "react";

import styles from "@/components/admin/Admin.module.css";

export function AdminOrderWorkflowPanel() {
  const [openModal, setOpenModal] = useState<"cancel" | "refund" | null>(null);

  return (
    <>
      <div className={styles.adminActions}>
        <button className="button button-secondary" type="button" onClick={() => setOpenModal("refund")}>
          Refund order
        </button>
        <button className="button button-secondary" type="button" onClick={() => setOpenModal("cancel")}>
          Cancel order
        </button>
      </div>

      {openModal ? (
        <div className="workflow-modal-backdrop" role="presentation" onClick={() => setOpenModal(null)}>
          <div className="workflow-modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <p className="cart-drawer-label">{openModal === "cancel" ? "Cancel workflow" : "Refund workflow"}</p>
            <h3>{openModal === "cancel" ? "Cancel this order" : "Issue a refund"}</h3>
            <p>
              Capture the reason before firing customer notifications, inventory releases, and payment updates.
            </p>
            <textarea
              className="workflow-modal-field"
              placeholder={
                openModal === "cancel"
                  ? "Reason for cancellation, customer impact, and stock release notes"
                  : "Refund reason, amount scope, and payment reference"
              }
            />
            <div className="workflow-modal-actions">
              <button className="button button-secondary" type="button" onClick={() => setOpenModal(null)}>
                Close
              </button>
              <button className="button button-primary" type="button" onClick={() => setOpenModal(null)}>
                Confirm {openModal === "cancel" ? "cancellation" : "refund"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
