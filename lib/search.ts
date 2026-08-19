/**
 * SEARCH — client half.
 *
 * This module must never import the registry, the glossary or any other page
 * data. It is pulled into the browser bundle by the command palette, and a
 * single data import here would drag every calculator's page copy — thousands
 * of lines of prose — into the client. The index is built on the server by
 * lib/search-index.ts and passed in as a prop.
 *
 * There is no search library: at a few dozen entries a linear scan is faster
 * than the overhead of anything cleverer, and it costs about 1KB of code.
 */

export type SearchKind = 'calculator' | 'variant' | 'glossary' | 'category';

/** Short keys throughout: this array is serialised into the HTML payload. */
export interface SearchDoc {
  /** Kind. */
  k: SearchKind;
  /** Title. */
  t: string;
  /** Subtitle / description. */
  d: string;
  /** URL. */
  u: string;
  /** Lowercased haystack of every searchable term. */
  s: string;
  /** Glyph shown in the result row. */
  g: string;
}

/**
 * Scores a document against a query. Higher is better; 0 means no match.
 *
 * The ranking exists so that typing "cac" surfaces the CAC calculator itself
 * rather than one of the twelve pages whose text happens to mention CAC.
 */
function score(doc: SearchDoc, tokens: string[]): number {
  const title = doc.t.toLowerCase();
  let total = 0;

  for (const token of tokens) {
    if (!doc.s.includes(token)) return 0; // every token must appear somewhere

    if (title === token) total += 100;
    else if (title.startsWith(token)) total += 60;
    else if (new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(title))
      total += 40;
    else if (title.includes(token)) total += 20;
    else total += 5;
  }

  // Prefer primary tools over long-tail variants at equal textual relevance.
  const kindBonus = { calculator: 12, category: 8, glossary: 5, variant: 0 };
  return total + kindBonus[doc.k];
}

export function searchDocs(index: SearchDoc[], query: string, limit = 8): SearchDoc[] {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  return index
    .map((doc) => ({ doc, n: score(doc, tokens) }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((r) => r.doc);
}

export const kindLabel: Record<SearchKind, string> = {
  calculator: 'Calculator',
  variant: 'Industry version',
  glossary: 'Glossary',
  category: 'Category',
};
