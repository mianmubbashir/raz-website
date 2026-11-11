import { createAdminClient } from "./admin";
import {
  normalizeOrderId,
  normalizePhone,
  normalizePosOrderNo,
  phonesMatch,
  toTrackingOrder,
  type TrackingOrder,
} from "@/lib/tracking";

type OrderItem = {
  type?: string;
  description?: string;
  quantity?: number | string;
};

export type PosOrderRow = {
  id: string;
  order_no: string | null;
  customer: string;
  phone: string | null;
  shop: string | null;
  booking_date: string | null;
  delivery_date: string | null;
  factory_delivery_date: string | null;
  status: string | null;
  description: string | null;
  order_items: OrderItem[] | null;
  created_at: string | null;
};

function parseItemQuantity(value: unknown) {
  if (typeof value === "number" && value > 0) return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed) && parsed > 0) return parsed;
  }
  return 1;
}

const ORDERS_TABLE = "orders";

const ORDER_SELECT =
  "id, order_no, customer, phone, shop, booking_date, delivery_date, factory_delivery_date, status, description, order_items, created_at";

function garmentFromOrderItems(
  orderItems: OrderItem[] | null,
  description: string | null,
) {
  if (Array.isArray(orderItems) && orderItems.length > 0) {
    const labels = orderItems
      .flatMap((item) => {
        const type = item.type?.trim();
        const detail = item.description?.trim();
        const quantity = parseItemQuantity(item.quantity);
        const quantityLabel = quantity > 1 ? ` ×${quantity}` : "";

        if (type && detail && detail !== type) {
          return [`${type}${quantityLabel} (${detail})`];
        }
        if (type) return [`${type}${quantityLabel}`];
        if (detail) return [`${detail}${quantityLabel}`];
        return [];
      })
      .filter(Boolean);

    if (labels.length > 0) {
      return labels.join(", ");
    }
  }

  if (description?.trim()) {
    return description.trim();
  }

  return "Stitched garment";
}

function totalQuantityFromOrderItems(orderItems: OrderItem[] | null) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return 1;
  }

  return orderItems.reduce(
    (sum, item) => sum + parseItemQuantity(item.quantity),
    0,
  );
}

function toTrackingOrderFromPos(row: PosOrderRow): TrackingOrder {
  const orderNo = row.order_no?.trim();

  return toTrackingOrder({
    order_id: orderNo || row.id.slice(0, 8).toUpperCase(),
    customer_name: row.customer,
    garment: garmentFromOrderItems(row.order_items, row.description),
    quantity: totalQuantityFromOrderItems(row.order_items),
    franchise: row.shop,
    booked_on: row.booking_date,
    estimated_ready: row.delivery_date ?? row.factory_delivery_date,
    status: row.status ?? "Order Confirm",
    status_note: row.description?.trim() || null,
  });
}

export async function lookupOrderInSupabase(
  orderId?: string,
  phone?: string,
): Promise<TrackingOrder | null> {
  const normalizedOrderId = orderId ? normalizePosOrderNo(orderId) : "";
  const normalizedPhone = phone ? normalizePhone(phone) : "";

  if (!normalizedOrderId && normalizedPhone.length < 10) {
    return null;
  }

  const supabase = createAdminClient();

  if (normalizedOrderId) {
    // order_no is not unique in POS data — take the latest match
    const { data, error } = await supabase
      .from(ORDERS_TABLE)
      .select(ORDER_SELECT)
      .eq("order_no", normalizedOrderId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    const row = data?.[0] as PosOrderRow | undefined;
    if (row) {
      return toTrackingOrderFromPos(row);
    }
  }

  if (normalizedPhone.length >= 10) {
    const phoneTail = normalizedPhone.slice(-10);

    const { data, error } = await supabase
      .from(ORDERS_TABLE)
      .select(ORDER_SELECT)
      .ilike("phone", `%${phoneTail}`)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const match = data?.find(
      (row) => row.phone && phonesMatch(row.phone, normalizedPhone),
    );
    if (match) {
      return toTrackingOrderFromPos(match);
    }
  }

  return null;
}
