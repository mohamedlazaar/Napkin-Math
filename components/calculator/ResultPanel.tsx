'use client';

import { formatResult } from '@/lib/format';
import { statusLabel, type Insight, type InsightStatus } from '@/lib/insights';
import type { CalculatorResult } from '@/lib/types';

/**
 * The result panel is the most visually dominant element on a calculator page,
 * by design: the number is what the visitor came for.
 *
 * Dark header strip for the headline figure, light body for the supporting
 * grid — the same structure a financial dashboard uses, so it reads as
 * instrumentation rather than as a form output.
 */

const statusStyles: Record<InsightStatus, { badge: string; rail: string; dot: string }> = {
  healthy: { badge: 'badge-healthy', rail: 'border-l-healthy', dot: 'bg-healthy' },
  warning: { badge: 'badge-warning', rail: 'border-l-warning', dot: 'bg-warning' },
  critical: { badge: 'badge-critical', rail: 'border-l-critical', dot: 'bg-critical' },
  neutral: { badge: 'badge-neutral', rail: 'border-l-line-strong', dot: 'bg-ink-faint' },
};

/**
 * Status is never communicated by colour alone: every state carries a written
 * label and a distinct glyph, so it survives colour blindness, greyscale
 * printing and a screen-reader.
 */
const statusGlyph: Record<InsightStatus, string> = {
  healthy: '✓',
  warning: '!',
  critical: '×',
  neutral: 'i',
};

export function ResultPanel({
  primary,
  secondary,
  output,
  status,
  id,
}: {
  primary?: CalculatorResult;
  secondary: CalculatorResult[];
  output: Record<string, number | null>;
  status: InsightStatus;
  id?: string;
}) {
  const s = statusStyles[status];

  return (
    <section
      id={id}
      className="card overflow-hidden"
      aria-label="Your result"
      aria-live="polite"
      aria-atomic="true"
    >
      {primary && (
        <div className="bg-surface-inverse px-5 py-6 text-white sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/55">
              {primary.label}
            </p>
            {status !== 'neutral' && (
              <span
                className={`badge shrink-0 ${
                  status === 'healthy'
                    ? 'bg-healthy/15 text-healthy-line'
                    : status === 'warning'
                      ? 'bg-warning/20 text-warning-line'
                      : 'bg-critical/20 text-critical-line'
                }`}
              >
                <span aria-hidden="true">{statusGlyph[status]}</span>
                {statusLabel[status]}
              </span>
            )}
          </div>

          <p className="mt-2 text-metric font-extrabold tabular-nums">
            {formatResult(output[primary.id], primary.format)}
          </p>

          {primary.help && (
            <p className="mt-2.5 max-w-md text-[0.8125rem] leading-relaxed text-white/60">
              {primary.help}
            </p>
          )}
        </div>
      )}

      {secondary.length > 0 && (
        <div className="border-t border-line">
          <dl className="grid grid-cols-2 divide-x divide-y divide-line">
            {secondary.map((r) => (
              <div key={r.id} className="min-w-0 p-4 sm:p-5">
                <dt className="text-[0.75rem] font-medium leading-snug text-ink-muted">
                  {r.label}
                </dt>
                <dd className="mt-1 truncate text-lg font-bold tabular-nums tracking-tight text-ink">
                  {formatResult(output[r.id], r.format)}
                </dd>
              </div>
            ))}
            {/* Keeps the 2-column grid square when there is an odd count. */}
            {secondary.length % 2 === 1 && (
              <div aria-hidden="true" className="bg-surface-sunken/50" />
            )}
          </dl>
        </div>
      )}
    </section>
  );
}

export function InsightList({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null;

  return (
    <section className="mt-5" aria-labelledby="insights-heading">
      <h2 id="insights-heading" className="text-h3 font-bold tracking-tight text-ink">
        What this means
      </h2>

      <ul className="mt-3 space-y-2.5">
        {insights.map((insight, i) => {
          const s = statusStyles[insight.status];
          return (
            <li key={i} className={`card border-l-[3px] p-4 ${s.rail}`}>
              <div className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold text-white ${s.dot}`}
                >
                  {statusGlyph[insight.status]}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-semibold leading-snug text-ink">
                    <span className="sr-only">{statusLabel[insight.status]}: </span>
                    {insight.title}
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">
                    {insight.body}
                  </p>
                  {insight.benchmark && (
                    <p className="mt-2 border-t border-line pt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                      <span className="font-semibold text-ink-soft">Benchmark context: </span>
                      {insight.benchmark}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        Readings are generated from the numbers you entered. Benchmark ranges are widely
        cited general references, not targets for your business, and nothing here is
        financial advice.
      </p>
    </section>
  );
}
