export type Review = {
  id: string;
  name: string;
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  title?: string;
  body: string;
  verified?: boolean;
};

/**
 * Real customer reviews only.
 *
 * This is deliberately empty. The reviews section renders nothing until real
 * reviews are added — inventing testimonials would be fabricating records, and
 * it is also the fastest way to lose a Meta ad account.
 *
 * TODO(client): paste in real reviews (WhatsApp screenshots, order feedback),
 * or wire this to a review platform once one is chosen.
 */
export const REVIEWS: readonly Review[] = [];

export function reviewSummary(reviews: readonly Review[]) {
  if (reviews.length === 0) return null;
  const total = reviews.length;
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
  const breakdown = ([5, 4, 3, 2, 1] as const).map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));
  return { total, average, breakdown };
}
