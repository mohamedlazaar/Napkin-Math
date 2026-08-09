'use client';

import { useMemo, useState, useId } from 'react';
import { compute } from '@/lib/formulas';
import { formatResult } from '@/lib/format';
import type { CalculatorField, CalculatorResult } from '@/lib/types';

/**
 * The one interactive component on the site.
 *
 * It is generic: every calculator renders through this, so the browser
 * downloads it once and reuses it across all pages. It receives only plain
 * serialisable data — never the calculator config object, which carries all
 * the page copy and would double the payload for no reason.
 */
export function CalculatorWidget({
  formulaId,
  fields,
  results,
  initialValues,
}: {
  formulaId: string;
  fields: CalculatorField[];
  results: CalculatorResult[];
  initialValues: Record<string, number>;
}) {
  // Held as strings so the user can clear a field without it snapping to 0.
  const [raw, setRaw] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.id, String(initialValues[f.id] ?? '')]))
  );
  const uid = useId();

  const values = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of fields) {
      const n = parseFloat(raw[f.id]);
      out[f.id] = Number.isFinite(n) ? n : 0;
    }
    return out;
  }, [raw, fields]);

  const output = useMemo(() => compute(formulaId, values), [formulaId, values]);

  const primary = results.find((r) => r.primary) ?? results[0];
  const secondary = results.filter((r) => r.id !== primary?.id);

  const required = fields.filter((f) => !f.optional);
  const optional = fields.filter((f) => f.optional);

  const reset = () =>
    setRaw(Object.fromEntries(fields.map((f) => [f.id, String(initialValues[f.id] ?? '')])));

  const renderField = (f: CalculatorField) => {
    const id = `${uid}-${f.id}`;
    const helpId = f.help ? `${id}-help` : undefined;
    return (
      <div key={f.id}>
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {f.label}
        </label>
        <div className="relative mt-1.5">
          {f.type === 'currency' && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
              $
            </span>
          )}
          <input
            id={id}
            name={f.id}
            type="number"
            inputMode="decimal"
            value={raw[f.id]}
            min={f.min}
            max={f.max}
            step={f.step}
            aria-describedby={helpId}
            onChange={(e) => setRaw((prev) => ({ ...prev, [f.id]: e.target.value }))}
            className={`h-11 w-full rounded-lg border border-slate-300 bg-white text-[15px] text-ink shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 ${
              f.type === 'currency' ? 'pl-7 pr-3' : 'px-3'
            } ${f.type === 'percent' ? 'pr-8' : ''}`}
          />
          {f.type === 'percent' && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
              %
            </span>
          )}
        </div>
        {f.help && (
          <p id={helpId} className="mt-1 text-xs leading-relaxed text-ink-muted">
            {f.help}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-5">
      {/* Inputs */}
      <form
        className="space-y-4 lg:col-span-3"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Calculator inputs"
      >
        {required.map(renderField)}

        {optional.length > 0 && (
          <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Optional
            </legend>
            {optional.map(renderField)}
          </fieldset>
        )}

        <button
          type="button"
          onClick={reset}
          className="text-sm font-medium text-brand-600 underline-offset-2 hover:underline"
        >
          Reset to example values
        </button>
      </form>

      {/* Results — updates live, no submit button, no round trip. */}
      <div className="lg:col-span-2">
        <div
          className="sticky top-4 rounded-lg bg-ink p-5 text-white"
          aria-live="polite"
          aria-atomic="true"
        >
          {primary && (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-300">
                {primary.label}
              </p>
              <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight">
                {formatResult(output[primary.id], primary.format)}
              </p>
              {primary.help && (
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{primary.help}</p>
              )}
            </>
          )}

          {secondary.length > 0 && (
            <dl className="mt-5 space-y-3 border-t border-white/10 pt-4">
              {secondary.map((r) => (
                <div key={r.id} className="flex items-baseline justify-between gap-3">
                  <dt className="text-sm text-slate-300">{r.label}</dt>
                  <dd className="text-sm font-semibold tabular-nums">
                    {formatResult(output[r.id], r.format)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
