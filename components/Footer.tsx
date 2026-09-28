import { SectionLink } from "@/components/SectionLink";
import { Logo } from "@/components/Logo";
import { navLinks, site } from "@/lib/site";

const linkClass =
  "rounded-sm text-paper/70 transition-colors hover:text-paper";

export function Footer() {
  return (
    <footer className="bg-pine text-paper">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo tone="light" />
            <p className="mt-3 text-paper/70">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <SectionLink href={link.href} className={linkClass}>
                    {link.label}
                  </SectionLink>
                </li>
              ))}
              <li>
                <SectionLink href="/privacy" className={linkClass}>
                  Privacy Policy
                </SectionLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/55 sm:flex-row sm:justify-between">
          <p>© 2026 Bansal Tech. All rights reserved.</p>
          <a href={`mailto:${site.email}`} className="hover:text-paper">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
