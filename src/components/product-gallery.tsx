"use client";

import Image from "next/image";
import { useState } from "react";

export type GalleryImage = { src: string; alt: string };

export function ProductGallery({ images }: { images: readonly GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-champagne/20">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
            className={`relative aspect-square overflow-hidden rounded border transition-colors ${
              i === active ? "border-gold" : "border-champagne hover:border-gold/50"
            }`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
