/**
 * Long-form site copy.
 *
 * Claims here are deliberately measured. The packaging headline is "20+ herbs",
 * but only the seven named oils get specific claims, and nothing promises a
 * timeline or a cure — see KNOWLEDGE_BASE.md §3.
 */

export const FAQ = [
  {
    q: "Who can use Anisa Herbal Miracle Hair Oil?",
    a: "Everyone in the family — men, women, children and older adults. It is a 100% herbal formula with no mineral oil, no chemicals and no artificial fragrance. If you have a sensitive scalp or a skin condition, do a small patch test first.",
  },
  {
    q: "How long before I notice a difference?",
    a: "Hair care works gradually, not overnight. Used 2–3 times a week, most people start looking for changes in softness and shine first, with scalp and hair-fall changes taking longer. Be consistent for at least six to eight weeks before you judge the results.",
  },
  {
    q: "Will it leave my hair greasy?",
    a: "It is an oil, so it does coat the hair while it works. Apply to dry hair, leave it for 2–3 hours or overnight, then wash as usual. The blend is built on lighter carrier oils like sunflower and sweet almond so it rinses out cleanly.",
  },
  {
    q: "What does it smell like?",
    a: "There is no artificial fragrance in it at all. What you smell is the natural aroma of the herb infusion and the carrier oils — warm and earthy, and it fades after washing.",
  },
  {
    q: "Should I buy the 100 ml or the 150 ml?",
    a: "The 100 ml is the easier size to start with. The 150 ml costs less per millilitre, so it is the better value once you know the oil suits you. Multi-bottle bundles bring the price down further, and the saving is shown on every option.",
  },
  {
    q: "How do I pay?",
    a: "Cash on Delivery. You pay the courier when the order reaches you — nothing is charged upfront and no card details are needed. You can also place your order over WhatsApp if you would rather talk to someone first.",
  },
  {
    q: "Can I order more than one bottle at a time?",
    a: "Yes, and it is cheaper per bottle when you do. Bundles run from one to five bottles of the same size, each with its own deal price. Mixed 100 ml and 150 ml bundles are not available yet — order them as two separate bundles.",
  },
] as const;

/** Homepage trust bar — factual, drawn straight from the packaging. */
export const TRUST_POINTS = [
  "100% Herbal Formula",
  "Infused with 20+ Herbs",
  "No Mineral Oil or Chemicals",
  "Cash on Delivery",
] as const;

export const ABOUT = {
  lead: "Anisa Herbal began with a simple objection to what was on the shelf: hair oils sold on big promises and built on mineral oil.",
  body: [
    "Most of what gets sold as herbal hair oil in this market is a mineral oil base with a little fragrance and a green label. It coats the hair, it looks like it is working, and it does very little for the scalp underneath.",
    "Miracle Hair Oil was formulated the other way round — starting from the carrier oils themselves. Sweet almond, cold-pressed coconut, sesame, pumpkin seed, kalonji and sunflower, infused with a blend of over twenty herbs, and nothing synthetic added to stretch it.",
    "That is also why we are careful about what we claim. This is a nourishing oil for the scalp and hair, used a few times a week, over weeks. It is not a medicine and it will not regrow hair overnight. What it will do is give your scalp and roots something honest to work with.",
  ],
  trademark:
    "Anisa Herbal is a registered trademark, T.M 633394®, and every bottle carries it.",
} as const;
