import Link from 'next/link';
import type { CalculatorConfig } from '@/lib/types';

/** Internal-link block. Every page links out to related tools — this is what
 *  turns a pile of pages into a crawlable, authority-sharing site. */
export function RelatedTools({
  items,
  heading = 'Related calculators',
}: {
  items: CalculatorConfig[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${c.slug}`}
              className="block h-full rounded-lg border border-slate-200 p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <span className="font-semibold text-ink">{c.name}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                {c.blurb}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Links from a calculator page down to its long-tail variant pages, and back
 *  up again. Without this, programmatic pages are orphans that never get
 *  crawled properly. */
export function VariantLinks({
  calc,
  currentVariant,
}: {
  calc: CalculatorConfig;
  currentVariant?: string;
}) {
  const items = calc.variants.filter((v) => v.slug !== currentVariant);
  if (items.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="variants-heading">
      <h2 id="variants-heading" className="text-2xl font-bold tracking-tight text-ink">
        {calc.name} by industry
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
        Same calculator, with the cost lines, benchmarks and worked numbers that
        actually apply to your sector.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((v) => (
          <li key={v.slug}>
            <Link
              href={`/${calc.slug}/${v.slug}`}
              className="inline-block rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700"
            >
              {calc.name} for {v.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
