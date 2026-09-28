/**
 * Brand-level constants. Anything the business will want to change lives here
 * or in environment variables, not scattered through components.
 */
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export const site = {
  name: "Kiyanaa",
  legalName: "Kiyanaa Jewels",
  tagline: "Fine jewellery for ordinary Tuesdays.",
  description:
    "Lab-grown diamonds and lab-grown polki jewellery with a modern touch. Certified, hallmarked and made for you. Experience store in Jaipur.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagramHandle: "kiyanaajewels",
  instagramUrl: "https://www.instagram.com/kiyanaajewels/",
  /** Google Maps short link taken from the Instagram bio. */
  mapsUrl: "https://maps.app.goo.gl/H2JFL8RjusU2Edyk7",
  mapsEmbedUrl: "https://www.google.com/maps?q=Kiyanaa+Jewels+Jaipur&output=embed",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@kiyanaa.in",
  whatsappNumber,
  whatsappDisplay: whatsappNumber
    ? `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
    : "WhatsApp us",
  city: "Jaipur",
  founder: "Satwik Bansal",
  storeAddress: process.env.NEXT_PUBLIC_STORE_ADDRESS ?? "Kiyanaa Experience Store, Jaipur, Rajasthan",
  storeHours: process.env.NEXT_PUBLIC_STORE_HOURS ?? "Open daily, 11am – 8pm",
};

/** Deep link into a WhatsApp chat with an optional prefilled message. */
export function whatsappLink(message?: string) {
  const base = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}` : "https://wa.me/";
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
