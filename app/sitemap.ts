import type { MetadataRoute } from 'next';
import { site } from '@/site.config';
import { getAllPaths } from '@/lib/registry';

/**
 * Auto-generated from the calculator registry — add a calculator or a variant
 * and it appears here with no extra work. Emitted as a static /sitemap.xml at
 * build time.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getAllPaths().map((path) => {
    const depth = path.split('/').filter(Boolean).length;
    return {
      url: `${site.url}${path === '/' ? '' : path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      // Homepage 1.0, calculators 0.8, long-tail variants 0.6.
      priority: depth === 0 ? 1 : depth === 1 ? 0.8 : 0.6,
    };
  });
}
