import type { CalculatorConfig } from '@/lib/types';

export const ltv: CalculatorConfig = {
  slug: 'ltv-calculator',
  name: 'LTV Calculator',
  h1: 'Customer Lifetime Value (LTV) Calculator',
  title: 'LTV Calculator — Customer Lifetime Value',
  description:
    'Free customer lifetime value calculator. Enter revenue per customer, gross margin and churn rate to get LTV, average customer lifetime and gross profit. Instant, no signup.',
  blurb:
    'Find out what a customer is worth over their whole relationship with you — on margin, not revenue.',
  category: 'customer-value',
  keywords: [
    'ltv calculator',
    'customer lifetime value calculator',
    'how to calculate ltv',
    'clv calculator',
    'lifetime value formula',
  ],

  formulaId: 'ltv',
  formulaDisplay:
    'LTV = (Average monthly revenue per customer × Gross margin %) ÷ Monthly churn rate %',

  fields: [
    {
      id: 'arpaMonthly',
      label: 'Average revenue per customer / month',
      type: 'currency',
      defaultValue: 500,
      min: 0,
      step: 10,
      help: 'Total recurring revenue divided by number of customers. Use ARPA, not list price.',
    },
    {
      id: 'grossMarginPct',
      label: 'Gross margin',
      type: 'percent',
      defaultValue: 80,
      min: 0,
      max: 100,
      step: 1,
      help: 'Revenue minus hosting, support, payment fees and delivery costs.',
    },
    {
      id: 'monthlyChurnPct',
      label: 'Monthly customer churn rate',
      type: 'percent',
      defaultValue: 3,
      min: 0,
      max: 100,
      step: 0.1,
      help: 'Percentage of customers who cancel each month. 3% monthly ≈ 31% a year.',
    },
  ],

  results: [
    {
      id: 'ltv',
      label: 'Lifetime value (gross profit)',
      format: 'currency',
      primary: true,
      betterWhen: 'higher',
      help: 'The number to compare against CAC. Based on margin, not revenue.',
    },
    { id: 'avgLifetimeMonths', label: 'Average customer lifetime', format: 'months' },
    { id: 'grossProfitPerMonth', label: 'Gross profit per month', format: 'currency' },
    {
      id: 'revenueLtv',
      label: 'Lifetime revenue',
      format: 'currency',
      help: 'Before costs. Bigger, flattering, and not the number to run your business on.',
    },
  ],

  intro: [
    'Customer lifetime value is the total gross profit you expect from a customer across their entire relationship with you. It sets the ceiling on what you can afford to spend acquiring one, which makes it the other half of every unit-economics conversation.',
    'Enter your figures below. Everything runs in your browser — nothing is uploaded, stored or sent anywhere.',
  ],

  sections: [
    {
      heading: 'How to calculate LTV',
      body: [
        'The standard formula multiplies average revenue per customer by gross margin, then divides by churn rate. Dividing by churn is a shortcut for multiplying by expected lifetime: a 3% monthly churn rate means the average customer stays 1 ÷ 0.03 ≈ 33 months, so you can either divide by the rate or multiply by the lifetime and get the same answer.',
        'The margin step is the one people skip, and skipping it is how a $16,000 LTV becomes a $13,000 LTV. Revenue you hand straight to AWS, Stripe or a support team was never available to pay for acquisition, so a revenue-based LTV systematically overstates what a customer is worth and quietly justifies overspending on CAC.',
      ],
      bullets: [
        'Use gross margin, not net margin — LTV is about contribution, not company profitability.',
        'Use blended ARPA across all customers, not the price of your most popular plan.',
        'Match your time units. Monthly churn with monthly revenue; annual with annual. Mixing them is off by 12×.',
      ],
    },
    {
      heading: 'Why the simple formula overstates LTV',
      body: [
        'Dividing by churn assumes churn stays constant forever, and it never does. Real churn is highest in the first months and falls as the remaining customers self-select into people who genuinely need the product, which pulls the true average lifetime up. Working against that, the formula also ignores the time value of money: profit arriving in month 40 is worth materially less than profit arriving now.',
        'For most decisions the simple version is fine, provided you treat it as an estimate rather than a forecast. Two guardrails keep it honest. Cap the lifetime at something defensible — 36 or 60 months — rather than letting a 0.5% churn rate imply a 16-year customer. And if your churn is under about 1% a month, discount the result, because that is where the arithmetic drifts furthest from reality.',
      ],
    },
    {
      heading: 'LTV:CAC — what the number is actually for',
      body: [
        'LTV on its own tells you almost nothing. A $13,000 LTV is superb if customers cost $2,000 to acquire and catastrophic if they cost $15,000. The number that matters is the ratio between them, and roughly 3:1 is the widely used benchmark for a healthy business.',
        'Below 1:1 you lose money on every customer you win, and growth makes the hole deeper. Between 1:1 and 3:1 the model works but leaves little room for fixed costs. Far above 5:1 usually means underinvestment rather than excellence — you are leaving growth on the table and should probably be spending more on acquisition. Pair the ratio with CAC payback period, which tells you how much cash the growth consumes along the way.',
      ],
    },
    {
      heading: 'How to increase LTV',
      body: [
        'Three levers, in ascending order of difficulty. Raise prices, which flows almost entirely to margin and is nearly always underused. Improve gross margin by reducing per-customer infrastructure and support cost. Or reduce churn — which is the most powerful lever by far, because LTV is inversely proportional to it.',
        'That inverse relationship is worth internalising. Cutting monthly churn from 5% to 4% is a 20% reduction that raises average lifetime from 20 months to 25 and LTV by 25%. Nothing you can do to pricing moves the number that hard. Expansion revenue compounds on top: when existing customers upgrade faster than others leave, net revenue retention exceeds 100% and LTV stops behaving like a decaying number at all.',
      ],
    },
  ],

  workedExample: {
    scenario:
      'A B2B SaaS company charges an average of $500 per month across its customer base, runs an 80% gross margin after hosting and support, and loses 3% of its customers each month.',
    inputs: [
      { label: 'Average revenue per customer / month', value: '$500' },
      { label: 'Gross margin', value: '80%' },
      { label: 'Monthly customer churn rate', value: '3%' },
    ],
    steps: [
      'Gross profit per customer per month = $500 × 80% = $400',
      'Average customer lifetime = 1 ÷ 0.03 = about 33.3 months',
      'LTV = $400 × 33.3 = about $13,333',
      'Lifetime revenue (before costs) = $500 × 33.3 = about $16,667',
    ],
    takeaway:
      'At a $1,400 CAC this is an LTV:CAC ratio of roughly 9.5:1 — well above the 3:1 benchmark, which usually signals the company should be spending considerably more on acquisition rather than congratulating itself.',
  },

  faqs: [
    {
      q: 'What is the formula for customer lifetime value?',
      a: 'LTV = (average monthly revenue per customer × gross margin %) ÷ monthly churn rate. Equivalently, monthly gross profit × average customer lifetime in months.',
    },
    {
      q: 'Should LTV use revenue or gross profit?',
      a: 'Gross profit. Revenue-based LTV ignores the cost of serving the customer and overstates their worth — often by 20–50% — which leads directly to overspending on acquisition.',
    },
    {
      q: 'What is a good LTV:CAC ratio?',
      a: 'Around 3:1 is the common benchmark. Below 1:1 you lose money on every customer. Above 5:1 usually means you are underinvesting in growth rather than outperforming.',
    },
    {
      q: 'What is the difference between LTV and CLV?',
      a: 'Nothing — they are the same metric. LTV, CLV and CLTV are used interchangeably, though some teams reserve CLV for a historical figure and LTV for a forward-looking prediction.',
    },
    {
      q: 'How do I calculate LTV with annual contracts?',
      a: 'Convert to a monthly basis first: divide annual contract value by 12 for ARPA, and use monthly churn. Or keep everything annual — annual revenue ÷ annual churn rate — but never mix the two.',
    },
    {
      q: 'Does this calculator send my data anywhere?',
      a: 'No. Every calculation runs locally in your browser using JavaScript. Nothing is transmitted to a server, logged or stored.',
    },
  ],

  related: [
    'cac-calculator',
    'ltv-cac-ratio-calculator',
    'churn-rate-calculator',
    'mrr-arr-calculator',
    'saas-break-even-calculator',
  ],

  variants: [
    {
      slug: 'for-saas',
      label: 'SaaS',
      audience: 'B2B SaaS companies',
      intro:
        'SaaS is where LTV was invented and where it behaves best, because subscriptions give you a genuine recurring revenue stream and a measurable churn rate. The complication is expansion: in a healthy B2B SaaS business accounts grow over time, so a formula that only models decay understates lifetime value, sometimes by a wide margin.',
      costsToInclude: [
        'Cloud hosting and infrastructure attributable to serving customers',
        'Customer support and success salaries',
        'Payment processing fees, typically 2–3% of revenue',
        'Third-party APIs and data costs that scale per customer',
        'Onboarding and implementation delivery cost',
      ],
      benchmark: {
        typical:
          'Gross margins of 70–85% are normal; monthly churn runs 3–7% for SMB, 1–2% for mid-market and under 1% for enterprise.',
        good: 'LTV:CAC of 3:1 or better, with net revenue retention above 100%.',
        note: 'If your net revenue retention exceeds 100%, this formula understates LTV — expansion is outrunning churn, and the simple decay model cannot represent that.',
      },
      defaults: { arpaMonthly: 650, grossMarginPct: 80, monthlyChurnPct: 2 },
      example: {
        scenario:
          'A mid-market SaaS company averages $650 MRR per account at an 80% gross margin, losing 2% of accounts each month.',
        inputs: [
          { label: 'Average revenue per customer / month', value: '$650' },
          { label: 'Gross margin', value: '80%' },
          { label: 'Monthly customer churn rate', value: '2%' },
        ],
        steps: [
          'Gross profit per month = $650 × 80% = $520',
          'Average lifetime = 1 ÷ 0.02 = 50 months',
          'LTV = $520 × 50 = $26,000',
        ],
        takeaway:
          'Against a $1,655 CAC that is a 15.7:1 ratio — far above benchmark, which for a company at this stage almost always means the growth budget is too small, not that the business is unusually good.',
      },
      faqs: [
        {
          q: 'How does expansion revenue change SaaS LTV?',
          a: 'It can dominate it. If accounts expand 15% a year while churning 2% a month, the simple formula misses the growth entirely. Once net revenue retention is above 100%, model LTV from cohort revenue curves instead.',
        },
      ],
    },

    {
      slug: 'for-ecommerce',
      label: 'ecommerce',
      audience: 'ecommerce and DTC brands',
      intro:
        'Ecommerce has no subscription and therefore no churn rate in the SaaS sense — customers simply stop coming back without ever cancelling anything. The workaround is to convert purchase frequency and repeat rate into an implied monthly churn, or to model LTV directly from average order value, orders per year and expected customer lifespan.',
      costsToInclude: [
        'Cost of goods sold',
        'Packaging, pick-and-pack and fulfilment labour',
        'Shipping subsidised for the customer',
        'Returns and refunds, which can reach 20–30% in apparel',
        'Payment processing and marketplace fees',
      ],
      benchmark: {
        typical:
          'Contribution margins of 30–50% are common after shipping and returns; repeat purchase rates run 20–40% for most categories.',
        good: 'LTV of at least 3× first-order CAC within 12 months.',
        note: 'Use a 12-month LTV rather than a lifetime one. Ecommerce retention curves are long and thin, and a "lifetime" figure stretching over five years is not a number you can make budget decisions against.',
      },
      defaults: { arpaMonthly: 55, grossMarginPct: 45, monthlyChurnPct: 8 },
      example: {
        scenario:
          'A DTC skincare brand sees customers spend about $55 a month on average at a 45% contribution margin after shipping and returns, with roughly 8% of active customers lapsing each month.',
        inputs: [
          { label: 'Average revenue per customer / month', value: '$55' },
          { label: 'Gross margin', value: '45%' },
          { label: 'Monthly customer churn rate', value: '8%' },
        ],
        steps: [
          'Contribution per month = $55 × 45% = $24.75',
          'Average lifetime = 1 ÷ 0.08 = 12.5 months',
          'LTV = $24.75 × 12.5 = about $309',
        ],
        takeaway:
          'A $46 CAC against a $309 LTV is a 6.7:1 ratio, comfortably profitable — but the first order alone returns only about $25 of contribution, so the brand needs enough working capital to bridge roughly two months per customer.',
      },
      faqs: [
        {
          q: 'How do I calculate churn for ecommerce when nobody cancels?',
          a: 'Define lapsed as no purchase within a window appropriate to your category — 90 days for consumables, 12 months for durables — then measure what share of your active base crosses that line each month.',
        },
      ],
    },

    {
      slug: 'for-mobile-apps',
      label: 'mobile apps',
      audience: 'mobile app and game publishers',
      intro:
        'Mobile LTV is measured against a brutally steep retention curve: most apps lose the majority of users in the first week. That makes an average-lifetime formula misleading unless you apply it to paying users only, and it makes the app store commission a first-class part of the margin calculation rather than a footnote.',
      costsToInclude: [
        'App store commission of 15–30% of gross revenue',
        'Server and content-delivery costs per active user',
        'Live-ops content production for games',
        'Customer support and moderation',
        'Ad-mediation revenue share if you monetise with ads',
      ],
      benchmark: {
        typical:
          'Subscription apps commonly see 5–10% monthly churn after the first renewal; margins land at 60–75% after store fees.',
        good: 'LTV at 3× cost per paying user, recovered within 6 months.',
        note: 'Calculate on paying users, never installs. Blending free users into ARPA produces a number so small it tells you nothing about whether acquisition is working.',
      },
      defaults: { arpaMonthly: 9.99, grossMarginPct: 70, monthlyChurnPct: 8 },
      example: {
        scenario:
          'A subscription fitness app charges $9.99 a month, keeps 70% after the store commission and server costs, and loses about 8% of subscribers monthly once past the first renewal.',
        inputs: [
          { label: 'Average revenue per customer / month', value: '$9.99' },
          { label: 'Gross margin', value: '70%' },
          { label: 'Monthly customer churn rate', value: '8%' },
        ],
        steps: [
          'Gross profit per month = $9.99 × 70% = about $6.99',
          'Average lifetime = 1 ÷ 0.08 = 12.5 months',
          'LTV = $6.99 × 12.5 = about $87',
        ],
        takeaway:
          'An $8 cost per paying subscriber against an $87 LTV is roughly 11:1 — strong enough that the constraint is how much quality traffic the company can buy, not whether the economics work.',
      },
    },

    {
      slug: 'for-subscription-boxes',
      label: 'subscription boxes',
      audience: 'subscription box and replenishment brands',
      intro:
        'Subscription boxes have the churn profile of ecommerce and the billing model of SaaS, which is the worst of both. Physical fulfilment keeps margins near 40%, and cancellation clusters hard in the first two or three boxes, so a flat churn rate badly overstates lifetime unless you measure it after the early cliff.',
      costsToInclude: [
        'Cost of goods in the box',
        'Packaging and custom box production',
        'Shipping, which is often the single largest line',
        'Payment processing and failed-payment recovery',
        'Customer service handling skips, swaps and cancellations',
      ],
      benchmark: {
        typical:
          'Contribution margins of 35–50%; monthly churn of 10–15% is common, front-loaded into the first two boxes.',
        good: 'LTV covering CAC within 3 boxes.',
        note: 'Measure churn from box three onward and treat the first two separately. Blending the early cliff into one average rate makes long-term retention look far worse than it is.',
      },
      defaults: { arpaMonthly: 39, grossMarginPct: 40, monthlyChurnPct: 12 },
      example: {
        scenario:
          'A snack box brand charges $39 a month with a 40% contribution margin after product, packaging and shipping, losing about 12% of subscribers each month.',
        inputs: [
          { label: 'Average revenue per customer / month', value: '$39' },
          { label: 'Gross margin', value: '40%' },
          { label: 'Monthly customer churn rate', value: '12%' },
        ],
        steps: [
          'Contribution per month = $39 × 40% = $15.60',
          'Average lifetime = 1 ÷ 0.12 = about 8.3 months',
          'LTV = $15.60 × 8.3 = about $130',
        ],
        takeaway:
          'A $31 CAC against $130 LTV works, but only because 8.3 months is an average that hides a bimodal reality: most subscribers leave inside three boxes and a minority stay for years.',
      },
    },

    {
      slug: 'for-gyms',
      label: 'gyms and fitness studios',
      audience: 'gyms, studios and membership businesses',
      intro:
        'Gym LTV is unusually sensitive to onboarding, because cancellation is concentrated in the first 90 days and almost everything that predicts long-term retention happens in the first three weeks. Margins are high once the facility is paid for, which means every additional month of membership is close to pure contribution.',
      costsToInclude: [
        'Class instructor and trainer costs attributable per member',
        'Payment processing and membership management software',
        'Towels, equipment wear and consumables per member',
        'Member servicing and retention outreach',
      ],
      benchmark: {
        typical:
          'Monthly churn of 3–6% for traditional gyms, higher for boutique studios; contribution margins of 60–75% once fixed facility costs are excluded.',
        good: 'Average member tenure above 18 months.',
        note: 'Exclude rent and fixed facility costs from gross margin — they do not vary per member, so including them turns LTV into a profitability metric and breaks the comparison with CAC.',
      },
      defaults: { arpaMonthly: 60, grossMarginPct: 70, monthlyChurnPct: 5 },
      example: {
        scenario:
          'A boutique studio charges $60 a month, runs a 70% contribution margin after instructor and consumable costs, and loses 5% of members monthly.',
        inputs: [
          { label: 'Average revenue per customer / month', value: '$60' },
          { label: 'Gross margin', value: '70%' },
          { label: 'Monthly customer churn rate', value: '5%' },
        ],
        steps: [
          'Contribution per month = $60 × 70% = $42',
          'Average lifetime = 1 ÷ 0.05 = 20 months',
          'LTV = $42 × 20 = $840',
        ],
        takeaway:
          'A $104 CAC against $840 LTV is an 8:1 ratio. The leverage is entirely in early retention: moving churn from 5% to 4% adds $210 of LTV per member, worth far more than cutting acquisition costs.',
      },
    },

    {
      slug: 'for-agencies',
      label: 'agencies',
      audience: 'agencies and retainer-based service firms',
      intro:
        'Agency LTV is built on a small number of large retainers, which makes it volatile and makes concentration risk the real story. Margins are labour-based rather than software-based, so gross margin sits far lower than in SaaS, and a single departing client can move the average more than a year of marketing.',
      costsToInclude: [
        'Delivery team salaries allocated to the account',
        'Freelancer and contractor costs',
        'Account management time',
        'Software and media costs passed through at cost',
      ],
      benchmark: {
        typical:
          'Gross margins of 45–60% after delivery labour; average retainer tenure of 18–30 months.',
        good: 'LTV of at least 5× CAC, given how lumpy agency revenue is.',
        note: 'With few clients, calculate LTV from actual historic tenure rather than an implied churn rate. A 4% monthly churn rate on 25 clients is one client leaving — the formula reads it as a smooth trend it is not.',
      },
      defaults: { arpaMonthly: 6000, grossMarginPct: 55, monthlyChurnPct: 4 },
      example: {
        scenario:
          'An agency averages $6,000 a month per retainer at a 55% gross margin after delivery salaries, losing about 4% of clients per month.',
        inputs: [
          { label: 'Average revenue per customer / month', value: '$6,000' },
          { label: 'Gross margin', value: '55%' },
          { label: 'Monthly customer churn rate', value: '4%' },
        ],
        steps: [
          'Gross profit per month = $6,000 × 55% = $3,300',
          'Average lifetime = 1 ÷ 0.04 = 25 months',
          'LTV = $3,300 × 25 = $82,500',
        ],
        takeaway:
          'An $82,500 LTV against a $5,500 CAC is 15:1, which sounds excellent until you notice it rests on 25 months of tenure. Extending average retainer length by six months is worth more than doubling new business.',
      },
    },

    {
      slug: 'for-insurance',
      label: 'insurance',
      audience: 'insurance agencies and brokers',
      intro:
        'Insurance LTV is a commission stream, and its defining feature is that retention compounds: a policy that renews costs almost nothing to service relative to the commission it earns. That makes year-one persistency the number the whole model turns on, and it is why insurers will accept CAC levels that would be indefensible elsewhere.',
      costsToInclude: [
        'Servicing time for renewals, endorsements and claims support',
        'Agency management system and CRM costs',
        'Renewal marketing and retention outreach',
        'Producer trail commission where applicable',
      ],
      benchmark: {
        typical:
          'Personal lines retention of 80–90% annually, equivalent to roughly 1–2% monthly churn; servicing margins of 80%+.',
        good: 'LTV of 5–10× CAC, reflecting the long tail of renewal commission.',
        note: 'Annual retention of 85% is about 1.3% monthly churn, not 15%. Convert carefully — using the annual figure as a monthly rate understates LTV by roughly ten times.',
      },
      defaults: { arpaMonthly: 110, grossMarginPct: 85, monthlyChurnPct: 1.3 },
      example: {
        scenario:
          'An agency earns about $110 a month in commission per policy at an 85% margin after servicing, with 85% annual retention — roughly 1.3% monthly churn.',
        inputs: [
          { label: 'Average revenue per customer / month', value: '$110' },
          { label: 'Gross margin', value: '85%' },
          { label: 'Monthly customer churn rate', value: '1.3%' },
        ],
        steps: [
          'Gross profit per month = $110 × 85% = $93.50',
          'Average lifetime = 1 ÷ 0.013 = about 77 months',
          'LTV = $93.50 × 77 = about $7,200',
        ],
        takeaway:
          'An $844 CAC against a $7,200 LTV is 8.5:1 — but nine months of that is pure payback. The agency is effectively lending money to acquire each policy, so growth is constrained by cash, not by whether the unit economics work.',
      },
      faqs: [
        {
          q: 'How do I convert annual retention to monthly churn?',
          a: 'Monthly churn = 1 − (annual retention)^(1/12). For 85% annual retention that is 1 − 0.85^0.0833 ≈ 1.3% per month. Dividing 15% by 12 gives 1.25%, which is close enough for most purposes but drifts at higher churn rates.',
        },
      ],
    },
  ],
};
