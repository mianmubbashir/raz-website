import { NextResponse } from "next/server";
import { lookupOrderInSupabase } from "@/lib/supabase/orders";
import { normalizeOrderId, normalizePhone } from "@/lib/tracking";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      orderId?: string;
      phone?: string;
    };

    const orderId = body.orderId?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const hasOrderId = Boolean(normalizeOrderId(orderId));
    const hasPhone = normalizePhone(phone).length >= 10;

    if (!hasOrderId && !hasPhone) {
      return NextResponse.json(
        { error: "Enter an order ID or phone number to search." },
        { status: 400 },
      );
    }

    const order = await lookupOrderInSupabase(
      hasOrderId ? orderId : undefined,
      hasPhone ? phone : undefined,
    );

    if (!order) {
      return NextResponse.json({ found: false }, { status: 404 });
    }

    return NextResponse.json({ found: true, order });
  } catch (error) {
    console.error("Track lookup failed:", error);
    return NextResponse.json(
      { error: "Unable to check order status right now." },
      { status: 500 },
    );
  }
}
