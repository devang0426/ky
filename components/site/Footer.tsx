import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

const cols = [
  {
    title: "Shop",
    links: [
      { href: "/shop?category=rings", label: "Cocktail rings" },
      { href: "/shop?stone=polki", label: "Polki" },
      { href: "/shop?category=bracelets", label: "Bracelets" },
      { href: "/shop?category=necklaces", label: "Necklaces" },
      { href: "/shop?category=pendants", label: "Pendants" },
    ],
  },
  {
    title: "Brand",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/contact#store", label: "Store & exhibitions" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Talk to us",
    links: [
      { href: site.instagramUrl, label: "Instagram DM", external: true },
      { href: whatsappLink(), label: "WhatsApp", external: true },
      { href: `mailto:${site.email}`, label: site.email, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pt-12 pb-10 text-[13px] text-muted sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:px-20">
        <div className="flex flex-col gap-3">
          <div className="font-serif text-[22px] tracking-[0.34em] text-ink">KIYANAA</div>
          <p className="max-w-[300px] leading-relaxed">
            Lab-grown diamonds &amp; lab-grown polki jewellery with a modern touch. Experience store · {site.city}, India.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-2.5">
            <div className="eyebrow text-[11px] text-ink">{c.title}</div>
            {c.links.map((l) =>
              "external" in l && l.external ? (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-wine">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} className="hover:text-wine">
                  {l.label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-line px-5 py-5 text-[12px] text-muted sm:flex-row sm:justify-between lg:px-20">
        <span>
          © {new Date().getFullYear()} {site.legalName}. All pieces IGI/GSI certified and BIS hallmarked.
        </span>
        <span>Payments secured by Razorpay.</span>
      </div>
    </footer>
  );
}
