import Image from "next/image";
import { SUITABLE_FOR } from "@/lib/brand";

export function SuitableFor() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 overflow-hidden rounded-lg lg:order-1">
          <Image
            src="/images/suitable-for-all.png"
            alt="Anisa Herbal Miracle Hair Oil held by men, women, children and older adults"
            width={1080}
            height={1080}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
            Suitable for
          </p>
          <h2 className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl">
            One bottle for the whole family
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            No mineral oil, no chemicals and no artificial fragrance — which is
            why the same bottle works for a child&rsquo;s scalp and a
            grandparent&rsquo;s. If anyone in the house has a sensitive scalp,
            patch test first.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 sm:max-w-sm">
            {SUITABLE_FOR.map((who) => (
              <li key={who} className="flex items-center gap-2.5 text-sm text-ink/85">
                <span aria-hidden className="text-herbal">
                  ✓
                </span>
                {who}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
