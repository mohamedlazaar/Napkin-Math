import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Layout';
import { CalculatorCard, toSummaries } from '@/components/CalculatorCard';
import { getCategory } from '@/lib/registry';
import { categories, glyphFor } from '@/lib/taxonomy';
import { getGlossaryForCalculator } from '@/data/glossary';
import { absoluteUrl, breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * Category landing pages. Each one is a genuine hub: it explains what the
 * category measures, lists its calculators, links every industry-specific
 * variant beneath them, and cross-links the glossary definitions.
 *
 * That last part matters for crawling — without it the variant pages are two
 * clicks from anywhere and get indexed far less often.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};

  return buildMetadata({
    title: `${cat.label} Calculators`,
    description: cat.description,
    path: `/calculators/${cat.id}`,
    keywords: cat.items.flatMap((c) => c.keywords).slice(0, 12),
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators' },
    { name: cat.label, path: `/calculators/${cat.id}` },
  ];

  const others = categories.filter((c) => c.id !== cat.id);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${cat.label} calculators`,
            description: cat.description,
            url: absoluteUrl(`/calculators/${cat.id}`),
            hasPart: cat.items.map((c) => ({
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
            {cat.label} calculators
          </h1>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            {cat.description}
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {toSummaries(cat.items).map((calc) => (
            <li key={calc.slug}>
              <CalculatorCard calc={calc} featured />
            </li>
          ))}
        </ul>

        {/* ---- Industry versions + definitions per calculator -------- */}
        <div className="mt-12 space-y-10">
          {cat.items.map((calc) => {
            const terms = getGlossaryForCalculator(calc.slug);
            if (calc.variants.length === 0 && terms.length === 0) return null;

            return (
              <section key={calc.slug} aria-labelledby={`sec-${calc.slug}`}>
                <h2
                  id={`sec-${calc.slug}`}
                  className="flex items-center gap-2.5 text-h2 font-bold tracking-tight text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface-sunken font-mono text-[0.9375rem] text-ink-muted"
                  >
                    {glyphFor(calc.slug)}
                  </span>
                  {calc.name}
                </h2>

                {calc.variants.length > 0 && (
                  <>
                    <p className="mt-2 max-w-2xl text-[0.875rem] leading-relaxed text-ink-soft">
                      Same calculation, with the cost lines, benchmarks and worked numbers
                      that actually apply to your sector.
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {calc.variants.map((v) => (
                        <li key={v.slug}>
                          <Link href={`/${calc.slug}/${v.slug}`} className="tag-interactive">
                            For {v.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {terms.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {terms.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/glossary/${t.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink-muted transition hover:border-brand-300 hover:text-brand-700"
                        >
                          <span aria-hidden="true" className="font-mono">
                            A
                          </span>
                          What is {t.abbr ?? t.term}?
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        {/* ---- Other categories -------------------------------------- */}
        <section className="mt-16" aria-labelledby="other-heading">
          <h2 id="other-heading" className="text-h2 font-bold tracking-tight text-ink">
            Other categories
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {others.map((c) => (
              <li key={c.id}>
                <Link href={`/calculators/${c.id}`} className="card-interactive group block p-5">
                  <h3 className="text-[0.9375rem] font-bold text-ink">{c.label}</h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                    {c.short}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-brand-600">
                    Browse
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
