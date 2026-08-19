'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavLink {
  href: string;
  label: string;
  /** Optional second line, used for category rows. */
  hint?: string;
}

/**
 * Mobile navigation.
 *
 * A plain disclosure panel rather than a full-screen overlay: it is faster to
 * dismiss one-handed, it never traps a user behind an animation, and it keeps
 * the page underneath visible so nobody loses their place mid-calculation.
 */
export function MobileMenu({ groups }: { groups: { title: string; links: NavLink[] }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Any navigation closes the menu.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-ink transition hover:bg-surface-sunken"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
          {open ? (
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M2 4.5h12M2 8h12M2 11.5h12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-40 max-h-[70vh] overflow-y-auto border-b border-line bg-surface shadow-raised animate-fade-up"
        >
          <nav aria-label="Mobile" className="shell space-y-5 py-5">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="eyebrow mb-2">{group.title}</p>
                <ul className="space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? 'page' : undefined}
                        className={`-mx-2 block rounded-lg px-2 py-2.5 transition ${
                          pathname === link.href
                            ? 'bg-brand-50 text-brand-700'
                            : 'text-ink hover:bg-surface-sunken'
                        }`}
                      >
                        <span className="block text-[0.9375rem] font-medium">{link.label}</span>
                        {link.hint && (
                          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-muted">
                            {link.hint}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
