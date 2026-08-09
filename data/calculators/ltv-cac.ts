import type { CalculatorConfig } from '@/lib/types';

export const ltvCac: CalculatorConfig = {
  slug: 'ltv-cac-ratio-calculator',
  name: 'LTV:CAC Ratio Calculator',
  h1: 'LTV:CAC Ratio Calculator',
  title: 'LTV:CAC Ratio Calculator — Unit Economics',
  description:
    'Free LTV:CAC ratio calculator. Enter lifetime value and acquisition cost to see your ratio, profit per customer and CAC payback period against the 3:1 benchmark.',
  blurb:
    'The single number that says whether your growth engine makes money or burns it.',
  category: 'SaaS & Growth',
  keywords: [
    'ltv cac ratio calculator',
    'ltv to cac ratio',
    'ltv cac benchmark',
    'unit economics calculator',
    'is my ltv cac ratio good',
  ],

  formulaId: 'ltvCacRatio',
  formulaDisplay: 'LTV:CAC ratio = Customer lifetime value ÷ Customer acquisition cost',

  fields: [
    {
      id: 'ltv',
      label: 'Customer lifetime value (LTV)',
      type: 'currency',
      defaultValue: 13333,
      min: 0,
      step: 100,
      help: 'Gross profit over the customer relationship — not lifetime revenue.',
    },
    {
      id: 'cac',
      label: 'Customer acquisition cost (CAC)',
      type: 'currency',
      defaultValue: 1400,
      min: 0,
      step: 50,
      help: 'Fully loaded sales and marketing spend per new customer.',
    },
    {
      id: 'arpaMonthly',
      label: 'Average revenue per customer / month',
      type: 'currency',
      defaultValue: 500,
      min: 0,
      step: 10,
      optional: true,
      help: 'Optional — needed for CAC payback. Leave at 0 to skip.',
    },
    {
      id: 'grossMarginPct',
      label: 'Gross margin',
      type: 'percent',
      defaultValue: 80,
      min: 0,
      max: 100,
      step: 1,
      optional: true,
      help: 'Used with the figure above to work out monthly gross profit.',
    },
  ],

  results: [
    {
      id: 'ratio',
      label: 'LTV:CAC ratio',
      format: 'ratio',
      primary: true,
      help: 'Around 3:1 is healthy. Below 1:1 you lose money on every customer.',
    },
    { id: 'profitPerCustomer', label: 'Lifetime profit per customer', format: 'currency' },
    { id: 'cacAsPctOfLtv', label: 'CAC as a share of LTV', format: 'percent' },
    { id: 'paybackMonths', label: 'CAC payback period', format: 'months' },
  ],

  intro: [
    'The LTV:CAC ratio divides what a customer is worth by what they cost to acquire. It compresses your entire growth engine into one number, which is why investors ask for it before almost anything else.',
    'Enter your figures below. Everything runs in your browser — nothing is uploaded, stored or sent anywhere.',
  ],

  sections: [
    {
      heading: 'How to read your LTV:CAC ratio',
      body: [
        'Divide lifetime value by acquisition cost. A $13,333 LTV against a $1,400 CAC gives 9.5:1, meaning each customer returns about nine and a half times what they cost to win.',
        'The conventional bands: below 1:1 you destroy value with every sale and growth accelerates the damage. Between 1:1 and 3:1 the model works but leaves thin cover for fixed costs like engineering and overhead. Around 3:1 is the widely cited healthy target. Above 5:1 the ratio stops being good news — it almost always means you are underspending on acquisition and conceding market share you could afford to buy.',
      ],
      bullets: [
        'Use gross-profit LTV. Revenue-based LTV inflates the ratio by however much your margin is short of 100%.',
        'Use fully loaded CAC, including salaries and commission, not just media spend.',
        'Calculate both from the same customer cohort where you can, rather than blending different periods.',
      ],
    },
    {
      heading: 'Why 3:1 is a convention, not a law',
      body: [
        'The 3:1 benchmark comes from venture-backed SaaS, where it roughly represents the point at which gross profit covers acquisition, overhead and a margin. It travels badly. A business with 95% gross margins and negligible fixed costs can thrive at 2:1, while a capital-intensive one with a long payback may need 5:1 to survive the cash gap.',
        'The ratio is also silent on time, which is its biggest weakness. Two companies both at 3:1 can be in completely different positions: one recovering CAC in 4 months, the other in 30. The first can reinvest twice a year and compound; the second needs continuous outside funding to grow at all. Always quote payback period alongside the ratio.',
      ],
    },
    {
      heading: 'What to do when the ratio is bad',
      body: [
        'A low ratio has exactly two causes, and the fix depends on which one dominates. If CAC is the problem, the highest-leverage move is usually conversion rather than cheaper traffic — you are already paying for the leads, so improving close rates cuts CAC without touching the budget. Channel mix matters too: shifting spend toward referral and organic lowers blended CAC durably in a way that bidding changes do not.',
        'If LTV is the problem, churn is almost always where the damage is, because LTV is inversely proportional to it. Cutting monthly churn from 5% to 4% raises LTV by 25%. Pricing is the second lever and the most underused — a price increase flows almost entirely to gross profit. Expanding existing accounts works on both sides at once, raising LTV at a CAC close to zero.',
      ],
    },
    {
      heading: 'When a high ratio is a warning sign',
      body: [
        'A 12:1 ratio reads like excellence and usually is not. It typically means acquisition is starved: you are harvesting cheap organic and referral demand while leaving paid channels untouched, and a competitor willing to run at 3:1 will simply outspend you for the same customers.',
        'The exception is an early-stage company where the ratio is measured on a small cohort of enthusiastic early adopters who found you themselves. That number will not survive contact with paid acquisition at scale. Before scaling spend on the strength of a high ratio, check it holds on paid-only CAC rather than blended.',
      ],
    },
  ],

  workedExample: {
    scenario:
      'A B2B SaaS company calculates a $13,333 LTV from $500 average monthly revenue at an 80% gross margin and 3% monthly churn. Its fully loaded CAC over the same period is $1,400.',
    inputs: [
      { label: 'Customer lifetime value (LTV)', value: '$13,333' },
      { label: 'Customer acquisition cost (CAC)', value: '$1,400' },
      { label: 'Average revenue per customer / month', value: '$500' },
      { label: 'Gross margin', value: '80%' },
    ],
    steps: [
      'LTV:CAC ratio = $13,333 ÷ $1,400 = about 9.5:1',
      'Lifetime profit per customer = $13,333 − $1,400 = $11,933',
      'CAC as a share of LTV = $1,400 ÷ $13,333 = about 10.5%',
      'CAC payback = $1,400 ÷ ($500 × 80%) = 3.5 months',
    ],
    takeaway:
      'At 9.5:1 with a 3.5-month payback, this company is not in danger — it is underinvesting. Spending enough to push CAC to $3,000 would still leave a 4.4:1 ratio and a 7.5-month payback, and would likely buy considerably more growth.',
  },

  faqs: [
    {
      q: 'What is a good LTV:CAC ratio?',
      a: 'Around 3:1 is the standard benchmark. Below 1:1 you lose money on every customer. Above 5:1 usually indicates underinvestment in growth rather than exceptional performance.',
    },
    {
      q: 'Should LTV:CAC use gross profit or revenue?',
      a: 'Gross profit. Using revenue inflates the ratio by whatever your cost of service is — a company with 60% margins would report a ratio roughly 1.7× better than reality.',
    },
    {
      q: 'What if my LTV:CAC ratio is below 1?',
      a: 'Every customer you acquire loses money, so growth makes things worse, not better. Pause paid acquisition scaling and fix either churn or conversion before adding budget.',
    },
    {
      q: 'Is LTV:CAC more important than CAC payback period?',
      a: 'They answer different questions. The ratio tells you whether the business model works; payback tells you how much cash growth consumes. A 3:1 ratio with 30-month payback can still bankrupt you.',
    },
    {
      q: 'How often should I recalculate it?',
      a: 'Quarterly for most businesses. Both inputs are noisy month to month, and the ratio is a strategic signal rather than an operational one.',
    },
    {
      q: 'Does this calculator send my data anywhere?',
      a: 'No. Every calculation runs locally in your browser using JavaScript. Nothing is transmitted to a server, logged or stored.',
    },
  ],

  related: [
    'ltv-calculator',
    'cac-calculator',
    'churn-rate-calculator',
    'saas-break-even-calculator',
    'mrr-arr-calculator',
  ],

  variants: [
    {
      slug: 'for-saas',
      label: 'SaaS',
      audience: 'B2B SaaS companies',
      intro:
        'The 3:1 benchmark originated in SaaS, so this is the one vertical where it applies more or less as written. The caveat is segment: enterprise SaaS with 18-month paybacks and self-serve SaaS with 4-month paybacks can report identical ratios while being in entirely different financial positions.',
      costsToInclude: [
        'Fully loaded sales compensation including commission and accelerators',
        'Marketing salaries, agencies and paid media',
        'Hosting, support and payment fees on the LTV side',
        'Onboarding and implementation cost',
      ],
      benchmark: {
        typical: 'Most healthy SaaS companies report between 3:1 and 5:1.',
        good: '3:1 or better with CAC payback under 12 months.',
        note: 'Check the ratio on paid-only CAC as well as blended. Companies with strong organic demand often find the paid ratio is half the blended one, which is what actually governs whether more spend is worth it.',
      },
      defaults: { ltv: 26000, cac: 1655, arpaMonthly: 650, grossMarginPct: 80 },
      example: {
        scenario:
          'A mid-market SaaS company with a $26,000 LTV and $1,655 fully loaded CAC, averaging $650 MRR at an 80% margin.',
        inputs: [
          { label: 'Customer lifetime value (LTV)', value: '$26,000' },
          { label: 'Customer acquisition cost (CAC)', value: '$1,655' },
          { label: 'Average revenue per customer / month', value: '$650' },
          { label: 'Gross margin', value: '80%' },
        ],
        steps: [
          'Ratio = $26,000 ÷ $1,655 = about 15.7:1',
          'Payback = $1,655 ÷ ($650 × 80%) = about 3.2 months',
        ],
        takeaway:
          'A 15.7:1 ratio with three-month payback is not a healthy business operating well — it is a business leaving growth on the table. This is the profile where doubling the sales team is usually the right call.',
      },
    },

    {
      slug: 'for-ecommerce',
      label: 'ecommerce',
      audience: 'ecommerce and DTC brands',
      intro:
        'Ecommerce ratios look worse than SaaS ratios at every level of health, because contribution margins are 40% rather than 80% and repeat purchase is voluntary. A 3:1 ratio in DTC represents a genuinely strong brand, and many profitable businesses run closer to 2:1.',
      costsToInclude: [
        'All paid media, creative production and influencer fees',
        'First-order discounts, on the CAC side',
        'COGS, shipping, packaging and returns, on the LTV side',
        'Payment processing and marketplace commissions',
      ],
      benchmark: {
        typical: 'Commonly 2:1 to 4:1 on a 12-month LTV basis.',
        good: '3:1 within 12 months, with first-order contribution covering at least half of CAC.',
        note: 'Use a 12-month LTV, not a lifetime one. Multi-year DTC LTV figures are speculative and make weak economics look survivable.',
      },
      defaults: { ltv: 309, cac: 46, arpaMonthly: 55, grossMarginPct: 45 },
      example: {
        scenario:
          'A DTC skincare brand with a $309 twelve-month LTV and $46 blended CAC, at $55 average monthly spend and 45% contribution margin.',
        inputs: [
          { label: 'Customer lifetime value (LTV)', value: '$309' },
          { label: 'Customer acquisition cost (CAC)', value: '$46' },
          { label: 'Average revenue per customer / month', value: '$55' },
          { label: 'Gross margin', value: '45%' },
        ],
        steps: [
          'Ratio = $309 ÷ $46 = about 6.7:1',
          'Payback = $46 ÷ ($55 × 45%) = about 1.9 months',
        ],
        takeaway:
          'Strong on both measures. The binding constraint here is working capital rather than economics — inventory must be bought before the two-month payback arrives, so growth rate is limited by cash on hand.',
      },
    },

    {
      slug: 'for-mobile-apps',
      label: 'mobile apps',
      audience: 'mobile app and game publishers',
      intro:
        'Mobile ratios are computed on paying users and are heavily distorted by store commission, which removes 15–30% of revenue before margin is even considered. The other distortion is speed: mobile cohorts decay so fast that a ratio measured over a lifetime is far less useful than one measured over 90 or 180 days.',
      costsToInclude: [
        'All user acquisition spend, plus attribution and creative costs',
        'App store commission on the LTV side',
        'Server and content delivery per active user',
        'Live-ops content for games',
      ],
      benchmark: {
        typical: 'Commonly 2:1 to 5:1 on a 12-month paying-user basis.',
        good: '3:1 with CAC recovered inside 6 months.',
        note: 'Compute on paying users only. Ratios built on installs are not comparable to anything and will mislead you about whether to scale.',
      },
      defaults: { ltv: 87, cac: 8, arpaMonthly: 9.99, grossMarginPct: 70 },
      example: {
        scenario:
          'A subscription fitness app with an $87 LTV per paying subscriber and $8 cost per paying subscriber, at $9.99 monthly and 70% margin after store fees.',
        inputs: [
          { label: 'Customer lifetime value (LTV)', value: '$87' },
          { label: 'Customer acquisition cost (CAC)', value: '$8' },
          { label: 'Average revenue per customer / month', value: '$9.99' },
          { label: 'Gross margin', value: '70%' },
        ],
        steps: [
          'Ratio = $87 ÷ $8 = about 10.9:1',
          'Payback = $8 ÷ ($9.99 × 70%) = about 1.1 months',
        ],
        takeaway:
          'Excellent on paper, but mobile ratios this good rarely survive scale — cost per paying user rises steeply as you exhaust the cheapest audiences. Re-check the ratio at each doubling of spend rather than assuming it holds.',
      },
    },

    {
      slug: 'for-agencies',
      label: 'agencies',
      audience: 'agencies and retainer-based firms',
      intro:
        'Agencies should demand a higher ratio than software businesses, because their revenue is concentrated in few clients and their delivery capacity is a hard constraint. Losing one client out of twenty is a 5% revenue shock that no SaaS company of equivalent size would ever experience.',
      costsToInclude: [
        'Partner and senior pitch time valued at cost, on the CAC side',
        'Delivery salaries and contractors, on the LTV side',
        'Account management overhead',
        'Referral fees and commissions',
      ],
      benchmark: {
        typical: 'Commonly 8:1 to 20:1, reflecting high retainer values against modest acquisition costs.',
        good: '5:1 or better, given concentration risk.',
        note: 'Compute LTV from actual historic client tenure rather than an implied churn rate. With 20 clients, a "5% monthly churn rate" is one departure, and treating it as a smooth trend is a fiction.',
      },
      defaults: { ltv: 82500, cac: 5500, arpaMonthly: 6000, grossMarginPct: 55 },
      example: {
        scenario:
          'An agency with an $82,500 LTV per retainer client and $5,500 CAC, averaging $6,000 monthly at a 55% margin.',
        inputs: [
          { label: 'Customer lifetime value (LTV)', value: '$82,500' },
          { label: 'Customer acquisition cost (CAC)', value: '$5,500' },
          { label: 'Average revenue per customer / month', value: '$6,000' },
          { label: 'Gross margin', value: '55%' },
        ],
        steps: [
          'Ratio = $82,500 ÷ $5,500 = 15:1',
          'Payback = $5,500 ÷ ($6,000 × 55%) = about 1.7 months',
        ],
        takeaway:
          'The ratio is excellent and largely beside the point. For an agency the binding constraint is delivery capacity, not acquisition economics — the question is whether you can staff the work, not whether you can afford to win it.',
      },
    },

    {
      slug: 'for-fintech',
      label: 'fintech',
      audience: 'fintech and neobank products',
      intro:
        'Fintech ratios have to absorb costs no other sector carries: KYC and verification on every applicant including rejections, fraud losses on new accounts, and signup incentives. They also have to contend with dormancy, which behaves exactly like churn but is invisible in cancellation data.',
      costsToInclude: [
        'KYC, AML and identity verification on all applications, including rejected ones',
        'Signup bonuses, cashback and referral rewards',
        'Fraud losses attributable to newly acquired accounts',
        'Interchange and processing costs on the LTV side',
      ],
      benchmark: {
        typical: 'Commonly 2:1 to 4:1 on funded, active accounts.',
        good: '3:1 with payback inside 12 months.',
        note: 'Define the denominator as funded, active accounts. Registrations outnumber funded accounts by 5–10×, and using them makes a failing ratio look healthy.',
      },
      defaults: { ltv: 165, cac: 55, arpaMonthly: 12, grossMarginPct: 60 },
      example: {
        scenario:
          'A neobank with a $165 LTV per funded account and $55 all-in CAC, earning about $12 a month at a 60% margin after interchange costs.',
        inputs: [
          { label: 'Customer lifetime value (LTV)', value: '$165' },
          { label: 'Customer acquisition cost (CAC)', value: '$55' },
          { label: 'Average revenue per customer / month', value: '$12' },
          { label: 'Gross margin', value: '60%' },
        ],
        steps: [
          'Ratio = $165 ÷ $55 = 3:1',
          'Payback = $55 ÷ ($12 × 60%) = about 7.6 months',
        ],
        takeaway:
          'Exactly at benchmark, which for fintech means there is no margin for error. A rise in fraud losses or a fall in account activity pushes this under 3:1 quickly, so both need monitoring as leading indicators.',
      },
    },

    {
      slug: 'for-subscription-boxes',
      label: 'subscription boxes',
      audience: 'subscription box brands',
      intro:
        'Subscription boxes face thin physical margins and front-loaded churn simultaneously, which compresses the ratio from both directions. The number is also unusually sensitive to how you treat the first-box discount — as a marketing cost it inflates CAC, as a revenue reduction it deflates LTV, and teams often quietly do neither.',
      costsToInclude: [
        'Paid social, influencer and affiliate costs on first orders',
        'First-box discounts and free gifts',
        'COGS, packaging and shipping on the LTV side',
        'Failed-payment recovery and customer service',
      ],
      benchmark: {
        typical: 'Commonly 2:1 to 4:1.',
        good: '3:1 with CAC recovered inside 3 boxes.',
        note: 'Account for the first-box discount exactly once, on either side. Counting it nowhere is the most common error in this category and typically overstates the ratio by 20–30%.',
      },
      defaults: { ltv: 130, cac: 31, arpaMonthly: 39, grossMarginPct: 40 },
      example: {
        scenario:
          'A snack box brand with a $130 LTV and $31 CAC, at $39 monthly and 40% contribution margin after product, packaging and shipping.',
        inputs: [
          { label: 'Customer lifetime value (LTV)', value: '$130' },
          { label: 'Customer acquisition cost (CAC)', value: '$31' },
          { label: 'Average revenue per customer / month', value: '$39' },
          { label: 'Gross margin', value: '40%' },
        ],
        steps: [
          'Ratio = $130 ÷ $31 = about 4.2:1',
          'Payback = $31 ÷ ($39 × 40%) = about 2.0 months',
        ],
        takeaway:
          'Above benchmark, but the two-month payback sits right at the point where most subscribers cancel. A small deterioration in box-two retention moves this business from profitable to marginal without CAC changing at all.',
      },
    },
  ],
};
