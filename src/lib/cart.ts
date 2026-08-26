import { BUNDLES, SIZES, type SizeId } from "./brand";

export type CartLine = {
  size: SizeId;
  qty: number;
};

/** Highest bundle tier we publish a deal price for. */
const MAX_TIER = 5;

/**
 * Price for a line of `qty` bottles of one size.
 *
 * Up to the top published tier this is the exact deal price from the pricing
 * sheet — never qty × base. Above it, the top tier plus base price per extra
 * bottle, so a large order can never come out cheaper per bottle than the
 * published deal.
 */
export function linePrice(size: SizeId, qty: number): number {
  if (qty <= 0) return 0;
  const tiers = BUNDLES[size];
  if (qty <= MAX_TIER) {
    return tiers.find((t) => t.qty === qty)?.price ?? qty * SIZES[size].basePrice;
  }
  const top = tiers.find((t) => t.qty === MAX_TIER)!;
  return top.price + (qty - MAX_TIER) * SIZES[size].basePrice;
}

/** What the customer saves against buying single bottles at base price. */
export function lineSaving(size: SizeId, qty: number): number {
  return Math.max(0, qty * SIZES[size].basePrice - linePrice(size, qty));
}

export function cartSubtotal(lines: readonly CartLine[]): number {
  return lines.reduce((sum, l) => sum + linePrice(l.size, l.qty), 0);
}

export function cartSaving(lines: readonly CartLine[]): number {
  return lines.reduce((sum, l) => sum + lineSaving(l.size, l.qty), 0);
}

export function cartCount(lines: readonly CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}
