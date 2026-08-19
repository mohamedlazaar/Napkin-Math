'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearRecent, getRecent, STORAGE_EVENT, type RecentEntry } from '@/lib/storage';

/**
 * "Recently used" — the cheapest thing that makes a site feel like a product
 * you have a relationship with rather than a page you landed on.
 *
 * Renders nothing on a first visit (and nothing during SSR), so it never shows
 * an empty state to someone who has no history yet.
 */
export function RecentlyUsed({
  limit = 4,
  heading = 'Recently used',
  showClear = false,
  emptyState,
}: {
  limit?: number;
  heading?: string;
  showClear?: boolean;
  emptyState?: React.ReactNode;
}) {
  const [items, setItems] = useState<RecentEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setItems(getRecent());
    sync();
    setReady(true);
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!ready) return null;
  if (items.length === 0) return emptyState ? <>{emptyState}</> : null;

  return (
    <section aria-labelledby="recent-heading">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="recent-heading" className="text-h2 font-bold tracking-tight text-ink">
          {heading}
        </h2>
        {showClear && (
          <button
            type="button"
            onClick={() => {
              clearRecent();
              setItems([]);
            }}
            className="-mr-1.5 rounded px-1.5 py-1.5 text-[0.8125rem] font-medium text-ink-muted transition hover:text-critical"
          >
            Clear history
          </button>
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {items.slice(0, limit).map((item) => (
          <li key={item.path}>
            <Link href={item.path} className="tag-interactive">
              <span aria-hidden="true" className="font-mono text-ink-faint">
                ↺
              </span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
