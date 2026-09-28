"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { LockIcon, WhatsAppIcon } from "@/components/site/Icons";
import { priceLines } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

/** Loads Razorpay's checkout script once, on demand. */
function loadCheckout(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Could not load Razorpay")));
      return;
    }
    const s = document.createElement("script");
    s.src = CHECKOUT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Razorpay"));
    document.body.appendChild(s);
  });
}

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  note: string;
};

const empty: Customer = { name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", note: "" };

export function CheckoutForm() {
  const router = useRouter();
  const { lines, ready, clear } = useCart();
  const priced = priceLines(lines);
  const [customer, setCustomer] = useState<Customer>(empty);
  const [busy, setBusy] = useState<"idle" | "creating" | "paying" | "verifying">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCustomer((c) => ({ ...c, [k]: e.target.value }));

  async function pay(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy("creating");
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lines: priced.lines.map((l) => ({ slug: l.slug, metal: l.metal, size: l.size, qty: l.qty })),
          customer,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start payment.");

      await loadCheckout();
      if (!window.Razorpay) throw new Error("Razorpay did not load. Check your connection and try again.");

      setBusy("paying");
      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: data.name,
        description: data.description,
        image: `${window.location.origin}/icon.svg`,
        order_id: data.orderId,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        notes: { pincode: customer.pincode },
        theme: { color: "#C4501E", backdrop_color: "rgba(28,17,12,0.7)" },
        modal: {
          ondismiss: () => {
            setBusy("idle");
            setError("Payment window closed before completing. Your bag is untouched.");
          },
        },
        handler: async (response) => {
          setBusy("verifying");
          try {
            const v = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(response),
            });
            const verdict = await v.json();
            if (!v.ok || !verdict.ok) throw new Error(verdict.error ?? "We could not verify the payment.");
            clear();
            router.push(`/checkout/success?payment=${encodeURIComponent(verdict.paymentId)}&order=${encodeURIComponent(verdict.orderId)}`);
          } catch (err) {
            setBusy("idle");
            setError(err instanceof Error ? err.message : "We could not verify the payment.");
          }
        },
      });
      rzp.on("payment.failed", (r) => {
        setBusy("idle");
        setError(`${r.error.description} (${r.error.reason || r.error.code}). You can try again.`);
      });
      rzp.open();
    } catch (err) {
      setBusy("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!ready) return <div className="min-h-[40vh]" />;

  if (priced.lines.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-[4px] border border-line p-8">
        <p className="font-serif text-[28px]">Nothing to check out yet.</p>
        <Link href="/shop" className="btn-pill h-[52px] bg-ink text-cream">
          Shop all pieces
        </Link>
      </div>
    );
  }

  const waText = `Hi Kiyanaa, I'd like to order:\n${priced.lines
    .map((l) => `• ${l.product.name} (${l.metal}${l.size ? `, size ${l.size}` : ""}) × ${l.qty}`)
    .join("\n")}\nTotal ${formatPrice(priced.subtotal)}.`;

  return (
    <form onSubmit={pay} className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div className="flex flex-col gap-[18px]">
        <h2 className="font-serif text-[26px] font-normal">Where should it go?</h2>
        <div className="grid gap-[18px] sm:grid-cols-2">
          <Field label="Full name" id="name">
            <input id="name" required autoComplete="name" className="field" value={customer.name} onChange={set("name")} />
          </Field>
          <Field label="Phone" id="phone">
            <input id="phone" required type="tel" autoComplete="tel" placeholder="+91" className="field" value={customer.phone} onChange={set("phone")} />
          </Field>
        </div>
        <Field label="Email" id="email">
          <input id="email" required type="email" autoComplete="email" className="field" value={customer.email} onChange={set("email")} />
        </Field>
        <Field label="Address" id="address">
          <input id="address" required autoComplete="street-address" className="field" value={customer.address} onChange={set("address")} />
        </Field>
        <div className="grid gap-[18px] sm:grid-cols-3">
          <Field label="City" id="city">
            <input id="city" required autoComplete="address-level2" className="field" value={customer.city} onChange={set("city")} />
          </Field>
          <Field label="State" id="state">
            <input id="state" required autoComplete="address-level1" className="field" value={customer.state} onChange={set("state")} />
          </Field>
          <Field label="PIN code" id="pincode">
            <input id="pincode" required inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" className="field" value={customer.pincode} onChange={set("pincode")} />
          </Field>
        </div>
        <Field label="Note for the atelier (optional)" id="note">
          <textarea id="note" className="field h-24 resize-none py-3" placeholder="Engraving, gifting, a date you need it by…" value={customer.note} onChange={set("note")} />
        </Field>
      </div>

      <aside className="flex flex-col gap-4 rounded-[4px] border border-line bg-field p-6 lg:sticky lg:top-24 lg:p-8">
        <h2 className="font-serif text-[26px] font-normal">Your order</h2>
        <ul className="flex flex-col gap-3">
          {priced.lines.map((l) => (
            <li key={`${l.slug}-${l.metal}-${l.size}`} className="flex items-center gap-3 text-sm">
              <span className="relative h-14 w-11 shrink-0 overflow-hidden rounded-[3px] bg-sand">
                <Image src={l.product.images[0].src} alt="" fill sizes="44px" className="object-cover" />
              </span>
              <span className="flex-1">
                <span className="block font-medium">{l.product.name}</span>
                <span className="block text-xs text-muted">
                  {l.metal}
                  {l.size ? ` · Size ${l.size}` : ""} · × {l.qty}
                </span>
              </span>
              <span>{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-line pt-4 text-lg font-medium">
          <span>Total</span>
          <span>{formatPrice(priced.subtotal)}</span>
        </div>
        {error && (
          <p role="alert" className="text-sm text-crimson">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy !== "idle"} className="btn-pill h-14 bg-ink text-cream hover:bg-body disabled:opacity-60">
          <LockIcon size={16} />
          {busy === "creating" ? "Preparing…" : busy === "paying" ? "Complete in Razorpay…" : busy === "verifying" ? "Verifying…" : `Pay ${formatPrice(priced.subtotal)}`}
        </button>
        <p className="text-xs leading-relaxed text-muted">UPI, cards, net banking and wallets via Razorpay. Taxes included, shipping insured and free.</p>
        <a href={whatsappLink(waText)} target="_blank" rel="noreferrer" className="btn-pill h-12 border-[1.5px] border-emerald text-emerald hover:bg-emerald hover:text-cream">
          <WhatsAppIcon size={16} /> Order on WhatsApp instead
        </a>
      </aside>
    </form>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs tracking-[0.1em] text-muted uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}
