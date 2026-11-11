"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { site, whatsappHref } from "@/lib/content";
import {
  normalizeOrderId,
  normalizePhone,
  stageIndex,
  trackingStages,
  type TrackingOrder,
} from "@/lib/tracking";

type LookupState =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "found"; order: TrackingOrder }
  | { type: "not_found" }
  | { type: "error"; message: string };

function Timeline({ order }: { order: TrackingOrder }) {
  const currentIndex = stageIndex(order.status);

  return (
    <ol className="relative space-y-0">
      {trackingStages.map((stage, index) => {
        const complete = index <= currentIndex;
        const active = index === currentIndex;

        return (
          <li key={stage.id} className="relative flex gap-5 pb-10 last:pb-0">
            {index < trackingStages.length - 1 ? (
              <span
                className={`absolute left-[11px] top-6 h-[calc(100%-12px)] w-px ${
                  index < currentIndex ? "bg-brass/70" : "bg-ink/10"
                }`}
                aria-hidden
              />
            ) : null}

            <span
              className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                complete
                  ? active
                    ? "border-brass bg-brass text-ink"
                    : "border-brass/60 bg-brass/15 text-brass-deep"
                  : "border-ink/15 bg-surface text-mist-muted"
              }`}
              aria-hidden
            >
              {complete && !active ? (
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                  <path
                    d="M2.5 6.2L5 8.7L9.5 3.8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span className="h-2 w-2 rounded-full bg-current" />
              )}
            </span>

            <div className="min-w-0 pt-0.5">
              <p
                className={`text-sm font-medium tracking-wide ${
                  active ? "text-ink" : complete ? "text-ink/75" : "text-mist-muted"
                }`}
              >
                {stage.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink/55">
                {stage.description}
              </p>
              {active && order.statusNote ? (
                <p className="mt-2 rounded-sm border border-brass/25 bg-brass/8 px-3 py-2 text-sm text-ink/70">
                  {order.statusNote}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function OrderSummary({ order }: { order: TrackingOrder }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {[
        ["Order ID", order.id],
        ["Garment", order.garment],
        ["Quantity", String(order.quantity)],
        ["Customer", order.customerName],
        ["Shop", order.franchise],
        ["Booked on", order.bookedOn],
        ["Est. ready", order.estimatedReady],
      ].map(([label, value]) => (
        <div key={label} className="border border-ink/8 bg-white/60 px-4 py-3">
          <dt className="text-[10px] uppercase tracking-[0.24em] text-mist-muted">
            {label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

type TrackSuitProps = {
  initialOrderId?: string;
  initialPhone?: string;
};

export function TrackSuit({
  initialOrderId = "",
  initialPhone = "",
}: TrackSuitProps) {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState(initialPhone);
  const [state, setState] = useState<LookupState>(() =>
    initialOrderId || initialPhone ? { type: "loading" } : { type: "idle" },
  );
  const [formError, setFormError] = useState("");
  const initialLookupDone = useRef(false);

  const hasLookupInput = (id: string, phoneNumber: string) =>
    Boolean(normalizeOrderId(id)) || normalizePhone(phoneNumber).length >= 10;

  const runLookup = async (id: string, phoneNumber: string) => {
    const trimmedId = id.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!hasLookupInput(trimmedId, trimmedPhone)) {
      setFormError("Enter your order ID or phone number.");
      return;
    }

    setFormError("");
    setState({ type: "loading" });

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: trimmedId, phone: trimmedPhone }),
      });

      const payload = (await response.json()) as {
        found?: boolean;
        order?: TrackingOrder;
        error?: string;
      };

      if (!response.ok) {
        if (response.status === 404) {
          setState({ type: "not_found" });
          return;
        }

        setState({
          type: "error",
          message: payload.error ?? "Unable to check order status right now.",
        });
        return;
      }

      if (payload.found && payload.order) {
        setState({ type: "found", order: payload.order });
        return;
      }

      setState({ type: "not_found" });
    } catch {
      setState({
        type: "error",
        message: "Network error — please try again.",
      });
    }
  };

  useEffect(() => {
    if ((!initialOrderId && !initialPhone) || initialLookupDone.current) return;
    initialLookupDone.current = true;
    void runLookup(initialOrderId, initialPhone);
  }, [initialOrderId, initialPhone]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runLookup(orderId, phone);
  };

  return (
    <>
      <PageHero
        label="Tools"
        title={
          <>
            Track your <span className="text-gold-shine">suit</span>
          </>
        }
        description="Enter your order ID or the phone number used at booking to see where your garment is in the atelier."
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <form
                onSubmit={onSubmit}
                className="border border-ink/10 bg-mist p-6 shadow-[0_20px_60px_rgba(14,18,24,0.06)] md:p-8"
              >
                <h2 className="font-display text-2xl text-ink">Look up order</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">
                  Search with your receipt order ID or WhatsApp number — either
                  one is enough.
                </p>

                <div className="mt-8 space-y-5">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-mist-muted">
                      Order ID
                    </span>
                    <input
                      type="text"
                      name="orderId"
                      value={orderId}
                      onChange={(event) => setOrderId(event.target.value)}
                      placeholder="RAZ-10482"
                      autoComplete="off"
                      spellCheck={false}
                      className="mt-2 w-full border border-ink/12 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-brass/60"
                    />
                  </label>

                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-ink/10" aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.28em] text-mist-muted">
                      or
                    </span>
                    <span className="h-px flex-1 bg-ink/10" aria-hidden />
                  </div>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-mist-muted">
                      Phone
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="03XX XXXXXXX"
                      autoComplete="tel"
                      className="mt-2 w-full border border-ink/12 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-brass/60"
                    />
                  </label>
                </div>

                {formError ? (
                  <p className="mt-4 text-sm text-red-700/80">{formError}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={state.type === "loading"}
                  className="btn-shear btn-glow mt-8 inline-flex min-h-12 w-full items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink disabled:cursor-wait disabled:opacity-70"
                >
                  <span>{state.type === "loading" ? "Checking…" : "Track order"}</span>
                </button>
              </form>

              <div className="mt-6 border border-ink/8 bg-white/50 p-5">
                <p className="text-sm text-ink/60">
                  Can&apos;t find your ID? Message us on WhatsApp with your name
                  and Golden Tower shop.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-[11px] tracking-[0.2em] uppercase text-brass-deep transition-colors hover:text-brass"
                >
                  WhatsApp {site.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="min-w-0">
              {state.type === "idle" ? (
                <div className="flex min-h-[20rem] flex-col justify-center border border-dashed border-ink/12 bg-white/40 px-8 py-12 text-center md:min-h-[28rem]">
                  <p className="font-display text-3xl text-ink/30">Awaiting order</p>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/50">
                    Enter your order ID or phone number to see cutting,
                    stitching, fitting, and pickup status.
                  </p>
                </div>
              ) : null}

              {state.type === "loading" ? (
                <div className="flex min-h-[20rem] items-center justify-center border border-ink/10 bg-white/60 md:min-h-[28rem]">
                  <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-ink/10 border-t-brass" />
                    <p className="mt-4 text-sm tracking-wide text-ink/55">
                      Fetching your order…
                    </p>
                  </div>
                </div>
              ) : null}

              {state.type === "error" ? (
                <div className="border border-red-200 bg-red-50/80 p-8 md:p-10">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-red-700/70">
                    Error
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-ink">
                    Something went wrong
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60">
                    {state.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => void runLookup(orderId, phone)}
                    className="btn-shear mt-8 inline-flex min-h-11 items-center justify-center border border-ink/20 px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-ink transition-colors hover:border-brass/50 hover:text-brass-deep"
                  >
                    Try again
                  </button>
                </div>
              ) : null}

              {state.type === "not_found" ? (
                <div className="border border-ink/10 bg-white/70 p-8 md:p-10">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-mist-muted">
                    No match
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-ink">
                    Order not found
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60">
                    Double-check your order ID or phone number. If you booked
                    recently, it may take a few hours to appear in the system.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shear mt-8 inline-flex min-h-11 items-center justify-center border border-ink/20 px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-ink transition-colors hover:border-brass/50 hover:text-brass-deep"
                  >
                    Contact on WhatsApp
                  </a>
                </div>
              ) : null}

              {state.type === "found" ? (
                <div className="space-y-8">
                  <div className="border border-ink/10 bg-white/80 p-8 md:p-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                          Live status
                        </p>
                        <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-ink">
                          {state.order.garment}
                        </h2>
                      </div>
                      <span className="inline-flex items-center gap-2 border border-brass/30 bg-brass/10 px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase text-brass-deep">
                        <span className="h-1.5 w-1.5 rounded-full bg-brass animate-pulse" />
                        {trackingStages[stageIndex(state.order.status)]?.label}
                      </span>
                    </div>

                    <div className="mt-8">
                      <OrderSummary order={state.order} />
                    </div>
                  </div>

                  <div className="border border-ink/10 bg-mist p-8 md:p-10">
                    <h3 className="font-display text-2xl text-ink">Progress</h3>
                    <p className="mt-2 text-sm text-ink/55">
                      From booking to handover — every stage at {site.name}.
                    </p>
                    <div className="mt-8">
                      <Timeline order={state.order} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
