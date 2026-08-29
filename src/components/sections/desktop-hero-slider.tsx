"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/lib/hero-slides";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;
const PRODUCT_HREF = "/products/miracle-hair-oil";

/**
 * The client's own creative, shown as-is — no text or CTA layered on top
 * (client instruction, 29 Aug 2026). Each banner carries its own "Shop Now",
 * so the image itself links through to the PDP.
 *
 * Only ever rendered server-side for a non-mobile User-Agent; see
 * src/components/sections/hero.tsx. Never shown alongside MobileHero.
 */
export function DesktopHeroSlider() {
  const count = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Only the current slide plus its immediate neighbours are ever mounted, so
  // a user who never advances never fetches the other 5 banners. Derived
  // straight from `index` each render — no state needed to track it.
  const isNear = useCallback(
    (i: number) => i === index || i === (index + 1) % count || i === (index - 1 + count) % count,
    [index, count],
  );

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (dx < 0) next();
    else prev();
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Anisa Herbal Miracle Hair Oil"
      className="relative bg-champagne/25"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative aspect-[12/5] max-h-[720px] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {isNear(i) && (
              <Link href={PRODUCT_HREF} aria-label="Shop Anisa Herbal Miracle Hair Oil">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={`object-cover ${slide.objectPosition ?? "object-center"}`}
                />
              </Link>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/80 text-ink shadow transition-colors hover:bg-ivory"
        >
          <span
            aria-hidden
            className="block h-2.5 w-2.5 -translate-x-px rotate-45 border-b-2 border-l-2 border-current"
          />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/80 text-ink shadow transition-colors hover:bg-ivory"
        >
          <span
            aria-hidden
            className="block h-2.5 w-2.5 translate-x-px rotate-45 border-r-2 border-t-2 border-current"
          />
        </button>
      </div>

      <div className="flex justify-center gap-2 py-4">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-gold" : "w-2 bg-ink/20 hover:bg-ink/35"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
