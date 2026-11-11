"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import {
  bookingClosing,
  site,
  whatsappHref,
  type BookingClosingStatus,
} from "@/lib/content";

function formatDisplayDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function daysUntil(value: string) {
  const target = new Date(`${value}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
  return diff;
}

function bookingStatusMeta(status: BookingClosingStatus) {
  switch (status) {
    case "open":
      return {
        label: "Bookings open",
        className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800",
        dotClassName: "bg-emerald-500",
      };
    case "closing_soon":
      return {
        label: "Closing soon",
        className: "border-amber-500/35 bg-amber-500/10 text-amber-900",
        dotClassName: "bg-amber-500",
      };
    case "closed":
      return {
        label: "Bookings closed",
        className: "border-red-500/25 bg-red-500/10 text-red-800",
        dotClassName: "bg-red-500",
      };
  }
}

function StatusBadge({ status }: { status: BookingClosingStatus }) {
  const meta = bookingStatusMeta(status);

  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase ${meta.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName} ${
          status === "open" ? "animate-pulse" : ""
        }`}
      />
      {meta.label}
    </span>
  );
}

function DeadlineRow({
  garment,
  lastBooking,
  deliveryBy,
  leadTime,
}: {
  garment: string;
  lastBooking: string;
  deliveryBy: string;
  leadTime: string;
}) {
  const daysLeft = daysUntil(lastBooking);
  const isPast = daysLeft !== null && daysLeft < 0;
  const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7;

  return (
    <tr className="border-b border-ink/8 last:border-b-0">
      <td className="px-4 py-4 text-sm font-medium text-ink md:px-6">{garment}</td>
      <td className="px-4 py-4 text-sm text-ink/70 md:px-6">
        <span className={isPast ? "text-red-700/80 line-through" : ""}>
          {formatDisplayDate(lastBooking)}
        </span>
        {isPast ? (
          <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-red-700/70">
            Closed
          </span>
        ) : isUrgent ? (
          <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-amber-800/80">
            {daysLeft === 0 ? "Last day" : `${daysLeft} days left`}
          </span>
        ) : daysLeft !== null ? (
          <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-ink/40">
            {daysLeft} days left
          </span>
        ) : null}
      </td>
      <td className="hidden px-6 py-4 text-sm text-ink/70 sm:table-cell">
        {formatDisplayDate(deliveryBy)}
      </td>
      <td className="px-4 py-4 text-sm text-ink/55 md:px-6">{leadTime}</td>
    </tr>
  );
}

export function BookingClosing() {
  const [todayKey, setTodayKey] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTodayKey(
        `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
      );
    };

    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const nextDeadline = useMemo(() => {
    const upcoming = bookingClosing.garmentDeadlines
      .map((item) => ({
        garment: item.garment,
        daysLeft: daysUntil(item.lastBooking),
      }))
      .filter((item) => item.daysLeft !== null && item.daysLeft >= 0)
      .sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0));

    return upcoming[0] ?? null;
  }, [todayKey]);

  const eventDaysLeft = daysUntil(bookingClosing.eventDate);

  return (
    <>
      <PageHero
        label="Tools"
        title={
          <>
            Booking <span className="text-gold-shine">closing</span>
          </>
        }
        description={`Last dates to book each garment type for ${bookingClosing.season} delivery — at our Golden Tower shop.`}
        glow="left"
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12">
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-ink/10 bg-mist p-6 shadow-[0_20px_60px_rgba(14,18,24,0.06)] md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-mist-muted">
                      Season
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-ink">
                      {bookingClosing.season}
                    </h2>
                  </div>
                  <StatusBadge status={bookingClosing.status} />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink/60">
                  {bookingClosing.statusNote}
                </p>

                <dl className="mt-8 space-y-4 border-t border-ink/8 pt-6">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      Target delivery before
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      {formatDisplayDate(bookingClosing.eventDate)}
                    </dd>
                    {eventDaysLeft !== null && eventDaysLeft >= 0 ? (
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/45">
                        {eventDaysLeft} days to Eid
                      </p>
                    ) : null}
                  </div>

                  {nextDeadline ? (
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                        Next closing
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-ink">
                        {nextDeadline.garment}
                      </dd>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-amber-800/80">
                        {nextDeadline.daysLeft === 0
                          ? "Closes today"
                          : `${nextDeadline.daysLeft} days remaining`}
                      </p>
                    </div>
                  ) : null}

                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                      Last updated
                    </dt>
                    <dd className="mt-1 text-sm text-ink/70">
                      {formatDisplayDate(bookingClosing.lastUpdated)}
                    </dd>
                  </div>
                </dl>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shear btn-glow mt-8 inline-flex min-h-12 w-full items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
                >
                  <span>Book on WhatsApp</span>
                </a>
              </div>

              <div className="border border-ink/8 bg-white/50 p-5">
                <p className="text-sm text-ink/60">
                  Already booked? Track your order status anytime.
                </p>
                <Link
                  href="/track-suit"
                  className="mt-4 inline-flex text-[11px] tracking-[0.2em] uppercase text-brass-deep transition-colors hover:text-brass"
                >
                  Track your suit
                </Link>
              </div>
            </aside>

            <div className="min-w-0 space-y-10">
              <div className="border border-ink/10 bg-white/80 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                      Garment deadlines
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-ink">
                      Last booking dates
                    </h2>
                  </div>
                  <p className="max-w-xs text-sm text-ink/50">
                    Book on or before the date listed for each garment to receive
                    delivery in time for {bookingClosing.season}.
                  </p>
                </div>

                <div className="mt-8 overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-ink/10 bg-surface/80">
                        <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-mist-muted md:px-6">
                          Garment
                        </th>
                        <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-mist-muted md:px-6">
                          Last booking
                        </th>
                        <th className="hidden px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-mist-muted sm:table-cell">
                          Delivery by
                        </th>
                        <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-mist-muted md:px-6">
                          Lead time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingClosing.garmentDeadlines.map((item) => (
                        <DeadlineRow key={item.garment} {...item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border border-ink/10 bg-mist p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                  Our shop
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">
                  Shop closing date
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/55">
                  Golden Tower follows the garment deadlines above. Visit with
                  fabric before the closing date.
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-1">
                  <li className="border border-ink/8 bg-white/70 px-5 py-4">
                    <h3 className="font-display text-xl text-ink">
                      {bookingClosing.shopClosing.shop}
                    </h3>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-mist-muted">
                      Last booking
                    </p>
                    <p className="mt-1 text-sm font-medium text-ink">
                      {formatDisplayDate(bookingClosing.shopClosing.lastBooking)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/55">
                      {bookingClosing.shopClosing.note}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="border border-ink/10 bg-white/70 p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-mist-muted">
                  Please note
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">
                  Before you visit
                </h2>
                <ul className="mt-6 space-y-3">
                  {bookingClosing.notes.map((note) => (
                    <li
                      key={note}
                      className="flex gap-3 text-sm leading-relaxed text-ink/65"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass"
                        aria-hidden
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
