export const site = {
  name: "Bansal Tech",
  tagline: "A privately operated technology company.",
  description:
    "Bansal Tech is a privately operated technology company building practical and reliable technology solutions.",
  email: "bansaltechnologieshq@gmail.com",
} as const;

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Careers", href: "/#careers" },
  { label: "Contact", href: "/#contact" },
] as const;

/** The "B" monogram as a 5×7 bitmap — the brand's module mark. */
export const markRows = [
  "####.",
  "#...#",
  "#...#",
  "####.",
  "#...#",
  "#...#",
  "####.",
] as const;
