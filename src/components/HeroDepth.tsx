"use client";

import { useEffect, useRef, type ReactNode } from "react";

type HeroDepthProps = {
  children: ReactNode;
};

/** Subtle mouse-linked 3D tilt for hero copy */
export function HeroDepth({ children }: HeroDepthProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const section = wrap.closest("section");
    if (!section) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        inner.style.transform = `perspective(1400px) rotateX(${(-y * 3.5).toFixed(2)}deg) rotateY(${(x * 3.5).toFixed(2)}deg)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      inner.style.transform = "";
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-depth">
      <div ref={innerRef} className="hero-depth-inner">
        {children}
      </div>
    </div>
  );
}
