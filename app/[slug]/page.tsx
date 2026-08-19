import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalculatorPageView } from '@/components/CalculatorPageView';
import { JsonLd } from '@/components/JsonLd';
import { getAllCalculators, getCalculator } from '@/lib/registry';
import { categoryOf } from '@/lib/taxonomy';
import {
  breadcrumbSchema,
  buildMetadata,
  faqPageSchema,
  howToSchema,
  webApplicationSchema,
} from '@/lib/seo';

/**
 * One route file for every calculator on the site.
 *
 * Statically generated at build time (generateStaticParams below) and never
 * revalidated on request, so Vercel serves plain HTML from its CDN — no
 * function invocation, no per-request cost. Shared calculations restore from
 * the query string on the client, which keeps that true.
 */

// Any slug not returned by generateStaticParams 404s at build time rather than
// being rendered on demand. This is what guarantees zero server cost.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCalculators().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};

  return buildMetadata({
    title: calc.title,
    description: calc.description,
    path: `/${calc.slug}`,
    keywords: calc.keywords,
  });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) notFound();

  const category = categoryOf(calc.slug);

  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: calc.h1,
            description: calc.description,
            path: `/${calc.slug}`,
            keywords: calc.keywords,
          }),
          faqPageSchema(calc.faqs),
          // Mirrors the visible breadcrumb trail exactly — a mismatch between
          // the two is a structured-data error, not a nuance.
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            ...(category
              ? [{ name: category.label, path: `/calculators/${category.id}` }]
              : [{ name: 'Calculators', path: '/calculators' }]),
            { name: calc.name, path: `/${calc.slug}` },
          ]),
          howToSchema({
            name: `How to calculate ${calc.name.replace(/ Calculator$/i, '')}`,
            description: calc.workedExample.scenario,
            steps: calc.workedExample.steps,
          }),
        ]}
      />
      <CalculatorPageView calc={calc} />
    </>
  );
}
