import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Layout';
import { getGlossaryAlphabetical } from '@/data/glossary';
import { getCalculator } from '@/lib/registry';
import { absoluteUrl, breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { site } from '@/site.config';

export const metadata: Metadata = buildMetadata({
  title: 'Business Metrics Glossary',
  description:
    'Plain-English definitions of the business metrics that matter: CAC, LTV, LTV:CAC, ROAS, MRR, ARR, churn, NRR, gross margin, contribution margin and payback period. Each with a formula, worked example and calculator.',
  path: '/glossary',
  keywords: [
    'business metrics glossary',
    'saas metrics definitions',
    'what is cac',
    'what is ltv',
    'marketing metrics explained',
  ],
});

export default function GlossaryPage() {
  const terms = getGlossaryAlphabetical();
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary' },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            '@id': absoluteUrl('/glossary'),
            name: `${site.name} business metrics glossary`,
            description:
              'Definitions, formulas and worked examples for the business and SaaS metrics that drive growth decisions.',
            url: absoluteUrl('/glossary'),
            hasDefinedTerm: terms.map((t) => ({
              '@type': 'DefinedTerm',
              name: t.term,
              alternateName: t.abbr,
              description: t.short,
              url: absoluteUrl(`/glossary/${t.slug}`),
            })),
          },
        ]}
      />

      <div className="shell py-8 sm:py-10">
        <Breadcrumbs trail={trail} />

        <header className="mt-5 max-w-3xl">
          <h1 className="text-h1 font-extrabold tracking-tight text-ink">
            Business metrics glossary
          </h1>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            {terms.length} metrics explained in plain English — what each one means, the
            formula, a worked example with real numbers, why it matters, and the mistakes
            that quietly change the answer.
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((term) => {
            const calc = term.calculator ? getCalculator(term.calculator) : undefined;
            return (
              <li key={term.slug}>
                <Link
                  href={`/glossary/${term.slug}`}
                  className="card-interactive group flex h-full flex-col p-5"
                >
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-[0.9375rem] font-bold text-ink">{term.term}</h2>
                    {term.abbr && (
                      <span className="font-mono text-[0.75rem] font-semibold text-ink-faint">
                        {term.abbr}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-ink-soft">
                    {term.short}
                  </p>
                  <p className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-ink-muted">
                    {term.formula}
                  </p>
                  {calc && (
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-brand-600">
                      {calc.name}
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <section className="mt-16 max-w-content" aria-labelledby="why-heading">
          <h2 id="why-heading" className="text-h2 font-bold tracking-tight text-ink">
            Why these definitions are worth reading carefully
          </h2>
          <div className="mt-4 space-y-4 prose-body">
            <p>
              Most of these metrics have more than one defensible definition, and the
              difference is rarely academic. Lifetime value calculated on revenue rather
              than gross profit can be four or five times larger. CAC that counts only ad
              spend can be half the real figure. Put those two errors together and a
              business losing money on every customer reports a healthy ratio.
            </p>
            <p>
              Each page here states which version is being used and why, shows the formula,
              and lists the specific mistakes that change the answer. Where a benchmark
              range is given, it is labelled as a general reference and attributed to the
              kind of business it came from — because a figure that is normal for B2B
              software is meaningless for an ecommerce brand.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
