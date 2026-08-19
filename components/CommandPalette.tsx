'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchDocs, kindLabel, type SearchDoc } from '@/lib/search';
import { getRecent, type RecentEntry } from '@/lib/storage';
import { track } from '@/lib/analytics';

/**
 * Global search — the ⌘K surface.
 *
 * The index is passed in from a server component, so there is no fetch and no
 * client-side index build. The palette itself only mounts its dialog markup
 * once opened, so a visitor who never presses ⌘K pays for the key listener and
 * nothing else.
 */
/**
 * Fetched once per page load, then reused. Module scope rather than state so
 * closing and reopening the palette does not refetch.
 */
let fullIndexCache: SearchDoc[] | null = null;

async function loadFullIndex(): Promise<SearchDoc[] | null> {
  if (fullIndexCache) return fullIndexCache;
  try {
    const res = await fetch('/search-index.json');
    if (!res.ok) return null;
    const data = (await res.json()) as SearchDoc[];
    if (!Array.isArray(data)) return null;
    fullIndexCache = data;
    return data;
  } catch {
    // Offline or blocked: the palette keeps working on the inline quick index.
    return null;
  }
}

export function CommandPalette({
  index,
  open,
  onClose,
}: {
  index: SearchDoc[];
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [full, setFull] = useState<SearchDoc[] | null>(fullIndexCache);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  // Search the full index once it arrives; until then the inline quick index
  // still covers every calculator and category.
  const searchable = full ?? index;

  // Popular = the first calculators in the index, which the registry already
  // orders by search demand.
  const fallback = useMemo(
    () => index.filter((d) => d.k === 'calculator').slice(0, 6),
    [index]
  );

  const results = useMemo(
    () => (query.trim() ? searchDocs(searchable, query, 8) : fallback),
    [searchable, query, fallback]
  );

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    setRecent(getRecent().slice(0, 3));
    // Pull the long-tail entries (industry pages, glossary) on first open.
    if (!fullIndexCache) void loadFullIndex().then((data) => data && setFull(data));
    // Defer focus past the paint that mounts the input.
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  // Lock the background from scrolling while the dialog owns the screen.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const go = useCallback(
    (doc: SearchDoc) => {
      track('calculator_search', { target: doc.u, method: 'palette' });
      onClose();
      router.push(doc.u);
    },
    [onClose, router]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const doc = results[active];
      if (doc) go(doc);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      // The dialog holds only one focusable control, so keep focus inside it.
      e.preventDefault();
    }
  };

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-i="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const showRecent = !query.trim() && recent.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search Napkin Math"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-pop animate-fade-up"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span aria-hidden="true" className="font-mono text-base text-ink-faint">
            ⌕
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search calculators, metrics, industries…"
            aria-label="Search calculators, metrics and industries"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            role="combobox"
            autoComplete="off"
            spellCheck={false}
            className="h-14 w-full border-0 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-faint focus:ring-0"
          />
          <button
            type="button"
            onClick={onClose}
            className="kbd shrink-0 hover:text-ink"
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        {showRecent && (
          <div className="border-b border-line px-4 py-3">
            <p className="eyebrow mb-2">Recently used</p>
            <div className="flex flex-wrap gap-2">
              {recent.map((r) => (
                <button
                  key={r.path}
                  type="button"
                  onClick={() => {
                    onClose();
                    router.push(r.path);
                  }}
                  className="tag-interactive"
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Search results"
          className="max-h-[min(24rem,50vh)] overflow-y-auto p-2"
        >
          {!query.trim() && (
            <li className="eyebrow px-2 pb-1 pt-2" aria-hidden="true">
              Popular calculators
            </li>
          )}

          {results.map((doc, i) => (
            <li key={doc.u} data-i={i}>
              <button
                type="button"
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => go(doc)}
                className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition ${
                  i === active ? 'bg-brand-50' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-sm ${
                    i === active
                      ? 'border-brand-200 bg-white text-brand-700'
                      : 'border-line bg-surface-sunken text-ink-muted'
                  }`}
                >
                  {doc.g}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-semibold text-ink">
                    {doc.t}
                  </span>
                  <span className="block truncate text-[0.8125rem] text-ink-muted">{doc.d}</span>
                </span>
                <span className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-wide text-ink-faint">
                  {kindLabel[doc.k]}
                </span>
              </button>
            </li>
          ))}

          {results.length === 0 && (
            <li className="px-3 py-8 text-center">
              <p className="text-[0.9375rem] font-medium text-ink">
                Nothing matches “{query}”
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Try a metric name like CAC, ROAS, churn or margin.
              </p>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 border-t border-line bg-surface-sunken px-4 py-2.5 text-[0.6875rem] text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="kbd">↵</span> open
          </span>
          <span className="ml-auto hidden sm:inline">
            {searchable.length} pages indexed
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The header control that opens the palette, plus the global key listener.
 * Split out so the palette's markup only exists in the DOM while it is open.
 */
export function SearchTrigger({ index }: { index: SearchDoc[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // Bare "/" is a search shortcut everywhere except inside a form control.
      if (e.key === '/' && !mod) {
        const el = document.activeElement;
        const typing =
          el instanceof HTMLElement &&
          (el.tagName === 'INPUT' ||
            el.tagName === 'TEXTAREA' ||
            el.tagName === 'SELECT' ||
            el.isContentEditable);
        if (!typing) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search calculators"
        aria-haspopup="dialog"
        className="group flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface px-2.5 text-sm text-ink-muted transition hover:border-ink-faint hover:text-ink sm:w-56 sm:px-3"
      >
        <span aria-hidden="true" className="font-mono text-[0.9375rem] leading-none">
          ⌕
        </span>
        <span className="hidden sm:inline">Search…</span>
        <span className="ml-auto hidden items-center gap-0.5 sm:flex" aria-hidden="true">
          <span className="kbd">⌘</span>
          <span className="kbd">K</span>
        </span>
      </button>

      <CommandPalette index={index} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
