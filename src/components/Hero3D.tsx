"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { images } from "@/lib/content";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), { ssr: false });

function supportsWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

type Capabilities = {
  webgl: boolean;
  full: boolean;
  motion: boolean;
};

/**
 * Hero 3D centerpiece — flowing silk ribbon with drifting gold dust.
 * Static image fallback when WebGL is unavailable; single static frame
 * under prefers-reduced-motion; rendering pauses when the tab is hidden
 * or the hero is scrolled out of view.
 */
export function Hero3D() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [caps, setCaps] = useState<Capabilities | null>(null);
  const [tabHidden, setTabHidden] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    setCaps({
      webgl: supportsWebgl(),
      full: window.matchMedia("(min-width: 768px)").matches,
      motion: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 },
    );
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0" aria-hidden>
      {/* Static fallback — only when WebGL is unavailable */}
      {caps && !caps.webgl && (
        <Image
          src={images.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
      )}
      {caps?.webgl && (
        <Hero3DScene
          full={caps.full}
          motion={caps.motion}
          paused={tabHidden || offscreen}
        />
      )}
    </div>
  );
}
