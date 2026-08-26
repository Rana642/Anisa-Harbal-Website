import type { Metadata } from "next";
import { PolicyPage, ToBeConfirmed } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "When Anisa Herbal accepts returns, how to raise one, and how refunds are paid.",
};

/**
 * TODO(client): the return window, who pays return postage, and the refund
 * method all need confirming, then a legal read before launch.
 */
export default function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund Policy" updated="26 August 2026">
      <section>
        <h2>Damaged, wrong or leaking orders</h2>
        <p>
          If your bottle arrives damaged, leaking, or is not what you ordered,
          contact us within <ToBeConfirmed>[48 hours]</ToBeConfirmed> of delivery
          with your order number and a photograph of the parcel and bottle. We
          will replace it or refund it in full, and we cover the cost of getting
          it back to us.
        </p>
      </section>

      <section>
        <h2>Unopened returns</h2>
        <p>
          Unopened bottles in their original condition can be returned within{" "}
          <ToBeConfirmed>[7 days]</ToBeConfirmed> of delivery.{" "}
          <ToBeConfirmed>
            [Return postage is paid by the customer / by Anisa Herbal]
          </ToBeConfirmed>
          . Once we receive and check the return, the refund is issued within{" "}
          <ToBeConfirmed>[7 working days]</ToBeConfirmed>.
        </p>
      </section>

      <section>
        <h2>Opened bottles</h2>
        <p>
          For hygiene and safety reasons we cannot accept returns of opened
          bottles unless the product is faulty. This does not affect your rights
          where a product is defective.
        </p>
        <p>
          Hair oil is not a product that works overnight. Not seeing results in
          the first few weeks is not a fault &mdash; we ask you to use it as
          directed, two to three times a week, before judging it.
        </p>
      </section>

      <section>
        <h2>Reactions and sensitivity</h2>
        <p>
          The formula is 100% herbal with no mineral oil, chemicals or artificial
          fragrance, but any botanical ingredient can irritate a sensitive scalp.
          Stop using it if you react, and contact us &mdash; we will handle it
          case by case.
        </p>
        <p>
          We recommend a patch test before first use, particularly for children
          and anyone with a known skin condition.
        </p>
      </section>

      <section>
        <h2>How refunds are paid</h2>
        <p>
          Because all orders are Cash on Delivery, refunds are issued{" "}
          <ToBeConfirmed>
            [by bank transfer / JazzCash / EasyPaisa to the account you nominate]
          </ToBeConfirmed>
          . We will never ask for your full card details or your banking
          password.
        </p>
      </section>

      <section>
        <h2>How to raise a return</h2>
        <p>
          Message or call us with your order number, what went wrong, and a
          photograph if the item is damaged. Do not send anything back before we
          have confirmed the return &mdash; unannounced returns can go missing.
        </p>
      </section>
    </PolicyPage>
  );
}
