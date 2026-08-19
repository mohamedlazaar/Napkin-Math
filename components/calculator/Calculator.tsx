'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { compute } from '@/lib/formulas';
import { formatResult } from '@/lib/format';
import { getInsights, overallStatus } from '@/lib/insights';
import { buildShareUrl, decodeValues, encodeValues } from '@/lib/share';
import { pushRecent } from '@/lib/storage';
import { track, trackOnce } from '@/lib/analytics';
import type { CalculatorField, CalculatorResult } from '@/lib/types';
import { InsightList, ResultPanel } from './ResultPanel';
import { ResultActions } from './ResultActions';
import { ScenarioCompare } from './ScenarioCompare';

/**
 * THE CALCULATOR.
 *
 * One generic client component renders every tool on the site, so the browser
 * downloads it once and reuses it everywhere. It receives only plain
 * serialisable data — never a calculator config object, which carries all the
 * page copy and would double the payload for nothing.
 *
 * Layout: inputs left, results right, both above the fold on desktop. On
 * mobile the order is inputs → results, with a sticky summary bar so the
 * headline number is always reachable while typing.
 *
 * There is no "Calculate" button because there is no calculation step —
 * results update as you type. The sticky bar is what a submit button would
 * have been, without the round trip.
 */

interface Props {
  slug: string;
  name: string;
  /** Full path of the current page, e.g. /cac-calculator/for-saas */
  path: string;
  formulaId: string;
  formulaDisplay: string;
  fields: CalculatorField[];
  results: CalculatorResult[];
  initialValues: Record<string, number>;
  /** Present on industry variant pages; used for analytics and scenario labels. */
  variant?: string;
}

export function Calculator({
  slug,
  name,
  path,
  formulaId,
  formulaDisplay,
  fields,
  results,
  initialValues,
  variant,
}: Props) {
  // Held as strings so a field can be cleared without snapping back to 0.
  const [raw, setRaw] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.id, String(initialValues[f.id] ?? '')]))
  );
  const [shareUrl, setShareUrl] = useState('');
  const [showBar, setShowBar] = useState(false);
  const uid = useId();
  const resultRef = useRef<HTMLDivElement>(null);
  const urlTimer = useRef<number>(undefined);

  /* ---- URL restore -------------------------------------------------
   * Read on mount rather than through useSearchParams(), which would opt
   * these pages out of static rendering. */
  useEffect(() => {
    const fromUrl = decodeValues(window.location.search, fields);
    if (Object.keys(fromUrl).length > 0) {
      setRaw((prev) => {
        const next = { ...prev };
        for (const [k, v] of Object.entries(fromUrl)) next[k] = String(v);
        return next;
      });
      track('calculator_view', { calculator: slug, method: 'shared-link' });
    } else {
      track('calculator_view', { calculator: slug, ...(variant ? { variant } : {}) });
    }
    pushRecent({ slug, path, name });
    // Intentionally mount-only: re-running would fight the user's typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Parse + compute --------------------------------------------- */
  const values = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of fields) {
      const n = parseFloat(raw[f.id]);
      out[f.id] = Number.isFinite(n) ? n : 0;
    }
    return out;
  }, [raw, fields]);

  const output = useMemo(() => compute(formulaId, values), [formulaId, values]);
  const insights = useMemo(
    () => getInsights(formulaId, values, output),
    [formulaId, values, output]
  );
  const status = useMemo(() => overallStatus(insights), [insights]);

  /* ---- Per-field validation ----------------------------------------
   * Only ever complains about a value the user actually typed. An empty
   * field is treated as "not filled in yet", not as an error. */
  const errors = useMemo(() => {
    const out: Record<string, string> = {};
    for (const f of fields) {
      const text = (raw[f.id] ?? '').trim();
      if (text === '') continue;
      const n = Number(text);
      if (!Number.isFinite(n)) out[f.id] = 'Enter a number.';
      else if (f.min !== undefined && n < f.min) out[f.id] = `Cannot be less than ${f.min}.`;
      else if (f.max !== undefined && n > f.max) out[f.id] = `Cannot be more than ${f.max}.`;
    }
    return out;
  }, [raw, fields]);

  /* ---- Share URL, kept in sync with the inputs ---------------------- */
  useEffect(() => {
    const query = encodeValues(values, initialValues, fields);
    setShareUrl(buildShareUrl(window.location.origin, path, query));

    // Debounced so a burst of keystrokes writes history once, and via
    // replaceState so the back button still leaves the page.
    window.clearTimeout(urlTimer.current);
    urlTimer.current = window.setTimeout(() => {
      const url = query ? `${path}?${query}` : path;
      window.history.replaceState(null, '', url);
    }, 400);
    return () => window.clearTimeout(urlTimer.current);
  }, [values, initialValues, fields, path]);

  /* ---- Mobile sticky summary --------------------------------------- */
  useEffect(() => {
    const el = resultRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top > 0),
      { rootMargin: '-64px 0px 0px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const primary = results.find((r) => r.primary) ?? results[0];
  const secondary = results.filter((r) => r.id !== primary?.id);
  const required = fields.filter((f) => !f.optional);
  const optional = fields.filter((f) => f.optional);

  const onChange = (id: string, next: string) => {
    setRaw((prev) => ({ ...prev, [id]: next }));
    trackOnce(`${slug}:started`, 'calculator_started', { calculator: slug });
  };

  // "Completed" means the primary result actually resolved to a number —
  // i.e. the inputs were sufficient — not merely that the page was opened.
  useEffect(() => {
    const v = primary ? output[primary.id] : null;
    if (typeof v === 'number' && Number.isFinite(v)) {
      trackOnce(`${slug}:completed`, 'calculator_completed', { calculator: slug });
    }
  }, [output, primary, slug]);

  const reset = useCallback(() => {
    setRaw(Object.fromEntries(fields.map((f) => [f.id, String(initialValues[f.id] ?? '')])));
    window.history.replaceState(null, '', path);
  }, [fields, initialValues, path]);

  const copyLines = [
    ...(primary
      ? [{ label: primary.label, value: formatResult(output[primary.id], primary.format) }]
      : []),
    ...secondary.map((r) => ({
      label: r.label,
      value: formatResult(output[r.id], r.format),
    })),
  ];

  const renderField = (f: CalculatorField) => {
    const id = `${uid}-${f.id}`;
    const helpId = f.help ? `${id}-help` : undefined;
    const errId = errors[f.id] ? `${id}-err` : undefined;
    const describedBy = [helpId, errId].filter(Boolean).join(' ') || undefined;

    return (
      <div key={f.id}>
        <label htmlFor={id} className="label">
          {f.label}
        </label>
        <div className="relative mt-1.5">
          {f.type === 'currency' && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[0.9375rem] text-ink-muted"
            >
              $
            </span>
          )}
          <input
            id={id}
            name={f.id}
            type="number"
            // Numeric keypad with a decimal point on iOS and Android.
            inputMode="decimal"
            value={raw[f.id] ?? ''}
            min={f.min}
            max={f.max}
            step={f.step}
            aria-describedby={describedBy}
            aria-invalid={errors[f.id] ? true : undefined}
            onChange={(e) => onChange(f.id, e.target.value)}
            className={`input ${f.type === 'currency' ? 'pl-7' : ''} ${
              f.type === 'percent' ? 'pr-9' : ''
            } ${errors[f.id] ? 'input-invalid' : ''}`}
          />
          {f.type === 'percent' && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[0.9375rem] text-ink-muted"
            >
              %
            </span>
          )}
        </div>

        {f.help && (
          <p id={helpId} className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-muted">
            {f.help}
          </p>
        )}
        {errors[f.id] && (
          <p id={errId} role="alert" className="mt-1.5 text-[0.8125rem] font-medium text-critical">
            {errors[f.id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      {/* No `items-start` here on purpose: the results column must STRETCH to
          the height of the inputs column, otherwise the sticky panel inside it
          has zero room to travel and simply scrolls away. */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        {/* ---- Inputs ------------------------------------------------ */}
        <form
          className="card p-5 sm:p-6"
          onSubmit={(e) => e.preventDefault()}
          aria-label={`${name} inputs`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-h3 font-bold tracking-tight text-ink">Your numbers</h2>
            <button
              type="button"
              onClick={reset}
              // px/py keep this above the 24×24 minimum target size (WCAG 2.5.8);
              // it is a standalone control, so the inline-link exemption does
              // not apply to it.
              className="-mr-1.5 rounded px-1.5 py-1.5 text-[0.8125rem] font-medium text-brand-600 underline-offset-2 hover:underline"
            >
              Reset
            </button>
          </div>

          <div className="mt-4 space-y-4">{required.map(renderField)}</div>

          {optional.length > 0 && (
            <fieldset className="mt-5 space-y-4 rounded-lg border border-line bg-surface-sunken p-4">
              <legend className="eyebrow px-1">Optional — unlocks more results</legend>
              {optional.map(renderField)}
            </fieldset>
          )}

          <div className="mt-5 space-y-2 border-t border-line pt-4">
            <p className="text-[0.8125rem] leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink-soft">Formula: </span>
              <span className="font-mono">{formulaDisplay}</span>
            </p>
            <p className="flex items-start gap-1.5 text-[0.8125rem] leading-relaxed text-ink-muted">
              <span aria-hidden="true" className="mt-[0.15em] text-healthy">
                ✓
              </span>
              These numbers stay in your browser. Nothing is uploaded or stored.
            </p>
          </div>
        </form>

        {/* ---- Results -----------------------------------------------
            Two elements on purpose. The outer div is the grid item and
            stretches to the height of the inputs column; the inner one is the
            sticky element. A sticky element that IS the grid item has no room
            to travel, because its own height fills its containing block. */}
        <div>
          <div ref={resultRef} className="lg:sticky lg:top-20">
            <ResultPanel
              id="result"
              primary={primary}
              secondary={secondary}
              output={output}
              status={status}
            />

            <div className="mt-3">
              <ResultActions
                calculatorName={name}
                calculatorSlug={slug}
                metricLabel={primary?.label ?? 'Result'}
                metricValue={primary ? formatResult(output[primary.id], primary.format) : '—'}
                lines={copyLines}
                shareUrl={shareUrl}
              />
            </div>
          </div>
        </div>
      </div>

      <InsightList insights={insights} />

      <ScenarioCompare
        calculatorSlug={slug}
        formulaId={formulaId}
        results={results}
        currentValues={values}
        labelSuggestion={variant ? `Current (${variant})` : 'Current'}
      />

      {/* ---- Mobile sticky summary ---------------------------------- */}
      {primary && (
        <div
          className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 backdrop-blur-md transition-transform duration-200 lg:hidden ${
            showBar ? 'translate-y-0' : 'pointer-events-none translate-y-full'
          }`}
          aria-hidden={!showBar}
        >
          <div className="shell flex items-center gap-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">
                {primary.label}
              </p>
              <p className="truncate text-xl font-bold tabular-nums tracking-tight text-ink">
                {formatResult(output[primary.id], primary.format)}
              </p>
            </div>
            <a href="#result" className="btn-primary btn-sm" tabIndex={showBar ? 0 : -1}>
              See full result
            </a>
          </div>
        </div>
      )}
      {/* Reserves space so the bar never covers the last line of the page. */}
      <div aria-hidden="true" className="h-16 lg:hidden" />
    </>
  );
}
