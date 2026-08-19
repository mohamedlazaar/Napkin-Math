'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/site.config';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A single, deliberately-placed AdSense unit.
 *
 * PLACEMENT RULES — these are product decisions, not styling preferences:
 *
 *   1. Never beside or above a calculator input. A misclick while someone is
 *      typing their revenue figures is worth less than the trust it costs, and
 *      accidental clicks are exactly what gets an AdSense account restricted.
 *   2. Never between the inputs and the result. That path is the product.
 *   3. Only below content the visitor has finished reading, with a clear
 *      separator and a labelled "Advertisement" so it can never be mistaken
 *      for a result or a recommendation.
 *   4. At most one per page in addition to whatever Auto ads places.
 *
 * Renders nothing at all when the slot id is unset in site.config.ts, so the
 * site never ships an empty grey placeholder box.
 */
export function AdUnit({
  slot,
  className = '',
  label = 'Advertisement',
}: {
  slot: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    // React 18+ mounts effects twice in dev StrictMode; pushing the same slot
    // twice makes AdSense throw "already have ads in them".
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* Ad blockers and offline dev both land here. Never surface it. */
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside
      className={`border-t border-line pt-4 ${className}`}
      aria-label={label}
      // Keeps the unit out of Google's snippet extraction for the page.
      data-nosnippet
    >
      <p className="eyebrow mb-2 text-ink-faint">{label}</p>
      {/* Reserved height: the box occupies the same space before and after the
          ad fills, so a late-loading ad cannot shift the content above it. */}
      <div className="min-h-[280px] sm:min-h-[250px]">
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={site.ads.client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
