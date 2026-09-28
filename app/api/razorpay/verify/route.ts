import { NextResponse } from "next/server";
import { getRazorpay, razorpayConfigured, verifyPaymentSignature } from "@/lib/razorpay";

type Body = Partial<{
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}>;

/**
 * Step 2: Checkout hands the browser an order id, payment id and signature.
 * We recompute the signature with the key secret, then double-check the payment
 * with Razorpay's API before telling the customer it went through.
 */
export async function POST(request: Request) {
  if (!razorpayConfigured()) {
    return NextResponse.json({ ok: false, error: "Payments are not configured." }, { status: 503 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
  if (!orderId || !paymentId || !signature || !/^[0-9a-f]{64}$/i.test(signature)) {
    return NextResponse.json({ ok: false, error: "Missing payment details." }, { status: 400 });
  }

  if (!verifyPaymentSignature(orderId, paymentId, signature)) {
    console.warn("[razorpay/verify] signature mismatch", { orderId, paymentId });
    return NextResponse.json({ ok: false, error: "Payment signature did not match. Please contact us before paying again." }, { status: 400 });
  }

  try {
    const payment = await getRazorpay().payments.fetch(paymentId);
    const genuine = payment.order_id === orderId && (payment.status === "captured" || payment.status === "authorized");
    if (!genuine) {
      return NextResponse.json({ ok: false, error: `Payment is ${payment.status}. Please contact us.` }, { status: 400 });
    }

    // This is where a database write / order email would go. For now the order
    // lives in the Razorpay dashboard (with customer + items in the order notes).
    console.info("[razorpay/verify] paid", { orderId, paymentId, amount: payment.amount, status: payment.status });

    return NextResponse.json({ ok: true, orderId, paymentId, amount: payment.amount, status: payment.status });
  } catch (err) {
    console.error("[razorpay/verify]", err);
    return NextResponse.json({ ok: false, error: "Could not confirm the payment with Razorpay." }, { status: 502 });
  }
}
