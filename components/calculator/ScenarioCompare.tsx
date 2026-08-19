'use client';

import { useEffect, useState } from 'react';
import { compute } from '@/lib/formulas';
import { formatResult } from '@/lib/format';
import {
  deleteScenario,
  getScenarios,
  saveScenario,
  SCENARIO_MAX,
  STORAGE_EVENT,
  type Scenario,
} from '@/lib/storage';
import { track } from '@/lib/analytics';
import type { CalculatorResult } from '@/lib/types';

/**
 * SCENARIO COMPARISON.
 *
 * Turns a one-shot calculator into something you can experiment with: save the
 * current numbers, change an input, save again, and see the two side by side.
 *
 * Scenarios are recomputed from their stored INPUTS rather than storing the
 * results. That matters — a scenario saved before a formula fix would
 * otherwise keep showing a stale answer forever.
 *
 * Storage is local to the browser, capped at three, and requires no account.
 */
export function ScenarioCompare({
  calculatorSlug,
  formulaId,
  results,
  currentValues,
  labelSuggestion,
}: {
  calculatorSlug: string;
  formulaId: string;
  results: CalculatorResult[];
  currentValues: Record<string, number>;
  labelSuggestion: string;
}) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [ready, setReady] = useState(false);

  // Read after mount only: localStorage does not exist during SSR, and reading
  // it in render would produce a hydration mismatch.
  useEffect(() => {
    setScenarios(getScenarios(calculatorSlug));
    setReady(true);

    const sync = () => setScenarios(getScenarios(calculatorSlug));
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [calculatorSlug]);

  const add = () => {
    const letter = String.fromCharCode(65 + scenarios.length); // A, B, C
    const next = saveScenario(calculatorSlug, {
      id: `${Date.now()}`,
      label: scenarios.length === 0 ? labelSuggestion : `Scenario ${letter}`,
      values: currentValues,
      at: Date.now(),
    });
    setScenarios(next);
    track('scenario_saved', { calculator: calculatorSlug });
    if (next.length > 1) track('scenario_compared', { calculator: calculatorSlug });
  };

  const remove = (id: string) => setScenarios(deleteScenario(calculatorSlug, id));

  if (!ready) return null;

  const primary = results.find((r) => r.primary) ?? results[0];
  // Three columns keeps the table readable at 375px inside its scroll box.
  const shown = [primary, ...results.filter((r) => r.id !== primary?.id)]
    .filter(Boolean)
    .slice(0, 3) as CalculatorResult[];

  const rows = scenarios.map((s) => ({
    scenario: s,
    output: compute(formulaId, s.values),
  }));

  // Only pick a winner when the data says which direction is an improvement.
  let winnerId: string | null = null;
  if (primary?.betterWhen && rows.length > 1) {
    const scored = rows
      .map((r) => ({ id: r.scenario.id, v: r.output[primary.id] }))
      .filter((r): r is { id: string; v: number } => typeof r.v === 'number' && Number.isFinite(r.v));
    if (scored.length > 1) {
      const best = scored.reduce((a, b) =>
        primary.betterWhen === 'lower' ? (b.v < a.v ? b : a) : b.v > a.v ? b : a
      );
      // A tie has no winner.
      if (scored.filter((r) => r.v === best.v).length === 1) winnerId = best.id;
    }
  }

  return (
    <section className="mt-5" aria-labelledby="scenarios-heading">
      <div className="card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id="scenarios-heading" className="text-h3 font-bold tracking-tight text-ink">
              Compare scenarios
            </h2>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-muted">
              Save these numbers, change an input, then save again to see the difference.
              Stored in this browser only.
            </p>
          </div>
          <button
            type="button"
            onClick={add}
            disabled={scenarios.length >= SCENARIO_MAX}
            className="btn-secondary btn-sm"
          >
            <span aria-hidden="true">+</span>
            {scenarios.length === 0 ? 'Save this scenario' : 'Add scenario'}
          </button>
        </div>

        {scenarios.length >= SCENARIO_MAX && (
          <p className="mt-2 text-[0.8125rem] text-ink-muted">
            Three saved — remove one to add another.
          </p>
        )}

        {scenarios.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line-strong px-4 py-6 text-center text-[0.875rem] text-ink-muted">
            No saved scenarios yet.
          </p>
        ) : (
          <div className="scroll-x mt-4">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <caption className="sr-only">
                Saved scenarios compared across {shown.map((r) => r.label).join(', ')}
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="pb-2 pr-3 text-[0.75rem] font-semibold text-ink-muted">
                    Scenario
                  </th>
                  {shown.map((r) => (
                    <th
                      key={r.id}
                      scope="col"
                      className="pb-2 pr-3 text-right text-[0.75rem] font-semibold text-ink-muted"
                    >
                      {r.label}
                    </th>
                  ))}
                  <th scope="col" className="pb-2">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map(({ scenario, output }) => (
                  <tr key={scenario.id}>
                    <th scope="row" className="py-3 pr-3 text-[0.875rem] font-semibold text-ink">
                      <span className="flex items-center gap-2">
                        {scenario.label}
                        {winnerId === scenario.id && (
                          <span className="badge-healthy">
                            <span aria-hidden="true">✓</span> Best
                          </span>
                        )}
                      </span>
                    </th>
                    {shown.map((r) => (
                      <td
                        key={r.id}
                        className={`py-3 pr-3 text-right text-[0.875rem] tabular-nums ${
                          r.id === primary?.id ? 'font-bold text-ink' : 'text-ink-soft'
                        }`}
                      >
                        {formatResult(output[r.id], r.format)}
                      </td>
                    ))}
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => remove(scenario.id)}
                        className="rounded px-1.5 py-1 text-[0.75rem] font-medium text-ink-muted transition hover:text-critical"
                      >
                        Remove
                        <span className="sr-only"> scenario {scenario.label}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {rows.length > 1 && !primary?.betterWhen && (
          <p className="mt-3 text-xs text-ink-muted">
            Shown side by side without a winner — for this metric, whether higher or lower
            is better depends on your situation.
          </p>
        )}
      </div>
    </section>
  );
}
