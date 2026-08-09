import type { CalculatorConfig } from '@/lib/types';

export const churn: CalculatorConfig = {
  slug: 'churn-rate-calculator',
  name: 'Churn Rate Calculator',
  h1: 'Churn Rate Calculator',
  title: 'Churn Rate Calculator — Customer & Revenue Churn',
  description:
    'Free churn rate calculator. Get customer churn, retention rate, average customer lifetime, gross revenue churn and net revenue retention from your monthly numbers.',
  blurb:
    'Customer churn, revenue churn and net revenue retention — the three numbers that are never the same.',
  category: 'SaaS & Growth',
  keywords: [
    'churn rate calculator',
    'customer churn calculator',
    'net revenue retention calculator',
    'how to calculate churn rate',
    'retention rate calculator',
  ],

  formulaId: 'churnRate',
  formulaDisplay:
    'Churn rate = Customers lost during the period ÷ Customers at the start of the period × 100',

  fields: [
    {
      id: 'customersStart',
      label: 'Customers at start of period',
      type: 'number',
      defaultValue: 500,
      min: 0,
      step: 1,
      help: 'Do not include customers acquired during the period — that understates churn.',
    },
    {
      id: 'customersLost',
      label: 'Customers lost during period',
      type: 'number',
      defaultValue: 15,
      min: 0,
      step: 1,
      help: 'Cancellations and non-renewals from the starting cohort.',
    },
    {
      id: 'mrrStart',
      label: 'MRR at start of period',
      type: 'currency',
      defaultValue: 250000,
      min: 0,
      step: 1000,
      optional: true,
      help: 'Optional — needed for revenue churn and net revenue retention.',
    },
    {
      id: 'mrrChurned',
      label: 'MRR lost to churn and downgrades',
      type: 'currency',
      defaultValue: 8000,
      min: 0,
      step: 100,
      optional: true,
      help: 'Cancelled MRR plus contraction from downgrades.',
    },
    {
      id: 'mrrExpansion',
      label: 'Expansion MRR',
      type: 'currency',
      defaultValue: 12000,
      min: 0,
      step: 100,
      optional: true,
      help: 'Upgrades, seat additions and cross-sells from existing customers.',
    },
  ],

  results: [
    {
      id: 'customerChurnPct',
      label: 'Customer churn rate',
      format: 'percent',
      primary: true,
      help: 'The share of your starting customer base that left this period.',
    },
    { id: 'retentionPct', label: 'Customer retention rate', format: 'percent' },
    { id: 'avgLifetimeMonths', label: 'Average customer lifetime', format: 'months' },
    { id: 'grossRevenueChurnPct', label: 'Gross revenue churn', format: 'percent' },
    {
      id: 'netRevenueRetentionPct',
      label: 'Net revenue retention (NRR)',
      format: 'percent',
      help: 'Above 100% means existing customers grow faster than others leave.',
    },
  ],

  intro: [
    'Churn rate is the percentage of customers or revenue you lose in a period. It is the most destructive number in a subscription business, because it compounds: every point of churn permanently caps how large the company can get at a given rate of acquisition.',
    'Enter your figures below. Everything runs in your browser — nothing is uploaded, stored or sent anywhere.',
  ],

  sections: [
    {
      heading: 'How to calculate churn rate',
      body: [
        'Divide the customers lost during a period by the customers you had at the start of it, then multiply by 100. Losing 15 of 500 customers in a month is 3% monthly churn.',
        'The denominator is where most churn numbers go wrong. Using the average or ending customer count instead of the starting count systematically understates churn, and the faster you are growing the bigger the distortion — because customers acquired mid-period had no realistic chance to cancel yet. Use the starting cohort, and count only losses from that cohort.',
      ],
      bullets: [
        'Never annualise by multiplying by 12. 3% monthly is about 31% annually, not 36%, because you churn a shrinking base.',
        'Report customer churn and revenue churn separately. They tell different stories.',
        'Segment by plan and by cohort age — a single blended rate hides almost everything actionable.',
      ],
    },
    {
      heading: 'Customer churn vs revenue churn',
      body: [
        'Customer churn counts logos; revenue churn counts money. They diverge whenever the customers who leave are not average-sized, which is nearly always. If your small accounts cancel most, revenue churn will be lower than customer churn and the business is healthier than the headline number suggests. If you are losing large accounts, revenue churn is higher and the situation is considerably worse.',
        'Gross revenue churn measures only what left: cancelled MRR plus downgrades, divided by starting MRR. It can never be better than zero. Net revenue retention subtracts churn but adds expansion, so it can exceed 100% — meaning your existing customer base grows without a single new customer. That is the strongest structural signal a subscription business can produce, and it is why NRR above 110% commands premium valuations.',
      ],
    },
    {
      heading: 'What churn rate is acceptable',
      body: [
        'It depends almost entirely on who you sell to. Enterprise SaaS commonly runs under 1% monthly, mid-market 1–2%, SMB 3–5%, and self-serve consumer products often higher still. Consumer subscriptions and subscription boxes routinely see 10%+ monthly in the early months.',
        'The reason SMB churn is structurally higher is not product quality — small businesses fail, change direction and cut costs at a rate enterprises do not. What matters is whether your churn is normal for your segment and whether it is trending down. Compare against your own last four quarters before comparing against anyone else\'s benchmark.',
      ],
    },
    {
      heading: 'Reducing churn is worth more than reducing CAC',
      body: [
        'Because lifetime value is inversely proportional to churn, cutting monthly churn from 5% to 4% raises average lifetime from 20 months to 25 and lifts LTV by 25%. Very little you can do to acquisition costs moves the number that hard, and unlike CAC improvements, churn improvements apply to every customer you already have.',
        'Most churn is decided long before anyone cancels. The largest single lever is onboarding — customers who reach a meaningful outcome in the first weeks retain at multiples of those who do not. After that: watching usage decline as an early warning, fixing failed payments (involuntary churn is commonly 20–40% of total churn and is largely a solvable technical problem), and offering annual plans, which remove eleven cancellation opportunities a year.',
      ],
    },
  ],

  workedExample: {
    scenario:
      'A B2B SaaS company starts the month with 500 customers and $250,000 in MRR. During the month 15 customers cancel, taking $8,000 of MRR with them including downgrades, while existing customers add $12,000 in upgrades and extra seats.',
    inputs: [
      { label: 'Customers at start of period', value: '500' },
      { label: 'Customers lost during period', value: '15' },
      { label: 'MRR at start of period', value: '$250,000' },
      { label: 'MRR lost to churn and downgrades', value: '$8,000' },
      { label: 'Expansion MRR', value: '$12,000' },
    ],
    steps: [
      'Customer churn = 15 ÷ 500 = 3.0% per month',
      'Retention = 100% − 3.0% = 97.0%',
      'Average customer lifetime = 1 ÷ 0.03 = about 33.3 months',
      'Gross revenue churn = $8,000 ÷ $250,000 = 3.2%',
      'Net revenue retention = ($250,000 − $8,000 + $12,000) ÷ $250,000 = 101.6%',
    ],
    takeaway:
      'Revenue churn slightly exceeds customer churn, so the accounts leaving are marginally larger than average — worth investigating. But NRR above 100% means the base is still growing on its own: even with zero new customers, revenue would rise next month.',
  },

  faqs: [
    {
      q: 'What is the formula for churn rate?',
      a: 'Churn rate = customers lost during the period ÷ customers at the start of the period × 100. Use the starting count, not the average or ending count, or you will understate churn.',
    },
    {
      q: 'How do I convert monthly churn to annual churn?',
      a: 'Annual churn = 1 − (1 − monthly churn)^12. At 3% monthly that is 1 − 0.97^12 ≈ 30.6%, not 36%. Multiplying by 12 overstates it because each month churns a smaller remaining base.',
    },
    {
      q: 'What is a good churn rate?',
      a: 'Under 1% monthly for enterprise SaaS, 1–2% for mid-market, 3–5% for SMB, and higher for self-serve consumer products. Compare against your own trend before comparing against benchmarks.',
    },
    {
      q: 'What is net revenue retention?',
      a: 'Starting MRR minus churned and contracted MRR plus expansion MRR, divided by starting MRR. Above 100% means existing customers generate more revenue over time than you lose to cancellations.',
    },
    {
      q: 'What is involuntary churn?',
      a: 'Customers lost to failed payments — expired cards, insufficient funds, bank declines — rather than a decision to leave. It is commonly 20–40% of total churn and largely recoverable with dunning emails and card-updater services.',
    },
    {
      q: 'Does this calculator send my data anywhere?',
      a: 'No. Every calculation runs locally in your browser using JavaScript. Nothing is transmitted to a server, logged or stored.',
    },
  ],

  related: ['ltv-calculator', 'mrr-arr-calculator', 'cac-calculator', 'ltv-cac-ratio-calculator'],

  variants: [
    {
      slug: 'for-saas',
      label: 'SaaS',
      audience: 'B2B SaaS companies',
      intro:
        'SaaS is the context churn metrics were designed for, and the one where net revenue retention matters most. A B2B SaaS company with NRR above 110% has a business that grows without new customers, which changes both its valuation and its strategic options entirely.',
      costsToInclude: [
        'Voluntary cancellations from the starting cohort',
        'Non-renewals on annual contracts, counted in the renewal month',
        'Downgrades and seat reductions, as contraction MRR',
        'Failed payments not recovered within the dunning window',
      ],
      benchmark: {
        typical:
          'Under 1% monthly for enterprise, 1–2% mid-market, 3–5% SMB. NRR of 100–120% is typical for healthy B2B SaaS.',
        good: 'NRR above 110% with gross revenue churn under 1% monthly.',
        note: 'Annual contracts distort monthly churn — renewals land in specific months. Measure churn on a cohort basis by renewal date rather than as a flat monthly average.',
      },
      defaults: {
        customersStart: 500,
        customersLost: 10,
        mrrStart: 325000,
        mrrChurned: 4000,
        mrrExpansion: 20000,
      },
      example: {
        scenario:
          'A mid-market SaaS company starts with 500 accounts and $325,000 MRR, loses 10 accounts and $4,000 MRR, and adds $20,000 in expansion.',
        inputs: [
          { label: 'Customers at start of period', value: '500' },
          { label: 'Customers lost during period', value: '10' },
          { label: 'MRR at start of period', value: '$325,000' },
          { label: 'MRR lost to churn and downgrades', value: '$4,000' },
          { label: 'Expansion MRR', value: '$20,000' },
        ],
        steps: [
          'Customer churn = 10 ÷ 500 = 2.0%',
          'Gross revenue churn = $4,000 ÷ $325,000 = about 1.2%',
          'NRR = ($325,000 − $4,000 + $20,000) ÷ $325,000 = about 104.9%',
        ],
        takeaway:
          'Revenue churn well below customer churn means the accounts leaving are small ones — the healthy pattern. At 104.9% NRR the base grows on its own, though there is room to push expansion harder.',
      },
    },

    {
      slug: 'for-ecommerce',
      label: 'ecommerce',
      audience: 'ecommerce and DTC brands',
      intro:
        'Ecommerce customers never cancel — they simply stop buying, which means churn has to be defined before it can be measured. The standard approach is a lapse window appropriate to your category, after which a customer counts as churned, and the choice of window changes the answer dramatically.',
      costsToInclude: [
        'Customers with no purchase inside your defined lapse window',
        'Subscribe-and-save cancellations, where you offer them',
        'Accounts lost to failed payments on recurring orders',
      ],
      benchmark: {
        typical:
          'Repeat purchase rates of 20–40% within 12 months are common, implying high effective churn by SaaS standards.',
        good: 'A repeat purchase rate above 30% and a rising share of revenue from returning customers.',
        note: 'Pick a lapse window that matches your replenishment cycle — 90 days for consumables, 12 months for durables — and never change it mid-analysis.',
      },
      defaults: {
        customersStart: 8000,
        customersLost: 640,
        mrrStart: 440000,
        mrrChurned: 40000,
        mrrExpansion: 15000,
      },
      example: {
        scenario:
          'A DTC brand starts a month with 8,000 active customers generating $440,000, sees 640 lapse past its 90-day window taking $40,000 of run-rate revenue, and grows $15,000 from increased order frequency among the rest.',
        inputs: [
          { label: 'Customers at start of period', value: '8,000' },
          { label: 'Customers lost during period', value: '640' },
          { label: 'MRR at start of period', value: '$440,000' },
          { label: 'MRR lost to churn and downgrades', value: '$40,000' },
          { label: 'Expansion MRR', value: '$15,000' },
        ],
        steps: [
          'Customer churn = 640 ÷ 8,000 = 8.0% monthly',
          'Gross revenue churn = $40,000 ÷ $440,000 = about 9.1%',
          'NRR = ($440,000 − $40,000 + $15,000) ÷ $440,000 = about 94.3%',
        ],
        takeaway:
          'NRR below 100% means the existing base shrinks every month, so all growth must be bought. Revenue churn above customer churn says the lapsing customers are the higher-spending ones — the most urgent thing on the list.',
      },
    },

    {
      slug: 'for-mobile-apps',
      label: 'mobile apps',
      audience: 'mobile app and game publishers',
      intro:
        'Mobile churn is front-loaded to an extreme found nowhere else: a large share of users are gone within a week of install, and subscription apps see their biggest cliff at the first renewal after a free trial. A single blended monthly rate is close to meaningless here — day-1, day-7 and day-30 retention are the operational numbers.',
      costsToInclude: [
        'Subscription cancellations and non-renewals through the app stores',
        'Billing retry failures, which the stores handle differently from web billing',
        'Trial-to-paid drop-off, measured separately from ongoing churn',
        'Users who uninstall while still nominally subscribed',
      ],
      benchmark: {
        typical:
          'Monthly subscriber churn of 5–10% after the first renewal; day-30 retention of 5–10% for consumer apps is common.',
        good: 'Trial-to-paid conversion above 40% with post-renewal churn under 6%.',
        note: 'Store subscription data lags — cancellations appear at period end, not at the moment the user decides. Expect a reporting delay of up to a full billing cycle.',
      },
      defaults: {
        customersStart: 40000,
        customersLost: 3200,
        mrrStart: 400000,
        mrrChurned: 32000,
        mrrExpansion: 6000,
      },
      example: {
        scenario:
          'A subscription app starts the month with 40,000 paying subscribers generating $400,000, loses 3,200 of them worth $32,000, and gains $6,000 from upgrades to annual plans.',
        inputs: [
          { label: 'Customers at start of period', value: '40,000' },
          { label: 'Customers lost during period', value: '3,200' },
          { label: 'MRR at start of period', value: '$400,000' },
          { label: 'MRR lost to churn and downgrades', value: '$32,000' },
          { label: 'Expansion MRR', value: '$6,000' },
        ],
        steps: [
          'Customer churn = 3,200 ÷ 40,000 = 8.0% monthly',
          'Average subscriber lifetime = 1 ÷ 0.08 = 12.5 months',
          'NRR = ($400,000 − $32,000 + $6,000) ÷ $400,000 = 93.5%',
        ],
        takeaway:
          'At 8% monthly the app replaces its entire subscriber base roughly every year, so acquisition can never stop. Pushing annual plans is the highest-leverage fix available — it removes eleven cancellation decisions per subscriber per year.',
      },
    },

    {
      slug: 'for-subscription-boxes',
      label: 'subscription boxes',
      audience: 'subscription box brands',
      intro:
        'Subscription box churn is bimodal and averages lie about it. A large share of subscribers cancel after box one or two, while those who reach box four often stay for years. A blended monthly rate sits between two populations that behave nothing alike and describes neither.',
      costsToInclude: [
        'Cancellations, split by box number rather than blended',
        'Skips that never resume, which are churn in slow motion',
        'Failed payments — a large share of box churn is involuntary',
        'Pauses beyond your defined reactivation window',
      ],
      benchmark: {
        typical:
          'Monthly churn of 10–15% blended, with box-one to box-two drop-off frequently above 30%.',
        good: 'Box-three retention above 50%, and steady-state churn under 8% thereafter.',
        note: 'Report churn by box number, not by month. It is the only view that separates the early cliff from your genuine long-term retention.',
      },
      defaults: {
        customersStart: 5000,
        customersLost: 600,
        mrrStart: 195000,
        mrrChurned: 23400,
        mrrExpansion: 4000,
      },
      example: {
        scenario:
          'A snack box brand starts with 5,000 subscribers at $195,000 MRR, loses 600 subscribers worth $23,400, and gains $4,000 from upgrades to larger boxes.',
        inputs: [
          { label: 'Customers at start of period', value: '5,000' },
          { label: 'Customers lost during period', value: '600' },
          { label: 'MRR at start of period', value: '$195,000' },
          { label: 'MRR lost to churn and downgrades', value: '$23,400' },
          { label: 'Expansion MRR', value: '$4,000' },
        ],
        steps: [
          'Customer churn = 600 ÷ 5,000 = 12.0% monthly',
          'Average lifetime = 1 ÷ 0.12 = about 8.3 months',
          'NRR = ($195,000 − $23,400 + $4,000) ÷ $195,000 = about 90.1%',
        ],
        takeaway:
          'The 8.3-month average hides everything that matters. Split it by box number and the picture is usually a 30%+ cliff at box two and near-stable retention afterwards — which points all your effort at the first six weeks.',
      },
    },

    {
      slug: 'for-gyms',
      label: 'gyms and fitness studios',
      audience: 'gyms, studios and membership businesses',
      intro:
        'Gym churn is seasonal and concentrated in the first 90 days, and it is driven by attendance more than anything else. Members who visit fewer than four times a month cancel at a far higher rate, which makes attendance the leading indicator that actually gives you time to intervene.',
      costsToInclude: [
        'Cancellations within notice periods',
        'Frozen memberships that never reactivate',
        'Failed direct debits, a large share of gym churn',
        'Non-renewals on fixed-term contracts',
      ],
      benchmark: {
        typical:
          'Monthly churn of 3–6% for traditional gyms; boutique studios often higher. January cohorts churn at well above the annual average.',
        good: 'Average member tenure above 18 months, with first-90-day retention above 80%.',
        note: 'Measure churn by joining cohort, not calendar month. January joiners behave so differently from September joiners that blending them hides both patterns.',
      },
      defaults: {
        customersStart: 800,
        customersLost: 40,
        mrrStart: 48000,
        mrrChurned: 2400,
        mrrExpansion: 1200,
      },
      example: {
        scenario:
          'A studio starts the month with 800 members generating $48,000, loses 40 members worth $2,400, and adds $1,200 from personal training upsells.',
        inputs: [
          { label: 'Customers at start of period', value: '800' },
          { label: 'Customers lost during period', value: '40' },
          { label: 'MRR at start of period', value: '$48,000' },
          { label: 'MRR lost to churn and downgrades', value: '$2,400' },
          { label: 'Expansion MRR', value: '$1,200' },
        ],
        steps: [
          'Customer churn = 40 ÷ 800 = 5.0% monthly',
          'Average member tenure = 1 ÷ 0.05 = 20 months',
          'NRR = ($48,000 − $2,400 + $1,200) ÷ $48,000 = about 97.5%',
        ],
        takeaway:
          'At 5% monthly the studio replaces 60% of its membership a year. With a $104 CAC per member, cutting churn to 4% is worth about $210 of extra LTV per member — more than any plausible saving on acquisition.',
      },
    },

    {
      slug: 'for-insurance',
      label: 'insurance',
      audience: 'insurance agencies and brokers',
      intro:
        'Insurance measures retention rather than churn, annually rather than monthly, and calls it persistency. Because renewal commission costs almost nothing to earn relative to new business, a single point of persistency is worth several points of new-business growth — which is why retention is the entire economic engine of an agency.',
      costsToInclude: [
        'Policies lapsed or non-renewed at anniversary',
        'Mid-term cancellations',
        'Policies rewritten with another carrier',
        'Payment-failure lapses, which are recoverable',
      ],
      benchmark: {
        typical:
          'Personal lines retention of 80–90% annually; commercial lines often higher. That is roughly 1–2% monthly.',
        good: 'Above 90% annual retention, with first-year persistency above 80%.',
        note: 'Convert carefully: 85% annual retention is about 1.3% monthly churn, not 15%. Treating the annual figure as monthly understates customer lifetime by roughly ten times.',
      },
      defaults: {
        customersStart: 2400,
        customersLost: 31,
        mrrStart: 264000,
        mrrChurned: 3400,
        mrrExpansion: 2000,
      },
      example: {
        scenario:
          'An agency starts a month with 2,400 in-force policies earning $264,000 in monthly commission, loses 31 policies worth $3,400, and adds $2,000 from coverage increases.',
        inputs: [
          { label: 'Customers at start of period', value: '2,400' },
          { label: 'Customers lost during period', value: '31' },
          { label: 'MRR at start of period', value: '$264,000' },
          { label: 'MRR lost to churn and downgrades', value: '$3,400' },
          { label: 'Expansion MRR', value: '$2,000' },
        ],
        steps: [
          'Monthly churn = 31 ÷ 2,400 = about 1.3%',
          'Annual retention = (1 − 0.013)^12 = about 85.5%',
          'Average policy life = 1 ÷ 0.013 = about 77 months',
        ],
        takeaway:
          'An 85.5% annual retention rate is normal for personal lines. Because CAC on a bound policy runs around nine months of commission, moving retention to 90% adds roughly two years of pure-profit renewal income per policy.',
      },
    },
  ],
};
