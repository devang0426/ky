import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { WhatsAppIcon } from "./Icons";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=rings", label: "Cocktail rings" },
  { href: "/shop?stone=polki", label: "Polki" },
  { href: "/about", label: "Story" },
];

export function Header() {
  return (
    <>
      <div className="eyebrow bg-ink px-4 py-2.5 text-center text-[11px] text-cream">
        Certified lab-grown · BIS hallmarked · Free insured shipping across India
      </div>
      <header className="sticky top-0 z-40 bg-accent text-paper">
        {/* Mobile: hamburger · logo · bag */}
        <div className="flex h-[68px] items-center justify-between px-5 lg:hidden">
          <MobileMenu />
          <Link href="/" className="font-serif text-xl tracking-[0.34em] pl-[0.34em]">
            KIYANAA
          </Link>
          <CartButton className="-mr-3" />
        </div>

        {/* Desktop: nav · logo · actions */}
        <div className="mx-auto hidden h-[76px] max-w-[1440px] grid-cols-3 items-center px-10 lg:grid xl:px-20">
          <nav className="flex gap-7 text-xs font-semibold tracking-[0.16em] uppercase">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="py-3 hover:opacity-80">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="justify-self-center font-serif text-[26px] tracking-[0.4em] pl-[0.4em]">
            KIYANAA
          </Link>
          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="btn-pill h-10 border-[1.5px] border-paper px-[18px] text-xs hover:bg-paper hover:text-ink"
            >
              <WhatsAppIcon size={15} /> WhatsApp
            </a>
            <CartButton />
          </div>
        </div>
      </header>
      <span className="sr-only">{site.instagramHandle}</span>
    </>
  );
}
