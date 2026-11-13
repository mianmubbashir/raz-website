"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Services() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);

  useEffect(() => {
    const node = lineRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleActive = (i: number) => {
    setPrevActive(active);
    setActive(i);
  };

  return (
    <section id="services" className="mesh-mist relative overflow-x-hidden">
      <div className="mx-auto max-w-[90rem] px-5 pt-24 md:px-10 md:pt-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-mist-muted">
            What we stitch
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] text-ink">
            From everyday
            <br />
            <span className="text-brass-deep">to occasion wear.</span>
          </h2>
        </Reveal>

        <div
          ref={lineRef}
          className="stitch-line mx-auto mt-10 h-px w-full max-w-md bg-gradient-to-r from-transparent via-brass to-transparent"
          aria-hidden
        />
      </div>

      <div className="mx-auto mt-10 grid max-w-[90rem] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="px-5 pb-24 md:px-10 md:pb-32 lg:pr-10">
          <ul>
            {services.map((service, i) => {
              const isActive = active === i;
              return (
                <Reveal
                  key={service.name}
                  as="li"
                  delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                >
                  <button
                    type="button"
                    className="service-row group flex w-full items-start gap-5 border-t border-[var(--line)] py-5 text-left md:gap-7 md:py-6"
                    onMouseEnter={() => handleActive(i)}
                    onFocus={() => handleActive(i)}
                    aria-pressed={isActive}
                  >
                    <span className="service-index pt-1.5 font-mono text-[10px] tracking-[0.22em] text-mist-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-display text-xl transition-all duration-500 md:text-[1.75rem] ${
                          isActive
                            ? "translate-x-1 text-ink"
                            : "text-ink/50"
                        }`}
                      >
                        {service.name}
                      </span>
                      <span
                        className={`mt-2 block max-w-md overflow-hidden text-sm leading-relaxed text-ink/55 transition-all duration-500 ${
                          isActive
                            ? "max-h-24 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {service.description}
                      </span>
                    </span>
                    <span
                      className={`mt-2 hidden h-px w-8 bg-brass transition-all duration-500 md:block ${
                        isActive ? "opacity-100" : "w-0 opacity-0"
                      }`}
                      aria-hidden
                    />
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <div className="relative hidden lg:block">
          <div className="sticky top-24 h-[calc(100svh-6rem)]">
            <Reveal variant="scale" className="absolute inset-0 overflow-hidden">
              {services.map((service, i) => {
                const isCurrent = active === i;
                const isPrev = prevActive === i && !isCurrent;
                const isNext = i === active + 1;
                // Only mount nearby slides so we don't download every service image up front
                if (!isCurrent && !isPrev && !isNext) return null;
                return (
                  <div
                    key={service.name}
                    className={`image-crossfade absolute inset-0 ${
                      isCurrent
                        ? "image-crossfade-active"
                        : isPrev
                          ? "image-crossfade-exit"
                          : ""
                    }`}
                    aria-hidden={!isCurrent}
                  >
                    <Image
                      src={service.image}
                      alt={isCurrent ? service.name : ""}
                      fill
                      quality={65}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-top ken-burns"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/20" />
              <div className="absolute bottom-10 left-10 right-10">
                <p
                  key={active}
                  className="animate-fade-up text-[10px] uppercase tracking-[0.3em] text-brass-soft"
                >
                  {String(active + 1).padStart(2, "0")} · {services[active].name}
                </p>
                <p className="mt-3 font-display text-3xl leading-snug text-mist md:text-4xl">
                  Special shalwar kameez —
                  <span className="text-brass-soft"> our craft.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
