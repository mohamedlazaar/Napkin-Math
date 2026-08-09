/**
 * Pure maths, and nothing else.
 *
 * This module is the ONLY calculator code that reaches the browser, so keep it
 * free of copy, config and imports. Every function takes the raw input values
 * keyed by field id and returns result values keyed by result id. Return
 * `null` for "can't be computed with these inputs" (divide-by-zero, etc.) and
 * the UI will render an em dash instead of NaN or Infinity.
 */

export type FormulaInputs = Record<string, number>;
export type FormulaOutputs = Record<string, number | null>;
export type FormulaFn = (v: FormulaInputs) => FormulaOutputs;

/** Guards every division in here. */
const div = (a: number, b: number): number | null =>
  b === 0 || !Number.isFinite(a / b) ? null : a / b;

/** Multiplies through a nullable — keeps null propagating instead of NaN. */
const mul = (a: number | null, b: number): number | null => (a === null ? null : a * b);

export const formulas: Record<string, FormulaFn> = {
  cac: (v) => {
    const totalSpend =
      (v.marketingSpend || 0) + (v.salesSpend || 0) + (v.otherCosts || 0);
    const cac = div(totalSpend, v.newCustomers);

    // Payback is measured on gross profit, not revenue — you can't pay a sales
    // team back with money that goes to hosting and support.
    const grossProfitPerMonth =
      (v.arpaMonthly || 0) * ((v.grossMarginPct || 0) / 100);
    const paybackMonths = cac === null ? null : div(cac, grossProfitPerMonth);

    return { cac, totalSpend, grossProfitPerMonth, paybackMonths };
  },

  ltv: (v) => {
    const grossProfitPerMonth = (v.arpaMonthly || 0) * ((v.grossMarginPct || 0) / 100);
    // Average lifetime is the reciprocal of the churn rate. 5% monthly churn
    // means the average customer stays 1/0.05 = 20 months.
    const avgLifetimeMonths = div(100, v.monthlyChurnPct);
    const ltv = mul(avgLifetimeMonths, grossProfitPerMonth);
    const revenueLtv = mul(avgLifetimeMonths, v.arpaMonthly || 0);

    return { ltv, grossProfitPerMonth, avgLifetimeMonths, revenueLtv };
  },

  ltvCacRatio: (v) => {
    const ratio = div(v.ltv || 0, v.cac);
    const profitPerCustomer = (v.ltv || 0) - (v.cac || 0);
    const cacAsPctOfLtv = mul(div(v.cac || 0, v.ltv), 100);

    const grossProfitPerMonth = (v.arpaMonthly || 0) * ((v.grossMarginPct || 0) / 100);
    const paybackMonths = div(v.cac || 0, grossProfitPerMonth);

    return { ratio, profitPerCustomer, cacAsPctOfLtv, paybackMonths };
  },

  roas: (v) => {
    const totalAdCost = (v.adSpend || 0) + (v.otherAdCosts || 0);
    const roas = div(v.revenue || 0, totalAdCost);
    const grossProfit = (v.revenue || 0) * ((v.grossMarginPct || 0) / 100);
    const profitAfterAds = grossProfit - totalAdCost;
    // The ROAS at which you stop losing money: 1 / gross margin.
    const breakEvenRoas = div(100, v.grossMarginPct);
    const acosPct = mul(div(totalAdCost, v.revenue), 100);

    return { roas, profitAfterAds, breakEvenRoas, acosPct };
  },

  churnRate: (v) => {
    const customerChurnPct = mul(div(v.customersLost || 0, v.customersStart), 100);
    const retentionPct = customerChurnPct === null ? null : 100 - customerChurnPct;
    const avgLifetimeMonths = div(100, customerChurnPct ?? 0);

    // Revenue churn is the number that actually predicts your P&L, because the
    // customers who leave are rarely the average-sized ones.
    const grossRevenueChurnPct = mul(div(v.mrrChurned || 0, v.mrrStart), 100);
    const netRevenueRetentionPct = mul(
      div((v.mrrStart || 0) - (v.mrrChurned || 0) + (v.mrrExpansion || 0), v.mrrStart),
      100
    );

    return {
      customerChurnPct,
      retentionPct,
      avgLifetimeMonths,
      grossRevenueChurnPct,
      netRevenueRetentionPct,
    };
  },

  mrrArr: (v) => {
    const netNewMrr =
      (v.newMrr || 0) + (v.expansionMrr || 0) - (v.contractionMrr || 0) - (v.churnedMrr || 0);
    const endingMrr = (v.startingMrr || 0) + netNewMrr;
    const arr = endingMrr * 12;
    const growthRatePct = mul(div(netNewMrr, v.startingMrr), 100);
    // SaaS quick ratio: growth earned vs growth lost. Above 4 is strong.
    const quickRatio = div(
      (v.newMrr || 0) + (v.expansionMrr || 0),
      (v.contractionMrr || 0) + (v.churnedMrr || 0)
    );

    return { endingMrr, netNewMrr, arr, growthRatePct, quickRatio };
  },

  saasBreakEven: (v) => {
    const contributionPerCustomer =
      (v.arpaMonthly || 0) * ((v.grossMarginPct || 0) / 100);
    const customersNeeded = div(v.fixedCostsMonthly || 0, contributionPerCustomer);
    const monthlyRevenueNeeded = mul(customersNeeded, v.arpaMonthly || 0);
    const upfrontCacInvestment = mul(customersNeeded, v.cac || 0);
    // Standing still isn't free: this is how many new customers a month you
    // must win just to replace the ones churning at break-even scale.
    const replacementCustomersPerMonth = mul(
      customersNeeded,
      (v.monthlyChurnPct || 0) / 100
    );

    return {
      customersNeeded,
      contributionPerCustomer,
      monthlyRevenueNeeded,
      upfrontCacInvestment,
      replacementCustomersPerMonth,
    };
  },

  pricingMargin: (v) => {
    const totalUnitCost = (v.unitCost || 0) + (v.otherVariableCosts || 0);
    const profitPerUnit = (v.sellingPrice || 0) - totalUnitCost;
    const marginPct = mul(div(profitPerUnit, v.sellingPrice), 100);
    const markupPct = mul(div(profitPerUnit, totalUnitCost), 100);
    // Price that hits a target margin: cost / (1 - margin). Note it is NOT
    // cost x (1 + margin) — that's markup, and it's the most common pricing
    // mistake there is.
    const targetMargin = (v.targetMarginPct || 0) / 100;
    const priceForTargetMargin =
      targetMargin >= 1 ? null : div(totalUnitCost, 1 - targetMargin);

    return { marginPct, profitPerUnit, markupPct, priceForTargetMargin };
  },
};

export function compute(formulaId: string, values: FormulaInputs): FormulaOutputs {
  const fn = formulas[formulaId];
  return fn ? fn(values) : {};
}
