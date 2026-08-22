import Link from 'next/link';
import { site } from '@/site.config';
import { Calculator } from '@/components/calculator/Calculator';
import { AffiliateCTA } from '@/components/AffiliateCTA';
import { AdUnit } from '@/components/AdUnit';
import { Faq } from '@/components/Faq';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Breadcrumbs } from '@/components/Layout';
import { Recommendations } from '@/components/Recommendations';
import { VariantLinks } from '@/components/RelatedTools';
import { toSummaries } from '@/components/CalculatorCard';
import { getRecommendations, resolveDefaults } from '@/lib/registry';
import { categoryOf } from '@/lib/taxonomy';
import { getGlossaryForCalculator } from '@/data/glossary';
import { variantFaqs, variantH1 } from '@/lib/seo';
import type { CalculatorConfig, CalculatorVariant, WorkedExample } from '@/lib/types';

/**
 * The whole page body for BOTH a calculator page and its industry variant
 * pages. Pass a variant and the copy, benchmarks, defaults and worked example
 * swap; pass none and you get the canonical page.
 *
 * ORDER IS THE PRODUCT DECISION HERE. Breadcrumbs, H1, two sentences, then the
 * calculator — nothing else above the fold. Someone arriving from a search for
 * "cac calculator" wants to calculate, not to read; the article earns its place
 * below the tool, where the people who want it will scroll to find it.
 */
export function CalculatorPageView({
  calc,
  variant,
}: {
  calc: CalculatorConfig;
  variant?: CalculatorVariant;
}) {
  const h1 = variant ? variantH1(calc, variant) : calc.h1;
  const faqs = variant ? variantFaqs(calc, variant) : calc.faqs;
  const example = variant ? variant.example : calc.workedExample;
  const defaults = resolveDefaults(calc, variant);
  const path = variant ? `/${calc.slug}/${variant.slug}` : `/${calc.slug}`;

  const category = categoryOf(calc.slug);
  const recommendations = getRecommendations(calc, 4);
  const terms = getGlossaryForCalculator(calc.slug);
  const definition = terms[0];

  const trail = [
    { name: 'Home', path: '/' },
    ...(category
      ? [{ name: category.label, path: `/calculators/${category.id}` }]
      : [{ name: 'Calculators', path: '/calculators' }]),
    { name: calc.name, path: `/${calc.slug}` },
    ...(variant ? [{ name: `For ${variant.label}`, path }] : []),
  ];

  return (
    <div className="shell py-6 sm:py-8">
      <Breadcrumbs trail={trail} />

      {/* ---- Above the fold: heading, two sentences, calculator ------ */}
      {/* The heading block and the Save control share a row so the button sits
          at the top right of the content area rather than wrapping under a
          two-line H1. */}
      <header className="mt-4 flex items-start justify-between gap-6">
        <div className="max-w-3xl">
          <h1 className="text-h1 font-extrabold tracking-tight text-ink">{h1}</h1>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            {variant ? variant.intro : calc.intro[0]}
          </p>
        </div>
        <div className="shrink-0">
          <FavoriteButton slug={calc.slug} name={calc.name} />
        </div>
      </header>

      <div className="mt-6">
        <Calculator
          slug={calc.slug}
          name={calc.name}
          path={path}
          formulaId={calc.formulaId}
          formulaDisplay={calc.formulaDisplay}
          fields={calc.fields}
          results={calc.results}
          initialValues={defaults}
          variant={variant?.label}
        />
      </div>

      {/* ---- Everything below is reading material -------------------- */}
      <div className="mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] lg:gap-12">
        <div className="min-w-0 max-w-content">
          {/* calc.intro[1] is deliberately NOT rendered. It is the same
              "Enter your figures below…" sentence on all eight calculators —
              boilerplate that would be duplicated across 61 pages, and that
              reads wrong now the calculator sits above the article rather than
              below it. The privacy half of it lives under the inputs instead,
              where it is actually reassuring. */}
          {variant && (
            <>
              <section aria-labelledby="costs-heading">
                <h2
                  id="costs-heading"
                  className="text-h2 font-bold tracking-tight text-ink"
                >
                  What to include for {variant.audience}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {variant.costsToInclude.map((c) => (
                    <li key={c} className="flex gap-2.5 prose-body">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-8 card p-5">
                <h2 className="text-h3 font-bold text-ink">{variant.label} benchmarks</h2>
                <dl className="mt-3 space-y-3">
                  <div>
                    <dt className="text-[0.8125rem] font-semibold uppercase tracking-wide text-ink-muted">
                      Typical range
                    </dt>
                    <dd className="mt-0.5 prose-body">{variant.benchmark.typical}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-semibold uppercase tracking-wide text-ink-muted">
                      What good looks like
                    </dt>
                    <dd className="mt-0.5 prose-body">{variant.benchmark.good}</dd>
                  </div>
                </dl>
                <p className="mt-4 border-t border-line pt-3 text-[0.875rem] leading-relaxed text-ink-muted">
                  {variant.benchmark.note}
                </p>
              </section>
            </>
          )}

          {/* The method. Shared across a calculator and all its variants,
              which is correct: the maths does not change by industry — the
              inputs and benchmarks do. */}
          {calc.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-h2 font-bold tracking-tight text-ink">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p} className="mt-3 prose-body">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 prose-body">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <WorkedExampleBlock
            example={example}
            heading={variant ? `Worked example: ${variant.label}` : 'Worked example'}
          />

          {definition && definition.pitfalls.length > 0 && (
            <section className="mt-10" aria-labelledby="mistakes-heading">
              <h2 id="mistakes-heading" className="text-h2 font-bold tracking-tight text-ink">
                Common mistakes
              </h2>
              <p className="mt-2 prose-body">
                Each of these changes the answer, usually in the flattering direction.
              </p>
              <ul className="mt-4 space-y-3">
                {definition.pitfalls.map((p) => (
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
              <p className="mt-4 text-[0.875rem] text-ink-muted">
                Full definition and formula:{' '}
                <Link
                  href={`/glossary/${definition.slug}`}
                  className="font-medium text-brand-700 underline"
                >
                  {definition.term}
                </Link>
              </p>
            </section>
          )}

          <AffiliateCTA category={calc.category} />

          {/* The single manual ad slot: after the article, before the FAQ.
              Never beside an input, never between inputs and result. */}
          <AdUnit
            slot={site.ads.slots.articleEnd}
            format="in-article"
            className="mt-10"
          />

          <Faq items={faqs} />
        </div>

        {/* ---- Sidebar: desktop only, so mobile keeps a short DOM ----- */}
        <aside className="mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-20 space-y-6">
            <nav aria-labelledby="onthispage" className="card p-5">
              <p id="onthispage" className="eyebrow">
                On this page
              </p>
              <ul className="mt-3 space-y-2 text-[0.8125rem]">
                <li>
                  <a href="#result" className="text-ink-soft hover:text-brand-700">
                    Your result
                  </a>
                </li>
                {calc.sections.slice(0, 3).map((s) => (
                  <li key={s.heading}>
                    <span className="text-ink-soft">{s.heading}</span>
                  </li>
                ))}
                <li>
                  <span className="text-ink-soft">Worked example</span>
                </li>
                <li>
                  <span className="text-ink-soft">FAQ</span>
                </li>
              </ul>
            </nav>

            {terms.length > 0 && (
              <div className="card p-5">
                <p className="eyebrow">Definitions</p>
                <ul className="mt-3 space-y-2">
                  {terms.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/glossary/${t.slug}`}
                        className="text-[0.8125rem] font-medium text-brand-700 hover:underline"
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

            {category && (
              <div className="card p-5">
                <p className="eyebrow">Category</p>
                <Link
                  href={`/calculators/${category.id}`}
                  className="mt-2 block text-[0.9375rem] font-semibold text-ink hover:text-brand-700"
                >
                  {category.label}
                </Link>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-muted">
                  {category.short}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <Recommendations items={toSummaries(recommendations)} from={calc.slug} />

      <VariantLinks calc={calc} currentVariant={variant?.slug} />

      {variant && (
        <p className="mt-8 text-[0.9375rem]">
          <Link href={`/${calc.slug}`} className="font-semibold text-brand-600 hover:underline">
            ← Back to the general {calc.name}
          </Link>
        </p>
      )}
    </div>
  );
}

function WorkedExampleBlock({
  example,
  heading,
}: {
  example: WorkedExample;
  heading: string;
}) {
  return (
    <section className="mt-10" aria-labelledby="example-heading">
      <h2 id="example-heading" className="text-h2 font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <p className="mt-3 prose-body">{example.scenario}</p>

      <div className="scroll-x mt-4">
        <table className="w-full min-w-[20rem] overflow-hidden rounded-lg border border-line text-left text-sm">
          <caption className="sr-only">Example inputs</caption>
          <tbody className="divide-y divide-line">
            {example.inputs.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="px-4 py-2.5 font-medium text-ink-soft">
                  {row.label}
                </th>
                <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-ink">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="mt-4 space-y-2.5">
        {example.steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-[0.6875rem] font-bold text-brand-700"
            >
              {i + 1}
            </span>
            <span className="font-mono text-[0.8125rem] leading-6 text-ink-soft">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-5 border-l-2 border-brand-500 pl-4 prose-body">{example.takeaway}</p>
    </section>
  );
}
