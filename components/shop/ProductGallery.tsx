"use client";

import Image from "next/image";
import { useState } from "react";
import type { SiteImage } from "@/lib/images";

export function ProductGallery({ images, name }: { images: SiteImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div className="grid gap-3 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-4">
      <div className="relative order-first aspect-[4/5] overflow-hidden rounded-[4px] bg-sand lg:order-last lg:aspect-auto lg:h-[650px]">
        <Image
          key={current.src.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2.5 lg:flex-col" role="tablist" aria-label={`${name} views`}>
          {images.map((img, i) => (
            <button
              key={img.src.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`View ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative h-[72px] w-[60px] shrink-0 overflow-hidden rounded-[4px] lg:h-[100px] lg:w-full ${
                i === index ? "border-2 border-ink" : "border border-line opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="100px" placeholder="blur" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
