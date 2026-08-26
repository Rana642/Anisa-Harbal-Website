import { HOW_TO_USE } from "@/lib/brand";

export function HowToUse() {
  return (
    <section className="bg-ink py-20 text-ivory lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-champagne">
            How to use
          </p>
          <h2 className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl">
            Four steps, two or three nights a week
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_TO_USE.map((step, i) => (
            <li key={step}>
              <span className="font-display text-4xl italic text-gold-gradient tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory/80">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
