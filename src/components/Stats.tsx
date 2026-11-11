"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { stats } from "@/lib/content";

const iconProps = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none",
  "aria-hidden": true as const,
};

const statIcons: Record<(typeof stats)[number]["id"], ReactNode> = {
  customers: (
    <svg {...iconProps}>
      <circle cx="20" cy="12" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 34c1.2-7 6.2-11 12-11s10.8 4 12 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  suits: (
    <svg {...iconProps}>
      <path
        d="M14 8h12l2 6 6 2v4l-6 1v11H14V21l-6-1v-4l6-2 2-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M20 14v18M14 8l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  deliveries: (
    <svg {...iconProps}>
      <path
        d="M6 18h18v12H6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M24 22h7l3 4v4h-10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="28" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 18l3-6h12l3 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  years: (
    <svg {...iconProps}>
      <rect
        x="8"
        y="10"
        width="24"
        height="22"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 16h24M14 7v5M26 7v5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M15 23h4M21 23h4M15 28h4M21 28h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
};

function formatStat(value: number) {
  return value.toLocaleString("en-US");
}

function useCountUp(target: number, active: boolean, duration = 2200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function StatItem({
  stat,
  inView,
}: {
  stat: (typeof stats)[number];
  inView: boolean;
}) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animated = useCountUp(stat.value, inView && !reducedMotion);
  const display = reducedMotion ? (inView ? stat.value : 0) : animated;

  return (
    <li className="stats-item flex flex-col items-center px-4 py-12 text-center md:px-8 md:py-16">
      <span className="mb-6 text-brass">{statIcons[stat.id]}</span>
      <p className="font-display text-[clamp(2.4rem,5.5vw,3.5rem)] font-medium leading-none tracking-tight text-mist">
        {formatStat(display)}
      </p>
      <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-mist/45 md:text-[11px]">
        {stat.label}
      </p>
    </li>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-band mesh-ink border-y border-white/10"
      aria-label="Raz Stitching statistics"
    >
      <ul className="mx-auto grid max-w-[90rem] grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.id} stat={stat} inView={inView} />
        ))}
      </ul>
    </section>
  );
}
