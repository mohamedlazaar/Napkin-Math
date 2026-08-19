import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { JsonLd } from '@/components/JsonLd';
import { CalculatorCard, toSummaries } from '@/components/CalculatorCard';
import { GoalCards } from '@/components/GoalCards';
import { HowItWorks, TrustPanel } from '@/components/HowItWorks';
import { RecentlyUsed } from '@/components/RecentlyUsed';
import {
  assertTaxonomyIsValid,
  getAllCalculators,
  getCalculators,
  getCategories,
  getPopular,
} from '@/lib/registry';
import { goals } from '@/lib/taxonomy';
import { getGlossaryAlphabetical } from '@/data/glossary';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Business Math Without the Spreadsheet',
  description: site.description,
  path: '/',
});

export default function HomePage() {
  // Fails the build if any category, popular list or glossary entry points at
  // a calculator that does not exist.
  assertTaxonomyIsValid();

  const all = getAllCalculators();
  const popular = getPopular();
  const categories = getCategories();
  const terms = getGlossaryAlphabetical();
  const totalPages = all.reduce((n, c) => n + 1 + c.variants.length, 0);

  const [lead, ...rest] = toSummaries(popular);
  const featured = [lead, ...rest.slice(0, 2)];
  const remaining = rest.slice(2);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Free business and finance calculators',
          numberOfItems: all.length,
          itemListElement: popular.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            description: c.blurb,
            url: absoluteUrl(`/${c.slug}`),
          })),
        }}
      />

      {/* ---- Hero ---------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="shell relative py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">{site.name}</p>
            <h1 className="mt-3 text-display font-extrabold text-ink">
              Business math without the spreadsheet.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Calculate CAC, LTV, ROAS, margins, MRR, churn, break-even points and the other
              numbers that decide whether a business works — in seconds, with a plain
              explanation of what each result means.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/calculators" className="btn-primary">
                Explore calculators
                <span aria-hidden="true">→</span>
              </Link>
              <a href="#popular" className="btn-secondary">
                Popular calculators
              </a>
            </div>

            <p className="mt-6 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-lg border border-healthy-line bg-healthy-soft px-3.5 py-2.5 text-[0.875rem] font-medium text-healthy">
              <span aria-hidden="true" className="text-base leading-none">
                ✓
              </span>
              Free. No signup. Calculations happen in your browser.
            </p>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              { v: String(all.length), l: 'calculators' },
              { v: String(totalPages), l: 'industry-specific pages' },
              { v: '0', l: 'numbers sent to a server' },
            ].map((stat) => (
              <div key={stat.l}>
                <dt className="sr-only">{stat.l}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold tabular-nums tracking-tight text-ink">
                    {stat.v}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-muted">
                    {stat.l}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="shell space-y-16 py-14">
        {/* Only renders for a returning visitor with local history. */}
        <RecentlyUsed />

        {/* ---- Popular ----------------------------------------------- */}
        <section id="popular" aria-labelledby="popular-heading" className="scroll-mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id="popular-heading" className="text-h2 font-bold tracking-tight text-ink">
              Popular calculators
            </h2>
            <Link
              href="/calculators"
              className="text-[0.875rem] font-semibold text-brand-600 hover:underline"
            >
              All {all.length} calculators →
            </Link>
          </div>

          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {featured.map((calc, i) => (
              <li key={calc.slug}>
                <CalculatorCard
                  calc={calc}
                  featured
                  eyebrow={i === 0 ? 'Most used' : undefined}
                />
              </li>
            ))}
          </ul>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {remaining.map((calc) => (
              <li key={calc.slug}>
                <CalculatorCard calc={calc} />
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Explore by goal --------------------------------------- */}
        <GoalCards
          goals={goals.map((goal) => ({
            id: goal.id,
            question: goal.question,
            blurb: goal.blurb,
            items: getCalculators(goal.slugs).map((c) => ({ slug: c.slug, name: c.name })),
          }))}
        />

        {/* ---- Categories -------------------------------------------- */}
        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="text-h2 font-bold tracking-tight text-ink">
            Browse by category
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/calculators/${cat.id}`} className="card-interactive group block p-5">
                  <h3 className="text-[0.9375rem] font-bold text-ink">{cat.label}</h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                    {cat.short}
                  </p>
                  <p className="mt-3 text-[0.8125rem] font-medium text-ink-muted">
                    {cat.items.length} calculator{cat.items.length === 1 ? '' : 's'}
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block text-brand-600 transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <HowItWorks />

        <TrustPanel />

        {/* ---- Glossary teaser --------------------------------------- */}
        <section aria-labelledby="glossary-heading">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id="glossary-heading" className="text-h2 font-bold tracking-tight text-ink">
              Not sure which metric you need?
            </h2>
            <Link
              href="/glossary"
              className="text-[0.875rem] font-semibold text-brand-600 hover:underline"
            >
              Full glossary →
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
            {terms.length} plain-English definitions, each with the formula, a worked example
            and the calculator that computes it.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {terms.map((term) => (
              <li key={term.slug}>
                <Link href={`/glossary/${term.slug}`} className="tag-interactive">
                  {term.abbr ?? term.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- What this is ------------------------------------------ */}
        <section aria-labelledby="about-heading" className="max-w-content">
          <h2 id="about-heading" className="text-h2 font-bold tracking-tight text-ink">
            What {site.name} is
          </h2>
          <div className="mt-4 space-y-4 prose-body">
            <p>
              {site.name} is a set of free calculators for the business metrics operators
              actually argue about: what a customer costs, what they are worth, whether the
              ads pay for themselves, and how much of each sale survives to the bottom line.
            </p>
            <p>
              Most calculators online hand you a number and stop. These give you the number
              plus the part that decides what to do with it — which costs belong in each
              input, what the result implies, where the common benchmark ranges come from,
              and which calculator answers the question your result just raised.
            </p>
            <p>
              It is built for founders, marketers, agency owners and finance teams doing
              quick analysis: the kind of arithmetic that used to happen on the back of a
              napkin, and that does not deserve a spreadsheet.
            </p>
            <p>
              Everything is free and always will be. The site is funded by advertising and
              occasional affiliate links, which are always marked — and that funding never
              changes what a calculator says. Because every calculation runs in your browser,
              your figures never reach us in the first place. Read the{' '}
              <Link href="/privacy" className="font-medium text-brand-700 underline">
                privacy policy
              </Link>{' '}
              or{' '}
              <Link href="/about" className="font-medium text-brand-700 underline">
                who builds this
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
