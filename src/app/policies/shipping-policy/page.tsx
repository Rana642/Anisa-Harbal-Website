import type { Metadata } from "next";
import { PolicyPage, ToBeConfirmed } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "How Anisa Herbal orders are delivered, what delivery costs, and how long it takes.",
};

/**
 * TODO(client): courier partner, delivery charge and delivery windows are still
 * open (KNOWLEDGE_BASE.md §10). Every highlighted value below needs replacing
 * before launch, and the whole policy needs a legal read.
 */
export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy" updated="26 August 2026">
      <section>
        <h2>Where we deliver</h2>
        <p>
          We deliver across Pakistan. International delivery is{" "}
          <ToBeConfirmed>not available yet</ToBeConfirmed>.
        </p>
      </section>

      <section>
        <h2>Delivery time</h2>
        <p>
          Orders are dispatched within{" "}
          <ToBeConfirmed>[1–2 working days]</ToBeConfirmed> of confirmation.
          Delivery usually takes a further{" "}
          <ToBeConfirmed>[2–4 working days]</ToBeConfirmed> depending on your
          city. Remote areas may take longer.
        </p>
        <p>
          Our team calls you to confirm your address before dispatch, so please
          keep the mobile number you gave us switched on.
        </p>
      </section>

      <section>
        <h2>Delivery charges</h2>
        <p>
          Delivery is charged at{" "}
          <ToBeConfirmed>[Rs. XXX per order]</ToBeConfirmed> and is confirmed on
          the call before your order is dispatched. The charge is collected with
          your Cash on Delivery payment.
        </p>
      </section>

      <section>
        <h2>Cash on Delivery</h2>
        <p>
          All orders are Cash on Delivery. You pay the courier in cash when your
          parcel arrives &mdash; nothing is charged before that, and we never ask
          for card or bank details.
        </p>
        <p>
          Please have the exact amount ready where possible, as couriers do not
          always carry change.
        </p>
      </section>

      <section>
        <h2>Failed deliveries</h2>
        <p>
          Couriers normally attempt delivery{" "}
          <ToBeConfirmed>[twice]</ToBeConfirmed> before returning a parcel to us.
          If your parcel is returned undelivered because the number was
          unreachable or the address was incomplete, we will contact you to
          arrange a re-send.
        </p>
        <p>
          Repeatedly refusing Cash on Delivery orders may mean we ask for advance
          payment on future orders.
        </p>
      </section>

      <section>
        <h2>Tracking</h2>
        <p>
          Once your parcel is dispatched we will share the tracking number on the
          mobile number you provided,{" "}
          <ToBeConfirmed>[via WhatsApp / SMS]</ToBeConfirmed>.
        </p>
      </section>
    </PolicyPage>
  );
}
