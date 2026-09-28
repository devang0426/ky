"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/site/Icons";
import { MAX_QTY_PER_LINE, priceLines } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { lines, ready, setQty, remove } = useCart();
  const priced = priceLines(lines);

  if (!ready) return <div className="min-h-[40vh]" />;

  if (priced.lines.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-[4px] border border-line p-8 lg:p-12">
        <p className="font-serif text-[28px]">Your bag is empty.</p>
        <p className="text-[15px] text-muted">Every piece is made to order, so there is no rush, but there is a lot to see.</p>
        <Link href="/shop" className="btn-pill h-[52px] bg-ink text-cream">
          Shop all pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {priced.lines.map((l) => (
          <li key={l.key} className="flex gap-4 py-5 lg:gap-6">
            <Link href={`/shop/${l.product.slug}`} className="relative h-[120px] w-[96px] shrink-0 overflow-hidden rounded-[4px] bg-sand lg:h-[150px] lg:w-[120px]">
              <Image src={l.product.images[0].src} alt={l.product.images[0].alt} fill sizes="120px" placeholder="blur" className="object-cover" />
            </Link>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/shop/${l.product.slug}`} className="text-[15px] font-medium hover:text-wine">
                    {l.product.name}
                  </Link>
                  <div className="text-[13px] text-muted">
                    {l.metal}
                    {l.size ? ` · Size ${l.size}` : ""}
                  </div>
                </div>
                <div className="text-[15px] font-medium">{formatPrice(l.lineTotal)}</div>
              </div>
              <div className="mt-auto flex items-center gap-4">
                <div className="flex items-center border border-line">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty(l.key, l.qty - 1)} className="flex h-10 w-10 items-center justify-center hover:bg-sand">
                    <MinusIcon size={16} />
                  </button>
                  <span className="w-8 text-center text-sm">{l.qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={l.qty >= MAX_QTY_PER_LINE}
                    onClick={() => setQty(l.key, l.qty + 1)}
                    className="flex h-10 w-10 items-center justify-center hover:bg-sand disabled:opacity-40"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
                <button type="button" onClick={() => remove(l.key)} className="flex items-center gap-1.5 text-xs tracking-[0.08em] text-muted uppercase hover:text-crimson">
                  <TrashIcon size={16} /> Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="flex flex-col gap-4 rounded-[4px] border border-line bg-field p-6 lg:sticky lg:top-24 lg:p-8">
        <h2 className="font-serif text-[26px] font-normal">Summary</h2>
        <div className="flex flex-col gap-2 text-sm">
          <Row label="Subtotal" value={formatPrice(priced.subtotal)} />
          <Row label="Insured shipping" value="Free" />
          <Row label="Taxes" value="Included" />
        </div>
        <div className="flex justify-between border-t border-line pt-4 text-lg font-medium">
          <span>Total</span>
          <span>{formatPrice(priced.subtotal)}</span>
        </div>
        <Link href="/checkout" className="btn-pill h-14 bg-ink text-cream hover:bg-body">
          Checkout
        </Link>
        <p className="text-xs leading-relaxed text-muted">Made to order in Jaipur · ships in 10–12 days · one free resize.</p>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}
