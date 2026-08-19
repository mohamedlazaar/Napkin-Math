/**
 * The shape of a calculator. Everything a page needs — inputs, maths, copy,
 * FAQs, internal links and the programmatic long-tail variants — lives in one
 * object so you can add a tool without touching a single component.
 *
 * Note the deliberate split:
 *   - `fields` / `results` are plain serialisable data (they cross the
 *     server -> client boundary as props).
 *   - the actual maths lives in lib/formulas.ts, referenced here by
 *     `formulaId`. That keeps page content out of the client JS bundle.
 */

export type FieldType = 'currency' | 'number' | 'percent';

export interface CalculatorField {
  /** Key used in the formula's input object. */
  id: string;
  label: string;
  type: FieldType;
  /** Pre-filled so the page is useful (and indexable) before any typing. */
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  /** One short line under the input. Keep it genuinely helpful. */
  help?: string;
  /** Marks an input the core formula doesn't need (shown in a second group). */
  optional?: boolean;
}

export type ResultFormat =
  | 'currency'
  | 'currency2'
  | 'number'
  | 'percent'
  | 'ratio'
  | 'months';

export interface CalculatorResult {
  /** Key returned by the formula. */
  id: string;
  label: string;
  format: ResultFormat;
  /** Exactly one result should be primary — it gets the big treatment. */
  primary?: boolean;
  help?: string;
  /**
   * Which direction is an improvement. Set this on the primary result so
   * scenario comparison can mark a winner; without it, comparison shows the
   * numbers side by side and declines to pick one. Never guess the direction —
   * lower CAC is better, lower LTV is not.
   */
  betterWhen?: 'higher' | 'lower';
}

export interface Faq {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;
  /** Array of paragraphs. Plain strings — no markdown parser, no extra JS. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface WorkedExample {
  scenario: string;
  inputs: { label: string; value: string }[];
  steps: string[];
  takeaway: string;
}

/**
 * A programmatic long-tail page: "<calculator> for <industry/use-case>".
 * Every field here exists to make the page genuinely different from its
 * siblings — different benchmarks, different cost lines, different worked
 * numbers. If you can't fill these in honestly, don't add the variant.
 */
export interface CalculatorVariant {
  /** URL segment, e.g. 'for-saas' -> /cac-calculator/for-saas */
  slug: string;
  /** e.g. 'SaaS' — used inside generated headings and copy. */
  label: string;
  /** e.g. 'B2B SaaS companies' — used in sentences. */
  audience: string;
  /** 2–3 sentences unique to this vertical. */
  intro: string;
  /** Cost lines that are easy to forget in this specific vertical. */
  costsToInclude: string[];
  benchmark: {
    typical: string;
    good: string;
    /** Where the range comes from / how to read it. Be honest. */
    note: string;
  };
  /** Overrides the calculator's default inputs with realistic numbers. */
  defaults?: Record<string, number>;
  example: WorkedExample;
  /** Vertical-specific questions, appended to the calculator's own FAQs. */
  faqs?: Faq[];
}

export interface CalculatorConfig {
  /** URL segment, e.g. 'cac-calculator' -> /cac-calculator */
  slug: string;
  /** Short name used in nav, cards and internal links. */
  name: string;
  /** Page <h1>. */
  h1: string;
  /** <title> without the site suffix. Aim for 50–60 characters. */
  title: string;
  /** Meta description. Aim for 140–160 characters. */
  description: string;
  /** One line on the homepage card. */
  blurb: string;
  category: string;
  /** Search-intent keywords; used for JSON-LD keywords + the homepage index. */
  keywords: string[];

  fields: CalculatorField[];
  results: CalculatorResult[];
  /** Key into lib/formulas.ts. */
  formulaId: string;
  /** Human-readable formula shown above the fold, e.g. 'CAC = Spend / Customers'. */
  formulaDisplay: string;

  /** Lead paragraphs under the H1, above the calculator. Keep to 2. */
  intro: string[];
  /** The 300–500 word explanation, below the calculator. */
  sections: ContentSection[];
  workedExample: WorkedExample;
  faqs: Faq[];
  /** Slugs of related calculators. Drives the internal-link block. */
  related: string[];

  variants: CalculatorVariant[];
}
