/**
 * RESULT INTERPRETATION.
 *
 * Turns raw formula output into a plain-English reading of what it means. This
 * is what separates a calculator from a decision-support tool.
 *
 * Three hard rules, because this is financial content:
 *   1. Every insight is DERIVED from the user's own numbers. Nothing here is
 *      generic filler that renders regardless of input.
 *   2. Benchmarks are labelled as general references and attributed to a
 *      context (e.g. "commonly cited for B2B SaaS"). We never imply a
 *      threshold is a law.
 *   3. When inputs are incomplete we return a neutral prompt, never a verdict.
 *      A confident-sounding judgement on missing data is worse than silence.
 *
 * Pure functions over plain numbers — this runs on the client, so it stays
 * free of copy imports and React.
 */

export type InsightStatus = 'healthy' | 'warning' | 'critical' | 'neutral';

export interface Insight {
  status: InsightStatus;
  /** Short, states the reading. Contains the user's actual number. */
  title: string;
  /** One or two sentences explaining what it means and what to do. */
  body: string;
  /** Benchmark framing. Always phrased as a general reference. */
  benchmark?: string;
}

type Values = Record<string, number>;
type Outputs = Record<string, number | null>;

const ok = (n: number | null | undefined): n is number =>
  n !== null && n !== undefined && Number.isFinite(n);

const money = (n: number) =>
  n >= 100 || n <= -100
    ? `$${Math.round(n).toLocaleString('en-US')}`
    : `$${n.toFixed(2)}`;
const pct = (n: number) => `${n.toFixed(1)}%`;
const mult = (n: number) => `${n.toFixed(2)}×`;
const months = (n: number) => `${n.toFixed(1)} month${Math.abs(n) === 1 ? '' : 's'}`;

/* ------------------------------------------------------------------ *
 * Per-calculator rules                                                *
 * ------------------------------------------------------------------ */

const rules: Record<string, (v: Values, o: Outputs) => Insight[]> = {
  cac: (v, o) => {
    const out: Insight[] = [];
    if (!ok(o.cac)) {
      return [
        {
          status: 'neutral',
          title: 'Add your new customer count',
          body: 'CAC needs the number of new customers won in the same period as the spend above.',
        },
      ];
    }

    out.push({
      status: 'neutral',
      title: `Each new customer costs you ${money(o.cac)}`,
      body: 'CAC on its own cannot be good or bad — it only means something next to what a customer is worth. Run the LTV calculator and compare the two.',
    });

    if (ok(o.paybackMonths) && o.paybackMonths > 0) {
      const p = o.paybackMonths;
      out.push(
        p <= 6
          ? {
              status: 'healthy',
              title: `You earn that back in ${months(p)}`,
              body: 'A short payback period means acquisition spend recycles quickly, so growth needs less working capital.',
              benchmark:
                'Under 12 months is commonly cited as healthy for B2B SaaS, and under 6 as strong. General reference points, not targets.',
            }
          : p <= 12
            ? {
                status: 'healthy',
                title: `You earn that back in ${months(p)}`,
                body: 'Each customer repays their acquisition cost inside a year, so growth is fundable but ties up cash for a while.',
                benchmark:
                  'Under 12 months is commonly cited as healthy for B2B SaaS. A general reference, not a target.',
              }
            : p <= 18
              ? {
                  status: 'warning',
                  title: `Payback takes ${months(p)}`,
                  body: 'You fund each customer for over a year before they repay you. That is workable with capital behind you, and slow without it. Check that your average customer actually stays longer than this.',
                  benchmark:
                    'Commonly cited references put healthy B2B SaaS payback under 12 months.',
                }
              : {
                  status: 'critical',
                  title: `Payback takes ${months(p)}`,
                  body: 'Acquisition spend is locked up for well over a year. Unless your customers stay considerably longer than that, each new customer consumes cash faster than it returns it.',
                  benchmark:
                    'Commonly cited references put healthy B2B SaaS payback under 12 months.',
                }
      );
    } else if (ok(o.cac)) {
      out.push({
        status: 'neutral',
        title: 'Add revenue and margin for payback',
        body: 'Fill in the optional revenue per customer and gross margin fields to see how many months it takes to earn this CAC back.',
      });
    }

    return out;
  },

  ltv: (v, o) => {
    const out: Insight[] = [];
    if (!ok(o.ltv)) {
      return [
        {
          status: 'neutral',
          title: 'Add your monthly churn rate',
          body: 'Lifetime value needs a churn rate above zero — average lifetime is calculated as 1 ÷ churn.',
        },
      ];
    }

    out.push({
      status: 'neutral',
      title: `Each customer is worth about ${money(o.ltv)}`,
      body: 'That is gross profit over the whole relationship, not revenue. It is the ceiling on what you can rationally pay to acquire one.',
    });

    if (ok(o.avgLifetimeMonths)) {
      const m = o.avgLifetimeMonths;
      const churn = v.monthlyChurnPct || 0;
      if (churn >= 8) {
        out.push({
          status: 'critical',
          title: `${pct(churn)} monthly churn implies a ${months(m)} lifetime`,
          body: 'At this rate you replace your entire customer base roughly every year and a half, so most of your acquisition budget buys replacement rather than growth.',
        });
      } else if (churn >= 5) {
        out.push({
          status: 'warning',
          title: `${pct(churn)} monthly churn implies a ${months(m)} lifetime`,
          body: 'Lifetime value is extremely sensitive to churn at this level. Dropping churn by one point here would raise LTV materially without changing price or acquisition.',
        });
      } else if (churn > 0 && churn < 1) {
        out.push({
          status: 'neutral',
          title: `A ${pct(churn)} churn rate projects a ${months(m)} lifetime`,
          body: 'The 1 ÷ churn formula produces very long lifetimes at low churn rates. Many operators cap the horizon at 24–36 months instead, because a projection that far out is hard to defend.',
        });
      } else {
        out.push({
          status: 'healthy',
          title: `Your average customer stays about ${months(m)}`,
          body: 'A long average life gives you room to spend more on acquisition than a higher-churn competitor can.',
        });
      }
    }

    return out;
  },

  ltvCacRatio: (v, o) => {
    const out: Insight[] = [];
    if (!ok(o.ratio)) {
      return [
        {
          status: 'neutral',
          title: 'Add your CAC to see the ratio',
          body: 'The ratio needs an acquisition cost above zero.',
        },
      ];
    }

    const r = o.ratio;
    out.push(
      r < 1
        ? {
            status: 'critical',
            title: `Your LTV:CAC ratio is ${mult(r)}`,
            body: `Every customer costs more to acquire than they return over their whole life — you lose roughly ${money(Math.abs(o.profitPerCustomer ?? 0))} per customer. Growth makes the loss bigger, not smaller.`,
            benchmark: '3:1 or better is the figure most commonly cited for subscription businesses.',
          }
        : r < 3
          ? {
              status: 'warning',
              title: `Your LTV:CAC ratio is ${mult(r)}`,
              body: 'Each customer returns more than they cost, but the surplus still has to cover product, support and overhead. There is little margin for a rise in acquisition costs.',
              benchmark: '3:1 or better is the figure most commonly cited for subscription businesses.',
            }
          : r <= 5
            ? {
                status: 'healthy',
                title: `Your LTV:CAC ratio is ${mult(r)}`,
                body: `The estimated lifetime value of a customer is about ${mult(r)} what you pay to acquire them, leaving roughly ${money(o.profitPerCustomer ?? 0)} of gross profit each to fund the rest of the business.`,
                benchmark:
                  '3:1 or better is the figure most commonly cited for subscription businesses. It is a general reference, not a rule that transfers to every model.',
              }
            : {
                status: 'healthy',
                title: `Your LTV:CAC ratio is ${mult(r)}`,
                body: 'Comfortably profitable per customer — and high enough that it is usually read as underinvestment. If the payback period allows it, you can likely afford to spend more on acquisition and grow faster.',
                benchmark:
                  'Ratios above roughly 5:1 are commonly interpreted as spending too little on growth rather than as a win.',
              }
    );

    if (ok(o.paybackMonths) && o.paybackMonths > 0) {
      out.push({
        status: o.paybackMonths <= 12 ? 'healthy' : o.paybackMonths <= 18 ? 'warning' : 'critical',
        title: `Payback takes ${months(o.paybackMonths)}`,
        body: 'A strong ratio with a long payback can still run you out of cash — the ratio says a customer is profitable eventually, payback says how long you fund them first.',
      });
    }

    return out;
  },

  roas: (v, o) => {
    const out: Insight[] = [];
    if (!ok(o.roas)) {
      return [
        {
          status: 'neutral',
          title: 'Add your ad spend',
          body: 'ROAS needs an advertising cost above zero.',
        },
      ];
    }

    out.push({
      status: 'neutral',
      title: `Every $1 of ad spend returns ${money(o.roas)} of revenue`,
      body: 'ROAS measures revenue, not profit. Whether it is good depends entirely on your gross margin.',
    });

    if (ok(o.breakEvenRoas)) {
      const be = o.breakEvenRoas;
      const r = o.roas;
      out.push(
        r < be
          ? {
              status: 'critical',
              title: `You break even at ${mult(be)} — you are at ${mult(r)}`,
              body: `At a ${pct(v.grossMarginPct || 0)} gross margin, advertising has to return ${mult(be)} just to cover its own cost. Every sale at this ROAS loses money.`,
            }
          : r < be * 1.25
            ? {
                status: 'warning',
                title: `You break even at ${mult(be)} — you are at ${mult(r)}`,
                body: 'You are above water but only just. A small rise in ad costs, a discount, or a normal rate of returns would push this campaign into a loss.',
              }
            : {
                status: 'healthy',
                title: `You break even at ${mult(be)} — you are at ${mult(r)}`,
                body: `Advertising clears its own cost with room to spare, leaving ${money(o.profitAfterAds ?? 0)} of gross profit after ad spend.`,
              }
      );
    }

    if (ok(o.profitAfterAds) && o.profitAfterAds < 0 && ok(o.roas)) {
      out.push({
        status: 'critical',
        title: `You lose ${money(Math.abs(o.profitAfterAds))} after ad costs`,
        body: 'Gross profit from the advertised revenue does not cover what you spent on the ads. Raising spend at this ROAS increases the loss.',
      });
    }

    return out;
  },

  churnRate: (v, o) => {
    const out: Insight[] = [];

    if (ok(o.customerChurnPct)) {
      const c = o.customerChurnPct;
      // Compounding matters: 5%/mo is ~46%/yr, not 60%.
      const annual = (1 - Math.pow(1 - c / 100, 12)) * 100;
      out.push(
        c >= 8
          ? {
              status: 'critical',
              title: `${pct(c)} monthly churn is about ${pct(annual)} a year`,
              body: `At this rate you lose most of your customer base annually. Acquisition has to run flat out just to stand still${ok(o.avgLifetimeMonths) ? `, and the average customer only stays ${months(o.avgLifetimeMonths)}` : ''}.`,
            }
          : c >= 5
            ? {
                status: 'warning',
                title: `${pct(c)} monthly churn is about ${pct(annual)} a year`,
                body: `Roughly half your customers are gone within a year${ok(o.avgLifetimeMonths) ? `, giving an average life of ${months(o.avgLifetimeMonths)}` : ''}. This is the number holding your lifetime value down.`,
              }
            : c > 0
              ? {
                  status: 'healthy',
                  title: `${pct(c)} monthly churn is about ${pct(annual)} a year`,
                  body: `Retention is solid${ok(o.avgLifetimeMonths) ? `, implying an average customer life of ${months(o.avgLifetimeMonths)}` : ''}. Note that churn compounds — it is not simply the monthly rate times twelve.`,
                }
              : {
                  status: 'neutral',
                  title: 'No customer churn in this period',
                  body: 'Worth checking over a longer window before treating it as a trend.',
                }
      );
    }

    if (ok(o.netRevenueRetentionPct)) {
      const n = o.netRevenueRetentionPct;
      out.push(
        n >= 100
          ? {
              status: 'healthy',
              title: `Net revenue retention is ${pct(n)}`,
              body: 'Your existing customers are worth more this period than last, before counting a single new customer. Revenue compounds on its own at this level.',
              benchmark:
                'Above 100% is the defining trait of the strongest subscription businesses; it is heavily weighted in how they are valued.',
            }
          : n >= 90
            ? {
                status: 'warning',
                title: `Net revenue retention is ${pct(n)}`,
                body: 'The existing base is shrinking slowly. Expansion revenue nearly offsets churn, but acquisition still has to cover the gap before any growth counts.',
              }
            : {
                status: 'critical',
                title: `Net revenue retention is ${pct(n)}`,
                body: 'Your existing customer base is losing revenue meaningfully faster than it expands. Acquisition has to run faster every year just to keep the total flat.',
              }
      );
    }

    if (
      ok(o.customerChurnPct) &&
      ok(o.grossRevenueChurnPct) &&
      o.grossRevenueChurnPct > o.customerChurnPct * 1.5
    ) {
      out.push({
        status: 'warning',
        title: 'Your revenue is churning faster than your customers',
        body: `Revenue churn (${pct(o.grossRevenueChurnPct)}) is well above customer churn (${pct(o.customerChurnPct)}), which means the accounts you are losing are larger than average. That is usually the more serious of the two problems.`,
      });
    }

    return out;
  },

  mrrArr: (v, o) => {
    const out: Insight[] = [];

    if (ok(o.endingMrr) && ok(o.netNewMrr)) {
      const growing = o.netNewMrr >= 0;
      out.push({
        status: growing ? 'healthy' : 'critical',
        title: growing
          ? `MRR grew ${money(o.netNewMrr)} to ${money(o.endingMrr)}`
          : `MRR fell ${money(Math.abs(o.netNewMrr))} to ${money(o.endingMrr)}`,
        body: growing
          ? `That annualises to ${money(o.arr ?? 0)} of ARR${ok(o.growthRatePct) ? `, a growth rate of ${pct(o.growthRatePct)} for the month` : ''}.`
          : 'Churn and contraction outweighed new and expansion revenue this period. The run-rate is going backwards.',
      });
    }

    if (ok(o.quickRatio)) {
      const q = o.quickRatio;
      out.push(
        q < 1
          ? {
              status: 'critical',
              title: `Your quick ratio is ${mult(q)}`,
              body: 'You are losing more recurring revenue than you add. This is a retention problem, and no amount of new business fixes it while the ratio stays below 1.',
            }
          : q < 2
            ? {
                status: 'warning',
                title: `Your quick ratio is ${mult(q)}`,
                body: 'You gain only a little more than you lose, so most of your new business is replacing churn rather than adding growth.',
                benchmark: 'Around 4 is a frequently cited reference for healthy early-stage SaaS.',
              }
            : q < 4
              ? {
                  status: 'warning',
                  title: `Your quick ratio is ${mult(q)}`,
                  body: `You add ${money(q)} of recurring revenue for every $1 lost. Growth is real, but a meaningful share of the effort still goes on replacement.`,
                  benchmark: 'Around 4 is a frequently cited reference for healthy early-stage SaaS.',
                }
              : {
                  status: 'healthy',
                  title: `Your quick ratio is ${mult(q)}`,
                  body: `You add ${money(q)} of recurring revenue for every $1 that leaks away. Growth is efficient rather than a treadmill.`,
                  benchmark: 'Around 4 is a frequently cited reference for healthy early-stage SaaS.',
                }
      );
    }

    return out;
  },

  saasBreakEven: (v, o) => {
    const out: Insight[] = [];

    if (!ok(o.customersNeeded) || !ok(o.contributionPerCustomer) || o.contributionPerCustomer <= 0) {
      return [
        {
          status: 'critical',
          title: 'Each customer contributes nothing toward fixed costs',
          body: 'With this price and gross margin there is no contribution left after delivery costs, so no number of customers reaches break-even. Price or margin has to change first.',
        },
      ];
    }

    out.push({
      status: 'neutral',
      title: `You need ${Math.ceil(o.customersNeeded).toLocaleString('en-US')} customers to break even`,
      body: `Each one contributes ${money(o.contributionPerCustomer)} a month toward your fixed costs${ok(o.monthlyRevenueNeeded) ? `, for ${money(o.monthlyRevenueNeeded)} of monthly revenue in total` : ''}.`,
    });

    if (ok(o.replacementCustomersPerMonth) && o.replacementCustomersPerMonth >= 1) {
      out.push({
        status: 'warning',
        title: `Standing still costs ${Math.ceil(o.replacementCustomersPerMonth)} customers a month`,
        body: 'At your churn rate that is how many new customers you must win each month at break-even scale purely to replace the ones leaving — before any growth counts.',
      });
    }

    if (ok(o.upfrontCacInvestment) && o.upfrontCacInvestment > 0) {
      out.push({
        status: 'neutral',
        title: `Getting there costs about ${money(o.upfrontCacInvestment)} in acquisition`,
        body: 'Break-even is not just a customer count — it is the upfront spend required to reach that count, which has to be funded before the business pays for itself.',
      });
    }

    return out;
  },

  pricingMargin: (v, o) => {
    const out: Insight[] = [];
    if (!ok(o.marginPct)) {
      return [
        {
          status: 'neutral',
          title: 'Add a selling price',
          body: 'Margin needs a selling price above zero.',
        },
      ];
    }

    const m = o.marginPct;
    out.push(
      m <= 0
        ? {
            status: 'critical',
            title: `You lose ${money(Math.abs(o.profitPerUnit ?? 0))} on every unit`,
            body: 'The selling price is at or below what the unit costs to deliver. Volume makes this worse, not better.',
          }
        : m < 20
          ? {
              status: 'warning',
              title: `Your gross margin is ${pct(m)}`,
              body: `Only ${pct(m)} of each sale is left to cover overhead, marketing and profit. Thin margins also make advertising very hard to run profitably.`,
            }
          : {
              status: 'healthy',
              title: `Your gross margin is ${pct(m)}`,
              body: `You keep ${money(o.profitPerUnit ?? 0)} of gross profit per unit to fund everything else.`,
            }
    );

    if (ok(o.markupPct) && ok(o.marginPct) && o.markupPct > 0) {
      out.push({
        status: 'neutral',
        title: `That is a ${pct(o.markupPct)} markup, not a ${pct(o.markupPct)} margin`,
        body: `Markup is measured against cost and margin against price, so the same sale is a ${pct(o.markupPct)} markup and a ${pct(m)} margin. Using one where the other belongs is the most expensive arithmetic mistake in pricing.`,
      });
    }

    if (ok(o.priceForTargetMargin) && (v.targetMarginPct || 0) > 0) {
      const delta = o.priceForTargetMargin - (v.sellingPrice || 0);
      out.push({
        status: 'neutral',
        title: `Hitting a ${pct(v.targetMarginPct || 0)} margin needs a price of ${money(o.priceForTargetMargin)}`,
        body:
          Math.abs(delta) < 0.01
            ? 'Your current price already lands exactly on that target.'
            : delta > 0
              ? `That is ${money(delta)} above your current price. Note the formula is cost ÷ (1 − margin), not cost × (1 + margin).`
              : `Your current price is ${money(Math.abs(delta))} above what that target requires, so you are already ahead of it.`,
      });
    }

    if (ok(o.marginPct) && m > 0) {
      const beRoas = 100 / m;
      if (Number.isFinite(beRoas)) {
        out.push({
          status: 'neutral',
          title: `Ads on this product must return ${mult(beRoas)} to break even`,
          body: 'Break-even ROAS is 1 ÷ gross margin. Below that figure, every advertised sale of this product loses money.',
        });
      }
    }

    return out;
  },
};

/**
 * Public entry point. Returns [] for an unknown formula rather than throwing,
 * so adding a calculator without insight rules degrades gracefully.
 */
export function getInsights(
  formulaId: string,
  values: Values,
  outputs: Outputs
): Insight[] {
  const rule = rules[formulaId];
  if (!rule) return [];
  try {
    return rule(values, outputs);
  } catch {
    return [];
  }
}

/** The worst status present — drives the summary badge on the result panel. */
export function overallStatus(insights: Insight[]): InsightStatus {
  if (insights.some((i) => i.status === 'critical')) return 'critical';
  if (insights.some((i) => i.status === 'warning')) return 'warning';
  if (insights.some((i) => i.status === 'healthy')) return 'healthy';
  return 'neutral';
}

export const statusLabel: Record<InsightStatus, string> = {
  healthy: 'Healthy',
  warning: 'Watch',
  critical: 'Needs attention',
  neutral: 'For reference',
};
