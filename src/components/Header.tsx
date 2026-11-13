"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isNavDropdown, mainNav, site } from "@/lib/content";

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`h-2.5 w-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) setExpandedMobile(null);
  }, [mobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current?.contains(event.target as Node)) return;
      setOpenDropdown(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  const linkClass = scrolled
    ? "text-ink/70 hover:text-ink"
    : "text-mist/80 hover:text-mist";

  const dropdownPanelClass = scrolled
    ? "border-ink/10 bg-mist text-ink/70"
    : "border-mist/15 bg-ink/90 text-mist/80 backdrop-blur-md";

  return (
    <header
      className={`header-enter fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink/10 bg-mist/95 shadow-[0_12px_40px_rgba(14,18,24,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        ref={navRef}
        className="relative mx-auto max-w-[90rem] px-5 md:px-10"
      >
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center md:h-24">
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary"
          >
            {mainNav.map((item) =>
              isNavDropdown(item) ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`nav-link-hero flex items-center gap-1.5 text-[11px] tracking-[0.24em] uppercase ${linkClass}`}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    <Chevron open={openDropdown === item.label} />
                  </button>
                  <div
                    className={`absolute left-0 top-full z-50 min-w-[13rem] pt-3 transition-all duration-200 ${
                      openDropdown === item.label
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-1 opacity-0"
                    }`}
                  >
                    <ul
                      className={`overflow-hidden rounded-sm border py-1.5 shadow-[0_16px_48px_rgba(14,18,24,0.2)] ${dropdownPanelClass}`}
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            className={`block px-4 py-2.5 text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-white/5 ${
                              scrolled ? "hover:text-ink" : "hover:text-mist"
                            }`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link-hero text-[11px] tracking-[0.24em] uppercase ${linkClass}`}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="lg:hidden" aria-hidden />

          <Link
            href="/"
            className="group flex flex-col items-center"
            onClick={closeMobile}
            aria-label={site.name}
          >
            <span
              className={`flex items-center gap-3 rounded-full border px-4 py-2.5 transition-all duration-500 md:gap-4 md:px-5 ${
                scrolled
                  ? "border-ink/10 bg-white/70 shadow-[0_10px_28px_rgba(14,18,24,0.10)]"
                  : "border-white/12 bg-black/20 shadow-[0_14px_32px_rgba(0,0,0,0.18)] backdrop-blur-md"
              }`}
            >
              <span
                className={`font-brand text-[1.55rem] leading-none transition-all duration-500 md:text-[2.1rem] ${
                  scrolled
                    ? "text-ink group-hover:text-ink-soft"
                    : "text-brass [text-shadow:0_0_22px_rgba(201,162,74,0.24)] group-hover:text-brass-soft"
                }`}
              >
                RAZ
              </span>
              <Image
                src="/logo2-icon.webp"
                alt=""
                width={48}
                height={48}
                priority
                quality={75}
                className="h-10 w-10 object-contain drop-shadow-[0_8px_22px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-110 md:h-12 md:w-12"
              />
            </span>
          </Link>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className={`relative h-10 w-10 lg:hidden ${
                scrolled ? "text-ink" : "text-mist"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className={`absolute left-2 right-2 top-[13px] h-px bg-current transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-2 right-2 bottom-[13px] h-px bg-current transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${
          mobileOpen
            ? "max-h-[42rem] opacity-100"
            : "max-h-0 opacity-0"
        } ${scrolled ? "bg-mist" : "bg-ink/95 backdrop-blur-md"}`}
      >
        <nav
          className={`flex flex-col gap-1 border-t px-5 py-4 ${
            scrolled ? "border-ink/10" : "border-mist/10"
          }`}
          aria-label="Mobile"
        >
          {mainNav.map((item, i) =>
            isNavDropdown(item) ? (
              <div key={item.label}>
                <button
                  type="button"
                  className={`mobile-nav-item flex w-full items-center justify-between py-3 font-display text-2xl tracking-wide ${
                    scrolled ? "text-ink" : "text-mist"
                  } ${mobileOpen ? "mobile-nav-item-open" : ""}`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 0.05 + 0.08}s` : "0s",
                  }}
                  aria-expanded={expandedMobile === item.label}
                  onClick={() =>
                    setExpandedMobile((current) =>
                      current === item.label ? null : item.label,
                    )
                  }
                >
                  {item.label}
                  <Chevron open={expandedMobile === item.label} />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    expandedMobile === item.label
                      ? "max-h-64 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="space-y-1 pb-3 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className={`block py-2 text-sm tracking-[0.12em] uppercase transition-colors ${
                            scrolled
                              ? "text-ink/65 hover:text-ink"
                              : "text-mist/65 hover:text-mist"
                          }`}
                          onClick={closeMobile}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className={`mobile-nav-item py-3 font-display text-2xl tracking-wide ${
                  scrolled ? "text-ink" : "text-mist"
                } ${mobileOpen ? "mobile-nav-item-open" : ""}`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 0.05 + 0.08}s` : "0s",
                }}
                onClick={closeMobile}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
