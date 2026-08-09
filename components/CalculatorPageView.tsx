import Link from 'next/link';
import { AdSlot } from '@/components/ads/AdSlot';
import { AffiliateCTA } from '@/components/AffiliateCTA';
import { CalculatorWidget } from '@/components/CalculatorWidget';
import { Faq } from '@/components/Faq';
import { Breadcrumbs } from '@/components/Layout';
import { RelatedTools, VariantLinks } from '@/components/RelatedTools';
import { getRelated, getSiblings, resolveDefaults } from '@/lib/registry';
import { variantFaqs, variantH1 } from '@/lib/seo';
import type { CalculatorConfig, CalculatorVariant, WorkedExample } from '@/lib/types';

/**
 * The whole page body for BOTH a calculator page and its programmatic variant
 * pages. Pass a variant and the copy, benchmarks, defaults and worked example
 * swap; pass none and you get the canonical page.
 *
 * This is why adding a calculator never means touching a component.
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

  const related = getRelated(calc);
  const relatedOrSiblings = related.length > 0 ? related : getSiblings(calc);

  const trail = variant
    ? [
        { name: 'Home', path: '/' },
        { name: calc.name, path: `/${calc.slug}` },
        { name: `For ${variant.label}`, path: `/${calc.slug}/${variant.slug}` },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: calc.name, path: `/${calc.slug}` },
      ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Header ad. Above the fold but below the H1's line of sight, and
          height-reserved so it can't push the calculator down. */}
      <AdSlot placement="header" className="mb-6" />

      <div className="lg:flex lg:gap-10">
        <main className="min-w-0 flex-1">
          <Breadcrumbs trail={trail} />

          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{h1}</h1>

          <div className="mt-4 space-y-3">
            {variant ? (
              <p className="text-[17px] leading-relaxed text-ink-soft">{variant.intro}</p>
            ) : (
              calc.intro.map((p) => (
                <p key={p} className="text-[17px] leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))
            )}
          </div>

          <p className="mt-5 rounded-lg bg-slate-100 px-4 py-3 font-mono text-[13px] leading-relaxed text-ink-soft">
            {calc.formulaDisplay}
          </p>

          <div className="mt-6">
            <CalculatorWidget
              formulaId={calc.formulaId}
              fields={calc.fields}
              results={calc.results}
              initialValues={defaults}
            />
          </div>

          {variant && (
            <>
              <section className="mt-10" aria-labelledby="costs-heading">
                <h2 id="costs-heading" className="text-2xl font-bold tracking-tight text-ink">
                  What to include for {variant.audience}
                </h2>
                <ul className="mt-4 space-y-2">
                  {variant.costsToInclude.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold text-ink">
                  {variant.label} benchmarks
                </h2>
                <dl className="mt-3 space-y-3 text-[15px] leading-relaxed">
                  <div>
                    <dt className="font-medium text-ink">Typical range</dt>
                    <dd className="text-ink-soft">{variant.benchmark.typical}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">What good looks like</dt>
                    <dd className="text-ink-soft">{variant.benchmark.good}</dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-relaxed text-ink-muted">
                  {variant.benchmark.note}
                </p>
              </section>
            </>
          )}

          <AdSlot placement="inContent" className="my-10" />

          {/* The 300–500 word explanation. Shared across the calculator and all
              of its variants, which is correct: the underlying method doesn't
              change by industry — the inputs and benchmarks do. */}
          {calc.sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight text-ink">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p} className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
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

          <AffiliateCTA category={calc.category} />

          <AdSlot placement="inContentSecondary" className="my-10" />

          <Faq items={faqs} />

          {variant ? (
            <>
              <div className="mt-10 rounded-lg border border-slate-200 p-4">
                <Link
                  href={`/${calc.slug}`}
                  className="text-[15px] font-medium text-brand-600 hover:underline"
                >
                  ← Back to the general {calc.name}
                </Link>
              </div>
              <VariantLinks calc={calc} currentVariant={variant.slug} />
            </>
          ) : (
            <VariantLinks calc={calc} />
          )}

          <RelatedTools items={relatedOrSiblings} />

          <AdSlot placement="footer" className="mt-10" />
        </main>

        {/* Sidebar: desktop only, so mobile keeps its short DOM and fast LCP. */}
        <aside className="hidden w-[300px] shrink-0 lg:block">
          <div className="sticky top-6 space-y-6">
            <AdSlot placement="sidebar" />
            {relatedOrSiblings.length > 0 && (
              <nav aria-label="More calculators" className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-ink">More calculators</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {relatedOrSiblings.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}`} className="text-ink-soft hover:text-brand-600">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </aside>
      </div>
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
      <h2 id="example-heading" className="text-2xl font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{example.scenario}</p>

      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Example inputs</caption>
          <tbody className="divide-y divide-slate-200">
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

      <ol className="mt-4 space-y-2">
        {example.steps.map((step, i) => (
          <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700">
              {i + 1}
            </span>
            <span className="font-mono text-[13px] leading-6">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-4 border-l-2 border-brand-600 pl-4 text-[15px] leading-relaxed text-ink-soft">
        {example.takeaway}
      </p>
    </section>
  );
}
