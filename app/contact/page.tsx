import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ChevronRightIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/site/Icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Orders, custom pieces, sizing, gifting. Message Kiyanaa on WhatsApp or Instagram, or visit the experience store in Jaipur.",
};

export default function ContactPage() {
  const tiles = [
    {
      href: whatsappLink("Hi Kiyanaa, I have a question about a piece."),
      className: "bg-emerald text-cream",
      icon: <WhatsAppIcon size={32} />,
      title: "Chat on WhatsApp",
      sub: site.whatsappDisplay,
    },
    {
      href: site.instagramUrl,
      className: "bg-accent text-paper",
      icon: <InstagramIcon size={32} />,
      title: "DM us on Instagram",
      sub: `@${site.instagramHandle}`,
    },
    {
      href: `mailto:${site.email}`,
      className: "border-[1.5px] border-ink text-ink",
      icon: <MailIcon size={32} />,
      title: "Email",
      sub: site.email,
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-16 lg:px-20 lg:pb-24">
      <section className="grid items-start gap-10 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:pt-16">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="eyebrow text-muted">Contact</div>
            <h1 className="font-serif text-[44px] leading-none font-normal lg:text-[64px]">
              Let&apos;s <em>talk</em>
              <br />
              jewellery.
            </h1>
            <p className="max-w-[420px] text-base leading-relaxed text-body">
              Orders, custom pieces, sizing, gifting. The fastest way to reach us is a message. We usually reply within a
              few hours.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {tiles.map((t) => (
              <a
                key={t.title}
                href={t.href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-[18px] rounded-[4px] px-6 py-[22px] transition-opacity hover:opacity-90 ${t.className}`}
              >
                {t.icon}
                <span className="flex flex-1 flex-col gap-1">
                  <span className="text-[17px] font-semibold">{t.title}</span>
                  <span className="text-[13px] opacity-85">{t.sub}</span>
                </span>
                <ChevronRightIcon size={20} />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </section>

      {/* Store row */}
      <section id="store" className="grid scroll-mt-24 items-center gap-8 pt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:pt-[72px]">
        <div className="h-[300px] overflow-hidden rounded-[4px] bg-sand">
          <iframe
            title="Map to the Kiyanaa experience store"
            src={site.mapsEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col gap-3.5">
          <h2 className="font-serif text-[32px] font-normal lg:text-[36px]">
            Kiyanaa <em>Store</em>
          </h2>
          <div className="text-[15px] leading-[1.7] text-body">
            {site.storeAddress}
            <br />
            {site.storeHours}
          </div>
          <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="link-underline">
            Get directions
          </a>
          <div className="pt-2 text-[13px] text-muted">
            Exhibitions and pop-ups are announced on{" "}
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="underline">
              Instagram
            </a>
            .
          </div>
        </div>
      </section>
    </div>
  );
}
