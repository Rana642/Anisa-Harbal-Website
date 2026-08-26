"use client";

import { whatsappLink } from "@/lib/config";
import { trackWhatsAppLead } from "@/lib/tracking";
import { btn } from "@/components/ui/button";

/**
 * A WhatsApp order click is a Lead, never a Purchase — the sale is not made
 * until someone actually completes it in chat. KNOWLEDGE_BASE.md §5.
 */
export function WhatsAppLink({
  message,
  source,
  children,
  size = "lg",
  className = "",
}: {
  message: string;
  /** Where on the site the click happened, so Leads can be attributed. */
  source: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppLead(source)}
      className={btn("whatsapp", size, className)}
    >
      {children}
    </a>
  );
}
