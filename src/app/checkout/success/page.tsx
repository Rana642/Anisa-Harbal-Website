import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/brand";
import { SITE } from "@/lib/config";
import { btn } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  const params = await searchParams;
  const orderId = typeof params.order === "string" ? params.order : null;
  const rawTotal = typeof params.total === "string" ? Number(params.total) : NaN;
  const total = Number.isFinite(rawTotal) ? rawTotal : null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-herbal">
        Order placed
      </p>
      <h1 className="mt-5 font-display text-4xl italic leading-tight sm:text-5xl">
        Thank you &mdash; we have your order
      </h1>

      {orderId && (
        <p className="mt-8 inline-block rounded-lg border border-champagne bg-champagne/20 px-6 py-4">
          <span className="block text-xs uppercase tracking-[0.15em] text-ink/55">
            Order number
          </span>
          <span className="mt-1 block font-display text-2xl tabular-nums">
            {orderId}
          </span>
        </p>
      )}

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink/70">
        <p>
          Someone from our team will call you shortly to confirm your address and
          the delivery charge.
          {total !== null && (
            <>
              {" "}
              Your order total is{" "}
              <span className="font-medium text-ink tabular-nums">
                {formatPrice(total)}
              </span>
              , payable in cash when the courier arrives.
            </>
          )}
        </p>
        <p>
          Keep your order number handy &mdash; quote it if you need to reach us
          about this order.
        </p>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className={btn("primary", "md")}>
          Back to Home
        </Link>
        <a href={SITE.phoneHref} className={btn("outline", "md")}>
          Call {SITE.phone}
        </a>
      </div>
    </div>
  );
}
