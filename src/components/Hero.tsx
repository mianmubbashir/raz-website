import { site, whatsappHref } from "@/lib/content";
import { Hero3D } from "./Hero3D";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-mist"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Hero3D />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
        <div className="grain pointer-events-none absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-end px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
        <h1 className="animate-fade-up delay-1 max-w-3xl font-display text-[clamp(2.75rem,8vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.02em] text-mist">
            The art of fine dressing.
          <br />
          <span className="text-gold-shine">Where creativity meets craftsmanship.</span>
        </h1>

        <p className="animate-fade-up delay-2 mt-6 max-w-md text-[15px] leading-relaxed text-mist/70 md:text-base">
          {site.support}
        </p>

        <div className="animate-fade-up delay-3 mt-10 flex flex-wrap items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shear btn-glow inline-flex min-h-12 items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
          >
            <span>Book on WhatsApp</span>
          </a>
          <a
            href="#lookbook"
            className="inline-flex min-h-12 items-center justify-center border border-mist/30 px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-mist transition-all duration-300 hover:border-brass/60 hover:bg-mist/5 hover:text-brass-soft"
          >
            View lookbook
          </a>
        </div>

        <div className="animate-fade-up delay-4 mt-14 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-mist/40">
          <span className="scroll-hint-line block h-9 w-px bg-brass/70" />
          <span className="animate-float">Enter the atelier</span>
        </div>
      </div>
    </section>
  );
}
