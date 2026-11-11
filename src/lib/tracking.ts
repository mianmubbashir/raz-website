export type SuitStatus =
  | "confirmed"
  | "fabric_received"
  | "cutting"
  | "stitching"
  | "fitting"
  | "ready"
  | "delivered";

export type TrackingStage = {
  id: SuitStatus;
  label: string;
  description: string;
};

export type TrackingOrder = {
  id: string;
  customerName: string;
  garment: string;
  quantity: number;
  franchise: string;
  bookedOn: string;
  estimatedReady: string;
  status: SuitStatus;
  statusNote?: string;
};

export const trackingStages: readonly TrackingStage[] = [
  {
    id: "confirmed",
    label: "Order confirmed",
    description: "Your booking is registered at the shop.",
  },
  {
    id: "fabric_received",
    label: "Fabric received",
    description: "Cloth checked in and queued for cutting.",
  },
  {
    id: "cutting",
    label: "Cutting",
    description: "Pattern marked and cloth laid to your measure.",
  },
  {
    id: "stitching",
    label: "Stitching",
    description: "Seams and finishes in progress at the bench.",
  },
  {
    id: "fitting",
    label: "Fitting",
    description: "Trial or final adjustments before handover.",
  },
  {
    id: "ready",
    label: "Ready for pickup",
    description: "Your suit is finished and waiting at the branch.",
  },
  {
    id: "delivered",
    label: "Delivered",
    description: "Handed over — thank you for stitching with Raz.",
  },
] as const;

export function normalizeOrderId(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function phonesMatch(storedPhone: string, inputPhone: string) {
  const stored = normalizePhone(storedPhone);
  const input = normalizePhone(inputPhone);

  if (!stored || !input) return false;
  if (stored === input) return true;

  const storedTail = stored.slice(-10);
  const inputTail = input.slice(-10);

  return storedTail.length >= 10 && storedTail === inputTail;
}

function formatDate(value: string | null) {
  if (!value) return "—";

  const trimmed = value.trim();
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(trimmed);
  const date = dateOnly
    ? new Date(`${trimmed}T12:00:00`)
    : new Date(trimmed);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(date);
}

const posStatusMap: Record<string, SuitStatus> = {
  order_confirm: "confirmed",
  confirmed: "confirmed",
  in_progress: "stitching",
  ready: "ready",
  delivered: "delivered",
  fabric_received: "fabric_received",
  cutting: "cutting",
  stitching: "stitching",
  fitting: "fitting",
};

function parseStatus(value: string): SuitStatus {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "_");
  return posStatusMap[normalized] ?? "confirmed";
}

export function normalizePosOrderNo(value: string) {
  return normalizeOrderId(value).replace(/^RAZ-?/, "");
}

export function toTrackingOrder(row: {
  order_id: string;
  customer_name: string;
  garment: string;
  quantity: number;
  franchise: string | null;
  booked_on: string | null;
  estimated_ready: string | null;
  status: string;
  status_note: string | null;
}): TrackingOrder {
  return {
    id: row.order_id,
    customerName: row.customer_name,
    garment: row.garment,
    quantity: row.quantity,
    franchise: row.franchise ?? "—",
    bookedOn: formatDate(row.booked_on),
    estimatedReady: formatDate(row.estimated_ready),
    status: parseStatus(row.status),
    statusNote: row.status_note?.trim() || undefined,
  };
}

export function stageIndex(status: SuitStatus) {
  return trackingStages.findIndex((stage) => stage.id === status);
}
