/**
 * INFORMATION ARCHITECTURE.
 *
 * Categories, goals and ordering live here rather than being scattered across
 * pages, so the nav, the directory, the category landing pages, the footer and
 * the command palette can never disagree with each other.
 *
 * Rule: this file only ever references calculators that actually exist. Every
 * slug below is validated against the registry at build time by
 * `assertTaxonomyIsValid()` — a dead internal link fails the build instead of
 * shipping.
 */

export interface Category {
  /** URL segment: /calculators/<id> */
  id: string;
  label: string;
  /** Shown under the category heading and as the page meta description. */
  description: string;
  /** One-line promise used on compact cards. */
  short: string;
  /** Calculator slugs, in display order. */
  slugs: string[];
}

export const categories: Category[] = [
  {
    id: 'acquisition',
    label: 'Acquisition & Ads',
    short: 'What a customer costs, and whether the ads pay for themselves.',
    description:
      'Work out what you actually pay to win a customer and whether your advertising returns more than it costs. Covers customer acquisition cost, blended vs paid CAC, payback period and return on ad spend.',
    slugs: ['cac-calculator', 'roas-calculator'],
  },
  {
    id: 'customer-value',
    label: 'Customer Value',
    short: 'What a customer is worth, and whether that beats what you paid.',
    description:
      'Estimate how much gross profit a customer produces over their lifetime, and compare it against what you spent to acquire them. Covers lifetime value, the LTV:CAC ratio and payback period.',
    slugs: ['ltv-calculator', 'ltv-cac-ratio-calculator'],
  },
  {
    id: 'saas-metrics',
    label: 'SaaS Metrics',
    short: 'Recurring revenue, growth and the customers leaking out.',
    description:
      'The recurring-revenue numbers investors and operators actually track: monthly and annual recurring revenue, net new MRR, the SaaS quick ratio, customer churn, revenue churn and net revenue retention.',
    slugs: ['mrr-arr-calculator', 'churn-rate-calculator'],
  },
  {
    id: 'profitability',
    label: 'Pricing & Profit',
    short: 'Whether each sale — and the whole business — actually makes money.',
    description:
      'Price a product properly and find the point where the business stops losing money. Covers gross margin, markup, the price that hits a target margin, and how many customers you need to cover fixed costs.',
    slugs: ['pricing-margin-calculator', 'saas-break-even-calculator'],
  },
];

export const categoryById = new Map(categories.map((c) => [c.id, c]));

/** Homepage "Popular calculators", most-searched first. */
export const popularSlugs: string[] = [
  'cac-calculator',
  'ltv-calculator',
  'ltv-cac-ratio-calculator',
  'roas-calculator',
  'pricing-margin-calculator',
  'mrr-arr-calculator',
  'churn-rate-calculator',
  'saas-break-even-calculator',
];

/**
 * "What are you trying to figure out?" — the entry point for people who know
 * their business question but not the name of the metric.
 */
export interface Goal {
  id: string;
  question: string;
  blurb: string;
  slugs: string[];
}

export const goals: Goal[] = [
  {
    id: 'ads-working',
    question: 'Are my ads working?',
    blurb: 'Compare what you spend to what it brings back, before and after margin.',
    slugs: ['roas-calculator', 'cac-calculator'],
  },
  {
    id: 'customer-worth',
    question: 'How valuable are my customers?',
    blurb: 'Put a number on a customer and check it against what you paid for them.',
    slugs: ['ltv-calculator', 'ltv-cac-ratio-calculator'],
  },
  {
    id: 'profitable',
    question: 'Is my pricing profitable?',
    blurb: 'Margin, markup and the price that actually hits the margin you want.',
    slugs: ['pricing-margin-calculator', 'saas-break-even-calculator'],
  },
  {
    id: 'saas-health',
    question: 'How healthy is my SaaS?',
    blurb: 'Recurring revenue, growth quality and how fast customers leak away.',
    slugs: ['mrr-arr-calculator', 'churn-rate-calculator'],
  },
];

/**
 * A short mathematical glyph per calculator — the site's visual shorthand.
 * Rendered in a mono face at small sizes. Deliberately typographic rather than
 * pictorial: it stays sharp at any size, costs nothing, and reads as "maths"
 * instead of "generic SaaS icon set".
 */
export const glyphs: Record<string, string> = {
  'cac-calculator': '÷',
  'ltv-calculator': '∑',
  'ltv-cac-ratio-calculator': ':',
  'roas-calculator': '×',
  'churn-rate-calculator': '%',
  'mrr-arr-calculator': '↗',
  'saas-break-even-calculator': '=',
  'pricing-margin-calculator': '△',
};

export function glyphFor(slug: string): string {
  return glyphs[slug] ?? '±';
}

export function categoryOf(slug: string): Category | undefined {
  return categories.find((c) => c.slugs.includes(slug));
}
