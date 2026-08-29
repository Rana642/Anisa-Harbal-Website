import { headers } from "next/headers";
import { isMobileUserAgent } from "@/lib/ua";
import { DesktopHeroSlider } from "@/components/sections/desktop-hero-slider";
import { MobileHero } from "@/components/sections/mobile-hero";

/**
 * Picks mobile vs. desktop hero server-side from the request's User-Agent —
 * only the matching markup is ever sent, so neither device downloads the
 * other's images. See src/lib/ua.ts for why this can't be done with CSS
 * hide/show alone.
 */
export async function Hero() {
  const requestHeaders = await headers();
  const isMobile = isMobileUserAgent(requestHeaders.get("user-agent"));

  return isMobile ? <MobileHero /> : <DesktopHeroSlider />;
}
