import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { PolicyPage, ToBeConfirmed } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms you agree to when ordering from the Anisa Herbal website.",
};

/**
 * TODO(client): needs a legal read before launch, and the registered entity
 * name filling in. The product-claims clause below matches what the site
 * actually says — if the marketing claims change, change this too.
 */
export default function TermsOfServicePage() {
  return (
    <PolicyPage title="Terms of Service" updated="26 August 2026">
      <section>
        <h2>These terms</h2>
        <p>
          By ordering from this website you agree to these terms. They are
          between you and{" "}
          <ToBeConfirmed>[registered business name]</ToBeConfirmed>, trading as{" "}
          {BRAND.name}.
        </p>
      </section>

      <section>
        <h2>Orders</h2>
        <p>
          Placing an order is an offer to buy. The order is confirmed once we
          have called you to verify your address and the delivery charge. We may
          decline an order &mdash; for example if we cannot reach you, the
          address is outside our delivery area, or the item is out of stock.
        </p>
      </section>

      <section>
        <h2>Prices</h2>
        <p>
          All prices are in Pakistani Rupees and are the prices shown on the site
          at the time you order. Multi-bottle bundle prices are fixed deal prices
          for that quantity of that size; bundles cannot be mixed across sizes.
          Delivery is charged separately and confirmed before dispatch.
        </p>
        <p>
          We may change prices at any time, but a change never affects an order
          already confirmed.
        </p>
      </section>

      <section>
        <h2>Payment</h2>
        <p>
          Cash on Delivery only. Payment is made in cash to the courier at the
          time of delivery. We do not take card payments on this site and will
          never ask you for card details, banking passwords or OTP codes.
        </p>
      </section>

      <section>
        <h2>About the product and its claims</h2>
        <p>
          {BRAND.product} is a cosmetic hair and scalp oil. It is not a medicine,
          it is not a treatment for any medical condition, and nothing on this
          site should be read as medical advice.
        </p>
        <p>
          Results vary from person to person and depend on consistent use. We
          describe what the oil is formulated to do &mdash; we do not promise
          specific results within a specific time.
        </p>
        <p>
          If you have a scalp or skin condition, are pregnant, or are using the
          oil on a young child, speak to a doctor first and patch test before
          full use.
        </p>
      </section>

      <section>
        <h2>Returns</h2>
        <p>
          Returns are handled under our Refund Policy, which forms part of these
          terms.
        </p>
      </section>

      <section>
        <h2>Trademark and content</h2>
        <p>
          {BRAND.name} is a registered trademark, {BRAND.trademark}. The text,
          photography and design on this site belong to us and may not be copied
          or reused without permission.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          Nothing in these terms limits our liability where the law does not
          allow it to be limited. Otherwise, our liability for any order is
          limited to the amount you paid for that order.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of Pakistan, and the courts of{" "}
          <ToBeConfirmed>[city to be confirmed]</ToBeConfirmed> have exclusive
          jurisdiction.
        </p>
      </section>
    </PolicyPage>
  );
}
