import type { Metadata } from "next";
import { PolicyPage, ToBeConfirmed } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information Anisa Herbal collects when you order, why, and who it is shared with.",
};

/**
 * TODO(client): confirm the registered business name and address, then have
 * this read by someone qualified before launch. The advertising section below
 * describes what the site actually does — keep it accurate if tracking changes.
 */
export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" updated="26 August 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          Anisa Herbal, trading as{" "}
          <ToBeConfirmed>[registered business name]</ToBeConfirmed> of{" "}
          <ToBeConfirmed>[registered address]</ToBeConfirmed>, sells herbal hair
          care products in Pakistan. This policy covers this website.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>When you place an order we collect:</p>
        <ul>
          <li>Your name</li>
          <li>Your mobile number</li>
          <li>Your delivery address and city</li>
          <li>Any order notes you choose to add</li>
        </ul>
        <p>
          We do not collect card or bank details, because every order is Cash on
          Delivery. Nobody at Anisa Herbal will ever ask you for a password, a
          card number or an OTP.
        </p>
      </section>

      <section>
        <h2>Why we need it</h2>
        <p>
          To get your parcel to you: to call and confirm the address, to pass the
          delivery details to the courier, and to reach you if something goes
          wrong with the order.
        </p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <ul>
          <li>
            The courier delivering your order &mdash; they receive your name,
            address and mobile number.
          </li>
          <li>
            Meta and Google, in the case of advertising measurement described
            below.
          </li>
        </ul>
        <p>We do not sell your information to anyone.</p>
      </section>

      <section>
        <h2>Advertising and measurement</h2>
        <p>
          We advertise on Meta (Facebook and Instagram) and use Google Analytics
          to understand how the site is used. To measure which adverts actually
          lead to orders, we send Meta a record of completed purchases through
          its Conversions API.
        </p>
        <p>
          Where that record includes personal details such as your mobile number
          or city, they are irreversibly hashed before they leave our server.
          Meta uses the hash to match the purchase to an advert view; it does not
          receive your number in readable form. We send the order value, the
          order number and the items bought.
        </p>
        <p>
          If you would rather not be measured this way, most browsers let you
          block these scripts, and doing so does not affect your ability to order
          &mdash; you can also order entirely over WhatsApp or by phone.
        </p>
      </section>

      <section>
        <h2>Cookies and local storage</h2>
        <p>
          Your cart is kept in your own browser&rsquo;s local storage so it is
          still there when you come back. It never leaves your device until you
          place an order. Analytics and advertising tools set their own cookies.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Order records are kept for{" "}
          <ToBeConfirmed>[period to be confirmed]</ToBeConfirmed> so we can
          handle returns, complaints and our own accounting.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us what we hold about you, ask us to correct it, or ask us
          to delete it where we are not required to keep it. Contact us using the
          details below.
        </p>
      </section>
    </PolicyPage>
  );
}
