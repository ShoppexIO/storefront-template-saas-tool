"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Gamepad2, User } from "lucide-react";
import { themeConfig } from "@/lib/theme-config";

// CUSTOMIZE: Nav links — order shown in the floating pill.
const NAV_LINKS = [
  { href: "/products", label: "Products", match: ["/products"] },
  { href: "/status", label: "Status", match: ["/status"] },
  { href: "/tool", label: "Spoofer", match: ["/tool"] },
  { href: "/jobs", label: "Jobs", match: ["/jobs"] },
];

function isActive(pathname: string, match: string[]): boolean {
  return match.some((prefix) => pathname.startsWith(prefix));
}

export function FloatingPillNav() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const brandName = themeConfig.brandName.toLowerCase();
  const accentSegment = themeConfig.brandTaglineShort.split(" ")[0]
    ? `.${themeConfig.brandTaglineShort.split(" ")[0].toLowerCase()}`
    : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav-shell" data-scrolled={scrolled}>
      <div className="nav-pill">
        <Link className="nav-brand" href="/">
          <span>{brandName}</span>
          <span className="nav-brand__accent">{accentSegment}</span>
        </Link>

        <nav className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              className="nav-link"
              href={link.href}
              data-active={isActive(pathname, link.match)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="nav-icon-button"
            href={themeConfig.socials.discord}
            aria-label="Discord"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Gamepad2 size={14} />
          </a>
          <Link className="nav-dashboard" href={themeConfig.socials.dashboard}>
            <User size={13} />
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
