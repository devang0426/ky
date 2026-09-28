import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const cover = product.images[0];
  return (
    <Link href={`/shop/${product.slug}`} className="group flex flex-col gap-2.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-sand">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-cream px-2.5 py-[5px] text-[10px] tracking-[0.12em] text-ink uppercase">
            {product.badge}
          </span>
        )}
      </div>
      <div className="text-[15px] font-medium">{product.name}</div>
      <div className="-mt-1 text-sm text-muted">{formatPrice(product.price)}</div>
    </Link>
  );
}
