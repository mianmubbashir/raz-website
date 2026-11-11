"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MeasurementCalculator } from "@/components/MeasurementCalculator";
import {
  sizeCalculatorGarments,
  sizeCalculatorTips,
  site,
  whatsappHref,
} from "@/lib/content";
import {
  buildWhatsAppSizeMessage,
  calculateSize,
  type SizeCalculationResult,
} from "@/lib/sizeCalculator";

type FormState = {
  garmentId: string;
  chest: string;
  waist: string;
  height: string;
};

const defaultGarmentId = sizeCalculatorGarments[0]?.id ?? "shalwar_kameez";

function ResultPanel({ result }: { result: SizeCalculationResult }) {
  const whatsappMessage = encodeURIComponent(buildWhatsAppSizeMessage(result));
  const bookingHref = `${whatsappHref.split("?")[0]}?text=${whatsappMessage}`;

  return (
    <div className="space-y-8">
      <div className="border border-ink/10 bg-white/80 p-8 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
              Estimate
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-ink">
              Size {result.size}
            </h2>
            <p className="mt-2 text-sm text-ink/55">{result.garmentLabel}</p>
          </div>
          <span
            className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase ${
              result.fit === "standard"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800"
                : "border-amber-500/35 bg-amber-500/10 text-amber-900"
            }`}
          >
            {result.fit === "standard" ? "Standard fit" : "Between sizes"}
          </span>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {result.measurements.map((item) => (
            <div
              key={item.label}
              className="border border-ink/8 bg-white/60 px-4 py-3"
            >
              <dt className="text-[10px] uppercase tracking-[0.24em] text-mist-muted">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        {result.notes.length > 0 ? (
          <ul className="mt-8 space-y-2 border-t border-ink/8 pt-6">
            {result.notes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-sm leading-relaxed text-ink/60"
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass"
                  aria-hidden
                />
                {note}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href={bookingHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shear btn-glow inline-flex min-h-12 items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
        >
          <span>Send to WhatsApp</span>
        </a>
        <Link
          href="/booking-closing"
          className="btn-shear inline-flex min-h-12 items-center justify-center border border-ink/20 px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-ink transition-colors hover:border-brass/50 hover:text-brass-deep"
        >
          Check booking dates
        </Link>
      </div>
    </div>
  );
}

export function SizeCalculator() {
  const [mode, setMode] = useState<"guided" | "quick">("guided");
  const [form, setForm] = useState<FormState>({
    garmentId: defaultGarmentId,
    chest: "",
    waist: "",
    height: "",
  });
  const [error, setError] = useState("");
  const [result, setResult] = useState<SizeCalculationResult | null>(null);

  const selectedGarment = useMemo(
    () =>
      sizeCalculatorGarments.find((item) => item.id === form.garmentId) ??
      sizeCalculatorGarments[0],
    [form.garmentId],
  );

  const parseNumber = (value: string) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const chest = parseNumber(form.chest);
    if (!chest) {
      setError("Enter your chest measurement in inches.");
      setResult(null);
      return;
    }

    const calculation = calculateSize({
      garmentId: form.garmentId,
      chest,
      waist: parseNumber(form.waist),
      height: parseNumber(form.height),
    });

    if (!calculation) {
      setError("Chest should be between 28\" and 56\" for this calculator.");
      setResult(null);
      return;
    }

    setResult(calculation);
  };

  return (
    <>
      <PageHero
        label="Tools"
        title={
          <>
            Size <span className="text-gold-shine">calculator</span>
          </>
        }
        description={`Enter your measurements to get a suggested size and estimated stitch points for ${site.name} — before you visit the shop.`}
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <div className="mb-10 flex justify-center print:hidden">
            <div
              className="flex border border-ink/15 text-[11px] uppercase tracking-[0.18em]"
              role="group"
              aria-label="Calculator mode"
            >
              <button
                type="button"
                onClick={() => setMode("guided")}
                aria-pressed={mode === "guided"}
                className={`px-6 py-3 transition-colors ${
                  mode === "guided"
                    ? "bg-ink text-mist"
                    : "text-ink/55 hover:text-brass-deep"
                }`}
              >
                Guided measurement
              </button>
              <button
                type="button"
                onClick={() => setMode("quick")}
                aria-pressed={mode === "quick"}
                className={`px-6 py-3 transition-colors ${
                  mode === "quick"
                    ? "bg-ink text-mist"
                    : "text-ink/55 hover:text-brass-deep"
                }`}
              >
                Quick size estimate
              </button>
            </div>
          </div>

          {mode === "guided" ? (
            <MeasurementCalculator />
          ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <form
                onSubmit={onSubmit}
                className="border border-ink/10 bg-mist p-6 shadow-[0_20px_60px_rgba(14,18,24,0.06)] md:p-8"
              >
                <h2 className="font-display text-2xl text-ink">Your measures</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">
                  All values in inches. Chest is required; waist and height refine
                  the estimate.
                </p>

                <div className="mt-8 space-y-5">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-mist-muted">
                      Garment type
                    </span>
                    <select
                      name="garmentId"
                      value={form.garmentId}
                      onChange={(event) => {
                        setForm((current) => ({
                          ...current,
                          garmentId: event.target.value,
                        }));
                        setResult(null);
                      }}
                      className="mt-2 w-full border border-ink/12 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-brass/60"
                    >
                      {sizeCalculatorGarments.map((garment) => (
                        <option key={garment.id} value={garment.id}>
                          {garment.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {selectedGarment ? (
                    <p className="text-sm leading-relaxed text-ink/50">
                      {selectedGarment.description}
                    </p>
                  ) : null}

                  {selectedGarment?.fields.map((field) => (
                    <label key={field.id} className="block">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-mist-muted">
                        {field.label}
                        {field.required ? " *" : ""}
                      </span>
                      <input
                        type="number"
                        name={field.id}
                        value={form[field.id as keyof FormState] ?? ""}
                        onChange={(event) => {
                          setForm((current) => ({
                            ...current,
                            [field.id]: event.target.value,
                          }));
                          setResult(null);
                        }}
                        min={field.id === "chest" ? 28 : 0}
                        max={field.id === "chest" ? 56 : 90}
                        step="0.5"
                        inputMode="decimal"
                        placeholder={
                          field.id === "height" ? "e.g. 68" : 'e.g. 38'
                        }
                        className="mt-2 w-full border border-ink/12 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-brass/60"
                      />
                      <span className="mt-1.5 block text-xs leading-relaxed text-ink/45">
                        {field.hint}
                      </span>
                    </label>
                  ))}
                </div>

                {error ? (
                  <p className="mt-4 text-sm text-red-700/80">{error}</p>
                ) : null}

                <button
                  type="submit"
                  className="btn-shear btn-glow mt-8 inline-flex min-h-12 w-full items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
                >
                  <span>Calculate size</span>
                </button>
              </form>

              <div className="mt-6 border border-ink/8 bg-white/50 p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-mist-muted">
                  Measuring tips
                </p>
                <ul className="mt-4 space-y-2">
                  {sizeCalculatorTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex gap-2 text-sm leading-relaxed text-ink/60"
                    >
                      <span className="text-brass" aria-hidden>
                        ·
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="min-w-0">
              {!result ? (
                <div className="flex min-h-[20rem] flex-col justify-center border border-dashed border-ink/12 bg-white/40 px-8 py-12 text-center md:min-h-[28rem]">
                  <p className="font-display text-3xl text-ink/30">
                    Awaiting measures
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/50">
                    Choose your garment type and enter chest measurement to see
                    suggested size, length, and stitch points.
                  </p>
                </div>
              ) : (
                <ResultPanel result={result} />
              )}
            </div>
          </div>
          )}
        </div>
      </section>
    </>
  );
}
