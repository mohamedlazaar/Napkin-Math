import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalculatorPageView } from '@/components/CalculatorPageView';
import { JsonLd } from '@/components/JsonLd';
import { getAllCalculators, getCalculator, getVariant } from '@/lib/registry';
import { categoryOf } from '@/lib/taxonomy';
import {
  breadcrumbSchema,
  buildMetadata,
  faqPageSchema,
  howToSchema,
  variantDescription,
  variantFaqs,
  variantH1,
  variantTitle,
  webApplicationSchema,
} from '@/lib/seo';

/**
 * INDUSTRY-SPECIFIC PAGES.
 *
 * These are only worth indexing because each variant carries genuinely
 * different content: its own intro, its own cost lines, its own benchmark
 * range, its own worked example with different numbers, and usually its own
 * FAQ entries. A variant that could not fill those honestly does not get
 * added — near-duplicate pages are a liability, not an SEO asset.
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

  const category = categoryOf(calc.slug);
  const path = `/${calc.slug}/${variant.slug}`;

  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: variantH1(calc, variant),
            description: variantDescription(calc, variant),
            path,
          }),
          faqPageSchema(variantFaqs(calc, variant)),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            ...(category
              ? [{ name: category.label, path: `/calculators/${category.id}` }]
              : [{ name: 'Calculators', path: '/calculators' }]),
            { name: calc.name, path: `/${calc.slug}` },
            { name: `For ${variant.label}`, path },
          ]),
          howToSchema({
            name: `How to calculate ${calc.name.replace(/ Calculator$/i, '')} for ${variant.label}`,
            description: variant.example.scenario,
            steps: variant.example.steps,
          }),
        ]}
      />
      <CalculatorPageView calc={calc} variant={variant} />
    </>
  );
}
