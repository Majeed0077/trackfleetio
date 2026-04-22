"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { QuoteRequestFlow } from "@/components/QuoteRequestFlow";
import type { Product } from "@/data/products";

export function QuoteRequestLauncher({
  label = null,
  className,
  ariaLabel,
  product = null,
  children = null,
}: {
  label?: ReactNode;
  className: string;
  ariaLabel?: string;
  product?: Product | null;
  children?: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 820px)");

    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncViewport);
    } else {
      mediaQuery.addListener(syncViewport);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncViewport);
      } else {
        mediaQuery.removeListener(syncViewport);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("quote-request-modal-open");
      return;
    }

    document.body.classList.add("quote-request-modal-open");

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onDocumentKeyDown);

    return () => {
      document.body.classList.remove("quote-request-modal-open");
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={className}
        type="button"
        aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
        onClick={() => setIsOpen(true)}
      >
        {children ?? label}
      </button>

      {typeof document !== "undefined" && isOpen
        ? createPortal(
            <div
              className={`quote-request-modal-overlay${isMobile ? " is-drawer" : " is-dialog"}`}
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setIsOpen(false);
                }
              }}
            >
              <div
                className={`quote-request-modal-shell${isMobile ? " is-drawer" : " is-dialog"}`}
                role="dialog"
                aria-modal="true"
                aria-label={typeof label === "string" ? label : "Quote request form"}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <button
                  className="quote-request-modal-close"
                  type="button"
                  aria-label="Close quote request"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} strokeWidth={1.9} />
                </button>
                <div className="quote-request-modal-body">
                  <QuoteRequestFlow selectedProduct={product} embedded />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
