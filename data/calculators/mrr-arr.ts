import type { CalculatorConfig } from '@/lib/types';

export const mrrArr: CalculatorConfig = {
  slug: 'mrr-arr-calculator',
  name: 'MRR & ARR Calculator',
  h1: 'MRR and ARR Calculator',
  title: 'MRR & ARR Calculator — Recurring Revenue',
  description:
    'Free MRR and ARR calculator. Enter new, expansion, contraction and churned MRR to get ending MRR, net new MRR, ARR, growth rate and your SaaS quick ratio.',
  blurb:
    'Track recurring revenue properly: net new MRR, ARR, growth rate and the quick ratio.',
  category: 'SaaS & Growth',
  keywords: [
    'mrr calculator',
    'arr calculator',
    'monthly recurring revenue calculator',
    'net new mrr',
    'saas quick ratio calculator',
  ],

  formulaId: 'mrrArr',
  formulaDisplay:
    'Net new MRR = New + Expansion − Contraction − Churned    ·    ARR = Ending MRR × 12',

  fields: [
    {
      id: 'startingMrr',
      label: 'MRR at start of month',
      type: 'currency',
      defaultValue: 250000,
      min: 0,
      step: 1000,
      help: 'Total recurring revenue you entered the month with.',
    },
    {
      id: 'newMrr',
      label: 'New MRR',
      type: 'currency',
      defaultValue: 25000,
      min: 0,
      step: 500,
      help: 'Recurring revenue from customers acquired this month.',
    },
    {
      id: 'expansionMrr',
      label: 'Expansion MRR',
      type: 'currency',
      defaultValue: 12000,
      min: 0,
      step: 500,
      help: 'Upgrades, seat additions and cross-sells from existing customers.',
    },
    {
      id: 'contractionMrr',
      label: 'Contraction MRR',
      type: 'currency',
      defaultValue: 3000,
      min: 0,
      step: 500,
      help: 'Downgrades and seat reductions from customers who stayed.',
    },
    {
      id: 'churnedMrr',
      label: 'Churned MRR',
      type: 'currency',
      defaultValue: 8000,
      min: 0,
      step: 500,
      help: 'Recurring revenue lost to cancellations.',
    },
  ],

  results: [
    {
      id: 'endingMrr',
      label: 'Ending MRR',
      format: 'currency',
      primary: true,
      help: 'Where you finish the month. Starting MRR plus net new.',
    },
    { id: 'netNewMrr', label: 'Net new MRR', format: 'currency' },
    { id: 'arr', label: 'ARR (ending MRR × 12)', format: 'currency' },
    { id: 'growthRatePct', label: 'Monthly growth rate', format: 'percent' },
    {
      id: 'quickRatio',
      label: 'SaaS quick ratio',
      format: 'ratio',
      help: 'Growth earned vs growth lost. Above 4 is strong; below 1 means you are shrinking.',
    },
  ],

  intro: [
    'Monthly recurring revenue is the normalised, predictable revenue your subscriptions produce each month, and ARR is simply that figure annualised. Breaking MRR into its four moving parts — new, expansion, contraction and churn — turns a single number into a diagnosis of what is actually happening.',
    'Enter your figures below. Everything runs in your browser — nothing is uploaded, stored or sent anywhere.',
  ],

  sections: [
    {
      heading: 'How to calculate MRR and ARR',
      body: [
        'MRR is the sum of all recurring subscription revenue normalised to a monthly figure. Annual contracts get divided by 12, quarterly by 3. ARR is ending MRR multiplied by 12 — not the revenue you actually collected over the past year, which is a different and much less useful number.',
        'Only genuinely recurring revenue belongs in MRR. One-off implementation fees, professional services, hardware sales and usage overages that vary month to month all fail the test: if a customer could cancel tomorrow and you would stop receiving it on a predictable schedule, it is recurring; if it happened once, it is not. Including setup fees is the most common way MRR gets quietly inflated.',
      ],
      bullets: [
        'Normalise annual contracts by dividing by 12 — never book the full year as one month of MRR.',
        'Exclude one-off fees, professional services and hardware.',
        'Report discounts at net, not list price, or MRR will overstate what you actually bill.',
      ],
    },
    {
      heading: 'The four components of MRR movement',
      body: [
        'New MRR comes from customers acquired this month. Expansion MRR comes from existing customers paying more — upgrades, seats, cross-sells. Contraction MRR is existing customers paying less. Churned MRR is what left entirely.',
        'Net new MRR is new plus expansion minus contraction minus churn, and it is the number that tells you whether the month was good. Two companies can both add $26,000 of net new MRR while being in completely different health: one from $28,000 of new business against $2,000 of losses, another from $60,000 of new business against $34,000 of losses. The second is running a leaky bucket and will stall as soon as acquisition slows.',
      ],
    },
    {
      heading: 'The SaaS quick ratio',
      body: [
        'The quick ratio divides growth earned by growth lost: new plus expansion, over contraction plus churn. It answers how efficiently you convert acquisition effort into net growth, and it exposes exactly the leaky-bucket problem net new MRR hides.',
        'Above 4 is generally considered strong — you gain four dollars for every one you lose. Between 2 and 4 is workable. Below 1 means you are shrinking regardless of how much new business you write. A company with a 1.5 quick ratio can still post growth by spending more on sales, but it is buying revenue that leaves again, and the cost of that treadmill rises every month.',
      ],
    },
    {
      heading: 'Why ARR is not annual revenue',
      body: [
        'ARR is a run-rate: what you would earn over the next twelve months if nothing changed. It is forward-looking and calculated from a single point in time. Annual revenue is what you actually recognised over the past twelve months, and for any growing company the two differ substantially — a business that tripled during the year will report an ARR far above its recognised revenue.',
        'Both are legitimate; confusing them is not. Investors typically ask for ARR because it reflects current scale rather than historical accumulation, while accountants report recognised revenue because that is what accounting standards require. If you quote ARR, say so explicitly, and be prepared to show the MRR it derives from.',
      ],
    },
  ],

  workedExample: {
    scenario:
      'A SaaS company begins the month with $250,000 MRR. It signs new customers worth $25,000, existing customers upgrade by $12,000, some downgrade by $3,000, and cancellations remove $8,000.',
    inputs: [
      { label: 'MRR at start of month', value: '$250,000' },
      { label: 'New MRR', value: '$25,000' },
      { label: 'Expansion MRR', value: '$12,000' },
      { label: 'Contraction MRR', value: '$3,000' },
      { label: 'Churned MRR', value: '$8,000' },
    ],
    steps: [
      'Net new MRR = $25,000 + $12,000 − $3,000 − $8,000 = $26,000',
      'Ending MRR = $250,000 + $26,000 = $276,000',
      'ARR = $276,000 × 12 = $3,312,000',
      'Monthly growth rate = $26,000 ÷ $250,000 = 10.4%',
      'Quick ratio = ($25,000 + $12,000) ÷ ($3,000 + $8,000) = about 3.4',
    ],
    takeaway:
      'A 10.4% monthly growth rate compounds to roughly 3.3× over a year, and a 3.4 quick ratio says most of that growth is being kept rather than recycled. Expansion at nearly half of new MRR is the healthiest signal in the set.',
  },

  faqs: [
    {
      q: 'How do I calculate MRR from annual contracts?',
      a: 'Divide annual contract value by 12. A $24,000 annual contract is $2,000 of MRR, recognised each month across the term — not $24,000 in the month it was signed.',
    },
    {
      q: 'Should one-time fees be included in MRR?',
      a: 'No. Setup fees, implementation charges, professional services and hardware are non-recurring. Including them inflates MRR and makes your growth look more durable than it is.',
    },
    {
      q: 'What is the difference between ARR and annual revenue?',
      a: 'ARR is a forward-looking run-rate: current MRR × 12. Annual revenue is what you actually recognised over the past year. For a fast-growing company ARR will be considerably higher.',
    },
    {
      q: 'What is a good SaaS quick ratio?',
      a: 'Above 4 is strong, 2–4 is workable, and below 1 means you are shrinking. It measures how much of your gross growth survives churn and contraction.',
    },
    {
      q: 'How do I handle usage-based or hybrid pricing in MRR?',
      a: 'Include the committed or platform portion as MRR, and track variable usage separately. If usage is stable and predictable, many companies include a trailing average and disclose that they do.',
    },
    {
      q: 'Does this calculator send my data anywhere?',
      a: 'No. Every calculation runs locally in your browser using JavaScript. Nothing is transmitted to a server, logged or stored.',
    },
  ],

  related: ['churn-rate-calculator', 'ltv-calculator', 'saas-break-even-calculator', 'cac-calculator'],

  variants: [
    {
      slug: 'for-saas',
      label: 'SaaS',
      audience: 'B2B SaaS companies',
      intro:
        'For B2B SaaS the composition of MRR growth matters more than its size. A company growing on expansion revenue has fundamentally different economics from one growing purely on new logos, because expansion arrives at close to zero acquisition cost and signals that the product is becoming more valuable over time.',
      costsToInclude: [
        'Annual and multi-year contracts normalised to monthly',
        'Seat expansions and tier upgrades, as expansion MRR',
        'Discounts applied at net rather than list price',
        'Excluded: implementation fees, training and professional services',
      ],
      benchmark: {
        typical:
          'Early-stage SaaS often targets 10–15% monthly growth; at scale, 5–7% monthly is strong.',
        good: 'Quick ratio above 4, with expansion MRR at 30%+ of new MRR.',
        note: 'Track expansion as a share of net new MRR over time. When it passes about 40%, growth becomes materially cheaper because a large part of it costs almost nothing to acquire.',
      },
      defaults: {
        startingMrr: 325000,
        newMrr: 30000,
        expansionMrr: 20000,
        contractionMrr: 2000,
        churnedMrr: 4000,
      },
      example: {
        scenario:
          'A mid-market SaaS company starts at $325,000 MRR, adds $30,000 new and $20,000 expansion, loses $2,000 to downgrades and $4,000 to churn.',
        inputs: [
          { label: 'MRR at start of month', value: '$325,000' },
          { label: 'New MRR', value: '$30,000' },
          { label: 'Expansion MRR', value: '$20,000' },
          { label: 'Contraction MRR', value: '$2,000' },
          { label: 'Churned MRR', value: '$4,000' },
        ],
        steps: [
          'Net new MRR = $30,000 + $20,000 − $2,000 − $4,000 = $44,000',
          'Ending MRR = $369,000, ARR = $4,428,000',
          'Growth rate = $44,000 ÷ $325,000 = about 13.5%',
          'Quick ratio = $50,000 ÷ $6,000 = about 8.3',
        ],
        takeaway:
          'A quick ratio of 8.3 is exceptional — very little of the growth is leaking back out. With expansion at two-thirds of new MRR, a large share of this growth is arriving essentially free.',
      },
    },

    {
      slug: 'for-agencies',
      label: 'agencies',
      audience: 'agencies moving to retainer models',
      intro:
        'Agencies shifting from project work to retainers gain a genuine MRR line, but only for the recurring portion. The discipline that matters is separating retainer revenue from project revenue — blending them produces a number that looks like MRR, behaves like project income, and misleads anyone valuing the business.',
      costsToInclude: [
        'Monthly retainers, at contracted value',
        'Scope increases on existing retainers, as expansion',
        'Excluded: one-off projects, media spend passed through, and overages',
        'Retainer reductions, as contraction rather than churn',
      ],
      benchmark: {
        typical:
          'Agencies with 60%+ of revenue on retainer are considerably more valuable per dollar than project shops.',
        good: 'Recurring revenue above 70% of total, with a quick ratio above 3.',
        note: 'Pass-through media spend is not your revenue and must never enter MRR. It is the single most common way agency recurring revenue gets overstated.',
      },
      defaults: {
        startingMrr: 120000,
        newMrr: 12000,
        expansionMrr: 6000,
        contractionMrr: 3000,
        churnedMrr: 6000,
      },
      example: {
        scenario:
          'An agency starts at $120,000 in monthly retainers, wins two clients worth $12,000, expands existing scopes by $6,000, has $3,000 of scope reductions and loses one $6,000 client.',
        inputs: [
          { label: 'MRR at start of month', value: '$120,000' },
          { label: 'New MRR', value: '$12,000' },
          { label: 'Expansion MRR', value: '$6,000' },
          { label: 'Contraction MRR', value: '$3,000' },
          { label: 'Churned MRR', value: '$6,000' },
        ],
        steps: [
          'Net new MRR = $12,000 + $6,000 − $3,000 − $6,000 = $9,000',
          'Ending MRR = $129,000, ARR = $1,548,000',
          'Growth rate = $9,000 ÷ $120,000 = 7.5%',
          'Quick ratio = $18,000 ÷ $9,000 = 2.0',
        ],
        takeaway:
          'A quick ratio of 2.0 means half of gross growth is being lost again. For an agency with few clients that is one departure per month — which makes retainer length, not new business, the constraint on growth.',
      },
    },

    {
      slug: 'for-subscription-boxes',
      label: 'subscription boxes',
      audience: 'subscription box and replenishment brands',
      intro:
        'Subscription boxes generate real MRR, but with churn rates several times higher than software the churned-MRR line dominates everything. Skips complicate matters further: a skipped month is neither churn nor revenue, and treating it as either distorts the picture.',
      costsToInclude: [
        'Active subscriptions at their billed rate net of discounts',
        'Upgrades to larger or premium boxes, as expansion',
        'Skipped months tracked separately from cancellations',
        'Failed payments as churn only once the recovery window closes',
      ],
      benchmark: {
        typical: 'Monthly churned MRR of 10–15% of starting MRR is common.',
        good: 'Quick ratio above 2, given the structurally high churn.',
        note: 'Handle skips explicitly and consistently. Counted as churn they make retention look catastrophic; ignored entirely they make revenue look higher than it will be.',
      },
      defaults: {
        startingMrr: 195000,
        newMrr: 35000,
        expansionMrr: 4000,
        contractionMrr: 3000,
        churnedMrr: 23400,
      },
      example: {
        scenario:
          'A snack box brand starts at $195,000 MRR, adds $35,000 from new subscribers and $4,000 from upgrades, loses $3,000 to downgrades and $23,400 to cancellations.',
        inputs: [
          { label: 'MRR at start of month', value: '$195,000' },
          { label: 'New MRR', value: '$35,000' },
          { label: 'Expansion MRR', value: '$4,000' },
          { label: 'Contraction MRR', value: '$3,000' },
          { label: 'Churned MRR', value: '$23,400' },
        ],
        steps: [
          'Net new MRR = $35,000 + $4,000 − $3,000 − $23,400 = $12,600',
          'Ending MRR = $207,600, ARR = $2,491,200',
          'Growth rate = $12,600 ÷ $195,000 = about 6.5%',
          'Quick ratio = $39,000 ÷ $26,400 = about 1.5',
        ],
        takeaway:
          'A 1.5 quick ratio means two-thirds of gross growth leaks straight back out. The business is growing only because it keeps buying subscribers — pausing acquisition for one month would put it into decline.',
      },
    },

    {
      slug: 'for-mobile-apps',
      label: 'mobile apps',
      audience: 'subscription app publishers',
      intro:
        'App subscription MRR has to account for store commission and for the reporting lag the stores impose. Revenue nets down 15–30% before it reaches you, and cancellations only surface at the end of a billing period — so this month\'s churn number is partly next month\'s news.',
      costsToInclude: [
        'Subscription revenue net of app store commission',
        'Annual plans normalised to monthly',
        'Upgrades from monthly to annual, as expansion',
        'Excluded: one-off in-app purchases and consumables',
      ],
      benchmark: {
        typical: 'Monthly churned MRR of 5–10% of starting MRR for subscription apps.',
        good: 'Quick ratio above 2.5, with a rising share of annual plans.',
        note: 'Book MRR net of store commission. Gross-of-fee MRR overstates the business by up to 30% and will not reconcile with your bank deposits.',
      },
      defaults: {
        startingMrr: 400000,
        newMrr: 60000,
        expansionMrr: 6000,
        contractionMrr: 4000,
        churnedMrr: 32000,
      },
      example: {
        scenario:
          'A subscription app starts at $400,000 net MRR, adds $60,000 from new subscribers and $6,000 from annual upgrades, loses $4,000 to plan downgrades and $32,000 to cancellations.',
        inputs: [
          { label: 'MRR at start of month', value: '$400,000' },
          { label: 'New MRR', value: '$60,000' },
          { label: 'Expansion MRR', value: '$6,000' },
          { label: 'Contraction MRR', value: '$4,000' },
          { label: 'Churned MRR', value: '$32,000' },
        ],
        steps: [
          'Net new MRR = $60,000 + $6,000 − $4,000 − $32,000 = $30,000',
          'Ending MRR = $430,000, ARR = $5,160,000',
          'Growth rate = $30,000 ÷ $400,000 = 7.5%',
          'Quick ratio = $66,000 ÷ $36,000 = about 1.8',
        ],
        takeaway:
          'Growing at 7.5% but with a 1.8 quick ratio — more than half of gross growth is replacing churned subscribers. Shifting users to annual plans is the most direct fix, since it removes eleven cancellation points a year.',
      },
    },

    {
      slug: 'for-membership-sites',
      label: 'membership sites',
      audience: 'communities, newsletters and membership businesses',
      intro:
        'Membership businesses have near-100% gross margins and almost no marginal cost per member, which makes MRR an unusually clean read on the business. The risk is concentration of a different kind: growth is often driven by the founder\'s audience, so new MRR can dry up abruptly when their attention moves elsewhere.',
      costsToInclude: [
        'Recurring membership fees net of discounts',
        'Annual memberships normalised to monthly',
        'Tier upgrades and add-on communities, as expansion',
        'Excluded: one-off course sales and event tickets',
      ],
      benchmark: {
        typical: 'Monthly churn of 5–10% is common; annual plans reduce it substantially.',
        good: 'Quick ratio above 3, with over half of members on annual billing.',
        note: 'Watch the share of new MRR that arrives in launch spikes. A business dependent on periodic launches has lumpier and less durable revenue than the MRR figure suggests.',
      },
      defaults: {
        startingMrr: 60000,
        newMrr: 9000,
        expansionMrr: 1500,
        contractionMrr: 800,
        churnedMrr: 4200,
      },
      example: {
        scenario:
          'A paid community starts at $60,000 MRR, adds $9,000 from new members and $1,500 from tier upgrades, loses $800 to downgrades and $4,200 to cancellations.',
        inputs: [
          { label: 'MRR at start of month', value: '$60,000' },
          { label: 'New MRR', value: '$9,000' },
          { label: 'Expansion MRR', value: '$1,500' },
          { label: 'Contraction MRR', value: '$800' },
          { label: 'Churned MRR', value: '$4,200' },
        ],
        steps: [
          'Net new MRR = $9,000 + $1,500 − $800 − $4,200 = $5,500',
          'Ending MRR = $65,500, ARR = $786,000',
          'Growth rate = $5,500 ÷ $60,000 = about 9.2%',
          'Quick ratio = $10,500 ÷ $5,000 = 2.1',
        ],
        takeaway:
          'Healthy growth, but a 2.1 quick ratio means nearly half of gross growth is replacing departures. At near-100% margins the churned MRR falls straight to the bottom line, so retention work here pays back faster than in almost any other model.',
      },
    },
  ],
};
