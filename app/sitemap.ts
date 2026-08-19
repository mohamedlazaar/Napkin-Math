import type { MetadataRoute } from 'next';
import { site } from '@/site.config';
import { getAllPaths } from '@/lib/registry';

/**
 * Auto-generated from the registry, the taxonomy and the glossary — add a
 * calculator, category or definition and it appears here with no extra work.
 * Emitted as a static /sitemap.xml at build time.
 */
export const dynamic = 'force-static';

/** Priority reflects how much the page matters, not how deep the URL is. */
function priorityFor(path: string): number {
  if (path === '/') return 1;
  if (path === '/calculators') return 0.9;
  const depth = path.split('/').filter(Boolean).length;
  if (path.startsWith('/glossary')) return depth === 1 ? 0.7 : 0.6;
  if (path.startsWith('/calculators/')) return 0.7;
  // A top-level calculator page is the most valuable page type on the site.
  if (depth === 1) return ['/about', '/contact', '/privacy', '/terms'].includes(path) ? 0.3 : 0.9;
  return 0.6; // industry variant pages
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getAllPaths().map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: priorityFor(path),
  }));
}
