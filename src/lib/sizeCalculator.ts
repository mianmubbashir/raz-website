import { sizeCalculatorGarments } from "@/lib/content";

export type SizeCalculationInput = {
  garmentId: string;
  chest: number;
  waist?: number;
  height?: number;
};

export type SizeMeasurement = {
  label: string;
  value: string;
};

export type SizeCalculationResult = {
  garmentLabel: string;
  size: string;
  fit: "standard" | "between";
  alternateSize?: string;
  measurements: SizeMeasurement[];
  notes: string[];
};

const REFERENCE_HEIGHT = 68;

function inRange(value: number, [min, max]: readonly [number, number]) {
  return value >= min && value <= max;
}

function rangeMidpoint([min, max]: readonly [number, number]) {
  return (min + max) / 2;
}

function distanceToRange(value: number, [min, max]: readonly [number, number]) {
  if (value < min) return min - value;
  if (value > max) return value - max;
  return 0;
}

function formatInches(value: number) {
  const rounded = Math.round(value * 2) / 2;
  return Number.isInteger(rounded) ? `${rounded}"` : `${rounded.toFixed(1)}"`;
}

function adjustTopLength(baseLength: number, height?: number) {
  if (!height || height <= 0) return baseLength;
  const adjustment = (height - REFERENCE_HEIGHT) * 0.25;
  return Math.max(baseLength + adjustment, baseLength * 0.9);
}

function findBestSize(
  garment: (typeof sizeCalculatorGarments)[number],
  chest: number,
  waist?: number,
) {
  const chestMatch = garment.sizes.find((size) => inRange(chest, size.chest));
  const chestClosest = [...garment.sizes].sort(
    (a, b) => distanceToRange(chest, a.chest) - distanceToRange(chest, b.chest),
  )[0];

  const primary = chestMatch ?? chestClosest;
  if (!primary) return null;

  let fit: SizeCalculationResult["fit"] = chestMatch ? "standard" : "between";
  let alternateSize: string | undefined;

  if (waist && waist > 0) {
    const waistMatch = garment.sizes.find((size) => inRange(waist, size.waist));
    if (waistMatch && waistMatch.label !== primary.label) {
      fit = "between";
      alternateSize = waistMatch.label;
    }
  }

  return { primary, fit, alternateSize };
}

export function calculateSize(
  input: SizeCalculationInput,
): SizeCalculationResult | null {
  if (!Number.isFinite(input.chest) || input.chest < 28 || input.chest > 56) {
    return null;
  }

  const garment = sizeCalculatorGarments.find(
    (item) => item.id === input.garmentId,
  );
  if (!garment) return null;

  const match = findBestSize(garment, input.chest, input.waist);
  if (!match) return null;

  const { primary, fit, alternateSize } = match;
  const topLength = adjustTopLength(primary.topLength, input.height);

  const measurements: SizeMeasurement[] = [
    { label: "Suggested size", value: primary.label },
    {
      label: "Chest range",
      value: `${primary.chest[0]}"–${primary.chest[1]}"`,
    },
  ];

  if (input.waist && input.waist > 0) {
    measurements.push({
      label: "Your waist",
      value: formatInches(input.waist),
    });
  }

  const outputEntries = Object.entries(garment.outputLabels) as Array<
    [keyof typeof garment.outputLabels, string]
  >;

  for (const [key, label] of outputEntries) {
    if (key === "topLength") {
      measurements.push({ label, value: formatInches(topLength) });
      continue;
    }

    const value = primary[key as keyof typeof primary];
    if (typeof value === "number" && value > 0) {
      measurements.push({ label, value: formatInches(value) });
    }
  }

  const notes = [
    "Estimates only — our shop will confirm every point at booking.",
  ];

  if (fit === "between") {
    notes.unshift(
      alternateSize
        ? `Your chest and waist suggest different sizes (${primary.label} / ${alternateSize}). Visit us for a fitting.`
        : "Your chest falls between standard sizes — we recommend an in-person fitting.",
    );
  }

  if (input.height && input.height > 0) {
    notes.push(
      `Length adjusted for height ${formatInches(input.height)} against our 5'8" reference.`,
    );
  }

  if (input.chest < rangeMidpoint(primary.chest) - 0.75) {
    notes.push("You are on the lower end of this size — ask for a relaxed fit if preferred.");
  }

  if (input.chest > rangeMidpoint(primary.chest) + 0.75) {
    notes.push("You are on the upper end of this size — consider the next size for comfort.");
  }

  return {
    garmentLabel: garment.label,
    size: primary.label,
    fit,
    alternateSize,
    measurements,
    notes,
  };
}

export function buildWhatsAppSizeMessage(result: SizeCalculationResult) {
  const lines = [
    `Assalamualaikum — I'd like to book at Raz Stitching.`,
    `Garment: ${result.garmentLabel}`,
    `Suggested size: ${result.size}`,
    "",
    "Estimated measurements:",
    ...result.measurements
      .filter((item) => item.label !== "Suggested size")
      .map((item) => `• ${item.label}: ${item.value}`),
  ];

  return lines.join("\n");
}
