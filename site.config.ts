/**
 * Global site settings. Change these once; every page title, canonical URL,
 * OpenGraph tag, sitemap entry and JSON-LD block picks them up.
 */
export const site = {
  name: 'Napkin Math',
  /** Used as the " | Suffix" on every page title. Keep it short. */
  titleSuffix: 'Napkin Math',
  tagline: 'Business math without the spreadsheet',
  description:
    'Calculate CAC, LTV, ROAS, margin, MRR, churn and break-even in seconds. Free, no signup, and every calculation runs in your browser.',

  /**
   * Absolute origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL in Vercel so
   * canonicals and the sitemap are correct in production.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://napkin-math-wheat.vercel.app'
  ).replace(/\/$/, ''),

  locale: 'en_US',

  /** Shown in the footer and on the About page. */
  publisher: 'Napkin Math',
  /** The named human behind the site — a real E-E-A-T signal, not a brand. */
  author: 'Mohamed Lazaar',
  contactEmail: 'lazzarmohamed10@gmail.com',

  /**
   * Google AdSense. The loader lives in the <head> of app/layout.tsx.
   *
   * `client` is the publisher ID. `slots` are optional MANUAL unit ids — leave
   * them empty and no manual unit renders at all (Auto ads still work). Fill
   * one in and that single, deliberately-placed unit appears. See
   * components/AdUnit.tsx for the placement rules.
   */
  ads: {
    client: 'ca-pub-1376344507072580',
    slots: {
      /** In-article unit. Below the article body, above the FAQ. Never beside the inputs. */
      articleEnd: '7703895424',
      /** Multiplex unit. Bottom of the calculator directory, below the fold. */
      directoryEnd: '9828380366',
      /** Responsive display unit. Foot of the homepage, after "What this is". */
      homeEnd: '8239966520',
    },
  },

  /**
   * Google Search Console verification. Unrelated to ads; keep it.
   * Rendered into <head> via metadata.verification in app/layout.tsx. The env
   * var wins, so a different property can be verified per deployment.
   */
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    'QxmY68sjP0s4TGOFwutzxMslGt1eOTw09m_-NiEIYg8',

  /**
   * Optional privacy-first analytics endpoint (Plausible-compatible). Unset =
   * events are collected in-memory only and never leave the browser.
   */
  analyticsEndpoint: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || '',
} as const;
