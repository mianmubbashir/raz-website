"use client";

import { useEffect, useRef } from "react";

/** Hero background — plays slightly slower than real-time for a cinematic feel */
export function HeroVideo({ rate = 0.7 }: { rate?: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const apply = () => {
      video.playbackRate = rate;
    };

    apply();
    video.addEventListener("loadedmetadata", apply);
    video.addEventListener("play", apply);

    return () => {
      video.removeEventListener("loadedmetadata", apply);
      video.removeEventListener("play", apply);
    };
  }, [rate]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Raz Stitching shop showcase"
    >
      <source src="/Official%20video.mp4" type="video/mp4" />
    </video>
  );
}
