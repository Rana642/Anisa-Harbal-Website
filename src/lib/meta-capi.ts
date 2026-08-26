import { createHash } from "node:crypto";

/**
 * Meta Conversions API — the server half of the Purchase event.
 *
 * The browser fires Purchase through the Pixel and the server fires the same
 * event here with the same `event_id`; Meta deduplicates on that pair. Without
 * both, iOS and ad-blocked traffic goes uncounted and the ad account optimises
 * on bad data. See KNOWLEDGE_BASE.md §5.
 *
 * Everything is a no-op until META_PIXEL_ID and META_CAPI_ACCESS_TOKEN are set,
 * so local development never posts anything to Meta.
 */

const API_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Meta requires normalised-then-hashed PII: trimmed, lowercased, no punctuation. */
function hashed(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalised = value.trim().toLowerCase();
  return normalised ? sha256(normalised) : undefined;
}

/** Phone must be digits only, including country code, before hashing. */
function hashedPhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `92${digits.slice(1)}`;
  if (!digits.startsWith("92")) digits = `92${digits}`;
  return digits ? sha256(digits) : undefined;
}

export type CapiPurchase = {
  eventId: string;
  orderId: string;
  value: number;
  contentIds: string[];
  numItems: number;
  eventSourceUrl?: string;
  customer: {
    phone?: string;
    city?: string;
    name?: string;
  };
  clientIp?: string;
  userAgent?: string;
};

export async function sendPurchaseToCapi(event: CapiPurchase): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) return;

  const [firstName] = (event.customer.name ?? "").trim().split(/\s+/);

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: {
          ph: hashedPhone(event.customer.phone),
          ct: hashed(event.customer.city?.replace(/\s/g, "")),
          fn: hashed(firstName),
          country: hashed("pk"),
          client_ip_address: event.clientIp,
          client_user_agent: event.userAgent,
        },
        custom_data: {
          currency: "PKR",
          value: event.value,
          order_id: event.orderId,
          content_type: "product",
          content_ids: event.contentIds,
          num_items: event.numItems,
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      console.error("[capi] Purchase rejected", res.status, await res.text());
    }
  } catch (error) {
    // Never let a tracking failure break an order.
    console.error("[capi] Purchase failed to send", error);
  }
}
