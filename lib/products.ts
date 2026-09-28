import { images, type SiteImage } from "./images";

export type Category = "rings" | "necklaces" | "bracelets" | "pendants";
export type Stone = "diamond" | "polki" | "ruby" | "emerald" | "pearl";
export type Metal = "Yellow gold" | "Rose gold" | "White gold";

export type Product = {
  slug: string;
  name: string;
  /** Name split around the italic word, e.g. ["Polki Halo", "Cocktail", "Ring"]. */
  headline: [string, string, string];
  category: Category;
  stones: Stone[];
  /** Price in Indian rupees, inclusive of taxes. */
  price: number;
  badge?: "Bestseller" | "New" | "Signature";
  description: string;
  details: string;
  images: SiteImage[];
  metals: Metal[];
  /** Indian ring sizes; only rings carry sizes. */
  sizes?: number[];
  /** Ordering key: higher is newer. */
  order: number;
};

export const RING_SIZES = [10, 11, 12, 13, 14, 15];
export const ALL_METALS: Metal[] = ["Yellow gold", "Rose gold", "White gold"];

export const categories: { slug: Category; label: string; blurb: string; image: SiteImage }[] = [
  {
    slug: "rings",
    label: "Cocktail rings",
    blurb: "The house speciality. Loud enough for a cocktail, light enough for a Tuesday.",
    image: { src: images.ringsMacaron, alt: "Ruby and emerald cocktail rings worn while biting a macaron" },
  },
  {
    slug: "necklaces",
    label: "Necklaces & chokers",
    blurb: "Polki tassels, emerald drops and pearl chokers.",
    image: { src: images.chokerModel, alt: "Model wearing a pearl and ruby polki choker" },
  },
  {
    slug: "bracelets",
    label: "Bracelets",
    blurb: "Tennis bracelets in diamond, emerald and pearl.",
    image: { src: images.braceletCar, alt: "Diamond tennis bracelets hanging from an orange car door handle" },
  },
  {
    slug: "pendants",
    label: "Pendants",
    blurb: "Small details that sit close to the heart.",
    image: { src: images.pendantCone, alt: "Floral diamond pendant draped over an ice-cream cone" },
  },
];

export const stoneLabels: Record<Stone, string> = {
  diamond: "Lab-grown diamond",
  polki: "Lab-grown polki",
  ruby: "Ruby",
  emerald: "Emerald",
  pearl: "Pearl",
};

export const products: Product[] = [
  {
    slug: "polki-halo-cocktail-ring",
    name: "Polki Halo Cocktail Ring",
    headline: ["Polki Halo", "Cocktail", "Ring"],
    category: "rings",
    stones: ["polki", "diamond", "ruby"],
    price: 68500,
    badge: "Bestseller",
    description:
      "A single lab-grown polki framed in a double halo of lab-grown diamonds, with a ruby whisper at the shoulder. Set in hallmarked gold.",
    details:
      "Centre: lab-grown polki, approx. 9 × 9 mm. Halo: 64 lab-grown diamonds, F–G colour, VS clarity. Metal: 14K hallmarked gold, approx. 6.2 g.",
    images: [
      { src: images.ringPolkiBook, alt: "Polki halo cocktail ring resting on the spine of a terracotta notebook" },
      { src: images.ringsMacaron, alt: "Cocktail rings worn on both hands" },
    ],
    metals: ALL_METALS,
    sizes: RING_SIZES,
    order: 12,
  },
  {
    slug: "ruby-cluster-cocktail-ring",
    name: "Ruby Cluster Cocktail Ring",
    headline: ["Ruby Cluster", "Cocktail", "Ring"],
    category: "rings",
    stones: ["ruby", "diamond"],
    price: 54000,
    badge: "Signature",
    description:
      "A dome of pavé-set rubies around a lab-grown diamond centre. The ring that started the house of cocktail rings.",
    details:
      "Centre: lab-grown diamond, 0.30 ct. Pavé: 96 rubies, approx. 2.4 ct total. Metal: 14K hallmarked gold, approx. 7.1 g.",
    images: [
      { src: images.heroConeRings, alt: "Ruby cluster and emerald cocktail rings on a whipped-cream ice-cream cone" },
      { src: images.ringsMacaron, alt: "Ruby cluster cocktail ring worn while biting a macaron" },
    ],
    metals: ALL_METALS,
    sizes: RING_SIZES,
    order: 11,
  },
  {
    slug: "emerald-pear-ring",
    name: "Emerald & Pear Diamond Ring",
    headline: ["Emerald &", "Pear", "Diamond Ring"],
    category: "rings",
    stones: ["emerald", "diamond"],
    price: 42000,
    description:
      "An emerald-cut emerald and a pear-shaped lab-grown diamond, set toi et moi on a slim band. It's getting chilli in here.",
    details:
      "Emerald: approx. 0.90 ct. Diamond: pear, 0.50 ct, F colour, VS1. Metal: 14K hallmarked gold, approx. 3.4 g.",
    images: [{ src: images.ringChilli, alt: "Emerald and pear diamond ring on a green chilli in an orange dish" }],
    metals: ALL_METALS,
    sizes: RING_SIZES,
    order: 8,
  },
  {
    slug: "partash-polki-ring",
    name: "Partash Polki Ring",
    headline: ["Partash", "Polki", "Ring"],
    category: "rings",
    stones: ["polki", "diamond"],
    price: 58000,
    badge: "New",
    description:
      "A heart-shaped lab-grown polki in an engraved gold bezel, ringed with a fine diamond border. Heritage craft, modern weight.",
    details:
      "Centre: lab-grown polki, approx. 11 × 10 mm. Border: 48 lab-grown diamonds. Metal: 14K hallmarked gold with hand engraving, approx. 6.8 g.",
    images: [{ src: images.ringPartash, alt: "Partash polki ring held between two fingers" }],
    metals: ["Yellow gold", "Rose gold"],
    sizes: RING_SIZES,
    order: 9,
  },
  {
    slug: "classic-tennis-bracelet",
    name: "Classic Tennis Bracelet",
    headline: ["Classic", "Tennis", "Bracelet"],
    category: "bracelets",
    stones: ["diamond"],
    price: 115000,
    badge: "Bestseller",
    description:
      "Forty-two lab-grown diamonds in a four-prong line, finished with a hidden box clasp. Why just dress up yourself?",
    details:
      "Diamonds: 42 round brilliants, approx. 4.2 ct total, F–G colour, VS clarity. Length: 7 in, adjustable on request. Metal: 14K hallmarked gold.",
    images: [
      { src: images.braceletCar, alt: "Two diamond tennis bracelets hanging from an orange car door handle" },
      { src: images.braceletOrange, alt: "Diamond tennis bracelet on a wrist holding a halved orange" },
    ],
    metals: ALL_METALS,
    order: 10,
  },
  {
    slug: "emerald-tennis-bracelet",
    name: "Emerald Tennis Bracelet",
    headline: ["Emerald", "Tennis", "Bracelet"],
    category: "bracelets",
    stones: ["emerald", "diamond"],
    price: 98000,
    description:
      "Emerald-cut emeralds alternating with lab-grown diamonds in a slim channel. The green that goes with everything.",
    details:
      "Emeralds: 20, approx. 5.0 ct total. Diamonds: 20 lab-grown, approx. 1.0 ct total. Length: 7 in. Metal: 14K hallmarked gold.",
    images: [{ src: images.braceletEmeraldApple, alt: "Emerald tennis bracelet on a wrist holding a red apple" }],
    metals: ALL_METALS,
    order: 7,
  },
  {
    slug: "pearl-polki-bracelet",
    name: "Pearl & Polki Bracelet",
    headline: ["Pearl &", "Polki", "Bracelet"],
    category: "bracelets",
    stones: ["pearl", "polki", "ruby"],
    price: 46000,
    description:
      "Lab-grown polki set in gold, strung between freshwater pearls with ruby beads at the clasp. Wears like an heirloom, weighs like a Tuesday.",
    details:
      "Polki: 7 lab-grown pieces. Pearls: freshwater, 6 mm. Length: 7 in. Metal: 14K hallmarked gold, approx. 8.5 g.",
    images: [{ src: images.braceletPearlCushion, alt: "Pearl and polki bracelet resting on a sage suede cushion" }],
    metals: ["Yellow gold", "Rose gold"],
    order: 5,
  },
  {
    slug: "ruby-polki-tassel-necklace",
    name: "Ruby Polki Tassel Necklace",
    headline: ["Ruby Polki", "Tassel", "Necklace"],
    category: "necklaces",
    stones: ["polki", "ruby", "pearl"],
    price: 145000,
    badge: "Signature",
    description:
      "A rope of ruby beads and pearls ending in a lab-grown polki drop and a silk-soft ruby tassel. A little sip of jewellery obsession.",
    details:
      "Polki: 3 lab-grown pieces. Ruby beads: approx. 38 ct total. Pearls: freshwater. Length: 24 in with a 3 in tassel. Metal: 14K hallmarked gold.",
    images: [{ src: images.necklaceWine, alt: "Ruby polki tassel necklace lying in a pool of spilled red wine beside a toppled glass" }],
    metals: ["Yellow gold", "Rose gold"],
    order: 6,
  },
  {
    slug: "emerald-drop-necklace",
    name: "Emerald Drop Necklace",
    headline: ["Emerald", "Drop", "Necklace"],
    category: "necklaces",
    stones: ["emerald", "diamond"],
    price: 185000,
    description:
      "Pear-cut emeralds hang from a river of lab-grown diamonds. Sold as a necklace, with matching earrings made on request.",
    details:
      "Emeralds: 11 pear cuts, approx. 14 ct total. Diamonds: 120 lab-grown, approx. 4.8 ct total. Length: 16 in. Metal: 14K hallmarked gold.",
    images: [
      { src: images.necklaceEmeraldDrops, alt: "Emerald drop necklace and matching earrings laid out on a terracotta tray" },
      { src: images.necklaceRacket, alt: "Emerald and diamond necklace draped across a white tennis racket" },
    ],
    metals: ["Yellow gold", "White gold"],
    order: 4,
  },
  {
    slug: "pearl-polki-choker",
    name: "Pearl & Polki Choker",
    headline: ["Pearl &", "Polki", "Choker"],
    category: "necklaces",
    stones: ["pearl", "polki", "ruby"],
    price: 125000,
    badge: "New",
    description:
      "Three strands of pearls meet a lab-grown polki centrepiece with a ruby heart. Made to outshine; with Kiyanaa you will never be ordinary.",
    details:
      "Polki: 9 lab-grown pieces. Pearls: freshwater, 4 mm, three strands. Ruby: cushion cut, approx. 3 ct. Length: 14 in, adjustable. Metal: 14K hallmarked gold.",
    images: [
      { src: images.chokerModel, alt: "Model wearing the pearl and polki choker with matching earrings" },
      { src: images.chokerLeopard, alt: "Pearl and polki choker photographed on a leopard" },
      { src: images.storeChoker, alt: "Pearl and polki choker with the Kiyanaa experience store in the background" },
    ],
    metals: ["Yellow gold", "Rose gold"],
    order: 3,
  },
  {
    slug: "floral-diamond-pendant",
    name: "Floral Diamond Pendant",
    headline: ["Floral", "Diamond", "Pendant"],
    category: "pendants",
    stones: ["diamond"],
    price: 32000,
    description:
      "Five petals of lab-grown diamonds on a fine chain. A little detail that sits close to the heart.",
    details:
      "Diamonds: 26 lab-grown, approx. 0.60 ct total. Chain: 18 in, 14K hallmarked gold. Pendant: approx. 14 mm.",
    images: [{ src: images.pendantCone, alt: "Floral diamond pendant hanging over an ice-cream cone" }],
    metals: ALL_METALS,
    order: 2,
  },
  {
    slug: "carved-emerald-polki-pendant",
    name: "Carved Emerald Polki Pendant",
    headline: ["Carved Emerald", "Polki", "Pendant"],
    category: "pendants",
    stones: ["emerald", "polki", "pearl"],
    price: 72000,
    description:
      "A hand-carved emerald in a lab-grown polki frame, dropping into pearls on a string of emerald beads. Behind every piece is a pair of skilled hands.",
    details:
      "Emerald: carved, approx. 6 ct. Polki: 12 lab-grown pieces. Beads: emerald, with freshwater pearl drops. Length: 20 in. Metal: 14K hallmarked gold.",
    images: [{ src: images.pendantCarvedEmerald, alt: "Carved emerald polki pendant on an emerald bead chain beside gold scissors" }],
    metals: ["Yellow gold"],
    order: 1,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function categoryLabel(slug: Category) {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

export const featuredProducts = [
  "polki-halo-cocktail-ring",
  "emerald-drop-necklace",
  "classic-tennis-bracelet",
  "pearl-polki-choker",
].map((slug) => getProduct(slug)!) as Product[];

/** Pieces shown under "Wear it with" on a product page: same-house, different category first. */
export function relatedProducts(product: Product, count = 4) {
  const others = products.filter((p) => p.slug !== product.slug);
  const different = others.filter((p) => p.category !== product.category);
  const same = others.filter((p) => p.category === product.category);
  return [...different, ...same].slice(0, count);
}
