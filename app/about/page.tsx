import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Layout';
import { CalculatorRow, toSummaries } from '@/components/CalculatorCard';
import { getAllCalculators, getCategories } from '@/lib/registry';
import { glossary } from '@/data/glossary';
import { absoluteUrl, breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `Who builds ${site.name}, why it exists, how the calculators are researched, and the privacy principle the whole site is built around.`,
  path: '/about',
});

export default function AboutPage() {
  const calcs = getAllCalculators();
  const categories = getCategories();
  const totalPages = calcs.reduce((n, c) => n + 1 + c.variants.length, 0);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: `About ${site.name}`,
            url: absoluteUrl('/about'),
            mainEntity: { '@id': absoluteUrl('/#organization') },
          },
        ]}
      />

      <div className="shell py-8 sm:py-10">
        <Breadcrumbs trail={trail} />

        <div className="mt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
          <article className="min-w-0 max-w-content">
            <h1 className="text-h1 font-extrabold tracking-tight text-ink">
              About {site.name}
            </h1>

            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              {site.name} is a set of free calculators for the business metrics that decide
              whether a company works — what a customer costs, what they are worth, whether
              the advertising pays for itself, and how much of each sale survives to the
              bottom line.
            </p>

            <section className="mt-10" aria-labelledby="who-heading">
              <h2 id="who-heading" className="text-h2 font-bold tracking-tight text-ink">
                Who builds this
              </h2>
              <div className="mt-3 space-y-4 prose-body">
                <p>
                  {site.name} is built and maintained by {site.author}, a software developer
                  who kept rebuilding the same handful of spreadsheets — CAC, payback,
                  margin, break-even — for different projects, and eventually decided the
                  arithmetic deserved a proper tool instead.
                </p>
                <p>
                  It is a small, independent project rather than a company. That has one
                  practical consequence worth stating plainly: there is no research
                  department here. What the site offers is careful, well-explained
                  arithmetic and honest sourcing of the benchmark ranges it quotes — not
                  proprietary data. Where a figure is a widely cited rule of thumb, it says
                  so, and it says which kind of business it came from.
                </p>
                <p>
                  Corrections are genuinely welcome. If a formula here is wrong, or a
                  benchmark is stated more confidently than the evidence supports,{' '}
                  <Link href="/contact" className="font-medium text-brand-700 underline">
                    tell me
                  </Link>{' '}
                  and it will be fixed.
                </p>
              </div>
            </section>

            <section className="mt-10" aria-labelledby="why-heading">
              <h2 id="why-heading" className="text-h2 font-bold tracking-tight text-ink">
                Why it exists
              </h2>
              <div className="mt-3 space-y-4 prose-body">
                <p>
                  Search for any business metric calculator and you get a page that takes
                  three numbers, divides them, and shows you the answer with no indication
                  of whether it is good, what belongs in each input, or what to do next.
                  The arithmetic was never the hard part. Knowing whether to put sales
                  salaries in the CAC numerator is the hard part.
                </p>
                <p>
                  So every calculator here does four things a bare calculator does not: it
                  explains what belongs in each input, it reads the result back to you in
                  plain English, it says where the benchmark ranges come from and how much
                  to trust them, and it points you at the calculator that answers whatever
                  question your result just raised.
                </p>
              </div>
            </section>

            <section className="mt-10" aria-labelledby="what-heading">
              <h2 id="what-heading" className="text-h2 font-bold tracking-tight text-ink">
                What it covers
              </h2>
              <p className="mt-3 prose-body">
                {calcs.length} calculators across {categories.length} categories, plus{' '}
                {totalPages - calcs.length} industry-specific versions with their own cost
                lines and benchmarks, and {glossary.length} glossary definitions. Each
                industry page exists only where the inputs or the benchmarks genuinely
                differ — the site does not clone the same article across a list of verticals.
              </p>
              <ul className="mt-4 space-y-2.5">
                {categories.map((cat) => (
                  <li key={cat.id} className="flex gap-2.5 prose-body">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>
                      <Link
                        href={`/calculators/${cat.id}`}
                        className="font-semibold text-ink hover:text-brand-700"
                      >
                        {cat.label}
                      </Link>{' '}
                      — {cat.short}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10" aria-labelledby="privacy-heading">
              <h2 id="privacy-heading" className="text-h2 font-bold tracking-tight text-ink">
                Privacy philosophy
              </h2>
              <div className="mt-3 space-y-4 prose-body">
                <p>
                  People put real company figures into these calculators — actual revenue,
                  actual burn, actual churn. That only works if those numbers stay put, so
                  the site is built so they physically cannot go anywhere: every calculation
                  runs in JavaScript in your browser, and there is no server-side endpoint
                  to receive an input even if something tried to send one.
                </p>
                <p>
                  Saved calculators, recent history and scenarios use your browser&apos;s
                  local storage. There is no account, no login and no sync. Analytics, where
                  used, records which calculator was opened and never what was typed into it.
                </p>
                <p>
                  The site is funded by advertising and occasional affiliate links, which are
                  always marked. Ad networks set their own cookies — that is disclosed in
                  full in the{' '}
                  <Link href="/privacy" className="font-medium text-brand-700 underline">
                    privacy policy
                  </Link>
                  . Advertising revenue has never changed what a calculator says, and the
                  ad placement rules deliberately keep units away from the inputs.
                </p>
              </div>
            </section>

            <section className="mt-10" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-h2 font-bold tracking-tight text-ink">
                Contact
              </h2>
              <p className="mt-3 prose-body">
                Corrections, calculator requests, or anything that looks wrong:{' '}
                <a
                  className="font-medium text-brand-700 underline"
                  href={`mailto:${site.contactEmail}`}
                >
                  {site.contactEmail}
                </a>
                . More ways to get in touch are on the{' '}
                <Link href="/contact" className="font-medium text-brand-700 underline">
                  contact page
                </Link>
                .
              </p>
            </section>
          </article>

          <aside className="mt-12 lg:mt-0">
            <div className="space-y-6 lg:sticky lg:top-20">
              <div className="card p-5">
                <p className="eyebrow">At a glance</p>
                <dl className="mt-3 space-y-3 text-[0.8125rem]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Maintained by</dt>
                    <dd className="text-right font-semibold text-ink">{site.author}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Calculators</dt>
                    <dd className="font-semibold tabular-nums text-ink">{calcs.length}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Total pages</dt>
                    <dd className="font-semibold tabular-nums text-ink">{totalPages}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Definitions</dt>
                    <dd className="font-semibold tabular-nums text-ink">{glossary.length}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Price</dt>
                    <dd className="font-semibold text-ink">Free</dd>
                  </div>
                </dl>
              </div>

              <div className="card p-5">
                <p className="eyebrow">All calculators</p>
                <ul className="mt-2 -mx-3">
                  {toSummaries(calcs).map((calc) => (
                    <li key={calc.slug}>
                      <CalculatorRow calc={calc} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
