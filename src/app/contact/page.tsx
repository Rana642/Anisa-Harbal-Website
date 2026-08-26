"use client";

import { useState } from "react";
import { SITE, SOCIALS, whatsappLink } from "@/lib/config";
import { trackWhatsAppLead } from "@/lib/tracking";
import { btn } from "@/components/ui/button";

/**
 * There is no mail server behind this site yet, so the form composes a
 * WhatsApp message rather than pretending to send an email into a void.
 * TODO(phase-2): add a real form endpoint once a support inbox exists.
 */
export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const composed = whatsappLink(
    `Assalam o Alaikum${name.trim() ? `, my name is ${name.trim()}` : ""}.\n\n${
      message.trim() || "I have a question about Anisa Herbal Miracle Hair Oil."
    }`,
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:py-20">
      <h1 className="font-display text-4xl italic sm:text-5xl">Contact Us</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70">
        Questions about the oil, an order on its way, or something that went
        wrong &mdash; message us and we will get back to you.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-20">
        <div>
          <h2 className="font-display text-2xl italic">Send a message</h2>
          <p className="mt-3 text-sm text-ink/65">
            Write it here and we will open WhatsApp with your message ready to
            send.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Your name
                <span className="ml-2 text-xs text-ink/45">Optional</span>
              </label>
              <input
                id="name"
                value={name}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-ink/15 bg-ivory px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-gold"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Your message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                placeholder="What would you like to ask?"
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-y rounded-lg border border-ink/15 bg-ivory px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-gold"
              />
            </div>

            <a
              href={composed}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead("contact-page")}
              className={btn("whatsapp", "lg", "w-full sm:w-auto")}
            >
              Open in WhatsApp
            </a>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-champagne bg-champagne/15 p-6">
          <h2 className="font-display text-xl italic">Reach us directly</h2>

          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.15em] text-ink/50">
                WhatsApp &amp; calls
              </dt>
              <dd className="mt-1.5">
                <a
                  href={SITE.phoneHref}
                  className="text-ink transition-colors hover:text-gold-deep"
                >
                  {SITE.phone}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.15em] text-ink/50">
                Email
              </dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink transition-colors hover:text-gold-deep"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.15em] text-ink/50">
                Orders
              </dt>
              <dd className="mt-1.5 leading-relaxed text-ink/70">
                Have your order number ready &mdash; it looks like ANH-7K2P9Q and
                is on your confirmation screen.
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-[0.15em] text-ink/50">
                Follow
              </dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1.5">
                {SOCIALS.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink transition-colors hover:text-gold-deep"
                  >
                    {social.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
