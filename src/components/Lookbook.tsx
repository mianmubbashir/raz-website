"use client";

import Image from "next/image";
import { lookbook } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Lookbook() {
  return (
    <section
      id="lookbook"
      className="relative overflow-hidden bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-mist-muted">
              The lookbook
            </p>
            <h2 className="mt-5 max-w-lg font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] text-ink">
              One form.
              <br />
              <span className="text-brass-deep">Every stitch.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink/50">
            Same mannequin, every style we sew — from shalwar kameez to sherwani
            and pant coat.
          </p>
        </Reveal>
      </div>

      <div className="lookbook-scroll mt-14 pl-5 md:mt-16 md:pl-10">
        <ul className="flex gap-5 pb-4 md:gap-7">
          {lookbook.map((item, i) => (
            <Reveal
              key={item.src}
              as="li"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              variant="scale"
              className="lookbook-card group relative shrink-0"
            >
              <div className="relative aspect-[3/4] w-[72vw] overflow-hidden bg-ink sm:w-[42vw] md:w-[28vw] lg:w-[22vw]">
                {item.type === "video" ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={"poster" in item ? item.poster : undefined}
                    aria-label={item.alt}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    quality={65}
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 42vw, 22vw"
                    loading={i < 2 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <span className="inline-block border border-brass/40 px-3 py-1 text-[9px] tracking-[0.28em] uppercase text-brass-soft backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <p className="mt-4 max-w-[14rem] font-display text-xl leading-snug text-mist md:text-2xl">
                    {item.title}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute inset-0 border border-ink/0 transition-colors duration-500 group-hover:border-brass/30"
                  aria-hidden
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
