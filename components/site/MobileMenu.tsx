"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { ChevronRightIcon, CloseIcon, InstagramIcon, MenuIcon, WhatsAppIcon } from "./Icons";
import { CartButton } from "./CartButton";

const links: { href: string; label: React.ReactNode }[] = [
  { href: "/shop", label: "Shop all" },
  {
    href: "/shop?category=rings",
    label: (
      <span>
        Cocktail <em>rings</em>
      </span>
    ),
  },
  { href: "/shop?stone=polki", label: "Polki" },
  { href: "/shop?category=bracelets", label: "Bracelets" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Contact" },
];

/** Full-screen terracotta menu from the "Menu overlay · Mobile" board. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-ml-3 flex h-11 w-11 items-center justify-center lg:hidden"
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-accent text-paper lg:hidden" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-5 py-3.5">
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="-ml-3 flex h-11 w-11 items-center justify-center"
            >
              <CloseIcon />
            </button>
            <Link href="/" onClick={close} className="font-serif text-xl tracking-[0.34em] pl-[0.34em]">
              KIYANAA
            </Link>
            <span onClick={close}>
              <CartButton className="-mr-3 text-paper" />
            </span>
          </div>

          <nav className="flex flex-col px-5 pt-6">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className={`flex items-center justify-between py-3.5 font-serif text-4xl leading-none ${
                  i < links.length - 1 ? "border-b border-paper/35" : ""
                }`}
              >
                {l.label}
                <ChevronRightIcon />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 px-5 pb-7">
            <div className="flex gap-2.5">
              <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-pill h-[50px] flex-1 bg-ink text-cream">
                <InstagramIcon size={16} /> DM to order
              </a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-pill h-[50px] flex-1 bg-emerald text-cream">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </div>
            <div className="eyebrow text-center text-[11px] opacity-85">Certified · Hallmarked · Made for you</div>
          </div>
        </div>
      )}
    </>
  );
}
