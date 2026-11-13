"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { craftSteps, images } from "@/lib/content";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";

export function Craft() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const node = pathRef.current;
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
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="craft" className="relative overflow-hidden bg-ink text-mist">
      <Parallax speed={0.06} className="absolute inset-0 opacity-25">
        <div className="relative h-[120%] w-full">
          <Image
            src={images.craft.src}
            alt=""
            fill
            quality={60}
            sizes="100vw"
            loading="lazy"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/80" />
        </div>
      </Parallax>

      <div className="relative mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-brass">
            The process
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98]">
            Measure. Cut.
            <br />
            <span className="text-gold-shine">Stitch. Fit.</span>
          </h2>
        </Reveal>

        <svg
          className="pointer-events-none absolute left-[8%] top-44 hidden h-[50%] w-[84%] text-brass/35 lg:block"
          viewBox="0 0 1000 200"
          fill="none"
          aria-hidden
        >
          <path
            ref={pathRef}
            className="thread-path"
            d="M20 120 C 180 20, 320 180, 480 90 S 780 30, 980 110"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="6 8"
          />
        </svg>

        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {craftSteps.map((step, i) => (
            <Reveal
              key={step.step}
              as="li"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="craft-step group relative border-t border-white/10 pt-6"
            >
              <p className="font-display text-5xl text-brass/35 transition-all duration-500 group-hover:text-brass/60 md:text-6xl">
                {step.step}
              </p>
              <h3 className="mt-4 font-display text-2xl transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist/55">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
