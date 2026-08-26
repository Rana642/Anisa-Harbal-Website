import Image from "next/image";
import Link from "next/link";
import { SIZES, formatPrice } from "@/lib/brand";
import { btn } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const CARDS = [
  {
    size: SIZES["100ml"],
    blurb: "The easier size to start with — enough for roughly six to eight weeks of regular use.",
  },
  {
    size: SIZES["150ml"],
    blurb: "Better value per millilitre. The size most people move to once the oil suits them.",
  },
] as const;

export function ProductShowcase() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Two Sizes"
          title="Choose your bottle"
          intro="The same 100% herbal formula in both — the only difference is how long it lasts."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {CARDS.map(({ size, blurb }) => (
            <div
              key={size.id}
              className="flex flex-col rounded-lg border border-champagne bg-champagne/15 p-8"
            >
              <div className="relative mx-auto h-56 w-full">
                <Image
                  src="/images/product-150ml-front-back.png"
                  alt={`Anisa Herbal Miracle Hair Oil, ${size.label}`}
                  fill
                  sizes="(min-width: 640px) 40vw, 80vw"
                  className="object-contain"
                />
              </div>

              <h3 className="mt-8 font-display text-2xl italic">{size.label}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{blurb}</p>

              <p className="mt-6 font-display text-3xl tabular-nums text-gold-deep">
                {formatPrice(size.basePrice)}
              </p>

              <Link
                href="/products/miracle-hair-oil"
                className={btn("primary", "md", "mt-6 w-full")}
              >
                Order {size.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
