import Link from "next/link";
import { FooterEditorial } from "@/components/FooterEditorial";
import { FooterLinkGroupsAccordion } from "@/components/FooterLinkGroupsAccordion";
import { ThemeLogo } from "@/components/ThemeLogo";
import {
  footerBranding,
  footerLegalLinks,
  footerSocialLinks,
} from "@/lib/content/footer";

function FooterStaticLink({ children }: { children: string }) {
  return <span className="footer-link footer-link-static">{children}</span>;
}

export function Footer() {
  const currentYear = String(new Date().getFullYear());

  return (
    <footer id="footer" className="site-footer footer">
      <div className="container footer-container">
        <FooterEditorial />
        <FooterLinkGroupsAccordion />

        <div className="footer-legal-row">
          <Link className="footer-brand" href="/" aria-label="Track Fleetio home">
            <ThemeLogo
              className="brand-logo"
              alt="Track Fleetio logo"
              width={164}
              height={40}
            />
          </Link>

          <div className="footer-legal-meta">
            <div className="social-row footer-legal-social" aria-label="Social links">
              <a href={footerSocialLinks[0].href} aria-label={footerSocialLinks[0].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><path d="M22 5.9c-.7.3-1.4.5-2.2.6a3.8 3.8 0 0 0 1.7-2.1 7.7 7.7 0 0 1-2.4.9 3.8 3.8 0 0 0-6.5 3.5 10.9 10.9 0 0 1-7.9-4 3.8 3.8 0 0 0 1.2 5 3.7 3.7 0 0 1-1.7-.5v.1a3.8 3.8 0 0 0 3.1 3.7 3.8 3.8 0 0 1-1.7.1 3.8 3.8 0 0 0 3.5 2.6A7.7 7.7 0 0 1 3 18a10.8 10.8 0 0 0 5.8 1.7c7 0 10.8-5.8 10.8-10.8v-.5A7.8 7.8 0 0 0 22 5.9Z" /></svg>
              </a>
              <a href={footerSocialLinks[1].href} aria-label={footerSocialLinks[1].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><path d="M6.5 8.5V19" /><path d="M6.5 5a1 1 0 1 0 0 .01" /><path d="M11 19v-6a2.5 2.5 0 0 1 5 0v6" /><path d="M11 10h5" /></svg>
              </a>
              <a href={footerSocialLinks[2].href} aria-label={footerSocialLinks[2].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" /><path d="M17 7.5h.01" /></svg>
              </a>
              <a href={footerSocialLinks[3].href} aria-label={footerSocialLinks[3].label} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none"><path d="M22 12s0-3-1-4.5c-.9-1-1.9-1-2.4-1.1C15.2 6 12 6 12 6h0s-3.2 0-6.6.4C4.9 6.5 3.9 6.5 3 7.5 2 9 2 12 2 12s0 3 1 4.5c.9 1 2.2 1 2.8 1.1 2 .2 6.2.4 6.2.4s3.2 0 6.6-.4c.5-.1 1.5-.1 2.4-1.1C22 15 22 12 22 12Z" /><path d="m10 9 5 3-5 3V9Z" /></svg>
              </a>
            </div>
            <div className="footer-legal-links">
              {footerLegalLinks.map((label) => (
                <FooterStaticLink key={label}>{label}</FooterStaticLink>
              ))}
            </div>
          </div>

          <p className="footer-copyright">
            &copy; <span>{currentYear}</span> {footerBranding.copyrightLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
