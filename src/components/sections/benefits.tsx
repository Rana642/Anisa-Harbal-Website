import { BENEFITS } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";

export function Benefits() {
  return (
    <section className="bg-champagne/20 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Benefits"
          title="What regular use does"
          intro="Used two to three times a week, over weeks — not overnight."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg bg-champagne sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <li key={benefit} className="flex items-baseline gap-3 bg-ivory p-6 sm:p-8">
              <span className="shrink-0 font-display text-sm italic text-gold-deep tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.95rem] leading-relaxed text-ink/85">
                {benefit}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
