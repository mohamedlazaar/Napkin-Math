import type { CalculatorConfig } from '@/lib/types';

/**
 * THE TEMPLATE FILE.
 *
 * Every calculator on the site is one object shaped like this one. To add a
 * new tool: copy this file, change the data, register it in
 * data/calculators/index.ts, and add its maths to lib/formulas.ts. No
 * component or route file needs to change — you get the calculator page, the
 * metadata, the JSON-LD, the sitemap entries and every long-tail variant page
 * for free.
 */
export const cac: CalculatorConfig = {
  slug: 'cac-calculator',
  name: 'CAC Calculator',
  h1: 'Customer Acquisition Cost (CAC) Calculator',
  title: 'CAC Calculator — Customer Acquisition Cost',
  description:
    'Free customer acquisition cost calculator. Enter your sales and marketing spend and new customers to get CAC plus your CAC payback period. Instant, no signup.',
  blurb:
    'Work out what each new customer actually costs you — and how many months it takes to earn it back.',
  category: 'acquisition',
  keywords: [
    'cac calculator',
    'customer acquisition cost calculator',
    'how to calculate cac',
    'cac payback period calculator',
    'customer acquisition cost formula',
  ],

  formulaId: 'cac',
  formulaDisplay:
    'CAC = (Marketing spend + Sales spend + Other acquisition costs) ÷ New customers acquired',

  fields: [
    {
      id: 'marketingSpend',
      label: 'Marketing spend',
      type: 'currency',
      defaultValue: 40000,
      min: 0,
      step: 100,
      help: 'Ads, content, events, agencies and marketing salaries for the period.',
    },
    {
      id: 'salesSpend',
      label: 'Sales spend',
      type: 'currency',
      defaultValue: 25000,
      min: 0,
      step: 100,
      help: 'Base salaries, commission, SDR costs and sales tooling.',
    },
    {
      id: 'otherCosts',
      label: 'Other acquisition costs',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      help: 'Onboarding, sign-up incentives, referral payouts, attributable overhead.',
    },
    {
      id: 'newCustomers',
      label: 'New customers acquired',
      type: 'number',
      defaultValue: 50,
      min: 0,
      step: 1,
      help: 'Count only NEW customers in the same period as the spend above.',
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
      help: 'Revenue minus hosting, support and delivery costs, as a percentage.',
    },
  ],

  results: [
    {
      id: 'cac',
      label: 'Customer acquisition cost',
      format: 'currency',
      primary: true,
      betterWhen: 'lower',
      help: 'What you paid, on average, for each new customer.',
    },
    {
      id: 'totalSpend',
      label: 'Total acquisition spend',
      format: 'currency',
    },
    {
      id: 'grossProfitPerMonth',
      label: 'Gross profit per customer / month',
      format: 'currency',
      help: 'Monthly revenue × gross margin — the money actually available to repay CAC.',
    },
    {
      id: 'paybackMonths',
      label: 'CAC payback period',
      format: 'months',
      help: 'Months of gross profit needed to earn back what you spent.',
    },
  ],

  intro: [
    'Customer acquisition cost (CAC) is the total amount you spend on sales and marketing divided by the number of new customers that spend produced. It is the single number that tells you whether growth is a business model or an expensive hobby.',
    'Enter your figures below. Everything runs in your browser — nothing is uploaded, stored or sent anywhere.',
  ],

  sections: [
    {
      heading: 'How to calculate CAC',
      body: [
        'The formula is deliberately blunt: add every cost incurred to win customers over a period, then divide by the number of new customers won in that same period. A quarter in which you spent $70,000 and signed 50 customers gives a CAC of $1,400.',
        'The arithmetic is trivial; the honesty is not. Most CAC numbers are wrong because the numerator is too small. Fully loaded CAC includes salaries and commission for everyone in sales and marketing, agency and contractor fees, ad spend, content production, event costs, the software those teams use, and any sign-up incentives or referral bounties you pay out. If a cost would disappear the day you stopped acquiring customers, it belongs in the numerator.',
      ],
      bullets: [
        'Use the same period for spend and for new customers — mixing a quarter of spend with a month of customers inflates CAC roughly threefold.',
        'Count only new customers. Renewals, expansions and upgrades are retention, not acquisition.',
        'Exclude customer success and support costs unless that team is genuinely closing new business.',
      ],
    },
    {
      heading: 'Blended CAC vs paid CAC',
      body: [
        'Blended CAC divides all acquisition spend by all new customers, including the ones who arrived organically. It answers "what does growth cost us overall?" and it is the right number for board decks and unit-economics models.',
        'Paid CAC divides paid spend only by customers attributable to paid channels. It answers "what happens if we spend another dollar?" and it is the right number for budget decisions. Paid CAC is always the higher of the two, sometimes by several multiples, and confusing the two is the most common way teams talk themselves into an unprofitable channel. Calculate both, and label which one you are quoting.',
      ],
    },
    {
      heading: 'What counts as a good CAC',
      body: [
        'There is no universal target — a $2,000 CAC is a disaster for a $30/month product and a bargain for a $50,000 enterprise contract. CAC only means something next to what a customer is worth, so judge it two ways.',
        'First, the LTV:CAC ratio. Lifetime value divided by CAC; roughly 3:1 is the widely used healthy benchmark. Below 1:1 you lose money on every customer. Far above 5:1 usually means you are underinvesting in growth rather than winning. Second, CAC payback period: how many months of gross profit it takes to earn the acquisition cost back. Under 12 months is comfortable for most subscription businesses, and under 6 months is strong, because payback drives how much cash you burn to grow at a given rate.',
      ],
    },
    {
      heading: 'How to reduce CAC',
      body: [
        'CAC falls when you either pay less per lead or convert more of the leads you already pay for, and conversion is nearly always the cheaper lever. A 20% lift in trial-to-paid conversion cuts CAC by about 17% without touching a single ad budget.',
        'The durable moves are compounding ones: organic and referral channels that keep producing after the spend stops, better targeting so sales talks to fewer bad-fit prospects, faster follow-up on inbound leads, and pricing or packaging changes that shorten the sales cycle. Cutting ad spend lowers CAC on the spreadsheet, but it usually lowers growth faster — which is why payback period, not CAC alone, is the number to manage.',
      ],
    },
  ],

  workedExample: {
    scenario:
      'A B2B SaaS company reviews Q3. Marketing spent $40,000 (ads, content and a conference), sales cost $25,000 in salary and commission, and another $5,000 went on onboarding and referral bounties. The quarter produced 50 new customers, each paying an average of $500 per month at an 80% gross margin.',
    inputs: [
      { label: 'Marketing spend', value: '$40,000' },
      { label: 'Sales spend', value: '$25,000' },
      { label: 'Other acquisition costs', value: '$5,000' },
      { label: 'New customers acquired', value: '50' },
      { label: 'Average revenue per customer / month', value: '$500' },
      { label: 'Gross margin', value: '80%' },
    ],
    steps: [
      'Total acquisition spend = $40,000 + $25,000 + $5,000 = $70,000',
      'CAC = $70,000 ÷ 50 customers = $1,400 per customer',
      'Gross profit per customer per month = $500 × 80% = $400',
      'CAC payback period = $1,400 ÷ $400 = 3.5 months',
    ],
    takeaway:
      'A 3.5-month payback is strong: each customer repays acquisition well inside the first year, so the company can reinvest quickly and grow without heavy outside funding. If that same $1,400 CAC came with a $50/month product, payback would stretch past 35 months and the model would not work.',
  },

  faqs: [
    {
      q: 'What is the formula for customer acquisition cost?',
      a: 'CAC = total sales and marketing costs ÷ number of new customers acquired in the same period. "Total costs" means fully loaded: ad spend, salaries, commission, agencies, tools, content and events, not just media budget.',
    },
    {
      q: 'Should salaries be included in CAC?',
      a: 'Yes. Sales and marketing salaries and commission are usually the largest part of CAC in B2B, and leaving them out can understate the real number by half or more. Include the fully loaded cost of anyone whose job is to win new customers.',
    },
    {
      q: 'What is a good CAC payback period?',
      a: 'Under 12 months is generally healthy for subscription businesses and under 6 months is strong. Enterprise companies with long contracts and low churn can sustain 18 months or more; self-serve products usually need much faster payback because their churn is higher.',
    },
    {
      q: 'What is the difference between CAC and CPA?',
      a: 'CPA (cost per acquisition) normally measures the cost of a conversion event such as a lead, trial or install. CAC measures the cost of a paying customer. Because only a fraction of leads or trials convert, CAC is always higher than CPA — often by 5–20×.',
    },
    {
      q: 'How often should I recalculate CAC?',
      a: 'Monthly for a fast-moving self-serve business, quarterly if your sales cycle runs longer than a month. Measuring over too short a window is misleading when spend and closed deals land in different months.',
    },
    {
      q: 'Does this calculator send my data anywhere?',
      a: 'No. Every calculation runs locally in your browser using JavaScript. Nothing is transmitted to a server, logged or stored.',
    },
  ],

  // Slugs that don't exist yet are silently skipped, so you can list your whole
  // planned roadmap here and the links light up as each tool ships.
  related: [
    'ltv-calculator',
    'ltv-cac-ratio-calculator',
    'churn-rate-calculator',
    'roas-calculator',
    'mrr-arr-calculator',
    'saas-break-even-calculator',
  ],

  variants: [
    {
      slug: 'for-saas',
      label: 'SaaS',
      audience: 'B2B SaaS companies',
      intro:
        'SaaS CAC is unusual because almost none of it is media spend — it is people. Salaries and commission for SDRs, account executives and marketers typically make up 60–80% of a B2B SaaS acquisition budget, so a CAC built only from ad spend will be wildly optimistic. The other SaaS-specific trap is timing: a deal that closes in March was often paid for by January and February spend.',
      costsToInclude: [
        'Fully loaded SDR and AE compensation, including commission and accelerators',
        'Marketing salaries, plus agency and contractor retainers',
        'Paid search, paid social, review sites (G2, Capterra) and sponsored newsletters',
        'Conferences and field marketing — booth, travel, sponsorship',
        'Sales and marketing tooling: CRM, sales engagement, enrichment, attribution',
        'Free-trial infrastructure costs and onboarding or migration incentives',
      ],
      benchmark: {
        typical:
          'Self-serve SMB SaaS commonly lands between $200 and $1,500; sales-assisted mid-market between $1,500 and $10,000; enterprise routinely runs $15,000 and up.',
        good: 'An LTV:CAC ratio near 3:1 with CAC payback under 12 months.',
        note: 'These are directional ranges from publicly discussed SaaS benchmarks, not a survey. Your contract value matters far more than your industry — always read CAC alongside ACV and payback rather than on its own.',
      },
      defaults: {
        marketingSpend: 40000,
        salesSpend: 45000,
        otherCosts: 6000,
        newCustomers: 55,
        arpaMonthly: 650,
        grossMarginPct: 80,
      },
      example: {
        scenario:
          'A mid-market B2B SaaS company reviews a quarter: $40,000 marketing, $45,000 fully loaded sales compensation, $6,000 in tooling and onboarding. It closed 55 new accounts at an average of $650 MRR and an 80% gross margin.',
        inputs: [
          { label: 'Marketing spend', value: '$40,000' },
          { label: 'Sales spend', value: '$45,000' },
          { label: 'Other acquisition costs', value: '$6,000' },
          { label: 'New customers acquired', value: '55' },
          { label: 'Average revenue per customer / month', value: '$650' },
          { label: 'Gross margin', value: '80%' },
        ],
        steps: [
          'Total acquisition spend = $40,000 + $45,000 + $6,000 = $91,000',
          'CAC = $91,000 ÷ 55 = about $1,655 per customer',
          'Gross profit per customer per month = $650 × 80% = $520',
          'CAC payback = $1,655 ÷ $520 = about 3.2 months',
        ],
        takeaway:
          'Payback inside a single quarter means every dollar spent on growth comes back fast enough to be spent again — the profile that lets a SaaS company compound without continuous outside funding.',
      },
      faqs: [
        {
          q: 'Should free trial users count as customers in SaaS CAC?',
          a: 'No. Only count customers who have started paying. Dividing by trial signups produces a number closer to cost per lead, which will make your economics look several times better than they are.',
        },
        {
          q: 'How do I handle long SaaS sales cycles when calculating CAC?',
          a: 'Offset the periods. If your average cycle is 90 days, compare this quarter\'s closed customers with the spend from the previous quarter. Comparing same-period spend and closings understates CAC while you are growing budgets.',
        },
      ],
    },

    {
      slug: 'for-ecommerce',
      label: 'ecommerce',
      audience: 'ecommerce and DTC brands',
      intro:
        'Ecommerce CAC is dominated by paid media and measured against margin rather than contract value, so it lives or dies on the relationship between CAC, average order value and contribution margin. The critical distinction is new-customer CAC versus blended CAC: platform reporting mixes returning buyers into its conversion counts, which quietly makes acquisition look cheaper than it is.',
      costsToInclude: [
        'Paid media across Meta, Google, TikTok and any retail media networks',
        'Creative production — photography, video, UGC fees and editing',
        'Influencer and affiliate payouts on first orders',
        'First-order discounts, welcome codes and free-shipping subsidies',
        'Agency retainers and in-house growth salaries',
        'Email and SMS platform costs attributable to acquisition flows',
      ],
      benchmark: {
        typical:
          'Most DTC brands land somewhere between $20 and $120 per new customer, rising sharply in crowded categories like skincare, supplements and apparel.',
        good: 'A first-order contribution margin that covers CAC, or a payback inside 2–3 orders when repeat rates are strong.',
        note: 'Judge ecommerce CAC against contribution margin per order, not revenue. A $45 CAC on a $60 order with 40% margin loses money on the first purchase and only works if customers come back.',
      },
      defaults: {
        marketingSpend: 60000,
        salesSpend: 2000,
        otherCosts: 3000,
        newCustomers: 1400,
        arpaMonthly: 55,
        grossMarginPct: 45,
      },
      example: {
        scenario:
          'A DTC skincare brand spends $60,000 on paid media in a month, $2,000 on a growth contractor, and $3,000 on welcome discounts and creative. It acquires 1,400 first-time buyers who go on to spend about $55 per month at a 45% gross margin.',
        inputs: [
          { label: 'Marketing spend', value: '$60,000' },
          { label: 'Sales spend', value: '$2,000' },
          { label: 'Other acquisition costs', value: '$3,000' },
          { label: 'New customers acquired', value: '1,400' },
          { label: 'Average revenue per customer / month', value: '$55' },
          { label: 'Gross margin', value: '45%' },
        ],
        steps: [
          'Total acquisition spend = $60,000 + $2,000 + $3,000 = $65,000',
          'CAC = $65,000 ÷ 1,400 = about $46 per new customer',
          'Gross profit per customer per month = $55 × 45% = $24.75',
          'CAC payback = $46 ÷ $24.75 = about 1.9 months',
        ],
        takeaway:
          'The brand does not recover CAC on the first order — it needs roughly two months of repeat purchasing. That makes retention, not ad efficiency, the constraint on how fast it can scale spend.',
      },
      faqs: [
        {
          q: 'Is CAC the same as ROAS in ecommerce?',
          a: 'No, but they are two views of the same spend. ROAS is revenue divided by ad spend for a campaign; CAC is total acquisition cost divided by new customers. ROAS ignores non-media costs and usually counts returning buyers, so CAC is the more honest business number.',
        },
        {
          q: 'Should I subtract discounts from revenue or add them to CAC?',
          a: 'Either is defensible as long as you are consistent, but treating first-order discount codes as an acquisition cost is usually clearer — it keeps your product margin clean and shows the true price of buying a customer.',
        },
      ],
    },

    {
      slug: 'for-mobile-apps',
      label: 'mobile apps',
      audience: 'mobile app and game publishers',
      intro:
        'Mobile CAC is really two numbers: cost per install and cost per paying user. Since only a small percentage of installs ever pay, the gap between them is enormous, and the app-store commission takes a further cut before a single dollar reaches you. Any mobile CAC that ignores the store fee overstates what each user is worth by up to 30%.',
      costsToInclude: [
        'User-acquisition spend across ad networks and DSPs',
        'ASO tooling, creative testing and playable-ad production',
        'Attribution platform costs (AppsFlyer, Adjust, Branch)',
        'Incentivised install campaigns and launch-week promotions',
        'Growth and UA salaries',
      ],
      benchmark: {
        typical:
          'Cost per install often runs $1–$5 in developed markets, while cost per paying user commonly lands between $20 and $150 depending on how aggressively the app monetises.',
        good: 'Recovering CAC within the first 30–60 days of a cohort, since mobile retention decays fast.',
        note: 'Model mobile CAC on cohort revenue curves rather than a flat monthly average — most in-app purchase revenue arrives in the first weeks after install, then tails off sharply.',
      },
      defaults: {
        marketingSpend: 30000,
        salesSpend: 0,
        otherCosts: 2000,
        newCustomers: 4000,
        arpaMonthly: 9.99,
        grossMarginPct: 70,
      },
      example: {
        scenario:
          'A subscription fitness app spends $30,000 on user acquisition and $2,000 on attribution tooling in a month, converting 4,000 new paying subscribers on a $9.99 plan. After the 30% app-store commission, gross margin is about 70%.',
        inputs: [
          { label: 'Marketing spend', value: '$30,000' },
          { label: 'Sales spend', value: '$0' },
          { label: 'Other acquisition costs', value: '$2,000' },
          { label: 'New customers acquired', value: '4,000' },
          { label: 'Average revenue per customer / month', value: '$9.99' },
          { label: 'Gross margin', value: '70%' },
        ],
        steps: [
          'Total acquisition spend = $30,000 + $2,000 = $32,000',
          'CAC = $32,000 ÷ 4,000 paying subscribers = $8.00',
          'Gross profit per subscriber per month = $9.99 × 70% = about $6.99',
          'CAC payback = $8.00 ÷ $6.99 = about 1.1 months',
        ],
        takeaway:
          'Payback lands just after the first renewal, so the whole model rests on month-two retention. If a third of subscribers cancel before renewing, effective CAC rises by half and the economics invert.',
      },
      faqs: [
        {
          q: 'Should app store fees be included in mobile CAC?',
          a: 'Not in CAC itself — put them in gross margin. Apple and Google take 15–30% of revenue, so a 70% gross margin (rather than 100%) is what makes the payback calculation honest.',
        },
      ],
    },

    {
      slug: 'for-agencies',
      label: 'agencies',
      audience: 'marketing, creative and dev agencies',
      intro:
        'Agencies acquire a small number of high-value clients, which makes CAC lumpy and easy to misread from a single month. The cost is concentrated in senior time — partners and strategists writing proposals and pitching — which rarely appears in any marketing budget. Unbilled pitch time is the largest hidden acquisition cost in most agencies.',
      costsToInclude: [
        'Senior and partner hours spent on pitching, scoping and proposals, valued at cost',
        'New-business salaries and referral commissions',
        'Speculative creative work produced for pitches',
        'Website, case-study production and thought-leadership content',
        'Networking, awards entries and event sponsorships',
      ],
      benchmark: {
        typical:
          'Agency CAC frequently runs $3,000–$15,000 per new client, and can go far higher for retainers above $20,000 a month.',
        good: 'CAC below one month of the average retainer, so a client is profitable inside their first quarter.',
        note: 'Because agency deals are few and large, calculate CAC over a rolling 12 months. A single quarter with one big win or none will swing the number beyond usefulness.',
      },
      defaults: {
        marketingSpend: 8000,
        salesSpend: 12000,
        otherCosts: 2000,
        newCustomers: 4,
        arpaMonthly: 6000,
        grossMarginPct: 55,
      },
      example: {
        scenario:
          'A 20-person agency spends $8,000 a quarter on content and events, values partner pitch time at $12,000, and spends $2,000 on proposal design. It wins 4 new retainer clients averaging $6,000 a month at a 55% gross margin after delivery salaries.',
        inputs: [
          { label: 'Marketing spend', value: '$8,000' },
          { label: 'Sales spend (pitch time at cost)', value: '$12,000' },
          { label: 'Other acquisition costs', value: '$2,000' },
          { label: 'New customers acquired', value: '4' },
          { label: 'Average revenue per customer / month', value: '$6,000' },
          { label: 'Gross margin', value: '55%' },
        ],
        steps: [
          'Total acquisition spend = $8,000 + $12,000 + $2,000 = $22,000',
          'CAC = $22,000 ÷ 4 clients = $5,500 per client',
          'Gross profit per client per month = $6,000 × 55% = $3,300',
          'CAC payback = $5,500 ÷ $3,300 = about 1.7 months',
        ],
        takeaway:
          'Each new client pays back its acquisition cost inside two months of retainer. The risk is not CAC but concentration — losing one of four clients erases a quarter of new-business value.',
      },
      faqs: [
        {
          q: 'How do I value partner time spent pitching?',
          a: 'Use fully loaded cost, not billable rate. Take the partner\'s total annual compensation divided by working hours, then multiply by hours spent on new business. Using billable rates inflates CAC with profit you never actually spent.',
        },
      ],
    },

    {
      slug: 'for-b2b-services',
      label: 'B2B services',
      audience: 'consultancies and professional services firms',
      intro:
        'In professional services the sales cycle is long, the deal is bespoke and much of the acquisition work is done by the same people who deliver the engagement. That makes CAC less about media spend and more about opportunity cost: every hour a senior consultant spends on business development is an hour not billed.',
      costsToInclude: [
        'Business development time from delivery staff, valued at fully loaded cost',
        'Proposal and RFP response production',
        'Referral fees and partner commissions',
        'Conference attendance, speaking slots and sponsorships',
        'Content, research reports and webinar production',
      ],
      benchmark: {
        typical:
          'Commonly $4,000–$20,000 per client, driven almost entirely by how long the sales cycle runs and how senior the people running it are.',
        good: 'CAC under 10% of first-year contract value.',
        note: 'Track CAC against first-year contract value rather than monthly revenue — professional services engagements are usually project-shaped rather than recurring.',
      },
      defaults: {
        marketingSpend: 10000,
        salesSpend: 20000,
        otherCosts: 3000,
        newCustomers: 5,
        arpaMonthly: 9000,
        grossMarginPct: 45,
      },
      example: {
        scenario:
          'A consultancy invests $10,000 in content and events for the quarter, values partner and principal BD time at $20,000, and spends $3,000 on RFP responses. It signs 5 new clients on engagements worth about $9,000 a month at a 45% gross margin.',
        inputs: [
          { label: 'Marketing spend', value: '$10,000' },
          { label: 'Sales spend (BD time at cost)', value: '$20,000' },
          { label: 'Other acquisition costs', value: '$3,000' },
          { label: 'New customers acquired', value: '5' },
          { label: 'Average revenue per customer / month', value: '$9,000' },
          { label: 'Gross margin', value: '45%' },
        ],
        steps: [
          'Total acquisition spend = $10,000 + $20,000 + $3,000 = $33,000',
          'CAC = $33,000 ÷ 5 clients = $6,600 per client',
          'Gross profit per client per month = $9,000 × 45% = $4,050',
          'CAC payback = $6,600 ÷ $4,050 = about 1.6 months',
        ],
        takeaway:
          'Acquisition is repaid in under two months of an engagement — comfortable, provided engagements last longer than that. For project work, the number to watch is CAC as a share of total project value.',
      },
    },

    {
      slug: 'for-fintech',
      label: 'fintech',
      audience: 'fintech and neobank products',
      intro:
        'Fintech carries acquisition costs that no other sector does. Every signup triggers KYC, identity verification and fraud screening whether or not the user ever funds an account, and regulatory constraints on advertising narrow the channels available. Fintech CAC should be calculated on funded, active accounts — signups are close to meaningless.',
      costsToInclude: [
        'Paid acquisition across search, social and finance-comparison sites',
        'KYC, AML and identity verification fees on every application, including rejections',
        'Fraud losses and chargebacks on newly acquired accounts',
        'Signup bonuses, cashback offers and referral rewards',
        'Compliance review of marketing creative',
      ],
      benchmark: {
        typical:
          'Consumer fintech CAC frequently runs $30–$200 per funded account; lending and investment products sit at the top of that range or above it.',
        good: 'Payback inside 12 months on a funded, active account rather than a registered one.',
        note: 'Define "customer" precisely before you calculate — funded accounts, not registrations. The gap between the two is often 5–10×, and it is where most misleading fintech CAC numbers come from.',
      },
      defaults: {
        marketingSpend: 120000,
        salesSpend: 30000,
        otherCosts: 15000,
        newCustomers: 3000,
        arpaMonthly: 12,
        grossMarginPct: 60,
      },
      example: {
        scenario:
          'A neobank spends $120,000 on paid acquisition in a month, $30,000 on growth and partnerships salaries, and $15,000 on KYC checks and signup bonuses. It gains 3,000 funded accounts generating about $12 a month each at a 60% margin after interchange and processing costs.',
        inputs: [
          { label: 'Marketing spend', value: '$120,000' },
          { label: 'Sales spend', value: '$30,000' },
          { label: 'Other acquisition costs (KYC, bonuses)', value: '$15,000' },
          { label: 'New customers acquired (funded accounts)', value: '3,000' },
          { label: 'Average revenue per customer / month', value: '$12' },
          { label: 'Gross margin', value: '60%' },
        ],
        steps: [
          'Total acquisition spend = $120,000 + $30,000 + $15,000 = $165,000',
          'CAC = $165,000 ÷ 3,000 funded accounts = $55',
          'Gross profit per account per month = $12 × 60% = $7.20',
          'CAC payback = $55 ÷ $7.20 = about 7.6 months',
        ],
        takeaway:
          'Payback under a year is workable, but it depends entirely on accounts staying active. In fintech, dormancy behaves exactly like churn — a funded account that stops transacting stops repaying its CAC.',
      },
      faqs: [
        {
          q: 'Should KYC costs be included in fintech CAC?',
          a: 'Yes, including checks on applicants you reject. Verification is a cost of acquiring customers, and rejected applications are a real cost of the channel that produced them.',
        },
      ],
    },

    {
      slug: 'for-healthcare',
      label: 'healthcare practices',
      audience: 'clinics, dental and private healthcare practices',
      intro:
        'Private practices acquire patients rather than customers, and a patient\'s value depends far more on whether they return than on what the first visit bills. Marketing is local, competition is geographic, and much of the acquisition cost sits in front-desk staff time handling enquiries that never convert to a booking.',
      costsToInclude: [
        'Local search ads, Google Business Profile management and directory listings',
        'Front-desk and coordinator time spent on enquiries and no-shows',
        'New-patient offers, free consultations and discounted first visits',
        'Practice website, review generation and reputation management',
        'Referral programmes and community sponsorships',
      ],
      benchmark: {
        typical:
          'Commonly $50–$400 per new patient, with high-value elective work such as implants or orthodontics running well above that.',
        good: 'CAC below the gross profit of a single average treatment plan.',
        note: 'Value a patient over their expected relationship, not their first appointment. A $275 CAC looks alarming against one $150 visit and entirely reasonable against three years of recurring care.',
      },
      defaults: {
        marketingSpend: 12000,
        salesSpend: 3000,
        otherCosts: 1500,
        newCustomers: 60,
        arpaMonthly: 300,
        grossMarginPct: 60,
      },
      example: {
        scenario:
          'A dental practice spends $12,000 a quarter on local ads and its website, $3,000 on coordinator time handling new-patient enquiries, and $1,500 on discounted first consultations. It gains 60 new patients billing about $300 a month on average at a 60% margin after clinical costs.',
        inputs: [
          { label: 'Marketing spend', value: '$12,000' },
          { label: 'Sales spend (coordinator time)', value: '$3,000' },
          { label: 'Other acquisition costs', value: '$1,500' },
          { label: 'New customers acquired (new patients)', value: '60' },
          { label: 'Average revenue per customer / month', value: '$300' },
          { label: 'Gross margin', value: '60%' },
        ],
        steps: [
          'Total acquisition spend = $12,000 + $3,000 + $1,500 = $16,500',
          'CAC = $16,500 ÷ 60 new patients = $275',
          'Gross profit per patient per month = $300 × 60% = $180',
          'CAC payback = $275 ÷ $180 = about 1.5 months',
        ],
        takeaway:
          'Acquisition is repaid inside the first treatment cycle, which means the practice can safely increase local ad spend as long as clinical capacity allows.',
      },
    },

    {
      slug: 'for-insurance',
      label: 'insurance',
      audience: 'insurance agencies and brokers',
      intro:
        'Insurance acquisition is expensive, competitive and slow to repay, because the agency earns a commission stream rather than a lump sum. Lead costs in motor and home lines are among the highest in any vertical, and a policy that lapses in year one usually never covers what was paid to win it. Retention is the entire business model.',
      costsToInclude: [
        'Purchased leads and comparison-site placements',
        'Producer salaries, commission and quoting time',
        'Quoting and rating software, plus CRM',
        'Compliance-approved marketing production',
        'First-year new-business incentives',
      ],
      benchmark: {
        typical:
          'Personal lines commonly cost $300–$900 per bound policy; commercial lines run considerably higher.',
        good: 'CAC recovered within the first policy year, so renewal commission is profit.',
        note: 'Calculate on bound policies, not quotes. Quote-to-bind rates in personal lines are often under 15%, so cost per quote understates true CAC by roughly seven times.',
      },
      defaults: {
        marketingSpend: 15000,
        salesSpend: 20000,
        otherCosts: 3000,
        newCustomers: 45,
        arpaMonthly: 110,
        grossMarginPct: 85,
      },
      example: {
        scenario:
          'An agency spends $15,000 a month on leads and comparison placements, $20,000 on producer compensation, and $3,000 on quoting software. It binds 45 new policies earning about $110 a month in commission at an 85% margin.',
        inputs: [
          { label: 'Marketing spend', value: '$15,000' },
          { label: 'Sales spend', value: '$20,000' },
          { label: 'Other acquisition costs', value: '$3,000' },
          { label: 'New customers acquired (bound policies)', value: '45' },
          { label: 'Average revenue per customer / month', value: '$110' },
          { label: 'Gross margin', value: '85%' },
        ],
        steps: [
          'Total acquisition spend = $15,000 + $20,000 + $3,000 = $38,000',
          'CAC = $38,000 ÷ 45 bound policies = about $844',
          'Gross profit per policy per month = $110 × 85% = $93.50',
          'CAC payback = $844 ÷ $93.50 = about 9 months',
        ],
        takeaway:
          'Nine-month payback means a policy must survive its first year to be worth writing. A ten-point improvement in first-year retention moves the agency\'s economics more than any reduction in lead cost.',
      },
    },

    {
      slug: 'for-real-estate',
      label: 'real estate',
      audience: 'real estate agents and brokerages',
      intro:
        'Real estate acquisition is transactional rather than recurring, so the meaningful comparison is CAC against gross commission income per closing, not a monthly subscription. Lead-to-closing rates are brutally low — often 1–3% for purchased online leads — and a long nurture window means this quarter\'s closings were paid for months ago.',
      costsToInclude: [
        'Purchased leads from portals and lead-generation platforms',
        'Farming: direct mail, door hangers and geographic postcards',
        'Listing presentation materials, photography and staging offered pre-listing',
        'CRM, dialler and nurture-automation costs',
        'Referral fees paid to other agents or networks',
      ],
      benchmark: {
        typical:
          'Cost per closed transaction commonly runs $1,500–$6,000 depending on lead source; referral and sphere-of-influence business costs a fraction of portal leads.',
        good: 'CAC under 20% of average gross commission income per closing.',
        note: 'Because there is no recurring revenue, leave the two optional payback fields at zero. Compare CAC directly against your average commission per deal instead.',
      },
      defaults: {
        marketingSpend: 9000,
        salesSpend: 6000,
        otherCosts: 2000,
        newCustomers: 3,
        arpaMonthly: 0,
        grossMarginPct: 0,
      },
      example: {
        scenario:
          'An agent spends $9,000 a quarter on portal leads and mailers, $6,000 on an inside sales assistant, and $2,000 on CRM and listing presentation materials. That produces 3 closed transactions averaging $11,000 in gross commission each.',
        inputs: [
          { label: 'Marketing spend', value: '$9,000' },
          { label: 'Sales spend', value: '$6,000' },
          { label: 'Other acquisition costs', value: '$2,000' },
          { label: 'New customers acquired (closings)', value: '3' },
          { label: 'Average revenue per customer / month', value: '$0 (not recurring)' },
          { label: 'Gross margin', value: '0% (not applicable)' },
        ],
        steps: [
          'Total acquisition spend = $9,000 + $6,000 + $2,000 = $17,000',
          'CAC = $17,000 ÷ 3 closings = about $5,667 per transaction',
          'Compare against gross commission income: $5,667 ÷ $11,000 = 52% of GCI',
        ],
        takeaway:
          'Spending half of gross commission to win each deal leaves very little after brokerage split and taxes. The fix is channel mix — referral and repeat business at a fraction of portal-lead cost — rather than spending more.',
      },
      faqs: [
        {
          q: 'How do I calculate CAC in real estate when there is no recurring revenue?',
          a: 'Divide total acquisition spend by closed transactions, then express the result as a percentage of average gross commission income. Under 20% of GCI is a healthy target; above 40% leaves too little after splits and taxes.',
        },
      ],
    },

    {
      slug: 'for-law-firms',
      label: 'law firms',
      audience: 'law firms and legal practices',
      intro:
        'Legal is one of the most expensive keyword categories in paid search, and matters are usually one-off rather than recurring, so the number that matters is CAC against average matter value. Intake is also the hidden cost centre: firms pay for a large volume of enquiries that are out of scope, out of jurisdiction or unable to pay.',
      costsToInclude: [
        'Paid search and legal directory listings, which carry unusually high cost per click',
        'Intake staff or answering-service time, including unqualified enquiries',
        'Free consultations offered to prospective clients',
        'Referral fees to other firms, where permitted by local rules',
        'Website, SEO and content produced under compliance review',
      ],
      benchmark: {
        typical:
          'Cost per signed matter commonly runs $500–$5,000, with personal injury and mass tort far higher because case values are far higher.',
        good: 'CAC under 15–20% of average matter value.',
        note: 'Measure on signed matters, not consultations. Consultation-to-signed rates of 20–40% are common, so cost per consultation understates real CAC by three to five times.',
      },
      defaults: {
        marketingSpend: 20000,
        salesSpend: 5000,
        otherCosts: 3000,
        newCustomers: 12,
        arpaMonthly: 0,
        grossMarginPct: 0,
      },
      example: {
        scenario:
          'A family law firm spends $20,000 a month on paid search and directories, $5,000 on intake staff, and $3,000 on free consultations and content. It signs 12 new matters averaging $8,500 in fees.',
        inputs: [
          { label: 'Marketing spend', value: '$20,000' },
          { label: 'Sales spend (intake)', value: '$5,000' },
          { label: 'Other acquisition costs', value: '$3,000' },
          { label: 'New customers acquired (signed matters)', value: '12' },
          { label: 'Average revenue per customer / month', value: '$0 (not recurring)' },
          { label: 'Gross margin', value: '0% (not applicable)' },
        ],
        steps: [
          'Total acquisition spend = $20,000 + $5,000 + $3,000 = $28,000',
          'CAC = $28,000 ÷ 12 signed matters = about $2,333',
          'As a share of matter value: $2,333 ÷ $8,500 = about 27%',
        ],
        takeaway:
          'At 27% of matter value, acquisition is eating more than it should. Improving the consultation-to-signed rate is the fastest lever, since the firm is already paying for those enquiries.',
      },
    },

    {
      slug: 'for-gyms',
      label: 'gyms and fitness studios',
      audience: 'gyms, studios and fitness businesses',
      intro:
        'Gyms sell recurring memberships in a fixed local catchment, so CAC is low in absolute terms but unforgiving: memberships are cheap, cancellation is easy, and January acquisition costs bear little resemblance to September\'s. The most useful version of this calculation is annual, not monthly.',
      costsToInclude: [
        'Local paid social and search, plus community partnerships',
        'Free trials, day passes and waived joining fees',
        'Sales and front-desk staff time spent on tours and follow-up',
        'Referral rewards and member-get-member incentives',
        'Signage, flyers and local sponsorships',
      ],
      benchmark: {
        typical:
          'Commonly $50–$250 per new member; boutique studios with higher price points sit at the top of the range.',
        good: 'CAC recovered within 2–3 months of membership.',
        note: 'Run this over a full year. Fitness demand is heavily seasonal, and a January-only CAC will be flattering to the point of useless.',
      },
      defaults: {
        marketingSpend: 4000,
        salesSpend: 2500,
        otherCosts: 800,
        newCustomers: 70,
        arpaMonthly: 60,
        grossMarginPct: 70,
      },
      example: {
        scenario:
          'A studio spends $4,000 a month on local ads, $2,500 on membership sales staff, and $800 on free trials and waived joining fees, signing 70 new members at $60 a month with a 70% margin after class and facility costs.',
        inputs: [
          { label: 'Marketing spend', value: '$4,000' },
          { label: 'Sales spend', value: '$2,500' },
          { label: 'Other acquisition costs', value: '$800' },
          { label: 'New customers acquired (members)', value: '70' },
          { label: 'Average revenue per customer / month', value: '$60' },
          { label: 'Gross margin', value: '70%' },
        ],
        steps: [
          'Total acquisition spend = $4,000 + $2,500 + $800 = $7,300',
          'CAC = $7,300 ÷ 70 members = about $104',
          'Gross profit per member per month = $60 × 70% = $42',
          'CAC payback = $104 ÷ $42 = about 2.5 months',
        ],
        takeaway:
          'A member has to stay about three months to be worth acquiring. Since most gym cancellations cluster in the first 90 days, onboarding and early attendance habits matter more here than ad efficiency.',
      },
    },

    {
      slug: 'for-subscription-boxes',
      label: 'subscription boxes',
      audience: 'subscription box and replenishment brands',
      intro:
        'Subscription boxes combine ecommerce acquisition costs with subscription churn, which is the hardest version of this problem. Physical fulfilment keeps margins thin, first-box discounts are near-universal, and cancellation after box one or two is common — so CAC recovery is a race against a steep churn curve.',
      costsToInclude: [
        'Paid social and influencer spend, the dominant channels in this category',
        'First-box discounts and free-gift offers',
        'Creative and unboxing content production',
        'Referral credits given to both referrer and referee',
        'Affiliate and partnership commissions on first orders',
      ],
      benchmark: {
        typical:
          'Commonly $20–$80 per new subscriber, before accounting for the first-box discount.',
        good: 'CAC recovered within 2–3 boxes, given typical churn curves.',
        note: 'Use contribution margin after shipping and packaging, not gross product margin. Fulfilment often costs more than the product itself in this category.',
      },
      defaults: {
        marketingSpend: 25000,
        salesSpend: 0,
        otherCosts: 2500,
        newCustomers: 900,
        arpaMonthly: 39,
        grossMarginPct: 40,
      },
      example: {
        scenario:
          'A snack box brand spends $25,000 a month on paid social and influencers plus $2,500 on referral credits, acquiring 900 new subscribers at $39 a month with a 40% contribution margin after product, packaging and shipping.',
        inputs: [
          { label: 'Marketing spend', value: '$25,000' },
          { label: 'Sales spend', value: '$0' },
          { label: 'Other acquisition costs', value: '$2,500' },
          { label: 'New customers acquired', value: '900' },
          { label: 'Average revenue per customer / month', value: '$39' },
          { label: 'Gross margin', value: '40%' },
        ],
        steps: [
          'Total acquisition spend = $25,000 + $2,500 = $27,500',
          'CAC = $27,500 ÷ 900 subscribers = about $31',
          'Contribution per subscriber per month = $39 × 40% = $15.60',
          'CAC payback = $31 ÷ $15.60 = about 2.0 months',
        ],
        takeaway:
          'Two boxes to break even, in a category where a large share of subscribers cancel after the first. Every point of month-two retention here is worth more than an equivalent cut in ad costs.',
      },
    },
  ],
};
