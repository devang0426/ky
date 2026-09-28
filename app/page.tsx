import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { featuredProducts } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { ProductCard } from "@/components/shop/ProductCard";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/Icons";
import { StickyCta } from "@/components/site/StickyCta";

const trust = [
  { big: "IGI", small: "Certified stones" },
  { big: "BIS", small: "Hallmarked gold" },
  { big: "100%", small: "Lab-grown" },
  { big: "10–12d", small: "Made to order" },
];

const bands = [
  { href: "/shop?category=rings", label: "Cocktail rings", image: images.ringsMacaron, alt: "Cocktail rings" },
  { href: "/shop?stone=polki", label: "Polki", image: images.chokerLeopard, alt: "Pearl and polki choker" },
  { href: "/shop?stone=diamond", label: "Everyday diamonds", image: images.braceletOrange, alt: "Diamond tennis bracelet" },
];

const gram = [
  { image: images.collagePomegranate, alt: "Kiyanaa jewellery with pomegranates" },
  { image: images.collageTeacup, alt: "Bracelet on a teacup and a pendant" },
  { image: images.ringsHands, alt: "Emerald rings on both hands" },
  { image: images.ringChilli, alt: "Emerald ring on a green chilli" },
  { image: images.workshop, alt: "Craftsman setting a ring" },
  { image: images.pendantCarvedEmerald, alt: "Carved emerald pendant" },
];

export default function HomePage() {
  return (
    <div className="pb-24 lg:pb-0">
      {/* Split hero */}
      <section className="bg-accent text-paper">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pt-2 pb-8 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:pt-6 lg:pb-[72px]">
          <div className="relative order-first aspect-[5/6] overflow-hidden rounded-[4px] lg:hidden">
            <Image
              src={images.heroConeRings}
              alt="Ruby cluster and emerald cocktail rings on a whipped-cream ice-cream cone"
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 lg:gap-7 lg:pb-6">
            <div className="eyebrow text-[11px] opacity-85 lg:text-xs">Lab-grown diamonds · Lab-grown polki</div>
            <h1 className="font-serif text-[44px] leading-[1.02] font-normal tracking-[-0.01em] lg:text-[84px] lg:leading-[0.98] lg:tracking-[-0.015em]">
              Fine jewellery
              <br />
              for <em>ordinary</em>
              <br className="hidden lg:block" /> Tuesdays.
            </h1>
            <p className="max-w-[460px] text-[15px] leading-[1.55] opacity-90 lg:text-lg">
              Lab-grown diamonds and lab-grown polki with a modern touch. Certified, hallmarked, and made to be worn, not
              saved for the big day.
            </p>
            <div className="flex gap-2.5 lg:gap-3">
              <Link href="/shop" className="btn-pill h-[50px] flex-1 bg-paper text-ink hover:bg-cream lg:h-14 lg:flex-none lg:px-9">
                Shop now
              </Link>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-pill hidden h-14 border-[1.5px] border-paper text-paper hover:bg-paper hover:text-ink lg:inline-flex"
              >
                <InstagramIcon size={16} /> DM to order
              </a>
              <a
                href={whatsappLink("Hi Kiyanaa, I'd like to know more about your pieces.")}
                target="_blank"
                rel="noreferrer"
                className="btn-pill h-[50px] flex-1 border-[1.5px] border-paper text-paper lg:hidden"
              >
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="hidden h-[620px] grid-cols-2 grid-rows-2 gap-4 lg:grid">
            <div className="relative row-span-2 overflow-hidden rounded-[4px] bg-accent-deep">
              <Image
                src={images.heroConeRings}
                alt="Ruby cluster and emerald cocktail rings on a whipped-cream ice-cream cone"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[4px] bg-wine">
              <Image
                src={images.necklaceWine}
                alt="Ruby polki tassel necklace in spilled red wine"
                fill
                sizes="(min-width: 1024px) 15vw, 50vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[4px] bg-sand">
              <Image
                src={images.braceletCar}
                alt="Diamond tennis bracelets on an orange car door handle"
                fill
                sizes="(min-width: 1024px) 15vw, 50vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-line">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4 lg:px-20">
          {trust.map((t, i) => (
            <div
              key={t.big}
              className={`flex flex-col items-center gap-1 px-3 py-[18px] text-center lg:flex-row lg:items-baseline lg:gap-3 lg:py-6 lg:text-left ${
                i < 3 ? "lg:border-r lg:border-line" : ""
              } ${i % 2 === 0 ? "border-r border-line lg:border-r" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""} ${
                i > 0 ? "lg:pl-6" : ""
              }`}
            >
              <span className="font-serif text-xl lg:text-[26px]">{t.big}</span>
              <span className="eyebrow text-[11px] text-muted lg:text-xs">{t.small}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signature pieces */}
      <section className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 pt-8 lg:gap-7 lg:px-20 lg:pt-[72px]">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-[28px] leading-none font-normal lg:text-[44px]">
            The house of <em>cocktail rings</em>
          </h2>
          <Link href="/shop" className="link-underline hidden lg:inline-block">
            View all pieces
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 2} />
          ))}
        </div>
        <Link href="/shop" className="link-underline self-center lg:hidden">
          View all pieces
        </Link>
      </section>

      {/* Categories band */}
      <section className="mx-auto grid max-w-[1440px] gap-3 px-5 pt-8 sm:grid-cols-3 lg:gap-6 lg:px-20 lg:pt-[72px]">
        {bands.map((b) => (
          <Link key={b.href} href={b.href} className="group relative flex h-[200px] flex-col justify-end overflow-hidden rounded-[4px] p-6 text-cream lg:h-[260px] lg:p-7">
            <Image
              src={b.image}
              alt={b.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              placeholder="blur"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <span className="relative font-serif text-[26px] lg:text-[30px]">{b.label}</span>
            <span className="eyebrow relative mt-1.5 text-gold">Shop →</span>
          </Link>
        ))}
      </section>

      {/* Story + Instagram */}
      <section className="mx-auto grid max-w-[1440px] gap-6 px-5 pt-8 lg:grid-cols-[1.1fr_1fr] lg:px-20 lg:pt-[72px]">
        <div className="flex flex-col justify-center gap-4 rounded-[4px] bg-ink p-7 text-cream lg:gap-[18px] lg:p-12">
          <div className="eyebrow text-gold">Our story</div>
          <p className="font-serif text-2xl leading-[1.2] lg:text-[38px] lg:leading-[1.15]">
            Jewellery should feel <em>personal</em>, not occasional.
          </p>
          <p className="max-w-[440px] text-[15px] leading-relaxed opacity-85">
            Founded by {site.founder} to make fine jewellery something you reach for on an ordinary day. Every stone
            certified, every setting hallmarked, every order made for you.
          </p>
          <Link href="/about" className="link-underline border-gold text-cream">
            Read the story
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-[11px] text-muted lg:text-xs">@{site.instagramHandle}</span>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold tracking-[0.12em] uppercase hover:text-wine">
              Follow
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {gram.map((g) => (
              <a
                key={g.alt}
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="relative aspect-square overflow-hidden bg-sand"
                aria-label={`${g.alt} on Instagram`}
              >
                <Image src={g.image} alt={g.alt} fill sizes="(min-width: 1024px) 12vw, 33vw" placeholder="blur" className="object-cover" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="h-12 lg:h-[72px]" />
      <StickyCta />
    </div>
  );
}
