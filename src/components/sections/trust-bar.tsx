import { TRUST_POINTS } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="border-b border-champagne/70 bg-champagne/25">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-5 py-6 lg:grid-cols-4">
        {TRUST_POINTS.map((point) => (
          <li
            key={point}
            className="flex items-center justify-center gap-2.5 text-center text-[0.8rem] tracking-wide text-ink/75"
          >
            <span aria-hidden className="text-herbal">
              ✓
            </span>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
