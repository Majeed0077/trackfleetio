import Link from "next/link";
import type { ReactNode } from "react";

import { NavbarInteractive } from "@/components/NavbarInteractive";
import { NavScrollIndicator } from "@/components/NavScrollIndicator";
import { ThemeLogo } from "@/components/ThemeLogo";

function NavbarBrand(): ReactNode {
  return (
    <Link className="brand" href="/" aria-label="Track Fleetio home">
      <span className="logo-container">
        <ThemeLogo
          className="brand-logo"
          alt="Track Fleetio logo"
          width={188}
          height={46}
          priority
        />
      </span>
    </Link>
  );
}

export function Navbar() {
  return <NavbarInteractive brand={<NavbarBrand />} scrollIndicator={<NavScrollIndicator />} />;
}
