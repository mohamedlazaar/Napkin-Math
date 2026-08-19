import Link from 'next/link';
import { glyphFor } from '@/lib/taxonomy';
import type { CalculatorConfig } from '@/lib/types';

/**
 * The minimum a client component needs to render a calculator link. Pages pass
 * this instead of the full config, which carries every paragraph of page copy
 * and has no business crossing the server → client boundary.
 */
export interface CalcSummary {
  slug: string;
  name: string;
  blurb: string;
  glyph: string;
}

export function toSummary(calc: CalculatorConfig): CalcSummary {
  return {
    slug: calc.slug,
    name: calc.name,
    blurb: calc.blurb,
    glyph: glyphFor(calc.slug),
  };
}

export function toSummaries(calcs: CalculatorConfig[]): CalcSummary[] {
  return calcs.map(toSummary);
}

/**
 * Card sizes exist to create hierarchy, not variety.
 *
 * `featured` is reserved for the two or three tools that most visitors arrive
 * looking for. If every card were identical the grid would read as an
 * undifferentiated directory — which is exactly what this site is trying not
 * to be.
 */
export function CalculatorCard({
  calc,
  featured = false,
  eyebrow,
}: {
  calc: CalcSummary;
  featured?: boolean;
  eyebrow?: string;
}) {
  return (
    <Link
      href={`/${calc.slug}`}
      // h-full so every card in a row ends on the same line: the grid stretches
      // the <li>, but the link inside it would otherwise size to its content.
      className={`card-interactive group flex h-full flex-col ${featured ? 'p-6' : 'p-5'}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-lg border border-line bg-surface-sunken font-mono text-ink-soft transition group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-700 ${
            featured ? 'h-11 w-11 text-lg' : 'h-9 w-9 text-[0.9375rem]'
          }`}
        >
          {calc.glyph}
        </span>
        <div className="min-w-0 flex-1">
          {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
          <h3
            className={`font-bold tracking-tight text-ink ${
              featured ? 'text-h3 sm:text-lg' : 'text-[0.9375rem]'
            }`}
          >
            {calc.name}
          </h3>
        </div>
      </div>

      <p
        className={`mt-3 flex-1 leading-relaxed text-ink-soft ${
          featured ? 'text-[0.9375rem]' : 'text-[0.8125rem]'
        }`}
      >
        {calc.blurb}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand-600">
        Calculate
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

/** Compact row for dense lists — sidebars, category pages, "my tools". */
export function CalculatorRow({ calc }: { calc: CalcSummary }) {
  return (
    <Link
      href={`/${calc.slug}`}
      className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-line hover:bg-surface-sunken"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface font-mono text-sm text-ink-muted transition group-hover:text-brand-700"
      >
        {calc.glyph}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.875rem] font-semibold text-ink">{calc.name}</span>
        <span className="block truncate text-[0.8125rem] text-ink-muted">{calc.blurb}</span>
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-brand-600"
      >
        →
      </span>
    </Link>
  );
}
