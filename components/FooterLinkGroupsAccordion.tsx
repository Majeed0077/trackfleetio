"use client";

import Link from "next/link";
import { useState } from "react";

import { footerLinkGroups } from "@/lib/content/footer";

export function FooterLinkGroupsAccordion() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections((currentValue) => ({
      ...currentValue,
      [key]: !currentValue[key],
    }));
  };

  return (
    <div className="footer-grid">
      {footerLinkGroups.map((group) => {
        const groupKey = group.title.toLowerCase();
        const panelId = `footer-panel-${groupKey}`;
        const isOpen = openSections[groupKey];

        return (
          <section
            key={group.title}
            className={`footer-column footer-column-${groupKey}${isOpen ? " is-open" : ""}`}
          >
            <button
              className="footer-title"
              type="button"
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls={panelId}
              onClick={() => toggleSection(groupKey)}
            >
              {group.title}
            </button>
            <div className="footer-links" id={panelId}>
              <ul className="footer-link-list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link className="footer-link" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
