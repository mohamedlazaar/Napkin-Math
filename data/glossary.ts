/**
 * BUSINESS METRICS GLOSSARY.
 *
 * Each entry is a real reference page, not a keyword stub: definition, formula,
 * a worked example with numbers, why the metric matters, the mistakes people
 * actually make, and a link through to the calculator that computes it.
 *
 * Editorial rule: if a term can't carry all of that honestly, it doesn't get a
 * page. Thin definition pages are the fastest way to get a site classified as
 * low-value content.
 */

export interface GlossaryTerm {
  /** URL segment: /glossary/<slug> */
  slug: string;
  /** Full name, used as the H1. */
  term: string;
  /** Common abbreviation, e.g. 'CAC'. */
  abbr?: string;
  /** One sentence. Used on cards, in meta descriptions and in search results. */
  short: string;
  /** The full definition, as paragraphs. */
  definition: string[];
  /** Plain-text formula shown in a mono block. */
  formula: string;
  /** One line on what the formula quietly assumes. */
  formulaNote?: string;
  example: {
    setup: string;
    steps: string[];
    result: string;
  };
  whyItMatters: string[];
  /** The mistakes that actually change the answer. */
  pitfalls: string[];
  /** Slug of the calculator that computes this. */
  calculator?: string;
  /** Other glossary slugs worth reading next. */
  related: string[];
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'customer-acquisition-cost',
    term: 'Customer Acquisition Cost',
    abbr: 'CAC',
    short:
      'The average amount you spend on sales and marketing to win one new customer.',
    definition: [
      'Customer acquisition cost is the total cost of winning a new customer, calculated by dividing everything you spent on sales and marketing in a period by the number of new customers that spending produced.',
      'CAC is a blunt average, and that is the point. It absorbs the campaigns that worked, the campaigns that did not, the salaries of the people running them and the tools they used. A number that only counts ad spend is not CAC — it is cost per acquisition on one channel, which is a much narrower measure.',
    ],
    formula:
      'CAC = (Sales spend + Marketing spend + Other acquisition costs) ÷ New customers acquired',
    formulaNote:
      'Spend and customers must cover the same period, and the customers must be new — not renewals or expansions.',
    example: {
      setup:
        'A B2B software company spends $40,000 on marketing and $25,000 on sales in a quarter, plus $5,000 on onboarding incentives. It signs 50 new customers.',
      steps: [
        'Total acquisition spend = $40,000 + $25,000 + $5,000 = $70,000',
        'CAC = $70,000 ÷ 50 = $1,400',
      ],
      result: 'Each new customer cost $1,400 to acquire.',
    },
    whyItMatters: [
      'CAC is the denominator of almost every growth decision. On its own it tells you very little — a $1,400 CAC is excellent for a $50,000 contract and catastrophic for a $200 one — but paired with lifetime value it tells you whether growth is a business model or an expensive hobby.',
      'It also sets the pace of your cash. A high CAC means you pay for customers long before they pay you back, so growth consumes working capital even when the unit economics are healthy on paper.',
    ],
    pitfalls: [
      'Counting only ad spend and leaving out salaries, agencies, tooling and commission — the single most common way CAC ends up understated by half.',
      'Mismatching periods: this month\'s spend against this month\'s customers, when your sales cycle is 90 days.',
      'Mixing organic and paid customers into one number and then using it to judge a paid channel. Blended CAC and paid CAC answer different questions.',
      'Including renewals or upsells in the customer count. Those are retention and expansion, not acquisition.',
    ],
    calculator: 'cac-calculator',
    related: ['lifetime-value', 'ltv-cac-ratio', 'cac-payback-period', 'return-on-ad-spend'],
  },
  {
    slug: 'lifetime-value',
    term: 'Customer Lifetime Value',
    abbr: 'LTV',
    short:
      'The total gross profit you expect from an average customer before they leave.',
    definition: [
      'Lifetime value estimates how much a customer is worth across their entire relationship with you. The version that matters for decisions is gross-profit LTV: revenue from the customer minus the cost of serving them, projected over their expected lifetime.',
      'For a subscription business, average lifetime is the reciprocal of the churn rate. If 5% of customers leave each month, the average customer stays 1 ÷ 0.05 = 20 months. That relationship is what makes LTV so sensitive to churn.',
    ],
    formula: 'LTV = (ARPU × Gross margin %) ÷ Churn rate %',
    formulaNote:
      'Or equivalently, monthly gross profit per customer × average lifetime in months.',
    example: {
      setup:
        'A SaaS product charges $500 per month, runs an 80% gross margin, and loses 5% of customers each month.',
      steps: [
        'Gross profit per month = $500 × 80% = $400',
        'Average lifetime = 1 ÷ 5% = 20 months',
        'LTV = $400 × 20 = $8,000',
      ],
      result: 'The average customer is worth about $8,000 in gross profit.',
    },
    whyItMatters: [
      'LTV sets the ceiling on what you can rationally pay to acquire a customer. If a customer is worth $8,000, a $1,400 CAC is comfortable; if they are worth $900, it is fatal.',
      'It also reframes retention as a revenue lever. Cutting churn from 5% to 4% a month raises average lifetime from 20 to 25 months and LTV by 25%, without touching price or acquisition.',
    ],
    pitfalls: [
      'Using revenue instead of gross profit. Revenue LTV flatters every ratio you plug it into and ignores the cost of actually serving the customer.',
      'Applying the 1 ÷ churn formula to a business with very low churn, where it projects implausible lifetimes. Many operators cap the horizon at 24–36 months instead.',
      'Averaging wildly different segments together. Enterprise and self-serve customers usually need separate LTV figures to be useful.',
      'Treating a projection as a fact. LTV is a forecast built on today\'s churn and margin holding steady, which they rarely do.',
    ],
    calculator: 'ltv-calculator',
    related: ['customer-acquisition-cost', 'ltv-cac-ratio', 'churn-rate', 'gross-margin'],
  },
  {
    slug: 'ltv-cac-ratio',
    term: 'LTV:CAC Ratio',
    short:
      'How many times over a customer repays what you spent to acquire them.',
    definition: [
      'The LTV:CAC ratio divides customer lifetime value by customer acquisition cost. It compresses your entire unit economics into a single number: how much gross profit each dollar of acquisition spend eventually returns.',
      'A widely cited benchmark for subscription businesses is 3:1 or better. That rule of thumb exists because the remaining gross profit still has to cover product, engineering, support and overhead — a customer who merely repays their acquisition cost contributes nothing to the rest of the company.',
    ],
    formula: 'LTV:CAC = Lifetime value ÷ Customer acquisition cost',
    formulaNote:
      'Both sides must use the same basis. Gross-profit LTV against fully loaded CAC is the only honest comparison.',
    example: {
      setup: 'A company calculates an LTV of $8,000 and a CAC of $1,400.',
      steps: ['LTV:CAC = $8,000 ÷ $1,400 = 5.71'],
      result:
        'Every $1 of acquisition spend returns about $5.71 in gross profit over the customer\'s life.',
    },
    whyItMatters: [
      'It is the fastest read on whether growth is worth funding. Below roughly 1:1 you lose money on every customer you win. Around 3:1 the model generally works.',
      'A very high ratio is not automatically good news. Above roughly 5:1, the common interpretation is underinvestment — you could likely afford to spend more on acquisition and grow faster without breaking the economics.',
    ],
    pitfalls: [
      'Comparing revenue LTV against ad-spend-only CAC. Both errors push the ratio up, and together they can make a failing business look healthy.',
      'Ignoring payback period. A 4:1 ratio with a 30-month payback can still run you out of cash.',
      'Reading benchmarks as targets. 3:1 is a general reference from subscription software, not a rule that transfers cleanly to ecommerce, agencies or marketplaces.',
    ],
    calculator: 'ltv-cac-ratio-calculator',
    related: ['customer-acquisition-cost', 'lifetime-value', 'cac-payback-period'],
  },
  {
    slug: 'cac-payback-period',
    term: 'CAC Payback Period',
    short:
      'How many months of gross profit it takes to earn back what a customer cost.',
    definition: [
      'CAC payback period measures how long a customer takes to repay their own acquisition cost, measured in months of gross profit rather than revenue.',
      'The distinction matters: you cannot repay a sales team with money that goes to hosting, payment processing and support. Only the gross profit a customer generates is actually available to pay back what you spent winning them.',
    ],
    formula: 'Payback (months) = CAC ÷ (Monthly revenue per customer × Gross margin %)',
    example: {
      setup:
        'CAC is $1,400. The customer pays $500 a month at an 80% gross margin.',
      steps: [
        'Monthly gross profit = $500 × 80% = $400',
        'Payback = $1,400 ÷ $400 = 3.5 months',
      ],
      result: 'The customer repays their acquisition cost in about three and a half months.',
    },
    whyItMatters: [
      'Payback period is the cash-flow twin of the LTV:CAC ratio. LTV:CAC tells you whether a customer is profitable eventually; payback tells you how long you fund them first.',
      'It determines how fast you can grow without outside money. A 4-month payback lets you recycle cash into acquisition three times a year; a 20-month payback means growth has to be financed.',
      'Commonly cited references for B2B SaaS sit under 12 months, with under 6 considered strong. Treat these as orientation, not targets.',
    ],
    pitfalls: [
      'Calculating payback on revenue rather than gross profit, which understates it by exactly your cost of goods.',
      'Ignoring churn during the payback window. If average lifetime is shorter than payback, the average customer never repays their acquisition cost at all.',
      'Using annual contract value on an annual-prepay plan without noting that the cash arrives up front — a real advantage that a monthly-average calculation hides.',
    ],
    calculator: 'cac-calculator',
    related: ['customer-acquisition-cost', 'ltv-cac-ratio', 'gross-margin'],
  },
  {
    slug: 'return-on-ad-spend',
    term: 'Return on Ad Spend',
    abbr: 'ROAS',
    short: 'Revenue generated for every dollar spent on advertising.',
    definition: [
      'ROAS divides the revenue attributed to advertising by the cost of that advertising. A ROAS of 4 means every $1 of ad spend produced $4 of revenue.',
      'ROAS is a revenue measure, not a profit measure. It says nothing about whether the revenue was profitable, which is why it must always be read next to your gross margin.',
    ],
    formula: 'ROAS = Revenue from ads ÷ Cost of ads',
    formulaNote:
      'Include agency fees, creative costs and platform fees in the cost, or you are measuring an incomplete denominator.',
    example: {
      setup:
        'An ecommerce brand spends $25,000 on ads and attributes $100,000 of revenue to them. Gross margin is 40%.',
      steps: [
        'ROAS = $100,000 ÷ $25,000 = 4.0',
        'Gross profit = $100,000 × 40% = $40,000',
        'Profit after ads = $40,000 − $25,000 = $15,000',
      ],
      result: '4:1 ROAS, and $15,000 of gross profit left after paying for the ads.',
    },
    whyItMatters: [
      'ROAS is the fastest channel-level read on whether advertising is working, and it is the number most ad platforms optimise toward.',
      'Paired with margin it becomes a decision: your break-even ROAS is 1 ÷ gross margin. At a 40% margin you need a ROAS of 2.5 just to stop losing money, so a "good" ROAS of 2 is quietly unprofitable.',
    ],
    pitfalls: [
      'Judging ROAS without knowing your break-even ROAS. The same 3:1 is excellent at an 80% margin and marginal at a 30% one.',
      'Trusting platform-reported revenue, which double-counts conversions across channels and typically overstates ROAS.',
      'Optimising for high ROAS by shrinking spend. A 10:1 ROAS on $2,000 of spend usually makes less money than 3:1 on $50,000.',
      'Ignoring returns and refunds in ecommerce, where they can remove a fifth of the revenue you just counted.',
    ],
    calculator: 'roas-calculator',
    related: ['break-even-roas', 'gross-margin', 'customer-acquisition-cost'],
  },
  {
    slug: 'break-even-roas',
    term: 'Break-Even ROAS',
    short:
      'The return on ad spend at which advertising exactly covers its own cost.',
    definition: [
      'Break-even ROAS is the point where the gross profit from advertised sales equals what you paid for the ads. Below it you lose money on every sale; above it each additional sale contributes profit.',
      'It is determined entirely by your gross margin, which is why two businesses can report identical ROAS and only one of them is making money.',
    ],
    formula: 'Break-even ROAS = 1 ÷ Gross margin %',
    example: {
      setup: 'A retailer runs a 40% gross margin.',
      steps: [
        'Break-even ROAS = 1 ÷ 0.40 = 2.5',
        'At $10,000 of ad spend, that requires $25,000 of attributed revenue.',
      ],
      result:
        'Anything below a 2.5:1 ROAS loses money, no matter how good it looks in the ad platform.',
    },
    whyItMatters: [
      'It converts an abstract ratio into a floor you can actually manage a campaign against, and it is the single most useful number to hand a media buyer.',
      'It also exposes the real cost of discounting. A 20% discount cuts your margin, which raises the ROAS you need to break even — often by more than the promotion lifts sales.',
    ],
    pitfalls: [
      'Using markup instead of margin in the formula, which produces a break-even point that is too low.',
      'Forgetting that break-even ROAS only covers the ads. Fixed costs, overhead and returns still have to be paid out of what is left.',
      'Applying a blended margin to a catalogue where products vary widely — the break-even point is per-product, not per-brand.',
    ],
    calculator: 'roas-calculator',
    related: ['return-on-ad-spend', 'gross-margin', 'markup'],
  },
  {
    slug: 'monthly-recurring-revenue',
    term: 'Monthly Recurring Revenue',
    abbr: 'MRR',
    short:
      'The predictable subscription revenue you expect to bill in a given month.',
    definition: [
      'MRR is the normalised value of all active subscriptions for one month. Annual contracts are divided by twelve so that a $12,000 annual plan counts as $1,000 of MRR rather than a one-off spike.',
      'MRR is deliberately narrow: it counts only recurring subscription revenue. One-off setup fees, professional services and usage overages that do not repeat are excluded, because including them destroys the predictability that makes the metric worth tracking.',
    ],
    formula:
      'Ending MRR = Starting MRR + New + Expansion − Contraction − Churned',
    formulaNote:
      'The five components are the whole point — the net number hides which lever is actually moving.',
    example: {
      setup:
        'A company starts a month at $100,000 MRR. It adds $12,000 in new business and $4,000 in upgrades, loses $2,000 to downgrades and $5,000 to cancellations.',
      steps: [
        'Net new MRR = $12,000 + $4,000 − $2,000 − $5,000 = $9,000',
        'Ending MRR = $100,000 + $9,000 = $109,000',
        'Growth rate = $9,000 ÷ $100,000 = 9%',
      ],
      result: '$109,000 of MRR, grown 9% in the month.',
    },
    whyItMatters: [
      'MRR is the operating heartbeat of a subscription business — short enough to act on, stable enough to plan against.',
      'Broken into its five components it becomes diagnostic. Flat MRR from $20k new and $20k churned is a very different company from flat MRR with no movement at all.',
    ],
    pitfalls: [
      'Counting the full value of an annual contract in the month it is signed. That is bookings, not MRR.',
      'Including non-recurring services revenue, which makes the trend line meaningless.',
      'Reporting only net new MRR. Without the gross components you cannot tell growth from churn replacement.',
    ],
    calculator: 'mrr-arr-calculator',
    related: ['annual-recurring-revenue', 'churn-rate', 'net-revenue-retention', 'saas-quick-ratio'],
  },
  {
    slug: 'annual-recurring-revenue',
    term: 'Annual Recurring Revenue',
    abbr: 'ARR',
    short: 'The annualised value of your recurring subscription revenue.',
    definition: [
      'ARR is the yearly run-rate of your subscription business, almost always calculated as current MRR multiplied by twelve. It is a snapshot of what the next twelve months would produce if nothing changed.',
      'ARR is the standard unit of measurement for B2B SaaS with annual contracts, and the number most investors quote. It is a run-rate, not a forecast — it does not predict revenue, it annualises the present moment.',
    ],
    formula: 'ARR = MRR × 12',
    example: {
      setup: 'A company ends the month at $109,000 MRR.',
      steps: ['ARR = $109,000 × 12 = $1,308,000'],
      result: 'The business is running at roughly $1.31M ARR.',
    },
    whyItMatters: [
      'ARR is the common language of SaaS benchmarking. Valuation multiples, funding stages and peer comparisons are all quoted against it.',
      'It smooths the seasonality and billing-cycle noise that makes month-to-month MRR hard to read across a whole year.',
    ],
    pitfalls: [
      'Treating ARR as booked or guaranteed revenue. It is a run-rate that churn immediately starts eroding.',
      'Annualising a month that contained an unusual one-off, which inflates the run-rate twelvefold.',
      'Using ARR for a business with genuinely monthly, high-churn subscriptions, where a twelve-month projection is not credible.',
    ],
    calculator: 'mrr-arr-calculator',
    related: ['monthly-recurring-revenue', 'churn-rate', 'net-revenue-retention'],
  },
  {
    slug: 'churn-rate',
    term: 'Churn Rate',
    short:
      'The percentage of customers or revenue you lose over a given period.',
    definition: [
      'Churn rate measures what leaks out of the business. Customer churn counts departing customers as a share of the customers you started with; revenue churn measures the recurring revenue those departures took with them.',
      'The two can diverge sharply, and the gap is informative. Losing many small customers produces high customer churn and low revenue churn. Losing one large account does the opposite — and is usually the more serious problem.',
    ],
    formula: 'Churn rate % = (Customers lost in period ÷ Customers at start) × 100',
    formulaNote:
      'Customers acquired during the period are excluded from the denominator.',
    example: {
      setup: 'A company starts the month with 1,000 customers and loses 30.',
      steps: [
        'Churn = 30 ÷ 1,000 = 3%',
        'Retention = 100% − 3% = 97%',
        'Implied average lifetime = 1 ÷ 0.03 ≈ 33 months',
      ],
      result: '3% monthly churn, implying an average customer life of about 33 months.',
    },
    whyItMatters: [
      'Churn sets the ceiling on growth. At 5% monthly churn you lose about 46% of your customer base in a year, so nearly half your acquisition budget buys replacement rather than growth.',
      'It flows directly into lifetime value, because average lifetime is the reciprocal of churn. Small changes in churn move LTV disproportionately.',
    ],
    pitfalls: [
      'Including new customers acquired mid-period in the starting denominator, which understates churn.',
      'Quoting monthly and annual churn interchangeably. 5% monthly is roughly 46% annually, not 60%, because the base shrinks each month.',
      'Tracking only customer churn while a handful of large accounts quietly downgrade.',
      'Ignoring involuntary churn from failed payments, which is often a large share of the total and is fixable.',
    ],
    calculator: 'churn-rate-calculator',
    related: ['net-revenue-retention', 'lifetime-value', 'monthly-recurring-revenue'],
  },
  {
    slug: 'net-revenue-retention',
    term: 'Net Revenue Retention',
    abbr: 'NRR',
    short:
      'How much revenue you keep from existing customers after churn, downgrades and upgrades.',
    definition: [
      'Net revenue retention measures what happens to a cohort of existing customers over a period, counting expansion, contraction and cancellation — but excluding any new customers you won.',
      'Above 100% means your existing base grew on its own: upgrades outweighed everything you lost. That is the defining characteristic of the strongest subscription businesses, because it means revenue compounds even with acquisition switched off.',
    ],
    formula:
      'NRR % = ((Starting MRR + Expansion − Contraction − Churn) ÷ Starting MRR) × 100',
    formulaNote: 'New customers are deliberately excluded — this measures the existing base only.',
    example: {
      setup:
        'A cohort starts at $100,000 MRR. It adds $8,000 of upgrades, loses $2,000 to downgrades and $4,000 to cancellations.',
      steps: [
        'Retained = $100,000 + $8,000 − $2,000 − $4,000 = $102,000',
        'NRR = $102,000 ÷ $100,000 = 102%',
      ],
      result: '102% NRR — the existing base grew without a single new customer.',
    },
    whyItMatters: [
      'NRR is the metric that most reliably separates durable SaaS businesses from leaky ones, and it is heavily weighted in how they are valued.',
      'Sustained NRR above 100% means growth compounds. Below 100% you are refilling a bucket with a hole in it, and acquisition has to run faster every year just to stay level.',
    ],
    pitfalls: [
      'Including new customers, which turns NRR into a growth rate and always flatters it.',
      'Measuring over too short a window to capture annual renewal cycles.',
      'Reporting a blended NRR across segments with very different behaviour, which hides an enterprise base propping up a churning self-serve one.',
    ],
    calculator: 'churn-rate-calculator',
    related: ['churn-rate', 'monthly-recurring-revenue', 'annual-recurring-revenue'],
  },
  {
    slug: 'average-revenue-per-user',
    term: 'Average Revenue Per User',
    abbr: 'ARPU',
    short: 'Average recurring revenue generated per customer per period.',
    definition: [
      'ARPU divides total recurring revenue by the number of active customers, usually per month. Where customers are companies rather than individuals it is often called ARPA — average revenue per account.',
      'It is the bridge between headline revenue and per-customer economics: LTV, payback period and break-even all need a per-customer revenue figure, and ARPU is it.',
    ],
    formula: 'ARPU = Total recurring revenue in period ÷ Active customers in period',
    example: {
      setup: 'A company bills $109,000 of MRR across 218 active accounts.',
      steps: ['ARPU = $109,000 ÷ 218 = $500 per account per month'],
      result: 'Each account is worth $500 a month on average.',
    },
    whyItMatters: [
      'Rising ARPU means you are moving upmarket or successfully expanding accounts — growth that costs far less than winning new logos.',
      'It is the input that makes LTV and payback calculations possible, so an unreliable ARPU quietly corrupts every downstream metric.',
    ],
    pitfalls: [
      'Mixing free or trial users into the customer count, which drags ARPU down and makes it non-comparable over time.',
      'Including one-off services revenue in the numerator while calling the result recurring.',
      'Averaging across segments that differ by an order of magnitude, producing a number that describes no actual customer.',
    ],
    calculator: 'mrr-arr-calculator',
    related: ['monthly-recurring-revenue', 'lifetime-value', 'cac-payback-period'],
  },
  {
    slug: 'gross-margin',
    term: 'Gross Margin',
    short:
      'The percentage of revenue left after the direct cost of delivering it.',
    definition: [
      'Gross margin is revenue minus cost of goods sold, expressed as a percentage of revenue. For software, cost of goods sold typically means hosting, third-party APIs, payment processing and customer support — the costs that scale with usage.',
      'It represents the share of every sale actually available to fund everything else: engineering, marketing, overhead and profit.',
    ],
    formula: 'Gross margin % = ((Revenue − Cost of goods sold) ÷ Revenue) × 100',
    example: {
      setup: 'A product sells for $100 and costs $35 to deliver.',
      steps: [
        'Gross profit = $100 − $35 = $65',
        'Gross margin = $65 ÷ $100 = 65%',
      ],
      result: '65% of every sale is available to cover everything else.',
    },
    whyItMatters: [
      'Gross margin is the multiplier sitting behind almost every other metric on this list. It converts revenue into LTV, sets break-even ROAS, and determines how many months a customer needs to repay their acquisition cost.',
      'It also explains why software and retail behave so differently. At an 80% margin you can afford aggressive acquisition; at 25% the same spend is ruinous.',
    ],
    pitfalls: [
      'Confusing margin with markup. A $35 cost sold at $100 is a 65% margin but a 186% markup — using markup where margin belongs is the most expensive arithmetic error in pricing.',
      'Leaving payment processing, support or free-tier hosting out of cost of goods sold, which overstates margin.',
      'Using a blended margin across products that differ widely, then pricing every product against it.',
    ],
    calculator: 'pricing-margin-calculator',
    related: ['markup', 'contribution-margin', 'break-even-roas', 'lifetime-value'],
  },
  {
    slug: 'markup',
    term: 'Markup',
    short: 'How much you add to cost to reach the selling price, as a percentage of cost.',
    definition: [
      'Markup expresses the gap between cost and price as a percentage of the cost. Margin expresses the same gap as a percentage of the price. Same dollars, different denominator — and the difference is the reason so many products are underpriced.',
      'To hit a target margin you divide by one minus the margin. You do not multiply cost by one plus the margin; that is markup, and it always lands short.',
    ],
    formula: 'Markup % = ((Price − Cost) ÷ Cost) × 100',
    formulaNote: 'Price for a target margin = Cost ÷ (1 − target margin).',
    example: {
      setup: 'An item costs $35 and you want a 65% gross margin.',
      steps: [
        'Correct: $35 ÷ (1 − 0.65) = $100.00',
        'The common mistake: $35 × 1.65 = $57.75, which is only a 39% margin',
      ],
      result:
        'Marking up by the target margin instead of dividing loses $42.25 of price on every unit.',
    },
    whyItMatters: [
      'Pricing is set in markup terms by most suppliers and measured in margin terms by every finance function. Moving between them correctly is a basic requirement of profitable pricing.',
      'The error compounds. At scale, a 39% margin where you planned 65% is the difference between a profitable catalogue and one that cannot fund its own advertising.',
    ],
    pitfalls: [
      'Using the two words interchangeably in the same conversation. They are never equal above zero.',
      'Applying a fixed markup across products with different cost structures and assuming margin is consistent.',
      'Discounting off the marked-up price without recalculating the resulting margin.',
    ],
    calculator: 'pricing-margin-calculator',
    related: ['gross-margin', 'contribution-margin', 'break-even-point'],
  },
  {
    slug: 'contribution-margin',
    term: 'Contribution Margin',
    short:
      'What each sale contributes toward fixed costs after its own variable costs.',
    definition: [
      'Contribution margin is revenue minus all variable costs for a unit or a customer. Unlike gross margin it includes every cost that varies with volume, such as sales commission, shipping and payment fees, not only cost of goods sold.',
      'It answers a specific question: how much does one more sale actually contribute toward the fixed costs the business has to pay regardless?',
    ],
    formula: 'Contribution margin = Revenue per unit − Variable costs per unit',
    example: {
      setup:
        'A subscription sells for $500 a month with $100 of hosting and support and $25 of payment and commission costs.',
      steps: ['Contribution margin = $500 − $100 − $25 = $375 per month'],
      result: 'Each customer contributes $375 a month toward fixed costs.',
    },
    whyItMatters: [
      'It is the correct numerator for break-even analysis. Fixed costs divided by contribution margin tells you exactly how many customers you need to stop losing money.',
      'It exposes products that look profitable on gross margin but stop being so once commission and fulfilment are counted.',
    ],
    pitfalls: [
      'Treating a semi-fixed cost as variable. A salaried support team does not scale smoothly with one extra customer.',
      'Using it interchangeably with gross margin — contribution margin is normally the lower and more conservative figure.',
      'Ignoring that contribution margin per customer changes as you discount to win larger accounts.',
    ],
    calculator: 'saas-break-even-calculator',
    related: ['gross-margin', 'break-even-point', 'markup'],
  },
  {
    slug: 'break-even-point',
    term: 'Break-Even Point',
    short:
      'The volume of customers or revenue at which total costs are exactly covered.',
    definition: [
      'The break-even point is where contribution from sales exactly equals fixed costs — the moment the business stops losing money without yet making any.',
      'It is usually expressed as a number of customers or units, which makes it far more actionable than a revenue target: it converts a financial goal into a sales one.',
    ],
    formula: 'Break-even customers = Fixed costs ÷ Contribution margin per customer',
    example: {
      setup:
        'A SaaS company has $150,000 in monthly fixed costs. Each customer pays $500 a month at an 80% gross margin.',
      steps: [
        'Contribution per customer = $500 × 80% = $400',
        'Break-even = $150,000 ÷ $400 = 375 customers',
        'Revenue needed = 375 × $500 = $187,500 per month',
      ],
      result: '375 paying customers, or $187,500 of monthly revenue, to break even.',
    },
    whyItMatters: [
      'It turns runway into a target. Knowing you need 375 customers is something a team can plan against; knowing you need "more revenue" is not.',
      'Recalculating it after every significant hire is the fastest way to see what that hire actually commits you to.',
      'For subscription businesses it also has a maintenance cost: at 3% monthly churn, a 375-customer base loses about 11 customers a month that must be replaced before any growth counts.',
    ],
    pitfalls: [
      'Using revenue instead of contribution margin, which understates the customers required by the whole cost of delivery.',
      'Forgetting that reaching break-even also requires the upfront acquisition spend to win those customers.',
      'Treating fixed costs as genuinely fixed. Most step up as you grow, moving the target as you approach it.',
    ],
    calculator: 'saas-break-even-calculator',
    related: ['contribution-margin', 'gross-margin', 'monthly-recurring-revenue'],
  },
  {
    slug: 'saas-quick-ratio',
    term: 'SaaS Quick Ratio',
    short:
      'Growth earned versus growth lost — new and expansion MRR divided by contraction and churn.',
    definition: [
      'The SaaS quick ratio compares the revenue you added to the revenue you lost in the same period. A ratio of 4 means you gained four dollars of recurring revenue for every dollar that leaked away.',
      'It measures growth efficiency rather than growth rate. Two companies can post identical net new MRR while one is growing cleanly and the other is sprinting to replace churn.',
    ],
    formula:
      'Quick ratio = (New MRR + Expansion MRR) ÷ (Contraction MRR + Churned MRR)',
    example: {
      setup:
        'A company adds $12,000 new and $4,000 expansion MRR, and loses $2,000 to contraction and $5,000 to churn.',
      steps: ['Quick ratio = ($12,000 + $4,000) ÷ ($2,000 + $5,000) = 2.29'],
      result: '$2.29 of recurring revenue gained for every $1 lost.',
    },
    whyItMatters: [
      'It is the clearest single diagnostic for whether a growth problem is an acquisition problem or a retention problem.',
      'A frequently cited reference point for healthy early-stage SaaS is around 4 or above. Below 1 the business is shrinking regardless of how much new business it writes.',
    ],
    pitfalls: [
      'Calculating it on a period too short to be meaningful, where one large account dominates the ratio.',
      'Reading a high ratio as success when it comes from a tiny revenue base with little to lose yet.',
      'Using it alone. It says nothing about the absolute size of growth.',
    ],
    calculator: 'mrr-arr-calculator',
    related: ['monthly-recurring-revenue', 'churn-rate', 'net-revenue-retention'],
  },
];

export const glossaryBySlug = new Map(glossary.map((t) => [t.slug, t]));

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryBySlug.get(slug);
}

/** Alphabetical, for the hub page index. */
export function getGlossaryAlphabetical(): GlossaryTerm[] {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term));
}

/** Glossary entries that point at a given calculator. */
export function getGlossaryForCalculator(slug: string): GlossaryTerm[] {
  return glossary.filter((t) => t.calculator === slug);
}
