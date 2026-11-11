import type { ReactNode } from "react";
import Image from "next/image";
import {
  footerInformation,
  footerSocial,
  footerTools,
  images,
  site,
  whatsappHref,
} from "@/lib/content";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mist/90">
        {title}
      </p>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-[13px] tracking-wide text-mist/55 transition-colors duration-300 hover:text-brass-soft"
      >
        {children}
      </a>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-mist/15 text-mist/70 transition-all duration-300 hover:border-brass/40 hover:text-brass-soft"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="footer-premium relative overflow-hidden bg-[#0a0c10] text-mist">
      {/* Tailor atelier background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.craft.src}
          alt=""
          fill
          sizes="100vw"
          className="scale-105 object-cover object-center blur-[6px] brightness-[0.35] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[#0a0c10]/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/90 via-[#0a0c10]/75 to-[#0a0c10]/95" />
      </div>

      {/* Subtle emblem watermark — centered in the footer */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <div className="relative h-[26rem] w-[26rem] opacity-[0.05] md:h-[34rem] md:w-[34rem]">
          <Image
            src="/logo2.svg"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-[90rem] px-5 pb-10 pt-16 md:px-10 md:pb-12 md:pt-20">
        {/* Brand header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="font-brand text-2xl tracking-[0.14em] text-brass md:text-3xl">
              RAZ
            </span>
            <div className="relative h-14 w-14 md:h-16 md:w-16">
              <Image
                src="/logo2.svg"
                alt=""
                fill
                unoptimized
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <SocialIcon href={site.social.instagram} label="Instagram">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon href={site.social.facebook} label="Facebook">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M14 8.5V7.2c0-.7.5-1.2 1.3-1.2H17V3h-2.2C12.8 3 12 4.8 12 6.5V8.5H9v3h3V21h3v-9.5h2.6l.4-3H15z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={site.social.linkedin} label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M6.5 8.5h3v10h-3v-10zm1.5-4.5a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6zM10 8.5h2.9v1.4h.04c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V18.5h-3v-4.8c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.9h-3V8.5z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={`mailto:${site.email}`} label="Email">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
                <path d="M4 7l8 6 8-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SocialIcon>
            <SocialIcon href={whatsappHref} label="WhatsApp">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <FooterColumn title="Information">
            {footerInformation.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Tools">
            {footerTools.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                external={link.href.startsWith("http")}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Social">
            {footerSocial.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                external={link.href.startsWith("http")}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mist/90">
              About the Store
            </p>
            <p className="mt-5 text-[13px] leading-relaxed text-mist/50">
              {site.support}
            </p>
            <div className="mt-6 space-y-4 text-[13px] text-mist/55">
              <div className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 stroke-brass-soft"
                  fill="none"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-brass-soft">
                    Shop · {site.shopName}
                  </span>
                  <span className="mt-1 block">{site.shopAddress}</span>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 stroke-brass-soft"
                  fill="none"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-brass-soft">
                    Factory
                  </span>
                  <span className="mt-1 block">{site.factoryAddress}</span>
                </span>
              </div>
              <p className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 stroke-brass-soft"
                  fill="none"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="flex flex-col gap-1">
                  {site.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="transition-colors hover:text-brass-soft"
                    >
                      {phone.display}
                    </a>
                  ))}
                </span>
              </p>
              <p className="text-mist/40">{site.hours}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/8">
        <div className="mx-auto max-w-[90rem] px-5 py-6 text-center md:px-10">
          <p className="text-xs tracking-wide text-mist/35">
            © {new Date().getFullYear()} {site.name}™. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
