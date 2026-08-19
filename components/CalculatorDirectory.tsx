'use client';

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import { CalculatorCard, type CalcSummary } from './CalculatorCard';

export interface DirectoryCategory {
  id: string;
  label: string;
  short: string;
  items: (CalcSummary & { keywords: string })[];
}

/**
 * The searchable calculator directory.
 *
 * Filtering happens against a pre-built keyword string on each item, so typing
 * "profit" finds the margin calculator even though the word never appears in
 * its name. No index library, no debounce timer — at this size, filtering is
 * instant, and useDeferredValue keeps typing smooth if the list ever grows.
 */
export function CalculatorDirectory({
  categories,
  autoFocus = false,
}: {
  categories: DirectoryCategory[];
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const reported = useRef<string>('');

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Report the search term once it settles, not on every keystroke.
  useEffect(() => {
    const q = deferred.trim();
    if (q.length < 2 || q === reported.current) return;
    const t = window.setTimeout(() => {
      reported.current = q;
      track('calculator_search', { method: 'directory' });
    }, 800);
    return () => window.clearTimeout(t);
  }, [deferred]);

  const tokens = useMemo(
    () => deferred.toLowerCase().trim().split(/\s+/).filter(Boolean),
    [deferred]
  );

  const filtered = useMemo(() => {
    if (tokens.length === 0) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => tokens.every((t) => item.keywords.includes(t))),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, tokens]);

  const total = filtered.reduce((n, c) => n + c.items.length, 0);
  const searching = tokens.length > 0;

  return (
    <div>
      {/* ---- Search ------------------------------------------------- */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-lg text-ink-faint"
        >
          ⌕
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setQuery('');
          }}
          placeholder="Search calculators…"
          aria-label="Search calculators"
          aria-describedby="search-status"
          autoComplete="off"
          className="input h-14 rounded-xl pl-11 pr-4 text-base shadow-card"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[0.8125rem] font-medium text-ink-muted transition hover:bg-surface-sunken hover:text-ink"
          >
            Clear
          </button>
        )}
      </div>

      {/* Announced politely so a screen-reader user hears the result count. */}
      <p id="search-status" role="status" aria-live="polite" className="sr-only">
        {searching ? `${total} calculator${total === 1 ? '' : 's'} match ${deferred}` : ''}
      </p>

      {/* ---- Category jump links ------------------------------------ */}
      {!searching && (
        <nav aria-label="Jump to category" className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a key={cat.id} href={`#cat-${cat.id}`} className="tag-interactive">
              {cat.label}
              <span className="text-ink-faint">{cat.items.length}</span>
            </a>
          ))}
        </nav>
      )}

      {/* ---- Results ------------------------------------------------ */}
      {total === 0 ? (
        <div className="card mt-6 px-6 py-12 text-center">
          <p className="text-[0.9375rem] font-semibold text-ink">
            Nothing matches “{deferred}” yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-[0.875rem] leading-relaxed text-ink-soft">
            Try a metric name like CAC, LTV, ROAS, churn, MRR or margin. If the calculator
            you need is genuinely missing, tell us and it may get built.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setQuery('')} className="btn-secondary btn-sm">
              Clear search
            </button>
            <Link href="/contact" className="btn-ghost btn-sm">
              Request a calculator
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {filtered.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} aria-labelledby={`h-${cat.id}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 id={`h-${cat.id}`} className="text-h2 font-bold tracking-tight text-ink">
                  {cat.label}
                </h2>
                <Link
                  href={`/calculators/${cat.id}`}
                  className="text-[0.8125rem] font-semibold text-brand-600 hover:underline"
                >
                  About this category →
                </Link>
              </div>
              <p className="mt-1 max-w-2xl text-[0.875rem] leading-relaxed text-ink-soft">
                {cat.short}
              </p>

              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((calc) => (
                  <li key={calc.slug}>
                    <CalculatorCard calc={calc} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
