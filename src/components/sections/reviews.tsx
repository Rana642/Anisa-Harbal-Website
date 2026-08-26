import { REVIEWS, reviewSummary } from "@/lib/reviews";
import { SectionHeading } from "@/components/ui/section-heading";

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={label ?? `${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden
          className={`h-4 w-4 ${i <= Math.round(rating) ? "fill-gold" : "fill-ink/15"}`}
        >
          <path d="M10 1.5l2.47 5.26 5.53.79-4 4.06.94 5.89L10 14.7l-4.94 2.8.94-5.89-4-4.06 5.53-.79L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Renders nothing until there are real reviews in src/lib/reviews.ts.
 * The layout below is ready — it just needs genuine customer feedback.
 */
export function Reviews() {
  const summary = reviewSummary(REVIEWS);
  if (!summary) return null;

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow="Reviews" title="What customers say" />

        <div className="mt-12 grid gap-10 rounded-lg border border-champagne bg-champagne/15 p-8 sm:grid-cols-[auto_1fr] sm:gap-14">
          <div className="text-center sm:text-left">
            <p className="font-display text-5xl tabular-nums">
              {summary.average.toFixed(1)}
            </p>
            <div className="mt-2">
              <Stars rating={summary.average} label={`${summary.average.toFixed(1)} out of 5`} />
            </div>
            <p className="mt-2 text-xs text-ink/60">
              Based on {summary.total} {summary.total === 1 ? "review" : "reviews"}
            </p>
          </div>

          <ul className="space-y-2">
            {summary.breakdown.map(({ stars, count }) => (
              <li key={stars} className="flex items-center gap-3 text-xs text-ink/60">
                <span className="w-12 shrink-0 tabular-nums">{stars} star</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                  <span
                    className="block h-full rounded-full bg-gold"
                    style={{ width: `${(count / summary.total) * 100}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right tabular-nums">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-10 divide-y divide-champagne border-y border-champagne">
          {REVIEWS.map((review) => (
            <li key={review.id} className="py-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Stars rating={review.rating} />
                <span className="text-sm font-medium">{review.name}</span>
                {review.verified && (
                  <span className="rounded-full bg-herbal/10 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-herbal">
                    Verified
                  </span>
                )}
                <span className="ml-auto text-xs text-ink/45">{review.date}</span>
              </div>
              {review.title && (
                <p className="mt-3 text-sm font-medium text-ink">{review.title}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{review.body}</p>
              {review.city && (
                <p className="mt-2 text-xs text-ink/45">{review.city}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
