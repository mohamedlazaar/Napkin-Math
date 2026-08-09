import { calculators } from '@/data/calculators';
import type { CalculatorConfig, CalculatorVariant } from './types';

/** Lookup map built once at module load (build time). */
const bySlug = new Map<string, CalculatorConfig>(
  calculators.map((c) => [c.slug, c])
);

export function getAllCalculators(): CalculatorConfig[] {
  return calculators;
}

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return bySlug.get(slug);
}

export function getVariant(
  calc: CalculatorConfig,
  variantSlug: string
): CalculatorVariant | undefined {
  return calc.variants.find((v) => v.slug === variantSlug);
}

/**
 * Resolves a calculator's `related` slugs to real configs, dropping any that
 * aren't registered yet. This is what lets you list your entire roadmap in
 * `related` without ever shipping a 404 link.
 */
export function getRelated(calc: CalculatorConfig): CalculatorConfig[] {
  return calc.related
    .map((slug) => bySlug.get(slug))
    .filter((c): c is CalculatorConfig => Boolean(c) && c!.slug !== calc.slug);
}

/** Calculators in the same category, used as a fallback link block. */
export function getSiblings(calc: CalculatorConfig): CalculatorConfig[] {
  return calculators.filter(
    (c) => c.category === calc.category && c.slug !== calc.slug
  );
}

export function getCategories(): { name: string; items: CalculatorConfig[] }[] {
  const map = new Map<string, CalculatorConfig[]>();
  for (const c of calculators) {
    const list = map.get(c.category) || [];
    list.push(c);
    map.set(c.category, list);
  }
  return [...map.entries()].map(([name, items]) => ({ name, items }));
}

/** Every indexable URL path on the site, used by sitemap.ts. */
export function getAllPaths(): string[] {
  const paths = ['/', '/about', '/privacy'];
  for (const c of calculators) {
    paths.push(`/${c.slug}`);
    for (const v of c.variants) {
      paths.push(`/${c.slug}/${v.slug}`);
    }
  }
  return paths;
}

/** Merges a variant's default overrides onto the calculator's own defaults. */
export function resolveDefaults(
  calc: CalculatorConfig,
  variant?: CalculatorVariant
): Record<string, number> {
  const values: Record<string, number> = {};
  for (const f of calc.fields) values[f.id] = f.defaultValue;
  if (variant?.defaults) Object.assign(values, variant.defaults);
  return values;
}
