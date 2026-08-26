"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { btn } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products/miracle-hair-oil", label: "Hair Oil" },
  { href: "/collections/all", label: "Shop All" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, open: openCart, ready } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-champagne/60 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Anisa Herbal"
            width={150}
            height={150}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm tracking-wide transition-colors hover:text-gold-deep ${
                  active ? "text-gold-deep" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={openCart}
            className="text-sm tracking-wide text-ink/80 transition-colors hover:text-gold-deep"
          >
            Cart
            {ready && count > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.65rem] font-medium text-ivory tabular-nums">
                {count}
              </span>
            )}
          </button>

          <Link
            href="/products/miracle-hair-oil"
            className={btn("primary", "sm", "hidden sm:inline-flex")}
          >
            Order Now
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-champagne/60 bg-ivory px-5 pb-6 pt-2 lg:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-champagne/40 py-3.5 text-sm tracking-wide text-ink/80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/products/miracle-hair-oil"
            onClick={() => setOpen(false)}
            className={btn("primary", "md", "mt-5 w-full")}
          >
            Order Now
          </Link>
        </nav>
      )}
    </header>
  );
}
