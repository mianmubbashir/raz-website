import Image from "next/image";
import { images, whatsappHref } from "@/lib/content";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-mist">
      <Parallax speed={0.05} className="absolute inset-0">
        <div className="relative h-[110%] w-full">
          <Image
            src={images.atelier.src}
            alt={images.atelier.alt}
            fill
            sizes="100vw"
            className="object-cover object-top opacity-40 ken-burns"
          />
        </div>
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/60" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-[90rem] px-5 py-28 md:px-10 md:py-40">
        <Reveal variant="right">
          <p className="text-[11px] uppercase tracking-[0.32em] text-brass">
            Start your fit
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92]">
            Your fabric.
            <br />
            <span className="text-gold-shine">Our stitch.</span>
          </h2>
        </Reveal>

        <Reveal delay={2} className="mt-8 max-w-lg">
          <p className="text-base leading-relaxed text-mist/65 md:text-lg">
            Share your cloth, occasion, and preferred timing — we will guide
            timings and fittings.
          </p>
        </Reveal>

        <Reveal delay={3} className="mt-12">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shear btn-glow inline-flex min-h-12 w-fit items-center justify-center bg-brass px-10 py-4 text-[12px] font-medium tracking-[0.2em] uppercase text-ink"
          >
            <span>Open WhatsApp</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
