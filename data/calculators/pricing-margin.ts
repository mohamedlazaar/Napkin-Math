import type { CalculatorConfig } from '@/lib/types';

export const pricingMargin: CalculatorConfig = {
  slug: 'pricing-margin-calculator',
  name: 'Pricing & Margin Calculator',
  h1: 'Pricing and Profit Margin Calculator',
  title: 'Margin Calculator — Pricing, Margin & Markup',
  description:
    'Free profit margin calculator. Enter cost and selling price to get gross margin, profit per unit, markup percentage and the price you need for any target margin.',
  blurb:
    'Gross margin, markup and the price you need to hit a target margin — three numbers people constantly confuse.',
  category: 'Pricing & Profitability',
  keywords: [
    'margin calculator',
    'profit margin calculator',
    'markup calculator',
    'pricing calculator',
    'margin vs markup',
  ],

  formulaId: 'pricingMargin',
  formulaDisplay:
    'Gross margin % = (Price − Cost) ÷ Price × 100    ·    Price for target margin = Cost ÷ (1 − Target margin)',

  fields: [
    {
      id: 'sellingPrice',
      label: 'Selling price',
      type: 'currency',
      defaultValue: 100,
      min: 0,
      step: 1,
      help: 'What the customer actually pays, after any standard discount.',
    },
    {
      id: 'unitCost',
      label: 'Unit cost (COGS)',
      type: 'currency',
      defaultValue: 40,
      min: 0,
      step: 1,
      help: 'What the item costs you to buy or make, including inbound freight.',
    },
    {
      id: 'otherVariableCosts',
      label: 'Other variable costs per unit',
      type: 'currency',
      defaultValue: 12,
      min: 0,
      step: 1,
      optional: true,
      help: 'Shipping, packaging, payment fees, marketplace commission, returns allowance.',
    },
    {
      id: 'targetMarginPct',
      label: 'Target gross margin',
      type: 'percent',
      defaultValue: 60,
      min: 0,
      max: 99,
      step: 1,
      optional: true,
      help: 'Used to work out the price you would need to charge.',
    },
  ],

  results: [
    {
      id: 'marginPct',
      label: 'Gross margin',
      format: 'percent',
      primary: true,
      help: 'Profit as a share of the selling price. This is the one to quote.',
    },
    { id: 'profitPerUnit', label: 'Gross profit per unit', format: 'currency2' },
    {
      id: 'markupPct',
      label: 'Markup',
      format: 'percent',
      help: 'Profit as a share of cost. Always a bigger number than margin.',
    },
    { id: 'priceForTargetMargin', label: 'Price needed for target margin', format: 'currency2' },
  ],

  intro: [
    'Gross margin is profit as a percentage of the price you charge. Markup is profit as a percentage of what the item cost you. They are different numbers describing the same transaction, and confusing them is one of the most expensive mistakes in small business pricing.',
    'Enter your figures below. Everything runs in your browser — nothing is uploaded, stored or sent anywhere.',
  ],

  sections: [
    {
      heading: 'Margin vs markup — the difference that costs money',
      body: [
        'Both measure the same gap between cost and price; they just divide it by different things. An item costing $52 and selling for $100 has a $48 gross profit. As a share of the $100 price that is a 48% margin. As a share of the $52 cost it is a 92% markup. Same transaction, same profit, two very different-looking percentages.',
        'The costly error is applying a target margin as if it were a markup. A business wanting a 60% margin on a $52 item that multiplies cost by 1.6 arrives at $83.20 — which is actually a 37.5% margin, not 60%. The correct calculation divides rather than multiplies: $52 ÷ (1 − 0.60) = $130. Across a full catalogue, that gap is the difference between a healthy business and one wondering where the profit went.',
      ],
      bullets: [
        'Margin = (Price − Cost) ÷ Price. Always less than 100%.',
        'Markup = (Price − Cost) ÷ Cost. Can exceed 100%.',
        'Price for a target margin = Cost ÷ (1 − margin). Divide, never multiply.',
      ],
    },
    {
      heading: 'What belongs in unit cost',
      body: [
        'Everything that varies with the unit. Product or material cost is the obvious part; the parts that get forgotten are inbound freight and duty, payment processing at 2–3%, marketplace commissions, packaging, outbound shipping you subsidise, and an allowance for returns. In apparel, where return rates reach 20–30%, omitting that allowance can turn a claimed 55% margin into an actual 35%.',
        'Fixed costs — rent, salaries, software — stay out. They do not vary per unit, and including them turns gross margin into something closer to net margin, which breaks every comparison and benchmark you might want to use. Gross margin is what funds fixed costs; it cannot also contain them.',
      ],
    },
    {
      heading: 'How margin drives everything downstream',
      body: [
        'Gross margin sets your break-even ROAS at 1 ÷ margin: at 45% you need 2.22:1 from advertising just to avoid losing money, at 25% you need 4:1. It sets how much you can spend acquiring a customer, how long CAC takes to repay, and how much discounting you can survive.',
        'That last one is worth spelling out. At a 48% margin, a 20% discount removes about 42% of your gross profit — you would need to sell roughly 1.7 times as many units to end up where you started. Businesses running frequent promotions on thin margins are often selling substantially more while earning less, and the margin arithmetic is the only thing that makes it visible before the year-end accounts do.',
      ],
    },
    {
      heading: 'Raising margin without raising prices',
      body: [
        'Price increases are the most direct lever and flow almost entirely to gross profit — a 5% rise on a 48% margin item lifts margin to about 50.5% with no cost change at all. But when a price rise is not available, the variable-cost side usually has room in it.',
        'Renegotiating supplier terms at higher volume, reducing packaging weight to drop a shipping tier, cutting return rates with better sizing information and photography, and moving customers toward higher-margin products in the range all raise blended margin without touching the headline price. Reducing payment and marketplace fees by shifting channel mix works too, and is frequently the largest single line nobody looks at.',
      ],
    },
  ],

  workedExample: {
    scenario:
      'An ecommerce brand sells a product for $100. It costs $40 landed from the supplier, and another $12 per unit goes on packaging, shipping, payment fees and a returns allowance. The owner wants to know the true margin and what price a 60% target margin would require.',
    inputs: [
      { label: 'Selling price', value: '$100' },
      { label: 'Unit cost (COGS)', value: '$40' },
      { label: 'Other variable costs per unit', value: '$12' },
      { label: 'Target gross margin', value: '60%' },
    ],
    steps: [
      'Total variable cost = $40 + $12 = $52',
      'Gross profit per unit = $100 − $52 = $48',
      'Gross margin = $48 ÷ $100 = 48%',
      'Markup = $48 ÷ $52 = about 92.3%',
      'Price for a 60% margin = $52 ÷ (1 − 0.60) = $130',
    ],
    takeaway:
      'The real margin is 48%, not the 60% the owner assumed from a $40 cost — the $12 of other variable costs accounts for the entire gap. Reaching a genuine 60% margin means charging $130, not the $83.20 that multiplying cost by 1.6 would suggest.',
  },

  faqs: [
    {
      q: 'What is the difference between margin and markup?',
      a: 'Margin is profit divided by selling price; markup is profit divided by cost. A $52 item sold at $100 has a 48% margin and a 92% markup — the same profit expressed two ways.',
    },
    {
      q: 'How do I calculate the price for a target margin?',
      a: 'Price = cost ÷ (1 − target margin). For a 60% margin on a $52 cost: $52 ÷ 0.40 = $130. Multiplying cost by 1.6 gives $83.20, which is only a 37.5% margin.',
    },
    {
      q: 'What is a good gross margin?',
      a: 'It varies enormously by sector: 70–90% for software, 40–60% for DTC ecommerce, 25–35% for grocery retail, 60–70% for restaurant food cost. Compare within your industry, never across.',
    },
    {
      q: 'Should shipping be included in cost of goods?',
      a: 'Inbound freight to get stock to you, always. Outbound shipping should be included whenever you subsidise it, because it varies per unit and comes straight out of the same gross profit.',
    },
    {
      q: 'How much does discounting cost me?',
      a: 'More than the discount. At a 48% margin, a 20% discount removes about 42% of gross profit per unit, so you would need to sell roughly 1.7× the volume to break even on the promotion.',
    },
    {
      q: 'Does this calculator send my data anywhere?',
      a: 'No. Every calculation runs locally in your browser using JavaScript. Nothing is transmitted to a server, logged or stored.',
    },
  ],

  related: ['roas-calculator', 'cac-calculator', 'ltv-calculator', 'saas-break-even-calculator'],

  variants: [
    {
      slug: 'for-ecommerce',
      label: 'ecommerce',
      audience: 'ecommerce and DTC brands',
      intro:
        'Ecommerce margins erode in a dozen small places between the product cost and the bank deposit, and most of them never appear on a supplier invoice. Payment fees, marketplace commissions, shipping subsidies and returns typically remove 10–20 points from the margin a founder believes they are earning.',
      costsToInclude: [
        'Landed product cost including freight and duty',
        'Payment processing at 2.9% plus a fixed fee per order',
        'Outbound shipping where you offer free or flat-rate delivery',
        'Packaging, inserts and pick-and-pack labour',
        'Returns allowance — 20–30% in apparel, 5–10% in most other categories',
      ],
      benchmark: {
        typical:
          'Blended gross margins of 40–60% before advertising; below 40% makes paid acquisition very hard to sustain.',
        good: 'Contribution margin above 30% after advertising.',
        note: 'Compute margin after returns, not before. A 55% margin with a 25% return rate is closer to 40% once you account for goods that come back and cannot be resold at full price.',
      },
      defaults: { sellingPrice: 100, unitCost: 40, otherVariableCosts: 15, targetMarginPct: 55 },
      example: {
        scenario:
          'A DTC brand sells at $100 with a $40 landed cost, plus $15 in shipping, packaging, payment fees and returns allowance.',
        inputs: [
          { label: 'Selling price', value: '$100' },
          { label: 'Unit cost (COGS)', value: '$40' },
          { label: 'Other variable costs per unit', value: '$15' },
          { label: 'Target gross margin', value: '55%' },
        ],
        steps: [
          'Total variable cost = $40 + $15 = $55',
          'Gross profit = $100 − $55 = $45, i.e. a 45% margin',
          'Break-even ROAS = 1 ÷ 0.45 = about 2.22:1',
          'Price for a 55% margin = $55 ÷ 0.45 = about $122',
        ],
        takeaway:
          'At 45%, advertising must return better than 2.22:1 to make money. Reaching a 55% margin would mean charging $122 — or removing $12 of variable cost, which is usually the more achievable of the two.',
      },
    },

    {
      slug: 'for-restaurants',
      label: 'restaurants',
      audience: 'restaurants, cafés and food businesses',
      intro:
        'Restaurants work in food cost percentage, which is simply the inverse of gross margin: 30% food cost is a 70% margin. The industry-specific traps are waste, over-portioning and delivery platform commissions of 15–30%, any of which can turn a well-priced dish into a loss-maker without the menu price changing.',
      costsToInclude: [
        'Ingredient cost at actual portion size, not recipe theory',
        'Waste, spoilage and staff meals — commonly 4–8% on top of food cost',
        'Delivery platform commission of 15–30% on those orders',
        'Packaging for takeaway and delivery',
        'Excluded: kitchen labour, which is usually treated as a separate prime-cost line',
      ],
      benchmark: {
        typical:
          'Food cost of 28–35% (a 65–72% margin) for full service; 25–30% for beverages, lower still for alcohol.',
        good: 'Prime cost — food plus labour — under 60% of revenue.',
        note: 'Price delivery orders separately. A dish at a 70% dine-in margin can fall to around 45% on a platform taking 25%, which is why identical menu prices across channels quietly lose money.',
      },
      defaults: { sellingPrice: 18, unitCost: 5.4, otherVariableCosts: 0.9, targetMarginPct: 70 },
      example: {
        scenario:
          'A restaurant sells a main course at $18. Ingredients cost $5.40 at actual portion size, and waste plus staff meals add about $0.90 per plate.',
        inputs: [
          { label: 'Selling price', value: '$18.00' },
          { label: 'Unit cost (COGS)', value: '$5.40' },
          { label: 'Other variable costs per unit', value: '$0.90' },
          { label: 'Target gross margin', value: '70%' },
        ],
        steps: [
          'Total food cost = $5.40 + $0.90 = $6.30',
          'Gross profit = $18.00 − $6.30 = $11.70, i.e. a 65% margin (35% food cost)',
          'Price for a 70% margin = $6.30 ÷ 0.30 = $21.00',
        ],
        takeaway:
          'A 35% food cost is at the upper end of acceptable. On a delivery platform taking 25% commission the same dish drops to roughly a 40% margin — which is the argument for higher delivery menu prices rather than parity.',
      },
    },

    {
      slug: 'for-retail',
      label: 'retail',
      audience: 'retail stores and resellers',
      intro:
        'Retail is where margin and markup get confused most often, because suppliers quote in markup and accountants report in margin. Retail also has to price for markdowns from the start: if a predictable share of stock eventually sells at discount, initial margin must be set high enough to absorb it.',
      costsToInclude: [
        'Wholesale cost plus inbound freight',
        'Shrinkage from theft and damage, typically 1–2% of sales',
        'Markdown allowance for end-of-season clearance',
        'Card processing fees',
        'Excluded: rent and staff, which are fixed costs',
      ],
      benchmark: {
        typical:
          'Keystone pricing (double the cost) gives a 50% margin. Apparel often targets 55–65% initial margin; grocery runs 25–35%.',
        good: 'Maintained margin — after markdowns — within 5 points of initial margin.',
        note: 'Track maintained margin, not initial margin. If 30% of stock eventually sells at 40% off, a 60% initial margin lands closer to 50% once the season closes.',
      },
      defaults: { sellingPrice: 60, unitCost: 25, otherVariableCosts: 3, targetMarginPct: 55 },
      example: {
        scenario:
          'A boutique buys an item at $25 wholesale and sells it at $60, with about $3 per unit in card fees, shrinkage and markdown allowance.',
        inputs: [
          { label: 'Selling price', value: '$60.00' },
          { label: 'Unit cost (COGS)', value: '$25.00' },
          { label: 'Other variable costs per unit', value: '$3.00' },
          { label: 'Target gross margin', value: '55%' },
        ],
        steps: [
          'Total cost = $25 + $3 = $28',
          'Gross profit = $60 − $28 = $32, i.e. a 53.3% margin',
          'Markup on cost = $32 ÷ $28 = about 114%',
          'Price for a 55% margin = $28 ÷ 0.45 = about $62.22',
        ],
        takeaway:
          'A 53.3% margin is a 114% markup — the two numbers describing one transaction. A supplier suggesting a "100% markup" is proposing a 50% margin, which is three points worse than what this store is achieving.',
      },
    },

    {
      slug: 'for-manufacturing',
      label: 'manufacturing',
      audience: 'manufacturers and product makers',
      intro:
        'Manufacturing margin depends on where you draw the line between variable and fixed cost, and on volume, since unit cost falls as production runs lengthen. Direct materials and direct labour are clearly variable; factory overhead is the judgement call, and how you allocate it determines whether a product looks profitable.',
      costsToInclude: [
        'Direct materials including scrap and yield loss',
        'Direct labour at fully loaded cost',
        'Variable machine time, tooling wear and energy',
        'Quality failures and rework',
        'Excluded from variable: factory rent and equipment depreciation',
      ],
      benchmark: {
        typical:
          'Gross margins of 25–40% are common for contract manufacturing; branded products run higher.',
        good: 'Contribution margin above 35%, with a clear volume threshold where unit cost drops.',
        note: 'Quote margin at a stated volume. Unit economics at 1,000 units and at 100,000 units are different businesses, and a margin figure without a volume attached means very little.',
      },
      defaults: { sellingPrice: 45, unitCost: 22, otherVariableCosts: 5, targetMarginPct: 45 },
      example: {
        scenario:
          'A manufacturer sells a component at $45. Direct materials and labour are $22, and variable machine time, energy and rework add about $5 per unit.',
        inputs: [
          { label: 'Selling price', value: '$45.00' },
          { label: 'Unit cost (COGS)', value: '$22.00' },
          { label: 'Other variable costs per unit', value: '$5.00' },
          { label: 'Target gross margin', value: '45%' },
        ],
        steps: [
          'Total variable cost = $22 + $5 = $27',
          'Gross profit = $45 − $27 = $18, i.e. a 40% margin',
          'Price for a 45% margin = $27 ÷ 0.55 = about $49.09',
        ],
        takeaway:
          'A 40% contribution margin at current volume. Because factory overhead sits outside this figure, the real question is how many units it takes to cover it — which makes break-even volume the number to pair with this one.',
      },
    },

    {
      slug: 'for-freelancers',
      label: 'freelancers and consultants',
      audience: 'freelancers, consultants and independent professionals',
      intro:
        'For solo professionals the equivalent of unit cost is your own time plus anything you subcontract, and the margin question becomes whether your rate covers non-billable hours. Most freelancers bill 50–70% of their working time, so an hourly rate set against a full week is structurally too low.',
      costsToInclude: [
        'Subcontractor and freelancer costs on the project',
        'Software, licences and assets bought for the client',
        'Payment processing and currency conversion fees',
        'Non-billable time — admin, business development, revisions',
      ],
      benchmark: {
        typical:
          'Effective utilisation of 50–70% is normal, so headline rates need to be roughly 1.5× what a full-time equivalent would imply.',
        good: 'Project margin above 50% after subcontractors and non-billable time.',
        note: 'Price on outcomes rather than hours where you can. Hourly billing caps income at your available time and penalises you for getting faster at the work.',
      },
      defaults: { sellingPrice: 5000, unitCost: 1500, otherVariableCosts: 400, targetMarginPct: 65 },
      example: {
        scenario:
          'A freelance designer charges $5,000 for a project, subcontracts $1,500 of development, and spends about $400 on stock assets, licences and payment fees.',
        inputs: [
          { label: 'Selling price', value: '$5,000' },
          { label: 'Unit cost (COGS)', value: '$1,500' },
          { label: 'Other variable costs per unit', value: '$400' },
          { label: 'Target gross margin', value: '65%' },
        ],
        steps: [
          'Total direct cost = $1,500 + $400 = $1,900',
          'Gross profit = $5,000 − $1,900 = $3,100, i.e. a 62% margin',
          'Price for a 65% margin = $1,900 ÷ 0.35 = about $5,429',
        ],
        takeaway:
          'A 62% margin looks healthy, but it excludes the designer\'s own unpaid time on scoping, revisions and admin. Add 30% non-billable overhead and the true figure is closer to 45% — which is the number to price against.',
      },
    },

    {
      slug: 'for-construction',
      label: 'construction and trades',
      audience: 'contractors, builders and trade businesses',
      intro:
        'Construction margin is quoted at bid time and realised months later, which makes it uniquely exposed to material price movements and scope creep. The industry also confuses margin and markup more than almost any other, and on a six-figure job that confusion is expensive.',
      costsToInclude: [
        'Materials at current prices with an escalation allowance',
        'Direct labour at fully loaded cost including payroll taxes and insurance',
        'Subcontractor quotes with a contingency for variations',
        'Equipment hire, permits and site costs',
        'Excluded: office overhead, which is recovered separately',
      ],
      benchmark: {
        typical:
          'Gross margins of 15–25% on new build; 25–40% on remodelling and specialist trades.',
        good: 'Net margin of 8–12% after overhead recovery, with under 5% variance to bid.',
        note: 'A "20% markup" on a $100,000 job is $120,000, which is a 16.7% margin — not 20%. On a job this size the difference is $4,000 of profit that was never priced in.',
      },
      defaults: { sellingPrice: 120000, unitCost: 78000, otherVariableCosts: 12000, targetMarginPct: 25 },
      example: {
        scenario:
          'A contractor bids $120,000 for a remodel. Materials and subcontractors come to $78,000, and direct labour, equipment hire and permits add $12,000.',
        inputs: [
          { label: 'Selling price', value: '$120,000' },
          { label: 'Unit cost (COGS)', value: '$78,000' },
          { label: 'Other variable costs per unit', value: '$12,000' },
          { label: 'Target gross margin', value: '25%' },
        ],
        steps: [
          'Total job cost = $78,000 + $12,000 = $90,000',
          'Gross profit = $120,000 − $90,000 = $30,000, i.e. a 25% margin',
          'Markup on cost = $30,000 ÷ $90,000 = about 33.3%',
          'Price for a 25% margin = $90,000 ÷ 0.75 = $120,000 ✓',
        ],
        takeaway:
          'Achieving a 25% margin required a 33.3% markup on cost. Had the contractor added 25% to cost instead, the bid would have been $112,500 and the margin 20% — $7,500 of profit lost to arithmetic rather than negotiation.',
      },
    },
  ],
};
