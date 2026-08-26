import { SIZES, type SizeId } from "./brand";
import { cartSubtotal, linePrice, type CartLine } from "./cart";

/** Phase 1 is Cash on Delivery only — no payment method selector. KB §5. */
export const PAYMENT_METHOD = "cod" as const;

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
};

export type OrderRequest = {
  customer: CustomerDetails;
  lines: CartLine[];
  /** Generated client-side and reused server-side so Pixel and CAPI dedupe. */
  eventId: string;
};

export type FieldErrors = Partial<Record<keyof CustomerDetails, string>>;

/**
 * Pakistani mobile numbers: 03xx xxxxxxx, or the same with +92 / 0092.
 * Deliberately permissive about spaces and dashes — people type them.
 */
const PHONE_RE = /^(?:\+92|0092|92|0)?3\d{9}$/;

export function normalisePhone(input: string): string {
  return input.replace(/[\s()-]/g, "");
}

export function validateCustomer(customer: CustomerDetails): FieldErrors {
  const errors: FieldErrors = {};

  if (customer.name.trim().length < 3) {
    errors.name = "Please enter your full name.";
  }

  const phone = normalisePhone(customer.phone);
  if (!phone) {
    errors.phone = "Please enter your mobile number.";
  } else if (!PHONE_RE.test(phone)) {
    errors.phone = "Enter a valid mobile number, for example 0300 1234567.";
  }

  if (customer.address.trim().length < 10) {
    errors.address = "Please enter a complete address the courier can find.";
  }

  if (customer.city.trim().length < 2) {
    errors.city = "Please enter your city.";
  }

  return errors;
}

export function isValidLines(lines: unknown): lines is CartLine[] {
  return (
    Array.isArray(lines) &&
    lines.length > 0 &&
    lines.every((line: unknown) => {
      if (typeof line !== "object" || line === null) return false;
      const l = line as Record<string, unknown>;
      return (
        (l.size === "100ml" || l.size === "150ml") &&
        typeof l.qty === "number" &&
        Number.isInteger(l.qty) &&
        l.qty > 0 &&
        l.qty <= 50
      );
    })
  );
}

/**
 * Recomputed server-side from the published price table. The client never gets
 * to tell us what an order costs — it only sends sizes and quantities.
 */
export function orderTotal(lines: readonly CartLine[]): number {
  return cartSubtotal(lines);
}

export function orderSummaryLines(lines: readonly CartLine[]) {
  return lines.map((line) => ({
    size: line.size as SizeId,
    label: SIZES[line.size].label,
    qty: line.qty,
    price: linePrice(line.size, line.qty),
  }));
}

/** ANH-7K2P9Q — short, readable over the phone, no PII in it. */
export function generateOrderId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `ANH-${suffix}`;
}
