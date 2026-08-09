import type { MetadataRoute } from 'next';
import { site } from '@/site.config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing here is private; the only thing worth excluding is Next's
        // internal build output, which shouldn't be crawled as pages.
        disallow: ['/_next/'],
      },
      // Ad networks run their own crawlers to read page content and target ads.
      // A blocked ad crawler means untargeted (low-paying) ads or no fill at all,
      // so never disallow these. The `*` rule above already permits them; these
      // are explicit because some networks check for a named entry.
      // Add your network's crawler here if it publishes one.
      { userAgent: 'Mediapartners-Google', allow: '/' },
      { userAgent: 'AdsBot-Google', allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
