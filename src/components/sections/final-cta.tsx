import Link from "next/link";
import { SIZES, formatPrice } from "@/lib/brand";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { btn } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-ink py-20 text-ivory lg:py-24">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="font-display text-4xl italic leading-tight sm:text-5xl">
          <span className="text-gold-gradient">Start tonight</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ivory/75">
          Apply to dry hair, massage it into the scalp, leave it overnight. Two
          or three times a week is all it takes.
        </p>

        <p className="mt-8 text-sm text-ivory/60">
          {SIZES["100ml"].label} {formatPrice(SIZES["100ml"].basePrice)}
          <span aria-hidden className="mx-3 text-ivory/25">
            ·
          </span>
          {SIZES["150ml"].label} {formatPrice(SIZES["150ml"].basePrice)}
          <span aria-hidden className="mx-3 text-ivory/25">
            ·
          </span>
          Save more on bundles
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/products/miracle-hair-oil" className={btn("primary", "lg")}>
            Order Now
          </Link>
          <WhatsAppLink
            source="final-cta"
            message="Assalam o Alaikum, I would like to order Anisa Herbal Miracle Hair Oil."
          >
            Order via WhatsApp
          </WhatsAppLink>
        </div>

        <p className="mt-6 text-xs text-ivory/50">
          Cash on Delivery — pay the courier when it arrives.
        </p>
      </div>
    </section>
  );
}
