import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import {
  footerSocial,
  shop,
  site,
  whatsappHref,
} from "@/lib/content";

const mapHref = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const contactTopics = [
  "New stitching bookings and fabric drop-off",
  "Order status, delivery dates, and pickup",
  "Design suits, sherwanis, and wedding orders",
  "Alterations, remakes, and measurement help",
  "Shop timings and directions to Golden Tower",
] as const;

export function ContactPage() {
  return (
    <>
      <PageHero
        label="Get in touch"
        title={
          <>
            Contact <span className="text-gold-shine">us</span>
          </>
        }
        description={`Book a fitting, ask about your order, or visit our Golden Tower shop — ${site.name}, Karachi.`}
        glow="left"
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-ink/10 bg-mist p-6 shadow-[0_20px_60px_rgba(14,18,24,0.06)] md:p-8">
                <p className="text-[11px] uppercase tracking-[0.24em] text-mist-muted">
                  Direct line
                </p>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      Official numbers
                    </dt>
                    <dd className="mt-2 space-y-2">
                      {site.phones.map((phone) => (
                        <a
                          key={phone.tel}
                          href={`tel:${phone.tel}`}
                          className="block text-sm font-medium text-ink transition-colors hover:text-brass-deep"
                        >
                          {phone.display}
                          <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.14em] text-ink/40">
                            {phone.label}
                          </span>
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      WhatsApp
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-ink transition-colors hover:text-brass-deep"
                      >
                        {site.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      Hours
                    </dt>
                    <dd className="mt-1 text-sm text-ink/70">{site.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      Factory
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink/70">
                      {site.factoryName}
                      <br />
                      {site.address}
                    </dd>
                    <a
                      href={mapHref(site.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex text-[11px] tracking-[0.18em] uppercase text-brass-deep transition-colors hover:text-brass"
                    >
                      Open in Maps
                    </a>
                  </div>
                </dl>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shear btn-glow mt-8 inline-flex min-h-12 w-full items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
                >
                  <span>Message on WhatsApp</span>
                </a>
              </div>

              <div className="border border-ink/8 bg-white/50 p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-mist-muted">
                  Follow
                </p>
                <ul className="mt-4 space-y-2">
                  {footerSocial.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink/70 transition-colors hover:text-brass-deep"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="min-w-0 space-y-10">
              <div className="border border-ink/10 bg-white/80 p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                  How we can help
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">
                  Reach out for
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {contactTopics.map((topic) => (
                    <li
                      key={topic}
                      className="flex gap-3 border border-ink/8 bg-white/60 px-4 py-3 text-sm leading-relaxed text-ink/65"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass"
                        aria-hidden
                      />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-ink/10 bg-mist p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                      Our shop
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-ink">
                      Visit Golden Tower
                    </h2>
                  </div>
                  <p className="max-w-sm text-sm text-ink/50">
                    Walk in during shop hours with your fabric or order ID.
                  </p>
                </div>

                <ul className="mt-8 grid gap-4 sm:grid-cols-1">
                  <li className="border border-ink/8 bg-white/70 px-5 py-5">
                    <p className="text-[10px] tracking-[0.24em] text-brass-deep">
                      01
                    </p>
                    <h3 className="mt-2 font-display text-xl text-ink">
                      {shop.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">
                      {shop.address}
                    </p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-ink/55">
                      {shop.hours}
                    </p>
                    <a
                      href={mapHref(`${shop.name}, ${shop.address}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-[11px] tracking-[0.18em] uppercase text-brass-deep transition-colors hover:text-brass"
                    >
                      Open in Maps
                    </a>
                  </li>
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/track-suit"
                  className="border border-ink/10 bg-white/70 p-5 transition-colors hover:border-brass/30"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-mist-muted">
                    Tools
                  </p>
                  <p className="mt-2 font-display text-xl text-ink">Track suit</p>
                  <p className="mt-2 text-sm text-ink/55">
                    Check order status by ID or phone.
                  </p>
                </Link>
                <Link
                  href="/size-calculator"
                  className="border border-ink/10 bg-white/70 p-5 transition-colors hover:border-brass/30"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-mist-muted">
                    Tools
                  </p>
                  <p className="mt-2 font-display text-xl text-ink">
                    Size calculator
                  </p>
                  <p className="mt-2 text-sm text-ink/55">
                    Estimate your size before visiting.
                  </p>
                </Link>
                <Link
                  href="/booking-closing"
                  className="border border-ink/10 bg-white/70 p-5 transition-colors hover:border-brass/30"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-mist-muted">
                    Tools
                  </p>
                  <p className="mt-2 font-display text-xl text-ink">
                    Booking closing
                  </p>
                  <p className="mt-2 text-sm text-ink/55">
                    Last dates for festive delivery.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
