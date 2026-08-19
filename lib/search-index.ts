/**
 * SEARCH — server half.
 *
 * Builds the index at build time from the registry, taxonomy and glossary. The
 * result is a compact array of short-keyed objects (~7KB of JSON) that ships in
 * the HTML payload, so search works on first paint with no fetch and no
 * client-side index construction.
 *
 * Kept separate from lib/search.ts on purpose: THIS file imports page data, and
 * importing it from a client component would pull every calculator's prose into
 * the browser bundle. lib/search.ts is the half that is safe to import there.
 */

import { getAllCalculators } from './registry';
import { glossary } from '@/data/glossary';
import { categories } from './taxonomy';
import type { SearchDoc } from './search';

/**
 * The handful of entries the palette shows before anyone types — calculators
 * and categories only. Small enough (about 1KB) to inline in every page, so
 * the palette is useful the instant it opens, while the full index loads.
 */
export function buildQuickIndex(): SearchDoc[] {
  return buildSearchIndex().filter((d) => d.k === 'calculator' || d.k === 'category');
}

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const cat of categories) {
    docs.push({
      k: 'category',
      t: cat.label,
      d: cat.short,
      u: `/calculators/${cat.id}`,
      g: '#',
      s: `${cat.label} ${cat.short} ${cat.id}`.toLowerCase(),
    });
  }

  for (const calc of getAllCalculators()) {
    docs.push({
      k: 'calculator',
      t: calc.name,
      d: calc.blurb,
      u: `/${calc.slug}`,
      g: '=',
      s: [calc.name, calc.h1, calc.blurb, calc.slug, ...calc.keywords].join(' ').toLowerCase(),
    });

    for (const v of calc.variants) {
      docs.push({
        k: 'variant',
        t: `${calc.name} for ${v.label}`,
        d: v.audience,
        u: `/${calc.slug}/${v.slug}`,
        g: '›',
        s: `${calc.name} ${v.label} ${v.audience} ${calc.slug} ${v.slug}`.toLowerCase(),
      });
    }
  }

  for (const term of glossary) {
    docs.push({
      k: 'glossary',
      t: term.abbr ? `${term.term} (${term.abbr})` : term.term,
      d: term.short,
      u: `/glossary/${term.slug}`,
      g: 'A',
      s: `${term.term} ${term.abbr ?? ''} ${term.short} ${term.slug}`.toLowerCase(),
    });
  }

  return docs;
}
