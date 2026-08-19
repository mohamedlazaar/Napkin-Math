import type { MetadataRoute } from 'next';
import { site } from '@/site.config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing here is private. /my-tools is excluded because it is empty
        // for anyone but the visitor whose browser filled it — there is
        // nothing there to crawl or rank.
        disallow: ['/_next/', '/my-tools'],
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
