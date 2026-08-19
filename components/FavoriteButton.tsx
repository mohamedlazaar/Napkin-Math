'use client';

import { useEffect, useState } from 'react';
import { getFavorites, STORAGE_EVENT, toggleFavorite } from '@/lib/storage';
import { track } from '@/lib/analytics';

/**
 * Local-only favouriting. No account, no sync — the star lives in this browser.
 *
 * Renders in its "off" state during SSR and corrects after mount, because
 * localStorage cannot be read on the server. The button is disabled until then
 * so it can never report the wrong state to a screen reader.
 */
export function FavoriteButton({ slug, name }: { slug: string; name: string }) {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setOn(getFavorites().includes(slug));
    sync();
    setReady(true);
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [slug]);

  const toggle = () => {
    const next = toggleFavorite(slug);
    setOn(next);
    track(next ? 'favorite_added' : 'favorite_removed', { calculator: slug });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      aria-pressed={on}
      className={`btn-sm inline-flex items-center gap-1.5 rounded-lg border transition ${
        on
          ? 'border-brand-200 bg-brand-50 text-brand-700'
          : 'border-line-strong bg-surface text-ink-soft hover:border-ink-faint hover:text-ink'
      }`}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        aria-hidden="true"
        focusable="false"
        fill={on ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <path d="M8 13.5S2.5 10.2 2.5 6.4A3.1 3.1 0 0 1 8 4.6a3.1 3.1 0 0 1 5.5 1.8c0 3.8-5.5 7.1-5.5 7.1Z" />
      </svg>
      {on ? 'Saved' : 'Save'}
      <span className="sr-only"> {name} to my tools</span>
    </button>
  );
}
