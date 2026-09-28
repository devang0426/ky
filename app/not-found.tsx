import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-start gap-5 px-5 pt-16 pb-24 lg:pt-24">
      <div className="eyebrow text-muted">404</div>
      <h1 className="font-serif text-[40px] leading-none font-normal lg:text-[64px]">
        That page isn&apos;t <em>here</em>.
      </h1>
      <p className="text-base text-body">The piece may have moved, or the link was a little off. The collection is still right where it was.</p>
      <Link href="/shop" className="btn-pill h-[52px] bg-ink text-cream">
        Shop all pieces
      </Link>
    </div>
  );
}
