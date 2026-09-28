import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { razorpayConfigured } from "@/lib/razorpay";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

/** Read the Razorpay env at request time so the "not configured" notice tracks the live deployment. */
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const configured = razorpayConfigured();
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 lg:px-20 lg:pt-14 lg:pb-24">
      <div className="mb-8 flex flex-col gap-2.5">
        <div className="eyebrow text-muted">Bag / Checkout</div>
        <h1 className="font-serif text-[40px] leading-none font-normal lg:text-[64px]">
          Almost <em>yours</em>
        </h1>
        {!configured && (
          <p className="mt-2 max-w-[640px] rounded-[4px] border border-crimson/40 bg-crimson/5 px-4 py-3 text-sm text-crimson">
            Online payments are not configured on this deployment yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to
            .env.local (see .env.example). Until then, orders can be placed over WhatsApp below.
          </p>
        )}
      </div>
      <CheckoutForm />
    </div>
  );
}
