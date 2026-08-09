import type { CalculatorConfig } from '@/lib/types';

export const breakEven: CalculatorConfig = {
  slug: 'saas-break-even-calculator',
  name: 'SaaS Break-Even Calculator',
  h1: 'SaaS Break-Even Calculator',
  title: 'SaaS Break-Even Calculator — Customers Needed',
  description:
    'Free SaaS break-even calculator. Find how many customers you need to cover fixed costs, the revenue that implies, the CAC investment to get there and the churn you must replace.',
  blurb:
    'How many customers you need to cover your costs — and how many you must add each month just to stand still.',
  category: 'SaaS & Growth',
  keywords: [
    'saas break even calculator',
    'break even customers calculator',
    'how many customers to break even',
    'saas profitability calculator',
    'break even analysis saas',
  ],

  formulaId: 'saasBreakEven',
  formulaDisplay:
    'Customers needed = Monthly fixed costs ÷ (Monthly revenue per customer × Gross margin)',

  fields: [
    {
      id: 'fixedCostsMonthly',
      label: 'Monthly fixed costs',
      type: 'currency',
      defaultValue: 80000,
      min: 0,
      step: 1000,
      help: 'Salaries, rent, tooling and overhead that do not vary with customer count.',
    },
    {
      id: 'arpaMonthly',
      label: 'Average revenue per customer / month',
      type: 'currency',
      defaultValue: 500,
      min: 0,
      step: 10,
      help: 'Blended ARPA across all plans, not your headline price.',
    },
    {
      id: 'grossMarginPct',
      label: 'Gross margin',
      type: 'percent',
      defaultValue: 80,
      min: 0,
      max: 100,
      step: 1,
      help: 'Revenue minus hosting, support and payment fees.',
    },
    {
      id: 'cac',
      label: 'Customer acquisition cost',
      type: 'currency',
      defaultValue: 1400,
      min: 0,
      step: 50,
      optional: true,
      help: 'Optional — used to estimate the upfront investment to reach break-even.',
    },
    {
      id: 'monthlyChurnPct',
      label: 'Monthly churn rate',
      type: 'percent',
      defaultValue: 3,
      min: 0,
      max: 100,
      step: 0.1,
      optional: true,
      help: 'Optional — used to work out how many customers you must replace each month.',
    },
  ],

  results: [
    {
      id: 'customersNeeded',
      label: 'Customers needed to break even',
      format: 'number',
      primary: true,
      help: 'The point at which gross profit exactly covers your fixed costs.',
    },
    { id: 'contributionPerCustomer', label: 'Gross profit per customer / month', format: 'currency' },
    { id: 'monthlyRevenueNeeded', label: 'Monthly revenue at break-even', format: 'currency' },
    { id: 'upfrontCacInvestment', label: 'Total CAC to acquire that base', format: 'currency' },
    {
      id: 'replacementCustomersPerMonth',
      label: 'New customers/month just to hold steady',
      format: 'number',
      help: 'Churn replacement at break-even scale. Growth requires more than this.',
    },
  ],

  intro: [
    'Break-even for a subscription business is the number of customers whose gross profit covers your fixed costs. Because revenue recurs but costs are paid monthly, the question is not "how much do we need to sell" but "how large does the customer base need to be, and how much will it cost to get there".',
    'Enter your figures below. Everything runs in your browser — nothing is uploaded, stored or sent anywhere.',
  ],

  sections: [
    {
      heading: 'How SaaS break-even works',
      body: [
        'Divide monthly fixed costs by the gross profit each customer contributes per month. With $80,000 of fixed costs and customers contributing $400 each, you need 200 customers. Note that the divisor is gross profit, not revenue — a customer paying $500 a month at 80% margin contributes $400 toward overhead, not $500.',
        'Fixed costs are everything that does not scale with customer count: engineering and G&A salaries, rent, tooling, insurance. Variable costs — hosting, support, payment processing — belong in gross margin instead. Getting this split wrong is the most common error in the calculation, and it moves the answer substantially in either direction.',
      ],
      bullets: [
        'Use blended ARPA across all plans, not the price of your most popular tier.',
        'Sales and marketing salaries are fixed costs; the CAC they produce is a separate investment.',
        'Recalculate whenever you hire — every added salary raises the break-even customer count immediately.',
      ],
    },
    {
      heading: 'Break-even is a moving target',
      body: [
        'Two forces push the number up. Every hire raises fixed costs, so break-even rises the moment someone signs a contract, not when they become productive. And churn means the base leaks: at 3% monthly churn, a 200-customer business loses 6 customers a month and must replace all of them before adding a single net new one.',
        'That replacement figure is the one most plans omit, and it explains why companies stall just short of profitability. Standing still is not free — it costs six new customers a month, plus the acquisition spend to win them. Any growth plan needs to clear that bar first, and a plan that assumes the existing base stays put will miss by exactly the churn rate.',
      ],
    },
    {
      heading: 'The cash gap nobody budgets for',
      body: [
        'Reaching 200 customers at a $1,400 CAC costs $280,000 in acquisition spend, and that money goes out long before the customers pay it back. This is the structural reason subscription businesses need funding even when their unit economics are excellent: the model front-loads cost and back-loads revenue.',
        'CAC payback period tells you how long the gap lasts. At $400 of monthly gross profit against $1,400 CAC, each customer takes 3.5 months to repay their acquisition — so the faster you grow, the more cash you consume, and a company can be profitable per customer and still run out of money. Model the cash trough, not just the break-even point.',
      ],
    },
    {
      heading: 'Getting to break-even faster',
      body: [
        'Four levers, and they are not equally powerful. Raising prices flows almost entirely to gross profit, so a 10% price rise cuts the break-even customer count by about 9%. Improving gross margin has a similar direct effect. Cutting fixed costs lowers the target immediately, which is why hiring pace is the single most consequential decision a pre-profitability company makes.',
        'Reducing churn does not change the break-even number itself, but it changes how hard that number is to reach and hold — less of your acquisition effort goes to replacement, and more to net growth. In practice, pricing and hiring discipline get you there fastest; churn determines whether you stay there.',
      ],
    },
  ],

  workedExample: {
    scenario:
      'A SaaS startup runs $80,000 a month in fixed costs — salaries, rent and tooling. Customers pay an average of $500 a month at an 80% gross margin, cost $1,400 each to acquire, and churn at 3% a month.',
    inputs: [
      { label: 'Monthly fixed costs', value: '$80,000' },
      { label: 'Average revenue per customer / month', value: '$500' },
      { label: 'Gross margin', value: '80%' },
      { label: 'Customer acquisition cost', value: '$1,400' },
      { label: 'Monthly churn rate', value: '3%' },
    ],
    steps: [
      'Gross profit per customer per month = $500 × 80% = $400',
      'Customers needed = $80,000 ÷ $400 = 200 customers',
      'Monthly revenue at break-even = 200 × $500 = $100,000',
      'Total CAC to acquire that base = 200 × $1,400 = $280,000',
      'Churn replacement = 200 × 3% = 6 new customers every month just to stand still',
    ],
    takeaway:
      'The company needs 200 customers and $280,000 of acquisition spend to get there — and once it arrives, six new customers a month go to replacement before any growth. Hiring one more $10,000-a-month engineer moves break-even from 200 customers to 225.',
  },

  faqs: [
    {
      q: 'How do I calculate break-even for a SaaS business?',
      a: 'Divide monthly fixed costs by gross profit per customer per month. Gross profit is average revenue per customer multiplied by gross margin, not revenue alone.',
    },
    {
      q: 'What counts as a fixed cost in SaaS?',
      a: 'Anything that does not scale with customer count: engineering and admin salaries, rent, software tooling, insurance and professional fees. Hosting, support and payment processing scale with customers and belong in gross margin.',
    },
    {
      q: 'Should sales and marketing salaries be fixed costs?',
      a: 'Yes, they are fixed monthly costs. The acquisition spend they produce is tracked separately as CAC, because it is an investment in future revenue rather than a cost of running today.',
    },
    {
      q: 'Why does churn matter for break-even?',
      a: 'It does not change the break-even count, but it determines the effort to reach and hold it. At 3% monthly churn a 200-customer business must win 6 customers a month just to stay level.',
    },
    {
      q: 'How much funding do I need to reach break-even?',
      a: 'At minimum, the CAC to acquire the required base plus the accumulated operating losses along the way. The calculator shows the first part; the second depends on how fast you grow, since faster growth means a deeper cash trough.',
    },
    {
      q: 'Does this calculator send my data anywhere?',
      a: 'No. Every calculation runs locally in your browser using JavaScript. Nothing is transmitted to a server, logged or stored.',
    },
  ],

  related: ['mrr-arr-calculator', 'cac-calculator', 'ltv-calculator', 'churn-rate-calculator', 'pricing-margin-calculator'],

  variants: [
    {
      slug: 'for-saas-startups',
      label: 'SaaS startups',
      audience: 'venture-backed SaaS startups',
      intro:
        'For a funded startup, break-even is less a target than a reference point for runway maths. The number that actually governs decisions is how many months of cash remain at current burn, and how the break-even customer count moves each time the team grows — which it does, immediately and mechanically.',
      costsToInclude: [
        'Engineering, product and G&A salaries — usually 70%+ of fixed costs',
        'Office, equipment and software tooling',
        'Sales and marketing salaries, separate from the CAC they generate',
        'Excluded from fixed: hosting, support and payment fees, which belong in gross margin',
      ],
      benchmark: {
        typical:
          'Seed-stage SaaS commonly needs 100–300 customers at SMB price points, or 15–40 at mid-market ACVs.',
        good: 'A break-even customer count reachable within your current runway at your current growth rate.',
        note: 'Recalculate on every hire. A $150,000 engineer adds $12,500 of monthly fixed cost and, at $400 contribution per customer, moves break-even by 31 customers.',
      },
      defaults: {
        fixedCostsMonthly: 120000,
        arpaMonthly: 650,
        grossMarginPct: 80,
        cac: 1655,
        monthlyChurnPct: 2,
      },
      example: {
        scenario:
          'A seed-stage SaaS company burns $120,000 a month in fixed costs, with $650 ARPA at an 80% margin, a $1,655 CAC and 2% monthly churn.',
        inputs: [
          { label: 'Monthly fixed costs', value: '$120,000' },
          { label: 'Average revenue per customer / month', value: '$650' },
          { label: 'Gross margin', value: '80%' },
          { label: 'Customer acquisition cost', value: '$1,655' },
          { label: 'Monthly churn rate', value: '2%' },
        ],
        steps: [
          'Contribution per customer = $650 × 80% = $520',
          'Customers needed = $120,000 ÷ $520 = about 231',
          'Revenue at break-even = 231 × $650 = about $150,000/month ($1.8M ARR)',
          'CAC investment = 231 × $1,655 = about $382,000',
          'Churn replacement = 231 × 2% = about 5 customers/month',
        ],
        takeaway:
          'Roughly $1.8M ARR and $382,000 of acquisition spend to reach profitability. The strategic question is whether current runway covers both that spend and the losses accumulated on the way — the second number is usually the larger of the two.',
      },
    },

    {
      slug: 'for-bootstrapped-saas',
      label: 'bootstrapped SaaS',
      audience: 'bootstrapped and self-funded SaaS founders',
      intro:
        'Without outside funding, break-even is not a milestone — it is the constraint that governs every decision. The cash gap between paying CAC and earning it back has to be funded from existing revenue, which caps growth rate at whatever the business can self-finance and makes payback period more important than any other metric.',
      costsToInclude: [
        'Founder salaries at a realistic market rate, not zero',
        'Contractor and part-time help',
        'Software tooling and infrastructure not tied to customer count',
        'Excluded: any spend you would stop immediately if revenue fell',
      ],
      benchmark: {
        typical:
          'Bootstrapped SaaS commonly reaches break-even at 50–150 customers, helped by much lower fixed costs.',
        good: 'CAC payback under 6 months, so growth can be funded from cash flow.',
        note: 'Include a market-rate founder salary even if you are not taking one. Break-even calculated on an unpaid founder is a number that stops being true the moment you need to pay yourself.',
      },
      defaults: {
        fixedCostsMonthly: 18000,
        arpaMonthly: 99,
        grossMarginPct: 85,
        cac: 250,
        monthlyChurnPct: 4,
      },
      example: {
        scenario:
          'A two-founder bootstrapped SaaS has $18,000 in monthly fixed costs including market-rate salaries, charges $99 a month at an 85% margin, acquires customers for $250 and churns 4% monthly.',
        inputs: [
          { label: 'Monthly fixed costs', value: '$18,000' },
          { label: 'Average revenue per customer / month', value: '$99' },
          { label: 'Gross margin', value: '85%' },
          { label: 'Customer acquisition cost', value: '$250' },
          { label: 'Monthly churn rate', value: '4%' },
        ],
        steps: [
          'Contribution per customer = $99 × 85% = about $84',
          'Customers needed = $18,000 ÷ $84 = about 214',
          'Revenue at break-even = 214 × $99 = about $21,200/month',
          'CAC investment = 214 × $250 = about $53,500',
          'Churn replacement = 214 × 4% = about 9 customers/month',
        ],
        takeaway:
          'CAC payback is about 3 months, which is what makes bootstrapping viable here. The harder number is churn replacement: nine new customers a month before any growth, on a base of 214 — that is where most bootstrapped SaaS plateaus.',
      },
    },

    {
      slug: 'for-agencies',
      label: 'agencies',
      audience: 'agencies and productised service firms',
      intro:
        'Agency break-even differs because delivery labour is a variable cost that scales with clients, and capacity is a hard ceiling rather than a soft one. Software can serve one more customer at near-zero marginal cost; an agency has to hire, which converts variable cost into fixed cost in lumps.',
      costsToInclude: [
        'Non-billable salaries: leadership, operations, finance, new business',
        'Rent, insurance and software',
        'Excluded from fixed: delivery salaries, which belong in gross margin',
        'Recruitment costs, which arrive in steps as you scale',
      ],
      benchmark: {
        typical:
          'Agencies typically break even at 8–20 retainer clients depending on retainer size and overhead.',
        good: 'Break-even reachable at under 70% of delivery capacity, leaving headroom for churn.',
        note: 'Model capacity alongside break-even. An agency can be above break-even and still unable to take the next client without hiring — which pushes break-even up again in a step.',
      },
      defaults: {
        fixedCostsMonthly: 45000,
        arpaMonthly: 6000,
        grossMarginPct: 55,
        cac: 5500,
        monthlyChurnPct: 4,
      },
      example: {
        scenario:
          'An agency carries $45,000 a month in non-billable overhead, averages $6,000 per retainer at a 55% gross margin after delivery salaries, spends $5,500 to win a client and loses 4% monthly.',
        inputs: [
          { label: 'Monthly fixed costs', value: '$45,000' },
          { label: 'Average revenue per customer / month', value: '$6,000' },
          { label: 'Gross margin', value: '55%' },
          { label: 'Customer acquisition cost', value: '$5,500' },
          { label: 'Monthly churn rate', value: '4%' },
        ],
        steps: [
          'Contribution per client = $6,000 × 55% = $3,300',
          'Clients needed = $45,000 ÷ $3,300 = about 14',
          'Revenue at break-even = 14 × $6,000 = $84,000/month',
          'CAC investment = 14 × $5,500 = $77,000',
          'Churn replacement = 14 × 4% = about 0.5 clients/month',
        ],
        takeaway:
          'Fourteen clients to break even, losing roughly one every two months. With so few accounts the arithmetic is fragile — two simultaneous departures put the agency below break-even immediately, which is the case for keeping a pipeline warm even when fully booked.',
      },
    },

    {
      slug: 'for-mobile-apps',
      label: 'mobile apps',
      audience: 'subscription app publishers',
      intro:
        'App break-even has to absorb store commission before anything else, which removes 15–30% of revenue at source. Combined with low price points, that means the required subscriber count runs into the thousands, and high churn makes the replacement number the dominant operational challenge.',
      costsToInclude: [
        'Development and design salaries',
        'Live-ops and content production for games',
        'Tooling, analytics and attribution platforms',
        'Excluded from fixed: store commission and server costs, which belong in gross margin',
      ],
      benchmark: {
        typical:
          'Subscription apps commonly need 5,000–20,000 paying subscribers at typical price points.',
        good: 'Break-even subscriber count reachable at a CAC below one-third of LTV.',
        note: 'Model in gross margin net of store fees. At a 70% margin after commission and servers, a $9.99 subscription contributes about $7 — not $10.',
      },
      defaults: {
        fixedCostsMonthly: 90000,
        arpaMonthly: 9.99,
        grossMarginPct: 70,
        cac: 8,
        monthlyChurnPct: 8,
      },
      example: {
        scenario:
          'A subscription app has $90,000 in monthly fixed costs, charges $9.99 with a 70% margin after store commission and servers, acquires paying subscribers at $8 and churns 8% monthly.',
        inputs: [
          { label: 'Monthly fixed costs', value: '$90,000' },
          { label: 'Average revenue per customer / month', value: '$9.99' },
          { label: 'Gross margin', value: '70%' },
          { label: 'Customer acquisition cost', value: '$8' },
          { label: 'Monthly churn rate', value: '8%' },
        ],
        steps: [
          'Contribution per subscriber = $9.99 × 70% = about $6.99',
          'Subscribers needed = $90,000 ÷ $6.99 = about 12,875',
          'Revenue at break-even = 12,875 × $9.99 = about $128,600/month',
          'CAC investment = 12,875 × $8 = about $103,000',
          'Churn replacement = 12,875 × 8% = about 1,030 subscribers/month',
        ],
        takeaway:
          'The CAC investment is modest, but replacing 1,030 subscribers every month is a permanent acquisition treadmill. At this churn rate the app rebuilds its entire paying base annually — retention work is worth more than any efficiency gain in user acquisition.',
      },
    },

    {
      slug: 'for-marketplaces',
      label: 'marketplaces',
      audience: 'marketplace and platform businesses',
      intro:
        'Marketplaces take a commission on transaction volume rather than a subscription, so break-even is best modelled per active seller or per recurring buyer, using average commission earned per month. The complication is two-sided acquisition: you pay to acquire both sides, and only one of them generates revenue directly.',
      costsToInclude: [
        'Engineering, trust and safety, and operations salaries',
        'Supply-side acquisition costs, which produce no direct revenue',
        'Payment processing and fraud losses, in gross margin',
        'Excluded from fixed: variable support costs that scale with transaction volume',
      ],
      benchmark: {
        typical:
          'Take rates of 10–20% are common; break-even usually requires thousands of monthly active transactors.',
        good: 'Liquidity high enough that organic repeat transactions exceed paid acquisition.',
        note: 'Model both sides. A break-even calculated only on buyer acquisition ignores the supply-side spend that made the marketplace usable in the first place.',
      },
      defaults: {
        fixedCostsMonthly: 150000,
        arpaMonthly: 45,
        grossMarginPct: 75,
        cac: 60,
        monthlyChurnPct: 6,
      },
      example: {
        scenario:
          'A services marketplace has $150,000 in monthly fixed costs and earns about $45 a month in commission per active buyer at a 75% margin after payment processing, acquiring buyers for $60 with 6% monthly churn.',
        inputs: [
          { label: 'Monthly fixed costs', value: '$150,000' },
          { label: 'Average revenue per customer / month', value: '$45' },
          { label: 'Gross margin', value: '75%' },
          { label: 'Customer acquisition cost', value: '$60' },
          { label: 'Monthly churn rate', value: '6%' },
        ],
        steps: [
          'Contribution per active buyer = $45 × 75% = $33.75',
          'Active buyers needed = $150,000 ÷ $33.75 = about 4,444',
          'Revenue at break-even = 4,444 × $45 = about $200,000/month',
          'CAC investment = 4,444 × $60 = about $267,000',
          'Churn replacement = 4,444 × 6% = about 267 buyers/month',
        ],
        takeaway:
          'Payback is under two months, which is healthy — but this counts buyer-side CAC only. Add supply-side acquisition and the real investment to reach break-even is materially higher than $267,000.',
      },
    },
  ],
};
