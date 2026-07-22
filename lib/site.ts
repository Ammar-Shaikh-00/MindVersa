/** Public site config — set in .env.local */
export const BRAND_NAME = "MindVersa";
export const BRAND_DOMAIN = "mindversa.dev";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "versamind003@gmail.com";

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${BRAND_DOMAIN}`;

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ammar-shaikh-oo7",
  },
  {
    label: "GitHub",
    href: "https://github.com/Ammar-Shaikh-00",
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~017a527bf077a1a1bb",
  },
] as const;
