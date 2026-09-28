import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/shop/BuyBox";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { formatPrice } from "@/lib/format";
import { categoryLabel, getProduct, products, relatedProducts, stoneLabels } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.images[0].src.src }] },
  };
}

const faqs = [
  {
    q: "Stone & certification",
    a: "Lab-grown diamonds are chemically and optically identical to mined stones and come with an IGI or GSI certificate. Lab-grown polki is uncut diamond, set the traditional way. Every gold setting carries a BIS hallmark.",
  },
  {
    q: "Shipping & returns",
    a: "Each piece is made to order in Jaipur and ships within 10–12 days, fully insured, anywhere in India. Sizing adjustments are free once. Made-to-order pieces are exchangeable within 7 days of delivery in unworn condition.",
  },
  {
    q: "Care",
    a: "Store separately in the pouch provided. Wipe with a soft cloth after wear; avoid perfume and hand sanitiser on polki and pearls. Bring it in to the store any time for a complimentary clean.",
  },
];

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const [pre, italic, post] = product.headline;

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-16 lg:px-20 lg:pb-24">
      <div className="eyebrow flex gap-2 pt-5 text-muted lg:pt-6">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`}>{categoryLabel(product.category)}</Link>
        <span>/</span>
        <span className="text-ink">{pre}</span>
      </div>

      <section className="grid items-start gap-8 pt-5 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-6">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-[22px] lg:sticky lg:top-24">
          <div className="flex flex-col gap-2.5">
            <div className="eyebrow text-muted">
              {categoryLabel(product.category)}
              {product.badge ? ` · ${product.badge}` : ""}
            </div>
            <h1 className="font-serif text-[36px] leading-[1.02] font-normal lg:text-[48px]">
              {pre} <em>{italic}</em> {post}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-[26px] font-medium">{formatPrice(product.price)}</span>
              <span className="text-[13px] text-muted">incl. taxes · free insured shipping</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["IGI certified", "BIS hallmark", "14K gold", ...product.stones.map((s) => stoneLabels[s])].map((chip) => (
              <span key={chip} className="border border-ink px-[11px] py-[7px] text-[11px] tracking-[0.1em] uppercase">
                {chip}
              </span>
            ))}
          </div>

          <p className="text-[15px] leading-relaxed text-body">{product.description}</p>

          <BuyBox product={product} />

          <div className="mt-1 flex flex-col border-t border-line">
            <details className="group border-b border-line" open>
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium">
                <span>Details</span>
                <span className="text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-body">{product.details}</p>
            </details>
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium">
                  <span>{f.q}</span>
                  <span className="text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 pt-14 lg:gap-6 lg:pt-[72px]">
        <h2 className="font-serif text-[28px] font-normal lg:text-[36px]">
          Wear it <em>with</em>
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {relatedProducts(product).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
