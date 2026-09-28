"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/** Document offset of a section, honouring its CSS scroll-margin-top. */
function targetY(el: HTMLElement) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin);
}

/**
 * Smooth-scrolls to `y`, then jumps there if the smooth scroll hasn't arrived
 * (some browsers drop smooth scrolls in background or throttled tabs).
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) scrollToY(targetY(el));
}

function scrollToY(y: number) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.scrollTo({ top: y, behavior: "instant" });
    return;
  }
  const start = window.scrollY;
  window.scrollTo({ top: y, behavior: "smooth" });
  window.setTimeout(() => {
    if (window.scrollY === start && Math.abs(start - y) > 2) {
      window.scrollTo({ top: y, behavior: "instant" });
    }
  }, 400);
}

/**
 * Link to a section of the home page ("/#careers").
 * On the home page it scrolls there directly; from other pages it navigates
 * to the home page and lets Next.js scroll to the hash.
 */
export function SectionLink({
  href,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    const [path, hash] = href.split("#");
    if (e.defaultPrevented || pathname !== (path || "/") || !hash) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const target = hash === "top" ? null : document.getElementById(hash);
    if (hash !== "top" && !target) return;

    e.preventDefault();
    scrollToY(target ? targetY(target) : 0);
    history.replaceState(null, "", hash === "top" ? path || "/" : `#${hash}`);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
