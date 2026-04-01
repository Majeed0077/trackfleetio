"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialLinks = [
  { label: "Twitter", href: "https://x.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
] as const;

function FooterStaticLink({ children }: { children: string }) {
  return <span className="footer-link footer-link-static">{children}</span>;
}

export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const yearTimeout = window.setTimeout(() => {
      setCurrentYear(String(new Date().getFullYear()));
    }, 0);

    return () => {
      window.clearTimeout(yearTimeout);
    };
  }, []);

  const toggleSection = (key: string) => {
    setOpenSections((currentValue) => ({
      ...currentValue,
      [key]: !currentValue[key],
    }));
  };

  return (
    <footer id="footer" className="site-footer footer">
      <div className="container footer-container">
        <section className="footer-editorial-intro" aria-label="Footer overview">
          <div className="footer-editorial-copy">
            <p className="footer-editorial-eyebrow">Track Fleetio</p>
            <h2>
              <span className="footer-editorial-line">Fleet hardware for teams that need</span>
              <span className="footer-editorial-line">visibility without compromise.</span>
            </h2>
            <p>
              Tracking devices, video telematics, and sensors designed for rollout, day-to-day
              control, and support after deployment.
            </p>
          </div>

          <div className="footer-editorial-actions">
            <a className="footer-contact-link footer-editorial-contact" href="mailto:hello@trackfleetio.com">
              hello@trackfleetio.com
            </a>
            <div className="footer-editorial-buttons">
              <Link className="button button-primary" href="/contact">
                Request Demo
              </Link>
              <Link className="button button-secondary" href="/products">
                Explore Hardware
              </Link>
            </div>
          </div>
        </section>

        <div className="footer-grid">
          <section className={`footer-column footer-column-platform footer-column-products${openSections.products ? " is-open" : ""}`}>
            <button
              className="footer-title"
              type="button"
              aria-expanded={openSections.products ? "true" : "false"}
              aria-controls="footer-panel-products"
              onClick={() => toggleSection("products")}
            >
              Products
            </button>
            <div className="footer-links" id="footer-panel-products">
              <ul className="footer-link-list">
                <li>
                  <Link className="footer-link" href="/products">
                    GPS Trackers
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/products">
                    AI Dashcams
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/products">
                    Sensors
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/products">
                    All Products
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <section className={`footer-column footer-column-solutions${openSections.solutions ? " is-open" : ""}`}>
            <button
              className="footer-title"
              type="button"
              aria-expanded={openSections.solutions ? "true" : "false"}
              aria-controls="footer-panel-solutions"
              onClick={() => toggleSection("solutions")}
            >
              Solutions
            </button>
            <div className="footer-links" id="footer-panel-solutions">
              <ul className="footer-link-list">
                <li>
                  <Link className="footer-link" href="/solutions">
                    Fleet Management
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/solutions">
                    Safety &amp; Compliance
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/solutions">
                    Asset Tracking
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/solutions">
                    Operations Intelligence
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <section className={`footer-column footer-column-industries${openSections.industries ? " is-open" : ""}`}>
            <button
              className="footer-title"
              type="button"
              aria-expanded={openSections.industries ? "true" : "false"}
              aria-controls="footer-panel-industries"
              onClick={() => toggleSection("industries")}
            >
              Industries
            </button>
            <div className="footer-links" id="footer-panel-industries">
              <ul className="footer-link-list">
                <li>
                  <Link className="footer-link" href="/industries/transportation">
                    Transportation
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/industries/construction">
                    Construction
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/industries/logistics">
                    Logistics
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/industries/public-transport">
                    Public Transport
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <section className={`footer-column footer-column-company${openSections.company ? " is-open" : ""}`}>
            <button
              className="footer-title"
              type="button"
              aria-expanded={openSections.company ? "true" : "false"}
              aria-controls="footer-panel-company"
              onClick={() => toggleSection("company")}
            >
              Company
            </button>
            <div className="footer-links" id="footer-panel-company">
              <ul className="footer-link-list">
                <li>
                  <Link className="footer-link" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/partners">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/careers">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="footer-legal-row">
          <Link className="footer-brand" href="/" aria-label="Track Fleetio home">
            <Image
              className="brand-logo"
              src="/New-logo.png"
              alt="Track Fleetio logo"
              width={164}
              height={40}
            />
          </Link>

          <div className="footer-legal-meta">
            <div className="social-row footer-legal-social" aria-label="Social links">
              <a href={socialLinks[0].href} aria-label={socialLinks[0].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><path d="M22 5.9c-.7.3-1.4.5-2.2.6a3.8 3.8 0 0 0 1.7-2.1 7.7 7.7 0 0 1-2.4.9 3.8 3.8 0 0 0-6.5 3.5 10.9 10.9 0 0 1-7.9-4 3.8 3.8 0 0 0 1.2 5 3.7 3.7 0 0 1-1.7-.5v.1a3.8 3.8 0 0 0 3.1 3.7 3.8 3.8 0 0 1-1.7.1 3.8 3.8 0 0 0 3.5 2.6A7.7 7.7 0 0 1 3 18a10.8 10.8 0 0 0 5.8 1.7c7 0 10.8-5.8 10.8-10.8v-.5A7.8 7.8 0 0 0 22 5.9Z" /></svg>
              </a>
              <a href={socialLinks[1].href} aria-label={socialLinks[1].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><path d="M6.5 8.5V19" /><path d="M6.5 5a1 1 0 1 0 0 .01" /><path d="M11 19v-6a2.5 2.5 0 0 1 5 0v6" /><path d="M11 10h5" /></svg>
              </a>
              <a href={socialLinks[2].href} aria-label={socialLinks[2].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" /><path d="M17 7.5h.01" /></svg>
              </a>
              <a href={socialLinks[3].href} aria-label={socialLinks[3].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><path d="M22 12s0-3-1-4.5c-.9-1-1.9-1-2.4-1.1C15.2 6 12 6 12 6h0s-3.2 0-6.6.4C4.9 6.5 3.9 6.5 3 7.5 2 9 2 12 2 12s0 3 1 4.5c.9 1 2.2 1 2.8 1.1 2 .2 6.2.4 6.2.4s3.2 0 6.6-.4c.5-.1 1.5-.1 2.4-1.1C22 15 22 12 22 12Z" /><path d="m10 9 5 3-5 3V9Z" /></svg>
              </a>
            </div>
            <div className="footer-legal-links">
              <FooterStaticLink>Privacy</FooterStaticLink>
              <FooterStaticLink>Terms</FooterStaticLink>
              <FooterStaticLink>Security</FooterStaticLink>
            </div>
          </div>

          <p className="footer-copyright">
            &copy; <span>{currentYear}</span> Track Fleetio
          </p>
        </div>
      </div>
    </footer>
  );
}
