"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { BagIcon } from "./Icons";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, ready } = useCart();
  return (
    <Link
      href="/cart"
      aria-label={count ? `Shopping bag, ${count} items` : "Shopping bag"}
      className={`relative flex h-11 w-11 items-center justify-center ${className}`}
    >
      <BagIcon />
      {ready && count > 0 && (
        <span className="absolute top-1 right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-cream">
          {count}
        </span>
      )}
    </Link>
  );
}
