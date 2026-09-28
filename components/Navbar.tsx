"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { scrollToSection, SectionLink } from "@/components/SectionLink";
import { navLinks } from "@/lib/site";

const sectionIds = ["careers", "contact"];

/** Tracks which home-page section is in view: "top", "careers" or "contact". */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (!enabled) return;
    const update = () => {
      const probe = window.innerHeight * 0.35;
      let current = "top";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      // The contact section is short; treat reaching the page end as being on it.
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      setActive(atEnd ? "contact" : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");

  // Arriving on the home page from another page with a hash ("/#careers"):
  // scroll to that section once the page has rendered.
  useEffect(() => {
    if (pathname !== "/") return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || id === "top") return;
    const timer = window.setTimeout(() => scrollToSection(id), 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => active === href.split("#")[1];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper/0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Logo onClick={close} />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <SectionLink
                href={link.href}
                aria-current={isActive(link.href) ? "location" : undefined}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-stone transition-colors duration-150 hover:bg-mist hover:text-pine aria-[current=location]:bg-pine aria-[current=location]:text-paper"
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center rounded-md text-pine transition-colors hover:bg-mist md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-line bg-paper shadow-[0_20px_40px_-24px_rgba(15,47,42,0.35)] md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <SectionLink
                href={link.href}
                onClick={close}
                aria-current={isActive(link.href) ? "location" : undefined}
                className="flex items-center gap-3 rounded-lg px-3 py-3.5 text-lg font-semibold text-pine transition-colors hover:bg-mist aria-[current=location]:bg-mist"
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
