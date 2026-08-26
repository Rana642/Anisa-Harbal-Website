type Variant = "primary" | "outline" | "whatsapp" | "dark";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gold text-ivory shadow-[0_2px_0_0_var(--color-gold-deep)] hover:bg-gold-light hover:text-ink active:translate-y-px active:shadow-none",
  outline:
    "border border-ink/20 text-ink hover:border-gold hover:text-gold-deep",
  whatsapp: "bg-herbal text-ivory hover:bg-olive",
  dark: "bg-ink text-ivory hover:bg-ink/85",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-sm",
};

/** Shared button styling, usable on <button>, <a> and next/link alike. */
export function btn(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`.trim();
}
