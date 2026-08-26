/**
 * Client-side conversion tracking.
 *
 * Every function here is a no-op until the Pixel / GA4 snippets are actually
 * on the page, so the site works fine with tracking switched off. Purchase
 * events carry an `event_id` that the server reuses when it posts the same
 * event to the Conversions API — that is what stops Meta counting it twice.
 * See KNOWLEDGE_BASE.md §5.
 */

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    gtag?: Gtag;
  }
}

const CURRENCY = "PKR";
const CONTENT_TYPE = "product";

export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export type TrackedItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export function trackViewContent(item: TrackedItem) {
  fbq("track", "ViewContent", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: CONTENT_TYPE,
    value: item.price,
    currency: CURRENCY,
  });
  gtag("event", "view_item", {
    currency: CURRENCY,
    value: item.price,
    items: [{ item_id: item.id, item_name: item.name, price: item.price }],
  });
}

export function trackAddToCart(items: TrackedItem[], value: number) {
  fbq("track", "AddToCart", {
    content_ids: items.map((i) => i.id),
    content_type: CONTENT_TYPE,
    value,
    currency: CURRENCY,
  });
  gtag("event", "add_to_cart", {
    currency: CURRENCY,
    value,
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      quantity: i.quantity,
      price: i.price,
    })),
  });
}

export function trackInitiateCheckout(items: TrackedItem[], value: number) {
  fbq("track", "InitiateCheckout", {
    content_ids: items.map((i) => i.id),
    content_type: CONTENT_TYPE,
    num_items: items.reduce((n, i) => n + i.quantity, 0),
    value,
    currency: CURRENCY,
  });
  gtag("event", "begin_checkout", {
    currency: CURRENCY,
    value,
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      quantity: i.quantity,
      price: i.price,
    })),
  });
}

/**
 * `value` must be the exact deal price shown to the customer — never
 * quantity × base price. KNOWLEDGE_BASE.md §4.
 */
export function trackPurchase(options: {
  orderId: string;
  eventId: string;
  value: number;
  items: TrackedItem[];
}) {
  fbq(
    "track",
    "Purchase",
    {
      content_ids: options.items.map((i) => i.id),
      content_type: CONTENT_TYPE,
      num_items: options.items.reduce((n, i) => n + i.quantity, 0),
      value: options.value,
      currency: CURRENCY,
    },
    { eventID: options.eventId },
  );
  gtag("event", "purchase", {
    transaction_id: options.orderId,
    currency: CURRENCY,
    value: options.value,
    items: options.items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      quantity: i.quantity,
      price: i.price,
    })),
  });
}

/** WhatsApp order clicks are a Lead, never a Purchase. KNOWLEDGE_BASE.md §5. */
export function trackWhatsAppLead(source: string) {
  fbq("track", "Lead", { content_name: source });
  gtag("event", "generate_lead", { method: "whatsapp", source });
}
