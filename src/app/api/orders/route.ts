import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { SIZES } from "@/lib/brand";
import { sendPurchaseToCapi } from "@/lib/meta-capi";
import {
  generateOrderId,
  isValidLines,
  orderSummaryLines,
  orderTotal,
  PAYMENT_METHOD,
  validateCustomer,
  type CustomerDetails,
} from "@/lib/order";

/**
 * Order intake.
 *
 * TODO(phase-2): this is a stopgap. Medusa.js is the intended commerce engine
 * (KNOWLEDGE_BASE.md §7) and orders should be created through it so there is a
 * real admin dashboard, inventory and fulfilment. Until then an order is only
 * durable if ORDER_WEBHOOK_URL is configured — on Vercel the filesystem is
 * ephemeral, so the local file fallback is for development only.
 */

type Body = {
  customer?: Partial<CustomerDetails>;
  lines?: unknown;
  eventId?: string;
};

function badRequest(message: string, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, fields }, { status: 400 });
}

async function persistOrder(record: unknown): Promise<boolean> {
  const webhook = process.env.ORDER_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      if (res.ok) return true;
      console.error("[orders] Webhook rejected the order", res.status);
    } catch (error) {
      console.error("[orders] Webhook unreachable", error);
    }
  }

  if (process.env.NODE_ENV !== "production") {
    try {
      const dir = path.join(process.cwd(), ".orders");
      await mkdir(dir, { recursive: true });
      await appendFile(
        path.join(dir, "orders.jsonl"),
        `${JSON.stringify(record)}\n`,
        "utf8",
      );
      return true;
    } catch (error) {
      console.error("[orders] Could not write local order log", error);
    }
  }

  return false;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return badRequest("Could not read the order.");
  }

  const customer: CustomerDetails = {
    name: String(body.customer?.name ?? ""),
    phone: String(body.customer?.phone ?? ""),
    address: String(body.customer?.address ?? ""),
    city: String(body.customer?.city ?? ""),
    notes: body.customer?.notes ? String(body.customer.notes).slice(0, 500) : undefined,
  };

  const fieldErrors = validateCustomer(customer);
  if (Object.keys(fieldErrors).length > 0) {
    return badRequest("Please check the highlighted fields.", fieldErrors as Record<string, string>);
  }

  if (!isValidLines(body.lines)) {
    return badRequest("Your cart is empty or contains an unknown item.");
  }

  // Price is always recomputed here. The client only sends sizes and quantities.
  const lines = body.lines;
  const total = orderTotal(lines);
  const summary = orderSummaryLines(lines);
  const orderId = generateOrderId();
  const eventId = body.eventId ?? orderId;

  const record = {
    orderId,
    placedAt: new Date().toISOString(),
    paymentMethod: PAYMENT_METHOD,
    currency: "PKR",
    total,
    lines: summary,
    customer,
  };

  const stored = await persistOrder(record);
  if (!stored) {
    console.error("[orders] UNSTORED ORDER", JSON.stringify(record));
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not save your order. Please order on WhatsApp instead so nothing is lost.",
      },
      { status: 503 },
    );
  }

  await sendPurchaseToCapi({
    eventId,
    orderId,
    value: total,
    contentIds: summary.map((line) => `miracle-hair-oil-${SIZES[line.size].id}`),
    numItems: summary.reduce((n, line) => n + line.qty, 0),
    eventSourceUrl: request.headers.get("referer") ?? undefined,
    customer: {
      phone: customer.phone,
      city: customer.city,
      name: customer.name,
    },
    clientIp:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json({ ok: true, orderId, total, eventId });
}
