"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { images } from "@/lib/content";
import Hero3DScene from "./Hero3DScene";

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
 * Hero 3D centerpiece — silk ribbon + gold dust.
 * WebGL mounts immediately (no photo flash). Static image only when WebGL is unavailable.
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
    <div ref={rootRef} className="absolute inset-0 bg-ink" aria-hidden>
      {/* Soft brass wash while WebGL boots — same ink family as the scene fog */}
      {caps?.webgl && (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,162,74,0.22),transparent_58%),radial-gradient(ellipse_at_30%_70%,rgba(236,230,217,0.08),transparent_45%)]"
          aria-hidden
        />
      )}

      {/* Photo fallback only when WebGL is missing */}
      {caps && !caps.webgl && (
        <Image
          src={images.hero.src}
          alt=""
          fill
          priority
          quality={70}
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
