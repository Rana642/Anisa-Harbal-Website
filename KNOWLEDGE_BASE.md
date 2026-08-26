# Anisa Herbal — Complete Knowledge Base
Last updated: 26 Aug 2026

This file is the single source of truth for the Anisa Herbal website project.
Any Claude Code / Claude Desktop session working on this project should read
this file first before writing copy, styling components, or generating images.

---

## 1. Folder Structure

The Next.js app lives at the project root. `assets/` is the master library of
source files (never shipped); `public/images/` holds the web-ready copies the
site actually references.

```
anisa Harbal/
├── KNOWLEDGE_BASE.md          ← this file
├── assets/                    ← master source library, not deployed
│   ├── logo/                    anisa-herbal-logo-gold.png (1080², transparent)
│   ├── product-shots/           miracle-hair-oil-150ml-front-back.png (transparent)
│   ├── lifestyle/               model-hero-150ml-dark.png, both-sizes-100ml-150ml.png
│   ├── marketing-graphics/      six-benefits, suitable-for-all-ages,
│   │                            no1-hair-growth-oil-checklist  ← see §11 warning
│   ├── color-palette/           anisa_herbal_color_palette.pdf
│   ├── pricing-reference/       100ml- and 150ml-multi-bottle-savings.pdf
│   └── placeholders-needed/     generated stand-ins until real photos exist
├── public/images/             ← web-ready copies used by the site
└── src/                       ← app, components, lib (see §11)
```

**Rule for future Claude sessions:** when building a page/section, check
`assets/` first. If an image exists there, copy it into `public/images/` and use
it. If not, check Section 8 for a ready prompt, generate a placeholder, save it
into `assets/placeholders-needed/`, and flag it in the build notes so it gets
swapped later.

---

## 2. Brand Identity

**Brand name:** Anisa Herbal
**Product:** Anisa Herbal Miracle Hair Oil
**Logo style:** Gold gradient wordmark, cursive/script "AnisaHerbal", mortar &
pestle + leaf icon, registered trademark (®) mark included.
**Trademark:** T.M 633394®

### Color Palette (locked — never invent new colors)

| Name | Hex | Usage |
|---|---|---|
| Warm Ivory | `#FBF9F8` | Page backgrounds |
| Rich Black | `#120F0D` | Headlines, nav, footer |
| Luxury Gold | `#DB9923` | Primary CTA buttons, price highlights |
| Champagne Gold | `#F2C85B` | Hover states, highlights |
| Antique Gold | `#A96D00` | Button shadows, pressed states, gradient depth |
| Herbal Green | `#536B18` | Checkmarks, organic badges, secondary accents |
| Soft Olive Green | `#97A261` | Subtle backgrounds, dividers |
| Warm Champagne | `#E7D1AC` | Card backgrounds, soft section breaks |
| **Gold Gradient** | `#A96D00 → #DB9923 → #FFD76A → #C47E05` | Hero headlines, premium badges |

Core combination: **Ivory + Black + Gold + Herbal Green**

### Typography (until exact font files provided)
- Headlines / script accents: Playfair Display (italic) or Cormorant Garamond
  (italic) as closest web-safe match to the logo's cursive gold wordmark.
- Body / UI text: Poppins or Inter — clean, modern sans-serif.

### Design Rules (non-negotiable — from client dev notes)
- **No decorative emojis.** No 🌿✨💚 anywhere on the site.
- **No icon-style symbol overuse.** Keep it typography-led, clean, professional.
- Simple text headings, bullets, clear spacing, readable hierarchy.
- Herbal Green checkmarks (✓) are allowed — they're part of the actual brand
  visual language (used on packaging). Random decorative icons are not.
- Overall feel: premium, pharmacy/dermatologist-adjacent trust, not a loud
  "Instagram seller" aesthetic.

---

## 3. Product Data

| Field | Value |
|---|---|
| Product name | Anisa Herbal Miracle Hair Oil |
| Sizes | 100ml — PKR 1,499 · 150ml — PKR 1,699 |
| Formula | 100% herbal, infused with 20+ herbs + nourishing oil blend |
| Suitable for | All ages and genders — men, women, children, older adults |

### Key Herbal Oils (7 named ingredients — this is the complete, final list)
1. Sweet Almond Oil
2. Cold-Pressed Coconut Oil
3. Sesame Oil
4. Pumpkin Seed Oil
5. Kalonji (Black Seed) Oil
6. Sunflower Oil
7. Vitamin E-rich oils

> Note: "20+ herbs" is the packaging headline claim (umbrella marketing
> statement). Only the 7 oils above are individually named/verified — the
> ingredients section on the site should only make specific claims about
> these 7, and use "20+ herb-infused blend" as the general claim elsewhere.
> This avoids Meta ad policy overclaiming issues.

### Key Benefits (6)
1. Deeply nourishes the scalp
2. Strengthens hair roots
3. Reduces hair fall with regular use
4. Helps reduce dandruff and control frizz
5. Adds natural shine and softness
6. Supports healthy hair growth

### Formula Highlights (trust claims)
- No Mineral Oil
- No Chemicals
- No Artificial Fragrance
- 100% Herbal

### How to Use
1. Apply to dry hair
2. Gently massage into the scalp
3. Leave overnight or for 2–3 hours
4. Use 2–3 times a week for best results

---

## 4. Pricing & Bundle Engine

### 100ml bundles
| Qty | Deal price | Saving |
|---|---|---|
| 1 | Rs. 1,499 | — |
| 2 | Rs. 2,790 | Rs. 208 |
| 3 | Rs. 4,190 | Rs. 307 |
| 4 | Rs. 5,590 | Rs. 406 |
| 5 | Rs. 6,990 | Rs. 505 |

### 150ml bundles
| Qty | Deal price | Saving |
|---|---|---|
| 1 | Rs. 1,699 | — |
| 2 | Rs. 3,250 | Rs. 148 |
| 3 | Rs. 4,900 | Rs. 197 |
| 4 | Rs. 6,550 | Rs. 246 |
| 5 | Rs. 8,200 | Rs. 295 |

**Rules:**
- Same-size bundles only in Phase 1 (no mixed 100ml+150ml combos yet).
- Purchase event `value` sent to Meta CAPI / GA4 must always be the exact
  deal price shown above, never quantity × base price.
- Suggested "Most Popular" badge: 100ml → 3-bottle tier. 150ml → 2-bottle tier.
  (Replace with real data once first month of sales data is available.)

---

## 5. Checkout & Payment Model (confirmed)

- **Hybrid checkout:** primary path is on-site Add to Cart → checkout form,
  secondary path is a parallel "Order via WhatsApp" button.
- **Checkout form fields:** Name, Phone, Address, City. Payment method fixed
  to Cash on Delivery — no payment method selector needed, just a "Pay on
  Delivery" note.
- **Payment methods:** COD only for Phase 1. JazzCash/EasyPaisa etc. are
  Phase 2, not needed now.
- **Tracking:** on-site checkout completion fires Meta Pixel + CAPI
  `Purchase` event (deduplicated via `event_id`) and GA4 `purchase` event.
  WhatsApp button click fires a `Contact`/`Lead` event, not `Purchase`.
- **Delivery/courier/payment-gateway specifics:** intentionally out of scope
  right now — website-only focus per client request (26 Aug 2026).

---

## 6. Site Architecture (confirmed)

```
/                                  Home — funnel-style landing page
/products/miracle-hair-oil         Dedicated PDP (detailed spec content)
/collections/all                   Shop All (scalable — 1 product live now,
                                    ready for future products e.g. shampoo)
/about                             Brand story (Halalveda has no equivalent —
                                    key trust-building differentiator)
/contact                           Form + WhatsApp button
/cart
/checkout
/policies/privacy-policy
/policies/refund-policy
/policies/terms-of-service
/policies/shipping-policy
```

Navigation: `Home | Hair Oil | Shop All | About | Contact`

Reference competitor: https://halalveda.uk/ — a Shopify store for a
similar hair oil. Their structure is `Home | Hair Oil | Shampoo | Products |
Contact`, generic Shopify theme, no ingredient breakdown, no bundle pricing,
no About page, no visible custom tracking. Anisa Herbal's site is designed
to beat it on: page speed, ingredient depth, bundle pricing psychology,
brand storytelling, and CAPI-based ad tracking accuracy.

### Homepage section order
1. Hero (model image + gold-gradient headline + dual CTA)
2. Trust badges bar
3. Product showcase (100ml/150ml)
4. Key benefits (6 cards)
5. Ingredients deep-dive (7 oils, one line each)
6. Bundle pricing selector (size toggle → quantity cards)
7. How to use (4 steps)
8. Suitable for (men/women/children/elders)
9. Reviews/testimonials
10. FAQ
11. Final CTA + footer

---

## 7. Tech Stack (confirmed direction)

- **Frontend:** Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion
  (simple UI interactions) + GSAP (scroll-triggered / complex sequences)
- **Hosting:** Vercel
- **Backend/commerce engine:** Medusa.js (Shopify-like admin dashboard,
  self-hosted, Node.js) — chosen over a fully custom backend or plain
  headless Shopify for the best balance of admin usability + no monthly
  platform fee + full design control.
- **Tracking:** Meta Pixel (client) + Meta Conversions API (server, via
  Next.js API routes) + GA4 (client + measurement protocol).
- **Images:** Cloudinary recommended for optimization/CDN.

---

## 8. Placeholder Image Prompts (for assets not yet supplied)

Use these when a real photo isn't available yet. Generate with ChatGPT Image
or Nano Banana, save into `placeholders-needed/`, and swap for the real
asset later. All prompts are locked to the brand palette and tone above —
do not deviate from the hex codes or add decorative elements not listed.

### 8.1 — Ingredient macro shots (7 needed: almond, coconut, sesame, pumpkin
seed, kalonji/black seed, sunflower, a generic "vitamin E oil drop" shot)

**ChatGPT Image prompt (template — swap the bracketed ingredient):**
```
A close-up macro product photo of [sweet almonds scattered with one cracked
open] on a warm ivory background (#FBF9F8), soft natural side lighting,
a few scattered dried leaves in herbal green (#536B18) for context, minimal
shadow, shot from a slight top-down angle, clean commercial skincare-brand
photography style, no text, no logo, square 1:1, high detail, photorealistic.
```

**Nano Banana prompt (template):**
```
Macro product photography, [sweet almonds, one cracked open], warm ivory
background #FBF9F8, soft diffused side lighting, minimal herbal green
#536B18 leaf accents, slight top-down angle, clean premium skincare brand
style, no text, no logo, square 1:1, photorealistic, high detail.
```

Swap the bracketed subject for each: sweet almonds / a halved coconut with
coconut oil drizzle / sesame seeds with a small glass bottle of oil / a
halved pumpkin with visible seeds / kalonji (black seed) scattered on a
small dish / a sunflower head with seeds visible / a single amber oil drop
on a glass surface (for the Vitamin E oil visual).

### 8.2 — About / Brand story hero image

**ChatGPT Image prompt:**
```
A warm, editorial lifestyle photo representing a small artisanal herbal
skincare brand's workspace: dried herbs, a mortar and pestle, small amber
glass bottles, and folded ivory linen on a marble surface, warm natural
window light, color palette of ivory #FBF9F8, rich black #120F0D, gold
#DB9923 and herbal green #536B18, no people's faces visible, no text, no
logo, horizontal 16:9, photorealistic, premium editorial style.
```

**Nano Banana prompt:**
```
Editorial lifestyle photo, artisanal herbal brand workspace, dried herbs,
mortar and pestle, small amber glass bottles, folded ivory linen, marble
surface, warm window light, palette ivory #FBF9F8 / black #120F0D / gold
#DB9923 / herbal green #536B18, no visible faces, no text, no logo,
horizontal 16:9, photorealistic, premium editorial mood.
```

### 8.3 — Generic customer review avatar placeholders (if real customer
photos aren't available yet for testimonials)

**ChatGPT Image prompt:**
```
A simple, warm circular avatar illustration of [a smiling South Asian
woman in her late 20s], minimal flat style, solid warm champagne background
(#E7D1AC), no text, no logo, soft and friendly expression, square 1:1,
clean and professional, not cartoonish.
```
Swap bracketed description per review (age/gender varied) — use sparingly;
real photos or initials-only avatars are strongly preferred over generated
faces for testimonial trust.

### 8.4 — Trust bar background texture (optional, subtle)

**ChatGPT Image prompt:**
```
A very subtle, almost invisible background texture: warm ivory (#FBF9F8)
with faint botanical leaf line-art in herbal green (#536B18) at 5-8%
opacity, minimal, no focal subject, no text, no logo, horizontal 16:9,
suitable as a website section background, flat and clean.
```

**Tips for all prompts above:**
- Attach the real logo file (once placed in `logo/`) to Nano Banana if any
  generated asset needs the logo baked in — otherwise generate logo-free and
  add the logo separately in code/CSS, which is the correct approach for the
  actual website (never bake the logo into a background image).
- Regenerate if text renders incorrectly — neither tool is reliable at
  in-image text, which is another reason the site avoids text-in-image for
  real UI content (see Section 2, Design Rules).
- Real ingredient photography should replace 8.1 as soon as available —
  generated macro food photography is a reasonable stand-in but real photos
  convert better.

---

## 9. Claude Model Usage Plan (for Claude Code sessions)

**Fable 5 is intentionally excluded from this project — do not suggest it.**

| Task type | Model to use | Why |
|---|---|---|
| All primary development — Next.js components, Medusa.js integration, Tailwind styling, checkout/cart logic, Meta Pixel + CAPI tracking implementation, GSAP/Framer Motion animations, bug fixes, refactoring | **Opus 5** (default for this project) | Best reasoning-to-cost ratio currently available; Anthropic's recommended default for coding/agentic work. Use this for basically everything unless told otherwise below. |
| Small, fast, low-stakes edits — a copy tweak, a rename, a one-line fix, repeating a pattern already established elsewhere in the codebase | Sonnet 5 | Faster and cheaper when the task doesn't need deep reasoning. Optional — Opus 5 handles these fine too, switch only if speed matters more than thoroughness in the moment. |
| Anything requiring the absolute top reasoning ceiling for a single very long, very complex autonomous task | — | Not used on this project. If a task ever feels like it needs this, stop and flag it in chat instead of reaching for a bigger model — re-scope the task into smaller Opus 5-sized steps instead. |

**When to actually switch away from Opus 5:** only for the "small, fast, low-stakes edits" row above, and only if you notice responses feel slower than the task warrants. Otherwise stay on Opus 5 for the whole project — don't switch per-file or per-component, switching mid-task adds overhead for little benefit at this project's size.

---

## 10. Build Status (as of 26 Aug 2026)

Next.js 16.3.3 (App Router, Turbopack) · React 19.2 · Tailwind v4 · TypeScript.
`npm run dev` on port 3000. `npm run build` and `npx eslint .` both pass clean.

### Where things live
| Path | What it holds |
|---|---|
| `src/lib/brand.ts` | Palette, sizes, 7 oils, 6 benefits, bundle price table. **Code-side source of truth — keep in sync with §2–4 of this file.** |
| `src/lib/cart.ts` + `cart-store.ts` | Bundle pricing maths; cart persisted to `localStorage` as an external store (`useSyncExternalStore`, so SSR and hydration agree). |
| `src/lib/order.ts` | Order validation (PK mobile format), order-ID generation, server-side total. |
| `src/lib/tracking.ts` | Pixel + GA4 client events. No-ops until the snippets are added. |
| `src/lib/meta-capi.ts` | Server-side Purchase → Conversions API, PII hashed. No-ops without env vars. |
| `src/lib/content.ts` | FAQ, trust bar, About copy. |
| `src/lib/reviews.ts` | **Empty on purpose** — real reviews only. |
| `src/app/api/orders/route.ts` | Order intake. Recomputes price server-side; the client never dictates a total. |

### Built and working
All 11 homepage sections in the §6 order · PDP with gallery, size toggle and
bundle selector · cart drawer + cart page · COD checkout (Name / Phone /
Address / City) with validation and an order-confirmation screen · Shop All ·
About · Contact · four policy pages · sitemap · robots · Product JSON-LD.

Verified end to end: 3 × 100ml adds at exactly Rs. 4,190 (saving Rs. 307),
order persists, cart clears. Tampered client totals are ignored by the server.

### Contact details (live, confirmed 26 Aug 2026)
| | |
|---|---|
| Phone / WhatsApp | +92 306 8281881 |
| Email | info@anisaherbal.com |
| Domain | https://www.anisaherbal.com |
| Instagram | @anisaherbalorganic |
| Facebook | facebook.com/anisaherbalorganic |
| TikTok | @anisaherbalorganic |

All of these live in `src/lib/config.ts` (`SITE` and `SOCIALS`) — change them
there, never inline in a component. Socials are also emitted as `sameAs` in the
Organization JSON-LD, which is what links the profiles to the brand in search.

### Not done yet — needed before launch
1. **Order persistence.** Orders are only durable if `ORDER_WEBHOOK_URL` is
   set (see `.env.example`); on Vercel the local-file fallback does not
   survive. Medusa.js (§7) is still the intended destination. **This is the
   one that loses money if it is skipped.**
2. **Pixel / GA4 snippets** are not on the page yet — only the event helpers
   exist. Add the snippets, then set the env vars for CAPI.
3. **Reviews.** `src/lib/reviews.ts` is empty and the section renders nothing
   until real ones are added. Do not invent testimonials.
4. **Policy blanks.** Delivery times, charges, return window and the registered
   business name show as highlighted placeholders. They need real values and a
   legal read.

### Two ad graphics are deliberately not used on the site
`no1-hair-growth-oil-checklist.png` claims "NO.1 HAIR GROWTH OIL" — an
unsubstantiated superiority claim plus a growth claim. `six-benefits.png` says
"Stops hair fall", where §3 of this file approves only "Reduces hair fall with
regular use". Both are Meta ad-policy risks and both contradict the site copy,
so they stay out of the gallery. They are still in `assets/marketing-graphics/`
if the client wants them revised.

---

## 11. Open Items (parked, not needed for website build)

- Delivery/courier partner selection
- International vs Pakistan-only delivery
- Meta Business Manager / Pixel setup status
- Ad budget
- Domain name confirmation
- Development team/timeline/budget

These will be revisited once the website scope is further along.
