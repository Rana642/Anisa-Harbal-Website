import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BENEFITS, BRAND, SIZES, formatPrice } from "@/lib/brand";
import { btn } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Every Anisa Herbal product. Miracle Hair Oil is available in 100 ml and 150 ml, with multi-bottle savings on both.",
};

/**
 * One product today. The grid is built to scale — adding a shampoo means
 * adding an entry here, not rebuilding the page.
 */
const PRODUCTS = [
  {
    slug: "miracle-hair-oil",
    name: "Miracle Hair Oil",
    image: "/images/product-150ml-front-back.png",
    blurb: `${BRAND.tagline}. No mineral oil, no chemicals, no artificial fragrance.`,
    from: SIZES["100ml"].basePrice,
    sizes: `${SIZES["100ml"].label} · ${SIZES["150ml"].label}`,
  },
] as const;

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
      <SectionHeading
        as="h1"
        align="left"
        eyebrow="Shop all"
        title="Everything we make"
        intro="One product, made properly, in two sizes. More will follow — we would rather add slowly than pad the shelf."
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group flex flex-col rounded-lg border border-champagne bg-champagne/15 p-6 transition-colors hover:border-gold"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded bg-ivory">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-contain p-4"
              />
            </div>

            <h2 className="mt-6 font-display text-2xl italic transition-colors group-hover:text-gold-deep">
              {product.name}
            </h2>
            <p className="mt-1.5 text-xs text-ink/55">{product.sizes}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
              {product.blurb}
            </p>

            <p className="mt-5 text-sm text-ink/60">
              From{" "}
              <span className="font-display text-xl text-gold-deep tabular-nums">
                {formatPrice(product.from)}
              </span>
            </p>

            <span className={btn("primary", "md", "mt-5 w-full")}>View Product</span>
          </Link>
        ))}
      </div>

      <div className="mt-20 rounded-lg border border-champagne bg-champagne/15 p-8 sm:p-12">
        <h2 className="font-display text-2xl italic">Why just the one?</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70">
          Because the oil took long enough to get right. Every bottle is the same
          formula that goes into every claim on this site:
        </p>
        <ul className="mt-6 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-sm text-ink/80">
              <span aria-hidden className="text-herbal">
                &#10003;
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
