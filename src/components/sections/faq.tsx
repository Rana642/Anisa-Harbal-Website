import { FAQ } from "@/lib/content";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq() {
  return (
    <section className="bg-champagne/20 py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow="Questions" title="Before you order" />
        <div className="mt-12">
          <Accordion items={FAQ.map((item) => ({ q: item.q, a: item.a }))} />
        </div>
      </div>
    </section>
  );
}
