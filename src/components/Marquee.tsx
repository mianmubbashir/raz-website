import { services } from "@/lib/content";

export function Marquee() {
  const labels = services.map((s) => s.name);

  return (
    <div
      className="relative overflow-hidden border-y border-white/10 bg-ink py-5"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-20 bg-gradient-to-r from-ink to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-20 bg-gradient-to-l from-ink to-transparent md:w-32" />

      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 list-none items-center">
            {labels.map((name) => (
              <li key={`${copy}-${name}`} className="flex shrink-0 items-center">
                <span className="marquee-glow whitespace-nowrap px-7 font-display text-xl text-mist/75 transition-colors duration-300 hover:text-brass-soft md:px-10 md:text-2xl">
                  {name}
                </span>
                <span
                  className="mx-1 block h-1.5 w-1.5 rotate-45 bg-brass/70 transition-transform duration-300 hover:scale-125"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
