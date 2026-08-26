import { BRAND, INGREDIENTS } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";

export function Ingredients() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Inside the bottle"
          title="Seven oils, twenty-plus herbs"
          intro="The blend is infused with over twenty herbs. These are the seven carrier oils it is built on — the ones we can name and stand behind."
        />

        <ul className="mx-auto mt-14 max-w-3xl divide-y divide-champagne border-y border-champagne">
          {INGREDIENTS.map((oil) => (
            <li key={oil.name} className="grid gap-1.5 py-6 sm:grid-cols-[15rem_1fr] sm:gap-8">
              <h3 className="text-[0.95rem] font-medium text-ink">{oil.name}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{oil.note}</p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-ink/50">
          {BRAND.product} is a cosmetic hair and scalp oil. It is not a medicine
          and makes no claim to treat or cure any condition.
        </p>
      </div>
    </section>
  );
}
