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
        <div className="footer-grid">
          <section className={`footer-column footer-column-products${openSections.products ? " is-open" : ""}`}>
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
              <div className="footer-group">
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
                      Fleet Cameras
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/products">
                      Gateways
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/products">
                      Sensors
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-group">
                <span className="footer-group-label">Shop</span>
                <ul className="footer-link-list">
                  <li>
                    <Link className="footer-link" href="/products">
                      Accessories
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/products">
                      Bundles
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/products">
                      Compare Products
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/products">
                      All Products
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-group">
                <span className="footer-group-label">Platform</span>
                <ul className="footer-link-list">
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Fleet Platform
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Safety AI
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Video Telematics
                    </Link>
                  </li>
                </ul>
              </div>
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
              <div className="footer-group">
                <ul className="footer-link-list">
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Fleet Management
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Safety &amp; Compliance
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Asset Tracking
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/#hardware">
                      Operations Intelligence
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-group">
                <span className="footer-group-label">Industries</span>
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
                    <Link className="footer-link" href="/industries/manufacturing">
                      Manufacturing
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/industries/public-transport">
                      Public Transport
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className={`footer-column footer-column-buying${openSections.buying ? " is-open" : ""}`}>
            <button
              className="footer-title"
              type="button"
              aria-expanded={openSections.buying ? "true" : "false"}
              aria-controls="footer-panel-buying"
              onClick={() => toggleSection("buying")}
            >
              Buying
            </button>
            <div className="footer-links" id="footer-panel-buying">
              <ul className="footer-link-list">
                <li>
                  <Link className="footer-link" href="#footer">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="#footer">
                    Request Quote
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="#footer">
                    Bulk Orders
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="#footer">
                    Enterprise Purchasing
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="#footer">
                    Deployment Services
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="#footer">
                    Installation Services
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <section className={`footer-column footer-column-support${openSections.support ? " is-open" : ""}`}>
            <button
              className="footer-title"
              type="button"
              aria-expanded={openSections.support ? "true" : "false"}
              aria-controls="footer-panel-support"
              onClick={() => toggleSection("support")}
            >
              Support
            </button>
            <div className="footer-links" id="footer-panel-support">
              <div className="footer-group">
                <span className="footer-group-label">Orders</span>
                <ul className="footer-link-list">
                  <li>
                    <Link className="footer-link" href="#footer">
                      Order Status
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Track Shipment
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Warranty
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-group">
                <span className="footer-group-label">Resources</span>
                <ul className="footer-link-list">
                  <li>
                    <Link className="footer-link" href="#footer">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Installation Guides
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Device Setup
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="#footer">
                      Troubleshooting
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link" href="/contact">
                      Contact Support
                    </Link>
                  </li>
                </ul>
              </div>
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
                  <Link className="footer-link" href="/careers">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/partners">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="#footer">
                    Security
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" href="#footer">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <section className="footer-column footer-contact footer-column-contact">
            <div className="footer-title footer-title-static">Contact</div>
            <div className="footer-contact-block">
              <div className="footer-group">
                <span className="footer-group-label">Talk to Sales</span>
                <a className="footer-contact-link" href="tel:+000000520">
                  +000 000 0520
                </a>
              </div>
            </div>
          </section>
        </div>

        <section className="footer-cta-row" aria-label="Get started">
          <div className="footer-cta-panel">
            <div className="footer-cta-copy">
              <span className="footer-group-label">Get Started</span>
              <a className="footer-contact-link" href="mailto:hello@trackfleetio.com">
                hello@trackfleetio.com
              </a>
            </div>
            <form
              className="footer-newsletter footer-newsletter-inline"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Email
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                name="email"
                placeholder="Enter your work email"
              />
              <button className="button button-primary footer-demo-button" type="submit">
                Book Demo
              </button>
            </form>
            <div className="footer-cta-social">
              <span className="footer-group-label">Social</span>
              <div className="social-row" aria-label="Social links">
                <a
                  href={socialLinks[0].href}
                  aria-label={socialLinks[0].label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22 5.9c-.7.3-1.4.5-2.2.6a3.8 3.8 0 0 0 1.7-2.1 7.7 7.7 0 0 1-2.4.9 3.8 3.8 0 0 0-6.5 3.5 10.9 10.9 0 0 1-7.9-4 3.8 3.8 0 0 0 1.2 5 3.7 3.7 0 0 1-1.7-.5v.1a3.8 3.8 0 0 0 3.1 3.7 3.8 3.8 0 0 1-1.7.1 3.8 3.8 0 0 0 3.5 2.6A7.7 7.7 0 0 1 3 18a10.8 10.8 0 0 0 5.8 1.7c7 0 10.8-5.8 10.8-10.8v-.5A7.8 7.8 0 0 0 22 5.9Z" />
                  </svg>
                </a>
                <a
                  href={socialLinks[1].href}
                  aria-label={socialLinks[1].label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6.5 8.5V19" />
                    <path d="M6.5 5a1 1 0 1 0 0 .01" />
                    <path d="M11 19v-6a2.5 2.5 0 0 1 5 0v6" />
                    <path d="M11 10h5" />
                  </svg>
                </a>
                <a
                  href={socialLinks[2].href}
                  aria-label={socialLinks[2].label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <path d="M9.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" />
                    <path d="M17 7.5h.01" />
                  </svg>
                </a>
                <a
                  href={socialLinks[3].href}
                  aria-label={socialLinks[3].label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22 12s0-3-1-4.5c-.9-1-1.9-1-2.4-1.1C15.2 6 12 6 12 6h0s-3.2 0-6.6.4C4.9 6.5 3.9 6.5 3 7.5 2 9 2 12 2 12s0 3 1 4.5c.9 1 2.2 1 2.8 1.1 2 .2 6.2.4 6.2.4s3.2 0 6.6-.4c.5-.1 1.5-.1 2.4-1.1C22 15 22 12 22 12Z" />
                    <path d="m10 9 5 3-5 3V9Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="footer-trust-row" aria-label="Enterprise trust signals">
          <span>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3Z" />
              <path d="M9 11.5 11 13.5l4-4" />
            </svg>
            Hardware warranty
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 8a8 8 0 0 1 16 0v5l-2 3H6l-2-3V8Z" />
              <path d="M9 19a3 3 0 0 0 6 0" />
            </svg>
            24/7 support
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V8a4 4 0 1 1 8 0v2" />
            </svg>
            Enterprise security
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 20h16" />
              <path d="M7 16v-4" />
              <path d="M12 16V8" />
              <path d="M17 16v-7" />
              <path d="M6 4h2l1 2-3 5H4l2-5Z" />
            </svg>
            Fast deployment
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 7.5h10v7H3z" />
              <path d="M13 10h3.5l2.5 2.5v2H13z" />
              <path d="M7 18.5a1.5 1.5 0 1 0 0 .01" />
              <path d="M17 18.5a1.5 1.5 0 1 0 0 .01" />
            </svg>
            Global shipping
          </span>
        </div>

        <div className="footer-legal-row">
          <Link className="footer-brand" href="/" aria-label="Track Fleetio home">
            <Image
              className="brand-logo"
              src="/logo.png"
              alt="Track Fleetio logo"
              width={164}
              height={40}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <div className="footer-legal-links">
            <Link className="footer-link" href="#footer">
              Privacy
            </Link>
            <Link className="footer-link" href="#footer">
              Terms
            </Link>
            <Link className="footer-link" href="#footer">
              Cookies
            </Link>
            <Link className="footer-link" href="#footer">
              Security
            </Link>
            <Link className="footer-link" href="#footer">
              Compliance
            </Link>
          </div>

          <p className="footer-copyright">
            &copy; <span>{currentYear}</span> Track Fleetio
          </p>
        </div>
      </div>
    </footer>
  );
}




