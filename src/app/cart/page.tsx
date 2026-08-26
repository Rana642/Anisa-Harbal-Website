"use client";

import Image from "next/image";
import Link from "next/link";
import { SIZES, formatPrice } from "@/lib/brand";
import { linePrice, lineSaving } from "@/lib/cart";
import { useCart } from "@/components/cart-provider";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { btn } from "@/components/ui/button";

export default function CartPage() {
  const { lines, setQty, subtotal, saving, ready } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:py-20">
      <h1 className="font-display text-4xl italic">Your Cart</h1>

      {!ready ? (
        <p className="mt-10 text-sm text-ink/50">Loading&hellip;</p>
      ) : lines.length === 0 ? (
        <div className="mt-10 rounded-lg border border-champagne bg-champagne/15 px-6 py-16 text-center">
          <p className="text-sm text-ink/65">Your cart is empty.</p>
          <Link
            href="/products/miracle-hair-oil"
            className={btn("primary", "md", "mt-6")}
          >
            Shop Miracle Hair Oil
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <ul className="divide-y divide-champagne border-y border-champagne">
            {lines.map((line) => {
              const price = linePrice(line.size, line.qty);
              const save = lineSaving(line.size, line.qty);
              return (
                <li key={line.size} className="flex gap-5 py-6">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded bg-champagne/25">
                    <Image
                      src="/images/product-150ml-front-back.png"
                      alt=""
                      fill
                      sizes="96px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Miracle Hair Oil</p>
                    <p className="mt-1 text-sm text-ink/60">
                      {SIZES[line.size].label}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          onClick={() => setQty(line.size, line.qty - 1)}
                          aria-label={`Decrease ${SIZES[line.size].label} quantity`}
                          className="px-3.5 py-1.5 text-sm text-ink/70 transition-colors hover:text-gold-deep"
                        >
                          &minus;
                        </button>
                        <span className="min-w-7 text-center text-sm tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.size, line.qty + 1)}
                          aria-label={`Increase ${SIZES[line.size].label} quantity`}
                          className="px-3.5 py-1.5 text-sm text-ink/70 transition-colors hover:text-gold-deep"
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
                    <p className="font-medium tabular-nums">{formatPrice(price)}</p>
                    {save > 0 && (
                      <p className="mt-1 text-xs text-herbal tabular-nums">
                        Save {formatPrice(save)}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit rounded-lg border border-champagne bg-champagne/15 p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl italic">Order Summary</h2>

            <dl className="mt-6 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/65">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              {saving > 0 && (
                <div className="flex justify-between text-herbal">
                  <dt>Bundle saving</dt>
                  <dd className="tabular-nums">&minus;{formatPrice(saving)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink/65">Delivery</dt>
                <dd className="text-ink/65">Confirmed at checkout</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-baseline justify-between border-t border-champagne pt-5">
              <span className="text-sm font-medium">Total</span>
              <span className="font-display text-2xl tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>

            <Link href="/checkout" className={btn("primary", "lg", "mt-6 w-full")}>
              Checkout
            </Link>
            <WhatsAppLink
              source="cart"
              size="md"
              className="mt-3 w-full"
              message="Assalam o Alaikum, I would like to place an order for Anisa Herbal Miracle Hair Oil."
            >
              Order via WhatsApp
            </WhatsAppLink>

            <p className="mt-4 text-xs leading-relaxed text-ink/55">
              Cash on Delivery. You pay the courier when your order arrives.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
