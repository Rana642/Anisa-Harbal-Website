import type { Metadata } from "next";
import {
  BENEFITS,
  BRAND,
  BUNDLES,
  FORMULA_HIGHLIGHTS,
  HOW_TO_USE,
  INGREDIENTS,
  SIZES,
  formatPrice,
} from "@/lib/brand";
import { SITE } from "@/lib/config";
import { FAQ } from "@/lib/content";
import { ProductGallery, type GalleryImage } from "@/components/product-gallery";
import { TrackViewContent } from "@/components/track-view-content";
import { BundleSelector } from "@/components/sections/bundle-selector";
import { Faq } from "@/components/sections/faq";
import { Reviews } from "@/components/sections/reviews";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: `${BRAND.product} — 100 ml & 150 ml`,
  description:
    "A 100% herbal hair oil infused with 20+ herbs and built on seven carrier oils — sweet almond, cold-pressed coconut, sesame, pumpkin seed, kalonji, sunflower and vitamin E-rich oils. No mineral oil, no chemicals, no artificial fragrance.",
};

/* Deliberately excludes the two ad graphics that carry claims the site does
   not make — "No.1 Hair Growth Oil" and "Stops hair fall". See KB §3. */
const GALLERY: readonly GalleryImage[] = [
  {
    src: "/images/product-150ml-front-back.png",
    alt: "Anisa Herbal Miracle Hair Oil bottle, front and back",
  },
  {
    src: "/images/hero-model.png",
    alt: "Anisa Herbal Miracle Hair Oil held beside long, oiled hair",
  },
  {
    src: "/images/both-sizes.png",
    alt: "The 100 ml and 150 ml bottles side by side",
  },
  {
    src: "/images/suitable-for-all.png",
    alt: "The oil held by men, women, children and older adults",
  },
];

function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: BRAND.product,
    description:
      "A 100% herbal hair and scalp oil infused with 20+ herbs. No mineral oil, no chemicals, no artificial fragrance.",
    brand: { "@type": "Brand", name: BRAND.name },
    image: [`${SITE.url}/images/product-150ml-front-back.png`],
    offers: (["100ml", "150ml"] as const).map((size) => ({
      "@type": "Offer",
      name: `${BRAND.product} — ${SIZES[size].label}`,
      price: SIZES[size].basePrice,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/products/miracle-hair-oil`,
    })),
  };
}

export default function ProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd()) }}
      />
      <TrackViewContent
        item={{
          id: "miracle-hair-oil",
          name: BRAND.product,
          quantity: 1,
          price: SIZES["100ml"].basePrice,
        }}
      />

      {/* Buy box */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={GALLERY} />

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
              {BRAND.tagline}
            </p>
            <h1 className="mt-4 font-display text-4xl italic leading-tight sm:text-5xl">
              Miracle Hair Oil
            </h1>

            <p className="mt-5 font-display text-3xl tabular-nums text-gold-deep">
              {formatPrice(SIZES["100ml"].basePrice)}
              <span className="text-lg text-ink/50">
                {" "}
                &ndash; {formatPrice(SIZES["150ml"].basePrice)}
              </span>
            </p>
            <p className="mt-1.5 text-xs text-ink/55">
              {SIZES["100ml"].label} and {SIZES["150ml"].label}. Delivery charges
              confirmed at checkout.
            </p>

            <ul className="mt-7 space-y-2.5 border-y border-champagne py-6">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm text-ink/80">
                  <span aria-hidden className="text-herbal">
                    &#10003;
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <BundleSelector className="mt-8" />

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-champagne pt-6">
              {FORMULA_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-ink/70">
                  <span aria-hidden className="text-herbal">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="border-t border-champagne bg-champagne/15 py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-3xl italic leading-tight">
              What it is
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/75">
              <p>
                Miracle Hair Oil is a herb-infused scalp and hair oil. The
                packaging headline is twenty-plus herbs, and that is the
                infusion &mdash; but the thing doing the work is the carrier base
                underneath it: seven oils chosen for what they do to a dry scalp
                and weak roots, with nothing synthetic added to stretch the
                bottle.
              </p>
              <p>
                There is no mineral oil in it. That matters more than it sounds.
                Mineral oil is the cheap way to make a hair oil feel rich &mdash;
                it sits on the surface, looks glossy, and does very little
                underneath. Take it out and the formula has to work on the oils
                themselves.
              </p>
              <p>
                Use it two or three times a week, on dry hair, left in for a few
                hours or overnight. It is a cosmetic oil, not a medicine, and it
                works the way oiling has always worked &mdash; gradually.
              </p>
            </div>

            <p className="mt-8 text-xs text-ink/50">{BRAND.trademark}</p>
          </div>

          <div>
            <Accordion
              items={[
                {
                  q: "Full ingredient list",
                  a: (
                    <ul className="space-y-3">
                      {INGREDIENTS.map((oil) => (
                        <li key={oil.name}>
                          <span className="font-medium text-ink">{oil.name}</span>
                          <br />
                          {oil.note}
                        </li>
                      ))}
                      <li className="pt-1 text-ink/55">
                        Plus an infusion of over twenty herbs.
                      </li>
                    </ul>
                  ),
                },
                {
                  q: "How to use",
                  a: (
                    <ol className="space-y-2">
                      {HOW_TO_USE.map((step, i) => (
                        <li key={step}>
                          {i + 1}. {step}
                        </li>
                      ))}
                    </ol>
                  ),
                },
                {
                  q: "Bundle prices",
                  a: (
                    <div className="space-y-4">
                      {(["100ml", "150ml"] as const).map((size) => (
                        <div key={size}>
                          <p className="font-medium text-ink">{SIZES[size].label}</p>
                          <ul className="mt-1.5 space-y-1 tabular-nums">
                            {BUNDLES[size].map((tier) => (
                              <li key={tier.qty}>
                                {tier.qty} {tier.qty === 1 ? "bottle" : "bottles"}{" "}
                                &mdash; {formatPrice(tier.price)}
                                {tier.saving > 0 && (
                                  <span className="text-herbal">
                                    {" "}
                                    (save {formatPrice(tier.saving)})
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  q: "Payment & delivery",
                  a: (
                    <p>
                      Cash on Delivery &mdash; you pay the courier when the parcel
                      reaches you, and nothing is charged upfront. Prefer to order
                      over WhatsApp? Message {SITE.phone} and we will place it for
                      you.
                    </p>
                  ),
                },
                {
                  q: "Returns",
                  a: (
                    <p>
                      See our{" "}
                      <a
                        href="/policies/refund-policy"
                        className="text-gold-deep underline underline-offset-4"
                      >
                        refund policy
                      </a>{" "}
                      for the current terms.
                    </p>
                  ),
                },
                ...FAQ.slice(0, 3).map((item) => ({ q: item.q, a: item.a })),
              ]}
            />
          </div>
        </div>
      </section>

      <Reviews />
      <Faq />
    </>
  );
}
