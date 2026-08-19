import { buildSearchIndex } from '@/lib/search-index';

/**
 * The full search index as a static file.
 *
 * Emitted once at build time and served from the CDN. The command palette
 * fetches it the first time someone opens search, rather than every page
 * embedding it in its HTML — which saved roughly 9KB gzipped on all 93 pages
 * in exchange for one cacheable request made only on intent.
 */
export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: {
      // Immutable in practice: the file only changes when the site is rebuilt,
      // and a rebuild produces a new deployment.
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
