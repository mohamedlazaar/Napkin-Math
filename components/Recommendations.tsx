'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import type { CalcSummary } from './CalculatorCard';

/**
 * "Continue your analysis" — the single highest-leverage block for pages per
 * visit.
 *
 * The recommendations are contextual, not random: they come from each
 * calculator's own `related` list, which is an editorial judgement about the
 * question a result raises next. Finishing CAC leaves you asking what a
 * customer is worth; finishing ROAS leaves you asking about margin.
 *
 * Client-side purely so the click can be attributed — the links are plain
 * <Link>s and work identically without JavaScript.
 */
export function Recommendations({
  items,
  from,
  heading = 'Continue your analysis',
  intro = 'Your result raises the next question. These are the calculators that answer it.',
}: {
  items: CalcSummary[];
  from: string;
  heading?: string;
  intro?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="continue-heading">
      <h2 id="continue-heading" className="text-h2 font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">{intro}</p>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((calc, i) => (
          <li key={calc.slug}>
            <Link
              href={`/${calc.slug}`}
              onClick={() =>
                track('related_calculator_clicked', { calculator: from, target: calc.slug })
              }
              className="card-interactive group flex h-full items-start gap-3 p-4"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line bg-surface-sunken font-mono text-[0.8125rem] text-ink-muted transition group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-700"
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-semibold text-ink">{calc.name}</span>
                <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-soft">
                  {calc.blurb}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-brand-600">
                  Calculate
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
