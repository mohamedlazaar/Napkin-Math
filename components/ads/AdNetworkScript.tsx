import Script from 'next/script';
import { adNetwork } from '@/data/ad-network';

/**
 * Loads your ad network's library exactly once for the whole site.
 * Mounted in app/layout.tsx. Renders nothing until `enabled` is true in
 * data/ad-network.ts, so your Lighthouse scores while developing reflect your
 * own code rather than an ad vendor's.
 *
 * strategy="afterInteractive" keeps the ad script off the critical path: the
 * page becomes interactive first, ads load second. Do not change this to
 * "beforeInteractive" — it will cost you LCP and TBT, and most networks do not
 * require it.
 */
export function AdNetworkScript() {
  if (!adNetwork.enabled) return null;

  const { src, inline } = adNetwork.loader;

  return (
    <>
      {src ? (
        <Script id="ad-network-loader" async strategy="afterInteractive" src={src} />
      ) : null}
      {inline ? (
        <Script
          id="ad-network-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: inline }}
        />
      ) : null}
    </>
  );
}

/**
 * Preconnect hints for your ad network's serving domains. Costs one DNS+TLS
 * handshake, typically saves 100–300ms on first ad paint.
 */
export function AdNetworkPreconnect() {
  if (!adNetwork.enabled || adNetwork.preconnect.length === 0) return null;

  return (
    <>
      {adNetwork.preconnect.map((origin) => (
        <link key={origin} rel="preconnect" href={origin} />
      ))}
    </>
  );
}
