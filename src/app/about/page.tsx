import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BRAND, FORMULA_HIGHLIGHTS, INGREDIENTS } from "@/lib/brand";
import { ABOUT } from "@/lib/content";
import { btn } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Anisa Herbal exists, what goes into Miracle Hair Oil, and what we will not claim about it.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink py-20 text-ivory lg:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-champagne">
            About {BRAND.name}
          </p>
          <h1 className="mt-5 font-display text-4xl italic leading-tight sm:text-5xl">
            <span className="block text-gold-gradient">Made properly,</span>
            <span className="block">or not at all</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-ivory/80">{ABOUT.lead}</p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="space-y-5 text-base leading-relaxed text-ink/75">
            {ABOUT.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p className="pt-2 text-sm text-ink/55">{ABOUT.trademark}</p>
          </div>

          {/* TODO(assets): swap for the artisanal workspace shot — the prompt is
              ready in KNOWLEDGE_BASE.md §8.2. Using a product lifestyle shot
              until that photograph exists. */}
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/both-sizes.png"
              alt="Anisa Herbal Miracle Hair Oil in both sizes"
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-champagne/20 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-display text-3xl italic leading-tight">
                What we put in
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                Twenty-plus herbs go into the infusion. Seven carrier oils carry
                it. These are the seven, and they are the only ingredients we
                make specific claims about.
              </p>
              <ul className="mt-7 space-y-2">
                {INGREDIENTS.map((oil) => (
                  <li key={oil.name} className="flex gap-3 text-sm text-ink/80">
                    <span aria-hidden className="text-herbal">
                      &#10003;
                    </span>
                    {oil.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-3xl italic leading-tight">
                What we leave out
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                Four things, and the promises that usually come with them.
              </p>
              <ul className="mt-7 space-y-2">
                {FORMULA_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink/80">
                    <span aria-hidden className="text-herbal">
                      &#10003;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 rounded-lg border border-champagne bg-ivory p-5 text-sm leading-relaxed text-ink/70">
                We also leave out the timelines. You will not see &ldquo;stops
                hair fall in seven days&rdquo; anywhere on this site, because we
                cannot promise it and neither can anyone else selling you a hair
                oil.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/products/miracle-hair-oil" className={btn("primary", "lg")}>
              Shop Miracle Hair Oil
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
