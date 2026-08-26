import { SITE } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center text-[0.7rem] tracking-[0.12em] uppercase">
        <span>{SITE.announcement}</span>
        <span aria-hidden className="hidden text-ivory/30 sm:inline">
          |
        </span>
        <span className="hidden sm:inline">
          Helpline{" "}
          <a href={SITE.phoneHref} className="text-gold-light hover:underline">
            {SITE.phone}
          </a>
        </span>
      </div>
    </div>
  );
}
