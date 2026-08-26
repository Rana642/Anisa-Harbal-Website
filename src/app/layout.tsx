import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { BRAND } from "@/lib/brand";
import { SITE, SOCIALS } from "@/lib/config";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/* Closest web-safe match to the logo's cursive gold wordmark until the real
   font files are supplied. See KNOWLEDGE_BASE.md §2. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${BRAND.product} — 100% Herbal | ${BRAND.name}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Anisa Herbal Miracle Hair Oil — a 100% herbal blend infused with 20+ herbs. No mineral oil, no chemicals, no artificial fragrance. 100ml and 150ml, Cash on Delivery across Pakistan.",
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.product} — 100% Herbal`,
    description:
      "A 100% herbal blend infused with 20+ herbs. No mineral oil, no chemicals, no artificial fragrance.",
  },
};

/** `sameAs` is what ties the social profiles to the brand for search engines. */
function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    email: SITE.email,
    sameAs: SOCIALS.map((social) => social.href),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["Urdu", "English"],
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationJsonLd()),
          }}
        />
        <CartProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
