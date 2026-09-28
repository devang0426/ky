import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";

/**
 * Razorpay webhook receiver. Configure it in the dashboard at
 * https://<domain>/api/razorpay/webhook with the events you care about
 * (payment.captured, order.paid, payment.failed) and set the same secret as
 * RAZORPAY_WEBHOOK_SECRET. This is the source of truth for fulfilment, since it
 * fires even if the customer closes the tab before the client-side verify call.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const raw = await request.text();

  if (!/^[0-9a-f]{64}$/i.test(signature) || !verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let event: { event?: string; payload?: Record<string, { entity?: Record<string, unknown> }> };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  switch (event.event) {
    case "payment.captured":
    case "order.paid": {
      const payment = event.payload?.payment?.entity;
      console.info("[razorpay/webhook]", event.event, {
        payment: payment?.id,
        order: payment?.order_id,
        amount: payment?.amount,
        email: payment?.email,
        contact: payment?.contact,
      });
      // Mark the order as paid / notify the atelier here.
      break;
    }
    case "payment.failed":
      console.warn("[razorpay/webhook] payment.failed", event.payload?.payment?.entity?.id);
      break;
    default:
      console.info("[razorpay/webhook] ignored", event.event);
  }

  return NextResponse.json({ ok: true });
}
