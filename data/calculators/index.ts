import type { CalculatorConfig } from '@/lib/types';
import { cac } from './cac';
import { ltv } from './ltv';
import { ltvCac } from './ltv-cac';
import { roas } from './roas';
import { churn } from './churn';
import { mrrArr } from './mrr-arr';
import { breakEven } from './break-even';
import { pricingMargin } from './pricing-margin';

/**
 * THE ONLY PLACE YOU REGISTER A CALCULATOR.
 *
 * Add the import and drop it in the array. That single edit generates:
 *   - /<slug>                     the calculator page
 *   - /<slug>/<variant.slug>      one page per programmatic variant
 *   - a homepage card
 *   - sitemap.xml entries
 *   - JSON-LD (WebApplication + FAQPage + BreadcrumbList)
 *   - reciprocal internal links from any calculator listing it in `related`
 *
 * Order here is the order shown on the homepage.
 */
export const calculators: CalculatorConfig[] = [
  cac,
  ltv,
  ltvCac,
  churn,
  mrrArr,
  breakEven,
  roas,
  pricingMargin,
];
