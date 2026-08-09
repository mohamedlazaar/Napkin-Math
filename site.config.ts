/**
 * Global site settings. Change these once; every page title, canonical URL,
 * OpenGraph tag, sitemap entry and JSON-LD block picks them up.
 */
export const site = {
  name: 'Napkin Math',
  /** Used as the " | Suffix" on every page title. Keep it short. */
  titleSuffix: 'Napkin Math',
  tagline: 'Free business & finance calculators',
  description:
    'Free, instant business and SaaS metric calculators — CAC, LTV, ROAS, churn, MRR and more. No signup, no data leaves your browser.',

  /**
   * Absolute origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL in Vercel so
   * canonicals and the sitemap are correct in production.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(
    /\/$/,
    ''
  ),

  locale: 'en_US',

  /** Shown in the footer and on the About page. */
  publisher: 'Napkin Math',
  contactEmail: 'hello@example.com',

  // Ad network config lives in data/ad-network.ts — it is network-agnostic and
  // takes whatever snippet your provider gives you.

  /** Google Search Console verification. Unrelated to ads; keep it. */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
} as const;
