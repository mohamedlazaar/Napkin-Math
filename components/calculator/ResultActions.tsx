'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { buildShareText, canWebShare, copyText } from '@/lib/share';
import { track } from '@/lib/analytics';
import { site } from '@/site.config';

type Feedback = { action: string; message: string } | null;

/**
 * Copy / share / download, in that order — the order matches how often each is
 * actually used. Every action gives explicit feedback, because a silent copy
 * button is indistinguishable from a broken one.
 */
export function ResultActions({
  calculatorName,
  calculatorSlug,
  metricLabel,
  metricValue,
  lines,
  shareUrl,
}: {
  calculatorName: string;
  calculatorSlug: string;
  metricLabel: string;
  metricValue: string;
  lines: { label: string; value: string }[];
  shareUrl: string;
}) {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [webShare, setWebShare] = useState(false);
  const timer = useRef<number>(undefined);

  // Feature-detected after mount so the server and client markup match.
  useEffect(() => setWebShare(canWebShare()), []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const say = useCallback((action: string, message: string) => {
    setFeedback({ action, message });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFeedback(null), 2600);
  }, []);

  const summary = buildShareText({
    title: `${calculatorName} — ${site.name}`,
    lines,
    url: shareUrl,
  });

  const onCopy = async () => {
    const okResult = await copyText(summary);
    track('calculator_copied', { calculator: calculatorSlug });
    say('copy', okResult ? 'Result copied to clipboard' : 'Copy failed — select and copy manually');
  };

  const onShare = async () => {
    if (webShare) {
      try {
        await navigator.share({
          title: `${calculatorName} — ${site.name}`,
          text: summary,
          url: shareUrl,
        });
        track('calculator_shared', { calculator: calculatorSlug, method: 'web-share' });
        return;
      } catch (err) {
        // AbortError just means the user dismissed the sheet — not a failure.
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }
    const okResult = await copyText(shareUrl);
    track('calculator_shared', { calculator: calculatorSlug, method: 'copy-link' });
    say('share', okResult ? 'Link copied — it restores these numbers' : 'Could not copy the link');
  };

  const onDownload = async () => {
    say('download', 'Building your image…');
    // Loaded on demand: the canvas renderer never enters the initial bundle.
    const { downloadResultCard } = await import('./resultCard');
    const okResult = await downloadResultCard(
      {
        calculatorName,
        metricLabel,
        metricValue,
        supporting: lines.filter((l) => l.label !== metricLabel).slice(0, 3),
        siteUrl: site.url.replace(/^https?:\/\//, ''),
        siteName: site.name,
      },
      `${calculatorSlug}-result.png`
    );
    track('calculator_downloaded', { calculator: calculatorSlug });
    say('download', okResult ? 'Image saved' : 'Your browser blocked the download');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onCopy} className="btn-secondary btn-sm">
          <Icon path="M5.5 2.5h5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z M3 4.5v8a1.5 1.5 0 0 0 1.5 1.5H9" />
          Copy result
        </button>

        <button type="button" onClick={onShare} className="btn-secondary btn-sm">
          <Icon path="M8 10.5V2.5 M8 2.5 5 5.5 M8 2.5l3 3 M3 8.5v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4" />
          {webShare ? 'Share' : 'Copy link'}
        </button>

        <button type="button" onClick={onDownload} className="btn-secondary btn-sm">
          <Icon path="M8 2.5v8 M5 7.5l3 3 3-3 M3 12.5h10" />
          Download image
        </button>
      </div>

      {/* Announced to screen readers; the region exists even when empty so the
          announcement is not missed. */}
      <p role="status" aria-live="polite" className="mt-2 min-h-[1.25rem] text-[0.8125rem] text-ink-muted">
        {feedback?.message}
      </p>
    </div>
  );
}

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path.split(' M').map((d, i) => (
        <path key={i} d={i === 0 ? d : `M${d}`} />
      ))}
    </svg>
  );
}
