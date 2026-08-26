/**
 * Site configuration — contact details and social profiles.
 */
export const SITE = {
  url: "https://www.anisaherbal.com",

  phone: "+92 306 8281881",
  phoneHref: "tel:+923068281881",

  /** Digits only, country code first — the format wa.me expects. */
  whatsapp: "923068281881",

  email: "info@anisaherbal.com",

  /** Shown in the announcement bar. Kept factual — no countdown, no fake sale. */
  announcement: "Cash on Delivery available across Pakistan",
} as const;

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/anisaherbalorganic/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/anisaherbalorganic",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@anisaherbalorganic",
  },
] as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
