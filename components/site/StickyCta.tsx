import { site, whatsappLink } from "@/lib/site";

/** Bottom-pinned "DM to order / WhatsApp" bar from the mobile boards. Hidden on desktop. */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-cream px-4 pt-3 pb-5 lg:hidden">
      <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="btn-pill h-12 flex-1 bg-ink text-cream">
        DM to order
      </a>
      <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-pill h-12 flex-1 bg-emerald text-cream">
        WhatsApp
      </a>
    </div>
  );
}
