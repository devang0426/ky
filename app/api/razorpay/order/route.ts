import { NextResponse } from "next/server";
import { priceLines, type CartInput } from "@/lib/cart";
import { getRazorpay, publicKeyId, razorpayConfigured } from "@/lib/razorpay";
import { site } from "@/lib/site";

type Body = {
  lines?: CartInput[];
  customer?: Partial<Record<"name" | "email" | "phone" | "address" | "city" | "state" | "pincode" | "note", string>>;
};

const clip = (s: string | undefined, n = 250) => (s ?? "").toString().slice(0, n);

/**
 * Step 1 of Razorpay's standard checkout: create an order on the server.
 * The amount is computed from the catalog, never taken from the client.
 */
export async function POST(request: Request) {
  if (!razorpayConfigured()) {
    return NextResponse.json({ error: "Online payments are not configured yet. Please order over WhatsApp." }, { status: 503 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  const { lines, subtotal, errors } = priceLines(body.lines);
  if (errors.length || lines.length === 0) {
    return NextResponse.json({ error: errors[0] ?? "Your bag could not be priced." }, { status: 400 });
  }

  const c = body.customer ?? {};
  if (!c.name || !c.phone || !c.email || !c.address || !c.pincode) {
    return NextResponse.json({ error: "Please fill in your delivery details." }, { status: 400 });
  }

  const summary = lines.map((l) => `${l.product.name} [${l.metal}${l.size ? ` ${l.size}` : ""}] x${l.qty}`).join("; ");

  try {
    const order = await getRazorpay().orders.create({
      amount: subtotal * 100, // paise
      currency: "INR",
      receipt: `kiy_${Date.now().toString(36)}`,
      notes: {
        customer: clip(c.name),
        phone: clip(c.phone),
        email: clip(c.email),
        address: clip(`${c.address}, ${c.city ?? ""} ${c.state ?? ""} ${c.pincode}`),
        items: clip(summary),
        note: clip(c.note),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: publicKeyId(),
      name: site.legalName,
      description: lines.length === 1 ? lines[0].product.name : `${lines.length} pieces`,
    });
  } catch (err) {
    console.error("[razorpay/order]", err);
    return NextResponse.json({ error: "Razorpay could not create the order. Please try again." }, { status: 502 });
  }
}
