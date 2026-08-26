# Anisa Herbal

Storefront for Anisa Herbal Miracle Hair Oil.

**Read [KNOWLEDGE_BASE.md](KNOWLEDGE_BASE.md) before changing copy, colours or
prices.** It is the source of truth for the brand: the locked palette, the
approved product claims, and the bundle price table. `src/lib/brand.ts` mirrors
it in code — if one changes, change both.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npx eslint .    # lint
```

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript.
Tailwind v4 is CSS-first — the brand tokens are defined in `@theme` inside
`src/app/globals.css`, not in a `tailwind.config.js`.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you have. Everything is
optional; with nothing set the site runs, but it will not track conversions and
orders are only written to a local development log.

Placeholder contact details live in `src/lib/config.ts` — phone, WhatsApp and
email all need replacing before launch, or every WhatsApp button is dead.

## How orders work

Cash on Delivery only. The checkout collects name, phone, address and city, then
POSTs to `/api/orders`, which:

1. validates the details server-side,
2. **recomputes the total from the published price table** — the browser only
   sends sizes and quantities, never a price,
3. persists the order (to `ORDER_WEBHOOK_URL`, or `.orders/orders.jsonl` in
   development),
4. sends a Purchase event to Meta's Conversions API sharing an `event_id` with
   the browser Pixel so the two deduplicate.

Medusa.js is the intended commerce engine; the API route is a stopgap until it
is in place.

## Conventions worth knowing

- **No decorative emojis or icon clutter.** Herbal-green ✓ marks are part of the
  brand's actual visual language; random icons are not.
- **No invented colours.** Only the eight tokens in `globals.css`.
- **No overclaiming.** Specific claims may only be made about the seven named
  oils; "20+ herbs" stays an umbrella statement. No timelines, no cures.
- **No fabricated reviews.** `src/lib/reviews.ts` is empty and the reviews
  section renders nothing until real ones exist.
