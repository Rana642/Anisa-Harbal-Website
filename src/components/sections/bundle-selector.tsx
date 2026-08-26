"use client";

import { useState } from "react";
import { BUNDLES, SIZES, formatPrice, type SizeId } from "@/lib/brand";
import { trackAddToCart } from "@/lib/tracking";
import { useCart } from "@/components/cart-provider";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { btn } from "@/components/ui/button";

const SIZE_IDS: readonly SizeId[] = ["100ml", "150ml"];

export function BundleSelector({
  defaultSize = "100ml",
  className = "",
}: {
  defaultSize?: SizeId;
  className?: string;
}) {
  const [size, setSize] = useState<SizeId>(defaultSize);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const tiers = BUNDLES[size];
  const selected = tiers.find((t) => t.qty === qty) ?? tiers[0];

  function handleAdd() {
    add(size, selected.qty);
    trackAddToCart(
      [
        {
          id: `miracle-hair-oil-${size}`,
          name: `Miracle Hair Oil ${SIZES[size].label}`,
          quantity: selected.qty,
          price: selected.price,
        },
      ],
      selected.price,
    );
  }

  return (
    <div className={className}>
      {/* Size toggle */}
      <div
        role="radiogroup"
        aria-label="Bottle size"
        className="inline-flex rounded-full border border-ink/15 p-1"
      >
        {SIZE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={size === id}
            onClick={() => setSize(id)}
            className={`rounded-full px-6 py-2 text-sm transition-colors ${
              size === id ? "bg-ink text-ivory" : "text-ink/70 hover:text-ink"
            }`}
          >
            {SIZES[id].label}
          </button>
        ))}
      </div>

      {/* Quantity tiers */}
      <div
        role="radiogroup"
        aria-label="Bundle quantity"
        className="mt-6 space-y-2.5"
      >
        {tiers.map((tier) => {
          const active = tier.qty === qty;
          const perBottle = Math.round(tier.price / tier.qty);
          return (
            <button
              key={tier.qty}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setQty(tier.qty)}
              className={`flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition-colors ${
                active
                  ? "border-gold bg-champagne/25"
                  : "border-ink/12 bg-ivory hover:border-gold/50"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  active ? "border-gold-deep" : "border-ink/30"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    active ? "bg-gold-deep" : "bg-transparent"
                  }`}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="text-sm font-medium">
                    {tier.qty} {tier.qty === 1 ? "Bottle" : "Bottles"}
                  </span>
                  {tier.mostPopular && (
                    <span className="rounded-full bg-herbal px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-ivory">
                      Most Popular
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-xs text-ink/55 tabular-nums">
                  {tier.qty === 1
                    ? "Standard price"
                    : `${formatPrice(perBottle)} per bottle`}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block text-base font-medium tabular-nums">
                  {formatPrice(tier.price)}
                </span>
                {tier.saving > 0 && (
                  <span className="mt-0.5 block text-xs text-herbal tabular-nums">
                    Save {formatPrice(tier.saving)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink/55">
        Bundles are same-size only. To mix {SIZES["100ml"].label} and{" "}
        {SIZES["150ml"].label}, add each as its own bundle.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className={btn("primary", "lg", "w-full")}
        >
          Add to Cart &mdash; {formatPrice(selected.price)}
        </button>
        <WhatsAppLink
          source="bundle-selector"
          className="w-full"
          message={`Assalam o Alaikum, I would like to order ${selected.qty} x ${SIZES[size].label} Anisa Herbal Miracle Hair Oil (${formatPrice(selected.price)}).`}
        >
          Order via WhatsApp
        </WhatsAppLink>
      </div>

      <p className="mt-4 text-center text-xs text-ink/55">
        Pay on delivery — nothing is charged upfront.
      </p>
    </div>
  );
}
