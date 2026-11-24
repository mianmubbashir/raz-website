"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  scrollStoryBeats,
  scrollStoryMeta,
  scrollStorySequence,
} from "@/lib/scrollStory";

gsap.registerPlugin(ScrollTrigger);

function sequenceSrc(index: number) {
  const n = String(index + 1).padStart(scrollStorySequence.pad, "0");
  return `${scrollStorySequence.dir}/${scrollStorySequence.prefix}${n}.${scrollStorySequence.extension}`;
}

/**
 * Fanta-style scroll scrub: pin the viewport and advance story beats (or AI frames)
 * as the user scrolls. Drop frame-0001.webp… into /public/images/scroll-story and
 * set scrollStorySequence.enabled = true for true image-sequence mode.
 */
export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [beatIndex, setBeatIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedRef.current) {
      setBeatIndex(scrollStoryBeats.length - 1);
      setProgress(1);
      return;
    }

    const beatCount = scrollStoryBeats.length;
    const useSequence =
      scrollStorySequence.enabled && scrollStorySequence.frameCount > 1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * (useSequence ? 4.5 : 3.2))}`,
        pin: pin,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          if (useSequence) {
            const frame = Math.min(
              scrollStorySequence.frameCount - 1,
              Math.floor(p * scrollStorySequence.frameCount),
            );
            // Map sequence progress onto beat captions
            const bi = Math.min(
              beatCount - 1,
              Math.floor(p * beatCount),
            );
            setBeatIndex(bi);
            const img = pin.querySelector<HTMLImageElement>(
              "[data-scroll-frame]",
            );
            if (img) img.src = sequenceSrc(frame);
          } else {
            const bi = Math.min(
              beatCount - 1,
              Math.floor(p * beatCount * 0.999),
            );
            setBeatIndex(bi);
          }

          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${p})`;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const beat = scrollStoryBeats[beatIndex] ?? scrollStoryBeats[0];
  const useSequence =
    scrollStorySequence.enabled && scrollStorySequence.frameCount > 1;

  return (
    <section
      id="craft-film"
      ref={sectionRef}
      className="scroll-story relative bg-ink text-mist"
      aria-label="Scroll-driven stitching story"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      >
        {/* Visual stage */}
        <div className="absolute inset-0">
          {useSequence ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              data-scroll-frame
              src={sequenceSrc(0)}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          ) : (
            scrollStoryBeats.map((b, i) => {
              const active = i === beatIndex;
              return (
                <div
                  key={b.id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={!active}
                >
                  <Image
                    src={b.image}
                    alt=""
                    fill
                    quality={65}
                    sizes="100vw"
                    priority={i === 0}
                    className={`object-cover object-center transition-transform duration-700 ${
                      active ? "scale-100" : "scale-105"
                    }`}
                  />
                </div>
              );
            })
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/20" />
          <div className="grain absolute inset-0 opacity-40" />
        </div>

        {/* Copy */}
        <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32">
          <div>
            <p className="text-[11px] uppercase tracking-[0.36em] text-brass-soft">
              {scrollStoryMeta.label}
            </p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.02]">
              {scrollStoryMeta.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist/60 md:text-base">
              {scrollStoryMeta.subtitle}
            </p>
          </div>

          <div className="mt-auto max-w-lg">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl text-brass/80 md:text-5xl">
                {beat.step}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-mist/40">
                  Scroll to continue
                </p>
                <h3
                  key={beat.id}
                  className="mt-2 font-display text-3xl leading-tight md:text-4xl"
                >
                  {beat.title}
                </h3>
              </div>
            </div>
            <p
              key={`${beat.id}-body`}
              className="mt-4 max-w-md text-sm leading-relaxed text-mist/65 md:text-base"
            >
              {beat.body}
            </p>

            {/* Beat dots */}
            <ol className="mt-8 flex flex-wrap gap-2" aria-hidden>
              {scrollStoryBeats.map((b, i) => (
                <li
                  key={b.id}
                  className={`h-1 w-8 transition-colors duration-300 md:w-10 ${
                    i <= beatIndex ? "bg-brass" : "bg-mist/20"
                  }`}
                />
              ))}
            </ol>
          </div>
        </div>

        {/* Scrub progress */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-mist/10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-brass to-brass-soft"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  );
}
