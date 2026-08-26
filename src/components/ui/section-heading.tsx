export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "center" | "left";
  /** Use "h1" when this heading is the page's main heading. */
  as?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const size = Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold-deep">
          {eyebrow}
        </p>
      )}
      <Tag className={`mt-4 font-display italic leading-tight ${size}`}>{title}</Tag>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-ink/70">{intro}</p>
      )}
    </div>
  );
}
