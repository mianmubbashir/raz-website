"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-full w-px bg-white/10 md:block"
      aria-hidden
    >
      <div
        className="absolute left-0 top-0 w-px origin-top bg-brass transition-[height] duration-150 ease-out"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}
