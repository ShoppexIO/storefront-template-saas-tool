import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { themeConfig } from "@/lib/theme-config";

export function SiteFooter() {
  const brandName = themeConfig.brandName.toLowerCase();
  const accentSegment = themeConfig.brandTaglineShort.split(" ")[0]
    ? `.${themeConfig.brandTaglineShort.split(" ")[0].toLowerCase()}`
    : "";

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand-block">
            <Link className="site-footer__brand" href="/">
              <span>{brandName}</span>
              <span className="site-footer__brand-accent">{accentSegment}</span>
            </Link>
            <p className="site-footer__tagline">{themeConfig.footer.tagline}</p>
            <div className="site-footer__socials">
              <a
                className="site-footer__icon"
                href={themeConfig.socials.discord}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Discord"
              >
                <Gamepad2 size={16} />
              </a>
            </div>
          </div>

          {themeConfig.footer.columns.map((column) => (
            <div className="site-footer__col" key={column.title}>
              <h3 className="site-footer__col-title">{column.title}</h3>
              <ul className="site-footer__col-links">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <span className="site-footer__copy">
            © {new Date().getFullYear()} {themeConfig.footer.rightsHolder}. All rights reserved.
          </span>
          <ul className="site-footer__bottom-links">
            {themeConfig.footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
