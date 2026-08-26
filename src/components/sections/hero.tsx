import Image from "next/image";
import Link from "next/link";
import { BRAND, FORMULA_HIGHLIGHTS, SIZES, formatPrice } from "@/lib/brand";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { btn } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-16 lg:grid-cols-[1fr_0.85fr] lg:gap-6 lg:pt-0">
        <div className="lg:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-champagne">
            {BRAND.tagline}
          </p>

          <h1 className="mt-6 font-display text-5xl italic leading-[1.05] sm:text-6xl lg:text-7xl">
            {/* Block spans rather than <br>, so the accessible name keeps the
                space between the two lines. */}
            <span className="block text-gold-gradient">Miracle</span>
            <span className="block">Hair Oil</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">
            A 100% herbal blend of sweet almond, cold-pressed coconut, sesame,
            pumpkin seed and kalonji oils — made to nourish the scalp and
            strengthen roots. For every member of the family.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2.5">
            {FORMULA_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ivory/85">
                <span aria-hidden className="text-olive">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-9 text-sm text-ivory/60">
            <span className="text-ivory">{SIZES["100ml"].label}</span>{" "}
            {formatPrice(SIZES["100ml"].basePrice)}
            <span aria-hidden className="mx-3 text-ivory/25">
              ·
            </span>
            <span className="text-ivory">{SIZES["150ml"].label}</span>{" "}
            {formatPrice(SIZES["150ml"].basePrice)}
          </p>

          <div className="mt-6 flex flex-col gap-3 pb-16 sm:flex-row lg:pb-0">
            <Link href="/products/miracle-hair-oil" className={btn("primary", "lg")}>
              Order Now
            </Link>
            <WhatsAppLink
              source="hero"
              message="Assalam o Alaikum, I would like to order Anisa Herbal Miracle Hair Oil."
            >
              Order via WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        {/* The photograph is shot on black, so it dissolves into the section. */}
        <div className="relative -mx-5 lg:mx-0 lg:self-end">
          <Image
            src="/images/hero-model.png"
            alt="Anisa Herbal Miracle Hair Oil, 150 ml"
            width={1080}
            height={1080}
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
