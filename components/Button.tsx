import { SectionLink } from "@/components/SectionLink";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "brass";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-pine text-paper hover:bg-pine-2",
  secondary:
    "border border-pine/20 bg-transparent text-pine hover:border-pine hover:bg-white",
  brass: "bg-brass text-pine hover:bg-brass-soft",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof SectionLink> & { variant?: Variant }) {
  return <SectionLink className={buttonClass(variant, className)} {...props} />;
}
