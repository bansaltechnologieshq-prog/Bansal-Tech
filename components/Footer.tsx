import Link from "next/link";
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
                <Link href="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/55 sm:flex-row sm:justify-between">
          <p>© 2026 Bansal Tech. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${site.email}`} className="hover:text-paper">
              {site.email}
            </a>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3 py-1 text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5">
                <path
                  d="M4.5 7V5a3.5 3.5 0 1 1 7 0v2M3.5 7h9v6.5h-9z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              Admin sign in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
