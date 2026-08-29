import Image from "next/image";
import Link from "next/link";
import { MOBILE_HERO } from "@/lib/hero-slides";

const PRODUCT_HREF = "/products/miracle-hair-oil";

/**
 * The one purpose-built portrait crop, full-bleed. No carousel — there's
 * only one mobile asset. Only ever rendered server-side for a mobile
 * User-Agent; see src/components/sections/hero.tsx.
 */
export function MobileHero() {
  return (
    <section>
      <Link href={PRODUCT_HREF} aria-label="Shop Anisa Herbal Miracle Hair Oil">
        <Image
          src={MOBILE_HERO.src}
          alt={MOBILE_HERO.alt}
          width={900}
          height={1600}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </Link>
    </section>
  );
}
