import Link from "next/link";
import { BRAND, FORMULA_HIGHLIGHTS } from "@/lib/brand";
import { SITE, SOCIALS } from "@/lib/config";

const SHOP = [
  { href: "/products/miracle-hair-oil", label: "Miracle Hair Oil" },
  { href: "/collections/all", label: "Shop All" },
  { href: "/cart", label: "Cart" },
] as const;

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const POLICIES = [
  { href: "/policies/shipping-policy", label: "Shipping Policy" },
  { href: "/policies/refund-policy", label: "Refund Policy" },
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/terms-of-service", label: "Terms of Service" },
] as const;

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-champagne">
      {children}
    </h3>
  );
}

function Column({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <ColumnHeading>{title}</ColumnHeading>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ivory/70 transition-colors hover:text-gold-light"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl italic text-gold-gradient">
              {BRAND.name}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              {BRAND.product} &mdash; a 100% herbal blend{" "}
              {BRAND.tagline.toLowerCase()}.
            </p>
            <ul className="mt-6 space-y-1.5">
              {FORMULA_HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-ivory/70"
                >
                  <span aria-hidden className="text-olive">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Column title="Shop" links={SHOP} />
          <Column title="Company" links={COMPANY} />
          <Column title="Policies" links={POLICIES} />
        </div>

        <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-10 sm:grid-cols-2">
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="text-ivory/70 transition-colors hover:text-gold-light"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ivory/70 transition-colors hover:text-gold-light"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Follow</ColumnHeading>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/70 transition-colors hover:text-gold-light"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p>{BRAND.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
