import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/components/site/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default async function SuccessPage(props: PageProps<"/checkout/success">) {
  const params = await props.searchParams;
  const payment = typeof params.payment === "string" ? params.payment : undefined;
  const order = typeof params.order === "string" ? params.order : undefined;

  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-start gap-6 px-5 pt-14 pb-24 lg:pt-24">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-cream">
        <CheckIcon size={26} />
      </span>
      <h1 className="font-serif text-[40px] leading-none font-normal lg:text-[64px]">
        Thank you. It&apos;s <em>yours</em>.
      </h1>
      <p className="text-base leading-relaxed text-body">
        Your payment went through and the atelier has your order. We make every piece to order in {site.city}, so expect
        it in 10–12 days, fully insured. We will WhatsApp you as it moves through the bench.
      </p>
      {(payment || order) && (
        <dl className="grid w-full grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-[4px] border border-line bg-field p-5 text-sm">
          {order && (
            <>
              <dt className="text-muted">Order</dt>
              <dd className="font-mono">{order}</dd>
            </>
          )}
          {payment && (
            <>
              <dt className="text-muted">Payment</dt>
              <dd className="font-mono">{payment}</dd>
            </>
          )}
        </dl>
      )}
      <div className="flex flex-wrap gap-3">
        <Link href="/shop" className="btn-pill h-[52px] bg-ink text-cream">
          Keep browsing
        </Link>
        <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-pill h-[52px] border-[1.5px] border-ink text-ink">
          Follow @{site.instagramHandle}
        </a>
      </div>
    </div>
  );
}
