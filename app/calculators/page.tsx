import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Layout';
import { CalculatorDirectory } from '@/components/CalculatorDirectory';
import { AdUnit } from '@/components/AdUnit';
import { getAllCalculators, getCategories } from '@/lib/registry';
import { glyphFor } from '@/lib/taxonomy';
import { absoluteUrl, breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'All Business & Finance Calculators',
  description:
    'Every Napkin Math calculator in one place: CAC, LTV, LTV:CAC, ROAS, churn, MRR and ARR, break-even and profit margin. Search by metric or browse by category. Free, no signup.',
  path: '/calculators',
  keywords: [
    'business calculators',
    'saas metric calculators',
    'marketing calculators',
    'finance calculators',
    'free business metrics calculator',
  ],
});

export default function CalculatorsPage() {
  const categories = getCategories();
  const all = getAllCalculators();
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators' },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All business and finance calculators',
            description: metadata.description,
            url: absoluteUrl('/calculators'),
            hasPart: all.map((c) => ({
              '@type': 'WebApplication',
              name: c.name,
              description: c.blurb,
              url: absoluteUrl(`/${c.slug}`),
              applicationCategory: 'BusinessApplication',
            })),
          },
        ]}
      />

      <div className="shell py-8 sm:py-10">
        <Breadcrumbs trail={trail} />

        <header className="mt-5 max-w-3xl">
          <h1 className="text-h1 font-extrabold tracking-tight text-ink">
            All calculators
          </h1>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            {all.length} tools for the metrics that decide whether a business works. Search
            by name or metric, or browse the categories below. Everything runs in your
            browser — nothing you type is uploaded.
          </p>
        </header>

        <div className="mt-8">
          <CalculatorDirectory
            categories={categories.map((cat) => ({
              id: cat.id,
              label: cat.label,
              short: cat.short,
              items: cat.items.map((c) => ({
                slug: c.slug,
                name: c.name,
                blurb: c.blurb,
                glyph: glyphFor(c.slug),
                // Pre-built haystack so "profit" finds the margin calculator.
                keywords: [c.name, c.h1, c.blurb, c.slug, cat.label, ...c.keywords]
                  .join(' ')
                  .toLowerCase(),
              })),
            }))}
          />
        </div>

        <section className="mt-16 max-w-content" aria-labelledby="choose-heading">
          <h2 id="choose-heading" className="text-h2 font-bold tracking-tight text-ink">
            Not sure where to start?
          </h2>
          <div className="mt-4 space-y-4 prose-body">
            <p>
              If you are checking whether growth is affordable, start with the{' '}
              <Link href="/cac-calculator" className="font-medium text-brand-700 underline">
                CAC calculator
              </Link>{' '}
              and then the{' '}
              <Link href="/ltv-calculator" className="font-medium text-brand-700 underline">
                LTV calculator
              </Link>
              . The ratio between those two numbers is the fastest read on whether your
              business model works, and the{' '}
              <Link
                href="/ltv-cac-ratio-calculator"
                className="font-medium text-brand-700 underline"
              >
                LTV:CAC calculator
              </Link>{' '}
              does that comparison for you.
            </p>
            <p>
              If you are running paid advertising, the{' '}
              <Link href="/roas-calculator" className="font-medium text-brand-700 underline">
                ROAS calculator
              </Link>{' '}
              also gives you your break-even ROAS — the return you need just to stop losing
              money, which depends entirely on your{' '}
              <Link
                href="/glossary/gross-margin"
                className="font-medium text-brand-700 underline"
              >
                gross margin
              </Link>
              .
            </p>
            <p>
              If you are still deciding which metric answers your question, the{' '}
              <Link href="/glossary" className="font-medium text-brand-700 underline">
                glossary
              </Link>{' '}
              defines each one in plain English with a worked example.
            </p>
          </div>
        </section>

        {/* Below all content, clearly separated, never near an input. */}
        <AdUnit slot={site.ads.slots.directoryEnd} className="mt-14" />
      </div>
    </>
  );
}
