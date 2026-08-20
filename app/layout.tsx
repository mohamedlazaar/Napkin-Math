import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/site.config';
import { Header, Footer } from '@/components/Layout';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  // metadataBase makes every relative canonical/OG url absolute automatically.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s`, // per-page titles already include the suffix via buildMetadata()
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author }],
  creator: site.author,
  publisher: site.publisher,
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never lock zoom — pinch-to-zoom is an accessibility requirement, not a
  // styling inconvenience.
  maximumScale: 5,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1376344507072580" />
        {/* Google AdSense. Placement of manual units is controlled in
            components/AdUnit.tsx; anything else on the page comes from Auto ads. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.ads.client}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: site.name,
              url: site.url,
              description: site.description,
              inLanguage: 'en',
              publisher: { '@id': absoluteUrl('/#organization') },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: absoluteUrl('/calculators?q={search_term_string}'),
                },
                'query-input': 'required name=search_term_string',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': absoluteUrl('/#organization'),
              name: site.publisher,
              url: site.url,
              email: site.contactEmail,
              founder: { '@type': 'Person', name: site.author },
            },
          ]}
        />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
