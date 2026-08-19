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

  // Ads: the Google AdSense loader is in app/layout.tsx <head>. Placement is
  // handled by AdSense Auto ads, so there is no per-slot markup in the pages.

  /** Google Search Console verification. Unrelated to ads; keep it. */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
} as const;
