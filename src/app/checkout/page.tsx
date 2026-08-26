"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SIZES, formatPrice } from "@/lib/brand";
import { linePrice } from "@/lib/cart";
import {
  normalisePhone,
  validateCustomer,
  type CustomerDetails,
  type FieldErrors,
} from "@/lib/order";
import {
  newEventId,
  trackInitiateCheckout,
  trackPurchase,
  type TrackedItem,
} from "@/lib/tracking";
import { useCart } from "@/components/cart-provider";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { btn } from "@/components/ui/button";

const EMPTY: CustomerDetails = {
  name: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
};

function trackedItems(
  lines: readonly { size: "100ml" | "150ml"; qty: number }[],
): TrackedItem[] {
  return lines.map((line) => ({
    id: `miracle-hair-oil-${line.size}`,
    name: `Miracle Hair Oil ${SIZES[line.size].label}`,
    quantity: line.qty,
    price: linePrice(line.size, line.qty),
  }));
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, saving, ready, clear } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const checkoutTracked = useRef(false);

  useEffect(() => {
    if (!ready || lines.length === 0 || checkoutTracked.current) return;
    checkoutTracked.current = true;
    trackInitiateCheckout(trackedItems(lines), subtotal);
  }, [ready, lines, subtotal]);

  function update(field: keyof CustomerDetails, value: string) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const found = validateCustomer(customer);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setSubmitting(true);
    const eventId = newEventId();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer: { ...customer, phone: normalisePhone(customer.phone) },
          lines,
          eventId,
        }),
      });

      const data: {
        ok: boolean;
        orderId?: string;
        total?: number;
        message?: string;
        fields?: FieldErrors;
      } = await res.json();

      if (!res.ok || !data.ok || !data.orderId) {
        if (data.fields) setErrors(data.fields);
        setFormError(data.message ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      trackPurchase({
        orderId: data.orderId,
        eventId,
        value: data.total ?? subtotal,
        items: trackedItems(lines),
      });

      clear();
      router.push(
        `/checkout/success?order=${encodeURIComponent(data.orderId)}&total=${data.total ?? subtotal}`,
      );
    } catch {
      setFormError(
        "We could not reach the server. Check your connection, or order on WhatsApp.",
      );
      setSubmitting(false);
    }
  }

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl italic">Your cart is empty</h1>
        <p className="mt-4 text-sm text-ink/65">
          Add a bottle before checking out.
        </p>
        <Link
          href="/products/miracle-hair-oil"
          className={btn("primary", "md", "mt-8")}
        >
          Shop Miracle Hair Oil
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:py-20">
      <h1 className="font-display text-4xl italic">Checkout</h1>
      <p className="mt-3 text-sm text-ink/65">
        Cash on Delivery. Fill in where the courier should bring your order.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <form onSubmit={handleSubmit} noValidate>
          <fieldset disabled={submitting} className="space-y-6">
            <Field
              label="Full name"
              name="name"
              value={customer.name}
              error={errors.name}
              autoComplete="name"
              onChange={(v) => update("name", v)}
            />
            <Field
              label="Mobile number"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="0300 1234567"
              value={customer.phone}
              error={errors.phone}
              autoComplete="tel"
              hint="The courier will call this number before delivery."
              onChange={(v) => update("phone", v)}
            />
            <Field
              label="Delivery address"
              name="address"
              multiline
              placeholder="House / flat number, street, area"
              value={customer.address}
              error={errors.address}
              autoComplete="street-address"
              onChange={(v) => update("address", v)}
            />
            <Field
              label="City"
              name="city"
              value={customer.city}
              error={errors.city}
              autoComplete="address-level2"
              onChange={(v) => update("city", v)}
            />
            <Field
              label="Order notes"
              name="notes"
              multiline
              optional
              placeholder="Landmark, preferred delivery time, anything else"
              value={customer.notes ?? ""}
              onChange={(v) => update("notes", v)}
            />
          </fieldset>

          <div className="mt-8 rounded-lg border border-champagne bg-champagne/20 px-5 py-4">
            <p className="text-sm font-medium">Payment method</p>
            <p className="mt-1.5 text-sm text-ink/70">
              Cash on Delivery &mdash; pay the courier when your order arrives.
              No card details needed.
            </p>
          </div>

          {formError && (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-gold-deep/30 bg-gold-light/15 px-4 py-3 text-sm text-ink"
            >
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={btn("primary", "lg", "mt-8 w-full")}
          >
            {submitting ? "Placing order…" : `Place Order — ${formatPrice(subtotal)}`}
          </button>

          <WhatsAppLink
            source="checkout"
            size="md"
            className="mt-3 w-full"
            message="Assalam o Alaikum, I would like to place an order for Anisa Herbal Miracle Hair Oil."
          >
            Order via WhatsApp instead
          </WhatsAppLink>
        </form>

        <aside className="h-fit rounded-lg border border-champagne bg-champagne/15 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl italic">Order Summary</h2>

          <ul className="mt-5 space-y-3 border-b border-champagne pb-5">
            {lines.map((line) => (
              <li key={line.size} className="flex justify-between gap-4 text-sm">
                <span className="text-ink/75">
                  Miracle Hair Oil {SIZES[line.size].label}
                  <span className="text-ink/45"> × {line.qty}</span>
                </span>
                <span className="shrink-0 tabular-nums">
                  {formatPrice(linePrice(line.size, line.qty))}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2.5 text-sm">
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
              <dd className="text-ink/65">Confirmed on call</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-baseline justify-between border-t border-champagne pt-5">
            <span className="text-sm font-medium">Total</span>
            <span className="font-display text-2xl tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  type = "text",
  placeholder,
  multiline = false,
  optional = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "text";
}) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  const base = `w-full rounded-lg border bg-ivory px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-gold ${
    error ? "border-gold-deep" : "border-ink/15"
  }`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {optional && <span className="ml-2 text-xs text-ink/45">Optional</span>}
      </label>

      <div className="mt-2">
        {multiline ? (
          <textarea
            id={name}
            name={name}
            rows={3}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.value)}
            className={`${base} resize-y`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.value)}
            className={base}
          />
        )}
      </div>

      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs text-gold-deep">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-ink/50">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
