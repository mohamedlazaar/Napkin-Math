import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/site.config';
import { Header, Footer } from '@/components/Layout';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  // metadataBase makes every relative canonical/OG url absolute automatically.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s`, // per-page titles already include the suffix via buildMetadata()
  },
  description: site.description,
  applicationName: site.name,
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense. Auto ads are placed by Google from this tag alone —
            there are no per-slot components in the page tree. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1376344507072580"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: site.url,
            description: site.description,
            publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
