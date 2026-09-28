"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { Metal } from "@/lib/products";

export type CartLine = {
  /** slug + metal + size, so the same piece in two sizes stays as two lines. */
  key: string;
  slug: string;
  metal: Metal;
  size?: number;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  /** True once the client has hydrated, so the UI can avoid a flash of the empty server state. */
  ready: boolean;
  add: (line: Omit<CartLine, "key" | "qty"> & { qty?: number }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kiyanaa-cart-v1";
const EMPTY: CartLine[] = [];

export function lineKey(slug: string, metal: Metal, size?: number) {
  return `${slug}|${metal}|${size ?? ""}`;
}

/* A tiny external store over localStorage so React can subscribe to it without
   effects. Other tabs stay in sync through the `storage` event. */
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;

function readLines(): CartLine[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

function writeLines(next: CartLine[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or blocked storage: the bag still works for this session.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const noop = () => () => {};

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, readLines, () => EMPTY);
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  const add: CartContextValue["add"] = useCallback(({ slug, metal, size, qty = 1 }) => {
    const key = lineKey(slug, metal, size);
    const prev = readLines();
    const existing = prev.find((l) => l.key === key);
    writeLines(existing ? prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)) : [...prev, { key, slug, metal, size, qty }]);
  }, []);

  const remove = useCallback((key: string) => writeLines(readLines().filter((l) => l.key !== key)), []);

  const setQty = useCallback((key: string, qty: number) => {
    const prev = readLines();
    writeLines(qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)));
  }, []);

  const clear = useCallback(() => writeLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      ready,
      add,
      remove,
      setQty,
      clear,
      count: lines.reduce((n, l) => n + l.qty, 0),
    }),
    [lines, ready, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
