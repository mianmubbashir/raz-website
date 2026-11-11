import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import {
  aboutUs,
  craftSteps,
  images,
  services,
  shop,
  site,
  stats,
  whatsappHref,
} from "@/lib/content";

function formatStat(value: number) {
  return value.toLocaleString("en-US");
}

export function AboutPage() {
  return (
    <>
      <PageHero
        label="Our story"
        title={
          <>
            About <span className="text-gold-shine">Raz</span>
          </>
        }
        description={aboutUs.intro}
      />

      <section className="stats-band mesh-ink border-y border-white/10">
        <ul className="mx-auto grid max-w-[90rem] grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <li
              key={stat.id}
              className="flex flex-col items-center px-4 py-12 text-center md:px-8 md:py-14"
            >
              <p className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-none text-mist">
                {formatStat(stat.value)}
              </p>
              <p className="mt-3 text-[10px] tracking-[0.28em] uppercase text-mist/45">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start lg:gap-16">
            <article className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                Who we are
              </p>
              <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] text-ink">
                {site.tagline}
              </h2>
              <div className="mt-6 space-y-5">
                {aboutUs.story.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-ink/65 md:text-[1.05rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 border border-ink/10 bg-mist p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                  What we stand for
                </p>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {aboutUs.values.map((value) => (
                    <li
                      key={value.title}
                      className="border border-ink/8 bg-white/60 px-4 py-4"
                    >
                      <h3 className="font-display text-xl text-ink">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60">
                        {value.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden border border-ink/10">
                <Image
                  src={images.atelier.src}
                  alt={images.atelier.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="object-cover"
                />
              </div>
              <div className="border border-ink/10 bg-white/70 p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-mist-muted">
                  Shop · {shop.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {site.support}
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex text-[11px] tracking-[0.2em] uppercase text-brass-deep transition-colors hover:text-brass"
                >
                  Visit the shop
                </Link>
              </div>
            </aside>
          </div>

          <div className="mt-20 border border-ink/10 bg-white/80 p-6 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
              Our journey
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">Milestones</h2>
            <ol className="mt-8 space-y-8">
              {aboutUs.milestones.map((item) => (
                <li
                  key={item.year + item.title}
                  className="grid gap-4 border-t border-ink/8 pt-8 first:border-t-0 first:pt-0 md:grid-cols-[6rem_1fr]"
                >
                  <p className="font-display text-2xl text-brass-deep">
                    {item.year}
                  </p>
                  <div>
                    <h3 className="font-display text-xl text-ink">{item.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                  The process
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">
                  Measure. Cut. Stitch. Fit.
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink/50">
                Every order at {site.name} follows the same atelier steps — from
                the first tape measure to the final pressing.
              </p>
            </div>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {craftSteps.map((step) => (
                <li
                  key={step.step}
                  className="border border-ink/10 bg-mist px-5 py-6"
                >
                  <p className="font-display text-4xl text-brass/50">
                    {step.step}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 border border-ink/10 bg-mist p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
              What we stitch
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Garments under one roof
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service) => (
                <li
                  key={service.name}
                  className="border border-ink/8 bg-white/70 px-4 py-4"
                >
                  <h3 className="font-display text-xl text-ink">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-ink/10 bg-ink px-6 py-8 text-mist md:px-10 md:py-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-brass-soft">
                Ready to start?
              </p>
              <p className="mt-3 max-w-xl font-display text-2xl md:text-3xl">
                Bring your fabric. Leave in a suit cut to you.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shear btn-glow inline-flex min-h-12 items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
              >
                <span>Book on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="btn-shear inline-flex min-h-12 items-center justify-center border border-mist/25 px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-mist transition-colors hover:border-brass/50 hover:text-brass-soft"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
