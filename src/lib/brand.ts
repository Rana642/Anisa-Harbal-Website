/**
 * Anisa Herbal — brand & product constants.
 *
 * This mirrors KNOWLEDGE_BASE.md. That file is the source of truth for the
 * project; this file is the source of truth for the code. If one changes,
 * change the other in the same commit.
 */

export const BRAND = {
  name: "Anisa Herbal",
  product: "Anisa Herbal Miracle Hair Oil",
  trademark: "T.M 633394®",
  tagline: "Infused with 20+ herbs",
} as const;

/** Locked palette — KNOWLEDGE_BASE.md §2. Never invent new colours. */
export const PALETTE = {
  ivory: "#FBF9F8",
  ink: "#120F0D",
  gold: "#DB9923",
  goldLight: "#F2C85B",
  goldDeep: "#A96D00",
  herbal: "#536B18",
  olive: "#97A261",
  champagne: "#E7D1AC",
} as const;

export const GOLD_GRADIENT = ["#A96D00", "#DB9923", "#FFD76A", "#C47E05"] as const;

/* -------------------------------------------------------------------------- */
/* Product                                                                     */
/* -------------------------------------------------------------------------- */

export type SizeId = "100ml" | "150ml";

export const SIZES = {
  "100ml": { id: "100ml", label: "100 ml", basePrice: 1499 },
  "150ml": { id: "150ml", label: "150 ml", basePrice: 1699 },
} as const satisfies Record<SizeId, { id: SizeId; label: string; basePrice: number }>;

/**
 * The seven named oils. Specific ingredient claims may ONLY be made about
 * these — "20+ herbs" stays an umbrella statement everywhere else, to keep
 * the site clear of Meta ad-policy overclaiming. See KNOWLEDGE_BASE.md §3.
 */
export const INGREDIENTS = [
  {
    name: "Sweet Almond Oil",
    note: "Rich in vitamin E — softens strands and conditions a dry scalp.",
  },
  {
    name: "Cold-Pressed Coconut Oil",
    note: "Absorbs into the hair shaft to help limit moisture loss between washes.",
  },
  {
    name: "Sesame Oil",
    note: "A traditional massage oil, long used across South Asia to condition roots.",
  },
  {
    name: "Pumpkin Seed Oil",
    note: "Carries zinc and essential fatty acids that support a healthy-looking scalp.",
  },
  {
    name: "Kalonji (Black Seed) Oil",
    note: "The classic remedy oil — valued for soothing a flaky, irritated scalp.",
  },
  {
    name: "Sunflower Oil",
    note: "Light and non-greasy, it carries the herb infusion without weighing hair down.",
  },
  {
    name: "Vitamin E-Rich Oils",
    note: "Antioxidant support that helps hair hold its natural shine.",
  },
] as const;

/** KNOWLEDGE_BASE.md §3 — the approved wording. Do not strengthen these. */
export const BENEFITS = [
  "Deeply nourishes the scalp",
  "Strengthens hair roots",
  "Reduces hair fall with regular use",
  "Helps reduce dandruff and control frizz",
  "Adds natural shine and softness",
  "Supports healthy hair growth",
] as const;

export const FORMULA_HIGHLIGHTS = [
  "No Mineral Oil",
  "No Chemicals",
  "No Artificial Fragrance",
  "100% Herbal",
] as const;

export const HOW_TO_USE = [
  "Apply to dry hair",
  "Gently massage into the scalp",
  "Leave overnight or for 2–3 hours",
  "Use 2–3 times a week for best results",
] as const;

export const SUITABLE_FOR = ["Men", "Women", "Children", "Elders"] as const;

/* -------------------------------------------------------------------------- */
/* Bundle pricing                                                              */
/* -------------------------------------------------------------------------- */

export type Bundle = {
  qty: number;
  /** Exact deal price. This is the value sent to Meta CAPI / GA4 — never qty × base. */
  price: number;
  saving: number;
  mostPopular?: boolean;
};

/**
 * Same-size bundles only in Phase 1 — no mixed 100ml + 150ml combos.
 * "Most popular" flags are a placeholder judgement; replace with real data
 * after the first month of sales. See KNOWLEDGE_BASE.md §4.
 */
export const BUNDLES: Record<SizeId, readonly Bundle[]> = {
  "100ml": [
    { qty: 1, price: 1499, saving: 0 },
    { qty: 2, price: 2790, saving: 208 },
    { qty: 3, price: 4190, saving: 307, mostPopular: true },
    { qty: 4, price: 5590, saving: 406 },
    { qty: 5, price: 6990, saving: 505 },
  ],
  "150ml": [
    { qty: 1, price: 1699, saving: 0 },
    { qty: 2, price: 3250, saving: 148, mostPopular: true },
    { qty: 3, price: 4900, saving: 197 },
    { qty: 4, price: 6550, saving: 246 },
    { qty: 5, price: 8200, saving: 295 },
  ],
};

/**
 * Look up a bundle tier. Use this for the value on every Purchase event so
 * the price shown, the price charged, and the price reported always agree.
 */
export function getBundle(size: SizeId, qty: number): Bundle | undefined {
  return BUNDLES[size].find((b) => b.qty === qty);
}

/** Rs. 4,190 */
export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
