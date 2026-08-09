/**
 * AFFILIATE OFFERS — fill these in and they appear site-wide.
 *
 * Keys are calculator categories (see `category` in each calculator config),
 * plus a `default` fallback used when there's no category-specific offer.
 * An offer with an empty `url` renders nothing, so it is safe to deploy this
 * file as-is.
 */
export interface AffiliateOffer {
  /** Small label above the heading. Optional. */
  eyebrow?: string;
  heading: string;
  body: string;
  ctaLabel: string;
  /** Your affiliate URL. EMPTY = block is hidden entirely. */
  url: string;
  /** Set false only if the offer isn't actually affiliate-compensated. */
  disclosure?: boolean;
}

export const affiliateOffers: Record<string, AffiliateOffer> = {
  default: {
    eyebrow: 'Recommended tool',
    heading: 'Stop calculating this by hand every month',
    body: 'Connect your billing data once and track CAC, LTV, churn and payback automatically.',
    ctaLabel: 'See the tool →',
    // ↓↓↓ PASTE YOUR AFFILIATE URL HERE. Leave empty and the block won't render.
    url: '',
  },

  // Example of a category override. Key must match a calculator's `category`.
  // 'SaaS & Growth': {
  //   heading: 'Your SaaS-specific offer headline',
  //   body: 'One or two sentences on why it helps with this exact metric.',
  //   ctaLabel: 'Try it free →',
  //   url: 'https://partner.example.com/?ref=YOUR_ID',
  // },
};
