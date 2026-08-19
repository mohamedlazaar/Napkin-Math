import Link from 'next/link';
import { CalculatorRow, toSummaries } from './CalculatorCard';
import type { CalculatorConfig } from '@/lib/types';

/**
 * Internal-link block. Every page links out to related tools — this is what
 * turns a pile of pages into a crawlable, authority-sharing site.
 */
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
      <h2 id="related-heading" className="text-h2 font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <ul className="mt-4 grid gap-1 sm:grid-cols-2">
        {toSummaries(items).map((calc) => (
          <li key={calc.slug}>
            <CalculatorRow calc={calc} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Links from a calculator page down to its industry pages, and back up again.
 * Without this, the long-tail pages are orphans that never get crawled
 * properly.
 */
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
    <section className="mt-12" aria-labelledby="variants-heading">
      <h2 id="variants-heading" className="text-h2 font-bold tracking-tight text-ink">
        {calc.name} by industry
      </h2>
      <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
        The same calculation, with the cost lines, benchmark ranges and worked numbers that
        actually apply to your sector.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((v) => (
          <li key={v.slug}>
            <Link href={`/${calc.slug}/${v.slug}`} className="tag-interactive">
              For {v.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
