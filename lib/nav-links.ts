/** Homepage section anchors — use `sectionHref` so links work from any route (e.g. /blog). */
export const homeSections = [
  { id: "results", label: "Results" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
] as const;

export function sectionHref(id: string) {
  return `/#${id}`;
}

export const navLinks = [
  ...homeSections.map((s) => ({
    href: sectionHref(s.id),
    hash: `#${s.id}`,
    label: s.label,
  })),
  { href: "/blog", hash: null, label: "Blog" },
] as const;

export const footerLinks = [
  ...homeSections
    .filter((s) => s.id !== "process")
    .map((s) => ({ label: s.label, href: sectionHref(s.id) })),
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
