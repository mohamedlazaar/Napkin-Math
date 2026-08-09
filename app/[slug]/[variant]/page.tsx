import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalculatorPageView } from '@/components/CalculatorPageView';
import { JsonLd } from '@/components/JsonLd';
import { getAllCalculators, getCalculator, getVariant } from '@/lib/registry';
import {
  breadcrumbSchema,
  buildMetadata,
  faqPageSchema,
  variantDescription,
  variantFaqs,
  variantH1,
  variantTitle,
  webApplicationSchema,
} from '@/lib/seo';

/**
 * PROGRAMMATIC SEO ROUTE.
 *
 * Every variant listed on every calculator becomes a static page here. With 8
 * calculators × ~12 variants you get roughly 100 indexable pages from this one
 * file — each with its own title, description, canonical, benchmarks, cost
 * list, worked example and FAQ entries.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCalculators().flatMap((c) =>
    c.variants.map((v) => ({ slug: c.slug, variant: v.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; variant: string }>;
}): Promise<Metadata> {
  const { slug, variant: variantSlug } = await params;
  const calc = getCalculator(slug);
  const variant = calc && getVariant(calc, variantSlug);
  if (!calc || !variant) return {};

  return buildMetadata({
    title: variantTitle(calc, variant),
    description: variantDescription(calc, variant),
    path: `/${calc.slug}/${variant.slug}`,
    keywords: [
      `${calc.name.toLowerCase()} for ${variant.label.toLowerCase()}`,
      `${variant.label.toLowerCase()} ${calc.name.toLowerCase()}`,
      ...calc.keywords,
    ],
    type: 'article',
  });
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{ slug: string; variant: string }>;
}) {
  const { slug, variant: variantSlug } = await params;
  const calc = getCalculator(slug);
  const variant = calc && getVariant(calc, variantSlug);
  if (!calc || !variant) notFound();

  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: variantH1(calc, variant),
            description: variantDescription(calc, variant),
            path: `/${calc.slug}/${variant.slug}`,
          }),
          faqPageSchema(variantFaqs(calc, variant)),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: calc.name, path: `/${calc.slug}` },
            { name: `For ${variant.label}`, path: `/${calc.slug}/${variant.slug}` },
          ]),
        ]}
      />
      <CalculatorPageView calc={calc} variant={variant} />
    </>
  );
}
