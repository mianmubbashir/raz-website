import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ourTeam, site, whatsappHref } from "@/lib/content";

const mapHref = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberCard({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <article className="border border-ink/10 bg-white/80 p-6 md:p-8">
      <div className="flex items-start gap-5">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 font-display text-xl text-brass-deep"
          aria-hidden
        >
          {initials(name)}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-2xl text-ink">{name}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-brass-deep">
            {role}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">{bio}</p>
        </div>
      </div>
    </article>
  );
}

export function TeamPage() {
  return (
    <>
      <PageHero
        label="The people"
        title={
          <>
            Our <span className="text-gold-shine">team</span>
          </>
        }
        description={ourTeam.intro}
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <div className="mb-16 border border-ink/10 bg-ink p-6 text-mist md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-start">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-brass-soft">
                  Central factory
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.75rem)]">
                  {ourTeam.factory.name}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist/65 md:text-base">
                  {ourTeam.factory.summary}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-mist/55">
                  {ourTeam.factory.address}
                </p>
                <a
                  href={mapHref(ourTeam.factory.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-[11px] tracking-[0.18em] uppercase text-brass-soft transition-colors hover:text-brass"
                >
                  Open in Maps
                </a>
              </div>
              <dl className="grid grid-cols-2 gap-4">
                {ourTeam.departments.map((dept) => (
                  <div
                    key={dept.title}
                    className="border border-white/10 bg-white/5 px-4 py-4 text-center"
                  >
                    <dd className="font-display text-3xl text-brass-soft">
                      {dept.count}
                    </dd>
                    <dt className="mt-2 text-[10px] uppercase tracking-[0.16em] text-mist/50">
                      {dept.title}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
              Leadership
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              {site.owner.name}
            </h2>
            <div className="mt-8 max-w-2xl">
              {ourTeam.leadership.map((member) => (
                <MemberCard key={member.name} {...member} />
              ))}
            </div>
          </div>

          <div className="border border-ink/10 bg-mist p-6 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
              Factory floor
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Who makes your suit
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/55">
              Every order is stitched at our Korangi factory — masters,
              stitchman, supervisors, and pressmen working under one roof.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ourTeam.departments.map((dept) => (
                <li
                  key={dept.title}
                  className="border border-ink/8 bg-white/70 px-5 py-5"
                >
                  <p className="font-display text-3xl text-brass/80">
                    {dept.count}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-ink">
                    {dept.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">
                    {dept.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                  Our shop
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">
                  Golden Tower, one factory
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink/50">
                Book and measure at Golden Tower — stitching happens at the
                Korangi factory, then returns to the shop.
              </p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-1">
              <li className="border border-ink/10 bg-white/80 px-5 py-5 md:px-6 md:py-6">
                <h3 className="font-display text-xl text-ink">
                  {ourTeam.shopTeam.branch}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-brass-deep">
                  {ourTeam.shopTeam.lead}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {ourTeam.shopTeam.focus}
                </p>
              </li>
            </ul>
          </div>

          <div className="mt-16 border border-ink/10 bg-white/70 p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-mist-muted">
              How we work
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">House culture</h2>
            <ul className="mt-6 space-y-3">
              {ourTeam.culture.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-ink/65 md:text-[0.95rem]"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-ink/10 bg-ink px-6 py-8 text-mist md:px-10 md:py-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-brass-soft">
                Visit us
              </p>
              <p className="mt-3 max-w-xl font-display text-2xl md:text-3xl">
                Book at Golden Tower. Stitched at the factory.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-shear btn-glow inline-flex min-h-12 items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
              >
                <span>Visit the shop</span>
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shear inline-flex min-h-12 items-center justify-center border border-mist/25 px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-mist transition-colors hover:border-brass/50 hover:text-brass-soft"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
