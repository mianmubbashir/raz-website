"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { site } from "@/lib/content";

const IN_TO_CM = 2.54;

type Unit = "in" | "cm";

const MEASURE_IDS = [
  "chest",
  "shoulders",
  "arm",
  "kameezLength",
  "neck",
  "waist",
  "hips",
  "shalwarLength",
] as const;

type MeasureId = (typeof MEASURE_IDS)[number];
type StepId = MeasureId | "mohri";

type MeasureStep = {
  id: MeasureId;
  section: "Kameez" | "Shalwar";
  label: string;
  instruction: string;
  tip: string;
  /** plausible range in inches — outside it we show a soft warning */
  range: [number, number];
};

const MEASURE_STEPS: MeasureStep[] = [
  {
    id: "chest",
    section: "Kameez",
    label: "Chest (Seena)",
    instruction:
      "Wrap the tape around the fullest part of your chest, under the arms. Keep the tape loose — leave a one finger gap.",
    tip: "Keep 1 finger gap between the tape and your body for comfort.",
    range: [28, 60],
  },
  {
    id: "shoulders",
    section: "Kameez",
    label: "Shoulders (Kandha)",
    instruction:
      "Measure straight across the back, from one shoulder tip (the bony point) to the other.",
    tip: "Ask someone to help — shoulder width is hard to measure alone.",
    range: [14, 24],
  },
  {
    id: "arm",
    section: "Kameez",
    label: "Arm Length (Baazu)",
    instruction:
      "Measure from the shoulder tip down to the wrist bone, keeping the arm slightly bent.",
    tip: "Keep your arm relaxed and slightly bent — not fully straight.",
    range: [18, 30],
  },
  {
    id: "kameezLength",
    section: "Kameez",
    label: "Kameez Length (Lambai)",
    instruction:
      "Measure from the top of the shoulder straight down to where you want the kameez to end.",
    tip: "Most men prefer the kameez to end around the knee. Stand straight while measuring.",
    range: [30, 50],
  },
  {
    id: "neck",
    section: "Kameez",
    label: "Neck (Gala)",
    instruction:
      "Measure around the base of your neck, where the collar sits, then add 1 inch for comfort.",
    tip: "You should be able to slip one finger between the tape and your neck.",
    range: [12, 20],
  },
  {
    id: "waist",
    section: "Shalwar",
    label: "Waist (Kamar)",
    instruction:
      "Measure around your natural waistline — where you normally tie your shalwar or wear trousers.",
    tip: "Don't pull the tape tight. Measure where the shalwar will actually sit.",
    range: [24, 55],
  },
  {
    id: "hips",
    section: "Shalwar",
    label: "Hips (Kaandaan)",
    instruction: "Measure around the fullest part of your hips and seat.",
    tip: "Stand with your feet together for an accurate hip measurement.",
    range: [30, 60],
  },
  {
    id: "shalwarLength",
    section: "Shalwar",
    label: "Shalwar Length (Pajaama Lambai)",
    instruction:
      "Measure along the side of your leg, from the waist down to the ankle bone.",
    tip: "Keep the tape straight along the outside of the leg — don't follow the body curve.",
    range: [30, 48],
  },
];

const MOHRI_OPTIONS = [
  {
    id: "narrow",
    label: "Narrow",
    detail: '5–6 inch',
    note: "Slim, tapered ankle — modern look.",
  },
  {
    id: "medium",
    label: "Medium",
    detail: '7–8 inch',
    note: "The classic choice — comfortable and balanced.",
  },
  {
    id: "wide",
    label: "Wide",
    detail: '9–10 inch',
    note: "Traditional open bottom with a relaxed fall.",
  },
] as const;

type MohriId = (typeof MOHRI_OPTIONS)[number]["id"];

const TOTAL_STEPS = MEASURE_STEPS.length + 1; // + mohri choice

type Values = Record<MeasureId, number | null>;

const EMPTY_VALUES: Values = {
  chest: null,
  shoulders: null,
  arm: null,
  kameezLength: null,
  neck: null,
  waist: null,
  hips: null,
  shalwarLength: null,
};

function roundTo(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function formatNumber(value: number) {
  const rounded = roundTo(value, 1);
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

/** inches → display string in the selected unit */
function toDisplay(inches: number | null, unit: Unit) {
  if (inches == null) return "";
  return formatNumber(unit === "in" ? inches : inches * IN_TO_CM);
}

/** typed text in the selected unit → inches */
function parseToInches(text: string, unit: Unit): number | null {
  const parsed = Number.parseFloat(text.trim().replace(",", "."));
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return unit === "in" ? parsed : parsed / IN_TO_CM;
}

function formatBoth(inches: number) {
  return `${formatNumber(inches)}" / ${formatNumber(inches * IN_TO_CM)} cm`;
}

function standardSizeMatch(chestInches: number) {
  if (chestInches >= 36 && chestInches < 39) return "Small";
  if (chestInches >= 39 && chestInches < 42) return "Medium";
  if (chestInches >= 42 && chestInches < 45) return "Large";
  if (chestInches >= 45 && chestInches < 48) return "XL";
  return "Custom";
}

/* ------------------------------------------------------------------ */
/* Body diagram — simple line figure with a gold highlight per step   */
/* ------------------------------------------------------------------ */

function BodyDiagram({ highlight }: { highlight: StepId }) {
  const body = "var(--ink)";
  const gold = "var(--brass)";

  return (
    <svg
      viewBox="0 0 200 320"
      className="mx-auto h-64 w-auto md:h-80"
      aria-hidden
      fill="none"
    >
      <g stroke={body} strokeOpacity={0.35} strokeWidth={1.5}>
        {/* head + neck */}
        <circle cx={100} cy={30} r={15} />
        <path d="M93 44 L93 54 M107 44 L107 54" />
        {/* shoulders + kameez body (A-line to below knee) */}
        <path d="M93 54 Q100 58 107 54 L142 62 L152 150 L138 152 L136 120 L138 190 L62 190 L64 120 L62 152 L48 150 L58 62 Z" />
        {/* sleeve seams */}
        <path d="M64 66 L64 118 M136 66 L136 118" strokeOpacity={0.18} />
        {/* hands */}
        <path d="M48 150 Q50 160 56 158 M152 150 Q150 160 144 158" />
        {/* shalwar legs */}
        <path d="M66 190 L82 288 L98 288 L100 210 L102 288 L118 288 L134 190" />
        {/* feet */}
        <path d="M80 292 L100 292 M102 292 L122 292" strokeOpacity={0.25} />
      </g>

      <g
        stroke={gold}
        strokeWidth={2.25}
        strokeDasharray="6 4"
        strokeLinecap="round"
      >
        {highlight === "chest" && <ellipse cx={100} cy={92} rx={42} ry={10} />}
        {highlight === "shoulders" && (
          <path d="M58 62 L142 62 M58 56 L58 68 M142 56 L142 68" />
        )}
        {highlight === "arm" && (
          <path d="M142 62 L149 108 L152 150 M146 150 L158 150" />
        )}
        {highlight === "kameezLength" && (
          <path d="M124 62 L128 190 M118 62 L130 62 M122 190 L134 190" />
        )}
        {highlight === "neck" && <ellipse cx={100} cy={50} rx={13} ry={6} />}
        {highlight === "waist" && <ellipse cx={100} cy={132} rx={37} ry={9} />}
        {highlight === "hips" && <ellipse cx={100} cy={166} rx={40} ry={10} />}
        {highlight === "shalwarLength" && (
          <path d="M114 132 L118 288 M108 132 L120 132 M112 288 L124 288" />
        )}
        {highlight === "mohri" && <ellipse cx={110} cy={288} rx={13} ry={5} />}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Main wizard                                                         */
/* ------------------------------------------------------------------ */

export function MeasurementCalculator() {
  const [unit, setUnit] = useState<Unit>("in");
  const [stepIndex, setStepIndex] = useState(0); // 0..7 measures, 8 mohri, 9 summary
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [mohri, setMohri] = useState<MohriId | null>(null);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");

  const isSummary = stepIndex >= TOTAL_STEPS;
  const isMohriStep = stepIndex === TOTAL_STEPS - 1;
  const step = !isSummary && !isMohriStep ? MEASURE_STEPS[stepIndex] : null;

  // Sync the visible input with the stored value when the step or unit changes
  useEffect(() => {
    if (step) {
      setInputText(toDisplay(values[step.id], unit));
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, unit]);

  const parsedInches = step ? parseToInches(inputText, unit) : null;

  const warning =
    step && parsedInches != null &&
    (parsedInches < step.range[0] || parsedInches > step.range[1])
      ? "This measurement looks unusual — please double-check it before continuing."
      : "";

  const switchUnit = (next: Unit) => {
    if (next === unit) return;
    // commit whatever is typed so the value survives the unit switch
    if (step && parsedInches != null) {
      setValues((current) => ({ ...current, [step.id]: parsedInches }));
    }
    setUnit(next);
  };

  const goNext = (event?: FormEvent) => {
    event?.preventDefault();
    if (isMohriStep) {
      if (!mohri) {
        setError("Please choose a bottom opening to continue.");
        return;
      }
      setStepIndex(TOTAL_STEPS);
      return;
    }
    if (!step) return;
    if (parsedInches == null) {
      setError("Please enter this measurement to continue.");
      return;
    }
    setValues((current) => ({ ...current, [step.id]: parsedInches }));
    setError("");
    setStepIndex((current) => current + 1);
  };

  const goBack = () => {
    setError("");
    if (step && parsedInches != null) {
      setValues((current) => ({ ...current, [step.id]: parsedInches }));
    }
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const restart = () => {
    setValues(EMPTY_VALUES);
    setMohri(null);
    setInputText("");
    setError("");
    setStepIndex(0);
  };

  const mohriOption = MOHRI_OPTIONS.find((option) => option.id === mohri);

  const whatsappHref = useMemo(() => {
    if (!isSummary || values.chest == null || !mohriOption) return "#";
    const lines = [
      "Assalamualaikum — I'd like to book a shalwar kameez at Raz Stitching.",
      "",
      "My measurements:",
      ...MEASURE_STEPS.map(
        (item) => `• ${item.label}: ${formatBoth(values[item.id] ?? 0)}`,
      ),
      `• Bottom Opening (Mohri): ${mohriOption.label} (${mohriOption.detail})`,
      "",
      `Standard size match: ${standardSizeMatch(values.chest)}`,
    ];
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [isSummary, values, mohriOption]);

  const handlePrint = () => {
    document.body.classList.add("print-summary-only");
    const cleanup = () =>
      document.body.classList.remove("print-summary-only");
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
    // Safari fallback in case afterprint doesn't fire
    setTimeout(cleanup, 2000);
  };

  /* ------------------------------- summary ------------------------------- */

  if (isSummary && values.chest != null && mohriOption) {
    const sizeMatch = standardSizeMatch(values.chest);
    return (
      <div className="mx-auto max-w-3xl">
        <div
          id="measurement-summary"
          className="border border-ink/10 bg-white/85 p-8 md:p-10"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-brass-deep">
                Measurement Summary
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] text-ink">
                Your shalwar kameez measures
              </h2>
              <p className="mt-2 text-sm text-ink/55">
                {site.name} · shown in inches and centimeters
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase ${
                sizeMatch === "Custom"
                  ? "border-amber-500/35 bg-amber-500/10 text-amber-900"
                  : "border-brass/40 bg-brass/10 text-brass-deep"
              }`}
            >
              {sizeMatch === "Custom"
                ? "Custom size"
                : `Standard match: ${sizeMatch}`}
            </span>
          </div>

          <table className="mt-8 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/12 text-[10px] uppercase tracking-[0.24em] text-mist-muted">
                <th className="py-3 pr-4 font-medium">Measurement</th>
                <th className="py-3 pr-4 font-medium">Value</th>
                <th className="py-3 font-medium print:hidden" aria-label="Edit" />
              </tr>
            </thead>
            <tbody>
              {MEASURE_STEPS.map((item, index) => (
                <tr key={item.id} className="border-b border-ink/8">
                  <td className="py-3 pr-4 text-sm text-ink">{item.label}</td>
                  <td className="py-3 pr-4 text-sm font-medium text-ink">
                    {formatBoth(values[item.id] ?? 0)}
                  </td>
                  <td className="py-3 text-right print:hidden">
                    <button
                      type="button"
                      onClick={() => setStepIndex(index)}
                      className="link-underline text-[11px] uppercase tracking-[0.18em] text-brass-deep"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-3 pr-4 text-sm text-ink">
                  Bottom Opening (Mohri)
                </td>
                <td className="py-3 pr-4 text-sm font-medium text-ink">
                  {mohriOption.label} ({mohriOption.detail})
                </td>
                <td className="py-3 text-right print:hidden">
                  <button
                    type="button"
                    onClick={() => setStepIndex(TOTAL_STEPS - 1)}
                    className="link-underline text-[11px] uppercase tracking-[0.18em] text-brass-deep"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-6 text-xs leading-relaxed text-ink/45">
            These are estimates for booking. Final measurements are always
            confirmed at your {site.name} shop.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 print:hidden">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shear btn-glow inline-flex min-h-12 items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
          >
            <span>Share on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={handlePrint}
            className="btn-shear inline-flex min-h-12 items-center justify-center border border-ink/20 px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase text-ink transition-colors hover:border-brass/50 hover:text-brass-deep"
          >
            Print / Download
          </button>
          <button
            type="button"
            onClick={restart}
            className="inline-flex min-h-12 items-center justify-center px-4 py-3.5 text-[11px] tracking-[0.22em] uppercase text-ink/50 transition-colors hover:text-brass-deep"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------- wizard ------------------------------- */

  const stepNumber = stepIndex + 1;
  const sectionTag = isMohriStep ? "Shalwar" : step?.section;

  return (
    <div className="mx-auto max-w-3xl">
      {/* progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.24em] text-mist-muted">
          Step {stepNumber} of {TOTAL_STEPS}
          <span className="ml-3 text-brass-deep">{sectionTag}</span>
        </p>
        <div
          className="flex border border-ink/15 text-[11px] uppercase tracking-[0.18em]"
          role="group"
          aria-label="Measurement unit"
        >
          {(["in", "cm"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => switchUnit(option)}
              aria-pressed={unit === option}
              className={`px-4 py-2 transition-colors ${
                unit === option
                  ? "bg-ink text-mist"
                  : "text-ink/55 hover:text-brass-deep"
              }`}
            >
              {option === "in" ? "Inches" : "CM"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 h-px w-full bg-ink/10">
        <div
          className="h-px bg-brass transition-all duration-500"
          style={{ width: `${(stepNumber / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div className="mt-8 grid gap-8 border border-ink/10 bg-mist p-6 shadow-[0_20px_60px_rgba(14,18,24,0.06)] md:grid-cols-[minmax(0,16rem)_1fr] md:p-10">
        <div className="border border-ink/8 bg-white/70 p-4">
          <BodyDiagram highlight={isMohriStep ? "mohri" : step!.id} />
          <p className="mt-2 text-center text-[10px] uppercase tracking-[0.24em] text-mist-muted">
            Where to measure
          </p>
        </div>

        <form onSubmit={goNext} className="flex flex-col justify-center">
          {isMohriStep ? (
            <>
              <h2 className="font-display text-3xl text-ink">
                Bottom Opening (Mohri)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Choose how wide you want the shalwar to open at the ankle.
              </p>
              <div className="mt-6 space-y-3">
                {MOHRI_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setMohri(option.id);
                      setError("");
                    }}
                    aria-pressed={mohri === option.id}
                    className={`block w-full border px-5 py-4 text-left transition-colors ${
                      mohri === option.id
                        ? "border-brass bg-brass/10"
                        : "border-ink/12 bg-white/70 hover:border-brass/50"
                    }`}
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-medium text-ink">
                        {option.label}
                      </span>
                      <span className="text-xs text-brass-deep">
                        {option.detail}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-ink/50">
                      {option.note}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-3xl text-ink">{step!.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {step!.instruction}
              </p>

              <label className="mt-6 block">
                <span className="text-[11px] uppercase tracking-[0.22em] text-mist-muted">
                  Your measurement ({unit === "in" ? "inches" : "cm"}) *
                </span>
                <div className="mt-2 flex items-center border border-ink/12 bg-white transition-colors focus-within:border-brass/60">
                  <input
                    type="text"
                    inputMode="decimal"
                    autoFocus
                    value={inputText}
                    onChange={(event) => {
                      setInputText(event.target.value);
                      setError("");
                    }}
                    placeholder={unit === "in" ? "e.g. 40 or 16.5" : "e.g. 101.5"}
                    className="w-full bg-transparent px-4 py-3.5 text-sm text-ink outline-none placeholder:text-ink/30"
                  />
                  <span className="pr-4 text-xs uppercase tracking-[0.18em] text-mist-muted">
                    {unit}
                  </span>
                </div>
              </label>

              <div className="mt-4 border-l-2 border-brass/60 bg-brass/5 px-4 py-3">
                <p className="text-xs leading-relaxed text-ink/60">
                  <span className="font-medium text-brass-deep">Tip: </span>
                  {step!.tip}
                </p>
              </div>
            </>
          )}

          {warning ? (
            <p className="mt-4 border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-900">
              {warning}
            </p>
          ) : null}
          {error ? (
            <p className="mt-4 text-sm text-red-700/80" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="inline-flex min-h-12 items-center justify-center border border-ink/20 px-7 py-3.5 text-[11px] tracking-[0.22em] uppercase text-ink transition-colors hover:border-brass/50 hover:text-brass-deep disabled:cursor-not-allowed disabled:opacity-35"
            >
              Previous
            </button>
            <button
              type="submit"
              className="btn-shear btn-glow inline-flex min-h-12 items-center justify-center bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
            >
              <span>{isMohriStep ? "See summary" : "Next"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
