import { calculators } from '@/data/calculators';
import { glossary } from '@/data/glossary';
import { categories, categoryById, popularSlugs, type Category } from './taxonomy';
import type { CalculatorConfig, CalculatorVariant } from './types';

/** Lookup map built once at module load (build time). */
const bySlug = new Map<string, CalculatorConfig>(calculators.map((c) => [c.slug, c]));

export function getAllCalculators(): CalculatorConfig[] {
  return calculators;
}

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return bySlug.get(slug);
}

export function getCalculators(slugs: string[]): CalculatorConfig[] {
  return slugs
    .map((s) => bySlug.get(s))
    .filter((c): c is CalculatorConfig => Boolean(c));
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
    .filter((c): c is CalculatorConfig => c !== undefined && c.slug !== calc.slug);
}

/** Calculators in the same category, used as a fallback link block. */
export function getSiblings(calc: CalculatorConfig): CalculatorConfig[] {
  return calculators.filter(
    (c) => c.category === calc.category && c.slug !== calc.slug
  );
}

/* ------------------------------------------------------------------ *
 * Taxonomy-backed lookups                                             *
 * ------------------------------------------------------------------ */

export interface ResolvedCategory extends Category {
  items: CalculatorConfig[];
}

export function getCategories(): ResolvedCategory[] {
  return categories.map((c) => ({ ...c, items: getCalculators(c.slugs) }));
}

export function getCategory(id: string): ResolvedCategory | undefined {
  const cat = categoryById.get(id);
  return cat ? { ...cat, items: getCalculators(cat.slugs) } : undefined;
}

export function getPopular(limit = popularSlugs.length): CalculatorConfig[] {
  return getCalculators(popularSlugs).slice(0, limit);
}

/**
 * "Continue your analysis" — the next calculator someone should reach for.
 *
 * Order matters and is deliberate, not random: a calculator's own `related`
 * list is an editorial judgement about what question the result raises next
 * (CAC → "so what is a customer worth?" → LTV → "is that ratio healthy?").
 * Category siblings fill any remaining slots so the block is never empty.
 */
export function getRecommendations(
  calc: CalculatorConfig,
  limit = 4
): CalculatorConfig[] {
  const seen = new Set([calc.slug]);
  const out: CalculatorConfig[] = [];

  for (const c of [...getRelated(calc), ...getSiblings(calc), ...getPopular()]) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
    if (out.length === limit) break;
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Routing                                                             *
 * ------------------------------------------------------------------ */

/** Every indexable URL path on the site, used by sitemap.ts. */
export function getAllPaths(): string[] {
  // /my-tools is deliberately absent: it is noindex, because it is empty for
  // anyone but the visitor whose browser filled it.
  const paths = [
    '/',
    '/calculators',
    '/glossary',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];
  for (const c of categories) paths.push(`/calculators/${c.id}`);
  for (const t of glossary) paths.push(`/glossary/${t.slug}`);
  for (const c of calculators) {
    paths.push(`/${c.slug}`);
    for (const v of c.variants) paths.push(`/${c.slug}/${v.slug}`);
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

/* ------------------------------------------------------------------ *
 * Build-time integrity check                                          *
 * ------------------------------------------------------------------ */

/**
 * Fails the build rather than shipping a dead internal link. Called from the
 * homepage, which every build renders.
 */
export function assertTaxonomyIsValid(): void {
  const problems: string[] = [];
  const known = new Set(calculators.map((c) => c.slug));

  for (const cat of categories) {
    for (const slug of cat.slugs) {
      if (!known.has(slug)) problems.push(`category "${cat.id}" → unknown "${slug}"`);
    }
  }
  for (const slug of popularSlugs) {
    if (!known.has(slug)) problems.push(`popularSlugs → unknown "${slug}"`);
  }
  // Every calculator must be reachable from exactly one category page.
  for (const c of calculators) {
    const hits = categories.filter((cat) => cat.slugs.includes(c.slug));
    if (hits.length !== 1) {
      problems.push(`"${c.slug}" is in ${hits.length} categories (must be exactly 1)`);
    }
    if (c.category !== hits[0]?.id) {
      problems.push(`"${c.slug}".category is "${c.category}", expected "${hits[0]?.id}"`);
    }
  }
  for (const term of glossary) {
    if (term.calculator && !known.has(term.calculator)) {
      problems.push(`glossary "${term.slug}" → unknown calculator "${term.calculator}"`);
    }
  }

  if (problems.length) {
    throw new Error(`Taxonomy is out of sync with the registry:\n  ${problems.join('\n  ')}`);
  }
}
