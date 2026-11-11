import { shop } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Franchises() {
  return (
    <section
      id="shop"
      className="mesh-mist relative overflow-hidden px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[90rem]">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-mist-muted">
            Find us
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] text-ink">
            Visit Our Shop
          </h2>
          <p className="mt-4 text-sm tracking-wide text-ink/50 md:text-base">
            Golden Tower, Karachi.
          </p>
        </Reveal>

        <Reveal delay={2}>
          <div
            className="mx-auto mt-12 flex max-w-xs items-center gap-3 md:max-w-sm"
            aria-hidden
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-ink/15" />
            <span className="h-1.5 w-1.5 rotate-45 bg-brass animate-float" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-ink/15" />
          </div>
        </Reveal>

        <Reveal delay={3} className="mx-auto mt-16 max-w-lg text-center">
          <p className="text-[10px] tracking-[0.28em] text-brass">01</p>
          <h3 className="mt-3 font-display text-[1.75rem] text-ink md:text-[2.25rem]">
            {shop.name}
          </h3>
          <p className="mx-auto mt-5 max-w-[22rem] text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink/45">
            {shop.address}
          </p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.16em] text-ink/70">
            {shop.hours}
          </p>
          <span
            className="mx-auto mt-6 block h-px w-12 bg-brass"
            aria-hidden
          />
        </Reveal>
      </div>
    </section>
  );
}
