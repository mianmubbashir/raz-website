import Image from "next/image";
import { images } from "@/lib/content";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";

/** Full-bleed signature strip — shalwar kameez as the visual anchor */
export function Signature() {
  return (
    <section className="relative overflow-hidden bg-ink text-mist">
      <div className="relative min-h-[75vh] md:min-h-[85vh]">
        <Parallax speed={0.08} className="absolute inset-0 scale-110">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              sizes="100vw"
              className="ken-burns object-cover object-center"
              priority={false}
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/30" />
        <div className="grain absolute inset-0" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[90rem] px-5 pb-16 md:px-10 md:pb-24">
            <Reveal variant="left">
              <p className="text-[11px] uppercase tracking-[0.36em] text-brass-soft">
                Signature craft
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02]">
                A Signature in Every Stitch.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-mist/65 md:text-base">
                Precision cutting, clean finishes, and a fit that feels made for
                you — our name in Karachi.
              </p>
              <div className="stitch-line mt-8 h-px w-24 bg-gradient-to-r from-brass to-transparent is-visible" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
