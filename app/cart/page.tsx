import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = { title: "Your bag" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 lg:px-20 lg:pt-14 lg:pb-24">
      <div className="mb-8 flex flex-col gap-2.5">
        <div className="eyebrow text-muted">Home / Bag</div>
        <h1 className="font-serif text-[40px] leading-none font-normal lg:text-[64px]">
          Your <em>bag</em>
        </h1>
      </div>
      <CartView />
    </div>
  );
}
