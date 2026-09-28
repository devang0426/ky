import type { Metadata } from "next";
import Link from "next/link";
import { categories, products, stoneLabels, ALL_METALS, type Category, type Metal, type Stone } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/shop/ProductCard";
import { CheckIcon } from "@/components/site/Icons";

export const metadata: Metadata = {
  title: "Shop all pieces",
  description: "Cocktail rings, polki, tennis bracelets and pendants in lab-grown diamonds. Every stone certified, every setting hallmarked.",
};

type Sort = "newest" | "price-asc" | "price-desc";

const sorts: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const params = await props.searchParams;
  const category = first(params.category) as Category | undefined;
  const stone = first(params.stone) as Stone | undefined;
  const metal = first(params.metal) as Metal | undefined;
  const sort = (first(params.sort) as Sort | undefined) ?? "newest";

  const validCategory = categories.some((c) => c.slug === category) ? category : undefined;
  const validStone = stone && stone in stoneLabels ? stone : undefined;
  const validMetal = metal && ALL_METALS.includes(metal) ? metal : undefined;

  let list = products.filter(
    (p) =>
      (!validCategory || p.category === validCategory) &&
      (!validStone || p.stones.includes(validStone)) &&
      (!validMetal || p.metals.includes(validMetal)),
  );
  list = [...list].sort((a, b) =>
    sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : b.order - a.order,
  );

  /** Builds a link that keeps the other filters and toggles one. */
  const href = (patch: Partial<Record<"category" | "stone" | "metal" | "sort", string | undefined>>) => {
    const next = new URLSearchParams();
    const merged = { category: validCategory, stone: validStone, metal: validMetal, sort: sort === "newest" ? undefined : sort, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) next.set(k, v);
    const qs = next.toString();
    return qs ? `/shop?${qs}` : "/shop";
  };

  const title = validCategory ? categories.find((c) => c.slug === validCategory)!.label : validStone ? stoneLabels[validStone] : "All pieces";
  const prices = list.map((p) => p.price);

  return (
    <div className="mx-auto max-w-[1440px]">
      {/* Page header */}
      <section className="flex flex-col gap-5 border-b border-line px-5 pt-8 pb-6 lg:flex-row lg:items-end lg:justify-between lg:px-20 lg:pt-14 lg:pb-8">
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow text-muted">
            <Link href="/">Home</Link> / Shop
          </div>
          <h1 className="font-serif text-[40px] leading-none font-normal lg:text-[64px]">
            {title.includes(" ") ? (
              <>
                {title.split(" ").slice(0, -1).join(" ")} <em>{title.split(" ").at(-1)}</em>
              </>
            ) : (
              <em>{title}</em>
            )}
          </h1>
          <p className="text-[15px] text-muted">
            {list.length} {list.length === 1 ? "piece" : "pieces"} · Every stone certified, every setting hallmarked.
          </p>
        </div>
        <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          <Pill active={!validCategory} href={href({ category: undefined })}>
            All
          </Pill>
          {categories.map((c) => (
            <Pill key={c.slug} active={validCategory === c.slug} href={href({ category: c.slug })}>
              {c.label}
            </Pill>
          ))}
        </div>
      </section>

      {/* Sidebar + grid */}
      <section className="grid gap-8 px-5 pt-8 pb-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 lg:px-20 lg:pt-10 lg:pb-24">
        <aside className="flex flex-col gap-6 text-sm lg:gap-7">
          <FilterGroup title="Stone">
            {(Object.keys(stoneLabels) as Stone[]).map((s) => (
              <FilterRow key={s} active={validStone === s} href={href({ stone: validStone === s ? undefined : s })}>
                {stoneLabels[s]}
              </FilterRow>
            ))}
          </FilterGroup>
          <FilterGroup title="Metal" divider>
            {ALL_METALS.map((m) => (
              <FilterRow key={m} active={validMetal === m} href={href({ metal: validMetal === m ? undefined : m })}>
                {m}
              </FilterRow>
            ))}
          </FilterGroup>
          {prices.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-line pt-6">
              <div className="eyebrow text-[11px] font-semibold">Price</div>
              <div className="relative mx-2 my-3 h-0.5 bg-line">
                <span className="absolute top-[-7px] left-0 h-4 w-4 rounded-full bg-ink" />
                <span className="absolute top-[-7px] right-0 h-4 w-4 rounded-full bg-ink" />
              </div>
              <div className="flex justify-between text-[13px] text-muted">
                <span>{formatPrice(Math.min(...prices))}</span>
                <span>{formatPrice(Math.max(...prices))}</span>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2.5 rounded-[4px] bg-accent p-6 text-paper">
            <p className="font-serif text-[22px] leading-[1.15]">
              Don&apos;t see it? We&apos;ll <em>make</em> it.
            </p>
            <Link href="/contact" className="link-underline text-xs">
              Talk to us
            </Link>
          </div>
        </aside>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between text-[13px] text-muted">
            <span>
              Showing {list.length} of {products.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="eyebrow hidden text-[11px] sm:inline">Sort</span>
              {sorts.map((s) => (
                <Link
                  key={s.value}
                  href={href({ sort: s.value })}
                  className={`px-2 py-2 text-xs font-semibold tracking-[0.08em] uppercase ${sort === s.value ? "text-ink underline underline-offset-4" : "hover:text-ink"}`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          {list.length === 0 ? (
            <div className="flex flex-col items-start gap-4 rounded-[4px] border border-line p-8">
              <p className="font-serif text-2xl">Nothing matches those filters yet.</p>
              <Link href="/shop" className="link-underline">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
              {list.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Pill({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex h-11 shrink-0 items-center rounded-full border-[1.5px] border-ink px-[18px] text-[13px] ${
        active ? "bg-ink font-semibold text-cream" : "font-medium hover:bg-sand"
      }`}
    >
      {children}
    </Link>
  );
}

function FilterGroup({ title, divider, children }: { title: string; divider?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${divider ? "border-t border-line pt-6" : ""}`}>
      <div className="eyebrow mb-1 text-[11px] font-semibold">{title}</div>
      {children}
    </div>
  );
}

function FilterRow({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} aria-pressed={active} className="flex min-h-7 items-center gap-2.5 hover:text-wine">
      <span className={`flex h-[18px] w-[18px] items-center justify-center border ${active ? "border-ink bg-ink text-cream" : "border-field-border bg-field"}`}>
        {active && <CheckIcon size={12} />}
      </span>
      {children}
    </Link>
  );
}
