/**
 * Mobile-vs-desktop detection for the hero image split — server-side, from
 * the request's User-Agent, so only the matching hero markup is ever sent to
 * a given device. CSS-based hide/show still lets the "wrong" image get
 * fetched (Next.js `priority` preloads regardless of display:none, and even
 * without it, browsers routinely start requests for elements with no box to
 * measure), so this decision has to happen before any HTML goes out.
 *
 * iPads report a desktop-class UA by default on iPadOS and are treated as
 * desktop here on purpose — there's enough width for the landscape slider.
 */
const MOBILE_UA_RE = /Android|iPhone|iPod|Mobile|Windows Phone/i;

export function isMobileUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return MOBILE_UA_RE.test(userAgent);
}
