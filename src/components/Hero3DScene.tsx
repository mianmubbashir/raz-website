"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

const INK = "#0e1218";
const SILK = "#ece6d9";
const BRASS = "#c9a24a";
const BRASS_SOFT = "#e0c06a";
const KEY_LIGHT = "#fff6e8";

type SceneProps = {
  /** false on small screens — lighter geometry + fewer particles */
  full: boolean;
  /** false when prefers-reduced-motion — a single static frame is rendered */
  motion: boolean;
  /** true when the tab is hidden or the hero is offscreen */
  paused: boolean;
};

/** Layered analytic waves — slow, drape-like, never spinny */
function drapeHeight(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.45 + t * 0.42) * 0.6 +
    Math.sin(x * 1.1 + y * 0.9 - t * 0.28) * 0.28 +
    Math.cos(x * 2.4 - t * 0.5) * Math.sin(y * 2.1 + t * 0.35) * 0.12 +
    Math.cos(y * 1.4 + t * 0.22) * 0.3
  );
}

function SilkRibbon({ full, motion }: { full: boolean; motion: boolean }) {
  const geometry = useMemo(
    () =>
      new THREE.PlaneGeometry(16, 5.6, full ? 150 : 80, full ? 48 : 26),
    [full],
  );
  const base = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry],
  );

  const deform = (t: number) => {
    const position = geometry.attributes.position as THREE.BufferAttribute;
    const arr = position.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 2] = drapeHeight(base[i], base[i + 1], t);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  };

  // Shape the ribbon immediately so the reduced-motion static frame still drapes
  useLayoutEffect(() => {
    deform(1.5);
    return () => geometry.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  useFrame(({ clock }) => {
    if (motion) deform(clock.elapsedTime);
  });

  return (
    <mesh
      geometry={geometry}
      rotation={[-0.5, 0.14, -0.18]}
      position={[0.6, 0.2, 0]}
    >
      <meshPhysicalMaterial
        color={SILK}
        roughness={0.52}
        metalness={0.12}
        sheen={1}
        sheenColor={BRASS}
        sheenRoughness={0.42}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 244, 214, 1)");
  gradient.addColorStop(0.4, "rgba(224, 192, 106, 0.55)");
  gradient.addColorStop(1, "rgba(224, 192, 106, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function GoldDust({ full, motion }: { full: boolean; motion: boolean }) {
  const count = full ? 320 : 120;
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(makeGlowTexture, []);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    // per particle: baseX, rise speed, wobble phase
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 17;
      positions[i * 3] = x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.5;
      seeds[i * 3] = x;
      seeds[i * 3 + 1] = 0.08 + Math.random() * 0.18;
      seeds[i * 3 + 2] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  useFrame(({ clock }, delta) => {
    if (!motion || !points.current) return;
    const t = clock.elapsedTime;
    const attribute = points.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = attribute.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += seeds[i * 3 + 1] * delta;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = -4.6;
      arr[i * 3] = seeds[i * 3] + Math.sin(t * 0.25 + seeds[i * 3 + 2]) * 0.5;
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={BRASS_SOFT}
        size={0.11}
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Eases the whole scene toward pointer / scroll targets — cinematic, damped */
function Rig({
  motion,
  children,
}: {
  motion: boolean;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useLayoutEffect(() => {
    if (!motion) return;
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [motion]);

  useFrame(({ clock }, delta) => {
    if (!group.current || !motion) return;
    const t = clock.elapsedTime;
    const idle = Math.sin(t * 0.1) * 0.03;
    const targetRotX = pointer.current.y * 0.05 + scroll.current * 0.16;
    const targetRotY = pointer.current.x * 0.09 + idle;
    const targetPosY = scroll.current * 1.3;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetRotX,
      1.6,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetRotY,
      1.6,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetPosY,
      1.6,
      delta,
    );
  });

  return <group ref={group}>{children}</group>;
}

export default function Hero3DScene({ full, motion, paused }: SceneProps) {
  const animating = motion && !paused;

  return (
    <Canvas
      // "demand" still renders a frame on mount/resize, so the static
      // reduced-motion / paused view stays correct
      frameloop={animating ? "always" : "demand"}
      dpr={full ? [1, 2] : [1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <fog attach="fog" args={[INK, 9, 17]} />
      <ambientLight intensity={0.35} />
      {/* soft warm key */}
      <directionalLight position={[-4, 5, 6]} intensity={1.15} color={KEY_LIGHT} />
      {/* gold rim from behind-right */}
      <directionalLight position={[6, 2, -5]} intensity={2.4} color={BRASS} />
      <Rig motion={animating}>
        <SilkRibbon full={full} motion={animating} />
        <GoldDust full={full} motion={animating} />
      </Rig>
    </Canvas>
  );
}
