/**
 * Native <details> accordion — no JavaScript, keyboard accessible for free,
 * and the content stays in the DOM for search engines.
 */
export function Accordion({
  items,
}: {
  items: readonly { q: string; a: React.ReactNode }[];
}) {
  return (
    <div className="divide-y divide-champagne border-y border-champagne">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[0.95rem] font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="relative h-3 w-3 shrink-0 text-gold-deep before:absolute before:top-1/2 before:h-px before:w-3 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:h-3 after:w-px after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <div className="pb-6 pr-9 text-sm leading-relaxed text-ink/70">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
