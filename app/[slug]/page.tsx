import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalculatorPageView } from '@/components/CalculatorPageView';
import { JsonLd } from '@/components/JsonLd';
import { getAllCalculators, getCalculator } from '@/lib/registry';
import {
  breadcrumbSchema,
  buildMetadata,
  faqPageSchema,
  webApplicationSchema,
} from '@/lib/seo';

/**
 * One route file for every calculator on the site.
 *
 * Statically generated at build time (generateStaticParams below) and never
 * revalidated on request, so Vercel serves plain HTML from its CDN — no
 * function invocation, no per-request cost.
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
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: calc.name, path: `/${calc.slug}` },
          ]),
        ]}
      />
      <CalculatorPageView calc={calc} />
    </>
  );
}
