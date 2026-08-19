'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  clearAllLocalData,
  getFavorites,
  getRecent,
  STORAGE_EVENT,
  type RecentEntry,
} from '@/lib/storage';
import { CalculatorRow, type CalcSummary } from './CalculatorCard';

/**
 * The local dashboard at /my-tools.
 *
 * Everything shown here was written by this browser and never left it, so the
 * page is genuinely empty for a first-time visitor — and honest about it,
 * rather than faking activity.
 */
export function MyTools({ all }: { all: CalcSummary[] }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setFavorites(getFavorites());
      setRecent(getRecent());
    };
    sync();
    setReady(true);
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const bySlug = new Map(all.map((c) => [c.slug, c]));
  const saved = favorites
    .map((slug) => bySlug.get(slug))
    .filter((c): c is CalcSummary => c !== undefined);

  // Nothing renders until localStorage has been read, so the empty state never
  // flashes for someone who does have saved tools.
  if (!ready) {
    return <div aria-hidden="true" className="h-64" />;
  }

  const empty = saved.length === 0 && recent.length === 0;

  return (
    <div className="mt-8">
      {empty ? (
        <div className="card px-6 py-14 text-center">
          <p className="text-h3 font-bold text-ink">Nothing saved yet</p>
          <p className="mx-auto mt-2 max-w-md prose-body">
            Open any calculator and press <span className="font-semibold text-ink">Save</span> to
            pin it here. Calculators you use are added automatically. All of it stays in this
            browser — there is no account and nothing is uploaded.
          </p>
          <Link href="/calculators" className="btn-primary mt-6">
            Browse calculators
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="saved-heading">
            <h2 id="saved-heading" className="text-h2 font-bold tracking-tight text-ink">
              Saved calculators
            </h2>
            {saved.length === 0 ? (
              <p className="mt-3 rounded-lg border border-dashed border-line-strong px-4 py-8 text-center text-[0.875rem] text-ink-muted">
                None yet — press Save on any calculator.
              </p>
            ) : (
              <ul className="mt-4 -mx-3 space-y-1">
                {saved.map((calc) => (
                  <li key={calc.slug}>
                    <CalculatorRow calc={calc} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="history-heading">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="history-heading" className="text-h2 font-bold tracking-tight text-ink">
                Recently used
              </h2>
              {recent.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    clearAllLocalData();
                    setFavorites([]);
                    setRecent([]);
                  }}
                  className="-mr-1.5 rounded px-1.5 py-1.5 text-[0.8125rem] font-medium text-ink-muted transition hover:text-critical"
                >
                  Clear all local data
                </button>
              )}
            </div>

            {recent.length === 0 ? (
              <p className="mt-3 rounded-lg border border-dashed border-line-strong px-4 py-8 text-center text-[0.875rem] text-ink-muted">
                Calculators you open will appear here.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {recent.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="group flex items-center justify-between gap-3 py-3 transition"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[0.875rem] font-semibold text-ink group-hover:text-brand-700">
                          {item.name}
                        </span>
                        <span className="block truncate text-[0.8125rem] text-ink-muted">
                          {item.path}
                        </span>
                      </span>
                      <time
                        dateTime={new Date(item.at).toISOString()}
                        className="shrink-0 text-[0.75rem] text-ink-faint"
                      >
                        {relativeTime(item.at)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function relativeTime(ts: number): string {
  const seconds = Math.round((Date.now() - ts) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}
