import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site, termsAndConditions, whatsappHref } from "@/lib/content";

function formatDisplayDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function TermsAndConditions() {
  return (
    <>
      <PageHero
        label="Legal"
        title={
          <>
            Terms & <span className="text-gold-shine">conditions</span>
          </>
        }
        description={`The rules for booking, stitching, payment, pickup, and alterations at ${site.name} — please read before placing your order.`}
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav
                aria-label="Terms sections"
                className="border border-ink/10 bg-mist p-6 shadow-[0_20px_60px_rgba(14,18,24,0.06)] md:p-8"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-mist-muted">
                  On this page
                </p>
                <ol className="mt-5 space-y-2">
                  {termsAndConditions.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block py-1 text-sm text-ink/65 transition-colors hover:text-brass-deep"
                      >
                        {index + 1}. {section.title}
                      </a>
                    </li>
                  ))}
                </ol>

                <dl className="mt-8 space-y-4 border-t border-ink/8 pt-6">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      Effective
                    </dt>
                    <dd className="mt-1 text-sm text-ink/70">
                      {formatDisplayDate(termsAndConditions.effectiveDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      Last updated
                    </dt>
                    <dd className="mt-1 text-sm text-ink/70">
                      {formatDisplayDate(termsAndConditions.lastUpdated)}
                    </dd>
                  </div>
                </dl>
              </nav>
            </aside>

            <article className="min-w-0">
              <div className="border border-ink/10 bg-white/80 p-6 md:p-10">
                <p className="text-base leading-relaxed text-ink/70">
                  {termsAndConditions.intro}
                </p>

                <div className="mt-10 space-y-10">
                  {termsAndConditions.sections.map((section, index) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28 border-t border-ink/8 pt-10 first:border-t-0 first:pt-0"
                    >
                      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-ink">
                        <span className="mr-3 text-brass-deep">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </h2>
                      <ul className="mt-5 space-y-3">
                        {section.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-relaxed text-ink/65 md:text-[0.95rem]"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass"
                              aria-hidden
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-ink/10 bg-mist p-6">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-mist-muted">
                    Questions
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    For anything not covered here, speak to our Golden Tower shop
                    or message us directly.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shear mt-5 inline-flex min-h-11 items-center justify-center border border-ink/20 px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-ink transition-colors hover:border-brass/50 hover:text-brass-deep"
                  >
                    WhatsApp {site.phoneDisplay}
                  </a>
                </div>

                <div className="border border-ink/10 bg-white/70 p-6">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-mist-muted">
                    Related
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <Link
                        href="/booking-closing"
                        className="text-sm text-ink/70 transition-colors hover:text-brass-deep"
                      >
                        Booking closing dates
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/track-suit"
                        className="text-sm text-ink/70 transition-colors hover:text-brass-deep"
                      >
                        Track your suit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#shop"
                        className="text-sm text-ink/70 transition-colors hover:text-brass-deep"
                      >
                        Visit the shop
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
