"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { formatPrice, SIZES } from "@/lib/brand";
import { linePrice, lineSaving } from "@/lib/cart";
import { useCart } from "@/components/cart-provider";
import { btn } from "@/components/ui/button";

export function CartDrawer() {
  const { lines, isOpen, close, setQty, subtotal, saving, count } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Your cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={close}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
        <header className="flex items-center justify-between border-b border-champagne px-6 py-5">
          <h2 className="font-display text-xl italic">
            Your Cart{count > 0 && <span className="text-ink/50"> ({count})</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="text-sm text-ink/60 transition-colors hover:text-gold-deep"
          >
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-sm text-ink/60">Your cart is empty.</p>
            <Link href="/products/miracle-hair-oil" onClick={close} className={btn("primary")}>
              Shop Miracle Hair Oil
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-champagne overflow-y-auto px-6">
              {lines.map((line) => {
                const price = linePrice(line.size, line.qty);
                const save = lineSaving(line.size, line.qty);
                return (
                  <div key={line.size} className="flex gap-4 py-5">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded bg-champagne/30">
                      <Image
                        src="/images/product-150ml-front-back.png"
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Miracle Hair Oil</p>
                      <p className="mt-0.5 text-xs text-ink/60">
                        {SIZES[line.size].label}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-ink/15">
                          <button
                            type="button"
                            onClick={() => setQty(line.size, line.qty - 1)}
                            aria-label={`Decrease ${SIZES[line.size].label} quantity`}
                            className="px-3 py-1 text-sm text-ink/70 transition-colors hover:text-gold-deep"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.size, line.qty + 1)}
                            aria-label={`Increase ${SIZES[line.size].label} quantity`}
                            className="px-3 py-1 text-sm text-ink/70 transition-colors hover:text-gold-deep"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setQty(line.size, 0)}
                          className="text-xs text-ink/45 underline underline-offset-4 transition-colors hover:text-ink"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium tabular-nums">
                        {formatPrice(price)}
                      </p>
                      {save > 0 && (
                        <p className="mt-1 text-xs text-herbal tabular-nums">
                          Save {formatPrice(save)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="border-t border-champagne px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink/70">Subtotal</span>
                <span className="font-display text-2xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {saving > 0 && (
                <p className="mt-1 text-right text-xs text-herbal tabular-nums">
                  You save {formatPrice(saving)}
                </p>
              )}
              <p className="mt-3 text-xs text-ink/55">
                Cash on Delivery. Delivery charges confirmed at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={close}
                className={btn("primary", "lg", "mt-5 w-full")}
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={close}
                className="mt-3 block text-center text-xs text-ink/60 underline underline-offset-4 transition-colors hover:text-ink"
              >
                View full cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
