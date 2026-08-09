import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { AdSlot } from '@/components/ads/AdSlot';
import { JsonLd } from '@/components/JsonLd';
import { getAllCalculators, getCategories } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';

// Kept short on purpose: with the " | Napkin Math" suffix this lands at ~49
// characters, inside the ~60 Google renders before truncating.
export const metadata: Metadata = buildMetadata({
  title: 'Free Business & Finance Calculators',
  description: site.description,
  path: '/',
});

export default function HomePage() {
  const categories = getCategories();
  const all = getAllCalculators();
  const totalPages = all.reduce((n, c) => n + 1 + c.variants.length, 0);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Free business and finance calculators',
          numberOfItems: all.length,
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            url: `${site.url}/${c.slug}`,
          })),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <section className="max-w-content">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {site.description}
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            {all.length} calculator{all.length === 1 ? '' : 's'} · {totalPages} pages ·
            no account, no data collection, everything runs in your browser.
          </p>
        </section>

        <AdSlot placement="header" className="my-8" />

        {/* Every tool is linked from here — a flat, fully crawlable index. */}
        {categories.map((cat) => (
          <section key={cat.name} className="mt-10" aria-labelledby={`cat-${cat.name}`}>
            <h2
              id={`cat-${cat.name}`}
              className="text-xl font-bold tracking-tight text-ink"
            >
              {cat.name}
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="flex h-full flex-col rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-600 hover:bg-brand-50"
                  >
                    <span className="font-semibold text-ink">{c.name}</span>
                    <span className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {c.blurb}
                    </span>
                    {c.variants.length > 0 && (
                      <span className="mt-3 text-xs text-ink-muted">
                        + {c.variants.length} industry versions
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Deep links straight to the long-tail pages. Without these the
                variant pages are two clicks from the homepage and get crawled
                far less often. */}
            {cat.items.map((c) =>
              c.variants.length > 0 ? (
                <ul key={c.slug} className="mt-4 flex flex-wrap gap-2">
                  {c.variants.map((v) => (
                    <li key={v.slug}>
                      <Link
                        href={`/${c.slug}/${v.slug}`}
                        className="inline-block rounded-full border border-slate-200 px-3 py-1 text-xs text-ink-muted transition-colors hover:border-brand-600 hover:text-brand-700"
                      >
                        {c.name} for {v.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null
            )}
          </section>
        ))}

        <section className="mt-14 max-w-content">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Why these calculators
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Most business-metric calculators online give you a number and nothing
            else. These give you the number plus the part that actually matters:
            which costs belong in the numerator, what a healthy result looks like
            in your industry, and what to do when the answer is bad.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Every calculation runs locally in your browser. Nothing you type is
            uploaded, logged or stored, so you can put real company figures in
            without thinking about it.
          </p>
        </section>

        <AdSlot placement="footer" className="mt-10" />
      </div>
    </>
  );
}
