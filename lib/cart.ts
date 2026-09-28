import { ALL_METALS, getProduct, type Metal, type Product } from "./products";

export type CartInput = { slug: string; metal: Metal; size?: number; qty: number };

export type PricedLine<T extends CartInput = CartInput> = T & { product: Product; lineTotal: number };

export const MAX_QTY_PER_LINE = 5;

/**
 * Turns raw cart lines into priced lines using the catalog as the single source
 * of truth. Used by the cart page and, crucially, by the order API so the client
 * can never dictate what it pays. Extra fields on the input (like the cart key)
 * are carried through.
 */
export function priceLines<T extends CartInput>(lines: T[]): { lines: PricedLine<T>[]; subtotal: number; errors: string[] } {
  const errors: string[] = [];
  const priced: PricedLine<T>[] = [];

  for (const line of lines) {
    const product = getProduct(line.slug);
    if (!product) {
      errors.push(`Unknown piece: ${line.slug}`);
      continue;
    }
    if (!ALL_METALS.includes(line.metal) || !product.metals.includes(line.metal)) {
      errors.push(`${product.name} is not available in ${line.metal}`);
      continue;
    }
    if (product.sizes && (line.size === undefined || !product.sizes.includes(line.size))) {
      errors.push(`Choose a ring size for ${product.name}`);
      continue;
    }
    const qty = Number.isInteger(line.qty) ? Math.min(Math.max(line.qty, 1), MAX_QTY_PER_LINE) : 1;
    priced.push({ ...line, qty, product, lineTotal: product.price * qty });
  }

  return { lines: priced, subtotal: priced.reduce((s, l) => s + l.lineTotal, 0), errors };
}
