"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

/** Subtle scroll-linked vertical shift for depth */
export function Parallax({ children, className = "", speed = 0.12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const viewH = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const offset = (center - viewH / 2) * speed;
        node.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`.trim()}>
      {children}
    </div>
  );
}
