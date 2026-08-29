export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  /**
   * Tailwind `object-*` utility for the full-bleed crop. Defaults to
   * "object-center" when omitted. Every banner but the first is native
   * 2.4:1, matching the slider box almost exactly, so cropping is
   * negligible there; only the 16:9 first slide needs a deliberate bias.
   */
  objectPosition?: string;
};

/**
 * The one purpose-built portrait crop. Mobile shows this and nothing else —
 * no carousel, no landscape banners. Desktop/tablet never shows this image.
 */
export const MOBILE_HERO: HeroSlide = {
  id: "mobile-40-off",
  src: "/images/hero/hero-40-off-mobile.jpg",
  alt: "Anisa Herbal Miracle Hair Oil — 40% off, infused with 20+ herbs",
};

/**
 * The desktop/tablet carousel. Client-supplied Meta-ad-style banners, shown
 * as-is with no text or CTA layered on top (client instruction, 29 Aug 2026).
 * Order follows the FORMULA_HIGHLIGHTS sequence in brand.ts for the middle
 * run of slides, opening and closing on the 40%-off creative. Never shown on
 * mobile — see MOBILE_HERO above.
 */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "intro-40-off",
    src: "/images/hero/hero-40-off-desktop.jpg",
    alt: "Anisa Herbal Miracle Hair Oil — 40% off, infused with 20+ herbs",
    // Native 16:9 in a 2.4:1 box crops ~117px off top and bottom at full
    // scale. Biasing to the top keeps the badge, bottle and headline whole
    // and only trims the "Shop Now" button — acceptable since the whole
    // banner already links to the PDP.
    objectPosition: "object-top",
  },
  {
    id: "150ml",
    src: "/images/hero/hero-150ml.jpg",
    alt: "Anisa Herbal Miracle Hair Oil, 150 ml bottles",
  },
  {
    id: "infused-20-herbs",
    src: "/images/hero/hero-infused-20-herbs.jpg",
    alt: "Anisa Herbal Miracle Hair Oil, infused with 20+ herbs",
  },
  {
    id: "no-mineral-oil",
    src: "/images/hero/hero-no-mineral-oil.jpg",
    alt: "Anisa Herbal Miracle Hair Oil — no mineral oil",
  },
  {
    id: "no-chemicals",
    src: "/images/hero/hero-no-chemicals.jpg",
    alt: "Anisa Herbal Miracle Hair Oil — no chemicals",
  },
  {
    id: "no-artificial-fragrance",
    src: "/images/hero/hero-no-artificial-fragrance.jpg",
    alt: "Anisa Herbal Miracle Hair Oil — no artificial fragrance",
  },
  {
    id: "100-percent-herbal",
    src: "/images/hero/hero-100-percent-herbal.jpg",
    alt: "Anisa Herbal Miracle Hair Oil — 100% herbal",
  },
  {
    id: "closing-40-off",
    src: "/images/hero/hero-40-off-banner.jpg",
    alt: "Anisa Herbal Miracle Hair Oil — 40% off",
  },
] as const;
