"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { images } from "@/lib/content";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  description: string;
  glow?: "left" | "right";
};

export function PageHero({
  label,
  title,
  description,
  glow = "right",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-28 text-mist md:pt-32">
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="relative h-full min-h-full w-full">
          <Image
            src={images.pageHero.src}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-ink/10 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/25" />
      </div>

      <div className="grain pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <div
        className={`pointer-events-none absolute z-[1] top-1/4 h-72 w-72 rounded-full bg-brass/10 blur-3xl ${
          glow === "left" ? "-left-16" : "-right-20"
        }`}
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-[90rem] px-5 pb-16 md:px-10 md:pb-20">
        <p className="text-[11px] uppercase tracking-[0.36em] text-brass-soft">
          {label}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.02]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/65">
          {description}
        </p>
      </div>
    </section>
  );
}
