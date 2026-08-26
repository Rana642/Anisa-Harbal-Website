import { Benefits } from "@/components/sections/benefits";
import { BundlePricing } from "@/components/sections/bundle-pricing";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowToUse } from "@/components/sections/how-to-use";
import { Ingredients } from "@/components/sections/ingredients";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { Reviews } from "@/components/sections/reviews";
import { SuitableFor } from "@/components/sections/suitable-for";
import { TrustBar } from "@/components/sections/trust-bar";

/** Funnel-style landing page — section order fixed by KNOWLEDGE_BASE.md §6. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductShowcase />
      <Benefits />
      <Ingredients />
      <BundlePricing />
      <HowToUse />
      <SuitableFor />
      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}
