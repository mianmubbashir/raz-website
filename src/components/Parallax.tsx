"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

/** Subtle scroll-linked vertical shift — only while the block is near the viewport */
export function Parallax({
  children,
  className = "",
  speed = 0.12,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    let active = false;

    const onScroll = () => {
      if (!active) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const viewH = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const offset = (center - viewH / 2) * speed;
        node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
        else {
          cancelAnimationFrame(raf);
          node.style.transform = "";
        }
      },
      { rootMargin: "20% 0px" },
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`.trim()}>
      {children}
    </div>
  );
}
