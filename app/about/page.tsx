import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our story",
  description: `Kiyanaa was founded by ${site.founder} to make fine jewellery something you reach for on an ordinary day.`,
};

const pillars = [
  {
    n: "01",
    title: "Lab-grown, real diamonds",
    body: "Chemically and optically identical to mined stones. Certified by IGI or GSI. Kinder to the planet and your wallet.",
  },
  {
    n: "02",
    title: "Polki, reimagined",
    body: "Uncut-diamond heritage craft, set in lighter, cleaner, modern forms you can wear with a T-shirt.",
  },
  {
    n: "03",
    title: "Hallmarked & made for you",
    body: "Every piece BIS hallmarked. Sizes, metals and stones adjusted to you, over a DM.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16 lg:pb-24">
      {/* Statement banner */}
      <section className="bg-accent text-paper">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 pt-10 pb-20 lg:gap-[18px] lg:px-20 lg:pt-12 lg:pb-24">
          <div className="eyebrow opacity-85">Our story</div>
          <h1 className="font-serif text-[52px] leading-[0.98] font-normal tracking-[-0.015em] lg:text-[96px] lg:leading-[0.96]">
            A story worth <em>wearing.</em>
          </h1>
        </div>
      </section>

      {/* Founder block overlapping banner */}
      <section className="mx-auto -mt-14 grid max-w-[1440px] items-start gap-8 px-5 lg:grid-cols-2 lg:gap-16 lg:px-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-sand lg:h-[560px] lg:aspect-auto">
          <Image
            src={images.ringsHands}
            alt="Emerald and diamond cocktail rings worn on both hands against a black dress"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 lg:gap-[22px] lg:pt-[88px]">
          <p className="font-serif text-[26px] leading-[1.25] lg:text-[34px]">
            It began with a simple belief: jewellery should feel <em>personal</em>, not occasional.
          </p>
          <p className="text-base leading-[1.7] text-body">
            Kiyanaa was founded by {site.founder} to make fine jewellery something you reach for on an ordinary day, not
            something locked away for weddings. Lab-grown diamonds and lab-grown polki let us design with timeless
            techniques and a modern touch, at prices that make everyday wear possible.
          </p>
          <p className="text-base leading-[1.7] text-body">
            Not with trends, but with timeless designs. Every piece certified, every setting hallmarked, every order made
            for the person wearing it. Come and try things on at the experience store in {site.city}.
          </p>
          <div className="text-[13px] text-muted">— {site.founder}, Founder</div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto mt-14 grid max-w-[1440px] gap-8 border-t border-line px-5 pt-10 lg:mt-20 lg:grid-cols-3 lg:gap-0 lg:px-20">
        {pillars.map((p, i) => (
          <div
            key={p.n}
            className={`flex flex-col gap-3 ${i === 0 ? "lg:pr-10" : i === 1 ? "lg:px-10" : "lg:pl-10"} ${i < 2 ? "lg:border-r lg:border-line" : ""}`}
          >
            <div className="font-serif text-[40px] leading-none text-wine">{p.n}</div>
            <div className="text-[17px] font-semibold">{p.title}</div>
            <div className="text-[15px] leading-relaxed text-body">{p.body}</div>
          </div>
        ))}
      </section>

      {/* Photo strip + store CTA */}
      <section className="mx-auto grid max-w-[1440px] gap-4 px-5 pt-14 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-6 lg:px-20 lg:pt-[72px]">
        <div className="relative h-[240px] overflow-hidden rounded-[4px] bg-wine lg:h-[300px]">
          <Image src={images.workshop} alt="Craftsman setting a polki ring at the bench" fill sizes="(min-width: 1024px) 30vw, 50vw" placeholder="blur" className="object-cover" />
          <span className="eyebrow absolute bottom-3 left-3 bg-ink/70 px-2 py-1 text-[10px] text-cream">The workshop</span>
        </div>
        <div className="relative h-[240px] overflow-hidden rounded-[4px] bg-emerald lg:h-[300px]">
          <Image src={images.storeChoker} alt="Pearl and polki choker with the Kiyanaa experience store behind" fill sizes="(min-width: 1024px) 30vw, 50vw" placeholder="blur" className="object-cover" />
          <span className="eyebrow absolute bottom-3 left-3 bg-ink/70 px-2 py-1 text-[10px] text-cream">Experience store · {site.city}</span>
        </div>
        <div className="flex flex-col justify-center gap-3.5 rounded-[4px] bg-ink p-7 text-cream sm:col-span-2 lg:col-span-1 lg:p-9">
          <p className="font-serif text-[24px] leading-[1.2] lg:text-[28px]">Visit the Kiyanaa Store, or meet us at our next exhibition.</p>
          <Link href="/contact#store" className="link-underline border-gold text-cream">
            Find us
          </Link>
        </div>
      </section>
    </div>
  );
}
