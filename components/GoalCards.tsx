'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';

export interface GoalCard {
  id: string;
  question: string;
  blurb: string;
  items: { slug: string; name: string }[];
}

/**
 * "What are you trying to figure out?"
 *
 * Most visitors know their business question but not the name of the metric
 * that answers it. Asking for the question rather than the tool is the single
 * biggest usability difference between this and a calculator directory.
 */
export function GoalCards({ goals }: { goals: GoalCard[] }) {
  return (
    <section aria-labelledby="goals-heading">
      <h2 id="goals-heading" className="text-h2 font-bold tracking-tight text-ink">
        What are you trying to figure out?
      </h2>
      <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
        Start from the question rather than the metric. Each one leads to the calculators
        that answer it.
      </p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {goals.map((goal) => (
          <li key={goal.id} className="card flex flex-col p-5">
            <h3 className="text-h3 font-bold tracking-tight text-ink">{goal.question}</h3>
            <p className="mt-1.5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">
              {goal.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {goal.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  onClick={() => track('goal_selected', { goal: goal.id, target: item.slug })}
                  className="tag-interactive"
                >
                  {item.name}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
