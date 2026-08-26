import Image from "next/image";
import { BundleSelector } from "@/components/sections/bundle-selector";
import { SectionHeading } from "@/components/ui/section-heading";

export function BundlePricing() {
  return (
    <section id="bundles" className="bg-champagne/20 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Multi-bottle savings"
          title="The more bottles, the lower the price"
          intro="Every bundle below is a fixed deal price, not a percentage off. Pick your size, pick your quantity, and the saving is shown against buying single bottles."
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 overflow-hidden rounded-lg bg-ivory lg:order-1">
            <Image
              src="/images/both-sizes.png"
              alt="Anisa Herbal Miracle Hair Oil in 100 ml and 150 ml"
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

          <BundleSelector className="order-1 lg:order-2" />
        </div>
      </div>
    </section>
  );
}
