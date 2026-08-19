import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Layout';
import { CalculatorCard, toSummary } from '@/components/CalculatorCard';
import { getCalculator } from '@/lib/registry';
import { glossary, getGlossaryTerm, glossaryBySlug } from '@/data/glossary';
import {
  absoluteUrl,
  breadcrumbSchema,
  buildMetadata,
  definedTermSchema,
} from '@/lib/seo';

/**
 * One glossary term per page.
 *
 * These exist to capture "what is X" search intent and hand it straight to the
 * calculator that computes X — the informational half of the funnel feeding
 * the transactional half.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return glossary.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term: slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};

  const name = term.abbr ? `${term.term} (${term.abbr})` : term.term;
  return buildMetadata({
    title: `What Is ${name}?`,
    description: `${term.short} Formula, worked example, why it matters and the mistakes that change the answer.`,
    path: `/glossary/${term.slug}`,
    keywords: [
      `what is ${term.term.toLowerCase()}`,
      `${term.term.toLowerCase()} definition`,
      `${term.term.toLowerCase()} formula`,
      ...(term.abbr ? [`${term.abbr.toLowerCase()} meaning`] : []),
    ],
    type: 'article',
  });
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term: slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const calc = term.calculator ? getCalculator(term.calculator) : undefined;
  const related = term.related
    .map((s) => glossaryBySlug.get(s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary' },
    { name: term.abbr ?? term.term, path: `/glossary/${term.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          definedTermSchema(term),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `What is ${term.term}?`,
            description: term.short,
            url: absoluteUrl(`/glossary/${term.slug}`),
            author: { '@id': absoluteUrl('/#organization') },
            publisher: { '@id': absoluteUrl('/#organization') },
            about: { '@id': absoluteUrl(`/glossary/${term.slug}`) },
          },
        ]}
      />

      <div className="shell py-8 sm:py-10">
        <Breadcrumbs trail={trail} />

        <div className="mt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-12">
          <article className="min-w-0 max-w-content">
            <p className="eyebrow">Glossary</p>
            <h1 className="mt-2 text-h1 font-extrabold tracking-tight text-ink">
              What is {term.term}
              {term.abbr && <span className="text-ink-muted"> ({term.abbr})</span>}?
            </h1>

            <p className="mt-4 text-[1.0625rem] font-medium leading-relaxed text-ink-soft">
              {term.short}
            </p>

            <div className="mt-6 space-y-4">
              {term.definition.map((p) => (
                <p key={p} className="prose-body">
                  {p}
                </p>
              ))}
            </div>

            {/* ---- Formula ------------------------------------------ */}
            <section className="mt-10" aria-labelledby="formula-heading">
              <h2 id="formula-heading" className="text-h2 font-bold tracking-tight text-ink">
                Formula
              </h2>
              <p className="formula mt-3">{term.formula}</p>
              {term.formulaNote && (
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">
                  {term.formulaNote}
                </p>
              )}
            </section>

            {/* ---- Example ------------------------------------------ */}
            <section className="mt-10" aria-labelledby="example-heading">
              <h2 id="example-heading" className="text-h2 font-bold tracking-tight text-ink">
                Worked example
              </h2>
              <p className="mt-3 prose-body">{term.example.setup}</p>
              <ol className="mt-4 space-y-2.5">
                {term.example.steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-[0.6875rem] font-bold text-brand-700"
                    >
                      {i + 1}
                    </span>
                    <span className="font-mono text-[0.8125rem] leading-6 text-ink-soft">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-l-2 border-brand-500 pl-4 prose-body">
                {term.example.result}
              </p>
            </section>

            {/* ---- Why it matters ----------------------------------- */}
            <section className="mt-10" aria-labelledby="why-heading">
              <h2 id="why-heading" className="text-h2 font-bold tracking-tight text-ink">
                Why {term.abbr ?? term.term} matters
              </h2>
              <div className="mt-3 space-y-4">
                {term.whyItMatters.map((p) => (
                  <p key={p} className="prose-body">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* ---- Pitfalls ----------------------------------------- */}
            <section className="mt-10" aria-labelledby="pitfalls-heading">
              <h2 id="pitfalls-heading" className="text-h2 font-bold tracking-tight text-ink">
                Common mistakes
              </h2>
              <ul className="mt-4 space-y-3">
                {term.pitfalls.map((p) => (
                  <li key={p} className="flex gap-3 prose-body">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-critical-soft text-[0.625rem] font-bold text-critical"
                    >
                      ×
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>

            {calc && (
              <section className="mt-10" aria-labelledby="calc-heading">
                <h2 id="calc-heading" className="text-h2 font-bold tracking-tight text-ink">
                  Calculate your {term.abbr ?? term.term.toLowerCase()}
                </h2>
                <p className="mt-2 prose-body">
                  Enter your own numbers and get the result instantly, with a reading of what
                  it means for your business.
                </p>
                <div className="mt-4">
                  <CalculatorCard calc={toSummary(calc)} featured />
                </div>
              </section>
            )}
          </article>

          {/* ---- Sidebar --------------------------------------------- */}
          <aside className="mt-12 lg:mt-0">
            <div className="space-y-6 lg:sticky lg:top-20">
              <div className="card p-5">
                <p className="eyebrow">At a glance</p>
                <dl className="mt-3 space-y-3 text-[0.8125rem]">
                  <div>
                    <dt className="font-semibold text-ink">Also known as</dt>
                    <dd className="mt-0.5 text-ink-soft">{term.abbr ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Formula</dt>
                    <dd className="mt-0.5 font-mono text-[0.75rem] leading-relaxed text-ink-soft">
                      {term.formula}
                    </dd>
                  </div>
                  {calc && (
                    <div>
                      <dt className="font-semibold text-ink">Calculator</dt>
                      <dd className="mt-0.5">
                        <Link
                          href={`/${calc.slug}`}
                          className="font-medium text-brand-700 hover:underline"
                        >
                          {calc.name} →
                        </Link>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {related.length > 0 && (
                <div className="card p-5">
                  <p className="eyebrow">Related terms</p>
                  <ul className="mt-3 space-y-2.5">
                    {related.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/glossary/${t.slug}`}
                          className="text-[0.8125rem] font-semibold text-ink hover:text-brand-700"
                        >
                          {t.abbr ?? t.term}
                        </Link>
                        <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-muted">
                          {t.short}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href="/glossary" className="btn-secondary btn-sm w-full">
                All {glossary.length} definitions
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
