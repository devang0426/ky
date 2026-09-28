/**
 * Every photograph on the site, sourced from @kiyanaajewels on Instagram and
 * resized for the web. Static imports give next/image the intrinsic size and a
 * blur placeholder for free.
 */
import heroConeRings from "@/public/images/hero-cone-rings.jpg";
import necklaceWine from "@/public/images/necklace-wine.jpg";
import braceletCar from "@/public/images/bracelet-car.jpg";
import ringChilli from "@/public/images/ring-chilli.jpg";
import ringPolkiBook from "@/public/images/ring-polki-book.jpg";
import chokerModel from "@/public/images/choker-model.jpg";
import chokerLeopard from "@/public/images/choker-leopard.jpg";
import pendantCone from "@/public/images/pendant-cone.jpg";
import ringsMacaron from "@/public/images/rings-macaron.jpg";
import ringsHands from "@/public/images/rings-hands.jpg";
import braceletEmeraldApple from "@/public/images/bracelet-emerald-apple.jpg";
import necklaceEmeraldDrops from "@/public/images/necklace-emerald-drops.jpg";
import workshop from "@/public/images/workshop.jpg";
import braceletOrange from "@/public/images/bracelet-orange.jpg";
import storeChoker from "@/public/images/store-choker.jpg";
import braceletPearlCushion from "@/public/images/bracelet-pearl-cushion.jpg";
import pendantCarvedEmerald from "@/public/images/pendant-carved-emerald.jpg";
import necklaceRacket from "@/public/images/necklace-racket.jpg";
import ringPartash from "@/public/images/ring-partash.jpg";
import collagePomegranate from "@/public/images/collage-pomegranate.jpg";
import collageTeacup from "@/public/images/collage-teacup.jpg";

export const images = {
  heroConeRings,
  necklaceWine,
  braceletCar,
  ringChilli,
  ringPolkiBook,
  chokerModel,
  chokerLeopard,
  pendantCone,
  ringsMacaron,
  ringsHands,
  braceletEmeraldApple,
  necklaceEmeraldDrops,
  workshop,
  braceletOrange,
  storeChoker,
  braceletPearlCushion,
  pendantCarvedEmerald,
  necklaceRacket,
  ringPartash,
  collagePomegranate,
  collageTeacup,
};

export type SiteImage = { src: (typeof images)[keyof typeof images]; alt: string };
