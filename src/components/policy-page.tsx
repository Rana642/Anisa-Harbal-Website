import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/config";

/**
 * Marks a clause that cannot be finalised yet — usually because the courier,
 * the return window or the legal review is still outstanding (KB §10).
 *
 * It is deliberately visible. A blank the client can see is safer than a
 * confident-sounding delivery promise nobody has agreed to.
 */
export function ToBeConfirmed({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-gold-light/25 px-1.5 py-0.5 text-ink">
      {children}
    </span>
  );
}

export function PolicyPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:py-20">
      <h1 className="font-display text-4xl italic sm:text-5xl">{title}</h1>
      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-ink/50">
        Last updated {updated}
      </p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-ink/75 [&_h2]:font-display [&_h2]:text-xl [&_h2]:not-italic [&_h2]:text-ink [&_li]:mt-1.5 [&_p+p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>

      <div className="mt-14 rounded-lg border border-champagne bg-champagne/20 p-6">
        <p className="text-sm font-medium text-ink">Questions about this policy?</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Contact {BRAND.name} on{" "}
          <a href={SITE.phoneHref} className="text-gold-deep underline underline-offset-4">
            {SITE.phone}
          </a>{" "}
          or{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-gold-deep underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
