"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { BagIcon, WhatsAppIcon } from "@/components/site/Icons";
import { formatPrice } from "@/lib/format";
import type { Metal, Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

const swatch: Record<Metal, string> = {
  "Yellow gold": "#D4A64E",
  "Rose gold": "#D89A86",
  "White gold": "#E8E4DC",
};

export function BuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useCart();
  const [metal, setMetal] = useState<Metal>(product.metals[0]);
  const [size, setSize] = useState<number | undefined>(product.sizes?.[2]);
  const [added, setAdded] = useState(false);

  const needsSize = Boolean(product.sizes) && size === undefined;

  function addToBag() {
    if (needsSize) return;
    add({ slug: product.slug, metal, size });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  function buyNow() {
    if (needsSize) return;
    add({ slug: product.slug, metal, size });
    router.push("/checkout");
  }

  const waMessage = `Hi Kiyanaa, I'd like to order the ${product.name} in ${metal}${size ? `, size ${size}` : ""} (${formatPrice(product.price)}).`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5 border-t border-line pt-5">
        <div className="flex justify-between text-[13px]">
          <span className="font-semibold tracking-[0.1em] uppercase">Metal</span>
          <span className="text-muted">{metal}</span>
        </div>
        <div className="flex gap-2.5">
          {product.metals.map((m) => (
            <button
              key={m}
              type="button"
              aria-label={m}
              aria-pressed={m === metal}
              onClick={() => setMetal(m)}
              style={{ background: swatch[m] }}
              className={`h-11 w-11 rounded-full ${m === metal ? "border-2 border-ink outline outline-[3px] -outline-offset-[5px] outline-cream" : "border border-line"}`}
            />
          ))}
        </div>
      </div>

      {product.sizes && (
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between text-[13px]">
            <span className="font-semibold tracking-[0.1em] uppercase">Ring size</span>
            <Link href="/contact" className="text-wine underline">
              Size guide
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={s === size}
                onClick={() => setSize(s)}
                className={`h-11 w-[52px] text-sm ${s === size ? "border-2 border-ink bg-ink font-semibold text-cream" : "border border-line hover:border-ink"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5 pt-1.5 sm:flex-row">
        <button type="button" onClick={buyNow} disabled={needsSize} className="btn-pill h-14 flex-[1.3] bg-ink text-cream hover:bg-body disabled:opacity-50">
          Buy now · {formatPrice(product.price)}
        </button>
        <button
          type="button"
          onClick={addToBag}
          disabled={needsSize}
          className="btn-pill h-14 flex-1 border-[1.5px] border-ink text-ink hover:bg-sand disabled:opacity-50"
        >
          <BagIcon size={18} /> {added ? "Added to bag" : "Add to bag"}
        </button>
      </div>
      <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="btn-pill h-14 bg-emerald text-cream hover:bg-[#185A3D]">
        <WhatsAppIcon size={18} /> Order on WhatsApp
      </a>
      <div className="flex flex-wrap gap-x-[18px] gap-y-1 text-xs text-muted">
        <span>Made to order · ships in 10–12 days</span>
        <span>Free resizing once</span>
        <span>Secure payment via Razorpay</span>
      </div>
    </div>
  );
}
